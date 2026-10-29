"""
Writes the Markdown sources of the Word documents (_source/dayN-materi.md, dayN-task.md, dayN-trainer.md) from the Neuro-UX Lab itself, so the documents and
the website cannot drift apart.

Inputs
  _work/dump.json        the English spec, study cards, glossary and references of every day (ux-lab/scripts/dump-docs.ts)
  _figures/figures.json  the photographs of the pictures and labs (capture-figures.mjs)
  plan_en1..3.py         the plan's coaching and feedback cells in English
Usage: python _tools/make_docs.py [day ...]      (default: 1 to 16)   then   python _tools/build_all.py [day ...]
The Markdown can be edited by hand afterwards; rerunning overwrites it.
"""
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import plan_en3  # noqa: E402,F401  (fills PLAN_EN for Days 1 to 16)
from plan_en1 import PLAN_EN  # noqa: E402
from plan_rows import rows as plan_rows  # noqa: E402

D = json.load(open(os.path.join(ROOT, "_work", "dump.json"), encoding="utf-8"))
FIGS = json.load(open(os.path.join(ROOT, "_figures", "figures.json"), encoding="utf-8"))
MODULE = {}
for _d in range(1, 17):
    _t = open(os.path.join(ROOT, "..", "trainer-only", "plan", f"day{_d}.txt"), encoding="utf-8").read()
    _m = re.search(r"Modul (\d+) \(Tag (\d+) von (\d+)\)", _t)
    MODULE[_d] = f"Module {_m.group(1)} (day {_m.group(2)} of {_m.group(3)})" if _m else ""

INSTR = re.compile(r"^(Choose|Press|Switch|Select|Nothing to click|Click|Drag|Walk me|Move|Open|Tap|Turn|Use the|Read the comic|Try|Pick|Slide|Toggle|Start)\b")
ROUTE_NOTE = " Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used."


def cell(s):
    return re.sub(r"\s+", " ", str(s)).replace("|", "/").strip()


def one(s):
    s = re.sub(r"\s*\(#\d+[^)]*\)", "", str(s))
    s = re.sub(r"\s*At least \d+ (characters|complete rows?)( each)?\.", "", s)
    return re.sub(r"\s+", " ", s).strip()


WEB = re.compile("|".join(chr(92) + "b" + w + chr(92) + "b" for w in ("exports?", "the app", "mentor", "website", "the check", "flag", "the site")) + "|passcode", re.I)


def no_web(text):
    parts = re.split(r"(?<=[.!?])\s+", one(text))
    return " ".join(p for p in parts if not WEB.search(p)).strip()


def drop_instr(text):
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return " ".join(p for p in parts if not INSTR.match(p)).strip()


def front(**kw):
    return "---\n" + "\n".join(f"{k}: {one(v)}" for k, v in kw.items()) + "\n---\n"


def table(head, rows):
    out = ["| " + " | ".join(cell(h) for h in head) + " |", "|" + "---|" * len(head)]
    for r in rows:
        out.append("| " + " | ".join(cell(c) for c in r) + " |")
    return "\n".join(out)


def gloss_keys(text, day, limit=40):
    cnt = {}
    for k, v in D["glossary"].items():
        if v["day"] > day:
            continue
        n = 0
        for m in v["match"]:
            if v["exactCase"] or m.isupper():
                n += len(re.findall(r"(?<![A-Za-z])" + re.escape(m) + r"(?![A-Za-z])", text))
            else:
                n += len(re.findall(r"(?<![A-Za-z])" + re.escape(m) + r"(?![A-Za-z])", text, flags=re.I))
        if n:
            cnt[k] = n
    keys = sorted(cnt, key=lambda k: -cnt[k])[:limit]
    return ",".join(keys)


def fig_md(day, scope, caption_fallback):
    out = []
    for f in FIGS[str(day)]:
        if f["scope"] != scope:
            continue
        cap = one(f["label"]) or caption_fallback
        mm = re.search(r" \((\d+) of (\d+)\)$", cap)
        suffix = f" ({mm.group(1)} of {mm.group(2)})" if mm else ""
        cap = re.sub(r" \(\d+ of \d+\)$", "", cap)
        if cap.startswith("Open your desk"):
            cap = "Your desk: the messages that wait for you, shown in the lab as a mailbox" + suffix
        elif cap.startswith("Observe the platform"):
            cap = "The platform as it is today, as the lab lets you observe it" + suffix
        elif cap.startswith("See how a real platform"):
            cap = "A real platform that solved this, shown for the class discussion" + suffix
        elif " " not in cap:
            cap = f"The product to read, as the lab shows it ({cap})"
        cap = re.sub(r"\s*·\s*(a working product|Case assumption[^·]*)", "", cap, flags=re.I).strip(" ·")
        lab = "working product" in f["label"]
        if lab:
            cap += "." + ROUTE_NOTE
        elif not cap.endswith("."):
            cap += "."
        out.append(f"![{cap.replace(']', ')').replace('[', '(')}](_figures/{f['file']})")
    return out


