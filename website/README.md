# Cadence website

An original, static Japanese/English/Chinese introduction to Cadence. The visual direction is an **academic notebook**: warm paper `#F6F5F1`, muted burgundy `#7C394B`, sage `#6F877C` and graphite text. It keeps Cadence's own C mark and does not copy a university logo or official website.

Cadence is being designed for students, teachers and other people organizing their time. The browser planner is a development direction, **not a delivered product**. All schedule views on this site are fictional illustrations. The main calls to action open the interactive preview or project documentation; do not add working-app or download claims without a verified release.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Editorial landing page, fictional Today/Week/Tasks preview, planned scope and FAQ |
| `privacy.html` | Actual website behavior, clearly separated from future app data requirements |
| `assets/site.css` | Responsive notebook design, accessible focus states and reduced-motion handling |
| `assets/content.js` | Complete fixed translations, including metadata and accessible labels |
| `assets/lang.js` | Language selection, text-only rendering, metadata and local-link updates |
| `assets/preview.js` | Accessible preview tabs and temporary sample-task completion |
| `assets/icon.svg` | Original Cadence C mark in the website palette |

No build step, external font, third-party script, analytics or runtime service is needed. The existing GitHub Pages deployment remains the hosting target; do not register a second Site.

## Preview

From the repository root:

```sh
python -m http.server 8000 --directory website --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`. Check both pages in Japanese, English and Chinese at desktop and narrow widths. Japanese remains readable without JavaScript.

Language selection resolves `?lang=` first, then a saved explicit choice, then Japanese. It never infers a language from the browser. The choice is stored under `cadence-lang`; the preview does not save tasks or other interaction state. Translations are inserted with `textContent`, not HTML.

The preview has Today, Week and Tasks tabs. Test clicks, arrow keys, Home/End and focus visibility. Checking either fictional task changes the remaining count in Today and Tasks; changing language preserves that temporary state. Reloading restores the sample. The week grid may scroll within its panel at narrow widths without making the page overflow.

## Claims and data boundaries

The initial **planned** browser scope is course/personal-plan creation, editing and deletion, bounded weekly repeats, task completion, and JSON backup import/export. Do not present school timetable synchronization, notifications, single-occurrence exceptions or CSV import as delivered features.

The current website stores only the language preference. Future session-only use, optional localStorage persistence and JSON backup are design requirements, not implemented website functionality. Their required disclosures include memory loss on refresh/close, unencrypted browser storage, shared-device risks, browser-data clearing, plain-text private backups and deletion of separately exported files.

Cadence has no university endorsement or school-system integration permission. It is intended to work independently of school credentials. See the [school-facing project explanation](../docs/SCHOOL_DEMO.md), [security design](../docs/SECURITY.md) and [product design](../docs/REDESIGN.md).

## Publication

[pages.yml](../.github/workflows/pages.yml) publishes the existing website from the main branch or manual dispatch. Validate local assets, language key parity, internal anchors, JavaScript syntax and the interactive preview before publishing. Keep project claims, privacy text and all three translations aligned with actual capabilities.
