# Lesson 4: state, buttons, and rebuilds

Completed: 2026-11-10. The learner wrote the feature. Formatting, analysis, and all ten tests passed. In a real window, the learner confirmed that a count of three survived hot reload and reset to zero after hot restart and a full restart.

## Implementation

TodayPage became a StatefulWidget. Its State object stores int practiceCount = 0 outside build. The page displays the value with string interpolation. The increment and reset buttons change it inside setState.

TodayPage is immutable configuration. _TodayPageState holds changing runtime data. createState creates that state; build describes its current UI. setState performs the change and schedules a rebuild. It does not save anything to disk.

A field survives while the same State object exists. A local variable initialized inside build starts again on every call. At this historical stage, tasks were still a local read-only sample list.

## Buttons

| Widget | Typical appearance and use |
|---|---|
| ElevatedButton | Raised background; used for increment here |
| TextButton | Less visual emphasis; used for reset |
| FilledButton | Strong background for a main action |
| OutlinedButton | Visible border for a secondary action |

onPressed determines behavior; appearance does not. child holds the button's text or icon. The teaching app uses Material. shadcn_ui remains the selected later product UI. This historical Material lesson and its results are unchanged.

## Reload experiment

Run flutter run -d windows from the repository root. Type the following keys in the Flutter terminal, not in the app.

| Action | Observed result | Reason |
|---|---|---|
| r, hot reload | Count stayed at three after a button-label edit | Existing State was kept |
| R, hot restart | Count became zero | Dart state was initialized again |
| q, then run again | Count became zero | The process and state started again |

Hot reload does not rerun main or initState for an existing state. Some changes, including native code, require a full restart. These are manual observations, not automated test results.

## Acceptance

At this lesson's acceptance, the counter test checked zero, three increments, reset, and another increment. The two task rows and their states stayed unchanged, with no Flutter exception. Lesson 16 later retired the counter. The same [test path](../../test/practice_counter_widget_test.dart) now checks that the retired buttons are absent and that undo remains usable after resizing.

Formatting and analysis passed; all ten tests passed at this stage. This proves that in-memory state can update the UI. It does not prove task editing, persistence, offline recovery, or sync.

Next: [extract a task row](05-task-row.md).

References: [StatefulWidget](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html), [hot reload](https://docs.flutter.dev/tools/hot-reload), [ElevatedButton](https://api.flutter.dev/flutter/material/ElevatedButton-class.html), [TextButton](https://api.flutter.dev/flutter/material/TextButton-class.html), [FilledButton](https://api.flutter.dev/flutter/material/FilledButton-class.html), [OutlinedButton](https://api.flutter.dev/flutter/material/OutlinedButton-class.html).
