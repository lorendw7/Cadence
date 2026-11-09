# Documentation

Cadence is being built as a **local course and personal planner** for the author and classmates. Current executable: a Today placeholder. Features in these documents are planned unless explicitly marked implemented.

## Read in this order

For a complete beginner, start with [the learning path](LEARNING.md) and [lesson 01](lessons/01-task.md). Read the reference documents as needed, not all at once.

1. [Product design / 产品设计](REDESIGN.md) — pages, course rules, personal plans, exceptions, sharing boundaries and acceptance examples.
2. [Product scope](PRODUCT.md) — audience and first-release boundaries.
3. [Roadmap](ROADMAP.md) — implementation order and estimates.
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
| [Notifications](NOTIFICATIONS.md) | Local reminders and platform acceptance |
| [Quick import](QUICK_IMPORT.md) | Candidate fixed-template CSV/paste workflow |
| [Local statistics](STATISTICS.md) | Planned-time calculation, overlaps, task counts and offline acceptance |
| [Learning path](LEARNING.md) | Technology stack, teaching agreement and one-lesson workflow |
| [Release](RELEASE.md) | Desktop packages for classmates through GitHub Releases |
| [Dart guide](DART_GUIDE.md) | Language/framework learning examples |
| [Website](../website/README.md) | Static site and deployment |

The current design replaces the earlier general lifestyle app and external-calendar proposals. Those plans are not additional requirements; repository history preserves earlier versions.

Keep existing reference paths stable, add new documents here, and update behavior specs with implementation. Avoid duplicate plans, unused dependencies and empty source directories.
