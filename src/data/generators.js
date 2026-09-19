// Dynamic question generators — parameterized templates that compute a fresh
// question (numbers, answer, computed distractors, worked explanation) at
// runtime. Every generator is medium or hard — GMAT / IBA standard, no easy
// fillers (the handful of 'easy' ones exist only for the Foundation profile).

import { makeRng } from '../utils/questionEngine'

// ---------- helpers ----------

const ri = (rng, min, max) => min + Math.floor(rng() * (max - min + 1))
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)]

function gcd(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a
}

function frac(n, d) {
  const g = gcd(n, d) || 1
  const sign = d < 0 ? '-' : ''
  return `${sign}${Math.abs(n) / g}/${Math.abs(d) / g}`
}

// build the option row: correct answer + 3 unique distractors
function opts(rng, correct, distractors) {
  const seen = new Set([String(correct)])
  const uniq = []
  for (let d of distractors) {
    d = String(d)
    if (!seen.has(d)) {
      seen.add(d)
      uniq.push(d)
    }
  }
  let bump = 1
  while (uniq.length < 3) {
    const base = Number(correct)
    const n = Number.isFinite(base) ? String(base + bump) : String(correct) + '′'.repeat(bump)
    if (!seen.has(n)) {
      seen.add(n)
      uniq.push(n)
    }
    bump++
  }
  const all = [String(correct), ...uniq]
  // shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[all[i], all[j]] = [all[j], all[i]]
  }
  return { options: all, answer: all.indexOf(String(correct)) }
}

