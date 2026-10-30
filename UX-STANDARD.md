# UX Standard: how an AION UX day is built (draft v0.1)

**Status: draft, written 2026-10-25. Nothing here is decided by the user yet unless it says "Decided".**
It is the standard for the neuro-design / psychological UX course (Days 9 to 16 exist; Days 1 to 8 are in the plan but not built).
It is built on the Digital Learning standard and changes only what the audit in [`docs/HASIL-BELAJAR.md`](docs/HASIL-BELAJAR.md) showed has to change.

**Items marked `OPEN` need the user's answer before anything is built on them.**

## 0. Where the rules come from

Read in this order; the first file that speaks to a question wins.

1. This file (UX-specific rules).
2. `../aion-digital-learning/DL-STANDARD.md` (v1.8), the living rulebook of the Digital Learning course.
3. `../aion-digital-learning/CLAUDE.md` (#1 to #62), the older cross-day rules; `DL-STANDARD.md` section 10 says which of them still apply.
4. `../aion-digital-learning/DOCX-EXPORT-GUIDE.md` for the Word documents.

Nothing in the DL files is copied here. When a DL rule changes, this file follows it by reference; do not add a second copy of a rule (the CS/DL folders once held a copy that drifted and contradicted the course).

## 1. What carries over from Digital Learning unchanged

| Principle | Source |
|---|---|
| The plan's own numbered items are the tasks, in the plan's order and close to its words | DL-STANDARD 1 |
| Free answers; fixed choices only where the plan offers them | DL-STANDARD 1 |
| No figure the plan does not print; anything the case needs beyond it is labelled "Case assumption" | DL-STANDARD 1, CLAUDE.md #16 |
| Checks are completeness only; nothing is marked right or wrong | DL-STANDARD 1 |
| Missing lists with jump links; buttons never truly disabled; no hard locks between sections, routes or days | CLAUDE.md #1 to #3, #6 |
| Fields grow with what is typed; writing help under every free-text field | DL-STANDARD 2 |
| Glossary one click away; "In plain words" box; every case explained down to earth | CLAUDE.md #19, #22, #46 |
| The site passes its own course: WCAG 2.2 AA, keyboard-only pass, zoom to 200 % and 400 %, automated check (axe or Lighthouse), one screen-reader pass; the result is written in the day's README | CLAUDE.md #49 |
| Cognitive load is a design constraint: less text by default, a page map, a picture before a paragraph | CLAUDE.md #28, #36, #37 |
| Progress is honest: a ring means "filled in", never "correct" | CLAUDE.md #28 |
| Adult-learner supplement (Knowles): the why first, nothing locked, formal address, no points or streaks from the site itself | CLAUDE.md #50 |
| English first. Indonesian later (user, 2026-10-25). German (as DL's EN \| DE, CLAUDE.md #32) is not scheduled | CLAUDE.md #32, decision 4 |
| Mentor tools and answer keys live in the site's mentor bar and are never exported | CLAUDE.md #7, #23 |
| One persisted store, one slice per day; one glossary; one reference list for the course | CLAUDE.md #17 (DL paragraph) |

## 2. UX-specific rules (new in this draft)

### 2.1 The plan is the source, and the audit of a day starts from it
- The day's column of the Strukturplan (sheet "hanya kurikulum Strukturplan_DE_EN_ID") is the source for every day. Write the map first: plan row → block → number of questions (DL-STANDARD 9, step 1).
- The plan's rows: Wissen · Arbeitsauftrag 1 · Arbeitsauftrag 2 · Coaching · Fallstudie · Feedbackrunde · Transferprojekt. The Feedbackrunde is a classroom session, so it becomes a facilitator card in the mentor tools, not a learner task (as in DL).
- **The plan's cases are used** (see `PLAN-MAP.md`). A day that uses other cases, as Day 10 does with real tools, records that as a deviation in its README and keeps the plan's case available. `OPEN`: see decision 2.

### 2.2 One stack, one layout, exceptions written down
- Next.js App Router, TypeScript, Tailwind, static export (`output: "export"`, `trailingSlash: true`, `basePath` from `NEXT_PUBLIC_BASE_PATH`), Zustand with `persist`. One Next.js version for the whole project, upgraded for all days at once. **Chosen 2026-10-25 (by Claude, to match `playground-dl`; can be changed for all days at once): Next 14.2.35, React 18.3.1.** The skeleton in `playground-ux/` runs on it.
- Layout at the project root: `app/ components/ lib/ data/ store/`; no `src/`.
- Library exceptions are allowed only with a reason and an entry under "Notes on deviations" in the day's README, and each needs a no-script, no-WebGL fallback that a keyboard and screen-reader user can use. Known candidates from the audit: three.js and model-viewer (Day 14, the subject is immersive technology), framer-motion and recharts (Day 9), framer-motion (Day 15). `OPEN`: see decision 5.
- A day built as its own Vite app (Day 15) is moved into the Next.js project when the day is migrated; its components are kept.

### 2.3 The day's package
The sheet "List Materi" of the Strukturplan workbook defines what a day delivers. A day is complete when it has:

| Part | Where it lives | Public repository? |
|---|---|---|
| Playground / study site | `/day/{n}/` in the project | yes |
| Main material (Word) | `materi-task-docx/` | yes |
| Task 1 to Task 4 worksheets (Word) | `materi-task-docx/` | yes |
| PPT | `materi-task-docx/` or Drive link in the README | link only if large |
| Answer keys and trainer notes | Drive, `Trainer-only/` | **never** |

Task 1 and Task 2 are Level 1 (Arbeitsauftrag 1 and 2), Task 3 is Level 2 (Fallstudie), Task 4 is Level 3 (Transferprojekt). The audit found Day 15 and Day 16 short of Task 2 to 4 in Drive; completing them is part of bringing those days up to this standard.

### 2.4 Public-repository hygiene (new, from the audit)
The organisation is public. Before any push:
- No answer keys, trainer files or model solutions that are not behind the mentor bar. The audit found three files marked "INSTRUCTOR ONLY" in the public Day 16 repository (`FLAW_INDEX.md`, `LADDER_MATRIX.md`, `PORTFOLIO_OUTCOMES.md`); they move to the mentor bar or to Drive `Trainer-only/`.
- No personal documents or personal data of the author (the audit found a CV with email and phone number in the Day 13 repository).
- No `.env`, keys or tokens. The audit found none in the eight repositories.
- The README says what the repository is, how to run it, the live link, the plan reference and the deviations.

### 2.5 Naming
| Thing | Pattern | Example |
|---|---|---|
| Repository (if a day is ever split out) | `aion-ux-dayNN-topic` | `aion-ux-day09-gamification` |
| Main repository `OPEN` | `aion-ux` | |
| Route | `/day/{n}/`, `/day/{n}/route-1/`, `/day/{n}/route-2/` | |
| Word files | `Day{N}-{Materi\|Task}-AION-UX-{topic}.docx` | `Day9-Task-AION-UX-SkillRise-...docx` |
| Case names | the plan's own | SkillRise, HealthJourney, MoveWell |

### 2.6 Quality gates (a day does not ship without these)
1. `typecheck` and `build` pass.
2. `verify:dayN` passes (a script per day that checks the plan map is complete, every question has a field, a model answer exists in EN and DE, and the export contains every answered field). The DL project already has `verify:free` and `verify:gen` to start from.
3. The accessibility pass of section 1 is done and recorded in the day's README.
4. The README lists deviations from this file.
5. Push only when the user asks; pushing to `main` deploys.

### 2.7 Day README
Title and plan reference (module, day) · what the day teaches in one sentence (the plan's `Ziel:` line) · plan map table · routes · case(s) · how to run · live link · accessibility pass result · "Notes on deviations".

### 2.8 The shape of a day: home, two routes, an Extra shelf (Decided 2026-10-25, by the user)

Taken from the Digital Learning standard (CLAUDE.md #27, #28, #30, #35 and DL-STANDARD 1, 9) and the plan's own rows. **Every day has the same places, in the same order, with the same names.** Day 9 is the reference.

| Place | URL | What it is | Plan rows it carries |
|---|---|---|---|
| **Day home** | `/day/N/` | what the day is about, the case, the two routes, what is in it for you | topic (row 3) and the day's `Ziel:` lines |
| **Route 1 · Levels 1 + 2** | `/day/N/route-1/` | Materi A, then Tasks 1 and 2 (Aufgabe 1 and 2) and the case study (Fallstudie), each as the plan's questions in fields; ends in an export | Wissen (Levels 1 and 2), Arbeitsauftrag 1, Arbeitsauftrag 2, Fallstudie |
| **Route 2 · Level 3** | `/day/N/route-2/` | Materi B, then the transfer project (Transferprojekt) as the plan's questions in fields; ends in an export | Wissen (Level 3), Transferprojekt |
| **Extra** | `/day/N/extra/` | the author's instruments and pages that match no plan item (decision 8). Present only if the day has any | none |

**The navigation bar of a day** has exactly these entries: the day (home), `1 <verb of Route 1>`, `2 <verb of Route 2>`, and `Extra` when it exists. Sub-pages (a Materi card, an interactive case, a work surface) keep the bar's entry of the route they belong to highlighted.

**Day home** (one data file per day; from DL #27, with no invented figure):
- **What today is about:** two short paragraphs, the topic in plain words, then the case(s) that run through the day, using the plan's names and facts only.
- **One story, two routes:** one tile per route with its verb, the question that route answers, and **"You finish with: <the deliverable>"**, each linking to its route. Minutes are not shown until the user decides the timetable (DL-STANDARD pending decision 1); the plan's rows are shown in order instead.
- **What's in it for you:** five to six items, each a skill the learner takes home and its pay-off at their own work outside the case, tagged with the route that teaches it; the last item names the documents. Every item must map to a route that really teaches it; the source is the plan's `Ziel:` lines.
- A field for the participant's name (used in the export file names).

**A route** (from DL #28 and #30):
- Header: Levels, verb, "You finish with: …", one line on what the route holds.
- **Materi first, then the tasks.** Materi A holds the day's concepts of Levels 1 and 2, Materi B those of Level 3, as cards that open the existing concept pages. A task is the plan's numbered questions in order, as fields (section 2.9), under the plan's own case brief.
- **A page map** (DL #28): every Materi card and every task block, one click away; a slim column on wide screens, a "Jump to" button on small ones; a block filled in carries a done mark (as text as well as colour; "filled in", never "correct").
- **A route export at the end:** "Download my answers" and "Print or save as PDF", never disabled, with the list of what is missing; the file name starts with the route's number: `1-{name}-dayN-l1l2-{deliverable}`, `2-{name}-dayN-l3-{deliverable}` (CURRICULUM-GUIDE section 7). "Clear this route" clears that route only.
- Deliverable names: Route 1 "<Topic> Analysis File", Route 2 "<Topic> Strategy Memo" (Day 9: Activation Analysis File, Activation Strategy Memo).
- **One case per task as the plan names it** (the equivalence rule, decision 2). DL merges Levels 1 and 2 on one case because its plan has one; the UX plan names a case for each of Aufgabe 1, Aufgabe 2 and the Fallstudie, so Route 1 carries those cases in the plan's order. Recorded as a deviation from DL #30.

**The Extra shelf:** a labelled page that says what it is ("not part of the tasks; nothing here is in your answers or in the missing list"), with a card per item and one line on what it does. Interactive cases that serve a task are linked from that task as its work surface and also listed here; pages that serve no task live only here. Nothing the author built is deleted (decision 8).

**What stays out of the learner's way:** the plan's Coaching and Feedbackrunde rows are classroom sessions; they become facilitator cards in the mentor tools when those exist (DL #49), not a place in the day.

**Coverage check before a day ships** (adds to 2.6): the home, both routes and (if used) Extra exist; every plan task appears in exactly one route; every Materi card of the day appears in exactly one route; every item of the home's "in it for you" list names a route that teaches it; every Extra link resolves. `verify:dayN` checks these from the day's data.

### 2.9 A task as fields

The plan's numbered questions are the task, in the plan's order and close to its words; nothing is put in front of them and no figure is invented (DL-STANDARD 1). Free-text boxes grow with what is typed; a list is one point per line; assigning to categories is one box per category (the categories are the plan's); a fixed choice only where the plan offers one. Checks are for completeness only (empty, too few lines, too short); a different choice is never "missing" and nothing is marked right or wrong. Answers are saved on the device and exported (2.8). Reference: `data/day9/tasks.ts`, `lib/day9/tasks-logic.ts`.

### 2.10 Materi is simple by default (Decided 2026-10-25, from DL #22, #35, #37, #40)

The user found the flow of a Materi card hard to follow (a card was about 900 words, 8 equal sections, no sign of what a task needs). The cure uses the existing text only; nothing is removed.

1. **Plain words first.** Each card opens with an "In plain words" box of 2 to 4 full sentences (75 words at most) and a "Why it matters" line tied to the task (2.12). Data: `data/day9/materi.ts` (`PLAIN`, `WHY`).
2. **Two parts always open:** try it (the demo) and what you can now do. Six parts are folded behind "＋ Show …" rows: the optional self-check, the story, the core idea, how it works, the balance, serious domains. One button, "Show every extra explanation", opens them all; a jump to a folded part opens it first. The text stays in the page, so find-in-page and print work.
3. **The self-check quiz is optional and never counted (Decided 2026-10-25, by the user).** The 20 multiple-choice questions (2 per card) are not a curriculum request and DL has no quiz-shaped tasks (CLAUDE.md #50); they are folded, and answering them does not make a card "read". A card is "read" only when the reader presses "Mark as read".
4. **Core and Optional by use, per route.** A card is Core if at least one task of its own route draws on it; a card no task draws on is Optional, is folded after the Core cards and carries a one-sentence reason. A Core card never depends on an Optional one, and a task may only draw on cards of its own route (DL #40). At most 7 Core cards per route.
5. **Two-way links.** A card says "Used in Task N"; a task says "Draws on: A1 · A2 …".
6. **A suggested order, never a lock.** The route's path (2.11) says what to read first; every part stays open.
7. **A card is named by route and number** (A1 to A8 in Route 1, B1 and B2 in Route 2) in the header, the page map and the tiles.

Checked by `verify:day9` (plain-words length, Core/Optional rule, "Draws on" for every task, the open and folded parts, the fold's keyboard and hash behaviour, no `completeConcept` in the card body, at most 220 visible words before the folds). Measured on `the-toolbox`: visible words 765 to about 310. Axe: 0 violations on both routes and on every card, closed and fully open.

### 2.11 A route is a path: all the cards, then all the tasks, then the export (Decided 2026-10-25, by the user)

The user did not want to leave the route page to read a card, and wanted to know "which card is this, and when do I do the task". An interleaved order (cards, task, cards, task) was tried first and replaced the same day by DL's own order (CLAUDE.md #12 and #30: one block of cards, then the task, then the export), which also matches the class rhythm of an hour of explanation and then work.

1. **A card opens where it stands.** On the route page a card is closed at first: its place on the path, its title, its plain words, why it matters, "Used in Task N" and one button, "Open card A4: demo". Open, it holds the demo and "you can now" (the other six parts are folded, 2.10). The demo is mounted only when the card is open. "Mark as read and go to <next step>" marks it, closes it and moves on. The old address `/day/9/learn/<slug>/` redirects to the card on its route page; no card has a page of its own.
2. **The page is a path of numbered steps.** Route 1: cards A1 to A7 (steps 1 to 7), Task 1 to Task 3 (steps 8 to 10), Export (step 11); Route 2: B1, B2, Task 4, Export (4 steps). Optional cards are off the path, folded at the end of the cards.
3. **The reader always knows where they are.** "Your path · N steps · about <time>" opens the page (every step a button, done steps marked with ✓); every card, task and the export says "Step n of N"; the page map and the small-screen button read "Step n of N · <code> <name> · k/N done". Nothing is locked.
4. **Draws-on links open the card in place** (`#mat-A3`), and `#t1` style links reach the task.

Checked by `verify:day9`: steps 1 to N without a gap, every card before every task, tasks in the plan's order, every Core card on the path exactly once; the route page holds no link to a separate card page. Axe: 0 violations on both routes with every card open, no duplicate ids.

### 2.12 Minutes, live "still missing" notices, and what the audit of the 62 rules added (2026-10-25)

The audit in `docs/DAY9-AUDIT-62-RULES.md` found rules that this standard had missed. Four are now part of it:

1. **Every card, task and route says how long it takes** (DL #37, CURRICULUM-GUIDE 3). The card shows "Card A2 · 5 min" and "plus about n min if you also open the extra explanations and the optional self-check"; a task shows "about 15 min" in its step label; a stage and the route show their sums, and the path panel says how the minutes add up to the hour of Materi DL plans per route (the remainder is the facilitator's discussion). The numbers are **draft estimates** in `data/day9/materi.ts` (`CARD_MINUTES`, `TASK_MINUTES`); the user's own numbers replace them.
2. **Two always-live "still missing" notices** (DL #34): one under every task block and one above Export, each entry a button that jumps to its field, gone when nothing is missing. Completeness only; the export is never blocked.
3. **Core or Optional is on the page-map pill itself**, not only in a tooltip (DL #35).
4. **"Why it matters"** is the second line of a card's plain-words box, tied to the task that draws on it (DL #22).

5. **No price, budget or cost band in the Materi** (DL-STANDARD 6; decided 2026-10-25). Effort is a judgement of **time and people**, rated Low, Mid or High or in plain sentences, with a reason; the Materi teaches how to reason about it and never prints a price, a budget or a rule that rates effort by price, not even in an example on another company. The only figures allowed are the plan's own (Task 3's budget and 12 weeks stay in the tasks). Applied to the ten cards, the layer comparator, the mechanic sandbox, the layer stack and the mechanic matrix (now "effort", with a caption that says it is a judgement, not a price). `verify:day9` scans the Materi files for `€`, budget, price, cheap, expensive, build cost and similar. Work surfaces (BudgetAllocator, MoveWell, capstone) and the mechanics reference sit on the Extra shelf and still use money; they are a separate decision.

The minutes of the other days are not decided; the hour per route is DL's figure, not the UX plan's.

### 2.13 Days 1 to 8 are built in the Neuro-UX Lab, on DL's own engine (Decided 2026-10-26, by the user)

`ux-lab/` is a focused copy of DL's engine (the free-form day: spec, kit, facilitator cards, guided tables, live missing notices, mentor bar, export, comics, simulations) with only UX days in it. Each of Days 1 to 8 follows DL-STANDARD v1.8 exactly: two routes (Route 1 = Materi A, then Task 1 with blocks 1.1, 1.2, 2.1 and the UX Analysis File; Route 2 = Materi B, then Task 2 with block 3.1 and the UX Strategy Memo), Materi and tasks kept apart, five plus three cards of 60 minutes each, the plan's questions as the tasks, every block Core, a working simulation for every product, a pixel comic on every card. A day ships only when `verify:dayN`, `verify:platforms`, the typecheck, the build and an axe pass are clean. Deviations are written in `ux-lab/README.md` per day. The lean `day1/` project is retired (it stays in git history).

### 2.14 Days 9 to 16 are rebuilt in the lab, the original stays on the Extra shelf (Decided 2026-10-28, by the user; Day 9 first)

- **The day is rebuilt on the lab engine** exactly as 2.13 says, from the plan's own row (`trainer-only/plan/dayN.txt`, read from the Strukturplan sheet). Before writing, the original is critiqued: what it does well is kept as ideas in the new Materi (in the example company's words, never on the task cases), what breaks the standard is left behind and named in the day README.
- **The original idea stays reachable**, unchanged, at `/day/N/original/`. It lives on **Route 3 · Extra** (`/day/N/route-3/`, "3 Extra" in the top bar; `components/day/OriginalExtra.tsx`, data `ORIGINALS[n].extras` in `data/course.ts`), with a card per original page grouped by the route it belongs to and a link to the whole original. The day home, Routes 1 and 2 and the course home card of a rebuilt day show only the new version (user request 2026-10-28). Route 3 is never part of a task, the missing list, the progress ring or the export (decision 8).
- **A real platform per block where one fits** (DL-STANDARD 16): the rows come only from real pages opened in the session, dated, with screenshots in `public/real/`; a block may use a different platform from the other block. `data/free/reference.ts` has `defineBlockReference` for that.
- **Show it real (user rule 2026-10-28).** When the material names a phenomenon or a flaw (a design that only wants to look good, a playful tone on a serious task, reward overload, a ranking that shames, fake urgency), the course shows a realistic, working example of it: a mock or a simulation that looks like a real, attractive product with exactly that flaw, not a grey wireframe and not only a sentence. The lab's other rules still hold: a made-up company, no invented figures presented as data, nothing marked right or wrong. Days 1 to 8 were written before this rule and are not yet revisited.

### 2.15 The day practises what it teaches (Decided 2026-10-28, by the user; Day 9 first)

Where a day's topic can be experienced, the day's own pages apply the sensible ideas of the original, so learning the material feels different on that day: not only material, but the topic at work. Day 9 (gamification): the route pages use credible gamification on the learner (named stages, a visible journey, a calm milestone message with "you can now …"), an **Inspector** that names each mechanic on the page and the lever it pulls, and an opt-in **loud version** that shows the same progress as manipulative gamification would, so the learner feels the difference. Candidates for later days are chosen from each original the same way (for example an accessibility day that lets the learner switch a barrier on, a voice day that can be spoken to), never forced.

Rules: the layer never scores answers, never marks right or wrong, never enters the missing list or the export, and counts only what the lab already counts (cards marked read, blocks complete). Anything loud or manipulative is opt-in, labelled as a demonstration, counts nothing and respects reduced motion. The layer is written down in the day README with the original idea it comes from.

### 2.16 Every interactive is a working product, not a toggle between descriptions (Decided 2026-10-29, by the user; Day 16 first, then every day)

Where an interactive can be made real, it is made real. The model is the original Day 16's **Ladder**: one made-up product (CityPass AR) built four times, concept, prototype, pilot and scalable, where each stage is a working screen with real content (a phone app with a live session log, participant numbers, real destinations, a consent step, a status line), a **gate rail** whose switches visibly damage the product when a gate is not met, **stress tests** that change what the product does (colour vision, a lost network, a declined consent, another language, load, a legal question), readouts and a go/no-go decision. A card's interactive therefore shows the thing itself working, with enough detail that a learner could test it, not a card that switches between sentences about it.

How to apply: every StateFig, slider, grid or toggle is audited against the question "could this be the real product, page, dashboard or process instead of a description of it?". If yes, it becomes a working mock with realistic content, states that change behaviour, and the failure the card names happening on screen. It stays within the lab's rules: a made-up example company, no invented figures presented as data (numbers inside a mock are labelled Case assumption), nothing marked right or wrong, opt-in for anything loud, reduced motion respected, axe clean, readable at 390 px. Purely conceptual figures (a chain of steps, a decision frame, a comparison of two approaches) may stay as they are.

### 2.17 A Materi card is as deep as the plan asks, and the depth is checked (Decided 2026-10-29, by the user; Day 1 first)

A Materi card is not finished when it names a topic of the plan's Wissen; it is finished when a learner could answer a question about that topic. Day 1 showed the gap: all 34 sub-topics of its ten Wissen bullets were present, but 11 had one sentence only (84% weighted). A one-line mention does not count as taught.

1. **Coverage map before writing.** Split each Wissen bullet of the day's plan file (`trainer-only/plan/dayN.txt`) into its sub-topics (a bullet that lists five terms is five sub-topics). Write the map into the day's README: sub-topic, card, and a level: **full** (its own block, an example and a source), **half** (named or one sentence) or **missing**. Report it as a count and a weighted percent, and never ship a day with a missing sub-topic. A day that is not yet mapped is marked "not mapped" in section 3.
2. **Every half becomes full.** A sub-topic counts as full when it has all of: (a) an explanation in plain words, (b) at least one concrete example from the day's made-up company, (c) at least one real finding, number, platform or rule with a source from the day's reference list, and (d) what it means for a screen. The usual carrier is a `DataTable` with the columns *what it is · real finding · what it means for a screen*; a figure or a working lab (2.16) may replace the table where showing it works better.
3. **Real facts are verified, not remembered.** Search the web for every number before it goes into a card, and use the exact figure the source gives. Where sources disagree (a percent that differs by site), do not print a number: write the finding without it, and say so in the day's README. A cited reference must name the work, the year, and what the card uses it for, in `data/refs/dayN.ts`. Real platforms, standards and laws are welcome where the plan's topic asks for them; made-up numbers are never presented as data (2.16).
4. **The example stays made up.** Real findings sit beside the made-up example company, never in place of it, and the task cases are not answered (CLAUDE.md #22). No € figure in the Materi.
5. **Minutes follow the depth.** A deeper card gets its time: rebalance the card minutes so Materi A and Materi B each still add up to the 60 minutes of a UE block (2.12), and update the "In plain words" picture line (`PLAIN`) to mention the new table or lab.
6. **Gates.** `verify:depth` runs with `npm run verify`: every source a card cites exists; no source key is defined on two days (the lists are merged with a spread, so a duplicate silently replaces the other); for a day listed in `DEPTH_CHECKED` every card cites at least two sources and each block at least eight different ones. A new day is added to `DEPTH_CHECKED` when its map is complete. What the script cannot check stays manual: the coverage map, the verified numbers, the axe pass (no `scrollable-region-focusable` at 390 px; the `DataTable` wrapper is a focusable region for this) and the live check after the push.

Day 1 is the reference (commit `d6b6076`): the term table with a finding per word (A1), the four neural steps with real numbers and a fovea lab (A2), prior knowledge, expectations, context and habits with evidence (A3), liking and trust in numbers (A4), and the levers that steer behaviour with their legal limits (B1). Days 2 and 3 followed on 2026-10-30; Days 4 to 16 are not yet mapped and follow on request, one day at a time.

## 3. Status of the eight existing days against this draft

**Since 2026-10-28 Days 9 to 16 run inside `ux-lab/`** as their *original idea*, at `/day/N/original/` (code in `ux-lab/original/` and `ux-lab/app/(original-*)`, moved from `playground-ux/` without content changes; `verify:original` and `verify:original-day9` check them). **Day 9's lab version is built (2026-10-28, section 2.14)**; for Days 10 to 16 the lab's own page (`/day/N/`) says that the lab version is not built yet and opens the original idea; once a day is rebuilt to this standard, its original idea stays reachable under the day's home (it is not deleted). `playground-ux/` is parked. Each of Days 10 to 16 also keeps a source copy and a `MIGRATION.md` in `legacy/dayN/` for the upgrade, and still runs on its old repository until that is archived.

`old` = still its previous form · `n/a` = not applicable. Filled from the audit; nothing is migrated yet.

| Day | Repository today | Plan map | Stack and layout | Answers in site | EN \| DE | Verify script | A11y pass recorded | Package complete |
|---|---|---|---|---|---|---|---|---|
| 9 | `aion-ux-day09-gamification` | **done**: home + Route 1 + Route 2 + Extra, 23 plan items in order inside the routes | **moved**; framer-motion replaced, recharts removed (confetti still in) | **done**: fields, missing list, HTML export | English only (decided) | **`verify:day9`** | **axe: 0 violations on 16 pages; person-run pass not done** | Tasks 1 to 4 |
| 10 | `aion-ux-day10-intelligent-interfaces` | old (own cases) | n/a (no app) | old (Word) | old | old | n/a | Tasks 1 to 4, no app |
| 11 | `aion-ux-day11-ui-voice` | old (CityHelp only) | old (Next 14) | old | old | old | old | Tasks 1 to 4 |
| 12 | `aion-ux-day12-accessibility-neurodiversity` | old | closest (Next 16, static export) | old | old | old | old | Tasks 1 to 4 |
| 13 | `aion-ux-day13-inclusive-design-patterns` | old | old (Next 14) | old | old | old | old | Tasks 1 to 4 |
| 14 | `aion-ux-day14-immersive-tech-neuroscience` | old | old (three.js) | old | old | old | old | Tasks 1 to 4 |
| 15 | `aion-ux-day15-tracking` | old | old (Vite) | old | old | old | old | one Task file and one transfer file in Drive |
| 16 | `aion-ux-day16-immersive-prototyping` | old (RealityFlow missing) | old | old | old | old | old | one worksheet in Drive |

## 4. Open decisions (the user chooses; nothing is built on either side until answered)

1. **Where the learner answers. Decided (2026-10-25, by the user).** In the site, as in Digital Learning: the plan's questions become fields, with a missing list and an export. **The Word documents are built as well** (as in DL, CLAUDE.md #53 and `DOCX-EXPORT-GUIDE.md`), because Habmann may need to collect answers, or participants may prefer paper. So a learner can answer in the site and export, or print or fill in the Word worksheet; both carry the same questions in the same order. The site is the source; the Word files are produced from it, and are built only when the user gives the signal (DL rule), never edited by hand to differ from the site.
2. **Cases: the author's or the plan's. Decided (2026-10-25, by the user): the equivalence rule below.** Comparison of the author's tasks with the plan (Days 10, 11, 16, read from the Drive worksheets):
   - **Day 11 is the same course content under other names.** Task 1 uses the plan's six categories word for word (comprehensibility, error robustness, user control, predictability, relief, trust) and the plan's task shape (describe, assign a category, a +/- reading, "For users, this could mean that ..."). Task 2 is the plan's three variants A free, B guided, C hybrid. Only the fictional case differs (CityHelp Voice transcripts instead of the plan's HomeAssist Voice and CareVoice), and two criteria (the plan adds trust and scalability, the worksheet has cost).
   - **Day 10 differs in material.** The plan gives fictional platforms (SmartAssist, CareerNavigator, CareGuide); the author's tasks use real tools (Claude, Gemini, v0, CapCut, Duolingo) and the three lenses transparency, control, recoverability. The same concepts are taught (rule-based, adaptive, learning; opportunities and risks; trade-offs under constraints), so the competence is close, the case is far.
   - **Day 16 differs in structure.** The plan has four tasks (RealityFlow, FutureInteraction Hub, NextWorld UX, transfer). The worksheet is one product (CityPass AR) at three levels, with NextWorld UX at Level 3.
   - **Rule: equivalence.** The author's case replaces the plan's case on a day when every numbered item of the plan's task can be answered on it; otherwise the plan's case is used for that task and the author's stays beside it or on the Extra shelf. The day README lists "plan item → where it is answered" under "Notes on deviations". Day 11 passes this test with small adjustments (the plan asks for 5 places and the two weakest; the worksheet asks for three impact statements). Days 10 and 16 need an item-by-item check that has not been done.
3. **Days 1 to 8. Decided (2026-10-25, by the user).** Included. They are built after all the discussion is done; until then they are placeholders in the plan map.
4. **Language. Decided (2026-10-25, by the user).** English first. Indonesian is added later. German (EN \| DE, as in DL) is not scheduled; the plan itself is German, so it is a later choice, not a gap.
5. **Libraries. Decided (2026-10-25, by the user): the recommendation below.** Why the question exists: DL keeps the project dependency-light (CLAUDE.md #9) because every extra library is something that can break on an upgrade, adds weight on phones, and, for animation, can ignore a learner's "reduce motion" setting. A UX course must pass its own accessibility rules. Recommendation:
   - **three.js and model-viewer (Day 14): keep**, as listed exceptions. The subject of the day is immersive technology and cannot be shown without 3D. Every scene needs a no-WebGL fallback with the same information as text and images (only IndustryXR has one today).
   - **framer-motion (Days 9, 15): replace** with CSS keyframes and a `prefers-reduced-motion` rule. Nothing in the plan needs a library for it.
   - **recharts (Day 9): replace** with small inline SVG charts, unless a chart turns out to need interaction the SVG cannot give; then it becomes a listed exception.
   - A library that is kept is named in the day's README with its reason.
6. **Repository form. Decided (2026-10-25, by the user).** One main repository with `/day/{n}/`, built the way `aion-digital-learning` is.
7. **Day 13 CV. Decided (2026-10-25, by the user): remove the files and rewrite the history.** What it is: the repository `aion-ux-day13-inclusive-design-patterns` contains `CV-Muhammad-Muchson-Attoyibi.docx`, the same CV as `.md`, and `build-cv.js`, the script that generates the Word file. They were added in one commit on 2026-08-01 (message "Add Word (.docx) version of the CV plus its generator script", author "Claude"), so a Claude session made them as a side task for the author. They have nothing to do with Day 13 or the course. What it costs: the repository is public, so anyone can read the author's email address and phone number there. Recommendation: remove the three files, and also remove them from the history (the repository has only 5 commits, so rewriting the history is small), then keep the CV somewhere private.
   **Done 2026-10-25.** Both branches (`claude/neurodiversity-ux-playground-kw5y5v`, the default, and `claude/cv-senior-fullstack-engineer-h6ja35`) were rewritten and force-pushed; both now point to the first course commit `ffb2cfc`, and the tree differs from the old tip only by the three CV files. A backup bundle of the old state is in the Claude scratchpad of that session, not in any repository. **Not fully gone:** GitHub still serves the old commit by its SHA (`1cfacb6`) and keeps the pull-request refs `refs/pull/1/head` and `refs/pull/2/head`, which a user cannot rewrite. Removing those needs a request to GitHub Support ("remove sensitive data", with the repository name and the two PR numbers). The email address is also on the author's other public profiles; the phone number is the part to protect.
8. **Extras that match no plan item. Decided (2026-10-25, by the user).** DL-STANDARD 1 removes an old instrument that matches no plan item; **UX does not**. Such an instrument is kept on a labelled "Extra" shelf on the day (never part of a task, never in the missing list, never in the export) instead of being deleted. This is the one place where UX-STANDARD overrides DL-STANDARD 1. Candidates from the audit: the Day 16 Portfolio Room and CityPass AR product, the Day 9 dark-pattern layer, the Day 14 3D scenes, the Day 15 measurable-vs-reliable lab, and the separate `AR Heart Anatomy` project as a linked example.
9. **Level 1 answers: mixed. Decided (2026-10-25, by the user).** What the plan says: Level 1 is "Wissen" (understand, classify, recognise); Arbeitsauftrag 1 asks for spontaneous descriptions, at least five places, assigning findings to given categories, impact sentences and a priority; Arbeitsauftrag 2 asks for an evaluation per variant, a decision, conflicts, remaining risks and a recommendation. The plan has no scoring, no "correct answer" and no "objective" wording at Level 1 (the only "Musterlösung (Kernlogik)" is in the Level 2 Fallstudie). The objective, pointed Level 1 of the author's worksheets comes from the `aion-task-design` skill, not from the plan. The rule:
   - **Every numbered plan item is in the main path.** Items that assign findings to the plan's given categories have an intended answer; the site gives a hint on request, never a score and never a red or green mark, and the learner's own choice still exports. Items that evaluate, decide, weigh risks or recommend are free text with a mentor model answer.
   - **The author's lookup questions** (for example Day 11 Task 2: "which variant has the highest comprehensibility at the lowest cost") that match no plan item are kept as practice on the day's Extra shelf (decision 8); they are not part of the task, the missing list or the export.
   - A learner who writes plain sentences is as complete as one who follows a scale (DL-STANDARD 2).

10. **Structure of a day. Decided (2026-10-25, by the user): option A.** Every day has the same places: home, Route 1, Route 2 and, where needed, Extra (section 2.8). Days 11 to 16 are rebuilt to it when they are upgraded; until then they keep their own structure.

## 5. Changelog

| Date | Change | Applies to |
|---|---|---|
| 2026-10-30 | Day 8 Materi deepened under rule 2.17: all 12 Wissen bullets now full, with verified real findings and cases (narrative thinking, transportation, goal gradient and endowed progress, Freytag, the GOV.UK one-question-per-page pattern, Nielsen and Morkes, DSA Article 25), Day 8 added to `DEPTH_CHECKED`. | Day 8 |
| 2026-10-30 | Day 7 Materi deepened under rule 2.17: all 12 Wissen bullets now full, with verified real findings and cases (Damasio, peak-end, ISO 9241-210, Norman's levels, Walter's hierarchy, Mailchimp voice and tone, dark patterns at scale, DSA Article 25), Day 7 added to `DEPTH_CHECKED`. | Day 7 |
| 2026-10-30 | Day 6 Materi deepened under rule 2.17: all 13 Wissen bullets now full, with verified real findings and cases (Gestalt origins and common region, the isolation effect, the limit of progressive disclosure, Grudin's case against consistency, the GOV.UK Design System process), Day 6 added to `DEPTH_CHECKED`. | Day 6 |
| 2026-10-30 | Day 5 Materi deepened under rule 2.17: all 12 Wissen bullets now full, with verified real findings and rules (Fitts formula, thumb target sizes, grip, WCAG 2.5.8 and 2.5.5, Hick-Hyman, progressive disclosure limit, chunking evidence, Baymard), Day 5 added to `DEPTH_CHECKED`. | Day 5 |
| 2026-10-30 | Day 4 Materi deepened under rule 2.17: all 12 Wissen bullets now full, with verified real findings and rules (intuitive equals familiar, Baymard checkout abandonment, Hick-Hyman, depth against breadth, Fitts, WCAG 2.5.8 and 2.5.5, Miller and Cowan, one-click ordering), a working example of help topics in three structures, minutes A3 13 and A5 11, Day 4 added to `DEPTH_CHECKED`. | Day 4 |
| 2026-10-30 | Day 3 Materi deepened under rule 2.17: all 12 Wissen bullets now full, with verified real findings and rules (colour effects and their limits, WCAG 1.4.1, 1.4.4, 1.4.8, 1.4.11, 1.4.12, type size and line length studies, Apple's text styles, the Google 41-blues case, 2.2 billion people with vision impairment), a line-length working example, minutes A3 13 and A5 11, and Day 3 added to `DEPTH_CHECKED`. | Day 3 |
| 2026-10-30 | Day 2 Materi deepened under rule 2.17: all 11 Wissen sub-topics and the colour-psychology topic line now full, with verified real findings (scanning, WCAG contrast, colour vision, choice overload, recognition memory, GOV.UK, Conway and Nagappan et al.), a contrast-ratio lab, minutes rebalanced to 60 and Day 2 added to `DEPTH_CHECKED`. | Day 2 |
| 2026-10-29 | New rule 2.17: a Materi card is as deep as the plan's Wissen asks. Coverage map per day (sub-topics, full/half/missing, weighted percent), every half raised to full with a plain explanation, an example, a verified real finding with source, and the meaning for a screen; minutes rebalanced to 60; new gate `verify:depth` (cited sources exist, no duplicate source key across days, minimum sources for depth-checked days). | All days; Day 1 done |
| 2026-10-29 | Day 1 Materi deepened to the plan's Wissen: every sub-topic that had only one line now has its own block with real research findings or real law and a source (A1 words, A2 neural steps with a fovea lab, A3 prior knowledge, context and habits, A4 liking, B1 steering behaviour and its limits). Shared DataTable: the scroll wrapper is a focusable, named region. | Day 1; DataTable on all days |
| 2026-10-29 | Rule 2.16 applied to all days: 57 card figures on Days 1 to 15 rebuilt as working products on a shared task lab (one task, versions to use, measures, stress tests, optional feeling scale), Day 16 card A1 as a full ladder; 9 already real; conceptual figures stay. Audit in `ux-lab/INTERACTIVES-AUDIT.md` | All days |
| 2026-10-29 | New rule 2.16: every interactive that can be real becomes a working product (model: the original Day 16 Ladder with stages, gate rail and stress tests); all days are audited, Day 16 first | All days |
| 2026-10-29 | Day 16's page panel "This lab on the ladder" removed at the user's request: the plan does not ask for it and its purpose was unclear. Day 16 has no page tool; 2.15 does not apply to it | Day 16 |
| 2026-10-29 | Day 16 rebuilt in `ux-lab/` like Day 9, closing Days 9 to 16: RealityFlow with an AR service guide and a training module on real 3D models, a real work situation and an investment proposal on untested assumptions; FutureInteraction Hub A/B/C as plans; NextWorld UX's decision board with three incomparable reports, one grid and a sorting sandbox. Fernwood cards with the ladder, a stress-testable AR corridor, seven ethical questions, a portfolio board, six signs not to scale and a tension slider. Real-platform windows (Meta Horizon Store policies in 2.1, the European Commission's AI Act page in 3.1), "this lab on the ladder" for the page tools of Days 9 to 15 (2.15), the original on Route 3 · Extra. Verify, build and axe clean | Day 16 |
| 2026-10-29 | Day 15 rebuilt in `ux-lab/` like Day 9: FocusSense as a gaze recording you replay as a scanpath, heatmap or areas of interest, with a neurofeedback curve, the learner's own explanation, real conditions and a buried consent; LearningPulse A/B/C as screens; VisionMind Lab's research board, a heatmap that falls apart once you see how it was made, and an overload score that reacts to frowning. Tessel cards with one pattern and three readings, a maturity grid and consent as design. Real-platform windows (Tobii on eye-tracking in UX tests in 2.1, the UK ICO on neurotechnology in 3.1), an opt-in attention trace of the page with a designed consent screen (2.15), the original on Route 3 · Extra with direct hash links. No camera or sensor used. Verify, platforms, typecheck, build and axe clean | Day 15 |
| 2026-10-29 | Day 14 rebuilt in `ux-lab/` like Day 9: BuildVision, HealthSpace A/B/C and IndustryXR with real 3D (new shared `ModelStage` on model-viewer, labels anchored to the model, AR on phones that support it, a picture without WebGL), the plan's clues as switches (AR against PDF, remote expert, stressful situation, weak connection, show mode), Brewline cards with flat against spatial and load in space, real-platform windows (Apple HIG Immersive experiences in 2.1, GOV.UK Service Manual discovery and alpha in 3.1), a flat-or-spatial map of the day with a self-timed find test (2.15), the original on Route 3 · Extra. Hydration fix for the Day 12 and 13 page tools. Verify, platforms, typecheck, build and axe clean | Day 14 |
| 2026-10-29 | Day 13 rebuilt in `ux-lab/` like Day 9: StudyPath, JobAccess A/B/C and LifeGuide with the plan's load factors built in (crowded start page, moving ticker, changing navigation, dense text, long forms, a countdown error), Hearth Energy cards with a stimulus dial, a predictability toggle, a readability lab and assistive technologies with real text-to-speech, real-platform windows (Home Office posters in 2.1, W3C Making Content Usable in 3.1), focus and reading tools plus a five-minute test kit for the page (2.15, practice project start), the original on Route 3 · Extra. Feedback card in the standing format, since the plan's cell repeats the case study. Verify, platforms, typecheck, build and axe clean | Day 13 |
| 2026-10-29 | Day 12 rebuilt in `ux-lab/` like Day 9: PublicAccess and CitizenConnect as portals with the plan's barriers built in (mouse-only menu, colour-only status, faint text, unhelpful errors), LearnAccess A/B/C as real lesson pages, Greenway cards with a live contrast ratio, a tab-it-yourself form and a triggered error, real-platform windows (W3C Before and After Demonstration and First Aid in 2.1, WAI Planning and Managing in 3.1), access settings and opt-in barrier glasses for the page itself (2.15), the original on Route 3 · Extra. Verify, platforms, typecheck, build and axe clean | Day 12 |
| 2026-10-29 | Day 11 rebuilt in `ux-lab/` like Day 9: HomeAssist Voice, CareVoice A/B/C and CityHelp Voice as voice assistants you can talk to (new shared `VoiceSim`: typed or spoken input, replies read aloud), the city's voice and testing architecture for Level 3, real-platform windows (Alexa Design Guide in 2.1, GOV.UK Chat in 3.1, read on 29.10.2026), a voice guide for the page that meets card A2's six requirements (2.15), the original sandbox on Route 3 · Extra. Verify, platforms, typecheck, build and axe clean | Day 11 |
| 2026-10-29 | Day 10 rebuilt in `ux-lab/` like Day 9: SmartAssist, CareerNavigator, CareGuide and the provider's intelligent UX architecture, ideas kept from the original companion page (which type is this?, why/change/undo), real-platform windows (Spotify in 2.1, YouTube in 3.1, read on 28.10.2026), show it real, a rule-based study assistant that practises why/change/undo (2.15), the original and its worksheets on Route 3 · Extra. Verify, platforms, typecheck, build and axe clean | Day 10 |
| 2026-10-28 | Asked by the user: Day 9 rebuilt in `ux-lab/` on the lab engine (SkillRise, HealthJourney, MoveWell, the provider's activation architecture), with ideas kept from the original Activation Lab after a critique, real-platform windows (NHS Couch to 5K in 2.1, Duolingo's blog in 3.1, read on 28.10.2026), and the original on an Extra shelf at the end of each route (new 2.14). New rule "show it real" (2.14). Verify, platforms, typecheck, build and axe clean | Day 9; Days 10 to 16 next |
| 2026-10-28 | Accessibility faults in the original Days 11 to 16 fixed (contrast, names that leave out the visible text, tab structure, target size; list in `ux-lab/README.md`); the intended low-contrast lesson and case examples of Days 12 and 13 stay. Deployed to https://aion-ux-lab.vercel.app | Days 11 to 16 |
| 2026-10-28 | Asked by the user: Days 9 to 16 merged from `playground-ux` into `ux-lab` as the *original idea* of each day (`/day/N/original/`, own route group, root layout and stylesheet per day, links rewritten, no content changed). The lab home shows an extra "Original idea" column on Days 9 to 16; the lab day page opens it, and keeps doing so after the day is rebuilt. Typecheck, all verify scripts, the build (static export) and a page-by-page check in the browser are clean; `playground-ux` is parked | Days 9 to 16 |
| 2026-10-26 | Day 2 built in `ux-lab/` to the DL standard (CityDesk, EduFlex, CampusNow); verify, platforms, typecheck and axe clean; linked from `playground-ux` | Day 2 |
| 2026-10-26 | Day 3 built in `ux-lab/` to the DL standard (TravelEase, HealthConnect, SecureLife); verify, platforms, typecheck and axe clean; linked from `playground-ux` | Day 3 |
| 2026-10-26 | Day 4 built in `ux-lab/` to the DL standard (ServicePoint, WorkFlow Hub, MyEnergy); verify, platforms, typecheck and axe clean; linked from `playground-ux` | Day 4 |
| 2026-10-26 | Day 5 built in `ux-lab/` to the DL standard (BankDirect, AdminFlow, MoveEasy); verify, platforms, typecheck and axe clean; linked from `playground-ux` | Day 5 |
| 2026-10-26 | Day 6 built in `ux-lab/` to the DL standard (OfficeSphere, CareAssist, CitizenFlow); verify, platforms, typecheck and axe clean; linked from `playground-ux` | Day 6 |
| 2026-10-27 | Day 7 built in `ux-lab/` to the DL standard (WellTrack, CareerPath, LifeSupport); verify, platforms, typecheck and axe clean; linked from `playground-ux` | Day 7 |
| 2026-10-27 | Day 8 built in `ux-lab/` to the DL standard (StartSmart, FutureSkills, GreenHome); verify, platforms, typecheck and axe clean; linked from `playground-ux` | Day 8 |
| 2026-10-26 | Decided by the user: Days 1 to 8 are built in `ux-lab/` on DL's engine, to DL's writing standard, two routes and Materi apart from the tasks (new 2.13). Day 1 built and checked (verify, platforms, typecheck, build, 0 axe violations); `day1/` retired; `playground-ux` links each built day to the lab (`NEXT_PUBLIC_UX_LAB_URL`) | Days 1 to 8 |
| 2026-10-25 | Draft v0.1 written from the audit of Days 9 to 16 and from DL-STANDARD v1.8 | all |
| 2026-10-25 | Decided: instruments that match no plan item are kept on an "Extra" shelf, not removed (decision 8; overrides DL-STANDARD 1 for UX) | all days |
| 2026-10-25 | Decided: learners answer in the site (DL model) and the Word documents are produced too, for collection or paper (decision 1) | all days |
| 2026-10-25 | Decided: Days 1 to 8 are included, built after the discussion (decision 3); English first, Indonesian later (decision 4) | all days |
| 2026-10-25 | Days 10 to 16 copied to `legacy/dayN/` with a `MIGRATION.md` each (migrate and upgrade one day at a time); instructor-only Day 16 files moved to `trainer-only/` (git-ignored) | Days 10 to 16 |
| 2026-10-25 | Days 10 to 16 wired into `playground-ux/` as they were built (user chose to see the whole platform first, upgrade later): one route group and root layout per day, one compiled stylesheet per day, Day 15 mounted client-side, Day 10 as a companion frame plus worksheets | Days 10 to 16 |
| 2026-10-25 | Day 9 brought further towards the DL standard: writing help under every question, glossary, mentor bar with model answers (Task 3 from the plan, Tasks 1, 2, 4 drafts), automated accessibility pass (0 axe violations) with fixes; audit in `docs/DAY9-VS-DL-STANDARD.md` | Day 9 |
| 2026-10-25 | Day 9 rebuilt to the shape of section 2.8: home, Route 1 (Levels 1 + 2), Route 2 (Level 3), Extra; tasks moved into the routes; per-route export and page map; `verify:day9` checks the shape | Day 9 |
| 2026-10-25 | Decided: every day has a home, Route 1 (Levels 1 + 2), Route 2 (Level 3) and an Extra shelf (sections 2.8 and 2.9, decision 10) | all days |
| 2026-10-25 | Day 9 upgraded: the plan's 23 items as fields with completeness check and export, framer-motion replaced by an in-repo Web Animations helper, recharts removed, `verify:day9` added | Day 9 |
| 2026-10-25 | Skeleton `playground-ux/` built with Day 9 as the reference day (Next 14.2.35, React 18.3.1, root layout, static export, `verify:course`); not pushed | Day 9 |
| 2026-10-25 | Decided: one main repository (6); equivalence rule for cases (2); 3D kept and animation libraries replaced (5); CV removed with history rewrite (7). Decided: Level 1 answers are mixed (9) | Days 9 to 16 |
| 2026-10-25 | Decided by the user: stop reshaping Day 9; build **Day 1 fresh and focused, close to DL's latest standard, as a small stand-alone project** (`day1/`) rather than forking the whole DL engine or extending `playground-ux`. DL's own order is used (all Materi, then the tasks, then one export); the DL look (Ocean tokens) is copied; the plan's questions are the tasks; every block and card is Core | Day 1 |
| 2026-10-25 | Day 1 linked from the old site: `/day/1/` in `playground-ux` shows the cases, a link and a frame of the new Day 1 (`day1/`, port 3300, address set by `NEXT_PUBLIC_DAY1_URL`); both stay under `aion-ux/` and will be merged into one project when Day 1 is finished | Day 1 |
| 2026-10-25 | Materi rewritten without prices or budgets (DL-STANDARD 6): effort is time and people with a reason; euro bands, "build cost", "cheapest" and "per euro" gone from the ten cards, the comparator, the sandbox and the diagrams; `verify:day9` scans for them (2.12 item 5) | Day 9 |
| 2026-10-25 | Decided by the user: Materi first, then all tasks (DL's own order, replacing the interleaved path), and the 20 self-check quiz questions are folded as optional and never counted; a card is read only by the reader's button (2.10, 2.11) | Day 9 |
| 2026-10-25 | Audit of Day 9 against all 62 DL rules (`docs/DAY9-AUDIT-62-RULES.md`): minutes on cards, tasks and routes (draft estimates), live "still missing" notices, Core/Optional on the map pill, "Why it matters" on each card (new 2.12) | Day 9 |
| 2026-10-25 | Route as a path (new 2.11): cards open in place on the route page, closed at first; steps numbered across the route with each task right after the cards it needs; old card addresses redirect; `verify:day9` checks the path | Day 9 |
| 2026-10-25 | Materi made simple (new 2.10): plain-words box, three parts open and five folded, Core/Optional by use per route, two-way "Used in" / "Draws on" links, suggested order; `verify:day9` checks it; 0 axe violations | Day 9 |
