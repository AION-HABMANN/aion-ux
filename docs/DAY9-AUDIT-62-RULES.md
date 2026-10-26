# Day 9 against the 62 rules of Digital Learning (audit of 2026-10-25)

Source: `aion-digital-learning/CLAUDE.md` (#1 to #62) and `DL-STANDARD.md` v1.8, read in full for rules #49 and #50 and the standard, and rule by rule for the rest. This replaces the shorter list in `DAY9-VS-DL-STANDARD.md`, which missed the minutes, the live missing notices, the price rule and the 4-to-5-cards rule.

Status: **Met** it is built and checked; **Partly** some of it; **Not done**; **n/a** the rule does not apply to Day 9 (calculations, other courses, Word, German) or is overridden by DL-STANDARD 10; **Decision** it needs your choice first.

Fixed in the same pass as the audit: #22 part 2, #28, #34, and the minutes of #37 and CURRICULUM-GUIDE 3. Then, by your decision: Materi first and all tasks after it (#12, #30), the 20 quiz questions folded as optional and not counted (#50, #38), and the Materi rewritten without prices or budgets (DL-STANDARD 6). The counts below are after those fixes.

**Count of the 62:** Met 19 · Partly 17 · Not done 7 · Decision 1 · n/a 18. Applicable rules: 44.

| # | Rule | Status | Day 9 today |
|---|---|---|---|
| 1 | Never show a generic 'missing' message | Met | The missing list names each question (`allMissing`), no generic text. |
| 2 | Every 'missing' item is clickable and jumps there | Met | `jumpTo` on every entry of the export block's list. |
| 3 | Primary buttons are never truly disabled | Met | Download and print are always clickable. The only `disabled` is a settled self-check option. |
| 4 | Check on demand, clue not answer | Partly | The self-check quiz is now optional, folded and never counted; it gives a hint, never the answer, but reacts at once on a click (no 'Check' button). The tasks have no placement exercise. |
| 5 | Undo/redo on placement exercises | Partly | Not verified for the drag demos (`MechanicSandbox`, `ThreePanelComparator`); the tasks have no placement. |
| 6 | No hard locks | Met | Nothing is locked; the path is a suggestion. |
| 7 | Passcode-gated mentor fill | Met | `MentorBar`, passcode in `mentor-store.ts`; fills the model answers. |
| 8 | Field instructions under the label | Met | Each question has a hint under its prompt and a writing help under its field. |
| 9 | Stack conventions | Met | Next 14 static export, Zustand persist, hydration guard. |
| 10 | Verify before done | Partly | tsc, build, `verify:day9`, axe and a browser run each time. A run from a clean `localStorage` of the new card path is not recorded. |
| 11 | Every question traces back to the Materi, with a clickable reference | Partly | Each task says 'Draws on A1 A2 A3' with links. DL does it per question and gives every card section decision rules ('How to decide'); Day 9 has neither. |
| 12 | Three routes per day | n/a | Replaced by #30. |
| 13 | Triage then escalate | n/a | Overridden for tasks (DL-STANDARD 10). |
| 14 | Shared grid, coarse buckets | n/a | Overridden for tasks. |
| 15 | Visual identity (Ocean palette) | Decision | Day 9 keeps its own theme and its own site gamification (XP bar, level, streak). DL: no points, streaks or badges from the site itself. The UX palette is not decided. |
| 16 | FIND IT line, OBJECTIVE/JUDGED pill | Partly | No FIND IT line; the 'Work surface' link is the nearest. Pills not used (tasks are free text). |
| 17 | Repository conventions | n/a | UX has one main repository (decision 6). |
| 18 | Precedence of the prompt | n/a | Process rule. |
| 19 | Plain-language glossary | Partly | 18 terms, glossed in task texts. Not yet inside the card bodies. |
| 20 | 'What this shows' reading on every control | Met | `DemoFrame` shows a brief and an insight line for each of the 10 demos. Not re-read control by control. |
| 21 | 'Numbers you need' for calculations | n/a | The plan asks for no calculation on Day 9. |
| 22 | 'In plain words' box with three parts | Partly | Parts 1 and 2 done (plain words, why it matters, tied to the task; fixed after this audit). Part 3, how to read the picture, is the demo's own brief and sits inside the opened card, not in the box. |
| 23 | A mentor worked answer for every question | Partly | All 23 items have one. Task 3 follows the plan's Musterloesung; the drafts for Tasks 1, 2, 4 are not reviewed by you, and there is no example answer on another company. |
| 24 | Every calculation taught | n/a | No calculation. |
| 25 | Assigning categories needs profiles and a per-cell worked example | Not done | Task 1 item 3 (6 categories) and Task 3 item 2 (6 categories) have neither. |
| 26 | Automatic calculator | n/a | No calculation. |
| 27 | Home: what today is about, what's in it for you | Met | `INTRO` on the day's home page. |
| 28 | Page map on the right, Core/Optional always visible | Met | Map shows every card and task; 'Core' or 'Optional' is on the pill itself and in the small-screen list (fixed after this audit). |
| 29 | The Friday day | n/a | No Friday form for UX. |
| 30 | Two routes, export names | Met | Route 1 (L1+L2) and Route 2 (L3); file names `1-{name}-day9-l1l2-activation-analysis`, `2-...-l3-activation-strategy`. |
| 31 | Word documents | n/a | Only on your signal (decision 1). |
| 32 | EN | DE | n/a | English first, German later (decision 4). |
| 33 | Credible video as a supplement | Not done | None. Only where a credible video really exists; needs research. |
| 34 | Two always-live rust 'still missing' notices | Met | One live notice under every task block and one above Export, each entry clickable, gone when nothing is missing (fixed after this audit). |
| 35 | Core and Optional | Met | Core = a task of the route draws on the card; Optional folded with a reason (UX-STANDARD 2.10). All task blocks are Core (DL-STANDARD 1). |
| 36 | A picture beats a paragraph; 'Walk me through it' | Partly | Ten interactive demos. Replaced by comics in #54; the static diagram is folded. |
| 37 | Less text by default; minutes always visible on a card | Partly | Folds, plain words, why it matters and minutes (5 min a card, draft estimates) done, and all the cards come before the tasks, as in DL. Sources line on a card: missing. |
| 38 | Decisions are free | Met | A different choice is never 'missing'; only completeness is checked. |
| 39 | A live document sits at the bottom and can be hidden | Not done | Task 4 is a memo, but the document only exists in the export. No live memo with 'Hide the memo'. |
| 40 | Core never depends on Optional | Met | Checked by `verify:day9` (a task may draw only on cards of its own route). |
| 41 | Assumption questions point at their clues | n/a | No assumption question on Day 9. |
| 42 | Every field carries its own clue kit | Partly | Writing help under each field; no per-field clue kit gathering the facts the field needs. |
| 43 | Numbers written into a decision get a method | n/a | No numbers asked. |
| 44 | Follow the curriculum; numbers only where it asks | Met | The 23 items are the plan's. Budget and weeks are the plan's own case facts. |
| 45 | Case-study prioritisation block | n/a | Plan has no scoring formula on Day 9. |
| 46 | Explain every item down to earth | Partly | Plain words, glossary and writing help; the cards' own bodies are not re-read against this. |
| 47 | Level 3 decision frame with a live panel | n/a | Overridden (DL-STANDARD 10). |
| 48 | Day 13 to 16 form | n/a | No. |
| 49 | DL adaptation: WCAG 2.2 AA, own course, mock platform with hotspots | Partly | axe 0 violations, no horizontal scroll at 375 px. Person-run keyboard, zoom and screen-reader pass not done. The cases are the author's own instruments, not one-to-one from the plan's clues. |
| 50 | Plan fidelity: cards = the plan's topic groups, 4 or 5 per day, nothing the plan does not name | Not done | Day 9 has 10 cards (8 in Route 1). Not checked against the Wissen cell. Cards add 'serious domain' and 'works / backfires' parts the plan does not name. Facilitator cards for Coaching and Feedbackrunde not built. |
| 51 | Write to explain: context first | Partly | Plain words follow it; the card bodies are not audited. |
| 52 | Real pictures | Partly | Demos are real pictures; the folded diagrams are static. |
| 53 | Word documents (Habmann revision) | n/a | Only on your signal. |
| 54 | Story comics on every study card | Not done | No comics. Heavy to build (4 to 5 drawn panels per card, 10 cards); needs your decision. |
| 55 | Writing help on every free-text field | Met | `WritingHelp` on every question that needs it. |
| 56 | Route 2 free number of decisions | n/a | Overridden. |
| 57 | Free-form tasks that follow the curriculum | Met | Yes (see #44). |
| 58 | Fields grow with what is typed | Met | `AutoTextarea` in `TaskSection.tsx`. |
| 59 | Checklist for rebuilding a day | Partly | Followed up to step 5; steps for the case gap audit and guided tables not done. |
| 60 | Every platform and case artefact is a working simulation | Partly | SkillRise, HealthJourney, MoveWell exist as playgrounds; not built one-to-one from the plan's clues, and they carry a budget allocator the plan does not ask for. |
| 61 | Gap audit of the case | Not done | No 'known and open' box, no facilitator Q&A card. |
| 62 | Guided table | Not done | Not built. |

## Rules from DL-STANDARD and CURRICULUM-GUIDE that CLAUDE.md does not number

| Where | Rule | Status | Day 9 today |
|---|---|---|---|
| DL-STANDARD 6 | No price, budget or effort-by-price in the Materi | Met | Rewritten 2026-10-25: effort is time and people with a reason in the ten cards, the comparator, the sandbox and the diagrams; `verify:day9` scans for price words. Still using money: the work surfaces (BudgetAllocator, MoveWell, capstone) and the mechanics reference on the Extra shelf, and the plan's own EUR 150,000 inside Task 3, which is allowed. |
| DL-STANDARD 3 | Facilitator card for Coaching and Feedbackrunde | Not done | Not built; the two plan rows are not on the site. |
| CURRICULUM-GUIDE 3 | Minutes on every card, about 60 min of Materi per route | Partly | Every card (5 min), task (15, 15, 20, 20) and route has minutes, as draft estimates (fixed after this audit). Route 1 Materi adds up to 35 min; Route 2 to 10 min, far under the hour DL plans, so its remainder is the facilitator's discussion. Needs your numbers. |
| CURRICULUM-GUIDE 4 | Every card carries at least one real source | Not done | Only the plan's reference line; no source with a figure or a named framework. |
