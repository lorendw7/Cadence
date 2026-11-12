"""Build Cadence's editable SVG artwork and local catalogue (Python standard library).

Run from any directory: python tools/build_artwork.py
Raster exports: node tools/export_artwork.cjs (requires sharp).
The editorial PNG is generated separately; this script never modifies it.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets'
WINE, PAPER, SAGE, INK, RULE = '#7C394B', '#F6F5F1', '#6F877C', '#2F3033', '#DDDCD5'


def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    # Stable byte sizes and deployment copies on Windows and Unix checkouts.
    path.write_text(content + '\n', encoding='utf-8', newline='\n')


def svg(body, width, height, title, extra=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" role="img" aria-label="{title}" {extra}>'
            f'<title>{title}</title>{body}</svg>')


def path(d):
    return f'<path d="{d}"/>'


def circle(cx, cy, r):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}"/>'


def rect(x, y, w, h, r=2):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/>'


# Original project-specific geometry; 24-unit grid, 1.75-unit round strokes.
CAL = rect(3, 5, 18, 16) + path('M7 3v4m10-4v4M3 10h18')
FILE = path('M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6')
ICONS = {
    'today': CAL + circle(12, 15, 2),
    'week': CAL + path('M9 10v11m6-11v11M3 15h18'),
    'tasks': path('m3 6 2 2 3-4m3 2h10M3 13h4m4 0h10M3 20h4m4 0h10'),
    'course': path('M12 5v16M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2z'),
    'study': path('M4 4h13a2 2 0 0 1 2 2v15H6a2 2 0 0 1-2-2zm0 13h15M8 8h7m-7 4h5'),
    'meeting': circle(8, 7, 3) + circle(18, 8, 2) + path('M2 21v-4a6 6 0 0 1 12 0v4m2-8a5 5 0 0 1 6 5v3'),
    'personal': circle(12, 7, 4) + path('M4 21v-2a8 8 0 0 1 16 0v2'),
    'work': rect(3, 7, 18, 14) + path('M8 7V4h8v3M3 12c6 4 12 4 18 0m-9 1v4'),
    'exam': FILE + path('m8 14 2 2 5-5M8 18h8'),
    'research': path('M9 3h6m-5 0v6L4 19a1.3 1.3 0 0 0 1 2h14a1.3 1.3 0 0 0 1-2L14 9V3M7 15h10') + circle(12, 18, .6),
    'location': path('M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 0 1 14 0z') + circle(12, 10, 2),
    'clock': circle(12, 12, 9) + path('M12 7v5l4 2'),
    'deadline': circle(11, 13, 8) + path('M11 9v4l3 2M8 2h6m4 2 3 3'),
    'repeat': path('m17 2 4 4-4 4M21 6H7a4 4 0 0 0-4 4m4 12-4-4 4-4M3 18h14a4 4 0 0 0 4-4'),
    'semester': CAL + path('M7 14h10m-10 4h6'),
    'all-day': CAL + path('M7 15h10m-10 0 2-2m-2 2 2 2m8-2-2-2m2 2-2 2'),
    'add': path('M12 4v16M4 12h16'),
    'edit': path('m4 16 12-12 4 4L8 20H4zm10-10 4 4'),
    'delete': path('M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7'),
    'check': path('m4 12 5 5L20 6'),
    'close': path('m5 5 14 14M19 5 5 19'),
    'chevron-left': path('m15 4-8 8 8 8'),
    'chevron-right': path('m9 4 8 8-8 8'),
    'chevron-down': path('m4 8 8 8 8-8'),
    'arrow-up-right': path('M5 19 19 5M6 5h13v13'),
    'search': circle(10, 10, 7) + path('m15 15 6 6'),
    'filter': path('M3 5h18M6 12h12m-9 7h6'),
    'menu': path('M3 5h18M3 12h18M3 19h18'),
    'more': circle(5, 12, 1) + circle(12, 12, 1) + circle(19, 12, 1),
    'undo': path('M9 3 3 9l6 6M3 9h11a7 7 0 0 1 0 14'),
    'refresh': path('M20 10a8 8 0 0 0-14-5L3 8m0-6v6h6m-5 6a8 8 0 0 0 14 5l3-3m0 6v-6h-6'),
    'save': path('M4 3h13l4 4v14H3V3zM7 3v6h9V3M7 21v-7h10v7'),
    'import': path('M12 3v13m-5-5 5 5 5-5M4 15v6h16v-6'),
    'export': path('M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6'),
    'backup': path('M3 8h18v13H3zM2 3h20v5H2zm7 10h6'),
    'file-json': FILE + path('M9 12H8v3l-1 1 1 1v2h1m6-7h1v3l1 1-1 1v2h-1'),
    'device': rect(2, 3, 20, 14) + path('M8 22h8m-4-5v5'),
    'memory': rect(6, 6, 12, 12) + path('M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4') + rect(9, 9, 6, 6, 0),
    'data': path('M3 6c0-5 18-5 18 0s-18 5-18 0v12c0 5 18 5 18 0V6M3 12c0 5 18 5 18 0'),
    'settings': path('M3 6h5m4 0h9M3 12h11m4 0h3M3 18h3m4 0h11') + circle(10, 6, 2) + circle(16, 12, 2) + circle(8, 18, 2),
    'language': path('M3 5h12M8 2v3m4 0c0 6-4 9-8 11M5 8c1 3 4 6 8 7m1 6 4-11 4 11m-7-3h6'),
    'sun': circle(12, 12, 4) + path('M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1'),
    'moon': path('M21 14A9 9 0 0 1 10 3a9 9 0 1 0 11 11z'),
    'info': circle(12, 12, 9) + path('M12 11v6m0-10v.1'),
    'warning': path('M11 3 2 19a1 1 0 0 0 1 2h18a1 1 0 0 0 1-2L13 3a1.2 1.2 0 0 0-2 0zM12 9v5m0 3v.1'),
    'error': circle(12, 12, 9) + path('m8 8 8 8m0-8-8 8'),
    'success': circle(12, 12, 9) + path('m7 12 3 3 7-7'),
    'conflict': rect(2, 4, 13, 11) + rect(9, 9, 13, 11) + path('M12 8v5m0 3v.1'),
    'help': circle(12, 12, 9) + path('M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3v.1'),
    'notification': path('M5 10a7 7 0 0 1 14 0v5l2 3H3l2-3zm4 11h6'),
    'review': path('M3 3v18h18M7 17v-4m5 4V6m5 11V9'),
    'keyboard': rect(2, 5, 20, 14) + path('M6 9h.1m4 0h.1m4 0h.1m4 0h.1M6 12h.1m4 0h.1m4 0h.1m4 0h.1M7 16h10'),
    'link': path('m9 15 6-6m-5-3 2-2a5 5 0 0 1 8 8l-2 2m-4 4-2 2a5 5 0 0 1-8-8l2-2'),
    'external': path('M13 3h8v8M21 3 10 14M10 3H3v18h18v-7'),
    'restore': path('M3 9a9 9 0 1 1 0 6m0-12v6h6M12 7v5l4 2'),
    'offline': path('m3 3 18 18M2 8a16 16 0 0 1 3-2m4-2a16 16 0 0 1 13 4M5 12a11 11 0 0 1 4-2m5 0a11 11 0 0 1 5 2M8 16a6 6 0 0 1 8 0M12 20h.1'),
}


def mark(color):
    # Equivalent to the original 75%-circle rotated 45 degrees, using an explicit arc.
    return (f'<path d="M352.1665 352.1665A136 136 0 1 1 352.1665 159.8335" '
            f'fill="none" stroke="{color}" stroke-width="52" stroke-linecap="round"/>'
            f'<circle cx="392" cy="256" r="30" fill="{color}"/>')


def brand():
    for name, bg, fg in [('cadence-icon-v2', WINE, PAPER), ('cadence-icon-paper', PAPER, WINE), ('cadence-icon-dark', INK, PAPER)]:
        write(ART / 'brand' / (name + '.svg'), svg(f'<rect width="512" height="512" rx="112" fill="{bg}"/>' + mark(fg), 512, 512, 'Cadence'))
    for name, color in [('cadence-mark-wine', WINE), ('cadence-mark-paper', PAPER), ('cadence-mark-ink', INK)]:
        write(ART / 'brand' / (name + '.svg'), svg(mark(color), 512, 512, 'Cadence'))
    # Wordmark letters are outlines, so exported identity does not depend on fonts.
    letters = ('M52 8C42-3 12-3 5 18-4 43 9 62 30 60c9 0 16-3 22-9',
               'M94 29c-7-11-29-9-29 10s22 23 29 10m0-25v36',
               'M139 29c-7-11-29-9-29 10s22 23 29 10m0-49v60',
               'M155 39h29c0-24-31-24-31 2 0 20 22 24 31 12',
               'M202 60V24m0 10c7-18 29-13 29 2v24',
               'M275 29c-11-13-29-6-29 12s18 25 29 12',
               'M291 39h29c0-24-31-24-31 2 0 20 22 24 31 12')
    for name, color in [('cadence-lockup', WINE), ('cadence-lockup-paper', PAPER)]:
        body = f'<g transform="translate(0 0) scale(.203125)">{mark(color)}</g>'
        body += f'<g transform="translate(120 21)" fill="none" stroke="{color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' + ''.join(path(d) for d in letters) + '</g>'
        write(ART / 'brand' / (name + '.svg'), svg(body, 456, 104, 'Cadence'))


def icons():
    symbols = []
    for name, body in ICONS.items():
        group = f'<g fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{body}</g>'
        write(ART / 'icons' / (name + '.svg'), svg(group, 24, 24, name, 'color="#2F3033"'))
        symbols.append(f'<symbol id="{name}" viewBox="0 0 24 24">{group}</symbol>')
    write(ART / 'icons' / 'sprite.svg', '<svg xmlns="http://www.w3.org/2000/svg">' + ''.join(symbols) + '</svg>')


def states():
    # UI empty-state graphics stay vector-native: no text, fixed semantic silhouette.
    paper = '<rect x="84" y="42" width="142" height="148" rx="6" fill="#FDFCF9" stroke="#DDDCD5"/>'
    rules = '<path d="M108 110h94m-94 22h68m-68 22h84" stroke="#DDDCD5"/>'
    bodies = {
        'empty-today': paper + '<path d="M84 81h142M113 32v24m84-24v24" stroke="#7C394B"/>' + '<circle cx="155" cy="132" r="26" fill="#E6ECE6" stroke="#6F877C"/><path d="M155 116v16l11 7" stroke="#415A4E"/>',
        'empty-week': '<rect x="48" y="53" width="224" height="130" rx="6" fill="#FDFCF9" stroke="#DDDCD5"/><path d="M48 87h224m-192 0v96m32-96v96m32-96v96m32-96v96m32-96v96m32-96v96M48 119h224M48 151h224" stroke="#DDDCD5"/><path d="M72 41v25m48-25v25m48-25v25m48-25v25m32-25v25" stroke="#7C394B"/>',
        'empty-tasks': paper + rules + '<rect x="104" y="62" width="15" height="15" rx="3" stroke="#7C394B"/><path d="M133 70h65" stroke="#DDDCD5"/><path d="m231 111 14-14 12 12-14 14-24 24-18 5 5-18z" fill="#E6ECE6" stroke="#6F877C"/>',
        'all-done': '<circle cx="160" cy="114" r="63" fill="#E6ECE6"/><circle cx="160" cy="114" r="44" stroke="#6F877C"/><path d="m137 113 16 17 33-36" stroke="#415A4E" stroke-width="4"/><path d="M72 145c0-25 13-40 28-47M76 124c-20-2-20-16-20-16 16 0 20 16 20 16m2 10c18-5 22-18 22-18-18-2-22 18-22 18" stroke="#6F877C"/><circle cx="240" cy="66" r="4" fill="#7C394B"/>',
        'no-results': '<circle cx="145" cy="99" r="49" fill="#FDFCF9" stroke="#DDDCD5"/><circle cx="145" cy="99" r="34" stroke="#7C394B"/><path d="m181 135 42 42" stroke="#7C394B" stroke-width="9"/><path d="M128 99h34" stroke="#DDDCD5"/>',
        'import-preview': paper + '<path d="M114 71h41m-41 13h60M160 103v55m-18-18 18 18 18-18" stroke="#7C394B"/><path d="M118 163v15h84v-15" stroke="#6F877C"/><circle cx="239" cy="79" r="21" fill="#E6ECE6"/><circle cx="236" cy="76" r="8" stroke="#415A4E"/><path d="m242 82 7 7" stroke="#415A4E"/>',
        'save-error': paper + rules + '<path d="m234 109-39 67h78z" fill="#F0E6E7" stroke="#7C394B"/><path d="M234 131v20m0 10v2" stroke="#7C394B"/>',
        'restore-backup': '<path d="M73 87h174v94H73z" fill="#FDFCF9" stroke="#DDDCD5"/><rect x="65" y="63" width="190" height="27" rx="4" fill="#E6ECE6" stroke="#6F877C"/><path d="M140 109h40M134 151a30 30 0 1 0 7-20m-9-8v19h19" stroke="#7C394B"/>',
        'no-courses': '<path d="M55 60c43-10 73-2 105 16 32-18 62-26 105-16v113c-43-10-73-2-105 16-32-18-62-26-105-16z" fill="#FDFCF9" stroke="#DDDCD5"/><path d="M160 76v113m-85-94c23-3 41 0 62 10m-62 16c23-3 41 0 62 10m48-26c21-10 39-13 62-10" stroke="#DDDCD5"/><path d="M214 58v55l13-9 13 9V56" fill="#6F877C"/>',
        'no-review': '<path d="M72 49v136h182" stroke="#DDDCD5"/><path d="M88 73h150M88 117h150M88 161h150" stroke="#DDDCD5" stroke-dasharray="3 6"/><circle cx="164" cy="117" r="30" fill="#FDFCF9" stroke="#DDDCD5"/><path d="M152 117h24" stroke="#7C394B"/>',
    }
    for name, body in bodies.items():
        decor = '<path d="M43 202h234" stroke="#DDDCD5"/><circle cx="58" cy="66" r="3" fill="#6F877C"/>'
        write(ART / 'illustrations' / (name + '.svg'), svg(f'<g fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{body}{decor}</g>', 320, 240, name))

    # A small white-canvas alternative. Blank boxes mean no tasks, not completion.
    compact = ('<rect x="28" y="8" width="40" height="52" rx="4" fill="#FFFFFF" stroke="#87838A"/>'
               '<path d="M38 8v7h20V8" stroke="#7C394B"/>'
               '<rect x="37" y="25" width="6" height="6" rx="1.5" stroke="#7C394B"/>'
               '<rect x="37" y="40" width="6" height="6" rx="1.5" stroke="#87838A"/>'
               '<path d="M49 28h10m-10 15h10M22 65h52" stroke="#E8E8EB"/>')
    write(ART / 'illustrations/empty-tasks-compact.svg', svg(
        f'<g fill="none" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{compact}</g>',
        96, 72, 'Empty task list'))


def patterns():
    for name, body in {
        'journal-grid': '<path d="M32 0H0v32" fill="none" stroke="#DDDCD5" stroke-width="1"/>',
        'journal-dots': '<circle cx="16" cy="16" r="1" fill="#DDDCD5"/>',
        'journal-rules': '<path d="M0 31.5h32" stroke="#DDDCD5"/>',
    }.items():
        write(ART / 'patterns' / (name + '.svg'), svg(body, 32, 32, name))


def social():
    body = f'<rect width="1200" height="630" fill="{PAPER}"/>'
    body += '<path d="M64 76h1072M64 554h1072" stroke="#DDDCD5"/>'
    body += f'<g transform="translate(58 143) scale(.32)">{mark(WINE)}</g>'
    body += '<g fill="#2F3033" font-family="Georgia,serif"><text x="240" y="263" font-size="92">Cadence</text><text x="69" y="375" font-size="35">A calm place for your time.</text></g>'
    body += '<text x="70" y="505" font-family="Arial,sans-serif" font-size="18" fill="#666761" letter-spacing="3">INDEPENDENT TIME PLANNER / IN DEVELOPMENT</text>'
    body += '<g transform="translate(834 165) rotate(7 122 130)"><rect width="240" height="270" rx="7" fill="#FDFCF9" stroke="#DDDCD5"/><path d="M0 57h240m-160 0v213m80-213v213M0 128h240M0 199h240" stroke="#DDDCD5"/><rect x="15" y="73" width="50" height="40" rx="4" fill="#F0E6E7"/><rect x="95" y="145" width="50" height="40" rx="4" fill="#E6ECE6"/></g>'
    write(ART / 'social' / 'social-card.svg', svg(body, 1200, 630, 'Cadence — independent time planner in development'))


def catalogue():
    from artwork_catalog import build
    build(ROOT, {'wine': WINE, 'paper': PAPER, 'sage': SAGE, 'ink': INK}, write)


if __name__ == '__main__':
    brand()
    icons()
    states()
    patterns()
    social()
    catalogue()
    print(f'Built brand family, {len(ICONS)} icons, 11 states, 3 patterns, social card and catalogue.')
