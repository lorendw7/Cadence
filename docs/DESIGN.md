# Design System

One word: **落ち着いた** (calm). Cadence looks like a well-organized desk — dense with information, never cluttered. This file is the single source of truth for color, type, and layout; the website follows it too.

---

## Brand color: 臙脂 (Enji) — deep crimson

Inspired by the wine-red of Kyushu University's school color: scholarly, calm, distinctly Japanese. Not a loud red — a fabric-dyed one.

### Tokens

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `enji` (seed) | `#8A2432` | — | Material 3 seed color; the brand |
| `primary` | M3-derived from seed (~`#8A2432`) | M3-derived (~`#FFB2BB` tonal) | Buttons, selected states, FAB, links |
| `onPrimary` | `#FFFFFF` | derived | Text/icons on primary |
| `surface` | warm white `#FBF8F7` | `#141012` | App background (slightly warm, paper-like) |
| `holiday` | `#C4384D` | `#E06A7C` | 祝日 & Sundays on the calendar — **brighter** than enji so it reads as "date color", not "button" |
| `error` | M3 default `#BA1A1A` | M3 default | Validation, destructive actions |

Implementation: `ColorScheme.fromSeed(seedColor: Color(0xFF8A2432))` per brightness — Material 3 generates the full tonal palette, dark mode included, for free. Don't hand-pick 30 colors; override only `holiday` as a theme extension.

### The red-on-red rule

Three reds coexist; they must never be confusable:
1. **Enji (brand)** — brownish, muted → interactive things.
2. **Holiday red** — brighter, only ever on calendar dates/labels.
3. **Error red** — M3's default, only for errors/destructive confirmation.

If a screen makes you hesitate about which red you're seeing, the screen is wrong.

### Category colors (events)

Defaults chosen to sit calmly next to enji (user can override per item):
class `#5B7A9D` slate blue · meeting `#7D9B76` sage · todo `#C9A227` mustard · shift `#9C7BB8` wisteria (藤色) · habit `#3E8E8E` teal. Priority: high = enji, medium = mustard, low = gray.

---

## The mark (app icon)

**Concept:** a paper-white **"C"** — the initial, drawn as a broken ring like a clock face — with the **next beat** sitting detached in its opening. A cadence is a rhythm that keeps going; the dot is the beat that hasn't happened yet. Deliberately *not* a calendar grid: every scheduling app on the store is a grid, and a grid says "boxes", not "rhythm".

| File | What it is |
|---|---|
| `assets/brand/cadence-icon.svg` | **Source of truth.** Full icon: enji field + mark, 512×512, `rx=112` rounded square. |
| `assets/brand/cadence-mark.svg` | Mark alone on transparent ground, `currentColor` — for inline use where the surface already carries the color. |
| `website/assets/icon.svg` | Deployable copy of the icon (favicon + site header). GitHub Pages publishes only `website/`, so this copy exists on purpose — **when the icon changes, re-copy it; the geometry must never diverge** (only the file comment differs). |

**Construction** (so it can be redrawn exactly): 512×512 · field `#8A2432` (the seed itself, flat — no gradient) · mark `#FDFAF9` · ring `r=136`, `stroke-width=52`, round caps, `stroke-dasharray="75 25"` on `pathLength=100` rotated `45°` → a 90° opening centred at 3 o'clock · beat dot `r=30` at `(392, 256)`. Round caps eat ~11° per side, so the visible gap reads ~68°.

**Rules**
- The mark is never re-colored per screen; it is enji-on-paper or paper-on-enji, nothing else.
- Never place the mark on a *third* red — it would collide with the red-on-red rule above.
- The name is always written **"Cadence" in Latin letters**, in every locale (ja/en/zh). No katakana rendering, no translated name — the wordmark is the constant across languages.
- Clear space around the icon ≥ 1/8 of its width; below 24px use the icon (with field), not the bare mark.

