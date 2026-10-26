import type { IndustryHotspot } from '@/content/industryxr';

/**
 * Neutral factual description only, drawn from the frozen case text.
 * No verdicts, categories, risk ratings, recommendations, or sample solution.
 */
export function HotspotPanel({
  hotspot,
  onClose,
}: {
  hotspot: IndustryHotspot;
  onClose: () => void;
}) {
  return (
    <div className="rounded-card border border-purple/30 bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold text-navy">{hotspot.name}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close station description"
          className="rounded-full bg-lilac px-2 py-0.5 text-xs font-bold text-navy/60"
        >
          ✕
        </button>
      </div>
      <ul className="mt-2 space-y-1.5 text-sm text-navy/80">
        {hotspot.description.map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
