# Optional quick course entry

Updated: 2026-11-11. Reference design for an optional course extension. Fixed-template CSV and pasted course tables are not implemented and are not required for the general local planner. Build the ordinary plans, tasks and storage choices first; see [PRODUCT.md](PRODUCT.md) and [ADR-007](adr/007-general-purpose-local-planner.md). Any later Web client needs its own import acceptance; this desktop template does not automatically become part of its scope.

Build direct editing, the explicit first-use choice between local saving and temporary use, and native import first; see [EDITING.md](EDITING.md). Manual entry does not require a school account. Support for an official school format needs a real, properly anonymized sample and a permitted data route; see [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). Those permissions apply to the optional connection, not general product publication.

## Entry formats

Prefer the native Cadence timetable format when the user already has one; its intended behavior is in [REDESIGN.md](REDESIGN.md). For first-time entry, offer a fixed CSV template or tab-separated data pasted from a spreadsheet, parsed locally. Do not assume that tables from every department match the supported template. Explain the required columns and how to correct errors.

The template has course title, weekday (1–7), start period, end period, room, teacher and teaching weeks. Before import, configure the semester's week-one Monday, end date and period times. The planned week syntax covers ranges, odd/even weeks and lists, such as weeks 1–16, odd weeks in 1–16, and weeks 2, 4 and 6. Freeze the exact language-neutral input tokens and examples during the import lesson before accepting files; translated labels must not create different parsing rules. Each row represents one teaching rule. Confirm how same-named rows belong to courses in the preview; a shared name is not enough to merge them.

## Import flow

Select a file or paste text → validate headers, encoding and size → parse → identify invalid rows → preview courses and weeks → confirm → write the complete result.

Use UTF-8 CSV and accept a UTF-8 BOM. A field containing commas, such as a week list, must be quoted using CSV rules. Pasted tables use tabs between columns. Validate weekdays, existing periods and their order, week ranges and nonempty titles. Never silently drop invalid rows. All errors must be corrected before confirmation.

Show possible duplicates in the preview and let the user skip or explicitly retain each one. Equal names do not prove duplication. CSV lacks native export IDs, so it cannot promise automatic merging across file versions. Do not change the database before confirmation or leave a partial timetable after a failed write. Reuse the core schedule rules for duplicate and conflict checks. In session-only mode, the confirmed result stays in memory and creates no automatic backup.

Do not read arbitrary XLSX files, school login pages or screenshots. Other table formats, offline OCR and PDF parsing need separate evaluation; do not introduce cloud recognition for this scope. Treat imported fields as untrusted text. Limit file size, field length and record count. Do not run formulas, HTML or links from a file, or upload its contents. See [SECURITY.md](SECURITY.md).

Any later Web CSV support needs separate checks for file selection, paste, browser transactions and recovery. It cannot assume desktop file-system access. Re-estimate from actual input samples and pilot feedback. Complex school formats and official connections are outside the fixed-template estimate.
