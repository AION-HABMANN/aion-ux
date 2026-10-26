# Day 9 against the Digital Learning standard (v1.8)
> **Superseded 2026-10-25 by `DAY9-AUDIT-62-RULES.md`**, which goes through all 62 rules of DL's `CLAUDE.md` and the unnumbered rules of `DL-STANDARD.md`. This shorter list missed the minutes, the live missing notices, the rule against prices and budgets in the Materi, and the 4-to-5-cards rule.


Status on 2026-10-25. Source of the requirements: `../../aion-digital-learning/DL-STANDARD.md` (sections 1 to 9) and the rules of `CLAUDE.md` it keeps (#1 to #3, #6, #7, #19, #22, #23, #27, #28, #30, #49). "Done" means built and checked here; "Not done" means it does not exist yet. Nothing in this table is claimed for Days 10 to 16.

## What Day 9 meets

| Requirement | Where | How it was checked |
|---|---|---|
| The plan's numbered questions are the tasks, in the plan's order, free answers (DL 1) | `data/day9/tasks.ts`: 23 items | `verify:day9` (counts, order, categories, case names) |
| No figure the plan does not print; no Optional blocks (DL 1) | the tasks use only the plan's case facts | by reading; `verify:day9` checks the counts the plan prints |
| Checks are completeness only; a different choice is never "missing" (DL 1) | `lib/day9/tasks-logic.ts` | `verify:day9` (including a different choice) |
| Boxes grow with what is typed (DL 2) | `AutoTextarea` in `TaskSection.tsx` | in the browser |
| "How to build the answer" under every question (DL 2) | `HELP`, 23 entries, collapsed | `verify:day9` (one per item, none repeats a model answer) |
| Mentor bar, passcode, fill all, clear this route, jump to export, lock (CLAUDE.md #7) | `MentorBar.tsx`, `mentor-store.ts` | in the browser: wrong code, right code, fill leaves 16 of 16 complete in Route 1 |
| Mentor model answer for every field, never exported (CLAUDE.md #23) | `KEY`, 41 fields; Task 3 from the plan's Musterlösung, Tasks 1, 2, 4 are **drafts** | `verify:day9` (covers every field, fill leaves nothing missing, export never imports it) |
| Missing list with jump links; export never disabled (CLAUDE.md #1 to #3) | `RoutePage.tsx` | in the browser |
| No hard locks (CLAUDE.md #6) | nothing is locked; the mastery "locked" badges are only dimmed by a grey filter | by reading |
| Home with "What today is about", "One story, two routes", "What's in it for you" (CLAUDE.md #27) | `data/day9/intro.ts` | `verify:day9` (every item names a real route; the last names both documents) |
| Two routes, each ending in its own export with the route number in the file name (CLAUDE.md #30) | `data/day9/routes.ts` | `verify:day9` (file names) |
| Page map on every route (CLAUDE.md #28) | `PageMap.tsx` | in the browser at 1400 px and 1024 px |
| Plain-language glossary, one click from each term (CLAUDE.md #19) | 18 terms in the task texts | `verify:day9` (every term is used) |
| Static export, one stack, no animation or chart library (DL 7, CLAUDE.md #9) | Next 14, `motion-lite.tsx`; `canvas-confetti` still on the capstone | `typecheck`, `build`, `verify:day9` |
| WCAG 2.2 AA, automated check (CLAUDE.md #49) | axe-core 4.14, tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`: **0 violations** on all 16 Day 9 pages (home, both routes, Extra, studio brief, learn, a concept page, playground and its three cases, capstone, progress, inspector) and on Route 1 with the mentor fill, every help and model answer open, and a glossary note open | run in the browser pane; findings fixed: text contrast of four accent colours (new `-text` tokens), a radio group built as a list, a map of links marked as an image, links whose name did not contain their visible number, progress rings without a name, and dimming used to show "locked" |
| Skip link, `lang`, visible focus, reduced motion | `AppShell.tsx`, `motion-lite.tsx` | in the browser; axe |

## What Day 9 does not meet yet

| Requirement | Status | Note |
|---|---|---|
| An example answer on a different company under every free-text field (DL 2, #23) | **Not done** | 23 short worked examples to write |
| Guided table, "Not sure how to fill this in?" (DL 2, 15) | **Not done** | |
| "In plain words" box that opens each Materi card (CLAUDE.md #22) and the glossary inside the Materi pages | **Done** (2026-10-25) | every card opens with an "In plain words" box (2 to 4 sentences); the glossary still glosses the task texts, not yet the card bodies |
| Case gap audit: close the logic holes of a case without adding a figure (DL 14) | **Not done** | the tasks use the plan's brief as printed |
| Working simulations and real pictures of the platforms (DL 4, 5) | **Different approach** | Day 9 has its own interactive cases (the playground) linked as work surfaces; they are not DL-style mock platforms |
| Story comics on the cards (DL 13) | **Not done** | |
| Facilitator card for the Coaching and the Feedbackrunde rows (DL 3) | **Not done** | the plan's rows exist; the card is hidden until the mentor passcode in DL |
| Keyboard-only pass, zoom to 200 % and 400 %, one screen-reader pass (CLAUDE.md #49) | **Not done** | axe cannot test these; they need a person |
| Persisted state: version bump and a tested old blob (DL 7) | **Partly** | the tasks store has version 1; there is no older shape to migrate yet |
| EN and DE | **Decided: English first** | Indonesian later |
| Word documents | **On the user's signal** | |
| One store and one palette for the whole course | **Not done** | Day 9 keeps two small stores and its own tokens |
| The Materi read against the plan's Wissen bullets one by one (DL 6) | **Not done** | the 10 concept modules are mapped to the 12 Wissen bullets only by their `curriculumRef` |

## Things to know

- **The model answers are readable by anyone.** They are in the page's JavaScript behind a passcode that is also in the code (CLAUDE.md #7: "a convenience gate, not security"). That is the DL standard. If Day 9 is ever used for assessment where a participant must not see a model answer, the key has to move out of the public site.
- **Three of the four model answers are drafts.** Only Task 3 follows the plan (its Musterlösung). Tasks 1, 2 and 4 were written from the case facts and must be reviewed before they are relied on; the mentor panel says so on screen.
- axe finds roughly a third of accessibility problems; "0 violations" is not "accessible". The remaining checks in the table above need a person.
