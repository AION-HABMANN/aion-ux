import { BUILDVISION_INTRO, BUILDVISION_POINTS } from '@/content/buildvision';

/** Frozen case text. Presented as-is: nothing labelled, flagged, or annotated. */
export function CaseText() {
  return (
    <div className="aion-card p-4 sm:p-6">
      <p className="aion-label">Case</p>
      <p className="mt-2 text-base text-navy">{BUILDVISION_INTRO}</p>
      <ul className="mt-3 space-y-2 text-sm text-navy/85">
        {BUILDVISION_POINTS.map((point) => (
          <li key={point} className="flex gap-2">
            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
