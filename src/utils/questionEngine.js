// Question engine — seeded selection, difficulty distribution, option shuffling.
// Serves Tier 1 (topic practice, 15-20 Qs at 30/40/30 difficulty) and
// Tier 2 (mock exams: Q1-10 easier, Q11-25 medium, Q26-30 harder).

import { ALL_QUESTIONS, questionsByTopic } from '../data/questions'

// deterministic PRNG (mulberry32)
export function makeRng(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle(arr, rng = Math.random) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Shuffle each question's options and remap the answer index so the same
// question doesn't always present the same option order.
function shuffleOptions(q, rng) {
  const order = shuffle([0, 1, 2, 3], rng)
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answer: order.indexOf(q.answer),
  }
}

function pickByDifficulty(pool, difficulty, count, rng) {
  const group = shuffle(pool.filter((q) => q.difficulty === difficulty), rng)
  if (group.length >= count) return group.slice(0, count)
  // top up from the rest of the pool if a difficulty ran out
  const rest = shuffle(pool.filter((q) => q.difficulty !== difficulty), rng)
  return [...group, ...rest.slice(0, count - group.length)]
}

// ---------- Tier 1: topic practice ----------
// difficulty distribution target: 30% easy, 40% medium, 30% hard

export function buildPracticeSet(topic, count = 16, seed = Date.now()) {
  const rng = makeRng(seed)
  let pool = questionsByTopic(topic)
  if (pool.length === 0) return []

  const nEasy = Math.max(1, Math.round(count * 0.3))
  const nHard = Math.max(1, Math.round(count * 0.3))
  const nMedium = Math.max(1, count - nEasy - nHard)

  let picked = [
    ...pickByDifficulty(pool, 'easy', Math.min(nEasy, count), rng),
    ...pickByDifficulty(pool, 'medium', nMedium, rng),
    ...pickByDifficulty(pool, 'hard', nHard, rng),
  ]
  // dedupe (in case topping up overlapped)
  const seen = new Set()
  picked = picked.filter((q) => (seen.has(q.id) ? false : (seen.add(q.id), true)))
  picked = picked.slice(0, count)

  // easy → hard within the set, friendlier for learning
  const rank = { easy: 0, medium: 1, hard: 2 }
  picked.sort((a, b) => rank[a.difficulty] - rank[b.difficulty])

  return picked.map((q) => shuffleOptions(q, rng))
}

// ---------- Tier 2: mock exam ----------
// 30 questions mixed across all topics, progressive difficulty:
// Q1-10 easier, Q11-25 medium, Q26-30 harder

export function buildMockSet(seed = Date.now(), count = 30) {
  const rng = makeRng(seed)
  const nEasy = 10
  const nMedium = 15
  const nHard = count - nEasy - nMedium // 5

  const picked = [
    ...pickByDifficulty(ALL_QUESTIONS, 'easy', nEasy, rng),
    ...pickByDifficulty(ALL_QUESTIONS, 'medium', nMedium, rng),
    ...pickByDifficulty(ALL_QUESTIONS, 'hard', nHard, rng),
  ]

  // de-dupe in case of top-up overlap
  const seen = new Set()
  const unique = picked.filter((q) => (seen.has(q.id) ? false : (seen.add(q.id), true)))

  // spread topics so they aren't sectioned by topic (real exam feel)
  const mixed = []
  const buckets = new Map()
  for (const q of unique) {
    if (!buckets.has(q.topic)) buckets.set(q.topic, [])
    buckets.get(q.topic).push(q)
  }
  const topicNames = [...buckets.keys()]
  let i = 0
  while (mixed.length < unique.length) {
    const b = buckets.get(topicNames[i % topicNames.length])
    if (b.length) mixed.push(b.shift())
    if (b.length === 0) topicNames.splice(i % topicNames.length, 1)
    if (topicNames.length === 0) break
    i++
  }
  mixed.push(...unique.filter((q) => !mixed.includes(q)))

  // restore progressive difficulty ordering
  const rank = { easy: 0, medium: 1, hard: 2 }
  mixed.sort((a, b) => rank[a.difficulty] - rank[b.difficulty])

  return mixed.map((q) => shuffleOptions(q, rng))
}

// ---------- topic detection (used with the PDF parser) ----------

const TOPIC_KEYWORDS = {
  Algebra: ['algebra', 'equation', 'quadratic', 'inequality', 'polynomial', 'exponent', 'factor', 'linear', 'variable', 'function', 'root', 'surd', 'binomial', 'expression', 'solve for'],
  Arithmetic: ['arithmetic', 'percentage', 'percent', 'ratio', 'proportion', 'average', 'lcm', 'hcf', 'gcd', 'interest', 'profit', 'discount', 'fraction', 'decimal', 'divisib', 'prime', 'integer', 'simplify'],
  Geometry: ['geometry', 'triangle', 'circle', 'angle', 'polygon', 'quadrilateral', 'rectangle', 'square', 'cylinder', 'cone', 'sphere', 'perimeter', 'area', 'volume', 'pythagoras', 'theorem', 'radius', 'diameter', 'coordinate'],
  'Word Problems': ['word problem', 'work rate', 'pipes', 'cistern', 'train', 'boat', 'downstream', 'upstream', 'age', 'mixture', 'clock', 'wage', 'salary', 'speed', 'distance', 'time'],
  'Set Theory': ['set theory', 'venn', 'union', 'intersection', 'subset', 'universal set', 'disjoint', 'complement', 'cardinal'],
  Probability: ['probability', 'chance', 'outcome', 'sample space', 'dice', 'coin', 'event', 'combination', 'permutation', 'independent', 'expected'],
}

// Extract topic signals from raw PDF text. Returns sorted [{topic, score, matches}].
export function detectTopics(text) {
  const lower = text.toLowerCase()
  const results = []
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    let score = 0
    const hits = []
    for (const kw of keywords) {
      const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      const n = (lower.match(re) || []).length
      if (n > 0) {
        score += n
        hits.push(kw)
      }
    }
    if (score > 0) results.push({ topic, score, hits: hits.slice(0, 6) })
  }
  results.sort((a, b) => b.score - a.score)
  return results
}
