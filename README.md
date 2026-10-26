# AION UX: psychological UX and neuro-design (Days 1 to 16)

The working folder for the AION UX course material, built the way `../aion-digital-learning/` is built for Digital Learning. The plan of the course is the Strukturplan in Drive (16 days, 8 modules); Days 9 to 16 exist today as eight separate repositories and are to be brought together here and upgraded to the Digital Learning standard.

**Status (2026-10-25): the skeleton exists.** `playground-ux/` is one Next.js project with Day 9 as the reference day; Days 9 to 16 run there as they were built (not upgraded), Days 1 to 8 are placeholders. `legacy/` keeps the source copies for the upgrade. All nine decisions in `UX-STANDARD.md` section 4 are decided. Nothing here has been pushed.

**New (2026-10-26): [`ux-lab/`](ux-lab) holds Days 1 to 8.** The user chose to build Days 1 to 8 on Digital Learning's own engine, to its writing standard, with two routes and Materi apart from the tasks (`UX-STANDARD.md` 2.13). **Status (2026-10-27): Days 1 to 8 are built and checked** (verify, platforms, typecheck, axe, and `npm run build` in both projects). The lean `day1/` project is retired (in git history). `playground-ux/` (Days 9 to 16) is parked and links each built day to the lab.

## What is in this folder

| File | What it is |
|---|---|
| [`docs/HASIL-BELAJAR.md`](docs/HASIL-BELAJAR.md) | What was learned: the plan, the two models (UX class vs Digital Learning), the audit of the eight repositories, findings, what can be reused, the proposed single-repository form, and the limits of the audit. Written in Indonesian. |
| [`UX-STANDARD.md`](UX-STANDARD.md) | The new standard, draft v0.1: what carries over from Digital Learning, the UX-specific rules, the status of the eight days, and the open decisions. |
| [`ux-lab/`](ux-lab) | **Days 1 to 8 on the DL engine** (Neuro-UX Lab, port 3400): per day a home, Route 1 (Materi A, then blocks 1.1, 1.2, 2.1, the UX Analysis File), Route 2 (Materi B, then block 3.1, the UX Strategy Memo), comics, simulations, facilitator cards. Its README lists the deviations per day. |
| [`playground-ux/`](playground-ux) | The project. Its own README says how to run it, what changed when Day 9 moved in, and the open deviations. |
| [`legacy/`](legacy) | Source copies of the old Day 10 to 16 sites (reference for the upgrade, outside the build) with a `MIGRATION.md` per day. |
| `trainer-only/` | Instructor-only files (Day 16). Git-ignored; never goes into a public repository. |
| [`PLAN-MAP.md`](PLAN-MAP.md) | Day-by-day map of plan topic, plan cases, repository, playground link, and Drive folder; plus the Drive links to the plan. |

## Layout

The layout follows `aion-digital-learning`. `playground-ux/` exists; `materi-task-docx/` does not yet (Word documents are built only on the user's signal).

```
aion-ux/
  UX-STANDARD.md            the living rulebook (this folder's DL-STANDARD)
  docs/                     learning notes, audits, decisions
  materi-task-docx/         Word documents per day (Materi, Task 1 to 4); not created yet
  playground-ux/            one Next.js project, /day/{n}/ (exists; Day 9 is in)
  legacy/                   Day 10 to 16 source copies, outside the build
  trainer-only/             instructor-only files, git-ignored
    app/ components/ lib/ data/ scripts/ styles/   (store/ and public/ come with the shared store and assets)
```

Each built day gets `components/dayN`, `data/dayN`, `lib/dayN` and a `verify:dayN` script. A day not built yet keeps its page as a placeholder.

## Standards this folder builds on

`../aion-digital-learning/DL-STANDARD.md` (v1.8), `../aion-digital-learning/CLAUDE.md` and `../aion-digital-learning/DOCX-EXPORT-GUIDE.md`. They are read by reference; nothing is copied.

## Rules for working here

- Push only when asked. Pushing to `main` of a deployed repository deploys it.
- Answer keys, trainer notes and personal documents never go into a public repository.
- A change to the standard is written in `UX-STANDARD.md` first and added to its changelog.
