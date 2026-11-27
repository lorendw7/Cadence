# ADR-016: Return to open source and an unofficial Kyushu University preset

**Status:** Accepted direction. The new public repository does not exist yet. The current repository is still private.
**Date:** 2026-11-27
**Decider:** The maintainer asked to make Cadence open source again and to aim it at Kyushu University. They then accepted the recommended route below.

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
2. **Publish through a new public repository** that starts from a reviewed copy of the current files, without the old history. Keep `lorendw7/Cadence` private as the full working history. Do not rewrite or force-push its main branch.
3. **Check before publishing.** Scan for secrets again, confirm that no private material is in the copied files, and use the GitHub noreply address as the commit author. Update links and the statements that say the repository is private. Remove or reword website links that point to the private repository. Only the maintainer creates the repository and changes its visibility.
4. **Keep the core general.** Cadence stays a planner for work, study and daily life ([ADR-007](007-general-purpose-local-planner.md)). Kyushu University students are the first intended community, not a required identity.
5. **Plan an optional Kyushu University preset for later.** A preset is a set of starting values the user can turn on and edit. It would use only information the university publishes openly: class period times, the quarter terms, the academic calendar and campus names. It reads no school system and needs no student number or password. It comes after direct plans, repeats and occurrence corrections work on Android. Its period and term rules are learner-owned code under [CURRICULUM.md](../CURRICULUM.md).
6. **Describe it as unofficial.** Use wording such as "made by a Kyushu University student, not an official university service". Do not use the university emblem or logo, or wording that suggests approval. Ask the university's public relations office before using the university name in the product name, the icon or advertising.
7. **Offering Cadence to the university is a later goal, not current work.** Any request for name use, promotion or school data needs its own decision and follows ADR-013. No contact, application or integration is scheduled by this decision. Private correspondence stays outside the repository.

## Options considered

| Option | Benefit | Cost or risk | Decision |
|---|---|---|---|
| Make the current repository public | No new repository | Republishes personal pitch material and author email from history | Rejected |
| Rewrite history, then make it public | Keeps one repository | Needs a force push of main, which repository rules forbid without separate approval | Not selected |
| New public repository from a reviewed copy | Clean public start; private history kept | Two repositories to keep in step | Selected |
| A Kyushu-only product | Clear audience | Smaller user base; implies a link to the university | Rejected |
| A general core with an optional, unofficial preset | Useful to Kyushu students without school permission | Preset data must be checked each school year | Selected for later |

## Consequences and precedence

This replaces the private-development choice in ADR-014 and ADR-015 once the new public repository exists. Their other decisions remain: Android self-use first, ad limits and the desktop purchase hypothesis. Public source makes a paid desktop build less exclusive; review that hypothesis again before any price is set.

ADR-013 still owns school access. A preset built from public information is not a school connection, and it does not need school permission.

This decision changes the plan only. It does not create a repository, change visibility, publish the website, contact the university or add app features.

## Follow-through

- [ ] Maintainer: create the new public repository and push the reviewed copy.
- [ ] Update REPOSITORY.md, PRODUCT.md, the website links and AGENTS.md once the public repository exists.
- [ ] After Android planning acceptance: write the preset's data rules as a learner exercise, using fictional tests first.
- Later only: decide whether to ask the university for name use, promotion or data access.
