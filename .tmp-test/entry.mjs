import { ALL_QUESTIONS, TOPICS, questionsByTopic } from '../src/data/questions/index.js'
import { buildPracticeSet, buildMockSet, DIFFICULTY_PROFILES } from '../src/utils/questionEngine.js'
const errs = []
const ids = new Set()
for (const q of ALL_QUESTIONS) {
  if (ids.has(q.id)) errs.push('dup id ' + q.id)
  ids.add(q.id)
  if (q.options.length !== 4 || new Set(q.options).size !== 4) errs.push(q.id + ' options')
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errs.push(q.id + ' answer')
  if (!q.explanation || q.explanation.length < 20) errs.push(q.id + ' thin explanation')
}
console.log('Total:', ALL_QUESTIONS.length, '| per topic:', TOPICS.map(t => questionsByTopic(t).length).join(','))
// profiles
for (const key of Object.keys(DIFFICULTY_PROFILES)) {
  const p = buildPracticeSet('Algebra', 16, 42, key)
  const d = { easy: 0, medium: 0, hard: 0 }
  p.forEach(q => d[q.difficulty]++)
  console.log(key.padEnd(11), 'set:', p.length, 'Qs | E/M/H:', d.easy + '/' + d.medium + '/' + d.hard)
  if (key === 'iba' && d.easy !== 0) errs.push('iba profile contains easy questions!')
  if (p.length !== 16) errs.push(key + ' wrong set size')
}
// mocks: no easy
for (const seed of [1, 7, 99]) {
  const m = buildMockSet(seed)
  const d = { easy: 0, medium: 0, hard: 0 }
  m.forEach(q => d[q.difficulty]++)
  if (d.easy !== 0) errs.push('mock seed ' + seed + ' contains easy questions')
  if (m.length !== 30) errs.push('mock size ' + m.length)
  if (seed === 1) console.log('Mock E/M/H:', d.easy + '/' + d.medium + '/' + d.hard)
}
console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'PROFILE + MOCK CHECKS PASSED')
