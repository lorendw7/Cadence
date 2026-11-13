# Learning Cadence

This log owns current learning progress, implementation evidence and pending acceptance. The [core learning plan](CURRICULUM.md) owns teaching order and mastery checks. [PRODUCT.md](PRODUCT.md) and [ROADMAP.md](ROADMAP.md) own scope and delivery under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md).

Updated: 2026-11-13 after the learner confirmed actual-window copy feedback. Lessons 1–10 are implemented and accepted. Lessons 11–14 are implemented, with their remaining actual-window checks listed below. Lesson 15's remaining actual-window checks are deferred at the learner's request; they are not accepted. Lesson 16's code cleanup and concept review are complete. Counter removal and application color alignment were explicitly delegated. Lesson 17 now includes a clipboard caller, corrected action-row layout and guarded visible feedback. Saving is not implemented. The temporary text-scale override is absent. The current run passes all 39 tests. The leftover debug print has been removed. The Windows debug build also passes with the clipboard change. The app reads and validates titles, adds tasks, toggles completion, shows an empty list, deletes tasks, and undoes the latest deletion once. Data stays in memory.

The learner confirmed the empty-list, addition, completion and actual-window deletion/undo flows. Manual title-validation, lesson 11–12 theme and keyboard confirmation, and lesson 13 responsive and keyboard confirmation are still pending. Windows debug builds pass after symbolic-link support was enabled.

## Current learning checkpoint

