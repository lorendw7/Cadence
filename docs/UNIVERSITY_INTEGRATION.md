# Conditional university connection study

> Deferred extension reference under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). No application has been submitted by this documentation work. School access, a usable interface and a responsible school contact remain unconfirmed. The independent local release does not wait for this study.

Updated: 2026-11-13. School research, application preparation and implementation are all deferred. The guidance below applies only if a later scope decision selects this extension; it creates no current tasks. No school permission, supervisor commitment or usable timetable interface has been confirmed. This document describes an optional connection for the [general planning product](PRODUCT.md); Cadence is not an official university service.

The general local planner does not require school permission for publication or use. This study uses Kyushu University because the repository's earlier research concerns that school; a different institution requires its own review. School authentication, timetable reading, retention and export need separate confirmation. Temporary viewing must not write to a database, persistent draft or automatic backup.

Direct editing, Today, Week, tasks and recovery remain the delivery priority. Screenshot recognition is optional and unscheduled, even if the school route is unavailable. Personal Google sync under ADR-011 is a separate later service; its JPY 2,500 monthly plan does not authorize or price a school connection.

## Purpose and scope

Independent manual planning does not require school identity or system access approval. Use the [school demonstration brief](SCHOOL_DEMO.md) to discuss needs first. Willingness to watch a demonstration is not school authorization. A later connection could reduce first-time timetable entry and maintenance. Keep these capabilities separate:

| Capability | Conditions to confirm | Intended result |
|------------|-----------------------|-----------------|
| School authentication | Project eligibility, school contact, authentication permission and protocol | Confirm identity through a school-approved method |
| Read-only import of the user's own timetable | Data-owner permission, an available API or export format, and allowed fields | Preview before importing necessary course, date, time and room data |
| Checking timetable changes | Reading frequency, change semantics and operating responsibilities | Show changes for review, their source and the last successful check |

Successful authentication is not permission to read timetable data. Ask whether the school offers an official read-only API or a personal calendar feed, such as iCalendar/ICS, and whether Cadence may use it. A user-authorized official file is another possible route if it actually exists. No API, feed or export format has been confirmed. Do not ask users to make CSV files or assume that a downloadable page permits automated access. Without an approved route, continue the local planner.

## Documented source boundary

This section describes a conditional interface, not new code, a promised school API or permission to call one. The school's actual data contract determines the design. Independent Web and personal-sync plans are not restricted to a school use case.

Prefer the smallest approved read-only route. A direct client may be enough for an authorized feed or API; do not create a server without a protocol requirement. Keep passwords on the school's approved authentication surface. A private calendar-feed URL may itself be a credential and must stay out of logs, exports and public issues.

| Operation | Input | Output and limits |
|---|---|---|
| Describe source | A supported school and interface version | Supported fields, date range, access method and known limits |
| Read snapshot | Explicit user request, permitted connection context and bounded academic period | Candidate rows with source IDs if available, timezone/week context, completeness and source warnings |
| Review changes | Candidates and current local records | Editable additions/changes and possible duplicates; no write yet |
| Apply reviewed batch | Confirmed preview and current local state | One validated local transaction; failure preserves existing records |
| Disconnect | The selected connection | Stop access and clear its credentials; do not delete unrelated local plans |

Keep this mapping at the application boundary. Source adapters cannot write the database, choose a storage mode or overwrite local edits. Use reviewed candidate records where an approved source needs them; no screenshot or table parser is a prerequisite. Preserve source identity when available; names alone are not reliable keys. An incomplete or failed snapshot is not an instruction to delete courses. Recheck permission before storing or exporting source data.

Only when the approved school protocol requires an intermediary should that connector service be designed. Record why a local adapter is insufficient, what data leaves the device, who operates and pays for it, and how it can be disabled. Keep the existing concept site separate from private data.

