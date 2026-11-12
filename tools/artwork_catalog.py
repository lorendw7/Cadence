"""Describe and catalogue existing artwork. No application runtime dependency."""
from html import escape
from pathlib import Path
import json
import struct
import xml.etree.ElementTree as ET


ICON_GROUPS = {
    'Planning': {
        'today': 'Open the daily plan.', 'week': 'Open the weekly plan.',
        'tasks': 'Open the task list.', 'clock': 'Show a time or duration.',
        'deadline': 'Show a task deadline.', 'repeat': 'Show a repeating item.',
        'all-day': 'Mark an all-day item.', 'review': 'Open a weekly review.',
    },
    'Everyday categories': {
        'work': 'Label work plans.', 'personal': 'Label personal plans.',
        'study': 'Label study plans.', 'meeting': 'Label a meeting.',
        'location': 'Show a place.',
    },
    'Optional course tools': {
        'course': 'Label an optional course.', 'semester': 'Label a course term.',
        'exam': 'Label an exam.', 'research': 'Label research work.',
    },
    'Editing and navigation': {
        'add': 'Create an item.', 'edit': 'Edit an item.', 'delete': 'Delete an item.',
        'check': 'Mark completion.', 'close': 'Close a view.', 'undo': 'Undo the last action.',
        'chevron-left': 'Move to the previous period.', 'chevron-right': 'Move to the next period.',
        'chevron-down': 'Expand a section.', 'arrow-up-right': 'Follow a destination link.',
        'search': 'Find matching items.', 'filter': 'Narrow the visible items.',
        'menu': 'Open navigation.', 'more': 'Open more actions.', 'refresh': 'Refresh a view.',
        'link': 'Link related items.', 'external': 'Open an external destination.',
    },
    'Files and storage': {
        'save': 'Save changes.', 'import': 'Bring in a file for review.',
        'export': 'Write a chosen export.', 'backup': 'Create a private backup.',
        'restore': 'Restore a backup after review.', 'file-json': 'Label a JSON data file.',
        'device': 'Label saving on this device.', 'memory': 'Label temporary session use.',
        'data': 'Open data controls.', 'offline': 'Describe offline use.',
    },
    'Preferences and feedback': {
        'settings': 'Open settings.', 'language': 'Choose a language.',
        'sun': 'Label a light appearance.', 'moon': 'Label a dark appearance.',
        'info': 'Explain a detail.', 'warning': 'Flag a warning with text.',
        'error': 'Explain an error with text.', 'success': 'Confirm a completed action.',
        'conflict': 'Flag overlapping items.', 'help': 'Open help.',
        'notification': 'Label a reminder.', 'keyboard': 'Describe a keyboard shortcut.',
    },
}
STATE_USES = {
    'empty-today': 'No plans today. Offer a local action to add one.',
    'empty-week': 'No plans this week. Show no sample commitments.',
    'empty-tasks': 'No tasks yet. Invite the first task.',
    'empty-tasks-compact': 'Small empty-list note for a white task surface. Pair with an instruction; no completion check.',
    'all-done': 'Existing tasks are complete. Do not use for a list with no tasks.',
    'no-results': 'No search matches. Offer to change or clear the query.',
    'import-preview': 'Review a draft import. Nothing has been accepted or saved yet.',
    'save-error': 'Saving failed. Explain the error and offer retry with real text.',
    'restore-backup': 'Review a backup before replacing any data.',
    'no-courses': 'No courses in the optional course tools.',
    'no-review': 'No review data yet. Do not imply measured progress.',
}
APP_PALETTE = {'white': '#FFFFFF', 'soft neutral': '#FAFAFA', 'wine': '#7C394B',
               'wine wash': '#F5EEF0', 'ink': '#2F3033', 'muted ink': '#6B6B70',
               'rule': '#E8E8EB', 'input boundary': '#87838A'}
TASKS_STARTER = {
    'assets/brand/cadence-mark-wine.svg': 'Top bar mark; keep the C and dot together.',
    'assets/icons/tasks.svg': 'Current Tasks marker; use wine on a wine wash.',
    'assets/icons/add.svg': 'Add task; pair with a clear verb.',
    'assets/icons/delete.svg': 'Delete action; keep visible without hover.',
    'assets/icons/undo.svg': 'Restore the latest deletion; pair with Undo delete.',
    'assets/icons/memory.svg': 'Session-only notice; never imply local saving.',
    'assets/illustrations/empty-tasks-compact.svg': 'Small empty state, next to real text.',
}
GROUP_ORDER = ['Brand', *ICON_GROUPS, 'Empty states and feedback',
               'Paper patterns', 'Sharing card', 'Editorial artwork',
               'Platform icons', 'Sprite', 'Retained originals']


