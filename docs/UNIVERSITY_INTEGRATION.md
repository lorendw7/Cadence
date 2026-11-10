# Optional university connection reference

Updated: 2026-11-11. Design and consultation preparation only. No school permission, supervisor commitment or usable timetable interface has been confirmed. This document describes an optional connection for the [general planning product](PRODUCT.md); Cadence is not an official university service.

The general local planner, and any later general Web client, do not require school permission for publication or use. [ADR-007](adr/007-general-purpose-local-planner.md) replaces the earlier school-gated Web direction. This document retains Kyushu University research only as an optional integration reference, not a product audience or release requirement. Authentication, school-data reading, retention and export each need permission for that connection. Preview-and-save flows below apply only when the user chooses saving and retention is permitted. Temporary viewing must not write to a database, persistent draft or automatic backup.

## Purpose and scope

Independent manual planning does not require school identity or system access approval. Use the [school demonstration brief](SCHOOL_DEMO.md) to discuss needs first. Willingness to watch a demonstration is not school authorization. A later connection could reduce first-time timetable entry and maintenance. Keep these capabilities separate:

| Capability | Conditions to confirm | Intended result |
|------------|-----------------------|-----------------|
| School authentication | Project eligibility, school contact, authentication permission and protocol | Confirm identity through a school-approved method |
| Read-only import of the user's own timetable | Data-owner permission, an available API or export format, and allowed fields | Preview before importing necessary course, date, time and room data |
| Checking timetable changes | Reading frequency, change semantics and operating responsibilities | Show changes for review, their source and the last successful check |

Successful authentication is not permission to read timetable data. If the school offers users a timetable file that can be exported without an application login, consider adapting that file first. No specific export feature or format has been confirmed. Without an approved data route, continue local manual work and introduce JSON operations only after their own implementation and acceptance. Fixed-template CSV and paste are later desktop plans and are outside the initial Web scope. The Web planner is not implemented.

## Previously reviewed school materials

The project notes record a review of these public materials on 2026-11-10. The English summary below preserves that research; it is not a fresh verification of current school requirements. Confirm the current terms with the school before applying.

- The university-wide authentication service terms, marked last revised on 2022-11-28, describe an internal staff administrator or approved contact in Article 3, system eligibility in Article 6, an application at least one month in advance and permission in Article 7, and departmental administration and submission procedures in Articles 12–13. Articles 9 and 11 address annual renewal, not storing passwords and operating duties. See the [official terms](https://web.sso.kyushu-u.ac.jp/documents/rules/ninsyou_youkou.pdf).
- Page 1 of the 2026 student portal guide describes Campusmate-J and warns about third-party timetable applications collecting account passwords. It does not grant permission for automatic access. See the [official guide](https://www.kyushu-u.ac.jp/f/65028/tebiki_2026.pdf).

The review did not confirm a public developer timetable API, student-project eligibility, fees, approval time or readable fields. A requirement to apply a month in advance is not a promise of approval within one month.

## Supervisor and school roles

Ask a current Kyushu University supervisor to help identify project eligibility, the responsible school contacts and the data owner. If the supervisor is willing to take on duties, separately confirm whether they can serve as an approved contact. Supervisor support does not itself grant system access; the project still needs to meet school requirements and complete approval.

| Role | Responsibilities to discuss |
|------|----------------------------|
| Student developer or maintainer | Demonstrate the prototype, document required fields and data flow, maintain clients, fix defects and plan withdrawal |
| Supervisor or supporting department | Help establish contact and decide whether to act as the project contact with the associated duties |
| Departmental administration and responsible staff | Handle the application and departmental review under school rules |
| School authentication team | Confirm eligibility, authentication methods, application requirements and permission conditions |
| Academic-system team or data owner | Confirm access to the user's own timetable, format, limits, field meanings and support |

These are proposed roles. The school's response determines the actual people and approval process. Consultation can run alongside the local prototype. Integration testing must wait until its scope is clear and authorized.

## Consultation materials and questions

If optional school data is later included in [multi-client synchronization](SYNC.md), separately confirm the server operator, cross-device or cloud retention and export of that data, stable identity, and handling after graduation or loss of eligibility. Permission for school authentication does not automatically cover these uses. Reading a school timetable is different from synchronizing private Cadence data. General personal-data synchronization remains an optional product feature with its own consent and security requirements; it is not controlled by this school integration process.

Prepare a one-page explanation and a demonstration with fictional data. Describe the general local planner first, then the specific student or teacher needs the optional connection would address. State independent status, actual progress, read-only purpose, likely integration-pilot size, required fields, storage locations, maintainer and graduation handover plan. Do not describe unfinished features as available.

1. Is the student project eligible? Can a supervisor or department act as its contact, and what materials are required?
2. Is there an API or downloadable file for a user's own timetable? Which faculties, graduate schools, semesters and irregular classes does it cover?
3. Who separately approves authentication and timetable reading? Which fields, purposes and retention periods are allowed?
4. Which authentication methods are allowed for desktop and Web clients? Is an intermediate service, test environment or named operator required?
5. What are the request limits, session lifetime, change-notice arrangements, support contacts and conditions for stopping access?
6. What requirements apply to renewal, fees, operating records, incidents and changes of maintainer?

## User flow

The basic product entry should offer manual planning and file operations only as they become implemented and accepted, without requiring school credentials. Do not present future paste/import work as already available. Show a usable school connection only when its method is authorized and tested; do not offer a fake login while access is unavailable.

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
