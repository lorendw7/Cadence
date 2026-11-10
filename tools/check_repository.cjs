// Read-only repository checks; Node built-ins only. Run from any directory.
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const files = [...new Set(execFileSync('git', [
  'ls-files', '--cached', '--others', '--exclude-standard', '-z',
], {cwd: root, encoding: 'utf8'}).split('\0').filter(Boolean))];
const errors = [];
let links = 0;
function checkLink(file, target) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) return;
  const local = decodeURIComponent(target.split(/[?#]/)[0]);
  if (!local) return;
  links += 1;
  const resolved = path.resolve(path.dirname(path.join(root, file)), local);
  if (!fs.existsSync(resolved)) errors.push(`${file}: missing ${target}`);
}
for (const file of files) {
  if (!fs.existsSync(path.join(root, file))) continue;
  if (file.endsWith('.md')) {
    const body = fs.readFileSync(path.join(root, file), 'utf8')
      .replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
    for (const match of body.matchAll(/!?\[[^\]\n]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
      checkLink(file, match[1]);
    }
  } else if (file.endsWith('.html')) {
    const body = fs.readFileSync(path.join(root, file), 'utf8');
    for (const match of body.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
      checkLink(file, match[1]);
    }
  }
  if (/^(website\/.*\.js|tools\/.*\.cjs)$/.test(file)) {
    try {
      execFileSync(process.execPath, ['--check', path.join(root, file)], {stdio: 'pipe'});
    } catch (error) {
      errors.push(`${file}: ${error.stderr?.toString() || error.message}`);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${links} local Markdown/HTML file links and JavaScript syntax.`);
}
