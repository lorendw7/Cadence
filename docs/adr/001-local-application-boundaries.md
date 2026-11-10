# ADR-001: A local application layer and one schedule projection

**Status:** Accepted for local application boundaries; implementation is incremental. [ADR-007](007-general-purpose-local-planner.md) defines the current general-purpose local product and optional extensions. Earlier university/audience assumptions below are historical. The learner remains the core implementation author.
**Date:** 2026-11-09
**Deciders:** Cadence maintainer; the learner remains the author of application code.

## Context

At the time of this decision, Cadence was scoped as a single-user desktop planner without a server. Today, Week, review and reminders need the same interpretation of saved records. Draft writes can finish out of order, and OS notifications cannot join SQLite transactions. The first learning exercises still cover a small task model, so boundaries must grow with working features.

The earlier 2026-11-10 product expansion targeted students across Kyushu University through desktop applications, with a web application candidate and conditional authorized university integration. Mobile applications are outside scope. ADR-002 extends the audience and integration assumptions while retaining this decision's local transactions, ports and shared projector. It does not make university access or a server a prerequisite for the local application.

## Decision

Use a pure Dart domain, application-owned commands/queries/ports, database/platform adapters and wiring in `app/`. Persist canonical rules and exceptions; derive bounded occurrences from one consistent read snapshot. Reuse that projector across consumers, while keeping file payload construction separate for privacy and preservation of repeating rules.

Use local root revisions for writes and a data generation for query/preview invalidation. Commit database mutations atomically, reconcile reminders afterward and on restart, and serialize draft saves. Introduce these mechanisms with persistence and shared views. Contracts are in [APPLICATION.md](../APPLICATION.md).

## Options considered

| Option | Complexity | Trade-off | Decision |
|--------|------------|-----------|----------|
| Widgets call storage/plugins directly | Low initially | Rules and error handling spread across screens | Only for the initial in-memory exercise |
| Small application layer with explicit ports | Moderate when introduced | More value mapping, isolated tests and reusable rules | Selected, per working slice |
| Generic repository framework, event bus and stored occurrence cache | High | Extra cache invalidation, framework and versioning work | Not justified by current scope |

## Consequences

- Additional command/adapter files make revision conflicts and storage failure testable without rendering widgets.
- On-demand bounded projection avoids a second persisted schedule. Profile real queries before adding caching or isolates.
- Coarse generation invalidation may refresh unrelated previews; narrow it only when measurements justify the complexity.
- One writer per data directory simplifies drafts and reminders; multi-window/process editing requires another decision.
- OS submission and local bookkeeping cannot guarantee exactly-once delivery. Saved-data and reminder status remain separate.
- Review is recalculated from current records; this design does not add an immutable audit history.

## Action items

- [x] Document dependencies, command/query contracts and failure handling.
- [x] Align schema proposal, roadmap and acceptance examples.
- [x] Complete the learner's model and basic in-memory task list; current acceptance and remaining manual checks are in [LEARNING.md](../LEARNING.md).
- [ ] Add storage ports, revisions and ordered drafts with persistence.
- [ ] Test the shared projector before connecting multiple schedule consumers.
- [ ] Validate instance ownership and reminder reconciliation on each desktop OS; verify browser storage/lifecycle/writer behavior for the planned Web version under ADR-004; do not imply the full SQLite design is implemented there.

Revisit for confirmed multi-process editing, cloud sync, durable history or measured query bottlenecks. Approved source adapters must follow the local import/preview contracts; they do not bypass this decision's writer or transaction boundaries.
