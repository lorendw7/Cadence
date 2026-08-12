# Product Vision

Cadence is a **local-first time manager built for life in Japan** — classes, shifts, habits, and focus time in one offline app, shareable through LINE (or any chat app) as files and pictures, never through a server.

Primary market: **people living in Japan** — Japanese students and workers, and the international residents (留学生・外国人労働者) that Japanese-only apps ignore.

---

## Why Japan, and why Cadence can win there

Japanese scheduling apps are dominated by ad-funded, account-required, Japanese-only products. Cadence's principles line up with exactly what that market underserves:

| Market reality in Japan | Cadence's answer |
|---|---|
| Every calendar must show **祝日** (public holidays) — non-negotiable | Holidays bundled offline, red like users expect |
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

### 💼 Working adult
- Meetings with reminder lead times; habits (薬、運動、読書); quiet hours so notifications respect sleep.
- Monthly rhythm dashboard: busiest days, focus hours, streaks.

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

- **祝日 offline**: Cabinet Office holiday data bundled as an asset, refreshed with each app release. Holidays render red; class recurrence can auto-skip them (休講 default: on).
- **時間割 view**: weekday × period grid (default 1限 09:00–10:30 …, fully configurable), the mental model Japanese students actually use.
- **Shifts & earnings**: workplaces with hourly wage; shifts on the calendar; monthly estimated pay. An *estimate*, clearly labeled — not payroll (no tax/insurance math).
- **和暦 option**: show 令和 years alongside Gregorian.
- **六曜 option** (大安・仏滅…): off by default, one toggle for those who plan around it.
- **Search that respects Japanese**: hiragana/katakana folding, full-width/half-width normalization.
- **Quiet hours**: notifications hold during configured sleep hours.

## Focus mode (the study aid)

- Pomodoro (25/5 default, configurable, long-break cycles); sessions attach to a class or to-do → focus time inherits the subject.
- Per-subject weekly/monthly stats; feeds the same heat-map/stats engine as habits — one "discipline dashboard".
- Session-end/break-end notifications; suggests DND during sessions.

---

## Non-goals (written down so we don't drift)

| Not doing | Why |
|-----------|-----|
| Accounts / cloud sync | Kills the trust story; file-based sharing covers the real scenarios |
| LINE/WeChat **API** integration (bots, OAuth) | Requires network + partner terms; the share sheet achieves the goal |
| Payroll accuracy (tax, insurance, 交通費 rules) | Earnings are an estimate; full payroll is a liability, not a feature |
| Train timetables / transfer search | Needs live data; Yahoo!乗換案内 exists |
| Real-time multi-user editing | Different product |
| Flashcards / question banks | Focus tool ≠ content platform |
| Ads, analytics, telemetry | Non-negotiable, forever |
