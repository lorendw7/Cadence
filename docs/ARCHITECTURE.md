# Architecture

Cadence is a single Flutter codebase targeting **Android** and **Windows desktop**. One language (Dart), one UI toolkit, one database file format on both platforms.

The design rule that shapes everything:

> **Offline-only is a feature, not a limitation.** The app requests no network permission. Trust is the product.

---

## Layers

```
┌────────────────────────────────────────────────────┐
│  UI  (Flutter widgets, Material 3)                  │
│  screens/ calendar · today · habits · settings      │
│      │ watches state, fires user intents            │
├──────▼─────────────────────────────────────────────┤
│  STATE  (Riverpod providers)                        │
│  eventListProvider · habitProvider · settingsProvider│
│      │ calls repositories, exposes streams          │
├──────▼─────────────────────────────────────────────┤
│  DATA  (repositories + drift/SQLite)                │
│  EventRepository · HabitRepository · Backup/Export  │
│      │ the only layer allowed to touch the DB       │
├──────▼─────────────────────────────────────────────┤
│  PLATFORM  (plugins)                                │
│  flutter_local_notifications · file_picker ·        │
│  path_provider · share_plus                         │
└────────────────────────────────────────────────────┘
```

**Dependency rule:** arrows point down only. UI never imports drift; repositories never import widgets. This keeps every layer testable alone and makes the codebase navigable as it grows.

### Why these libraries

- **Riverpod** — compile-safe state management; a screen `watch`es a provider and rebuilds automatically when data changes. The Flutter equivalent of the "UI = f(state)" model.
- **drift** — typed SQLite for Dart. Tables are declared in Dart, queries return `Stream`s (the UI updates live when a row changes), and the same code runs on Android (sqlite3) and Windows (sqlite3 FFI).
- **table_calendar** — month/week calendar widget, fully customizable cells for event dots and habit marks.
- **rrule** — RFC 5545 recurrence expansion ("every Mon/Wed/Fri until term end") in pure Dart.
- **flutter_localizations + ARB** — Flutter's first-party i18n. One `app_en.arb`, `app_zh.arb`, `app_ja.arb`; the `intl` code-gen produces typed accessors.

---

## Data flow example — checking off a habit

1. User taps ✓ on "Take medication" in the Today screen.
2. The widget calls `ref.read(habitProvider.notifier).checkIn(habitId, today)`.
3. The notifier calls `HabitRepository.checkIn()`, which runs a drift upsert (`INSERT … ON CONFLICT DO UPDATE`).
4. The repository's `watchLogs()` stream emits the new row set.
5. Every widget watching that stream — today card, streak counter, heat-map — rebuilds automatically. No manual refresh anywhere.

This loop — **widget → provider → repository → drift → stream → widgets rebuild** — is the spine of the app. Learn it once in v0.1; every later feature is the same shape.

---

## Recurrence model

A recurring class is stored **once**: a master event row plus an `rrule` string (`FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=…`).

- **Rendering:** the calendar asks the `rrule` package to expand occurrences for the visible range only.
- **Editing one occurrence:** the date is added to the master's `exceptions` list; the modified copy is stored as its own standalone event.
- **Deleting the series:** deletes the master (cascade removes the rule).

Occurrences are never materialized into the DB — the master + rule is the single source of truth.

---

## Time model

- **Events** store timezone-naive **local wall time** plus the recurrence in local terms. A 9:00 class is a 9:00 class even if you travel. (Single-user, single-device data; wall time is what a schedule means to a human.)
- **Habit logs** store a **local date string** (`2026-08-12`) — "did I take my medication *today*" is a calendar-day question. A late-night check-in must never land on the wrong day.

Write this down once and never "fix" it: it is what makes the app trustworthy in daily use.

---

## Import / export (data freedom)

- **Export:** one JSON file containing every table (versioned envelope: `{"format": 1, "events": […], …}`); CSV per-table for spreadsheet users. Share via the system share sheet (Android) or save-file dialog (Windows).
- **Import:** the same JSON round-trips losslessly. `.ics` import (from Google/Apple Calendar) maps `VEVENT` → events, best-effort.
- **Auto-backup:** a rolling local backup written on app close, kept N days.

Export is a first-class feature because "your data is portable" is a core promise — see README principles.

---

## Project layout (target)

```
lib/
├── main.dart                  # entry, ProviderScope, MaterialApp
├── app/                       # theme, routing, locale setup
├── data/
│   ├── db/                    # drift tables, database class, migrations
│   ├── repositories/          # EventRepository, HabitRepository, …
│   └── export/                # JSON/CSV/ics import-export
├── state/                     # Riverpod providers/notifiers
├── ui/
│   ├── calendar/              # month/week views
│   ├── today/                 # today panel + habit check-ins
│   ├── habits/                # habit management, heat-map
│   ├── event_form/            # create/edit sheets
│   └── settings/              # language, theme, backup
└── l10n/                      # app_en.arb, app_zh.arb, app_ja.arb
```
