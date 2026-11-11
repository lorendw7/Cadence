# ADR-007: A general-purpose local planner

Later decision: [ADR-008](008-small-free-local-product.md) narrows the first release to themed Material controls, explicit saves, memory-only unsaved forms and ordinary local storage. Earlier UI-library, saved-draft, encryption and broad Web/sync requirements below are historical where they conflict. Web/sync is now considered only for a school connection that needs it.

**Status:** Accepted product direction; implementation remains staged and learner-led.
**Date:** 2026-11-11
**Decider:** The project owner, following the request to make software anyone can use locally rather than a product tied to Kyushu University.
**Supersedes:** The university/student-first audience in ADR-002/004, the committed Web delivery stage in ADR-004, and the school-permission gate for general Web deployment in ADR-005. School-dependent identity assumptions in ADR-006 are no longer a general sync requirement.
**Retains:** Incremental Flutter architecture, explicit saving choices, offline local use, data recovery and the applicable third-party access rules from earlier decisions.

## Context

The previous plan placed course timetables, university discussions and school-dependent Web delivery near the center of the roadmap. That made a personal planner depend on decisions many users do not need. The new goal is useful local software for everyday work, personal life, study and other commitments.

The current code is still an in-memory task-learning app. This decision changes product design and delivery order; it does not claim that local storage, schedules, the selected UI library or a release already exists.

## Decision

1. Make personal plans, tasks, Today and Week the core product. Courses are an optional use case, not an onboarding requirement. A person can use the app without a semester, organization or school identity.
2. Deliver desktop first: Windows initially, then Linux/macOS after native acceptance. No mobile product is planned. Web and multi-device sync are optional later extensions, not required work for the first useful local release.
3. Require no account, backend, school connection or runtime network request for core local planning. Previously installed desktop resources and saved records work offline. A first download still requires a delivery route.
4. On first use, clearly offer **Save on this device** and **Temporary use**. Explain restart behavior before the choice. Until saving is explicitly chosen, keep business data in memory and do not open an old private database. A prior explicit choice may be remembered. Never enable persistence through an import or a hidden default.
5. When local saving is chosen, use one local store with tested writes, recovery, backup and clear. A saved record, a recoverable draft and a cloud-confirmed record are different states. Failure keeps input and never becomes a success message.
6. Keep Today, Week and Tasks as main navigation, with Settings in the menu. Introduce advanced course tools only through an optional entry. Use a calm paper-and-ink visual style that works for meetings, home plans and study alike; keep the existing independent mark and palette.
7. General product development and release, including a possible general Web app, need no school approval. A specific school or other third-party connection still needs the relevant authentication, data-access, retention and export permission. Permission for one connection does not control the independent planner.
8. Retain Flutter and the selected shadcn_ui direction. Add packages and internal boundaries only with a working feature. The learner continues writing core application code; the assistant maintains delegated design, artwork, website, documentation and checks.

## Options considered

| Option | Benefit | Cost | Decision |
|--------|---------|------|----------|
| Keep a university-centered planner | Detailed academic workflows | Extra setup and institution-dependent assumptions for ordinary users | Retain course design only as an optional extension |
| General local planner with optional extensions | Useful without identity, network or organization; smaller first release | Users manage local backup and explicit transfer | Selected |
| Account-first cloud planner | Easy service-led access and potential sync | Hosting, identity, privacy, recovery and recurring operations before local value | Not part of the core release |

## Delivery order

First complete reliable task saving and recovery. Then add personal plans, Today/Week, bounded repeats and tested private export/restore. Validate a small desktop release with people using different daily routines. Course management, richer review/reminders, Web, sync and external connections are separate follow-up decisions or stages; none blocks the useful local core.

Keep detailed course/date rules and optional sync failure cases as reference designs. Do not create their tables, services, accounts or empty directories before those features are chosen for implementation. Re-estimate lessons and release scope against this new order instead of treating older university/Web estimates as commitments.

## Acceptance

- A new user can choose saving or temporary use, create a task and personal plan, and find them in Today/Week without entering a school or semester.
- Chosen local saving survives restart and works with the network unavailable. Temporary use leaves no business database, persistent drafts or automatic backups.
- A failed save retains input; import/restore failures leave the existing records usable. Clear reports incomplete cleanup and rejects stale writers.
- Private export and recovery work on supported versions; no hidden upload or account is required.
- The website and release notes describe only available features and tested platforms, with optional future work clearly separated.
- Any later connection can be disabled without taking away the core local planner. A general release has no school-approval gate.

See [PRODUCT.md](../PRODUCT.md) for scope, [REDESIGN.md](../REDESIGN.md) for behavior, [ROADMAP.md](../ROADMAP.md) for stages and [APPLICATION.md](../APPLICATION.md) for saving and recovery contracts.
