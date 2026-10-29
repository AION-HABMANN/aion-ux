"use client";

import clsx from "clsx";
import { useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the working products of the study cards (UX-STANDARD 2.16): Lantern Kitchens, a made-up kitchen maker with an online planner, so no task is answered here.
 * Each lab gives one task and versions of the same planner to use, with time, wrong taps, stress tests and a "how did that feel?" after each run
 * (components/sim/TaskLab.tsx). No prices are shown.
 */
const ACC = "#92400E";
const Brand = "Lantern Kitchens";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;
const Btn = ({ onClick, children, quiet }: { onClick: () => void; children: React.ReactNode; quiet?: boolean }) => (
  <button type="button" onClick={onClick} className={clsx("w-full rounded-lg py-2", quiet ? "border border-[#D6D3D1] text-[#44403C]" : "font-bold text-white")} style={quiet ? undefined : { background: ACC }}>{children}</button>
);

/* ------------------------------------------------------------------ A1 · a list of functions or a journey */

function Planner({ ctx, journey }: { ctx: LabCtx; journey: boolean }) {
  const [room, setRoom] = useState(false);
  if (ctx.finished) return <Done text={tt("Room saved: 3.6 × 2.8 m · next: your style")} />;
  if (room)
    return (
      <AppScreen brand={Brand} color={ACC}>
        {journey && <p className="text-[11px] text-[#57534E]">{tt("Stage 1 of 4 · Your room")}</p>}
        <p className="font-bold">{tt("Your room")}</p>
        <p className="rounded border border-[#D6D3D1] px-2 py-1">{tt("Length 3.6 m · width 2.8 m · window on the left")}</p>
        <Btn onClick={() => ctx.done(tt("Saved the room"))}>{tt("Save the room")}</Btn>
      </AppScreen>
    );
  if (journey)
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="text-[15px] font-bold">{tt("Your new kitchen in four stages")}</p>
        <p className="text-[12px] text-[#57534E]">{tt("At the end: a plan you can change and an offer from your local studio. About 20 minutes; you can stop at any time.")}</p>
        <ol className="space-y-1">
          {[tt("Your room"), tt("Your style"), tt("Appliances"), tt("Plan and offer")].map((x, i) => (
            <li key={x} className={clsx("rounded px-2 py-1", i === 0 ? "bg-[#FEF3C7] font-semibold" : "bg-[#F5F5F4]")}>{tt(`${i + 1}. ${x}`)}</li>
          ))}
        </ol>
        <Btn onClick={() => { setRoom(true); ctx.hit(tt("Started with the room")); }}>{tt("Start with your room")}</Btn>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[15px] font-bold">{tt("Kitchen planner")}</p>
      <div className="grid grid-cols-2 gap-1">
        {[tt("Catalogue"), tt("Styles"), tt("Appliances"), tt("Room dimensions"), tt("Showrooms"), tt("Request an offer")].map((x) => (
          <button key={x} type="button" onClick={() => (x === tt("Room dimensions") ? (setRoom(true), ctx.hit(tt("Found Room dimensions"))) : ctx.miss(tt(`Opened ${x}`)))} className="rounded bg-[#F5F5F4] py-3 text-[12px]">{x}</button>
        ))}
      </div>
    </AppScreen>
  );
}

