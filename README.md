# Cadence

> A local-first personal rhythm manager — classes, meetings, to-dos, and habits in one calendar.
> Built with **Flutter**. Free, open source (MIT), fully offline. Your data never leaves your device.

**Platforms:** Android (Google Play — planned) · Windows desktop · _iOS: not planned for now_
**Languages:** English · 简体中文 · 日本語

---

## Why Cadence

Most calendar apps treat every entry the same. Cadence models the four things a day is actually made of, each with its own behavior:

| Type | Icon | For | Key behavior |
|------|------|-----|--------------|
| **Class** | 📚 | Weekly fixed slots — lectures, training | Repeats on chosen weekdays within a term |
| **Meeting** | 🤝 | Appointments, work syncs, doctor visits | Location + "remind me N minutes before" |
| **To-do** | ✅ | One-off tasks with a deadline | Check off, priority colors, rolls over if unfinished |
| **Habit** | 💊 | Medication, exercise, water, reading | Daily check-in, streaks, heat-map, fixed reminders |

### Principles

- **Local-first, offline-only.** No account, no server, no analytics, no network permission at all.
- **Your data is portable.** Export everything to JSON/CSV at any time; import it back on any device.
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

1. **[docs/SETUP.md](docs/SETUP.md)** — toolchain install, create the project, first run.
2. **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — layers, data flow, and the project's design rules.
3. **[docs/DATABASE.md](docs/DATABASE.md)** — the SQLite schema and the reasoning behind it.
4. **[docs/ROADMAP.md](docs/ROADMAP.md)** — build order v0.0 → v1.0 (Google Play), with effort estimates.
5. **[docs/DART_GUIDE.md](docs/DART_GUIDE.md)** — Dart for developers coming from TypeScript.
6. **[docs/RELEASE.md](docs/RELEASE.md)** — Google Play release checklist.

The project website (landing page + privacy policy, required for Play Store) lives in [`website/`](website/).

---

## Status

🌱 In development, following [docs/ROADMAP.md](docs/ROADMAP.md). Every line of code is hand-written by the author as a learning project — docs in English, built in public.

## License

[MIT](LICENSE) © 2026 lorendw7
