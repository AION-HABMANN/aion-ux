# Day 16: Immersive prototyping, future strategy and ethics

Legacy copy of `AION-HABMANN/aion-ux-day16-immersive-prototyping` (copied 2026-10-25, source files only, no history; the old repository stays until this day is migrated and is then archived). **Not part of the build.** See `../README.md`.

## Facts

- Stack: next 15.5.23, react 19.1.1, tailwindcss 3.4.17, typescript 5.7.2
- Static export: not a static export
- `@/*` alias: {"@/*":["./*"]}
- Top level: README.md, app, components, content, lib, next.config.mjs, package.json, postcss.config.mjs, tailwind.config.ts, tsconfig.json
- CSS: app/globals.css
- Static assets: none
- Pages and layouts: app/layout.tsx, app/page.tsx
- Migration effort: **Medium. Next 15.5 / React 19 to Next 14 / React 18; many components (ladder, bench, assessment, portfolio).**
- What is here: Tabs: The Ladder, The Test Bench, Portfolio Room, NextWorld UX; `lib/quarterEngine.ts`; content for categories, dossiers, gates, ladder, nextworld, portfolio, stress matrix, test bench.

## To upgrade (from ../PLAN-MAP.md and the audit)

- Equivalence check: 11 of 23 plan items covered, 7 partly. NextWorld UX is the plan's Fallstudie and its three variants are the plan's A/B/C; add the missing items (see ../docs/CEK-EKUIVALENSI-DAY10-DAY16.md).
- Portfolio Room and CityPass AR go to the Extra shelf if they match no plan item (decision 8).
- No skip link; Drive has only one worksheet.

## Notes for the move

Not a static export yet. The three INSTRUCTOR ONLY files (`FLAW_INDEX.md`, `LADDER_MATRIX.md`, `PORTFOLIO_OUTCOMES.md`) were moved to `../trainer-only/day16/` and must not return to a public repository; the mentor bar can carry them later.

## How to migrate this day (the Day 9 pattern)

1. Copy the folders into `../../playground-ux/`: `components/` to `components/day16/`, `content/` or `data/` to `data/day16/`, `lib/` to `lib/day16/`, `app/` to `app/day/16/`.
2. Rewrite imports (`@/components/` to `@/components/day16/`, `@/content/` or `@/data/` to `@/data/day16/`, `@/lib/` to `@/lib/day16/`) and every internal link (`/x` to `/day/16/x`).
3. Take the day's `<html>`, fonts and global styles out of its root layout; the day gets a small `app/day/16/layout.tsx`.
4. A dynamic route exports `generateStaticParams` from a server component and renders a client component.
5. Set `built: true` for the day in `data/course.ts`; run `npm run typecheck`, `npm run verify:course`, `npm run build`, then look at it in the browser.
6. Then apply the upgrades under "To upgrade" and update `../../UX-STANDARD.md` section 3.

**Before the second day is moved in:** decide how days keep their own look. The project has one global stylesheet (Day 9's). Options: a separate root layout per day through route groups (full page load between days, no CSS bleed) or one shared palette. Tailwind utilities are one set for the whole project, so colour names that mean different things in two days need renaming.
