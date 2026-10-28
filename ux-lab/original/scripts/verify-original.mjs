// verify:original — the original Days 9 to 16 inside the Neuro-UX Lab. Plain Node, no dependencies.
// Checks that every original day has its page under /day/N/original/, its stylesheet source, that its links stay
// inside /day/N/original/, that the original code and the lab code do not import each other, and that the lab's
// course data points at exactly these days.
//   Run: npm run verify:original
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const orig = join(root, 'original');
const problems = [];
const fail = (m) => problems.push(m);

const files = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) files(p, out);
    else if (/\.(tsx?|jsx?|mjs)$/.test(f)) out.push(p);
  }
  return out;
};

// 1. every original day has its route group, root layout and page
const appDir = join(root, 'app');
const groups = readdirSync(appDir).filter((g) => /^\(original-[\d-]+\)$/.test(g));
const present = new Map();
for (const g of groups) {
  if (!existsSync(join(appDir, g, 'layout.tsx'))) fail(`app/${g}: no root layout.tsx`);
  const dayDir = join(appDir, g, 'day');
  for (const d of existsSync(dayDir) ? readdirSync(dayDir) : []) {
    if (!existsSync(join(dayDir, d, 'original', 'page.tsx'))) fail(`app/${g}/day/${d}: no original/page.tsx`);
    else present.set(Number(d), g);
  }
}
for (let n = 9; n <= 16; n++) if (!present.has(n)) fail(`day ${n}: no app/(original-*)/day/${n}/original/page.tsx`);
if (existsSync(join(appDir, 'layout.tsx'))) fail('app/layout.tsx exists: the lab and every original day have their own root layout in a route group');

// 2. every per-day Tailwind config has its stylesheet source; every root layout links a stylesheet that is built
const built = new Set();
for (const f of readdirSync(join(orig, 'tailwind'))) {
  const m = f.match(/^(day\d+)\.config\./);
  if (!m) continue;
  built.add(m[1]);
  if (!existsSync(join(orig, 'styles', m[1], 'globals.css'))) fail(`original/tailwind/${f}: original/styles/${m[1]}/globals.css is missing`);
}
for (const g of groups) {
  const src = readFileSync(join(appDir, g, 'layout.tsx'), 'utf8');
  const css = src.match(/\/css\/(day\d+)\.css/);
  if (!css) fail(`app/${g}/layout.tsx: links no /css/dayN.css`);
  else if (!built.has(css[1])) fail(`app/${g}/layout.tsx: /css/${css[1]}.css has no original/tailwind/${css[1]}.config`);
  if (/import\s+['"][^'"]+\.css['"]/.test(src)) fail(`app/${g}/layout.tsx: imports CSS through the lab's pipeline (use the per-day stylesheet)`);
}

// 3. the original code and the lab code stay apart
const origFiles = [...files(orig), ...groups.flatMap((g) => files(join(appDir, g)))];
for (const p of origFiles) {
  const t = readFileSync(p, 'utf8');
  const bad = t.match(/from ['"]@\/(?!original\/)[^'"]+['"]/);
  if (bad) fail(`${relative(root, p)}: imports lab code (${bad[0]})`);
  for (const m of t.matchAll(/['"`]\/day\/(\d+)(\/[^'"`]*)?['"`]/g)) {
    if (Number(m[1]) >= 9 && !(m[2] ?? '').startsWith('/original')) fail(`${relative(root, p)}: link ${m[0]} leaves the original day (use /day/${m[1]}/original/...)`);
  }
}
const labFiles = ['app/(lab)', 'components', 'data', 'lib', 'store'].flatMap((d) => files(join(root, d)));
for (const p of labFiles) {
  if (/from ['"]@\/original\//.test(readFileSync(p, 'utf8'))) fail(`${relative(root, p)}: the lab imports original code`);
}

// 4. the lab's course data names an original for exactly Days 9 to 16
const course = readFileSync(join(root, 'data', 'course.ts'), 'utf8');
const named = [...course.matchAll(/\n\s*(\d+):\s*\{\s*name:/g)].map((m) => Number(m[1]));
for (let n = 9; n <= 16; n++) if (!named.includes(n)) fail(`data/course.ts: ORIGINALS has no entry for day ${n}`);
for (const n of named) if (!present.has(n)) fail(`data/course.ts: ORIGINALS names day ${n}, which has no original page`);

// 5. public-repository hygiene (UX-STANDARD 2.4): the marker line of an instructor-only file or an answer-key heading
const banned = [/INSTRUCTOR ONLY\. Do not distribute/i, /^#\s*ANSWER[_ ]KEY/im];
for (const p of origFiles) {
  if (p.endsWith('verify-original.mjs')) continue;
  const t = readFileSync(p, 'utf8');
  for (const re of banned) if (re.test(t)) fail(`${relative(root, p)}: contains ${re}`);
}

if (problems.length) {
  console.error('verify:original FAILED');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log(`verify:original OK (original days ${[...present.keys()].sort((a, b) => a - b).join(', ')}; ${built.size} stylesheets; ${origFiles.length} files kept apart from the lab)`);