// signed term like "+ 5" / "− 7"
const st = (n) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`)

let seq = 0

function make(id, topic, subtopic, difficulty, build) {
  return function generate(seed) {
    const rng = makeRng(seed)
    const b = build(rng)
    const { options, answer } = opts(rng, b.correct, b.distractors)
    return {
      id: `gen-${id}:${seed}:${seq++}`,
      templateId: `gen-${id}`,
      topic,
      subtopic,
      difficulty,
      q: b.q,
      options,
      answer,
      explanation: b.explanation,
      concepts: b.concepts,
      mistake: b.mistake,
    }
  }
}

// ================= ALGEBRA =================

const algLinear = make('alg-lin', 'Algebra', 'Linear Equations', 'medium', (rng) => {
  const a = ri(rng, 3, 9)
  const x = ri(rng, 3, 14)
  const b = ri(rng, -19, 19)
  const c = a * x + b
  return {
    q: `If ${a}x ${st(b)} = ${c}, what is the value of x?`,
    correct: x,
    distractors: [x + 1, x - 1, c - b],
    explanation: `Isolate x: ${a}x = ${c} ${b < 0 ? '+' : '−'} ${Math.abs(b)} = ${a * x}. Then x = ${a * x} / ${a} = ${x}.`,
    concepts: ['Solving one-variable linear equations'],
    mistake: 'Adding b instead of subtracting it, or dividing only one side by the coefficient.',
  }
})

const algSystem = make('alg-sys', 'Algebra', 'Systems of Equations', 'medium', (rng) => {
  const x = ri(rng, 4, 12)
  const y = ri(rng, 2, 9)
  const S = x + y
  const D = x - y
  return {
    q: `If x + y = ${S} and x − y = ${D}, what is the value of xy?`,
    correct: x * y,
    distractors: [S * D, S, S - D],
    explanation: `Adding the equations: 2x = ${2 * S - (S - D) - D + D} … directly: x = (${S} + ${D})/2 = ${x}, y = (${S} − ${D})/2 = ${y}. xy = ${x * y}.`,
    concepts: ['Elimination method for simultaneous equations'],
    mistake: 'Finding x + y and x − y but stopping before computing the product.',
  }
})

const algVieta = make('alg-vieta', 'Algebra', 'Quadratic Equations', 'hard', (rng) => {
  const r1 = ri(rng, 2, 9)
  let r2 = ri(rng, 2, 9)
  if (r2 === r1) r2 = r1 + 1
  const [lo, hi] = [Math.min(r1, r2), Math.max(r1, r2)]
  return {
    q: `One root of x² − ${hi + lo}x + ${hi * lo} = 0 is ${lo}. What is the other root?`,
    correct: hi,
    distractors: [hi + 2, lo, hi * lo - lo],
    explanation: `Sum of roots = ${hi + lo} (coefficient of x, sign flipped). Other root = ${hi + lo} − ${lo} = ${hi}. (Check: product ${hi * lo} ✓.)`,
    concepts: ['Vieta\'s formulas', 'Recovering a root from the sum'],
    mistake: 'Using the constant term as the sum instead of the coefficient of x.',
  }
})

const algAbs = make('alg-abs', 'Algebra', 'Absolute Value', 'medium', (rng) => {
  const a = pick(rng, [2, 4])
  const x1 = ri(rng, 0, 4)
  const gap = ri(rng, 2, 5)
  const x2 = x1 + gap
  const b = a * x1 + (a * gap) / 2
  const c = (a * gap) / 2
  return {
    q: `If |${a}x − ${b}| = ${c}, what is the sum of all possible values of x?`,
    correct: x1 + x2,
    distractors: [x2, b + c, x1 + x2 + 1],
    explanation: `Two cases: ${a}x − ${b} = ${c} → x = ${x2}; ${a}x − ${b} = −${c} → x = ${x1}. Sum = ${x1 + x2}. (Shortcut: the sum of solutions of |ax − b| = c is 2b/a = ${x1 + x2}.)`,
    concepts: ['Absolute value equations produce two cases'],
    mistake: 'Solving only the positive case and giving the larger root.',
  }
})

const algComp = make('alg-comp', 'Algebra', 'Functions', 'hard', (rng) => {
  const a = ri(rng, 2, 4)
  const b = ri(rng, 1, 5)
  const c = ri(rng, 1, 6)
  const k = ri(rng, 2, 4)
  const fk = a * k + b
  return {
    q: `If f(x) = ${a}x ${st(b)} and g(x) = x² ${st(c)}, what is g(f(${k}))?`,
    correct: fk * fk + c,
    distractors: [fk * fk, (k * k + c) * a + b, fk * fk - c],
    explanation: `f(${k}) = ${a}(${k}) ${st(b)} = ${fk}. Then g(${fk}) = ${fk}² ${st(c)} = ${fk * fk} ${st(c)} = ${fk * fk + c}.`,
    concepts: ['Composite functions'],
    mistake: 'Computing f(g(k)) instead of g(f(k)), or dropping the +c.',
  }
})

// ================= ARITHMETIC =================

const ariRevPct = make('ari-rpct', 'Arithmetic', 'Percentages', 'medium', (rng) => {
  const p = pick(rng, [20, 25, 40, 60, 75, 80])
  const N = ri(rng, 4, 30) * 20
  const M = (N * p) / 100
  return {
    q: `If ${p}% of a number is ${M}, what is the number?`,
    correct: N,
    distractors: [Math.round((M * p) / 100) || M + 10, Math.round(M / (p / 100) / 2) * 2 || N + 20, N + p],
    explanation: `${p}% = ${p / 100}. So 0.${p} × N = ${M} → N = ${M} ÷ ${p / 100} = ${N}.`,
    concepts: ['Reverse percentage problems'],
    mistake: 'Multiplying M by the percent instead of dividing.',
  }
})

const ariSucc = make('ari-succ', 'Arithmetic', 'Percentages', 'medium', (rng) => {
  const combos = [
    [10, 10, -1], [20, 10, 8], [25, 20, 0], [50, 40, -10], [20, 50, -40], [10, 20, -12], [25, 40, -25],
  ]
  const [a, b, net] = pick(rng, combos)
  const label = net === 0 ? 'No net change' : net > 0 ? `${net}% increase` : `${-net}% decrease`
  return {
    q: `A quantity increases by ${a}% and then decreases by ${b}%. What is the net change?`,
    correct: label,
    distractors: [net === 0 ? `${a - b}% increase` : `${Math.abs(a - b)}% ${a > b ? 'increase' : 'decrease'}`, `${a + b}% ${a > b ? 'increase' : 'decrease'}`, `${a}% increase`],
    explanation: `Multiply the factors: (1 ${st(a / 100)}) × (1 ${st(-b / 100)}) = ${((1 + a / 100) * (1 - b / 100)).toFixed(2)} → net ${net === 0 ? '0% (no change)' : (net > 0 ? '+' : '') + net + '%'}.`,
    concepts: ['Successive percentage change: multiply factors'],
    mistake: `Adding ${a}% and −${b}% instead of multiplying the factors.`,
  }
})

const ariAvg = make('ari-avg', 'Arithmetic', 'Averages', 'medium', (rng) => {
  const n = ri(rng, 5, 8)
  const B = ri(rng, 8, 18)
  const A = ri(rng, B + 2, B + 12)
  const R = n * A - (n - 1) * B
  return {
    q: `The average of ${n} numbers is ${A}. If one number is removed, the average of the remaining ${n - 1} numbers is ${B}. What number was removed?`,
    correct: R,
    distractors: [A - B, A, R - n],
    explanation: `Original sum = ${n} × ${A} = ${n * A}. New sum = ${n - 1} × ${B} = ${(n - 1) * B}. Removed = ${n * A} − ${(n - 1) * B} = ${R}.`,
    concepts: ['Working with sums from averages'],
    mistake: 'Averaging the averages instead of subtracting the sums.',
  }
})

const ariRatio = make('ari-ratio', 'Arithmetic', 'Ratio & Proportion', 'medium', (rng) => {
  const a = ri(rng, 2, 9)
  const b = ri(rng, a + 1, 10)
  const k = ri(rng, 3, 12)
  const T = (a + b) * k
  return {
    q: `Two numbers are in the ratio ${a} : ${b} and their sum is ${T}. What is the larger number?`,
    correct: b * k,
    distractors: [a * k, T, (b - 1) * k],
    explanation: `Parts = ${a} + ${b} = ${a + b}, each part = ${T} ÷ ${a + b} = ${k}. Larger = ${b} × ${k} = ${b * k}.`,
    concepts: ['Dividing in a given ratio'],
    mistake: 'Giving the smaller share, or taking b/(a+b) of the total incorrectly.',
  }
})

const ariCi = make('ari-ci', 'Arithmetic', 'Interest', 'hard', (rng) => {
  const P = pick(rng, [8000, 10000, 12000, 20000])
  const r = pick(rng, [5, 10, 20])
  const diff = (P * r * r) / 10000
  return {
    q: `What is the difference between compound interest and simple interest on Tk ${P} at ${r}% per year for 2 years?`,
    correct: diff,
    distractors: [(P * r * 2) / 100, diff * 2, (P * r) / 100],
    explanation: `Difference for 2 years = P(r/100)² = ${P} × ${r * r}/10000 = Tk ${diff}. (SI = Tk ${(P * r * 2) / 100}; CI = Tk ${(P * (100 + r) ** 2) / 10000 - P}.)`,
    concepts: ['CI − SI for 2 years = P(r/100)²'],
    mistake: 'Computing the SI instead of the difference between the two.',
  }
})

// ================= GEOMETRY =================

const geoTriangle = make('geo-tri', 'Geometry', 'Triangles', 'medium', (rng) => {
  const hyp = pick(rng, [10, 13, 15, 17, 25, 26])
  const triples = { 10: [6, 8], 13: [5, 12], 15: [9, 12], 17: [8, 15], 25: [7, 24], 26: [10, 24] }
  const [l1, l2] = triples[hyp]
  if (rng() > 0.5) {
    return {
      q: `A right triangle has legs ${l1} and ${l2}. What is its area?`,
      correct: (l1 * l2) / 2,
      distractors: [l1 * l2, (hyp * l1) / 2, l1 + l2],
      explanation: `It's a right triangle (a ${l1}-${l2}-${hyp} triple). Area = ½ × ${l1} × ${l2} = ${(l1 * l2) / 2}.`,
      concepts: ['Pythagorean triples', 'Area of a right triangle'],
      mistake: 'Using the hypotenuse as a leg in the area formula.',
    }
  }
  return {
    q: `A right triangle has hypotenuse ${hyp} and one leg ${l1}. What is the length of the other leg?`,
    correct: l2,
    distractors: [l2 + 1, hyp - l1, Math.round(Math.sqrt(hyp * hyp + l1 * l1))],
    explanation: `Other leg = √(${hyp}² − ${l1}²) = √${hyp * hyp - l1 * l1} = ${l2}.`,
    concepts: ['Pythagorean theorem'],
    mistake: 'Adding the squares instead of subtracting (using + when given the hypotenuse).',
  }
})

