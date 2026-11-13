# ADR-006: Optional multi-client sync

Scope update (2026-11-13): [ADR-011](011-optional-sync-service.md) supersedes this study for optional personal sync. [ADR-013](013-local-planner-and-conditional-academic-access.md) sets direct Windows planning first and Android next, with optional unscheduled screenshots. School feasibility is deferred. Personal-service implementation and ads remain for review after store launch. Earlier scope and platform limits below are historical.

**Status:** Historical proposal, not implemented. The design below preserves an earlier sync study. Its school-dependent assumptions and mobile exclusion do not override ADR-009, ADR-010 or the current [roadmap](../ROADMAP.md). Reconsider only the parts supported by a later product decision.
**Date:** 2026-11-10; wording clarified on 2026-11-11.
**Deciders:** The maintainer and a future operator. A chosen external provider confirms permissions for its own identity/data service, where required.

## Context

An earlier request explored task/schedule sync across desktop and a future Web client while keeping offline use. The current ADR-007 direction makes this optional, not part of the first useful local release. Local-only planning requires no account or server. If sync is selected, identity, cloud storage and operating responsibilities need their own design. A school provider is only one possible integration; school login, timetable reads and cross-device school-data hosting remain separate permissions. Mobile apps remain excluded.

## Proposed decision

If sync is selected, use one HTTPS API and PostgreSQL as the first technical candidate. Clients keep local storage and use a durable outgoing queue, repeat-safe operations, server record versions and incremental change cursors. Start with one person's devices, not collaboration. Choose identity without requiring school membership for general use. [SYNC.md](../SYNC.md) defines the proposed contract.

Login does not upload existing local data. First enablement previews the workspace and permitted school fields. Keep independent local and sync-enabled workspaces separate. A user may sign in to view cloud data in temporary Web mode, but refresh does not preserve offline data or unconfirmed edits.

## Options considered

| Option | Benefit | Cost or limit | Decision |
|--------|---------|---------------|----------|
| Sync the SQLite file through a cloud drive | Appears to avoid a service | Live database files, WAL, locks and concurrent recovery are unsafe as a record-sync protocol | Reject |
| One API, PostgreSQL and versioned record sync | Clear authorization, transactions, constraints and failures | Needs operations, backup, identity and conflict handling | Recommended first stage |
| General CRDT and live collaboration from the start | Helps collaborative editing | Cross-record timetable rules, deletion and permissions still need separate work; much higher learning cost | Defer |
| Client-side end-to-end encryption | Reduces server access to private content | Harder key distribution/recovery, encrypted conflicts, server checks and Web trust | Assess separately; do not claim it is supported |

The first proposed stage uses TLS, controlled server-storage encryption, application authorization and database isolation. The server process can read content; disclose that the operator has this capability. Disk encryption is not end-to-end encryption. If the operator must never read content, this stage is insufficient: complete and review an end-to-end design first or keep local-only use.

## Consequences

- Real multi-client sync creates cloud business-data copies. It is a different deployment mode from the local-only design and cannot claim zero server data.
- School-source refresh and private-data sync are separate flows. School changes still require the existing preview and confirmation rules.
- Offline edits can transfer automatically after reconnection, but meaningful conflicts require a user decision. Do not promise invisible merging of every change.
- Sync is not backup. Mistakes, deletions and malicious changes may propagate to other devices.
- This proposal does not alter current teaching code or commit to a Web release. Sync, identity and operations need separate lesson estimates and a reason to maintain the service.

## Follow-up

- [ ] Choose identity and account-lifecycle rules for general users. If a school provider or school data is involved, confirm its permission, hosting rights and expiry handling separately.
- [ ] Assign the service operator, domain, cost, data region, log/backup retention and deletion duties.
- [ ] Prototype with two fictional-data clients: repeated submission, disconnection, conflicts and deletion propagation come first.
- [ ] Choose implementation language, framework and hosting only after the requirements are known; do not assume a platform or purchase.
- [ ] Complete authorization tests, recovery drills and a limited trial before real multi-client use.
