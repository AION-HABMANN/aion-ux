# Neuro-UX Lab: the AION UX class, Days 1 to 16

The UX days of the AION course, built the way `../../aion-digital-learning/playground-dl` builds Digital Learning: the same engine, the same look, the same rules (DL-STANDARD v1.8), with UX content only. Days 9 to 16 are here too, as their **original idea** (see below).

**Status (2026-10-27):** Days 1, 2, 3, 4, 5, 6, 7, 8 are built and checked. All eight days are in.
**Status (2026-10-28):** Days 9 to 16 moved in from `../playground-ux` as they were built, under `/day/N/original/`. Their lab versions are not built yet.

**Live: https://aion-ux-lab.vercel.app** (Vercel project `aion-ux-lab`, root directory `ux-lab`, connected to `AION-HABMANN/aion-ux`: a push to `main` deploys to production). For example: [the course home](https://aion-ux-lab.vercel.app/), [Day 1](https://aion-ux-lab.vercel.app/day/1/), [Day 9's original idea](https://aion-ux-lab.vercel.app/day/9/original/), [Day 16's original idea](https://aion-ux-lab.vercel.app/day/16/original/).

## Run and check

```bash
npm install
npm run dev            # http://localhost:3400 (builds the original days' stylesheets first)
npm run typecheck
npm run verify:day1    # the day's shape, the missing lists, the model answers, the exports
npm run verify:platforms
npm run verify:original        # the original Days 9 to 16: pages, stylesheets, links, kept apart from the lab
npm run verify:original-day9   # the original Day 9 against the plan (formerly verify:day9 in playground-ux)
npm run build          # static export to out/
```

After `npm run build`, delete `.next` before `npm run dev` again (the build and the dev server share the folder).

## The original idea of Days 9 to 16

Days 9 to 16 were first built as eight separate sites, then gathered in `../playground-ux`. They are kept here unchanged, so the first idea of each day stays reachable next to the lab version that will replace it.

| Where | What |
|---|---|
| `/day/N/` (Days 9 to 16) | The lab's page of the day. Until the lab version is built it says so and opens the original idea; after that, the original idea stays as a section under the day's home (`OriginalIdea` in `components/day/DayView.tsx`). |
| `/` | The course home: Days 9 to 16 carry an extra **Original idea** column. |
| `/day/N/original/` | The day as it was first built, with its own look, its own saved answers and a slim bar back to the lab and to `/day/N/`. Day 15's pages are hash addresses (`/day/15/original/#/learn/foundations`). |
| `data/course.ts` → `ORIGINALS` | Name and one-line description of each original idea. |
| `app/(original-9-10)`, `app/(original-11)` … `app/(original-16)` | One route group with its **own root layout** per original day (Days 9 and 10 share Day 9's). The lab itself is `app/(lab)`. There is no `app/layout.tsx`. |
| `original/components`, `original/data`, `original/lib`, `original/types` | The original code, as it was, with imports rewritten to `@/original/...`. The lab never imports it and it never imports the lab (`verify:original`). |
| `original/tailwind/dayN.config.*`, `original/styles/dayN/globals.css` | Each original day's own Tailwind theme. `npm run build:css` (run before `dev` and `build`) compiles them to `public/css/dayN.css` (git-ignored), linked by the day's root layout. |
| `public/day10`, `public/day14` | Day 10's companion page and worksheets, Day 14's 3D models. |

**Why each original day keeps its own root layout and stylesheet.** The days were built with Tailwind themes that clash with each other and with the lab (`ink`, `card`, `sans`, `mono` and more mean different things), and Day 15 uses colour opacity that a shared variable cannot give. A route group per day keeps each look intact. The price: moving between the lab and an original day, or between two original days, is a full page load.

**Kept as they were, so still not on the lab standard.** No two routes with the lab's export (except Day 9, which already has routes, tasks, model answers and an export of its own), no lab glossary or mentor bar, their own localStorage keys (nothing is shared with the lab's store). Day 15 loads its fonts from Google Fonts, the one place in this project that needs the network; Day 10's worksheets use real AI tools, not the plan's cases. These are the reasons to rebuild each day here, not reasons to change the originals.

**Accessibility fixes made on the move (2026-10-28).** An axe pass (WCAG 2.0 to 2.2, A and AA) over every original page, every Day 15 hash route and every tab of Days 12, 13, 14 and 16 found real faults; they are fixed without changing what a day teaches or looks like:

