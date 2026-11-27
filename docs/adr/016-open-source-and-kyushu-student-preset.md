# ADR-016: Return to open source and an unofficial Kyushu University preset

**Status:** Accepted direction. The history rewrite and the visibility change are not done yet. The repository is still private.
**Date:** 2026-11-27
**Decider:** The maintainer asked to make Cadence open source again and to aim it at Kyushu University. They accepted the recommended preset and branding route below. For publication they chose to rewrite this repository's history and make it public (option B), instead of a new repository.

## Context

On 2026-11-15 the maintainer chose private development ([ADR-014](014-desktop-focus-and-mobile-ads.md), [ADR-015](015-android-self-use-first.md)). The code is still under the MIT license. MIT is a permissive open-source license: anyone may reuse the code if they keep the notice.

The maintainer now wants the source to be public again. They also want Cadence to become a tool made especially for Kyushu University, and possibly to offer it to the university.

A pre-publication check on 2026-11-27 found these points:

- The current files contain no matched secret patterns, signing files or personal email addresses.
- The Git history still contains deleted personal pitch material (`docs/QREC_PITCH.md` and its Chinese translation). [AGENTS.md](../../AGENTS.md) keeps such material out of the product repository unless the maintainer explicitly asks to publish it.
- Most history commits use the maintainer's personal email address as the author address.

Making the current repository public would publish all of that history again.

The university part also has limits. A university name or emblem can suggest official approval. A university cannot simply accept unsolicited software: it needs a security review, a responsible office and a maintenance plan. [ADR-013](013-local-planner-and-conditional-academic-access.md) still defers school-system access and applications.

## Decision

1. **Return to open source under the existing MIT license.** Do not change the license or notices.
2. **Rewrite this repository's history, then make it public.** Remove the two pitch files from every commit and change the author address from the personal email to the GitHub noreply address on every branch. Keep a private backup bundle of the old history outside the repository. This is a one-time, maintainer-approved exception to the rule against force-pushing main. The maintainer runs the force push from their own computer.
3. **Check before publishing.** Confirm that no branch still contains the pitch files or the personal email. Old clones, including the Windows clone, must be replaced by a fresh clone so the old history is not pushed back. Then the maintainer changes the visibility and enables GitHub Pages with GitHub Actions as the source.
4. **Keep the core general.** Cadence stays a planner for work, study and daily life ([ADR-007](007-general-purpose-local-planner.md)). Kyushu University students are the first intended community, not a required identity.
5. **Plan an optional Kyushu University preset for later.** A preset is a set of starting values the user can turn on and edit. It would use only information the university publishes openly: class period times, the quarter terms, the academic calendar and campus names. It reads no school system and needs no student number or password. It comes after direct plans, repeats and occurrence corrections work on Android. Its period and term rules are learner-owned code under [CURRICULUM.md](../CURRICULUM.md).
6. **Describe it as unofficial.** Use wording such as "made by a Kyushu University student, not an official university service". Do not use the university emblem or logo, or wording that suggests approval. Ask the university's public relations office before using the university name in the product name, the icon or advertising.
7. **Offering Cadence to the university is a later goal, not current work.** Any request for name use, promotion or school data needs its own decision and follows ADR-013. No contact, application or integration is scheduled by this decision. Private correspondence stays outside the repository.

## Options considered

| Option | Benefit | Cost or risk | Decision |
|---|---|---|---|
| Make the current repository public | No new repository | Republishes personal pitch material and author email from history | Rejected |
| Rewrite history, then make it public | Keeps one repository, its branches and its history | One approved force push of main; old clones must be replaced; limits below | Selected by the maintainer |
| New public repository from a reviewed copy | Clean public start; private history kept | Two repositories to keep in step | Recommended first, not chosen |
| A Kyushu-only product | Clear audience | Smaller user base; implies a link to the university | Rejected |
| A general core with an optional, unofficial preset | Useful to Kyushu students without school permission | Preset data must be checked each school year | Selected for later |

## Consequences and precedence

Known limits of the rewrite. GitHub keeps pull request #1's head as a read-only reference. Its nine commits will still show the old author email on that pull request page; only GitHub Support can remove it. Old commit pages may stay reachable by their hash until GitHub clears cached data. Neither limit includes the pitch files, which no branch or pull request reached after 2026-11-12.

This replaces the private-development choice in ADR-014 and ADR-015 once the repository is public. Their other decisions remain: Android self-use first, ad limits and the desktop purchase hypothesis. Public source makes a paid desktop build less exclusive; review that hypothesis again before any price is set.

ADR-013 still owns school access. A preset built from public information is not a school connection, and it does not need school permission.

This decision changes the plan only. It does not create a repository, change visibility, publish the website, contact the university or add app features.

## Follow-through

- [ ] Maintainer: run the history rewrite and force push from their computer, then replace old clones.
- [ ] Maintainer: make the repository public and enable GitHub Pages.
- [ ] Update REPOSITORY.md, PRODUCT.md and AGENTS.md once the repository is public.
- [ ] After Android planning acceptance: write the preset's data rules as a learner exercise, using fictional tests first.
- Later only: decide whether to ask the university for name use, promotion or data access.
