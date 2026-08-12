# Cadence

> A local-first time manager **built for life in Japan** — 時間割, shifts, to-dos, habits and focus time in one offline calendar.
> Built with **Flutter**. Free, open source (MIT), fully offline. Your data never leaves your device.

**Platforms:** Android (Google Play — planned) · Windows desktop · macOS (experimental CI build, post-1.0) · _iOS: not planned for now_
**Languages:** 日本語 · English · 简体中文 — Japanese-first, and one of the few Japan-shaped schedulers international residents can use in their own language.

---

## Why Cadence

Most calendar apps treat every entry the same. Cadence models the four things a day is actually made of, each with its own behavior:

| Type | Icon | For | Key behavior |
|------|------|-----|--------------|
| **Class** 授業 | 📚 | The semester 時間割 | Period grid (1限–6限), weekly repeats within a term, auto-skips 祝日 (休講) |
| **Shift** バイト | 💰 | Part-time work | Per-workplace hourly wage → monthly earnings estimate (見込み給料) |
| **Meeting** | 🤝 | Appointments, work syncs, doctor visits | Location + "remind me N minutes before" |
| **To-do** | ✅ | One-off tasks with a deadline | Check off, priority colors, rolls over if unfinished |
| **Habit** | 💊 | Medication, exercise, study streaks | Daily check-in, streaks, heat-map, fixed reminders |

Plus **Focus mode** (a Pomodoro that attaches to classes → per-subject study stats) and a **discipline dashboard** tying it all together.

### Forget-proof by design

Built as much for **professors, admin staff and office workers** as for students: layered reminders per event (前日 + 30分前 + 10分前), an insistent mode that re-rings until acknowledged, a morning digest and an evening preview of tomorrow, and conflict warnings when something gets double-booked. Recording a meeting is easy — Cadence's job is making sure you *notice* it.

### Made for Japan

**祝日** bundled offline and painted red · a real **時間割** period-grid view · **アルバイト** wage tracking · optional **和暦**(令和) and **六曜** · kana-aware search (ひらがな⇄カタカナ, 全角⇄半角) · quiet hours. Schedules travel into **LINE** (or any app) as template files, `.ics`, or image cards via the system share sheet — the app itself never touches the network. See [docs/PRODUCT.md](docs/PRODUCT.md).

### Principles

- **Local-first, offline-only.** No account, no server, no analytics, no network permission at all.
- **Your data is portable.** Export everything to JSON/CSV at any time; import it back on any device.
- **Sharing without servers.** Schedules travel as files and pictures through apps you already use.
- **Free forever.** MIT-licensed, no ads, no in-app purchases.
- **Small and fast.** Native performance on Android and Windows from one codebase.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | Flutter 3 (Material 3) |
| Language | Dart 3 |
| State | Riverpod |
| Database | drift (SQLite) — same file format on Android & Windows |
| Calendar UI | table_calendar |
| Recurrence | rrule (RFC 5545) |
| i18n | flutter_localizations + ARB files (en / zh / ja) |
| Notifications | flutter_local_notifications |

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the layers fit together.

---

## Documentation

1. **[docs/PRODUCT.md](docs/PRODUCT.md)** — vision, personas (student / teacher / dorm manager), the sharing model, non-goals.
2. **[docs/SETUP.md](docs/SETUP.md)** — toolchain install, create the project, first run.
3. **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — layers, data flow, and the project's design rules.
4. **[docs/DATABASE.md](docs/DATABASE.md)** — the SQLite schema and the reasoning behind it.
5. **[docs/ROADMAP.md](docs/ROADMAP.md)** — build order v0.0 → v1.0 (Google Play), with effort estimates.
6. **[docs/QUALITY.md](docs/QUALITY.md)** — the production bar: definition of done, testing, CI, performance budgets.
7. **[docs/DESIGN.md](docs/DESIGN.md)** — design system: the 臙脂 (enji) crimson brand, layout and motion rules.
8. **[docs/DART_GUIDE.md](docs/DART_GUIDE.md)** — Dart for developers coming from TypeScript.
9. **[docs/RELEASE.md](docs/RELEASE.md)** — Google Play release checklist (JP-first listing).

The project website (landing page + privacy policy, required for Play Store) lives in [`website/`](website/).

---

## Status

🌱 In development, following [docs/ROADMAP.md](docs/ROADMAP.md). Every line of code is hand-written by the author as a learning project — docs in English, built in public.

## License

[MIT](LICENSE) © 2026 lorendw7
