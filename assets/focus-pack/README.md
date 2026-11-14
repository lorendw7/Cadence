# Focus media studies

Prepared: 2026-11-15. Open the [local listening catalogue](index.html). This pack contains **12 synthetic instrumental arrangements, three short cues, 12 SVG covers and one generated room illustration**. It prepares the [desktop candidate](../../docs/DESKTOP_V1.md). It is not integrated into Flutter or the public website.

## What is present

| Collection | Pieces | Sound study |
|---|---|---|
| Paper Piano | Morning Margins, Lamplight Pages, Rain on Paper, First Snow | Four separate piano arrangements |
| Wood and Air | Cedar Strings, Warm Window, Linen Harp, Garden Air | Two guitar arrangements, harp, flute with strings |
| Evening Notes | Amber Keys, Woodland Steps, Dusk Chamber, Silver Orbit | Electric piano, marimba, chamber strings and celesta |
| Cues | Focus Start, Focus Complete, Break End | Quiet short note patterns; optional in the proposed app |

These are original note arrangements prepared for this project, rendered by a small mathematical synthesizer. They use no downloaded song, performer recording, soundfont or instrument sample. Their timbres are approximations, not natural instrument recordings. No named artist was requested. Human listening and similarity review remain pending; file checks cannot establish musical quality or exclusive rights.

The sources use separate melodies, chord patterns and phrase variations. Changing a title or exporting the same performance with another instrument would not count as a new composition. MIDI files describe notes and instrument choices; playback in a music editor will depend on its instruments. They do not reproduce the renderer's exact tone or room reflections.

## Files

| Path | Role |
|---|---|
| [scores/](scores/) | Editable JSON notes and derived standard MIDI files; pitch uses MIDI note numbers, beat/duration use quarter-note beats |
| [masters/](masters/) | Stereo 44.1 kHz, 16-bit FLAC masters; lossless copies of the normalized synthetic render |
| [audio/](audio/) | OGG Vorbis runtime candidates; native Windows decoder acceptance is pending |
| [previews/](previews/) | MP3 listening copies for broad local player support |
| [art/](art/) | Editable SVG covers and the preserved original room PNG |
| [manifest.json](manifest.json) | Durations, source relationships, target levels and SHA-256 file fingerprints |
| [art-provenance.json](art-provenance.json) | Room image generation prompt and provenance |
| [fal-requests.json](fal-requests.json) | Prepared remote music requests and their actual blocked status |
| [validation.json](validation.json) | Measured decoding and level results from the read-only checker |

Music targets -22 LUFS and cues target -28 LUFS. LUFS is a measure of perceived loudness over time, not the user's hardware volume. The render caps true peaks at a proposed -3 dBFS ceiling. Verify delivered encodings separately because lossy compression can change peaks. The script applies gentle attack and ending fades. These pieces **are not certified seamless loops**. Use finished-track repeat or a tested crossfade in a future player.

The complete editable pack is larger than the proposed shipped media. A future package would include accepted runtime files and selected artwork, not FLAC masters, scores or preview duplicates. No application bundle declaration was added.

## Remote generation status

The connected fal service accepted model discovery. Its batch submission returned `balance_exhausted` before starting any of the four prepared Stable Audio jobs. **No fal audio was generated or downloaded.** The 12 present tracks come from the local renderer. The remaining remote prompts are prepared only; they were not submitted.

Remote generation is parked. The maintainer chose to reuse existing tools and media without recharging fal. Do not retry, poll billing or spend from a build script. Keep the prepared requests for a separately requested future production step. If that work is explicitly resumed after the account block is resolved, recheck readiness and preserve the known submission keys. Track later results separately. Remote generation would create different compositions; it is not a higher-quality rendering of these exact MIDI notes.

The [fal model page](https://fal.ai/models/fal-ai/stable-audio-25/text-to-audio), checked on 2026-11-15, carries a commercial-use label. That label alone does not complete a product-specific rights review or guarantee non-infringement. Retain the terms applicable to the actual generation date before shipping any later output. This pass does not change the project's MIT license or decide its future license.

## Illustration and cover sources

The built-in image generator created [Quiet Room](art/quiet-room.png) from the prompt in the provenance record. The original 1536 x 1024 PNG is preserved without repainting or cropping. It depicts a quiet writing desk, upright piano and garden window in Cadence's journal palette. It is decorative concept art, not a screenshot or a finished set of animated scene layers.

The 12 cover SVGs are code-native vector sources generated from the score titles and palette. Their text is English asset documentation, not application localization. The application should show localized track labels separately if selected later. Do not paint text into the scene to simulate working UI.

## Rebuild and inspect

Run from the repository root:

```sh
python tools/build_focus_pack.py
python tools/check_focus_pack.py --report assets/focus-pack/validation.json
python tools/build_artwork.py
python tools/check_artwork.py
node tools/check_repository.cjs
node tools/check_website.cjs
```

The builder requires Python with NumPy and SciPy plus FFmpeg with FLAC, Vorbis and MP3 encoders. These are local authoring tools, not application dependencies. No package was added to Flutter. The checker uses the Python standard library, FFmpeg and FFprobe. Existing score JSON is preserved by the builder; edit it to change notes. MIDI, covers, audio, the listening catalogue and manifest are derived outputs and are replaced when rebuilding. The room PNG is preserved.

The builder creates missing default scores, renders locally and never calls a network service. It uses temporary files only within a Python-created temporary directory. The manifest records the renderer fingerprint. Rebuild after changing sound generation. Keep any later accepted replacement recordings in a separately reviewed source route.

### Text files and clean checkouts

Repository preparation on 2026-11-15 found that the Windows builder can write CRLF line endings while Git stores these text files with LF. Both forms display the same text, but their byte counts and SHA-256 fingerprints differ. The prepared pack now uses LF, and its manifest matches those bytes. Audio, MIDI and image content did not change.

The generator's newline behavior remains unchanged. After a later Windows regeneration, normalize the pack's JSON, SVG, HTML and Markdown files to LF before calculating the final manifest byte counts and fingerprints. Then run the checker and confirm that the staged source/export bytes match the manifest. A passing working-copy check alone does not establish that a clean checkout will pass. Do not normalize binary media. This is an authoring limitation, not an application feature.

The catalogue uses local files, native audio controls and a small script that pauses the previous track. It makes no remote requests and does not autoplay. It is a local review page, not a second hosted site. Serve the repository locally if the browser restricts file playback.

## Review still needed

- Listen to every complete track on headphones and speakers. Check tone, pitch artifacts, phrase endings, fatigue, clicks and sudden level changes.
- Compare the four piano arrangements and the two guitar arrangements for useful variety. Reject a weak track rather than filling a numerical quota.
- Review the room image and every cover at the intended display sizes. Confirm keyboard and narrow-screen behavior of the listening page in a browser.
- Test the selected audio decoder, output-device changes, background playback and repeat transitions in the actual packaged app.
- Audition all 12 pieces for the first-release selection. The planned mixer, ambient loops and extra scenes are deferred; they are not present in this pack or required for first release.
- Complete distribution-rights and current Steam AI-content disclosure checks for the actual shipped content. The generated illustration and assisted music preparation must not be described as live performer recordings.

Automated checks establish file integrity, decoding and measured levels only. They do not replace any of these reviews or establish product release readiness.
