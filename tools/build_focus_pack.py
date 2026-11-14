"""Build editable, sample-free music studies. This is not application code."""

from pathlib import Path
import hashlib
import html
import json
import math
import re
import struct
import subprocess
import tempfile

import numpy as np
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / 'assets' / 'focus-pack'
RATE = 44100
PROGRAMS = {'piano': 0, 'guitar': 24, 'flute': 73, 'strings': 48, 'bell': 10,
            'harp': 46, 'electric_piano': 4, 'marimba': 12, 'celesta': 8}
SPECS = [
    ('morning-margins', 'Morning Margins', 68, 4, 'piano', 'C major'),
    ('lamplight-pages', 'Lamplight Pages', 60, 3, 'piano', 'D major'),
    ('cedar-strings', 'Cedar Strings', 72, 4, 'guitar', 'G major'),
    ('garden-air', 'Garden Air', 64, 4, 'flute', 'F major'),
    ('rain-on-paper', 'Rain on Paper', 66, 4, 'piano', 'F major'),
    ('first-snow', 'First Snow', 58, 3, 'piano', 'C major'),
    ('warm-window', 'Warm Window', 76, 4, 'guitar', 'A major'),
    ('linen-harp', 'Linen Harp', 70, 4, 'harp', 'D major'),
    ('amber-keys', 'Amber Keys', 64, 3, 'electric_piano', 'G major'),
    ('woodland-steps', 'Woodland Steps', 78, 4, 'marimba', 'F major'),
    ('dusk-chamber', 'Dusk Chamber', 62, 4, 'strings', 'G major'),
    ('silver-orbit', 'Silver Orbit', 72, 4, 'celesta', 'G major'),
]


def write_json(path, value):
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')


