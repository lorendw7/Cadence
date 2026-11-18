# ADR-014: Desktop focus, mobile-only ads and a purchase experiment

Visibility amendment (2026-11-15): the maintainer later authorized making the repository private and taking Pages offline. The GitHub API confirmed the private state; the former Pages URL returns HTTP 404. Keep website source for future server deployment. MIT remains unchanged. This amendment supersedes the website-preservation condition and pending visibility state in the historical decision below.

**Status:** Partly superseded by [ADR-015](015-android-self-use-first.md). Android self-use now precedes the desktop focus package and sales study. The original decision below remains historical for order; mobile-only ad limits, private-development direction and the later desktop purchase hypothesis remain. No feature, store release or revenue is established.
**Date:** 2026-11-15

## Context

The maintainer asked to develop privately while keeping the existing website and leaving the license decision for later. They then selected desktop use without ads and asked about mobile advertising. They want a route to revenue and are willing to consider a one-time desktop purchase without setting a price. They also asked for market evidence and an affordable offer that can attract users. Price candidates and acquisition experiments belong in VALIDATION.md; none is a chosen price or an income promise.

The app still keeps tasks in memory. The timetable survey did not measure demand for a focus tool, willingness to pay, Steam adoption or advertising income. A plan cannot guarantee sales.

## Decision

1. Keep tasks, deadlines, Today, Week, personal plans, local saving and recovery central. Test the product with people who regularly study or work on a Windows computer. Retain the journal identity and one shared Flutter codebase.
2. Add a bounded desktop focus stage after the reliable local planner: choose a task, run a focus interval, take a break and review recorded timer time. Timer time is not proof of attention or task completion. The learner owns timing, state, lifecycle and save decisions.
3. Keep one optional Wallpaper Engine connection as a post-launch candidate under the scope update below. If selected later, use its documented controls. It must not be needed to use Cadence. Do not build a wallpaper engine, asset marketplace, pet system or generic integration framework.
4. Keep every desktop distribution free of ads, sponsor cards, ad SDKs and ad requests. The concept website and future Web planner also have no advertising in this plan. Android and iOS are the only candidates for a later advertising pilot.
5. Evaluate a one-time purchase for the desktop product as the preferred revenue hypothesis. This relaxes the earlier ban on considering a paid desktop edition; it does not approve a price, payment system or paid release. A free mobile core with optional later ads is the companion hypothesis. Do not add subscriptions, paid capacity, paid priority or rewarded feature unlocks. Define the exact offer, support scope and price before any real sale.
6. Validate usefulness and purchase intent before investing in more platforms. Prepare a usable Windows trial, then consider Steam distribution. Steam eligibility, commercial terms and package acceptance are separate gates. A Steam delay must not stop local development or Android validation.
7. Adapt Android after the Windows planning and focus trial. Ship and measure the mobile core before testing ads. iOS follows host and device readiness. macOS/Linux and Web keep separate later acceptance. A shared codebase does not establish platform support.
8. Keep school access, screenshot/file import, cloud sync and AI outside this delivery milestone. School access still needs documented permission and an official data route. No school-password collection or scraping. Personal cloud sync needs its own recurring-cost decision; desktop purchases do not promise permanent hosting.
9. Record private development as the selected source-distribution direction, while keeping the current MIT license unchanged. The GitHub visibility change is still pending because the existing Pages site must be preserved and private-repository Pages entitlement is unconfirmed. Do not report the repository as private or remove existing notices.

## First-release scope update on 2026-11-15

The maintainer selected reuse of existing tools and media, without recharging fal. [DESKTOP_V1.md](../DESKTOP_V1.md) defines the bounded first offer: useful planning, one task-linked focus/break countdown, compact mode in the same window, daily pins/search, seven-day review, one static room image and accepted existing tracks. The purchase hypothesis is a smooth complete routine with reliable data and a calm presentation.

Count-up, automatic cycles, named profiles, checklists, an ambient mixer, extra scenes/themes and Wallpaper Engine are deferred. The 12 synthetic music drafts remain prepared candidates; listening review decides the shipped selection. No new paid generation, application feature or dependency is introduced by this documentation update. The learner-owned implementation boundary remains unchanged.

## Evidence gates

- Interview 8-12 relevant users about a recent task, their current tool and the cost of the problem. This is a proposed small sample, not research already completed.
- After recovery works, run a two-week trial with about 10 users. Record invitations, actual use, assistance, defects and reasons for returning or stopping. Five users returning on at least three separate days is an initial internal decision threshold, not proof of market demand.
- Test the purchase offer with a concrete usable build. Stated interest and wishlists are weaker evidence than retained purchases after applicable refunds. Seek an initial 10 independent purchases before expanding commercial scope; this is a target, not a sales forecast. Document price, channel, support and refund terms first.
- If users do not return, improve the core workflow before adding wallpaper features, ads or more platforms. If they return but will not buy, revisit the offer and price before increasing spend.
- Measure mobile ad income only from eligible mobile impressions. Count desktop and Web ad income as zero. No-fill, denied consent or ad failure must leave the core usable.

## Official references checked on 2026-11-15

- [Steam advertising guidance](https://partner.steamgames.com/doc/marketing/advertising) says advertising elements used on other platforms must be removed before shipping on Steam. This supports evaluating separate builds; it does not establish acceptance of this non-game planner.
- [Steam onboarding](https://partner.steamgames.com/doc/gettingstarted/onboarding) lists eligible non-game categories and review requirements. Confirm Cadence's actual fit with Steamworks before committing to this channel.
- [Wallpaper Engine controls](https://help.wallpaperengine.io/en/functionality/cli.html) document pause, play and wallpaper changes. Arbitrary wallpaper overlays and reliable full-state restoration are not established by that interface alone.
- [Google Mobile Ads for Flutter](https://developers.google.com/admob/flutter/quick-start) supports Android and iOS only. Follow [UMP](https://developers.google.com/admob/flutter/privacy), [Google Play ads policy](https://support.google.com/googleplay/android-developer/answer/9857753) and [Apple review rules](https://developer.apple.com/app-store/review/guidelines/) for any later pilot.

## Precedence and limits

This refines ADR-013 with desktop focus and a Steam channel study. It supersedes desktop/Web advertising candidates and the rule that all revenue experiments must use ads. It also supersedes mandatory public development, while leaving LICENSE unchanged. Other local data, learning and school-access boundaries remain.

[PRODUCT.md](../PRODUCT.md) owns scope, [ROADMAP.md](../ROADMAP.md) owns delivery and FREE_EDITION.md retains its stable path for access and advertising policy. Historical lesson results stay unchanged. This decision sends no messages, changes no remote settings, publishes nothing and adds no dependencies.
