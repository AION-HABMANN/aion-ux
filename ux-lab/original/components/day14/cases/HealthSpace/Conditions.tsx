import { HEALTHSPACE_CONDITIONS } from '@/original/data/day14/healthspace';

/** Pinned so the framework conditions stay visible while comparing. */
export function Conditions() {
  return (
    <aside className="aion-card sticky top-16 p-4">
      <p className="aion-label">Framework conditions</p>
      <ul className="mt-3 space-y-2 text-sm text-navy/85">
        {HEALTHSPACE_CONDITIONS.map((condition) => (
          <li key={condition} className="flex gap-2">
            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
            <span>{condition}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
