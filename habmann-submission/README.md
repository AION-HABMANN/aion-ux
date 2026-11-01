# Habmann submission, Days 1 to 16

One folder per day, named after the four items in Habmann's e-mail (2026-11-01). Deadlines: **Days 1-8 by 2 November 2026, Days 9-16 by 3 November 2026**, to `blockstart_dozent@habmann.info`.

| File in each `DayNN/` | Habmann's item | Source |
|---|---|---|
| `1_Wissenstransfer-Slides_DayNN.pptx` | Slides for knowledge transfer (theory) | every card of Materi A and B (`docx/_source/dayN-materi.md`), 44-51 slides |
| `2_Praktische-Aufgaben_DayNN_<Case>.docx` | Practical application tasks | the Task document (Task 1 and Task 2, with the transfer project) |
| `3_Trainingsfolien_DayNN.pptx` | Training slides | lesson plan UE1-10, the task blocks, coaching (UE4), case briefing, feedback round (UE7), transfer brief; 19 slides |
| `4_Fallstudie_DayNN_<Case>.docx` | Block-specific case study | Part 2 of the Task (UE5-6), as its own document |
| `Dozent-intern/Trainer-Musterloesung_DayNN_<Case>.docx` | not requested; the plan's "Musterlösung" | model answers; **do not give to participants** |

Rules from the e-mail and how they are met: every picture is a screenshot of the Neuro-UX Lab with its AI label on the image and a source line under it; AI-assisted content is stated on the closing slide and on the document cover; sources are listed on the "Sources" slides. The HUI master template and logo are optional and not used. Language: English, like the Word documents.

Rebuild: `python _build/build_decks.py`, `python _build/make_casestudy.py`, `python _build/collect.py` (needs `../docx/_work` and `../docx/_figures`).
