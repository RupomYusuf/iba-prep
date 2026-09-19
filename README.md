# IBA MBA Exam Prep 🎓

An interactive, frontend-only web app for preparing for the **IBA MBA entrance exam (Mathematics & Analytical Ability)** at the **GMAT 650+ / IBA admission standard** — built for a 45-day preparation window.

**Live app:** https://rupomyusuf.github.io/iba-prep/

## Features

### Tier 1 — Topic Practice (Topic Mastery)
- **Capstone PDF upload**: the analyzer extracts lecture text (pdf.js) and detects which of the 6 topics your lecture covers — start a practice set straight from the analysis.
- 16-question practice sets per topic from a curated **168-question bank** (Algebra, Arithmetic, Geometry, Word Problems, Set Theory, Probability — 28 questions each, weighted toward tricky mediums).
- **Difficulty profiles you choose per set:**
  - **IBA Standard (default)** — no easy questions; tricky mediums & hard only, mirroring the real paper
  - **Balanced** — 30% easy · 40% medium · 30% hard
  - **Foundation** — 50% easy · 30% medium · 20% hard for building basics
- **2 attempts per question**: attempt 1 shows right/wrong only; attempt 2 unlocks the full worked solution — correct answer, explanation, key concepts, and the common mistake.
- **No timer** in practice mode; full attempt history per question.
- **Set size is your choice:** a quick 16-question set, or a **🏃 Full Topic Marathon** that serves EVERY IBA/GMAT-level question in the topic (whole curated pool + every generated question type) — finish it and nothing in that topic can surprise you.
- **Coverage tracker** per topic ("18/25 covered") alongside mastery, so you can drive every topic to 100%.
- Questions flagged automatically for weak topics; **topic mastery %** tracked (1st-try correct = 100%, 2nd-try = 50%).
- **Weak-question drills**: rebuild a set from your flagged/missed questions.

### Tier 2 — Full Mock Exams
- **Real Exam Pace**: 30 questions · 30 minutes (60 s/Q) or **Speedrun**: 30 questions · 25 minutes (50 s/Q).
- All 30 questions mixed across topics (like the real paper) — **every question is IBA / GMAT 650+ standard: tricky mediums and hards only, zero easy fillers** (Q26–30 are the hardest).
- Live **MM:SS countdown** with auto-submit at 0:00, question palette, flagging, and answer changes.
- **Exact IBA negative marking**: +1 correct · −0.25 wrong · 0 blank.
- Answer key & explanations unlock **only after submission**.
- Analytics: time per question, difficulty breakdown, weak topics (<70%), slowest questions.

### Dashboard & Progress
- Quick stats: topics mastered, practice Qs solved, mocks taken, best & average score.
- Progress by topic (mastery, first-try %, status), mock history chart with 80% target line.
- **Weak-area detection** (<70%) with targeted drill shortcuts and study recommendations based on your performance patterns.
- CSV export: practice log, topic summary, mock history.

All progress is stored locally in your browser (localStorage) — nothing leaves your device.

## Re-deploying
After code changes: `npm run deploy` (builds and force-pushes `dist/` to the `gh-pages` branch — GitHub Pages serves it automatically).

## Tech Stack
React 19 · Vite 8 · Tailwind CSS 4 · pdfjs-dist (PDF text extraction) · Recharts (analytics) · localStorage (persistence)

## Run Locally
```bash
npm install
npm run dev      # http://localhost:5173/iba-prep/
```

## Deploy to GitHub Pages
This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`). After your first push:
1. Open **Settings → Pages** on GitHub.
2. Set **Source → GitHub Actions**.
3. Every push to `main` rebuilds and deploys automatically.

## Question Bank
168 original questions written to IBA / GMAT 650+ standard with unambiguous answers, realistic distractors, no trick wording, and concept-teaching explanations. Each question carries its topic, subtopic, difficulty, key concepts, and common mistake — all solvable inside 60 seconds.

## Resetting Progress
Progress lives in `localStorage` under the `iba-prep:v1:*` keys — clear site data in your browser to start fresh.
