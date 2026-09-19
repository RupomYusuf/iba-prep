// Question engine — seeded selection, difficulty distribution, option shuffling.
// Questions are DYNAMIC: every set/mock combines freshly generated instances
// (from parameterized templates in data/generators.js) with curated bank
// questions, preferring bank questions you haven't seen before.

import { ALL_QUESTIONS, questionsByTopic } from '../data/questions'
import { GENERATORS } from '../data/generators'
import { getPractice } from './storage'

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
// Difficulty profiles — IBA doesn't do easy questions; default is exam-realistic.

export const DIFFICULTY_PROFILES = {
  iba: {
    label: 'IBA Standard',
    desc: 'No easy questions — tricky mediums & hard only. Closest to the real exam.',
    mix: { easy: 0, medium: 0.5, hard: 0.5 },
  },
  balanced: {
    label: 'Balanced',
    desc: '30% easy · 40% medium · 30% hard — even mix across levels.',
    mix: { easy: 0.3, medium: 0.4, hard: 0.3 },
  },
  foundation: {
    label: 'Foundation',
    desc: 'Build basics first — 50% easy · 30% medium · 20% hard.',
    mix: { easy: 0.5, medium: 0.3, hard: 0.2 },
  },
}

// Full-topic marathon: EVERY bank question allowed by the profile plus one
// instance of every generator template. Completing it = full topic coverage.
function buildMarathon(topic, seed, profileKey) {
  const rng = makeRng(seed)
  const mix = DIFFICULTY_PROFILES[profileKey]?.mix || DIFFICULTY_PROFILES.iba.mix
  const pool = questionsByTopic(topic)
  // profile gates which difficulties belong in the set (IBA Standard → no easies)
  const bankAllowed = pool.filter((q) => mix[q.difficulty] > 0)
  const templates = GENERATORS.filter((g) => {
    const t = g()
    return t.topic === topic && mix[t.difficulty] > 0
  })
  const picked = [...bankAllowed]
  for (const gen of templates) picked.push(gen(Math.floor(rng() * 2 ** 31)))

  const rank = { easy: 0, medium: 1, hard: 2 }
  picked.sort((a, b) => rank[a.difficulty] - rank[b.difficulty])
  return picked.map((q) => shuffleOptions(q, rng))
}

export function buildPracticeSet(topic, count = 16, seed = Date.now(), profileKey = 'iba') {
  if (count === 'all') return buildMarathon(topic, seed, profileKey)
  const rng = makeRng(seed)
  let pool = questionsByTopic(topic)
  if (pool.length === 0) return []
  const mix = DIFFICULTY_PROFILES[profileKey]?.mix || DIFFICULTY_PROFILES.iba.mix

  const nEasy = Math.round(count * mix.easy)
  const nHard = Math.round(count * mix.hard)
  const nMedium = count - nEasy - nHard // absorbs rounding remainder

  // --- dynamic layer: freshly generated instances (one per template max) ---
  const seenIds = new Set()
  const picked = []
  const want = { easy: nEasy, medium: nMedium, hard: nHard }
  const genShuffled = shuffle(GENERATORS.filter((g) => g().topic === topic), rng)
  for (const gen of genShuffled) {
    const template = gen()
    if (want[template.difficulty] > 0) {
      picked.push(gen(Math.floor(rng() * 2 ** 31)))
      want[template.difficulty]--
      seenIds.add(template.templateId)
    }
  }

  // --- curated layer: bank questions, preferring ones not seen before ---
  const practice = getPractice()
  const fresh = pool.filter((q) => !practice[q.id])
  const used = pool.filter((q) => practice[q.id])
  for (const group of [fresh, used]) {
    for (const difficulty of ['easy', 'medium', 'hard']) {
      if (want[difficulty] <= 0) continue
      const groupShuffled = shuffle(group.filter((q) => q.difficulty === difficulty), rng)
      for (const q of groupShuffled) {
        if (want[difficulty] <= 0) break
        picked.push(q)
        want[difficulty]--
        seenIds.add(q.id)
      }
    }
  }

  // dedupe + trim
  const seen = new Set()
  let final = picked.filter((q) => (seen.has(q.id) ? false : (seen.add(q.id), true)))
  final = final.slice(0, count)

  // if dynamic templates couldn't fill the set (small topic pools), top up with
  // any remaining generated instances
  if (final.length < count) {
    for (const gen of genShuffled) {
      if (final.length >= count) break
      const template = gen()
      if (seenIds.has(template.templateId)) continue
      final.push(gen(Math.floor(rng() * 2 ** 31)))
      seenIds.add(template.templateId)
    }
  }

  // easy → hard within the set, friendlier for learning
  const rank = { easy: 0, medium: 1, hard: 2 }
  final.sort((a, b) => rank[a.difficulty] - rank[b.difficulty])

  return final.map((q) => shuffleOptions(q, rng))
}

// ---------- Tier 2: mock exam ----------
// Every mock question is IBA / GMAT 650+ standard: medium & hard only, no easy
// fillers. Progressive feel: Q1-25 standard mediums, Q26-30 the hardest.

export function buildMockSet(seed = Date.now(), count = 30) {
  const rng = makeRng(seed)
  const nMedium = 20
  const nHard = count - nMedium // the hardest questions close the paper

  const picked = []
  const seenTemplates = new Set()

  // --- dynamic layer: freshly generated instances (one per template) ---
  const genShuffled = shuffle(GENERATORS, rng)
  for (const gen of genShuffled) {
    const template = gen()
    if (template.difficulty === 'medium' && nMedium > 0) {
      picked.push(gen(Math.floor(rng() * 2 ** 31)))
      seenTemplates.add(template.templateId)
    }
  }
  // hards come mostly from the curated bank for exam-grade difficulty
  const bankMedium = shuffle(ALL_QUESTIONS.filter((q) => q.difficulty === 'medium'), rng)
  const bankHard = shuffle(ALL_QUESTIONS.filter((q) => q.difficulty === 'hard'), rng)
  let usedMedium = picked.length
  for (const q of bankMedium) {
    if (usedMedium >= nMedium) break
    picked.push(q)
    usedMedium++
  }
  let usedHard = 0
  for (const q of bankHard) {
    if (usedHard >= nHard) break
    picked.push(q)
    usedHard++
  }
  // top up hards with generated instances if the bank pool ran short
  if (usedHard < nHard) {
    for (const gen of genShuffled) {
      if (usedHard >= nHard) break
      const template = gen()
      if (template.difficulty !== 'hard' || seenTemplates.has(template.templateId)) continue
      picked.push(gen(Math.floor(rng() * 2 ** 31)))
      usedHard++
    }
  }

  // de-dupe (gen instance ids are unique; bank ids could collide only on top-up)
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
