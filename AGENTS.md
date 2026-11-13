# Repository instructions

## Documentation

- Write all repository documentation in plain English. This applies to new and updated files, including READMEs, design documents, lesson notes, maintenance guides, and generated asset documentation.
- Use short sentences, familiar words, and concrete examples. Explain technical terms when they first appear.
- Keep product translations separate from documentation. The website and future app may use Japanese, English, and Chinese. Do not remove those translations when editing documentation.
- Keep document paths stable. Update the documentation index and local links when adding or moving a document.
- Keep personal funding applications, pitch scripts, interview practice, translations of those materials, and private correspondence outside this public repository. A general request to organize documentation or push main does not authorize publishing them; require an explicit request to publish those specific materials.
- Separate implemented behavior, planned work, historical lesson results, and checks that still need a person to confirm them. Never describe a plan or a passing build as a released feature.

## Learning and implementation

- The learner writes learning-critical core code: data rules, state changes, async failure decisions, and the first representative Dart and Flutter implementations. Explain one small lesson at a time; review the learner's code and provide relevant tests. Core practice includes widgets, layout, callbacks and lifecycle, not only business functions.
- Keep `lib/main.dart` as the teaching entry. Do not implement future lessons, add unused packages, or create empty architecture layers.
- Under the learner's standing delegation, the assistant may complete supporting work for the current lesson: repeated wiring and components, visual polish, translation wiring, test setup and broader regressions, build checks, documentation, artwork, the website, and behavior-preserving cleanup. State the learner-owned code and support boundary before editing; no repeated permission is needed for that supporting work.
- A new business rule, state owner, lifecycle decision or save/failure contract is learning-critical even when it appears inside supporting code. Keep it in the learner's small exercise unless explicitly delegated. Do not turn the exercise into isolated blanks or count assistant-written code as independent mastery. See `docs/CURRICULUM.md` for the division of work and Dart/Flutter practice.
- Current progress belongs in `docs/LEARNING.md`. Lesson notes keep their historical results. Product scope belongs in `docs/PRODUCT.md` and release gates in `docs/ROADMAP.md`.

## Design and delivery

- Preserve the independent academic-journal identity and existing GitHub Pages website. Do not create a second hosted site.
- Cadence is a local time-management and planning app for work, study, and daily life. Under ADR-013, keep tasks, deadlines, personal plans, Today and Week central. Build useful direct editors on Windows, then adapt and validate Android without waiting for all macOS/Linux releases. Screenshot import is optional, unscheduled work only if a real need appears; it is not a release gate. CSV/table import is also deferred. Keep one shared Flutter codebase; iOS, macOS/Linux and Web need separate platform acceptance. Cloud sync and optional ads remain deferred until review after store launch. School connection research, application preparation and implementation are deferred extensions, outside the current delivery milestone. Real access remains conditional on school authorization and a documented data route; no school passwords or scraping.
- Cadence has one free feature set for everyone. There is no paid tier, subscription, paid expansion or paid priority. Any future cloud service uses the same published quota rules for everyone. Ads are the only possible future revenue model in this plan and do not unlock features or extra capacity.
- Keep the core usable without school identity or network access. At first use, let the user choose local saving or a temporary session. Do not imply that planned saving already works.
- The public website is a concept presentation. General product releases do not need school permission. ADR-013 keeps school connection research and implementation as deferred extensions. Do not describe preparation as a submitted application, approved access or implemented integration. Authentication permission and timetable-data permission are separate. A school connection must not block the independent local release.
- Read `assets/README.md` before regenerating artwork. Keep editable sources, exports, and the manifest in sync.
- Continue open-source development under the existing MIT license. Do not implement new app features, accounts, billing, ads or cloud infrastructure as documentation work.
- Preserve unrelated work. Inspect the Git diff before committing and never force-push the main branch.
- Run the relevant checks from `tools/README.md` and `docs/SETUP.md`. Report checks that could not run; do not claim they passed.
