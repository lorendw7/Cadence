# Project workflow

Scope update (2026-11-15): [ADR-015](adr/015-android-self-use-first.md) makes Android the first self-use target, with Windows as the development host. Safe shared saving and recovery precede real personal data. Tasks, Today and selected-day Week come before the later desktop focus package and Steam work. The first Android build is ad-free; mobile ads wait for a useful release and an ad-free usage baseline. Desktop, Web and the concept site stay ad-free. School access, imports and cloud sync remain later work. The repository was verified private on 2026-11-15. The Pages site is offline; website source is retained for later server deployment. MIT remains unchanged. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates. This update implements no feature or platform acceptance.

Updated: 2026-11-13. These are working rules. Examples below are not existing issues, branches, pull requests, or releases.

Cadence is a local time planner for work, study and daily life. Tasks, deadlines, personal plans and Today/Week stay central. Continue the current lesson, build reliable shared storage and recovery, then extend Android self-use with direct editing and readable phone views. After planning self-use, add the bounded Android task-linked focus flow. Keep Windows as a development host without requiring a complete desktop release first. iOS, other desktop releases and Web are later. Screenshot recognition is optional only if needed. School authorization research, application preparation, login integration and cloud sync remain deferred. Optional mobile ads wait for a useful release and an ad-free usage baseline. See [learning progress](LEARNING.md), [curriculum](CURRICULUM.md) and [roadmap](ROADMAP.md).

## Ownership and size