const geoCircle = make('geo-circ', 'Geometry', 'Circles', 'medium', (rng) => {
  // r >= 3, r != 4 keeps area (r^2), circumference (2r) and 4r distractors distinct
  const r = pick(rng, [3, 5, 6, 7, 8, 9, 10, 11, 12])
  return {
    q: `The area of a circle is ${r * r}π. What is its circumference?`,
    correct: `${2 * r}π`,
    distractors: [`${r * r}π`, `${r}π`, `${4 * r}π`],
    explanation: `πr² = ${r * r}π → r = ${r}. Circumference = 2πr = ${2 * r}π.`,
    concepts: ['Working backwards from area to radius'],
    mistake: 'Answering the area, or using πr instead of 2πr.',
  }
})

const geoCoord = make('geo-coord', 'Geometry', 'Coordinate Geometry', 'medium', (rng) => {
  const x1 = ri(rng, -6, 4)
  const y1 = ri(rng, -5, 5)
  const triple = pick(rng, [
    [3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [12, 5, 13],
  ])
  const [dx, dy, d] = triple
  const x2 = x1 + dx
  const y2 = y1 + dy
  if (rng() > 0.5) {
    return {
      q: `What is the distance between (${x1}, ${y1}) and (${x2}, ${y2})?`,
      correct: d,
      distractors: [dx + dy, d + 2, Math.abs(x2 - x1)],
      explanation: `Δx = ${dx}, Δy = ${dy}. Distance = √(${dx}² + ${dy}²) = √${dx * dx + dy * dy} = ${d}.`,
      concepts: ['Distance formula', 'Pythagorean triples on the coordinate plane'],
      mistake: 'Adding Δx + Δy instead of using √(Δx² + Δy²).',
    }
  }
  return {
    q: `What is the midpoint of the segment joining (${x1}, ${y1}) and (${x2}, ${y2})?`,
    correct: `(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`,
    distractors: [`(${(x1 + x2) / 2 + 1}, ${(y1 + y2) / 2})`, `(${(x1 + x2) / 2}, ${(y1 + y2) / 2 + 1})`, `(${(x1 + x2) / 2 - 1}, ${(y1 + y2) / 2})`],
    explanation: `Midpoint = ((${x1} + ${x2})/2, (${y1} + ${y2})/2) = (${(x1 + x2) / 2}, ${(y1 + y2) / 2}).`,
    concepts: ['Midpoint formula'],
    mistake: 'Subtracting coordinates instead of averaging them.',
  }
})

const geoPoly = make('geo-poly', 'Geometry', 'Polygons', 'hard', (rng) => {
  const n = pick(rng, [5, 6, 8, 9, 10, 12])
  const interior = 180 - 360 / n
  if (rng() > 0.5) {
    return {
      q: `What is the measure of each interior angle of a regular polygon with ${n} sides?`,
      correct: `${interior}°`,
      distractors: [`${180 - interior}°`, `${Math.round((n - 2) * 180 / n) - 12}°`, `${interior + 10}°`],
      explanation: `Exterior angle = 360/${n} = ${360 / n}°, so each interior angle = 180 − ${360 / n} = ${interior}°.`,
      concepts: ['Exterior angle = 360°/n', 'Interior + exterior = 180°'],
      mistake: 'Giving the exterior angle instead of the interior angle.',
    }
  }
  return {
    q: `Each interior angle of a regular polygon measures ${interior}°. How many sides does it have?`,
    correct: n,
    distractors: [n - 1, n + 2, Math.round(360 / interior) || 3],
    explanation: `Exterior angle = 180 − ${interior} = ${360 / n}°. n = 360 ÷ ${360 / n} = ${n}.`,
    concepts: ['Exterior angle = 360°/n'],
    mistake: 'Dividing 360° by the interior angle instead of the exterior angle.',
  }
})

// ================= WORD PROBLEMS =================

const wrdWork = make('wrd-work', 'Word Problems', 'Work & Time', 'medium', (rng) => {
  const pairs = [[6, 12, 4], [10, 15, 6], [12, 24, 8], [9, 18, 6], [20, 30, 12], [15, 10, 6], [30, 20, 12]]
  const [a, b, t] = pick(rng, pairs)
  return {
    q: `A can finish a job in ${a} days and B can finish the same job in ${b} days. Working together, how long will they take?`,
    correct: t,
    distractors: [Math.round((a + b) / 2), a + b, t + 2],
    explanation: `Rates add: 1/${a} + 1/${b} = ${frac(a + b, a * b)} of the job per day. Time = ${a} × ${b} ÷ (${a} + ${b}) = ${t} days.`,
    concepts: ['Work rates add: 1/t = 1/a + 1/b'],
    mistake: 'Averaging the two times instead of adding the rates.',
  }
})

const wrdSpeed = make('wrd-speed', 'Word Problems', 'Speed & Distance', 'medium', (rng) => {
  const pairs = [[60, 40, 48], [90, 60, 72], [80, 120, 96], [40, 60, 48], [30, 90, 45], [120, 80, 96]]
  const [a, b, clean] = pick(rng, pairs)
  return {
    q: `A car travels from A to B at ${a} km/h and returns along the same route at ${b} km/h. What is its average speed for the whole trip?`,
    correct: clean,
    distractors: [Math.round((a + b) / 2), clean - 2, clean + 2],
    explanation: `Equal distances → average = 2ab/(a + b) = 2 × ${a} × ${b} / ${a + b} = ${clean} km/h.`,
    concepts: ['Harmonic mean for equal-distance round trips'],
    mistake: `Taking the simple average (${(a + b) / 2} km/h) — the trip spends more time at the slower speed.`,
  }
})

const wrdProfit = make('wrd-profit', 'Word Problems', 'Profit & Loss', 'medium', (rng) => {
  const combos = [[50, 20, 20], [60, 25, 20], [25, 10, 12.5], [80, 50, 170], [100, 40, 20]]
  const [m, d, p] = pick(rng, combos)
  const cp = pick(rng, [200, 400, 500, 800])
  const sp = cp * (1 + m / 100) * (1 - d / 100)
  return {
    q: `An item costing Tk ${cp} is marked up ${m}% and then sold at a ${d}% discount on the marked price. What is the profit or loss percent?`,
    correct: `${p}% profit`,
    distractors: [`${m - d}% profit`, `${m - d}% loss`, `${p}% loss`],
    explanation: `Marked price = ${cp} × ${1 + m / 100} = Tk ${cp * (1 + m / 100)}. SP = ${cp * (1 + m / 100)} × ${1 - d / 100} = Tk ${sp}. Profit% = ((${sp} − ${cp})/${cp}) × 100 = ${p}%.`,
    concepts: ['Mark-up then discount chain', 'Profit percent is on cost price'],
    mistake: `Computing net change as ${m}% − ${d}% instead of multiplying the factors.`,
  }
})

const wrdAge = make('wrd-age', 'Word Problems', 'Age Problems', 'hard', (rng) => {
  const tuples = [
    [10, 4, 20, 2], [12, 3, 6, 2], [15, 3, 15, 2], [5, 5, 5, 3], [9, 4, 9, 2.5], [20, 2, 10, 2.5],
  ]
  const [s, k, t, m] = pick(rng, tuples)
  const askFather = rng() > 0.5
  return {
    q: `A father is ${k} times as old as his son. In ${t} years, he will be ${m} times as old as his son. How old is the ${askFather ? 'father' : 'son'} now?`,
    correct: askFather ? k * s : s,
    distractors: [askFather ? s : k * s, (askFather ? k * s : s) + t, askFather ? k * s - t : s + t],
    explanation: `Let the son be ${s}: father = ${k * s}. In ${t} years: ${k * s + t} = ${m} × (${s} + ${t}) ✓. So the ${askFather ? 'father' : 'son'} is ${askFather ? k * s : s} now.`,
    concepts: ['Age problems across a time shift'],
    mistake: 'Applying the time shift to only one person, or answering the age in t years.',
  }
})

const wrdClock = make('wrd-clock', 'Word Problems', 'Clocks & Time', 'hard', (rng) => {
  const h = ri(rng, 1, 11)
  const m = pick(rng, [0, 10, 15, 20, 30, 40, 45])
  const raw = Math.abs(30 * h - 5.5 * m)
  const angle = Math.min(raw, 360 - raw)
  return {
    q: `What is the angle between the hands of a clock at ${h}:${String(m).padStart(2, '0')}?`,
    correct: `${angle}°`,
    distractors: [Math.abs(angle - 30), 180 - angle, angle + 30, angle + 15, angle + 45, angle + 60]
      .filter((v, i, arr) => v !== angle && arr.indexOf(v) === i)
      .slice(0, 3)
      .map((v) => `${v}°`),
    explanation: `Minute hand: ${m} × 6° = ${m * 6}°. Hour hand: ${h} × 30° + ${m} × 0.5° = ${h * 30 + m * 0.5}°. Angle = |${h * 30 + m * 0.5} − ${m * 6}| = ${raw}° → the smaller angle is ${angle}°.`,
    concepts: ['Hour hand 0.5°/min, minute hand 6°/min'],
    mistake: 'Ignoring the hour hand\'s 0.5°-per-minute drift, or reporting the reflex angle.',
  }
})

// ================= SET THEORY =================

const setTwoSet = make('set-two', 'Set Theory', 'Two-Set Venn', 'medium', (rng) => {
  const both = ri(rng, 3, 12)
  const aOnly = ri(rng, 4, 18)
  const bOnly = ri(rng, 4, 18)
  const neither = ri(rng, 0, 10)
  const A = aOnly + both
  const B = bOnly + both
  const variant = ri(rng, 0, 2)
  if (variant === 0) {
    const total = A + B - both + neither
    return {
      q: `In a group of ${total}: ${A} like tea, ${B} like coffee and ${both} like both. How many like neither?`,
      correct: neither,
      distractors: [neither + both, Math.max(0, total - (A + B)), total - A - B + 2 * both],
      explanation: `At least one = ${A} + ${B} − ${both} = ${A + B - both}. Neither = ${total} − ${A + B - both} = ${neither}.`,
      concepts: ['Inclusion–exclusion, then complement'],
      mistake: 'Forgetting to subtract the "both" overlap before taking the complement.',
    }
  }
  if (variant === 1) {
    return {
      q: `n(A) = ${A}, n(B) = ${B} and n(A ∩ B) = ${both}. How many elements are in exactly one of the two sets?`,
      correct: aOnly + bOnly,
      distractors: [A + B - both, A + B, aOnly + bOnly + both],
      explanation: `Exactly one = (A only) + (B only) = (${A} − ${both}) + (${B} − ${both}) = ${aOnly} + ${bOnly} = ${aOnly + bOnly}.`,
      concepts: ['Only-regions of a Venn diagram'],
      mistake: 'Answering n(A ∪ B) — that includes people in BOTH sets.',
    }
  }
  return {
    q: `n(A) = ${A}, n(B) = ${B} and n(A ∪ B) = ${A + B - both}. What is n(A ∩ B)?`,
    correct: both,
    distractors: [both + 2, A + B - (A + B - both) + 4, Math.abs(A - B)],
    explanation: `n(A ∩ B) = n(A) + n(B) − n(A ∪ B) = ${A} + ${B} − ${A + B - both} = ${both}.`,
    concepts: ['Rearranging the inclusion–exclusion formula'],
    mistake: 'Adding the set sizes instead of subtracting the union.',
  }
})

const setThree = make('set-three', 'Set Theory', 'Three-Set Venn', 'hard', (rng) => {
  const t = ri(rng, 2, 6)
  const pairExtra = ri(rng, 0, 4)
  const ab = pairExtra + t
  const bc = ab
  const ac = pairExtra + t
  const a = ri(rng, 15, 30)
  const b = ri(rng, 15, 30)
  const c = ri(rng, 10, 25)
  const union = a + b + c - ab - bc - ac + t
  return {
    q: `n(A) = ${a}, n(B) = ${b}, n(C) = ${c}. Each pair overlaps in ${ab} elements, all three overlap in ${t} elements, and n(A ∪ B ∪ C) = ${union}. (Values are consistent.) How many elements are in EXACTLY two of the three sets?`,
    correct: ab + bc + ac - 3 * t,
    distractors: [ab + bc + ac - t, ab + bc + ac, ab + bc + ac - 2 * t],
    explanation: `Exactly two = (pairwise sum) − 3 × (triple) = ${ab} + ${bc} + ${ac} − 3 × ${t} = ${ab + bc + ac - 3 * t}. Each all-three element was counted in all three pairwise figures.`,
    concepts: ['Exactly-two = Σpairs − 3 × triple overlap'],
    mistake: 'Subtracting the triple overlap only once instead of three times.',
  }
})

const setSubsets = make('set-subsets', 'Set Theory', 'Subsets & Power Sets', 'medium', (rng) => {
  const n = ri(rng, 4, 7)
  const variant = ri(rng, 0, 2)
  if (variant === 0) {
    return {
      q: `A set has ${n} elements. How many of its subsets contain a specific given element?`,
      correct: Math.pow(2, n - 1),
      distractors: [Math.pow(2, n), 2 * n, Math.pow(2, n - 1) + n - 1],
      explanation: `Fix that element; the other ${n - 1} elements may be chosen freely: 2^${n - 1} = ${Math.pow(2, n - 1)} subsets.`,
      concepts: ['Fix an element, halve the problem'],
      mistake: 'Answering 2^n (ALL subsets) instead of only those containing the element.',
    }
  }
  if (variant === 1) {
    return {
      q: `How many subsets does a set with ${n} elements have in total?`,
      correct: Math.pow(2, n),
      distractors: [Math.pow(2, n - 1), n * n, 2 * n],
      explanation: `Each element is in or out: 2^${n} = ${Math.pow(2, n)} subsets (including the empty set).`,
      concepts: ['Power set cardinality 2ⁿ'],
      mistake: 'Forgetting the empty set, or using n².',
    }
  }
  // exactly-k subsets
  const combos = { 4: [0, 1, 2, 3, 4, 6, 10], 5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7: [0, 1, 2, 3, 4, 5, 6, 7] }
  const k = ri(rng, 2, n - 2)
  const C = (n2, k2) => { let r = 1; for (let i = 0; i < k2; i++) r = (r * (n2 - i)) / (i + 1); return Math.round(r) }
  const correct = C(n, k)
  return {
    q: `A set has ${n} elements. How many of its subsets contain exactly ${k} elements?`,
    correct,
    distractors: [correct * 2, Math.round(correct / 2) || 1, C(n, k + 1)],
    explanation: `C(${n}, ${k}) = ${n}! / (${k}! · ${n - k}!) = ${correct}.`,
    concepts: ['Combinations for subset counting'],
    mistake: 'Counting ordered selections (n × (n−1) × …) instead of combinations.',
  }
})

// ================= PROBABILITY =================

const proDiceSum = make('pro-dsum', 'Probability', 'Dice Problems', 'medium', (rng) => {
  const counts = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 }
  const s = ri(rng, 3, 11)
  const c = counts[s]
  return {
    q: `Two fair dice are rolled. What is the probability that the sum is ${s}?`,
    correct: frac(c, 36),
    distractors: [frac(c - 1, 36), frac(c + 2 > 11 ? c - 2 : c + 2, 36), frac(c, 12)],
    explanation: `${c} of the 36 equally likely outcomes give a sum of ${s} → ${c}/36 = ${frac(c, 36)}.`,
    concepts: ['Sample space of two dice (36 outcomes)', 'Simplifying fractions'],
    mistake: 'Counting unordered pairs only (missing the reversed combinations).',
  }
})