def title_of(day):
    return D["days"][str(day)]["spec"]["heading"].split("·", 1)[1].strip()


def daytitle(day):
    return f"Day {day} · {MODULE[day]}: {title_of(day)}"


# ================================================================================================ MATERI

def materi(day):
    x = D["days"][str(day)]
    s = x["spec"]
    mats = {m["id"]: m for m in x["materials"]}
    plain = x["plain"]
    keys = []
    for c in x["cards"].values():
        for k in c["sources"]:
            if k not in keys:
                keys.append(k)
    body = []
    for blk in ("A", "B"):
        ids = [i for i in x["cards"] if i.startswith(blk)]
        if blk == "A":
            body.append("# Materi A · Route 1 · Levels 1 and 2\n")
            body.append(f":::note How Materi A is used\nAbout 60 minutes, five cards. {s['route1']['blurb']} The cards give you the ideas and the rules you use in Task 1.\n:::\n")
        else:
            body.append("# Materi B · Route 2 · Level 3\n")
            body.append(f":::note How Materi B is used\nAbout 60 minutes, three cards, led by the facilitator. {s['route2']['blurb']} The cards give you the ideas you use in Task 2.\n:::\n")
        for cid in ids:
            c = x["cards"][cid]
            m = mats[cid]
            kind = "Optional" if m.get("optional") else "Core"
            body.append(f"## {cid} · {one(m['title'])} · {m['minutes']} min · {kind}\n")
            body.append(f"> {one(c['scan'])}\n")
            p = plain[cid]
            pic = drop_instr(p.get("picture", "") or "")
            box = [f"**The idea.** {one(p['idea'])}", f"**Why it matters.** {one(p['why'])}"]
            if pic:
                box.append(f"**How to read the picture.** {one(pic)}")
            body.append(":::box In plain words\n" + "\n".join(box) + "\n:::\n")
            for f in fig_md(day, cid, f"Picture of card {cid}"):
                body.append(f + "\n")
            extras = []
            for it in c["items"]:
                k = it["k"]
                if k == "table":
                    if it["caption"]:
                        body.append(f"**{one(it['caption'])}**\n")
                    body.append(table(it["head"], it["rows"]) + "\n")
                elif k == "callout":
                    label = it["label"] or "Note"
                    body.append(f":::note {label}\n{it['text']}\n:::\n")
                elif k == "extra":
                    extras.append(it["paras"])
                elif k == "p":
                    body.append(one(it["text"]) + "\n")
            body.append(":::rules How to decide when this comes up in the task\n" + "\n".join("- " + one(r) for r in c["reasoning"]) + "\n:::\n")
            for paras in extras:
                inner = "\n\n".join(one(q) for q in paras)
                body.append(f":::note Extra · go deeper (optional reading)\n{inner}\n:::\n")
            body.append("^src: " + " · ".join(D["refs"][k]["chip"] for k in c["sources"]) + "\n")
    text = "\n".join(body)
    fm = front(
        doc="materi", day=day,
        kicker=f"DAY {day} · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3",
        title=title_of(day),
        subtitle="Study material with real research, worked examples and the rules you use in the tasks",
        daytitle=daytitle(day),
        doctype="Materi (study material). Materi A has five cards, Materi B has three.",
        route="Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).",
        minutes="Materi A about 60 min · Materi B about 60 min (facilitator-led)",
        case="Worked examples use a made-up company in each card. The task case is " + s["caseName"] + " (see the Task document).",
        intro=one(s["intro"]["about"]) + " This document holds everything you need to study Day " + str(day) + " without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.",
        glossary=gloss_keys(text, day),
        refs=",".join(keys),
    )
    return fm + "\n[[CONTENTS]]\n\n" + text


# ================================================================================================ TASK

def lines_for(f):
    return max(3, min(8, int(f.get("rows", 4))))