Start updates with user-requested read and review. If synchronization is actually needed, specify its direction and source of truth. A school-to-local refresh is not two-way sync of personal tasks. Do not upload independent local data by default. Use only the relevant parts of [SYNC.md](SYNC.md); accounts, server workspaces, queues and conflict protocols are not automatically required. No connection may block independent offline use or general product release.

## Previously reviewed school materials

The two official documents below were reopened and checked on 2026-11-13. The published authentication terms are marked last revised on 2022-11-28. Confirm their application to this student project with the responsible school office; a public document does not establish project eligibility.

- The university-wide authentication terms require a qualifying university staff administrator or contact, define system eligibility, and require an application at least one month before the desired start. The application goes through the relevant departmental administration. This is an authentication process, not a published timetable API agreement. See Articles 3, 6–7 and 12–13 of the [official terms](https://web.sso.kyushu-u.ac.jp/documents/rules/ninsyou_youkou.pdf).
- Page 1 of the 2026 student portal guide describes Campusmate-J and warns about third-party timetable applications collecting account passwords. It does not grant permission for automatic access. See the [official guide](https://www.kyushu-u.ac.jp/f/65028/tebiki_2026.pdf).

The reviewed public material did not establish a developer timetable API, project eligibility, fees, approval time or permitted fields. This is an evidence gap, not proof that no private interface exists. A requirement to apply a month in advance is not a promise of approval within one month.

## Supervisor and school roles

Ask a current Kyushu University supervisor to help identify project eligibility, the responsible school contacts and the data owner. If the supervisor is willing to take on duties, separately confirm whether they can serve as an approved contact. Supervisor support does not itself grant system access; the project still needs to meet school requirements and complete approval.

| Role | Responsibilities to discuss |
|------|----------------------------|
| Student developer or maintainer | Demonstrate the prototype, document required fields and data flow, maintain clients, fix defects and plan withdrawal |
| Supervisor or supporting department | Help establish contact and decide whether to act as the project contact with the associated duties |
| Departmental administration and responsible staff | Handle the application and departmental review under school rules |
| School authentication team | Confirm eligibility, authentication methods, application requirements and permission conditions |
| Academic-system team or data owner | Confirm access to the user's own timetable, format, limits, field meanings and support |

These are proposed roles. The school's response determines the actual people and approval process. Consultation is not scheduled alongside the current local prototype. Integration testing must wait until its scope is clear and authorized.

## Consultation materials and questions

If optional school data is later included in [multi-client synchronization](SYNC.md), separately confirm the server operator, cross-device or cloud retention and export of that data, stable identity, and handling after graduation or loss of eligibility. Permission for school authentication does not automatically cover these uses. Reading a school timetable is different from synchronizing private Cadence data. General personal-data synchronization remains an optional product feature with its own consent and security requirements; it is not controlled by this school integration process.

Prepare a one-page explanation and a demonstration with fictional data. Describe the general local planner first, then the specific student or teacher needs the optional connection would address. State independent status, actual progress, read-only purpose, likely integration-pilot size, required fields, storage locations, maintainer and graduation handover plan. Do not describe unfinished features as available.

1. Is the student project eligible? Can a supervisor or department act as its contact, and what materials are required?
2. Is there an API or downloadable file for a user's own timetable? Which faculties, graduate schools, semesters and irregular classes does it cover?
3. Who separately approves authentication and timetable reading? Which fields, purposes and retention periods are allowed?
4. Which authentication methods are allowed for desktop and Web clients? Is an intermediate service, test environment or named operator required?
5. What are the request limits, session lifetime, change-notice arrangements, support contacts and conditions for stopping access?
6. What requirements apply to renewal, fees, operating records, incidents and changes of maintainer?

## Scope to propose first

Request the smallest useful connection: one user's course title, date or week rule, start/end time and room for one bounded term. Ask for stable source IDs and last-change information if available. Begin with a user-requested read and review, without background polling or automatic notifications.

| Available route after consultation | Next step | Release effect |
|---|---|---|
| Official permitted calendar feed or export | Check field coverage, private-link handling and refresh semantics; estimate a bounded adapter | Local release remains independent |
| Documented API with approved authentication and test access | Map own-user scope, review/save behavior, retention and failures before a limited pilot | Add the conditional integration effort in ROADMAP |
| School login only, without data permission or interface | Clarify data access separately; do not scrape the portal | No connected-release date |
| No eligible contact, no approved route or no response | Keep the consultation open only if useful; continue direct planning | No delay to local release and no automatic OCR project |

Do not promise live changes merely because an API or feed exists. Completeness, cancellation meaning, refresh limits and permitted background behavior need agreement. A school may require a server or named operator; re-estimate its development and recurring cost separately before committing.

## Prototype and release timing

The [roadmap estimate](ROADMAP.md#maintenance-and-estimates) uses the maintainer's 10-15 hours per week. A fictional-data local demonstrator can be prepared before school access. It must label unavailable storage, recovery or connection behavior.

School response time is unknown. After authorization, a documented interface and test access, the roadmap gives a conditional connected-prototype estimate and a separate production-integration allowance. Those hours are additional to local product work. The current schedule allocates no time to consultation or integration.

A connected release needs both the local product gates and the school's relevant test/production permission. A local release needs only its own gates. Keep application drafts, named contacts, credentials and responses private. Nothing in this document is a submitted request.

## User flow

The basic product entry should offer direct planning and recovery only as they become implemented and accepted, without requiring school credentials. Do not present conditional import work as already available. Show a usable school connection only when its method is authorized and tested; do not offer a fake login while access is unavailable.

The planned connection flow is: explain reading scope and storage → user chooses to connect → school-approved authentication → read permitted data → flag unsupported or missing fields → preview semester mapping, duplicates and conflicts → user confirms → commit in the selected storage mode. The authorized interface determines protocols and callbacks; do not assume OAuth, SAML or a middle server is available.

On refresh, show additions, changes, cancellations and uncertain items. Preserve local notes and user adjustments. A failed or partial response must not mean that every course was deleted. A missing source item is not automatically a cancelled class; require clear source semantics and user confirmation. Without a source ID, use manual matching rather than merging on course name alone.

Show the source, import or last successful check time, and pending changes. Do not label manual import as real-time synchronization. When offline, authentication expires or the school stops service, previously saved timetables may remain usable only where retention is allowed. Mark stale information and advise checking the school's source. Temporary viewing does not create an offline copy.

## Privacy and maintenance

- Do not collect or store school passwords, or substitute simulated-login scraping for an approved connection.
- Initially request only data needed for the user's own timetable. Do not read grades or other students' data, or perform course registration, withdrawal or grade changes.
- Personal plans, tasks and private notes stay local in the base design. Before any future online flow is enabled, explain its purpose, recipients and deletion behavior.
- If an approved protocol needs sessions or tokens, follow [SECURITY.md](SECURITY.md) for storage, expiry and revocation. Exclude credentials from sharing, backups and issue reports.
- Disconnecting stops access and removes local credentials. Revoke remote authorization where the protocol allows and report the result. Imported courses may remain offline only where retention is allowed; provide a separate removal action without deleting unrelated personal plans.
- Before public integration, establish the maintainer, costs, permission renewal and graduation handover. Treat school-required operating records separately from product analytics, with limits on content and retention.

## Acceptance gates

1. **Consultation:** record the school's response, eligibility, contact, permitted data route and open questions.
2. **Authorization:** retain permission scope and conditions. Confirm authentication and timetable reading separately; keep unapproved capabilities disabled.
3. **Limited pilot:** verify own-data scope, refusal and revocation, expiry, duplicate import, partial failure, freshness and local conflicts.
4. **Wider use:** cover the stated user groups and clients. Complete the privacy notice, maintenance handover, interface-change response and a drill for stopping access.

The general local product and representative pilot follow [ROADMAP.md](ROADMAP.md), independently of this optional school process. Record school-access approval separately. Connection failure must not disable the local planner or affect users who have no school connection.