**Current lesson: 17, native paste confirmation pending.** The learner implemented visible copy feedback with a context.mounted guard after await and correctly explained why the guard follows the wait. The learner also confirmed seeing feedback after copying in the actual window. The last run passed all 39 tests, including success, failure and late completion. The assistant removed the remaining debug print. Pasting the copied title into another application remains unconfirmed. The revised [numbered plan](CURRICULUM.md#numbered-lesson-plan) provisionally runs through lesson 44. Lessons 18-44 have not started.

The [lesson 17 exercise](lessons/17-await-errors.md) has an assistant-provided fake operation and driver. The learner wrote showTitle's await/catch body. Starting and Finished messages from the original exercise are still missing. The real-code variation now includes the learner's clipboard operation, button, layout, callback and visible feedback. The lifecycle explanation is confirmed. Persistence remains unimplemented.

| Lesson range | Recorded status |
|---|---|
| 1-10 | Implemented and recorded as accepted; lesson 9's manual title-validation confirmation remains listed as pending |
| 11-14 | Implemented; remaining actual-window checks are open |
| 15 | Layout work exists; remaining actual-window checks were deferred, not accepted |
| 16 | Code cleanup and concept review complete; this did not close earlier native checks |
| 17 | Clipboard caller, layout and feedback pass automated checks; lifecycle explanation and actual-window feedback confirmed; native paste pending |
| 18-44 | Planned topics, not started |

| Ability | Recorded evidence | Next evidence to seek |
|---|---|---|
| Models and task rules | Accepted model, immutable-update and in-memory task lessons | A short variation that preserves identity and handles invalid input |
| State ownership and lifetime | Correct explanations of controller lifetime, parent-owned task data and mutation of a final list | Apply the same reasoning to draft and confirmed data |
| Async reasoning | Correct Future-order prediction; learner-written await/catch handles both console outcomes and clipboard results; post-await guard explained | Explain a failure path and apply cleanup in the next small lesson |
| Debugging and tests | Application regressions exist; some repairs and tests were assistant-assisted | Learner explains one failure, chooses an edge case and writes a small assertion |
| Native usability | Some actual-window flows confirmed; the checks listed above and below remain open | Complete each deferred check when resumed; do not infer a pass from automated tests |

Next: paste the copied title into another application and compare it with the selected task title. Actual-window feedback is confirmed. The learner correctly explained that a context valid before await can become invalid while waiting. The guard checks the lifetime of the builder's list context, not membership of a task in the data. Finally and broader lifecycle teaching remain later steps.

Record understanding, independent practice, automated checks and actual-window checks separately. A missing independent exercise is a learning gap, not a reason to erase an accepted feature. Use the [lesson method and evidence rules](CURRICULUM.md) for future entries.

## Recorded UI work

The following entries preserve earlier results and then-current next steps. They do not override the current checkpoint above.

In lesson 14, the learner renamed TodayPage and its State to TasksPage, changed the heading to Tasks, and moved the task surface into a local taskContent variable. A Row now gives the task surface the remaining width. A 160-pixel sidebar appears at widths of at least 640 logical pixels. It has a workspace label and a selected ListTile for Tasks. This marks the current page; there is no page-switching action. Task data, input and undo still belong to the same State. Tests distinguish the page heading from the sidebar label and task rows from navigation rows. All 28 tests pass, including checks of the selected marker and resizing across 640 and 639 pixels while preserving tasks, draft input and pending undo. The Windows debug build passes. Actual-window appearance, resizing and keyboard confirmation remain pending. Lesson 15 will address wider text, narrow windows and focus.

Lesson 15's first step is implemented: the counter and undo buttons use Wrap with 8-pixel horizontal and row gaps. A regression checks a single row at 800 x 700 and wrapping at 200 x 700, then exercises increment, reset and pending undo after resizing. All 29 tests pass. This is a targeted layout check, not a supported minimum-window claim. No new native build or actual-window check was run for this step. Short windows, 200% text scaling and keyboard focus still need checks.

A separate temporary probe at 350 x 280 found a 30-pixel bottom overflow. The learner began the scrolling exercise and requested direct repair. The assistant moved taskContent out of the input builder into the page build method, kept taskHeader limited to the form, and replaced the inner Expanded and ListView with a CustomScrollView, SliverToBoxAdapter, SliverList and empty-state SliverFillRemaining. Task callbacks remain intact. The header and tasks now scroll together. Tests target the outer page scroll area separately from the input's own scroll area. A new active regression covers the previously failing size, reachable form and task controls, retained draft input, the empty state, undo and addition. All 30 tests and the Windows debug build pass. Actual-window confirmation, 200% text scaling and keyboard checks remain pending.

A temporary 200% text-scale probe checked the initial layout at 800 x 600, 400 x 320 and 350 x 280. It verified that the input subtree received doubled text scaling and found no reported layout exceptions at those sizes. The probe was removed and is not part of the 30 active tests. It did not confirm real-font clipping, keyboard access or all task interactions. The learner added the temporary text-scale override in the MaterialApp builder and reported clipped button text. The learner then set height to zero and added explicit padding on the increment, undo and add Shad buttons. The learner confirmed that button text now appears complete. Code review confirmed the three edits and unchanged callbacks. Formatting and analysis pass. The full test run passes 25 tests and fails five: small-window deletion, list visibility, short-window scrolling, title validation and undo. Logs include missing widgets and missed taps with the forced text scale. The next exercise removes the temporary override and checks the normal system setting before drawing a conclusion about remaining failures. Full large-text task interactions and keyboard checks remain pending.

On the request to restore system text scaling, inspection found that the current file already used ShadAppBuilder directly and contained no text-scale override. The three content-sized buttons remain. The file also contains newer theme and layout changes. This check did not change application code. Formatting and analysis pass, but the full suite still fails small-window deletion, short-window scrolling and small-window undo tests. The earlier failures cannot all be attributed to forced text scaling. These remaining failures need investigation against the current layout. The learning record was updated; keyboard checks remain pending.

The follow-up review found fixes already present in the three failing test files. The current layout places counter and undo actions below the list. The old tests could tap controls outside the viewport or search downward for task rows above it. The revised tests return to the top before searching, scroll the target into view and check that it can receive a pointer hit. They retain the original task, validation and undo assertions. All three failures are resolved. Four additional tests cover system text scaling at 200% across three window sizes and a short-window task flow with retained draft input. These checks inspect layout bounds and interactions; they do not replace real-font visual inspection. All 34 tests, formatting, analysis, the Windows debug build, and repository, website and artwork checks pass. Linux and macOS builds were not run in this Windows session. The next small lesson is keyboard focus: use Tab and Shift+Tab to move focus, then activate task controls with the keyboard. Actual-window focus visibility and traversal remain pending.

## Who does what

The learner knows other languages but is new to Dart and Flutter. Explain syntax and framework concepts before asking for code. Do not assume knowledge of named parameters, constructor shortcuts, widgets, lifecycles, or callbacks.

The learner writes learning-critical core code in lib/main.dart and the modules used by each lesson. This includes the first representative Dart function and Flutter interaction, layout or lifecycle decision. The assistant completes the active lesson's agreed supporting work: repeated wiring, similar components, visual details, test setup and broader checks, as well as documents, artwork and repository maintenance. The [division of work](CURRICULUM.md#division-of-work) is standing delegation for that support; it does not authorize future core features.

Each lesson begins with one goal, the learner's small function or widget, the assistant's support boundary and one observable check. Explain the concept, predict behavior, let the learner write code, inspect results and explain the correction. The assistant supplies useful tests while the learner gradually chooses cases and writes small assertions. Do not weaken tests to accept incorrect behavior. Follow the [core learning plan](CURRICULUM.md) for independent variations and review.

All repository documentation uses plain English. Product translations remain Japanese, English, and Chinese. Follow [the project workflow](PROJECT_WORKFLOW.md).

## Learn tools when needed

The current tools are Dart, Flutter, setState, shadcn_ui and flutter_test. Learn the underlying rule before the convenience API: state ownership before a state library, SQL and transactions before drift helpers, and a test's expected behavior before its matcher syntax.

SQLite/drift belongs to the upcoming persistence stage. Riverpod remains conditional on real state-sharing difficulty. Neither is installed as part of a teaching-plan update. Notifications, charts and backend tools are not parallel learning tracks.

[SETUP.md](SETUP.md) and [pubspec.yaml](../pubspec.yaml) own the checkout's tool and dependency details. [DART_GUIDE.md](DART_GUIDE.md) provides short syntax reminders. The [curriculum](CURRICULUM.md) links official references at their point of use. Read the version needed for a lesson; adding a package is not a learning result.

## Current delivery priority

Continue lesson 17, then build reliable local saving and recovery through learner-owned steps. The [roadmap](ROADMAP.md) keeps the useful Windows planner first and Android validation next. Core planning remains local and free; import, school connections, cloud sync and ads stay deferred. The teaching revision does not change product scope, implement a feature or close pending checks.

## Learning order

Use the [working sequence](CURRICULUM.md#working-sequence): async reasoning, reliable stored data, time models and algorithms, useful code boundaries, then complete native delivery. These are stages, not single lessons. Debugging, tests, Git, documentation reading, accessibility and privacy apply throughout.

Review existing models and state through short variations rather than repeating completed lessons. The [numbered plan](CURRICULUM.md#numbered-lesson-plan) now gives a provisional 44-topic main track. Its endpoint is a learning review, not a release promise or a fixed count of teaching exchanges. Documents, artwork and website work do not count as core lessons.

## Tests and templates

[Historical templates](../lessons/README.md) are not active tests. Do not copy them over current tests or count them twice. Future templates may keep a .txt suffix until their implementation exists.

| Lesson | Active checks |
|---|---|
| 1 | [Task model](../test/domain/coursework/planner_task_test.dart) |
| 2 | [Immutable copy](../test/domain/coursework/planner_task_copy_with_test.dart) |
| 3 and 5 | [List and callbacks](../test/task_list_widget_test.dart), including scrolling at narrow sizes |
| 4 and 16 | The counter is retired. Its [retained test path](../test/practice_counter_widget_test.dart) checks absent practice buttons and usable undo after resizing. |
| 6 | [Task completion](../test/task_toggle_widget_test.dart) |
| 7 and 8 | [Input and addition](../test/task_title_input_widget_test.dart): IDs, clearing, rebuilds, and controller disposal |
| 9 | [Validation](../test/task_title_validation_widget_test.dart) at two sizes |
| 10 | [Deletion](../test/task_delete_widget_test.dart) and [undo](../test/task_undo_delete_widget_test.dart) |
| 11 and 12 | Existing regressions run under both theme layers; task-action and rebuild checks locate the migrated ShadButton |
| 13 | Task-surface regressions use Shad controls; [input checks](../test/task_title_input_widget_test.dart) verify wide, compact and stacked quick-entry layouts while retaining input |
| 14 | [Shell resize check](../test/desktop_shell_widget_test.dart) covers sidebar visibility, the selected Tasks marker and retained tasks, draft input and pending undo across resizing |
| 15, manual checks deferred | [Narrow-window undo](../test/practice_counter_widget_test.dart), [short-window scrolling](../test/task_scroll_widget_test.dart) and [200% text scaling](../test/task_text_scaling_widget_test.dart) cover reachable controls, draft retention, empty state, undo and addition |

Lesson 9 ended with 19 tests. Lesson 10 brought the total to 26. Lesson 13 brought the total to 27 with an explicit resize check. The suite covers deleting the last task, adding again, equal titles, separate delete/toggle callbacks, restoring the original object, position and state, and preserving input while quick entry changes layout. Older notes keep historical test counts.

## Estimates and next step

The older lesson totals remain [historical estimates](CURRICULUM.md#earlier-lessons-and-estimates). The old 80–140 hour estimate covered a smaller scope and no longer applies. Delivery estimates belong in [ROADMAP.md](ROADMAP.md). Review the revised learning rhythm after two weeks and after the first reliable save/recovery exercise. Progress depends on demonstrated understanding and actual checks, not a fixed number of lessons.

On 2026-11-12, the learner asked to skip the remaining lesson 15 checks for now and move to lesson 16. This defers actual-window scrolling, large-text and keyboard acceptance; it does not record a pass. No application code or tests changed for this teaching transition.

The learner then explicitly asked the assistant to remove the counter and adjust the actual application colors. The counter field, count label, increment/reset buttons and unused TextButton theme were removed. Undo remains below the list. The sidebar now uses pure white, selection and secondary hover use the shared wine wash, and inputs and unchecked boxes use the darker neutral boundary. Task callbacks and state ownership are unchanged. Rebuild tests now exercise real task actions and validation instead of the counter. The counter-only test was retired, leaving 33 passing tests. Formatting, fatal-level analysis and the Windows debug build passed. Native appearance and keyboard acceptance remain deferred; macOS and Linux builds were not run.

The learner correctly explained controller lifetime across builds, TaskRow's updates from parent-owned task data, and the difference between changing a final list's contents and reassigning its variable. Lesson 16's concept review is complete. This does not accept the deferred actual-window checks.

In lesson 17, the learner correctly predicted the Future example's output: A and B appear first, then C after the delayed Future completes. The one-second delay is a teaching example, not a saving operation. No application code changed for this step.

Next: continue lesson 17 with errors from a Future and handling them with try/catch around await. No persistence code, storage package or saving indicator has been added. Keep lesson 14's actual-window checks and the remaining checks for [lesson 11](lessons/11-theme.md), [lesson 12](lessons/12-shadcn-foundation.md) and [lesson 13](lessons/13-task-surface.md) open, along with [lesson 9](lessons/09-validation.md)'s title-validation confirmation. Lesson 10's actual-window deletion/undo flow is confirmed.

### Teaching-plan revision on 2026-11-13

The learner asked to focus on the core knowledge that will remain useful in future work. [CURRICULUM.md](CURRICULUM.md) now organizes the course around transferable skills and observable understanding. It retains lesson 17 as the starting point and keeps product delivery separate from learning evidence.

Future reviews will ask for an explanation, a small independent variation and a boundary or failure case. Tests and debugging remain part of each stage. The assistant still provides useful regressions while the learner gradually designs cases and writes assertions. No new lesson was accepted in this revision. No core code, active tests or dependencies changed, and no Flutter tests or native builds were run for it. Historical results and deferred manual checks remain as recorded above.

### Workload delegation on 2026-11-13

The learner asked to retain core coding while the assistant completes other work, with explicit coverage of both Dart and Flutter. The curriculum and repository instructions now reserve the first meaningful implementation and new behavioral decisions for the learner. Repeated current-lesson implementation, integration of understood patterns, visual details, test setup and routine maintenance are delegated to the assistant. This is not a fixed percentage of code or a claim of faster learning.

Each exercise stays a complete small function, widget or behavior change. The learner will still trace a complete action and practise representative layout, lifecycle, testing and debugging work. The assistant will not silently introduce new state or failure rules as wiring. Existing assisted work is not reclassified as independent mastery.

The next lesson remains one failed awaited Future. The assistant will provide the fake operation and runnable setup; the learner will write the calling function and explain its success and catch paths. Finally and an asynchronous test follow separately. No example or application feature was implemented by this planning update. No Flutter tests or native builds were run; all recorded progress and pending checks remain unchanged.

### Numbered-plan revision on 2026-11-13

The learner asked for a revised lesson plan and the current lesson number. The main track is provisionally numbered through 44, retaining lessons 1-16. Lesson 17 remains in progress; lessons 18-44 have not started. This means 28 topics remain unfinished, including the current topic, and does not mean that 16 lessons have all passed native acceptance.

The numbered plan keeps async cleanup, tests, SQL, transactions, migrations, backup, restore and clearing as separate topics. It preserves learner-owned Dart and Flutter practice and delegated supporting work. Each topic can span several small exchanges. No core code, active tests or dependencies changed, no new lesson was accepted, and no Flutter tests or native builds were run for this documentation revision.

### Lesson 17 caller review on 2026-11-13

The learner wrote a complete try/catch around await fakeLoadTitle and requested real application practice. Targeted Dart analysis reported no issues. Running the driver printed Read a book for success and the expected exception text for failure. The original Starting and Finished messages are absent, so the full exercise output contract is not recorded as passed. The learner's function was preserved.

The next bounded exercise is copying one task title through Flutter's built-in Clipboard API. The learner writes copyTaskTitle returning Future<bool>; true follows confirmed completion and false follows a caught failure. The learner then explicitly requested core UI practice, so the first button/callback and feedback also remain learner-owned. The assistant supplies styling and regression support. Copying is not task persistence or backup. No application code, active tests or dependencies changed in this review; no Flutter suite or native build ran.

### Lesson 17 copy-button review on 2026-11-13

The learner added required onCopy to TaskRow, a labelled copy button and a parent callback with a fixed debug message. The callback wiring is correct by inspection. The new trailing Row lacks MainAxisSize.min. A focused widget test reproduced the ListTile assertion that the trailing widget consumes the entire tile width; interaction checks therefore have not passed.

The assistant adapted the existing TaskRow callback test for the new required argument and added checks that copy, delete and completion callbacks stay separate. Targeted analysis of lib and test now reports no issues, and the changed test passes formatting. The focused widget test fails on the layout defect. The Flutter SDK cache needed write access for that run. No full test suite or native build was run, and no real clipboard operation or native paste has been verified. The assistant left application code for the learner to correct and extend.

### Lesson 17 clipboard review on 2026-11-13

The learner added MainAxisSize.min, imported Flutter services, and implemented copyTaskTitle with await and a boolean success/failure result. Returning true after the try/catch is correct because the catch returns false. The application still reports the result only through debugPrint. Its catch also contains print(e), which analysis flags with avoid_print; this remains a learner correction.

The assistant added two widget tests using a delayed mock platform call. They verify the selected title, no early success/failure result, correct completion/failure reporting, and unchanged task objects, draft input and undo availability. An initial test-harness cleanup error was fixed before the final run. All 35 tests pass. Formatting and repository checks pass. Analysis has the one info above, so strict fatal-info analysis is not accepted. No native build, real clipboard paste or SnackBar interaction was verified. Native manual checks from earlier lessons remain open.

### Lesson 17 visible-feedback review on 2026-11-13

The learner implemented SnackBar messages and checks context.mounted after the awaited operation. The assistant preserved that code, removed the leftover print(e), and updated the tests from debug messages to visible feedback. The six clipboard tests cover delayed success/failure, no early notification, preserved task/draft state, and completion after page removal or deletion of one task. The full suite passes all 39 tests. Native paste, real-window appearance and a new Windows build were not checked.

One test assumption and the earlier teaching explanation needed correction: SliverList's builder receives the list element's context, not an individual task row's context. Installed Flutter source passes that element through the delegate to itemBuilder. Removing the page makes this context invalid and feedback is skipped. Deleting one task while the list remains mounted still permits feedback for the captured title's completed copy. This is not a failed guard or a cancellation feature. The tests now distinguish these cases without changing the learner's behavior.

Strict analysis, formatting, repository documentation checks and diff checks also pass. The learner reconfirmed continued open-source development. The existing MIT license is unchanged. Lesson 17 remains in progress until the remaining understanding and native checks are recorded; no later lesson was implemented.

### Lesson 17 concept confirmation on 2026-11-13

The learner correctly explained that the page may close during await, so a context that was valid before the wait may be invalid when the operation completes. The post-await mounted check is therefore needed before accessing UI through that context. This confirms the explanation; it does not record a native paste or visual check. No code changed and no Flutter checks were rerun for this learning-record update.

### Lesson 17 actual-window feedback confirmation on 2026-11-13

The learner reported testing the copy action and seeing its feedback in the actual window. This confirms visible feedback after copying. The report does not explicitly confirm pasting the exact title into another application or forcing a native clipboard failure. Those outcomes must not be inferred from this report. Automated tests cover both success and failure. Earlier lesson checks remain open where listed. No learner-owned application code changed for this documentation update.

### Pre-push checks on 2026-11-13

After the actual-window feedback report, formatting, strict analysis of lib and test, all 39 Flutter tests, the Windows debug build, and repository, website, artwork and diff checks passed. The direct installed Dart executable and Flutter tools snapshot were used because the PATH wrapper had previously stalled. The SDK cache required write access. No Android, iOS, macOS or Linux build ran. Browser checks remain the earlier design-study results, not a new run. Native paste and earlier unconfirmed manual checks remain open.
