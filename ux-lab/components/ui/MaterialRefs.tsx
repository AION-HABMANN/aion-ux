"use client";

import { scrollToAndFlash } from "@/lib/flash";
import { showCardPart } from "@/store/useCardMore";
import type { MaterialId } from "@/data/materialTypes";
import { useMaterials } from "@/lib/useMaterials";
import { tt } from "@/lib/lang";

/**
 * "Draws on" chips under a task step. Each scrolls to the material card the step's reasoning was taught in and flashes it in the
 * accent colour, never the rust missing-item flash: arriving somewhere you asked to go is not a warning. It opens the card's rules
 * first, so a jump from a task never lands on a closed part (CLAUDE.md #37).
 */
export function MaterialRefs({ refs: raw, lead }: { refs: MaterialId[]; lead?: string }) {
  const { MATERIAL_BY_ID, materialAnchorId } = useMaterials();
  const refs = [...new Set(raw)];
  if (refs.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-micro font-semibold uppercase text-ash">{lead ?? tt("Draws on", "Baut auf")}</span>
      {refs.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => {
            showCardPart(id, "rules");
            showCardPart(id, "more");
            scrollToAndFlash(materialAnchorId(id), "ref");
          }}
          title={MATERIAL_BY_ID[id].title}
          className="tap-chip rounded-full border border-accent/40 bg-accentSoft px-2.5 py-0.5 text-micro font-semibold text-accent transition-colors hover:border-accent hover:text-accentHi"
        >
          {id} · {MATERIAL_BY_ID[id].title.length > 34 ? `${MATERIAL_BY_ID[id].title.slice(0, 32)}…` : MATERIAL_BY_ID[id].title}
        </button>
      ))}
    </div>
  );
}
