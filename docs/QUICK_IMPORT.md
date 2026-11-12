# Optional screenshot and table import

Scope update (2026-11-12): [ADR-010](adr/010-open-multiplatform-free-first.md) targets desktop, Web, Android and iOS under the existing MIT license. Finish the free desktop edition first; Web and mobile remain later directions. All users receive the same free functions, with no paid tier or paid capacity. Cloud sync and optional ads are for review after store launch. External academic systems remain excluded. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) take precedence over older platform exclusions and school-gated proposals below.

Updated: 2026-11-11. Status: **accepted design direction, not implemented**. Use RapidOCR for local screenshot text recognition and optional cloud AI with the user's own API key. Exact versions, models, packaging and supported providers still need checks. No import package or service is installed by this design update.

Build direct editing, the explicit local-saving or temporary-use choice, and private recovery first. See [PRODUCT.md](PRODUCT.md), [EDITING.md](EDITING.md) and [ROADMAP.md](ROADMAP.md). The learner writes core features in small lessons. This design does not change the current lesson.

This optional study can serve personal plans and work schedules as well as courses. Only course rules need semesters and periods. It is not a first-free-release gate. The study starts with desktop input; Web and mobile would need separate import and model-packaging checks. External academic systems remain excluded. Complete the free core and platform releases first.

## Local input and tools

| Input | Planned handling |
|---|---|
| Native Cadence file | Use the versioned native parser and preview; distinguish full backup replacement from adding a timetable |
| CSV or pasted table | Parse the fixed template locally; report row errors |
| PNG or JPEG screenshot | Paste an image, drop a file or choose a file; use RapidOCR to extract text and positions, then apply schedule rules |

OCR means reading text from an image. It does not by itself turn a table into a correct schedule. Local rules must group cells, match headings and read dates, times and repeats. Let users compare the screenshot with the draft and correct it. Reject unreadable content with guidance. Do not promise arbitrary document understanding.

RapidOCR has an Apache-2.0 license and supports local CPU inference through ONNX Runtime. This is a selected tool to evaluate, not proven Flutter integration. Check code, model, language-pack and native dependency licenses before distribution. Test Japanese, English and Chinese with the actual selected models.

Prepare models through an explicit installation or download step with version and checksum checks. Explain download size and location. Once resources are ready, local import must work without a network or API key. Do not make users install Python manually. Evaluate a packaged local worker or native bridge when its lesson begins; do not create unused layers now. Measure full installed size, memory, CPU time, cancellation and Windows packaging before selecting versions. Linux and macOS need native checks.

Start with one screenshot per import. Users take and crop it with their usual system tools before importing. For a PDF or another unsupported source, ask the user to capture the relevant table as a screenshot. Direct PDF import is out of scope. Do not add a PDF library, page selector, built-in screenshot tool, image editor or automatic image stitching. Further screenshots use the same flow with duplicate review.

## CSV and pasted course tables

Keep the fixed-template route available. Use UTF-8 CSV, accept a UTF-8 BOM and quote fields containing commas. Pasted tables use tabs between columns. Arbitrary XLSX files and school login pages are outside this scope.

The course template contains title, weekday (1-7), start period, end period, room, teacher and teaching weeks. Each row is one teaching rule. Configure the semester's week-one Monday, end date and period times. Planned week syntax covers ranges, odd/even weeks and lists. Freeze language-neutral tokens and examples in the import lesson. Translated labels must not change parsing rules.

Validate nonempty titles, weekdays, period order and bounded week ranges. A shared title does not prove that rows belong to the same course. Unknown columns and invalid rows need a clear explanation; never drop them silently.

## One review and commit flow

Paste a screenshot or table, drop a file, or choose a file → check limits → extract candidate entries → correct missing or uncertain fields → preview actual dates → confirm → commit the complete selection.

Provide a file picker and keyboard access as alternatives to drag and drop. Show progress and cancellation. Parsing and recognition must not freeze the interface.

Keep each candidate's source image region or table row in memory for comparison with the original. Show title, location, date or weekday, time or period, week rules and exceptions. Mark inferred and missing fields. A model's confidence score is not proof of correctness.

For example, "Wednesday, periods 3-4, even weeks 2-16" still needs the first teaching week and period times. Ask for these values; do not invent them. Personal plans need dates and timezone rather than a semester. Unsupported repeat rules remain unresolved until corrected or explicitly excluded.

Show extracted, selected, excluded and unresolved counts. Software cannot always detect a missing entry, so require comparison with the source. Let users explicitly exclude rows. All selected entries must pass the same domain checks as manual entry. Preview real occurrences, overlaps and possible duplicates. A shared name is not enough to merge or delete records. Images and CSV lack reliable native IDs, so repeated imports need another duplicate review.

Recognition never writes records. Recheck the reviewed draft and local data revision before commit. A changed file, edited draft or changed local data needs a fresh preview. Commit the selected batch through the application writer in one transaction, or change the in-memory snapshot as one operation in temporary mode. Failure preserves existing records and the editable draft. Reject late results after cancellation, clearing, mode changes or a new import. A second confirm must not write the same batch twice.

## Optional cloud AI with a personal API key

