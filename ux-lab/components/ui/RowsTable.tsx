"use client";

import type { ReactNode } from "react";
import { CellField, GridTable, SuggestChips } from "@/components/ui/FormOrTable";
import type { FTCol, TableGuide } from "@/components/ui/FormOrTable";
import { Field } from "@/components/ui/Field";
import { tt } from "@/lib/lang";

/**
 * A guided table with fixed, labelled rows (DL-STANDARD section 15), for a decision in parts (what you decide, what you do not know, when you would
 * reverse it) or a set of named things (the three phases of a journey). One or more columns; the rows are the plan's, so there is no add button.
 */
export function FrameTable({
  id,
  label,
  help,
  head,
  rows,
  cols,
  values,
  onCell,
  rowId,
  guide,
  children,
}: {
  id: string;
  label: ReactNode;
  help: ReactNode;
  head: string;
  rows: { key: string; label: string }[];
  cols: FTCol[];
  values: Record<string, string>[];
  onCell: (row: number, key: string, v: string) => void;
  rowId: (i: number) => string;
  guide: TableGuide;
  children?: ReactNode;
}) {
  return (
    <Field id={id} label={label} help={help}>
      <div className="space-y-2">
        <GridTable
          head={[head, ...cols.map((c) => c.label)]}
          hints={[guide.hints.first, ...cols.map((c) => guide.hints[c.key])]}
          example={[guide.example.first, ...cols.map((c) => guide.example.cells[c.key])]}
          exampleLabel={guide.exampleLabel}
          rows={rows.map((rw, i) => ({
            id: rowId(i),
            label: rw.label,
            cells: cols.map((c) => <CellField key={c.key} value={values[i]?.[c.key] ?? ""} onChange={(v) => onCell(i, c.key, v)} label={`${rw.label}: ${c.label}`} />),
          }))}
        />
        {children}
      </div>
    </Field>
  );
}

/**
 * A guided table whose rows the learner adds (DL-STANDARD section 15), for a question that asks for "a list of things, each described by several
 * things" and does not fix how many: the data you need, a roadmap, the risks. It starts with a few rows, a quiet button adds one more (up to
 * `max`) and removes an empty last row. Same look as every guided table: a real table, a hint under each column header, one grey example row,
 * optional suggestions for a column. `numbered` puts the row number first, for an order (a roadmap).
 */
export function RowsTable({
  id,
  label,
  help,
  cols,
  rows,
  onCell,
  onAdd,
  onRemoveLast,
  rowId,
  guide,
  numbered = false,
  orderHead,
  min = 3,
  max = 8,
  children,
}: {
  id: string;
  label: ReactNode;
  help: ReactNode;
  cols: FTCol[];
  rows: Record<string, string>[];
  onCell: (row: number, key: string, v: string) => void;
  onAdd: () => void;
  onRemoveLast: () => void;
  rowId: (i: number) => string;
  guide: TableGuide;
  numbered?: boolean;
  orderHead?: string;
  min?: number;
  max?: number;
  children?: ReactNode;
}) {
  const lastEmpty = rows.length > min && cols.every((c) => !(rows[rows.length - 1][c.key] ?? "").trim());
  return (
    <Field id={id} label={label} help={help}>
      <div className="space-y-2">
        <GridTable
          head={[...(numbered ? [orderHead ?? "#"] : []), ...cols.map((c) => c.label)]}
          hints={[...(numbered ? [guide.hints.first] : []), ...cols.map((c) => guide.hints[c.key])]}
          example={[...(numbered ? [guide.example.first] : []), ...cols.map((c) => guide.example.cells[c.key])]}
          exampleLabel={guide.exampleLabel}
          rows={rows.map((row, i) => ({
            id: rowId(i),
            label: numbered ? String(i + 1) : undefined,
            cells: cols.map((c) => {
              const s = guide.suggest?.[c.key];
              return (
                <div key={c.key}>
                  <CellField value={row[c.key] ?? ""} onChange={(v) => onCell(i, c.key, v)} label={tt(`Row ${i + 1}: ${c.label}`, `Zeile ${i + 1}: ${c.label}`)} />
                  {s && <SuggestChips values={s.values} note={s.note} current={row[c.key] ?? ""} onPick={(v) => onCell(i, c.key, v)} />}
                </div>
              );
            }),
          }))}
        />
        <p className="flex flex-wrap items-center gap-3 px-1 text-caption text-ash">
          {rows.length < max && (
            <button type="button" onClick={onAdd} className="btn-ghost btn-sm">
              {tt("Add a row", "Zeile hinzufügen")}
            </button>
          )}
          {lastEmpty && (
            <button type="button" onClick={onRemoveLast} className="underline decoration-dotted underline-offset-2 hover:text-ink">
              {tt("Remove the empty last row", "Die leere letzte Zeile entfernen")}
            </button>
          )}
          <span>{tt(`${rows.length} rows, up to ${max}`, `${rows.length} Zeilen, bis zu ${max}`)}</span>
        </p>
        {children}
      </div>
    </Field>
  );
}
