// Tier 2 — mock exam setup + runner + results.
// Real Pace: 30 Qs / 30 min. Speedrun: 30 Qs / 25 min.
// Answers & explanations unlock only after submission.

import { useEffect, useRef, useState } from 'react'
import { buildMockSet } from '../utils/questionEngine'
import { scoreMockAnswers, formatTime } from '../utils/scorer'
import { saveMock } from '../utils/storage'
import { Badge, Button, Card, difficultyColor } from './ui'
import MockResults from './MockResults'

const LETTERS = ['A', 'B', 'C', 'D']

const MODES = {
  real: { label: 'Real Exam Pace', minutes: 30, desc: '30 questions · 30 minutes · 60 sec/question', icon: '🎯' },
  speed: { label: 'Challenge / Speedrun', minutes: 25, desc: '30 questions · 25 minutes · 50 sec/question', icon: '⚡' },
}

export default function MockExam({ onExit }) {
  // phase: setup → run → results
  const [phase, setPhase] = useState('setup')
  const [mode, setMode] = useState('real')

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [flags, setFlags] = useState({})
  const [current, setCurrent] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [timePerQuestion, setTimePerQuestion] = useState([])
  const [result, setResult] = useState(null)
  const timerRef = useRef(null)
  const enteredAtRef = useRef(Date.now())

  // refs mirror state so the timer's auto-submit never reads stale closures
  const answersRef = useRef(answers)
  const timePerQuestionRef = useRef(timePerQuestion)
  const secondsLeftRef = useRef(secondsLeft)
  const currentRef = useRef(current)
  answersRef.current = answers
  timePerQuestionRef.current = timePerQuestion
  secondsLeftRef.current = secondsLeft
  currentRef.current = current

  // ---------- timer ----------
  useEffect(() => {
    if (phase !== 'run') return
    timerRef.current = setInterval(() => {
      const next = secondsLeftRef.current - 1
      secondsLeftRef.current = next
      setSecondsLeft(Math.max(0, next))
      if (next <= 0) {
        clearInterval(timerRef.current)
        submitExam(true)
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function recordTimeSpent() {
    const now = Date.now()
    const spent = Math.round((now - enteredAtRef.current) / 1000)
    enteredAtRef.current = now
    setTimePerQuestion((t) => {
      const copy = [...t]
      copy[currentRef.current] = (copy[currentRef.current] || 0) + spent
      return copy
    })
  }

  function startExam() {
    const qs = buildMockSet(Date.now())
    setQuestions(qs)
    setAnswers(new Array(qs.length).fill(null))
    setFlags({})
    setCurrent(0)
    setTimePerQuestion(new Array(qs.length).fill(0))
    setSecondsLeft(MODES[mode].minutes * 60)
    secondsLeftRef.current = MODES[mode].minutes * 60
    enteredAtRef.current = Date.now()
    setResult(null)
    setPhase('run')
  }

  function selectOption(idx) {
    recordTimeSpent()
    const q = questions[current]
    setAnswers((a) => {
      const copy = [...a]
      copy[current] = copy[current] === q.options[idx] ? null : q.options[idx] // tap again to clear
      return copy
    })
  }

  function goTo(i) {
    recordTimeSpent()
    setCurrent(i)
  }

  function toggleFlag(i) {
    setFlags((f) => ({ ...f, [i]: !f[i] }))
  }

  function submitExam(auto = false) {
    recordTimeSpent()
    clearInterval(timerRef.current)
    const res = scoreMockAnswers(questions, answersRef.current)
    const timeUsed = MODES[mode].minutes * 60 - secondsLeftRef.current
    const record = {
      id: 'mock-' + Date.now(),
      date: Date.now(),
      mode,
      questionIds: questions.map((q) => q.id),
      answers: answersRef.current,
      timeUsed,
      timePerQuestion: timePerQuestionRef.current,
      result: res,
      auto,
    }
    saveMock(record)
    setResult(record)
    setPhase('results')
  }

  const answeredCount = answers.filter((a) => a != null).length

  // ---------- setup ----------
  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-800">Tier 2 — Full Mock Exam</h1>
          <p className="mt-1 text-sm text-slate-500">
            30 questions mixed across all topics (like the real IBA paper), negative marking
            (+1 correct, −0.25 wrong, 0 blank). Answers and explanations unlock after submission.
          </p>
        </header>

        {Object.entries(MODES).map(([key, m]) => (
          <Card
            key={key}
            className={`cursor-pointer p-5 transition-all ${mode === key ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'}`}
            onClick={() => setMode(key)}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{m.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{m.label}</h3>
                <p className="text-sm text-slate-500">{m.desc}</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 ${
                  mode === key ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                }`}
              >
                {mode === key && <div className="h-full w-full scale-50 rounded-full bg-white" />}
              </div>
            </div>
          </Card>
        ))}

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-700">Rules</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-500">
            <li>• Difficulty is progressive: Q1–10 easier, Q11–25 medium, Q26–30 harder.</li>
            <li>• Flag questions to revisit; change answers any time before submitting.</li>
            <li>• The exam auto-submits when the timer hits 0:00.</li>
            <li>• Scoring: +1 per correct, −0.25 per wrong, 0 for blank — exactly like IBA.</li>
          </ul>
        </Card>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={onExit}>
            ← Back to dashboard
          </Button>
          <Button onClick={startExam}>Start Mock Exam →</Button>
        </div>
      </div>
    )
  }

  // ---------- results ----------
  if (phase === 'results' && result) {
    return <MockResults record={result} onExit={onExit} onRetake={() => setPhase('setup')} />
  }

  // ---------- run ----------
  const q = questions[current]
  const low = secondsLeft <= 120
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {/* sticky timer bar */}
      <Card className={`sticky top-2 z-10 flex items-center justify-between p-3 ${low ? 'border-red-300 bg-red-50' : ''}`}>
        <div className="flex items-center gap-2">
          <Badge color={MODES[mode].minutes === 25 ? 'violet' : 'indigo'}>{MODES[mode].label}</Badge>
          <span className="text-sm text-slate-500 tnum">
            {answeredCount}/{questions.length} answered
          </span>
        </div>
        <div className={`text-2xl font-bold tnum ${low ? 'text-red-600' : 'text-slate-800'}`}>
          {formatTime(secondsLeft)}
        </div>
        <Button variant="danger" onClick={() => submitExam(false)}>
          Submit exam
        </Button>
      </Card>

      {/* question palette */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((_, i) => {
          const isAnswered = answers[i] != null
          const isFlagged = flags[i]
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-8 w-8 rounded-lg text-xs font-semibold tnum transition-colors ${
                i === current
                  ? 'bg-indigo-600 text-white'
                  : isFlagged
                    ? 'bg-amber-200 text-amber-800 hover:bg-amber-300'
                    : isAnswered
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-500">Question {current + 1} of {questions.length}</span>
          <div className="flex items-center gap-2">
            <Badge color={difficultyColor(q.difficulty)}>{q.difficulty}</Badge>
            <button
              onClick={() => toggleFlag(current)}
              className={`rounded-lg px-2 py-1 text-sm ${
                flags[current] ? 'bg-amber-100 text-amber-700' : 'text-slate-400 hover:bg-slate-100'
              }`}
            >
              {flags[current] ? '🚩 Flagged' : '🏳️ Flag'}
            </button>
          </div>
        </div>

        <p className="mt-4 text-base font-medium leading-relaxed text-slate-800">{q.q}</p>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const selected = answers[current] === q.options[i]
            let cls =
              'w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-colors '
            cls += selected
              ? 'border-indigo-500 bg-indigo-50 font-medium'
              : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40'
            return (
              <button key={i} className={cls} onClick={() => selectOption(i)}>
                <span className="mr-2 font-bold text-slate-500">{LETTERS[i]}.</span>
                {opt}
              </button>
            )
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between pb-6">
        <Button variant="secondary" onClick={() => goTo(Math.max(0, current - 1))} disabled={current === 0}>
          ← Previous
        </Button>
        <span className="text-xs text-slate-400">No answers shown until you submit</span>
        <Button
          variant="secondary"
          onClick={() => goTo(Math.min(questions.length - 1, current + 1))}
          disabled={current === questions.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
