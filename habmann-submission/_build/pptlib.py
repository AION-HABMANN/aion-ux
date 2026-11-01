"""Small helpers on top of python-pptx for the Habmann slide decks (16:9, Calibri, one palette)."""
import math
import os

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt
from lxml import etree

W, H = 13.333, 7.5
MX = 0.6
INK = "1B2540"
TEAL = "0F8B8D"
CORAL = "D9482B"
CARD = "EEF2F6"
CARD2 = "E3F1F1"
LINE = "D5DCE5"
TXT = "1F2937"
MUTED = "5B6577"
WHITE = "FFFFFF"
FONT = "Calibri"
HEAD = "Calibri"


def rgb(h):
    return RGBColor.from_string(h)


def est_lines(text, pt, width_in):
    cw = 0.52 * pt / 72.0
    per = max(1, int(width_in / cw))
    n = 0
    for part in str(text).split("\n"):
        n += max(1, math.ceil(len(part) / per))
    return n


def est_height(texts, pt, width_in, after_pt=6, line=1.2):
    h = 0.0
    for t in texts:
        h += est_lines(t, pt, width_in) * pt * line / 72.0 + after_pt / 72.0
    return h


def fit(texts, width_in, height_in, maxpt=20, minpt=12, after_pt=6):
    pt = maxpt
    while pt > minpt and est_height(texts, pt, width_in, after_pt) > height_in:
        pt -= 1
    return pt


def fit_each(texts, width_in, height_in, maxpt=20, minpt=12, after_pt=0):
    """One size that fits every text into its own box of the same size."""
    return min(fit([t], width_in, height_in, maxpt, minpt, after_pt) for t in texts)


def table_fit(head, rows, total, sizes=(16, 15, 14, 13, 12), maxh=4.85):
    """Largest font size that keeps the table on as few slides as it needs at 12 pt. Returns (size, col_w, chunks)."""
    cw12 = col_widths(head, rows, total, 12)
    n12 = len(chunk_rows(rows, cw12, 12, maxh))
    for sz in sizes:
        cw = col_widths(head, rows, total, sz)
        ch = chunk_rows(rows, cw, sz, maxh)
        if len(ch) <= n12:
            return sz, cw, ch
    return 12, cw12, chunk_rows(rows, cw12, 12, maxh)


