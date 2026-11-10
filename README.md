<img src="assets/brand/cadence-icon.svg" alt="" width="88" align="left" hspace="16">

# Cadence

**Courses and personal plans, together.** A local-first planner being built for all Kyushu University students.

<br clear="left">

**Development status:** the app currently displays a Today placeholder. Windows, Linux, macOS and Android runners exist; course management, storage and sharing are not implemented yet. There is no downloadable feature-complete release.

**Product direction:** Windows, Linux and macOS, distributed initially through GitHub Releases. No mobile app development is planned; Android is retained only as legacy scaffolding. A Web scheduling system is a candidate pending feasibility and security review; the current website is a static project introduction.

Cadence is an independent student project. University endorsement and system access have not been obtained. Optional school-approved authentication and read-only timetable import are planned goals; basic local use will not require an account.

[Product design / 产品设计](docs/REDESIGN.md) · [Roadmap](docs/ROADMAP.md) · [Security / 数据保护](docs/SECURITY.md) · [University integration](docs/UNIVERSITY_INTEGRATION.md) · [Setup](docs/SETUP.md) · [Documentation](docs/README.md) · [Website](https://lorendw7.github.io/Cadence/)

## What we are building

- **Courses:** semester dates, teaching weeks, configurable periods, odd/even or selected weeks, rooms and teachers.
- **Changes:** cancel or move one class without rewriting the whole semester.
- **Personal plans:** appointments, study sessions and other timed or all-day arrangements, with optional simple weekly repeats.
- **One schedule:** Today and week views show courses and personal plans together and explain time conflicts.
- **Coursework:** assignments and exams linked to a course; deadlines and completion are distinct from booked time.
- **Sharing and import:** preview timetable files and fixed-template CSV/paste; personal plans and coursework are excluded from timetable exports.
- **Local data:** core planning works offline without registration. Versioned backup/restore, explicit deletion and private export boundaries are planned; encryption is not implemented or claimed.
- **University reach:** representative trials across academic backgrounds, campuses, languages and accessibility needs, followed by supported desktop releases. Web access remains a separate candidate.
- **Authorized integration:** investigate school-approved identity and read-only timetable access separately; preserve manual import, source freshness and user edits if integration becomes available.
- **Local weekly review:** planned time, daily load and task completion, calculated on the device. This is planned functionality, not an implemented timer or usage tracking.

Mobile apps, unapproved school-system scraping and credential collection are outside the plan. The local release also excludes Google/Outlook integration, online ICS subscriptions, AI extraction, collaborative editing, wage tracking and focus/habit dashboards. No backend, cloud sync or public API availability is assumed.

## Learn by building

Follow the [beginner learning path](docs/LEARNING.md), one small lesson at a time. The learner writes application code; the assistant writes tests and reviews the result. Start with [lesson 01: a task model](docs/lessons/01-task.md). Pending lesson tests are templates, not passing coverage.

## Run the current skeleton

Use Flutter **3.44.4** with Dart **3.12.2**, matching the project metadata and CI configuration.

```sh
flutter pub get
flutter run -d windows
```

On a configured Linux or macOS host, use `flutter run -d linux` or `flutter run -d macos`. See [SETUP.md](docs/SETUP.md) for native tools and checks.

## Repository layout

| Path | Purpose |
|------|---------|
| `lib/` | App entry point and current Today placeholder |
| `test/` | Flutter widget tests |
| `windows/`, `linux/`, `macos/` | Native desktop runners |
| `android/` | Legacy runner; no mobile product commitment |
| `assets/brand/` | Source brand artwork |
| `docs/` | Product, behavior, architecture, setup and release plans |
| `website/` | Static website in Japanese, English and Chinese |
| `.github/workflows/` | App checks, desktop builds and website deployment |

Create the source modules in [ARCHITECTURE.md](docs/ARCHITECTURE.md) as their features are implemented. Build output and personal settings stay out of Git.

## Development

```sh
dart format lib test
flutter analyze --fatal-infos --fatal-warnings
flutter test
```

Flutter and its starter packages are installed today. Riverpod and drift are planned; [pubspec.yaml](pubspec.yaml) is the current dependency source of truth. The package's starter version `1.0.0+1` does not indicate a production release.

The website distinguishes planned capabilities from the current skeleton. Native build checks establish compilation only; each desktop release also needs real interaction and data-recovery tests.

## License

[MIT](LICENSE) © 2026 lorendw7
