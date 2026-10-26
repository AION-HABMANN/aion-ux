# Day 13: Inclusive design patterns

Legacy copy of `AION-HABMANN/aion-ux-day13-inclusive-design-patterns` (copied 2026-10-25, source files only, no history; the old repository stays until this day is migrated and is then archived). **Not part of the build.** See `../README.md`.

## Facts

- Stack: next 14.2.15, react 18.3.1, tailwindcss 3.4.6, typescript 5.5.3
- Static export: output: export
- `@/*` alias: {"@/*":["./*"]}
- Top level: README.md, app, components, data, next.config.mjs, package.json, postcss.config.mjs, tailwind.config.ts, tsconfig.json
- CSS: app/globals.css
- Static assets: none
- Pages and layouts: app/layout.tsx, app/page.tsx
- Migration effort: **Small. Next 14 / React 18 already; one page.**
- What is here: Learn L1 / L2 / L3, Training Ground, four cases (StudyPath, JobAccess, LifeGuide, EnterpriseContext), TaskMap; data in `data/`.

## To upgrade (from ../PLAN-MAP.md and the audit)

- No mentor bar, no export.
- Next 14 is already the target stack.

## Notes for the move

Copied from the cleaned history: the author's CV files (`CV-*`, `build-cv.js`) are not here and must not be added back.

## How to migrate this day (the Day 9 pattern)

1. Copy the folders into `../../playground-ux/`: `components/` to `components/day13/`, `content/` or `data/` to `data/day13/`, `lib/` to `lib/day13/`, `app/` to `app/day/13/`.
2. Rewrite imports (`@/components/` to `@/components/day13/`, `@/content/` or `@/data/` to `@/data/day13/`, `@/lib/` to `@/lib/day13/`) and every internal link (`/x` to `/day/13/x`).
3. Take the day's `<html>`, fonts and global styles out of its root layout; the day gets a small `app/day/13/layout.tsx`.
4. A dynamic route exports `generateStaticParams` from a server component and renders a client component.
5. Set `built: true` for the day in `data/course.ts`; run `npm run typecheck`, `npm run verify:course`, `npm run build`, then look at it in the browser.
6. Then apply the upgrades under "To upgrade" and update `../../UX-STANDARD.md` section 3.

**Before the second day is moved in:** decide how days keep their own look. The project has one global stylesheet (Day 9's). Options: a separate root layout per day through route groups (full page load between days, no CSS bleed) or one shared palette. Tailwind utilities are one set for the whole project, so colour names that mean different things in two days need renaming.
