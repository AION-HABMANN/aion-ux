import {
  INDUSTRYXR_CONDITIONS,
  INDUSTRYXR_INTRO,
  INDUSTRYXR_PROBLEMS,
} from '@/original/data/day14/industryxr';

/** Frozen case text, presented without annotation or flagging. */
export function CaseText() {
  return (
    <div className="flex flex-col gap-4">
      <div className="aion-card p-4 sm:p-6">
        <p className="aion-label">Case</p>
        <p className="mt-2 text-sm leading-relaxed text-navy sm:text-base">{INDUSTRYXR_INTRO}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="aion-card p-4 sm:p-6">
          <p className="aion-label">Observed problems</p>
          <ul className="mt-3 space-y-2 text-sm text-navy/85">
            {INDUSTRYXR_PROBLEMS.map((problem) => (
              <li key={problem} className="flex gap-2">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="aion-card p-4 sm:p-6">
          <p className="aion-label">Framework conditions</p>
          <ul className="mt-3 space-y-2 text-sm text-navy/85">
            {INDUSTRYXR_CONDITIONS.map((condition) => (
              <li key={condition} className="flex gap-2">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