def compose(index, spec):
    """Write four distinct 32-bar studies with A/A'/B/A'' phrase structure."""
    ident, title, bpm, meter, lead, key = spec
    template = [0, 1, 2, 3, 0, 1, 2, 0, 1, 2, 3, 0][index]
    transpose = [0, 0, 0, 0, 5, -2, 2, 2, 5, -2, 2, 7][index]
    harmonies = [
        [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59],
         [48, 55, 60, 64], [52, 59, 64, 67], [41, 48, 53, 57], [43, 50, 55, 59]],
        [[50, 57, 62, 66], [47, 54, 59, 62], [43, 50, 55, 59], [45, 52, 57, 61],
         [54, 57, 62, 66], [43, 50, 55, 59], [45, 52, 57, 61], [50, 57, 62, 66]],
        [[43, 50, 55, 59], [40, 47, 52, 55], [48, 52, 55, 60], [50, 54, 57, 62],
         [47, 50, 55, 59], [45, 52, 57, 60], [50, 54, 57, 62], [43, 50, 55, 59]],
        [[41, 48, 53, 57], [38, 45, 50, 53], [46, 53, 58, 62], [48, 55, 60, 64],
         [45, 52, 57, 60], [46, 53, 58, 62], [48, 55, 60, 64], [41, 48, 53, 57]],
    ][template]
    themes = [
        [[76, 79, 74, 72], [72, 76, 71, 69], [69, 72, 76, 72], [71, 74, 72, 67],
         [76, 79, 84, 79], [79, 76, 74, 71], [77, 76, 72, 69], [74, 71, 67, 72]],
        [[78, 76, 74], [74, 73, 71], [71, 74, 79], [76, 73, 69],
         [78, 81, 78], [79, 78, 74], [76, 73, 69], [78, 76, 74]],
        [[71, 74, 76, 74], [71, 67, 64, 67], [72, 71, 67, 64], [69, 74, 72, 69],
         [71, 74, 79, 74], [72, 69, 67, 64], [69, 72, 74, 78], [74, 71, 69, 67]],
        [[69, 72], [69, 65], [70, 74], [72, 67], [69, 72], [74, 70], [72, 76], [69, 65]],
    ][template]
    if index >= 4:
        # Each extra study has a separate written motif, not a transposed export.
        themes = {
            4: [[72, 79, 76, 74], [76, 72, 69, 71], [77, 72, 69, 72], [74, 71, 67, 69], [79, 76, 72, 76], [76, 71, 67, 71], [72, 69, 65, 69], [71, 74, 79, 74]],
            5: [[74, 81, 78], [71, 78, 74], [79, 74, 71], [73, 76, 81], [78, 74, 69], [74, 79, 83], [81, 76, 73], [74, 78, 74]],
            6: [[67, 71, 74, 71], [64, 67, 71, 76], [67, 72, 76, 72], [74, 69, 66, 69], [74, 71, 67, 62], [69, 72, 76, 72], [66, 69, 74, 72], [71, 67, 62, 67]],
            7: [[79, 76, 72, 67], [76, 72, 69, 64], [77, 72, 69, 65], [79, 74, 71, 67], [84, 79, 76, 72], [83, 79, 76, 71], [81, 77, 72, 69], [79, 74, 71, 72]],
            8: [[78, 74, 69], [78, 74, 71], [79, 78, 74], [76, 81, 73], [74, 78, 81], [71, 74, 79], [73, 69, 76], [74, 69, 74]],
            9: [[67, 74, 71, 67], [71, 67, 76, 71], [72, 76, 67, 72], [74, 69, 78, 74], [71, 67, 74, 79], [69, 76, 72, 69], [74, 78, 69, 66], [67, 71, 74, 67]],
            10: [[65, 69], [62, 65], [70, 65], [67, 72], [69, 64], [70, 74], [76, 72], [69, 65]],
            11: [[72, 76, 79, 84], [69, 72, 76, 81], [65, 69, 72, 77], [67, 71, 74, 79], [76, 79, 84, 79], [71, 76, 79, 83], [69, 72, 77, 81], [67, 74, 71, 72]],
        }[index]
    harmonies = [[pitch + transpose for pitch in chord] for chord in harmonies]
    themes = [[pitch + transpose for pitch in motif] for motif in themes]
    notes = []

    def add(beat, duration, pitch, velocity, instrument, pan):
        notes.append({'beat': round(beat, 4), 'duration': round(duration, 4),
                      'pitch': pitch, 'velocity': velocity, 'instrument': instrument, 'pan': pan})

    for bar in range(32):
        section, phrase = divmod(bar, 8)
        chord = harmonies[phrase]
        start = bar * meter
        final = bar == 31
        if final:
            chord = harmonies[0]
        level = [0, -5, 2, -3][section]
        if lead in ('flute', 'strings'):
            for j, pitch in enumerate(chord[:3]):
                add(start, meter - 0.15, pitch, 33 + level, 'strings', [-0.4, 0.05, 0.4][j])
            melody = themes[phrase]
            if final:
                add(start + 0.2, meter - 0.5, 65 + transpose, 48, lead, 0.1)
            else:
                for j, pitch in enumerate(melody):
                    add(start + j * 2 + 0.15, 1.45 if j == 0 else 1.2,
                        pitch + (12 if section == 2 and phrase in (2, 5) else 0),
                        48 + level + (2 if j == 0 else -3), lead, 0.1)
        else:
            pattern = [0, 2, 1, 3, 2, 1, 3, 2] if meter == 4 else [0, 2, 3, 1, 2, 3]
            if final:
                for j, pitch in enumerate(chord):
                    add(start + j * 0.025, meter, pitch, 38 + j, lead, -0.22 + j * 0.1)
            else:
                for j, tone in enumerate(pattern):
                    add(start + j * 0.5, 0.95 if j else 1.8, chord[tone],
                        35 + level + (5 if j == 0 else j % 3), lead, -0.25)
            melody = themes[phrase]
            if final:
                add(start + 0.1, meter, [72, 74, 67][template] + transpose, 52, lead, 0.22)
            else:
                for j, pitch in enumerate(melody):
                    # Leave room at phrase endings and vary the return gently.
                    if phrase in (3, 7) and j == len(melody) - 1:
                        continue
                    offset = (0.5 if lead == 'guitar' else 0.0) + j
                    if section == 2 and j in (1, 2):
                        pitch += 12 if index == 0 else 0
                    add(start + offset, 0.85 if j < len(melody) - 1 else 1.4,
                        pitch, 53 + level + (3 if j == 0 else 0), lead, 0.22)
    return {'version': 1, 'id': ident, 'title': title, 'kind': 'music', 'bpm': bpm,
            'meter': [meter, 4], 'key': key, 'bars': 32, 'duration_beats': 32 * meter,
            'tail_seconds': 4, 'seed': 26111501 + index, 'lead': lead,
            'status': 'synthetic_arrangement_draft', 'seamless_loop': False,
            'notes': sorted(notes, key=lambda n: (n['beat'], n['pitch']))}


