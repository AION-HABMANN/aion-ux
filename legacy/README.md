# legacy: the old Day 10 to 16 sites, kept in one place until each is upgraded

Source copies of the separate repositories (decision of 2026-10-25), kept as the reference for each day's upgrade. **Days 10 to 16 now also run inside `../playground-ux/`** (moved as they were built, see its README). Nothing here is part of the build and `playground-ux/` does not read this folder. When a day is upgraded and verified, delete its `legacy/dayN/` folder.

| Day | Old repository (`AION-HABMANN/`) | Stack | Effort to move | Notes |
|---|---|---|---|---|
| 10 | `aion-ux-day10-intelligent-interfaces` | one HTML file + Word | large (rebuild) | [`day10/MIGRATION.md`](day10/MIGRATION.md) |
| 11 | `aion-ux-day11-ui-voice` | Next 14.2.5, React 18 | small | [`day11/MIGRATION.md`](day11/MIGRATION.md) |
| 12 | `aion-ux-day12-accessibility-neurodiversity` | Next 16, React 19 | medium | [`day12/MIGRATION.md`](day12/MIGRATION.md) |
| 13 | `aion-ux-day13-inclusive-design-patterns` | Next 14.2.15, React 18 | small | [`day13/MIGRATION.md`](day13/MIGRATION.md) |
| 14 | `aion-ux-day14-immersive-tech-neuroscience` | Next 16, React 19, three.js | large | [`day14/MIGRATION.md`](day14/MIGRATION.md) |
| 15 | `aion-ux-day15-tracking` | Vite, React Router | large (rewrite to Next) | [`day15/MIGRATION.md`](day15/MIGRATION.md) |
| 16 | `aion-ux-day16-immersive-prototyping` | Next 15.5, React 19 | medium | [`day16/MIGRATION.md`](day16/MIGRATION.md) |

Day 9 is already in `../playground-ux/` (the reference day). A suggested order, cheapest first: 11, 13, 16, 12, 14, 10, 15. The order is yours to change.

## What was left out on purpose

- **No history.** Files only. The old repositories keep their history and stay until their day is migrated; they are then archived, not deleted.
- **No `node_modules`, build output or lock files.** Install from the shared `package.json` of `playground-ux`.
- **The author's CV files** (Day 13): removed from the old repository and its history on 2026-10-25; never copy them back.
- **Instructor-only files** (Day 16: `FLAW_INDEX.md`, `LADDER_MATRIX.md`, `PORTFOLIO_OUTCOMES.md`): kept in `../trainer-only/day16/`, which `../.gitignore` excludes. They must not enter a public repository.
- **Deploy files** of the old repositories (`netlify.toml`, `vercel.json`): the new project has one deployment.

## Working on a day

1. Open the day's `MIGRATION.md`: facts, what to upgrade, and the steps (the same pattern that moved Day 9).
2. Move it into `../playground-ux/`, get it building, check it in the browser.
3. Apply the upgrades, update `../UX-STANDARD.md` section 3, and delete `legacy/dayN/`.
4. When every day is moved, delete `legacy/` and archive the old repositories.

Run `npm run verify:course` in `playground-ux/`: it also scans this folder for instructor-only text, answer keys and CV-like files.
