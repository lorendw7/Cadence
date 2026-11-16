# Product validation

Updated: 2026-11-15. This guide explains how research may change the design. [SURVEY_FINDINGS.md](SURVEY_FINDINGS.md) records the verified 10-response timetable summary; [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) records the adopted B plus C direction and its comparison. No actual active-user count or revenue has been established. [PRODUCT.md](PRODUCT.md) owns scope, [ROADMAP.md](ROADMAP.md) owns release gates, and [LEARNING.md](LEARNING.md) owns current implementation progress.

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

The maintainer selected Android self-use first under [ADR-015](adr/015-android-self-use-first.md). Windows remains the development host. Evaluate recording commitments, inspecting Today/Week, reserving time and adjusting a plan, then task-linked focus after safe planning. Screenshot import is optional only if actual need justifies it. School authorization, applications and integration are postponed; no interface or permission is established. Keep self-use and broader demand separate from the timetable survey.

For each proposed change, record the problem, current workaround, dated evidence, smallest useful change and a success check. Then choose whether to keep, adjust or defer the design. For example, a participant might need to see a deadline beside reserved work time. The first response could be a clearer Week view, rather than a new module. This is an example, not a reported finding.

A requested feature is one possible solution. Compare it with the person's existing calendar, task list or paper before claiming a unique benefit. Follow the [planning trial gates](ROADMAP.md#c--private-backup-and-first-windows-trial), [Android native checks](ROADMAP.md#d--android-phone-validation) and [quality checks](QUALITY.md). Self-use does not establish independent demand.

For a trial observation, record the build, platform, task and assistance needed. For a voluntary follow-up, record the period, people invited, replies and reported repeat use. Downloads and unanswered invitations do not prove retention. Early interviews and voluntary notes do not require mandatory telemetry in the local core. Publish the sample limits alongside any conclusion.

## Android workflow benchmark

