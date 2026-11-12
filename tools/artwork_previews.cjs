/* Contact sheets made from the current artwork, without changing any master. */
'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const {createHash} = require('node:crypto');
const sharp = require('sharp');

const WIDTH = 1440;
const PAPER = '#F6F5F1';
const INK = '#2F3033';
const WINE = '#7C394B';
const RULE = '#DDDCD5';
const escape = value => String(value).replace(/[&<>\"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;'}[c]));

function sheet() {
  const shapes = [];
  const images = [];
  function text(x, y, value, size = 16, color = INK, family = 'Arial, sans-serif', extra = '') {
    shapes.push(`<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" fill="${color}" ${extra}>${escape(value)}</text>`);
  }
  function rule(y) {
    shapes.push(`<path d="M64 ${y}H1376" stroke="${RULE}"/>`);
  }
  function rect(x, y, width, height, color = '#FDFCF9', radius = 6) {
    shapes.push(`<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${color}" stroke="${RULE}"/>`);
  }
  function heading(y, label, detail) {
    text(64, y, label, 28, INK, 'Georgia, serif');
    text(64, y + 28, detail, 15, '#666761');
  }
  function image(file, x, y, width, height, options = {}) {
    images.push({file, x, y, width, height, ...options});
  }
  function card(file, x, y, width, height, label, options = {}) {
    rect(x, y, width, height, options.inverse ? INK : '#FDFCF9');
    const sampleHeight = height - 46;
    image(file, x + 18, y + 16, width - 36, sampleHeight - 26, options);
    text(x + 14, y + height - 17, label, 13, options.inverse ? PAPER : INK);
  }
  async function render(destination, height) {
    const base = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${height}"><rect width="100%" height="100%" fill="${PAPER}"/>${shapes.join('')}</svg>`);
    const overlays = await Promise.all(images.map(async item => {
      let input;
      if (item.tile) {
        const tile = await sharp(item.file).png().toBuffer();
        input = await sharp({create: {width: item.width, height: item.height, channels: 4, background: '#FDFCF9'}})
          .composite([{input: tile, tile: true}]).png().toBuffer();
      } else {
        let source = item.file;
        if (['cadence-icon.svg', 'cadence-mark.svg'].includes(path.basename(item.file))) {
          // librsvg does not scale the retained originals' dash lengths with
          // pathLength. Convert those known circle dashes for this preview only.
          // Keep both historical SVG files unchanged.
          const original = await fs.readFile(item.file, 'utf8');
          const circumference = 2 * Math.PI * 136;
          source = Buffer.from(original.replace(/pathLength="100"\s+stroke-dasharray="75 25"/,
            `stroke-dasharray="${circumference * .75} ${circumference * .25}"`));
        }
        input = await sharp(source, {density: item.nativeSize ? 72 : 144})
          .resize(item.width, item.height, {fit: 'contain', background: '#00000000', withoutEnlargement: Boolean(item.nativeSize)})
          .png().toBuffer();
      }
      return {input, left: item.x, top: item.y};
    }));
    await sharp(base).composite(overlays).png().toFile(destination);
  }
  return {text, rule, rect, heading, image, card, render, sources: images};
}

async function files(root, folder, suffix) {
  return (await fs.readdir(path.join(root, 'assets', folder)))
    .filter(name => name.endsWith(suffix))
    .sort((a, b) => a.localeCompare(b, 'en', {numeric: true}));
}

async function previewArtwork(root) {
  const asset = (...parts) => path.join(root, 'assets', ...parts);
  const icons = (await files(root, 'icons', '.svg')).filter(name => name !== 'sprite.svg');
  const states = await files(root, 'illustrations', '.svg');
  const stateOrder = ['empty-tasks-compact', 'empty-today', 'empty-week', 'empty-tasks', 'all-done', 'no-results', 'import-preview', 'save-error', 'restore-backup', 'no-review', 'no-courses'];
  const orderedStates = [...states].sort((a, b) => stateOrder.indexOf(a.slice(0, -4)) - stateOrder.indexOf(b.slice(0, -4)));
  const compact = sheet();
  compact.text(64, 65, 'CADENCE / ARTWORK LIBRARY / 02', 12, WINE, 'Arial, sans-serif', 'letter-spacing="3"');
  compact.text(64, 127, 'A little structure. A little space.', 46, INK, 'Georgia, serif');
  compact.image(asset('brand', 'cadence-lockup.svg'), 1090, 67, 280, 64);
  compact.rule(168);
  compact.text(64, 212, 'WORK, STUDY AND EVERYDAY LIFE', 12, WINE, 'Arial, sans-serif', 'letter-spacing="2"');
  compact.text(64, 249, 'An independent identity for a quiet local planner.', 17);
  compact.text(64, 278, 'Prepared artwork. Product features remain in development.', 15, '#666761');
  [WINE, PAPER, '#6F877C', INK, RULE].forEach((color, i) => compact.rect(64 + i * 72, 310, 60, 26, color, 2));
  ['today', 'week', 'tasks', 'work', 'personal', 'study', 'meeting', 'clock', 'add', 'edit', 'search', 'import', 'export', 'settings', 'warning', 'success'].forEach((name, i) => {
    const x = 64 + (i % 8) * 80;
    const y = 366 + Math.floor(i / 8) * 74;
    compact.rect(x, y, 64, 58);
    compact.image(asset('icons', `${name}.svg`), x + 20, y + 17, 24, 24);
  });
  compact.text(64, 542, `${icons.length} interface icons / 24 px grid / 1.75 px strokes`, 15, '#666761');
  compact.image(asset('illustrations', 'journal-editorial.png'), 826, 202, 550, 367);
  compact.text(64, 602, 'STATES / QUIET GUIDANCE', 12, WINE, 'Arial, sans-serif', 'letter-spacing="3"');
  orderedStates.forEach((name, i) => compact.card(asset('illustrations', name), 64 + (i % 6) * 222, 628 + Math.floor(i / 6) * 190, 202, 174, name.slice(0, -4), {nativeSize: name === 'empty-tasks-compact.svg'}));
  const statesBottom = 628 + Math.ceil(orderedStates.length / 6) * 190;
  compact.rule(statesBottom + 14);
  compact.text(64, statesBottom + 52, 'SVG sources / PNG, ICO, ICNS and WebP exports / Generated from the current library', 14, '#666761');
  compact.text(64, statesBottom + 79, 'Project-owned vectors under MIT. Editorial image provenance: assets/ART_PROMPTS.md.', 13, '#666761');
  await compact.render(asset('preview.png'), statesBottom + 112);

  const library = sheet();
  library.text(64, 65, 'CADENCE / ARTWORK LIBRARY / 02', 12, WINE, 'Arial, sans-serif', 'letter-spacing="3"');
  library.text(64, 126, 'The visual library.', 54, INK, 'Georgia, serif');
  library.text(64, 166, 'Current sources, delivery sizes and retained originals. Browse assets/catalog.html for usage and downloads.', 17, '#666761');
  library.text(64, 195, 'Artwork readiness does not mean a product feature is implemented.', 16, '#666761');
  library.rule(229);
  let y = 284;
  const drawSection = (title, detail, entries, columns, height, optionsFor = () => ({})) => {
    library.heading(y, title, detail);
    const gap = 18;
    const width = Math.floor((1312 - gap * (columns - 1)) / columns);
    const start = y + 51;
    entries.forEach((entry, i) => library.card(entry.file, 64 + (i % columns) * (width + gap), start + Math.floor(i / columns) * (height + gap), width, height, entry.label, optionsFor(entry)));
    y = start + Math.ceil(entries.length / columns) * (height + gap) + 47;
  };
  const brandFiles = await files(root, 'brand', '.svg');
  const originals = new Set(['cadence-icon.svg', 'cadence-mark.svg']);
  const toEntries = (folder, names) => names.map(name => ({file: asset(folder, name), name, label: name.replace(/\.(svg|png)$/, '')}));
  drawSection('Brand', 'Use the C mark and its rhythm dot together. Paper marks need a dark surface.', toEntries('brand', brandFiles.filter(name => !originals.has(name))), 4, 212, entry => ({inverse: entry.name.includes('paper') && !entry.name.includes('icon')}));
  drawSection('Interface icons', `${icons.length} symbols at 24 px. Controls still need text labels and generous hit areas.`, toEntries('icons', icons), 8, 116, () => ({nativeSize: true}));
  drawSection('Empty states and feedback', 'Decorative illustrations accompany a plain explanation and a relevant next action.', toEntries('illustrations', orderedStates), 5, 205, entry => ({nativeSize: entry.name === 'empty-tasks-compact.svg'}));
  drawSection('Paper patterns', 'Repeated 32 px tiles. Keep text, forms and timelines on plain surfaces.', toEntries('patterns', await files(root, 'patterns', '.svg')), 3, 180, () => ({tile: true}));
  drawSection('Editorial artwork and sharing', 'The editorial master is preserved. The sharing card identifies the project as in development.', [
    {file: asset('illustrations', 'journal-editorial.png'), label: 'journal-editorial / original PNG'},
    {file: asset('social', 'social-card.svg'), label: 'social-card / editable SVG'},
  ], 2, 300);
  drawSection('Platform exports', 'Ordered by pixel size. Smaller images appear at their native size; large ones fit the sample.', toEntries('platform/png', await files(root, 'platform/png', '.png')), 6, 190, () => ({nativeSize: true}));
  drawSection('Retained originals', 'Historical project identity. Use the current brand variants above for new work.', toEntries('brand', brandFiles.filter(name => originals.has(name))), 4, 190);
  library.rule(y - 13);
  library.text(64, y + 22, 'Project-owned vectors / MIT project license / Editorial provenance in assets/ART_PROMPTS.md', 14, '#666761');
  library.text(64, y + 49, 'Generated from current sources. For usage, search and download links, open assets/catalog.html.', 14, '#666761');
  await library.render(asset('preview-library.png'), y + 82);

  // Preserve a receipt so the checker can detect stale source files or sheets.
  // The SVG builder preserves this receipt; only a successful export replaces it.
  const relative = file => path.relative(root, file).split(path.sep).join('/');
  const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
  const inputs = [...new Set([
    'tools/artwork_previews.cjs', 'tools/export_artwork.cjs',
    ...compact.sources.map(item => relative(item.file)),
    ...library.sources.map(item => relative(item.file)),
  ])].sort();
  const receipt = {
    inputs: await Promise.all(inputs.map(async file => ({path: file, sha256: sha256(await fs.readFile(path.join(root, file)))}))),
    files: await Promise.all(['assets/preview.png', 'assets/preview-library.png'].map(async file => {
      const data = await fs.readFile(path.join(root, file));
      const {width, height} = await sharp(data).metadata();
      return {path: file, width, height, bytes: data.length, sha256: sha256(data)};
    })),
  };
  const manifestPath = asset('manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  manifest.previews = receipt;
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
}

module.exports = {previewArtwork};
