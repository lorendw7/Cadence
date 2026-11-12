# Repository instructions

## Documentation

- Write all repository documentation in plain English. This applies to new and updated files, including READMEs, design documents, lesson notes, maintenance guides, and generated asset documentation.
- Use short sentences, familiar words, and concrete examples. Explain technical terms when they first appear.
- Keep product translations separate from documentation. The website and future app may use Japanese, English, and Chinese. Do not remove those translations when editing documentation.
- Keep document paths stable. Update the documentation index and local links when adding or moving a document.
- Separate implemented behavior, planned work, historical lesson results, and checks that still need a person to confirm them. Never describe a plan or a passing build as a released feature.

## Learning and implementation

- The learner writes new core application features. Explain one small lesson at a time; review the learner's code and provide relevant tests.
- Keep `lib/main.dart` as the teaching entry. Do not implement future lessons, add unused packages, or create empty architecture layers.
- The assistant may maintain delegated documentation, artwork, the website, repository checks, and behavior-preserving cleanup.
- Current progress belongs in `docs/LEARNING.md`. Lesson notes keep their historical results. Product scope belongs in `docs/PRODUCT.md` and release gates in `docs/ROADMAP.md`.

## Design and delivery

- Preserve the independent academic-journal identity and existing GitHub Pages website. Do not create a second hosted site.
- Cadence is a general-purpose local planner for work, study, and daily life. Target desktop, Web, Android and iOS under ADR-010. Complete the free local edition first. Cloud sync, paid capacity and supplementary ads are deferred until review after store launch. External academic systems and school login remain excluded.
- Keep the core usable without school identity or network access. At first use, let the user choose local saving or a temporary session. Do not imply that planned saving already works.
- The public website is a concept presentation. General product releases do not need school permission. School-connection research is historical reference only. Do not revive those integrations without a new explicit product decision.
- Read `assets/README.md` before regenerating artwork. Keep editable sources, exports, and the manifest in sync.
- Continue open-source development under the existing MIT license. Do not implement new app features, accounts, billing, ads or cloud infrastructure as documentation work.
- Preserve unrelated work. Inspect the Git diff before committing and never force-push the main branch.
- Run the relevant checks from `tools/README.md` and `docs/SETUP.md`. Report checks that could not run; do not claim they passed.
