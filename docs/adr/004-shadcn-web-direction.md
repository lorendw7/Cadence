# ADR-004: shadcn_ui and a student/teacher planner for desktop and Web

Later decisions: [ADR-008](008-small-free-local-product.md) retains shadcn_ui, explicit saves, memory-only unsaved forms and ordinary local storage. [ADR-013](013-local-planner-and-conditional-academic-access.md) now sets direct planning on Windows first, Android next, optional screenshots and deferred school-access extension. ADR-011 retains the later personal-sync design. Conflicting delivery requirements below are historical.

**Status:** Partially superseded by [ADR-007](007-general-purpose-local-planner.md), ADR-009 and ADR-010. The selected shadcn_ui library and independent palette remain. The student-first audience, school-dependent Web work and earlier delivery commitments are historical. The current product is a general local planner with a free desktop edition first.
**Date:** 2026-11-10
**Supersedes:** ADR-002's Kyushu-student-only audience and Web-candidate status, and the earlier Material-only product UI recommendation.

**Later refinements:** [ADR-005](005-local-offline-and-school-gated-web.md) introduced explicit retention, IndexedDB and a school-gated Web policy. ADR-007 keeps the retention/storage design but removes the gate for general product/Web release. The original decision below is retained as history, not the current delivery promise.

## Decision

Cadence primarily serves students and is also suitable for teachers and other people organizing time. Courses are one schedule category; no school identity is required. Keep an independent academic-journal identity: muted wine `#7C394B`, warm paper `#F6F5F1`, sage `#6F877C`. Do not reproduce the university's official image or imply endorsement.

Select Flutter's **pub.dev `shadcn_ui` package**, distinct from `shadcn_flutter` and React shadcn/ui. It has not been added. The learner continues implementing the application through `lib/main.dart` and course-specific modules; Material may remain during initial lessons. The assistant maintains delegated docs/website content, teaches, reviews and prepares appropriate tests/templates, but does not write the core application for the learner.

Web is now a confirmed development target alongside Windows/Linux/macOS. No mobile app is planned. The first Web plan is a browser-local application: manual course/personal-entry CRUD, bounded weekly repeats, Today/Week, tasks/completion, three languages, memory default, explicit local saving, strict JSON preview/replacement/export and clearing. Proposed transfer limits are 1 MiB UTF-8 and 2,000 total records. The small-snapshot storage option is localStorage, subject to failure/recovery validation during implementation.

No implementation or functional MVP is implied. At the time of this decision, the app was a Today placeholder with task-model exercises; the website shows concepts. Initial Web scope excludes backend/accounts, cloud sync, school APIs, CSV, notifications and single-occurrence changes. Broader desktop behavior remains separately staged.

## Consequences

- Introduce shadcn_ui in the relevant learner-led UI stage after compatibility, license and dependency checks. Do not preinstall unused runtime packages.
- Preserve incremental domain/application boundaries from ADR-001/003. Browser storage does not automatically implement SQLite guarantees.
- Verify privacy, explicit saving, strict JSON, failed writes, clearing and deployed behavior before a real-data trial. Same-origin website/app paths share script/storage trust.
- Keep the 64/80–100 desktop lesson estimates. A basic no-backend Web extension provisionally adds 8–16 lessons only if desktop behavior is reusable; school integration/backend work remains separate. Estimates do not certify completion.
- Prepare a fictional-data school demonstration after behavior passes acceptance. School approval is not a prerequisite for independent manual planning; official identity/data access remains separately authorized.

See [PRODUCT.md](../PRODUCT.md), [SECURITY.md](../SECURITY.md), [CURRICULUM.md](../CURRICULUM.md) and [SCHOOL_DEMO.md](../SCHOOL_DEMO.md).
