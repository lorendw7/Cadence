# Focus design study

Prepared on 2026-11-18. Open the [local design preview](focus-study.html). It shows fixed fictional examples in Android, Windows expanded and Windows compact views. Use the controls above the previews to change the example, room rendering, sample text size or language. The same report task and time are used in each view. The Flutter app still keeps tasks in memory. [Learning progress](../../docs/LEARNING.md) records implemented behavior.

## Shared design

| Example | Readout and feedback | Meaning |
|---|---|---|
| Running | 18:42 remaining, with Pause and End session | One interval is linked to the report task. |
| Paused | The same 18:42, with Resume and End session | The user paused the countdown. |
| Record saved | 25:00 recorded, with Start break and Recent sessions | A confirmed timer record is stored locally. The task is still open. |
| Interrupted | 12:00 confirmed locally, with a short explanation and access to recent sessions | The sample credits the last confirmed duration. Time during the interruption is unknown. |

In Flutter, share task context, timer and save status wording, and action meaning. Let the Android and Windows layouts choose how much room to give the same information. Android uses a white column with a large countdown and labelled touch actions. Windows expanded puts the room beside a solid control panel. Compact mode puts the task, time and essential actions into the same small window. A plain option keeps the full expanded controls. The sample states illustrate the approved direction. The learner defines the state transitions, native interruptions and save rules in the appropriate lesson.

## Sources and artwork

- [HTML](focus-study.html), [CSS](focus-study.css) and [JavaScript](focus-study.js) are the editable preview sources. The viewer uses local files and fixed sample values.
- [Quiet Room polish study](focus-art/quiet-room-study.png) was created with the built-in image tool from the [original room](../focus-pack/art/quiet-room.png). It keeps the notebook, window, ginkgo and piano. The study compares midtone clarity, shadow softness and how the objects read when the scene is cropped. Both renderings depict the same place. The original is the prepared room artwork, and the new rendering is a review alternative.
- [Record saved](focus-art/recorded.svg) and [Interrupted](focus-art/interrupted.svg) are editable, label-free 96 x 72 line illustrations. The check confirms a timer record. The dotted line and warning mark describe interrupted timing. The surrounding text explains each state. Omit the illustration when space is tight.
- The [art manifest](focus-art/manifest.json) records the original reference, full image prompt, dimensions, byte counts and SHA-256 fingerprints. The prototype and its art are design studies. They have no application bundle entries.

## Finish to compare

Cozy Time presents a quiet hand-drawn environment with simple controls. Cadence can compete on the clarity of one original scene and the care given to its functional views. Use the [official Cozy Time listing](https://store.steampowered.com/app/2054740/Cozy_Time/) and [visual references](../../docs/COMPETITIVE_REVIEW.md#visual-references-for-the-focus-screen) as comparisons.

| Check | Target for the later implemented views |
|---|---|
| First glance | Identify the task, remaining time and next action without searching through the art. |
| Responsive composition | Keep the notebook and piano recognizable in expanded Windows. Keep the task and controls readable in compact Windows and narrow Android. |
| State clarity | Distinguish paused, saved and interrupted through text and actions. Keep task completion independent. |
| Text and input | Check 200% text, Japanese, English and Chinese, touch on Android and keyboard focus on Windows. |
| Quiet use | Compare the illustrated and plain desktop views during a real interval. Ask whether the illustration is comfortable and whether either layout hides useful controls. |

The local preview is ad-free. The future Android banner retains its position on the optional recent-session review during the later [cloud and ad phase](../../docs/ROADMAP.md#after-store-launch--review-services-and-income). Desktop focus design proceeds independently of the paused Steam route.

## Checks on 2026-11-18

Repository checks passed for links, JavaScript syntax and the artwork manifest. A local script exercised 72 combinations of language, room, sample text size and state, with matching values in all three panels. This test used a simulated document to check the preview logic. The in-app browser could not open the local preview, so rendered layout, browser accessibility and native behavior remain open.