Cadence remains free to use and does not fund a shared cloud AI account. Users may enable cloud help for a difficult screenshot. Their provider may charge them. Do not require a Cadence account or operate a Cadence request relay. A key does not guarantee free quota or model access.

Allow more than one provider profile, with one selected per request. Do not add a provider marketplace or automatic model routing. Each profile has a display name, service address, model and separate key reference. The user selects a profile for each request. An OpenAI-compatible interface is an initial adapter option, not a promise that all providers behave alike. Add separate adapters only when needed and tested. Record image input, text input, structured output, limits and errors for each provider/model combination. No provider is verified yet.

Cloud help may receive locally extracted text and positions, or the imported screenshot if the model supports vision. Show the exact content before sending it. Disable unsupported choices rather than silently changing the payload or provider.

Before each send, show the provider host, model, selected content and whether images leave the device. Require an explicit send action. Local saving, entering a key and selecting a profile are not upload consent. Never fall back to cloud automatically. Changing provider or increasing content needs another review. Provider retention rules apply even in temporary mode; local clearing cannot recall uploads.

Keep keys in memory by default. Offer a separate Remember key choice backed by the operating system's credential store. Temporary use must not save a new key or automatically load a remembered one. Offer an explicit choice to use a saved key for this session. Never put keys in planning records, exports, ordinary settings, logs, URLs or source files. A missing or locked key store must not cause plaintext fallback. Removing a profile clears its saved key and memory copy; provider-side revocation is separate.

Use HTTPS with certificate checks. Show the destination before sending a key; do not forward credentials across redirects or to another host. Imported text cannot select an endpoint, model or key. Instructions inside screenshots and AI responses are untrusted data, not commands. Grant no tools, file access or arbitrary URL fetching to extraction requests.

Set finite input, output, time and concurrency limits. Allow cancellation and no automatic billable retries in the first version. A timed-out request may still have been billed; explain this before a manual retry. Do not show an exact cost without current pricing and usage evidence. Wrong keys, quota errors, unsupported models and malformed output leave local import usable. Never silently switch providers. Check AI output with a strict schema and the same domain rules as local extraction; it can only update a draft.

## Privacy and input limits

Set and test finite file bytes, decoded pixels, field lengths, records and recurrence limits before enabling a format. Existing private JSON limits do not define image limits. Bound image decoding work, not just compressed file size. Reject corrupt, oversized or unsupported files with clear errors. Do not execute recognized text or follow links in it.

Keep screenshot bytes, OCR results and drafts in memory where possible. Do not copy screenshots into backups or keep them as automatic attachments. Temporary mode must leave no app-owned private disk cache; disable a path in that mode if its dependencies cannot meet this rule. Shared model files contain no user data and may remain installed. Cancel, close and clear must release private buffers and clean permitted temporary files. Test crash cleanup without claiming secure physical erasure. See [SECURITY.md](SECURITY.md) and [DATA_PROTECTION.md](DATA_PROTECTION.md).

## Accuracy and release evidence

The main goal is less manual work. A useful partial draft can meet that goal without perfect recognition. Users must be able to compare the source, correct fields and enter missing rows without starting again. No Cadence accuracy or effort-saving measurement exists. Cloud AI may help some layouts and may also introduce missing or invented entries. Valid JSON, a confidence score and a passing build do not establish timetable correctness.

Before a pilot, prepare a fixed set of permitted, anonymized samples with human-checked answers. Include all three languages, clear and poor screenshots, clipped headings, merged cells, odd/even weeks, holidays, multiple rules, overnight events and missing dates. Keep development samples separate from final evaluation samples. Do not upload real samples without permission.

Compare typing from scratch, local-only import and each cloud provider/model on the same inputs. Include taking the screenshot, selection, processing, review and correction in total completion time. Balance task order to reduce the benefit of remembering a sample. Record exact tool/model versions, settings, sample counts and hardware. Report:

- Exact field accuracy for titles, weekdays, times, rooms and week rules.
- Correct complete rules and expanded dates before human correction.
- Missing, invented and duplicate entries; include rejected inputs in the coverage report.
- Correction rate, time to finish review, processing time, peak memory and installed size.
- Cloud request usage and measured cost, separately from local resource use.

Set a numeric time-saving target for declared supported inputs before the final evaluation. Report where manual entry is faster and where cloud help adds no value. Use field and date accuracy to explain correction work and final errors, not as the only success measure. Do not choose a flattering percentage after seeing results or hide language/layout failures in one number. Narrow supported scope when it fails. Every selected entry still needs review and validation. No silent writes, dropped rows, automatic uploads or partial commits are acceptable.

Future failure checks include cancellation, late responses, duplicate confirmation, changed source files, corrupt images, excessive pixels, offline use, model download failure, unavailable key stores, wrong keys, quota errors, timeouts, unsupported image input and invalid AI output. Verify that records stay unchanged before confirmation, errors preserve drafts, secrets stay out of exports/logs and local use survives cloud failure. These checks are planned, not passed.

## References

Official tool information was reviewed on 2026-11-11. Recheck it when selecting versions. These sources describe tools, not Cadence's measured accuracy.

- [RapidOCR source and license](https://github.com/RapidAI/RapidOCR)
- [RapidOCR installation and inference engines](https://github.com/RapidAI/RapidOCRDocs/blob/main/docs/install_usage/rapidocr/install.en.md)
