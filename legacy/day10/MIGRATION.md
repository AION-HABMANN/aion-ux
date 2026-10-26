# Day 10: Intelligent Interfaces and AI-assisted UX

Legacy copy of `AION-HABMANN/aion-ux-day10-intelligent-interfaces` (copied 2026-10-25, source files only, no history; the old repository stays until this day is migrated and is then archived). **Not part of the build.** See `../README.md`.

## Facts

- Stack: no package.json (single HTML file)
- Static export: n/a
- `@/*` alias: n/a
- Top level: README.md, companion, materials, worksheets
- CSS: none
- Static assets: none
- Pages and layouts: none (see below)
- Migration effort: **Large. There is no application: a single HTML companion, four worksheets and the main-material document.**
- What is here: `companion/day10-companion.html` (the playground, a Claude artifact), `worksheets/` (Task 1 to 4, Word), `materials/` (main material, Word).

## To upgrade (from ../PLAN-MAP.md and the audit)

- Equivalence check (../docs/CEK-EKUIVALENSI-DAY10-DAY16.md): 4 of 23 plan items covered, so the four tasks use the plan's cases (SmartAssist, CareerNavigator, CareGuide, transfer).
- The companion becomes the Materi; the tool-based tasks (Claude, Gemini, NotebookLM, v0, CapCut, Duolingo, BelajarCepat) move to the Extra shelf.
- Build `/day/10/` as a real application on the shared stack; there is nothing to port.

## Notes for the move

No code to port. The three lenses (transparency, control, recoverability) and the rule-based / adaptive / learning table are worth keeping as Materi.

## How to migrate this day (the Day 9 pattern)

1. Copy the folders into `../../playground-ux/`: `components/` to `components/day10/`, `content/` or `data/` to `data/day10/`, `lib/` to `lib/day10/`, `app/` to `app/day/10/`.
2. Rewrite imports (`@/components/` to `@/components/day10/`, `@/content/` or `@/data/` to `@/data/day10/`, `@/lib/` to `@/lib/day10/`) and every internal link (`/x` to `/day/10/x`).
3. Take the day's `<html>`, fonts and global styles out of its root layout; the day gets a small `app/day/10/layout.tsx`.
4. A dynamic route exports `generateStaticParams` from a server component and renders a client component.
5. Set `built: true` for the day in `data/course.ts`; run `npm run typecheck`, `npm run verify:course`, `npm run build`, then look at it in the browser.
6. Then apply the upgrades under "To upgrade" and update `../../UX-STANDARD.md` section 3.

**Before the second day is moved in:** decide how days keep their own look. The project has one global stylesheet (Day 9's). Options: a separate root layout per day through route groups (full page load between days, no CSS bleed) or one shared palette. Tailwind utilities are one set for the whole project, so colour names that mean different things in two days need renaming.