def metadata(file, root):
    relative = file.relative_to(root).as_posix()
    category = file.relative_to(root / 'assets').parts[0]
    name = file.stem
    entry = {'path': relative, 'bytes': file.stat().st_size,
             'type': file.suffix[1:], 'category': category,
             'role': 'source', 'status': 'current', 'previewSurface': 'paper'}
    if category == 'brand':
        entry['group'] = 'Brand'
        entry['use'] = ('Use on a dark surface.' if name in ['cadence-mark-paper', 'cadence-lockup-paper']
                        else 'Use the current Cadence identity. Keep the C and rhythm dot together.')
        if name in ['cadence-mark-paper', 'cadence-lockup-paper']:
            entry['previewSurface'] = 'ink'
        if name in ['cadence-icon', 'cadence-mark']:
            entry.update(status='retained', group='Retained originals',
                         use='Historical source. Use the current v2 family for new work.')
    elif category == 'icons':
        if name == 'sprite':
            entry.update(role='sprite', group='Sprite',
                         use='All interface symbols. Use a symbol ID and a named host control.')
        else:
            group = next(group for group, names in ICON_GROUPS.items() if name in names)
            entry.update(group=group, use=ICON_GROUPS[group][name], previewSurface='white')
    elif category == 'illustrations':
        if file.suffix == '.png':
            entry.update(group='Editorial artwork',
                         use='Decorative still life. Original image; not an application screenshot.')
        else:
            entry.update(group='Empty states and feedback', use=STATE_USES[name])
    elif category == 'patterns':
        entry.update(group='Paper patterns', use='Repeat as faint decoration. Keep forms and text on plain surfaces.')
    elif category == 'social':
        entry.update(group='Sharing card', use='Public link preview. Describes a product in development.')
        if file.suffix == '.png':
            entry.update(role='export', source='assets/social/social-card.svg')
    elif category == 'platform':
        entry.update(role='export', group='Platform icons',
                     source='assets/brand/cadence-icon-v2.svg',
                     use='Launcher or browser export. Native package acceptance is a separate check.')
    if file.suffix == '.svg' and entry['role'] != 'sprite':
        tree = ET.fromstring(file.read_bytes())
        entry.update(width=int(tree.attrib['width']), height=int(tree.attrib['height']))
    elif file.suffix == '.png':
        width, height = struct.unpack('>II', file.read_bytes()[16:24])
        entry.update(width=width, height=height)
    if relative in TASKS_STARTER:
        entry['appUse'] = TASKS_STARTER[relative]
        entry['previewSurface'] = 'white'
    return entry


def card(entry):
    uri = entry['path'].removeprefix('assets/')
    name = Path(uri).stem
    title = escape(name)
    card_id = 'asset-' + entry['path'].removeprefix('assets/').replace('/', '-').replace('.', '-')
    attrs = f'id="{card_id}" data-asset="{entry["path"]}" data-search="{escape(name + " " + entry["use"] + " " + entry.get("appUse", ""), quote=True)}"'
    cls = 'card' + (' icon-card' if entry['category'] == 'icons' and entry['role'] != 'sprite' else '')
    if entry['role'] == 'sprite' or entry['type'] in ['ico', 'icns']:
        sample = f'<div class="sample file-sample" aria-hidden="true">{entry["type"].upper()}</div>'
    elif entry['category'] == 'patterns':
        sample = f'<div class="sample pattern" style="background-image:url({uri})" aria-hidden="true"></div>'
    elif 'icon-card' in cls:
        sample = '<div class="sample icon-sizes">' + ''.join(
            f'<div><img src="{uri}" alt="" width="{size}" height="{size}" loading="lazy"><small>{size} px</small></div>'
            for size in [20, 24, 32]) + '</div>'
    else:
        sample = f'<div class="sample {entry["previewSurface"]}"><img src="{uri}" alt="" loading="lazy" width="{entry["width"]}" height="{entry["height"]}"></div>'
    dimensions = f'{entry["width"]} × {entry["height"]} · ' if 'width' in entry else ''
    size = f'{entry["bytes"] / 1024:.1f} KB' if entry['bytes'] >= 1024 else f'{entry["bytes"]} B'
    label = 'Retained original' if entry['status'] == 'retained' else entry['role'].capitalize()
    app_note = f'<p class="app-use"><strong>Tasks study</strong> · {escape(entry["appUse"])}</p>' if 'appUse' in entry else ''
    return (f'<article class="{cls}" {attrs}>{sample}<div class="card-body">'
            f'<h3>{title}</h3><p class="use">{escape(entry["use"])}</p>{app_note}'
            f'<p class="file-meta">{dimensions}{entry["type"].upper()} · {size}<br>{label}</p>'
            f'<a href="{uri}" download>Download <span class="sr-only">{title} </span>{entry["type"].upper()}</a>'
            '</div></article>')