def tone(note, seconds, seed):
    """Small additive instrument studies, with no external recordings or samples."""
    kind = note['instrument']
    sustained = kind in ('flute', 'strings')
    tail = 0.35 if sustained else 2.2
    t = np.arange(int((seconds + tail) * RATE), dtype=np.float64) / RATE
    frequency = 440 * 2 ** ((note['pitch'] - 69) / 12)
    wave = np.zeros_like(t)
    if not sustained:
        partials = 9 if kind == 'piano' else 7
        for harmonic in range(1, partials + 1):
            if frequency * harmonic > RATE * 0.43:
                break
            stretch = math.sqrt(1 + (0.00012 if kind == 'piano' else 0.000025) * harmonic ** 2)
            decay = {'piano': 2.5, 'guitar': 1.65, 'harp': 2.1, 'marimba': 0.85,
                     'electric_piano': 2.3, 'celesta': 1.75, 'bell': 1.4}[kind] / harmonic ** 0.65
            amplitude = 1 / harmonic ** (1.9 if kind == 'piano' else 1.55)
            if kind == 'guitar':
                amplitude *= abs(math.sin(harmonic * math.pi * 0.23))
            if kind in ('marimba', 'electric_piano'):
                amplitude *= 1 if harmonic == 1 else 0.3
            if kind in ('celesta', 'bell') and harmonic == 3:
                stretch *= 1.03
            wave += amplitude * np.exp(-t / decay) * np.sin(2 * np.pi * frequency * harmonic * stretch * t)
        wave *= 1 - np.exp(-t / 0.008)
        wave *= np.exp(-np.maximum(t - seconds, 0) / 0.45)
    else:
        attack = 0.09 if kind == 'flute' else 0.27
        env = np.minimum(t / attack, 1) * np.clip((seconds + tail - t) / tail, 0, 1)
        vibrato = 0.0025 * np.sin(2 * np.pi * 4.6 * t) * np.minimum(t / 0.5, 1)
        phase = np.cumsum(frequency * (1 + vibrato)) * (2 * np.pi / RATE)
        if kind == 'flute':
            for h, a in [(1, 1), (2, 0.13), (3, 0.07), (4, 0.015)]:
                wave += a * np.sin(h * phase)
            rng = np.random.default_rng(seed)
            air = sosfilt(butter(2, [800, 4000], 'bandpass', fs=RATE, output='sos'), rng.normal(size=len(t)))
            wave += air * 0.018
        else:
            for detune in (-0.0018, 0.0018):
                for h in range(1, 8):
                    wave += 0.33 / h ** 1.7 * np.sin(h * phase * (1 + detune))
        wave *= env
    wave *= (note['velocity'] / 127) ** 1.5
    wave[-min(300, len(wave)):] *= np.linspace(1, 0, min(300, len(wave)))
    return wave.astype(np.float32)


def render(score):
    beat_seconds = 60 / score['bpm']
    duration = score['duration_beats'] * beat_seconds + score['tail_seconds']
    output = np.zeros((int(duration * RATE), 2), dtype=np.float32)
    rng = np.random.default_rng(score['seed'])
    for i, note in enumerate(score['notes']):
        signal = tone(note, note['duration'] * beat_seconds, score['seed'] + i)
        human = rng.uniform(-0.008, 0.008) if score['kind'] == 'music' else 0
        start = max(0, int((note['beat'] * beat_seconds + 0.05 + human) * RATE))
        count = min(len(signal), len(output) - start)
        if count <= 0:
            continue
        angle = (note['pan'] + 1) * math.pi / 4
        output[start:start + count, 0] += signal[:count] * math.cos(angle)
        output[start:start + count, 1] += signal[:count] * math.sin(angle)
    dry = output.copy()
    # Sparse stereo room reflections; no external impulse response is used.
    for delay, level in [(0.047, 0.13), (0.083, 0.10), (0.149, 0.07), (0.233, 0.04), (0.391, 0.025)]:
        n = int(delay * RATE)
        output[n:] += dry[:-n, ::-1] * level
    output = sosfilt(butter(2, 35, 'highpass', fs=RATE, output='sos'), output, axis=0).astype(np.float32)
    fade = int(min(1.6, duration / 5) * RATE)
    output[:int(RATE * 0.025)] *= np.linspace(0, 1, int(RATE * 0.025))[:, None]
    output[-fade:] *= np.linspace(1, 0, fade)[:, None]
    output *= 0.6 / max(0.001, float(np.max(np.abs(output))))
    return output


