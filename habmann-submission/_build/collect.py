"""Copies the Word documents of each day into its submission folder (task = practical tasks, case study, trainer-only model solution)."""
import glob, os, re, shutil, sys
HERE = os.path.dirname(os.path.abspath(__file__))
DOCX = os.path.normpath(os.path.join(HERE, "..", "..", "docx"))
OUT = os.path.normpath(os.path.join(HERE, ".."))
import json
META = json.load(open(os.path.join(DOCX, "_work", "meta.json"), encoding="utf-8"))
for d in range(1, 17):
    n = f"Day{d:02d}"
    case = re.sub(r"[^A-Za-z0-9]+", "-", META[str(d)]["case"]).strip("-")
    out = os.path.join(OUT, n)
    os.makedirs(os.path.join(out, "Dozent-intern"), exist_ok=True)
    task = glob.glob(os.path.join(DOCX, f"Day{d}-Task-*.docx"))[0]
    trainer = glob.glob(os.path.join(DOCX, "Trainer-only", f"Day{d}-Trainer-*.docx"))[0]
    shutil.copy(task, os.path.join(out, f"2_Praktische-Aufgaben_{n}_{case}.docx"))
    shutil.copy(os.path.join(DOCX, "_work", f"day{d}-case.docx"), os.path.join(out, f"4_Fallstudie_{n}_{case}.docx"))
    shutil.copy(trainer, os.path.join(out, "Dozent-intern", f"Trainer-Musterloesung_{n}_{case}.docx"))
    print(n, sorted(os.listdir(out)))
