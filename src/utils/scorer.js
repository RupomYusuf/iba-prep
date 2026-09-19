// Scoring & analytics — IBA negative marking (+1 correct, −0.25 wrong, 0 blank)

import { getPractice, getFlags, getMocks } from './storage'
import { ALL_QUESTIONS, TOPICS, questionsByTopic } from '../data/questions'

export const MARKING = { correct: 1, wrong: -0.25, blank: 0 }

export function scoreMockAnswers(questions, answers) {
  let correct = 0
  let wrong = 0
  let blank = 0
  const perQuestion = questions.map((q, i) => {
    const a = answers[i]
    let result // 'correct' | 'wrong' | 'blank'
    if (a == null) {
      result = 'blank'
      blank++
    } else if (a === q.answer) {
      result = 'correct'
      correct++
    } else {
      result = 'wrong'
      wrong++
    }
    return { id: q.id, topic: q.topic, difficulty: q.difficulty, choice: a, result }
  })
  const score = correct * MARKING.correct + wrong * MARKING.wrong
  const total = questions.length
  return {
    correct,
    wrong,
    blank,
    score: Math.round(score * 100) / 100,
    percentage: Math.round((Math.max(score, 0) / total) * 1000) / 10,
    accuracy: correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0,
    perQuestion,
  }
}

// ---------- practice / topic mastery ----------

// mastery weight: 1st-attempt correct = 1.0, 2nd-attempt correct = 0.5, else 0
export function masteryFromAttempts(attempts, correctAnswer) {
  if (!attempts || attempts.length === 0) return null
  if (attempts[0] === correctAnswer) return 1
  if (attempts.length > 1 && attempts[1] === correctAnswer) return 0.5
  return 0
}

export function getTopicStats() {
  const practice = getPractice()
  const stats = {}
  for (const topic of TOPICS) {
    stats[topic] = {
      topic,
      total: questionsByTopic(topic).length,
      attempted: 0,
      firstTryCorrect: 0,
      solved: 0, // correct on either attempt
      masteryPoints: 0,
      mastery: 0, // %
    }
  }
  for (const q of ALL_QUESTIONS) {
    const rec = practice[q.id]
    if (!rec || rec.attempts.length === 0) continue
    const s = stats[q.topic]
    s.attempted++
    const m = masteryFromAttempts(rec.attempts, q.answer)
    if (m == null) continue
    s.masteryPoints += m
    if (m === 1) s.firstTryCorrect++
    if (m > 0) s.solved++
  }
  for (const topic of TOPICS) {
    const s = stats[topic]
    s.mastery = s.attempted > 0 ? Math.round((s.masteryPoints / s.attempted) * 100) : 0
    s.firstTryPct = s.attempted > 0 ? Math.round((s.firstTryCorrect / s.attempted) * 100) : 0
    s.status = masteryStatus(s.mastery)
  }
  return stats
}

export function masteryStatus(mastery) {
  if (mastery >= 90) return 'Mastered'
  if (mastery >= 70) return 'On Track'
  if (mastery > 0) return 'Weak'
  return 'Not Started'
}

// topics scoring < 70% — the spec's weak-area threshold
export function getWeakTopics() {
  const stats = getTopicStats()
  return Object.values(stats)
    .filter((s) => s.attempted > 0 && s.mastery < 70)
    .sort((a, b) => a.mastery - b.mastery)
}

export function getWeakQuestions(topic) {
  const practice = getPractice()
  const flags = getFlags()
  return questionsByTopic(topic).filter((q) => {
    const rec = practice[q.id]
    if (flags[q.id]) return true
    if (!rec || rec.attempts.length === 0) return false
    return masteryFromAttempts(rec.attempts, q.answer) === 0
  })
}

export function getDashboardStats() {
  const stats = getTopicStats()
  const mocks = getMocks()
  const practice = getPractice()
  const questionsSolved = Object.values(practice).filter((r) => r.attempts.length > 0).length
  const scores = mocks.map((m) => m.result.score)
  return {
    topicsCompleted: Object.values(stats).filter((s) => s.mastery >= 90).length,
    topicsPracticed: Object.values(stats).filter((s) => s.attempted > 0).length,
    totalTopics: TOPICS.length,
    practiceQuestionsSolved: questionsSolved,
    totalMocks: mocks.length,
    bestScore: mocks.length ? Math.max(...scores) : null,
    averageScore: mocks.length
      ? Math.round((scores.reduce((a, b) => a + b, 0) / mocks.length) * 100) / 100
      : null,
    lastScore: mocks.length ? scores[mocks.length - 1] : null,
    weakTopics: getWeakTopics(),
    topicStats: stats,
    mocks,
  }
}

// AI-style study recommendations based on performance patterns
export function getRecommendations() {
  const { topicStats, mocks } = getDashboardStats()
  const recs = []
  const practiced = Object.values(topicStats).filter((s) => s.attempted > 0)
  const untouched = Object.values(topicStats).filter((s) => s.attempted === 0)

  if (practiced.length === 0) {
    recs.push('Start Tier 1: pick a topic and complete your first 16-question practice set to establish a baseline.')
  }
  for (const s of getWeakTopics()) {
    recs.push(
      `${s.topic} is at ${s.mastery}% mastery (below the 70% threshold) — run a targeted Tier 1 set and review every explanation.`
    )
  }
  const strong = practiced.filter((s) => s.mastery >= 90)
  if (strong.length > 0) {
    recs.push(`${strong.map((s) => s.topic).join(', ')} ${strong.length > 1 ? 'are' : 'is'} mastered — maintain with occasional speed drills instead of full sets.`)
  }
  if (untouched.length > 0 && practiced.length > 0) {
    recs.push(`You haven't started ${untouched.map((s) => s.topic).join(', ')} yet — schedule it this week.`)
  }
  if (mocks.length === 0 && practiced.length >= 2) {
    recs.push('You have practiced 2+ topics — take your first full 30-minute mock to calibrate your pace.')
  }
  if (mocks.length >= 2) {
    const recent = mocks.slice(-2)
    if (recent[1].result.score > recent[0].result.score) {
      recs.push(`Scores are improving (+${Math.round((recent[1].result.score - recent[0].result.score) * 100) / 100} on your last mock). Keep the weekly mock rhythm.`)
    } else {
      recs.push('Your last two mocks show no improvement — spend this week drilling the weak topics flagged below before the next mock.')
    }
    const slow = recent[1].result.timeUsed / 60 > 28
    if (slow) recs.push('You are using nearly all of the 30 minutes — practice skipping long questions on the first pass, then return.')
  }
  if (recs.length === 0) recs.push('You are on track. Keep alternating Tier 1 drills with weekly mocks until exam week.')
  return recs.slice(0, 6)
}

// format seconds → MM:SS
export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}
