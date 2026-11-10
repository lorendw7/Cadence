# Optional school demonstration reference

Updated: 2026-11-11. Reusable reference for a possible school audience, not the product's main positioning. Nothing in this document has been sent to anyone. Cadence is a general local time planner for work, learning and everyday life, without a required account or affiliation. It has no school endorsement or academic-system access permission. See [ADR-007](adr/007-general-purpose-local-planner.md).

The current desktop learning app supports validated task addition, completion, deletion and undo of the latest deletion in memory. Lessons 1–10 have passed automated acceptance with 26 tests; manual deletion/undo and title-validation confirmation remain pending. Scheduling, local saving and a working Web planner are not implemented. The website uses fictional examples to present the intended design.

## Before a full scheduling demonstration

Verify manual scheduling and tasks, the first-use choice between Save on this device and Temporary use, and core operation without a network connection. JSON preview, cancellation, import, export, failure and data clearing must pass the relevant acceptance checks. The privacy explanation must match the running code. These conditions are not yet met.

For now, label the task exercise as the current learning app and the website as a concept preview. Do not describe the designed screens as completed features. General product publication does not need school permission. A future school-system connection would need its own authorization; consultation or a demonstration does not grant it.

## A future three-minute demonstration

Use this English script after the described features have been implemented and tested. Product language support remains Japanese, English and Chinese. For any other audience, replace the final school-specific questions with that audience's needs; the core demonstration stays the same.

**Introduction:** Cadence is a local time planner for anyone organizing work, learning and daily life. It brings plans and tasks together without requiring an account, school identity or online service. This is an independent project. The purpose of the demonstration is to learn about real planning needs.

**Walkthrough:** Start with the explicit choice between Save on this device and Temporary use. Use fictional data to open Today and Week. Add focus time, a meeting or a personal appointment, give a weekly repeat an end date, and edit or delete a plan. Add and complete a task. Show the same core actions while offline. Switch among Japanese, English and Chinese. Explain which data lasts after closing and demonstrate backup and recovery only where they have passed acceptance. Ordinary planning requires no course or semester setup.

**Scope:** The core is local plans, tasks and a readable week. Courses, academic calendars and timetable imports are optional extensions. A Web client and cross-device synchronization are optional later work, not conditions for local use. Do not imply that a school pilot, cloud account or browser app is necessary to use the desktop planner.

**Data handling:** The intended first-use choice decides whether personal planner data is saved on the device or remains only in memory. Temporary data is lost when the app closes and must leave no persistent drafts or automatic backups. Local saving works offline, but does not by itself provide encryption or a separate backup. Use a clean demonstration device and fictional data. Private JSON exports contain plans and tasks; deleting app data cannot retract exported or shared files. Verify every statement against the implementation before presenting it as a working capability.

**Optional later Web example:** If a browser client is eventually developed, explain its storage and import behavior separately from desktop. The earlier Web backup design uses a 1 MiB and 2,000-record limit, strict validation and preview before whole-dataset replacement. Browser storage is not encrypted and may be cleared. Hosting still handles page requests. Recheck that design and its acceptance before demonstrating it; it is not currently available.

**Feedback for this school audience:** Ask about planning needs in work, learning and daily life, language and accessibility, a few voluntary pilot users, and fictional or properly anonymized examples. If a course extension would help, ask which academic rules matter. Only if an official connection is requested, ask for the relevant contact and discuss data formats, access permission and maintenance responsibilities separately.

## Local use and optional integration

General local use and publication require no school membership or school approval. Attendance at a demonstration, a teacher's advice and a student's agreement to try the app do not grant authentication or API access. A school connection must be authorized under [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md), without becoming a dependency for the general planner or for people who do not use that connection.
