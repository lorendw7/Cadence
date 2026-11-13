# ADR-012: Easier import and phone access for a shared time planner

**Status:** Partly superseded by [ADR-013](013-local-planner-and-conditional-academic-access.md). General planning, Windows first and Android next remain. Screenshot import is now optional and unscheduled; school access is deferred. The original decision below records the prior scope, not current release requirements.
**Date:** 2026-11-13
**Decider:** The maintainer adopted options B and C, retained desktop development first, and confirmed that time management and general planning remain central.

## Context

The [timetable survey](../SURVEY_FINDINGS.md) has ten responses to each question. Seven selected phones for viewing. Four required semester import before accepting manual updates. Only two explicitly accepted fully manual setup. These are separate counts from a small sample. They support testing entry effort and compact viewing, not a claim of proven demand or mobile operating-system preference.

The maintainer chose import and phone access as product priorities, then clarified two points: keep desktop and develop it first using the shared Flutter codebase; keep time management and planning important beyond timetables. The current code remains an in-memory task exercise. No storage, import, calendar or mobile acceptance is established by this decision.

## Decision

1. Keep Cadence a free local time planner for work, study and daily life. Tasks, deadlines, personal plans, Today and Week are first-class features. A course timetable is one source of commitments, not a required identity or setup step.
2. Make reviewed screenshot import part of the first useful product. Build useful direct editors first, then accept existing PNG/JPEG screenshots into a shared editable draft. Inspect real permitted images and test local OCR plus layout interpretation early. Use internal draft examples to teach review without a CSV parser. The maintainer rejected CSV-first because suitable table files are not available; CSV/table import is deferred until a real export-file need appears. Do not claim universal image support or ask users to retype a timetable into a template.
3. Use one flow: bring commitments into the planner, see available time, reserve work before a deadline, check Today, and adjust plans. A deadline is distinct from a work session. Planned time does not measure actual work.
4. Develop the first complete flow on Windows. Include local saving or temporary use, reviewed import, daily and weekly planning, minimal occurrence corrections, and backup/recovery. Keep phone-sized layouts in the design from the start.
5. Adapt and validate Android next after the working Windows flow. Do not wait for complete macOS/Linux releases before phone work. Android is a practical first phone target from the current development environment, not a preference measured by the survey. Schedule iOS when a suitable host and devices are available. Retain macOS, Linux and Web with separate native or browser acceptance.
6. Share Dart models, validation, date expansion, import drafts and application behavior. Adapt presentation and platform access where needed. Shared source does not prove that file pickers, storage, process recovery, touch input or an OCR engine work on every target.
7. Add bounded weekly repeats and the minimum manual correction flow for one occurrence: time/room change, cancellation and restoration, with a clear preview. Keep stable occurrence identities, prevent double display, and include changes in backup. Add teaching-week/odd-even rules only when the chosen supported input needs them; flag unsupported rules before saving.
8. Keep local use independent of an account or network. Use one free feature set under MIT. School login, scraping and automatic academic update feeds remain excluded. Personal sync cannot supply school timetable changes.
9. Retain [ADR-011](011-optional-sync-service.md): optional Google login with Node.js, TypeScript, Fastify and PostgreSQL, planned at JPY 2,500 monthly. Service implementation and ads remain for review after store launch. This product decision does not buy hosting or require a backend for import.

## Options considered

| Option | Benefit | Limit | Result |
|---|---|---|---|
| A alone: generic manual desktop planner | Small initial platform scope; useful general model | Does not address the reported setup burden or phone viewing | General planning retained; manual-only positioning rejected |
| B plus C, mobile implementation first | Tests the preferred viewing context directly | Interrupts the chosen desktop learning path and adds native work immediately | Phone experience retained; development order changed by the maintainer |
| B plus C, Windows implementation first, shared phone flow next | Keeps the teaching environment and validates the full planning loop before platform adaptation | Requires discipline to avoid delaying phones behind every desktop feature | Selected |
| Automatic school timetable service | Could meet the continuous-update condition in some responses | Requires excluded source integrations and does not follow from Google login | Excluded |

## Consequences and precedence

This changes import from a late extension into a core product priority. Minimal class-occurrence correction is no longer deferred in the useful timetable flow. General planning remains central under ADR-007. This partly supersedes ADR-008's import/occurrence limits and ADR-010's requirement to finish all desktop validation before mobile work. Their local data, free access, independence and learning rules remain.

Windows remains the first development and working-product target. Phone access is a planned follow-on milestone, not an unspecified future possibility. More platforms still add work. Preserve the existing journal identity, three product languages and GitHub Pages concept website. The site is not a working planner.

The learner writes core features in small lessons through lib/main.dart. This documentation decision adds no packages, source adapters, platform runners or feature code. Historical lesson results stay unchanged.

## Follow-through

- [ ] Continue the current async and local-saving lessons without claiming new completion.
- [ ] Inspect real screenshot examples and set supported-layout limits before writing recognition adapters.
- [ ] Complete the Windows import-to-planning flow and recovery checks.
- [ ] Compare total setup effort and daily lookup against current methods; test work and personal planning separately from the timetable survey.
- [ ] Validate the same records and rules on Android, including manual backup transfer and platform failures.
- [ ] Publish only accepted platform builds, then review further clients and later service operation.

[PRODUCT.md](../PRODUCT.md) owns priorities. [ROADMAP.md](../ROADMAP.md) owns the development order and gates. [DESIGN_OPTIONS.md](../DESIGN_OPTIONS.md) retains the comparison and study measures.

## References

Reviewed 2026-11-13: [Flutter desktop support](https://docs.flutter.dev/platform-integration/desktop), [adaptive layouts](https://docs.flutter.dev/ui/adaptive-responsive), and [platform-specific code](https://docs.flutter.dev/platform-integration/platform-channels). These explain reuse and platform boundaries; they do not establish Cadence's runtime support.
