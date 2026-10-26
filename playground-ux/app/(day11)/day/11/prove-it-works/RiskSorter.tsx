"use client";

// Risk-based testing 2x2. Click a use case, then click a cell — deliberately
// click-based rather than drag-based so it works with a keyboard and on a phone.

import { useState } from "react";
import { RISK_CELL_ADVICE, RISK_USE_CASES } from "@/lib/day11/proveIt";

type CellKey = `${"high" | "low"}-${"high" | "low"}`; // frequency-risk

const CELLS: { key: CellKey; title: string; sub: string }[] = [
  { key: "high-high", title: "High frequency · high risk", sub: "Lots of people, real damage" },
  { key: "low-high", title: "Low frequency · high risk", sub: "Rare, but serious" },
  { key: "high-low", title: "High frequency · low risk", sub: "Lots of people, cheap to get wrong" },
  { key: "low-low", title: "Low frequency · low risk", sub: "Rare and harmless" },
];

export default function RiskSorter() {
  const [placements, setPlacements] = useState<Record<string, CellKey>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const unplaced = RISK_USE_CASES.filter((u) => !placements[u.id]);
  const allPlaced = unplaced.length === 0;

  function placeIn(cell: CellKey) {
    if (!selected) return;
    setPlacements((prev) => ({ ...prev, [selected]: cell }));
    setSelected(null);
  }

  function reset() {
    setPlacements({});
    setSelected(null);
    setRevealed(false);
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="aion-label">Use cases — pick one, then pick a cell</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {unplaced.length === 0 ? (
            <p className="text-sm text-navy/55">All placed.</p>
          ) : (
            unplaced.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setSelected(selected === u.id ? null : u.id)}
                aria-pressed={selected === u.id}
                className={`aion-chip text-xs ${selected === u.id ? "aion-chip-active" : ""}`}
              >
                {u.label}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {CELLS.map((cell) => {
          const inCell = RISK_USE_CASES.filter((u) => placements[u.id] === cell.key);
          return (
            <div
              key={cell.key}
              className={`rounded-card border p-4 ${
                selected ? "border-purple/50 bg-lilac/40" : "border-navy/10 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => placeIn(cell.key)}
                disabled={!selected}
                className="w-full text-left disabled:cursor-default"
                aria-label={`Place the selected use case in ${cell.title}`}
              >
                <p className="text-sm font-semibold text-navy">{cell.title}</p>
                <p className="text-xs text-navy/60">{cell.sub}</p>
              </button>

              <ul className="mt-3 space-y-1.5">
                {inCell.length === 0 && (
                  <li className="text-xs text-navy/40">Empty</li>
                )}
                {inCell.map((u) => {
                  const correctCell: CellKey = `${u.frequency}-${u.risk}`;
                  const matches = correctCell === cell.key;
                  return (
                    <li
                      key={u.id}
                      className="flex items-start justify-between gap-2 rounded-card border border-navy/10 bg-white px-2.5 py-1.5 text-xs"
                    >
                      <span className="text-navy">{u.label}</span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {revealed && (
                          <span className={matches ? "text-purple" : "text-navy/50"}>
                            {matches ? "✓" : `→ ${correctCell.replace("-", " freq · ")} risk`}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setPlacements((prev) => {
                              const next = { ...prev };
                              delete next[u.id];
                              return next;
                            })
                          }
                          className="text-navy/40 hover:text-purple"
                          aria-label={`Take ${u.label} back out`}
                        >
                          ×
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>

              {revealed && (
                <p className="mt-3 border-t border-navy/10 pt-2 text-xs leading-relaxed text-navy/70">
                  {RISK_CELL_ADVICE[cell.key]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="aion-btn"
          disabled={!allPlaced || revealed}
        >
          {revealed ? "Insight shown" : "Show the insight"}
        </button>
        <button type="button" onClick={reset} className="aion-btn-ghost">
          Clear the grid
        </button>
        {!allPlaced && (
          <p className="text-xs text-navy/55">
            Place all six to see the reading.
          </p>
        )}
      </div>

      {revealed && (
        <div className="aion-card-soft animate-fade-in max-w-3xl">
          <p className="aion-label">The insight</p>
          <p className="mt-2 text-sm leading-relaxed text-navy/85">
            Test the high-frequency, high-risk cell hardest — that's where failures are
            both common and expensive. But launch where voice shines: high frequency,
            low risk. Booking an appointment is where the damage is; asking about
            opening hours is where the wins are.
          </p>
        </div>
      )}
    </div>
  );
}
