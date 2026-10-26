"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { SimButton } from "@/components/sim/SimFrame";
import { tt } from "@/lib/lang";

/**
 * The options of a task as real pictures and working simulations (CLAUDE.md #52, #60): select an option to see it larger with one plain sentence on what it is,
 * and open it as a simulation. The text only says what the option is; whether it is the right choice is for the learner to say.
 */
export type OptionCard = { id: string; name: string; thumb: ReactNode; info: string; simLabel: string; simSub: string; url: string; sim: () => ReactNode; note?: string };

export function OptionCards({ options, intro }: { options: OptionCard[]; intro?: string }) {
  const [look, setLook] = useState(options[0].id);
  const cur = options.find((o) => o.id === look) ?? options[0];
  return (
    <div className="space-y-3">
      <p className="text-caption text-ash">{intro ?? tt("Select an option to see what it would look like. It is the same example each time.", "Wählen Sie eine Option, um zu sehen, wie sie aussähe. Es ist jedes Mal dasselbe Beispiel.")}</p>
      <div role="radiogroup" aria-label={tt("The options", "Die Optionen")} className="grid gap-2 sm:grid-cols-3">
        {options.map((o) => (
          <button
            key={o.id}
            id={`option-${o.id}`}
            type="button"
            role="radio"
            aria-checked={look === o.id}
            onClick={() => setLook(o.id)}
            className={`flex flex-col justify-start rounded-lg border p-2 text-left ${look === o.id ? "border-accent bg-accentSoft" : "border-line bg-paper hover:border-accent"}`}
          >
            <span className="smallcaps text-accent">{tt("Option", "Option")} {o.id}</span>
            <span className="mt-1 block">{o.thumb}</span>
            <span className="mt-1 block text-caption font-semibold text-ink">{o.name}</span>
          </button>
        ))}
      </div>
      <div className="space-y-1 rounded-lg border border-line bg-canvas p-3 text-caption text-ink" aria-live="polite">
        <p className="font-semibold">{tt("Option", "Option")} {cur.id} · {cur.name}</p>
        <p>{cur.info}</p>
        <p className="text-ash">{tt("This only says what it is. Whether it is the right choice is for you to say.", "Das sagt nur, was es ist. Ob es die richtige Wahl ist, sagen Sie.")}</p>
        <SimButton key={cur.id} label={cur.simLabel} sub={cur.simSub} url={cur.url} title={`${tt("Simulation", "Simulation")}: ${tt("option", "Option")} ${cur.id}`} note={cur.note}>
          {cur.sim}
        </SimButton>
      </div>
    </div>
  );
}