const proAtLeast = make('pro-least', 'Probability', 'At Least One', 'hard', (rng) => {
  const k = ri(rng, 2, 4)
  const denom = Math.pow(6, k)
  const pNone = Math.pow(5, k)
  return {
    q: `A fair die is rolled ${k} time${k > 1 ? 's' : ''}. What is the probability of getting at least one six?`,
    correct: frac(denom - pNone, denom),
    distractors: [frac(pNone, denom), frac(k, 6), frac(1, denom)],
    explanation: `P(no six in one roll) = 5/6, so P(no six in ${k} rolls) = ${pNone}/${denom}. At least one six = 1 − ${pNone}/${denom} = ${frac(denom - pNone, denom)}.`,
    concepts: ['Complement of "at least one"', 'Independent trials multiply'],
    mistake: `Adding probabilities: ${k} × 1/6 — that double-counts overlapping outcomes.`,
  }
})

const proNoRep = make('pro-norep', 'Probability', 'Without Replacement', 'medium', (rng) => {
  const r = ri(rng, 3, 6)
  const g = ri(rng, 2, 5)
  const p = (r / (r + g)) * ((r - 1) / (r + g - 1))
  const num = r * (r - 1)
  const den = (r + g) * (r + g - 1)
  return {
    q: `A bag contains ${r} red and ${g} green balls. Two balls are drawn without replacement. What is the probability that both are red?`,
    correct: frac(num, den),
    distractors: [frac(r * r, den), frac(r, r + g), frac(num, den * 2) === frac(num, den) ? frac(r - 1, r + g) : frac(num, den * 2)],
    explanation: `(${r}/${r + g}) × (${r - 1}/${r + g - 1}) = ${num}/${den} = ${frac(num, den)}. The pool shrinks after the first draw.`,
    concepts: ['Dependent events without replacement'],
    mistake: 'Treating the draws as independent: (r/(r+g))² with no shrinking pool.',
  }
})

