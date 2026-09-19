// Dashboard — quick stats, topic progress, mock history, weak areas, recommendations

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine,
} from 'recharts'
import { getDashboardStats, getRecommendations, formatTime } from '../utils/scorer'
import { TOPIC_META } from '../data/questions'
import { exportMockHistoryCsv, exportProgressCsv, exportTopicSummaryCsv } from '../utils/exporter'
import { Badge, Button, Card, EmptyState, ProgressBar, StatCard } from './ui'

export default function Dashboard({ onNavigate, onReviewWeak }) {
  const stats = getDashboardStats()
  const recs = getRecommendations()

  const chartData = stats.mocks.map((m, i) => ({
    name: `#${i + 1}`,
    score: m.result.score,
    pct: m.result.percentage,
    mode: m.mode,
  }))

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            45 days to the IBA MBA exam — weeks 1–4 topic mastery, weeks 5–6 full mocks, final week speedruns.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('practice')}>Start topic practice</Button>
          <Button variant="secondary" onClick={() => onNavigate('mock')}>
            Mock exam
          </Button>
        </div>
      </header>

      {/* quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label="Topics Mastered"
          value={`${stats.topicsCompleted}/${stats.totalTopics}`}
          sub="90%+ mastery"
        />
        <StatCard label="Practice Qs Solved" value={stats.practiceQuestionsSolved} sub="unique questions" accent="#0ea5e9" />
        <StatCard label="Mocks Taken" value={stats.totalMocks} accent="#8b5cf6" />
        <StatCard label="Best Score" value={stats.bestScore ?? '—'} sub="out of 30" accent="#22c55e" />
        <StatCard label="Average Score" value={stats.averageScore ?? '—'} sub="across all mocks" accent="#f59e0b" />
      </div>

      {/* weak areas */}
      {stats.weakTopics.length > 0 && (
        <Card className="border-red-200 bg-red-50/60 p-5">
          <h2 className="text-sm font-semibold text-red-800">⚠️ Weak areas (below 70%) — targeted drilling recommended</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {stats.weakTopics.map((t) => (
              <div key={t.topic} className="flex items-center gap-3 rounded-xl bg-white p-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{t.topic}</span>
                    <span className="tnum text-red-600">{t.mastery}%</span>
                  </div>
                  <div className="mt-1">
                    <ProgressBar value={t.mastery} color="#ef4444" height={6} />
                  </div>
                </div>
                <Button variant="secondary" className="!px-3 !py-1.5 text-xs" onClick={() => onReviewWeak(t.topic)}>
                  Drill
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* recommendations */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-700">🤖 Study recommendations</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
          {recs.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-indigo-400">▸</span>
              {r}
            </li>
          ))}
        </ul>
      </Card>

      {/* progress by topic */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-700">Progress by topic</h2>
        <div className="mt-3 space-y-4">
          {Object.values(stats.topicStats).map((t) => (
            <div key={t.topic} className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
              <div className="flex w-full items-center gap-2 sm:w-44">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
                  style={{ backgroundColor: `${TOPIC_META[t.topic].color}18`, color: TOPIC_META[t.topic].color }}
                >
                  {TOPIC_META[t.topic].icon}
                </span>
                <span className="text-sm font-medium text-slate-700">{t.topic}</span>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <div className="flex-1">
                  <ProgressBar value={t.mastery} color={TOPIC_META[t.topic].color} height={6} />
                </div>
                <span className="w-40 shrink-0 text-xs text-slate-500 tnum">
                  {t.coverageDone}/{t.coverageTotal} covered · {t.firstTryPct}% 1st try
                </span>
                <Badge
                  color={
                    t.status === 'Mastered' ? 'green' : t.status === 'On Track' ? 'sky' : t.status === 'Weak' ? 'red' : 'slate'
                  }
                >
                  {t.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* mock history */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Mock exam history</h2>
          {stats.mocks.length > 0 && (
            <Button variant="ghost" className="!px-2 !py-1 text-xs" onClick={exportMockHistoryCsv}>
              ⬇ Export CSV
            </Button>
          )}
        </div>
        {stats.mocks.length === 0 ? (
          <EmptyState
            icon="⏱️"
            title="No mocks yet"
            body="After mastering a few topics, take your first full 30-question mock to calibrate your pace."
          >
            <Button onClick={() => onNavigate('mock')}>Start a mock</Button>
          </EmptyState>
        ) : (
          <>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 30]} />
                  <Tooltip
                    formatter={(value, name) => [value, name === 'score' ? 'Score' : 'Percentage']}
                    labelFormatter={(label, payload) =>
                      payload?.[0]
                        ? `Mock ${label} (${payload[0].payload.mode === 'speed' ? 'Speedrun' : 'Real Pace'})`
                        : label
                    }
                  />
                  <ReferenceLine y={24} stroke="#22c55e" strokeDasharray="4 4" label="80% target" />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Mode</th>
                    <th className="py-2 pr-4">Score</th>
                    <th className="py-2 pr-4">%</th>
                    <th className="py-2 pr-4">Time used</th>
                    <th className="py-2 pr-4">Weak areas</th>
                  </tr>
                </thead>
                <tbody>
                  {[...stats.mocks].reverse().slice(0, 10).map((m) => {
                    const weak = Object.entries(
                      m.result.perQuestion.reduce((acc, pq) => {
                        acc[pq.topic] = acc[pq.topic] || { c: 0, t: 0 }
                        acc[pq.topic].t++
                        if (pq.result === 'correct') acc[pq.topic].c++
                        return acc
                      }, {})
                    )
                      .filter(([, v]) => v.c / v.t < 0.7)
                      .map(([k]) => k)
                    return (
                      <tr key={m.id} className="border-b border-slate-100 last:border-0">
                        <td className="py-2 pr-4 text-slate-600">{new Date(m.date).toLocaleDateString()}</td>
                        <td className="py-2 pr-4">
                          <Badge color={m.mode === 'speed' ? 'violet' : 'indigo'}>
                            {m.mode === 'speed' ? 'Speedrun' : 'Real Pace'}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 font-semibold tnum text-slate-800">{m.result.score}</td>
                        <td className="py-2 pr-4 tnum text-slate-600">{m.result.percentage}%</td>
                        <td className="py-2 pr-4 tnum text-slate-600">{formatTime(m.timeUsed)}</td>
                        <td className="py-2 pr-4 text-xs text-slate-500">{weak.length ? weak.join(', ') : '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>

      {/* exports */}
      <Card className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-700">Export your data</h2>
          <p className="text-xs text-slate-500">Track progress offline or share with your Capstone mentor.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="!py-2 text-xs" onClick={exportProgressCsv}>
            ⬇ Practice log
          </Button>
          <Button variant="secondary" className="!py-2 text-xs" onClick={exportTopicSummaryCsv}>
            ⬇ Topic summary
          </Button>
          <Button variant="secondary" className="!py-2 text-xs" onClick={exportMockHistoryCsv}>
            ⬇ Mock history
          </Button>
        </div>
      </Card>
    </div>
  )
}
