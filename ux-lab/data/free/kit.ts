import { t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";
import type { Raw, AssessField, ListsField, Ref, TextField, TextTable } from "@/lib/dayFree/spec";
import type { MaterialId } from "@/data/materialTypes";

/**
 * Small builders for the free-form days (DL-STANDARD v1.1 and sections 13 to 15). A day's spec file (data/dayN/free.ts) is mostly text; these helpers write the
 * parts that are the same on every day: "Question 1 of 3", a list of N items in its two layouts (a text box and a guided table), a text field with the
 * guide the engine needs, the Low / Medium / High suggestion, and the three-part tables (a decision under uncertainty, a risk, a decision logic). Every text is
 * a pair `[en, de]`, written by hand (CLAUDE.md #32). They return the raw shape of the spec, so `defineSpec` still checks everything.
 */
/** A text: a plain English string, or a pair `[en, de]` once a German version is written (UX writes English first, UX-STANDARD decision 4). */
export type P = string | [en: string, de?: string];
const enOf = (p: P) => (Array.isArray(p) ? p[0] : p);
const deOf = (p: P) => (Array.isArray(p) ? (p[1] ?? p[0]) : p);
export const tp = (p: P | Tx): Tx | string => (typeof p === "string" ? p : Array.isArray(p) ? t(p[0], p[1]) : p);
export const Q = (i: number, n: number) => t(`Question ${i} of ${n}`, `Frage ${i} von ${n}`);
const numbered = (ls: P[]) => t(ls.map((l, i) => `${i + 1}. ${enOf(l)}`).join("\n"), ls.map((l, i) => `${i + 1}. ${deOf(l)}`).join("\n"));

export const SCALE = {
  values: [
    { id: "low", label: t("Low", "Niedrig") },
    { id: "medium", label: t("Medium", "Mittel") },
    { id: "high", label: t("High", "Hoch") },
  ],
  note: t("A scale many teams use (optional):", "Eine Skala, die viele Teams nutzen (optional):"),
};
export const EX_OTHER = t("Example (another company)", "Beispiel (anderes Unternehmen)");
const FRAME_ANSWER: P = ["write each part in your own words; a sentence each is enough", "schreiben Sie jeden Teil in eigenen Worten; ein Satz je Teil genügt"];

export const ref = (label: P, value: P, target: string, card?: MaterialId): Raw<Ref> => ({ label: tp(label), value: tp(value), target, ...(card ? { card } : {}) });

type Guide = { why: string; lookFor: string[]; pitfalls?: string[] };
type Cols = [key: string, label: P][];
type Hints = Record<string, P>;
const mapP = (o: Record<string, P>) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, tp(v)]));
const colsOf = (c: Cols) => c.map(([key, label]) => ({ key, label: tp(label) }));

/** A list of N items: a text box (one per line) by default, a guided table through the quiet link. */
export function listsField(o: {
  id: string;
  q: [number, number];
  label: P;
  steps: P[];
  refs: Raw<Ref>[];
  n: number;
  /** the help under the text box */
  help: P;
  placeholder: P;
  /** what is missing, without a count: "identify 5 possible barriers, one per line" */
  missing: P;
  doc: P;
  lines: P[];
  /** the example for learners, on another company, as lines */
  exLines: P[];
  guide: Guide;
  tableHelp: P;
  cols: Cols;
  hints: Hints;
  exCells: Hints;
  rows: Hints[];
}): Raw<ListsField> {
  return {
    kind: "lists",
    id: o.id,
    qLabel: Q(o.q[0], o.q[1]),
    label: tp(o.label),
    help: "",
    n: o.n,
    steps: o.steps.map(tp),
    refs: o.refs,
    lists: [
      {
        id: `${o.id}Text`,
        label: tp(o.label),
        help: tp(o.help),
        placeholder: tp(o.placeholder),
        missing: tp(o.missing),
        doc: tp(o.doc),
        model: numbered(o.lines),
        guide: { example: numbered(o.exLines), why: o.guide.why, lookFor: o.guide.lookFor, ...(o.guide.pitfalls ? { pitfalls: o.guide.pitfalls } : {}) },
      },
    ],
    table: {
      help: tp(o.tableHelp),
      cols: colsOf(o.cols),
      guide: { hints: mapP(o.hints), example: { cells: mapP(o.exCells) } },
      doc: tp(o.doc),
      model: o.rows.map(mapP),
    },
  };
}

