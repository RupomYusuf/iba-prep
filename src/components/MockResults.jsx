// Mock results: IBA-style score breakdown, analytics and the post-exam answer key.

import { useMemo, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { formatTime, MARKING } from '../utils/scorer'
import { getQuestion } from '../data/questions'
import { Badge, Button, Card, difficultyColor, ProgressBar, StatCard, topicColor } from './ui'

const LETTERS = ['A', 'B', 'C', 'D']

export default function MockResults({ record, onExit, onRetake }) {
  const [showReview, setShowReview] = useState(false)
  const { result, mode, timeUsed } = record

  const byTopic = useMemo(() => {
    const map = {}
    for (const pq of result.perQuestion) {
      if (!map[pq.topic]) map[pq.topic] = { topic: pq.topic, correct: 0, total: 0 }
      map[pq.topic].total++
      if (pq.result === 'correct') map[pq.topic].correct++
    }
    return Object.values(map)
      .map((t) => ({ ...t, pct: Math.round((t.correct / t.total) * 100) }))
      .sort((a, b) => a.pct - b.pct)
  }, [result])

  const byDifficulty = useMemo(() => {
    const map = {}
    for (const pq of result.perQuestion) {
      if (!map[pq.difficulty]) map[pq.difficulty] = { difficulty: pq.difficulty, correct: 0, total: 0 }
      map[pq.difficulty].total++
      if (pq.result === 'correct') map[pq.difficulty].correct++
    }
    return Object.values(map)
  }, [result])

  const pieData = [
    { name: 'Correct', value: result.correct, color: '#22c55e' },
    { name: 'Wrong', value: result.wrong, color: '#ef4444' },
    { name: 'Blank', value: result.blank, color: '#cbd5e1' },
  ]

  const weakTopics = byTopic.filter((t) => t.pct < 70)
  const slowest = result.perQuestion
    .map((pq, i) => ({ ...pq, i, time: record.timePerQuestion[i] || 0 }))
    .sort((a, b) => b.time - a.time)
    .slice(0, 5)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* score hero */}
      <Card className="p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
          {mode === 'speed' ? '⚡ Speedrun Mock' : '🎯 Real-Pace Mock'} ·{' '}
          {new Date(record.date).toLocaleString()} {record.auto && '· auto-submitted'}
        </p>
        <div className="mt-3 flex items-end justify-center gap-2">
          <span className="text-6xl font-extrabold tnum text-indigo-600">{result.score}</span>
          <span className="pb-2 text-xl text-slate-400">/ 30</span>
        </div>
        <p className="mt-1 text-2xl font-bold text-slate-800">{result.percentage}%</p>
        <p className="mt-1 text-sm text-slate-500">
          {result.correct} correct · {result.wrong} wrong · {result.blank} blank — negative marking applied
          ({MARKING.correct}/{MARKING.wrong}/0)
        </p>
        <div className="mx-auto mt-4 max-w-md">
          <ProgressBar value={result.percentage} height={10} />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Time used: <strong className="tnum">{formatTime(timeUsed)}</strong> of{' '}
          {mode === 'speed' ? '25:00' : '30:00'} · Accuracy on attempted:{' '}
          <strong className="tnum">{result.accuracy}%</strong>
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => setShowReview(true)}>Review answers & explanations</Button>
          <Button variant="secondary" onClick={onRetake}>
            Take another mock
          </Button>
          <Button variant="ghost" onClick={onExit}>
            Dashboard
          </Button>
        </div>
      </Card>

      {/* stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Score" value={result.score} sub="out of 30" />
        <StatCard label="Percentage" value={`${result.percentage}%`} sub="IBA-style scaled" accent="#0ea5e9" />
        <StatCard
          label="Accuracy"
          value={`${result.accuracy}%`}
          sub="of attempted"
          accent="#22c55e"
        />
        <StatCard label="Time used" value={formatTime(timeUsed)} sub={mode === 'speed' ? '25:00 limit' : '30:00 limit'} accent="#f59e0b" />
      </div>

      {/* charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-700">Results breakdown</h3>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {pieData.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-700">Accuracy by topic</h3>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byTopic} layout="vertical" margin={{ left: 30, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="topic" width={90} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="pct" name="Accuracy %" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* weak topics */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-700">
          Weak topics in this mock {weakTopics.length > 0 && <Badge color="red">below 70% — drill these in Tier 1</Badge>}
        </h3>
        {weakTopics.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No topic fell below 70% in this mock. 🎉</p>
        ) : (
          <div className="mt-3 space-y-3">
            {weakTopics.map((t) => (
              <div key={t.topic} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm font-medium text-slate-700">{t.topic}</span>
                <div className="flex-1">
                  <ProgressBar value={t.pct} color="#ef4444" height={6} />
                </div>
                <span className="text-xs text-slate-500 tnum">
                  {t.correct}/{t.total} correct
                </span>
              </div>
            ))}
          </div>
        )}
        {/* difficulty breakdown */}
        <h3 className="mt-5 text-sm font-semibold text-slate-700">Accuracy by difficulty</h3>
        <div className="mt-3 space-y-3">
          {byDifficulty.map((d) => (
            <div key={d.difficulty} className="flex items-center gap-3">
              <Badge color={difficultyColor(d.difficulty)}>{d.difficulty}</Badge>
              <div className="flex-1">
                <ProgressBar
                  value={Math.round((d.correct / d.total) * 100)}
                  color={d.difficulty === 'easy' ? '#22c55e' : d.difficulty === 'medium' ? '#f59e0b' : '#ef4444'}
                  height={6}
                />
              </div>
              <span className="text-xs text-slate-500 tnum">
                {d.correct}/{d.total} correct
              </span>
            </div>
          ))}
        </div>

        {slowest.length > 0 && (
          <>
            <h3 className="mt-5 text-sm font-semibold text-slate-700">Slowest questions</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-500">
              {slowest.map((s) => (
                <li key={s.i} className="tnum">
                  Q{s.i + 1} — {formatTime(s.time)} · {s.topic} ({s.difficulty}) ·{' '}
                  {s.result === 'correct' ? '✓' : s.result === 'wrong' ? '✗' : '— blank'}
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {/* answer key */}
      {showReview && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">📋 Answer Key & Explanations</h2>
          {result.perQuestion.map((pq, i) => {
            const q = getQuestion(pq.id)
            const yours = record.answers[i] // selected option text (or null)
            const icon = pq.result === 'correct' ? '✅' : pq.result === 'wrong' ? '❌' : '⬜'
            return (
              <Card key={pq.id} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className="text-sm font-semibold text-slate-700">Q{i + 1}</span>
                  <Badge color={topicColor(q.topic)}>{q.topic}</Badge>
                  <Badge color={difficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                  <span className="ml-auto text-xs text-slate-400 tnum">
                    {formatTime(record.timePerQuestion[i] || 0)}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-slate-800">{q.q}</p>
                <div className="mt-3 space-y-1.5 text-sm">
                  {q.options.map((opt, oi) => (
                    <div
                      key={oi}
                      className={`rounded-lg px-3 py-1.5 ${
                        oi === q.answer
                          ? 'bg-emerald-50 font-medium text-emerald-800'
                          : opt === yours
                            ? 'bg-red-50 text-red-700'
                            : 'text-slate-600'
                      }`}
                    >
                      {LETTERS[oi]}. {opt}
                      {oi === q.answer && <span className="ml-2">✓ correct</span>}
                      {opt === yours && oi !== q.answer && <span className="ml-2">← your answer</span>}
                    </div>
                  ))}
                </div>
                {yours == null && (
                  <p className="mt-2 text-xs text-slate-400">⬜ You left this question blank (scored 0).</p>
                )}
                <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                  {q.explanation}
                </div>
                <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  <span className="font-semibold">Common mistake: </span>
                  {q.mistake}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
