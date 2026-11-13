# Design options after the timetable survey

Updated: 2026-11-13. Status: the B plus C direction from [ADR-012](adr/012-import-first-phone-planner.md) is refined by [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). Deliver the general local planner first. Research authorized academic access separately. Screenshot import is optional and unscheduled. The [10-response survey](SURVEY_FINDINGS.md) is early evidence, not proof of demand. This file retains the comparison and the measures used to refine the workflow. [PRODUCT.md](PRODUCT.md) owns current priorities.

## Recommended direction

The maintainer retained **less setup effort and clear phone access** as goals, with general planning and desktop development first. Build one shared Flutter product: capture commitments, inspect available time, reserve work before a deadline, check Today and adjust. Implement the useful local flow on Windows, then adapt Android without waiting for every macOS/Linux release. Phone layout is designed from the start. Screenshots are no longer a required delivery stage. A possible application for school-approved read-only access is a deferred extension, not an approved connection or a reason to delay local release.

This selection follows two separate findings: 4/10 responses require semester import before they would use the tool, and 7/10 mainly view timetables on phones. We do not know whether those are the same respondents. Only 2/10 explicitly accept fully manual setup. A manual desktop timetable therefore has weak support as the main student offer in this sample.

Tasks, deadlines, personal appointments and weekly planning remain first-class features by product decision. This questionnaire did not test their broader demand, so study work and personal routines separately. Import is one way to populate commitments. A new cloud account and server would not by itself solve entry effort or phone readability.

## Compare the options

| Option | Main promise and smallest useful flow | Match to the survey | Cost and difficulty | Decision status |
|---|---|---|---|---|
| A. General local desktop planner | Capture a task, set a deadline, reserve time, inspect Today/Week and recover saved data without an account | Covers broader work and life needs that this timetable survey did not test; computer viewing was 2/10 | No recurring Cadence sync server needed. Lowest new platform burden; dependable saving and recovery still take work | General planning and desktop retained within B plus C. Validate broader work/life routines separately |
| B. Easier timetable setup | Enter commitments directly first; study an approved read-only academic source as a possible later route into a reviewed draft | Addresses entry friction and the 4/10 conditional import answers; clearer viewing was the largest current pain | Approval, available fields, authentication and date rules are unknown. A school connection can require separate operation and testing | Goal retained; direct editing is the baseline. Authorized access is a deferred extension. Screenshots remain optional on demonstrated need |
| C. Phone-first timetable viewer | Open directly to today's classes and the next time/room, then inspect the week; retain chosen data locally | Best match to the 7/10 phone-viewing answers and the screenshot workaround | Local-only viewing can avoid a sync bill. Mobile lifecycle, file handling, testing and store delivery add work. A phone screen alone does not remove entry friction | Adopted phone-access priority. Design compact views now; implement and validate after the working Windows flow |

B and C remain product goals rather than a promise that every import route ships first. Direct editing makes the first local product useful while access feasibility is unknown. A's general planning functions remain central. The resulting product must support choosing and adjusting work time, not only displaying classes. A narrow desktop layout alone does not establish phone support. A manual release must not be presented as satisfying respondents who required automatic import.

Android is the first planned phone validation target for practical development reasons, not because the survey identified an OS. iOS needs a suitable host and devices. macOS/Linux and Web retain separate gates. Reuse models and date rules; verify file access, storage, lifecycle and touch on each target. If an import route is added later, verify that route separately. Keep the existing concept website.

## Accepted user flows

### A. Capture and plan without setup

Choose local saving or temporary use. Type a task title. Add a deadline only if one exists. Inspect Week and create a separate work session through the normal plan editor. Return to Today and finish the task. In local-saving mode, find the confirmed saved data after restart. In temporary mode, explain loss on close and offer explicit export before leaving.

Keep optional details out of quick capture. Label deadlines and reserved time separately. A moved work session does not change the deadline. An optional "Reserve time" action may prefill a new plan title; it must still ask for start/end and explicit Save. It creates an independent plan, not a hidden task link or automatic completion rule. Test this shortcut before adding it to the feature baseline.

### B. Reach a useful timetable with less entry

First use the ordinary editor for a class or another recurring commitment. A title, actual time, bounded dates and optional location are enough. Keep editing, correction and phone lookup useful even if no school interface is offered.

The maintainer rejected a CSV-first flow because users do not have suitable table files and can edit directly in the app. CSV/table import waits for a real export-file need. The latest decision also makes screenshots optional: investigate them only if observed use justifies the work. The survey's 4/10 screenshot answers describe viewing habits, not demand for OCR or proof of accuracy. The retained [screenshot design](QUICK_IMPORT.md) is not a release gate.

