# Security and private data

Cadence is a general-purpose local planner under development. The current app keeps tasks in memory. Saving, encryption, backup, Web, and sync designs are not implemented protections.

[Security requirements](docs/SECURITY.md) describe data boundaries and acceptance. [Data protection](docs/DATA_PROTECTION.md) describes candidate storage, key, backup, input, and release protections.

The core is designed to work offline without an account or school identity. At first use, the user will choose local saving or a temporary session. The app must explain what is retained, what is lost on exit, and how to export or clear data. Plain JSON backups contain private data; they are not a safe sharing format.

External academic-system connections and school login remain excluded. Desktop, Web, Android and iOS are planned free-edition targets. Cloud sync and optional ads are deferred until review after store launch. See [ADR-010](docs/adr/010-open-multiplatform-free-first.md).

Do not post passwords, tokens, full schedules, backups, or exploitable private-data details in public issues. For ordinary bugs, use fictional examples and include the version, platform, and reproduction steps. Agree on a private channel with the maintainer for sensitive findings. No dedicated response time is promised yet; establish the reporting route before a wider real-data trial.
