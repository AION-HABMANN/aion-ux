# Day 15: Eye-tracking, neurofeedback and BCI (Neuro-UX Lab)

Legacy copy of `AION-HABMANN/aion-ux-day15-tracking` (copied 2026-10-25, source files only, no history; the old repository stays until this day is migrated and is then archived). **Not part of the build.** See `../README.md`.

## Facts

- Stack: react ^18.3.1, vite ^5.4.11, react-router-dom ^6.28.0, tailwindcss ^3.4.15, framer-motion ^11.11.17, typescript ^5.6.3
- Static export: n/a
- `@/*` alias: {"@/*":["src/*"]}
- Top level: README.md, index.html, package.json, postcss.config.js, src, tailwind.config.js, tsconfig.json, vite.config.ts
- CSS: src/index.css
- Static assets: none
- Pages and layouts: none (see below)
- Migration effort: **Large. A Vite single-page app with React Router; it has to become Next.js routes.**
- What is here: Routes in `src/routes.ts` (learn hub, play hub, debrief, landing), the `src/state` store, components (Assign, ConstraintHUD, ElementChecker, Meter, charts), `framer-motion`.

## To upgrade (from ../PLAN-MAP.md and the audit)

- Worksheets Task 2 to 4 are missing in Drive (one Task file and one transfer file exist).
- `framer-motion` is replaced by CSS (decision 5).

## Notes for the move

The alias is `@/*` to `src/*` (different from the rest). Replace `react-router-dom` links and `useNavigate` with `next/link` and `next/navigation`; every route in `src/routes.ts` becomes a folder under `app/day/15/`.

## How to migrate this day (the Day 9 pattern)

1. Copy the folders into `../../playground-ux/`: `components/` to `components/day15/`, `content/` or `data/` to `data/day15/`, `lib/` to `lib/day15/`, `app/` to `app/day/15/`.
2. Rewrite imports (`@/components/` to `@/components/day15/`, `@/content/` or `@/data/` to `@/data/day15/`, `@/lib/` to `@/lib/day15/`) and every internal link (`/x` to `/day/15/x`).
3. Take the day's `<html>`, fonts and global styles out of its root layout; the day gets a small `app/day/15/layout.tsx`.
4. A dynamic route exports `generateStaticParams` from a server component and renders a client component.
5. Set `built: true` for the day in `data/course.ts`; run `npm run typecheck`, `npm run verify:course`, `npm run build`, then look at it in the browser.
6. Then apply the upgrades under "To upgrade" and update `../../UX-STANDARD.md` section 3.

**Before the second day is moved in:** decide how days keep their own look. The project has one global stylesheet (Day 9's). Options: a separate root layout per day through route groups (full page load between days, no CSS bleed) or one shared palette. Tailwind utilities are one set for the whole project, so colour names that mean different things in two days need renaming.
