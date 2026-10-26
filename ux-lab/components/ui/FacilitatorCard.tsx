"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";

/**
 * A plan row with no written deliverable (the Coaching row, the Feedbackrunde; DL-STANDARD section 3), or the standard answers to the questions a
 * participant asks about the case (section 14). It is not a task: nothing shows until the mentor passcode has been entered, then one quiet button
 * opens a card the facilitator uses with the group. No fields, not in the missing list, the ring, the page map or the export. A section is a list of
 * points (`items`) or a list of questions with their answers (`qa`).
 */
export type FacilitatorSection = { kicker: string; items?: string[]; qa?: { q: string; a: string }[] };

export function FacilitatorCard({ id, ariaLabel, openLabel, hideLabel, sections }: { id: string; ariaLabel: string; openLabel: string; hideLabel: string; sections: FacilitatorSection[] }) {
  const mentor = useStore((s) => s.mentorUnlocked);
  const [open, setOpen] = useState(false);
  if (!mentor) return null;
  return (
    <section id={id} aria-label={ariaLabel} className="print:hidden">
      <button type="button" aria-expanded={open} aria-controls={`${id}-body`} onClick={() => setOpen((o) => !o)} className="btn-ghost btn-sm">
        {open ? hideLabel : openLabel}
      </button>
      {open && (
        <div id={`${id}-body`} className="card mt-2 space-y-3 p-4 md:p-6">
          {sections.map((s) => (
            <div key={s.kicker}>
              <p className="smallcaps text-accent">{s.kicker}</p>
              {s.items && (
                <ul className="mt-1 list-disc space-y-1 pl-5 text-body text-ink">
                  {s.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
              {s.qa && (
                <dl className="mt-1 space-y-3 text-body text-ink">
                  {s.qa.map((x) => (
                    <div key={x.q}>
                      <dt className="font-semibold">{x.q}</dt>
                      <dd className="mt-0.5">{x.a}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
