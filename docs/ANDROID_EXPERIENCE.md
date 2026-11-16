# Android daily-use design

Updated: 2026-11-16. This is a design specification and review brief. It adds no application behavior. Saving and the complete planning flow remain unimplemented; [LEARNING.md](LEARNING.md) owns current evidence. [PRODUCT.md](PRODUCT.md) owns scope, [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) owns control behavior, and [ROADMAP.md](ROADMAP.md) owns delivery gates.

The [static design board](../assets/ui/android-daily-flow.png) shows Today, Tasks and Week with the same fictional records. Its [SVG](../assets/ui/android-daily-flow.svg) is editable. It is not a screenshot from an Android build or material ready for a store listing. The earlier [interactive planner study](../assets/ui/PLANNER_STUDY.md) retains its own fixture and limits.

## The reason to try Cadence

Test this benefit: **Record what needs doing, reserve time before it is due, and see the next commitment clearly.** Keep the first useful routine short and dependable. A distinctive visual style should help people read and correct their plans.

The first user is the maintainer. The first external audience to investigate is Android users with personal deadlines and appointments who accept manual entry and value use without an account or network. They may be studying, working or managing home tasks. This is an audience hypothesis, not proven demand. People who need team assignment, automatic calendar updates, reminders or device sync may not find the first edition useful.

| Quality to improve | Concrete design choice | Evidence needed |
|---|---|---|
| Trust | Confirm writes, retain failed drafts, explain temporary use and provide recovery | Real phone restart, failed-write and backup checks |
| Fast capture | Require only a task title; reveal deadline and notes when useful | Timed capture using a real build, including errors |
| Useful daily return | Put the next commitment, time and place before secondary content | Correct lookup and voluntary return use |
| Clear planning | Separate a task deadline from a reserved interval | The person can change a plan without expecting the deadline to move |
| Calm presentation | White canvas, wine selection, readable lists and modest state artwork | Long titles, large text, contrast and native screen-reader review |

