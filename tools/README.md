# Repository tools

Run these commands from the repository root. They are development helpers, not Flutter runtime dependencies.

| Command | Purpose | Requirements and effects |
|---|---|---|
| node tools/check_repository.cjs | Check documentation language scripts, local file links and anchors, and project JavaScript syntax | Node and Git; read-only |
| node tools/check_website.cjs | Check translations, placeholders, metadata, markup bindings, IDs, ARIA, local assets, preview contracts, and JavaScript syntax | Node built-ins; read-only |
| python tools/check_artwork.py | Check SVG structure, manifest sizes, responsive-image budgets, and platform/site copies | Python standard library; read-only |
| python tools/build_artwork.py | Build SVG sources, catalogue, and initial manifest | Python standard library; writes artwork outputs |
| node tools/export_artwork.cjs | Export PNG/ICO/ICNS/WebP and sync platform/site assets | Node with sharp; writes outputs; run the Python generator again to refresh the manifest |

Follow the [artwork regeneration order](../assets/README.md#regeneration). The website uses 480/960/1536 px WebP exports with a PNG fallback. Keep the original image and generation inputs.

Do not run generators as generic cleanup. The outputs are versioned design files. Flutter checks and native builds are in [SETUP.md](../docs/SETUP.md).

Source checks cannot prove browser behavior, accessibility, remote-link availability, or release readiness. The documentation script check catches leftover Chinese/Japanese text in Markdown; a human review still needs to check that the English is clear and correct.

The [repository workflow](../.github/workflows/repository.yml) runs the three read-only tools. The [Pages workflow](../.github/workflows/pages.yml) requires them before deployment.
