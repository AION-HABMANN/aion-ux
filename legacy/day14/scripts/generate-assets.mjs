// Generates every bundled 3D model and every static fallback image.
//
// Run by `npm run build` before `next build`. The output is deterministic, so
// the committed assets in /public are reproducible and byte-identical for every
// learner — nothing is fetched from a CDN at build time or at runtime.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { box, cylinder, writeGlb } from './glb.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modelsDir = resolve(root, 'public/models');
const fallbackDir = resolve(root, 'public/fallback');
mkdirSync(modelsDir, { recursive: true });
mkdirSync(fallbackDir, { recursive: true });

const STEEL = [0.72, 0.73, 0.76, 1];
const STEEL_DARK = [0.42, 0.44, 0.48, 1];
const CASING = [0.86, 0.87, 0.89, 1];
const RUBBER = [0.24, 0.25, 0.28, 1];
const SCREEN = [0.14, 0.1, 0.27, 1];
const HANDLE = [0.55, 0.57, 0.6, 1];

/* ------------------------------------------------------------------ *
 * Learn widget 2 — generic industrial bench machine.
 * Deliberately a LOW, WIDE gantry silhouette so it cannot be mistaken
 * for the tall upright BuildVision case device.
 * ------------------------------------------------------------------ */
const industrialMachine = [
  box({ size: [1.7, 0.45, 0.85], position: [0, 0.225, 0], color: STEEL_DARK, roughness: 0.85 }),
  box({ size: [1.55, 0.62, 0.75], position: [0, 0.79, 0], color: CASING, roughness: 0.6 }),
  box({ size: [1.5, 0.05, 0.7], position: [0, 1.12, 0], color: STEEL, metallic: 0.5, roughness: 0.35 }),
  cylinder({ radius: 0.05, height: 1.5, position: [0, 1.42, -0.12], axis: 'x', color: STEEL, metallic: 0.6, roughness: 0.3 }),
  box({ size: [0.26, 0.34, 0.34], position: [0.22, 1.3, 0.02], color: STEEL_DARK, metallic: 0.4, roughness: 0.4 }),
  cylinder({ radius: 0.035, height: 0.22, position: [0.22, 1.06, 0.02], color: HANDLE, metallic: 0.6, roughness: 0.25 }),
  box({ size: [0.5, 0.34, 0.07], position: [-0.55, 1.0, 0.38], color: STEEL_DARK, roughness: 0.5 }),
  box({ size: [0.38, 0.22, 0.02], position: [-0.55, 1.03, 0.42], color: SCREEN, metallic: 0.2, roughness: 0.3 }),
  cylinder({ radius: 0.05, height: 0.07, position: [0.55, 0.9, 0.38], axis: 'z', color: HANDLE, metallic: 0.5, roughness: 0.3 }),
  cylinder({ radius: 0.05, height: 0.07, position: [0.55, 0.68, 0.38], axis: 'z', color: HANDLE, metallic: 0.5, roughness: 0.3 }),
  box({ size: [0.5, 0.26, 0.03], position: [0.2, 0.28, 0.43], color: RUBBER, roughness: 0.9 }),
];

/* ------------------------------------------------------------------ *
 * BuildVision case — generic service / maintenance device.
 * A TALL UPRIGHT cabinet: different silhouette, different feature set.
 * ------------------------------------------------------------------ */
const serviceDevice = [
  box({ size: [0.78, 0.09, 0.6], position: [0, 0.045, 0], color: RUBBER, roughness: 0.95 }),
  box({ size: [0.7, 1.55, 0.52], position: [0, 0.87, 0], color: CASING, roughness: 0.6 }),
  box({ size: [0.66, 0.08, 0.5], position: [0, 1.68, 0], color: STEEL_DARK, roughness: 0.7 }),
  box({ size: [0.52, 0.44, 0.05], position: [0, 0.74, 0.27], color: STEEL, metallic: 0.35, roughness: 0.45 }),
  cylinder({ radius: 0.03, height: 0.06, position: [0.2, 0.74, 0.31], axis: 'z', color: HANDLE, metallic: 0.6, roughness: 0.25 }),
  box({ size: [0.34, 0.22, 0.05], position: [0, 1.42, 0.27], color: STEEL_DARK, roughness: 0.5 }),
  box({ size: [0.27, 0.15, 0.02], position: [0, 1.42, 0.31], color: SCREEN, metallic: 0.2, roughness: 0.3 }),
  cylinder({ radius: 0.075, height: 0.09, position: [-0.19, 0.34, 0.29], axis: 'z', color: HANDLE, metallic: 0.55, roughness: 0.3 }),
  cylinder({ radius: 0.075, height: 0.09, position: [0.19, 0.34, 0.29], axis: 'z', color: HANDLE, metallic: 0.55, roughness: 0.3 }),
  cylinder({ radius: 0.045, height: 1.0, position: [0.44, 0.85, -0.05], color: STEEL, metallic: 0.6, roughness: 0.3 }),
  box({ size: [0.1, 0.12, 0.12], position: [0.44, 1.3, -0.05], color: STEEL_DARK, roughness: 0.5 }),
  box({ size: [0.6, 0.3, 0.02], position: [0, 1.15, 0.27], color: STEEL_DARK, roughness: 0.8 }),
];

