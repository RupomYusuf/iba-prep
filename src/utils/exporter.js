// CSV export of mock history and topic progress

import { getMocks, getPractice, getFlags } from './storage'
import { ALL_QUESTIONS } from '../data/questions'
import { getTopicStats, masteryFromAttempts } from './scorer'

function download(content, filename, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function exportMockHistoryCsv() {
  const rows = [['Date', 'Mode', 'Score', 'Percentage', 'Correct', 'Wrong', 'Blank', 'Accuracy %', 'Time Used (s)']]
  for (const m of getMocks()) {
    rows.push([
      new Date(m.date).toISOString(),
      m.mode,
      m.result.score,
      m.result.percentage,
      m.result.correct,
      m.result.wrong,
      m.result.blank,
      m.result.accuracy,
      m.timeUsed,
    ])
  }
  const csv = rows.map((r) => r.join(',')).join('\n')
  download(csv, 'iba-prep-mock-history.csv', 'text/csv;charset=utf-8')
}

export function exportProgressCsv() {
  const practice = getPractice()
  const flags = getFlags()
  const rows = [['Question ID', 'Topic', 'Difficulty', 'Attempts (selected options)', 'Outcome', 'Flagged']]
  for (const q of ALL_QUESTIONS) {
    const rec = practice[q.id]
    if (!rec || rec.attempts.length === 0) continue
    const m = masteryFromAttempts(rec.attempts, q.answer)
    rows.push([
      q.id,
      q.topic,
      q.difficulty,
      `"${rec.attempts.join('' | '')}"`,
      m === 1 ? 'First-attempt correct' : m === 0.5 ? 'Second-attempt correct' : 'Incorrect',
      flags[q.id] ? 'Yes' : '',
    ])
  }
  const csv = rows.map((r) => r.join(',')).join('\n')
  download(csv, 'iba-prep-practice-progress.csv', 'text/csv;charset=utf-8')
}

export function exportTopicSummaryCsv() {
  const rows = [['Topic', 'Attempted', 'Mastery %', 'First-Try %', 'Status']]
  for (const s of Object.values(getTopicStats())) {
    if (s.attempted === 0) continue
    rows.push([s.topic, s.attempted, s.mastery, s.firstTryPct, s.status])
  }
  const csv = rows.map((r) => r.join(',')).join('\n')
  download(csv, 'iba-prep-topic-summary.csv', 'text/csv;charset=utf-8')
}
