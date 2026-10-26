# Neuro-UX Lab: AION UX Days 1 to 8 on the Digital Learning engine

The UX days 1 to 8 of the AION course, built the way `../../aion-digital-learning/playground-dl` builds Digital Learning: the same engine, the same look, the same rules (DL-STANDARD v1.8), with UX content only. Days 9 to 16 still run in `../playground-ux`.

**Status (2026-10-26):** Days 1, 2, 3, 4, 5, 6 are built and checked. Days 7 to 8 show a "being built" page until their spec is registered.

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

### Day 3

- **Three plan cases on one desk**, as on Days 1 and 2: TravelEase, HealthConnect and SecureLife (Case assumption).
- **The Level 3 company is the insurer behind SecureLife** (DL #49). The plan says only "a company with a website, a customer portal and an app". Who changes the campaign colours and that IT builds each channel from its own components are Case assumptions.
- **Colour and type in the simulations.** The plan's clues are colour and type, so the shared mini-platform got an optional `css` on headings, paragraphs and notes and `colors` on status chips (`components/sim/PlatformSim.tsx`). They set the plan's flaws only and never repair them.
- **Small detail figures** in the simulations (a departure "later than planned", check-in "from the day before") are worded without numbers, so no figure appears that the plan does not print.
- **Day 2 and Day 3 both touch colour.** The plan names colour psychology in Day 2's title but teaches it in Day 3's Wissen cell; Day 2 covers it briefly as guidance, Day 3 in full.

### Day 4

- **Three plan cases on one desk**, as on the days before: ServicePoint, WorkFlow Hub and MyEnergy (Case assumption).
- **The Level 3 company is the energy supplier behind MyEnergy** (DL #49). The plan says only "a company with a customer portal, a mobile app and a service platform". That each department adds its functions to its own channels, and what each system records, are Case assumptions.
- **The three laws come from the day's title.** The plan's Wissen cell speaks of UX laws in general; its title names Fitts's law, Hick's law and Miller's rule, so cards A2 to A4 teach them, with the original sources and the later correction of Miller's number (Cowan 2001).
- **Meter and contract numbers in the simulations** (such as a meter point designation) are identifiers, not figures about users or money.

### Day 5

- **The plan's title and its content differ.** The plan's title for Day 5 names Gestalt laws, visual hierarchy, cognitive load and progressive disclosure; its Wissen cell, its tasks and its Musterlösung teach Fitts's law, Hick's law and Miller's rule in depth. The Materi follows the Wissen cell (DL rule: the knowledge cell is the source), the day is shown as "Fitts, Hick and Miller in practice", and the course list says where the named topics are taught (Day 6, whose Wissen cell covers them).
- **Day 4 and Day 5 both teach the three laws.** Day 4 introduces them from its title; Day 5 applies them in depth (target size and the thumb, staged choices, chunking, the interplay), as its Wissen cell asks.
- **Three plan cases on one desk**, as before: BankDirect, AdminFlow and MoveEasy (Case assumption). **The Level 3 company is the mobility provider behind MoveEasy** (DL #49).
- **Target sizes in the simulations.** The mini-platform's link items got an optional `css`, so the plan's small and packed targets can be shown as described; it is never used to repair. The plan's "above 60 %" mobile use is the only user figure printed.

### Day 6

- **The plan's title and its content differ, as on Day 5.** The plan's title for Day 6 names the integration and evaluation of UX laws in design systems; its Wissen cell also teaches the Gestalt laws, visual hierarchy and progressive disclosure that Day 5's title names. The Materi follows the Wissen cell and covers all of it; the day is shown as "Gestalt, hierarchy, progressive disclosure and design systems".
- **Three plan cases on one desk**, as before: OfficeSphere, CareAssist and CitizenFlow (Case assumption). **The Level 3 organisation is the public administration behind CitizenFlow** (DL #49); the plan says "a company with a customer portal, an app and an internal administration interface". That there are no shared components today is a Case assumption.
- **Equally strong actions in the simulations** use the link items' `css`; nothing is repaired.
