# Day 11: Voice and adaptive journeys (CityHelp Voice)

Legacy copy of `AION-HABMANN/aion-ux-day11-ui-voice` (copied 2026-10-25, source files only, no history; the old repository stays until this day is migrated and is then archived). **Not part of the build.** See `../README.md`.

## Facts

- Stack: next 14.2.5, react ^18.3.1, tailwindcss ^3.4.4, typescript ^5.5.3
- Static export: not a static export
- `@/*` alias: {"@/*":["./*"]}
- Top level: README.md, app, components, lib, next.config.mjs, package.json, postcss.config.mjs, tailwind.config.ts, tsconfig.json
- CSS: app/globals.css
- Static assets: none
- Pages and layouts: app/layout.tsx, app/page.tsx, app/meet-cityhelp/page.tsx, app/prove-it-works/page.tsx, app/six-lenses/page.tsx, app/six-moments/page.tsx, app/three-ways/page.tsx, app/why-your-brain-reacts/page.tsx
- Migration effort: **Small. Next 14 / React 18 is already the target stack; the root alias `@/*` is the same.**
- What is here: Six stops: `meet-cityhelp`, `three-ways`, `six-lenses`, `why-your-brain-reacts`, `six-moments`, `prove-it-works`; `ChatMock`, `MicButton`, `lib/responseEngine.ts`, lenses, moments, variants.

## To upgrade (from ../PLAN-MAP.md and the audit)

- Plan cases HomeAssist Voice (Aufgabe 1) and CareVoice (Aufgabe 2) have no screens; the worksheets use CityHelp transcripts and variants. By the equivalence rule Day 11 is close: adjust to the plan's item counts (5 places, the two weakest) and keep CityHelp.
- No Transferprojekt block; no skip link; no reduced-motion handling.

## Notes for the move

Not a static export yet (`next.config.mjs` has no `output: "export"`); the shared config adds it. Check every page for client-only code that breaks in a static export.

## How to migrate this day (the Day 9 pattern)

1. Copy the folders into `../../playground-ux/`: `components/` to `components/day11/`, `content/` or `data/` to `data/day11/`, `lib/` to `lib/day11/`, `app/` to `app/day/11/`.
2. Rewrite imports (`@/components/` to `@/components/day11/`, `@/content/` or `@/data/` to `@/data/day11/`, `@/lib/` to `@/lib/day11/`) and every internal link (`/x` to `/day/11/x`).
3. Take the day's `<html>`, fonts and global styles out of its root layout; the day gets a small `app/day/11/layout.tsx`.
4. A dynamic route exports `generateStaticParams` from a server component and renders a client component.
5. Set `built: true` for the day in `data/course.ts`; run `npm run typecheck`, `npm run verify:course`, `npm run build`, then look at it in the browser.
6. Then apply the upgrades under "To upgrade" and update `../../UX-STANDARD.md` section 3.

**Before the second day is moved in:** decide how days keep their own look. The project has one global stylesheet (Day 9's). Options: a separate root layout per day through route groups (full page load between days, no CSS bleed) or one shared palette. Tailwind utilities are one set for the whole project, so colour names that mean different things in two days need renaming.
