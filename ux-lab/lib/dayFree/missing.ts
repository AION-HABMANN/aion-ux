import { MIN_CELL, MIN_ROWS, assessItemsMissing, blocksOf, frameGaps, len, listCount, rowsFullCount, rowsPartialIdx, sliceOf, tableMode } from "@/lib/dayFree/model";
import type { TextField, TextTable } from "@/lib/dayFree/spec";
import type { FreeSpec } from "@/lib/dayFree/spec";
import { participantMissing } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at: one place, so the list and the UI cannot drift. */
export const fieldDomId = (id: string) => `${id}-field`;
export const rowDomId = (id: string, i: number) => `${id}-row-${i}`;
export const itemDomId = (id: string, item: string) => `${id}-${item}`;

const have = (c: number, n: number) => `${tt("you have", "Sie haben")} ${c} ${tt("of", "von")} ${n}`;
const atLeast = (n: number) => `${tt("at least", "mindestens")} ${n} ${tt("characters", "Zeichen")}`;

/**
 * The missing list of one route, derived from the spec (CLAUDE.md #1, #34, #57). Every label starts "Block X.Y:", in both languages (the per-block notice
 * filters on that prefix). All blocks are Core: an entry is a field that is empty, too short, or a list with fewer items than the plan asks for. A choice
 * that differs from the model is never missing (#38).
 */
export function freeMissing(p: Persisted, spec: FreeSpec, route: 1 | 2): MissingEntry[] {
  const out = participantMissing(p);
  const r = sliceOf(p, spec.day)[route === 1 ? "r1" : "r2"];
  const e = (id: string, label: string) => out.push({ id, label });
  for (const b of blocksOf(spec, route)) {
    const pre = `Block ${b.id}: `;
    for (const f of b.fields) {
      if (f.kind === "text") {
        if (tableMode(f, r) && f.table) {
          if (f.table.kind === "rows") {
            const tf = f as TextField & { table: Extract<TextTable, { kind: "rows" }> };
            if (rowsFullCount(tf, r) < MIN_ROWS) e(fieldDomId(f.id), `${pre}${f.table.missing} (${tt("at least", "mindestens")} ${MIN_ROWS} ${tt("complete rows", "vollständige Zeilen")}).`);
            for (const i of rowsPartialIdx(tf, r)) e(rowDomId(f.id, i), `${pre}${tt("finish", "vervollständigen Sie")} ${tf.table.rowWord} ${i + 1} ${tt("or clear it.", "oder leeren Sie sie.")}`);
          } else {
            const tf = f as TextField & { table: Extract<TextTable, { kind: "frame" }> };
            for (const i of frameGaps(tf, r)) e(rowDomId(f.id, i), `${pre}${tf.table.missing}: ${tf.table.rows[i].label.toLowerCase()} (${tt("at least", "mindestens")} ${tf.table.minCell} ${tt("characters", "Zeichen")}).`);
          }
        } else if (len(r.text[f.id]) < f.min) e(fieldDomId(f.id), `${pre}${f.missing} (${atLeast(f.min)}).`);
      } else if (f.kind === "pick") {
        if (!r.picks[f.id]) e(fieldDomId(f.id), `${pre}${f.missing}`);
      } else if (f.kind === "lists") {
        const table = (r.modes[f.id] ?? "text") === "table";
        if (!table) {
          f.lists.forEach((l, i) => {
            const c = listCount(f, i, r);
            if (c < f.n) e(fieldDomId(l.id), `${pre}${l.missing} (${have(c, f.n)}).`);
          });
        } else {
          (r.rows[f.id] ?? []).forEach((row, i) => {
            const lack = f.table.cols.filter((c) => len(row[c.key]) < MIN_CELL).map((c) => c.label.toLowerCase());
            if (lack.length) e(rowDomId(f.id, i), `${pre}${tt("row", "Zeile")} ${i + 1} ${tt("still needs", "braucht noch")}: ${lack.join(", ")}.`);
          });
        }
      } else {
        const table = (r.modes[f.id] ?? "text") === "table";
        for (const it of assessItemsMissing(f, r)) {
          if (!table) e(itemDomId(f.id, it.id), `${pre}${f.missing}: ${f.itemWord} ${it.label} (${atLeast(f.minText)}).`);
          else {
            const lack = f.cols.filter((c) => len(r.assessRows[f.id]?.[it.id]?.[c.key]) < MIN_CELL).map((c) => c.label.toLowerCase());
            e(itemDomId(f.id, it.id), `${pre}${f.itemWord} ${it.label} ${tt("still needs", "braucht noch")}: ${lack.join(", ")}.`);
          }
        }
      }
    }
  }
  return out;
}
