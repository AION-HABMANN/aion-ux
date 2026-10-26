"use client";

import type { ReactNode } from "react";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { Field } from "@/components/ui/Field";
import { tt } from "@/lib/lang";

export type FTItem = { id: string; label: string };
export type FTCol = { key: string; label: string };

/**
 * The guidance of a guided table (DL-STANDARD section 15): a hint for every column, one grey example row from another company (never this case's
 * answer), and optional suggestions for a column (a scale many teams use). It only shows in the table layout, is never exported and never checked.
 */
export type TableGuide = {
  title: string;
  exampleLabel: string;
  /** What each column asks, keyed like the columns (`first` is the first column). */
  hints: Record<string, string>;
  /** The grey example row: the text of the first column, then one text per column key. */
  example: { first: string; cells: Record<string, string> };
  /** Suggestions a learner can tap into a cell, per column key (optional, never required). */
  suggest?: Record<string, { values: { id: string; label: string }[]; note: string }>;
};

/** Small taps under a cell that put a suggestion at the start of the cell ("Low: "). The learner can type anything instead. */
export function SuggestChips({ values, note, current, onPick }: { values: { id: string; label: string }[]; note: string; current: string; onPick: (v: string) => void }) {
  return (
    <span className="flex flex-wrap items-center gap-1 px-2 pb-1.5 text-micro normal-case tracking-normal text-ash" title={note} role="group" aria-label={note}>
      {values.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => {
            const stripped = values.reduce((s, x) => (s.startsWith(`${x.label}: `) ? s.slice(x.label.length + 2) : s), current);
            onPick(`${v.label}: ${stripped}`);
          }}
          className="rounded border border-line bg-paper px-1.5 py-0.5 hover:border-ash hover:text-ink"
        >
          {v.label}
        </button>
      ))}
    </span>
  );
}

/** A cell that is a text field: no box of its own, it fills the cell and grows with the text (the cell, and so the row, grows like in a Google Docs table). */
export function CellField({ value, onChange, label, placeholder }: { value: string; onChange: (v: string) => void; label: string; placeholder?: string }) {
  return (
    <AutoTextarea
      minRows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      placeholder={placeholder}
      className="block !rounded-none !border-0 !bg-transparent !px-2 !py-2 focus:bg-accentSoft/40"
    />
  );
}

export type GridRow = { id: string; /** the label of the row (a row header); without it every cell is a field */ label?: string; cells: ReactNode[] };

/**
 * A real table, like the one in a Google Docs page (DL-STANDARD section 15): borders, a shaded header row, a row header, cells that are text fields
 * and grow with what is typed. On a narrow screen the table scrolls inside its own frame, never the page. A guide adds a hint under each column
 * header and one grey example row at the top.
 */