The [Android daily-use design](ANDROID_EXPERIENCE.md#one-consistent-design-fixture) supplies a static three-view fixture and [review cases](ANDROID_EXPERIENCE.md#review-and-delivery-mapping). Use it to discuss meanings and content order before a build exists. Record that work as design review; a drawing cannot establish capture speed, persistence or repeat use.

Proposed on 2026-11-15; no measurements have run. The purpose is to judge [the bounded competitive goal](PRODUCT.md#competitive-goal-for-android), not rank whole products. Test only implemented behavior. A concept walkthrough can test understanding, but cannot pass saving, recovery or timer acceptance.

Use the same fictional task, report deadline, appointment and weekly class in each comparison. Record phone model, Android version, build, language, text size, storage mode and data size. Use a profile or release build for performance observations. Compare against the person's current method; include a competitor only if they can complete that same routine in its tested platform and plan. Record unavailable features instead of inventing equivalent results.

| Measure | Proposed target or pass condition | How to observe |
|---|---|---|
| Title capture | At most 10 seconds for the fixed short sample title, with no required date or category | Time from a ready Tasks screen to confirmed save, including typing; record wrong or duplicate entries |
| Next commitment | Correct title, start time and location within 5 seconds | Time from a ready Today screen; include a day with no next commitment |
| Planning and correction | Reserve work before a deadline and change only one repeated occurrence without help | Check both views, unchanged deadline and other occurrences, and no duplicate record; record elapsed time without a preset speed target |
| Starting focus, once H exists | At most two actions from a visible task row with the default duration; no title re-entry | Count opening focus and starting it; separately check pause/end and a manually started break |
| Recovery | No silently lost confirmed record, false saved state or duplicate session in the tested cases | Exercise failed writes, restart, process termination, invalid restore and cancelled replacement; check records as well as UI feedback |
| Phone access | Core actions remain reachable with the keyboard open, Android Back, 200% text and each supported language | Follow native/accessibility checks; record device-specific limits and pending manual cases |

The numbers are internal design targets, not measured competitor performance or guarantees for every user. After a practice run, repeat each timed scenario three times and keep all results, errors and help needed. Use the median for the two speed targets; never hide a failed run in an average. Measure startup separately from the ready-screen tasks, using ten offline launches with the same saved fixture; record median and slowest time before choosing a startup target. Screen-reader and large-text checks assess access independently from speed.

During the two-week planning trial, privately log dates used, intended routine, completion, lost or repeated work, outside-tool workarounds and reasons for returning or stopping. Report days with a real planning need as well as days used. This is one person's evidence, not a population retention rate. Keep focus observations separate until H exists. No telemetry service is required.

When external participants become available, start with five relevant Android users and the same routine. A proposed usability checkpoint is four of five completing it without help and explaining deadline versus reserved time versus timer time. Report exact counts and errors. For follow-up, record invitations, replies, voluntary use and what still requires another tool. This small study cannot prove market size or willingness to pay.

Decisions after each review:

- Fix every known silent-loss, incorrect-date or blocked-core-action defect before treating that slice as accepted. Speed cannot compensate for wrong records.
- If the routine works but capture or lookup is slow, simplify that interaction before adding a module. Rerun the same scenario.
- Review a [later competitive gap](PRODUCT.md#competitive-gaps-to-review-later) when the private log shows the same costly workaround on at least three separate days, or a serious missed commitment needs investigation. This is a proposed prioritization rule, not automatic scope approval.
- Claim a measured benefit only for the people, builds and routines actually compared. If Cadence provides no useful improvement, narrow the target or revise the flow before expanding spending or features.

## Desktop demand and purchase test

The bounded later desktop candidate is in [DESKTOP_V1.md](DESKTOP_V1.md); it does not gate Android self-use. This section retains conditional commercial study checkpoints. [STEAM_SALES_PLAN.md](STEAM_SALES_PLAN.md) owns cost scenarios. Ten independent retained purchases is a later commercial learning milestone, not a condition for developing the phone planner. Larger sales numbers remain unvalidated. No sample below establishes a population conversion rate.

Under [ADR-014](adr/014-desktop-focus-and-mobile-ads.md), the preferred revenue hypothesis is a one-time purchase for a small Windows planning and focus tool. No revenue is guaranteed. Recruit the [first buyer group](PRODUCT.md#first-buyer-to-test) by recent behavior and existing tools. Wallpaper Engine ownership is neither required nor evidence of purchase demand. Its installed audience is not Cadence's customer count.

### Start without external testers

On 2026-11-15, the maintainer selected Android self-use, with no external trial users and an Android phone available daily. Do not assume a participant pool exists. Continue the current lesson and shared saving/recovery work. Check the existing fictional exercise on the phone, then use safe tasks only after native persistence and backup acceptance. Review every 20 working hours instead of committing the whole estimate.

Once a safe local build exists, the maintainer can use real ordinary tasks, then add Today/Week and direct plans as their slices pass. Complete a two-week planning check and keep a private log of failed actions, repeated entry, missed context, recovery problems and reasons to reopen the app. Until saving is accepted, use fictional data only. Follow with the bounded task-linked focus stage and its native interruption checks. Self-use can expose defects and personal usefulness; it cannot establish independent retention, willingness to pay or ad income.

Prepare a 30-second demonstration for the existing concept site or a future store listing. Start with what exists and label concepts. Publication and outreach are separate actions; this review does not send messages or create a second site. No audience size is promised. If the site has no visitors, the missing evidence concerns acquisition; it is not proof that a different color or more music will sell.

The studies below are conditional research plans for when participants are available. The 10- and 20-person counts are not a prerequisite for lessons or an otherwise accepted local build. Record unrun studies as unrun. A bounded paid offer still needs quality checks, honest claims, support/refund terms and channel permission; independent purchases would then supply stronger evidence. A store's mandatory testing requirements remain separate and cannot be replaced by self-use.

### Studies when participants are available

1. Interview 8-12 target users about a recent real task, the tools used and where the routine broke. Before showing the concept, seek at least five concrete accounts of the repeated switching problem. This is a proposed screening rule, not a market-size result. Keep personal responses private; the earlier timetable survey is not purchase research.
2. Before focus implementation, show five relevant participants the same labelled fictional task through planning, compact focus and review. Seek four who can explain its value over their current method and distinguish deadline, reserved time and recorded timer time without prompting. Record objections; concept understanding is not actual use or purchase intent.
3. After safe saving, recovery and the silent focus routine exist, run an early two-week trial with about ten people. Seek five returning on at least three separate days in week two. Record invited, started and returning counts, help and defects. This small formative trial can happen before polishing all music; it is not a paid release.
4. When recruitment permits, test the complete accepted package with 20 participants over two weeks. Seek at least 12 completing the routine without help and eight returning on three separate days in week two. Record any participants carried over from the earlier trial; do not add the samples or call them independent. Missing recruitment is missing demand evidence. Quality gates still apply even if these counts pass.
5. Show the same specific working offer and price candidates. Record refusals as well as interest. Alternate the first price shown across participants to reduce ordering effects; do not infer price elasticity from this small study. A usable deliverable, support/refund terms and an allowed channel must exist before collecting payment. No outreach or payment collection is authorized here.
6. Seek ten independent retained purchases after known refunds before expanding commercial scope. Record acquisition source, actual receipts and support minutes, including help given to refunded buyers. Friends buying to help are different evidence from customers buying for use. Later refunds can revise the count. This milestone does not establish lifetime cost recovery.
7. If people cannot understand the concept, revise its hierarchy. If they do not return, repair or narrow the routine. If they return but do not buy, study the offer, alternatives and price. If support consumes proceeds, fix maintenance cost before paid acquisition or commercial platform expansion. Android validation remains allowed in its existing sequence; do not count the same hours twice.

### Affordable desktop offer

Sell a complete bounded local workflow: tasks/deadlines, readable Today/Week, direct time blocks, a task-linked countdown, compact mode, local session review and safe backup. Keep the academic-journal identity. The demo must show the task context continuing from planning through focus and review. Wallpaper Engine is deferred and must not appear as a first-release feature. Do not promise generic compatibility, verified attention tracking or automatic task completion.

The first offer reuses the existing static room image and accepted tracks from the 12-piece synthetic study pack under [DESKTOP_V1.md](DESKTOP_V1.md). Daily pins and title search support the routine. Ambient mixing, extra themes/scenes, count-up and saved profiles are deferred. No fal recharge or new paid generation is scheduled. Prepared files are not proof of sound quality or app readiness; test the combined routine and listening comfort.

Use low recurring costs to support a low price: no required server, accounts, licensed music catalogue, 3D world, pet economy, school API or cloud AI in the first offer. Do not promise unlimited future content or permanent cloud hosting for a small one-time payment. Do not cut recovery, accessibility or honest support to lower the sticker price.

For research only, compare **JPY 800 and JPY 1,200** as hypothetical Japanese-market one-time prices. Keep JPY 500 as a low-price sensitivity case in the [full-cost model](STEAM_SALES_PLAN.md#recover-cash-and-working-time). These are experiment inputs, not chosen prices, competitor benchmarks or approved Steam price points. Show the same defined product and investigate rejection reasons. A tiny interview sample cannot determine price elasticity. Regional prices need their own review against purchasing power, supported price points and [Steam pricing guidance](https://partner.steamgames.com/doc/store/pricing), not only currency conversion.

A lower price is useful only if it improves total contribution after costs. If contribution per retained sale falls from JPY 500 to JPY 300, roughly 1.67 times as many sales are needed for the same contribution. Those figures are arithmetic assumptions, not predicted net receipts at the research prices. Early testing should compare the offer against free tools as well as paid focus products.

### Steam presentation and acquisition

- Use the opening image and short description to explain one job: plan today's work and enter a focus session. Do not lead with a long feature list or conditional school access.
- Open a short video with the same task: select it, start focus directly, switch to compact mode, then review. Show a deadline and optional Week reservation as context, not prerequisites. Make the benefit visible within about 30 seconds. Use fictional data and label every concept-only scene.
- Let a trial or demo reach useful behavior within about five minutes where the channel supports it. Do not delay value or encourage idle running to exhaust refund eligibility. [Steam's refund policy](https://store.steampowered.com/steam_refunds/) includes software applications; follow actual terms and local requirements.
- Reuse the existing website and localized Japanese/English/Chinese store material. Test small, relevant communities or creator demonstrations with permission. Do not send messages, pay for placement or publish from this plan. Track source-specific visits and outcomes using allowed aggregate reporting, not private planner content.
- Keep artwork and music rights reviewable. Do not advertise Wallpaper Engine support in the first offer; if introduced later, state its ownership requirements and avoid implying an official partnership.
- Consider a modest launch discount only after the normal offer and price are decided. Follow [Steam discount rules](https://partner.steamgames.com/doc/marketing/discounts). Avoid inflated anchor prices, false urgency and an assumption that constant discounts create demand.

Track qualified visits -> demo starts -> completed routines -> wishlists -> purchases -> refunds -> net receipts as separate observations. Not every buyer follows that order. Small samples and different traffic sources prevent simple causal claims. Do not pay to scale traffic until retained sales can cover acquisition and support costs.

### Desktop contribution model

`contribution per retained sale = actual net receipts per retained sale - variable support and delivery cost`

`break-even retained sales = fixed launch cost / positive contribution per retained sale, rounded up`

That formula measures only the costs entered. The maintainer selected recovery of cash **and working time** on 2026-11-15. Include past and remaining work, fixed launch and maintenance time, and fixed cash in the numerator. Exclude per-unit costs and receipt deductions already counted in contribution. Include per-buyer support once. [The full-cost model](STEAM_SALES_PLAN.md#recover-cash-and-working-time) owns the assumptions and examples; the cash-only example below is not full economic recovery.

Use actual regional prices, discounts, refunds, channel deductions, applicable taxes and payout records. Avoid deducting the same item twice when net receipts already include it. With hypothetical fixed cash costs of JPY 20,000 and contribution of JPY 500 per retained sale, cash break-even is 40 sales. At 100 retained sales, contribution after that fixed cost is JPY 30,000 before omitted costs. This is not a price recommendation or income forecast. Including development time can make the full economic break-even much higher.

Budget a zero-sales case. Set a spending ceiling and review date before launch. One-time sales depend on new customers and do not establish recurring monthly income. A signed custom-work contract could make payment terms more concrete, but it is a different service business and is outside this product roadmap. Desktop purchase is recommended here because a small number of real transactions can test revenue sooner than an unmeasured ad audience; that is a planning judgment, not a guarantee.

## Later service and advertising decision

Cost modelling can happen during planning. Service implementation and an advertising pilot remain deferred until the [post-store review](ROADMAP.md#after-store-launch--review-services-and-income). A local planner and its existing concept website do not by themselves require a rented application server.

The accepted future design uses Google login and Node.js, TypeScript, Fastify and PostgreSQL. [CLOUD_SYNC.md](CLOUD_SYNC.md#deployment-and-operating-budget) records the JPY 2,500 monthly budget and separate capacity tests. The timetable survey did not ask about cross-device personal sync or advertisements; it cannot validate demand for this service or willingness to accept ads.

First identify the service: for example, optional sync with common storage and traffic limits. Then estimate compute, data storage, backups, traffic, email, monitoring, taxes and support. Separate initial setup spending, recurring cash costs and the value of the maintainer's time. Check that capacity claims come from load and recovery tests, not a server's advertised memory alone.

An advertising scenario needs the actual supported platform, eligible active users, consent where needed, ad opportunities and recorded impressions. An ad opportunity is a chance to request an ad. A filled request does not always become a recorded impression. Mobile networks may report eCPM, or estimated revenue per thousand impressions. Desktop and Web ad income is zero in this plan. Use the matching count and do not apply fill rates twice. Mark unmeasured rates as assumptions, not market facts. Offline or ineligible users may generate no ad revenue.

Monthly operating break-even means revenue covers that month's operating cost. Recovering past spending requires additional surplus over later months. Payment thresholds and payout delays can mean cash arrives after revenue is recorded. Calculate a no-revenue case and define a spending limit and stop date before starting a pilot.

Evaluate whether ads harm planning, trust or repeat use. Follow the [free-edition service boundaries](FREE_EDITION.md#review-only-after-store-launch). If the service cannot cover costs within the approved budget, preserve local planning and export while changing common limits or ending the pilot.

Keep dated provider quotations and personal funding calculations outside public product promises. Record an accepted product decision in the existing scope and roadmap documents; do not present an estimate or an application narrative as a released feature.

### Review-screen ad pilot

Revised on 2026-11-15. No ad audience, impressions or income has been measured. The [review-screen design](FREE_EDITION.md#review-screen-ad-proposal) compares positions at one daily request before testing up to two, at least four hours apart. Many active users will never open review. Assume one active Android installation per person in these examples; do not count desktop users, downloads or monthly users as Android daily active users (DAU).

For comparison, keep 30 days, 60% request eligibility, 80% fill and 90% of filled responses becoming recorded impressions. Use a hypothetical publisher eCPM of JPY 150 per thousand impressions. All rates are unmeasured. Review reach is the share of daily active users who voluntarily visit review. Requests per eligible reviewer is the average after spacing, daily limits and dismissal; it is not the ceiling.

`monthly impressions = Android DAU * 30 * review reach * eligibility * average requests per eligible reviewer * fill * display success`

`monthly publisher revenue = recorded impressions * publisher eCPM / 1000`

| Scenario assumption | Daily review reach | Mean requests per eligible reviewer | Daily request ceiling | Monthly revenue at 1,000 Android DAU, JPY |
|---|---:|---:|---:|---:|
| Original cautious example | 25% | 1.0 | 1 | 486.00 |
| More voluntary repeat visits only | 25% | 1.5 | 2 | 729.00 |
| More people finding review useful only | 40% | 1.0 | 1 | 777.60 |
| Combined candidate assumptions | 40% | 1.5 | 2 | 1,166.40 |

The combined case gives 7.776 monthly impressions and JPY 1.1664 monthly revenue per average DAU. At 10,000 Android DAU it gives JPY 11,664 before costs. The 2.4 times difference from the original case is arithmetic under different behavior assumptions, not measured uplift. Moving the banner cannot itself raise review visits from 25% to 40%. A 1.5-request mean would require half of eligible reviewers to make a second qualifying visit; the four-hour gap and dismissal may make this unrealistic. If visits do not increase, use the original reach and observed request average. No uplift from position, bidding or format is included in these numbers.

The original 90% display assumption is already high. Improve it only when observations support a different value. Derive each conditional rate from the same cohort and period; do not multiply unrelated population averages. When actual recorded impressions exist, use them directly and do not apply reach, eligibility or fill again. Publisher eCPM is after the network's share; do not deduct that share twice. No cloud sync service is required. Revenue is neither profit nor cash received.

Before live serving, keep an ad-free public usage baseline and pass test-ad, consent, storage, screen-exit, background, accessibility and release checks. Draft a 14-day pilot with a fixed effort and cash ceiling before starting it. Do not automatically extend the pilot to pursue a revenue target. Self-use and tiny samples cannot establish an ad effect on retention.

Record aggregate review reach, requests, recorded impressions, revenue, dismissal and support complaints where permitted. Use voluntary feedback and the same capture/lookup/focus scenarios as the ad-free build. Test one variable at a time: first position at a one-request ceiling, then the two-request ceiling at the retained position. Do not attribute a change in audience, season or region to the layout. Do not send planner content or introduce a tracking service just to fill a report. If counts or a comparable baseline are unavailable, mark the result inconclusive and do not raise the ceiling again.

Stop serving for any consent bypass, private-content leak, ad on a protected screen, misleading close action, data-loss defect or reproducible interference with focus/navigation. Investigate and pause the experiment for repeated accidental taps or complaints about distraction. Compare startup, memory, frame delays and crashes with the ad-free build on the same devices; small samples cannot prove no harm.

Prepare a way to disable the ad unit and distribute an ad-free fix. Provider changes cannot instantly remove an already displayed ad or an offline cached build, so document that limit. If net receipts do not justify support and user impact, keep the product useful and leave the pilot off. Increasing frequency needs a new design review; it is not the default response to low income.

### Android ad cost recovery

The maintainer selected an example hourly value of JPY 1,500 and a 24-month recovery period on 2026-11-15. Other inputs below are explicit assumptions, not personal spending or an actual time ledger. Keep actual historical costs private and replace these inputs before making a spending decision. This is an Android example, separate from the desktop JPY 570,000 example; never add the two budgets together.

| Cost input | Example | Included work or limit |
|---|---:|---|
| Total development and launch work | 350 hours | Design, implementation, tests, translations, store preparation and ad integration; replace with logged past plus remaining work |
| Hourly value | JPY 1,500 | Applies equally to development, maintenance and support |
| One-time cash | JPY 30,000 | A combined illustrative allowance; not an approved purchase or a provider quote |
| Fixed monthly cash | JPY 1,000 | Example website/domain and other fixed costs; no required sync server |
| Fixed monthly maintenance | 8 hours | Shared fixes, dependency/policy reviews and release upkeep; excludes the separate variable-support example |
| Recovery period | 24 months after ad launch | Sustained average use throughout the period, not only the audience at its end |

Initial example cost is JPY 555,000: 350 * 1,500 + 30,000. Fixed maintenance including cash is JPY 13,000 per month. Recovering the initial cost over 24 months adds JPY 23,125 monthly, giving a JPY 36,125 monthly contribution target. Ongoing maintenance is counted here, not again in the initial 350 hours. For an actual total, include previously spent hours and cash once; the 350-hour input does not prove that history is covered.

The [remaining-work estimate](ROADMAP.md#working-estimate-at-10-15-hours-per-week) is 215-364 hours with reserve through public release. A later 20-40 base-hour ad pilot adds 26-52 with the same reserve: 241-416 remaining hours in total if selected. This does not include unknown historical hours. Using that remaining range alone gives about 25,131-34,508 DAU for the middle-rate case below, before variable support. It is a remaining-cost comparison, not lifetime recovery.

Use the combined candidate's 7.776 monthly impressions per DAU. These eCPMs are sensitivity inputs, not market estimates. The following thresholds assume fixed costs only and round up to a whole average daily user.

| Monthly target | At eCPM JPY 50 | At eCPM JPY 150 | At eCPM JPY 300 |
|---|---:|---:|---:|
| JPY 1,000: recurring cash only | 2,573 DAU | 858 DAU | 429 DAU |
| JPY 13,000: cash plus fixed maintenance time | 33,437 DAU | 11,146 DAU | 5,573 DAU |
| JPY 36,125: maintenance plus 24-month initial-cost recovery | 92,915 DAU | 30,972 DAU | 15,486 DAU |

The cash-only row does not repay one-time cash or development work. Paid acquisition, personal income tax and any costs outside the listed inputs are not included. A growing audience can increase support and operating costs, so the fixed-cost thresholds are an optimistic boundary for that cost structure.

Let r be monthly publisher revenue per average DAU, v be variable support/operating cost per average DAU per month, C be fixed monthly maintenance including cash, D be initial cost, and T be recovery months.

`required average DAU = ceil((C + D / T) / (r - v))`, only when `r > v`.

For a separate sensitivity case, allow just 0.5 support hours per month for every 1,000 average DAU, in addition to the fixed eight hours. At JPY 1,500/hour this is v = JPY 0.75. The complete recovery threshold becomes **86,756 DAU at eCPM JPY 150**, or **22,824 at JPY 300**. At JPY 50, revenue is below that variable cost; more users cannot cover the fixed cost under these assumptions. This support rate is not an industry benchmark. Measure real support, including its relationship to monthly rather than daily users.

Use average active users during the recovery period. Reaching 30,972 DAU only in month 24 does not meet the fixed-cost example. A roughly linear rise from zero would need about twice that ending audience to obtain the same period average. Additional past hours, longer development, user loss and paid acquisition increase the requirement. Do not count a future audience or estimated ad balance as money available to fund development.

Before increasing investment, replace reach, request frequency, eCPM and support cost with observed values. If contribution per active user is weak or negative, improve the useful routine and operating cost before pursuing more installs. A low-distraction ad model may cover modest cash expenses yet fail to repay development time.

### Illustrative monthly operating model

This retained scenario is a general sensitivity calculation for the deferred sync-service budget, not the bounded review pilot above, an ad-price benchmark or a revenue forecast. Daily active users (DAU) means the average number of active users each day. Count only the relevant mobile audience for this example. Assume 30 days, two ad opportunities per mobile active user per day, 50% eligibility, 80% fill and 90% display success. These unmeasured assumptions give 21.6 recorded impressions per mobile DAU per month.

`monthly revenue = mobile DAU * 30 * 2 * 0.50 * 0.80 * 0.90 * publisher eCPM / 1000`

| Assumed publisher eCPM, JPY | Monthly revenue per mobile DAU, JPY | Mobile DAU to cover JPY 2,500, rounded up |
|---|---:|---:|
| 50 | 1.08 | 2,315 |
| 150 | 3.24 | 772 |
| 300 | 6.48 | 386 |

Use publisher revenue after the network's share; do not deduct that share again. If actual recorded impressions are available, multiply those by matching publisher eCPM instead of applying eligibility and fill a second time. If mobile users are only 30% of all DAU, the middle case needs about 2,573 total DAU under the same assumptions. This is not a capacity claim.

At 1,000 mobile DAU in the middle case, revenue is JPY 3,240 and the monthly surplus is JPY 740 before omitted costs. Covering the monthly bill does not repay past spending. Labour, acquisition, devices, store fees and taxes may change the result. With no revenue, six months at this budget costs JPY 15,000.

Native desktop cannot use this AdMob model: Google's Flutter plugin supports Android and iOS only. Desktop sponsorship and Web advertising are excluded under ADR-014. Count desktop and Web ad income as zero; desktop purchase receipts are separate. Check the [official platform support](https://developers.google.com/admob/flutter/quick-start) and [platform plan](FREE_EDITION.md#advertising-by-platform). Payment thresholds and delays also separate recorded revenue from cash received; see [AdMob payment thresholds](https://support.google.com/admob/answer/2772208?hl=en).