const proCommittee = make('pro-comm', 'Probability', 'Combinations', 'hard', (rng) => {
  const m = ri(rng, 3, 5)
  const w = ri(rng, 2, 4)
  const total = m + w
  const C = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) }
  const fav = m * w
  const tot = C(total, 2)
  return {
    q: `A committee of 2 is chosen at random from ${m} men and ${w} women. What is the probability that it contains exactly one man and one woman?`,
    correct: frac(fav, tot),
    // candidate distractors: forget-to-halve trap, all-men, all-women, sum trap, near-misses
    distractors: [2 * fav, C(m, 2), C(w, 2), m + w, fav + 2, fav + 3]
      .filter((x) => x !== fav)
      .map((x) => frac(x, tot))
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .slice(0, 3),
    explanation: `Total pairs: C(${total}, 2) = ${tot}. Favorable: ${m} × ${w} = ${fav} (one man AND one woman). P = ${fav}/${tot} = ${frac(fav, tot)}.`,
    concepts: ['Counting favorable outcomes with combinations', 'Multiplication principle'],
    mistake: 'Adding C(m,1) + C(w,1) instead of multiplying.',
  }
})

const proEV = make('pro-ev', 'Probability', 'Expected Value', 'hard', (rng) => {
  const W = pick(rng, [6, 9, 12, 15])
  const L = pick(rng, [3, 6])
  const ev = (2 * W - 4 * L) / 6
  return {
    q: `In a game, you roll a fair die: you win Tk ${W} if you roll a 5 or a 6, and lose Tk ${L} otherwise. What is your expected gain per roll (in Tk)?`,
    correct: ev,
    distractors: [ev + 1, ev - 1, (W - L) / 2],
    explanation: `EV = (2/6)(${W}) + (4/6)(−${L}) = ${(2 * W) / 6} − ${(4 * L) / 6} = Tk ${ev}.`,
    concepts: ['Expected value = Σ (probability × payoff)'],
    mistake: 'Ignoring the negative payoff, or using the wrong probability (1/6 for two faces).',
  }
})

// ---------- registry ----------

export const GENERATORS = [
  algLinear, algSystem, algVieta, algAbs, algComp,
  ariRevPct, ariSucc, ariAvg, ariRatio, ariCi,
  geoTriangle, geoCircle, geoCoord, geoPoly,
  wrdWork, wrdSpeed, wrdProfit, wrdAge, wrdClock,
  setTwoSet, setThree, setSubsets,
  proDiceSum, proAtLeast, proNoRep, proCommittee, proEV,
]

// template → topic (for crediting practice stats on generated instances)
export const TEMPLATE_TOPIC = Object.fromEntries(GENERATORS.map((g) => [g().templateId, g().topic]))

// distinct generator templates per topic — the 'question types' of the syllabus
export const TEMPLATE_TOTALS = GENERATORS.reduce((acc, g) => {
  const t = g()
  acc[t.topic] = (acc[t.topic] || 0) + 1
  return acc
}, {})