class Deck:
    def __init__(self, day, label):
        self.prs = Presentation()
        self.prs.slide_width = Inches(W)
        self.prs.slide_height = Inches(H)
        self.day = day
        self.label = label
        self.n = 0
        self.layout = self.prs.slide_layouts[5]  # Title Only

    # ---- slides
    def slide(self, title="", dark=False, notes=None, size=None, footer=True, title_w=None):
        s = self.prs.slides.add_slide(self.layout)
        self.n += 1
        bg = s.background.fill
        bg.solid()
        bg.fore_color.rgb = rgb(INK if dark else WHITE)
        t = s.shapes.title
        t.left, t.top, t.width, t.height = Inches(MX), Inches(0.4), Inches(title_w or (W - 2 * MX)), Inches(1.0)
        tf = t.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf.text = title
        pt = size or fit([title], (title_w or (W - 2 * MX)), 1.0, 32, 22, 0)
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.LEFT
        for r in p.runs:
            r.font.size = Pt(pt)
            r.font.bold = True
            r.font.name = HEAD
            r.font.color.rgb = rgb(WHITE if dark else INK)
        if footer:
            self.footer(s, dark)
        if notes:
            s.notes_slide.notes_text_frame.text = notes
        return s

    def footer(self, s, dark=False):
        col = "AEB7C7" if dark else MUTED
        text(s, MX, 7.08, 9.0, 0.25, [f"AION UX Developer · Day {self.day} · {self.label}"], size=10, color=col)
        text(s, W - MX - 1.0, 7.08, 1.0, 0.25, [str(self.n)], size=10, color=col, align=PP_ALIGN.RIGHT)

    def save(self, path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        self.prs.save(path)


# ---- primitives
def _bullet(p, char="•", indent=0.22):
    pPr = p._p.get_or_add_pPr()
    pPr.set("marL", str(int(Inches(indent))))
    pPr.set("indent", str(-int(Inches(indent))))
    for tag in ("a:buNone", "a:buChar", "a:buAutoNum"):
        for e in pPr.findall(qn(tag)):
            pPr.remove(e)
    bu = etree.SubElement(pPr, qn("a:buChar"))
    bu.set("char", char)


def text(s, x, y, w, h, paras, size=16, color=TXT, bold=False, font=FONT, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP,
         after=6, bullets=False, italic=False, name=None):
    """paras: list of str, or of (str, {size,bold,color,italic}) or of list of runs [(str, {..}), ...]."""
    tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    if name:
        tb.name = name
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    first = True
    for para in paras:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.alignment = align
        p.space_after = Pt(after)
        runs = para if isinstance(para, list) else [para]
        for run in runs:
            if isinstance(run, tuple):
                t, o = run
            else:
                t, o = run, {}
            r = p.add_run()
            r.text = t
            f = r.font
            f.name = o.get("font", font)
            f.size = Pt(o.get("size", size))
            f.bold = o.get("bold", bold)
            f.italic = o.get("italic", italic)
            f.color.rgb = rgb(o.get("color", color))
        if bullets:
            _bullet(p)
    return tb


def box(s, x, y, w, h, fill=CARD, line=None, radius=0.05, shape=MSO_SHAPE.ROUNDED_RECTANGLE, name=None):
    sh = s.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        sh.adjustments[0] = radius
    sh.fill.solid()
    sh.fill.fore_color.rgb = rgb(fill)
    if line:
        sh.line.color.rgb = rgb(line)
        sh.line.width = Pt(0.75)
    else:
        sh.line.fill.background()
    sh.shadow.inherit = False
    if name:
        sh.name = name
    return sh


def badge(s, x, y, d, label, fill=TEAL, color=WHITE, size=16):
    sh = box(s, x, y, d, d, fill=fill, shape=MSO_SHAPE.OVAL)
    tf = sh.text_frame
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = label
    r.font.size = Pt(size)
    r.font.bold = True
    r.font.name = FONT
    r.font.color.rgb = rgb(color)
    return sh


def pill(s, x, y, w, label, fill=TEAL, color=WHITE, size=12, h=0.34):
    sh = box(s, x, y, w, h, fill=fill, radius=0.5)
    tf = sh.text_frame
    tf.margin_left = tf.margin_right = Inches(0.1)
    tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = label
    r.font.size = Pt(size)
    r.font.bold = True
    r.font.name = FONT
    r.font.color.rgb = rgb(color)
    return sh


def picture(s, path, x, y, w, h, alt=""):
    """Fits the picture into the box, keeps the aspect ratio, centres it. Returns (x, y, w, h) used."""
    with Image.open(path) as im:
        iw, ih = im.size
    r = min(w / iw, h / ih)
    pw, ph = iw * r, ih * r
    px, py = x + (w - pw) / 2, y + (h - ph) / 2
    pic = s.shapes.add_picture(path, Inches(px), Inches(py), Inches(pw), Inches(ph))
    pic._element.nvPicPr.cNvPr.set("descr", alt)
    return px, py, pw, ph


def table(s, x, y, w, col_w, head, rows, size=12, head_fill=INK, first_bold=True):
    """col_w in inches (sum = w). Row heights are estimated; PowerPoint grows a row when its text needs more."""
    n = len(rows) + 1
    gh = s.shapes.add_table(n, len(head), Inches(x), Inches(y), Inches(w), Inches(0.4 * n))
    t = gh.table
    t.first_row = True
    t.horz_banding = False
    for i, cw in enumerate(col_w):
        t.columns[i].width = Inches(cw)
    heights = [0.38]
    for ri, row in enumerate(rows):
        lines = max(est_lines(c, size, col_w[ci] - 0.2) for ci, c in enumerate(row))
        heights.append(max(0.4, lines * size * 1.2 / 72 + 0.16))
    for i, hh in enumerate(heights):
        t.rows[i].height = Inches(hh)

    def put(cell, txt, bold, color, fill, sz):
        cell.fill.solid()
        cell.fill.fore_color.rgb = rgb(fill)
        cell.margin_left = cell.margin_right = Inches(0.1)
        cell.margin_top = cell.margin_bottom = Inches(0.05)
        cell.vertical_anchor = MSO_ANCHOR.TOP
        tf = cell.text_frame
        tf.word_wrap = True
        parts = str(txt).split("\n")
        for pi, part in enumerate(parts):
            p = tf.paragraphs[0] if pi == 0 else tf.add_paragraph()
            r = p.add_run()
            r.text = part
            r.font.size = Pt(sz)
            r.font.bold = bold
            r.font.name = FONT
            r.font.color.rgb = rgb(color)

    for ci, hd in enumerate(head):
        put(t.cell(0, ci), hd, True, WHITE, head_fill, size)
    for ri, row in enumerate(rows, 1):
        for ci, c in enumerate(row):
            put(t.cell(ri, ci), c, first_bold and ci == 0, TXT, WHITE if ri % 2 else "F4F7FA", size)
    return gh, sum(heights)


def col_widths(head, rows, total, size=12, minw=1.5):
    wts = []
    for ci in range(len(head)):
        avg = sum(len(r[ci]) for r in rows) / max(1, len(rows))
        wts.append(max(avg, len(head[ci]), 8) ** 0.75)
    s = sum(wts)
    ws = [max(minw, total * w / s) for w in wts]
    k = total / sum(ws)
    return [w * k for w in ws]


def chunk_rows(rows, col_w, size=12, maxh=4.85):
    out, cur, h = [], [], 0.45
    for row in rows:
        lines = max(est_lines(c, size, col_w[ci] - 0.2) for ci, c in enumerate(row))
        rh = max(0.4, lines * size * 1.2 / 72 + 0.16)
        if cur and h + rh > maxh:
            out.append(cur)
            cur, h = [], 0.45
        cur.append(row)
        h += rh
    if cur:
        out.append(cur)
    return out
