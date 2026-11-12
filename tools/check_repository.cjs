// Read-only repository checks. Node built-ins and Git only.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const files = [...new Set(execFileSync('git', [
  'ls-files', '--cached', '--others', '--exclude-standard', '-z',
], {cwd: root, encoding: 'utf8'}).split('\0').filter(Boolean))];
const errors = [];
const anchors = new Map();
let links = 0;
let fragments = 0;
let documents = 0;
// Explicit user-requested rehearsal translation; all links still get checked.
const translatedDocuments = new Set(['docs/QREC_PITCH.zh-CN.md']);

function withoutCode(body) {
  return body.replace(/^(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, '');
}

function anchorIds(file) {
  if (anchors.has(file)) return anchors.get(file);
  const body = withoutCode(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'));
  const ids = new Set([...body.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]));
  if (file.endsWith('.md')) {
    const used = new Set();
    for (const match of body.matchAll(/^#{1,6}\s+(.+?)(?:\s+#+)?\s*$/gm)) {
      // These documents use ATX headings. Match GitHub's plain heading slugs.
      const title = match[1].replace(/<[^>]*>/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      const base = title.toLowerCase().replace(/[^\p{L}\p{N}\p{M}_ -]/gu, '').replace(/ /g, '-');
      let slug = base;
      let suffix = 0;
      while (used.has(slug)) slug = base + '-' + (++suffix);
      used.add(slug);
      ids.add(slug);
    }
  }
  anchors.set(file, ids);
  return ids;
}

function checkLink(file, target) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target)) return;
  let local;
  let fragment;
  try {
    local = decodeURIComponent(target.split(/[?#]/)[0]);
    fragment = target.includes('#') ? decodeURIComponent(target.slice(target.indexOf('#') + 1)) : '';
  } catch {
    errors.push(file + ': invalid URL encoding in ' + target);
    return;
  }
  const source = path.join(root, file);
  const resolved = local ? path.resolve(path.dirname(source), local) : source;
  links += 1;
  if (!fs.existsSync(resolved)) {
    errors.push(file + ': missing ' + target);
    return;
  }
  if (fragment && /\.(md|html)$/.test(resolved) && fs.statSync(resolved).isFile()) {
    fragments += 1;
    if (!anchorIds(resolved).has(fragment)) errors.push(file + ': missing anchor ' + target);
  }
}

for (const file of files) {
  const full = path.join(root, file);
  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) continue;
  if (file.endsWith('.md') || file.endsWith('.html')) {
    const text = fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n');
    const body = file.endsWith('.md') ? withoutCode(text) : text;
    if (file.endsWith('.md')) {
      documents += 1;
      // This catches untranslated text, not English grammar or clarity.
      if (!translatedDocuments.has(file) && /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)) {
        errors.push(file + ': documentation must use plain English; keep product translations in product files');
      }
      for (const match of body.matchAll(/!?\[[^\]\n]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
        checkLink(file, match[1]);
      }
    }
    for (const match of body.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
      checkLink(file, match[1]);
    }
  }
  if (/^((?:website|assets)\/.*\.js|tools\/.*\.cjs)$/.test(file)) {
    try {
      execFileSync(process.execPath, ['--check', full], {stdio: 'pipe'});
    } catch (error) {
      errors.push(file + ': ' + (error.stderr?.toString() || error.message));
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Checked ' + documents + ' documentation files (with an explicit translation exception), ' + links +
    ' local links (' + fragments + ' anchors), and JavaScript syntax.');
}