The learner writes the code that teaches the current core concept and makes product choices. This includes the first representative Flutter widget, callback, state update, layout or lifecycle change, as well as business rules and storage/error decisions. The assistant completes repetitive support within the current lesson: repeated wiring, visual polish, test setup, broader regressions and documentation. Follow the [division of work](CURRICULUM.md#division-of-work) and [Dart and Flutter practice](CURRICULUM.md#numbered-lesson-plan).

The user's delegation covers this supporting work once the lesson boundary is stated; no repeated permission is needed for it. It does not authorize future lessons, unused dependencies or architecture for future work. Introduce a needed dependency only with its active lesson. Preserve the learner's attempt and explain supporting changes. Do not weaken tests or reduce the learner's work to filling blanks in an otherwise completed feature.

A task describes an observable result, such as adding a task to the session list. It may take several lessons. Close it only after its acceptance conditions pass. Work on one feature task at a time; record unrelated ideas for later. Keep blocking fixes separate when useful. Small wording changes do not need a large process.

The weekly plan supplies the first-version work slots and review record. Use its learner/support boundary before each small step. Carry unfinished acceptance into the next week; do not start a dependent feature just because the calendar moved on.

Use the [curriculum](CURRICULUM.md) for skill goals. Keep one small goal and one new concept per teaching step:

1. Recall a related idea and predict what the example will do.
2. Explain the new concept and the work split before the learner writes a small complete function, component or behavior.
3. Add the agreed support, run the result, compare it with the prediction and investigate any mismatch.
4. Trace one real action through input, rules, state and visible output. Ask the learner to explain the result and try one small variation.

Practise reading the relevant official documentation and inspecting the Git diff throughout. Treat an AI suggestion as a proposal to understand and verify. The learner gradually writes a useful assertion or boundary case; the assistant continues to provide regression tests where needed. These habits do not require new packages, architecture layers, or mandatory tools.

## A complete change

| Step | Work | Result |
|---|---|---|
| Choose | Pick the smallest useful result | Scope and acceptance conditions |
| Prepare | Read code, identify concepts and data risks, choose checks | Enough information to start |
| Branch | Preserve existing work; use a short branch when appropriate, such as codex/task-list | Focused changes |
| Build | Learner writes the lesson's core; assistant completes the stated support | Working increment with clear ownership |
| Review | Inspect small commits and describe final behavior and checks | Reviewable diff |
| Merge or push | Resolve supported findings and verify the final change | Traceable main-branch update |
| Release | Package a milestone and test the actual package | A real download and follow-up tasks |

Use issues and pull requests when useful. Local task notes and diff review are enough before remote collaboration begins. A user may ask for a direct main-branch push; do not invent a pull-request requirement.

Only record remote links after they exist. A main-branch update is not a desktop release. Changes under website/ may publish through GitHub Pages. Follow [RELEASE.md](RELEASE.md) for product delivery.

## Ready to start

Identify the user, situation, two to four observable acceptance conditions, scope, dependencies, and checks. For saving, import, networking, or private data, explain where data goes and how failure preserves it.

Keep the lesson brief short: the goal, the exact learner-owned function or component, the assistant's support, and the check that proves the result. Use one small outcome; split a large feature across lessons. The brief is a work boundary, not another approval step.

Example task:

- Goal: enter a title and see a new task.
- Acceptance: valid input adds a row; blank input shows an error.
- Scope: memory only; closing the app loses the list.
- Checks: input/addition widget tests and one manual window check.
- Data: fictional examples; no school access or upload.

This example does not prove that a feature is implemented.

## Ready to finish

Confirm that the behavior works, relevant tests and required checks pass, errors and data boundaries have been reviewed, and the learner understands the key code. Update affected behavior documents and interface text. Keep credentials and private schedules out of commits.

Record understanding separately from application checks. A correct prediction, an explanation, and a small independent variation provide learning evidence. A passing test suite alone does not. Keep pending actual-window checks open even when the concept is understood; keep the learning step open when working code still cannot be explained. [LEARNING.md](LEARNING.md) records this evidence and the next step.

Use [QUALITY.md](QUALITY.md) for feature checks. Documents and websites need suitable link, language, asset, and browser checks. Do not add tests that only repeat low-risk implementation details. Repeat passed checks only after relevant changes or new concerns.

A short review description should state the problem, new behavior, checks, and any remaining limit. Do not write an activity log.

Never report an unrun check as passed. Unit tests do not prove recovery, platform support, or release security. Releases need actual package and host checks.

## Review effort follows the change

| Change | Main checks |
|---|---|
| Memory model, list, or copy | Input edges, clear errors, no private data in logs or commits |
| Saving, migration, backup | Failed writes preserve data; recovery works; private backups differ from sharing |
| Occurrence corrections | Stable occurrence identity, scope, restored overrides and backup round trips |
| Import, when included | Supported permitted samples, bounded input, accurate preview, no writes before confirmation and atomic failure |
| Filtered sharing, when included | Field allowlist, accurate preview and no private backup content |
| Android adaptation | Shared behavior plus native file, storage, lifecycle, touch and recovery evidence |
| Initial Web planner | Fictional demos, explicit saving, strict JSON checks, failed storage, clearing, script injection |
| Separately approved future service | Authorization, sessions, minimal data, expiry and user isolation; no service work in the Android self-use milestone |

See [SECURITY.md](SECURITY.md). Work without networking does not need a backend or account dependency.

## Design records and documentation

Use an ADR for choices that affect several features, data compatibility, or trust boundaries. Explain the problem, realistic options, decision, and cost. Small field and button decisions belong in the task or review. An ADR is neither school permission nor implementation acceptance.

All documents use plain English. Keep paths stable, place requirements in their main document, and link to them. Current progress belongs in [LEARNING.md](LEARNING.md); lesson notes keep historical counts.

## From lessons to useful software

Follow the current [product priorities](PRODUCT.md) and [roadmap](ROADMAP.md): reliable shared storage and recovery first; then useful task editing, direct planning, Today and selected-day Week on Android. After the planning self-use check, complete [Android focus self-use](ROADMAP.md#h--android-focus-self-use) with one task-linked countdown, manual break and small local session list. Add native checks with each slice; a timer never completes a task automatically. Desktop focus, media polish, Steam and other platform releases follow later decisions. The maintainer can start safe local self-use without an external trial cohort, but self-use does not prove market demand or replace store testing rules. Broader review, reminders and advanced rules are separate additions. Test work, study and personal routines rather than treating the timetable survey as proof of all use cases. Sync stays deferred; ads wait for a useful mobile release and an ad-free usage baseline. School authorization, application preparation and login integration remain deferred, with no approved access.

Demonstrate completed behavior with fictional data in a real window. Check whole user scenarios at each stage. Revise estimates when needed; lesson counts never replace product acceptance.
