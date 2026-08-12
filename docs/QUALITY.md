# Quality — the production bar

"Production-grade" is a set of habits, not a milestone. This file defines the bar every feature must clear **before its roadmap checkbox is ticked**.

---

## Definition of done (every feature, no exceptions)

- [ ] **Strings in all three ARBs** (ja / en / zh) — Japanese written first as the reference locale; no hard-coded UI text, ever.
- [ ] **Dark mode checked** — both themes, no unreadable contrast.
- [ ] **Font scaling checked** — usable at 200% system font size (Japan skews older; also a Play quality item).
- [ ] **Tests for the logic** — anything with date math, money math, recurrence, or import/export gets unit tests the same day it's written.
- [ ] **Error states designed** — the user sees a translated, actionable message; never a raw exception or a silent failure.
- [ ] **Works on both targets** — run on Android emulator + Windows before committing.
- [ ] `flutter analyze` clean, `dart format` applied, CI green.

---

## Testing strategy (the pyramid, sized for one developer)

| Layer | What | Tooling |
|-------|------|---------|
| **Unit (most)** | Recurrence expansion + 祝日 skip, streak math, earnings math (breaks, overnight, wage-change dates), export⇄import round-trip, kana-folding search | `flutter test` |
| **Widget (some)** | Event form validation, check-in tap → UI update, timetable grid rendering | `flutter test` (widget tests) |
| **Integration (few)** | One smoke test: create event → see it on calendar → export → wipe → import → still there | `integration_test` on emulator |

**The rule that matters:** logic that can corrupt user data or lie to the user (dates, money, import) is *born with tests*. UI polish can be eyeballed; a wrong monthly wage estimate cannot.

Time handling discipline: all date logic goes through one `AppClock`/date-utils module that tests can freeze. No `DateTime.now()` scattered in widgets — untestable time bugs are how calendars die.

---

## CI (GitHub Actions, added in v0.0)

Every push / PR: `flutter pub get` → `flutter analyze` (warnings = errors) → `flutter test`. Release tags additionally build the Android `.aab` and Windows zip as artifacts. Keep CI under ~5 minutes so it never gets skipped.

---

## Performance budgets

- Cold start to interactive calendar: **< 2 s** on a mid-range phone.
- Frame budget: no jank scrolling a month with 200 events (use `ListView.builder`/slivers, never build the whole year).
- DB: every calendar query hits an index (`start_time`); watch query plans when adding features.
- App size: keep the release `.aab` lean; no asset bloat (holiday data is a few KB of JSON).

## Reliability & data safety

- **Crash-free by design, not by telemetry**: there is no crash reporter (no network!). Instead: a local, user-visible error log (Settings → "recent errors → share"), so bug reports can travel by LINE/GitHub issue like everything else.
- Every DB write path is transactional; import is validate-then-apply; **auto-backup before any import/replace and any schema migration**.
- Migrations are tested against a copy of a real database file before release.

## Accessibility & inclusivity

- TalkBack labels on interactive elements; 48dp touch targets.
- Color is never the only signal (priority also shows an icon/text).
- Honors system font scale (see DoD) and reduced-motion.

## Release discipline (see RELEASE.md for the Play specifics)

- Semantic versions, bumped `versionCode` every upload; `CHANGELOG.md` maintained per release (user-facing wording, ja/en).
- Release builds tested on a real device before upload — release mode surfaces what debug hides.
- Staged rollout; watch Play vitals (ANR/crash) before 100%.
- Git tag per release; GitHub Release carries the Windows build + sideload `.apk`.

## Scope discipline (product quality)

Every new idea passes three questions before entering the roadmap:
1. Does it work **fully offline**?
2. Does it serve a persona in [PRODUCT.md](PRODUCT.md)?
3. Can one person maintain it forever?

Two noes = it goes to "Later" or gets cut. The most production-grade feature is the one you didn't ship half-baked.
