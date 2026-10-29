"""
Build every Word document.  Usage:  python _tools/build_all.py [day ...]      (default: 1 to 16)
Each reviewed Markdown file in _source/ becomes one .docx at the top level of docx/ (the Trainer files go to Trainer-only/ as well).
Names: Day{N}-{Materi|Task|Trainer}-AION-UX-Developer-{topic}.docx
"""
import json
import os
import re
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import md2docx  # noqa: E402

META = json.load(open(os.path.join(ROOT, "_work", "meta.json"), encoding="utf-8"))
P = "AION-UX-Developer"


def slug(t, n=64):
    s = re.sub(r"[^A-Za-z0-9]+", "-", t).strip("-")
    if len(s) <= n:
        return s
    cut = s[:n]
    return cut[: cut.rfind("-")] if "-" in cut else cut


def names(day):
    m = META[str(day)]
    topic = slug(m["heading"].split("·", 1)[1])
    case = slug(m["case"])
    return [
        (f"day{day}-materi.md", f"Day{day}-Materi-{P}-{topic}.docx"),
        (f"day{day}-task.md", f"Day{day}-Task-{P}-{case}-UX-Analysis-and-UX-Strategy-Memo.docx"),
        (f"day{day}-trainer.md", f"Day{day}-Trainer-{P}-{case}-Coaching-Feedback-and-Model-Solutions.docx"),
    ]


def main(days):
    for d in days:
        for src, out in names(d):
            sp = os.path.join(ROOT, "_source", src)
            if not os.path.exists(sp):
                print("skip (no source yet):", src)
                continue
            op = os.path.join(ROOT, out)
            md2docx.build(sp, op)
            if "-Trainer-" in out:
                os.makedirs(os.path.join(ROOT, "Trainer-only"), exist_ok=True)
                shutil.move(op, os.path.join(ROOT, "Trainer-only", out))
            print("built", out)


if __name__ == "__main__":
    main([int(x) for x in sys.argv[1:]] or list(range(1, 17)))
