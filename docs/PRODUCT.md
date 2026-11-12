# Product scope

Updated: 2026-11-12. Cadence is a **general-purpose local time planner** for personal life, work, study and other daily commitments. Personal plans, tasks, Today and Week are the core. Courses are optional. No account, school identity, semester or organization is required. [ADR-007](adr/007-general-purpose-local-planner.md) records this direction and replaces the earlier university-centered scope and school gate for general Web deployment.

[ADR-010](adr/010-open-multiplatform-free-first.md) sets the latest direction: continued MIT open-source development and free local planning on desktop, Web, Android and iOS. Complete the free edition first; review cloud sync and possible ads after store launch. ADR-008 still defines the small local core. ADR-009 still excludes external academic systems.

## Current state

The teaching app supports validated task addition, completion toggling, empty-list feedback, deletion and single-level undo in memory. It does not yet save data or manage schedules. The website is a concept presentation, not a working planner. Current lesson results and pending manual checks belong in the [project README](../README.md) and [learning log](LEARNING.md).

The learner writes core code through small lessons. The assistant maintains delegated documentation, artwork and website work, teaches, reviews and prepares tests/templates. A design update does not implement a future lesson.

## First useful local product

This is the desktop feature baseline. Every row is required for the first useful desktop edition, but most behavior is still planned. Start with Windows. Claim macOS or Linux support only after checks on that native system. This table owns feature scope; [ROADMAP.md](ROADMAP.md) owns delivery gates.

| Area | Planned desktop behavior | Current implementation |
|------|--------------------------|------------------------|
| Tasks | Create, edit, complete, reopen and delete; required title, optional notes and date-only or exact-time deadline; latest-delete undo where supported | In-memory addition, title validation, completion, deletion and latest-delete undo; no editor, notes or deadlines |
| Personal plans | Create, edit and delete timed or all-day entries; optional location/notes; weekly repeats with an end date; edit/delete the whole series | Not implemented |
| Today | Tasks due today, separate overdue/undated/completed groups, daily timeline and next plan; counts follow the same date rules as the lists | Not implemented |
| Week | Monday-Sunday calendar, all-day band, previous/next/This week controls and collapsible task tray; show overlaps without blocking real commitments | Not implemented |
| Saving | Choose Save on this device or Temporary use; explicit Save, retained input on failure and restart recovery of confirmed saved records | Memory only; no storage choice or persistence |
| Recovery | Export one private JSON backup, validate and preview replacement before restore, and explicitly clear local data | Not implemented |
| Settings and help | Language, active storage mode, local data location, backup/restore, clear, version and a support link | Not implemented |
| Access | Offline use without login or telemetry; keyboard and pointer access, readable resizing and 200% text scaling; Japanese/English/Chinese controls | Task exercise only; complete language and desktop access acceptance remains pending |

A task answers **what needs finishing**. A plan answers **when time is reserved**. For example, a report due Friday is a task; Thursday 14:00-15:00 writing time is a separate plan. Do not silently turn deadlines into calendar blocks or claim that planned time measures actual work.

The desktop edition uses one local workspace. It has no commercial task limit. File and record bounds may protect reliability. A temporary session can export a backup explicitly, but must not create automatic private disk copies. Local saving and JSON backups are initially unencrypted.

The first release must make these basic flows dependable before adding specialized modules. A task deadline does not reserve a calendar interval. A repeat always has a bounded range. [REDESIGN.md](REDESIGN.md) defines behavior and [ROADMAP.md](ROADMAP.md) separates implementation stages from release gates.

