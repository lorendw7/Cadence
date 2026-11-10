"""Read-only artwork checks. Run with Python 3; no extra packages required."""
from pathlib import Path
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
            require(dimensions(data) == (entry['width'], entry['height']),
                    f'Wrong image dimensions: {name}')
        except (ValueError, struct.error) as error:
            errors.append(f'{name}: {error}')
    if entry.get('transform') == 'copy':
        require(data == (ROOT / entry['source']).read_bytes(), f'Deployment copy differs: {name}')

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
print(f'Checked {len(svgs)} SVGs, {len(tracked)} manifest entries, responsive image budgets and platform copies.')
