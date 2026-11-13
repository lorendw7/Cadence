# Timetable survey findings

Reviewed: 2026-11-13. This is an anonymous aggregate summary of a six-question timetable survey. The owner response page showed **10 responses to each question**. All questions allowed one choice. The tables translate the Chinese questions and options into English. Counts are the source values; percentages use 10 as the denominator.

The source form and private research notes stay outside this public repository. The form describes a roughly two-minute study of timetable viewing and updating. It says it does not collect names, student numbers or email addresses. This review used the summary tables, not individual response records.

## Limits of the evidence

The recruitment method, collection window, respondent background and duplicate-response controls were not verified. Treat this as a small exploratory sample. No missing answers appear in these six summaries. Do not claim that the responses represent students in general, paying customers or active app users.

These are separate totals for each question. They do not show which answers came from the same person. For example, we cannot say that the respondents who require import are also the phone users. The survey asks about timetables. It does not test general task management, desktop work planning, advertising acceptance, Google login or personal cloud sync.

## Question results

### 1. How do you mainly view your timetable now?

| Answer | Count | Share |
|---|---:|---:|
| School academic system or campus website | 0 | 0% |
| Timetable app | 1 | 10% |
| Screenshot or photo | 4 | 40% |
| Self-made calendar or paper timetable | 3 | 30% |
| Other, or rarely view it | 2 | 20% |

This describes the main viewing method. A screenshot may still have come from a school system. Zero selections for that viewing method do not prove that academic systems are unused.

### 2. Which device do you mainly use to view your timetable?

| Answer | Count | Share |
|---|---:|---:|
| Phone | 7 | 70% |
| Computer | 2 | 20% |
| Tablet | 0 | 0% |
| Paper timetable or other | 1 | 10% |

Phone viewing is the strongest device signal in this sample. The question does not identify Android, iOS, browser preference or where people enter their timetable.

### 3. What would you most like to improve in your current timetable use?

| Answer | Count | Share |
|---|---:|---:|
| See class times and rooms faster and more clearly | 5 | 50% |
| Spend less time entering courses each semester | 4 | 40% |
| Learn promptly about changed or cancelled classes and room changes | 0 | 0% |
| The current method is good enough | 1 | 10% |
| Other or unsure | 0 | 0% |

### 4. How often have classes, cancellations or rooms changed this semester?

| Answer | Count | Share |
|---|---:|---:|
| Never | 2 | 20% |
| Once or twice | 4 | 40% |
| Three or more times | 3 | 30% |
| Cannot remember, or no courses this semester | 1 | 10% |

Seven responses report at least one change. This measures reported events, not how often a tool failed or the cost of a missed update.

### 5. If one improvement came first, which would you prefer?

| Answer | Count | Share |
|---|---:|---:|
| Easier viewing: see today's or the whole week's classes at a glance | 3 | 30% |
| Automatic import: avoid entering courses one by one each semester | 3 | 30% |
| Continuous sync: automatically update class changes, cancellations and rooms | 3 | 30% |
| No new tool needed for now | 1 | 10% |
| Unsure | 0 | 0% |

There is no winning feature in this question. Easier viewing, import and automatic course updates tie. The zero change-alert selections in question 3 must not erase the three automatic-update selections here; the questions ask different things.

### 6. Would you use a clearer viewer if you had to enter and update courses yourself?

| Answer | Count | Share |
|---|---:|---:|
| Yes; manual entry and updates are acceptable | 2 | 20% |
| Only with automatic semester import; later manual updates are acceptable | 4 | 40% |
| Only with continuous automatic sync of course changes | 2 | 20% |
| No; the current method is good enough | 1 | 10% |
| Unsure; need to try it first | 1 | 10% |

Only two responses explicitly accept a fully manual workflow. Six set an import or automatic-update condition. This is stated willingness, not observed adoption. It is also inaccurate to say that all eight remaining responses reject the idea.

## Design implications

| Finding | Design response to test | Limit |
|---|---|---|
| Phone 7/10; screenshots 4/10 | A readable Today view with the next class, time and room; compare it with opening a screenshot | A better-looking screen alone may not justify switching |
| Clearer viewing 5/10; less entry 4/10 | Reduce setup and make the first useful timetable quick to reach | The survey does not specify a preferred import format |
| Fully manual use accepted by 2/10 | Do not position a manual desktop timetable as the main validated student offer | It may still serve a smaller group; test actual use |
| Import required by 4/10 | Study whether an authorized academic source could reduce entry; reconsider files or screenshots only from observed need | No permission, supported source, accuracy or time saving is proven; manual entry does not meet this condition |
| Automatic course updates required by 2/10 | Explain that the local release does not meet that condition; access feasibility is separate research | Personal cloud sync cannot discover school timetable changes; permission to retrieve once does not establish live updates |
| General planning and ads were not asked about | Run separate work/life and advertising research if those decisions depend on demand | Do not reuse these counts as validation of either offer |

The maintainer retains **easier setup and phone access** as goals, while keeping general time management central and developing on Windows first. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) refines the earlier [ADR-012](adr/012-import-first-phone-planner.md): deliver useful direct editing first, study authorized academic access separately and implement screenshot import only if later need justifies it. Android adaptation follows the working Windows flow without waiting for all macOS/Linux releases or OCR. No school connection is approved by this decision. This choice does not turn survey preferences into proven demand. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) retains the alternatives and evaluation gates. [VALIDATION.md](VALIDATION.md) defines evidence rules. [COMPETITIVE_REVIEW.md](COMPETITIVE_REVIEW.md) separates official product references from our own hypotheses.

## Three meanings of sync

1. **Personal cloud sync:** copy a person's Cadence edits between their devices. The selected later Node.js/Google design covers this.
2. **Import:** turn a supplied file, image or approved source response into reviewed entries. A later source change needs another deliberate update. No academic source has been approved or tested.
3. **Automatic academic updates:** obtain new class changes from an outside source. This is what the survey's continuous-sync options describe. The local release does not provide it. Feasibility research does not establish permission, complete change data or reliable delivery.

Do not present the first service as satisfying the third request. No response here establishes demand for a JPY 2,500-per-month backend.