export function StoryLab() {
  return (
    <TaskLab
      label={tt("The same Lantern Kitchens planner as a list of functions and as a journey · a working product · Case assumption, example company")}
      point={tt("People look for a story in every process: where it starts, where it leads and how far they have come. The two start pages offer the same functions; only one lets people see the journey they are about to take.")}
      task={tt("You are Iris. You want a new kitchen. Start planning it.")}
      feel={[tt("lost"), tt("I know where this goes")]}
      versions={[
        { id: "list", label: tt("A list of functions"), render: (ctx) => <Planner ctx={ctx} journey={false} />, insight: tt("In plain words: six functions side by side. Iris does not know where to begin, what comes after the room or what she will have at the end. Many open the catalogue, browse and leave.") },
        { id: "journey", label: tt("A journey"), render: (ctx) => <Planner ctx={ctx} journey />, insight: tt("In plain words: the goal (a plan and an offer), four stages and a first step. Iris sees where it leads and how long it is, and starts with her room.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · goal, progress, resolution */

type E = { goal: boolean; progress: boolean; resolution: boolean };
const STAGES = () => [tt("Your room"), tt("Your style"), tt("Appliances"), tt("Plan and offer")];
function Stages({ ctx, e }: { ctx: LabCtx; e: E }) {
  const [i, setI] = useState(0);
  const [end, setEnd] = useState(false);
  if (ctx.finished) return <Done text={tt("Plan sent · your studio in Linden will call you within two days")} />;
  const st = STAGES();
  if (end)
    return e.resolution ? (
      <AppScreen brand={Brand} color={ACC}>
        <p className="text-[15px] font-bold">{tt("🎉 Your kitchen plan is ready, Pavel")}</p>
        <div className="h-20 rounded bg-gradient-to-r from-[#FDE68A] to-[#D6D3D1]" aria-hidden />
        <p className="text-[12px]">{tt("Oak fronts · induction hob · 3.6 m run. The studio in Linden will call you within two days with an offer.")}</p>
        <Btn onClick={() => ctx.done(tt("Saw the finished plan"))}>{tt("Done, see my plan")}</Btn>
      </AppScreen>
    ) : (
      <AppScreen brand={Brand} color={ACC}>
        <p className="font-mono text-[12px]">{tt("Data saved.")}</p>
        <Btn onClick={() => { setEnd(false); setI(0); ctx.miss(tt("“Next” started again at the beginning")); }}>{tt("Next")}</Btn>
        <p className="pt-8 text-[11px] text-[#57534E]"><button type="button" onClick={() => ctx.done(tt("Found the plan under My account"))} className="underline">{tt("My account › Saved plans")}</button></p>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      {e.goal && <p className="rounded bg-[#FEF3C7] px-2 py-1 text-[11.5px]">{tt("Goal: a plan you can change, and an offer from your studio.")}</p>}
      {e.progress && (
        <div role="img" className="flex gap-1" aria-label={tt(`Stage ${i + 1} of 4`)}>
          {st.map((x, k) => <span key={x} className={clsx("h-1.5 flex-1 rounded", k <= i ? "bg-[#92400E]" : "bg-[#E7E5E4]")} />)}
        </div>
      )}
      {e.progress && <p className="text-[11px] text-[#57534E]">{tt(`Stage ${i + 1} of 4 · ${st[i]}`)}</p>}
      <p className="text-[14px] font-bold">{st[i]}</p>
      <div className="grid grid-cols-2 gap-1">
        {[[tt("Option A"), tt("Option B")], [tt("Oak"), tt("White gloss")], [tt("Induction"), tt("Gas")], [tt("Send to studio"), tt("Download")]][i].map((o) => (
          <button key={o} type="button" onClick={() => { ctx.hit(tt(`${st[i]}: ${o}`)); if (i < 3) setI(i + 1); else setEnd(true); }} className="rounded border border-[#D6D3D1] py-2">{o}</button>
        ))}
      </div>
    </AppScreen>
  );
}

export function ElementsLab() {
  const v = (id: string, label: string, e: E, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Stages ctx={ctx} e={e} />, insight });
  return (
    <TaskLab
      label={tt("The Lantern Kitchens planner: goal, progress and resolution · a working product · Case assumption, example company")}
      point={tt("Narrative guidance has seven elements: starting situation, goal, relevance, obstacle, support, progress and resolution. Three of them decide most often whether people finish: a goal they can see, progress they can see, and an end that feels like one. Go through all four stages.")}
      task={tt("You are Pavel. Go through the planner to the end and get your plan.")}
      feel={[tt("unsure I'm done"), tt("finished, worth it")]}
      versions={[
        v("none", tt("None of the three"), { goal: false, progress: false, resolution: false }, tt("In plain words: Pavel does not know what he is working towards or how many screens are left, and the last step ends with “Data saved” and a Next button that starts again. He is not sure he is done.")),
        v("progress", tt("Progress only"), { goal: false, progress: true, resolution: false }, tt("In plain words: he sees how much is left, but not what he will get, and the end is still a bare “Data saved”.")),
        v("all", tt("All three"), { goal: true, progress: true, resolution: true }, tt("In plain words: he knows the goal, sees where he stands, and at the end his plan is shown and someone will call him. The journey is over, and it was worth it.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · the moment between two steps */

function Between({ ctx, kind }: { ctx: LabCtx; kind: "bare" | "staged" | "short" }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  if (ctx.finished) return <Done text={tt("Room and style saved")} />;
  return (
    <AppScreen brand={Brand} color={ACC}>
      {step === 1 && (
        <>
          <p className="font-bold">{tt("Your room")}</p>
          <p className="rounded border border-[#D6D3D1] px-2 py-1">{tt("3.6 × 2.8 m · window on the left")}</p>
          <Btn onClick={() => { setStep(2); ctx.hit(tt("Room entered")); }}>{tt("Save the room")}</Btn>
        </>
      )}
      {step === 2 && kind === "bare" && <Btn onClick={() => { setStep(3); ctx.hit(tt("Pressed Next")); }}>{tt("Next")}</Btn>}
      {step === 2 && kind === "short" && (
        <div className="space-y-2">
          <p className="rounded bg-[#ECFCCB] p-2 text-[12.5px]">{tt("✓ Your room is in. Next: your style. A few choices, and you can change all of them later.")}</p>
          <Btn onClick={() => { setStep(3); ctx.hit(tt("On to style")); }}>{tt("Choose your style")}</Btn>
        </div>
      )}
      {step === 2 && kind === "staged" && (
        <div tabIndex={0} role="region" aria-label={tt("A long brand scene")} className="h-56 space-y-2 overflow-y-auto rounded bg-[#FFFBEB] p-2 text-[12px]">
          <p className="text-[15px] font-bold">{tt("Sunday mornings.")}</p>
          <p>{tt("The smell of coffee. Light through the window. A table that has seen birthdays, homework and long talks.")}</p>
          <div className="h-24 rounded bg-gradient-to-br from-[#FDE68A] to-[#B45309]" aria-hidden />
          <p>{tt("Since 1962, Lantern Kitchens has built the rooms where families come together. Every drawer is a promise, every hinge a memory in the making.")}</p>
          <p>{tt("Our craftspeople in Linden still check every front by hand.")}</p>
          <button type="button" onClick={() => ctx.miss(tt("Watched the brand film"))} className="rounded border border-[#B45309] px-2 py-1">{tt("▶ Watch our story")}</button>
          <p>{tt("Now, let's continue.")}</p>
          <Btn onClick={() => { setStep(3); ctx.hit(tt("Found the way on")); }}>{tt("Continue")}</Btn>
        </div>
      )}
      {step === 3 && (
        <>
          <p className="font-bold">{tt("Your style")}</p>
          <div className="grid grid-cols-2 gap-1">{[tt("Oak"), tt("White gloss")].map((o) => <button key={o} type="button" onClick={() => ctx.done(tt(`Chose ${o}`))} className="rounded border border-[#D6D3D1] py-3">{o}</button>)}</div>
          {kind === "bare" && <p className="text-[11px] text-[#57534E]">{tt("(Was the room saved? Nothing said so.)")}</p>}
        </>
      )}
    </AppScreen>
  );
}

export function TransitionLab() {
  return (
    <TaskLab
      label={tt("The moment between two Lantern Kitchens steps: bare, staged and short · a working product · Case assumption, example company")}
      point={tt("Guiding with a story is not telling one. Most of the dramaturgy lives in small places: the line between two steps says what was done, what comes next and that it is manageable. A staged scene tells a story about the product; it does not guide.")}
      task={tt("You are Iris. Save your room, then choose a style.")}
      feel={[tt("unsure"), tt("I know what's next")]}
      versions={[
        { id: "bare", label: tt("A bare Next"), render: (ctx) => <Between ctx={ctx} kind="bare" />, insight: tt("In plain words: only Next. Iris does not know whether her room was saved or what the next step asks. She presses on without a sense of getting anywhere.") },
        { id: "staged", label: tt("A staged scene"), render: (ctx) => <Between ctx={ctx} kind="staged" />, insight: tt("In plain words: a long scene about Sunday mornings. Pleasant once, but it delays her, it is not about her kitchen, and she has to scroll to find the way on.") },
        { id: "short", label: tt("A short transition"), render: (ctx) => <Between ctx={ctx} kind="short" />, insight: tt("In plain words: her room is in, next is her style, a few choices, all can be changed. One line gives confirmation, expectation and a sequence she can follow.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · how much story a journey needs */

function Reorder({ ctx, weight }: { ctx: LabCtx; weight: "one" | "steps" | "full" }) {
  const [s, setS] = useState(0);
  if (ctx.finished) return <Done text={tt("Spare handle ordered · arrives Friday")} />;
  if (weight === "one")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="font-bold">{tt("Reorder for your kitchen (2023)")}</p>
        <p className="rounded border border-[#D6D3D1] px-2 py-1">{tt("Handle “Linden”, brushed brass · ×1")}</p>
        <Btn onClick={() => ctx.done(tt("Ordered in one screen"))}>{tt("Order")}</Btn>
      </AppScreen>
    );
  const film = weight === "full" && s === 0;
  return (
    <AppScreen brand={Brand} color={ACC}>
      {film ? (
        <>
          <div className="flex h-32 items-center justify-center rounded bg-[#1C1917] text-white">{tt("▶ Our story (1:40)")}</div>
          <Btn onClick={() => { setS(1); ctx.miss(tt("Sat through the brand film")); }}>{tt("Skip")}</Btn>
        </>
      ) : (
        <>
          {weight === "full" && <p className="rounded bg-[#FEF3C7] px-2 py-1 text-[11px]">{tt("Your journey to the perfect handle · stage " + Math.min(s, 3) + " of 3")}</p>}
          <p className="font-bold">{[tt("Which kitchen?"), tt("Which part?"), tt("How many?"), tt("Check")][Math.min(weight === "full" ? s : s, 3)]}</p>
          <Btn onClick={() => { if (s >= 3) ctx.done(tt("Ordered after several steps")); else { setS(s + 1); ctx.hit(tt("Next step")); } }}>{s >= 3 ? tt("Order") : tt("Continue")}</Btn>
          {weight === "full" && s > 0 && s < 3 && <p className="text-[11px] text-[#57534E]">{tt("Did you know? Every handle is polished by hand in Linden.")}</p>}
        </>
      )}
    </AppScreen>
  );
}

export function WeightLab() {
  return (
    <TaskLab
      label={tt("A Lantern Kitchens reorder with three amounts of narrative guidance · a working product · Case assumption, example company")}
      point={tt("How much narrative guidance a journey needs depends on its length and its weight for the user, not on the brand. A one-step routine needs none; a short task needs steps and transitions; a long, important journey needs a goal, a path and an ending. The same amount everywhere slows the quick ones.")}
      task={tt("You are Pavel. Order one spare handle for your kitchen.")}
      feel={[tt("slowed down"), tt("quick and clear")]}
      versions={[
        { id: "one", label: tt("One screen"), render: (ctx) => <Reorder ctx={ctx} weight="one" />, insight: tt("In plain words: Pavel wants a spare handle. One screen, done. For a routine, efficiency is the right story.") },
        { id: "steps", label: tt("Steps"), render: (ctx) => <Reorder ctx={ctx} weight="steps" />, insight: tt("In plain words: four steps for one handle. Each is clear, but a routine does not need a path; this weight fits a fitting day, not a reorder.") },
        { id: "full", label: tt("A full journey"), render: (ctx) => <Reorder ctx={ctx} weight="full" />, insight: tt("In plain words: a brand film, stages and facts about polishing for one handle. It fits the whole-kitchen journey; here it only delays him.") },
      ]}
    />
  );
}