def field_task(f, out):
    q = f.get("qLabel", "")
    out.append(f"**{q} · {one(f['label'])}**\n" if q else f"**{one(f['label'])}**\n")
    kind = f["kind"]
    if kind == "text":
        if f.get("help"):
            out.append(one(f["help"]) + "\n")
        if f.get("steps"):
            out.append("*How to build the answer:*\n")
            out.append("\n".join(f"- {one(s)}" for s in f["steps"]) + "\n")
        out.append(f"[[ANSWER lines={lines_for(f)}]]\n")
    elif kind == "lists":
        if f.get("help"):
            out.append(one(f["help"]) + "\n")
        if f.get("steps"):
            out.append("*How to build the answer:*\n")
            out.append("\n".join(f"- {one(s)}" for s in f["steps"]) + "\n")
        for lst in f["lists"]:
            if len(f["lists"]) > 1 or lst["label"] != f["label"]:
                out.append(f"*{one(lst['label'])}*\n")
            if lst.get("help"):
                out.append(one(lst["help"]) + "\n")
            out.append(f"[[ANSWER lines={max(4, f['n'] + 2)}]]\n")
    elif kind == "assess":
        out.append(one(f.get("helpText") or f.get("help", "")) + "\n")
        if f.get("steps"):
            out.append("*How to build the answer:*\n")
            out.append("\n".join(f"- {one(s)}" for s in f["steps"]) + "\n")
        head = [f.get("firstCol", "Item")] + [c["label"] for c in f["cols"]]
        rows = [[it["label"]] + ["\n" if False else "__" for _ in f["cols"]] for it in f["items"]]
        out.append(table(head, rows) + "\n")
    elif kind == "pick":
        if f.get("help"):
            out.append(one(f["help"]) + "\n")
        if f.get("steps"):
            out.append("*How to build the answer:*\n")
            out.append("\n".join(f"- {one(s)}" for s in f["steps"]) + "\n")
        out.append("[[CHOOSE]] " + " ‖ ".join(cell(o["label"]) for o in f["options"]) + "\n")


def block_task(day, b, level_tag, out, kind="JUDGED"):
    s = D["days"][str(day)]["spec"]
    mats = {m["id"]: m for m in D["days"][str(day)]["materials"]}
    title = re.sub(r"^Block \d\.\d · ", "", b["title"])
    out.append(f"## Block {b['id']} · {one(title)} · {kind} · Core · about {b['minutes']} min\n")
    draws = " · ".join(f"{r} · {one(mats[r]['title']).split(':')[0]}" for r in b["refs"])
    out.append(f"**Draws on:** {draws}.\n")
    if b.get("lead"):
        out.append(one(b["lead"]) + "\n")
    for fg in fig_md(day, "b" + b["id"], f"Evidence for Block {b['id']}"):
        out.append(fg + "\n")
    for f in b["fields"]:
        field_task(f, out)


def brief_md(day, br, scope, out, h):
    out.append(f"## {one(br['heading'])}\n")
    out.append(f"*{one(br['readTime'])}*\n")
    out.append(one(br["paragraph"]) + "\n")
    cond = br["conditions"]
    out.append(table([cond["title"], br["runTitle"]], [["<br>".join("• " + one(i) for i in cond["items"]), "<br>".join("• " + one(i) for i in br["run"])]]) + "\n")
    for fg in fig_md(day, scope, "The case"):
        out.append(fg + "\n")
    k = br.get("known")
    if k:
        cols = k["columns"]
        out.append(f"**{one(k['title'])}**\n")
        out.append(table([c["title"] for c in cols], [["<br>".join("• " + one(i) for i in c["items"]) for c in cols]]) + "\n")
        if k.get("note"):
            out.append(f"*{one(k['note'])}*\n")
    out.append(f":::note Case assumption\n{one(br['assumption'])}\n:::\n")