**Raster exports are not committed.** The repo keeps vector only; PNG/ICO are generated when a platform needs them (Play Store listing icon 512×512 PNG, `flutter_launcher_icons`, Windows `.ico`). Any SVG rasterizer works — Inkscape, `rsvg-convert`, or a browser screenshot at 512px. Regenerate from the SVG; never hand-edit a PNG.

---

## Typography

- System fonts only: **Yu Gothic UI / Noto Sans JP** handles ja + zh + en cleanly on both platforms; no bundled font (keeps the app small, CJK fonts are huge).
- Scale (M3 defaults, don't invent): `titleLarge` screen titles · `titleMedium` cards/dialog headers · `bodyMedium` default · `labelSmall` timestamps/captions.
- Numbers that matter (streaks, ¥ estimates, focus hours) get `titleLarge` + tabular figures — stats should be glanceable.
- Never below 12sp; everything must survive 200% font scale ([QUALITY.md](QUALITY.md)).

## Layout principles

1. **8dp grid**; screen edge padding 16dp; cards `Radius.circular(12)`.
2. **One accent per screen** — enji draws the eye to exactly one primary action (usually the FAB).
3. **Whitespace over dividers; dividers over boxes.** Prefer spacing to lines; avoid nesting cards in cards.
4. **Calendar is ink-on-paper**: neutral surfaces, thin grid lines; color appears only as small event dots/chips and red holiday numerals. The month view should look like a printed 手帳 (planner), not a candy box.
5. **Empty states teach**: each empty screen shows one sentence + one button (e.g. 時間割 empty → "学期を設定して授業を追加 → [設定する]").
6. **Bottom nav, 4 tabs**: カレンダー / 今日 / 統計 / 設定 — no drawer, nothing hidden.

## Motion & feedback

- Standard M3 transitions only; every animation ≤ 300ms; honor reduced-motion.
- Check-in gives instant feedback (checkmark morph + subtle haptic on Android); a streak milestone (7/30/100 days) gets one tasteful moment — no confetti storms.

## Dark mode

Derived from the same seed — never hand-tweaked per screen. Watch two spots: holiday red on dark surfaces (use the lighter `#E06A7C`), and enji chips on dark (M3's tonal container handles it — trust it).

---

## Website (same system)

The site uses the same tokens: enji accent on warm-neutral surfaces, light/dark via `prefers-color-scheme`, system font stack. The site should feel like a preview of the app, not a startup landing page.

**Structure** — two hand-written static pages, no build step, deployed from `website/` by [`pages.yml`](../.github/workflows/pages.yml):

```
website/
  index.html      landing page   (ja / en / zh in one file)
  privacy.html    privacy policy (ja / en / zh in one file)
  assets/site.css shared styles
  assets/lang.js  shared language switcher
  assets/icon.svg favicon + header mark
```

**Trilingual, Japanese-first.** Each page carries all three languages as sibling `[data-lang]` blocks; `lang.js` shows exactly one. The rules that matter:

- **Japanese is the default in the markup, not only in the script**: `site.css` shows `[data-lang="ja"]` and hides the rest, so a visitor with JavaScript off — or reading it before the script runs — still gets a complete Japanese page. The script only ever switches *away* from Japanese.
- Resolution order: `?lang=` → the visitor's own earlier choice (`localStorage`) → **`ja`**. **Browser language is deliberately not consulted.** Cadence is a Japan-first product and Japanese is the reference locale, so *every* first-time visitor lands on the Japanese page — a Chinese or English browser does not silently redecide that. The switcher in the top bar is always one click away, and once clicked the choice is remembered.
- Switching also updates `<title>`, the meta description (per-page `window.CADENCE_META`), `<html lang>`, and the `?lang=` in the URL — so a link someone shares opens in the language they were reading.
- **Translations are peers, not a fallback chain**: no language may carry a feature the others lack. Add a section to all three, or to none.
- The product name stays "Cadence" in every language; only the surrounding copy is translated.
