import { questions as algebra } from './algebra'
import { questions as arithmetic } from './arithmetic'
import { questions as geometry } from './geometry'
import { questions as wordProblems } from './wordProblems'
import { questions as setTheory } from './setTheory'
import { questions as probability } from './probability'

export const ALL_QUESTIONS = [
  ...algebra,
  ...arithmetic,
  ...geometry,
  ...wordProblems,
  ...setTheory,
  ...probability,
]

export const TOPICS = [...new Set(ALL_QUESTIONS.map((q) => q.topic))]

export const TOPIC_META = {
  Algebra: { icon: '𝑥', color: '#6366f1', desc: 'Equations, exponents, quadratics, functions, inequalities' },
  Arithmetic: { icon: '%', color: '#0ea5e9', desc: 'Percents, ratios, averages, LCM/HCF, interest, numbers' },
  Geometry: { icon: '△', color: '#f59e0b', desc: 'Triangles, circles, polygons, coordinate & solid geometry' },
  'Word Problems': { icon: '✎', color: '#10b981', desc: 'Work & time, speed, ages, profit/loss, mixtures, clocks' },
  'Set Theory': { icon: '∪', color: '#ec4899', desc: 'Venn diagrams, union & intersection, subsets, counting' },
  Probability: { icon: '🎲', color: '#8b5cf6', desc: 'Basic, independent, without replacement, expected value' },
}

export const DIFFICULTY_META = {
  easy: { label: 'Easy', color: '#22c55e' },
  medium: { label: 'Medium', color: '#f59e0b' },
  hard: { label: 'Hard', color: '#ef4444' },
}

export function questionsByTopic(topic) {
  return ALL_QUESTIONS.filter((q) => q.topic === topic)
}

export function getQuestion(id) {
  return ALL_QUESTIONS.find((q) => q.id === id)
}
