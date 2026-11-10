# Repository tools

Run commands from the repository root. These tools are development helpers, not Flutter runtime dependencies.

| Tool | Purpose | Requirements / effects |
|---|---|---|
| `node tools/check_repository.cjs` | Check local Markdown/HTML file targets and project JavaScript syntax | Node and Git; read-only; does not validate remote URLs, Markdown reference links, anchors or browser behavior |
| `python tools/build_artwork.py` | Build original SVG artwork and catalogue | Python standard library; writes artwork outputs |
| `node tools/export_artwork.cjs` | Rasterize artwork and sync platform/site copies | Node with `sharp`; writes PNG/ICO/ICNS and platform resources |

Follow the [artwork regeneration order](../assets/README.md#再生成). Do not run artwork generators as a generic cleanup command: their outputs are versioned design assets. Flutter checks and native builds are described in [SETUP.md](../docs/SETUP.md).
