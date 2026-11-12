# ADR-010: Open source, multiple platforms, free edition first

**Status:** Accepted product direction; not implemented or released.
**Date:** 2026-11-12
**Deciders:** The maintainer requested continued open-source development, desktop, Web, Android and iOS coverage, then clarified that the free edition comes first. Cloud services and monetization are for review after store launch.

## Decision

- Continue public development under the existing [MIT license](../../LICENSE). Keep credentials, private user data and signing material out of the repository. Dependencies retain their own licenses.
- Target Windows, macOS, Linux, Web, Android and iOS. Keep one Flutter product and shared planning rules. Platform support is a goal, not evidence that every target works today.
- Complete a useful free local edition first: tasks, personal plans, Today, Week, explicit saving or temporary use, backup and recovery. No account, payment, ad viewing or school identity is required for these functions.
- Deliver in stages. Keep the current desktop lessons, then validate browser storage and mobile interaction. Publish each platform only after its own runtime and release checks. Do not promise simultaneous launch.
- Revisit limited free cloud sync, paid capacity and supplementary advertising after the free product reaches app stores. Preserve these as candidate business directions, not current implementation milestones or funding guarantees.
- Keep external academic systems, school login and automatic timetable retrieval excluded. Multiple platforms do not revive school connections.
- Update documents only in this task. The learner continues writing core features through `lib/main.dart`. Do not add packages, platform runners, accounts, billing, ad SDKs or cloud code now.

## Scope and precedence

This replaces ADR-009's exclusion of Web and accounts for any future purpose, and the older exclusions of Android and iOS. ADR-009's removal of school connections remains valid. Accounts and sync stay outside the first free release. ADR-008's small local core, explicit saves and restrained dependency policy still apply.

The current plan is in [PRODUCT.md](../PRODUCT.md), the free-edition design in [FREE_EDITION.md](../FREE_EDITION.md), and release gates in [ROADMAP.md](../ROADMAP.md). The older [sync study](../SYNC.md) remains historical. It is not an approved backend design.

## Consequences

Multiple platforms add storage, lifecycle, input, accessibility and packaging work. Shared Dart code reduces duplication but does not replace device or browser tests. Re-estimate after each working stage; do not reuse old desktop-only estimates as a full-platform promise.

Open-source licensing and hosted-service pricing are separate decisions. No cloud quota, price, provider, ad network or revenue forecast is committed. A later service needs measured costs, user demand and a new delivery decision. Basic local access and data export must remain useful without that service.

## Acceptance of this decision

Active product documents agree on free-first delivery and all target platforms. Historical lessons keep their results. Repository visibility can be verified separately; an open repository, passing build or live concept website is not a released application.
