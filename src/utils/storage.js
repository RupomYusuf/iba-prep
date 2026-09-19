// Persistence layer — browser localStorage. All state derives from these records.

const PREFIX = 'iba-prep:v1:'

export const KEYS = {
  practice: PREFIX + 'practice', // { [questionId]: { attempts: [idx,...], ts } }
  flags: PREFIX + 'flags', // { [questionId]: true }
  mocks: PREFIX + 'mocks', // [ mockRecord, ... ]
  settings: PREFIX + 'settings', // { name, lastPdfFile }
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    // storage full or blocked (private mode) — app still works for the session
    console.warn('localStorage write failed', e)
  }
}

// ---------- practice attempts ----------
// attempts: array of selected option indices, one per attempt (max 2)

export function getPractice() {
  return read(KEYS.practice, {})
}

export function recordAttempt(questionId, choiceIdx) {
  const all = getPractice()
  const rec = all[questionId] || { attempts: [], ts: 0 }
  if (rec.attempts.length < 2) {
    rec.attempts.push(choiceIdx)
    rec.ts = Date.now()
    all[questionId] = rec
    write(KEYS.practice, all)
  }
  return rec
}

export function getAttempts(questionId) {
  return (getPractice()[questionId] || { attempts: [] }).attempts
}

export function resetPractice() {
  write(KEYS.practice, {})
  write(KEYS.flags, {})
}

// ---------- flags ----------

export function getFlags() {
  return read(KEYS.flags, {})
}

export function toggleFlag(questionId) {
  const flags = getFlags()
  if (flags[questionId]) delete flags[questionId]
  else flags[questionId] = true
  write(KEYS.flags, flags)
  return !!flags[questionId]
}

// ---------- mocks ----------

export function getMocks() {
  return read(KEYS.mocks, [])
}

export function saveMock(mockRecord) {
  const mocks = getMocks()
  mocks.push(mockRecord)
  write(KEYS.mocks, mocks)
  return mocks
}

export function deleteMock(id) {
  const mocks = getMocks().filter((m) => m.id !== id)
  write(KEYS.mocks, mocks)
  return mocks
}

// ---------- settings ----------

export function getSettings() {
  return read(KEYS.settings, {})
}

export function saveSettings(patch) {
  const s = { ...getSettings(), ...patch }
  write(KEYS.settings, s)
  return s
}

export function resetAll() {
  Object.values(KEYS).forEach((k) => {
    try {
      localStorage.removeItem(k)
    } catch {
      /* noop */
    }
  })
}
