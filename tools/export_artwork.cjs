/* Export project artwork. Requires sharp; preserves every editable master. */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
async function png(source, destination, size) {
  await fs.mkdir(path.dirname(destination), {recursive: true});
  await sharp(source, {density: 192}).resize(size, size).png().toFile(destination);
}
async function editorial() {
  const source = path.join(root, 'assets/illustrations/journal-editorial.png');
  // Keep the full composition and source pixels; these are delivery derivatives.
  for (const width of [480, 960, 1536]) {
    await sharp(source).resize({width, withoutEnlargement: true})
      .webp({quality: 82, effort: 6})
      .toFile(path.join(root, `website/assets/journal-editorial-${width}.webp`));
  }
  await fs.copyFile(source, path.join(root, 'website/assets/journal-editorial.png'));
}
async function main() {
  if (process.argv.includes('--editorial-only')) {
    await editorial();
    console.log('Exported responsive WebP artwork and synchronized the PNG fallback.');
    return;
  }
  const source = path.join(root, 'assets/brand/cadence-icon-v2.svg');
  for (const size of [16, 24, 32, 48, 64, 128, 180, 192, 256, 512, 1024]) {
    await png(source, path.join(root, `assets/platform/png/cadence-${size}.png`), size);
  }
  // ICO directory contains PNG payloads supported by modern Windows.
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const frames = await Promise.all(sizes.map(s => fs.readFile(path.join(root, `assets/platform/png/cadence-${s}.png`))));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((s, i) => {
    const p = 6 + 16 * i;
    header[p] = header[p + 1] = s === 256 ? 0 : s;
    header.writeUInt16LE(1, p + 4); header.writeUInt16LE(32, p + 6);
    header.writeUInt32LE(frames[i].length, p + 8); header.writeUInt32LE(offset, p + 12);
    offset += frames[i].length;
  });
  const ico = Buffer.concat([header, ...frames]);
  await fs.writeFile(path.join(root, 'assets/platform/cadence.ico'), ico);
  await fs.writeFile(path.join(root, 'windows/runner/resources/cadence-v2.ico'), ico);
  const macDir = path.join(root, 'macos/Runner/Assets.xcassets/AppIcon.appiconset');
  const contents = JSON.parse(await fs.readFile(path.join(macDir, 'Contents.json'), 'utf8'));
  for (const image of contents.images) {
    const size = Number(image.size.split('x')[0]) * Number(image.scale[0]);
    image.filename = `cadence_v2_${size}.png`;
    await fs.copyFile(path.join(root, `assets/platform/png/cadence-${size}.png`), path.join(macDir, image.filename));
  }
  await fs.writeFile(path.join(macDir, 'Contents.json'), JSON.stringify(contents, null, 2) + '\n');
  // An ICNS is also supplied for packaging outside Xcode.
  const chunks = [];
  for (const [type, size] of [['ic07',128], ['ic08',256], ['ic09',512], ['ic10',1024]]) {
    const bytes = await fs.readFile(path.join(root, `assets/platform/png/cadence-${size}.png`));
    const prefix = Buffer.alloc(8); prefix.write(type); prefix.writeUInt32BE(bytes.length + 8, 4);
    chunks.push(prefix, bytes);
  }
  const icnsHeader = Buffer.alloc(8); icnsHeader.write('icns');
  icnsHeader.writeUInt32BE(8 + chunks.reduce((n,b) => n + b.length, 0), 4);
  await fs.writeFile(path.join(root, 'assets/platform/cadence.icns'), Buffer.concat([icnsHeader, ...chunks]));
  for (const [size, name] of [[32,'favicon-32.png'], [180,'apple-touch-icon.png']]) {
    await fs.copyFile(path.join(root, `assets/platform/png/cadence-${size}.png`), path.join(root, `website/assets/${name}`));
  }
  await fs.writeFile(path.join(root, 'website/assets/favicon.ico'), ico);
  await fs.copyFile(source, path.join(root, 'website/assets/icon-v2.svg'));
  await fs.mkdir(path.join(root, 'website/assets/icons'), {recursive: true});
  for (const name of ['today','week','tasks','arrow-up-right','chevron-down']) {
    await fs.copyFile(path.join(root, `assets/icons/${name}.svg`), path.join(root, `website/assets/icons/${name}.svg`));
  }
  await sharp(path.join(root, 'assets/social/social-card.svg')).png().toFile(path.join(root, 'assets/social/social-card.png'));
  await fs.copyFile(path.join(root, 'assets/social/social-card.png'), path.join(root, 'website/assets/social-card.png'));
  await editorial();
  console.log('Exported PNG, WebP, ICO, ICNS, macOS icon set and website assets.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
