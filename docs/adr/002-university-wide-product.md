# ADR-002: A local-first planner for students across Kyushu University

**Status:** Historical. [ADR-004](004-shadcn-web-direction.md) first broadened the audience; [ADR-007](007-general-purpose-local-planner.md) now replaces the university-centered scope with a general local planner. School integration is optional, not a delivery path or release gate. Local-first behavior and authorization for any specific school connection remain valid.
**Date:** 2026-11-10
**Deciders:** Cadence maintainer, following the user's university-wide product goal.
**Related:** [Product](../PRODUCT.md), [behavior](../REDESIGN.md), [university integration](../UNIVERSITY_INTEGRATION.md), [ADR-001](001-local-application-boundaries.md).

The text below preserves the decision at that time. Use ADR-007 and [PRODUCT.md](../PRODUCT.md) for the current general audience, selected-but-not-installed shadcn_ui and optional Web/sync extensions. No university-wide rollout is currently promised.

## Context

The original design targeted the author and classmates on desktop. The new goal is to serve students across Kyushu University, including different campuses, undergraduate/graduate study, language needs and accessibility requirements. The user explicitly excludes mobile applications and asks to include a web system as a candidate. A small desktop trial remains useful evidence, but cannot establish that this broader audience can use the product.

At the time of this decision, the application was a Today placeholder with a separate task-model exercise. Desktop runners and legacy Android scaffolding exist; no iOS or web runner exists. School approval, a supported timetable-data interface, browser feasibility and any backend hosting are not established. The static project website is separate from a web planner. The broader audience must not turn these unknowns into implementation claims or force beginners to build unused infrastructure.

## Decision

1. Retain Flutter and ADR-001's pure domain, application-owned ports, local writer and bounded shared projector. Keep manual planning, local import, backup and daily use available offline without a university or Cadence account.
2. Target Windows, Linux and macOS; do not develop or release Android/iOS applications. Keep a web planner as a feasibility candidate. Compare client-local static delivery with a backend only if confirmed requirements need one, and assess storage/recovery, sessions, browser security and operating costs before selecting an implementation. Explicitly name supported/tested platforms at each release.
3. Treat school-approved identity login and read-only timetable import/refresh as separate optional capabilities. Both permission and technical feasibility require confirmation. A willing academic supervisor may help establish a university contact, but is not evidence of approval or university endorsement.
4. Route an approved source through normalization, provenance, a reviewable change preview and atomic local application. Preserve personal edits, show source freshness and keep saved data usable when disconnected. Defer protocol-specific interfaces, schema migrations and credentials until the approved contract is known.
5. Do not collect university passwords or use unapproved scraping as an integration fallback. Keep any required desktop session material in suitable platform secure storage and out of backups, sharing and diagnostics. Browser storage is not an OS credential vault. A web or integration server requires a separate architecture/operating plan with object-level authorization, student-data isolation, secure sessions and explicit data retention; it is not a dependency of the local core. Follow [SECURITY.md](../SECURITY.md).
6. Validate actual timetable diversity, language and accessibility needs with representative student pilots. School presets must disclose provenance/applicability. Do not infer official enrollment, cancellation or university endorsement from imported or community-provided data.

## Options considered

| Option | Benefit | Limitation | Decision |
|--------|---------|------------|----------|
| Keep the author/classmate desktop scope | Smallest initial effort | Does not meet the broader audience and timetable-coverage goal | Retain only as an early pilot |
| Require school login and a central backend for all use | Could centralize later integrations | Blocks local value on unconfirmed permission and ongoing operations | Not selected |
| Local-first desktop core, a web candidate and optional authorized source adapters | Delivers useful independent workflows while evaluating wider browser access | Needs platform acceptance, provenance, security assessment and a broader support plan | Selected |

## Consequences

- The previous desktop-only estimate is not the cost or schedule of university-wide delivery. Re-estimate after pilot evidence, platform feasibility and integration decisions.
- Official integration can advance in parallel with local development. If unavailable, the app still supports manual entry and validated local file/paste import, without claiming live university updates.
- Authentication proves identity, not permission to read enrollment. An authentication approval alone does not satisfy a timetable-data integration gate.
- Wide availability requires support ownership, privacy/data recovery, dependable upgrades and native-device checks in addition to feature code. Release criteria live in [RELEASE.md](../RELEASE.md) and [QUALITY.md](../QUALITY.md).
- Current learner exercises and application code remain unchanged. Introduce each boundary only with a working, verified feature.

## Revisit when

An approved school interface requires a hosted component; cross-device synchronization becomes a confirmed requirement; representative timetables expose a domain-model gap; browser feasibility is established or ruled out; or measured usage justifies background refresh. Record the evidence and a separate decision before expanding those commitments. A university-wide audience does not reopen mobile development without an explicit scope change.