On first use, explain **Save on this device** and **Temporary use**. Until the user chooses saving, keep business data in memory and explain loss on close. Remembering an explicit choice is allowed. Temporary mode does not open an old private database or write recoverable drafts/automatic backups. Saving does not imply encryption, cloud sync or backup. The detailed transitions are in [APPLICATION.md](APPLICATION.md#retention-mode-and-session-transitions).

## Platforms and visual direction

The current delivery scope is the free desktop edition: Windows first, then macOS and Linux after native acceptance. Web, Android and iOS remain longer-term directions. Reassess them after the desktop edition is dependable; do not add browser, mobile, store-testing or service work to the current milestone. The concept website remains separate from any future Web application. See [FREE_EDITION.md](FREE_EDITION.md).

Keep Flutter shadcn_ui and a shared theme. Introduce it gradually with working controls, without extra wrapper layers. Use a quiet paper-and-ink interface with the existing independent C mark, muted wine `#7C394B`, pure white `#FFFFFF` and graphite text. Paper and sage remain within the artwork. Everyday examples should include work and personal life as well as study. The brand has no university affiliation. See [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) and [DESIGN.md](DESIGN.md).

## Optional later work

These features are outside the desktop baseline. A design study or an artwork asset does not make one a release requirement.

| Extension | Scope and decision boundary |
|-----------|-----------------------------|
| Courses | Start only with the teaching-week and period rules needed by actual samples; single-class changes and filtered sharing can follow separately |
| Review and reminders | Local planned-time review and opt-in native reminders with tested platform limits; not actual-time tracking |
| Assisted import | Local CSV/paste and screenshot drafts using RapidOCR; optional cloud AI with personal API keys and multiple provider profiles; review before saving; see [QUICK_IMPORT.md](QUICK_IMPORT.md) |
| Cloud sync and optional ads | Review only after store launch; no implementation or funding commitment now; no paid tiers |
| External academic systems | Excluded; historical studies do not authorize integrations |

Optional work follows a usable free edition. Keep accounts, billing, ad SDKs and sync services out of the current build. Local course rules, reminders and assisted import are also secondary to the free core. Choose later work from real feedback and measured costs.

Advanced search, custom categories, drag-to-schedule, a separate month view, dark mode, persistent unsaved drafts and single-occurrence repeat changes are not first-release commitments. Add them only after a concrete need and a bounded design review. Full-text search and a category system are not needed to finish the first task and calendar flows.

## Removed connections and independence

School authentication, automatic timetable retrieval and external academic-system adapters are removed from the active scope. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) and [SCHOOL_DEMO.md](SCHOOL_DEMO.md) are historical references only. Ordinary study entries remain possible as personal plans. General development and release need no university approval.

Do not collect school passwords, build source adapters or imply institutional endorsement. Reconsider an external connection only after a new explicit product decision.

## Free edition and open source

Keep the existing [MIT license](../LICENSE). Cadence has one free feature set for everyone. There is no paid tier, subscription, paid expansion or paid priority. Any future cloud service uses the same published quota rules for everyone. Ads are the only possible future revenue model in this plan and do not unlock features or extra capacity. Local planning and recovery have no commercial task limit. Technical bounds protect reliability. [FREE_EDITION.md](FREE_EDITION.md) owns platform behavior and future service boundaries.

## First-release limits

Use one local workspace and one running writer. Keep one workspace timezone, initially the system timezone. Use ordinary SQLite and unencrypted private JSON backups with clear privacy text. Unsaved editors stay in memory and use explicit Save; crash recovery of those forms is not promised. Defer persistent drafts, application-level encryption, per-plan timezones, single-occurrence repeat changes, custom category management and unlimited undo. Preserve the accepted journal layout and three-language behavior.

## Success and exclusions

Success means a person can record a commitment, understand today and the week, finish a task, recover their own data and find help without the developer's assistance. Test different routines and accessibility needs rather than one institution's timetable. Desktop packages initially use GitHub Releases; Web and mobile releases have their own gates. List only verified platforms and features.

Required cloud accounts, external academic systems, live collaboration, enrollment/grade operations, social feeds, payroll and unrelated dashboards remain excluded. Local import and optional personal-key AI are later studies, not desktop-release requirements. Possible cloud sync must remain free under the same published rules for all users. It is not promised or scheduled now. Advertising may be evaluated later; it cannot guarantee funding for unlimited hosting. Keep local functions useful without ads or a service.
