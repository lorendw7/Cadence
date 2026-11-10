// Offline checks for Cadence's static website. Node built-ins only.
// This checks source contracts; browser layout and interaction still need review.
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const site = path.resolve(__dirname, '..', 'website');
const base = new URL('https://cadence.invalid/Cadence/');
const languages = ['ja', 'en', 'zh'];
const errors = [];
const pages = new Map();
let bindings = 0;
let resources = 0;
let scripts = 0;

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function listFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}

function relative(file) {
  return path.relative(site, file).split(path.sep).join('/');
}

function decodeEntities(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named = {'&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>'};
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    const hex = entity.toLowerCase().startsWith('&#x');
    const code = Number.parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '\ufffd';
  });
}

// The site uses ordinary HTML attributes and external scripts. This small reader
// deliberately does not attempt browser parsing or execute page behavior.
function readTags(html, file) {
  const tags = [];
  const source = html.replace(/<!--[\s\S]*?-->/g, '');
  const pattern = /<([a-z][\w:-]*)((?:[^"'<>]|"[^"]*"|'[^']*')*)>/gi;
  for (const match of source.matchAll(pattern)) {
    const attrs = Object.create(null);
    const attribute = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    for (const item of match[2].matchAll(attribute)) {
      const name = item[1].toLowerCase();
      if (Object.hasOwn(attrs, name)) fail(file, `duplicate ${name} attribute`);
      attrs[name] = decodeEntities(item[2] ?? item[3] ?? item[4] ?? '');
    }
    tags.push({name: match[1].toLowerCase(), attrs});
  }
  return tags;
}

function resolveLocal(file, value, asset = false) {
  let url;
  try {
    url = new URL(value, new URL(file, base));
  } catch {
    fail(file, `invalid URL ${value}`);
    return null;
  }
  if (url.origin !== base.origin) {
    if (asset) fail(file, `runtime asset must be local: ${value}`);
    else if (!['https:', 'http:', 'mailto:'].includes(url.protocol)) {
      fail(file, `unsupported link protocol: ${value}`);
    }
    return null;
  }
  if (!url.pathname.startsWith(base.pathname)) {
    fail(file, `local URL leaves the published website: ${value}`);
    return null;
  }
  let local;
  let fragment;
  try {
    local = decodeURIComponent(url.pathname.slice(base.pathname.length));
    fragment = decodeURIComponent(url.hash.slice(1));
  } catch {
    fail(file, `invalid URL encoding: ${value}`);
    return null;
  }
  const full = path.resolve(site, local);
  const within = path.relative(site, full);
  if (within.startsWith(`..${path.sep}`) || within === '..' || path.isAbsolute(within)) {
    fail(file, `local URL leaves the published website: ${value}`);
    return null;
  }
  const target = local.endsWith('/') || !local ? path.join(full, 'index.html') : full;
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    fail(file, `missing local resource ${value}`);
    return null;
  }
  resources += 1;
  return {file: relative(target), full: target, fragment};
}

function placeholderNames(text) {
  return (text.match(/\{[a-z][\w]*\}/gi) || []).sort().join(',');
}

const files = listFiles(site);
for (const file of files.filter((item) => item.endsWith('.js'))) {
  try {
    new vm.Script(fs.readFileSync(file, 'utf8'), {filename: relative(file)});
    scripts += 1;
  } catch (error) {
    fail(relative(file), `JavaScript syntax: ${error.message}`);
  }
}

const copyFile = path.join(site, 'assets', 'content.js');
let copy = {};
try {
  const assignment = fs.readFileSync(copyFile, 'utf8').match(/window\.CadenceCopy\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
  if (!assignment) throw new Error('expected a fixed window.CadenceCopy object');
  copy = JSON.parse(assignment[1]);
} catch (error) {
  fail('assets/content.js', `cannot read fixed translations: ${error.message}`);
}

if (Object.keys(copy).sort().join(',') !== [...languages].sort().join(',')) {
  fail('assets/content.js', 'expected exactly the ja, en and zh translation tables');
}
const expectedKeys = Object.keys(copy.ja || {}).sort();
for (const language of languages) {
  const table = copy[language];
  if (!table || typeof table !== 'object' || Array.isArray(table)) {
    fail('assets/content.js', `missing translation table ${language}`);
    continue;
  }
  for (const key of expectedKeys) {
    if (!Object.hasOwn(table, key)) fail('assets/content.js', `${language} is missing ${key}`);
  }
  for (const [key, value] of Object.entries(table)) {
    if (!expectedKeys.includes(key)) fail('assets/content.js', `${language} has extra key ${key}`);
    if (typeof value !== 'string' || !value.trim()) {
      fail('assets/content.js', `${language}.${key} must be a nonempty string`);
    } else if (typeof copy.ja?.[key] === 'string' && placeholderNames(value) !== placeholderNames(copy.ja[key])) {
      fail('assets/content.js', `${language}.${key} has different placeholders from Japanese`);
    }
  }
}

function checkKey(file, key) {
  for (const language of languages) {
    if (typeof copy[language]?.[key] !== 'string') fail(file, `unknown ${language} translation key ${key}`);
  }
}

for (const file of files.filter((item) => item.endsWith('.html'))) {
  const name = relative(file);
  const html = fs.readFileSync(file, 'utf8');
  const tags = readTags(html, name);
  const ids = new Map();
  for (const tag of tags) {
    if (Object.hasOwn(tag.attrs, 'id')) {
      const id = tag.attrs.id;
      if (!id || /\s/.test(id)) fail(name, `invalid id "${id}"`);
      if (ids.has(id)) fail(name, `duplicate id ${id}`);
      ids.set(id, tag);
    }
  }
  pages.set(name, {html, tags, ids});
}

for (const [file, page] of pages) {
  const body = page.tags.find((tag) => tag.name === 'body');
  const pageName = body?.attrs['data-page'];
  if (!pageName) fail(file, 'body needs a data-page value for metadata translations');
  for (const suffix of ['title', 'desc']) checkKey(file, `meta.${pageName}.${suffix}`);
  const title = page.html.match(/<title>([^<]*)<\/title>/i);
  if (!title || decodeEntities(title[1]) !== copy.ja?.[`meta.${pageName}.title`]) {
    fail(file, 'initial title must match the Japanese metadata translation');
  }
  for (const [attribute, value, suffix] of [
    ['name', 'description', 'desc'], ['property', 'og:title', 'title'], ['property', 'og:description', 'desc'],
  ]) {
    const matches = page.tags.filter((tag) => tag.name === 'meta' && tag.attrs[attribute] === value);
    if (matches.length !== 1 || matches[0].attrs.content !== copy.ja?.[`meta.${pageName}.${suffix}`]) {
      fail(file, `${value} metadata must occur once and match the Japanese translation`);
    }
  }
  const pageLanguages = page.tags.filter((tag) => 'data-set' in tag.attrs).map((tag) => tag.attrs['data-set']).sort();
  if (pageLanguages.join(',') !== [...languages].sort().join(',')) fail(file, 'language controls must cover ja, en and zh exactly once');

  const scriptTargets = [];
  for (const tag of page.tags) {
    const attrs = tag.attrs;
    for (const attribute of ['data-i18n', 'data-i18n-aria']) {
      if (attribute in attrs) {
        checkKey(file, attrs[attribute]);
        bindings += 1;
      }
    }
    for (const attribute of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
      if (!(attribute in attrs)) continue;
      const references = attrs[attribute].trim().split(/\s+/);
      for (const id of references) {
        if (!page.ids.has(id)) fail(file, `${attribute} refers to missing id ${id}`);
      }
    }
    if ('data-count' in attrs && (!/^\d+$/.test(attrs['data-count']) || !copy.ja?.[attrs['data-i18n']]?.includes('{count}'))) {
      fail(file, 'data-count needs an unsigned integer and a translated {count} placeholder');
    }
    if ('src' in attrs) {
      const target = resolveLocal(file, attrs.src, true);
      if (tag.name === 'script') {
        if (!('defer' in attrs)) fail(file, 'page scripts must use defer');
        if (target) scriptTargets.push(target.file);
      }
    } else if (tag.name === 'script') {
      fail(file, 'keep behavior in local external scripts, not inline HTML');
    }
    if ('href' in attrs) {
      const target = resolveLocal(file, attrs.href, tag.name === 'link' && ['stylesheet', 'icon', 'apple-touch-icon'].includes(attrs.rel));
      if (target?.fragment) {
        const targetPage = pages.get(target.file);
        if (targetPage && !targetPage.ids.has(target.fragment)) fail(file, `link ${attrs.href} refers to a missing HTML anchor`);
      }
    }
    if ('srcset' in attrs) {
      const descriptors = new Set();
      const kinds = new Set();
      for (const candidate of attrs.srcset.split(',')) {
        const parts = candidate.trim().split(/\s+/);
        const descriptor = parts[1] || '1x';
        if (parts.length > 2 || !/^(?:[1-9]\d*w|(?:\d+(?:\.\d+)?|\.\d+)x)$/.test(descriptor) || Number.parseFloat(descriptor) <= 0) {
          fail(file, `invalid srcset candidate ${candidate}`);
          continue;
        }
        if (descriptors.has(descriptor)) fail(file, `duplicate srcset descriptor ${descriptor}`);
        descriptors.add(descriptor);
        kinds.add(descriptor.slice(-1));
        resolveLocal(file, parts[0], true);
      }
      if (kinds.size > 1) fail(file, 'srcset must not mix width and density descriptors');
      if (kinds.has('w') && !attrs.sizes?.trim()) fail(file, 'width-based srcset needs sizes');
    }
    if (tag.name === 'img') {
      if (!('alt' in attrs)) fail(file, `image ${attrs.src} needs alt text or an explicit empty alt`);
      if (!/^[1-9]\d*$/.test(attrs.width || '') || !/^[1-9]\d*$/.test(attrs.height || '')) fail(file, `image ${attrs.src} needs positive width and height`);
    }
  }
  const contentIndex = scriptTargets.indexOf('assets/content.js');
  const languageIndex = scriptTargets.indexOf('assets/lang.js');
  if (contentIndex < 0 || languageIndex <= contentIndex) fail(file, 'load content.js before lang.js');
  const tabs = page.tags.filter((tag) => tag.attrs.role === 'tab');
  if (tabs.length) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => `preview.${day}`);
    const dayLabels = page.tags.filter((tag) => days.includes(tag.attrs['data-i18n'])).map((tag) => tag.attrs['data-i18n']);
    if (dayLabels.join(',') !== days.join(',')) fail(file, 'the week preview must include Monday through Sunday in order');
    for (const event of page.tags.filter((tag) => (tag.attrs.class || '').split(/\s+/).includes('week-event'))) {
      const day = event.attrs.style?.match(/(?:^|;)\s*--day\s*:\s*(\d+)\s*(?:;|$)/)?.[1];
      if (!day || Number(day) < 1 || Number(day) > 7) fail(file, 'week events need a day from 1 through 7');
    }
    if (scriptTargets.indexOf('assets/preview.js') <= languageIndex) fail(file, 'load preview.js after lang.js for the sample controls');
    if (!page.ids.has('reset-preview') || !page.ids.has('demo-status')) fail(file, 'preview needs reset-preview and demo-status elements');
    if (!page.tags.some((tag) => (tag.attrs.class || '').split(/\s+/).includes('preview-instruction'))) fail(file, 'preview needs its instruction element');
    if (tabs.filter((tag) => tag.attrs['aria-selected'] === 'true').length !== 1) fail(file, 'exactly one preview tab must start selected');
    const targets = new Set();
    for (const tab of tabs) {
      const target = tab.attrs['aria-controls'];
      const panel = page.ids.get(target);
      if (targets.has(target)) fail(file, `preview tabs share panel ${target}`);
      targets.add(target);
      if (panel?.attrs.role !== 'tabpanel' || panel.attrs['aria-labelledby'] !== tab.attrs.id) fail(file, `tab ${tab.attrs.id} needs a panel labelled by that tab`);
      const selected = tab.attrs['aria-selected'] === 'true';
      if (panel && ('hidden' in panel.attrs) === selected) fail(file, `panel ${target} visibility does not match tab selection`);
      if (selected ? (tab.attrs.tabindex !== undefined && tab.attrs.tabindex !== '0') : tab.attrs.tabindex !== '-1') fail(file, `tab ${tab.attrs.id} has the wrong initial tab stop`);
    }
    const tasks = page.tags.filter((tag) => 'data-demo-task' in tag.attrs);
    const remaining = tasks.filter((tag) => !('checked' in tag.attrs)).length;
    for (const counter of page.tags.filter((tag) => 'data-count' in tag.attrs)) {
      if (Number(counter.attrs['data-count']) !== remaining) fail(file, 'initial task count differs from sample checkboxes');
    }
  }
}

// These keys are selected at runtime rather than bound in the HTML.
for (const file of files.filter((item) => item.endsWith('.js') && item !== copyFile)) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/["'](preview\.[\w.]+)["']/g)) checkKey(relative(file), match[1]);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Website checks passed: ${pages.size} pages, ${languages.length} languages, ${expectedKeys.length} keys per language, ${bindings} bindings, ${resources} local references and ${scripts} scripts.`);
}
