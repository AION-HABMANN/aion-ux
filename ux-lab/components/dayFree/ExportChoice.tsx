"use client";

import { useState } from "react";
import type { BlockSpec } from "@/lib/dayFree/spec";
import { blockHasContent } from "@/lib/dayFree/model";
import type { FreeRoute } from "@/store/dayTypesFree";
import { tt } from "@/lib/lang";

/**
 * UX-STANDARD 2.22 · which blocks go into the export. A block is ticked by itself as soon as it holds an answer; the learner can tick or
 * untick any block. A block written in its Google Doc is simply left unticked. State lives here (not stored): it is a per-visit choice.
 */
export type Included = { on: (id: string) => boolean; set: (id: string, v: boolean) => void; ids: ReadonlySet<string> };

export function useIncluded(blocks: BlockSpec[], r: FreeRoute, enabled: boolean): Included {
  const [over, setOver] = useState<Record<string, boolean>>({});
  const on = (id: string) => {
    const b = blocks.find((x) => x.id === id);
    return over[id] ?? (b ? blockHasContent(b, r) : false);
  };
  const ids = new Set(blocks.filter((b) => enabled && on(b.id)).map((b) => b.id));
  return { on, set: (id, v) => setOver((o) => ({ ...o, [id]: v })), ids };
}

/** The one line under a block's title: is it in the export, and why. */
export function BlockExportStatus({ b, r, inc }: { b: BlockSpec; r: FreeRoute; inc: Included }) {
  const has = blockHasContent(b, r);
  const on = inc.on(b.id);
  const text = on
    ? has
      ? tt("Your answers in this block go into the export.", "Ihre Antworten in diesem Block kommen in den Export.")
      : tt("This block is ticked for the export but is still empty.", "Dieser Block ist für den Export angehakt, aber noch leer.")
    : has
    ? tt("You left this block out of the export (unticked below).", "Sie haben diesen Block vom Export ausgenommen (unten nicht angehakt).")
    : tt(
        "Nothing is written here, so this block stays out of the export. That is fine if you write it in the Google Doc.",
        "Hier steht nichts, daher bleibt dieser Block außerhalb des Exports. Das ist in Ordnung, wenn Sie ihn im Google-Dokument schreiben.",
      );
  return (
    <p role="status" className={`rounded-md border px-3 py-2 text-caption ${on ? "border-signal/40 bg-signalSoft text-ink" : "border-line bg-canvas text-ash"}`}>
      <span className="smallcaps mr-1">{on ? tt("In the export", "Im Export") : tt("Not in the export", "Nicht im Export")}</span>
      {text}
    </p>
  );
}

/** The tick list above the Export button. */
export function ExportChoice({ blocks, r, inc }: { blocks: BlockSpec[]; r: FreeRoute; inc: Included }) {
  return (
    <fieldset className="card space-y-2 p-4">
      <legend className="smallcaps px-1 text-accent">{tt("What goes into the export", "Was in den Export kommt")}</legend>
      <p className="text-caption text-ash">
        {tt(
          "Only ticked blocks are exported. A block with an answer is ticked for you. A block you write in its Google Doc stays unticked, and nothing is missing because of it.",
          "Nur angehakte Blöcke werden exportiert. Ein Block mit Antwort ist für Sie angehakt. Ein Block, den Sie in seinem Google-Dokument schreiben, bleibt nicht angehakt, und dadurch fehlt nichts.",
        )}
      </p>
      <ul className="space-y-1.5">
        {blocks.map((b) => {
          const has = blockHasContent(b, r);
          return (
            <li key={b.id}>
              <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-md px-2 py-1.5 hover:bg-canvas">
                <input type="checkbox" className="mt-1 h-5 w-5 shrink-0" checked={inc.on(b.id)} onChange={(e) => inc.set(b.id, e.target.checked)} />
                <span className="text-body text-ink">
                  <span className="font-semibold">{b.title}</span>
                  <span className="ml-2 text-caption text-ash">{has ? tt("has answers", "hat Antworten") : tt("empty", "leer")}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