export function GridTable({ head, hints, example, exampleLabel, rows }: { head: string[]; hints?: string[]; example?: string[]; exampleLabel?: string; rows: GridRow[] }) {
  const hasLabel = rows.some((r) => r.label !== undefined);
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-[34rem] table-fixed border-collapse text-caption">
        <colgroup>
          {head.map((_, i) => (
            <col key={i} style={{ width: i === 0 && hasLabel ? "22%" : undefined }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h} scope="col" className="border border-line bg-mist p-2 text-left align-top font-semibold text-ink">
                <span className="smallcaps text-ink">{h}</span>
                {hints?.[i] && <span className="mt-0.5 block text-micro font-normal normal-case tracking-normal text-ash">{hints[i]}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {example && (
            <tr className="bg-canvas italic text-ash">
              {example.map((x, i) => (
                <td key={i} className="border border-line p-2 align-top">
                  {i === 0 && exampleLabel && <span className="smallcaps mb-0.5 block not-italic text-ash">{exampleLabel}</span>}
                  {x}
                </td>
              ))}
            </tr>
          )}
          {rows.map((r) => (
            <tr key={r.id} id={r.id}>
              {r.label !== undefined && (
                <th scope="row" className="border border-line bg-canvas p-2 text-left align-top font-semibold text-ink">
                  {r.label}
                </th>
              )}
              {r.cells.map((c, i) => (
                <td key={i} className="border border-line p-0 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The quiet link under a field that switches between the writing layout and the table (one wording for the whole course). */
export function LayoutLink({ mode, onMode, guided = true, backText }: { mode: "text" | "table"; onMode: (m: "text" | "table") => void; guided?: boolean; backText?: string }) {
  return (
    <p className="px-1 text-caption text-ash">
      <button type="button" onClick={() => onMode(mode === "text" ? "table" : "text")} className="underline decoration-dotted underline-offset-2 hover:text-ink">
        {mode === "text"
          ? guided
            ? tt("Not sure how to fill this in? Use the guided table.", "Unsicher, wie Sie das ausfüllen? Nutzen Sie die geführte Tabelle.")
            : tt("Prefer a table? Fill in rows instead.", "Lieber eine Tabelle? Dann in Zeilen ausfüllen.")
          : (backText ?? tt("Back to one box each.", "Zurück zu einem Feld je Eintrag."))}
      </button>{" "}
      {tt("Your answer in the other layout is kept.", "Ihre Antwort im anderen Layout bleibt erhalten.")}
    </p>
  );
}

/**
 * One answer per item (an option, a test) in two layouts the learner chooses between (CLAUDE.md #57, DL-STANDARD sections 2 and 15): a box per item
 * by default, and a real table (one row per item, one column per thing to say; with a guide a hint per column, a grey example row and optional
 * suggestions) through one quiet text link under the field. Both layouts are kept by the caller; only the chosen one counts and is exported.
 * `rowId` gives every item a DOM id so the missing list can jump to it (#2).
 */
export function FormOrTable({
  id,
  label,
  help,
  mode,
  onMode,
  items,
  cols,
  text,
  rows,
  onText,
  onCell,
  rowId,
  firstCol,
  textRows = 3,
  guide,
  children,
}: {
  id: string;
  label: ReactNode;
  help: ReactNode;
  mode: "text" | "table";
  onMode: (m: "text" | "table") => void;
  items: FTItem[];
  cols: FTCol[];
  text: Record<string, string>;
  rows: Record<string, Record<string, string>>;
  onText: (itemId: string, v: string) => void;
  onCell: (itemId: string, key: string, v: string) => void;
  rowId: (itemId: string) => string;
  firstCol: string;
  textRows?: number;
  guide?: TableGuide;
  children?: ReactNode;
}) {
  return (
    <>
      <Field id={id} label={label} help={help}>
        <div className="space-y-2">
          {mode === "text" ? (
            items.map((it) => (
              <label key={it.id} id={rowId(it.id)} className="block">
                <span className="smallcaps text-ash">{it.label}</span>
                <AutoTextarea
                  className="mt-1"
                  minRows={textRows}
                  value={text[it.id] ?? ""}
                  onChange={(e) => onText(it.id, e.target.value)}
                  aria-label={it.label}
                />
              </label>
            ))
          ) : (
            <GridTable
              head={[firstCol, ...cols.map((c) => c.label)]}
              hints={guide ? [guide.hints.first, ...cols.map((c) => guide.hints[c.key])] : undefined}
              example={guide ? [guide.example.first, ...cols.map((c) => guide.example.cells[c.key])] : undefined}
              exampleLabel={guide?.exampleLabel}
              rows={items.map((it) => ({
                id: rowId(it.id),
                label: it.label,
                cells: cols.map((c) => {
                  const cur = rows[it.id]?.[c.key] ?? "";
                  return (
                    <div key={c.key}>
                      <CellField value={cur} onChange={(v) => onCell(it.id, c.key, v)} label={`${it.label}: ${c.label}`} />
{guide?.suggest?.[c.key] && <SuggestChips values={guide.suggest[c.key].values} note={guide.suggest[c.key].note} current={cur} onPick={(v) => onCell(it.id, c.key, v)} />}
                    </div>
                  );
                }),
              }))}
            />
          )}
          {children}
        </div>
      </Field>
      <LayoutLink mode={mode} onMode={onMode} guided={!!guide} />
    </>
  );
}
