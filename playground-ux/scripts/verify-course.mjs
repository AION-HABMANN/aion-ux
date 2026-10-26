// Structure check for the AION UX project (UX-STANDARD 2.6). Plain Node, no dependencies.
// Run: npm run verify:course
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const problems = [];
const fail = (m) => problems.push(m);

// 1. course.ts lists days 1..16 once each
const course = readFileSync(join(root, 'data/course.ts'), 'utf8');
const nums = [...course.matchAll(/^\s*\{?\s*n:\s*(\d+),/gm)].map((m) => Number(m[1]));
for (let i = 1; i <= 16; i++) {
  const c = nums.filter((n) => n === i).length;
  if (c !== 1) fail(`data/course.ts: day ${i} appears ${c} times (expected 1)`);
}

// 2. every built day has its page (under app/day or a route group app/(x)/day); no day page for an unbuilt day
const built = [...course.matchAll(/n:\s*(\d+)[^]*?built:\s*(true|false)/g)]
  .filter((m) => m[2] === 'true')
  .map((m) => Number(m[1]));
const appDir = join(root, 'app');
const dayRoots = [join(appDir, 'day'), ...readdirSync(appDir).filter((g) => /^\(.+\)$/.test(g)).map((g) => join(appDir, g, 'day'))].filter(existsSync);
const present = new Set();
for (const dr of dayRoots) {
  for (const d of readdirSync(dr)) {
    if (/^\d+$/.test(d) && statSync(join(dr, d)).isDirectory()) present.add(Number(d));
  }
}
for (const n of built) {
  if (!present.has(n)) fail(`built day ${n}: no page folder app/**/day/${n}`);
  else if (!existsSync(join(root, `components/day${n}`)) && !existsSync(join(root, `public/day${n}`)) && !existsSync(join(root, `app`, `(course)`, `day`, String(n), 'page.tsx')))
    fail(`built day ${n}: no components/day${n} or public/day${n}`);
}
for (const n of present) {
  if (!built.includes(n)) fail(`app/**/day/${n} exists but data/course.ts does not mark day ${n} as built`);
}
// every generated-CSS day has its config and input
for (const f of readdirSync(join(root, 'tailwind'))) {
  const m = f.match(/^(day\d+)\.config\./);
  if (m && !existsSync(join(root, 'styles', m[1], 'globals.css'))) fail(`tailwind/${f}: styles/${m[1]}/globals.css is missing`);
}

// 3. layout rules: no src/ folder, static export on
if (existsSync(join(root, 'src'))) fail('src/ exists (UX-STANDARD 2.2: layout at the project root)');
const cfg = readFileSync(join(root, 'next.config.mjs'), 'utf8');
if (!/output:\s*["']export["']/.test(cfg)) fail('next.config.mjs: output "export" is missing');
if (!/trailingSlash:\s*true/.test(cfg)) fail('next.config.mjs: trailingSlash is not true');

// test tooling must not ship: the accessibility script is injected from node_modules, never served from public/
if (existsSync(join(root, 'public', '_axe.min.js'))) fail('public/_axe.min.js: remove it (axe is injected from node_modules during a check)');

// 4. public-repository hygiene (UX-STANDARD 2.4)
// The marker line of an instructor-only file, or an answer-key heading; documents that only mention the words are fine.
const banned = [/INSTRUCTOR ONLY\. Do not distribute/i, /^#\s*ANSWER[_ ]KEY/im];
function walk(dir) {
  for (const f of readdirSync(dir)) {
    if (['node_modules', '.next', 'out', '.git'].includes(f)) continue;
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(md|ts|tsx|json|txt)$/.test(f) && !p.endsWith('verify-course.mjs')) {
      const t = readFileSync(p, 'utf8');
      for (const re of banned) if (re.test(t)) fail(`${relative(root, p)}: contains ${re}`);
    }
    if (/^cv-|\.docx$/i.test(f) && /cv/i.test(f)) fail(`${relative(root, join(dir, f))}: looks like a personal document`);
  }
}
walk(root);
// The legacy copies of Days 10 to 16 sit next to the project, outside the build.
const legacyDir = join(root, '..', 'legacy');
if (existsSync(legacyDir)) walk(legacyDir);

if (problems.length) {
  console.error('verify:course FAILED');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log(`verify:course OK (${nums.length} days, built: ${built.join(', ') || 'none'})`);
