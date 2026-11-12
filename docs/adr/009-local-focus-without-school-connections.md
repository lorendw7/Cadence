# ADR-009: Focus on local use and remove school connections

**Status:** Partially superseded by [ADR-010](010-open-multiplatform-free-first.md). School connections stay excluded. The earlier Web/mobile scope limits below are historical. Complete the free edition before reviewing cloud services and income. Not an implemented feature.
**Date:** 2026-11-12
**Deciders:** The maintainer requested a more usable, easier-to-maintain planner and removed external academic systems from the current plan.

## Decision

- Keep one independent local desktop planner for work, study and everyday life. Today, Week and Tasks remain the main design.
- Remove external academic-system connections, school login, automatic timetable retrieval and school-specific source adapters from the active scope. There is no school integration milestone.
- Keep Web delivery, cloud synchronization, account services and remote queues out of the development plan. The existing GitHub Pages concept website remains separate from the desktop app.
- Keep manual entry, clear editing, local saving or temporary use, and one private backup/restore flow as the priorities. Local study plans do not require a course platform or a school account.
- Refine keyboard use, readable layouts, error recovery and a small number of clear actions before adding extensions.
- Keep screenshot/table import and personal-key AI notes as separate later studies. They are not first-release gates or a reason to add packages, credentials or network code now. Evaluate one improvement only after the local flow works and its benefit can be measured.
- Preserve the learner's application work. This decision authorizes documentation and website changes, not assistant implementation of future Flutter features.

## Maintenance boundary

Use one workspace and one writer. Add only controls and dependencies used by a working lesson. Keep one source of truth for tasks and plans and use it for every view. Avoid plugin systems, parallel UI layers, empty adapters and speculative settings. A simple task needs only a title; show advanced fields only when needed.

Local use must not depend on a service being available. Fewer integrations do not relax validation, confirmed saves, backup recovery, privacy or accessible controls.

## Relationship to earlier plans

This supersedes the school-connection exception in ADR-007 and ADR-008. Their other local-product decisions remain. UNIVERSITY_INTEGRATION.md, SCHOOL_DEMO.md, SYNC.md and earlier connection proposals stay at their existing paths as historical references, not active work. Reopening any external connection requires a new explicit product decision.

## Acceptance

The website and active product/roadmap documents must agree on this scope. The website must keep concept previews separate from implemented memory-only tasks. Documentation checks do not prove that saving, scheduling or a product release exists. Current application progress remains in [the learning log](../LEARNING.md).
