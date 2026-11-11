"""Read-only artwork checks. Run with Python 3; no extra packages required."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json
import struct
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
errors = []


def require(condition, message):
    if not condition:
        errors.append(message)


def dimensions(data):
    if data.startswith(b'\x89PNG\r\n\x1a\n'):
        return struct.unpack('>II', data[16:24])
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        offset = 12
        while offset + 8 <= len(data):
            kind = data[offset:offset + 4]
            size = int.from_bytes(data[offset + 4:offset + 8], 'little')
            payload = data[offset + 8:offset + 8 + size]
            if kind == b'VP8 ' and payload[3:6] == b'\x9d\x01\x2a':
                width, height = struct.unpack('<HH', payload[6:10])
                return width & 0x3fff, height & 0x3fff
            if kind == b'VP8X':
                return (1 + int.from_bytes(payload[4:7], 'little'),
                        1 + int.from_bytes(payload[7:10], 'little'))
            offset += 8 + size + size % 2
    raise ValueError('Unsupported or damaged image header')


def svg_dimensions(data):
    tree = ET.fromstring(data)
    return float(tree.attrib['width']), float(tree.attrib['height'])


def element_signature(element):
    """Compare SVG content without depending on attribute order or spacing."""
    return (element.tag, tuple(sorted(element.attrib.items())),
            (element.text or '').strip(),
            tuple(element_signature(child) for child in element))


class CatalogueCards(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if (tag == 'article' and 'card' in attributes.get('class', '').split()
                and 'data-asset' in attributes):
            self.assets.append(attributes['data-asset'])


manifest = json.loads((ROOT / 'assets/manifest.json').read_text(encoding='utf-8'))
tracked = set()
for entry in manifest['files'] + manifest.get('webExports', []):
    name = entry['path']
    require(name not in tracked, f'Duplicate manifest path: {name}')
    tracked.add(name)
    file = ROOT / name
    require(file.is_file(), f'Missing artwork: {name}')
    if not file.is_file():
        continue
    data = file.read_bytes()
    require(len(data) == entry['bytes'], f'Stale manifest size: {name}')
    if 'maxBytes' in entry:
        require(len(data) <= entry['maxBytes'], f'Image exceeds delivery budget: {name}')
    if 'width' in entry:
        try:
            measure = svg_dimensions if file.suffix == '.svg' else dimensions
            require(measure(data) == (entry['width'], entry['height']),
                    f'Wrong image dimensions: {name}')
        except (ValueError, KeyError, ET.ParseError, struct.error) as error:
            errors.append(f'{name}: {error}')
    if entry.get('transform') == 'copy':
        require(data == (ROOT / entry['source']).read_bytes(), f'Deployment copy differs: {name}')

for entry in manifest['files']:
    name = entry['path']
    require(entry.get('role') in {'source', 'sprite', 'export'},
            f'Missing or invalid artwork role: {name}')
    require(entry.get('status') in {'current', 'retained'},
            f'Missing or invalid artwork status: {name}')
    require(entry.get('previewSurface') in {'paper', 'ink'},
            f'Missing or invalid preview surface: {name}')
    for key in ['use', 'group']:
        require(isinstance(entry.get(key), str) and bool(entry[key].strip()),
                f'Missing artwork {key}: {name}')
    if entry.get('type') == 'png' or (entry.get('type') == 'svg'
                                     and entry.get('role') != 'sprite'):
        require(all(type(entry.get(key)) is int and entry[key] > 0
                    for key in ['width', 'height']),
                f'Missing artwork dimensions: {name}')
    if 'source' in entry:
        require(entry.get('role') == 'export', f'Only exports should name a source: {name}')
        require((ROOT / entry['source']).is_file(), f'Missing export source: {name}')

catalogue = CatalogueCards()
catalogue.feed((ROOT / 'assets/catalog.html').read_text(encoding='utf-8'))
require(len(catalogue.assets) == len(set(catalogue.assets)),
        'Duplicate artwork cards in catalogue')
require(set(catalogue.assets) == {entry['path'] for entry in manifest['files']},
        'Catalogue cards differ from manifest artwork files')

previews = manifest.get('previews', {})
preview_inputs = previews.get('inputs', [])
preview_files = previews.get('files', [])
expected_previews = {'assets/preview.png', 'assets/preview-library.png'}
require({entry['path'] for entry in preview_files} == expected_previews,
        'Manifest must list both generated artwork previews')
require({'tools/artwork_previews.cjs', 'tools/export_artwork.cjs'}
        <= {entry['path'] for entry in preview_inputs},
        'Preview inputs must include both export scripts')
expected_preview_sources = {'assets/illustrations/journal-editorial.png',
                            'assets/social/social-card.svg'}
for pattern in ['brand/*.svg', 'icons/*.svg', 'illustrations/*.svg',
                'patterns/*.svg', 'platform/png/*.png']:
    expected_preview_sources.update(file.relative_to(ROOT).as_posix()
                                    for file in (ROOT / 'assets').glob(pattern)
                                    if file.name != 'sprite.svg')
require(expected_preview_sources <= {entry['path'] for entry in preview_inputs},
        'Preview inputs omit artwork; regenerate previews after adding sources')
for entries, label in [(preview_inputs, 'input'), (preview_files, 'output')]:
    paths = [entry['path'] for entry in entries]
    require(len(paths) == len(set(paths)), f'Duplicate preview {label} path')
    for entry in entries:
        name = entry['path']
        file = ROOT / name
        require(file.is_file(), f'Missing preview {label}: {name}')
        if not file.is_file():
            continue
        data = file.read_bytes()
        require(hashlib.sha256(data).hexdigest() == entry.get('sha256'),
                f'Stale preview {label}: {name}; regenerate artwork previews')
        if label == 'output':
            require(len(data) == entry.get('bytes'), f'Stale preview size: {name}')
            try:
                require(dimensions(data) == (entry.get('width'), entry.get('height')),
                        f'Wrong preview dimensions: {name}')
            except (ValueError, struct.error) as error:
                errors.append(f'{name}: {error}')

for folder in ['brand', 'icons', 'illustrations', 'patterns', 'social', 'platform']:
    for file in (ROOT / 'assets' / folder).rglob('*'):
        if file.is_file():
            require(file.relative_to(ROOT).as_posix() in tracked, f'Unlisted artwork: {file.name}')

for width in [480, 960, 1536]:
    require(f'website/assets/journal-editorial-{width}.webp' in tracked,
            f'Missing responsive export entry for {width}px')

svgs = list((ROOT / 'assets').rglob('*.svg')) + list((ROOT / 'website/assets').rglob('*.svg'))
for file in svgs:
    try:
        tree = ET.fromstring(file.read_bytes())
        for element in tree.iter():
            require(element.tag.split('}')[-1] not in {'script', 'foreignObject'},
                    f'Executable SVG content: {file.name}')
            for name, value in element.attrib.items():
                require(not name.lower().startswith('on'), f'SVG event handler: {file.name}')
                if name.split('}')[-1] == 'href':
                    require(value.startswith('#'), f'External SVG reference: {file.name}')
    except ET.ParseError as error:
        errors.append(f'Invalid SVG {file.name}: {error}')

namespace = '{http://www.w3.org/2000/svg}'
icon_files = [file for file in (ROOT / 'assets/icons').glob('*.svg')
              if file.name != 'sprite.svg']
require(manifest.get('iconGrid') == 24, 'The interface icon grid must be 24 units')
require(manifest.get('iconStroke') == 1.75, 'The interface icon stroke must be 1.75 units')
try:
    sprite = ET.fromstring((ROOT / 'assets/icons/sprite.svg').read_bytes())
    symbols = sprite.findall(f'{namespace}symbol')
    symbol_ids = [symbol.get('id') for symbol in symbols]
    require(len(symbol_ids) == len(set(symbol_ids)), 'Duplicate interface sprite symbol ID')
    require(set(symbol_ids) == {file.stem for file in icon_files},
            'Interface sprite IDs differ from standalone icon names')
    by_id = {symbol.get('id'): symbol for symbol in symbols}
    expected_style = {'fill': 'none', 'stroke': 'currentColor',
                      'stroke-width': '1.75', 'stroke-linecap': 'round',
                      'stroke-linejoin': 'round'}
    for file in icon_files:
        icon = ET.fromstring(file.read_bytes())
        require(icon.get('width') == '24' and icon.get('height') == '24'
                and icon.get('viewBox') == '0 0 24 24',
                f'Wrong interface icon grid: {file.name}')
        groups = icon.findall(f'{namespace}g')
        require(len(groups) == 1, f'Expected one interface icon group: {file.name}')
        if len(groups) != 1:
            continue
        group = groups[0]
        require(all(group.get(key) == value for key, value in expected_style.items()),
                f'Wrong interface icon stroke style: {file.name}')
        symbol = by_id.get(file.stem)
        if symbol is None:
            continue
        require(symbol.get('viewBox') == '0 0 24 24',
                f'Wrong sprite symbol grid: {file.stem}')
        require(tuple(element_signature(child) for child in symbol)
                == (element_signature(group),),
                f'Sprite artwork differs from standalone icon: {file.stem}')
except ET.ParseError as error:
    errors.append(f'Cannot compare interface sprite: {error}')

for file in (ROOT / 'assets/platform/png').glob('cadence-*.png'):
    size = int(file.stem.split('-')[-1])
    require(dimensions(file.read_bytes()) == (size, size), f'Wrong platform size: {file.name}')

for source, target in [
    ('assets/brand/cadence-icon-v2.svg', 'website/assets/icon-v2.svg'),
    ('assets/platform/cadence.ico', 'website/assets/favicon.ico'),
    ('assets/platform/cadence.ico', 'windows/runner/resources/cadence-v2.ico'),
    ('assets/platform/png/cadence-32.png', 'website/assets/favicon-32.png'),
    ('assets/platform/png/cadence-180.png', 'website/assets/apple-touch-icon.png'),
] + [(f'assets/icons/{name}.svg', f'website/assets/icons/{name}.svg')
     for name in ['today', 'week', 'tasks', 'arrow-up-right', 'chevron-down']]:
    require((ROOT / source).read_bytes() == (ROOT / target).read_bytes(),
            f'Deployment copy differs: {target}')

mac = ROOT / 'macos/Runner/Assets.xcassets/AppIcon.appiconset'
for entry in json.loads((mac / 'Contents.json').read_text(encoding='utf-8'))['images']:
    size = int(entry['size'].split('x')[0]) * int(entry['scale'].removesuffix('x'))
    require((mac / entry['filename']).read_bytes() ==
            (ROOT / f'assets/platform/png/cadence-{size}.png').read_bytes(),
            f'macOS mapping differs: {entry["filename"]}')

if errors:
    raise SystemExit('\n'.join(errors))
print(f'Checked {len(svgs)} SVGs, {len(tracked)} manifest entries, icon sprite parity, '
      'catalogue coverage, preview freshness, responsive image budgets and platform copies.')
