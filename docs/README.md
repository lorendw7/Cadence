# Documentation

Cadence is a local planner for work, study and daily life. The current app is an in-memory task exercise, not the planned product. [ADR-015](adr/015-android-self-use-first.md) owns the route: safe shared data, Android planning self-use, then a bounded Android focus timer. Windows is the development host. The repository was verified private on 2026-11-15. The Pages site is offline. MIT remains unchanged.

All documentation uses plain English. Product translations remain Japanese, English and Chinese. [AGENTS.md](../AGENTS.md) records the rules for future work.

## Start here

| Need | Read |
|---|---|
| Run the checkout | [Setup](SETUP.md) |
| Resume studying | [Current checkpoint](LEARNING.md#current-learning-checkpoint) |
| See the lesson order and who writes what | [Numbered lesson plan](CURRICULUM.md#numbered-lesson-plan), [division of work](CURRICULUM.md#division-of-work) |
| See what the product includes | [Product scope](PRODUCT.md) |
| See delivery order and gates | [Roadmap](ROADMAP.md) |
| Review the planned screens | [Product design](REDESIGN.md), [planner preview](../assets/ui/planner-study.html) |
| Find files or checks | [Repository map](REPOSITORY.md), [tools](../tools/README.md), [workflow](PROJECT_WORKFLOW.md) |

## Document ownership

Each document owns one kind of decision. Link to the owner instead of copying its text.

| Question | Main document |
|---|---|
| What works in the checkout, and which checks are open? | [Learning progress](LEARNING.md) |
| What does the learner study next? | [Curriculum](CURRICULUM.md) |
| What belongs in the product? | [Product scope](PRODUCT.md) |
| How does a person complete a planning routine? | [Product design](REDESIGN.md) |
| How should it look? | [Design system](DESIGN.md) |
| How do pages and controls behave? | [UI architecture](UI_ARCHITECTURE.md) |
| What must pass before delivery? | [Roadmap](ROADMAP.md) |
| Why was a choice made? | [Decision records](#decisions) |

Plans and passing builds are not releases. Research and historical lessons give context; they do not close a gate.

## Product and interface

| Document | Purpose |
|---|---|
| [Product scope](PRODUCT.md) | Audience, local baseline, priorities and exclusions |
| [Product design](REDESIGN.md) | Planning routines and how tasks, plans and timetables relate |
| [Roadmap](ROADMAP.md) | Delivery stages, gates and estimates |
| [Android daily-use design](ANDROID_EXPERIENCE.md) | Phone priorities, a three-screen board and review cases |
| [Desktop release candidate](DESKTOP_V1.md) | Bounded later Windows offer; not an Android prerequisite |
| [Design system](DESIGN.md) | Colors, type, layout and artwork use |
| [UI architecture](UI_ARCHITECTURE.md) | Navigation, responsive layout and UI stages |
| [Today](TODAY.md) | Daily grouping, task counts and clock updates |
| [Editing](EDITING.md) | Forms, drafts, validation and failed saves |
| [Survey findings](SURVEY_FINDINGS.md) | Counts from the six-question timetable study and its limits |
| [Artwork](../assets/README.md) | Sources, catalogue, previews and exports |
| [Android artwork handoff](../assets/ANDROID_ARTWORK.md) | Planning, recovery and countdown symbols |
| [Tasks design handoff](../assets/ui/README.md) | Local Tasks study; not Flutter implementation |
| [Planner design handoff](../assets/ui/PLANNER_STUDY.md) | Today, Week and Tasks in a fictional-data preview |
| [Focus design study](../assets/ui/FOCUS_STUDY.md) | Focus states on both platforms |
| [Image provenance](../assets/ART_PROMPTS.md) | Source and prompt for the editorial illustration |
| [Website](../website/README.md) | Static concept site, translations and later publication |

## Architecture and data

| Document | Purpose |
|---|---|
| [Architecture](ARCHITECTURE.md) | Boundaries and incremental implementation |
| [Application contracts](APPLICATION.md) | Queries, commands, storage modes and restore |
| [Data model](DATABASE.md) | Planned records and invariants |
| [Security](SECURITY.md) | Data boundaries, threats and acceptance |
| [Data protection](DATA_PROTECTION.md) | Local file privacy and recovery |
| [Quality](QUALITY.md) | Required behavior, file, UI and platform checks |
| [Release](RELEASE.md) | Staged delivery, recovery, support and release evidence |
| [Public security policy](../SECURITY.md) | Safe reporting and current limits |

## Decisions

Read the status at the top of each record. Older records explain past choices; they do not override the current direction.

| Record | Subject |
|---|---|
| [ADR-001](adr/001-local-application-boundaries.md) | Local application boundaries |
| [ADR-003](adr/003-incremental-modular-client.md) | Introduce modules only when needed |
| [ADR-004](adr/004-shadcn-web-direction.md) | UI library selection; earlier Web direction partly superseded |
| [ADR-005](adr/005-local-offline-and-school-gated-web.md) | Local and offline design; school gate partly superseded |
| [ADR-007](adr/007-general-purpose-local-planner.md) | General-purpose local product |
| [ADR-008](adr/008-small-free-local-product.md) | Small local core |
| [ADR-009](adr/009-local-focus-without-school-connections.md) | Local focus without school connections |
| [ADR-010](adr/010-open-multiplatform-free-first.md) | Free access and platform direction |
| [ADR-011](adr/011-optional-sync-service.md) | Selected optional sync service; implementation deferred |
| [ADR-012](adr/012-import-first-phone-planner.md) | Earlier import-first order; partly superseded |
| [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) | Local editing first; screenshots and school access deferred |
| [ADR-014](adr/014-desktop-focus-and-mobile-ads.md) | Desktop focus and mobile-only ads; order superseded by ADR-015 |
| [ADR-015](adr/015-android-self-use-first.md) | Android planning and focus self-use first |
| [ADR-016](adr/016-open-source-and-kyushu-student-preset.md) | Return to open source as an independent project after a history rewrite |

## Lesson records

| Lesson | Topic |
|---|---|
| [1](lessons/01-task.md) | Task model |
| [2](lessons/02-copy-with.md) | Immutable updates |
| [3](lessons/03-task-list.md) | Display a list |
| [4](lessons/04-state.md) | State, buttons and reloads |
| [5](lessons/05-task-row.md) | Rows and callbacks |
| [6](lessons/06-task-toggle.md) | Completion |
| [7](lessons/07-title-input.md) | Input and controller disposal |
| [8](lessons/08-add-task.md) | Addition and session IDs |
| [9](lessons/09-validation.md) | Validation and empty lists |
| [10](lessons/10-delete-undo.md) | Deletion and single-level undo |
| [11](lessons/11-theme.md) | Shared Material theme; visual confirmation pending |
| [12](lessons/12-shadcn-foundation.md) | shadcn_ui integration; actual-window checks pending |
| [13](lessons/13-task-surface.md) | Responsive task surface; actual-window checks pending |
| [17](lessons/17-await-errors.md) | Awaited errors and clipboard feedback. Exact Windows paste confirmed. |
| [18](lessons/18-async-cleanup.md) | Cleanup with finally. Starter ready for the learner. |

[Historical templates](../lessons/README.md) are separate from active tests. Keep paths stable and update this index for new guides.

## Removed documents

On 2026-11-18 the maintainer asked for a smaller document set. Sixteen documents about deferred, paused or superseded work were removed. No product decision changed. The binding limits stay in [AGENTS.md](../AGENTS.md) and the decision records above.

Some remaining documents still name these files in plain text. Those mentions refer to the removed versions. To read one, use Git history. Commit `46fdf86` is the last commit that contains them all.

| Removed file | Subject |
|---|---|
| `STEAM_SALES_PLAN.md` | Desktop sales and cost scenarios; Steam work is paused |
| `FREE_EDITION.md` | Access policy and advertising study; ads are deferred |
| `VALIDATION.md` | Research, trial and advertising evidence rules |
| `COMPETITIVE_REVIEW.md` | Notes on other planner and focus products |
| `DESIGN_OPTIONS.md` | Design alternatives and selection history |
| `WEEKLY_PLAN.md` | Weekly schedule; replaced by the [curriculum](CURRICULUM.md#how-a-lesson-works) |
| `CLOUD_SYNC.md`, `SYNC.md` | Deferred sync design and its older study; [ADR-011](adr/011-optional-sync-service.md) keeps the decision |
| `UNIVERSITY_INTEGRATION.md`, `SCHOOL_DEMO.md`, `HOLIDAYS.md` | Deferred school access and academic calendar; [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps the decision |
| `QUICK_IMPORT.md` | Deferred screenshot import |
| `NOTIFICATIONS.md`, `STATISTICS.md` | Later reminders and statistics |
| `adr/002-university-wide-product.md`, `adr/006-optional-multi-client-sync.md` | Historical records, superseded |
