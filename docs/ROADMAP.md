# Roadmap

Built strictly top to bottom; each milestone is shippable and pairs features with the Dart/Flutter concepts they teach. 🎯 = user-facing win · 📘 = the new concept this step forces you to learn.

---

## Effort & timeline

Estimates **include learning time** (you're new to Dart/Flutter, coming from TypeScript) and assume you write every line yourself. "Focused hours" = heads-down time.

| Milestone | Focused hours | Notes |
|-----------|---------------|-------|
| v0.0 Hello Flutter | 2–4 h | Toolchain, project, first widget, run on Windows + Android emulator |
| v0.1 Calendar MVP | 30–45 h | The big one: DB, state, forms, recurrence, i18n scaffolding |
| v0.2 Habits | 15–25 h | Reuses v0.1 patterns; streaks + reminders are the new bits |
| v0.3 Data freedom & sharing | 18–28 h | Export/import, backups, **templates + `.ics` + image cards via the share sheet** |
| v0.4 Focus mode | 12–18 h | Pomodoro, per-subject study stats — see [PRODUCT.md](PRODUCT.md) |
| v0.5 Insights & polish | 15–25 h | Heat-map, stats dashboard, search, Android UX pass |
| v1.0 Google Play release | 10–15 h | Signing, store listing, privacy policy, screenshots, review cycle |
| **Total** | **~100–160 h** | |

Wall-clock at ~10 h/week: **usable app in ~4–5 weeks (end of v0.1), Play Store in ~3–4 months.** The curve is front-loaded — v0.1 is slow because you learn the framework and the app at once; velocity roughly doubles after it.

---

## v0.0 — Hello Flutter

- [ ] `flutter doctor` all green (Windows + Android toolchains).
- [ ] `flutter create` the app (org `dev.cadence`), run it on **Windows** and an **Android emulator**.
- [ ] Strip the counter demo to a minimal `MaterialApp` with a bottom-nav skeleton (Calendar / Today / Habits / Settings placeholders).
- [ ] Material 3 theme with light + dark mode following the system.

📘 Widget tree, `StatelessWidget` vs `StatefulWidget`, hot reload, `MaterialApp`/`Scaffold`, running on two platforms.
🎯 The app opens on both targets with your navigation shell.

---

## v0.1 — Calendar MVP

- [ ] drift database: `events` + `recurrence_rules` tables, migrations, repository layer.
- [ ] Riverpod: `eventListProvider` streaming events for the visible range.
- [ ] Month + week calendar (table_calendar) with event dots and a day agenda list.
- [ ] Create/edit event bottom sheet: class / meeting / todo fields per category.
- [ ] Recurrence: weekly-by-weekday rules via `rrule`, term start/end, single-occurrence exceptions.
- [ ] To-do: check off, priority colors, strike-through.
- [ ] i18n scaffolding: ARB files for **en / zh / ja**, language picker in Settings (plus "system").
- [ ] Event reminders: `flutter_local_notifications` (N minutes before), Android 13+ notification permission flow.

📘 Async Dart (`Future`/`Stream`/`async-await`), drift code-gen, Riverpod `watch`/`read`, `Navigator`/bottom sheets, form validation, ARB workflow.
🎯 A daily-usable calendar in three languages.

---

## v0.2 — Habits

- [ ] `habits` + `habit_logs` tables, repository, upsert check-in.
- [ ] Today screen: due-today habits, one-tap check-in, back-fill yesterday.
- [ ] Streak counter (computed in Dart from the log stream).
- [ ] Fixed-time daily habit reminders (e.g. 08:00 medication) — scheduled local notifications.
- [ ] Habit management: create/edit/archive, emoji icon, frequency (daily / weekdays / custom days / N per week).

📘 More streams, date math without timezones biting, notification scheduling, enum-like sealed types.
🎯 Streak-driven habit tracking — the reason to open the app every morning.

---

## v0.3 — Data freedom & sharing

The sharing model is file-based via the OS share sheet — no network, works with LINE/WeChat/anything. Rationale in [PRODUCT.md](PRODUCT.md).

- [ ] Export all data to versioned **JSON**; per-table **CSV**.
- [ ] Import JSON with validate-then-transact, merge/replace modes.
- [ ] **Template export/import** (`*.cadence.json` partial export — e.g. a timetable a teacher shares with a class).
- [ ] `.ics` export of selected events + `.ics` import (Google/Apple Calendar migration).
- [ ] **Image card**: render a day/week schedule or roster to PNG for chat sharing.
- [ ] Android: share-sheet integration + intent filter to **open** `.ics`/`.cadence.json` from chats; Windows: save/open dialogs.
- [ ] Rolling local auto-backup (keep N days), manual "backup now".

📘 File I/O per platform, JSON (de)serialization, transactions, Android intents, rendering a widget to an image.
🎯 A teacher posts one file to the class group; every student's calendar is set up in one tap.

---

## v0.4 — Focus mode (the study aid)

- [ ] Pomodoro timer (25/5 default, configurable, long-break cycle), runs reliably in background.
- [ ] Attach a session to a class or to-do → focus time inherits the subject.
- [ ] `focus_sessions` table + per-subject weekly/monthly stats.
- [ ] Session-end / break-end local notifications; suggest DND during sessions.
- [ ] Focus history feeds the same stats engine as habits.

📘 Timers & app lifecycle (what happens when the app is backgrounded), foreground services on Android, state machines.
🎯 "6.5 hours of math this week" — study effort becomes visible.

---

## v0.5 — Insights & polish

- [ ] Habit heat-map (monthly grid) + completion percentages.
- [ ] Discipline dashboard: events, to-do completion rate, habit streaks, focus hours — one screen.
- [ ] Global search across events/habits.
- [ ] Unfinished-to-do rollover (setting-driven).
- [ ] Android polish: predictive back, widget-worthy today glance, adaptive icon.

📘 Custom painting or simple chart widgets, performance profiling, platform-adaptive UI.
🎯 The app starts telling you things about your rhythm.

---

## v1.0 — Google Play

See [RELEASE.md](RELEASE.md) for the full checklist.

- [ ] App signing keystore + `--release` build, R8 shrinking.
- [ ] Store listing: name, descriptions (en/zh/ja), screenshots, feature graphic.
- [ ] Privacy policy URL (served from the project website — trivial: "all data stays on device").
- [ ] Data-safety form: no data collected, no data shared.
- [ ] Internal testing track → production rollout.

🎯 Cadence, free on Google Play.

---

## Later (ideas, not commitments)

Home-screen widgets, quick-add natural language, encrypted backup, F-Droid listing, focus "strict mode" (app blocking), iOS (if ever — the codebase is ready, only Apple tooling/fees stand between).

## Working rhythm

One checkbox at a time; commit when it's green; English commit messages. After each milestone, revisit [DART_GUIDE.md](DART_GUIDE.md) — concepts click after you've used them.
