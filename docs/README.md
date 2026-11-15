# Documentation

Cadence is a local planner and planned focus tool for work, study and daily life. [ADR-015](adr/015-android-self-use-first.md) owns the current route: safe shared data, Android planning self-use, then a bounded Android focus timer. Windows remains the development host. Desktop media, Steam, mobile ads, school access and cloud sync are later work. Desktop and Web stay ad-free. No revenue is guaranteed. The repository was verified private on 2026-11-15. The Pages site is offline; website source is retained for later server deployment. MIT remains unchanged.

All documentation uses plain English. Product translations remain Japanese, English, and Chinese. [AGENTS.md](../AGENTS.md) records this rule for future work.

The current app is an in-memory task exercise, not the planned full product. [LEARNING.md](LEARNING.md) owns current progress and manual acceptance status. Lesson notes keep their historical test counts.

## Start here

| Need | Read |
|---|---|
| Run the checkout | [Setup](SETUP.md) |
| Continue the next small lesson | [Current progress](LEARNING.md), [core skills and practice](CURRICULUM.md), [Dart reference](DART_GUIDE.md) |
| Plan 10-15 hours of first-version work per week | [Weekly goals, dependencies and work split](WEEKLY_PLAN.md), [hour ledger](WEEKLY_PLAN.md#hour-ledger-and-milestones), [weekly review](WEEKLY_PLAN.md#weekly-review-and-rescheduling) |
| Find the current lesson and future numbers | [Current checkpoint](LEARNING.md#current-learning-checkpoint), [numbered lesson plan](CURRICULUM.md#numbered-lesson-plan) |
| Share the lesson workload | [Division of work](CURRICULUM.md#division-of-work), [Dart and Flutter practice](CURRICULUM.md#dart-and-flutter-practice), [workflow](PROJECT_WORKFLOW.md) |
| See priorities and current limits | [Feature priorities](PRODUCT.md#feature-priorities), [local product baseline](PRODUCT.md#first-useful-local-product) |
| Plan competitive quality and the next development slice | [Android competitive goal](PRODUCT.md#competitive-goal-for-android), [official comparison](COMPETITIVE_REVIEW.md#android-competitive-benchmark), [work packages](ROADMAP.md#work-packages-and-review-points), [measurable checks](VALIDATION.md#android-workflow-benchmark) |
| Separate first-version requirements from later competitive work | [First public version](ROADMAP.md#first-public-version-and-later-competitive-quality), [later Android improvements](ROADMAP.md#i--later-android-competitive-improvements), [support and services](ROADMAP.md#service-readiness-and-continuing-maintenance) |
| Estimate stage hours and continuing capacity | [First-version hours](ROADMAP.md#working-estimate-at-10-15-hours-per-week), [later competitive allowance](ROADMAP.md#estimate-for-later-competitive-improvements), [conditional platforms and sync](ROADMAP.md#conditional-estimates-for-broader-scope) |
| Review the product and UI | [Product design](REDESIGN.md), [local planner preview](../assets/ui/planner-study.html), [preview guide](../assets/ui/PLANNER_STUDY.md) |
| Review delivery order | [Android priorities](REDESIGN.md#android-self-use-priorities), [roadmap](ROADMAP.md), [accepted decision](adr/015-android-self-use-first.md) |
| Review phone layouts and quality targets | [Screen composition](UI_ARCHITECTURE.md#android-screen-composition), [Android quality acceptance](UI_ARCHITECTURE.md#android-quality-acceptance) |
| Review the refined Today, Tasks and Week design without code | [Shared view rules](UI_ARCHITECTURE.md#shared-rules-for-the-three-views), [Today details](UI_ARCHITECTURE.md#today-reading-order-and-actions), [Task list and capture](UI_ARCHITECTURE.md#task-list-and-capture-details), [Week selection](UI_ARCHITECTURE.md#week-selection-and-planning-context), [complete walkthrough](REDESIGN.md#three-view-planning-walkthrough), [reference mapping](COMPETITIVE_REVIEW.md#three-view-reference-mapping) |
| Review later desktop scope and cost controls | [Deferred desktop candidate](DESKTOP_V1.md), [sales scenarios](STEAM_SALES_PLAN.md), [prepared media](../assets/focus-pack/README.md) |
| Review the first buyer, shorter focus flow and recovery of working time | [Buyer hypothesis](PRODUCT.md#first-buyer-to-test), [interaction review](REDESIGN.md#planning-to-focus-design-review), [full-cost model](STEAM_SALES_PLAN.md#recover-cash-and-working-time) |
| Start without testers and understand Android-first delivery | [Zero-user path](VALIDATION.md#start-without-external-testers), [accepted Android scope](PRODUCT.md#accepted-android-self-use-scope), [revenue and store comparison](STEAM_SALES_PLAN.md#android-first-and-advertising) |
| Check remaining effort and iOS requirements | [Working delivery estimate](ROADMAP.md#maintenance-and-estimates), [Mac and iPhone validation](SETUP.md#ios-development-and-validation) |
| Test desktop pricing and purchase demand | [Purchase validation](VALIDATION.md#desktop-demand-and-purchase-test), [affordable offer](VALIDATION.md#affordable-desktop-offer), [market evidence](COMPETITIVE_REVIEW.md#desktop-focus-market-evidence) |
| Turn research into product decisions | [Validation guide](VALIDATION.md), [product decisions](PRODUCT.md#design-decisions-at-a-glance) |
| Understand the research behind the direction | [Survey findings](SURVEY_FINDINGS.md), [design comparison and selection](DESIGN_OPTIONS.md), [competitor workflows](COMPETITIVE_REVIEW.md) |
| Review future advertising on each platform | [Platform advertising study](FREE_EDITION.md#advertising-by-platform), [cost and revenue evidence](VALIDATION.md#later-service-and-advertising-decision) |
| Design ads around useful phone routines | [Android return use](REDESIGN.md#android-return-use-and-optional-review), [placement and request limits](FREE_EDITION.md#review-screen-ad-proposal), [pilot economics and stop rules](VALIDATION.md#review-screen-ad-pilot) |
| Estimate mobile ads against development and maintenance costs | [Frequency and reach scenarios](VALIDATION.md#review-screen-ad-pilot), [24-month cost recovery and required DAU](VALIDATION.md#android-ad-cost-recovery), [revenue improvements to test](FREE_EDITION.md#improve-revenue-without-adding-protected-placements) |
| Prepare a first Google Play release | [Current gaps and account-to-release steps](RELEASE.md#google-play-preparation-from-the-current-checkout), [later AdMob verification](RELEASE.md#admob-after-the-useful-public-release) |
| Review possible academic access | [Connection study](UNIVERSITY_INTEGRATION.md), [conditional schedule](ROADMAP.md#conditional-connection-estimate) |
| Review the selected later backend and budget | [Optional cloud sync](CLOUD_SYNC.md), [ADR-011](adr/011-optional-sync-service.md), [break-even assumptions](VALIDATION.md#illustrative-monthly-operating-model) |
| Find files or checks | [Repository map](REPOSITORY.md), [tools](../tools/README.md), [workflow](PROJECT_WORKFLOW.md) |

## Document ownership

Read the current product in this order: scope, user flow, visual rules, interaction details, then release gates. Each document below owns one kind of decision. Link to that owner when updating another guide instead of copying its requirements.

| Question | Main document | Status to preserve |
|---|---|---|
| What works in the checkout? | [Learning progress](LEARNING.md) | Current implementation, checks run and manual checks still pending |
| What should the learner understand and practise? | [Curriculum](CURRICULUM.md) | Skill sequence, division of work and evidence of understanding; passing tests alone is not mastery |
| What fits in a development week? | [Weekly first-version plan](WEEKLY_PLAN.md) | Proposed work slots, dependencies and ownership; progress stays in LEARNING and release gates in ROADMAP |
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
| [Desktop release candidate](DESKTOP_V1.md) | Bounded later Windows offer; not an Android prerequisite |
| [Desktop sales and cost recovery](STEAM_SALES_PLAN.md) | Full-cost recovery, unvalidated volume scenarios, price research and stop rules |
| [Product design](REDESIGN.md) | Complete planning routines and the relationship between tasks, plans and timetables |
| [Roadmap](ROADMAP.md) | Delivery stages, release gates and estimates |
| [Weekly first-version plan](WEEKLY_PLAN.md) | A 10-15-hour weekly schedule with learner practice, assistant support, dependencies and acceptance |
| [Product validation](VALIDATION.md) | Evidence rules for questionnaires, user trials and later service funding decisions |
| [Survey findings](SURVEY_FINDINGS.md) | Anonymous counts from the six-question timetable study and limits of the sample |
| [Design options](DESIGN_OPTIONS.md) | Research alternatives and selection history; current direct-editing scope follows ADR-013 |
| [Competitive review](COMPETITIVE_REVIEW.md) | Official planner workflows and bounded adaptations to test |
| [Access and platform policy](FREE_EDITION.md) | Desktop purchase hypothesis, mobile core, platform differences and mobile-only advertising |
| [Design system](DESIGN.md) | Colors, type, layout, and accessible artwork use |
| [UI architecture](UI_ARCHITECTURE.md) | Component choice, navigation, responsive layout, and UI stages |
| [Today](TODAY.md) | Daily grouping, task counts, and clock updates |
| [Editing](EDITING.md) | Forms, drafts, validation, and failed saves |
| [Statistics](STATISTICS.md) | Local planned-time and task calculations |
| [Notifications](NOTIFICATIONS.md) | Later local reminders and platform checks |
| [Artwork](../assets/README.md) | Sources, searchable catalogue, state guidance, generated previews, and exports |
| [Android artwork handoff](../assets/ANDROID_ARTWORK.md) | Planning, recovery and later countdown symbols; compact states, sizes and acceptance limits |
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
| [ADR-012](adr/012-import-first-phone-planner.md) | Historical import and Windows-to-phone order; later decisions keep direct planning and Android self-use first |
| [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) | Local editing first; screenshots and all academic-access work deferred |
| [ADR-014](adr/014-desktop-focus-and-mobile-ads.md) | Desktop focus, mobile-only ads, private-development direction and a desktop purchase experiment |
| [ADR-015](adr/015-android-self-use-first.md) | Accepted Android planning and focus self-use first; desktop package and ads later |

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
