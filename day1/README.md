# Day 1 · Psychological UX design and neuro design (fresh, to the Digital Learning standard)

A small, stand-alone Next.js site (static export, no backend) for **Day 1 of the UX course only**. It is built to the rules of
`aion-digital-learning` (`CLAUDE.md` #1 to #62 and `DL-STANDARD.md` v1.8), in the DL "Ocean" look, but it does not copy DL's
engine: it is about 3,000 lines you can read in one sitting. Days 9 to 16 stay in `../playground-ux` and are not touched.

## Run

```bash
npm install
npm run dev          # http://localhost:3300
npm run verify:day1  # the plan and the standard, checked from the data
npm run typecheck
npm run build        # static site in out/
```

## What is here (round 1)

| Plan row | On the site |
|---|---|
| Wissen (UE1), 10 bullets | **Materi A**, 5 cards (Route 1) and **Materi B**, 2 cards (Route 2), each with "In plain words", "Why it matters", the plan's bullets, rules, sources, minutes, "Mark as read" |
| Arbeitsauftrag 1 (UE2) | Block **1.1** CarePath, 5 questions |
| Arbeitsauftrag 2 (UE3) | Block **1.2** SkillFlow, 5 questions |
| Fallstudie (UE5-6) | Block **2.1** SafeHome Online, 5 questions |
| Transferprojekt (UE8-10) | Block **3.1**, 7 questions (Route 2) |
| Coaching (UE4), Feedbackrunde (UE7) | **Facilitator cards**, hidden until the mentor passcode; no fields, not in the missing list or the export |

- **Home**: what today is about, one story and two routes with "You finish with", what's in it for you, the plan's rows as the agenda.
- **Routes**: Materi first, then the tasks, then one export (`1-{name}-day1-l1l2-neuro-ux-analysis.html`, `2-{name}-day1-l3-neuro-ux-strategy.html`).
- **Every question**: the plan's wording, a caption, "Draws on" links to its cards, a collapsed "how to build the answer", an example answer on another company, a live "still missing" notice under the block and above Export, and (mentor only) a model answer.
- **Rules kept**: no locks; buttons never disabled; completeness-only checks (a different choice is never missing); fields grow with the text; plain-language glossary (22 terms); page map with Core on the pill; no price or budget in the Materi; every block and card is Core.

## Honest limits (read before a course run)

1. **Minutes are draft estimates** (12 min a card, tasks 15, 15, 20, 20). They are not agreed with the facilitator.
2. **Model answers are drafts**, except block 2.1, which follows the plan's own Musterloesung. The plan gives none for 1.1, 1.2 and 3.1; they need your review.
3. **Sources are real, well-known works** but have not been checked against the originals; verify before a run (CURRICULUM-GUIDE 4).
4. **The three cases are the plan's three different scenarios** (CarePath, SkillFlow, SafeHome). DL merges cases into one company; that choice is open.
5. **Not built yet (round 2 and 3):** the working simulations of CarePath, the three SkillFlow variants and the SafeHome portal; real pictures and the comic on each card; the "known and open" box and the "if a participant asks" card for each case; the guided table; the German version; Word documents (only on your signal); a person-run keyboard, zoom and screen-reader pass.
6. Automated accessibility pass (axe, WCAG 2.2 AA tags) found 0 violations on both routes with every fold open, the mentor tools unlocked and a glossary note open; no horizontal scroll at 375 px.

## Mentor passcode

`muchson123` (a convenience gate, not security). "Fill all model answers" fills every block of both routes.
