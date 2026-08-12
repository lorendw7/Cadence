# Product Vision

Cadence is a **local-first time manager built for life in Japan** — classes, shifts, habits, and focus time in one offline app, shareable through LINE (or any chat app) as files and pictures, never through a server.

Primary market: **people living in Japan** — students, professors, administrative staff, and office workers, plus the international residents (留学生・外国人労働者) that Japanese-only apps ignore. The shared thread: busy days full of fixed commitments, and no patience for apps that let one slip.

---

## Why Japan, and why Cadence can win there

Japanese scheduling apps are dominated by ad-funded, account-required, Japanese-only products. Cadence's principles line up with exactly what that market underserves:

| Market reality in Japan | Cadence's answer |
|---|---|
| Every calendar must show **祝日** (public holidays) — non-negotiable | Holidays built in offline, red like users expect — and user-updatable without app updates |
| Students think in **時限** ("3限"), not clock time | A real **時間割** (period-grid timetable) view |
| **シフト管理** (part-time shift + wage tracking) is a huge app category | Shift type + hourly wage → monthly earnings estimate |
| **LINE** is the communication default | Share sheet sends templates/images/`.ics` straight into LINE |
| High privacy sensitivity, low tolerance for signup friction | No account, no network permission, no ads — ever |
| ~3M international residents get JA-only tools | **Trilingual UI: 日本語 / English / 简体中文** |

Positioning line:

> 日本での毎日のために — timetable, shifts, habits and focus hours in one offline app. No account, no ads, your data stays on your phone. 日本語・English・中文.

---

## Personas & scenarios

### 🎓 Japanese university student (primary)
- Sets up the semester **時間割** once: periods 1限–6限, term start/end; classes auto-skip 祝日.
- Tracks **アルバイト shifts** at two workplaces with different hourly wages; sees "今月の見込み給料 ¥68,250".
- Uses **Focus mode** for exam prep; "経済学: 今週6.5時間".
- Shares the seminar schedule to the LINE group as an image card.

### 🌏 International student / worker in Japan
- Runs the app in English or Chinese while living on a Japanese calendar (祝日, 年号 optional).
- Imports the timetable template a classmate shared in LINE — no Japanese account signup walls.
- Habit streaks for language study (毎日30分日本語); focus stats per subject.

### 👨‍🏫 Professor / teacher (教員)
- Runs their **teaching timetable** in the same 時間割 grid students use — plus ゼミ, office hours, 教授会.
- **Conflict warning** the moment a meeting is double-booked over a lecture.
- Deadline to-dos for grading (採点), reviews, and 科研費 paperwork, each with layered reminders.
- Exports the seminar schedule template into the lab's LINE group.

### 🏢 Administrative staff (事務職員)
- Lives in recurring meetings and the **年度 (April–March) cycle** — stats and views understand the Japanese fiscal year.
- Rosters and event schedules shared as image cards / `.ics` to any group.
- Morning digest at the desk: today's meetings, rooms, and gaps in one notification.

### 💼 Working adult (会社員)
- **Forget-proof meetings**: multiple reminders per event (前日夜 + 30分前 + 10分前), and an insistent mode that re-rings until acknowledged.
- Evening preview ("明日は 8:30 から会議") so early meetings never ambush the morning.
- Habits (薬、運動、読書); quiet hours so notifications respect sleep; weekly "hours in meetings" insight.

### 🏠 Dorm manager / organizer (寮管理人・サークル幹事)
- Duty rosters and inspection schedules as recurring events.
- Exports the roster as an **image card** or `.ics` into the dorm/circle LINE group.
- No resident data ever leaves their device.

---

## The sharing model (how "LINE integration" works)

Cadence **never talks to any network API**. Sharing rides the OS share sheet:

```
Cadence generates an artifact          the OS hands it to any app
┌──────────────────────────┐          ┌──────────────────────────┐
│ • timetable template .json│  share  │ LINE · WeChat · WhatsApp │
│ • calendar file .ics      │ ──────► │ email · Drive · anything  │
│ • schedule image card .png│  sheet  │ (user picks, user sends) │
└──────────────────────────┘          └──────────────────────────┘
```

