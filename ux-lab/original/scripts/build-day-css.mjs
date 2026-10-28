// Compiles one stylesheet per original day (Days 9 to 16 as they were built) from the day's own Tailwind config.
// Why: the days were built with different Tailwind themes that clash on a few names
// (ink, warn, muted, hairline, card, sans, mono ...). Until a day is upgraded into one
// shared theme, it keeps its own config and gets its own file, loaded only by its own
// root layout. Output: public/css/dayN.css (generated, git-ignored).
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../..', import.meta.url));
const orig = join(root, 'original');
const cli = join(root, 'node_modules', 'tailwindcss', 'lib', 'cli.js');
mkdirSync(join(root, 'public', 'css'), { recursive: true });

const configs = readdirSync(join(orig, 'tailwind')).filter((f) => /^day\d+\.config\.(ts|js|cjs|mjs)$/.test(f));
let failed = 0;
for (const cfg of configs) {
  const day = cfg.match(/^(day\d+)/)[1];
  const input = join(orig, 'styles', day, 'globals.css');
  if (!existsSync(input)) {
    console.error(`build:css ${day}: missing ${input}`);
    failed++;
    continue;
  }
  const out = join(root, 'public', 'css', `${day}.css`);
  const res = spawnSync(process.execPath, [cli, '-c', join(orig, 'tailwind', cfg), '-i', input, '-o', out, '--minify'], { cwd: root, stdio: 'pipe', encoding: 'utf8' });
  if (res.status !== 0) {
    console.error(`build:css ${day} FAILED\n${res.stderr || res.stdout}`);
    failed++;
  } else {
    console.log(`build:css ${day} ok`);
  }
}
if (failed) process.exit(1);