def build(root, palette, write):
    art = root / 'assets'
    files = [metadata(file, root)
             for folder in ['brand', 'icons', 'illustrations', 'patterns', 'social', 'platform']
             for file in sorted((art / folder).rglob('*')) if file.is_file()]
    sections = []
    options = []
    for index, group in enumerate(GROUP_ORDER):
        entries = [entry for entry in files if entry['group'] == group]
        if group == 'Platform icons':
            entries.sort(key=lambda entry: (entry.get('width', 10000), entry['path']))
        section_id = f'group-{index}'
        options.append(f'<option value="{section_id}">{group}</option>')
        note = ('<p class="section-note">Prepared symbols for optional course tools. These do not define the core planner.</p>'
                if group == 'Optional course tools' else '')
        sections.append(f'<section id="{section_id}" data-group="{escape(group, quote=True)}"><h2>{group} <span>{len(entries)}</span></h2>{note}'
                        '<div class="grid">' + ''.join(card(entry) for entry in entries) + '</div></section>')
    swatches = ''.join(f'<span><i style="background:{color}"></i>{name.capitalize()} <code>{color}</code></span>'
                       for name, color in palette.items())
    app_swatches = ''.join(f'<span><i style="background:{color}"></i>{name.capitalize()} <code>{color}</code></span>'
                          for name, color in APP_PALETTE.items())
    starter = ''.join(f'<a href="#asset-{uri.removeprefix("assets/").replace("/", "-").replace(".", "-")}">{Path(uri).stem}</a>' for uri in TASKS_STARTER)
    page = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Cadence · Artwork library</title>
  <link rel="stylesheet" href="catalog.css">
  <script src="catalog.js" defer></script>
</head>
<body>
<a class="skip-link" href="#library">Skip to artwork</a>
<main>
<header>
  <p class="eyebrow">CADENCE / VISUAL LIBRARY / 02</p>
  <h1>A little structure.<br>A little space.</h1>
  <p class="intro">A quiet journal for work, study and everyday plans. Browse the original C mark,
  consistent lines, white application surfaces and warm editorial artwork. Artwork is prepared for the product direction;
  it does not mean a feature is implemented.</p>
  <h2 class="palette-label">Application surfaces</h2>
  <div class="palette">''' + app_swatches + '''</div>
  <h2 class="palette-label">Editorial artwork</h2>
  <div class="palette">''' + swatches + '''</div>
  <nav class="resources" aria-label="Library resources">
    <a href="README.md">Usage guide</a><a href="ui/task-study.html">Tasks design study</a><a href="preview.png">Visual overview</a>
    <a href="preview-library.png">Full contact sheet</a><a href="manifest.json">File manifest</a>
  </nav>
</header>
<aside class="starter" aria-label="Tasks starter set">
  <h2>Start with the current task surface.</h2>
  <p>Seven existing-family assets for the design study. These are source links, not a Flutter asset bundle.
  <a href="ui/README.md">Read the handoff</a>. Shortcuts clear filters to reveal the chosen source.</p>
  <nav class="resources" aria-label="Tasks artwork shortcuts">''' + starter + '''</nav>
</aside>
<aside class="guidance" aria-label="Choosing artwork">
  <p><strong>Choose by meaning.</strong> Empty lists, completed tasks, pending review and errors have different artwork. Pair each with real text and a useful action.</p>
  <p><strong>Check the actual size.</strong> Icons below appear at 20, 24 and 32 px. Use a 40–44 px control area. Pale lines and patterns are decoration.</p>
</aside>
<div class="filters" id="filters" hidden>
  <div><label for="search">Find artwork</label><input id="search" type="search" placeholder="Try save, work or review" autocomplete="off"></div>
  <div><label for="family">Family</label><select id="family"><option value="all">All families</option>''' + ''.join(options) + '''</select></div>
  <button id="clear" type="button">Reset filters</button>
</div>
<p id="result-count" class="result-count" role="status" aria-live="polite"></p>
<div id="library" tabindex="-1">''' + ''.join(sections) + '''</div>
<p id="no-results" hidden>No artwork matches. Try another name or reset the filters.</p>
<footer>Original Cadence vectors · MIT project license · <a href="ART_PROMPTS.md">Editorial image provenance</a>.<br>
Independent project. No institutional affiliation. Retained originals keep their existing paths.</footer>
</main>
</body>
</html>'''
    write(art / 'catalog.html', page)
    web_exports = []
    editorial_source = 'assets/illustrations/journal-editorial.png'
    for width, height, budget in [(480, 320, 20000), (960, 640, 60000), (1536, 1024, 160000)]:
        uri = f'website/assets/journal-editorial-{width}.webp'
        if (root / uri).exists():
            web_exports.append({'path': uri, 'source': editorial_source, 'width': width, 'height': height,
                                'bytes': (root / uri).stat().st_size, 'maxBytes': budget,
                                'transform': 'webp-quality-82'})
    for name, source in [('journal-editorial.png', editorial_source), ('social-card.png', 'assets/social/social-card.png')]:
        target = root / 'website' / 'assets' / name
        if target.exists():
            width, height = struct.unpack('>II', target.read_bytes()[16:24])
            web_exports.append({'path': target.relative_to(root).as_posix(), 'source': source,
                                'width': width, 'height': height, 'bytes': target.stat().st_size, 'transform': 'copy'})
    previous = json.loads((art / 'manifest.json').read_text(encoding='utf-8')) if (art / 'manifest.json').exists() else {}
    manifest = {'version': 2, 'palette': palette, 'appPalette': APP_PALETTE, 'iconGrid': 24, 'iconStroke': 1.75,
                'files': files, 'webExports': web_exports}
    # Only the raster exporter can attest to which sources produced the previews.
    if 'previews' in previous:
        manifest['previews'] = previous['previews']
    write(art / 'manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2))