def vlq(value):
    result = [value & 127]
    while value >> 7:
        value >>= 7
        result.insert(0, (value & 127) | 128)
    return bytes(result)


def write_midi(score, path):
    events = [(0, b'\xff\x51\x03' + int(60_000_000 / score['bpm']).to_bytes(3, 'big')),
              (0, bytes([0xff, 0x58, 4, score['meter'][0], 2, 24, 8]))]
    instruments = sorted({n['instrument'] for n in score['notes']})
    channels = {instrument: i for i, instrument in enumerate(instruments)}
    for instrument, channel in channels.items():
        events.append((0, bytes([0xc0 + channel, PROGRAMS[instrument]])))
    for note in score['notes']:
        ch = channels[note['instrument']]
        events.append((round(note['beat'] * 480), bytes([0x90 + ch, note['pitch'], note['velocity']])))
        events.append((round((note['beat'] + note['duration']) * 480), bytes([0x80 + ch, note['pitch'], 0])))
    events.sort(key=lambda e: (e[0], e[1][0]))
    body, last = bytearray(), 0
    for tick, event in events:
        body.extend(vlq(tick - last) + event)
        last = tick
    body.extend(b'\x00\xff\x2f\x00')
    path.write_bytes(b'MThd' + struct.pack('>IHHH', 6, 0, 1, 480) + b'MTrk' + struct.pack('>I', len(body)) + body)


def command(args):
    return subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y'] + args,
                          capture_output=True, check=True).stdout


def cover(index, score):
    color = ['#7C394B', '#415A4E', '#725641', '#526679'][index % 4]
    lines = ''.join(f'<path d="M {140+i*28} 430 Q {154+i*28} {270+int(45*math.sin(i*.7))} {168+i*28} 430"/>' for i in range(18))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(score['title'])} cover</title><desc id="desc">A quiet line motif on warm paper. Synthetic music study.</desc>
<rect width="800" height="800" fill="#F6F5F1"/><rect x="44" y="44" width="712" height="712" fill="none" stroke="{color}"/>
<text x="80" y="112" font-family="serif" font-size="20" fill="#2F3033" letter-spacing="4">CADENCE / SOUND STUDY {index+1:02}</text>
<circle cx="400" cy="356" r="170" fill="{color}" opacity="0.07"/><g fill="none" stroke="{color}" stroke-width="2">{lines}</g>
<circle cx="400" cy="258" r="7" fill="{color}"/>
<text x="80" y="612" font-family="Georgia,serif" font-size="44" fill="#2F3033">{html.escape(score['title'])}</text>
<text x="80" y="658" font-family="sans-serif" font-size="19" fill="{color}">{html.escape(score['key'])} / {score['bpm']} BPM / SYNTHETIC DRAFT</text></svg>'''


def fingerprint(path):
    return {'path': path.relative_to(PACK).as_posix(), 'bytes': path.stat().st_size,
            'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}


def gallery(records):
    cards = []
    for i, item in enumerate(records):
        ident = item['id']
        picture = f'<img src="art/{ident}.svg" alt="" width="800" height="800" loading="lazy">' if item['kind'] == 'music' else ''
        minutes, seconds = divmod(round(item['durationSeconds']), 60)
        label = html.escape(item['title'])
        lead = SPECS[i][4].replace('_', ' ').title() if item['kind'] == 'music' else 'Soft cue'
        cards.append(f'''<article>{picture}<div class="card-body"><p class="label">{lead} / {minutes}:{seconds:02}</p>
