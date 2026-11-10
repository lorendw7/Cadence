# Documentation

Cadence is a planned **time-management application primarily for students and also suitable for teachers and other users**. Courses are one schedule category; no school identity is required. Windows/Linux/macOS and Web are confirmed targets, with no mobile app. Flutter shadcn_ui is selected but not introduced. The current executable remains a Today placeholder with task-model exercises; the website is a concept presentation. The learner implements core features, while the assistant handles delegated documentation/website work, teaching, review and tests/templates. School integration remains separately optional and permission-dependent.

## Read in this order

For a complete beginner, start with [the learning path](LEARNING.md) and [lesson 01](lessons/01-task.md). Read the reference documents as needed, not all at once.

1. [Product design / 产品设计](REDESIGN.md) — pages, course rules, personal plans, exceptions, sharing boundaries and acceptance examples.
2. [Product scope](PRODUCT.md) — student/teacher audience, desktop and planned browser-local scope.
3. [Roadmap](ROADMAP.md) — implementation, representative pilot and expansion gates.
4. [Setup](SETUP.md) — run the current checkout.
5. [Architecture](ARCHITECTURE.md) and [data model](DATABASE.md) — implementation boundaries and invariants.

## Reference

| Document | Purpose |
|----------|---------|
| [Academic calendar](HOLIDAYS.md) | Teaching weeks, vacations, cancelled and make-up classes |
| [Design system](DESIGN.md) | Brand, responsive layout and language behavior |
| [UI components and layout](UI_ARCHITECTURE.md) | Selected shadcn_ui direction, staged migration and page/UI state design |
| [Quality](QUALITY.md) | Domain, file, UI and platform acceptance |
| [Today](TODAY.md) | Daily task counts, grouping and date refresh |
| [Editing](EDITING.md) | Course editor, local drafts and save failures |
| [Application contracts](APPLICATION.md) | Snapshot queries, revision-checked commands, drafts, reminders and restore ordering |
| [ADR-001](adr/001-local-application-boundaries.md) | Local application boundaries, alternatives and incremental implementation |
| [ADR-002](adr/002-university-wide-product.md) | University-wide goal, desktop scope and conditional extensions |
| [ADR-003](adr/003-incremental-modular-client.md) | Incremental client architecture and when to introduce each boundary |
| [ADR-004](adr/004-shadcn-web-direction.md) | shadcn_ui selection, student/teacher audience and confirmed Web target |
| [Future school demo](SCHOOL_DEMO.md) | Preconditions and Chinese/Japanese script; current website is concepts only |
| [University integration](UNIVERSITY_INTEGRATION.md) | Supervisor support, school permission, read-only scope and connection lifecycle |
| [Security and data protection](SECURITY.md) | Private data, desktop safeguards, planned Web data boundaries and future security acceptance |
| [Notifications](NOTIFICATIONS.md) | Local reminders and platform acceptance |
| [Quick import](QUICK_IMPORT.md) | Fixed-template CSV/paste for pilot onboarding |
| [Local statistics](STATISTICS.md) | Planned-time calculation, overlaps, task counts and offline acceptance |
| [Learning path](LEARNING.md) | Technology stack, teaching agreement and one-lesson workflow |
| [Curriculum](CURRICULUM.md) | 64-lesson Windows / 80–100 desktop baseline, provisional 8–16 extra Web lessons |
| [Project workflow](PROJECT_WORKFLOW.md) | Acceptance tasks, implementation, review, merge and milestone release |
| [Release](RELEASE.md) | Staged desktop/Web releases, support and data-protection gates |
| [Dart guide](DART_GUIDE.md) | Language/framework learning examples |
| [Website](../website/README.md) | Static site and deployment |

The current 2026-11-10 direction is an independent academic-journal planner for students, teachers and other users, with shadcn_ui selected and Web planned alongside desktop. School access is optional; mobile apps are excluded. ADR-002's narrower audience and Web-candidate status are historical. No functional MVP or installed UI package is implied by this documentation update.

Keep existing reference paths stable, add new documents here, and update behavior specs with implementation. Avoid duplicate plans, unused dependencies and empty source directories.
