# Neuro-UX Lab: AION UX Days 1 to 8 on the Digital Learning engine

The UX days 1 to 8 of the AION course, built the way `../../aion-digital-learning/playground-dl` builds Digital Learning: the same engine, the same look, the same rules (DL-STANDARD v1.8), with UX content only. Days 9 to 16 still run in `../playground-ux`.

**Status (2026-10-26):** Days 1, 2 are built and checked. Days 3 to 8 show a "being built" page until their spec is registered.

## Run and check

```bash
npm install
npm run dev            # http://localhost:3400
npm run typecheck
npm run verify:day1    # the day's shape, the missing lists, the model answers, the exports
npm run verify:platforms
npm run build          # static export to out/
```

The mentor bar (top of every page) fills every model answer of a day with the passcode in `lib/mentorKey.ts`, so both documents can be exported at once.

## How a day is made

A day is the same set of files DL uses for its free-form days:

| File | What it holds |
|---|---|
| `data/dayN/free.ts` | The spec: the two case briefs (with the known and open box), the blocks 1.1, 1.2, 2.1 and 3.1, every question of the plan as a field with its model answer, help, steps and worked example, and the facilitator cards |
| `data/dayN/materials.ts` | The eight study cards (Materi A five, Materi B three), their minutes (60 + 60), the "In plain words" box and the blocks each card is used in |
| `components/dayN/Cards.tsx`, `Materi.tsx` | The cards themselves: comic, figures, table, rules, sources |
| `components/dayN/diagrams.tsx`, `mocks.tsx`, `comicScenes.tsx`, `data/dayN/comics.ts` | The pictures and the pixel comics (one per card, four panels) |
| `data/dayN/platforms.ts`, `components/dayN/sims.tsx` | The working simulations, as data run by the shared mini-platform |
| `components/dayN/Free.tsx`, `observe.tsx` | The kit: what each slot of a block shows (pictures with markers, simulations, option cards, the desk, the observation) |
| `data/refs/dayN.ts`, `data/gloss/dayN.ts` | The references and the glossary of the day |

Register a day in `data/free/registry.ts`, `data/materialRegistry.ts`, `components/day/dayConfigs.tsx`, `data/references.ts` and `data/glossary.ts`, and add it to `scripts/verify-platforms.ts`.

The plan text of each day (with its Musterlösung) is in `../trainer-only/plan/dayN.txt`, git-ignored.

## What differs from Digital Learning

- **English only for now** (UX-STANDARD decision 4). `t(en, de?)` keeps German optional; the language switch is hidden. Indonesian and German come later.
- **Only UX days.** The engine (about 80 files) is copied from playground-dl; the boundary files (`data/course.ts`, the registries, `store/useStore.ts`, `lib/mentorKey.ts`, `data/materialTypes.ts`) are rewritten for Days 1 to 8.
- **A plan figure stays where the plan prints it.** DL's plans print no money figures; the UX plan sometimes does (Day 1: €180,000 for SafeHome Online). It appears in the brief only, never in the Materi or a simulation; `verify-free.ts` allows exactly the figures listed in `PLAN_FIGURES`.

## Notes on deviations, per day

### Day 1

- **Three plan cases on one desk.** The plan gives three separate products for Level 1 and 2 (CarePath, SkillFlow, SafeHome Online). They are kept as they are and framed as the review desk of an agency UX team (Case assumption in the known and open box).
- **The Level 3 company is the insurer behind SafeHome Online** (DL #49: the case company of Level 2 is the company of Level 3). The plan says only "a mid-sized company with a website, a customer portal, an app and a chatbot". The facts marked "Clear" (each channel built by another team, so each names the damage report differently; who records what) are Case assumptions.
- **SkillFlow's three start pages are simulations.** The plan describes them only in words; each is built exactly as its words say, with nothing added that changes the answer.
- **Shared engine fixes** made here and not yet in DL: a picture of a platform is `inert` (its drawn buttons cannot be focused), and the section rail's minutes line has no extra opacity (contrast).

### Day 2

- **Three plan cases on one desk**, as on Day 1: CityDesk, EduFlex and CampusNow are kept as the plan gives them and framed as the agency UX team's week (Case assumption).
- **The Level 3 company is the education organisation behind CampusNow** (DL #49). The plan says only "a company with a website, a self-service portal, an app and a support area". That each department names and builds its own pages, and what each system records, are Case assumptions.
- **CampusNow on a phone.** The plan says mobile use is especially problematic; the same portal is also shown in a phone frame, with no figure added.
- **Block 2.1 question 4 rates the learner's own measures** ("Your measure 1 to 4"), because the plan asks to rate the measures of question 3. Effort is judged in time and people (DL-STANDARD 6), never in money.
- **Block 1.1 question 5 is a list of two**, because the plan asks for "the two biggest hurdles".
- **Engine fix:** the heading of the "Still missing before export" panel is an h3 (axe heading-order on Route 2).
- **Colour.** The day's title in the plan names colour psychology and the strategic use of colour, but its Wissen cell and its tasks do not. Card A3 therefore covers colour briefly, as a means of guidance (one accent for the main action, warnings only for real warnings, never colour alone), with sources; no task asks about it.
