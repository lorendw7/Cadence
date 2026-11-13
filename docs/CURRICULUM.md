# Core learning plan

Updated: 2026-11-13. This is a teaching plan, not a record of completed lessons. [LEARNING.md](LEARNING.md) owns current progress and evidence. [PRODUCT.md](PRODUCT.md) owns product scope; [ROADMAP.md](ROADMAP.md) owns release gates and delivery estimates.

## Goal

Learn to build, explain, debug and maintain a small reliable application. Cadence gives these skills a concrete purpose. Dart and Flutter are the current tools. The lasting knowledge is how to model data, trace execution, control state, handle failure and prove behavior.

Continue from lesson 17. Do not restart completed lessons or replace the working app. Keep lib/main.dart as the teaching entry. The learner writes learning-critical core code; the assistant completes the supporting work defined below. A library is introduced when a real lesson needs it.

The revised main track is provisionally numbered through lesson 44. Lesson 17 is in progress; lessons 18-44 have not started. See the [numbered lesson plan](#numbered-lesson-plan) for the sequence. A number identifies a teaching topic, not a completed feature or a single conversation.

## What matters most

These abilities recur throughout the course. They are not six large lessons to complete at once.

| Core ability | Questions to answer | Practice in Cadence | Why it transfers |
|---|---|---|---|
| Reason about data and execution | What are the inputs, outputs and valid states? What runs next? | Types, nullability, functions, stable task IDs, validation, lists and immutable updates | The same reasoning applies in other languages and services |
| Own state and separate effects | Who owns a value? What survives a rebuild or restart? | Parent-owned task data, callbacks, controller lifetime, draft versus confirmed records | UI frameworks change; state ownership and resource lifetime still matter |
| Handle work and failure over time | What happens while waiting, after success and after failure? | Future, await, exceptions, cleanup, duplicate actions and late results | Files, databases and network calls all need clear completion and error rules |
| Keep data reliable | When is a change confirmed? How can it be recovered? | SQL, keys, constraints, transactions, schema changes and backup/restore | Data integrity matters beyond any one database library |
| Model rules and choose algorithms | Which cases must agree? How much work does a calculation do? | Deadlines, time intervals, sorting, filtering, overlaps and free time | Precise models and simple algorithms outlast specific screens |
| Diagnose, verify and deliver | What evidence supports the change? Can another person use it? | Debugging, tests, Git diffs, documentation, accessible controls and real package checks | These skills make independent development and collaboration possible |

An **invariant** is a rule that must stay true, such as keeping a task's ID when its title changes. A **side effect** changes something outside a calculation, such as writing a file. A **pure function** calculates a result from inputs without those effects. Introduce these terms through a small example before using them in exercises.

## Starting point

Keep the existing lesson numbers and historical notes. The current app has an in-memory task flow. Saving and the full planner are not implemented.

The learning log records correct explanations of controller lifetime, parent-owned task data, changing the contents of a final list and the order of a successful Future example. Use short review questions to find specific gaps. Do not assume that every topic seen in code is independently understood.

Passing application tests and assistant-assisted repairs are behavior evidence. They are not proof that the learner can design a test or diagnose a new defect alone. Native checks still pending in [LEARNING.md](LEARNING.md) stay pending.

## Division of work

The learner has delegated supporting implementation so that practice can focus on useful knowledge, including Dart and Flutter. Choose the split by what is new to learn. The first representative implementation belongs to the learner; repeated uses can belong to the assistant after the learner explains and adapts the pattern.

| Work | Learner writes or decides | Assistant completes |
|---|---|---|
| Data and rules | A model or rule with meaningful validation, identity and edge cases | Repeated mappings and helpers using the reviewed rule |
| Dart control flow | A complete small function, including callbacks or asynchronous success and failure | The runnable exercise setup, sample inputs and repeated calls |
| Flutter interaction | The first representative input, callback, state update and visible result | Similar controls and repeated wiring after that flow is understood |
| Flutter layout and lifetime | One real constraint/layout adjustment and the relevant controller or State lifetime decision | Applying the pattern across similar views, spacing, theme details, icons and translation wiring |
| Storage in its scheduled stage | The first query and save decision, confirmed state, failed-input retention and transaction boundary | Required adapter setup, generated code, platform paths and routine operations within the agreed contract |
| Testing and debugging | One meaningful case or assertion, and diagnosis of a small new failure | Test setup, fixtures, broader regressions, repeated check runs and environment troubleshooting |
| Delivery and maintenance | Explain one complete flow and review the meaningful diff | Documentation, artwork, repository checks, build preparation and routine cleanup |

Core code is not a fixed folder or percentage of lines. A new state owner, callback lifetime, validation rule or data-loss risk remains learning-critical even inside a small UI or storage helper. Explain it and reserve a bounded learner exercise. The assistant must not silently decide it as routine wiring.

The standing delegation covers supporting work in the active lesson. State the boundary and proceed; do not ask again for each routine file. It does not authorize future features, new dependencies in advance, remote publishing, or taking over the learner's reserved implementation. Only introduce setup and adapters when the current working step needs them.

Keep the learner's exercise complete enough to make a decision: one small function, widget or behavior change. Supply already understood setup, not a solution with a few missing tokens. Explain any new setup that affects the exercise. After reviewing the learner's implementation, finish the repetition and report only the relevant contract, changes and checks.

Reduce setup, repeated implementation, exhaustive test writing and visual adjustment first. Keep explanation, one independent variation and a useful failure check. Do not require the learner to read every generated line or repeat every automated check. Unexplained behavior gets a short follow-up exercise, not an expanding reading assignment.

Across several lessons, retain one small complete path that the learner can trace and change: input, validation, state, data operation and UI feedback. Storage joins that path only when its stage arrives. This preserves integration practice while the assistant handles most repetition. Keep the existing product and release checks; delegation changes who performs work, not what counts as accepted behavior.

## Dart and Flutter practice

This is a coverage guide, not a requirement to redo completed lessons. Use recorded understanding where it exists and a short variation where evidence is missing. Each row may take several small steps.

| Area | Essential knowledge | Representative learner practice |
|---|---|---|
| Dart values and models | Types, null safety, final/const, named parameters, constructors and immutable updates | Change a small model or validation rule while preserving identity |
| Dart functions and collections | Return values, callbacks, captured values, List/Map/Set and generic type notation | Write a transformation or callback and explain the input/output types |
| Dart async and errors | Future, async/await, propagation, catch and cleanup | Write and trace the caller of a successful or failing operation |
| Flutter rendering and communication | Widget composition, build, State, setState, parent data and child callbacks | Complete one interaction and explain why the visible state changes |
| Flutter context and lifetime | BuildContext as a widget's location, inherited theme lookup, initState, dispose and mounted | Explain where a controller belongs and handle a late result when that problem is introduced |
| Flutter layout and input | Constraints, Row/Column, Expanded, scrolling, forms, focus and large text | Diagnose one layout or input problem and make a bounded fix |
| Flutter state across screens and lists | Draft ownership, navigation results and keys when identity must survive list changes | Add the first real editor interaction when scheduled; explain what remains after closing or reordering |
| Dart and Flutter verification | A pure-function test, a widget interaction test, debugger values and relevant stack frames | Write a small assertion and locate one mismatch between expected and actual behavior |

The [Dart language guide](https://dart.dev/language) and [Flutter learning pathway](https://docs.flutter.dev/learn/pathway) provide reference coverage. Consult [layout constraints](https://docs.flutter.dev/ui/layout/constraints) and the [State lifecycle](https://api.flutter.dev/flutter/widgets/State-class.html) when those exercises arise. They are references, not a parallel course to finish before continuing Cadence. Check APIs against the installed SDK.

In particular, do not delegate all Flutter UI to the assistant. The learner needs representative layout, interaction and lifecycle work, as well as pure Dart logic. Existing assisted layout repairs remain assisted work until an independent variation provides evidence.

## Working sequence

Each stage contains small lessons. Move on using demonstrated understanding and behavior, not a fixed lesson total. Debugging, tests, Git and reading official documentation begin now and continue in every stage.

### 1. Continue async reasoning

Start with the unfinished part of lesson 17: one Future that completes with an error. Explain try/catch around await. Compare calling an operation, awaiting it and handling its failure. Introduce finally in a later small step as cleanup, not evidence of success.

Then reason about explicit idle, pending, success and failure states. Keep draft input separate from confirmed data. Explain why a second action or a result arriving after a screen closes needs a rule. A state transition is a change from one named state to another after an event.

Use isolated teaching examples before changing the real task flow. A delayed example is not persistence. Do not add a saving indicator or a database package during the first error-handling exercise.

Ready to continue when the learner can trace success and failure, explain which statements do not run after an error, and correct one small variation without a supplied solution. Add a focused asynchronous test when its syntax has been explained.

### 2. Make one task change survive safely

Teach the data idea before the library call:

1. Contrast process memory with stored records. Explain serialization: converting values into a format that can be stored or transferred.
2. Learn the needed SQL: rows, columns, SELECT, INSERT, UPDATE and DELETE. Explain a primary key as a stable record identifier and a constraint as a database rule.
3. Introduce the planned drift/SQLite adapter for one real use. Trace a task from UI input through validation to a confirmed write and back to display.
4. Teach a transaction as related changes that succeed or fail together. Learn migrations as controlled changes to the stored structure, then test recovery.

These are several lessons, not one database assignment. Keep the first-use local/temporary choice before opening saved data. Use fictional records, preserve drafts and the last confirmed data on failure, and test restart. Session-only IDs must be reconsidered when records survive a restart.

Ready to continue when the learner can explain and demonstrate one confirmed write, a failed write with retained input, restart recovery and temporary use that leaves an existing database unopened. Complete safe backup/restore/clear checks before private-data trials. A fake storage test alone does not prove disk behavior.

### 3. Model time and calculate useful views

Add direct task and plan editors in the [roadmap's order](ROADMAP.md). A task describes an outcome; a plan reserves time; a deadline does not reserve time. Teach date-only values, exact times, time zones and durations as distinct meanings before selecting their representation.

Write small pure functions for validation, ordering and overlap rules. Hand-calculate a few examples before coding. Choose lists, maps or sets by the operation needed: ordered display, lookup by ID or uniqueness. Explain complexity as how work grows with input size. Compare a scan with sorting when the actual calculation needs it; use measurements before optimizing.

Derive Today and Week from the same records. Practice empty inputs, equal boundaries, nested overlaps and overnight intervals. Use explicit clock and time-zone inputs where a rule needs them so tests do not depend on the day they run. Bounded repeats and single-occurrence corrections follow the basic model in later lessons.

Ready to continue when the learner can explain the same result by hand and by test, show why touching intervals do or do not conflict under the chosen rule, and find free time without counting overlapping commitments twice. Views must agree. Full acceptance remains in the roadmap.

### 4. Make change easier without losing behavior

Refactor when a working rule has become hard to read, test or share. Refactoring changes structure while preserving behavior. Keep a clear owner for each kind of state. Separate pure planning rules from UI and storage when an actual consumer or test needs that boundary.

Introduce a small interface when it makes a real dependency replaceable, such as supplying failing storage in a test. Do not create empty layers, a generic repository framework or many files to match an architecture diagram. Keep lib/main.dart readable as the entry and move only responsibilities that have become concrete.

Ready to continue when the learner can make a small change, explain why a boundary helps, and show that relevant behavior stayed the same. Choosing to keep a simple function is also a valid design decision. A state-management package is not a mastery target.

### 5. Deliver a complete, usable local flow

Complete the Windows flow and its recovery checks, then adapt and validate Android under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). Share rules while checking each platform's files, lifecycle and input behavior. Other platforms keep separate acceptance.

Use a whole scenario: record a deadline, reserve work before it, adjust a commitment, restart and recover records. Check keyboard access, readable large text and the product languages as each control appears. Explain privacy through concrete data locations and minimal logging.

Ready for a stage review when the learner can reproduce a defect, locate its cause, make a bounded fix, choose a meaningful check, inspect the diff and explain the result and limits. A build is compilation evidence; package use, recovery and native interaction need their own checks.

## Numbered lesson plan

Planning revision: 2026-11-13. Keep lessons 1-16 and their historical results. The main learning track now has a provisional endpoint at lesson 44. Lessons 17-44 contain 28 topics still to finish: lesson 17 has started and 27 topics have not. This is a planning choice, not a measured effort estimate.

Each topic can take several 20-45 minute teaching exchanges, with additional practice as needed. Split a topic into small steps without renumbering completed history. Revisit future scope after lesson 21 and after restart recovery in lesson 26. Extend the plan if understanding or working behavior needs more practice.

### Lessons 17-21: async work and Flutter state

| Lesson | Topic | Learner-owned practice |
|---|---|---|
| 17, in progress | Future results and awaited errors | Write the caller with await and catch; predict success and failure |
| 18 | Cleanup with finally | Explain and implement cleanup on both paths without reporting false success |
| 19 | Asynchronous tests and diagnosis | Write a failure assertion and trace one mismatch |
| 20 | Pending, successful and failed operations | Write a small state transition and prevent a duplicate action |
| 21 | Flutter context and asynchronous lifetime | Handle a late result and explain the relevant State/controller lifetime |

The assistant supplies small runnable examples and test setup. Lessons 20-21 may use an isolated fictional operation; it is not real saving and must not appear as implemented persistence in the app.

### Lessons 22-31: reliable local data

| Lesson | Topic | Learner-owned practice |
|---|---|---|
| 22 | Memory, stored formats and durable identity | Map one task to stored values and explain an ID that survives restart |
| 23 | SQL, keys and constraints | Define one task table and write a bounded query |
| 24 | Local saving or temporary use | Write the branch that decides whether saved records may be opened |
| 25 | First confirmed write | Connect one task save to success/failure handling and retain input on failure |
| 26 | Loading and restart recovery | Read saved tasks and distinguish an empty store from a failed load |
| 27 | Transactions and rollback | Make a related change succeed together or leave confirmed data unchanged |
| 28 | Schema migration | Make one small stored-structure change and check an older fixture |
| 29 | Versioned backup export | Define and validate a bounded task backup representation |
| 30 | Restore preview and replacement | Validate a candidate before replacement and preserve old data on failure |
| 31 | Safe clearing and mode changes | Implement one guarded clear/cancel path and explain the active session boundary |

The assistant handles required adapter setup, generated code, platform paths, routine operations and broader checks. Explain new contracts before using that support. Apply the confirmed-write rule to task addition, completion, deletion and undo through small steps; lesson 25 does not silently turn all existing actions into saved operations.

Use fictional or disposable test records through this block. Migrations use controlled fixtures with a recovery copy. Private-data trials wait for actual backup, restore and clear checks. Extend and retest the backup format when later lessons add deadlines, plans, repeats or corrections.

### Lessons 32-38: editors, models and algorithms

| Lesson | Topic | Learner-owned practice |
|---|---|---|
| 32 | A Flutter task editor | Build the first draft, validation and return-result flow |
| 33 | Deadline meanings | Model no deadline, a date-only deadline and an exact deadline |
| 34 | Plans and time | Model an interval and explain time-zone and overnight cases |
| 35 | A plan editor | Implement start/end validation in a representative form |
| 36 | Collections and identity | Derive a sorted or grouped view; explain lookup cost and list identity |
| 37 | Interval overlaps | Write and test an overlap rule, including equal boundaries |
| 38 | Available time | Merge occupied intervals and calculate gaps without double counting |

The assistant expands reviewed patterns into similar controls and handles visual detail. The learner keeps the first meaningful form, model and calculation. Introduce collection syntax or other prerequisites earlier if an active exercise needs them; lesson 36 consolidates their use rather than blocking earlier code.

### Lessons 39-44: derived views and independent work

| Lesson | Topic | Learner-owned practice |
|---|---|---|
| 39 | Today | Derive a daily view from confirmed records and an explicit date |
| 40 | Week | Implement a representative day-selection and shared-state interaction |
| 41 | Bounded repeats | Generate occurrences within a stated date range |
| 42 | Single-occurrence changes | Preserve identity while changing, cancelling or restoring one occurrence |
| 43 | Responsive and accessible Flutter | Diagnose and fix one real constraint, focus or large-text problem per step |
| 44 | Independent change and review | Complete a bounded variation, diagnose a failure, verify it and explain the whole flow |

Testing, useful refactoring, Git review, keyboard access and readable text apply from the start. Lessons 43-44 consolidate them; earlier defects and pending checks do not wait automatically until then. The assistant completes agreed repetition, regression runs, build preparation and documents. The learner still traces at least one complete user action.

Lesson 44 is a learning review point. It does not guarantee a complete Windows release, platform acceptance or a fixed number of study hours. The [roadmap](ROADMAP.md) still owns all delivery gates. Android teaching follows the working Windows flow and will receive its own numbered plan when scheduled. Other platforms and deferred services are outside this provisional 44-topic track.

## The next small lessons

The immediate task is still lesson 17. See [the current checkpoint](LEARNING.md#current-learning-checkpoint) for the reviewed console caller and the next real-code variation. The preparation sequence below describes the original exercise, not its current acceptance status.

The assistant prepares a tiny runnable example with a fake operation that can succeed or fail. The learner writes the complete calling function, placing await, the success result and catch. First explain any missing await syntax, predict and run both paths, then change one input and explain the result. This example neither saves data nor changes the app.

Finish that small exercise before lesson 18 introduces finally. Lesson 19 then introduces the asynchronous assertion syntax. Do not bundle these with a database, an editor or a state library.

## How a lesson works

Aim for 20-45 minutes of guided work. Practice and debugging can take longer. A numbered lesson may need several exchanges. Begin with a short brief: the goal, the learner's function or widget, the assistant's supporting work, and one observable check. Do not assign a whole screen or subsystem just to teach one concept.

1. Recall one earlier idea from memory. Use the answer to choose what needs explanation.
2. State one observable goal and explain one new concept with a small example.
3. Predict a result or failure before running the example.
4. Let the learner write the small change. Give a hint, a narrower question or a short separate example if needed.
5. Compare expectation with behavior. Read the first relevant error, inspect values and trace the path before editing.
6. Check the behavior, explain the change in plain words and record the next step.

Do not ask the learner to discover unexplained Dart syntax. Do not hand over the complete future feature. If direct repair is explicitly delegated, label it as assistance and return to a small explanation or variation before recording understanding.

Use a different small example later, such as a book or shopping item, to check transfer. It is a short exercise, not a second app or a new language track. Revisit a weak idea in the next session and again in a later feature.

## Evidence of learning

Track evidence briefly in [LEARNING.md](LEARNING.md); do not make a separate scoring system.

| Evidence | What it shows | What it does not show |
|---|---|---|
| Explanation and prediction | The learner can reason about the rule and execution | Ability to complete a large feature alone |
| Small independent variation | The idea can be used beyond the exact guided example | Knowledge of every related API |
| Diagnosis and test case | The learner can explain a failure and verify a boundary | Complete platform or release acceptance |
| Automated behavior check | The implementation satisfies the checked case | Learner mastery or real-device usability |
| Actual-window or package check | The checked native interaction worked | Every other platform or untested case |

Use official documentation while implementing; independence does not mean memorizing APIs. Before finishing a stage, ask for an explanation, one small variation and a boundary or failure case. If one is missing, record the gap and choose a short exercise. Do not erase completed work or close deferred checks.

The assistant may keep supplying meaningful regressions. Gradually let the learner choose an input, state the expected result and write one assertion. Later, let the learner write a small test before the assistant adds broader coverage. Prefer tests of behavior over tests that repeat implementation details.

## Habits that run through every stage

- **Debugging:** reproduce, reduce, form one hypothesis, inspect evidence, fix the cause and retain a useful regression. Learn breakpoints and stack traces on an actual problem.
- **Git:** inspect status and diff, explain a small change and keep unrelated work out of it. Teach commits, branches and safe reversal when needed. Preserve existing work.
- **Reading documentation:** find the relevant official API, check the installed version and try a minimal example. Search with the actual error and context.
- **Using AI:** first state the expected behavior and an attempt or uncertainty. Ask for a hint, explanation or review. Read every proposed diff and verify it; compiling code is not enough evidence to accept it.
- **Product judgment:** write observable acceptance conditions, name failure cases and check that a person can finish the task. Learn UI layout through constraints, hierarchy, feedback and accessibility, not component memorization.

Treat the previously recorded 10-15 hours per week as available time, not a quota. Spend learner time on a small implementation, explanation, one variation and a focused check. The assistant handles the agreed repetition and check execution. Keep saved time available for rest or consolidation rather than automatically assigning more features.

After two lessons, compare time spent learning with time spent on setup and repetition. Adjust the split if setup still dominates or if the learner cannot explain the completed flow. No fixed code percentage or time-saving estimate guarantees understanding.

Review the next stage after two weeks of this approach and after the first reliable save/recovery exercise. This is a learning rhythm, not a delivery promise. Keep product estimates in [ROADMAP.md](ROADMAP.md).

## What to defer

Keep advanced language features, isolate-based parallel work, streams and broad design-pattern study until a concrete problem requires them. Do not turn core data-structure practice into a large interview-problem syllabus. A separate interview or systems course can be planned if that becomes a goal.

Riverpod is conditional on real shared-state difficulty. shadcn_ui remains the chosen UI library, but migrating more components is not a learning objective by itself. Teach SQL and reliability before focusing on drift convenience APIs.

Cloud services, authentication, sync, ads, OCR and school connections remain outside the current learning milestone. Do not add backend dependencies or parallel technology tracks. Basic local privacy, failure handling and backup remain core work. Platform expansion follows the roadmap.

## Earlier lessons and estimates

Lessons 1-2 introduced models and immutable updates. Lessons 3-10 built the in-memory task flow. Lessons 11-16 introduced the desktop UI, layout, state ownership and cleanup. Their notes and recorded acceptance remain unchanged; see [the lesson index](README.md#lesson-records) and [historical templates](../lessons/README.md).

The former 17-26 and 27-34 ranges, and the older 64 / 80-100 / 88-116 lesson totals, were provisional estimates for earlier scope. They are not the new course budget. Website, artwork and design-document work do not increase completed core lesson counts.

## Official references, used when needed

These references support the technical concepts. The learning order and time allocation above are planning judgments for this learner, not guarantees from the sources. Read only the relevant section at the point of use. Links were reviewed on 2026-11-13.

| Topic | Reference | Use |
|---|---|---|
| Future and await | [Dart asynchronous programming](https://dart.dev/libraries/async/async-await) | Trace completion, execution order and an awaited error |
| Errors and cleanup | [Dart error handling](https://dart.dev/language/error-handling) | Distinguish catch, propagation and finally |
| State ownership | [Flutter simple state management](https://docs.flutter.dev/data-and-backend/state-mgmt/simple) | Read the lifting-state-up explanation; no package change is implied |
| Transactions | [SQLite transactions](https://sqlite.org/lang_transaction.html) | Understand commit, rollback and the write boundary |
| Test scope | [Flutter testing overview](https://docs.flutter.dev/testing/overview) | Distinguish unit, widget and integration evidence |

Use [DART_GUIDE.md](DART_GUIDE.md) as a short local reference and [SETUP.md](SETUP.md) for the checkout's commands. Read the installed library's current documentation when its lesson begins.
