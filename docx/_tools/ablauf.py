"""
The lesson plan ("Ablaufplan") that every Materi, Task and Trainer document opens with, and the block orientation of Day 1 (AION UX Developer version).
Built from the day's own Markdown (cards and blocks with their minutes), so the table never drifts from the documents.
Blocks are returned as the internal tuples of md2docx (("h", level, text), ("p", text), ("table", rows), ("box", kind, title, inner)).
The day has ten teaching units (UE): UE1 knowledge, UE2 and UE3 the two Level 1 tasks (Blocks 1.1, 1.2), UE4 coaching, UE5 and UE6 the case study
(Block 2.1), UE7 the feedback round, UE8 to UE10 the transfer project (Materi B, Block 3.1).
"""
import json
import os
import re

import release

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

CARD = re.compile(r"^## ([AB]\d+) · (.+?) · (\d+) min · (Core|Optional)\s*$", re.M)
BLOCK = re.compile(r"^## Block (\d\.\d) · (.+?) · ([A-Z][A-Z +]*) · (Core|Optional) · about (\d+) min", re.M)
META = json.load(open(os.path.join(ROOT, "_work", "meta.json"), encoding="utf-8"))
CASES = {int(d): v["case"] for d, v in META.items()}
ROLES = {int(d): v["role"] for d, v in META.items()}


def _read(day, kind):
    p = os.path.join(ROOT, "_source", f"day{day}-{kind}.md")
    return open(p, encoding="utf-8").read() if os.path.exists(p) else ""


def parse_day(day):
    cards = [dict(id=m[0], title=m[1], min=int(m[2]), kind=m[3]) for m in CARD.findall(_read(day, "materi"))]
    blocks = {m[0]: dict(id=m[0], title=m[1], type=m[2], kind=m[3], min=int(m[4])) for m in BLOCK.findall(_read(day, "task"))}
    return cards, blocks


def _ids(cards):
    return ", ".join(c["id"] for c in cards)


def _blk(blocks, bid):
    b = blocks.get(bid)
    if not b:
        return f"Block {bid}"
    return f"Block {bid} ({b['kind']}, about {b['min']} min)"


def lesson_plan_rows(day):
    cards, blocks = parse_day(day)
    a = [c for c in cards if c["id"].startswith("A")]
    b = [c for c in cards if c["id"].startswith("B")]
    a_core = [c for c in a if c["kind"] == "Core"]
    b_core = [c for c in b if c["kind"] == "Core"]
    case = CASES[day]
    role = ROLES[day]
    ue = str(release.UE_MINUTES)
    return [
        ["UE", "Min", "Plan item", "What happens", "Material", "Format"],
        ["**1**", ue, "Knowledge transfer · Level 1",
         f"The trainer presents the cards of Materi A ({_ids(a_core)}, about {sum(c['min'] for c in a_core)} min of cards) in the Neuro-UX Lab; participants follow in the handout.",
         "Materi A (Route 1)", "Presentation + Handout"],
        ["**2**", ue, "Level 1 · Task 1",
         f"Individual work on {_blk(blocks, '1.1')}: the first product of the day is read and its effect described. Pairs then compare their results and the trainer collects open questions.",
         "Task 1 · Part 1 · Block 1.1", "Handout (or in the lab)"],
        ["**3**", ue, "Level 1 · Task 2",
         f"Three options are rated on the same criteria and one is chosen under the stated conditions: {_blk(blocks, '1.2')}.",
         "Task 1 · Part 1 · Block 1.2", "Handout (or in the lab)"],
        ["**4**", ue, "Coaching · transition from Level 1 to Level 2",
         "Trainer-led. A short talk on the day's coaching focus, then the reflection questions in pairs. The bridge: from describing an effect to a decision you answer for. There is no worksheet block in this unit.",
         "Trainer document, section Coaching", "Trainer only"],
        ["**5–6**", str(2 * release.UE_MINUTES), f"Level 2 · Case study {case} (**2 UE**) incl. model solution",
         f"UE5: the trainer presents the case; participants work on {_blk(blocks, '2.1')}. UE6: groups compare their results and defend them; the trainer closes with the model solution.",
         "Task 1 · Part 2 · Block 2.1<br>Trainer document, section Case study", "Handout; model solution shown after the work"],
        ["**7**", ue, "Level 2 + 3 · Feedback round with a management perspective",
         "Groups present their reasoning, not only their result. The trainer asks the day's Level 3 input questions and leads the discussion.",
         "Trainer document, section Feedback round", "Presentation by the groups; Trainer only"],
        ["**8**", ue, f"Level 3 · Transfer project, {role} (**3 UE**: UE8–10)",
         f"The trainer presents Materi B ({_ids(b_core)}; use the \"In plain words\" and \"How to decide\" boxes, the rest is handout) and sets the role and the situation.",
         "Materi B (Route 2)", "Presentation + Handout"],
        ["**9**", ue, "Level 3 · Transfer project",
         f"Individual work or in pairs on {_blk(blocks, '3.1')}: the strategy memo.",
         "Task 2 · Block 3.1", "Handout (or in the lab)"],
        ["**10**", ue, "Level 3 · Transfer project",
         "Participants present their decision and what they give up, including the one decision made under uncertainty; the trainer debriefs with the model solution.",
         "Task 2 · Block 3.1<br>Trainer document, section Transfer project", "Handout; model solution shown after the work"],
    ]


