"use client";

// Six lens chips plus a strengthens / weakens toggle. Shared by Stop 2 and Stop 3.

import { LENSES } from "@/lib/lenses";
import type { Direction, LensId } from "@/lib/types";

export default function LensPicker({
  selectedLens,
  selectedDirection,
  onSelectLens,
  onSelectDirection,
  idPrefix,
  disabled = false,
}: {
  selectedLens: LensId | null;
  selectedDirection: Direction | null;
  onSelectLens: (lens: LensId) => void;
  onSelectDirection: (dir: Direction) => void;
  idPrefix: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4">
      <fieldset disabled={disabled}>
        <legend className="aion-label">Which lens is mostly at play?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {LENSES.map((lens) => {
            const active = selectedLens === lens.id;
            return (
              <button
                key={lens.id}
                type="button"
                id={`${idPrefix}-${lens.id}`}
                onClick={() => onSelectLens(lens.id)}
                aria-pressed={active}
                className={`aion-chip text-xs ${active ? "aion-chip-active" : ""}`}
                title={lens.question}
              >
                {lens.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset disabled={disabled}>
        <legend className="aion-label">Does this moment strengthen it or weaken it?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["strengthens", "weakens"] as Direction[]).map((dir) => {
            const active = selectedDirection === dir;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => onSelectDirection(dir)}
                aria-pressed={active}
                className={`aion-chip text-xs capitalize ${active ? "aion-chip-active" : ""}`}
              >
                {dir}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
