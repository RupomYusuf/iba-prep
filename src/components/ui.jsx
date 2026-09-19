// Small shared UI primitives

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function Badge({ children, color = 'slate' }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-600',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    sky: 'bg-sky-100 text-sky-700',
    pink: 'bg-pink-100 text-pink-700',
    violet: 'bg-violet-100 text-violet-700',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color] || colors.slate}`}>
      {children}
    </span>
  )
}

export function ProgressBar({ value, color = '#6366f1', height = 8 }) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-slate-200" style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
      />
    </div>
  )
}

export function StatCard({ label, value, sub, accent = '#6366f1' }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tnum" style={{ color: accent }}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </Card>
  )
}

export function Button({ children, onClick, variant = 'primary', disabled, className = '', type = 'button' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function difficultyColor(d) {
  return d === 'easy' ? 'green' : d === 'medium' ? 'amber' : 'red'
}

export function topicColor(topic) {
  const map = {
    Algebra: 'indigo',
    Arithmetic: 'sky',
    Geometry: 'amber',
    'Word Problems': 'green',
    'Set Theory': 'pink',
    Probability: 'violet',
  }
  return map[topic] || 'slate'
}

export function EmptyState({ icon = '📚', title, body, children }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 px-6 py-14 text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold text-slate-700">{title}</h3>
      {body && <p className="mt-1 max-w-md text-sm text-slate-500">{body}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  )
}
