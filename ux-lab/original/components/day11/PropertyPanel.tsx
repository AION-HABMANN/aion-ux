// Fixed High/Medium/Low ratings for one build variant.
// These values are course ground truth — see lib/variants.ts.

import { PROPERTY_ROWS, RATING_TONE } from "@/original/lib/day11/variants";
import type { VariantProfile } from "@/original/lib/day11/types";

export default function PropertyPanel({
  variant,
  highlight,
}: {
  variant: VariantProfile;
  /** Optional note about which persona this variant suits. */
  highlight?: { best: boolean; note: string };
}) {
  return (
    <div className="aion-card h-fit">
      <h3 className="text-sm font-semibold text-navy">
        {variant.name} — properties
      </h3>
      <p className="mt-1 text-xs text-navy/60">{variant.subtitle}</p>

      <dl className="mt-4 space-y-2.5">
        {PROPERTY_ROWS.map((row) => {
          const value = variant[row.key];
          return (
            <div key={row.key} className="flex items-center justify-between gap-3">
              <dt className="text-sm text-navy/75">{row.label}</dt>
              <dd>
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${RATING_TONE[value]}`}
                >
                  {value}
                </span>
              </dd>
            </div>
          );
        })}
      </dl>

      {highlight && (
        <div
          className={`mt-4 rounded-card border p-3 text-xs leading-relaxed ${
            highlight.best
              ? "border-purple/30 bg-lilac text-navy"
              : "border-navy/10 bg-white text-navy/70"
          }`}
        >
          <p className="font-semibold">
            {highlight.best ? "Best fit for this user" : "Workable, but not the best fit"}
          </p>
          <p className="mt-1">{highlight.note}</p>
        </div>
      )}
    </div>
  );
}
