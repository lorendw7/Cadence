# Roadmap

Built strictly top to bottom; each milestone is shippable and pairs features with the Dart/Flutter concepts they teach. 🎯 = user-facing win · 📘 = the new concept this step forces you to learn.

Production quality is not a milestone — it's enforced continuously via [QUALITY.md](QUALITY.md) (definition of done, tests, CI).

---

## Effort & timeline

Estimates **include learning time** (you're new to Dart/Flutter, coming from TypeScript) and assume you write every line yourself.

| Milestone | Focused hours | Notes |
|-----------|---------------|-------|
| v0.0 Hello Flutter | 2–4 h | Toolchain, skeleton, run on Windows + Android |
| v0.1 Calendar MVP + 祝日 | 32–48 h | The big one: DB, state, forms, recurrence, i18n, holidays |
| v0.2 時間割 timetable | 12–18 h | Period grid, term dates, holiday-skip |
| v0.3 Habits | 15–25 h | Streaks, reminders, back-fill |
| v0.4 Shifts & earnings | 12–18 h | Workplaces, wages, monthly estimate |
| v0.5 Data freedom & sharing | 18–28 h | Export/import, templates, `.ics`, image cards, share sheet |
| v0.6 Focus mode | 12–18 h | Pomodoro, per-subject stats |
| v0.7 Insights & JP polish | 15–25 h | Dashboard, search (kana-folding), 和暦/六曜, quiet hours |
| v1.0 Google Play release | 12–18 h | JP-first listing, signing, closed test cycle |
| **Total** | **~130–200 h** | |

Wall-clock at ~10 h/week: **personally usable in ~5–6 weeks (end of v0.2), Play Store in ~3.5–5 months.** Front-loaded curve: v0.1 is slow because you learn the framework and the app at once; velocity roughly doubles after it.

---

## v0.0 — Hello Flutter

- [ ] `flutter doctor` all green (Windows + Android toolchains).
- [ ] `flutter create` (org `dev.cadence`), run on **Windows** and an **Android emulator**.
- [ ] Strip the demo to a `MaterialApp` + bottom-nav skeleton (Calendar / Today / Stats / Settings).
- [ ] Material 3 theme, light + dark following the system.
- [ ] CI: GitHub Actions running `flutter analyze` + `flutter test` on every push ([QUALITY.md](QUALITY.md)).

📘 Widget tree, `StatelessWidget` vs `StatefulWidget`, hot reload, `MaterialApp`/`Scaffold`.
🎯 The app opens on both targets with your navigation shell, and CI is green.

---

## v0.1 — Calendar MVP + 祝日

- [ ] drift database: `events` + `recurrence_rules`, migrations, repository layer.
- [ ] Riverpod: `eventListProvider` streaming events for the visible range.
- [ ] Month + week views (table_calendar) with event dots and a day agenda list.
- [ ] **Japanese public holidays**: bundled asset (Cabinet Office data), rendered red, shown in month/week/agenda.
- [ ] Create/edit event bottom sheet: class / meeting / todo fields per category.
- [ ] Recurrence: weekly-by-weekday via `rrule`, term start/end, single-occurrence exceptions.
- [ ] To-do: check off, priority colors, strike-through.
- [ ] i18n from day one: ARB files **ja / en / zh**, language picker (+ "system"). Japanese is the reference locale — write it first, translate to en/zh.
- [ ] Event reminders (`flutter_local_notifications`), Android 13+ permission flow.
- [ ] Unit tests: recurrence expansion (incl. exceptions), holiday lookup, repository CRUD.

📘 Async Dart (`Future`/`Stream`), drift code-gen, Riverpod `watch`/`read`, bottom sheets, form validation, ARB workflow, bundled assets.
🎯 A calendar a person in Japan can actually live in — red 祝日 included.

---

## v0.2 — 時間割 (timetable view)

- [ ] Period model in settings: configurable list (default 1限 09:00–10:30 … 6限), JSON-stored.
- [ ] Weekday × period grid view; classes snap to periods; tap a cell to add.
- [ ] Term presets (前期/後期 dates) applied to class recurrence.
- [ ] **休講 on 祝日**: class recurrence auto-skips bundled holidays (per-class toggle, default on).
- [ ] Class detail: room, teacher, color; grid cell shows room number.
- [ ] Unit tests: period snapping, holiday-skip expansion.

📘 Custom grid layout, `CustomScrollView`/slivers or GridView, settings-driven rendering.
🎯 The view Japanese students expect — set up the semester in five minutes.

---

## v0.3 — Habits

- [ ] `habits` + `habit_logs` tables, repository, idempotent check-in upsert.
- [ ] Today screen: due-today habits, one-tap check-in, back-fill yesterday.
- [ ] Streak counter (computed from the log stream); monthly completion view.
- [ ] Fixed-time daily reminders (e.g. 08:00 薬); frequency: daily / weekdays / custom days / N per week.
- [ ] Archive without losing history.
- [ ] Unit tests: streak math across month boundaries, due-today logic per frequency.

📘 More streams, date math, notification scheduling, sealed types.
🎯 Streak-driven habit tracking — the reason to open the app every morning.

---

## v0.4 — Shifts & earnings (アルバイト)

- [ ] `workplaces` table (name, hourly wage, color); shift events linked to a workplace.
- [ ] Fast shift entry: workplace + start/end (+ break minutes); repeat patterns for fixed shifts.
- [ ] Monthly earnings estimate: Σ (worked hours − breaks) × wage, per workplace and total, on the Stats screen. Clearly labeled *estimate* (見込み).
- [ ] Wage history: changing a wage applies from a given date (past months stay correct).
- [ ] Unit tests: earnings math incl. breaks, overnight shifts, wage-change boundaries.

📘 Joins in drift, money math done safely (integer yen), date-boundary edge cases.
🎯 "今月の見込み: ¥68,250" — the feature that makes students keep the app.

---

## v0.5 — Data freedom & sharing

File-based sharing via the OS share sheet — no network, lands in LINE like anything else. Rationale in [PRODUCT.md](PRODUCT.md).

- [ ] Export all data to versioned **JSON**; per-table **CSV**.
- [ ] Import JSON: validate-then-transact, merge/replace modes (replace requires typed confirmation).
- [ ] **Template export/import** (`*.cadence.json` partial export — a timetable, a roster).
- [ ] `.ics` export of selected events + `.ics` import (Google/Apple Calendar migration).
- [ ] **Image card**: render day/week schedule or roster to PNG for chat sharing.
- [ ] Android: share sheet + intent filters to open `.ics`/`.cadence.json` from chats; Windows: save/open dialogs.
- [ ] Rolling local auto-backup (keep N days) + manual "backup now"; backup integrity check on restore.
- [ ] Unit tests: export→import round-trip is lossless; malformed-file rejection.

📘 File I/O per platform, transactions, Android intents, rendering widgets to images.
🎯 One file posted to the class LINE group sets up everyone's semester.

---

## v0.6 — Focus mode

- [ ] Pomodoro timer (25/5 default, configurable, long-break cycle), survives backgrounding.
- [ ] Attach a session to a class or to-do → focus time inherits the subject.
- [ ] `focus_sessions` table + per-subject weekly/monthly stats.
- [ ] Session-end / break-end notifications; DND suggestion during sessions.
- [ ] Unit tests: timer state machine, attribution to subjects.

📘 Timers & app lifecycle, Android foreground service, state machines.
🎯 "経済学: 今週6.5時間" — study effort becomes visible.

---

## v0.7 — Insights & Japan polish

- [ ] Discipline dashboard: events, to-do completion, habit streaks + heat-map, focus hours, earnings — one screen.
- [ ] Global search with **kana folding** (ひらがな/カタカナ) and full-width/half-width normalization.
- [ ] **和暦** display option (令和 alongside Gregorian); **六曜** toggle (off by default).
- [ ] Quiet hours: notifications hold during configured sleep window.
- [ ] Unfinished-to-do rollover (setting-driven).
- [ ] Android polish: predictive back, adaptive icon, font-scaling audit (200%), TalkBack labels.

📘 Custom painting/charts, text normalization, accessibility APIs.
🎯 Feels native to Japan, not translated into it.

---

## v1.0 — Google Play

See [RELEASE.md](RELEASE.md). JP-first listing (ja primary; en, zh-CN listings too).

- [ ] Signing, `--release` `.aab`, R8; verify **no INTERNET permission** in the merged manifest.
- [ ] Store listing ja/en/zh: descriptions, screenshots (時間割, calendar with 祝日, shifts, focus), feature graphic.
- [ ] Privacy policy URL (website) + data-safety form: no data collected.
- [ ] Closed test (Google's 12-tester/14-day rule for new personal accounts) → production, staged rollout.
- [ ] Tag `v1.0.0`, GitHub Release with changelog + Windows build + sideload `.apk`.

🎯 Cadence, free on Google Play Japan.

---

## Later (ideas, not commitments)

Home-screen widget (today + next class), quick-add natural language (Japanese-aware), night-premium wage rules (深夜手当), encrypted backup, F-Droid, focus strict mode (app blocking), iOS (the codebase is ready; only Apple tooling/fees stand between).

## Working rhythm

One checkbox at a time; commit when green; English commit messages. Every feature meets the definition of done in [QUALITY.md](QUALITY.md) before moving on.
