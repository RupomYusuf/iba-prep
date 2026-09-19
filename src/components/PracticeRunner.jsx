// Tier 1 runner — 2 attempts per question, no timer.
// Attempt 1 submit → correct/incorrect feedback only.
// Attempt 2 submit → full reveal: answer, explanation, concepts, common mistake.

import { useMemo, useState } from 'react'
import { recordAttempt, toggleFlag, getFlags } from '../utils/storage'
import { masteryFromAttempts } from '../utils/scorer'
import { Badge, Button, Card, ProgressBar, difficultyColor, topicColor } from './ui'

const LETTERS = ['A', 'B', 'C', 'D']

export default function PracticeRunner({ topic, questions, onExit }) {
  const [index, setIndex] = useState(0)
  const [attempts, setAttempts] = useState([]) // this session's attempts for current question
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState([]) // { id, mastery }
  const [done, setDone] = useState(false)
  const [flags, setFlags] = useState(() => getFlags())

  const q = questions[index]
  const isFlagged = !!flags[q?.id]

  const setSummary = useMemo(() => {
    const pts = results.reduce((a, r) => a + r.mastery, 0)
    return {
      attempted: results.length,
      mastery: results.length ? Math.round((pts / results.length) * 100) : 0,
      firstTry: results.filter((r) => r.mastery === 1).length,
      solved: results.filter((r) => r.mastery > 0).length,
    }
  }, [results])

  function submit(choiceIdx) {
    recordAttempt(q.id, choiceIdx)
    const newAttempts = [...attempts, choiceIdx]
    setAttempts(newAttempts)
    if (newAttempts.length === 2) {
      setRevealed(true)
      setResults((r) => [...r, { id: q.id, topic: q.topic, mastery: masteryFromAttempts(newAttempts, q.answer) }])
    }
  }

  function next() {
    // record result if the user moves on without using the 2nd attempt
    if (!results.some((r) => r.id === q.id)) {
      setResults((r) => [...r, { id: q.id, topic: q.topic, mastery: masteryFromAttempts(attempts, q.answer) }])
    }
    setAttempts([])
    setRevealed(false)
    if (index + 1 >= questions.length) setDone(true)
    else setIndex(index + 1)
  }

  function handleFlag() {
    const now = toggleFlag(q.id)
    setFlags((f) => ({ ...f, [q.id]: now }))
  }

  // ---------- summary screen ----------
  if (done) {
    const weak = results.filter((r) => r.mastery === 0)
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="p-8 text-center">
          <div className="text-5xl">{setSummary.mastery >= 90 ? '🏆' : setSummary.mastery >= 70 ? '💪' : '📌'}</div>
          <h1 className="mt-3 text-2xl font-bold">{topic} — Set Complete</h1>
          <p className="mt-1 text-sm text-slate-500">
            {setSummary.firstTry} first-try correct · {setSummary.solved} solved within 2 attempts ·{' '}
            {weak.length} to revisit
          </p>
          <div className="mx-auto mt-5 max-w-sm">
            <div className="mb-1 flex justify-between text-sm font-medium">
              <span>Topic mastery</span>
              <span className="tnum">{setSummary.mastery}%</span>
            </div>
            <ProgressBar value={setSummary.mastery} height={10} />
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary" onClick={onExit}>
              Back to topics
            </Button>
          </div>
        </Card>
        {weak.length > 0 && (
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-700">
              Questions flagged for review ({weak.length})
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-500">
              {weak.slice(0, 8).map((r) => (
                <li key={r.id}>• {r.id.toUpperCase()} — will appear in “Weak Qs” drilling</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    )
  }

  const attempt1 = attempts[0]
  const attempt1Correct = attempt1 === q.answer

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" onClick={onExit} className="!px-2">
          ← Exit practice
        </Button>
        <div className="flex items-center gap-2">
          <Badge color={topicColor(q.topic)}>{q.topic}</Badge>
          <Badge color={difficultyColor(q.difficulty)}>{q.difficulty}</Badge>
          <Badge>{q.subtopic}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-500 tnum">
          Q{index + 1}/{questions.length}
        </span>
        <div className="flex-1">
          <ProgressBar value={((index + (revealed ? 1 : 0)) / questions.length) * 100} height={6} />
        </div>
        <button
          onClick={handleFlag}
          className={`rounded-lg px-2 py-1 text-sm transition-colors ${
            isFlagged ? 'bg-amber-100 text-amber-700' : 'text-slate-400 hover:bg-slate-100'
          }`}
          title="Flag for review"
        >
          {isFlagged ? '🚩 Flagged' : '🏳️ Flag'}
        </button>
      </div>

      <Card className="p-6">
        <p className="text-base font-medium leading-relaxed text-slate-800">{q.q}</p>

        {/* options */}
        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const chosen1 = attempts[0] === i
            const chosen2 = attempts[1] === i
            const showCorrect = revealed && i === q.answer

            let cls =
              'w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-colors '
            if (revealed && showCorrect) cls += 'border-emerald-500 bg-emerald-50 '
            else if (revealed && (chosen1 || chosen2)) cls += 'border-red-400 bg-red-50 '
            else if (!revealed && (chosen1 || chosen2)) cls += 'border-indigo-500 bg-indigo-50 '
            else cls += 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 '

            const disabled = attempts.length >= 2 || revealed
            return (
              <button key={i} className={cls} disabled={disabled} onClick={() => submit(i)}>
                <span className="mr-2 font-bold text-slate-500">{LETTERS[i]}.</span>
                {opt}
                {revealed && showCorrect && <span className="ml-2 text-emerald-600">✓</span>}
              </button>
            )
          })}
        </div>

        {/* attempt 1 feedback */}
        {attempts.length === 1 && (
          <div
            className={`mt-5 rounded-xl px-4 py-3 text-sm ${
              attempt1Correct ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {attempt1Correct ? (
              <>
                <strong>Attempt 1: Correct!</strong> You may answer again to lock it in, or move on —
                the full solution unlocks below after your 2nd attempt (or via Next).
              </>
            ) : (
              <>
                <strong>Attempt 1: Incorrect.</strong> You have one more attempt. Choose carefully —
                the full solution appears after it.
              </>
            )}
          </div>
        )}

        {/* full reveal */}
        {revealed && (
          <div className="mt-5 space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              Correct answer: {LETTERS[q.answer]}. {q.options[q.answer]}
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Explanation</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{q.explanation}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Key concepts</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {q.concepts.map((c) => (
                  <Badge key={c} color="indigo">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              <span className="font-semibold">Common mistake: </span>
              {q.mistake}
            </div>
            <p className="text-xs text-slate-400">Attempt history: {attempts.map((a) => LETTERS[a]).join(' → ')}</p>
          </div>
        )}
      </Card>

      {/* footer actions */}
      <div className="flex justify-between">
        <div className="text-xs text-slate-400">
          {attempts.length < 2 ? 'Attempts left: ' + (2 - attempts.length) : 'Both attempts used'}
        </div>
        <div className="flex gap-2">
          {attempts.length >= 1 && !revealed && (
            <Button variant="ghost" onClick={next}>
              Skip to next →
            </Button>
          )}
          {(revealed || attempts.length >= 2) && <Button onClick={next}>Next question →</Button>}
        </div>
      </div>
    </div>
  )
}
