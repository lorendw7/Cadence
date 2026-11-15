"""Check prepared media. This does not replace a human listening review."""

import argparse
from array import array
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import json
import math
from pathlib import Path
import re
import subprocess
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / 'assets' / 'focus-pack'


def require(condition, message):
    if not condition:
        raise ValueError(message)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


class LocalPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.players = 0

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'audio':
            self.players += 1
            require('autoplay' not in values, 'The listening page must not autoplay')
            require(bool(values.get('aria-label')), 'Audio needs an accessible name')
        for attribute in ('src', 'href'):
            if attribute not in values:
                continue
            value = urlsplit(values[attribute])
            require(not value.scheme and not value.netloc, 'The listening page must use local resources')
            target = (PACK / unquote(value.path)).resolve()
            require(target.is_relative_to(ROOT), 'A catalogue link escapes the repository')
            require(target.exists(), f'Missing catalogue file: {value.path}')


def measure(path):
    probe = subprocess.run(['ffprobe', '-v', 'error', '-show_entries',
                            'stream=codec_name,sample_rate,channels:format=duration', '-of', 'json', str(path)],
                           check=True, capture_output=True, text=True)
    data = json.loads(probe.stdout)
    stream = data['streams'][0]
    result = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(path),
                             '-af', 'loudnorm=I=-22:TP=-3:LRA=11:print_format=json',
                             '-f', 'null', '-'], capture_output=True, text=True, check=True)
    match = re.search(r'\{\s*"input_i"[\s\S]*?\}', result.stderr)
    require(match, f'No loudness measurement: {path.name}')
    level = json.loads(match.group())
    return {'codec': stream['codec_name'], 'sampleRate': int(stream['sample_rate']),
            'channels': stream['channels'], 'durationSeconds': float(data['format']['duration']),
            'integratedLufs': float(level['input_i']), 'truePeakDbfs': float(level['input_tp'])}


def edge_peak(path, start):
    """Measure decoded samples, including lossy encodings, at a file boundary."""
    result = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(start), '-i', str(path),
                             '-t', '0.05', '-f', 'f32le', '-c:a', 'pcm_f32le', '-'],
                            capture_output=True, check=True)
    samples = array('f', result.stdout)
    require(bool(samples), f'No edge samples: {path.name}')
    peak = max(abs(value) for value in samples)
    return round(20 * math.log10(max(peak, 0.000001)), 2)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    manifest = json.loads((PACK / 'manifest.json').read_text(encoding='utf-8'))
    require(manifest['renderer']['sha256'] == digest(ROOT / 'tools/build_focus_pack.py'), 'Stale renderer fingerprint')
    listed = set()
    for entry in manifest['files']:
        target = (PACK / entry['path']).resolve()
        require(target.is_relative_to(PACK), 'Manifest path escapes the pack')
        require(entry['path'] not in listed, 'Duplicate manifest file')
        listed.add(entry['path'])
        require(target.is_file(), f'Missing file: {entry["path"]}')
        require(target.stat().st_size == entry['bytes'] and digest(target) == entry['sha256'], f'Stale file: {entry["path"]}')
        if target.suffix == '.svg':
            svg = ET.fromstring(target.read_text(encoding='utf-8'))
            require(svg.attrib.get('viewBox') == '0 0 800 800', 'Unexpected cover dimensions')
            require(not re.search(r'<script|onload=|javascript:', target.read_text(encoding='utf-8'), re.I), 'Unsafe cover')
    actual = {p.relative_to(PACK).as_posix() for d in ['scores', 'audio', 'masters', 'previews', 'art'] for p in (PACK / d).glob('*') if p.is_file()}
    require(listed == actual, 'Manifest must cover every source and export in the media folders')
    require(len([t for t in manifest['tracks'] if t['kind'] == 'music']) == 16, 'Expected 16 music pieces')
    require(len([t for t in manifest['tracks'] if t['kind'] == 'cue']) == 3, 'Expected three cues')
    page = LocalPage()
    page.feed((PACK / 'index.html').read_text(encoding='utf-8'))
    require(page.players == len(manifest['tracks']), 'Every audio item needs a player')
    measurements = []
    melodies = set()
    for track in manifest['tracks']:
        score = json.loads((PACK / track['source']).read_text(encoding='utf-8'))
        midi = (PACK / track['midi']).read_bytes()
        require(midi.startswith(b'MThd\x00\x00\x00\x06') and midi.endswith(b'\x00\xff\x2f\x00'), 'Invalid MIDI container')
        require(score['id'] == track['id'] and score['notes'], 'Score must match the manifest')
        for note in score['notes']:
            require(0 <= note['pitch'] <= 127 and 0 < note['velocity'] <= 127, 'Invalid MIDI note')
            require(note['beat'] >= 0 and note['duration'] > 0, 'Invalid note time')
        signature = json.dumps([(n['beat'], n['pitch'], n['duration']) for n in score['notes']])
        require(signature not in melodies, 'Duplicate note arrangement')
        melodies.add(signature)
        require(track['seamlessLoop'] is False, 'Drafts must not claim certified seamless loops')
        for variant in ['master', 'runtime', 'preview']:
            path = PACK / track[variant]
            measured = measure(path)
            require(measured['sampleRate'] == 44100 and measured['channels'] == 2, f'Unexpected audio format: {path.name}')
            require(abs(measured['durationSeconds'] - track['durationSeconds']) < 0.15, f'Duration mismatch: {path.name}')
            require(measured['truePeakDbfs'] <= -2.0, f'Insufficient peak headroom: {path.name}')
            require(abs(measured['integratedLufs'] - track['targetLufs']) <= 2.5, f'Loudness outside target range: {path.name}')
            if score.get('collection') == 'Slow Pages':
                measured['openingPeakDbfs'] = edge_peak(path, 0)
                measured['endingPeakDbfs'] = edge_peak(path, measured['durationSeconds'] - 0.05)
                require(measured['openingPeakDbfs'] <= -40 and measured['endingPeakDbfs'] <= -40,
                        f'A sparse study needs quiet file boundaries: {path.name}')
            measurements.append({'id': track['id'], 'variant': variant, 'path': track[variant], 'sha256': digest(path), **measured})
        print(f'Checked {track["id"]}', flush=True)
    report = {'checkedAtUtc': datetime.now(timezone.utc).isoformat(), 'status': 'automated_checks_passed',
              'scope': 'Hashes, local links, score bounds, audio decoding, duration, format, loudness and true peaks; decoded 50 ms edge peaks for Slow Pages.',
              'humanListeningReview': 'pending', 'browserPlaybackReview': 'pending',
              'applicationIntegration': 'not_implemented', 'filesChecked': len(listed),
              'musicMinutes': sum(t['durationSeconds'] for t in manifest['tracks'] if t['kind'] == 'music') / 60,
              'runtimeAudioBytes': sum((PACK / t['runtime']).stat().st_size for t in manifest['tracks']),
              'measurements': measurements}
    if args.report:
        target = args.report.resolve()
        require(target.is_relative_to(PACK), 'A measurement report must stay inside the focus pack')
        target.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8', newline='\n')
    print(f'Passed: {len(listed)} source/export files, {page.players} players and {len(measurements)} decoded audio files. Music: {report["musicMinutes"]:.1f} minutes.', flush=True)


if __name__ == '__main__':
    main()
