"use client";

import clsx from "clsx";
import { Insight } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/** The worked-example grid of the free-form figures (copied unchanged from DL Day 1's diagrams, where it was born; CLAUDE.md #25). */
const LV = () => ["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const GLYPH = ["", "●○○", "●●○", "●●●"];

export type GridCell = { level: 1 | 2 | 3; reason: string; note?: string };
export type GridRow = { id: string; name: string; sub?: string; cells: Record<string, GridCell> };

/**
 * A worked example on a different company: rows are options, columns the questions asked of each. Every cell is a button that opens the reason for its rating
 * (CLAUDE.md #25). A rating is a word and a glyph (●●○), never a colour alone, and never "good" or "bad": a High risk is not a high mark.
 */
export function OptionGrid({ label, rows, cols, selected, onSelect, caption }: { label: string; rows: GridRow[]; cols: { id: string; label: string }[]; selected: string | null; onSelect: (key: string | null) => void; caption: string }) {
  const sel = selected ? selected.split(".") : null;
  const row = sel ? rows.find((r) => r.id === sel[0]) : null;
  const cell = row && sel ? row.cells[sel[1]] : null;
  const colLabel = sel ? cols.find((c) => c.id === sel[1])?.label : "";
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[32rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{caption}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th scope="col" className="px-3 py-2">{label}</th>
              {cols.map((c) => (
                <th key={c.id} scope="col" className="px-3 py-2">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-line align-top">
                <th scope="row" className="px-3 py-2 text-left font-semibold text-ink">
                  {r.name}
                  {r.sub && <span className="block font-normal text-ash">{r.sub}</span>}
                </th>
                {cols.map((c) => {
                  const key = `${r.id}.${c.id}`;
                  const on = selected === key;
                  const x = r.cells[c.id];
                  return (
                    <td key={c.id} className="px-2 py-1.5">
                      <button
                        type="button"
                        aria-pressed={on}
                        aria-label={`${r.name}, ${c.label}: ${LV()[x.level]}`}
                        onClick={() => onSelect(on ? null : key)}
                        className={clsx("flex min-h-[44px] w-full flex-col items-start justify-center rounded-lg border px-2 py-1 text-left transition-colors", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}
                      >
                        <span className="font-semibold text-ink">
                          <span aria-hidden className="mr-1.5 tracking-wider">{GLYPH[x.level]}</span>
                          {LV()[x.level]}
                        </span>
                        {x.note && <span className="text-micro text-ash">{x.note}</span>}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Insight>
        {row && cell
          ? tt(`In plain words: for “${row.name}”, the ${colLabel?.toLowerCase()} is rated ${LV()[cell.level]}. The reason is this: ${cell.reason}`, `In einfachen Worten: Bei „${row.name}“ ist der Bereich ${colLabel} mit ${LV()[cell.level]} bewertet. Der Grund ist dieser: ${cell.reason}`)
          : tt("Select any cell to read why it has that rating. Keep in mind that a rating is a reading of this example company, not a mark.", "Wählen Sie eine Zelle, um zu lesen, warum sie diese Bewertung hat. Die Bewertung ist eine Lesart des Beispielunternehmens, keine Note.")}
      </Insight>
    </div>
  );
}
