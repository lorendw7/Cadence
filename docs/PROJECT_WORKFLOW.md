# Project workflow

Scope update (2026-11-12): [ADR-010](adr/010-open-multiplatform-free-first.md) targets desktop, Web, Android and iOS under the existing MIT license. Complete the free local edition first. Cloud sync, paid capacity and supplementary ads are for review after store launch. External academic systems remain excluded. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) take precedence over older platform exclusions and school-gated proposals below.

Updated: 2026-11-11. These are working rules. Examples below are not existing issues, branches, pull requests, or releases.

Cadence is a local planner for work, study and daily life. The free edition targets desktop, Web, Android and iOS. Continue current lessons before platform work. Cloud sync, paid capacity and supplementary ads wait for review after store launch. External academic systems remain excluded. See [learning progress](LEARNING.md), [curriculum](CURRICULUM.md) and [roadmap](ROADMAP.md).

## Ownership and size

The learner writes core features and makes product choices. The assistant explains one lesson at a time, writes useful tests, reviews results, and maintains delegated documents, artwork, the website, and repository checks. Authorized maintenance may simplify code without changing behavior. Do not implement future lessons or weaken tests.

A task describes an observable result, such as adding a task to the session list. It may take several lessons. Close it only after its acceptance conditions pass. Work on one feature task at a time; record unrelated ideas for later. Keep blocking fixes separate when useful. Small wording changes do not need a large process.

## A complete change

| Step | Work | Result |
|---|---|---|
| Choose | Pick the smallest useful result | Scope and acceptance conditions |
| Prepare | Read code, identify concepts and data risks, choose checks | Enough information to start |
| Branch | Preserve existing work; use a short branch when appropriate, such as codex/task-list | Focused changes |
| Build | Explain one goal; learner writes and corrects code | Working increment |
| Review | Inspect small commits and describe final behavior and checks | Reviewable diff |
| Merge or push | Resolve supported findings and verify the final change | Traceable main-branch update |
| Release | Package a milestone and test the actual package | A real download and follow-up tasks |

Use issues and pull requests when useful. Local task notes and diff review are enough before remote collaboration begins. A user may ask for a direct main-branch push; do not invent a pull-request requirement.

Only record remote links after they exist. A main-branch update is not a desktop release. Changes under website/ may publish through GitHub Pages. Follow [RELEASE.md](RELEASE.md) for product delivery.

## Ready to start

Identify the user, situation, two to four observable acceptance conditions, scope, dependencies, and checks. For saving, import, networking, or private data, explain where data goes and how failure preserves it.

Example task:

- Goal: enter a title and see a new task.
- Acceptance: valid input adds a row; blank input shows an error.
- Scope: memory only; closing the app loses the list.
- Checks: input/addition widget tests and one manual window check.
- Data: fictional examples; no school access or upload.

This example does not prove that a feature is implemented.

## Ready to finish

Confirm that the behavior works, relevant tests and required checks pass, errors and data boundaries have been reviewed, and the learner understands the key code. Update affected behavior documents and interface text. Keep credentials and private schedules out of commits.

Use [QUALITY.md](QUALITY.md) for feature checks. Documents and websites need suitable link, language, asset, and browser checks. Do not add tests that only repeat low-risk implementation details. Repeat passed checks only after relevant changes or new concerns.

A short review description should state the problem, new behavior, checks, and any remaining limit. Do not write an activity log.

Never report an unrun check as passed. Unit tests do not prove recovery, platform support, or release security. Releases need actual package and host checks.

## Review effort follows the change

| Change | Main checks |
|---|---|
| Memory model, list, or copy | Input edges, clear errors, no private data in logs or commits |
| Saving, migration, backup | Failed writes preserve data; recovery works; private backups differ from sharing |
| Import and sharing | Untrusted input limits, accurate preview, field allowlist |
| Initial Web planner | Fictional demos, explicit saving, strict JSON checks, failed storage, clearing, script injection |
| School connection or backend | Permission, authorization, sessions, minimal data, expiry, user isolation |

See [SECURITY.md](SECURITY.md). Work without networking does not need a backend or account dependency.

## Design records and documentation

Use an ADR for choices that affect several features, data compatibility, or trust boundaries. Explain the problem, realistic options, decision, and cost. Small field and button decisions belong in the task or review. An ADR is neither school permission nor implementation acceptance.

All documents use plain English. Keep paths stable, place requirements in their main document, and link to them. Current progress belongs in [LEARNING.md](LEARNING.md); lesson notes keep historical counts.

## From lessons to useful software

Follow the current [roadmap](ROADMAP.md): establish reliable local tasks, then personal planning, backup/recovery, a representative pilot, and wider desktop delivery. Test with people using the app for work, study, and daily life. Course tools, Web, sync, and school integrations are separate extensions.

Demonstrate completed behavior with fictional data in a real window. Check whole user scenarios at each stage. Revise estimates when needed; lesson counts never replace product acceptance.