def task(day):
    x = D["days"][str(day)]
    s = x["spec"]
    out = []
    b1 = {b["id"]: b for b in s["blocks1"]}
    b2 = s["block2"]
    cov = [["UE", "Plan item (Strukturplan, Day %d)" % day, "Block in this document"],
           ["UE2", "Level 1, task 1 · " + one(re.sub(r"^Block \d\.\d · ", "", b1["1.1"]["title"])), "Block 1.1 (Core)"],
           ["UE3", "Level 1, task 2 · " + one(re.sub(r"^Block \d\.\d · ", "", b1["1.2"]["title"])), "Block 1.2 (Core)"],
           ["UE4", "Coaching: from describing to deciding", "A classroom talk led by the trainer; not a worksheet block"],
           ["UE5–6", "Level 2 case study · " + one(re.sub(r"^Block \d\.\d · ", "", b1["2.1"]["title"])), "Block 2.1 (Core)"],
           ["UE7", "Feedback round with a management perspective", "A classroom discussion led by the trainer; not a worksheet block"],
           ["UE8–10", "Level 3 transfer project · " + one(re.sub(r"^Block \d\.\d · ", "", b2["title"])), "Block 3.1 (Core), in Task 2"]]
    out.append(":::note Which plan item each block answers\n" + table(cov[0], cov[1:]) + "\n:::\n")
    out.append(":::note Your name\nWrite your full name here. Use the same name on every Task document this week; it is how your work is matched.\n[[ANSWER lines=1]]\n:::\n")
    r1 = s["route1"]
    out.append(f"# Task 1 · Route 1 · {one(r1['title'])}\n")
    brief_md(day, s["brief1"], "brief", out, 2)
    out.append(f"# Part 1 · {one(r1['part1']['title'])} · {r1['part1']['level']}\n")
    for bid in ("1.1", "1.2"):
        block_task(day, b1[bid], "L1", out)
    out.append(f"# Part 2 · {one(r1['part2']['title'])} · {r1['part2']['level']} · Case study (2 UE)\n")
    out.append(":::note Case study: 2 teaching units (UE5–6)\nThis part is the day's Level 2 case study. It takes 2 UE (about 90 minutes): UE5 for the briefing and your own work, UE6 for comparing your results with your group and for the trainer's closing. The block below needs about %d minutes of writing; the rest of the time is discussion.\n:::\n" % b1["2.1"]["minutes"])
    block_task(day, b1["2.1"], "L2", out)
    r2 = s["route2"]
    out.append(f"# Task 2 · Route 2 · {one(r2['title'])}\n")
    brief_md(day, s["brief2"], "brief", out, 2)
    out.append(f"*The memo is addressed to: {one(r2['to'])}. Subject: {one(r2['subject'])}.*\n")
    out.append("# Part 3 · Level 3 · Management decision · Transfer project (3 UE)\n")
    out.append(":::note Transfer project: 3 teaching units (UE8–10)\nUE8: the trainer presents Materi B and sets the role. UE9: you write the memo. UE10: you present the decision and what you give up; the trainer debriefs.\n:::\n")
    block_task(day, b2, "L3", out)
    text = "\n".join(out)
    fm = front(
        doc="task", day=day,
        kicker=f"DAY {day} · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3",
        title=f"{s['caseName']}: UX Analysis File and UX Strategy Memo",
        subtitle="Describe the effect, choose the measures as a team member, and decide as " + s["role"],
        daytitle=daytitle(day),
        doctype="Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).",
        route="Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).",
        minutes=f"Task 1 about {sum(b['minutes'] for b in s['blocks1'])} min · Task 2 about {b2['minutes']} min",
        case=f"{s['caseName']}, the day's case study; other products appear as warm-ups",
        intro="This is the worksheet for Day %d. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. All blocks are Core. There are no answer keys and no scores; the reason you give matters more than the choice." % day,
        glossary=gloss_keys(text, day),
    )
    return fm + "\n[[CONTENTS]]\n\n" + text


# ================================================================================================ TRAINER

def model_of_field(f, out, bid):
    q = f.get("qLabel", "")
    head = f"{bid} · {one(f['label'])}"
    kind = f["kind"]
    if kind == "text":
        g = f["guide"]
        out.append(f":::note {head}\n{one(f['model'])}\n:::\n")
        crit(g, out)
    elif kind == "lists":
        for lst in f["lists"]:
            out.append(f":::note {bid} · {one(lst['label'])}\n{lst['model'].replace(chr(10), '<br>') if False else chr(10).join('- ' + one(l) for l in lst['model'].split(chr(10)) if l.strip())}\n:::\n")
            crit(lst["guide"], out)
    elif kind == "assess":
        out.append(f"### Reference: {one(f['label'])}\n")
        head_row = [f.get("firstCol", "Item")] + [c["label"] for c in f["cols"]]
        rows = []
        for it in f["items"]:
            mr = f.get("modelRows", {}).get(it["id"], {})
            rows.append([it["label"]] + [mr.get(c["key"], "") for c in f["cols"]])
        out.append(table(head_row, rows) + "\n")
        if f.get("modelText"):
            for it in f["items"]:
                t = f["modelText"].get(it["id"])
                if t:
                    out.append(f":::note {bid} · {one(it['label'])}\n{one(t)}\n:::\n")
        crit(f["guide"], out)
    elif kind == "pick":
        out.append(f"### Reference: {one(f['label'])}\n")
        out.append(table(["Option", "Reference choice", "Why"], [[o["label"], "yes" if o["expected"] else "no", o["why"]] for o in f["options"]]) + "\n")
        if no_web(f.get("model", "")):
            out.append(f":::note {head}\n{no_web(f['model'])}\n:::\n")
        if no_web(f.get("teaching", "")):
            out.append(f"*{no_web(f['teaching'])}*\n")


