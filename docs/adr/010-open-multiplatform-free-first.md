# ADR-010: Open source, multiple platforms, free edition first

**Status:** Accepted free-access and platform direction; delivery order partly superseded by [ADR-013](013-local-planner-and-conditional-academic-access.md). Not implemented or released.
**Date:** 2026-11-12
**Deciders:** The maintainer requested continued open-source development and multiple platforms, then prioritized the free desktop edition. All users get the same functions. Paid expansion and membership tiers are excluded; advertising is only a possible future revenue source.

**Later selection (2026-11-13):** [ADR-011](011-optional-sync-service.md) selects Node.js, TypeScript, Fastify, PostgreSQL and Google login for the later optional sync service, with a JPY 2,500 monthly planning budget. It replaces the undecided technical choices below. That service selection did not change the then-current delivery order. The later product decision below now owns the sequence; free access and deferred service implementation remain.

**Later product decision (2026-11-13):** ADR-013 keeps general planning and phone access, with direct Windows editing first and Android next. Screenshot import is optional, unscheduled work. School-access research is separate and conditional. This supersedes the desktop-completion prerequisite below; the free feature set, all platform targets and post-store personal-service review remain.

## Decision

- Continue public development under the existing [MIT license](../../LICENSE). Keep credentials, private user data and signing material out of the repository. Dependencies retain their own licenses.
- Target Windows, macOS, Linux, Web, Android and iOS. Keep one Flutter product and shared planning rules. Platform support is a goal, not evidence that every target works today.
- Complete a useful free local edition first: tasks, personal plans, Today, Week, explicit saving or temporary use, backup and recovery. No account, payment, ad viewing or school identity is required for these functions.
- Priority clarification on 2026-11-12: finish the free desktop edition first. Complete the Windows flow, then validate macOS and Linux. Web, Android and iOS remain later directions; do not start those streams or store preparation during the desktop milestone. Publish only platforms that pass runtime and release checks.
- Revisit possible free cloud sync with uniform limits and advertising after launch. There is no paid tier, subscription, paid expansion, paid priority or paid ad removal. Advertising cannot unlock additional functionality or capacity. These are not current implementation milestones or funding guarantees.
- Keep external academic systems, school login and automatic timetable retrieval excluded. Multiple platforms do not revive school connections.
- Update documents only in this task. The learner continues writing core features through `lib/main.dart`. Do not add packages, platform runners, accounts, billing, ad SDKs or cloud code now.

## Scope and precedence

This replaces ADR-009's exclusion of Web and accounts for any future purpose, and the older exclusions of Android and iOS. ADR-009's removal of school connections remains valid. Accounts and sync stay outside the first free release. ADR-008's small local core, explicit saves and restrained dependency policy still apply.

The current plan is in [PRODUCT.md](../PRODUCT.md), the free-edition design in [FREE_EDITION.md](../FREE_EDITION.md), and release gates in [ROADMAP.md](../ROADMAP.md). The older [sync study](../SYNC.md) remains historical. It is not an approved backend design.

## Consequences

Multiple platforms add storage, lifecycle, input, accessibility and packaging work. Shared Dart code reduces duplication but does not replace device or browser tests. Re-estimate after each working stage; do not reuse old desktop-only estimates as a full-platform promise.

Keep the MIT license and one free feature set for everyone. No hosted service, provider, quota, ad network or revenue forecast is committed. A later cloud service must remain free under the same published rules for all users, with measured costs and a separate delivery decision. Preserve local access and export if that service fails or ends.

## Acceptance of this decision

Active product documents agree on free-first delivery and all target platforms. Historical lessons keep their results. Repository visibility can be verified separately; an open repository, passing build or live concept website is not a released application.
