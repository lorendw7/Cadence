# Weekly plan for the first Android version

Prepared on 2026-11-15 and revised on 2026-11-18. This is a proposed work schedule. [ROADMAP.md](ROADMAP.md#first-public-version-and-later-competitive-quality) owns scope and release gates. [CURRICULUM.md](CURRICULUM.md#division-of-work) owns the teaching boundary. [LEARNING.md](LEARNING.md#current-learning-checkpoint) records actual progress.

## Starting point and weekly capacity

Start from lesson 18 and the existing in-memory task app. The learner confirmed an exact Windows paste in lesson 17. Saving, plans, Today, Week and focus are planned. An Android debug APK exists. Device launch, storage and lifecycle acceptance still need their own results.

Use **25 reference weeks at 13 hours each** as the existing project scenario. Each reference week has **10 planned hours and 3 reserve hours**. The total is **250 base hours plus 75 reserve hours, or 325 hours**. This estimates delivery effort across the whole project. Use the short study week below for the learner's own schedule.

Week numbers are reference work slots. Week 1 starts when the maintainer resumes this work. A combined pace of 10 project hours per week would take about 33 working weeks. A pace of 15 would take about 22. Calendar time depends on the actual split of work, dependencies, two weeks of planning self-use and outside waits. The roadmap's broader first-version range of 215-364 hours remains the uncertainty range.

| Use of a reference week | Planned hours | What counts |
|---|---:|---|
| Learn and implement the small core steps | 5 | Short explanation, learner-written code, a prediction and an independent variation |
| Integrate and review supporting work | 2 | Review repeated wiring, presentation and translations; trace the combined result |
| Verify the outcome | 2 | One learner-written assertion plus relevant automated and phone checks |
| Record evidence and prepare the next step | 1 | Actual hours, result, unresolved checks, meaningful diff and next dependency |
| Reserve | 3 | Debugging, repeated practice, device trouble or missed acceptance; not extra feature scope |

The table is a project reference allocation. Log time spent on learner work and assistant-supported work separately. Unattended tool time is separate from hands-on practice. Carry work forward when a dependency or check needs more time.

## Short study week

Try this for the next two weeks of work. Use one current [working path](CURRICULUM.md#study-through-real-features) and one new idea at a time. Treat the ranges as planning aids.

| Learner time | Work |
|---|---|
| 60-90 minutes | Predict the outcome, then write one complete small function, widget or rule. |
| 60-90 minutes | Try one changed input or failure, diagnose the result and explain how the behavior follows from the code. |
| 30-45 minutes | Trace the part you changed and explain the result. The assistant brings the relevant diff and records the next dependency. |
| Up to 45 minutes when needed | Perform a native check that needs the owner's phone or actual window. |

The full example uses **2.5 to 3.75 hours of regular hands-on time**, plus a native check when needed. Split the blocks into short sessions. With only 20 minutes, open the current checkpoint, predict one outcome and do the smallest pending check or core edit. Leave a partly understood case open for next time. When one change already demonstrates a familiar skill, the assistant can carry that pattern through the other controls.

The assistant prepares the next example and its expected behavior, handles test setup, repeated wiring and checks, and leaves one short review summary. The learner explains or changes the representative code and makes the important decisions. After two study weeks and again after the first confirmed save and recovery, compare the actual hands-on time and learning evidence. Recover the time spent on repeated setup first. The 325-hour scenario remains a delivery estimate until the project has measured evidence for a revision.

## Ownership and dependency rules

The learner implements the first representative data rule, state transition, callback, widget, layout and lifecycle decision. This includes failed saves, session isolation, draft ownership and native interruption decisions. The assistant may explain one small concept, prepare fixtures and setup, review the attempt, then complete repeated wiring, translations, visual polish, regressions, documentation and build preparation within that reviewed pattern.

A new rule or state owner remains learner-owned even inside a helper or repeated component. Do not turn practice into missing words in an assistant-written solution. Each lesson needs a small complete implementation, an explanation and a useful variation. Passing assistant-written tests alone is not independent mastery. This schedule does not authorize implementing future weeks early.

Advance only when the listed dependency and acceptance hold. A row may contain several small lessons; teach them one at a time. If understanding or recovery fails, use reserve and carry the row into the next calendar week. Independent documentation can proceed while a phone or store action waits, but dependent feature work cannot be marked accepted. Use fictional records until the safe-data gate below passes.

Stages retain their roadmap meanings: A is safe tasks; B is plans and views; C is corrections and recovery; D is Android planning acceptance; H is bounded focus; F is public delivery. D hours accompany shared work and do not represent a second implementation. Focus lessons after 44 remain unnumbered until prepared.

## Weeks 1-7: safe tasks and the first usable slice

Each row budgets 10 base hours plus 3 reserve hours. Stage splits allocate those base hours only.

| Week and base allocation | Goal and dependency | Learner implements or confirms | Assistant can help with | Observable acceptance |
|---|---|---|---|---|
| 01: A 7 + D 3 | Learn cleanup after an awaited operation. Builds on the confirmed Windows clipboard check. | Write the small finally exercise and explain both paths. Operate the phone for the fictional launch check. | Provide the exercise driver and verify the caller. Help with the existing debug install and record the phone result. | Cleanup runs once after each outcome and the caller reports the correct result. Record the phone launch outcome and device. |
| 02: A 8 + D 2 | Make pending and late results understandable. Depends on week 01's async explanation. Lessons 19-21. | Write a failure assertion, pending/success/error transitions and the first lifetime guard in a fictional operation. Explain its State/controller owner. | Supply a controllable fake, broader duplicate/late-result cases and repeated feedback wiring. | Repeated taps do not start duplicate work; a late result cannot update a disposed owner. No fake operation is labelled real saving. |
| 03: A 10 | Introduce durable task identity and the saving choice. Depends on week 02. Lessons 22-24. | Map one task, define a bounded SQL table/query, and decide whether a saved workspace may be opened. | Set up only the now-needed storage adapter, generated bindings and fixtures under the learner's contract. | A task ID survives a controlled round trip. Temporary startup does not open an existing private database. The learner explains the stored fields. |
| 04: A 8 + D 2 | Save and reload one task. Depends on week 03. Lessons 25-26. | Write the first confirmed-write caller and loading states; distinguish empty data from failed loading. | Extend reviewed mappings and error fixtures; prepare phone restart and write-failure checks. | A confirmed added task survives phone restart. Failed writing retains input and old data; failed loading is not shown as an empty list. |
| 05: A 7 + D 3 | Make existing mutations recoverable. Depends on week 04. Lessons 27-28. | Define a transaction/rollback boundary and a small migration. Apply the save contract to completion, deletion and supported undo one action at a time. | Add repeated operations after review, older-schema fixtures and broader regressions. | Each supported mutation has truthful pending/failure feedback. A migration failure retains the older fixture; IDs and latest-only undo remain coherent. |
| 06: A 5 + D 5 | Export, preview restore and clear safely. Depends on week 05. Lessons 29-31. | Write the bounded backup validation, confirmed replacement and clear/mode-change decisions. | Build file-picker support, repeated serialization and invalid/cancelled-file cases within those decisions. | On the phone, a valid backup round-trips; invalid, cancelled or failed restore preserves old records. Temporary mode creates no private recovery copy. |
| 07: A 5 + D 5 | Edit a task and express its deadline. Depends on weeks 04-06. Lessons 32-33. | Build the first real draft editor, validation and return flow. Distinguish no deadline, date-only and exact deadlines. | Apply the reviewed form pattern, optional notes, translations and keyboard/Back regressions. | Save/Cancel/changed-form Back work with the keyboard. Extend backup and migration checks for new fields. Confirm the safe-task gate before using private tasks. |

**Safe-task gate:** all included task actions, local/temporary isolation, failed writes, native restart, backup/restore and clear pass on the phone. The learner can explain one input-to-save-to-feedback path. A limited private task trial may begin. Calendar and focus controls remain absent until implemented. Earlier pending checks in LEARNING stay open unless actually completed; any that affect this slice must be resolved before its acceptance.

## Weeks 8-17: plans, Today, Week and recovery

Each row still budgets 10 base hours plus 3 reserve hours. Add device checks as the behavior becomes available, rather than waiting for week 17 to discover basic phone problems.

| Week and base allocation | Goal and dependency | Learner implements or confirms | Assistant can help with | Observable acceptance |
|---|---|---|---|---|
| 08: B 8 + D 2 | Create a direct personal plan. Depends on the safe-task gate. Lessons 34-35. | Define the interval/timezone model and first start/end editor with an explicit all-day choice. | Repeat validated fields, optional location/notes and persistence mappings; extend backup fixtures. | A valid plan survives restart. Invalid intervals retain input. Overnight and date-only cases are explained without changing a task deadline. |
| 09: B 8 + D 2 | Derive stable lists and detect overlaps. Depends on week 08. Lessons 36-37. | Write one sorted/grouped projection and the overlap rule, including touching boundaries. | Add nested, duplicate and cross-day fixtures; repeat row presentation. | Equal boundaries do not create a false overlap. Overlapping plans remain separately readable and openable. Sorting preserves record identity. |
| 10: B 8 + D 2 | Find recorded gaps. Depends on week 09. Lesson 38. | Merge occupied intervals and derive gaps. Connect the first gap action to an unsaved plan draft. | Expand edge cases, gap labels and repeated entry points. | Overlaps do not produce false gaps. The draft uses the displayed date and interval; nothing is saved until confirmation. |
| 11: B 8 + D 2 | Make Today useful. Depends on weeks 07-10. Lesson 39. | Derive daily groups/current-next plans from confirmed data and an explicit clock; own boundary refresh and disposal decisions. Build the first summary-to-task interaction. | Supply fake-clock tests, repeated sections, existing artwork and translation wiring. | Exact deadlines, midnight and foreground return update groups once. Counts match rows; time/location are readable; future deadlines are not counted as due today. |
| 12: B 8 + D 2 | Plan from the selected day in Week. Depends on weeks 08-11. Lesson 40. | Own selected-day state, navigation return and the first task-to-plan draft interaction. | Apply repeated day controls, task-tray wiring and responsive styling after review. | Today keeps the current date while Week keeps its selected date. Moving a separate work plan leaves its source task deadline and completion unchanged. |
| 13: B 10 | Generate bounded weekly repeats. Depends on week 12. Lesson 41, first part. | Model repeat bounds and occurrence identity; generate a stated date range. | Prepare fixture sets and repeated controls from the reviewed rule. | Expansion has a defined end and stable identities. Unsupported rules are rejected visibly; no unbounded generation or guessed dates. |
| 14: B 10 | Integrate repeat rules into real views. Depends on week 13. Consolidate lesson 41. | Explain date-boundary behavior and adapt one repeat case independently; own any newly exposed refresh rule. | Extend persistence/export and Today/Week regression coverage; finish repeated recurrence presentation. | Restart and backup preserve repeats. Today and Week show the same effective occurrences, including range boundaries and timezone cases. |
| 15: C 10 | Correct one occurrence. Depends on week 14. Lesson 42. | Preserve identity while changing time/room, cancelling and restoring one occurrence; explain edit scope. | Repeat scope labels and build combinations of moved/cancelled/restored fixtures. | A moved occurrence appears once. Cancellation frees its interval; restore returns the prior effective values. Other occurrences are unchanged. |
| 16: C 10 | Recover the complete planning workspace. Depends on week 15. | Extend backup validation and atomic replacement to plans, repeats and corrections; own version and session-boundary decisions. | Add compatible/invalid backup fixtures, file actions and broader recovery regressions. | Tasks, deadlines, plans and corrections survive a valid restore. Wrong-version, failed and cancelled replacement preserve the confirmed workspace. |
| 17: C 5 + D 5 | Accept the phone planning flow. Depends on weeks 07-16. Lesson 43. | Diagnose and fix one real layout/focus/lifecycle defect; perform phone Back, keyboard, text and accessibility checks. | Run broader checks, repeat accepted layout patterns, prepare a build and summarize remaining defects. | The full fictional planning routine passes on the phone, including offline restart and recovery, three languages and large text. No known data-loss or blocked-core-action defect remains. |

**Planning-use gate:** the implemented A-C data rules and D safety checks pass before the complete personal planning trial starts. Week 17 does not complete C's observation/fix work or certify a public release. If the gate fails, use reserve and delay weeks 18-19; do not use real records to discover an unresolved recovery failure.

## Weeks 18-19: two full weeks of planning self-use

These must be two calendar weeks after the planning-use gate. Their work slots each contain 10 base hours plus 3 reserve hours. Ordinary use can happen throughout the day; troubleshooting, review and fixes consume the budget below. F work here is independent help preparation, not store submission or an early release gate.

| Week and base allocation | Goal and dependency | Learner implements or confirms | Assistant can help with | Observable acceptance |
|---|---|---|---|---|
| 18: C 5 + F 5 | Use the planner in ordinary life and draft help. Depends on week 17's gate. Begin lesson 44. | Keep a private friction log; explain one real failure and make a small independent correction. | Reproduce issues with fictional fixtures; draft storage/backup help, known limits and a support checklist. | Record actual days used, wrong dates, blocked actions and recovery attempts. No claim of external validation. Any data-safety failure stops private use until repaired and retested. |
| 19: C 5 + F 5 | Complete the planning review. Depends on week 18 and the second observation week. Finish lesson 44 only with its evidence. | Demonstrate one independent variation, trace the whole flow and review unresolved issues. | Complete agreed regressions and review the first help/privacy/support drafts for accuracy. | Two calendar weeks of use and a defect log exist; blocking issues are fixed and retested. The planning gate is accepted, while external demand remains unknown. |

If meaningful use is interrupted by a blocking defect, extend the observation period and record why. The trial is not passed by leaving the app installed for 14 days. Public testing requirements remain separate and must be checked when the actual release is prepared.

## Weeks 20-25: bounded focus and public delivery

Use 10 base hours plus 3 reserve hours per row. These weeks follow planning acceptance. Prepare focus lessons one small concept at a time; do not invent completed lesson numbers beyond 44.

| Week and base allocation | Goal and dependency | Learner implements or confirms | Assistant can help with | Observable acceptance |
|---|---|---|---|---|
| 20: H 10 | Start focus from an existing task. Depends on the week 19 planning gate. | Define the timer states and first task-selection/start interaction; explain who owns the running session. | Supply a controllable clock and repeated presentation after the state contract is reviewed. | One countdown starts without retyping the task title. Starting it does not reserve calendar time, change a deadline or complete the task. |
| 21: H 10 | Pause, resume, end and take a manual break. Depends on week 20. | Implement each transition and elapsed-time decision; write a duplicate-end or clock-change case. | Add controls, duration presentation and broader transition tests using the accepted rules. | Each end is recorded at most once. Breaks and further intervals start only by choice; pausing or changing wall-clock time does not invent focus time. |
| 22: H 10 | Save honest local session records. Depends on week 21 and the existing saving contract. | Define confirmed/unsaved/interrupted outcomes and session identity; retain recoverable input after failure. | Repeat storage mappings, history rows and backup version fixtures. | A retry cannot duplicate a session. Temporary mode writes no record to disk. Recorded timer time stays distinct from planned time and verified attention. |
| 23: H 10 | Handle Android interruptions and recovery. Depends on week 22. | Decide and implement the first lock/background/process-death recovery cases; explain unknown time. | Set up repeatable native scenarios and extend session export/restore/clear checks. | Lock, app switching, process termination, restart and failed recording have stated, tested outcomes. No unsupported closed-app alarm or elapsed-time claim. |
| 24: H 5 + F 5 | Use the complete focus flow and prepare a candidate package. Depends on week 23. | Use start/pause/end/manual break in a real routine, review the result and fix one remaining core issue. Control signing secrets and release choices personally. | Prepare packaging/check commands, factual screenshots/help and focus regressions; review first-release scope. | H acceptance passes; a candidate installs and preserves planning/session data. Missing store/account actions are listed explicitly, not treated as completed. |
| 25: F 10 | Verify distribution and the support handoff. Depends on H acceptance, week 24 and independent help work in weeks 18-19. | Demonstrate install/update/restore and review privacy, support and actual distribution requirements. Complete identity, agreements and payments only through their separate authorized steps. | Run release checks, review the staged diff and prepare release notes, support instructions and submission material. | The release checklist names the tested build/device, upgrade result and remaining external gates. Publish only after applicable testing, signing and store approval; otherwise mark the candidate ready but release blocked. |

Store enrollment, tester recruitment, privacy-page hosting and review can create external waits. They are not performed by this documentation task. If the maintainer later selects public release preparation, track those dependencies early enough to avoid hiding them until week 25. While waiting, complete authorized help and candidate checks. Do not fill waiting time by adding ads, sync, widgets or other later scope.

## Hour ledger and milestones

| Roadmap stage | Weeks receiving base hours | Base allocation | Existing base range |
|---|---|---:|---:|
| A | 01-07 | 50 | 35-55 |
| B | 08-14 | 60 | 40-65 |
| C | 15-19 | 35 | 25-40 |
| D | 01-02, 04-12, 17 | 35 | 20-40 |
| H | 20-24 | 45 | 30-50 |
| F | 18-19, 24-25 | 25 | 15-30 |
| Total | 25 work slots | 250 | 165-280 |

The 75 reserve hours belong to the weekly schedule, not a seventh feature stage. Reassign unused reserve to an unresolved acceptance check or retain it as unused capacity. Log which stage consumes it. Native checks and assistant support are included once in these allocations.

The safe-task gate is near reference week 07. Complete planning trial acceptance is near week 19; focus acceptance near week 24; public release readiness near week 25, subject to external gates. These are conditional milestones, not promised dates. Weeks 18-19 contain 10 hours of early F preparation, so do not mistake the whole elapsed schedule before H for planning-only effort.

## Weekly review and rescheduling

Keep each weekly record short: actual hours; the learner's complete small exercise and explanation; assistant support; checks run with build/device; checks still pending; defects; next dependency. Use LEARNING for current evidence and keep raw personal schedules and friction notes outside the repository. A future weekly record is not prefilled as passed.

At least every 20 working hours, compare the remaining estimate with the demonstrated result. If the same topic needs more practice, split it into smaller exercises and shift dependent weeks. Do not replace missing understanding with assistant-written core code or remove recovery checks to preserve the date. If a feature is reconsidered, change PRODUCT and ROADMAP explicitly rather than silently dropping it from the weekly table.

Use the relevant checks in [SETUP.md](SETUP.md#validate) and [tools/README.md](../tools/README.md). Documentation checks validate these plans and links only. Flutter checks, phone behavior, independent understanding, self-use, distribution approval and market demand remain separate evidence.
