// Weak-question drilling: rebuilds a practice set from a topic's flagged /
// previously-wrong questions, then runs it through the same Tier 1 runner.

import { useMemo, useState } from 'react'
import { shuffle } from '../utils/questionEngine'
import { getWeakQuestions } from '../utils/scorer'
import { buildPracticeSet } from '../utils/questionEngine'
import PracticeRunner from './PracticeRunner'
import { Button, Card, EmptyState } from './ui'

export default function WeakDrill({ topic, onExit }) {
  const [started, setStarted] = useState(false)

  // merge weak questions with fresh questions from the bank so a drill is always ≥ 8 Qs
  const questions = useMemo(() => {
    const weak = shuffle(getWeakQuestions(topic))
    const need = Math.max(0, 10 - weak.length)
    const fresh = buildPracticeSet(topic, 20).filter((q) => !weak.some((w) => w.id === q.id)).slice(0, need)
    return [...weak, ...fresh]
  }, [topic])

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-10">
        <EmptyState icon="🎉" title={`No weak questions in ${topic}`} body="Every question you attempted was right. Take a fresh practice set or a mock.">
          <Button onClick={onExit}>Back</Button>
        </EmptyState>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl py-10">
        <Card className="p-8 text-center">
          <div className="text-4xl">🎯</div>
          <h1 className="mt-3 text-xl font-bold">{topic} — Weak-Question Drill</h1>
          <p className="mt-2 text-sm text-slate-500">
            {questions.length} questions: your flagged/missed ones plus fresh ones to reinforce.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => setStarted(true)}>Start drill</Button>
            <Button variant="ghost" onClick={onExit}>
              Back
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return <PracticeRunner topic={topic} questions={questions} onExit={onExit} />
}
