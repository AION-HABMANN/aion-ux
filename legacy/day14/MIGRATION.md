# Day 14: Immersive technologies and neuroscience foundations

Legacy copy of `AION-HABMANN/aion-ux-day14-immersive-tech-neuroscience` (copied 2026-10-25, source files only, no history; the old repository stays until this day is migrated and is then archived). **Not part of the build.** See `../README.md`.

## Facts

- Stack: next ^16.2.12, react 19.1.1, tailwindcss ^3.4.17, three ^0.183.0, @google/model-viewer ^4.0.0, typescript ^5.7.2
- Static export: output: export
- `@/*` alias: {"@/*":["./*"]}
- Top level: README.md, app, components, content, lib, netlify.toml, next.config.mjs, package.json, postcss.config.mjs, public, scripts, tailwind.config.ts, tsconfig.json, types
- CSS: app/globals.css
- Static assets: fallback/industrial-machine.svg, fallback/industryxr-scene.svg, fallback/retail-product.svg, fallback/service-device.svg, models/industrial-machine.glb, models/retail-product.glb, models/service-device.glb
- Pages and layouts: app/layout.tsx, app/page.tsx
- Migration effort: **Large. Next 16 / React 19 to Next 14 / React 18; three.js and model-viewer; static assets and a generator script.**
- What is here: Learn widgets W1 to W10, three cases (BuildVision with a 3D model, HealthSpace compare matrix, IndustryXR hotspot scene), transfer, export.

## To upgrade (from ../PLAN-MAP.md and the audit)

- Skip link missing.
- Only IndustryXR has a no-WebGL fallback; every 3D scene needs one (UX-STANDARD decision 5: three.js and model-viewer are kept as listed exceptions).

## Notes for the move

`next.config.mjs` has `transpilePackages: ['@google/model-viewer']`; keep it. Assets: `public/models/*.glb` and `public/fallback/*.svg`; move them to `public/day14/` and update the paths. `scripts/generate-assets.mjs` and `scripts/glb.mjs` regenerate the models.

## How to migrate this day (the Day 9 pattern)

1. Copy the folders into `../../playground-ux/`: `components/` to `components/day14/`, `content/` or `data/` to `data/day14/`, `lib/` to `lib/day14/`, `app/` to `app/day/14/`.
2. Rewrite imports (`@/components/` to `@/components/day14/`, `@/content/` or `@/data/` to `@/data/day14/`, `@/lib/` to `@/lib/day14/`) and every internal link (`/x` to `/day/14/x`).
3. Take the day's `<html>`, fonts and global styles out of its root layout; the day gets a small `app/day/14/layout.tsx`.
4. A dynamic route exports `generateStaticParams` from a server component and renders a client component.
5. Set `built: true` for the day in `data/course.ts`; run `npm run typecheck`, `npm run verify:course`, `npm run build`, then look at it in the browser.
6. Then apply the upgrades under "To upgrade" and update `../../UX-STANDARD.md` section 3.

**Before the second day is moved in:** decide how days keep their own look. The project has one global stylesheet (Day 9's). Options: a separate root layout per day through route groups (full page load between days, no CSS bleed) or one shared palette. Tailwind utilities are one set for the whole project, so colour names that mean different things in two days need renaming.
