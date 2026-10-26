import type { AssessField, BlockSpec, FreeField, FreeSpec, ListsField, PickField, TextField, TextTable } from "@/lib/dayFree/spec";
import type { FreeRoute, FreeState } from "@/store/dayTypesFree";
import type { Persisted } from "@/store/useStore";

/** The length minimums of a free-form day (the same as Day 2 and Day 3). */
export const MIN_LINE = 30;
export const MIN_FRAME = 60;
/** A table cell counts from this many characters. */
export const MIN_CELL = 3;
/** A line of a list counts from this many characters (a leading number or bullet is ignored). */
export const MIN_LIST_LINE = 8;

export const len = (t: string | undefined) => (t ?? "").trim().length;
export const listLines = (t: string) => t.split(/\r?\n/).map((x) => x.replace(/^\s*(?:\d+[.):]|[-*•])\s*/, "").trim()).filter((x) => x.length >= MIN_LIST_LINE);

export const blocksOf = (spec: FreeSpec, route: 1 | 2): BlockSpec[] => (route === 1 ? spec.blocks1 : [spec.block2]);
export const fieldsOf = (spec: FreeSpec, route: 1 | 2): FreeField[] => blocksOf(spec, route).flatMap((b) => b.fields);
/** "1.1" → "b11", the key of a block in the progress record and the page map. */
export const blockKey = (id: string) => `b${id.replace(".", "")}`;

/** The state of one route before anything is answered: every key of the spec present, so a saved blob merges field by field (CLAUDE.md #9). */
export function emptyFreeRoute(fields: FreeField[]): FreeRoute {
  const r: FreeRoute = { text: {}, modes: {}, rows: {}, assessText: {}, assessRows: {}, picks: {} };
  for (const f of fields) {
    if (f.kind === "text") {
      r.text[f.id] = "";
      if (f.table) {
        r.modes[f.id] = "text";
        r.rows[f.id] = f.table.kind === "rows" ? Array.from({ length: 3 }, () => blankRow(f.table as Extract<TextTable, { kind: "rows" }>)) : (f.table.rows.map(() => blankRow(f.table as Extract<TextTable, { kind: "frame" }>)));
      }
    } else if (f.kind === "lists") {
      f.lists.forEach((l) => (r.text[l.id] = ""));
      r.modes[f.id] = "text";
      r.rows[f.id] = Array.from({ length: f.n }, () => Object.fromEntries(f.table.cols.map((c) => [c.key, ""])));
    } else if (f.kind === "assess") {
      r.modes[f.id] = "text";
      r.assessText[f.id] = Object.fromEntries(f.items.map((i) => [i.id, ""]));
      r.assessRows[f.id] = Object.fromEntries(f.items.map((i) => [i.id, Object.fromEntries(f.cols.map((c) => [c.key, ""]))]));
    } else r.picks[f.id] = null;
  }
  return r;
}
const blankRow = (t: { cols: { key: string }[] }) => Object.fromEntries(t.cols.map((c) => [c.key, ""]));
export const emptyFree = (spec: FreeSpec): FreeState => ({ r1: emptyFreeRoute(fieldsOf(spec, 1)), r2: emptyFreeRoute(fieldsOf(spec, 2)) });

export const sliceOf = (p: Persisted, day: number): FreeState => (p as unknown as Record<string, FreeState>)[`d${day}`];

/* ------------------------------------------------------------------ what counts */

const rowDone = (row: Record<string, string> | undefined, keys: string[]) => !!row && keys.every((k) => len(row[k]) >= MIN_CELL);

/** The number of complete table rows of a lists field. */
export const tableRowsDone = (f: ListsField, r: FreeRoute) => (r.rows[f.id] ?? []).filter((row) => rowDone(row, f.table.cols.map((c) => c.key))).length;
/** The number of items written in one list, in the layout the learner chose (the other layout is kept but does not count). */
export const listCount = (f: ListsField, listIndex: number, r: FreeRoute) => ((r.modes[f.id] ?? "text") === "table" ? tableRowsDone(f, r) : listLines(r.text[f.lists[listIndex].id] ?? "").length);

export const assessItemsMissing = (f: AssessField, r: FreeRoute) =>
  f.items.filter((i) => ((r.modes[f.id] ?? "text") === "table" ? !rowDone(r.assessRows[f.id]?.[i.id], f.cols.map((c) => c.key)) : len(r.assessText[f.id]?.[i.id]) < f.minText));

/* ------------------------------------------------------------------ the guided table of a text field (DL-STANDARD section 15) */

/** A table answer counts from this many complete rows; an empty row is ignored and a half-filled row is named. */
export const MIN_ROWS = 2;
export const MAX_ROWS = 8;
const colMin = (c: { short?: boolean }) => (c.short ? 2 : MIN_CELL);
/** A leading scale word a learner may tap in ("Medium: ") does not count: the reason is the answer. */
export const cellOf = (v: string | undefined) => (v ?? "").replace(/^\s*(Low|Medium|High|Niedrig|Mittel|Hoch):\s*/i, "").trim();
type TRows = Extract<TextTable, { kind: "rows" }>;
type TFrame = Extract<TextTable, { kind: "frame" }>;
export const rowKindOf = (row: Record<string, string> | undefined, cols: { key: string; short?: boolean }[]): "empty" | "partial" | "full" => {
  if (!row || cols.every((c) => !(row[c.key] ?? "").trim())) return "empty";
  return cols.every((c) => cellOf(row[c.key]).length >= colMin(c)) ? "full" : "partial";
};
export const tableMode = (f: TextField, r: FreeRoute) => !!f.table && (r.modes[f.id] ?? "text") === "table";
export const rowsFullCount = (f: TextField & { table: TRows }, r: FreeRoute) => (r.rows[f.id] ?? []).filter((row) => rowKindOf(row, f.table.cols) === "full").length;
export const rowsPartialIdx = (f: TextField & { table: TRows }, r: FreeRoute) => (r.rows[f.id] ?? []).map((row, i) => (rowKindOf(row, f.table.cols) === "partial" ? i : -1)).filter((i) => i >= 0);
/** The parts of a frame table that are still too short, by row index. */
export const frameGaps = (f: TextField & { table: TFrame }, r: FreeRoute) => f.table.rows.map((_, i) => i).filter((i) => f.table.cols.some((c) => len(r.rows[f.id]?.[i]?.[c.key]) < f.table.minCell));
export function textComplete(f: TextField, r: FreeRoute): boolean {
  if (!tableMode(f, r)) return len(r.text[f.id]) >= f.min;
  if (f.table!.kind === "rows") return rowsFullCount(f as TextField & { table: TRows }, r) >= MIN_ROWS && rowsPartialIdx(f as TextField & { table: TRows }, r).length === 0;
  return frameGaps(f as TextField & { table: TFrame }, r).length === 0;
}

export function fieldComplete(f: FreeField, r: FreeRoute): boolean {
  if (f.kind === "text") return textComplete(f, r);
  if (f.kind === "lists") return f.lists.every((_, i) => listCount(f, i, r) >= f.n);
  if (f.kind === "assess") return assessItemsMissing(f, r).length === 0;
  return !!r.picks[f.id];
}
export const blockComplete = (b: BlockSpec, r: FreeRoute) => b.fields.every((f) => fieldComplete(f, r));

export type { AssessField, BlockSpec, FreeField, ListsField, PickField, TextField };
