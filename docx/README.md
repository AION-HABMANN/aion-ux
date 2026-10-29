# AION UX Developer · Materi, Task and Trainer documents, Day 1 to Day 16

Word documents for the course, built in the same format as the Digital Learning documents (`../../aion-digital-learning/materi-task-docx/`): one **Materi**, one **Task** and one **Trainer** file per day, 48 files. Their content comes from the Neuro-UX Lab itself (`../ux-lab`, live at https://aion-ux-lab.vercel.app/), so the documents and the website cannot drift apart.

| Document | What it holds | Who has it |
|---|---|---|
| `DayN-Materi-…docx` | Cover, AI notice, version and approval, "Day at a glance" (lesson plan UE1 to UE10), contents, **Materi A** (Route 1, five cards, about 60 min), **Materi B** (Route 2, three cards, about 60 min), "Use in class", references, glossary. Every card: scan line, "In plain words", the picture of the lab, tables with real findings and sources, the rules for the task, an optional deeper reading. | Participants |
| `DayN-Task-…docx` | The case, the evidence (screenshots of the lab: the products, the mailbox of the desk, the observe panels, the real-platform reference), **Task 1** (Blocks 1.1, 1.2, 2.1) and **Task 2** (Block 3.1) with answer boxes and tables. No answer keys, no scores. | Participants |
| `Trainer-only/DayN-Trainer-…docx` | Assessment criteria, model answers of every block, coaching (UE4), the facilitator's questions and answers, the feedback round (UE7), the move from Level 2 to Level 3, debrief scripts. | Trainer only |

Names: `Day{N}-{Materi|Task|Trainer}-AION-UX-Developer-{topic or case}.docx`. English only; Ocean layout of the DL documents. Version 1.0, release date 29.10.2026, reviewer and approver Muhammad Muchson (values in `_tools/release.py`). Every picture carries an AI label on the image.

## Where the content comes from

| Part | Source |
|---|---|
| Cards (text, tables, rules, deeper reading), "In plain words", sources, glossary | `ux-lab/components/dayN/Cards.tsx`, `ux-lab/data/dayN/materials.ts`, `ux-lab/data/refs/dayN.ts`, `ux-lab/data/gloss/dayN.ts`, dumped by `ux-lab/scripts/dump-docs.ts` |
| Cases, blocks, questions, steps, model answers, criteria, facilitator Q&A | `ux-lab/data/dayN/free.ts` (the same spec the website runs on) |
| Coaching and feedback round | The plan (`../trainer-only/plan/dayN.txt`), rendered in English in `_tools/plan_en1.py` to `plan_en3.py`. Days 11 to 14: the plan gives only part of the cell; the file says so in a note. |
| Pictures | Screenshots of the built site, `_tools/capture-figures.mjs` (starting state of each working example; the desk and observe dialogs one picture per mail or tab) |

The case study of the plan is **2 UE (UE5–6)** and the transfer project **3 UE (UE8–10)**. The lab has Blocks 1.1, 1.2, 2.1 (Task 1) and 3.1 (Task 2); the lesson plan in `_tools/ablauf.py` follows that.

## Rebuild

```bash
cd ux-lab
npx next build                                   # then serve out/ on port 4400, for example with the scratch server
npx tsx scripts/dump-docs.ts ../docx/_work/dump.json
cd ../docx
python _tools/make_data.py                       # glossary.py, refs.py, _work/meta.json
node _tools/capture-figures.mjs http://localhost:4400 _figures      # about 30 minutes for 16 days
python _tools/crop_figures.py                    # crops the dialog pictures
python _tools/make_docs.py [day ...]             # _source/dayN-{materi,task,trainer}.md
python _tools/build_all.py [day ...]             # the .docx files
sh _tools/preview.sh <file.docx> <outdir> 50     # LibreOffice + pdftoppm page images
```

`_source/` (Markdown, can be edited by hand until the next `make_docs.py` run) is the source of truth of each file; `_figures/` and `_work/` can be regenerated and are not committed.

## Open points

- The Trainer documents use the lab's model answers; the plan's own model solution cell (German, long) is not reproduced word for word.
- The "mailbox" pictures show the first screen of each mail only where a mail is longer than the dialog; read the full text in the lab.
- Pictures of the working examples show their starting state; the stress tests and the other versions are used in the lab.
- The approver must read the documents before they go out; the AI notice wording is the one of the DL documents.