<h3>{label}</h3><audio controls preload="none" aria-label="Play {label}"><source src="{item['preview']}" type="audio/mpeg"></audio>
<p class="links"><a href="{item['preview']}" download>MP3</a> <a href="{item['runtime']}" download>OGG</a>
<a href="{item['master']}" download>FLAC</a> <a href="{item['midi']}" download>MIDI</a> <a href="{item['source']}">Notes</a></p></div></article>''')
    total = sum(item['durationSeconds'] for item in records if item['kind'] == 'music')
    page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cadence / Sound studies</title><style>
:root{color-scheme:light;--ink:#2F3033;--wine:#7C394B;--paper:#F6F5F1}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.65 system-ui,sans-serif}main{max-width:1200px;margin:auto;padding:40px 24px 72px}a{color:var(--wine);text-underline-offset:4px}a:focus-visible,button:focus-visible,audio:focus-visible{outline:3px solid var(--wine);outline-offset:4px}h1,h2,h3{font-family:Georgia,serif;line-height:1.2}h1{font-size:clamp(36px,6vw,64px);font-weight:normal;margin:12px 0 20px}h2{margin-top:52px;font-size:30px}h3{font-size:24px;margin:8px 0 20px}.label{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#5c4b50}.intro{max-width:680px}.hero{width:100%;max-height:500px;object-fit:cover;margin-top:24px;border:1px solid #d9d5ce}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:24px}article{border:1px solid #d9d5ce;background:#fff;min-width:0}article img{display:block;width:100%;height:auto}.card-body{padding:20px}audio{width:100%;display:block;min-width:0}.links{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:0}.links a{display:inline-flex;align-items:center;min-height:44px}button{font:inherit;padding:10px 20px;background:var(--wine);border:0;color:white;cursor:pointer;border-radius:4px}.notice{border-left:3px solid var(--wine);padding:12px 20px;background:#eeeae5}footer{margin-top:48px;border-top:1px solid #d9d5ce;padding-top:24px}
</style></head><body><main><p class="label">Cadence / prepared media / 2026-11-15</p><h1>A quiet place to begin.</h1>
<p class="intro">Twelve instrumental arrangements for a small offline focus space. These are synthetic sound studies with editable notes, not live recordings or implemented app features.</p>
<p><a href="README.md">Source and review notes</a> · <a href="../../docs/DESKTOP_V1.md">Desktop proposal</a> · <a href="../../docs/STEAM_SALES_PLAN.md">Sales targets</a> · <a href="../catalog.html">Artwork library</a></p>
<img class="hero" src="art/quiet-room.png" alt="An illustrated piano and writing desk beside a garden window." width="1536" height="1024">
<p class="notice">Sound is off until you press Play. Tracks have natural ending tails; seamless loops are not certified. Human listening review is pending. All playback files are local.</p>
<button type="button" id="stop">Stop all audio</button>'''
    for name, indexes in [('Paper Piano', [0, 1, 4, 5]), ('Wood and Air', [2, 6, 7, 3]), ('Evening Notes', [8, 9, 10, 11]), ('Optional soft cues', [12, 13, 14])]:
        page += f'<h2>{name}</h2><div class="grid">' + ''.join(cards[i] for i in indexes) + '</div>'
    page += f'<footer>{len([r for r in records if r["kind"] == "music"])} pieces / {total / 60:.1f} minutes of distinct music. Three separate cues. No remote fonts, player services or advertising. <a href="manifest.json">File manifest</a>.</footer>'
    page += '''</main><script>
const players = Array.from(document.querySelectorAll('audio'));
players.forEach(player => player.addEventListener('play', () => players.forEach(other => { if (other !== player) other.pause(); })));
document.querySelector('#stop').addEventListener('click', () => players.forEach(player => { player.pause(); player.currentTime = 0; }));
</script></body></html>'''
    (PACK / 'index.html').write_text(page + '\n', encoding='utf-8')


