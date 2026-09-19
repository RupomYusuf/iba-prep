import { useState } from 'react'
import Dashboard from './components/Dashboard'
import TopicPractice from './components/TopicPractice'
import PracticeRunner from './components/PracticeRunner'
import WeakDrill from './components/WeakDrill'
import MockExam from './components/MockExam'
import { buildPracticeSet } from './utils/questionEngine'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'practice', label: 'Topic Practice', icon: '📚' },
  { id: 'mock', label: 'Mock Exam', icon: '⏱️' },
]

export default function App() {
  const [view, setView] = useState('dashboard')
  const [session, setSession] = useState(null) // { topic, questions } or { weakTopic }

  function startSet(topic, profile = 'iba') {
    setSession({ topic, questions: buildPracticeSet(topic, 16, Date.now(), profile) })
    setView('runner')
  }

  function startWeak(topic) {
    setSession({ weakTopic: topic })
    setView('weak')
  }

  function goHome() {
    setSession(null)
    setView('dashboard')
  }

  return (
    <div className="min-h-screen">
      {/* top nav */}
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button onClick={goHome} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
              IBA
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-bold leading-tight text-slate-800">MBA Exam Prep</span>
              <span className="block text-[11px] leading-tight text-slate-400">Mathematics & Analytical Ability</span>
            </span>
          </button>
          <div className="flex gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setSession(null)
                  setView(n.id)
                }}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  view === n.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <span className="mr-1.5">{n.icon}</span>
                <span className="hidden sm:inline">{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {view === 'dashboard' && (
          <Dashboard onNavigate={setView} onPracticeTopic={startSet} onReviewWeak={startWeak} />
        )}
        {view === 'practice' && <TopicPractice onStartSet={startSet} onReviewWeak={startWeak} />}
        {view === 'runner' && session?.questions && (
          <PracticeRunner topic={session.topic} questions={session.questions} onExit={goHome} />
        )}
        {view === 'weak' && session?.weakTopic && <WeakDrill topic={session.weakTopic} onExit={goHome} />}
        {view === 'mock' && <MockExam onExit={goHome} />}
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        Built for the IBA MBA entrance · +1 correct · −0.25 wrong · 0 blank · GMAT 650+ standard ·
        all progress is stored locally in your browser
      </footer>
    </div>
  )
}
