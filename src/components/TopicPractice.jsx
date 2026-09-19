// Tier 1 setup screen: pick a topic manually or upload a Capstone lecture PDF
// and let the analyzer map it to practice topics.

import { useState } from 'react'
import { TOPICS, TOPIC_META } from '../data/questions'
import { getTopicStats } from '../utils/scorer'
import { analyzePdf } from '../utils/pdfParser'
import { DIFFICULTY_PROFILES } from '../utils/questionEngine'
import { getSettings, saveSettings } from '../utils/storage'
import { Badge, Button, Card, ProgressBar, EmptyState } from './ui'

export default function TopicPractice({ onStartSet, onReviewWeak }) {
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)
  const [stats, _] = useState(() => getTopicStats())
  const [profile, setProfile] = useState(() => getSettings().profile || 'iba')
  const [setSize, setSetSize] = useState(() => getSettings().setSize || '16')

  function chooseProfile(key) {
    setProfile(key)
    saveSettings({ profile: key })
  }

  function chooseSize(key) {
    setSetSize(key)
    saveSettings({ setSize: key })
  }

  const activeProfile = DIFFICULTY_PROFILES[profile]

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setAnalysis(null)
    setAnalyzing(true)
    setProgress('Reading PDF…')
    try {
      const result = await analyzePdf(file, (i, total) =>
        setProgress(`Extracting text — page ${i} of ${total}…`)
      )
      setAnalysis(result)
      saveSettings({ lastPdfFile: file.name })
    } catch (err) {
      console.error(err)
      setError('Could not read this PDF. It may be corrupted or password-protected.')
    } finally {
      setAnalyzing(false)
      setProgress(null)
      e.target.value = ''
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Tier 1 — Topic Practice</h1>
        <p className="mt-1 text-sm text-slate-500">
          Master each topic before full mocks. Every set: 16 questions at IBA / GMAT 650+ standard,
          with two attempts and full explanations.
        </p>
      </header>

      {/* difficulty profile choice */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-700">Difficulty level</h2>
        <p className="mt-0.5 text-xs text-slate-400">IBA doesn&apos;t do easy questions — the default mirrors the real paper.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {Object.entries(DIFFICULTY_PROFILES).map(([key, p]) => (
            <button
              key={key}
              onClick={() => chooseProfile(key)}
              className={`rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                profile === key
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 bg-white hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">{p.label}</span>
                {key === 'iba' && <Badge color="indigo">Recommended</Badge>}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* set size choice */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-700">Set size</h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Full marathon serves EVERY question allowed by your difficulty level — finish it and you&apos;ve
          covered the whole topic.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => chooseSize('16')}
            className={`rounded-xl border-2 px-4 py-3 text-left transition-colors ${
              setSize === '16'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-slate-200 bg-white hover:border-indigo-300'
            }`}
          >
            <span className="text-sm font-semibold text-slate-800">Standard set — 16 questions</span>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              A quick daily set, weighted to what you haven&apos;t seen yet.
            </p>
          </button>
          <button
            onClick={() => chooseSize('all')}
            className={`rounded-xl border-2 px-4 py-3 text-left transition-colors ${
              setSize === 'all'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-slate-200 bg-white hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">🏃 Full marathon</span>
              <Badge color="green">Complete coverage</Badge>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Every bank question + every question type in the topic. Reach 100% coverage and the topic
              holds no surprises.
            </p>
          </button>
        </div>
      </Card>

      {/* PDF upload */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-800">📄 Upload a Capstone lecture PDF</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              The analyzer extracts the text and detects which topics the lecture covers, then you start
              a practice set for that topic.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            {analyzing ? 'Analyzing…' : 'Choose PDF'}
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFile} disabled={analyzing} />
          </label>
        </div>

        {analyzing && (
          <div className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
            <span className="animate-pulse">{progress || 'Working…'}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        {analysis && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">{analysis.fileName}</span>
              <Badge>{analysis.numPages} pages</Badge>
              <Badge>{analysis.textLength.toLocaleString()} chars extracted</Badge>
            </div>
            {analysis.ok ? (
              <div className="mt-3">
                <p className="text-sm font-medium text-slate-700">Detected topics (strongest first):</p>
                <div className="mt-2 space-y-2">
                  {analysis.detected.length === 0 && (
                    <p className="text-sm text-slate-500">
                      No strong topic signals found — pick a topic manually below.
                    </p>
                  )}
                  {analysis.detected.slice(0, 4).map((d, i) => (
                    <div key={d.topic} className="flex flex-wrap items-center gap-3">
                      <span className="w-40 shrink-0 text-sm font-medium text-slate-700">
                        {i === 0 && '⭐ '}{d.topic}
                      </span>
                      <div className="min-w-32 flex-1">
                        <ProgressBar value={Math.min(100, (d.score / analysis.detected[0].score) * 100)} height={6} />
                      </div>
                      <span className="text-xs text-slate-500">{d.score} keyword hits</span>
                      <Button
                        variant="primary"
                        className="!px-3 !py-1.5 text-xs"
                        onClick={() => onStartSet(d.topic, profile, setSize)}
                      >
                        Practice {d.topic}
                      </Button>
                    </div>
                  ))}
                </div>
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs text-slate-400 hover:text-slate-600">
                    Show extracted text preview
                  </summary>
                  <p className="mt-2 max-h-40 overflow-y-auto rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-500">
                    {analysis.preview}…
                  </p>
                </details>
              </div>
            ) : (
              <p className="mt-2 text-sm text-red-600">{analysis.error}</p>
            )}
          </div>
        )}
      </Card>

      {/* manual topic grid */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Or choose a topic</h2>
          <span className="text-xs text-slate-400">Mastery updates after every set</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => {
            const s = stats[topic]
            const statusColor = s.attempted === 0 ? 'slate' : s.mastery >= 70 ? 'green' : 'red'
            return (
              <Card key={topic} className="flex flex-col p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                    style={{ backgroundColor: `${TOPIC_META[topic].color}18`, color: TOPIC_META[topic].color }}
                  >
                    {TOPIC_META[topic].icon}
                  </div>
                  <Badge color={statusColor}>{s.status}</Badge>
                </div>
                <h3 className="mt-3 font-semibold text-slate-800">{topic}</h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500">
                  {TOPIC_META[topic].desc}
                </p>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>Mastery</span>
                    <span className="tnum">{s.attempted > 0 ? `${s.mastery}%` : '—'}</span>
                  </div>
                  <ProgressBar value={s.mastery} color={TOPIC_META[topic].color} />
                  <div className="mt-2 mb-1 flex justify-between text-xs text-slate-500">
                    <span>Coverage</span>
                    <span className="tnum">{s.coverageDone}/{s.coverageTotal} ({s.coveragePct}%)</span>
                  </div>
                  <ProgressBar value={s.coveragePct} color="#94a3b8" height={5} />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1 !py-2" onClick={() => onStartSet(topic, profile, setSize)}>
                    {setSize === 'all' ? '🏃 Full marathon' : 'Practice set'}
                  </Button>
                  {s.attempted > 0 && s.mastery < 70 && (
                    <Button variant="secondary" className="!py-2" onClick={() => onReviewWeak(topic)}>
                      Weak Qs
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {stats && Object.values(stats).every((s) => s.attempted === 0) && (
        <EmptyState
          icon="🧠"
          title="How practice works"
          body="Each question gives you 2 attempts. The first attempt tells you right/wrong only; the second attempt unlocks the full worked solution. No timer — focus on understanding."
        />
      )}
    </div>
  )
}
