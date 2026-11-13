# School consultation and demonstration guide

Updated: 2026-11-13. Status: deferred reference only under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). School research and application preparation are outside the current milestone. The guide below applies only if the extension is selected later. No consultation, application or message is sent by this document. No school endorsement, academic interface or access permission is established.

Cadence is a local time-management and planning app for work, study and daily life. Direct tasks, deadlines, personal plans, Today and Week remain central. Build Windows first, then validate Android. A school discussion is a separate way to learn whether an official read-only timetable source can be offered. It must not delay the independent local release. Screenshot recognition is optional only if later need justifies it.

[LEARNING.md](LEARNING.md) owns current implementation, automated checks and pending manual acceptance. The task exercise and concept website must be labelled separately from the planned product. Do not repeat old test counts here.

## Before a full scheduling demonstration

Show only implemented and accepted behavior. A full planner demonstration needs direct editing, date rules, the saving/temporary choice, restart recovery and private backup/restore to pass their relevant checks. Explain offline behavior and failure limits truthfully. These conditions are not established by this document.

Before that milestone, use the current task exercise and clearly marked static or interactive concept views. Use fictional names, classes, rooms, deadlines and personal appointments. A connection concept may show a fictional source response entering an editable review; label it simulated. No real school login, credentials, records or source calls are needed.

## A future three-minute demonstration

This stable section describes a possible demonstration sequence, not a pitch script or a claim that the features work. Personal applications, speech scripts and correspondence stay outside this public repository.

| Step | Show when implemented | What to learn |
|---|---|---|
| Choose saving | Save on this device or Temporary use, with clear persistence limits | Whether the choices are understandable |
| Plan ordinary work | Enter a task deadline and an independent work session; move the session without changing its deadline | Whether the general planning loop is useful |
| Read commitments | Today and Week with fictional classes, meetings and personal plans | Whether times, locations and available intervals are clear |
| Correct a change | Change one occurrence's room or time, cancel and restore it | Whether scope and results are understandable |
| Recover | Restart saved data and restore a private backup after a truthful preview | Whether recovery is usable without developer help |
| Discuss a source | A labelled simulated read-only source and review draft, if useful | Whether an official source could reduce entry effort |

Product language support remains Japanese, English and Chinese. Check each claimed target, language and accessibility behavior. A desktop concept does not establish phone acceptance.

## Consultation topics

Keep the first discussion bounded. Ask whether a supported read-only API or official calendar feed exists, who owns it and whether an independent student project can apply. Establish the permitted data, users, authentication route, retention, update frequency and contact for changes. Ask for documentation or fictional samples before private records. Do not assume approval, a particular interface or a decision date.

A login method alone does not establish timetable access. A teacher's advice, a student's consent or attendance at a demonstration does not grant system permission. Do not ask users to give Cadence their school password, bypass access controls or scrape authenticated pages.

Use [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) for conditional access gates and known source gaps. The proposed first connection, if separately approved, is read-only. A captured snapshot and a tested live refresh are different capabilities. No grades, attendance, registration changes or school write-back are part of the proposed scope.

## Local use and optional integration

General local use and publication require no school membership or permission. A delayed or rejected access request must leave direct editing and local release useful. Screenshot recognition is not an automatic fallback commitment.

Personal Google-login sync remains a different future service under [CLOUD_SYNC.md](CLOUD_SYNC.md), deferred until review after store launch. Google sign-in grants no academic access. Its JPY 2,500 monthly planning budget does not establish the cost of an institutional connection or hosted proxy.

Keep any personal application draft, institutional replies, participant information and private source samples outside this public repository. Document only appropriate public requirements and confirmed non-sensitive facts. No outreach, submission, credential registration or integration implementation is authorized by this guide.
