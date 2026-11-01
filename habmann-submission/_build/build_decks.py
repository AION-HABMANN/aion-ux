"""
Builds the two slide decks of each day for the Habmann submission from the sources of the Neuro-UX Lab documents:

  1_Wissenstransfer-Slides_DayNN.pptx   theory slides, from docx/_source/dayN-materi.md (every card of Materi A and B)
  3_Trainingsfolien_DayNN.pptx          training slides, from the lesson plan, the Task blocks and the plan's coaching and feedback cells

Usage: python build_decks.py [day ...]      (default 1 to 16)       output: ../DayNN/
"""
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
DOCX = os.path.join(ROOT, "docx")
OUT = os.path.normpath(os.path.join(HERE, ".."))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(DOCX, "_tools"))

import release  # noqa: E402
import ablauf  # noqa: E402
import plan_en3  # noqa: E402,F401
from plan_en1 import PLAN_EN  # noqa: E402
from pptlib import *  # noqa: E402,F401,F403

META = json.load(open(os.path.join(DOCX, "_work", "meta.json"), encoding="utf-8"))
DUMP = json.load(open(os.path.join(DOCX, "_work", "dump.json"), encoding="utf-8"))
REFS = DUMP["refs"]
FIG_CREDIT = "Screenshot of the Neuro-UX Lab (aion-ux-lab.vercel.app), own work; AI-assisted, labelled on the image; the example company is fictional."
AI_LINE = ("AI-assisted content: these slides were drafted with an AI language model (Claude, Anthropic) from the course's own Neuro-UX Lab and "
           f"were read, corrected and approved by {release.REVIEWER}, who is responsible for their accuracy.")


# ------------------------------------------------------------------ parsing
def split_front(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    fm = {}
    for line in m.group(1).split("\n"):
        k, _, v = line.partition(": ")
        fm[k] = v
    return fm, m.group(2)


def clean(s):
    s = s.replace("<br>", "\n")
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"\1", s)
    return s.strip()


