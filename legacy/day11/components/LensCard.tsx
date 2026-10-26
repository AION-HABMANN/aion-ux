// One lens, taught by contrast: the question it asks, plus a CityHelp line that
// answers it well and one that answers it badly.

import { LENS_EXAMPLES } from "@/lib/lenses";
import type { Lens } from "@/lib/types";

export default function LensCard({ lens }: { lens: Lens }) {
  const ex = LENS_EXAMPLES[lens.id];

  return (
    <article className="aion-card flex flex-col">
      <h3 className="text-base font-semibold text-navy">{lens.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-navy/70">{lens.question}</p>

      <div className="mt-4 space-y-3">
        <div className="rounded-card border border-purple/25 bg-lilac p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-purple">
            Strengthens it
          </p>
          <p className="mt-1 text-sm leading-relaxed text-navy">{ex.good}</p>
          <p className="mt-1.5 text-xs text-navy/65">{ex.goodWhy}</p>
        </div>

        <div className="rounded-card border border-navy/15 bg-white p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/60">
            Weakens it
          </p>
          <p className="mt-1 text-sm leading-relaxed text-navy">{ex.bad}</p>
          <p className="mt-1.5 text-xs text-navy/65">{ex.badWhy}</p>
        </div>
      </div>
    </article>
  );
}
