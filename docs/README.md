# Documentation

Cadence is a general-purpose local planner for work, study, and daily life. Desktop is the core; school connections are optional. Web and sync are considered only when such a connection needs them. The current release scope is in [ADR-008](adr/008-small-free-local-product.md).

All documentation uses plain English. Product translations remain Japanese, English, and Chinese. [AGENTS.md](../AGENTS.md) records this rule for future work.

The current app is an in-memory task exercise, not the planned full product. [LEARNING.md](LEARNING.md) owns current progress and manual acceptance status. Lesson notes keep their historical test counts.

## Start here

| Need | Read |
|---|---|
| Run the checkout | [Setup](SETUP.md) |
| Continue learning | [Learning guide](LEARNING.md), [curriculum](CURRICULUM.md), [Dart guide](DART_GUIDE.md) |
| Understand the product | [Product scope](PRODUCT.md), [product design](REDESIGN.md), [roadmap](ROADMAP.md) |
| Find files or checks | [Repository map](REPOSITORY.md), [tools](../tools/README.md), [workflow](PROJECT_WORKFLOW.md) |

## Product and interface

| Document | Purpose |
|---|---|
| [Design system](DESIGN.md) | Colors, type, layout, and accessible artwork use |
| [UI architecture](UI_ARCHITECTURE.md) | Component choice, navigation, responsive layout, and UI stages |
| [Today](TODAY.md) | Daily grouping, task counts, and clock updates |
| [Editing](EDITING.md) | Forms, drafts, validation, and failed saves |
| [Statistics](STATISTICS.md) | Local planned-time and task calculations |
| [Notifications](NOTIFICATIONS.md) | Later local reminders and platform checks |
| [Artwork](../assets/README.md) | Sources, catalogue, exports, and regeneration |
| [Image provenance](../assets/ART_PROMPTS.md) | Source and prompt for the editorial illustration |
| [Website](../website/README.md) | Static concept site, translations, and publication |

## Architecture and data

| Document | Purpose |
|---|---|
| [Architecture](ARCHITECTURE.md) | Boundaries and incremental implementation |
| [Application contracts](APPLICATION.md) | Queries, commands, revisions, storage modes, and restore |
| [Data model](DATABASE.md) | Planned records and invariants |
| [Security](SECURITY.md) | Data boundaries, threats, and acceptance |
| [Data protection](DATA_PROTECTION.md) | Local file privacy, recovery, optional API keys and deferred encryption |
| [Optional sync](SYNC.md) | Parked study; use only if a school connection needs synchronization |
| [Assisted import](QUICK_IMPORT.md) | Local screenshot and table drafts; optional personal API keys; review effort and accuracy checks |
| [Quality](QUALITY.md) | Required behavior, file, UI, and platform checks |
| [Release](RELEASE.md) | Staged delivery, recovery, support, and release evidence |
| [Public security policy](../SECURITY.md) | Safe reporting and current limits |

## Optional education work

These documents describe possible extensions. They are not prerequisites for local planning or general release.

| Document | Purpose |
|---|---|
| [Academic calendar](HOLIDAYS.md) | Teaching weeks, holidays, and changed classes |
| [School integration](UNIVERSITY_INTEGRATION.md) | Optional interfaces, permissions, and connection lifecycle |
| [School demonstration](SCHOOL_DEMO.md) | An optional explanation for school staff |

## Decisions

Read the status at the top of each record. Older records explain past choices; they do not override the current direction.

| Record | Subject |
|---|---|
| [ADR-001](adr/001-local-application-boundaries.md) | Local application boundaries |
| [ADR-002](adr/002-university-wide-product.md) | Historical university-wide scope |
| [ADR-003](adr/003-incremental-modular-client.md) | Introduce modules only when needed |
| [ADR-004](adr/004-shadcn-web-direction.md) | UI selection and earlier audience/Web direction |
| [ADR-005](adr/005-local-offline-and-school-gated-web.md) | Local/offline design and the former school-gated Web policy |
| [ADR-006](adr/006-optional-multi-client-sync.md) | Proposed optional sync |
| [ADR-007](adr/007-general-purpose-local-planner.md) | General-purpose local product |
| [ADR-008](adr/008-small-free-local-product.md) | Smaller free local release and school-only Web/sync scope |

## Lesson records

| Lesson | Topic |
|---|---|
| [1](lessons/01-task.md) | Task model |
| [2](lessons/02-copy-with.md) | Immutable updates |
| [3](lessons/03-task-list.md) | Display a list |
| [4](lessons/04-state.md) | State, buttons, and reloads |
| [5](lessons/05-task-row.md) | Rows and callbacks |
| [6](lessons/06-task-toggle.md) | Completion |
| [7](lessons/07-title-input.md) | Input and controller disposal |
| [8](lessons/08-add-task.md) | Addition and session IDs |
| [9](lessons/09-validation.md) | Validation and empty lists |
| [10](lessons/10-delete-undo.md) | Deletion and single-level undo |
| [11](lessons/11-theme.md) | Shared Material theme; automated checks passed, visual confirmation pending |
| [12](lessons/12-shadcn-foundation.md) | shadcn_ui root integration and first ShadButton; actual-window checks pending |

[Historical templates](../lessons/README.md) are separate from active tests. Keep paths stable, update this index for new guides, and link to the main requirement instead of copying it into several documents.
