"use client";

import clsx from "clsx";
import { useState } from "react";
import { FaintPrint } from "@/components/day15/gaze";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the working products of the study cards that were still pictures (UX-STANDARD 2.16): Tessel, a made-up bank, so no task is answered here. The gaze
 * recordings of cards A1 and A2 were already working replays (components/day15/gaze.tsx). The consent lab gives one task and three versions of the same consent
 * flow to use, with time, wrong taps, stress tests and a "how did that feel?" after each run (components/sim/TaskLab.tsx).
 */
const BRAND = "#0F5E4C";
const Done = ({ text }: { text: string }) => <AppScreen brand="Tessel" color={BRAND}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

function Consent({ ctx, kind }: { ctx: LabCtx; kind: "hidden" | "clear" | "limits" }) {
  const [small, setSmall] = useState(false);
  const truth = kind === "hidden" ? "yes" : kind === "clear" ? "unknown" : "no";
  if (ctx.finished) return <Done text={tt("Decision made, knowing what happens to your gaze data")} />;
  const answer = (a: string) => (a === truth ? ctx.done(tt(`Answered: ${a}`)) : ctx.miss(tt(`Answered “${a}”; the screen says otherwise`)));
  return (
    <AppScreen brand="Tessel" color={BRAND}>
      {kind === "hidden" ? (
        <>
          <p className="text-[15px] font-bold">{tt("A smarter Tessel ✨")}</p>
          <p>{tt("Faster transfers, a fresh look and more.")}</p>
          <button type="button" onClick={() => ctx.miss(tt("Tapped Continue: you have now agreed"))} className="w-full rounded py-2 font-semibold text-white" style={{ background: BRAND }}>{tt("Continue")}</button>
          <button type="button" onClick={() => { setSmall(true); ctx.hit(tt("Opened the small print")); }} className="block text-left">
            <FaintPrint label={tt("Small grey print, pre-ticked: I agree that interaction and camera-based attention data may be used to improve services and for personalised offers.")} lines={[tt("☑ I agree that interaction and camera-based attention data"), tt("may be used to improve services and for personalised offers.")]} />
          </button>
          {small && <p className="rounded bg-[#F1F5F9] p-2 text-[12px]">{tt("Enlarged: “… attention data may be used … for personalised offers.” The box was ticked for you.")}</p>}
        </>
      ) : (
        <>
          <p className="font-bold">{tt("Would you take part in a 20-minute test?")}</p>
          <ul className="list-disc space-y-0.5 pl-4 text-[11.5px]">
            <li>{tt("We record where you look on two screens, in our lab.")}</li>
            <li>{tt("Only the research team sees it; deleted after 3 months.")}</li>
            {kind === "limits" && <li><b>{tt("We will not")}</b> {tt("use it to judge your mood, health or creditworthiness, or for offers.")}</li>}
            {kind === "limits" && <li>{tt("Saying no changes nothing. You can stop at any time.")}</li>}
          </ul>
        </>
      )}
      <div className="space-y-1 rounded-lg border-2 border-dashed border-[#94A3B8] p-2">
        <p className="text-[12px] font-semibold">{tt("Before you decide: could your gaze data be used for offers?")}</p>
        <div className="grid grid-cols-3 gap-1">
          {[["yes", tt("Yes")], ["no", tt("No")], ["unknown", tt("It doesn't say")]].map(([k, l]) => <button key={k} type="button" onClick={() => answer(k)} className={clsx("rounded border border-[#94A3B8] py-1 text-[12px]")}>{l}</button>)}
        </div>
      </div>
    </AppScreen>
  );
}

export function ConsentLab() {
  return (
    <TaskLab
      label={tt("Three consent screens for the same Tessel study · a working product · Case assumption, example company")}
      point={tt("Consent is part of the design, not a legal footnote. The same study can be asked for in a way that hides it, in a way that explains it, or in a way that also limits what will be inferred and makes no as easy as yes. Find out, in each version, what would happen to your gaze data.")}
      task={tt("You are Mara. Before you decide anything, find out whether your gaze data could be used for offers.")}
      feel={[tt("tricked"), tt("respected")]}
      stresses={["eyes", "sun", "hurry", "small"]}
      versions={[
        { id: "hidden", label: tt("Hidden"), render: (ctx) => <Consent ctx={ctx} kind="hidden" />, insight: tt("In plain words: a pre-ticked box in tiny grey print under a big Continue button, mixing research with offers. One tap on Continue and you have agreed; the answer is only in the small print. This is a dark pattern.") },
        { id: "clear", label: tt("Clear"), render: (ctx) => <Consent ctx={ctx} kind="clear" />, insight: tt("In plain words: what is recorded, who sees it, when it is deleted. Clear, and still silent about offers: you can only say “it doesn't say”.") },
        { id: "limits", label: tt("Clear, with limits"), render: (ctx) => <Consent ctx={ctx} kind="limits" />, insight: tt("In plain words: it also says what Tessel will not infer, that no changes nothing and that you can stop. Regulators ask for exactly this kind of guarantee.") },
      ]}
    />
  );
}