/* ------------------------------------------------------------------ *
 * Training Ground — a small retail counter appliance (practice only).
 * ------------------------------------------------------------------ */
const retailProduct = [
  box({ size: [0.46, 0.07, 0.38], position: [0, 0.035, 0], color: RUBBER, roughness: 0.95 }),
  box({ size: [0.38, 0.52, 0.32], position: [0, 0.33, 0], color: CASING, roughness: 0.5 }),
  box({ size: [0.4, 0.07, 0.34], position: [0, 0.62, 0], color: STEEL_DARK, roughness: 0.6 }),
  box({ size: [0.2, 0.12, 0.02], position: [0, 0.46, 0.17], color: SCREEN, metallic: 0.2, roughness: 0.3 }),
  cylinder({ radius: 0.035, height: 0.14, position: [0, 0.2, 0.14], color: STEEL, metallic: 0.6, roughness: 0.25 }),
  cylinder({ radius: 0.045, height: 0.05, position: [0.13, 0.3, 0.17], axis: 'z', color: HANDLE, metallic: 0.5, roughness: 0.3 }),
];

const models = [
  ['industrial-machine.glb', industrialMachine],
  ['service-device.glb', serviceDevice],
  ['retail-product.glb', retailProduct],
];

for (const [name, parts] of models) {
  const buf = writeGlb(parts);
  writeFileSync(resolve(modelsDir, name), buf);
  console.log(`models/${name} — ${(buf.length / 1024).toFixed(1)} kB`);
}

/* ------------------------------------------------------------------ *
 * Static fallbacks. Rendered when WebGL is unavailable. Content parity
 * with the 3D versions is required, so the hotspot geometry of the
 * IndustryXR image matches the four stations of the Three.js scene.
 * ------------------------------------------------------------------ */

