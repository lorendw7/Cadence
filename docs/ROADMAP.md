# Roadmap

Updated: 2026-11-15. [ADR-015](adr/015-android-self-use-first.md) selects Android self-use first: reliable time management, then a bounded task-linked focus timer. Windows remains the development host. Desktop focus presentation, media and Steam work are deferred. Ads may be evaluated only after a useful mobile release and an ad-free usage baseline. School authorization, applications and integration remain postponed. This is a plan, not shipped behavior.

## Repository baseline

The app has in-memory task addition, validation, completion, deletion and latest-delete undo. Saving, Today, Week and focus are not implemented. Android setup and a debug APK are recorded in [SETUP.md](SETUP.md#android-environment-observed-on-2026-11-15); phone acceptance remains separate. [LEARNING.md](LEARNING.md) records actual checks and pending manual acceptance. Artwork and retained website source present concepts. Pages is offline.

## Working order

Accepted on 2026-11-15: the maintainer has an Android phone, will use it daily and has no external testers. Android is the first self-use target. A complete Windows product, desktop timer layout, media pack or Steam listing is not a prerequisite. The next step remains the current learning checkpoint; future core code stays learner-owned.

**Current lesson -> fictional Android device check -> safe local tasks and native recovery -> direct plans, Today and Week -> corrections and planning self-use -> Android task-linked countdown and focus self-use -> useful ad-free mobile release -> separately reviewed ads or desktop commercial work.**

Stages A-C build shared planning rules. Native checks in D accompany each slice instead of waiting for a complete desktop edition. H adds phone focus after the planning trial. F handles public distribution. I describes later Android quality candidates. I, G, C1/C2 and E remain later choices, not parallel active projects. Stage letters and older link anchors stay stable; their alphabetical order is not the delivery order.

[DESKTOP_V1.md](DESKTOP_V1.md) remains the bounded later Windows offer. Reuse existing assets when selected; no fal top-up or new paid generation is scheduled. Wallpaper controls, mixing, extra scenes, automatic timer cycles and additional platforms are deferred. A one-time desktop purchase and mobile ads are unproven revenue hypotheses. Do not spend the same hours twice or fund development from hoped-for receipts.

School feasibility, application preparation and integration are deferred extensions. No school work is scheduled alongside current local development. The local release does not wait for either. Screenshot recognition and CSV/table import have no fixed position in this sequence.

Use [PRODUCT.md](PRODUCT.md#feature-priorities) for priorities. Tasks, deadlines, appointments and available time are central. Windows remains a development and regression surface. The phone must pass its own storage, lifecycle, touch and accessibility checks. Safe task-only self-use may begin after A and the corresponding D checks; label absent calendar and focus features honestly.

The survey did not identify a mobile OS. Android fits the current development environment; schedule iOS with a compatible Mac and real device. Shared Flutter code does not replace native tests.

## First public version and later competitive quality

Scope clarification dated 2026-11-15. First version in this section means the first **public Android release**, after A-C, D, H and F. Safe task-only use and the complete planning self-use trial are earlier, smaller milestones. A timer and store listing do not block those trials. This documentation pass authorizes no code, purchase, recruitment or deployment.

The target is comparable quality in a bounded personal planning routine. Use the [official-product comparison](COMPETITIVE_REVIEW.md#three-view-reference-mapping) and [workflow benchmark](VALIDATION.md#android-workflow-benchmark). Feature count, elapsed development time and a passing build do not establish that target. Later candidates must solve observed problems before entering the active queue.

| Capability or service | First public Android version | Later boundary or decision |
|---|---|---|
| Task management | Title-only capture; edit, complete/reopen, delete and supported undo; notes and date-only/exact deadlines; open/completed views | Title search is I2. Projects, subtasks, tags and natural-language date input need separate scope decisions. |
| Today | Current/next plan, readable time/location, day agenda, consistent due/overdue/undated groups and count shortcuts | Refine the reading order from observed use in I4. No automatic daily prioritization. |
| Week and direct planning | Selected-day phone agenda, timed/all-day plans, visible recorded gaps, reachable task tray, explicit start/end editing | More calendar modes and drag scheduling remain separate candidates. A task deadline never becomes a work block automatically. |
| Repeating commitments | Bounded weekly repeats, clear scope, single-occurrence time/room changes, cancellation and restoration | Advanced recurrence, school rules and external source updates are deferred. |
| Data safety | Local/temporary choice, confirmed saves, retained input on failure, versioned backup/restore/clear and safe upgrades | Cloud backup and sync are separate services. Local files must not be described as encrypted vaults. |
| Focus | One task-linked countdown, pause/end, manual breaks and small honest local records, after the planning trial | Extra timer modes, music, scenes and desktop compact mode are not Android first-version requirements. |
| Android usability | Real-device installation, Back, keyboard, lifecycle, large text, accessibility and Japanese/English/Chinese behavior | I4-I5 extend evidence to more routines and devices; baseline correctness cannot be postponed to those stages. |
| Reminders and quick access | Clear in-app dates and navigation; no unverified background-reminder promise | Opt-in local reminders in I1 and a next-plan widget in I3, if selected. |
| User help and support | Storage/recovery help, contact route, version information, known limits, release notes and private fault reporting | I6 improves support procedures after real requests. It does not defer the first usable help route. |
| Accounts and online services | Core works offline without an account or runtime backend | Personal sync needs explicit selection, an operating budget and its own acceptance. Team collaboration and integrations are not included. |
| Distribution and income | Tested signed Android package, update/recovery checks, privacy materials and applicable store testing | Ads are a separate G pilot after a useful ad-free release. Desktop sales and other platforms remain separate decisions. |

Use [PRODUCT.md](PRODUCT.md#feature-priorities) for scope and [the view specification](UI_ARCHITECTURE.md#shared-rules-for-the-three-views) for interaction details. Missing reminders, search, widgets or sync must be clear in release descriptions. The first local edition is intended for people who accept those limits; it does not replace every existing planner workflow.

## Evidence and planning alongside delivery

The [survey](SURVEY_FINDINGS.md) supports investigating less entry and clear phone viewing. It does not prove adoption of a manual planner. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) records the B plus C direction and the latest narrower delivery route.

Test the direct-editing loop with a class, a report deadline, a reserved work session and a personal appointment. Measure setup effort, lookup, corrections and voluntary return use. Keep raw responses and personal pitch material outside the public repository.

Prepare a fictional-data demonstration of local planning. Keep [school-access questions](UNIVERSITY_INTEGRATION.md) as a later reference. A concept demonstration may show planned behavior, but must label it. No school login, credentials or real school-data access is needed to demonstrate the proposed value.

## Work packages and review points

Use the [Android daily-use review matrix](ANDROID_EXPERIENCE.md#review-and-delivery-mapping) during A-D and F. It connects the prepared screen artwork to existing checks and adds no stage, scope or hours. Static design review cannot close a native gate.

This breaks the accepted route into reviewable outcomes. It adds no platform, feature stage or hours to the [working estimate](#working-estimate-at-10-15-hours-per-week). The current lesson comes first; the lesson ranges are dependencies, not promises that every numbered lesson takes one session.

| Order | Existing work and learning link | Demonstration required before widening scope |
|---|---|---|
| 1 | Finish lesson 17 and the async/state topics in 18-21; early fictional Android launch alongside D | Explain success, failure, cleanup and late results; record actual phone launch separately from saving |
| 2 | A plus native recovery in D; storage topics 22-31 | Save a task offline, restart, recover a backup and retain input after a failed write; only then start private task-only use |
| 3 | Simple plans and dates in B; editor and interval topics 32-38 | Edit a deadline, create a separate work plan and calculate an interval without changing the task's meaning |
| 4 | Today/Week, repeats and corrections in B-C with D; topics 39-44 | Complete the planning routine on the phone, pass recovery and begin the two-week planning trial |
| 5 | H after that trial; prepare the next small timer lessons when needed | Start focus from a task, pause/end, take a manual break and recover an honest local record after interruption |
| 6 | F after native planning and focus acceptance | Install and update the distributed build, retain records, provide truthful help/privacy material and meet applicable store testing |

At each 20-hour review, record hours used, the demonstrated outcome, unresolved defects and the next single slice. Keep one learning-critical change active at a time. The assistant may complete delegated wiring, visual work, regression setup and documentation around reviewed patterns. State transitions, new save rules and first representative Flutter implementations remain learner-owned.

The [weekly first-version plan](WEEKLY_PLAN.md) turns these dependencies into 25 reference work slots at 13 hours each: 250 base hours and 75 reserve hours. It lists each week's learner-owned implementation, assistant support and observable acceptance. At 10-15 hours per week, carry unfinished work forward instead of skipping a gate. It does not start future lessons or replace the current progress record.

Apply [the Android workflow benchmark](VALIDATION.md#android-workflow-benchmark) only to implemented slices. Before F, review any failed quality check and describe unsupported capabilities honestly. External comparison studies remain unrun until participants and the relevant builds are available; they are not a new gate for self-use. [Later competitive gaps](PRODUCT.md#competitive-gaps-to-review-later) do not silently enter this work queue.

## A — Reliable local tasks

- [ ] Continue the async lesson and introduce persistence through learner-owned steps.
- [ ] Check Android tooling and launch the existing fictional task exercise on the maintainer's device when the current checkpoint permits. This is a device check, not storage acceptance.
- [ ] Offer Save on this device or Temporary use before reading saved records.
- [ ] Introduce one local drift/SQLite adapter when needed; keep one active writer.
- [ ] Add task editing, optional notes and date-only/exact deadlines.
- [ ] Confirm writes before showing saved status; retain input on failure and prevent duplicate submissions.
- [ ] Keep unsaved forms in memory with Save, Discard or Cancel.
- [ ] Verify offline restart, storage failures, damaged data and explicit mode changes.
- [ ] Establish backup/restore/clear safety before private-data trials.

Acceptance: confirmed saves survive restart on the phone. Temporary startup leaves an old database unopened. Failures retain input and the last confirmed records. Native export/restore and clear pass before real personal tasks are used. No login or network is needed. This safe task slice need not wait for Week or a timer.

## B — Personal plans, Today and Week

- [ ] Add timed/all-day plans and weekly classes with optional location and notes.
- [ ] Use a stable workspace timezone; test date boundaries, overnight intervals and daylight-saving gaps.
- [ ] Add bounded weekly repeats and visible editing scope.
- [ ] Derive views, counts and conflicts from the same confirmed records and date rules.
- [ ] Keep Today, Week, Tasks and Settings; expose only working destinations.
- [ ] Show the next commitment, daily agenda, due tasks and separate overdue/undated groups.
- [ ] Show free intervals in Week beside an accessible task list.
- [ ] Reserve a separate work plan before a task deadline. Moving that plan must not move the deadline or complete the task.
- [ ] Design readable desktop and compact views with three-language controls, keyboard access and large text.

Acceptance: enter a class, personal appointment and report deadline. Find available time and reserve a writing session. Today and Week agree, overlaps remain visible, and ordinary planning needs no semester setup.

<a id="c--private-backup-and-first-windows-trial"></a>

## C — Private backup and planning trial

This stage completes the direct-editing local product. Neither screenshot import nor school access is a requirement.

- [ ] Add single-occurrence time/room changes, cancellation and restoration with clear occurrence/series scope.
- [ ] Preserve occurrence identity and prevent duplicate display. Cancellation retains previous overrides; restoring it returns the previous effective time and room.
- [ ] State supported recurrence rules. Reject unsupported rules visibly rather than silently flattening them.
- [ ] Extend versioned JSON backup/restore to tasks, plans, repeats and occurrence corrections.
- [ ] Validate bounds, dates and references before replacement; retain recovery data on failure.
- [ ] Verify clear, temporary cleanup, failed writes, cancelled work and restart on the actual Android device; retain shared Windows regressions.
- [ ] Retain language support, keyboard access and 200% text scaling.
- [x] Lesson 16 removed the teaching counter under explicit delegation; historical results remain in LEARNING.
- [ ] Complete the maintainer's planning trial with the native checks in D. Fix blocking defects and record external studies as unavailable rather than passed.

Acceptance: create commitments, correct one repeated occurrence, see available time and reserve work before a deadline. Restart offline, export, preview a restore and clear data without developer help. A release may be complete within this stated local scope even while school access is unresolved.

## D — Android phone validation

This is the first native self-use target under ADR-015. Run a fictional-data launch early, then pair device checks with the relevant A-C slice. Real private records require accepted local/temporary isolation, saving, restart and backup recovery. Do not wait for desktop focus, music, Steam or another platform release.

- [ ] Keep Today, Week and Tasks reachable in compact layouts.
- [ ] Make the next commitment, time and location easy to read for a class, meeting or appointment.
- [ ] Use a daily agenda and day selection in Week without shrinking a desktop grid into tiny text.
- [ ] Test local storage, backup export/import, permissions and cancelled file actions on a real device.
- [ ] Test pause/resume, process termination, keyboard overlap, Android Back, rotation, safe areas, touch and screen readers.
- [ ] Keep timer testing in the following H stage; it does not block the first safe planning trial.
- [ ] Validate Android export/restore locally. Cross-device Windows transfer is later compatibility work when both target packages are accepted; it is a snapshot, not sync.
- [ ] Compare daily lookup and plan adjustment with the participant's current method.

Acceptance: the maintainer can capture tasks, inspect Today, reserve time in Week, correct a change, close/reopen and recover a backup on the phone. Complete two weeks of ordinary planning use after A-C and native safety pass. Keep a private friction/defect log. No external cohort is required for self-use; this does not establish independent demand or waive public store requirements. A passing build or narrow Windows screenshot is insufficient.

## H — Android focus self-use

This is the next active phase after reliable planning and the first self-use check. It improves starting work on an existing task without making a timer a prerequisite for ordinary planning. Keep Today, Tasks and Week as main destinations; open focus from a task.

- [ ] Agree on the learner-owned timer and persistence contract before implementation: start, pause, resume, end, completion, manual break, backgrounding, screen lock, clock change, process termination and failed writes.
- [ ] Start one configurable countdown on an existing task without entering its title again. Offer simple focus/break durations; a break or another interval starts only by explicit choice. Automatic multi-round cycles and count-up are deferred.
- [ ] Keep the task title, remaining time and pause/end actions readable on the phone. A completed timer never completes the task or moves its deadline.
- [ ] Save a small task-labelled session history under the chosen local/temporary policy. Keep recorded timer time distinct from planned time, breaks and verified attention. Failed writes retain reviewable input and must not create duplicates.
- [ ] Test screen-off, app switching, process death, interruption, clock change and restart on the actual phone. Define unknown or interrupted time explicitly. Do not promise continuous background execution or closed-app alarms.
- [ ] Extend backup/restore/clear only when the session schema is introduced. Keep old confirmed planning records recoverable.
- [ ] Use the complete task-to-focus flow during self-use and fix confusing transitions or lost records before public release. No music, scene, desktop compact window, daily pins or ad SDK is required.

Acceptance: select a task, focus, pause/end, start a break manually and find an honest local record without duplicate time, automatic task completion or changed deadlines. Check native interruptions separately from ordinary use. Desktop timer work later reuses these rules but does not inherit Android acceptance automatically.

## F — Free Android and iOS store releases

Prepare Android public distribution after planning and focus native acceptance. Local installation and self-use do not require a store listing or recruited cohort. Public stores may impose separate testing requirements. iOS remains a later target; it is not part of this Android release. Documentation work does not purchase accounts or submit builds.

- [ ] Prepare truthful screenshots, age ratings, support information and privacy declarations.
- [ ] Provide the first-version help, feedback and recovery services in [service readiness](#service-readiness-and-continuing-maintenance), with a named owner and reachable contact route.
- [ ] Publish versioned release notes, known limits and upgrade/recovery instructions. Check that an older supported saved workspace survives the distributed update.
- [ ] Have the maintainer handle identity, agreements, fees and signing credentials outside Git.
- [ ] Recheck current store requirements before scheduling.
- [ ] Recruit testers where needed, retain feedback, fix defects and retest.
- [ ] Test install, update, offline restart and recovery from the distributed build.

Follow [the Google Play preparation steps](RELEASE.md#google-play-preparation-from-the-current-checkout) and [official release references](FREE_EDITION.md#delivery-and-testing). The maintainer has no developer account; new-personal-account testing, release signing and a public app privacy URL remain open. Store approval and working distributed behavior are both needed. Store waiting time is separate from development effort.

## I — Later Android competitive improvements

These are estimated options after the first useful release, not additions to the first-version gates. Select one from observed friction, define its learner-owned rules, then re-estimate before implementation. I1-I3 need no application server. The table's 200-400 base hours describes completing all six candidates; selecting fewer gives a smaller scope. No item is implemented by this plan.

| Candidate | Incremental base hours | Trigger and bounded deliverable | Acceptance evidence |
|---|---:|---|---|
| I1. Opt-in local reminders | 35-70 | People miss recorded commitments. Add chosen reminder times, per-item/global controls and clear permission/delivery status under [NOTIFICATIONS.md](NOTIFICATIONS.md). | Edited/cancelled items do not notify at old times; denial, restart, time changes and supported background cases are checked on Android. State unsupported delivery cases. |
| I2. Task title search | 15-30 | Finding existing work repeatedly requires long scrolling. Search the confirmed task titles with open/completed context and useful empty results. | Selecting a result opens the right record; edits, completion and return preserve a coherent result list. No full-text service or new project hierarchy. |
| I3. Next-plan home-screen widget | 30-60 | People repeatedly open the app only to check the next plan. Show one next commitment with a clear open action and title-privacy choice. | Check edits, date changes, stale content, device restart and local/temporary mode. Do not leave temporary or cleared records on the home screen. |
| I4. Repeated-use design refinement | 45-90 | Observe the complete routine across repeated use, then repair costly navigation, entry and reading problems in all three languages. | Record fewer mistaken dates, blocked actions and requests for help against the same fixture. Baseline access and saving defects already block F. |
| I5. Broader device and upgrade coverage | 45-90 | Extend the first accepted phone/build coverage to a stated range of Android devices, longer saved histories and older released data versions. | Record device/version coverage, repeated upgrade/restore checks and regressions. This extends D/F rather than charging again for their initial checks. |
| I6. Support and maintenance improvements | 30-60 | Use actual feedback to improve help, fault reproduction, release procedures and incident recovery. | A reported problem can be reproduced, assigned, fixed and explained without collecting a person's whole planner by default. Basic help/contact already exists at F. |

Review comparable quality through capture, daily lookup, independent deadline/plan editing, interruptions and recovery. Record the actual competitor version, Cadence build and task fixture when comparison becomes possible. Self-use remains useful but cannot establish broad usability or demand. The [expanded estimate](#estimate-for-later-competitive-improvements) is a capacity scenario, not a claim that finishing six rows proves parity.

## G — Mobile-only advertising pilot

Start only after the mobile core has shipped, works without ads and shows repeat use. Android comes first; an iOS pilot needs its own acceptance. Ads are a possible second income source, not the budget for first development.

- [ ] Review provider/store eligibility, intended audience, regional consent and age-related requirements. Use official test ad IDs in development.
- [ ] Start with one labelled, non-interrupting candidate placement on an optional review screen. Do not add ads to focus, Today/Week planning controls, task rows, editors, save/restore, launch, notifications or widgets.
- [ ] Exclude forced interstitials, rewarded unlocks and paid ad removal. Ad visibility does not change functions or future cloud quotas.
- [ ] Keep task text, notes, calendar content, school identity and focus history out of ad requests. Review SDK data collection, consent and store disclosures separately.
- [ ] Test denied consent, offline/no-fill, timeouts, background/resume, accessibility and removal of the pilot. Core functions remain usable in every case.
- [ ] Compare actual mobile publisher revenue, support cost and return use against the ad-free baseline. Set the trial budget, duration and stop rule before launch; stop for privacy or core-flow defects.

Acceptance: both native/store checks and a tolerable user experience pass. Desktop and Web ad income stays zero. Follow [platform policy](FREE_EDITION.md#advertising-by-platform), [the one-placement proposal](FREE_EDITION.md#review-screen-ad-proposal) and [pilot stop rules](VALIDATION.md#review-screen-ad-pilot); a successful request or download count is not revenue. The proposed frequency limit and example revenue remain untested and do not authorize SDK implementation during the current lesson.

<a id="c1--desktop-focus-and-optional-wallpaper-trial"></a>

## C1 — Desktop focus and existing media

Deferred desktop work after the Android planning and focus self-use stages. Reuse accepted shared timer rules from H instead of building a second timer. Compact mode, desktop media and Windows lifecycle still need separate acceptance. Wallpaper support remains beyond the bounded desktop offer.

The cost-controlled [desktop candidate](DESKTOP_V1.md) specifies a later Windows offer. Its [sales scenarios](STEAM_SALES_PLAN.md) are not forecasts or active spending authority. Re-estimate these subsections after shared Android work. Prepared media is not integrated app behavior.

### C1.1 — Countdown and confirmed session records

- [ ] Agree on a small learner-owned timer contract before coding: start, pause, resume, end, break, sleep, clock changes, process exit/restart and saving failures.
- [ ] Select a task without automatically completing it or changing its deadline. Keep a clear timer and a small local history; distinguish timer time from verified work.
- [ ] Test interrupted sessions, duplicate callbacks, missing tasks, disposal, temporary mode and backup compatibility. Do not promise closed-app alarms before native acceptance.
- [ ] Add 25/5 and 50/10 presets plus custom durations to the same countdown. Require an explicit choice to start a break or another focus interval; no count-up or automatic cycles.

Acceptance: start from a task without retyping its name, pause or finish, and recover an honest session record after interruption. Timer completion never completes the task. This must work in silence before player work begins.

### C1.2 — Useful desktop presentation and review

- [ ] Add up to three daily task pins and title search without duplicating task records.
- [ ] Switch the same window to a compact timer layout; validate pause/end, mute, return to planner and optional always-on-top. Resolve dirty editors before switching.
- [ ] Show today's and the last seven calendar days' recorded focus totals and a task-labelled session list. Keep planned time, break time and uncertain time separate.
- [ ] Measure CPU, memory and responsiveness beside another real work app. Record reference hardware and evidence before claiming low overhead.

Acceptance: choose important work, focus in compact mode and find the saved session without losing the task context. No detached window, tray service, global shortcut or dashboard is required.

### C1.3 — Existing content and the complete trial

Before polishing the full track selection, use the [zero-user self-use path](VALIDATION.md#start-without-external-testers) on the safe silent routine completed in C1.1-C1.2. Run the external study when participants are available and mark it unrun otherwise. Use existing assets only. Repair blocked task-to-focus use before more content work. This is a research checkpoint; complete-package quality checks still apply.

- [ ] Start with one accepted track in one local player. Add selection, previous/next, volume, sequential play and repeat through the same path.
- [ ] Audition the 12 prepared pieces and aim to select 8-12 with useful instrument variety. Listening quality decides acceptance; review the offer if the set is smaller. Publish only the final accepted count and duration. No paid generation or paid quota filling is scheduled.
- [ ] Reuse the existing static room image, cover vectors and palette; offer a plain background. No new scene, animation or ambient mixer is required.
- [ ] Test silent startup, separate cue mute, device loss, decoding errors, non-overlapping fades and recovery with playback active.
- [ ] Complete listening, repeat-tail, visual, source-rights and current store-disclosure reviews. An automated media check does not close these gates.
- [ ] Complete the maintainer's two-week use check and record external studies as run or unavailable under [VALIDATION.md](VALIDATION.md#desktop-demand-and-purchase-test). Fix core-flow and polish defects before store preparation. Self-use does not establish demand or replace store-mandated testing.

Acceptance: users can plan, focus, pause, listen and review without data loss or unwanted desktop changes. No ad code or request is present in the desktop package. All planned first-release behavior works without another desktop product or a network after acquisition/setup.

## C2 — Desktop offer and Steam gate

A one-time purchase is the preferred model to test, not an approved price. The maintainer must decide the actual offer and price before sales. No payment, account enrollment, outreach or store submission is performed by this plan.

- [ ] Confirm Steam's acceptance of the actual non-game product category. Do not label a planner as a game merely to bypass that gate.
- [ ] Define the included Windows features, supported versions, known limits, update/support scope and refund terms. Do not promise perpetual cloud hosting or unlimited future content.
- [ ] Use fictional data for a short demonstration: select a task, start focus directly, switch to compact mode and review. Show its deadline and optional Week reservation without making either a prerequisite. Demonstrate useful behavior in the opening 30 seconds. Do not advertise deferred wallpaper controls.
- [ ] Prepare accurate store images and a bounded trial/demo if supported by the selected channel. Price research must show a real offer, not only ask whether someone likes the idea.
- [ ] Check distribution rights, third-party notices, signing, complete runtime packaging, clean install, offline behavior, upgrades, uninstall/data retention and recovery.
- [ ] Keep all desktop channels free of ads, ad SDKs, sponsor cards and ad unlocks. Inspect the delivered build, not just hidden UI controls.
- [ ] Budget Steam Direct and all launch costs before enrollment. Recheck current waiting periods and store-review requirements at submission time.
- [ ] Set the cash ceiling, time review points, contribution assumptions and stop rules from [the loss-control plan](STEAM_SALES_PLAN.md#limit-losses-before-pursuing-volume). Do not fund the build from hoped-for sales or commit the full content budget before the trial gates.
- [ ] Track visits, demo use, wishlists, actual purchases, refunds and net receipts separately. Apply the purchase test in [VALIDATION.md](VALIDATION.md#desktop-demand-and-purchase-test).

Acceptance: a usable package, a truthful offer, channel permission and actual purchase evidence are distinct checks. Revenue is not guaranteed. If Steam declines the category, evaluate a direct Windows distribution offer through the existing website before committing; do not create a second site or purchase another service automatically.

## E — Later platform expansion

Retain iOS, macOS, Linux and Web. Choose bounded targets after Android self-use is useful, with a separate reason and estimate for each.

- For iOS, use a compatible Mac with Xcode, simulator and real iPhone checks for storage, file access, lifecycle, VoiceOver and signing.
- For macOS/Linux, validate native installation, files, dialogs, input, restart, upgrades and the planning flow.
- For Web, define browser-local storage, quota/eviction, tab ownership, reload/offline limits and updates.
- Record platform differences and only advertise accepted capabilities.
- Preserve the existing concept website. A future Web planner needs a separate private-data boundary and deployment review.

Acceptance: the distributed target passes the local user flow plus its platform checks. Missing hardware delays that platform, not independent releases.

## After store launch — Review services and income

The selected future personal service remains Google login with Node.js, TypeScript, Fastify and PostgreSQL under [ADR-011](adr/011-optional-sync-service.md), planned at JPY 2,500 per month. Hosting, quotas and launch remain future decisions. Local planning needs no server.

Before a sync pilot, verify repeated cross-device need, session and ownership controls, retries, conflicts, deletion, restore, off-host backups, common quotas and an export/shutdown plan. Follow [CLOUD_SYNC.md](CLOUD_SYNC.md). Personal sync does not discover school timetable changes or grant school-data access.

Review mobile-only advertising separately under stage G for platform support, user impact, privacy and actual publisher revenue. Count no revenue before a working channel exists. Separate monthly cost coverage from recovery of past spending. Any future personal service keeps common published quotas. Desktop purchase does not buy extra cloud capacity.

A school-required intermediary would be a separate integration and operating decision. It does not silently move general personal sync into the first release or fit within the same JPY 2,500 budget without review.

## Import input coverage

Screenshot recognition is optional, unscheduled work. Add it only if actual user needs justify it after comparison with direct editing. A delayed or rejected school application does not automatically trigger OCR work. CSV/table import also waits for a real export-file need.

[QUICK_IMPORT.md](QUICK_IMPORT.md) retains a conditional design. If selected later, require supported samples, bounded files, reviewed uncertainty, date/duplicate checks, cancellation and atomic save. Do not add OCR packages or import architecture before the work is selected.

## Optional — Cloud help with personal API keys

Personal-key cloud assistance is separate later work. Before implementation, show the destination and payload, obtain an explicit send choice, protect keys, bound requests and costs, and preserve drafts on failure. No automatic upload or billable fallback is permitted.

## Later local improvements

Use [stage I](#i--later-android-competitive-improvements) for reminders, task title search, a next-plan widget and broader quality work. Review totals, broader recurrence or sharing still need their own scope decision. Basic occurrence correction remains in stage C. Advanced academic rules, automatic scheduling, habits and encrypted storage remain separate work. The bounded Android focus timer belongs to H; C1 is the later desktop presentation and media package. Broader tracking is outside both.

Count-up, automatic focus cycles, named profiles, checklists, ambient mixing, extra scenes/themes and Wallpaper Engine controls are not first-release gates. Select one later improvement from observed use and make a separate estimate. The current instruction is to use existing tools and assets without recharging fal; a future scope review does not itself authorize spending.

<a id="external-academic-systems-removed-from-scope"></a>

## Conditional academic-system access

[UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) is retained as reference for a deferred extension under ADR-013. No research, application or connector work is scheduled now. The steps below apply only if the extension is selected later. No submission, approval or usable interface is confirmed.

1. Prepare a fictional-data demonstration and a small read-only data request.
2. Confirm project eligibility, a responsible contact, data owner, available interface and permitted storage.
3. Only after authorization and test access, estimate and build a bounded connector.
4. Begin with user-requested reads and reviewed changes. Keep local notes separate and show source freshness.
5. Pilot with the authorized audience, test expiry/revocation and failures, and obtain any required production permission before wider use.

Prefer an official API or calendar feed if offered. Do not assume that a Google account, school SSO, a public timetable page or a teacher's support permits academic-data access. No school-password collection, scraping, registration writes or grade access is planned.

## Service readiness and continuing maintenance

A useful product needs support and recovery as well as screens. First-version services below are included in A-C, D, H and F; they are not another implementation budget. The local app needs no account, remote database or push server. A public help/privacy page and a contact route are still distribution needs. Pages is currently offline; publishing the retained website through a separately approved route remains open. This plan creates no second site or hosting purchase.

| Service | Required for the first public version | Later service, only when selected |
|---|---|---|
| Data care | Confirmed local saving, backup export/restore, clear behavior and recoverable version upgrades; explain temporary mode | Cloud sync adds account isolation, conflict handling, repeated-request safety, off-host backups and tested restoration. Local export remains available. |
| Help and onboarding | Explain task versus plan, storage choices, missing features, backup/restore and common failures in the three product languages | Improve guidance from real support requests in I6. No remote onboarding team is assumed. |
| Feedback and fault reports | Reachable support contact; request app/Android version, device, steps and optional redacted evidence; name the person handling reports | Add only justified support tooling. Do not automatically upload task text, notes, calendars or a full private backup. |
| Updates and recovery | Release notes, stated supported builds, install/update checks, recovery instructions and a way to withdraw a faulty distribution | I5 broadens devices and saved-data versions; I6 improves repeatable support and release procedures. |
| Privacy and security reports | Accurate public privacy information, dependency notices and a private reporting route; report actual local storage limits | A sync service needs published retention/deletion rules, access controls, secret management and an export/shutdown plan before accepting uploads. |
| Operating ownership | One named maintainer can own release, support and incident response; state realistic support limits | Before cloud launch, assign monitoring, backup checks, incident response, capacity/cost review and shutdown responsibility. Do not assume round-the-clock support. |

After F, provisionally reserve **8-16 working hours per month** for support, dependency/Android checks, release work and recovery drills. This is a starting capacity assumption for a small local release, not measured demand, a service promise or a ceiling. It excludes feature development and any future cloud operation. A serious defect can consume more; protect user data before adding features. Record actual time and revise the allowance after the first month.

Maintenance uses the same 10-15 weekly hours as development. For example, reserving roughly three hours per week leaves about 7-12 for later feature work. Do not schedule a full development week plus unpaid support on top. The [cost model](STEAM_SALES_PLAN.md#recover-cash-and-working-time) keeps its earlier example assumptions until a separate cost update; this roadmap does not claim that revenue covers the new allowance. Future cloud operations need a separate workload and cash budget.

## Maintenance and estimates

Re-estimate from working code, preserve historical lessons and count shared work once. [CURRICULUM.md](CURRICULUM.md), [QUALITY.md](QUALITY.md), [SETUP.md](SETUP.md) and [RELEASE.md](RELEASE.md) define learning and acceptance.

### Working estimate at 10-15 hours per week

Planning date: 2026-11-15. These are provisional remaining-effort ranges for a learner, not measured velocity or release dates. Re-estimate after the first safe Android task slice and every 20 working hours. Native toolchain findings can change the ranges. Two weeks of self-use is an observation period after a usable build, not a promise to finish development in two weeks.

| Stage | Incremental base hours | Boundary |
|---|---:|---|
| A. Reliable local tasks | 35-55 | Remaining learning steps, local/temporary choice, task editing/deadlines, confirmed saves, basic backup and failed-write recovery |
| B. Plans, Today and Week | 40-65 | Direct timed/all-day plans, workspace dates, three-view interactions, recorded gaps and bounded weekly repeats |
| C. Corrections and planning recovery | 25-40 | Occurrence changes/cancellation/restore, versioned planning backups, clear/recovery and planning-trial fixes |
| D. Android planning acceptance | 20-40 | Remaining device setup/acceptance, touch/Back/keyboard, native files, restart/process death, installation and self-use fixes; no timer or store work |
| H. Bounded Android focus | 30-50 | One task-linked countdown, manual breaks, honest local session records, session backup and native interruption checks |
| F. Android public release | 15-30 | Signed distribution and updates, help/contact/privacy materials, required testing work and store preparation; external waits excluded |

A-C divide the existing **100-160 base-hour** planning budget; they do not add another 100-160 hours. This allocation is new and unmeasured. D is distributed across A-C, not a second copy of their shared code. H contains timer-specific native checks. F includes first-release support setup, not indefinite support. Re-estimate remaining D effort from the existing debug APK and actual phone evidence rather than rebuilding completed tooling.

| Cumulative milestone from the current checkout | Base hours | Hours with 30% reserve | Working duration at 10-15 hours/week |
|---|---:|---:|---|
| Planning self-use: A-C plus D | 120-200 | 156-260 | About 11-26 weeks, roughly 3-6 months |
| Planning and bounded focus: add H | 150-250 | 195-325 | About 13-33 weeks |
| First public Android version: add F | 165-280 | 215-364 | About 15-37 weeks, roughly 4-9 months |

Apply reserve to the total and round up to whole hours. Rows are alternative cumulative milestones, not quantities to add. Design, learning, implementation, translation review, tests, self-use follow-up and fixes all consume this budget. Unattended observation and account, recruitment or review waiting are calendar time, not extra development hours; they can overlap other work only where dependencies permit. The two-week planning trial remains required even when an hourly estimate is met.

A safe task-only slice can be installed earlier after A and its native recovery checks. Do not wait for all calendar work to learn from safe task use. A public release still requires its complete stated scope and evidence; reaching an hour total does not close a gate.

The old Windows-first estimate of 219-358 hours and the old Windows-plus-Android estimate of 284-488 hours are historical, not the active budget. Desktop focus/media and Steam are excluded here. Re-estimate that later package from the shared code that exists after H; do not add the old countdown estimate again. iOS, complete macOS/Linux/Web releases, school work, imports and cloud sync also remain outside this estimate. Ads are not part of the active total.

With no external testers, use the [zero-user route](VALIDATION.md#start-without-external-testers). Record demand as unknown. The maintainer's goal includes cash and working time: add logged past effort, fixed future maintenance and actual acquisition/support costs to the [full-cost model](STEAM_SALES_PLAN.md#recover-cash-and-working-time). No estimate predicts profitability or authorizes new spending.

### Estimate for later competitive improvements

Stage I is a lower-confidence planning scenario after F. Its six rows total **200-400 additional base hours**: I1-I3 account for 80-160, and I4-I6 for 120-240. With 30% reserve, I adds **260-520 hours**. The broader quality work must extend the first release's evidence; it must not charge again for the same baseline checks or excuse known blockers at F.

First release plus all of I is **365-680 base hours**, or **475-884 hours with reserve** from the current checkout. Use **about 500-900 hours** as the rounded planning allowance discussed with the maintainer. At 10-15 hours per week, that rounded allowance is about 34-90 working weeks, or roughly 8-21 months before ongoing support reduces feature capacity. These totals exclude future platform/service options and recurring maintenance.

At the illustrative post-release capacity of 7-12 feature hours per week, I alone would take about **22-75 additional working weeks**. This is an alternative capacity calculation, not another block of work to add to I. Recalculate with logged support time rather than assuming the initial public-release pace continues unchanged.

Use completed routines and observed error/recovery results to judge competitive quality. Delivering search, reminders and a widget does not by itself demonstrate that quality, user demand or willingness to switch. An observed need may also lead to a smaller solution than the candidate listed here.

### Conditional estimates for broader scope

These are rough additional base-hour ranges after reusable planning/focus rules exist. They have lower confidence than the first-version estimate. None is selected for implementation, funded, included in the 500-900 hours or a prerequisite for the independent Android release. The first column states each scope boundary; larger requirements need a new estimate. Add a 30% reserve only to selected work, and count shared work once.

| Optional stage or service | Additional base hours | Boundary and dependencies |
|---|---:|---|
| G. One mobile ad pilot | 20-40 | One accepted placement, consent/failure checks and pilot measurement after useful ad-free use. Provider eligibility, waiting, revenue and spending remain separate. |
| C1. Bounded Windows focus/media package | 80-140 | Reuse H's timer rules and accepted existing assets; add desktop controls, player, compact mode and Windows package/lifecycle acceptance. No new paid media, mixing or wallpaper feature. |
| C2. Desktop distribution/offer preparation | 15-30 | After C1, review channel eligibility, package updates, listing/help and offer validation. Fees, review waits and sales outcomes are excluded. |
| E. iOS local edition | 60-120 | Reuse accepted shared code; add iPhone storage, keyboard, VoiceOver, lifecycle, files, signing and distribution checks. A suitable Mac and device must be available; hardware and waiting are excluded. |
| E. macOS or Linux local edition | 60-120 per target | One named operating system, native packaging, files, input, lifecycle, updates and recovery. Neither target inherits Windows acceptance. Media beyond shared support is separately scoped. |
| E. Browser-local planner | 80-160 | One stated browser support matrix, local storage/eviction, offline/reload, tab ownership, updates and private-data separation. No sync server or duplicate concept site. |
| Optional personal sync pilot | 240-480 | One account provider and the Android client on two devices: explicit enablement, offline queue, conflicts, account isolation, deletion, export, off-host backups, monitoring and failure recovery. Other clients and team sharing are excluded. Follow [CLOUD_SYNC.md](CLOUD_SYNC.md). |

The C1-C2 figures are provisional remaining-work allowances after H, replacing no historical completed hours. If title search or another shared feature has already passed I, subtract that shared work at re-estimation. Calendar integrations, screenshot/CSV import, natural-language input, AI planning, team collaboration and advanced recurrence have no bounded delivery estimate yet. Select a concrete user problem, supported input and acceptance scope before assigning hours. School access retains its separate [conditional estimate](#conditional-connection-estimate), including permission and interface dependencies.

Matching an entire mature multi-platform product would therefore be a multi-year program for a part-time solo developer, not a fixed next release. No arithmetic total across these optional rows establishes full parity. Running a service also adds recurring work after implementation; the sync estimate does not purchase hosting or promise a user capacity.

### Conditional connection estimate

Deferred reference only. These earlier estimates are not part of the active schedule or the QREC eight-week study. Re-estimate if school access is selected as a later extension.

Budget about **8-16 additional hours** for consultation materials, required-field mapping and application preparation. School response and approval time are unknown. The school's published authentication rule asks for an application at least one month before the desired start; it is not an approval-time guarantee. See the verified source and eligibility limits in [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md#previously-reviewed-school-materials).

For **one documented, authorized read-only API or calendar feed**, after permission, sample data and test access are available:

| Connection milestone | Incremental base effort | Scope |
|---|---:|---|
| Connected technical prototype | 30-60 hours, about 2-6 working weeks | Read a bounded own-timetable snapshot and show a reviewed draft on one target |
| Connection ready for a limited production release | 80-160 hours total, including its prototype | Mapping, permitted authentication, review/refresh, expiry, duplicate/conflict handling, retention, supported-client checks and pilot fixes |

With roughly 30% reserve, the connection is **about 105-210 additional hours**, or **7-21 working weeks**. This is added once to the chosen local scenario; preparation is separate. Approval waiting is extra calendar time, though it can overlap useful local work. The same developer cannot perform both sets of development hours at full capacity simultaneously.

These are conditional estimates, not a connected-release date. If no documented interface exists, or custom vendor work, server operations, broader data access or continuous notifications are required, make a new estimate. Do not model those cases as a small connector. A general local release can proceed while the connection remains unavailable.

Revisit local estimates after two weeks of actual work and after saving/recovery. Keep the QREC eight-week investigation focused on local planning and user validation. School research and applications are outside that study.
