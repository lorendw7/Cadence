<img src="assets/brand/cadence-icon-v2.svg" alt="" width="88" align="left" hspace="16">

# Cadence

**A calm place for your time.** A local planner for work, study, and everyday life.

<br clear="left">

Cadence is being designed around three views: **Today, Week, and Tasks**. The desktop app should work offline without an account. At first use, people will choose whether to save on their device or use a temporary session. External academic-system connections, school login and automatic timetable retrieval are outside the current plan.

**Current status:** the learning app supports task input, validation, addition, completion, deletion, and undo of the latest deletion. Data stays in memory. Persistence and the full planner are not implemented. The [learning log](docs/LEARNING.md) owns current lesson progress, automated results and pending actual-window checks. Design documents and successful builds do not establish release readiness.

[Website](https://lorendw7.github.io/Cadence/) · [Product](docs/PRODUCT.md) · [Design](docs/REDESIGN.md) · [Roadmap](docs/ROADMAP.md) · [Setup](docs/SETUP.md) · [Documentation](docs/README.md)

## Product direction

The planned desktop edition includes task editing and deadlines, timed and all-day plans, bounded weekly repeats, Today, Week, local saving or temporary use, private backup/restore and data clearing. It will provide Japanese, English and Chinese controls, keyboard access and layouts that remain readable when resized. See the [feature baseline and current limits](docs/PRODUCT.md#first-useful-local-product). Courses, reminders, review statistics and assisted import are later options.

Cadence has one free feature set for everyone. There is no paid tier, subscription, paid expansion or paid priority. Any future cloud service uses the same published quota rules for everyone. Ads are the only possible future revenue model in this plan and do not unlock features or extra capacity.

- Plan appointments, focused work, study, and personal time together.
- Keep tasks and bounded repeating plans easy to create, edit, and complete.
- Target Windows, Linux, macOS, Web, Android and iOS with free local planning and no required account or server.
- Make local saving, temporary use, backup, recovery, and deletion clear.
- Support Japanese, English, and Chinese, keyboard use, and readable layouts.

These are design goals under [ADR-010](docs/adr/010-open-multiplatform-free-first.md). Finish the free desktop edition first: a complete Windows flow, then native macOS/Linux validation. Web and mobile remain later directions and do not expand the current milestone. Review possible free cloud sync and advertising only after store launch. External academic-system connections remain excluded. See the [free-edition design](docs/FREE_EDITION.md).

General product releases do not depend on a school. Historical school-connection notes do not authorize integration work. Cadence is independent and has no university endorsement. The latest scope decision is [ADR-010](docs/adr/010-open-multiplatform-free-first.md).

## Learn by building

The learner writes core application features. The assistant explains, reviews, prepares useful tests, and maintains delegated documents, artwork, and the website. Work advances one small lesson at a time; lib/main.dart remains the teaching entry.

Start with [the learning guide](docs/LEARNING.md) and [curriculum](docs/CURRICULUM.md). Earlier course-heavy estimates are being separated into core and optional work. Lesson counts are estimates, not release promises.

All repository documentation uses plain English. This rule also applies to future updates; see [AGENTS.md](AGENTS.md). Product translations remain separate.

## Run the current app

Use Flutter **3.44.4** / Dart **3.12.2**, matching CI.

```sh
flutter pub get
flutter run -d windows
```

Use the matching Linux/macOS target on a configured host. [Setup](docs/SETUP.md) lists the required tools and checks. There is no implemented Web planner in this checkout.

The product UI uses Flutter shadcn_ui, introduced one used control at a time. Introduce drift with local saving; add another package only for a demonstrated need. [ADR-008](docs/adr/008-small-free-local-product.md) records the smaller design, including explicit Save, memory-only unsaved forms and ordinary local storage. [pubspec.yaml](pubspec.yaml) and its lockfile record installed dependencies. The starter version is not a production-readiness claim.

## Artwork and website

The quiet journal style uses pure white, muted wine and graphite, with paper and sage kept inside the original color artwork. The v2 library has 56 interface icons, 10 state illustrations, an editorial image, patterns, platform icons, and a sharing card. Responsive WebP exports reduce website image size while preserving the original artwork.

The catalogue groups assets by use and offers local search, family filters, size samples, and downloads. Current artwork and retained originals are clearly marked. Both preview sheets are generated from the artwork sources, and the checker detects stale previews. The [catalogue browser check](assets/README.md#catalogue-browser-check) records verified interactions, widths, and remaining limits.

[Visual overview](assets/preview.png) · [Full contact sheet](assets/preview-library.png) · [Catalogue](assets/catalog.html) · [Artwork guide](assets/README.md) · [Design system](docs/DESIGN.md)

The Japanese/English/Chinese website shows fictional concepts. It is not a working planner or a download page. GitHub Pages publishes only the website directory.

## Repository

| Path | Purpose |
|---|---|
| lib/ and test/ | Learning app and active tests |
| docs/ | Product, architecture, learning, and release guides |
| lessons/ | Historical exercise templates |
| assets/ | Artwork sources and exports |
| website/ | Static concept website |
| tools/ | Generators and read-only checks |
| windows/, linux/, macos/ | Desktop runners |
| android/ | Existing scaffolding; Android release acceptance is future work |
| .github/workflows/ | Checks, desktop builds, and website delivery |

See [the repository map](docs/REPOSITORY.md) and [maintenance tools](tools/README.md).

## Checks

```sh
node tools/check_repository.cjs
node tools/check_website.cjs
python tools/check_artwork.py
dart format --output=none --set-exit-if-changed lib test
flutter analyze --fatal-infos --fatal-warnings
flutter test
```

## License

[MIT](LICENSE) © 2026 lorendw7