const svgHeader = (w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">`;

const industryXrScene = `${svgHeader(960, 540)}
<title>Static view of the industrial training space</title>
<defs>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#DEDCE6"/><stop offset="100%" stop-color="#BFBACF"/>
  </linearGradient>
  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#F4F2FA"/><stop offset="100%" stop-color="#E3DFF0"/>
  </linearGradient>
</defs>
<rect width="960" height="540" fill="#F7F6FB"/>
<rect x="0" y="0" width="960" height="270" fill="url(#wall)"/>
<polygon points="0,270 960,270 960,540 0,540" fill="url(#floor)"/>
<g stroke="#C9C4DA" stroke-width="2">
  <line x1="0" y1="330" x2="960" y2="330"/><line x1="0" y1="400" x2="960" y2="400"/>
  <line x1="0" y1="480" x2="960" y2="480"/>
  <line x1="200" y1="270" x2="120" y2="540"/><line x1="480" y1="270" x2="480" y2="540"/>
  <line x1="760" y1="270" x2="840" y2="540"/>
</g>
<g stroke="#D3CEE2" stroke-width="3" fill="none">
  <line x1="0" y1="120" x2="960" y2="120"/>
  <rect x="60" y="40" width="120" height="60" rx="6"/>
  <rect x="780" y="40" width="120" height="60" rx="6"/>
</g>

<!-- Station 1: AR instruction station (left) -->
<g>
  <rect x="90" y="300" width="180" height="26" rx="4" fill="#8E88A6"/>
  <rect x="104" y="326" width="18" height="80" fill="#7C7695"/>
  <rect x="238" y="326" width="18" height="80" fill="#7C7695"/>
  <rect x="118" y="252" width="124" height="50" rx="6" fill="#5B5473"/>
  <rect x="130" y="262" width="100" height="30" rx="3" fill="#231A45"/>
  <rect x="150" y="286" width="60" height="14" rx="3" fill="#9E97B6"/>
</g>

<!-- Station 2: VR training station (centre-left) -->
<g>
  <rect x="350" y="300" width="150" height="120" rx="8" fill="#B4AECA" opacity="0.5"/>
  <rect x="366" y="330" width="118" height="18" rx="4" fill="#8E88A6"/>
  <circle cx="425" cy="288" r="26" fill="#5B5473"/>
  <rect x="399" y="280" width="52" height="20" rx="8" fill="#231A45"/>
  <rect x="386" y="368" width="78" height="12" rx="4" fill="#7C7695"/>
</g>

<!-- Station 3: Remote support corner (centre-right) -->
<g>
  <rect x="570" y="286" width="150" height="96" rx="8" fill="#8E88A6"/>
  <rect x="584" y="298" width="122" height="62" rx="4" fill="#231A45"/>
  <circle cx="645" cy="329" r="18" fill="#5B5473"/>
  <rect x="620" y="382" width="50" height="34" fill="#7C7695"/>
  <rect x="588" y="416" width="114" height="12" rx="4" fill="#6E6888"/>
</g>

<!-- Station 4: Not-yet-integrated legacy area (right) -->
<g>
  <rect x="780" y="300" width="130" height="110" rx="4" fill="#A49DBC"/>
  <rect x="794" y="316" width="102" height="26" rx="3" fill="#CFCADD"/>
  <rect x="794" y="352" width="102" height="26" rx="3" fill="#CFCADD"/>
  <rect x="794" y="388" width="102" height="14" rx="3" fill="#CFCADD"/>
  <rect x="800" y="252" width="90" height="46" rx="4" fill="#8E88A6"/>
</g>
</svg>
`;

const objectFallback = (title, body) => `${svgHeader(720, 480)}
<title>${title}</title>
<rect width="720" height="480" fill="#F7F6FB"/>
<ellipse cx="360" cy="404" rx="196" ry="26" fill="#DEDAEB"/>
${body}
</svg>
`;

const machineFallback = objectFallback(
  'Static view of the generic industrial machine',
  `<g>
  <rect x="190" y="330" width="340" height="70" rx="6" fill="#6B6584"/>
  <rect x="200" y="248" width="320" height="86" rx="8" fill="#D3D0DA"/>
  <rect x="196" y="238" width="328" height="14" rx="4" fill="#A8A5B4"/>
  <rect x="212" y="150" width="296" height="12" rx="6" fill="#A8A5B4"/>
  <rect x="386" y="162" width="60" height="70" rx="6" fill="#6B6584"/>
  <rect x="410" y="232" width="12" height="30" fill="#8D8A9B"/>
  <rect x="212" y="262" width="96" height="60" rx="6" fill="#5B5473"/>
  <rect x="224" y="272" width="72" height="40" rx="3" fill="#231A45"/>
  <circle cx="470" cy="278" r="12" fill="#8D8A9B"/>
  <circle cx="470" cy="312" r="12" fill="#8D8A9B"/>
  <rect x="330" y="352" width="110" height="26" rx="4" fill="#3D3A45"/>
</g>`,
);

const deviceFallback = objectFallback(
  'Static view of the generic service and maintenance device',
  `<g>
  <rect x="256" y="384" width="208" height="20" rx="4" fill="#3D3A45"/>
  <rect x="266" y="120" width="188" height="264" rx="8" fill="#D3D0DA"/>
  <rect x="262" y="102" width="196" height="20" rx="5" fill="#6B6584"/>
  <rect x="300" y="136" width="120" height="44" rx="5" fill="#5B5473"/>
  <rect x="312" y="146" width="96" height="26" rx="3" fill="#231A45"/>
  <rect x="286" y="196" width="148" height="26" rx="3" fill="#6B6584"/>
  <rect x="292" y="238" width="136" height="76" rx="6" fill="#B7B4C2"/>
  <circle cx="404" cy="276" r="8" fill="#8D8A9B"/>
  <circle cx="316" cy="340" r="18" fill="#8D8A9B"/>
  <circle cx="404" cy="340" r="18" fill="#8D8A9B"/>
  <rect x="466" y="150" width="16" height="200" rx="8" fill="#A8A5B4"/>
  <rect x="458" y="212" width="32" height="30" rx="4" fill="#6B6584"/>
</g>`,
);

const productFallback = objectFallback(
  'Static view of the retail counter appliance',
  `<g>
  <rect x="266" y="378" width="188" height="22" rx="5" fill="#3D3A45"/>
  <rect x="284" y="182" width="152" height="196" rx="8" fill="#D3D0DA"/>
  <rect x="278" y="160" width="164" height="26" rx="6" fill="#6B6584"/>
  <rect x="326" y="248" width="68" height="38" rx="4" fill="#231A45"/>
  <rect x="348" y="300" width="24" height="52" rx="8" fill="#A8A5B4"/>
  <circle cx="416" cy="300" r="14" fill="#8D8A9B"/>
</g>`,
);

const fallbacks = [
  ['industryxr-scene.svg', industryXrScene],
  ['industrial-machine.svg', machineFallback],
  ['service-device.svg', deviceFallback],
  ['retail-product.svg', productFallback],
];

for (const [name, svg] of fallbacks) {
  writeFileSync(resolve(fallbackDir, name), svg, 'utf8');
  console.log(`fallback/${name} — ${(Buffer.byteLength(svg) / 1024).toFixed(1)} kB`);
}