Offline access and a quiet appearance are useful properties to test. Neither alone proves a reason to switch from an existing planner. Ask what specific routine became easier and what still required another tool. Follow the [existing competitor reference mapping](COMPETITIVE_REVIEW.md#three-view-reference-mapping); no competitor-wide feature parity is claimed.

## One consistent design fixture

Use Thursday, 12 November 2026 at 09:30 in Asia/Tokyo. All three panels show the same confirmed snapshot after a work plan was created. This extends the [written walkthrough](REDESIGN.md#three-view-planning-walkthrough) with one due-today task for visual review. Do not insert these records into the learning app.

| Record | Value and meaning |
|---|---|
| Design review | A plan on Thursday, 10:00-11:00, Meeting room B |
| Submit expense claim | An incomplete task due Thursday at 18:00; no work interval |
| Send the report | An incomplete task due Friday at 17:00 |
| Send the report work plan | A separate Thursday plan, 13:00-14:00; no automatic task link |
| Choose a weekend book | An incomplete task with no deadline |
| Task totals | Three open, zero completed; one due today, one later, one undated, zero overdue |

The displayed 11:00-13:00 interval means no plan is recorded there. It is not verified availability. The Week tray excerpt shows the report task after a same-title plan exists. Its three-open count includes the other two tasks, which remain reachable in the full tray. The baseline does not infer a scheduled status from matching titles.

The board is a 1360 x 1440 composition with three 390 x 824 reference frames. These dimensions describe the drawing, not fixed application heights. English text is review copy. Existing Japanese and Chinese samples stay intact; final native controls need all three languages and system fonts.

## Screen decisions to review

### Today: answer the next useful question

Keep the next commitment's title, interval and location together. The daily agenda shows the same plan again in chronological context; the summary is not a second record. Place due-today tasks in a distinct section. Future deadlines stay in Tasks, while overdue and undated work remain reachable under their own labels.

Keep New task reachable above navigation. It opens a title-only draft with no inferred deadline. Opening a commitment leads to its details; opening a task leads to its editor. Neither action silently starts focus or marks work complete.

When there is nothing due today, say exactly that inside the due-today section. Keep actual plans, overdue tasks and undated work available. Do not replace the whole page with an all-done celebration. When no next commitment exists, explain that state without inventing an appointment or implying the user is free.

### Tasks: capture first, enrich when needed

Keep Open and Completed separate. In Open, retain the existing Overdue, Due today, Later and No date groups. Do not add required projects, priorities or categories. A date-only deadline remains a date; it must not acquire an invented midnight time.

Each task needs separate completion, title/details and actions targets. The board draws small symbols, but each real target must have enough space. A long title wraps and increases the row height. The actions menu can expose Delete and Create work plan without requiring swipe or hover. Existing latest-delete undo remains available.

After capture, identify the result and retain the originating page. Do not give an undated task a Today deadline to make it appear in the daily list. Any newly entered task must be discoverable in Tasks. Keep a failed draft and the last confirmed list distinct.

### Week: make the chosen date unmistakable

Keep the week range, reachable date choices and a full selected-date heading. Today and selected date need separate cues. The board selects Thursday, which is also today; a review variant must select Friday to test the distinction.

Use a vertical selected-day agenda on the phone. Put the actual interval beside each title and keep both entries visible during an overlap. A labelled gap can open a draft with that interval for review. It must not create a plan until the user confirms it. Keep all-day entries separate from timed rows when present.

Keep the task tray reachable without hiding the selected date. It shows real task deadlines, including future ones. Creating a work plan may copy a task title into a separate draft. A second invocation is not evidence that a new plan is needed: the user reviews the date and existing agenda. Moving, deleting or completing one record never silently changes the other kind of record.

## First use, interruption and return

Offer Save on this device and Temporary use with a short explanation before opening private saved records. Use the existing compact illustrations once at this choice. Avoid a mandatory tour, school setup or account screen. Explain that local saving is not a separate backup and temporary records do not survive closing.

Use contextual guidance when a person first needs it. A task form can explain that only a title is required. A work-plan form can explain its independent interval. These are inline explanations, not new wizard steps or notification requests.

| State | Wording to review | Required action and visual limit |
|---|---|---|
| Local write confirmed | Saved on this device | Show only after confirmation; a phone symbol alone does not mean saved |
| Temporary edit accepted | Kept for this session | Keep the loss-on-close explanation available |
| Changed editor | Changes not saved | Follow the existing Save, Discard and Cancel contract; no automatic draft recovery promise |
| Write failed | Changes could not be saved | Keep input and old records; offer retry without duplicate submission |
| Records could not load | Saved records could not be opened | Preserve the old store and offer recovery; never draw an empty workspace |
| No tasks due on the date | No tasks due today | Keep other task groups and actual commitments |
| Gap in the selected agenda | No plan recorded | Show interval and duration; no guaranteed free-time claim |

These labels describe different states; they do not introduce a new save contract. [EDITING.md](EDITING.md) remains the owner of draft and failure rules. Returning from an editor keeps its origin, selected date and browsing context. Today still follows the current date when Week is browsing another day.

Artwork stays secondary. Omit it when the keyboard, large text or a short screen needs the space. No new sound, animation, streak, score or forced daily review accompanies these states. The first self-use build remains ad-free. Focus begins only in the existing later H stage; media integration stays deferred.

## Support and discovery preparation

Before a public release, provide a short storage and recovery guide, version information, known limits and a contact route. A person should be able to describe a failure without sharing private task titles or a full backup. Ask for the build, Android version, steps and expected result first. Let users remove sensitive content from any optional attachment. Do not promise a response time before the maintainer has tested the support workload.

Once a real build passes the required checks, use its actual screens to explain three benefits: quick capture, the next commitment and reserving work time. Keep screenshots consistent with that distributed version and disclose missing reminders, search, widgets and sync. The static board in this pass must not stand in for those screenshots. Hosting, account creation, advertising and publishing are not authorized by this design work.

Google Play uses relevance and app quality in discovery. Its [ranking guidance](https://support.google.com/googleplay/android-developer/answer/9958766?hl=en), checked on 2026-11-16, supports clear listing content and dependable behavior. For Cadence, treat store exposure as uncertain and plan development with zero income. A listing or paid test does not prove demand.

## Review and delivery mapping

The changes refine existing A-D work and F preparation. They add no new feature stage or hours to the [weekly plan](WEEKLY_PLAN.md). If review reveals extra implementation work, record the estimate before selecting it. The learner owns core state, date and failure rules and first representative Flutter layouts. The assistant may prepare artwork, documentation, repeated support work and relevant checks around those lessons.

| Review case | What must be clear | Existing delivery area |
|---|---|---|
| Normal morning | Correct next title, time and location; due-today count is one | B and D |
| Capture from Today | Only a title is required; no deadline is inferred; task can be found | A-B and D |
| Select Friday in Week | Friday is selected; Thursday is today; Today itself does not change | B and D |
| Move work to 13:30-14:30 | Friday's report deadline stays at 17:00 | B and D |
| Fail that move from the original 13:00-14:00 plan | Draft keeps the new interval; confirmed agenda keeps the original | A-C and D |
| No due tasks, but other records exist | Scope of the empty message is understood; remaining work stays visible | B and D |
| Restart or restore | No false saved state, silent loss or duplicate records | A, C and D |
| Large text, long translation and open keyboard | Labels, validation and actions remain usable without clipped content | D |
| Public demonstration | Only implemented and tested capabilities are represented | F |

Use the existing [workflow benchmark](VALIDATION.md#android-workflow-benchmark): proposed title capture within ten seconds, next-commitment lookup within five seconds, and four of five external participants completing the routine without help when such participants are available. These are internal targets, not observed results or market benchmarks. Static drawings cannot pass timing, saving, Back, TalkBack or retention checks.

Keep the two-week self-use record separate from external demand. For external follow-up, record invitations, replies, voluntary return use, useful routines and reasons for stopping. Feedback compensation does not establish continued demand. No mandatory analytics service is needed for these early observations.

Use [Android accessibility guidance](https://developer.android.com/guide/topics/ui/accessibility/apps), checked on 2026-11-16, when implementing touch targets and meaningful control names. The existing 48 x 48 logical-pixel target and large-text goals still need native verification. Android's example code does not change Cadence's Flutter stack.

## Prepared artwork and evidence

The [Android artwork handoff](../assets/ANDROID_ARTWORK.md) describes the three new language-neutral compact states. The [catalogue](../assets/catalog.html) includes those sources and the static board's SVG and PNG. Regenerate them through [the artwork guide](../assets/README.md#regeneration).

The [asset review record](../assets/README.md#android-daily-use-design-review-on-2026-11-16) distinguishes visual inspection, source checks, browser results and the download-check limitation. This pass does not complete a learner lesson, add a Flutter asset bundle, validate a phone or demonstrate that another person wants the product.
