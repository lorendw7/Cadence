# ADR-013: Local planner first and conditional academic access

**Status:** Accepted local delivery priorities; school access and screenshots are deferred extensions.
**Date:** 2026-11-13
**Decider:** The maintainer asked to explore applying for academic-system access and to build screenshot import only if it becomes necessary.

## Context

[ADR-012](012-import-first-phone-planner.md) retained general planning, Windows development first and Android next, but required screenshot import in the first useful product. The maintainer has now removed that requirement. They also asked how a possible school connection would affect prototype and release timing. The maintainer then clarified that school access is also a later extension, including research and application preparation. It does not confirm that a school offers an API or will approve this project.

The app still has in-memory tasks only. The learner writes new core features. The small timetable survey supports testing entry effort and phone viewing, but does not prove demand for a manual planner or establish school access.

## Decision

1. Deliver useful direct task, plan and timetable editing first. Keep deadlines, Today, Week, available time, bounded repeats, occurrence corrections and safe local recovery central. A timetable is one kind of commitment.
2. Complete the Windows local flow, then validate Android. Retain iOS, macOS/Linux and Web with separate acceptance. General releases need no school permission.
3. Remove screenshot recognition from the first-release requirements and fixed schedule. Reconsider it only if observed user need justifies its total setup and correction cost. CSV/table import also remains deferred. Neither is a prerequisite for planning, phone access or a school demonstration.
4. Defer school feasibility, application preparation and integration. Keep existing research as reference, not an active parallel track. If selected later, confirm eligibility, a responsible contact and an official read-only route to the user's own timetable. Prefer an approved API or calendar feed if one is offered. Do not assume any particular protocol, export or interface exists.
5. Keep actual integration conditional on documented permission, the data contract and test access. Authentication permission does not grant timetable-reading rights. Do not collect school passwords, scrape logged-in pages, write registrations or access grades or other students' records.
6. Start an authorized connection with user-requested read, review and explicit save. Show source and freshness. A snapshot is not a promise of automatic change notices. Failed or incomplete reads must not erase records. Retention, backup and cloud export of school data each need permission.
7. Focus current effort on local planning and Windows-to-Android delivery. No school inquiry, application or connector is scheduled. A later extension needs its own scope decision and estimate. Neither school access nor screenshots block release.
8. Retain the optional personal-sync stack and JPY 2,500 budget in [ADR-011](011-optional-sync-service.md), with implementation and ads reviewed after store launch. School access is a separate service and cost decision. Google login does not grant academic-system access.

## Options considered

| Option | Benefit | Cost or uncertainty | Decision |
|---|---|---|---|
| Wait for school approval before building the planner | Focuses all work on one integration | Unknown eligibility, interface and response time block useful local work | Rejected |
| Keep screenshot import as a launch requirement | Could reduce timetable entry | OCR packaging and correction add work without a confirmed need | Deferred without a scheduled date |
| Build the local planner; defer school research and integration | Concentrates effort on planning, recovery and phone access | Easier academic setup remains a later question | Selected after the maintainer's clarification |

## Consequences and precedence

This supersedes ADR-012's mandatory screenshot route. School access remains a possible later extension; research and applications are not current work. The earlier school-gated general Web release is not revived. Other local, free-access, learning and platform rules remain.

The [roadmap](../ROADMAP.md#maintenance-and-estimates) separates demonstrator, local release, integration effort and external waiting time at 10-15 development hours per week. No parallel consultation is scheduled; the time budget serves the local product. Estimates exclude unscheduled screenshot work. A school-connected launch cannot have a reliable date until access conditions are known.

## Follow-through

- [ ] Continue the current lesson and build reliable local saving through learner-owned steps.
- [ ] Demonstrate a task deadline, weekly class, personal appointment and work session using fictional data.
- Later only: revisit eligibility, fields, retention and maintenance questions under [UNIVERSITY_INTEGRATION.md](../UNIVERSITY_INTEGRATION.md).
- Later only: keep any school correspondence private and distinguish advice from permission.
- [ ] Re-estimate local delivery after actual development progress. Estimate school work only if selected later.

No application, email, account, server purchase or integration code is created by this documentation decision.
