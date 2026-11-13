# Documentation

Cadence is a local planner for work, study and daily life. The delivery order is a useful Windows flow, then Android validation. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) owns the current direction. Screenshot import and school-access work are deferred. Cloud sync and possible ads wait for review after store launch.

All documentation uses plain English. Product translations remain Japanese, English, and Chinese. [AGENTS.md](../AGENTS.md) records this rule for future work.

The current app is an in-memory task exercise, not the planned full product. [LEARNING.md](LEARNING.md) owns current progress and manual acceptance status. Lesson notes keep their historical test counts.

## Start here

| Need | Read |
|---|---|
| Run the checkout | [Setup](SETUP.md) |
| Continue the next small lesson | [Current progress](LEARNING.md), [core skills and practice](CURRICULUM.md), [Dart reference](DART_GUIDE.md) |
| Find the current lesson and future numbers | [Current checkpoint](LEARNING.md#current-learning-checkpoint), [numbered lesson plan](CURRICULUM.md#numbered-lesson-plan) |
| Share the lesson workload | [Division of work](CURRICULUM.md#division-of-work), [Dart and Flutter practice](CURRICULUM.md#dart-and-flutter-practice), [workflow](PROJECT_WORKFLOW.md) |
| See priorities and current limits | [Feature priorities](PRODUCT.md#feature-priorities), [local product baseline](PRODUCT.md#first-useful-local-product) |
| Review the product and UI | [Product design](REDESIGN.md), [local planner preview](../assets/ui/planner-study.html), [preview guide](../assets/ui/PLANNER_STUDY.md) |
| Review delivery order | [Desktop design priorities](REDESIGN.md#desktop-design-priorities), [roadmap](ROADMAP.md) |
| Check remaining effort and iOS requirements | [Working delivery estimate](ROADMAP.md#maintenance-and-estimates), [Mac and iPhone validation](SETUP.md#ios-development-and-validation) |
| Turn research into product decisions | [Validation guide](VALIDATION.md), [product decisions](PRODUCT.md#design-decisions-at-a-glance) |
| Understand the research behind the direction | [Survey findings](SURVEY_FINDINGS.md), [design comparison and selection](DESIGN_OPTIONS.md), [competitor workflows](COMPETITIVE_REVIEW.md) |
| Review future advertising on each platform | [Platform advertising study](FREE_EDITION.md#advertising-by-platform), [cost and revenue evidence](VALIDATION.md#later-service-and-advertising-decision) |
| Review possible academic access | [Connection study](UNIVERSITY_INTEGRATION.md), [conditional schedule](ROADMAP.md#conditional-connection-estimate) |
| Review the selected later backend and budget | [Optional cloud sync](CLOUD_SYNC.md), [ADR-011](adr/011-optional-sync-service.md), [break-even assumptions](VALIDATION.md#illustrative-monthly-operating-model) |
| Find files or checks | [Repository map](REPOSITORY.md), [tools](../tools/README.md), [workflow](PROJECT_WORKFLOW.md) |

## Document ownership

Read the current product in this order: scope, user flow, visual rules, interaction details, then release gates. Each document below owns one kind of decision. Link to that owner when updating another guide instead of copying its requirements.

| Question | Main document | Status to preserve |
|---|---|---|
| What works in the checkout? | [Learning progress](LEARNING.md) | Current implementation, checks run and manual checks still pending |
| What should the learner understand and practise? | [Curriculum](CURRICULUM.md) | Skill sequence, division of work and evidence of understanding; passing tests alone is not mastery |
| What belongs in the product? | [Product scope](PRODUCT.md) | Accepted scope, priorities and exclusions |
| How does a person complete a planning routine? | [Product design](REDESIGN.md) | Planned flows and behavior boundaries |
| How should it look? | [Design system](DESIGN.md) | Palette, typography, spacing and visual hierarchy |
| How do pages and controls behave? | [UI architecture](UI_ARCHITECTURE.md) | Navigation, responsive layouts, editors and feedback |
| What can reviewers inspect? | [Planner study](../assets/ui/PLANNER_STUDY.md) | Fictional design preview and its own check limits |
| What must pass before delivery? | [Roadmap](ROADMAP.md) | Stage gates; plans and builds are not releases |
| Why was a choice made? | [Decision records](#decisions) | Accepted, superseded and deferred decisions |

Research findings and historical lessons provide context. They do not override current scope or close a release gate. Deferred service and school documents remain reference material; they do not create an active implementation track.

## Product and interface

| Document | Purpose |
|---|---|
| [Product scope](PRODUCT.md) | Audience, useful local baseline, priorities and exclusions |
| [Product design](REDESIGN.md) | Complete planning routines and the relationship between tasks, plans and timetables |
| [Roadmap](ROADMAP.md) | Delivery stages, release gates and estimates |
| [Product validation](VALIDATION.md) | Evidence rules for questionnaires, user trials and later service funding decisions |
| [Survey findings](SURVEY_FINDINGS.md) | Anonymous counts from the six-question timetable study and limits of the sample |
| [Design options](DESIGN_OPTIONS.md) | Research alternatives and selection history; current direct-editing scope follows ADR-013 |
| [Competitive review](COMPETITIVE_REVIEW.md) | Official planner workflows and bounded adaptations to test |
| [Free edition](FREE_EDITION.md) | Platform behavior, free core, store testing and future advertising integrations |
| [Design system](DESIGN.md) | Colors, type, layout, and accessible artwork use |
| [UI architecture](UI_ARCHITECTURE.md) | Component choice, navigation, responsive layout, and UI stages |
| [Today](TODAY.md) | Daily grouping, task counts, and clock updates |
| [Editing](EDITING.md) | Forms, drafts, validation, and failed saves |
| [Statistics](STATISTICS.md) | Local planned-time and task calculations |
| [Notifications](NOTIFICATIONS.md) | Later local reminders and platform checks |
| [Artwork](../assets/README.md) | Sources, searchable catalogue, state guidance, generated previews, and exports |
| [Tasks design handoff](../assets/ui/README.md) | Local wide/compact study, sample states, color roles and a small artwork set; not Flutter implementation |
| [Planner design handoff](../assets/ui/PLANNER_STUDY.md) | Today, Week, Tasks and focused editing in a local fictional-data preview |
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
| [Optional cloud sync](CLOUD_SYNC.md) | Accepted later Google login, Node.js/TypeScript/Fastify/PostgreSQL, data boundaries, JPY 2,500 budget and capacity gates |
| [Historical sync study](SYNC.md) | Older proposal; superseded for future personal sync by CLOUD_SYNC and ADR-011 |
| [Optional screenshot import](QUICK_IMPORT.md) | Unscheduled recognition design and acceptance if a real need appears; no release prerequisite |
| [Quality](QUALITY.md) | Required behavior, file, UI, and platform checks |
| [Release](RELEASE.md) | Staged delivery, recovery, support, and release evidence |
| [Public security policy](../SECURITY.md) | Safe reporting and current limits |

## Optional education work

Direct timetable editing and basic occurrence correction support the first useful flow. Advanced academic rules depend on actual needs. ADR-013 defers school feasibility and application preparation without making school approval a local-release gate.

| Document | Purpose |
|---|---|
| [Academic calendar](HOLIDAYS.md) | Teaching weeks, holidays, and changed classes |
| [School integration](UNIVERSITY_INTEGRATION.md) | Conditional official read-only access study, permission questions and prototype/release boundaries |
| [School demonstration](SCHOOL_DEMO.md) | General fictional-data consultation guide; not a submitted application or working connection |

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
| [ADR-008](adr/008-small-free-local-product.md) | Smaller free local release; school exception superseded by ADR-009 |
| [ADR-009](adr/009-local-focus-without-school-connections.md) | Historical removal of school connections; later extension deferred under ADR-013 |
| [ADR-010](adr/010-open-multiplatform-free-first.md) | Open source, all target platforms and free edition first |
| [ADR-011](adr/011-optional-sync-service.md) | Selected optional Google identity and Node.js/PostgreSQL service; implementation deferred |
| [ADR-012](adr/012-import-first-phone-planner.md) | General planning and Windows-to-phone order retained; mandatory screenshot import superseded |
| [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) | Local editing first; screenshots and all academic-access work deferred |

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
| [13](lessons/13-task-surface.md) | Responsive Shad task surface; automated checks passed, actual-window checks pending |
| [17](lessons/17-await-errors.md) | Clipboard action and feedback reviewed; lifecycle explanation and actual-window feedback confirmed; native paste pending |

[Historical templates](../lessons/README.md) are separate from active tests. Keep paths stable, update this index for new guides, and link to the main requirement instead of copying it into several documents.