| Day | Fault | Fix |
|---|---|---|
| 11, 12, 14 | Secondary text in navy at 25 to 65 % opacity, below 4.5:1 | `text-navy/25` … `/65` drawn at 68 % (an override at the end of the day's `globals.css`) |
| 11 | "Speak" button named "Dictate…"; a label on a plain span; risk quadrants named apart from their text | name starts with the visible word; screen-reader text in `sr-only` spans |
| 12 | German sub-labels of the category chips at 70 % opacity | full colour |
| 13 | White on the green category chip (4.1:1); German sub-labels at 90 % opacity | green `#1C8555`; full colour |
| 14 | Tab bar: `li` between `tablist` and `tab` | `role="presentation"` on the `li` |
| 15 | Off level badges L1 to L3 at 32 % opacity (1.7:1); ▲▼ reorder buttons under 24 px; drag cards named apart from their text | 80 % opacity; 24 × 24 px targets; the card's text is its name |
| 16 | Amber `#B26B00` (4.2:1); buttons whose label left out their visible text | `#A76500`; label = visible text, extra notes in `sr-only` |

**Left as they are on purpose:** the low-contrast examples that are the subject of a lesson or a case: Day 12's "small print" demo, its Training Ground club page and the PublicAccess portal, and Day 13's LifeGuide, StudyPath and Training Ground surfaces (blinking badges, loud accents). The learner is meant to find those barriers. After the fixes every other original page, the lab home and the lab day pages show 0 axe violations. Not done: a keyboard-only pass, zoom to 200 and 400 %, a screen-reader pass.

**Libraries added for the originals only:** three.js and `@google/model-viewer` (Day 14, `transpilePackages` in `next.config.mjs`), `react-router-dom` (Day 15), `framer-motion` (Day 15), `canvas-confetti` (Day 9 capstone), `lucide-react` (Day 9 icons). Zustand stays at the lab's 4.5.4; the original Day 9 store (written for 5) runs on it unchanged.

**When a day of 9 to 16 is rebuilt here:** build it like Days 1 to 8 under `/day/N/` (its own `components/dayN`, `data/dayN`), leave `/day/N/original/` and its entry in `ORIGINALS` in place.

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

### Day 7

- **Three plan cases on one desk**, as before: WellTrack, CareerPath and LifeSupport, reviewed by the UX team of a digital agency (Case assumption). **The Level 3 organisation is the health-prevention provider behind LifeSupport** (DL #49); the plan says "a company with a website, a customer portal and an app". That marketing writes the website and each product team its own messages, and that no tone guide exists, are Case assumptions.
- **The plan's technical messages are shown with codes** (Error 4012, a booking number, Error 413): they are identifiers, not figures, and show the "technical instead of supportive" feedback the plan names. No other number is printed.
- **Variant A of CareerPath** shows its "many emotional stimuli and activating messages" with emoji, badges and urgency texts; its colours are dark enough for contrast, so the flaw is in the content, not in legibility.
- **Engine fix found on this day:** the desk and observe kits used a grey (#7A8190) below 4.5:1; it is now #5F6675 on every day, and the spreadsheet's corner cell has a screen-reader label.

### Day 8

- **Three plan cases on one desk**, as before: StartSmart, FutureSkills and GreenHome, reviewed by the UX team of a digital agency (Case assumption). **The Level 3 organisation is the sustainable-energy provider behind GreenHome** (DL #49); the plan says "a company with a website, an advisory platform and self-service flows". That GreenHome's onboarding has five sections, that marketing tells the brand story on the website and that no patterns for entries, progress or endings exist are Case assumptions.
- **"Storytelling" is taught as narrative guidance, not as writing stories**, as the plan's Wissen cell separates narrative communication from narratively structured guidance; the Materi says so on card A3.
- **The plan's figures** are €155,000, 12 weeks and 10 weeks; the onboarding's "Page 1" to "Page 5", a form label "F-1 of 4" and a reference code are interface labels, not figures.
- **Contrast fixes found in the final sweep** (not plan flaws): the desk avatar brown, the orange header of Day 4's MyEnergy, Day 1's orange CarePath button and Day 6's orange notice link are now dark enough for 4.5:1. Day 3's low-contrast colours stay, because they are the plan's colour flaws.
