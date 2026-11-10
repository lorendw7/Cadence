# Documentation

Cadence is a planned **time-management application primarily for students and also suitable for teachers and other users**. Courses are one schedule category; no school identity is required. Windows/Linux/macOS and Web are confirmed targets, with no mobile app. Flutter shadcn_ui is selected but not introduced. Lessons 1–10 have passed implementation review and automated acceptance, with 26 passing tests. The application supports validated addition, completion toggling, empty-list feedback, deletion and single-level undo in memory. The learner confirmed the empty-list/add/toggle flow; deletion/undo and title-validation manual confirmation remain pending. Redundant nested setState cleanup is recorded in lesson 10. Persistence remains future work. The website is a concept presentation. The learner implements core features; the assistant handles delegated documentation/website work, teaching, review and tests. School integration remains separately optional and permission-dependent.

Latest constraint: desktop is primary; deploy the Web planner only after explicit school permission. User-selected local retention, offline use and comparable-product research are in [ADR-005](adr/005-local-offline-and-school-gated-web.md). These features are not implemented.

The 2026-11-11 [artwork update](../assets/README.md) adds a complete v2 asset library and concept-site integration. Windows/macOS launcher references are updated; Flutter page theming remains a future lesson. Browse the [visual overview](../assets/preview.png) or [asset catalogue](../assets/catalog.html).

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
| [Artwork library](../assets/README.md) | v2 brand, 56 icons, state illustrations, platform exports and visual catalogue |
| [UI components and layout](UI_ARCHITECTURE.md) | Selected shadcn_ui direction, staged migration and page/UI state design |
| [Quality](QUALITY.md) | Domain, file, UI and platform acceptance |
| [Today](TODAY.md) | Daily task counts, grouping and date refresh |
| [Editing](EDITING.md) | Course editor, local drafts and save failures |
| [Application contracts](APPLICATION.md) | Snapshot queries, revision-checked commands, drafts, reminders and restore ordering |
| [ADR-001](adr/001-local-application-boundaries.md) | Local application boundaries, alternatives and incremental implementation |
| [ADR-002](adr/002-university-wide-product.md) | University-wide goal, desktop scope and conditional extensions |
| [ADR-003](adr/003-incremental-modular-client.md) | Incremental client architecture and when to introduce each boundary |
| [ADR-004](adr/004-shadcn-web-direction.md) | shadcn_ui selection, student/teacher audience and confirmed Web target |
| [ADR-005](adr/005-local-offline-and-school-gated-web.md) | User-selected local storage, offline design, comparable products and school-gated Web deployment |
| [Future school demo](SCHOOL_DEMO.md) | Preconditions and Chinese/Japanese script; current website is concepts only |
| [University integration](UNIVERSITY_INTEGRATION.md) | Supervisor support, school permission, read-only scope and connection lifecycle |
| [Security and data protection](SECURITY.md) | Private data, desktop safeguards, planned Web data boundaries and future security acceptance |
| [Developer protection technologies](DATA_PROTECTION.md) | Encrypted storage, platform key storage, authenticated backups, safe inputs and release security; candidates not installed |
| [Multi-client sync](SYNC.md) | Conditional desktop/Web synchronization: consent, identity, outbox, conflicts, deletion, recovery and server security |
| [ADR-006](adr/006-optional-multi-client-sync.md) | Proposed optional sync service after applicable school/hosting permissions; local-only mode retained |
| [Notifications](NOTIFICATIONS.md) | Local reminders and platform acceptance |
| [Quick import](QUICK_IMPORT.md) | Fixed-template CSV/paste for pilot onboarding |
| [Local statistics](STATISTICS.md) | Planned-time calculation, overlaps, task counts and offline acceptance |
| [Lesson 4](lessons/04-state.md) | Completed state/button exercise, hot-reload versus restart experiment and acceptance results |
| [Lesson 5](lessons/05-task-row.md) | Historical TaskRow data/callback exercise; its log callback is superseded by lesson 6 |
| [Lesson 6](lessons/06-task-toggle.md) | Task completion/undo, setState debugging, 13 passing tests and learner-confirmed window behavior |
| [Lesson 7](lessons/07-title-input.md) | Text input, controller disposal, Row layout and scroll-aware testing |
| [Lesson 8](lessons/08-add-task.md) | Task addition, session IDs, input clearing and learner-confirmed operation |
| [Lesson 9](lessons/09-validation.md) | Title validation and empty-list feedback; empty-list flow manually confirmed |
| [Lesson 10](lessons/10-delete-undo.md) | Deletion and single-level undo, 26 passing tests; manual confirmation and cleanup pending |
| [Learning path](LEARNING.md) | Technology stack, teaching agreement and one-lesson workflow |
| [Curriculum](CURRICULUM.md) | 64-lesson Windows / 80–100 desktop baseline, provisional 8–16 extra Web lessons |
| [Project workflow](PROJECT_WORKFLOW.md) | Acceptance tasks, implementation, review, merge and milestone release |
| [Release](RELEASE.md) | Staged desktop/Web releases, support and data-protection gates |
| [Dart guide](DART_GUIDE.md) | Language/framework learning examples |
| [Website](../website/README.md) | Static site and deployment |

The current 2026-11-10 direction is an independent academic-journal planner for students, teachers and other users, with shadcn_ui selected and Web planned alongside desktop. School access is optional; mobile apps are excluded. ADR-002's narrower audience and Web-candidate status are historical. No functional MVP or installed UI package is implied by this documentation update.

Keep existing reference paths stable, add new documents here, and update behavior specs with implementation. Avoid duplicate plans, unused dependencies and empty source directories.