The deferred [academic-access study](UNIVERSITY_INTEGRATION.md) should first establish whether an official read-only API or calendar feed is available and whether Cadence may use it. If approved, start with one institution and a user-triggered retrieval into a reviewed draft, with dates and duplicates checked before saving. No approval, API, feed or authentication method is verified. Do not collect school passwords, scrape login pages or promise live changes. A mock prototype demonstrates the proposed interaction only; a working source connection needs separate permission and tests.

Measure the whole journey: finding the source, preparing it, correcting the draft and checking the saved timetable. Recognition speed alone is not the benefit. A plain weekly plan cannot express every semester or single-class change. Reject unsupported rules clearly; do not flatten odd/even weeks or a one-off room change into the wrong series. Minimum one-occurrence time/room change, cancellation and restoration now belong in the useful timetable flow. More complex course patterns stay conditional on the declared supported input.

### C. Check the next class quickly

The compact Today screen shows the date, current or next commitment, start/end and location before secondary controls. A commitment can be a class, meeting or personal appointment. Tasks and available work time remain easy to reach. Include a readable daily list and an easy Week action. Give an empty day a clear message. A timetable block opens details; it should not require a precise drag or tiny control. Keep dates and rooms readable with long names and larger text.

Compare this concept with the participant's screenshot or current app. Time the full lookup on the device they normally use. Also test a changed room: can they find and correct the right entry, and understand whether the change applies once or to the series? Automatic academic updates are not part of the local release; access research does not promise them.

## Evidence gates for the chosen direction

These are proposed study criteria, not achieved results or statistically representative thresholds. Use fictional data or private permissioned samples. Notes stay outside the public repository. Paper or static screen comparisons can refine the chosen design while implementation proceeds through the roadmap. They are not substitutes for installed Windows and Android acceptance.

| Study | What to record | Proposed decision rule |
|---|---|---|
| Current workaround | Device, actual source format, last troublesome lookup or entry task, and whether the person wants a new tool | Stop targeting a routine where the existing method is already satisfactory |
| Glance test | Time and errors finding the next class, room and one chosen day against the person's current method | A candidate must improve lookup without hiding essential details; revise if it only looks better |
| Setup comparison, if an import route is selected | Direct in-app entry time versus the full authorized-source or screenshot workflow, including review and correction | A useful pilot target is at least 30% less total setup time, with every final time and room checked; failures remain visible. This is not a required screenshot stage |
| Independent use | Help needed, confusing dates, changed-room corrections and understanding of local storage | Resolve incorrect times, data loss and misleading update claims before broader testing |
| Return check | People invited, actual replies, voluntary use over a stated week, and reasons for returning or stopping | Continued use must reflect a real need; stated interest and unanswered invitations do not count |
| Broader planner check | Separate work/home examples for option A | Do not infer generic planner demand from this timetable survey |

Ask which file they can actually provide, whether viewing and entry happen on different devices, and what "automatic import" means to them. Ask about personal cross-device sync separately from automatic class changes. These questions resolve gaps in the existing survey; no second long feature checklist is needed.

ADR-013 records the latest priorities; ADR-012 retains the earlier rationale. Use these studies to improve the planning loop and decide whether an optional input route is worth adding. Record school permission and technical scope before an external connection pilot. A poor result should narrow the feature or revise the interaction; it must not be hidden by a claim that the survey proved success.

## Cost and funding consequences

All three can begin with local data. A local app has no mandatory recurring sync server bill; development time, testing, hardware, distribution and support still cost money. The later accepted service is [Google login with Node.js, TypeScript, Fastify and PostgreSQL](CLOUD_SYNC.md), planned at **JPY 2,500 per month**. It is optional personal data sync, not a timetable source.

Do not rent the service to test a local viewer or editor. An approved academic connection may have different hosting and support requirements; assess them separately rather than assuming the personal-sync budget covers them. Before a later personal-sync pilot, verify repeated cross-device need, tested recovery and the common service limits. A JPY 2,500 budget means JPY 15,000 over six months with no revenue. It is not a hard billing cap.

For native desktop, budget advertising income as zero until a direct sponsor is contracted. For mobile, a hypothetical middle case in the [operating model](VALIDATION.md#illustrative-monthly-operating-model) needs 772 mobile daily active users to cover JPY 2,500. This questionnaire provides no evidence for that scale or for ad acceptance. Web ad approval is also uncertain. Keep one free feature set; neither ads nor payment unlock capacity.

Do not select a product direction just because it can display more ads. The immediate question is whether it saves enough effort for someone to use it again.