- Works with **every** chat app at once — no per-app SDK, no partnerships, no server; LINE simply happens to be where Japan lives.
- Receiving = opening a file from the chat (Android intent filter for `.ics` / `.cadence.json`).
- The app keeps zero network permission; the privacy policy stays one sentence long.

**Artifacts:** template file (`*.cadence.json`, partial export such as one timetable) · `.ics` (interop with Google/Apple Calendar) · image card (`.png` of a day/week schedule or roster, legible inside a chat bubble).

---

## Japan pack (the localized substance)

- **祝日 offline, user-controlled**: the default built-in Japan pack is *computed* from the 祝日法 rules (fixed dates, Happy-Monday, equinox formulas, 振替休日) with a tiny bundled override for rare law changes. **Updating and switching holiday data is a user feature, not an app release**: import any holiday `.ics`/JSON as a named calendar, re-import to update it, switch between calendars in Settings — or pick **None** for a plain, holiday-free calendar. Holidays render red; class recurrence can auto-skip them (休講 default: on).
- **時間割 view**: weekday × period grid (default 1限 09:00–10:30 …, fully configurable), the mental model Japanese students actually use.
- **Shifts & earnings**: workplaces with hourly wage; shifts on the calendar; monthly estimated pay. An *estimate*, clearly labeled — not payroll (no tax/insurance math).
- **和暦 option**: show 令和 years alongside Gregorian.
- **六曜 option** (大安・仏滅…): off by default, one toggle for those who plan around it.
- **Search that respects Japanese**: hiragana/katakana folding, full-width/half-width normalization.
- **Quiet hours**: notifications hold during configured sleep hours.

## Forget-proof reminders (the busy-person pillar)

The people we serve don't fail to *record* meetings — they fail to *notice* them. Reminders are therefore a first-class system, not a checkbox:

- **Layered reminders per event**: any combination of lead times (1 day / 1 hour / 10 min …), each firing separately.
- **Insistent mode** (opt-in per event): re-notifies every few minutes until tapped "了解" — for the meetings that must not be missed.
- **Morning digest** (default 07:30): today's events, first start time, and free gaps in one notification.
- **Evening preview** (default 21:00): tomorrow's first commitment, so early starts are known the night before.
- **Conflict detection**: overlapping events warn at save time — double-booking is caught when it's created, not when two rooms are waiting.
- All of it local notifications; quiet hours still win except for insistent-mode events you explicitly marked.

## Focus mode (the study aid)

- Pomodoro (25/5 default, configurable, long-break cycles); sessions attach to a class or to-do → focus time inherits the subject.
- Per-subject weekly/monthly stats; feeds the same heat-map/stats engine as habits — one "discipline dashboard".
- Session-end/break-end notifications; suggests DND during sessions.

---

## Non-goals (written down so we don't drift)

| Not doing | Why |
|-----------|-----|
| **Fetching holiday/calendar data over the network** | 祝日 aren't real-time data — the Cabinet Office announces them 1–2 years ahead, ~16/year; 六曜/和暦 are pure computation. Computed rules + user-imported holiday calendars cover it fully — no update channel needed at all. Adding network permission would demote "your data can't leave — it's technically impossible" to "trust us", killing the product's strongest claim. Decided 2026-08-12; do not reopen. |
| Accounts / cloud sync | Kills the trust story; file-based sharing covers the real scenarios |
| LINE/WeChat **API** integration (bots, OAuth) | Requires network + partner terms; the share sheet achieves the goal |
| Payroll accuracy (tax, insurance, 交通費 rules) | Earnings are an estimate; full payroll is a liability, not a feature |
| Train timetables / transfer search | Needs live data; Yahoo!乗換案内 exists |
| Real-time multi-user editing | Different product |
| Flashcards / question banks | Focus tool ≠ content platform |
| Ads, analytics, telemetry | Non-negotiable, forever |
