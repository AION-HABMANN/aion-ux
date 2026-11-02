"""
Builds the stand-alone case-study Word document of each day (Strukturplan UE5-6, "Fallstudie") from the Task source of the Neuro-UX Lab.
It takes Part 2 of dayN-task.md (the case study block with its questions and picture), puts it under its own cover, and renders it with the
same engine as the other documents (docx/_tools/md2docx.py).

Usage: python make_casestudy.py [day ...]      (default: 1 to 16)   writes docx/_source/dayN-case.md and docx/_work/dayN-case.docx
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DOCX = os.path.normpath(os.path.join(HERE, "..", "..", "docx"))
sys.path.insert(0, os.path.join(DOCX, "_tools"))

import md2docx  # noqa: E402
import release  # noqa: E402

META = json.load(open(os.path.join(DOCX, "_work", "meta.json"), encoding="utf-8"))


def split_front(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    fm = {}
    for line in m.group(1).split("\n"):
        k, _, v = line.partition(": ")
        fm[k] = v
    return fm, m.group(2)


def build(day):
    src = os.path.join(DOCX, "_source", f"day{day}-task.md")
    fm, body = split_front(open(src, encoding="utf-8").read())
    a = re.search(r"^# Part 2 ·.*$", body, re.M)
    b = re.search(r"^# Task 2 ·.*$", body, re.M)
    part = body[a.start():b.start()].strip()
    case = META[str(day)]["case"]
    fm.update(
        doc="task",
        footer=f"UX Developer · Day {day} · Case study · v{release.VERSION} · {release.RELEASE_DATE}",
        kicker=f"DAY {day} · CASE STUDY · LEVEL 2 · 2 UE (UE5–6)",
        title=f"{case}: Case study",
        subtitle="The day's Level 2 case study with its questions; work on it alone, then compare in your group",
        doctype="Case study (worksheet with answer spaces) for the 2 teaching units UE5–6.",
        route="Level 2 · Application. Draws on Materi A.",
        minutes="About 90 min (UE5–6), of which about 15–20 min of writing",
        case=f"{case}, the day's case study",
        intro=(f"This is the case study of Day {day}. Read the case once, look at the picture, and write your answers in the boxes and tables. "
               "You can work on paper or type into the document. There are no answer keys in this document; the trainer closes the unit with the model solution."),
    )
    out_md = os.path.join(DOCX, "_source", f"day{day}-case.md")
    head = "---\n" + "\n".join(f"{k}: {v}" for k, v in fm.items()) + "\n---\n\n[[CONTENTS]]\n\n"
    open(out_md, "w", encoding="utf-8").write(head + part + "\n")
    out = os.path.join(DOCX, "_work", f"day{day}-case.docx")
    md2docx.build(out_md, out)
    return out


if __name__ == "__main__":
    for d in [int(x) for x in sys.argv[1:]] or range(1, 17):
        print("built", build(d))