def main():
    for directory in ['scores', 'masters', 'audio', 'previews', 'art']:
        (PACK / directory).mkdir(parents=True, exist_ok=True)
    scores = []
    for i, spec in enumerate(SPECS):
        source = PACK / 'scores' / (spec[0] + '.json')
        if not source.exists():
            write_json(source, compose(i, spec))
        scores.append(json.loads(source.read_text(encoding='utf-8')))
    for ident, pitches in [('focus-start', [72, 76]), ('focus-complete', [72, 76, 79]), ('break-end', [79, 76, 72])]:
        source = PACK / 'scores' / (ident + '.json')
        if not source.exists():
            notes = [{'beat': i * 0.32, 'duration': 0.3, 'pitch': p, 'velocity': 42,
                      'instrument': 'bell', 'pan': 0} for i, p in enumerate(pitches)]
            write_json(source, {'version': 1, 'id': ident, 'title': ident.replace('-', ' ').title(),
                               'kind': 'cue', 'bpm': 60, 'meter': [4, 4], 'duration_beats': 1,
                               'tail_seconds': 2, 'seed': 42, 'seamless_loop': False, 'notes': notes})
        scores.append(json.loads(source.read_text(encoding='utf-8')))
    records = []
    for i, score in enumerate(scores):
        ident = score['id']
        print(f'Rendering {ident}', flush=True)
        write_midi(score, PACK / 'scores' / (ident + '.mid'))
        sound = render(score)
        master = PACK / 'masters' / (ident + '.flac')
        with tempfile.TemporaryDirectory(prefix='cadence-audio-') as directory:
            raw = Path(directory) / 'render.f32'
            sound.astype('<f4').tofile(raw)
            target = -22 if score['kind'] == 'music' else -28
            audio_input = ['-f', 'f32le', '-ar', str(RATE), '-ac', '2', '-i', str(raw)]
            level_filter = f'loudnorm=I={target}:TP=-3:LRA=11'
            if score['kind'] == 'cue':
                # Short cues need constant-gain normalization. Dynamic loudnorm
                # over a three-second clip can miss its integrated target.
                scan = subprocess.run(['ffmpeg', '-hide_banner', '-nostats'] + audio_input +
                                      ['-af', 'loudnorm=print_format=json', '-f', 'null', '-'],
                                      capture_output=True, text=True, check=True)
                measured = json.loads(re.search(r'\{\s*"input_i"[\s\S]*?\}', scan.stderr).group())
                gain = min(target - float(measured['input_i']), -3 - float(measured['input_tp']))
                level_filter = f'volume={gain:.3f}dB'
            command(['-f', 'f32le', '-ar', str(RATE), '-ac', '2', '-i', str(raw),
                     '-af', level_filter, '-ar', str(RATE),
                     '-c:a', 'flac', '-sample_fmt', 's16', str(master)])
        runtime = PACK / 'audio' / (ident + '.ogg')
        preview = PACK / 'previews' / (ident + '.mp3')
        command(['-i', str(master), '-c:a', 'libvorbis', '-q:a', '4', str(runtime)])
        command(['-i', str(master), '-c:a', 'libmp3lame', '-b:a', '160k', str(preview)])
        if score['kind'] == 'music':
            (PACK / 'art' / (ident + '.svg')).write_text(cover(i, score), encoding='utf-8')
        records.append({'id': ident, 'title': score['title'], 'kind': score['kind'],
                        'status': 'synthetic_arrangement_draft', 'durationSeconds': len(sound) / RATE,
                        'sampleRate': RATE, 'channels': 2, 'seamlessLoop': False,
                        'targetLufs': target, 'source': f'scores/{ident}.json', 'midi': f'scores/{ident}.mid',
                        'master': f'masters/{ident}.flac', 'runtime': f'audio/{ident}.ogg',
                        'preview': f'previews/{ident}.mp3', 'humanListeningReview': 'pending'})
    files = [fingerprint(p) for d in ['scores', 'masters', 'audio', 'previews', 'art'] for p in sorted((PACK / d).glob('*')) if p.is_file()]
    write_json(PACK / 'manifest.json', {'version': 1, 'status': 'prepared_not_integrated',
               'renderer': {'path': '../../tools/build_focus_pack.py',
                            'sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest()},
               'tracks': records, 'files': files})
    gallery(records)
    print(f'Built {len(records)} audio studies; no application files changed.', flush=True)


if __name__ == '__main__':
    main()
