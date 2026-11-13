# ADR-008: Keep the free local product small

Scope update (2026-11-13): [ADR-013](013-local-planner-and-conditional-academic-access.md) now sets direct general planning and basic occurrence corrections on Windows first, Android next, optional unscheduled screenshots and deferred school-access extension. All platform targets remain. Explicit saves, local privacy and small learner-owned increments remain. Conflicting deferrals and school-dependent service assumptions below are historical.

**Status:** Accepted for the small local core; scope limits are partly superseded as described above. This is a design decision, not implemented behavior.
**Date:** 2026-11-11
**Deciders:** The maintainer requested a simpler free local product and limited Web/sync work to school connections that need it.

## Context

The plans grew beyond the needs of one person using one computer. They required saved editing drafts, encrypted storage and key recovery, many architecture layers and detailed Web/sync work before these needs were proven. Screenshot import already aims to reduce manual work rather than promise perfect recognition.

## Decision

- Build a free Windows local planner first. Keep Today, Week, Tasks and the independent journal style. Other desktop packages follow native testing.
- Keep Flutter shadcn_ui and a shared theme. Introduce it gradually with used controls and no extra wrapper framework. Existing Material controls may remain during lessons. Keep the accepted layout and current teaching exercise.
- Use one workspace, one writer and one small drift/SQLite adapter when saving is taught. Share state with ordinary Flutter tools first. Add a boundary or package only for a working feature.
- Keep the explicit Save on this device / Temporary use choice. Use explicit editor Save and in-memory unsaved input. Persistent draft recovery is deferred.
- Use ordinary local SQLite and a versioned, unencrypted JSON backup first. Explain that both contain private data. Do not advertise encrypted storage. Encryption and password recovery need a later decision and tests.
- Use one workspace timezone, initially the system timezone. Do not change saved times silently after travel. Start with one-off plans and bounded weekly repeats edited as a whole series. Per-occurrence changes and multiple timezones are later work.
- Keep screenshot/table import and optional personal AI keys as later enhancements. Local use stays complete without them. No PDF import, AI relay, paid Cadence service or automatic cloud fallback.
- Plan Web or synchronization only when a specific school connection needs them. A local source adapter may be enough. The general planner has no Web client or personal cloud-sync delivery track.
- Specify the school connection boundary in documents. Do not create empty adapters, server packages, queues or tables. School access approval applies to that source, not the local app's release.

## Options considered

| Option | Benefit | Cost |
|---|---|---|
| Build the full earlier design | More recovery, security and remote features at once | More dependencies, packaging work, failure states and maintenance before useful local use |
| Keep a small local release, then add proven needs | Lower maintenance cost and a shorter learning path | No crash recovery for unsaved forms, application-level encryption or cross-device service in the first release |

Choose the second option. Keep transaction safety, input validation, backup recovery and honest save errors. Removing advanced features does not permit data loss or false privacy claims.

## Consequences

This refines ADR-007. It keeps ADR-004's shadcn_ui choice while replacing the earlier default encryption, persistent-draft and broad Web/sync plans. Historical ADRs remain at their paths. ADR-006 and SYNC.md are reference material for a separately justified school need, not an implementation backlog.

A person with access to the OS account or copied local files may read an unencrypted planner. Unsaved form input may be lost on a crash. State both limits clearly. Keep AI keys in memory or an explicitly selected OS credential store; never put them in the ordinary database or backup.

## Action items

1. [ ] Continue learner-written task/UI lessons with the existing theme and controls.
2. [ ] Implement and test local saving, explicit editing and recovery before extensions.
3. [ ] Measure the complete screenshot-to-correct-schedule effort before claiming a benefit.
4. [ ] Revisit advanced work only with a concrete user problem and a small acceptance plan.
