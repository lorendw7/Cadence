# Academic calendar and individual class changes

<a id="optional-academic-calendar-and-class-changes"></a>

Updated: 2026-11-13. Planned behavior under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md), not implemented. Repeated plans, including manually entered classes, need minimal manual maintenance: correct one occurrence's time or room, cancel it and restore it. These are part of the first useful timetable flow. General tasks and personal plans still need no semester or teaching-week setup. Public-holiday calculation, bulk vacation tools and external subscriptions remain outside the baseline.

The current local flow uses context the user supplies through direct editing. Do not connect to a school system or assume one department's calendar applies elsewhere. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) retains deferred research guidance, not permission for real access. Any later approved source needs an explicit supported-rule contract. A captured file or import is a snapshot; personal cloud sync does not discover institutional course changes. Until a separately tested refresh exists, users enter changes themselves.

## Teaching weeks are the source of truth

Start with explicit dates or bounded weekly repeats using actual start/end times. Teaching-week and period rules are needed only if the selected real input requires them. Otherwise flag those rules as unsupported; do not guess or silently convert them.

When teaching-week rules are supported, each term needs an explicit week-one Monday and end date. Week numbers advance every Monday, including vacations, unless the user changes the settings after reviewing a preview. Odd/even weeks refer to those teaching weeks. Ordinary tasks and personal plans do not require this context.

A national holiday does not imply that the school cancels classes. A weekend can have a make-up class. Never automatically cancel courses from a public-holiday label or a device region setting.

## Supported changes

- Cancel one scheduled occurrence.
- Move one occurrence to a chosen date/time while retaining its original identity.
- Change one occurrence's room. Teacher changes and other metadata can wait unless required by the declared format.
- Restore a cancelled occurrence to its previous effective time and room after preview. Cancelling retains those overrides. Resetting a correction to the series values is a separate named action if offered.

Identify an occurrence by its parent series or rule ID plus its original scheduled local date and start time, as defined in [DATABASE.md](DATABASE.md#single-occurrence-corrections). A move keeps that identity even in a different week. Show the replacement once, remove its original position and apply the same rule in Today, Week and conflicts. A whole-series edit must preview exceptions it would exclude; do not leave detached changes or discard them silently. Series splitting is deferred.

All changes follow the storage choice. A temporary schedule stays in memory; confirmed local changes survive restart and private backup/restore. Failure preserves the previous records and editable input.

A later bulk vacation action may select a date range and preview explicit cancellations. It must not duplicate exceptions or overwrite existing moves. Personal plans and tasks remain unaffected. This bulk tool is not needed for the first individual-correction flow.

Make-up classes always identify which original class is being moved. Do not infer that an entire Saturday follows a Monday timetable without explicit user input and preview.

## Sharing and checks

Required private backups include occurrence corrections and validate their references on restore. Optional filtered timetable export can later include selected changes; its preview states whether they are included. Native timetable import must preserve original occurrence identity through local ID remapping.

First test bounded weekly repeats, first/last dates, one time/room change, cancellation and restore, moving into another week, whole-series edits with exceptions and backup/restart recovery. Check each result in Today, Week and conflict detection. Test odd/even rules, partial teaching weeks and bulk cancellation only if those features are enabled. See [REDESIGN.md](REDESIGN.md). No checks here have passed merely because the design is written.
