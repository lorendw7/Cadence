# Optional school demonstration reference

> Historical reference only. [ADR-010](adr/010-open-multiplatform-free-first.md) now targets a free local edition on desktop, Web, Android and iOS. Cloud sync and income are for review after store launch. School connections stay excluded. The proposals below do not authorize implementation or override the current [roadmap](ROADMAP.md).

Updated: 2026-11-11. Reusable reference for a possible school audience, not the product's main positioning. Nothing in this document has been sent to anyone. Cadence is a general local time planner for work, learning and everyday life, without a required account or affiliation. It has no school endorsement or academic-system access permission. See [ADR-007](adr/007-general-purpose-local-planner.md).

The current desktop learning app supports validated task addition, completion, deletion and undo of the latest deletion in memory. Lessons 1–10 are accepted, lessons 11–13 are implemented, and all 27 tests pass. The learner confirmed deletion and undo in an actual window; title validation, theme, responsive-layout and keyboard checks remain open. Scheduling, local saving and a working Web planner are not implemented. The website uses fictional examples to present the intended design.

## Before a full scheduling demonstration

Verify manual scheduling and tasks, the first-use choice between Save on this device and Temporary use, and core operation without a network connection. JSON preview, cancellation, import, export, failure and data clearing must pass the relevant acceptance checks. The privacy explanation must match the running code. These conditions are not yet met.

For now, label the task exercise as the current learning app and the website as a concept preview. Do not describe the designed screens as completed features. General product publication does not need school permission. A future school-system connection would need its own authorization; consultation or a demonstration does not grant it.

## A future three-minute demonstration

Use this English script after the described features have been implemented and tested. Product language support remains Japanese, English and Chinese. For any other audience, replace the final school-specific questions with that audience's needs; the core demonstration stays the same.

**Introduction:** Cadence is a local time planner for anyone organizing work, learning and daily life. It brings plans and tasks together without requiring an account, school identity or online service. This is an independent project. The purpose of the demonstration is to learn about real planning needs.

**Walkthrough:** Start with the explicit choice between Save on this device and Temporary use. Use fictional data to open Today and Week. Add focus time, a meeting or a personal appointment, give a weekly repeat an end date, and edit or delete a plan. Add and complete a task. Show the same core actions while offline. Switch among Japanese, English and Chinese. Explain which data lasts after closing and demonstrate backup and recovery only where they have passed acceptance. Ordinary planning requires no course or semester setup.

**Scope:** The core is local plans, tasks and a readable week. Courses, academic calendars and timetable imports are optional extensions. Web and synchronization are considered only when the school connection needs them; they are not conditions for local use. Do not imply that a school pilot, cloud account or browser app is necessary to use the desktop planner.

**Data handling:** The intended first-use choice decides whether personal planner data is saved on the device or remains only in memory. Temporary data is lost when the app closes and must leave no persistent drafts or automatic backups. Local saving works offline, but does not by itself provide encryption or a separate backup. Use a clean demonstration device and fictional data. Private JSON exports contain plans and tasks; deleting app data cannot retract exported or shared files. Verify every statement against the implementation before presenting it as a working capability.

**School connection example:** Start with a permitted file or read-only local adapter that produces an editable preview. Consider Web or synchronization only if the actual school interface needs it. Explain any browser/server data flow, retention and operating cost separately. None of these connection features is implemented.

**Feedback for this school audience:** Ask about planning needs in work, learning and daily life, language and accessibility, a few voluntary pilot users, and fictional or properly anonymized examples. If a course extension would help, ask which academic rules matter. Only if an official connection is requested, ask for the relevant contact and discuss data formats, access permission and maintenance responsibilities separately.

## Local use and optional integration

General local use and publication require no school membership or school approval. Attendance at a demonstration, a teacher's advice and a student's agreement to try the app do not grant authentication or API access. A school connection must be authorized under [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md), without becoming a dependency for the general planner or for people who do not use that connection.
