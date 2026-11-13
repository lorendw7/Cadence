# Product validation

Updated: 2026-11-13. This guide explains how research may change the design. [SURVEY_FINDINGS.md](SURVEY_FINDINGS.md) records the verified 10-response timetable summary; [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) records the adopted B plus C direction and its comparison. No actual active-user count or revenue has been established. [PRODUCT.md](PRODUCT.md) owns scope, [ROADMAP.md](ROADMAP.md) owns release gates, and [LEARNING.md](LEARNING.md) owns current implementation progress.

## Keep different kinds of evidence separate

| Evidence | What it can support | What it does not prove |
|---|---|---|
| A completed planning or application questionnaire | The author's current proposal and assumptions | Independent user demand |
| Responses from potential users | Stated problems, preferences and examples within that sample | Adoption, retention or a representative market estimate |
| An observed task using a prototype | Whether that participant can understand and complete that task | Reliable saving, release quality or repeat use |
| A trial of an installed build | Actual behavior on the tested platform and version | Support for other platforms or wider demand |
| Returning trial participants | Repeat use within the observed group and period | A forecast for all downloads |
| A server quote and revenue scenario | A possible budget under explicit assumptions | Provider acceptance, available capacity or actual advertising income |

Before using a questionnaire as evidence, identify who answered it, its purpose, collection dates, response count and exact question wording. Record missing answers and how participants were selected. Distinguish a founder filling in an application from users reporting their own needs. Do not turn either into a claim of proven demand.

Keep personal funding applications, pitch scripts, private correspondence and raw responses outside the public repository. Publish only an appropriate, non-identifying summary with its limits. Do not copy personal answers or quotes into public files without permission.

## Turn findings into a small decision

The maintainer has selected useful direct planning and phone access under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md), with Windows development first and general planning central. Evaluate recording commitments, inspecting available time, reserving work before a deadline and adjusting a plan. Screenshot import is optional only if actual need justifies it. A deferred extension could examine approved read-only academic access; no interface or permission is established. Keep broader work/life evidence separate from the timetable survey.

For each proposed change, record the problem, current workaround, dated evidence, smallest useful change and a success check. Then choose whether to keep, adjust or defer the design. For example, a participant might need to see a deadline beside reserved work time. The first response could be a clearer Week view, rather than a new module. This is an example, not a reported finding.

A requested feature is one possible solution. Compare it with an existing calendar, a task list, paper or manual export before claiming a unique benefit. Follow the existing [Windows trial gates](ROADMAP.md#c--private-backup-and-first-windows-trial) and [quality checks](QUALITY.md); this guide adds no release checklist.

For a trial observation, record the build, platform, task and assistance needed. For a voluntary follow-up, record the period, people invited, replies and reported repeat use. Downloads and unanswered invitations do not prove retention. Early interviews and voluntary notes do not require mandatory telemetry in the local core. Publish the sample limits alongside any conclusion.

## Later service and advertising decision

Cost modelling can happen during planning. Service implementation and an advertising pilot remain deferred until the [post-store review](ROADMAP.md#after-store-launch--review-services-and-income). A local planner and its existing concept website do not by themselves require a rented application server.

The accepted future design uses Google login and Node.js, TypeScript, Fastify and PostgreSQL. [CLOUD_SYNC.md](CLOUD_SYNC.md#deployment-and-operating-budget) records the JPY 2,500 monthly budget and separate capacity tests. The timetable survey did not ask about cross-device personal sync or advertisements; it cannot validate demand for this service or willingness to accept ads.

First identify the service: for example, optional sync with common storage and traffic limits. Then estimate compute, data storage, backups, traffic, email, monitoring, taxes and support. Separate initial setup spending, recurring cash costs and the value of the maintainer's time. Check that capacity claims come from load and recovery tests, not a server's advertised memory alone.

An advertising scenario needs the actual supported platform, eligible active users, consent where needed, ad opportunities and recorded impressions. An ad opportunity is a chance to request an ad. A filled request does not always become a recorded impression. Mobile networks may report eCPM, or estimated revenue per thousand impressions. Web reports can distinguish revenue per thousand ad impressions from revenue per thousand page views. Use the matching count and do not apply fill rates twice. Mark unmeasured rates as assumptions, not market facts. Offline or ineligible users may generate no ad revenue.

Monthly operating break-even means revenue covers that month's operating cost. Recovering past spending requires additional surplus over later months. Payment thresholds and payout delays can mean cash arrives after revenue is recorded. Calculate a no-revenue case and define a spending limit and stop date before starting a pilot.

Evaluate whether ads harm planning, trust or repeat use. Follow the [free-edition service boundaries](FREE_EDITION.md#review-only-after-store-launch). If the service cannot cover costs within the approved budget, preserve local planning and export while changing common limits or ending the pilot.

Keep dated provider quotations and personal funding calculations outside public product promises. Record an accepted product decision in the existing scope and roadmap documents; do not present an estimate or an application narrative as a released feature.

### Illustrative monthly operating model

This is a sensitivity calculation, not an ad-price benchmark or revenue forecast. Daily active users (DAU) means the average number of active users each day. Count only the relevant mobile audience for this example. Assume 30 days, two ad opportunities per mobile active user per day, 50% eligibility, 80% fill and 90% display success. These unmeasured assumptions give 21.6 recorded impressions per mobile DAU per month.

`monthly revenue = mobile DAU * 30 * 2 * 0.50 * 0.80 * 0.90 * publisher eCPM / 1000`

| Assumed publisher eCPM, JPY | Monthly revenue per mobile DAU, JPY | Mobile DAU to cover JPY 2,500, rounded up |
|---|---:|---:|
| 50 | 1.08 | 2,315 |
| 150 | 3.24 | 772 |
| 300 | 6.48 | 386 |

Use publisher revenue after the network's share; do not deduct that share again. If actual recorded impressions are available, multiply those by matching publisher eCPM instead of applying eligibility and fill a second time. If mobile users are only 30% of all DAU, the middle case needs about 2,573 total DAU under the same assumptions. This is not a capacity claim.

At 1,000 mobile DAU in the middle case, revenue is JPY 3,240 and the monthly surplus is JPY 740 before omitted costs. Covering the monthly bill does not repay past spending. Labour, acquisition, devices, store fees and taxes may change the result. With no revenue, six months at this budget costs JPY 15,000.

Native desktop cannot use this AdMob model: Google's Flutter plugin supports Android and iOS only. Use zero desktop ad income until a separate sponsor contract exists. Web needs a separate approved placement and matching revenue measure. Check the [official platform support](https://developers.google.com/admob/flutter/quick-start) and [platform plan](FREE_EDITION.md#advertising-by-platform). Payment thresholds and delays also separate recorded revenue from cash received; see [AdMob payment thresholds](https://support.google.com/admob/answer/2772208?hl=en).