def lesson_plan_blocks(day, doc):
    case = CASES[day]
    role = ROLES[day]
    where = {
        "materi": "This document is the study material; it is used in UE1 (Materi A) and UE8 (Materi B).",
        "task": "This document is the worksheet; it is used in UE2 to UE6 (Task 1) and UE8 to UE10 (Task 2).",
        "trainer": "This document is the trainer document; it is used in UE4 to UE10 and is **not handed out to participants**.",
    }[doc]
    return [
        ("h", 1, "Day at a glance"),
        ("p", f"Day {day} has ten teaching units (UE). {where} The day is built from three documents and the Neuro-UX Lab: **Materi** (study material), **Task** (worksheet) and **Trainer** (coaching, feedback and model solutions), plus the course website."),
        ("h", 2, "Lesson plan: ten teaching units (Ablaufplan)"),
        ("table", lesson_plan_rows(day)),
        ("p", f"One UE is counted as {release.UE_MINUTES} minutes here; breaks are not shown. The times are a guide for the trainer. The Core blocks are enough for a complete answer."),
        ("h", 2, "Case study and transfer project at a glance"),
        ("table", [
            ["Component", "UE", "Duration", "Participants work in", "Model solution in"],
            [f"**Level 2 case study** ({case})", "UE5–6", f"**2 UE** · {2 * release.UE_MINUTES} min", "Task 1 · Part 2 (Block 2.1)", "Trainer document, section Case study"],
            [f"**Level 3 transfer project** ({role})", "UE8–10", f"**3 UE** · {3 * release.UE_MINUTES} min", "Materi B and Task 2 (Block 3.1)", "Trainer document, section Transfer project"],
        ]),
    ]


# ------------------------------------------------------------------ Day 1: block orientation

def _course_map():
    rows = []
    last = None
    for d in range(1, 17):
        t = open(os.path.join(ROOT, "..", "trainer-only", "plan", f"day{d}.txt"), encoding="utf-8").read()
        m = re.search(r"Modul (\d+) \(Tag (\d+) von (\d+)\)", t)
        mod = m.group(1) if m else ""
        head = META[str(d)]["heading"].split("·", 1)[1].strip()
        rows.append(["Module " + mod if mod != last else "", str(d), head])
        last = mod
    return rows


def block_orientation_blocks():
    rows = [["Module", "Day", "Topic"]] + _course_map()
    return [
        ("h", 1, "Block orientation (Blockorientierung)"),
        ("p", "This page orients you before the first day. It says what the course is, how a day runs, which documents you will meet, and what is expected of you."),
        ("h", 2, "The course: sixteen days"),
        ("p", "The AION UX Developer course runs over sixteen days. It begins with psychological UX design and neuro-design and ends with immersive technologies and the ethics of future interaction. One thread runs through every day: **a design is judged by what it does to people, and a design decision is a decision you answer for.** You are asked to think like a decision-maker, not only like a designer: to weigh options against a budget, a deadline and a risk, and to decide even when the data is incomplete."),
        ("table", rows),
        ("h", 2, "How every day runs"),
        ("p", "Every day has the same ten teaching units (UE) and the same three levels of work."),
        ("table", [
            ["UE", "What happens", "Level"],
            ["1", "Knowledge transfer: the trainer presents the day's topic", "Level 1 · Knowledge"],
            ["2–3", "Two short tasks: read a product and describe its effect, then weigh three options under limits", "Level 1 · Knowledge"],
            ["4", "Coaching: from understanding to application", "Level 1 to 2"],
            ["5–6", "Case study (2 UE) with a model solution", "Level 2 · Application"],
            ["7", "Feedback round with a management perspective", "Level 2 + 3"],
            ["8–10", "Transfer project (3 UE): you take a management role and decide", "Level 3 · Management decision"],
        ]),
        ("p", "**Level 1** asks you to understand the day's ideas and to describe what a design does to people. **Level 2** asks you to analyse a product, develop measures and put them in order. **Level 3** asks you to decide as a manager: to set priorities between user effect, effort, risk and the business, and to decide even when the data is incomplete."),
        ("h", 2, "Your documents and the Neuro-UX Lab"),
        ("table", [
            ["Document", "What it is", "Who has it"],
            ["**Materi** (A and B)", "Study material. Materi A serves Route 1 (Levels 1 and 2); Materi B serves Route 2 (Level 3).", "Participants (handout)"],
            ["**Task** (1 and 2)", "The worksheet with answer boxes. Task 1 is Route 1; Task 2 is Route 2. There are no answer keys and no scores in it.", "Participants (handout)"],
            ["**Trainer**", "Coaching, feedback round, model solutions and assessment criteria.", "Trainer only"],
            ["**Neuro-UX Lab**", f"The course website ({release.SITE}). In class it is the place to practise and learn: the cards, the working examples and the tasks are there too, and you can work in them directly.", "Everyone"],
        ]),
        ("h", 2, "How we work"),
        ("bullets", [
            "Blocks marked **Core** are enough for a complete answer.",
            "In the judged parts, a different choice with a clear reason is a good answer. The reason matters more than the result.",
            "The worked examples in the Materi use a made-up company that is not one of the task cases. No task answer is printed in the study material.",
            "Real research findings and rules in the Materi carry their source; check a source and its current edition before you quote it.",
            "Every document names its version, its release date and the person who reviewed and approved it. Pictures are screenshots of the lab, drawn with the help of AI, and are labelled on the image.",
        ]),
    ]
