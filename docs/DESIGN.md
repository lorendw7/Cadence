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