def crit(g, out):
    if g.get("lookFor"):
        out.append("**What to look for:**\n\n" + "\n".join("- " + one(i) for i in g["lookFor"]) + "\n")
    if g.get("pitfalls"):
        out.append("**Typical weaknesses:**\n\n" + "\n".join("- " + one(i) for i in g["pitfalls"]) + "\n")


def facilitator(day, after, out):
    s = D["days"][str(day)]["spec"]
    for c in s["cards"]:
        if c["after"] != after:
            continue
        for sec in c["sections"]:
            out.append(f"**{one(sec['kicker'])}**\n")
            if sec.get("items"):
                out.append("\n".join("- " + one(i) for i in sec["items"]) + "\n")
            if sec.get("qa"):
                out.append(table(["Question", "Answer"], [[q["q"], q["a"]] for q in sec["qa"]]) + "\n")


def trainer(day):
    x = D["days"][str(day)]
    s = x["spec"]
    pe = PLAN_EN[day]
    b1 = {b["id"]: b for b in s["blocks1"]}
    b2 = s["block2"]
    out = []
    out.append("# Trainer guide\n")
    out.append("## How to use this document\n")
    out.append(f"This document is for the trainer and is not handed out. The Task document carries no answer keys. Here you find the coaching of UE4, the model solution of the case study ({s['caseName']}), the questions of the feedback round, the criteria for moving from Level 2 to Level 3 and the model solution of the transfer project.\n")
    out.append("- **The model answers are references, not the only right answer.** A different choice with a clear reason is a good answer; the reason matters more than the result (see the assessment criteria).\n- Show a model solution only after the participants have worked, and never as a mark.\n-\n")
    out.append("## Assessment criteria (Bewertungskriterien)\n")
    out.append("Judge each answer on four things, in this order: it is **grounded** in the facts the brief prints; it names the **effect on people** and not only the surface; it weighs **effort, risk and time** against the stated limits; and it **says what it gives up or does not know**. The table lists what each question looks for.\n")
    rows = []
    for b in list(b1.values()) + [b2]:
        for f in b["fields"]:
            if f["kind"] == "lists":
                g = f["lists"][0]["guide"]
            else:
                g = f.get("guide") or {"lookFor": [no_web(f["teaching"])] if no_web(f.get("teaching", "")) else [], "pitfalls": []}
            rows.append([f"{b['id']} · {one(f['label'])}", "<br>".join("• " + one(i) for i in g.get("lookFor", [])), "<br>".join("• " + one(i) for i in g.get("pitfalls", [])) or "—"])
    out.append(table(["Question", "What a good answer shows", "Typical weaknesses"], rows) + "\n")
    out.append("# UE2–3 · Level 1 tasks\n")
    for bid, ue in (("1.1", "UE2"), ("1.2", "UE3")):
        b = b1[bid]
        out.append(f"## Block {bid} · model answers ({ue})\n")
        for f in b["fields"]:
            model_of_field(f, out, bid)
    out.append("# UE4 · Coaching: transition from Level 1 to Level 2\n")
    out.append(f"## Coaching focus: {pe['cf']} (UE4)\n")
    if pe.get("note"):
        out.append(f"*Note: {pe['note']}*\n")
    out.append("The coaching is trainer-led and has no worksheet block. Open with a short talk on the focus, then take the questions one at a time.\n")
    out.append("**Coaching questions**\n\n" + "\n".join("- " + q for q in pe["cq"]) + "\n")
    out.append("**Reflection questions (in pairs, never scored)**\n\n" + "\n".join("- " + q for q in pe["cr"]) + "\n")
    out.append("# UE5–6 · Case study (2 UE)\n")
    out.append(f"## The case and what is known (UE5–6)\n")
    br = s["brief1"]
    out.append(one(br["paragraph"]) + "\n")
    k = br.get("known")
    if k:
        out.append(f"**{one(k['title'])}**\n")
        out.append(table([c["title"] for c in k["columns"]], [["<br>".join("• " + one(i) for i in c["items"]) for c in k["columns"]]]) + "\n")
    facilitator(day, "brief1", out)
    out.append(f"## Block 2.1 · model answers (UE5–6)\n")
    for f in b1["2.1"]["fields"]:
        model_of_field(f, out, "2.1")
    out.append("## Debrief of the case study (UE6)\n")
    out.append("- Ask two groups to read out their order of measures and the reason for the first one. Do not correct the order; ask what each group gave up.\n- Compare with the reference above. Where a group differs, ask which condition of the brief carried their reason.\n- Ask each group for one thing they do not know, and what it would take to find out.\n- Close with the weaknesses listed above: the commonest is a measure without a reason, or a reason that does not use the stated limits.\n")
    out.append("# UE7 · Feedback round\n")
    out.append("## Feedback with a management perspective (UE7)\n")
    if pe.get("note"):
        out.append(f"*Note: {pe['note']}*\n")
    out.append("**Preparation**\n\n" + "\n".join("- " + q for q in pe["fp"]) + "\n")
    out.append("**Feedback questions**\n\n" + "\n".join("- " + q for q in pe["fq"]) + "\n")
    out.append(f"**Discussion impulse:** {pe['fd']}\n")
    out.append("## Transition from Level 2 to Level 3 (Übergang)\n")
    out.append("**Input for Level 3**\n\n" + "\n".join("- " + q for q in pe["fi"]) + "\n")
    out.append("A participant is ready for the transfer project when they:\n\n- give a reason for every choice and name the condition it rests on;\n- name what the choice gives up and what is still unknown;\n- can say who decides and on what evidence;\n- separate a decision they can take now from one that needs more data.\n")
    out.append("# UE8–10 · Transfer project (3 UE)\n")
    out.append("## The situation and what is known (UE8–10)\n")
    b2r = s["brief2"]
    out.append(one(b2r["paragraph"]) + "\n")
    k2 = b2r.get("known")
    if k2:
        out.append(f"**{one(k2['title'])}**\n")
        out.append(table([c["title"] for c in k2["columns"]], [["<br>".join("• " + one(i) for i in c["items"]) for c in k2["columns"]]]) + "\n")
    facilitator(day, "brief2", out)
    out.append("## Block 3.1 · model answers (UE9–10)\n")
    for f in b2["fields"]:
        model_of_field(f, out, "3.1")
    facilitator(day, "3.1", out)
    out.append("## Debrief of the transfer project (UE10)\n")
    out.append("- Ask three participants to read their statement to the board in two sentences.\n- Ask each what they give up and what they would reverse if the first results disappoint.\n- Ask for the one decision made under uncertainty and the information that would change it.\n- Close with the weaknesses listed above; the commonest is a vision without a decision, or a decision without a cost.\n")
    text = "\n".join(out)
    fm = front(
        doc="trainer", day=day,
        kicker=f"DAY {day} · TRAINER DOCUMENT · COACHING, FEEDBACK AND MODEL SOLUTIONS · NOT FOR PARTICIPANTS",
        title=f"{s['caseName']}: Coaching, Feedback and Model Solutions",
        subtitle="How to coach, run the feedback round and debrief the case study and the transfer project, with reference answers and assessment criteria",
        daytitle=daytitle(day),
        doctype="Trainer document (coaching, feedback round, model solutions, assessment criteria, transition from Level 2 to Level 3). Not for participants.",
        route="Serves Route 1 (Levels 1 and 2) and Route 2 (Level 3) of the day.",
        minutes="Ten teaching units (UE) · case study 2 UE (UE5–6) · transfer project 3 UE (UE8–10) · one UE counted as 45 min",
        case=f"{s['caseName']}, the day's case study",
        intro="This document is for the trainer and is not handed out. The Task document carries no answer keys. Here you find the coaching of UE4, the model solution of the case study, the questions of the feedback round, the criteria for moving from Level 2 to Level 3 and the model solution of the transfer project.",
        glossary=gloss_keys(text, day),
    )
    return fm + "\n[[CONTENTS]]\n\n" + text


if __name__ == "__main__":
    days = [int(a) for a in sys.argv[1:]] or list(range(1, 17))
    os.makedirs(os.path.join(ROOT, "_source"), exist_ok=True)
    for d in days:
        for name, fn in (("materi", materi), ("task", task), ("trainer", trainer)):
            open(os.path.join(ROOT, "_source", f"day{d}-{name}.md"), "w", encoding="utf-8").write(fn(d))
        print("wrote day", d)
