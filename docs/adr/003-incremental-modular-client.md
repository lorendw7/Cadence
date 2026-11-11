# ADR-003: Build one modular client through working features

**Status:** Accepted for incremental desktop architecture. [ADR-007](007-general-purpose-local-planner.md) now defines a general local core with optional courses. [ADR-008](008-small-free-local-product.md) limits Web and sync work to school connections that need them. The shadcn_ui choice from ADR-004 remains; earlier audience and platform commitments below are historical. The learner continues to implement core stages.
**Date:** 2026-11-10
**Deciders:** Cadence maintainer; the learner continues to implement application code.
**Related:** [ADR-001](001-local-application-boundaries.md), [ADR-002](002-university-wide-product.md), [architecture](../ARCHITECTURE.md), [UI architecture](../UI_ARCHITECTURE.md), [project workflow](../PROJECT_WORKFLOW.md).

## Context

At the time of this decision, Cadence targeted Kyushu students through desktops with Web as a candidate. ADR-004 later selected a broader student/teacher audience and committed Web target. ADR-007 replaces those audience/delivery assumptions with a general local planner and optional Web. Mobile apps remain excluded; any school connection needs its own permission. The local core must be useful without a server or school account.

At the time of this decision, the executable was a Today placeholder. Current lesson progress is tracked in [LEARNING.md](../LEARNING.md). A plain task model exists as a learner exercise; there is no persisted task editor, shared schedule or application layer. ADR-001's ports, transactions and projector are valuable for the eventual product, but creating every layer before the first list would add complexity without working behavior. The design must support data safety and future growth while keeping each lesson understandable.

## Decision

Build one client package per target, with clear internal responsibilities and one authoritative local store when saving is enabled. Retain Flutter, pure Dart domain logic, application-owned operations and adapters. There are no separately deployed modules or mandatory backend services. [ADR-005](005-local-offline-and-school-gated-web.md) later adds the explicit temporary/local saving choice.

Introduce structure by observable need:

1. The task model/list uses plain values, feature widgets and local `setState`. No persistence or restart durability is implied.
2. The first saved task flow adds a small application read/write boundary, its storage port and a drift/SQLite adapter, with startup wiring and honest loading/save failures. Under the later ADR-005, choose temporary or local storage before reading private data. Do not introduce future course, import or authentication tables.
3. Shared async consumers justify Riverpod dependency/query ownership. Keep editor input and transient UI state local where possible; add recoverable draft coordination with the editor feature. State-management packages do not own SQL or replace transaction checks.
4. Personal plans and multiple schedule views introduce one bounded pure projector. Optional courses extend it later. Today, Week, conflicts and any later review/reminders reuse its interpretation rather than building their own recurrence logic.
5. Files and approved external sources produce validated candidates and previewed transactions. Platform effects remain separate from local commits. Web or school-specific interfaces are defined only when the corresponding feasibility/authorization gate supplies a real contract.

Group widgets/controllers under their feature and domain/application operations under the corresponding capability. No feature imports another feature's controller. Put a feature-specific port beside its use case; move it to a shared ports module only when it is reused. Reuse presentation components according to the UI design without coupling domain rules to Flutter widgets or plugin types.

## Options considered

| Option | Complexity and cost | Growth and reliability | Team fit | Decision |
|--------|---------------------|------------------------|----------|----------|
| Keep all production behavior in widgets | Low for a model/list exercise; later cleanup grows | SQL, recurrence and failure handling become coupled to screens | Easy starting point, poor durable boundary | Limit to the initial in-memory exercise |
| Build the entire layered framework before features | High initial ceremony, speculative interfaces and unused dependencies | Many abstractions without evidence they solve actual flows | Makes small beginner lessons depend on unrelated concepts | Not selected |
| One modular client, adding boundaries with working features | Moderate cost when each boundary becomes useful | Local transactions and reusable rules grow without independent services | Fits one maintainer and incremental teaching | Selected |
| Introduce a backend, microservices or many packages now | Deployment, account and operations cost before confirmed need | Adds distributed failure modes and data exposure; no current requirement demands it | Exceeds the local product and learning needs | Defer until a separate justified decision |

## Trade-offs and consequences

- The first list is easy to teach and verify, but its state ownership will deliberately move behind persisted queries when storage is introduced. Treat that small refactor as a planned learning step.
- Saved records have one owner. Controllers hold input/status and read-only snapshots; they do not keep competing mutable copies. Pending state precedes confirmed success, and save failure retains input.
- The projector centralizes demanding date rules: semester-relative teaching weeks, original occurrence identity after a move, bounded expansion, named source timezones and half-open overlap intervals. It must be tested before multiple consumers depend on it.
- Concrete ports and typed outcomes make storage failures and stale edits testable without Flutter. They add files when needed, without requiring generic repositories, command buses, event sourcing, service locators or a separate class for every pure operation.
- A larger audience requires tested platforms, representative academic coverage and maintainable support, not automatic service decomposition. Browser storage and any later server need their own contracts and [security acceptance](../SECURITY.md).
- No folders, runtime packages, schemas or application implementations are added merely by accepting this ADR. Installed dependencies remain those in `pubspec.yaml`.

## Action items

- [x] Document implementation triggers and canonical state ownership in the architecture/application references.
- [ ] Complete the learner's in-memory task UI with explicit data-loss behavior.
- [ ] Add one persisted task flow and verify restart, save failure and uncertain retry handling before expanding storage.
- [ ] Introduce shared query wiring only when the implemented consumers need it.
- [ ] Test course projection and change previews before connecting multiple schedule views.
- [ ] Reassess module boundaries using actual duplication, failure modes or measured performance, not folder count.

Revisit for a confirmed shared backend, cross-device synchronization, multiple independent development teams, browser feasibility or measured local-query bottlenecks. This decision refines implementation timing under ADR-001 and preserves ADR-002's platform, authorization and local-first boundaries.
