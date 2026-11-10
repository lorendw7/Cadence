# Security and private data

Cadence's security design and acceptance requirements are in [docs/SECURITY.md](docs/SECURITY.md). The Web application is a confirmed future target but is not implemented. This policy is design guidance, not a completed security review.

[Developer protection technologies](docs/DATA_PROTECTION.md) proposes encrypted native storage, platform key storage, authenticated backups, input validation and release hardening. These are not installed or implemented features; defenses are implementation responsibilities, not optional user safety switches. Web planner deployment requires explicit school permission under [ADR-005](docs/adr/005-local-offline-and-school-gated-web.md).

The initial Web design proposes memory by default and optional, explicit browser-local saving. No account, backend or university connection is implemented or required for the manual-planning design. Browser data and exported JSON are private, unencrypted planning data; do not use real sensitive schedules in concept examples or public reports.

Do not post passwords, tokens, complete schedules, backups or exploitable private-data details in public issues. For ordinary reproducible bugs, use fictional examples and report the version, platform and steps. Sensitive findings require a private channel agreed with the maintainer; no dedicated response time or school incident channel is currently promised. Establish that reporting route before a wider real-data trial.

The desktop manual core is independent of university integration approval. Per this project's release constraint, the Web planner requires school deployment permission even without school APIs. Any school authentication, data access and permitted retention/export must pass their separate requirements.