/** A free-text field. `table` is the optional guided table (rows the learner adds, or fixed parts). */
export function textField(o: {
  id: string;
  q?: [number, number];
  label: P;
  help: P;
  min: number;
  rows: number;
  placeholder?: P;
  missing: P;
  steps: P[];
  refs: Raw<Ref>[];
  model: P;
  example: P;
  guide: Guide;
  doc?: P;
  table?: Raw<TextTable>;
}): Raw<TextField> {
  return {
    kind: "text",
    id: o.id,
    ...(o.q ? { qLabel: Q(o.q[0], o.q[1]) } : {}),
    label: tp(o.label),
    help: tp(o.help),
    min: o.min,
    rows: o.rows,
    ...(o.placeholder ? { placeholder: tp(o.placeholder) } : {}),
    missing: tp(o.missing),
    steps: o.steps.map(tp),
    refs: o.refs,
    model: tp(o.model),
    guide: { example: tp(o.example), why: o.guide.why, lookFor: o.guide.lookFor, ...(o.guide.pitfalls ? { pitfalls: o.guide.pitfalls } : {}) },
    ...(o.doc ? { doc: tp(o.doc) } : {}),
    ...(o.table ? { table: o.table } : {}),
  };
}

/** One answer per option (A, B, C) on the same terms, as a box each or a guided table with a Low / Medium / High suggestion. */
export function assessField(o: {
  id: string;
  q: [number, number];
  label: P;
  helpText: P;
  helpTable: P;
  firstCol: P;
  itemWord: P;
  minText: number;
  missing: P;
  items: [id: string, label: P][];
  cols: Cols;
  hints: Hints;
  exFirst: P;
  exCells: Hints;
  /** the columns that get the Low, Medium, High suggestion */
  scale?: string[];
  doc: P;
  steps: P[];
  refs: Raw<Ref>[];
  modelText: Record<string, P>;
  modelRows: Record<string, Hints>;
  example: P;
  guide: Guide;
}): Raw<AssessField> {
  return {
    kind: "assess",
    id: o.id,
    qLabel: Q(o.q[0], o.q[1]),
    label: tp(o.label),
    help: "",
    helpText: tp(o.helpText),
    helpTable: tp(o.helpTable),
    firstCol: tp(o.firstCol),
    itemWord: tp(o.itemWord),
    minText: o.minText,
    missing: tp(o.missing),
    items: o.items.map(([id, label]) => ({ id, label: tp(label) })),
    cols: colsOf(o.cols),
    tableGuide: {
      hints: { first: tp(o.hints.first), ...mapP(Object.fromEntries(Object.entries(o.hints).filter(([k]) => k !== "first"))) },
      example: { first: tp(o.exFirst), cells: mapP(o.exCells) },
      ...(o.scale ? { suggest: Object.fromEntries(o.scale.map((k) => [k, SCALE])) } : {}),
    },
    doc: tp(o.doc),
    steps: o.steps.map(tp),
    refs: o.refs,
    modelText: mapP(o.modelText),
    modelRows: Object.fromEntries(Object.entries(o.modelRows).map(([k, v]) => [k, mapP(v)])),
    guide: { example: tp(o.example), why: o.guide.why, lookFor: o.guide.lookFor, ...(o.guide.pitfalls ? { pitfalls: o.guide.pitfalls } : {}) },
  };
}

/** A table whose rows the learner adds (at least two complete rows count). */
export function rowsTable(o: {
  help: P;
  cols: Cols;
  hints: Hints;
  exCells: Hints;
  rows: Hints[];
  missing: P;
  rowWord: P;
  numbered?: boolean;
  exFirst?: P;
}): Raw<TextTable> {
  return {
    kind: "rows",
    help: tp(o.help),
    cols: colsOf(o.cols),
    ...(o.numbered ? { numbered: true, orderHead: t("Order", "Reihenfolge") } : {}),
    guide: { hints: mapP(o.hints), example: { ...(o.exFirst ? { first: tp(o.exFirst) } : o.numbered ? { first: t("1", "1") } : {}), cells: mapP(o.exCells) } },
    model: o.rows.map(mapP),
    missing: tp(o.missing),
    rowWord: tp(o.rowWord),
  };
}

/** A decision in fixed parts, one row each, one column: the answer. */
export function frameTable(o: {
  help: P;
  head?: P;
  parts: [key: string, label: P][];
  /** the example for learners: one text for the whole table, in the first row's place */
  example: P;
  firstHint?: P;
  model: P[];
  missing: P;
  minCell?: number;
}): Raw<TextTable> {
  return {
    kind: "frame",
    help: tp(o.help),
    head: tp(o.head ?? ["Part", "Teil"]),
    cols: [{ key: "text", label: t("Your answer", "Ihre Antwort") }],
    rows: o.parts.map(([key, label]) => ({ key, label: tp(label) })),
    guide: {
      hints: { first: tp(o.firstHint ?? ["the parts of the answer", "die Teile der Antwort"]), text: tp(FRAME_ANSWER) },
      example: { first: EX_OTHER, cells: { text: tp(o.example) } },
    },
    model: o.model.map((m) => ({ text: tp(m) })),
    minCell: o.minCell ?? 20,
    missing: tp(o.missing),
  };
}

