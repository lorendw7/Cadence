# ADR-011: A small optional sync service

**Status:** Accepted design; implementation and service launch remain deferred.
**Date:** 2026-11-13
**Deciders:** The maintainer selected Node.js, TypeScript, Fastify, PostgreSQL and Google login, with a JPY 2,500 monthly operating budget.

**Later priority update:** [ADR-013](013-local-planner-and-conditional-academic-access.md) retains direct general planning and phone viewing, makes screenshots optional, and defers school access as a later extension. The first working local flow is developed on Windows, then validated on Android without waiting for all desktop releases. This changes the earlier delivery order, not the selected service stack, budget or post-store implementation gate.

## Context

Cadence should work locally without an account. A later service may help one person keep tasks and plans consistent across devices. It must preserve the same free functions and common service limits for everyone. A small service is more manageable than a broad hosted platform, but still needs access control, conflict handling, backup and recovery.

[ADR-010](010-open-multiplatform-free-first.md) set a desktop-first order when this service was selected; ADR-013 now owns the Windows-to-phone sequence. Choosing the future service stack does not start backend implementation, move cloud work into the local milestone or authorize a server purchase. The learner continues core features through lib/main.dart. The current app keeps task data in memory.

## Decision

- Use one Node.js service written in TypeScript with Fastify, and one PostgreSQL database. Select a maintained, patched Node.js LTS release when implementation starts. Keep local Flutter storage separate: the planned native store remains drift/SQLite, with platform-specific validation.
- Use direct Google login for optional sync. Verify Google identity on the server and map its stable subject identifier to a Cadence user. Do not create a Cadence password system or require a school account. Local use needs no login.
- Plan for one small Linux VPS, initially using 2 GB RAM as a test configuration. The service and database may share that machine. Keep backups outside it. This is a single-server pilot, not high availability.
- Use JPY 2,500 per month as the operating planning budget. It includes allowances for hosting, a domain and separate backups. It is not a provider billing cap, a server order or a promise of unlimited capacity.
- Sync only the user's chosen tasks, personal plans and essential settings. Exclude attachments, screenshots, cloud AI, shared workspaces and school connections from the first service.
- Use bounded incremental sync with record versions, repeat-safe operations and explicit conflict recovery. Signing in does not upload or replace existing data. A cloud failure must leave local work and export usable.
- Keep one free feature set and the same published service rules for everyone. No payment or ad view grants more functions or capacity. Advertising remains a separate later decision with measured revenue.

The current contract and open implementation decisions belong in [CLOUD_SYNC.md](../CLOUD_SYNC.md). The older [SYNC.md](../SYNC.md) is historical reference, not the selected service specification.

## Options considered

| Option | Benefit | Cost or limit | Decision |
|---|---|---|---|
| Node.js, TypeScript, Fastify and PostgreSQL | A small API with schema validation, maintained Google identity support and a conventional database | The maintainer still owns sync logic, access rules and operations | Selected |
| Managed Supabase | Less host and database administration | Paid service cost and platform limits; still needs offline sync design | Retained comparison, not the selected backend |
| PocketBase | Compact deployment with accounts and an API | Pre-1.0 compatibility and migration limits need care for long-lived private data | Suitable research alternative, not selected |
| Workers with D1 | Low initial infrastructure cost | Different database and runtime model; identity and sync still need integration | Not selected |
| A full self-hosted platform or several services | More facilities available in advance | More memory, deployment and maintenance work than the first service needs | Defer |

## Consequences

Google handles Google-account passwords and recovery. Cadence still owns service sessions, record access, account deletion and the link between local and cloud workspaces. A person who cannot use Google must still be able to use the local product.

One server limits fixed cost but creates a common failure point. Tested off-server backups and continued local use are essential. Published quotas, admission rules and stop conditions must follow measured costs and capacity; they are not determined by this budget alone.

Node.js is suitable for small requests that wait on database and network operations. Large computations and unbounded input can block other work. Framework benchmarks do not establish Cadence's capacity. Use a complete workload test before stating a user limit.

## Scope and precedence

This decision selects the previously undecided service stack, identity route and planning budget. It supplements ADR-010 and supersedes the corresponding choices in the historical ADR-006/SYNC study. It does not remove any platform target or require a Web client before sync. ADR-013 separately defers school feasibility; its costs and access permission are outside this personal-sync decision. The existing GitHub Pages concept website remains the public site.

The delivery order in ADR-013 and post-store service review in [ROADMAP.md](../ROADMAP.md) apply. Local import, manual timetable corrections and general planning do not need a backend. No account controls, ad SDKs, backend packages, cloud tables or empty service folders are added by this documentation decision.

## Gates before implementation and launch

- Confirm a recurring cross-device problem from research and usable local planning first.
- Review the session, conflict, deletion, quota and recovery rules in CLOUD_SYNC.md before adding a client queue or server endpoint.
- Implement through focused learner-owned work after the service stage is scheduled.
- Verify identity, cross-account isolation, offline changes, retries, conflicts, restore and service shutdown.
- Load-test the actual service, verify off-server restore, and review actual monthly charges before opening a limited pilot.

## References

Reviewed 2026-11-13: [Node.js release policy](https://nodejs.org/en/about/previous-releases), [Fastify validation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/), [Google token verification](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token), [PostgreSQL backup methods](https://www.postgresql.org/docs/current/backup.html), [Sakura VPS pricing](https://vps.sakura.ad.jp/).
