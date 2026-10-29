// Photographs the pictures and labs of the Neuro-UX Lab for the Word documents (headless Edge over the DevTools protocol, Node 22).
// usage: node capture-figures.mjs <baseUrl> <outDir> [day ...]      e.g.  node capture-figures.mjs http://localhost:4400 ../_figures 1 2 3
// For each day, route 1 and route 2: every top-level <figure> inside a study card (article#mat-X), the case brief and each task block (section#block-N-N)
// becomes <outDir>/dN_<scope>_<k>.png; <outDir>/figures.json lists them with the label of the figure.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const [base, out, ...dayArgs] = process.argv.slice(2);
const days = dayArgs.length ? dayArgs.map(Number) : Array.from({ length: 16 }, (_, i) => i + 1);
mkdirSync(out, { recursive: true });
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const port = 9700 + Math.floor(Math.random() * 200);
const prof = `${process.env.TEMP}/cdp-docs-${port}`;
const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--window-size=1100,900', '--lang=en-US', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await sleep(250); }
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 900, deviceScaleFactor: 1.5, mobile: false });
await send('Emulation.setEmulatedMedia', { media: 'screen', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }] });

const LIST = `(() => {
  const res = [];
  const ONLY = ${JSON.stringify(process.env.ONLY || '')};
  const scopes = [...document.querySelectorAll('article[id^="mat-"], section#case-brief, section[id^="block-"]')];
  for (const s of scopes) {
    const isMat = s.id.startsWith('mat-');
    if (ONLY === 'task' && isMat) continue;
    const key = isMat ? s.id.slice(4) : s.id === 'case-brief' ? 'brief' : 'b' + s.id.slice(6).replace('-', '.');
    let k = 0;
    const sel = isMat ? 'figure' : '[id^="slot-"], figure';
    for (const f of s.querySelectorAll(sel)) {
      if (f.parentElement.closest(isMat ? 'figure' : '[id^="slot-"], figure')) continue;
      const r = f.getBoundingClientRect();
      if (r.height < 90 || r.width < 160) continue;
      f.setAttribute('data-cap', key + '_' + k);
      const inner = f.matches('figure') ? f : f.querySelector('figure');
      const label = (f.getAttribute('aria-label') || (inner && inner.getAttribute('aria-label')) || f.id.replace(/^slot-/, '').replace(/-/g, ' ')).slice(0, 220);
      res.push({ scope: key, k: k++, label });
    }
  }
  return res;
})()`;

const manifest = existsSync(path.join(out, 'figures.json')) ? JSON.parse(readFileSync(path.join(out, 'figures.json'), 'utf8')) : {};
for (const d of days) {
  manifest[d] = (process.env.ONLY === 'task' ? (manifest[d] || []).filter((x) => /^[AB]\d$/.test(x.scope)) : []);
  for (const route of [1, 2]) {
    await send('Page.navigate', { url: `${base}/day/${d}/route-${route}/` });
    await sleep(5500);
    // open every folded part so nothing hides a figure, then let the page settle
    await ev(`for (const b of document.querySelectorAll('[id^="slot-"] button[aria-expanded="false"]')) b.click(); 0`);
    await sleep(800);
    await ev(`for (const b of document.querySelectorAll('main button[aria-expanded="false"]')) { const t = b.innerText.trim(); if (t.startsWith('＋') || t.startsWith('Show')) b.click(); } 0`);
    await sleep(1200);
    // sticky bars would lie over the top of a picture: hide everything that is fixed or sticky while the figures are photographed
    await ev(`for (const e of document.querySelectorAll('body *')) { const p = getComputedStyle(e).position; if (p === 'fixed' || p === 'sticky') e.style.visibility = 'hidden'; } 0`);
    const list = await ev(LIST);
    for (const f of list || []) {
      await ev(`(() => { const e = document.querySelector('[data-cap="${f.scope}_${f.k}"]'); e.scrollIntoView({ block: 'start', behavior: 'instant' }); window.scrollBy({ top: -12, behavior: 'instant' }); return 1 })()`);
      await sleep(350);
      const r = await ev(`(() => { const e = document.querySelector('[data-cap="${f.scope}_${f.k}"]'); const b = e.getBoundingClientRect(); return { x: b.left + window.scrollX, y: b.top + window.scrollY, w: b.width, h: b.height } })()`);
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, 2600), scale: 1 } });
      const file = `d${d}_${f.scope.replace('.', '-')}_${f.k}.png`;
      writeFileSync(path.join(out, file), Buffer.from(shot.result.data, 'base64'));
      manifest[d].push({ file, scope: f.scope, k: f.k, label: f.label, route });
    }
    // slots that open in a dialog (the desk and the observe panels of Route 2): open, photograph the whole dialog, close
    const dlgs = await ev(`[...document.querySelectorAll('section[id^="block-"] [id^="slot-"]')].filter((e) => e.querySelector('button[aria-haspopup="dialog"]') && e.getBoundingClientRect().height < 150).map((e) => ({ id: e.id, scope: 'b' + e.closest('section').id.slice(6).replace('-', '.'), label: (e.querySelector('.font-semibold') || e).innerText.split(String.fromCharCode(10))[0].slice(0, 160) }))`);
    console.log("dialogs", JSON.stringify(dlgs));
    for (const g of dlgs || []) {
      await ev(`(() => { const b = document.querySelector('#${g.id} button[aria-haspopup="dialog"]'); b.scrollIntoView({ block: 'center', behavior: 'instant' }); b.click(); return 1 })()`);
      await sleep(1400);
      // one picture per mail (the desk) or per tab (the observe panels)
      const n = (await ev(`(() => { const d = document.querySelector('[role="dialog"]'); if (!d) return 0; let it = [...d.querySelectorAll('[role="tab"]')]; if (!it.length) it = [...d.querySelectorAll('button')].filter((b) => !/Reset|Close|Start again|Say it|Speak/.test(b.innerText)); window.__items = it.slice(0, 8); return window.__items.length })()`)) || 0;
      for (let q = 0; q < Math.max(n, 1); q++) {
        if (n) { await ev(`window.__items[${q}].click()`); await sleep(700); }
        const box = await ev(`(() => { const d = document.querySelector('[role="dialog"]'); if (!d) return null; const b = d.getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height } })()`);
        if (!box) break;
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        const kk = list.filter((z) => z.scope === g.scope).length + manifest[d].filter((z) => z.scope === g.scope && z.route === route).length;
        const file = `d${d}_${g.scope.replace('.', '-')}_${kk}.png`;
        writeFileSync(path.join(out, file), Buffer.from(shot.result.data, 'base64'));
        manifest[d].push({ file, scope: g.scope, k: kk, label: g.label + (n ? ` (${q + 1} of ${n})` : ''), route, crop: [box.x, box.y, box.w, box.h] });
      }
      await send('Page.navigate', { url: `${base}/day/${d}/route-${route}/` });
      await sleep(4500);
      await ev(`for (const b of document.querySelectorAll('main button[aria-expanded="false"]')) { const t = b.innerText.trim(); if (t.startsWith('＋') || t.startsWith('Show')) b.click(); } 0`);
      await sleep(600);
    }
    console.log('day', d, 'route', route, (list || []).length, 'figures');
  }
  writeFileSync(path.join(out, 'figures.json'), JSON.stringify(manifest, null, 1));
}
ws.close(); edge.kill();
