"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the drawn screens of the study cards (CLAUDE.md #52): Fernwood, a made-up hotel chain with an AR wayfinding feature in its app, so no task is answered
 * here. The corridor is an SVG scene with an AR arrow over it that reacts to a crowd, a weak signal and dim light (the stress test of card A2). Labels of a made-up
 * product; no prices or currencies.
 */
const BRAND = "#7C2D12";

export function Phone({ children, label, title = "Fernwood" }: { children: ReactNode; label: string; title?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] bg-white shadow-md">
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: BRAND }}>
          <span>21:40</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: BRAND }}>{title}</div>
        <div className="min-h-[250px] space-y-2 p-3 text-[12px] leading-snug text-[#1D2733]">{children}</div>
      </div>
    </div>
  );
}

/** The hotel corridor as the camera sees it, with the AR arrow. `crowd`, `signal` (0 lost … 2 good) and `dim` change the scene. */
export function Corridor({ crowd = false, signal = 2, dim = false, arrow = true, label }: { crowd?: boolean; signal?: 0 | 1 | 2; dim?: boolean; arrow?: boolean; label: string }) {
  const drift = signal === 2 ? 0 : signal === 1 ? 18 : 0;
  const showArrow = arrow && signal > 0;
  return (
    <svg role="img" aria-label={label} viewBox="0 0 320 220" className="mx-auto w-full max-w-[420px] rounded-lg border border-line">
      <rect width="320" height="220" fill={dim ? "#3F3A36" : "#EDE6DD"} />
      <polygon points="0,0 120,70 120,150 0,220" fill={dim ? "#4A433D" : "#D9CFC2"} />
      <polygon points="320,0 200,70 200,150 320,220" fill={dim ? "#4A433D" : "#D9CFC2"} />
      <polygon points="0,220 120,150 200,150 320,220" fill={dim ? "#2F2A26" : "#B9A58E"} />
      <rect x="120" y="70" width="80" height="80" fill={dim ? "#26221F" : "#C8B9A6"} />
      {[30, 70].map((x, i) => (
        <g key={x}>
          <polygon points={`${x},${50 + i * 15} ${x + 22},${62 + i * 9} ${x + 22},${150 - i * 6} ${x},${170 - i * 10}`} fill={dim ? "#5B4636" : "#8B5E3C"} />
          <text x={x + 4} y={64 + i * 14} fontSize="9" fill={dim ? "#9C8F82" : "#FFFFFF"}>{`21${4 + i}`}</text>
        </g>
      ))}
      {[250, 210].map((x, i) => (
        <g key={x}>
          <polygon points={`${x + 22},${50 + i * 15} ${x},${62 + i * 9} ${x},${150 - i * 6} ${x + 22},${170 - i * 10}`} fill={dim ? "#5B4636" : "#8B5E3C"} />
          <text x={x + 3} y={70 + i * 12} fontSize="9" fill={dim ? "#9C8F82" : "#FFFFFF"}>{`21${7 - i}`}</text>
        </g>
      ))}
      {crowd && (
        <g fill={dim ? "#1B1714" : "#3B3430"}>
          {[[110, 120], [150, 115], [185, 125], [135, 140], [205, 140]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy - 28} r="9" />
              <rect x={cx - 11} y={cy - 19} width="22" height="45" rx="8" />
            </g>
          ))}
        </g>
      )}
      {showArrow && (
        <g transform={`translate(${drift},${-drift / 2})`} opacity={signal === 1 ? 0.55 : 1}>
          <polygon points="150,190 170,190 170,160 185,160 160,132 135,160 150,160" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
          <rect x="196" y="140" width="96" height="20" rx="6" fill="#FFFFFF" opacity="0.92" />
          <text x="244" y="154" fontSize="10" textAnchor="middle" fill="#14532D" fontWeight="700">{tt("Room 216 →")}</text>
        </g>
      )}
      {signal === 0 && (
        <g>
          <rect x="70" y="92" width="180" height="34" rx="8" fill="#FFFFFF" opacity="0.94" />
          <text x="160" y="113" fontSize="11" textAnchor="middle" fill="#991B1B" fontWeight="700">{tt("Tracking lost · move your phone")}</text>
        </g>
      )}
    </svg>
  );
}

/** The four rungs of the ladder for Fernwood's AR wayfinding. */
export function Rung({ n }: { n: 0 | 1 | 2 | 3 }) {
  if (n === 0)
    return (
      <div role="img" aria-label={tt("A hand-drawn sketch: a phone with an arrow pointing down a hotel corridor, and a note: guests get lost in the new wing")} className="mx-auto max-w-[360px] -rotate-1 space-y-2 rounded-lg border-2 border-dashed border-[#A8A29E] bg-[#FFFDF7] p-3 font-[cursive] text-[13px] text-[#44403C]">
        <p className="font-bold">{tt("Idea: AR arrows to the room")}</p>
        <p>{tt("Guests get lost in the new wing → arrows on the phone camera, from lift to door.")}</p>
        <p className="text-[12px]">{tt("For: all guests? Late arrivals? Older guests?")}</p>
      </div>
    );
  if (n === 1)
    return (
      <div className="space-y-2">
        <Corridor label={tt("A prototype: an AR arrow over the corridor, pointing to room 216")} />
        <p className="mx-auto max-w-[420px] text-caption text-ink">{tt("Prototype for one question: “can guests find room 216 with the arrow alone?” Five guests, one corridor, a colleague with a stopwatch.")}</p>
      </div>
    );
  if (n === 2)
    return (
      <div role="img" aria-label={tt("A pilot report for one hotel over six weeks")} className="mx-auto max-w-[360px] space-y-1 rounded-lg border border-line bg-white p-3 text-caption text-ink">
        <p className="font-bold">{tt("Pilot · Fernwood Harbour · 6 weeks")}</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>{tt("Real guests, real luggage, real late arrivals")}</li>
          <li>{tt("Who used it, who asked staff anyway, who got lost")}</li>
          <li>{tt("Signal in the lift lobby: weak")}</li>
          <li>{tt("Consent and data: camera image stays on the phone")}</li>
        </ul>
      </div>
    );
  return (
    <div role="img" aria-label={tt("A scaled solution across forty hotels, with maps, support, updates and an owner")} className="mx-auto max-w-[360px] space-y-1 rounded-lg border border-line bg-white p-3 text-caption text-ink">
      <p className="font-bold">{tt("Scaled · 40 hotels")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("Every corridor mapped and kept up to date after renovations")}</li>
        <li>{tt("Works on old phones and for guests who cannot use it (staff, signs)")}</li>
        <li>{tt("Support at the front desk; updates with every app release")}</li>
        <li>{tt("An owner, measures, and a rule for switching it off in a hotel")}</li>
      </ul>
    </div>
  );
}

/** Thumbnails of the three measures in card A5. */
export function MeasureThumb({ kind }: { kind: "test" | "all" | "pause" }) {
  const [icon, text] =
    kind === "test" ? ["🧭", tt("AR wayfinding: transfer test in two hotels")] : kind === "all" ? ["🏨", tt("AR minibar in all 40 hotels")] : ["⏸️", tt("Pause the mood-reading lobby screens")];
  return (
    <div aria-hidden className="flex h-[92px] flex-col items-center justify-center gap-1 rounded-lg border border-line bg-white p-2 text-center text-[11px] text-ink">
      <div className="text-[18px]">{icon}</div>
      <p>{text}</p>
    </div>
  );
}