/** The decision under uncertainty, the same three parts on every day (what you decide, what you do not know, when you would reverse it). */
export const uncertainTable = (example: P, model: [P, P, P]): Raw<TextTable> =>
  frameTable({
    help: ["Three parts, one row each: what you decide, what you do not know, when you would reverse it.", "Drei Teile, je eine Zeile: was Sie entscheiden, was Sie nicht wissen, wann Sie die Entscheidung zurücknähmen."],
    parts: [
      ["decide", ["What I decide", "Was ich entscheide"]],
      ["unknown", ["What I do not know", "Was ich nicht weiß"]],
      ["reverse", ["When I would reverse it", "Wann ich sie zurücknähme"]],
    ],
    firstHint: ["the three parts of the decision", "die drei Teile der Entscheidung"],
    example,
    model,
    missing: ["complete the decision under uncertainty", "vervollständigen Sie die Entscheidung unter Unsicherheit"],
  });

/** The standard facilitator card "Case questions · if a participant asks" (DL-STANDARD section 14). */
export const caseCard = (id: string, after: "brief1" | "brief2", qa: [P, P][]) => ({
  id,
  after,
  ariaLabel: t("Case questions for the facilitator", "Fall-Fragen für die Moderation"),
  openLabel: t("Case questions · if a participant asks", "Fall-Fragen · wenn Teilnehmende fragen"),
  hideLabel: t("Hide the case questions", "Die Fall-Fragen ausblenden"),
  sections: [{ kicker: t("If a participant asks …", "Wenn Teilnehmende fragen …"), qa: qa.map(([q, a]) => ({ q: tp(q), a: tp(a) })) }],
});

/** The facilitator cards of the plan's two rows without a deliverable: the Coaching row and the Feedback round. */
export const coachingCard = (focus: P, items: P[], reflection: P[]) => ({
  id: "coaching-card",
  after: "1.2",
  ariaLabel: t("Coaching card for the facilitator", "Coaching-Karte für die Moderation"),
  openLabel: t("Coaching · open it with the group", "Coaching · mit der Gruppe öffnen"),
  hideLabel: t("Hide the coaching card", "Die Coaching-Karte ausblenden"),
  sections: [
    { kicker: tp(focus), items: items.map(tp) },
    { kicker: t("Reflection · talk it through, nothing is written down", "Reflexion · besprechen Sie es, nichts wird aufgeschrieben"), items: reflection.map(tp) },
  ],
});
export const feedbackCard = (preparation: P, input: P[], discussion: P[]) => ({
  id: "feedback-card",
  after: "2.1",
  ariaLabel: t("Feedback round card for the facilitator", "Karte zur Feedbackrunde für die Moderation"),
  openLabel: t("Feedback round · open it with the group", "Feedbackrunde · mit der Gruppe öffnen"),
  hideLabel: t("Hide the feedback card", "Die Feedback-Karte ausblenden"),
  sections: [
    { kicker: t("Preparation", "Vorbereitung"), items: [tp(preparation)] },
    { kicker: t("Level 3 input · talk it through, nothing is written down", "Input Level 3 · besprechen Sie es, nichts wird aufgeschrieben"), items: input.map(tp) },
    { kicker: t("Discussion", "Diskussion"), items: discussion.map(tp) },
  ],
});

/** "In the brief / Clear · Case assumption / Open · on purpose": the known-and-open box of a case brief (DL-STANDARD section 14). */
export const known = (inBrief: (P | Tx)[], clear: (P | Tx)[], open: (P | Tx)[]) => ({
  title: t("What is known and what is open", "Was bekannt ist und was offen ist"),
  columns: [
    { title: t("In the brief", "Im Auftrag"), items: inBrief.map(tp) },
    { title: t("Clear · Case assumption", "Klar · Fallannahme"), items: clear.map(tp) },
    { title: t("Open · on purpose", "Offen · mit Absicht"), items: open.map(tp) },
  ],
  note: t("As in most projects, not everything is known. Decide anyway, and say what you assume.", "Wie in den meisten Projekten ist nicht alles bekannt. Entscheiden Sie trotzdem, und sagen Sie, was Sie annehmen."),
});
