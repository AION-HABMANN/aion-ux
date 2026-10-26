# Day 12: Accessibility and neurodiversity

Legacy copy of `AION-HABMANN/aion-ux-day12-accessibility-neurodiversity` (copied 2026-10-25, source files only, no history; the old repository stays until this day is migrated and is then archived). **Not part of the build.** See `../README.md`.

## Facts

- Stack: next ^16.2.12, react ^19.2.8, tailwindcss 3.4.17, typescript 5.7.3
- Static export: output: export
- `@/*` alias: {"@/*":["./*"]}
- Top level: README.md, app, components, lib, netlify.toml, next.config.mjs, package.json, postcss.config.mjs, tailwind.config.ts, tsconfig.json, vercel.json
- CSS: app/globals.css
- Static assets: none
- Pages and layouts: app/layout.tsx, app/page.tsx
- Migration effort: **Medium. Next 16 / React 19 to Next 14 / React 18; one page with tabs.**
- What is here: 13 learning widgets (contrast, alt text, focus order, error tolerance, plain language, and so on), Training Ground, three cases (PublicAccess, LearnAccess, CitizenConnect), TaskMap.

## To upgrade (from ../PLAN-MAP.md and the audit)

- Single page; the standard wants `/day/12/` with routes.
- No export, no Transferprojekt block, little reduced-motion handling.

## Notes for the move

Already a static export. The old repository also has `netlify.toml` and `vercel.json`; they are not copied here (one deployment for the whole project).

## How to migrate this day (the Day 9 pattern)

1. Copy the folders into `../../playground-ux/`: `components/` to `components/day12/`, `content/` or `data/` to `data/day12/`, `lib/` to `lib/day12/`, `app/` to `app/day/12/`.
2. Rewrite imports (`@/components/` to `@/components/day12/`, `@/content/` or `@/data/` to `@/data/day12/`, `@/lib/` to `@/lib/day12/`) and every internal link (`/x` to `/day/12/x`).
3. Take the day's `<html>`, fonts and global styles out of its root layout; the day gets a small `app/day/12/layout.tsx`.
4. A dynamic route exports `generateStaticParams` from a server component and renders a client component.
5. Set `built: true` for the day in `data/course.ts`; run `npm run typecheck`, `npm run verify:course`, `npm run build`, then look at it in the browser.
6. Then apply the upgrades under "To upgrade" and update `../../UX-STANDARD.md` section 3.

**Before the second day is moved in:** decide how days keep their own look. The project has one global stylesheet (Day 9's). Options: a separate root layout per day through route groups (full page load between days, no CSS bleed) or one shared palette. Tailwind utilities are one set for the whole project, so colour names that mean different things in two days need renaming.
