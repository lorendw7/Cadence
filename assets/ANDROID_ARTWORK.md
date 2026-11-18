# Android artwork handoff

Prepared: 2026-11-15. These are editable assets, not implemented controls or accepted phone behavior. [ADR-015](../docs/adr/015-android-self-use-first.md) keeps safe planning before the bounded focus countdown. The learner owns the first Flutter integration and all data, state and lifecycle decisions.

Expanded: 2026-11-16. The [daily-use design board](ui/android-daily-flow.png) shows three proposed phone views and three new compact states. Its [specification](../docs/ANDROID_EXPERIENCE.md) links them to existing planning and validation work. No new app feature or paid generation was added.

Use the [Android contact sheet](preview-android.png) to compare sizes and meanings. Find individual files in the [catalogue](catalog.html). The [main artwork guide](README.md) owns generation, colors and provenance. Existing asset paths and the C mark stay unchanged.

## Planning and recovery icons

All interface icons use a 24 x 24 grid, 1.75-unit round strokes and currentColor. The catalogue and contact sheet show 20, 24 and 32 px samples. On Android, put the graphic inside a target of at least 48 x 48 logical pixels. A smaller graphic must not shrink the target.

| Source | Intended meaning | Keep separate |
|---|---|---|
| [phone](icons/phone.svg) | This Android device in storage guidance | Not a confirmed save, backup, encryption or sync badge |
| [time-block](icons/time-block.svg) | Time reserved for work on a task | Not the task's deadline or completion status |
| [move-plan](icons/move-plan.svg) | Open an editor to change a plan's time | Not automatic rescheduling or a drag-only action |
| [cancel-occurrence](icons/cancel-occurrence.svg) | Cancel the named occurrence of a repeat | Explain scope with text; do not imply deletion of the series |

Reuse the existing deadline, repeat, conflict, save, backup and restore icons. Do not introduce a second symbol for each screen. Use the phone symbol where the existing desktop device drawing would be misleading.

## Later focus controls

These six icons prepare the selected countdown stage. They do not add a player, background service, automatic cycle or phone feature.

| Source | Intended meaning | Required label or behavior context |
|---|---|---|
| [focus-timer](icons/focus-timer.svg) | Task-linked countdown | The hourglass distinguishes focus from the existing deadline clock |
| [play](icons/play.svg) | Start or resume the chosen session | Use the actual Start focus or Resume label |
| [pause](icons/pause.svg) | Pause a session | Keep it distinct from ending or completing the task |
| [stop](icons/stop.svg) | End the session | Do not mark the source task complete automatically |
| [break](icons/break.svg) | Start a manual break | The cup is a rest symbol; it does not prescribe a drink or start a cycle |
| [history](icons/history.svg) | Open local session records | Recorded timer time is not verified attention |

Name every icon-only control. A visible text label is preferable where meaning could be confused. Never distinguish pause, end and task completion by color alone. Reuse these drawings for music controls only if a later player is separately selected; their presence does not change Android scope.

## Compact state illustrations

The six additions share the existing 96 x 72 canvas, white surfaces, wine accent and neutral outlines. They contain no visible text. Keep localized titles, explanations and actions in the interface. Pale baselines are decoration, not control boundaries.

| Source | When to use it | Required surrounding content |
|---|---|---|
| [local-save-compact](illustrations/local-save-compact.svg) | The first-use local saving option | Explain the device location and that a local copy is separate from a backup |
| [temporary-use-compact](illustrations/temporary-use-compact.svg) | The first-use temporary option | Explain loss on close; no automatic deadline or hidden persistent copy |
| [backup-review-compact](illustrations/backup-review-compact.svg) | Inspect a selected backup before replacement | Show actual validation results and replacement scope; the image does not confirm restoration |
| [load-error-compact](illustrations/load-error-compact.svg) | Saved records could not be opened | Retain existing records, explain the error and offer the available recovery actions |
| [all-done-compact](illustrations/all-done-compact.svg) | Every task in an explicitly named set is complete | Name that set; retain other due, overdue and undated work where applicable |
| [plan-overlap-compact](illustrations/plan-overlap-compact.svg) | Optional supporting artwork in an overlap detail | Keep both actual plan titles and intervals visible; the user decides how to proceed |

Use the existing empty Tasks, Today and Week drawings when there are no records. A failed load is never an empty workspace. A failed save keeps its separate document-and-warning illustration. Neither state proves data loss. The all-done image must not replace Today while unfinished work remains elsewhere.

Do not add these pictures to every list row, form or snackbar. Use one small state image where it helps explain a choice or an unusual state. Keep the useful action above the fold. Omit the picture when the keyboard, large text or a short screen needs the space. No animation, vibration or sound is attached to these files.

## Delivery and review

The [focus design study](ui/FOCUS_STUDY.md) pairs the existing countdown icons with two compact study illustrations. [Record saved](ui/focus-art/recorded.svg) appears beside a confirmed timer record. [Interrupted](ui/focus-art/interrupted.svg) goes beside the last confirmed duration and a plain explanation of unknown time. The originals and fingerprints are tracked in the separate [study manifest](ui/focus-art/manifest.json).

### Daily-use additions

| Source | Intended meaning | Required surrounding content |
|---|---|---|
| [no-deadlines-compact](illustrations/no-deadlines-compact.svg) | No tasks are due on the named date | Name that date and keep other task groups and real plans available; do not use an all-done message |
| [unplanned-time-compact](illustrations/unplanned-time-compact.svg) | No plan is recorded within a bounded interval | Give its actual date, start, end and duration; no verified availability or automatic suggestion is implied |
| [unsaved-draft-compact](illustrations/unsaved-draft-compact.svg) | An editor contains unconfirmed changes | Offer the existing explicit choices; this is not a write failure, saved copy or recovered draft |

These sources use the same 96 x 72 grid, strokes and colors as the earlier compact states. Use the gap illustration in explanatory detail only; ordinary agenda gaps need compact text and an action, not repeated pictures. Keep draft artwork out of small error messages when it would displace the correction or retry control.

The [daily-use SVG](ui/android-daily-flow.svg) and [PNG export](ui/android-daily-flow.png) are 1360 x 1440. The board has English reference copy and three fictional 390 x 824 phone frames. It embeds vector geometry without external image or font requests. Editing [the authoring helper](../tools/android_design_art.py), then running the regular generation sequence, keeps its fixture and exports reproducible. Existing Japanese and Chinese UI studies remain separate and unchanged.

Do not crop away the design-status label and present these frames as app screenshots. This drawing does not implement controls, scrolling, saving, keyboard behavior or responsive layouts. The [design board review cases](../docs/ANDROID_EXPERIENCE.md#review-and-delivery-mapping) identify the native checks still needed.

### Generation and acceptance

The icon sprite, catalogue, manifest, overview, full contact sheet, Android contact sheet and daily-use PNG are generated together. Use the previews-only sequence in [the artwork guide](README.md#regeneration). No Flutter SVG package or asset declaration is added by this handoff.

Native checks still need the learner's implemented UI: actual fonts, 200% text, TalkBack names, keyboard and Back behavior, target sizes, real saves and failures, and focus interruptions. File validation and a visual contact-sheet review cannot pass those checks.