def parse_table(lines):
    rows = []
    for l in lines:
        cells = [clean(c) for c in l.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{2,}:?", c.replace(" ", "")) for c in cells if c):
            continue
        rows.append(cells)
    return rows[0], rows[1:]


def parse_materi(day):
    fm, body = split_front(open(os.path.join(DOCX, "_source", f"day{day}-materi.md"), encoding="utf-8").read())
    lines = body.split("\n")
    groups, cur, grp = [], None, None
    last_bold = ""
    i = 0
    while i < len(lines):
        l = lines[i]
        m = re.match(r"^# Materi ([AB]) · (.+)$", l)
        if m:
            grp = dict(id=m.group(1), name=m.group(2), note="", cards=[])
            groups.append(grp)
            cur = None
            i += 1
            continue
        m = re.match(r"^## ([AB]\d+) · (.+?) · (\d+) min · (Core|Optional)\s*$", l)
        if m:
            cur = dict(id=m.group(1), title=m.group(2), min=m.group(3), kind=m.group(4), scan="", plain={}, fig=None, cap="",
                       tables=[], rules=[], rules_title="", case="", deeper="", src="")
            grp["cards"].append(cur)
            i += 1
            continue
        if l.startswith(":::"):
            kind, _, title = l[3:].strip().partition(" ")
            j = i + 1
            blk = []
            while j < len(lines) and lines[j].strip() != ":::":
                blk.append(lines[j])
                j += 1
            i = j + 1
            txt = "\n".join(blk).strip()
            if cur is None:
                if grp is not None and title.startswith("How Materi"):
                    grp["note"] = clean(txt)
                continue
            if kind == "box":
                for part in blk:
                    pm = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", part.strip())
                    if pm:
                        cur["plain"][pm.group(1).rstrip(".")] = clean(pm.group(2))
            elif kind == "rules":
                cur["rules_title"] = title
                cur["rules"] = [clean(b[2:]) for b in blk if b.startswith("- ")]
            elif kind == "note" and title.startswith("Case assumption"):
                cur["case"] = clean(txt)
            elif kind == "note" and title.startswith("Extra"):
                cur["deeper"] = clean(txt)
            continue
        if cur is not None:
            if l.startswith("> "):
                cur["scan"] += clean(l[2:]) + " "
            elif l.startswith("!["):
                fm_ = re.match(r"^!\[(.*)\]\((.+)\)$", l)
                if fm_:
                    cur["fig"] = os.path.join(DOCX, fm_.group(2))
                    cur["cap"] = fm_.group(1).split(" Shown here")[0].strip()
            elif l.startswith("^src:"):
                cur["src"] = l[5:].strip()
            elif re.match(r"^\*\*[^*]+\*\*$", l.strip()):
                last_bold = clean(l)
            elif l.startswith("|"):
                j = i
                tl = []
                while j < len(lines) and lines[j].startswith("|"):
                    tl.append(lines[j])
                    j += 1
                head, rows = parse_table(tl)
                cur["tables"].append(dict(title=last_bold, head=head, rows=rows))
                last_bold = ""
                i = j
                continue
        i += 1
    return fm, groups


def parse_task(day):
    fm, body = split_front(open(os.path.join(DOCX, "_source", f"day{day}-task.md"), encoding="utf-8").read())
    blocks = []
    parts = re.split(r"^(## Block \d\.\d · .+)$", body, flags=re.M)
    for k in range(1, len(parts), 2):
        h = re.match(r"^## Block (\d\.\d) · (.+?) · ([A-Z][A-Z +]*) · (Core|Optional) · about (\d+) min", parts[k])
        if not h:
            continue
        txt = parts[k + 1].split("\n# ")[0]
        draws = re.search(r"\*\*Draws on:\*\*\s*(.+)", txt)
        paras = [p.strip() for p in txt.split("\n\n") if p.strip() and not p.strip().startswith(("**Draws", "![", "**Question", "[[", "*How", "- ", "|", ":::", "Write ", "Two ", "One "))]
        fig = re.search(r"!\[.*?\]\((.+?)\)", txt)
        qs = [(int(a), clean(b)) for a, b in re.findall(r"\*\*Question (\d+) of \d+ · (.+?)\*\*", txt)]
        blocks.append(dict(id=h.group(1), title=h.group(2), minutes=h.group(5), draws=clean(draws.group(1)) if draws else "",
                           intro=clean(paras[0]) if paras else "", fig=os.path.join(DOCX, fig.group(1)) if fig else None, qs=qs))
    sit = re.search(r"^## The situation: (.+)$", body, re.M)
    sit_txt = ""
    if sit:
        after = body[sit.end():].strip().split("\n\n")
        sit_txt = next((clean(p) for p in after if p.strip() and not p.startswith(("*Read", "|", ":::", "!["))), "")
    return fm, blocks, (sit.group(1) if sit else ""), sit_txt


def topic_of(fm):
    d = fm.get("daytitle", "")
    return d.split(": ", 1)[1] if ": " in d else d


def module_of(fm):
    m = re.search(r"· (Module \d+ \(day \d+ of \d+\))", fm.get("daytitle", ""))
    return m.group(1) if m else ""


# ------------------------------------------------------------------ shared slides
def title_slide(d, kicker, title, sub, module, extra):
    s = d.slide("", dark=True, footer=False)
    s.shapes.title.text_frame.text = title
    t = s.shapes.title
    t.left, t.top, t.width, t.height = Inches(0.8), Inches(2.3), Inches(8.2), Inches(2.0)
    t.text_frame.vertical_anchor = MSO_ANCHOR.TOP
    pt = fit([title], 8.2, 2.0, 44, 28, 0)
    for r in t.text_frame.paragraphs[0].runs:
        r.font.size = Pt(pt)
        r.font.bold = True
        r.font.name = HEAD
        r.font.color.rgb = rgb(WHITE)
    text(s, 0.8, 1.55, 8, 0.4, [kicker], size=16, color="7FD6D8", bold=True)
    text(s, 0.8, 4.55, 8.2, 0.9, [sub], size=22, color="CBD5E1")
    text(s, 0.8, 5.55, 8.2, 0.4, [module], size=16, color="AEB7C7")
    text(s, 0.8, 6.0, 8.2, 0.4, [f"Trainer: {release.REVIEWER} · {extra}"], size=14, color="AEB7C7")
    badge(s, 9.6, 1.7, 3.0, str(d.day), fill=TEAL, size=96)
    text(s, 9.3, 5.0, 3.6, 0.8, ["Contains AI-assisted content"], size=14, color="AEB7C7", align=PP_ALIGN.CENTER)
    return s


def divider(d, big, small, body):
    s = d.slide("", dark=True)
    t = s.shapes.title
    t.left, t.top, t.width, t.height = Inches(0.8), Inches(2.0), Inches(11.5), Inches(1.4)
    t.text_frame.text = big
    for r in t.text_frame.paragraphs[0].runs:
        r.font.size = Pt(44)
        r.font.bold = True
        r.font.name = HEAD
        r.font.color.rgb = rgb(WHITE)
    text(s, 0.8, 1.45, 8, 0.4, [small], size=16, color="7FD6D8", bold=True)
    pt = fit([body], 10.5, 2.4, 20, 14)
    text(s, 0.8, 3.7, 10.5, 2.6, [body], size=pt, color="CBD5E1")
    return s


def ai_slide(d, extra_lines, refs=None):
    s = d.slide("About these slides, sources and AI use")
    y = 1.6
    box(s, MX, y, 5.8, 4.9, fill=CARD)
    badge(s, MX + 0.25, y + 0.25, 0.5, "AI", fill=CORAL, size=16)
    text(s, MX + 0.95, y + 0.3, 4.6, 0.5, ["AI-assisted content"], size=20, bold=True, color=INK)
    lines = [AI_LINE, "Pictures are screenshots of the course's own Neuro-UX Lab. Each one carries an AI label on the image and a source line under it.",
             "Companies and people in the examples are fictional. Numbers inside an example are labelled Case assumption and are not data."] + extra_lines
    pt = fit(lines, 4.9, 3.8, 15, 12, 8)
    text(s, MX + 0.3, y + 1.0, 5.2, 3.8, lines, size=pt, after=8)
    box(s, 6.7, y, 6.03, 4.9, fill=CARD2)
    text(s, 7.0, y + 0.3, 5.5, 0.5, ["Where to find more"], size=20, bold=True, color=INK)
    more = [f"Neuro-UX Lab for this day: {release.day_url(d.day)}", "Handouts: the Materi and Task Word documents of the day.",
            f"Version {release.VERSION}, {release.RELEASE_DATE}. Reviewer and approver: {release.REVIEWER}."]
    text(s, 7.0, y + 1.0, 5.5, 3.6, more, size=15, after=10)
    return s


def refs_slides(d, keys):
    items = []
    for k in keys:
        r = REFS.get(k)
        if not r:
            continue
        full = re.sub(r"\s*\([^()]*\)\s*$", "", r["full"]).strip()
        items.append(full)
    if not items:
        return
    per = 7
    for n, i in enumerate(range(0, len(items), per), 1):
        part = items[i:i + per]
        s = d.slide("Sources" + (f" ({n})" if len(items) > per else ""))
        pt = fit(part, 12.0, 4.9, 14, 11, 8)
        text(s, MX, 1.6, W - 2 * MX, 5.2, part, size=pt, after=8, bullets=True)


# ------------------------------------------------------------------ deck 1: knowledge transfer
def wissen(day):
    fm, groups = parse_materi(day)
    meta = META[str(day)]
    topic = topic_of(fm)
    d = Deck(day, "Knowledge transfer")
    title_slide(d, f"AION UX DEVELOPER · DAY {day}", topic, "Knowledge transfer slides", module_of(fm), f"Materi A and B · v{release.VERSION}")

    # agenda
    s = d.slide("What we cover today")
    lead = fm.get("intro", "")
    pt = fit([lead], 12.1, 1.2, 16, 13)
    text(s, MX, 1.5, 12.1, 1.2, [lead], size=pt, color=MUTED)
    colw = (W - 2 * MX - 0.4) / 2
    for gi, g in enumerate(groups):
        x = MX + gi * (colw + 0.4)
        box(s, x, 2.95, colw, 3.85, fill=CARD if gi == 0 else CARD2)
        mins = sum(int(c["min"]) for c in g["cards"])
        text(s, x + 0.25, 3.1, colw - 0.5, 0.4, [f"Materi {g['id']} · {mins} min"], size=18, bold=True, color=INK)
        rows = [f"{c['id']}  {c['title']} ({c['min']} min)" for c in g["cards"]]
        pt = fit(rows, colw - 0.5, 3.0, 14, 11, 5)
        text(s, x + 0.25, 3.6, colw - 0.5, 3.1, rows, size=pt, after=5)

    keys = [k for k in fm.get("refs", "").split(",") if k]
    for g in groups:
        divider(d, f"Materi {g['id']}", g["name"], g["note"])
        for c in g["cards"]:
            card_slides(d, c, day)
    refs_slides(d, keys)
    ai_slide(d, [])
    return d, meta


def card_slides(d, c, day):
    srcline = f"Sources: {c['src']}" if c["src"] else ""
    notes = "\n\n".join(x for x in (
        f"{c['id']} · {c['title']} · {c['min']} min · {c['kind']}",
        c["case"] and f"Case assumption: {c['case']}",
        c["deeper"] and f"Go deeper (optional reading): {c['deeper']}",
        srcline) if x)
    tag = f"{c['id']} · {c['min']} min · {c['kind']}"

    # opener
    s = d.slide(c["title"], notes=notes)
    pill(s, MX, 1.55, 2.4, tag)
    if c["fig"] and os.path.exists(c["fig"]):
        scan_w = 5.7
    else:
        scan_w = W - 2 * MX
    box(s, MX, 2.1, scan_w, 4.3, fill=CARD)
    pt = fit([c["scan"]], scan_w - 0.6, 3.7, 22, 14)
    text(s, MX + 0.3, 2.3, scan_w - 0.6, 3.9, [c["scan"].strip()], size=pt, color=INK)
    if c["fig"] and os.path.exists(c["fig"]):
        px, py, pw, ph = picture(s, c["fig"], 6.65, 1.55, 6.08, 4.4, alt=c["cap"] or c["title"])
        text(s, 6.65, 6.02, 6.08, 0.7, [c["cap"], (FIG_CREDIT, {"size": 9, "color": MUTED})], size=10, color=MUTED, after=2)
    if srcline:
        text(s, MX, 6.72, 12.1, 0.3, [srcline], size=10, color=MUTED)

    # in plain words
    pl = c["plain"]
    if pl:
        s = d.slide(f"{c['id']} · In plain words", notes=notes)
        idea = pl.get("The idea", "")
        why = pl.get("Why it matters", "")
        read = pl.get("How to read the picture", "")
        box(s, MX, 1.55, 7.4, 5.0, fill=CARD)
        text(s, MX + 0.3, 1.7, 6.8, 0.35, ["THE IDEA"], size=12, bold=True, color=TEAL)
        pt = fit([idea], 6.8, 4.2, 18, 12)
        text(s, MX + 0.3, 2.1, 6.8, 4.3, [idea], size=pt)
        y2 = 1.55
        hh = 2.4 if read else 5.0
        box(s, 8.2, y2, 4.53, hh, fill=CARD2)
        text(s, 8.45, y2 + 0.15, 4.0, 0.35, ["WHY IT MATTERS"], size=12, bold=True, color=TEAL)
        pt = fit([why], 4.05, hh - 0.7, 15, 11)
        text(s, 8.45, y2 + 0.55, 4.05, hh - 0.65, [why], size=pt)
        if read:
            box(s, 8.2, 4.15, 4.53, 2.4, fill=CARD)
            text(s, 8.45, 4.3, 4.0, 0.35, ["HOW TO READ THE PICTURE"], size=12, bold=True, color=TEAL)
            pt = fit([read], 4.05, 1.7, 15, 11)
            text(s, 8.45, 4.7, 4.05, 1.8, [read], size=pt)
        if srcline:
            text(s, MX, 6.72, 12.1, 0.3, [srcline], size=10, color=MUTED)

    # tables
    for t in c["tables"]:
        tsz, cw, chunks = table_fit(t["head"], t["rows"], W - 2 * MX)
        for n, part in enumerate(chunks, 1):
            ttl = f"{c['id']} · {t['title']}" if t["title"] else f"{c['id']} · {c['title']}"
            if len(chunks) > 1:
                ttl += f" ({n}/{len(chunks)})"
            s = d.slide(ttl, notes=notes)
            table(s, MX, 1.55, W - 2 * MX, cw, t["head"], part, size=tsz)
            if srcline:
                text(s, MX, 6.72, 12.1, 0.3, [srcline], size=10, color=MUTED)

    # rules
    if c["rules"]:
        s = d.slide(f"{c['id']} · {c['rules_title'] or 'How to decide in the task'}", notes=notes)
        n = len(c["rules"])
        pt = fit_each(c["rules"], 10.6, min(0.95, 5.0 / n) - 0.1, 22, 14)
        rh = min(0.95, 5.0 / n)
        for i, r in enumerate(c["rules"]):
            y = 1.6 + i * (rh + 0.08)
            box(s, MX, y, W - 2 * MX, rh, fill=CARD if i % 2 == 0 else CARD2)
            badge(s, MX + 0.2, y + (rh - 0.5) / 2, 0.5, str(i + 1), size=16)
            text(s, MX + 1.0, y, W - 2 * MX - 1.2, rh, [r], size=pt, anchor=MSO_ANCHOR.MIDDLE, after=0)
        if srcline:
            text(s, MX, 6.72, 12.1, 0.3, [srcline], size=10, color=MUTED)


# ------------------------------------------------------------------ deck 3: training slides
def training(day):
    fm, blocks, sit_title, sit_txt = parse_task(day)
    mfm, _ = parse_materi(day)
    meta = META[str(day)]
    case = meta["case"]
    topic = topic_of(mfm)
    pe = PLAN_EN[day]
    d = Deck(day, "Training slides")
    title_slide(d, f"AION UX DEVELOPER · DAY {day}", topic, "Training slides: tasks, coaching, case study and feedback", module_of(mfm),
                f"Case: {case}")

    # day at a glance
    rows = ablauf.lesson_plan_rows(day)
    head = ["UE", "Min", "What", "What happens"]
    body = []
    for r in rows[1:]:
        ue = clean(r[0])
        body.append([ue, r[1], clean(r[2]), clean(r[3])])
    cw = [0.7, 0.7, 3.3, W - 2 * MX - 4.7]
    for n, part in enumerate(chunk_rows(body, cw, 13, 4.8), 1):
        s = d.slide("The day at a glance" + (f" ({n})" if n > 1 or len(body) > 6 else ""),
                    notes="One UE (teaching unit) is counted as 45 minutes; breaks are not shown.")
        table(s, MX, 1.55, W - 2 * MX, cw, head, part, size=13)
        text(s, MX, 6.72, 12.1, 0.3, ["One UE is 45 minutes; breaks are not shown."], size=10, color=MUTED)

    by = {b["id"]: b for b in blocks}
    for bid in ("1.1", "1.2"):
        if bid in by:
            block_slides(d, by[bid], day, "Level 1 · Knowledge")
    coaching_slides(d, pe, day)
    if "2.1" in by:
        block_slides(d, by["2.1"], day, "Level 2 · Case study · UE5–6", case_mode=True)
    feedback_slides(d, pe, day)
    if "3.1" in by:
        block_slides(d, by["3.1"], day, "Level 3 · Transfer project · UE8–10", situation=(sit_title, sit_txt))

    # reflection
    s = d.slide("Reflect before you leave")
    qs = ["Which decision did you make today, and what did you give up to make it?",
          "Which assumption would you check first with real users, and how?",
          "What will you do differently in your next project because of today?"]
    for i, q in enumerate(qs):
        x = MX + i * 4.12
        box(s, x, 1.7, 3.9, 4.4, fill=CARD if i % 2 == 0 else CARD2)
        badge(s, x + 0.3, 1.95, 0.7, str(i + 1), size=22)
        pt = fit([q], 3.3, 2.8, 22, 16)
        text(s, x + 0.3, 2.95, 3.3, 3.0, [q], size=pt, color=INK)
    text(s, MX, 6.35, 12.1, 0.4, ["Use two minutes alone, then one minute with your neighbour."], size=14, color=MUTED)

    ai_slide(d, ["The coaching and feedback questions are the course plan's own, translated into English."])
    return d, meta


def block_slides(d, b, day, level, case_mode=False, situation=None):
    notes = f"Block {b['id']} · {b['title']} · about {b['minutes']} min. Draws on: {b['draws']}"
    s = d.slide(f"Block {b['id']} · {b['title']}", notes=notes)
    pill(s, MX, 1.5, 4.2, f"{level} · about {b['minutes']} min", fill=TEAL if not case_mode else CORAL)
    intro = b["intro"]
    if situation and situation[1]:
        intro = situation[1]
    has_fig = b["fig"] and os.path.exists(b["fig"])
    tw = 5.9 if has_fig else W - 2 * MX
    box(s, MX, 2.0, tw, 4.45, fill=CARD)
    pt = fit([intro], tw - 0.6, 3.9, 18, 12)
    text(s, MX + 0.3, 2.2, tw - 0.6, 4.1, [intro], size=pt)
    if has_fig:
        picture(s, b["fig"], 6.7, 1.5, 6.03, 4.45, alt=f"Block {b['id']} case")
        text(s, 6.7, 6.02, 6.03, 0.7, [(FIG_CREDIT, {"size": 9, "color": MUTED})], size=9, color=MUTED)
    if b["draws"]:
        text(s, MX, 6.62, 12.1, 0.4, [f"Draws on: {b['draws']}"], size=10, color=MUTED)

    # questions
    if b["qs"]:
        s = d.slide(f"Block {b['id']} · What you work on", notes=notes)
        n = len(b["qs"])
        rh = min(0.78, 4.9 / n)
        pt = fit_each([q for _, q in b["qs"]], 11.0, rh - 0.1, 20, 13)
        for i, (num, q) in enumerate(b["qs"]):
            y = 1.55 + i * (rh + 0.08)
            box(s, MX, y, W - 2 * MX, rh, fill=CARD if i % 2 == 0 else CARD2)
            badge(s, MX + 0.2, y + (rh - 0.46) / 2, 0.46, str(num), size=15)
            text(s, MX + 0.95, y, W - 2 * MX - 1.2, rh, [q], size=pt, anchor=MSO_ANCHOR.MIDDLE, after=0)


def list_cards(d, title, items, notes=None, fills=(CARD, CARD2), numbered=True, maxpt=20):
    s = d.slide(title, notes=notes)
    n = len(items)
    cols = 2 if n > 4 else 1
    per = math.ceil(n / cols)
    cwid = (W - 2 * MX - (0.3 if cols == 2 else 0)) / cols
    rh = min(1.0, 5.0 / per)
    pt = fit_each(items, cwid - 1.2, rh - 0.1, maxpt, 12)
    for i, it in enumerate(items):
        c, r = divmod(i, per)
        x = MX + c * (cwid + 0.3)
        y = 1.55 + r * (rh + 0.08)
        box(s, x, y, cwid, rh, fill=fills[i % 2])
        if numbered:
            badge(s, x + 0.2, y + (rh - 0.46) / 2, 0.46, str(i + 1), size=15)
        text(s, x + (0.9 if numbered else 0.3), y, cwid - (1.1 if numbered else 0.5), rh, [it], size=pt, anchor=MSO_ANCHOR.MIDDLE, after=0)
    return s


def coaching_slides(d, pe, day):
    notes = "UE4 · Coaching: transition from Level 1 to Level 2. Trainer-led: a short talk on the coaching focus, then the reflection questions in pairs."
    s = d.slide("Coaching · UE4", notes=notes)
    pill(s, MX, 1.55, 3.6, "Transition: Level 1 to Level 2", fill=CORAL)
    pt = fit([pe["cf"]], 11.5, 2.4, 40, 24, 0)
    text(s, MX, 2.3, 12.1, 2.6, [pe["cf"]], size=pt, color=INK, bold=True, anchor=MSO_ANCHOR.MIDDLE)
    text(s, MX, 5.4, 12.1, 0.8, ["From describing an effect to a decision you answer for."], size=20, color=MUTED)
    if pe.get("cq"):
        list_cards(d, "Coaching · questions we talk through", pe["cq"], notes=notes, maxpt=18)
    if pe.get("cr"):
        s = d.slide("Coaching · reflect in pairs", notes=notes)
        n = len(pe["cr"])
        w3 = (W - 2 * MX - 0.3 * (n - 1)) / n
        for i, q in enumerate(pe["cr"]):
            x = MX + i * (w3 + 0.3)
            box(s, x, 1.7, w3, 4.5, fill=CARD if i % 2 == 0 else CARD2)
            badge(s, x + 0.3, 1.95, 0.7, str(i + 1), size=22, fill=CORAL)
            pt = fit([q], w3 - 0.6, 2.9, 22, 14)
            text(s, x + 0.3, 2.9, w3 - 0.6, 3.1, [q], size=pt, color=INK)


def feedback_slides(d, pe, day):
    notes = "UE7 · Feedback round with a management perspective. Groups present their reasoning, not only their result."
    if pe.get("fp"):
        list_cards(d, "Feedback round · how each group presents", pe["fp"], notes=notes, maxpt=20)
    if pe.get("fq"):
        list_cards(d, "Feedback round · questions to answer", pe["fq"], notes=notes, maxpt=18)
    if pe.get("fi") or pe.get("fd"):
        s = d.slide("Level 3 input and discussion", notes=notes)
        if pe.get("fi"):
            box(s, MX, 1.55, 6.3, 5.0, fill=CARD)
            text(s, MX + 0.3, 1.7, 5.7, 0.35, ["INPUT LEVEL 3"], size=12, bold=True, color=TEAL)
            pt = fit(pe["fi"], 5.4, 4.0, 17, 12, 10)
            text(s, MX + 0.3, 2.15, 5.7, 4.2, pe["fi"], size=pt, after=10, bullets=True)
        if pe.get("fd"):
            x = 7.2
            box(s, x, 1.55, W - MX - x, 5.0, fill=INK)
            text(s, x + 0.35, 1.75, 4.5, 0.35, ["DISCUSSION"], size=12, bold=True, color="7FD6D8")
            pt = fit([pe["fd"]], W - MX - x - 0.7, 3.8, 28, 16, 0)
            text(s, x + 0.35, 2.3, W - MX - x - 0.7, 4.0, [pe["fd"]], size=pt, color=WHITE, bold=True)


# ------------------------------------------------------------------ main
def build(day):
    name = f"Day{day:02d}"
    out = os.path.join(OUT, name)
    os.makedirs(out, exist_ok=True)
    d1, _ = wissen(day)
    d1.save(os.path.join(out, f"1_Wissenstransfer-Slides_{name}.pptx"))
    d3, _ = training(day)
    d3.save(os.path.join(out, f"3_Trainingsfolien_{name}.pptx"))
    return d1.n, d3.n


if __name__ == "__main__":
    for dd in [int(x) for x in sys.argv[1:]] or range(1, 17):
        print("Day", dd, "slides:", build(dd))
