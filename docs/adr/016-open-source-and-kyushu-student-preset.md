# ADR-016: Return to open source as an independent project

The file name keeps its first title so existing links still work.

**Status:** Accepted and carried out. History rewritten, repository made public and concept site redeployed on 2026-11-27.
**Date:** 2026-11-27
**Decider:** The maintainer asked to make Cadence open source again. For publication they chose to rewrite this repository's history and make it public (option B), instead of creating a new repository. They first considered aiming Cadence at Kyushu University, then decided to keep it an independent personal project.

Independence amendment (2026-11-27). The earlier draft of this decision planned an unofficial Kyushu University preset. The maintainer withdrew that plan on the same day. The Kyushu University options remain in the table below as history.

Rewrite record (2026-11-27). The maintainer's computer was unavailable, so they explicitly approved running the rewrite and force push from the cloud session. All four branches, including main, were rewritten and force-pushed. A fresh clone from GitHub then showed no branch containing the pitch files and no commit with the personal email. Each branch's latest files were the same before and after. Pull request #1 keeps its old read-only head, as described under the known limits.

## Context

On 2026-11-15 the maintainer chose private development ([ADR-014](014-desktop-focus-and-mobile-ads.md), [ADR-015](015-android-self-use-first.md)). The code is still under the MIT license. MIT is a permissive open-source license: anyone may reuse the code if they keep the notice.

The maintainer now wants the source to be public again. They also asked whether Cadence should become a tool made especially for Kyushu University.

A pre-publication check on 2026-11-27 found these points:

- The current files contain no matched secret patterns, signing files or personal email addresses.
- The Git history still contained deleted personal pitch material (`docs/QREC_PITCH.md` and its Chinese translation). [AGENTS.md](../../AGENTS.md) keeps such material out of the product repository unless the maintainer explicitly asks to publish it.
- Most history commits used the maintainer's personal email address as the author address.

A university-specific product has costs. A university name can suggest official approval. Calendar data must be checked every school year. The audience is smaller, and maintenance after graduation becomes a problem. The app also stores tasks only in memory today. A university preset would need repeats and timetables first, which are many lessons away. Entering a university's period times is mostly data entry, not the core knowledge the learner wants to practice.

## Decision

1. **Return to open source under the existing MIT license.** Do not change the license or notices.
2. **Rewrite this repository's history, then make it public.** Remove the two pitch files from every commit. Change the author address from the personal email to the GitHub noreply address on every branch. This was a one-time exception to the rule against force-pushing main, and the maintainer approved it.
3. **Check before publishing.** Confirm that no branch still contains the pitch files or the personal email. Replace old clones, including the Windows clone, with fresh clones so the old history is not pushed back. Then the maintainer changes the visibility and enables GitHub Pages with GitHub Actions as the source.
4. **Stay an independent, general project.** Cadence remains a planner for work, study and daily life for anyone, as in [ADR-007](007-general-purpose-local-planner.md). No school identity, name or emblem is used.
5. **Kyushu University friends may be early testers.** That needs no branding or permission. Their feedback is personal evidence, not proof of wider demand.
6. **No university preset is planned.** If many users later need preset class periods or term dates, decide that separately. A general way to enter one's own periods and terms comes first.
7. **School access stays deferred** under [ADR-013](013-local-planner-and-conditional-academic-access.md). No contact, application or integration is scheduled.

## Options considered

| Option | Benefit | Cost or risk | Decision |
|---|---|---|---|
| Make the current repository public as it was | No extra work | Republishes personal pitch material and author email from history | Rejected |
| Rewrite history, then make it public | Keeps one repository, its branches and its history | One approved force push of main; old clones must be replaced; limits below | Selected by the maintainer |
| New public repository from a reviewed copy | Clean public start; private history kept | Two repositories to keep in step | Recommended first, not chosen |
| A Kyushu-only product | Clear audience | Smaller audience; suggests a university link; yearly upkeep | Rejected |
| A general core with an optional, unofficial Kyushu preset | Useful to Kyushu students | Yearly data checks; little learning value; needs repeats first | Considered, then withdrawn |
| An independent general project with Kyushu friends as early testers | Freedom of direction; core learning stays general | No ready-made university data | Selected |

## Consequences and precedence

Known limits of the rewrite. GitHub keeps pull request #1's head as a read-only reference. Its commits still show the old author email on that pull request page; only GitHub Support can remove it. Old commit pages may stay reachable by their hash until GitHub clears cached data. Neither limit includes the pitch files, which no branch or pull request reached after 2026-11-12.

This replaces the private-development choice in ADR-014 and ADR-015 once the repository is public. Their other decisions remain: Android self-use first, ad limits and the desktop purchase hypothesis. Public source makes a paid desktop build less exclusive; review that hypothesis again before any price is set.

This decision changes the plan only. It does not change visibility, publish the website, contact the university or add app features.

## Follow-through

- [x] Rewrite history and force push, with the maintainer's explicit approval (2026-11-27).
- [ ] Maintainer: replace old clones, including the Windows clone, with fresh clones.
- [x] Maintainer: make the repository public and re-enable the Pages workflow (2026-11-27).
- [x] Update REPOSITORY.md, PRODUCT.md and AGENTS.md to the public state (2026-11-27).
