# Documentation

Cadence is being built as a **local-first course and personal planner for all Kyushu University students**. Windows/Linux/macOS are the targets; no mobile product is planned. A Web system is a candidate, and school integration is conditional on permission and a usable data route. Current executable: a Today placeholder with a separate task-model exercise. Features remain planned unless explicitly marked implemented.

## Read in this order

For a complete beginner, start with [the learning path](LEARNING.md) and [lesson 01](lessons/01-task.md). Read the reference documents as needed, not all at once.

1. [Product design / 产品设计](REDESIGN.md) — pages, course rules, personal plans, exceptions, sharing boundaries and acceptance examples.
2. [Product scope](PRODUCT.md) — university-wide audience, desktop delivery and candidate Web boundaries.
3. [Roadmap](ROADMAP.md) — implementation, representative pilot and expansion gates.
4. [Setup](SETUP.md) — run the current checkout.
5. [Architecture](ARCHITECTURE.md) and [data model](DATABASE.md) — implementation boundaries and invariants.

## Reference

| Document | Purpose |
|----------|---------|
| [Academic calendar](HOLIDAYS.md) | Teaching weeks, vacations, cancelled and make-up classes |
| [Design system](DESIGN.md) | Brand, responsive layout and language behavior |
| [Quality](QUALITY.md) | Domain, file, UI and platform acceptance |
| [Today](TODAY.md) | Daily task counts, grouping and date refresh |
| [Editing](EDITING.md) | Course editor, local drafts and save failures |
| [Application contracts](APPLICATION.md) | Snapshot queries, revision-checked commands, drafts, reminders and restore ordering |
| [ADR-001](adr/001-local-application-boundaries.md) | Local application boundaries, alternatives and incremental implementation |
| [ADR-002](adr/002-university-wide-product.md) | University-wide goal, desktop scope and conditional extensions |
| [University integration](UNIVERSITY_INTEGRATION.md) | Supervisor support, school permission, read-only scope and connection lifecycle |
| [Security and data protection](SECURITY.md) | Private data, desktop safeguards, Web candidates and security acceptance |
| [Notifications](NOTIFICATIONS.md) | Local reminders and platform acceptance |
| [Quick import](QUICK_IMPORT.md) | Fixed-template CSV/paste for pilot onboarding |
| [Local statistics](STATISTICS.md) | Planned-time calculation, overlaps, task counts and offline acceptance |
| [Learning path](LEARNING.md) | Technology stack, teaching agreement and one-lesson workflow |
| [Release](RELEASE.md) | Staged desktop releases, university support and candidate Web gates |
| [Dart guide](DART_GUIDE.md) | Language/framework learning examples |
| [Website](../website/README.md) | Static site and deployment |

The 2026-11-10 design expands the audience from the author/classmates to all Kyushu University students while retaining local-first planning. It includes a candidate Web system and conditional school integration, excludes mobile apps, and preserves the incremental learning path. Earlier lifestyle and external-calendar proposals remain historical.

Keep existing reference paths stable, add new documents here, and update behavior specs with implementation. Avoid duplicate plans, unused dependencies and empty source directories.
