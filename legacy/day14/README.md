# AION UX Class — Module 7, Day 1 of 3

**Immersive Technologies & Neuroscience UX Foundations — learning playground**

A single-page playground where learners explore immersive-tech UX concepts by doing, then use
frozen, identical case material to complete four graded tasks that live elsewhere, in DOCX
worksheets. The playground helps learners understand and structure their thinking. It is **not** a
submission system, and it never shows correct answers outside the Training Ground.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # generates assets, then a static export into ./out
npm start          # serves ./out locally
```

`npm run build` runs `scripts/generate-assets.mjs` first. That script writes every `.glb` and every
static fallback image from code, so the bundled assets are reproducible and byte-identical on every
machine — nothing is downloaded, at build time or at runtime.

Deploy `./out` to Netlify (config included) or Vercel. No backend, no database, no environment
variables.

---

## Tabs

| Tab | What it is |
| --- | --- |
| **Learn** | All teaching material, as ten interactive widgets across L1 / L2 / L3. |
| **Training Ground** | Ten practice items with reveals on, plus light gamification. |
| **BuildVision** | Assessment case for Worksheet 1. Reveals off. |
| **HealthSpace** | Assessment case for Worksheet 2. Reveals off, no 3D. |
| **IndustryXR** | Case study for Task 3. The one Three.js scene. |
| **Transfer Project** | Seven scaffolding widgets for the Level 3 assignment. |
| **Task Map** | Which tab supports which task. |

---

## Architectural rules this repo holds to

**3D tooling is scoped deliberately — an object gets model-viewer, an environment gets Three.js, an
idea gets 2D.**

| Tool | Used in | Nowhere else |
| --- | --- | --- |
| Three.js | `components/cases/IndustryXR/Scene.tsx` | Grep confirms exactly one import of `three`. |
| `<model-viewer>` | Learn widget 2, BuildVision, one Training Ground item | Loaded from the local `@google/model-viewer` package, never a CDN. |
| CSS 3D transforms | Learn widget 1 | No library at all. |
| Plain 2D | Everything else, including all of HealthSpace and the whole Transfer Project | — |

**Frozen case material.** Every graded case renders identically for every learner on every load.
There is no randomness, no shuffling, no time-based variation anywhere in the app, and the
IndustryXR camera is clamped to a ±9° horizontal arc with no zoom, so reproducibility outranks
spectacle. The case text lives in `/content` as exported constants so it cannot drift between
components.

**No answers outside the Training Ground.** BuildVision, HealthSpace, IndustryXR, and the Transfer
Project contain no verdicts, no category assignments, no recommendations, no scoring, and no
highlighting of a "best" option. Nothing in those tabs is auto-labelled, annotated, or flagged.

**No practice item overlaps a graded case.** The Training Ground scenarios are drawn from museums,
retail, air travel, architecture, higher education, amateur sport, internal communication, real
estate, school safety, and consumer apps — deliberately none of the domains any worksheet is graded
on.

**Category vocabulary** comes from `content/categories.ts` and is the same in Learn captions,
Training Ground reveals, and the case reference panels. External frameworks appear only as a single
one-line reference note in Learn.

**Runtime.** localStorage only. No network requests after the initial asset load. Fonts are Calibri
with a system fallback stack, bundled by reference — no webfont is fetched.

**Degradation.** Every 3D widget probes for WebGL and falls back to a bundled static image with the
same information; the IndustryXR fallback carries the same four stations as clickable regions.

---

## Layout

```
app/page.tsx                  single page, tab shell
components/shell/             Header, Footer, TabBar
components/ui/                Widget frame, ModelStage (model-viewer wrapper)
components/learn/             widgets 1–10
components/training/          PracticeCard, RevealCard, XpBar, Badges
components/cases/BuildVision/ ModelViewerStage, CaseText, CategoryRef
components/cases/HealthSpace/ VariantCards, CompareMatrix, Conditions
components/cases/IndustryXR/  Scene (Three.js), HotspotPanel, StaticFallback, CaseText, Checklist
components/transfer/          widgets 1–7
components/taskmap/           TaskMapTable
content/                      frozen case text and all copy, as typed constants
lib/storage.ts                typed localStorage helpers
lib/webgl.ts                  capability probe
scripts/                      deterministic .glb and fallback-image generation
public/models/                bundled .glb assets
public/fallback/              static fallback images
```
