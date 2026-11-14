# Desktop sales and cost recovery

Updated: 2026-11-15. This is a commercial review of the [complete desktop candidate](DESKTOP_V1.md). The maintainer wants to recover cash and development time. There are no verified Cadence paid sales, Steam wishlists or acquisition conversions in this plan. Price remains undecided. Sales scenarios are arithmetic examples, not demand evidence or spending authority.

Current delivery follows [ADR-015](adr/015-android-self-use-first.md): ad-free Android planning self-use, then bounded phone focus. This sales plan is a later commercial reference, not the active build order. The bounded future desktop offer reuses existing assets; media integration, compact mode and Steam preparation are deferred. No fal top-up, paid generation or other spending is authorized by these scenarios.

## Position and audience

Start with the [first buyer hypothesis](PRODUCT.md#first-buyer-to-test): Windows users doing deadline-driven writing, coding or exam preparation who repeatedly switch between tasks, calendars and timers. Ask about a recent example and the tools already used. Keep recruitment separate from the earlier phone/timetable survey. The offer is continuity from an existing task into focus and a useful local record. Scheduling, pinning and music must remain optional.

[Spirit City: Lofi Sessions](https://store.steampowered.com/app/2113850/Spirit_City_Lofi_Sessions/) sells a broader focus experience. [Virtual Cottage 2](https://store.steampowered.com/app/2943180/Virtual_Cottage_2/) emphasizes a cozy space and extensive decoration. Their official pages, checked on 2026-11-15, support the existence of this category. They do not establish Cadence's likely sales. Compete with a clear planning-to-focus workflow and a small polished package; do not match a large furniture or collectible catalogue.

### Problems to solve before increasing investment

| Problem | Commercial consequence | Design or management response |
|---|---|---|
| Broad audience, but only a small timetable survey | Building for people who may never buy a Windows tool | Recruit the narrower behavior-based group; compare with each person's current tools. |
| Planning, pinning and music appear before focus | More setup before the main paid benefit | Put Start focus on the task; demonstrate the same title through compact mode and review. |
| Free atmosphere tools and richer paid competitors | More tracks or a lower price may not win buyers | Test saved effort and a readable working routine; reuse accepted media and keep silence complete. |
| Development and support time omitted from early cash examples | Cash recovery can be mistaken for profit | Lead decisions with the full-cost model below; log research, marketing, translation and support time too. |
| Sales targets with no measured acquisition route | A large build funded by imagined future buyers | Seek small repeat-use and retained-purchase evidence; use volume scenarios only for sensitivity. |
| Steam category acceptance is unknown | Store preparation may be wasted | Review eligibility before store-specific work; keep the existing site as the concept and possible distribution entry. |

Checked on 2026-11-15: [Virtual Cottage](https://store.steampowered.com/app/1369320/Virtual_Cottage/) is free. The fetched Japanese-price page for [Spirit City](https://store.steampowered.com/app/2113850/Spirit_City_Lofi_Sessions/) shows JPY 1,250 and a richer focus/customization offer. Prices can change. These observations make music-only positioning weak in our judgment; they do not establish demand for Cadence or a price ceiling.

Steam's [onboarding rules](https://partner.steamgames.com/doc/gettingstarted/onboarding), checked on the same date, list specific non-game categories without a general productivity category. Cadence's acceptance is uncertain. Do not assume that another focus product's listing proves eligibility or relabel the planner as a game. If Steam is unavailable, assess payment, delivery, refunds and support through an allowed alternative linked from the existing site. No second site, payment service or account setup is authorized by this review.

## Unit targets

Count retained paid units after known refunds. Exclude free keys and demo downloads. Report gross orders and refunds separately. The yearly numbers are cumulative from launch, not added to the 90-day numbers. Later refunds can revise a count.

| Horizon | Lower volume scenario | Middle volume scenario | Higher volume scenario |
|---|---:|---:|---:|
| First 30 days | 100 | 300 | 1,000 |
| First 90 days | 300 | 1,000 | 3,000 |
| First 12 months | 1,000 | 3,000 | 10,000 |

The former 1,000-unit/90-day and 3,000-unit/year working targets are now **unvalidated volume scenarios**. Even the lower scenario is not a sales floor; include zero sales. The immediate commercial learning target is ten independent retained purchases, positive measured contribution and manageable support after the release gates pass. This does not prove full recovery. [VALIDATION.md](VALIDATION.md#desktop-demand-and-purchase-test) owns study thresholds.

## Recover cash and working time

Use a private lifetime ledger for actual money and hours. No actual cost, hourly value or recovery date has been supplied. The figures below are public hypothetical calculations, not the maintainer's personal finances. Keep historical spending in the recovery total, even when the next-investment decision correctly considers only future cost.

`cost to recover = past and future fixed cash + (past and remaining development hours + fixed launch and maintenance hours) * chosen hourly value`

`contribution per retained unit = realized price * receipt factor - variable cash - average support hours per retained unit * hourly value`

`units to recover = ceil(cost to recover / positive contribution per retained unit)`

If contribution is zero or negative, more sales cannot recover the fixed cost. Hours include research, design, coding, checks, translation and acquisition work. Count each hour once. Shared maintenance belongs in fixed hours; customer-specific support belongs in the per-unit allowance. Include support for refunded orders when calculating that allowance across retained units. Treat personal income tax separately; these examples are before it.

For one example, assume **JPY 30,000 fixed cash**, **300 total development/validation hours**, **60 further fixed launch/maintenance hours**, and **JPY 1,500 per hour**. Total cost is **JPY 570,000**. Fixed cash excludes per-unit costs and deductions already counted in contribution. The 300 hours are an illustrative total, not the roadmap's remaining-work estimate or an assertion about hours already spent. Replace them with logged past plus re-estimated remaining work. If past costs are absent from the inputs, add them before claiming lifetime recovery.

Assume realized price is 80% of list, and receipts are 60% of realized price. This combined factor is not Valve's contractual rate. Deduct JPY 30 variable cash plus six average support minutes at JPY 1,500/hour, or JPY 180 per retained unit. Refunds are already excluded from retained units; do not subtract the same refund twice.

| Hypothetical list price | Receipts per retained unit | Contribution after variable cash and support | Units to recover JPY 570,000 |
|---|---:|---:|---:|
| JPY 500 | JPY 240 | JPY 60 | 9,500 |
| JPY 800 | JPY 384 | JPY 204 | 2,795 |
| JPY 1,200 | JPY 576 | JPY 396 | 1,440 |

Test JPY 800 and JPY 1,200 first on the same truthful offer. Keep JPY 500 as a low-price sensitivity case, not a default launch strategy. No price is approved. At JPY 1,200, 1,440 retained purchases within twelve months would require an average of 120 per month; that is a requirement, not a forecast. At an assumed 2%-5% qualified-visit-to-retained-purchase rate, it requires 28,800-72,000 visits. No such audience is established.

Support can reverse the result: at 15 minutes per retained buyer, JPY 1,200 leaves only JPY 171 contribution and needs 3,334 units. JPY 800 leaves negative JPY 21. Track actual support rather than budgeting from price alone. A higher price helps only if sufficient people still buy; stated willingness in a small sample is not a conversion forecast.

At every 20-hour review, compare the next bounded work cost with evidence for additional retained purchases. At the six-minute example, 20 hours cost JPY 30,000 and require 76 additional sales at JPY 396 contribution. This is a decision prompt, not proof that the feature will cause those sales. Past effort is part of lifetime recovery, but it is not a reason to keep spending after evidence fails. Learning can continue under a separate purpose without being called commercial payback.

## Receipt sensitivity before support

The earlier JPY 500, 800 and 1,200 price points remain research hypotheses. Do not publish a final price from this table. Regional prices, exchange rates and store rules need separate review. Use the realized average price rather than the highest list price when calculating receipts.

For a transparent sensitivity model, assume an average realized price of 80% of list price and a 60% publisher-receipt factor on that value. The factor is a combined planning allowance for platform deductions, included sales taxes and related adjustments; it is **not a statement of Valve's contractual percentage**. Units here are already net of known refunds, so do not deduct the same refunds again. This model excludes income tax, development labor, support, promotion and future costs.

| Hypothetical list price | Realized average assumption | Receipt per retained unit | At 1,000 units | At 3,000 units |
|---|---:|---:|---:|---:|
| JPY 500 | JPY 400 | JPY 240 | JPY 240,000 | JPY 720,000 |
| JPY 800 | JPY 640 | JPY 384 | JPY 384,000 | JPY 1,152,000 |
| JPY 1,200 | JPY 960 | JPY 576 | JPY 576,000 | JPY 1,728,000 |

These receipt-only figures explain deductions; they are not the management break-even measure. At JPY 384 receipts, 79 units would cover JPY 30,000 only if support and other variable costs were zero. Use the full-cost contribution model above for the maintainer's recovery objective. Do not combine different example budgets or hourly rates as if they described one actual ledger.

Sensitivity matters: at the same JPY 640 realized price, a 45%-70% receipt factor gives JPY 288-448 receipts per unit, before support. Lowering the price can increase the number of buyers needed faster than it increases demand. Validate value before selecting the lowest price.

Steam reports gross and net figures differently, and payment thresholds and timing also matter. Use actual partner statements when available. See [reporting and payments](https://partner.steamgames.com/doc/finance/payments_salesreporting/faq) and [taxes](https://partner.steamgames.com/doc/finance/taxfaq), checked on 2026-11-15. The [Direct fee](https://partner.steamgames.com/doc/gettingstarted/appfee) is USD 100 per product and becomes recoupable after USD 1,000 in adjusted gross revenue; that threshold is not Cadence's total development break-even point.

## Limit losses before pursuing volume

No feature list or sales target can guarantee break-even. Limit the amount at risk, then unlock the next investment only with evidence. The following **JPY 30,000 cap is a proposed ceiling for new external cash spending**, not an approved purchase, an actual budget statement or a promise that all required costs fit. Keep existing spending in the full lifetime ledger even when it is excluded from this incremental cap.

| Gate | Proposed cumulative new cash ceiling | Evidence before moving on |
|---|---:|---|
| Concept and first demonstration | JPY 0 | Use the zero-user path in VALIDATION.md; demonstrate the routine with existing tools and label missing behavior. Interview people when available. |
| Safe local trial | JPY 5,000 | Complete the maintainer's checks and any available external study; distinguish self-use from independent return use. |
| Eligible paid release | JPY 30,000, including the earlier tranche | Confirm channel eligibility, actual required fees, a usable package, price evidence and support capacity; include exchange charges and applicable taxes in the quote |

If unavoidable quoted costs exceed the cap, revise the budget explicitly before spending. Do not quietly move signing, tools, artwork, translation or promotion outside it. Steam's USD 100 fee uses the actual payment exchange rate and any applicable taxes; this document does not invent a yen conversion. Hosting and cloud music subscriptions are not required for the offline runtime. Continue with existing tools and audition the prepared tracks before paying for more generations.

Set a separate time budget. Review the next bounded work every 20 hours; do not authorize a new 30-50-hour demonstration project when the current fictional study can explain the idea. This is not a deadline for a safe paid app. The former Windows estimate of 219-358 hours is historical. Use the current Android ranges in [ROADMAP.md](ROADMAP.md#maintenance-and-estimates); no range is an automatic commitment. The 300-hour example above is a hypothetical lifetime total, not that estimate. Learning and self-use may still be worthwhile without commercial evidence; record their purpose, but do not erase the hours when assessing economic return.

Use unit **contribution**, not list price, for spending decisions. The full-cost example above replaces the earlier JPY 84 support allowance. Track support minutes and actual expenses, then replace the assumptions. If net receipts already deduct an expense, do not deduct it again. Recalculate after regional pricing, discounts, returns or support workload changes. Contribution is not take-home income.

Before proven retained sales, use the existing site and a useful demonstration; community sharing remains a separate explicit action. Do not buy broad traffic. After measured contribution is positive, evaluate a bounded promotion test against it. In the JPY 800 example, JPY 100 acquisition cost would leave only JPY 104 of the JPY 204 contribution. Neither amount is an advertising benchmark or approved budget. Attributed purchases can include people who would have bought anyway; do not scale from a handful of conversions.

Count purchases after known refunds and reconcile them with actual payout statements. Store dashboards can show gross sales before deductions, and payout timing is separate from a sale. Do not spend pending receipts on the assumption they are cash in the bank. Steam's standard refund offer includes software applications; review the [official refund policy](https://store.steampowered.com/steam_refunds/), checked on 2026-11-15, rather than trying to prevent normal refunds.

Stop additional commercial spending when the cash ceiling is reached, data-loss defects remain or measured contribution is non-positive. With no external users, demand remains unknown; keep further work bounded as learning and self-use rather than calling it a validated investment. At the 90-day review, inspect traffic, retained buyers and actual contribution separately. Do not borrow against the 3,000-unit annual scenario. Any later commercial expansion needs a bounded estimate supported by receipts and support work.

## Evidence before a paid release

The zero-user route and conditional study checkpoints live in [VALIDATION.md](VALIDATION.md#desktop-demand-and-purchase-test). The maintainer has no external testers available. The proposed sample sizes are not a prerequisite for continuing lessons or local implementation, nor a substitute for release quality or a store's own testing rules. Record missing evidence explicitly. Keep individual feedback private.

| Stage | Proposed checkpoint | Decision |
|---|---|---|
| Problem and concept study | Use the interview and fictional-routine checkpoints in VALIDATION.md | Narrow the audience if most only want free background music |
| Early working trial | Use the small two-week trial after the silent routine and recovery work | Fix the routine before polishing the full music selection |
| Complete-routine trial | Use the separate complete-package confirmation trial in VALIDATION.md | Earlier participants and repeat testers must be identified; do not claim two independent samples |
| Purchase-intent test | Show the working package and two or three honest price alternatives; record reasons and refusals | Intent is weak evidence; do not count it as a sale |
| Demo and store page | When eligible, offer a useful demo and a truthful page; record actual visits before setting a wishlist goal | Lack of traffic and rejection after use need different fixes; wishlists are not revenue |
| Paid launch | Read retained purchases, realized receipts, refund reasons, support minutes per buyer and opt-in feedback | Improve the routine before adding more content or paid promotion |

There is no automatic purchase telemetry in the private planner. Use aggregate store reports and optional feedback. Do not send task text, notes, deadlines or session history to marketing tools.

## Acquisition arithmetic

For the 1,000-unit scenario, retained sales equal `wishlist purchasers + other retained purchasers`, with people counted only once. If 3,000 launch wishlists convert at a hypothetical 5%, 10% or 20%, they contribute only **150, 300 or 600 units**. The remaining **850, 700 or 400 units** must come from other buyers. These are sensitivity cases, not expected Steam conversion rates.

Likewise, 1,000 retained purchases at a hypothetical 2%-5% qualified store-visit conversion need 20,000-50,000 visits. That is a traffic requirement, not evidence the traffic is available. Replace it with observed cohort data. Do not add wishlist and store-visit estimates for the same visitors.

Before eligibility and a real build, use the existing concept site for clearly labelled demonstrations. After eligibility, direct interested people to the store page. Prepare a 30-second routine video, readable screenshots and a playable demo. Demonstrate a deadline, time block, compact focus timer and offline music. Music-only clips may attract listeners who never need the planner, so measure those audiences separately.

Use Chinese, Japanese and English materials already supported by the product direction. Choose two reachable communities or channels first rather than trying every channel. Prepare material for the maintainer to share; this plan does not authorize messages to creators or communities. Do not buy reviews, reward positive reviews or describe generated scenes as implemented gameplay.

## Android-first and advertising

The maintainer accepted Android self-use first on 2026-11-15 in [ADR-015](adr/015-android-self-use-first.md), with no external testers and an Android phone for daily use. [The accepted scope](PRODUCT.md#accepted-android-self-use-scope) prioritizes reliable planning, then a bounded task-linked phone timer. Desktop media and Steam are deferred. This establishes a delivery decision, not an audience, native acceptance or revenue.

| Route | What it can test first | Main economic limitation |
|---|---|---|
| Windows purchase | Whether an independent buyer pays for the complete planning-to-focus workflow | Purchase demand, distribution eligibility, acquisition and support are unknown. |
| Android self-use, no ads | Whether quick capture and Today/Week help the maintainer each day | One person's use is not independent demand or revenue. |
| Later Android ad pilot | Actual eligible impressions, publisher receipts and the effect on continued use | Revenue depends on retained active users and ad opportunities; downloads alone earn nothing. |

Use the current [bounded mobile model](VALIDATION.md#review-screen-ad-pilot) and [Android cost recovery](VALIDATION.md#android-ad-cost-recovery). Its combined example assumes 40% voluntary review reach and 1.5 requests per eligible reviewer under a two-request ceiling. At a hypothetical publisher eCPM of JPY 150 it gives JPY 1.1664 per average Android daily active user per month, before costs. These are unmeasured behavior and rate inputs, not a forecast or measured improvement. A higher ceiling is not two impressions from every active user.

The earlier JPY 3.24-per-DAU scenario and its 7,331-DAU recovery illustration used two opportunities for every active user and omitted ongoing costs. They are historical sensitivity calculations, not the current review-placement budget. Do not reuse them as the Android break-even point. Android development and maintenance have their own example; postponing desktop work does not make native validation, consent, store work and support free. Do not count optional sync server costs as necessary mobile operating costs.

Official sources checked on 2026-11-15:

- [Google Play registration](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en) lists a USD 25 one-time account fee. No payment is authorized here.
- [New personal-account testing](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en) requires accounts created after 2023-11-13 to have at least 12 testers continuously opted in for 14 days before applying for production access. Application is not automatic approval. The maintainer reported having no developer account on 2026-11-15. Local self-use does not satisfy this requirement.
- [Google Mobile Ads for Flutter](https://developers.google.com/admob/flutter/quick-start) supports Android and iOS, not desktop or Web. No SDK is added by this review.
- [AdMob payment thresholds](https://support.google.com/admob/answer/2772208?hl=en) list JPY 8,000 for payment in a JPY reporting account. Estimated revenue and cash received differ; use the actual account's currency and payment status.

Accepted direction: Android planning self-use first, bounded phone focus next, and ads only after a useful mobile release and an ad-free usage baseline. Preserve the shared Flutter codebase and existing site. The [active estimate](ROADMAP.md#maintenance-and-estimates) excludes desktop media and Steam. Evaluate full-cost recovery from measured receipts; neither ads nor later desktop purchases are guaranteed income.

## Launch and stop rules

- Before launch: finish data recovery, content review, offline/native checks, accessibility and accurate store claims. A wishlist goal cannot waive these gates.
- Days 1-30: prioritize lost-data, timer and audio defects. Read available refund reasons. Compare actual traffic and retained purchases; no volume scenario authorizes promotion spending.
- Days 31-90: improve the main reason people stop using or buying. A small free polish/content update may be justified by feedback; do not promise monthly albums.
- At 90 days: review audience, offer, traffic and full-cost recovery. Keep commercial scope growth and paid acquisition paused without evidence of positive contribution and a viable acquisition route. A low-traffic launch and a high-traffic/low-conversion launch need different fixes.
- At 1,000 units: review contribution after support costs. Expand only if repeat use and retained purchases support it. At 3,000 units: consider the next bounded content or platform milestone; do not assume recurring income.

A complete low-priced desktop product can be a viable small business experiment. Revenue is earned through retained purchases and manageable costs; it cannot be ensured by feature count, a Steam listing or more generated music.
