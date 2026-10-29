"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";
import { ModelStage } from "@/components/sim/ModelStage";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the platforms of the tasks, with the plan's clues built in (show it real, user rule 2026-10-28). RealityFlow (Block 1.1) shows three prototypes, an AR
 * service guide on a real 3D device and a training module on a real 3D machine (the generic models of the original Day 14) and an interaction analysis dashboard,
 * with a real work situation, the management's and the departments' notes and the investment proposal. FutureInteraction Hub's three options (Block 1.2) are the
 * plan each would put on the table. NextWorld UX (Block 2.1) is the decision board: three prototypes reported in three formats, a grid that shows what cannot be
 * compared, the feedback, and a sandbox to sort them. The names and contents are made up; nothing is marked right or wrong.
 */

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={clsx("min-h-[36px] rounded border px-2.5 text-[12.5px] font-semibold", on ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-[#C3CCD6] bg-white text-[#26323F]")}>
      {children}
    </button>
  );
}
function Radio<T extends string>({ label, value, set, options }: { label: string; value: T; set: (v: T) => void; options: [T, string][] }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map(([k, l]) => (
        <button key={k} type="button" role="radio" aria-checked={value === k} onClick={() => set(k)} className={clsx("min-h-[36px] rounded border px-2.5 text-[12.5px] font-semibold", value === k ? "border-[#7C2D12] bg-[#7C2D12] text-white" : "border-[#C3CCD6] bg-white text-[#26323F]")}>{l}</button>
      ))}
    </div>
  );
}
const Pill = ({ slot, pos, normal, children, warn }: { slot: string; pos: string; normal: string; children: ReactNode; warn?: boolean }) => (
  <div slot={slot} data-position={pos} data-normal={normal} className={clsx("pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold shadow", warn ? "bg-[#FEF3C7] text-[#78350F]" : "bg-white/95 text-[#1D2733]")}>{children}</div>
);

/* ------------------------------------------------------------------ RealityFlow */

const AR_STEPS = () => [
  ["hotspot-display", "0 1.42 0.34", "0 0 1", tt("1 · Check the display")],
  ["hotspot-hatch", "0 0.74 0.32", "0 0 1", tt("2 · Open the hatch")],
  ["hotspot-valves", "-0.19 0.34 0.36", "0 0 1", tt("3 · Close both valves")],
  ["hotspot-pipe", "0.46 1.1 -0.05", "1 0 0", tt("4 · Check the connector")],
] as const;

export function RealityFlow() {
  const [proto, setProto] = useState<"ar" | "train" | "neuro">("ar");
  const [real, setReal] = useState(false);
  const [note, setNote] = useState<"" | "mgmt" | "dept" | "invest">("");
  const steps = AR_STEPS();
  return (
    <div className="space-y-3 text-[#26323F]">
      <div className="flex items-center justify-between rounded px-3 py-1.5 text-white" style={{ background: "#0E7490" }}>
        <b>{tt("RealityFlow · prototype showcase")}</b>
        <span className="text-[11px]">{tt("3 prototypes · demo room B")}</span>
      </div>
      <Radio label={tt("Prototype")} value={proto} set={setProto} options={[["ar", tt("AR service guide")], ["train", tt("Immersive training")], ["neuro", tt("Interaction analysis")]]} />
      <div className="flex flex-wrap gap-1.5">
        <Toggle on={real} onClick={() => setReal((v) => !v)}>{tt("Take it into a real work situation")}</Toggle>
      </div>

      {proto === "ar" && (
        <div className="space-y-2">
          <ModelStage key={real ? "r" : "d"} src="/day14/models/service-device.glb" alt={tt("A generic service device with AR step labels anchored to its display, hatch, valves and connector")} fallback="/day14/fallback/service-device.svg" orbit="18deg 76deg 5.2m" target="0m 0.92m 0m" ar aspect="4 / 3">
            {(real ? steps.slice(0, 2) : steps).map(([slot, pos, normal, label]) => <Pill key={slot} slot={slot} pos={pos} normal={normal}>{label}</Pill>)}
            {real && <Pill slot="hotspot-lost" pos="0 0.2 0.4" normal="0 0 1" warn>{tt("⚠ Tracking lost: hatch open")}</Pill>}
          </ModelStage>
          {real ? (
            <ul className="list-disc space-y-0.5 rounded-lg border border-[#FCD34D] bg-[#FFFBEB] p-3 pl-7 text-[12.5px]">
              <li>{tt("Gloves: the phone does not react to taps.")}</li>
              <li>{tt("Noise: the spoken instructions cannot be heard.")}</li>
              <li>{tt("With the hatch open, tracking is lost and steps 3 and 4 disappear.")}</li>
              <li>{tt("The customer is waiting; there is no time to hold up a phone.")}</li>
            </ul>
          ) : (
            <p className="text-[12.5px]">{tt("In the demo room: bright light, clean device, no gloves, a presenter holding the tablet. Visitors called it “the future of service”.")}</p>
          )}
        </div>
      )}

      {proto === "train" && (
        <div className="space-y-2">
          <ModelStage src="/day14/models/industrial-machine.glb" alt={tt("A generic industrial machine for the training module, with its operating panel, gantry head and lower guard labelled")} fallback="/day14/fallback/industrial-machine.svg" orbit="20deg 78deg 3.4m" target="0m 0.9m 0m" autoRotate={!real} aspect="16 / 10">
            <Pill slot="hotspot-panel" pos="-0.55 1.03 0.46" normal="0 0 1">{tt("Operating panel")}</Pill>
            <Pill slot="hotspot-head" pos="0.22 1.47 0.02" normal="0 1 0">{tt("Gantry head")}</Pill>
            <Pill slot="hotspot-guard" pos="0.2 0.28 0.45" normal="0 0 1">{tt("Lower guard")}</Pill>
          </ModelStage>
          {real ? (
            <ul className="list-disc space-y-0.5 rounded-lg border border-[#FCD34D] bg-[#FFFBEB] p-3 pl-7 text-[12.5px]">
              <li>{tt("Trainees practised in a quiet room; nobody checked whether they work better on the real machine.")}</li>
              <li>{tt("Two of the first group felt dizzy after twenty minutes.")}</li>
              <li>{tt("The real machine on the shop floor is a newer model than the 3D one.")}</li>
            </ul>
          ) : (
            <p className="text-[12.5px]">{tt("Walk around the machine and tap a part to learn it. The demo turns by itself; visitors loved it.")}</p>
          )}
        </div>
      )}

      {proto === "neuro" && (
        <div className="space-y-2 rounded-lg border border-line bg-white p-3 text-[12.5px]">
          <p className="font-semibold">{tt("Interaction analysis · technicians' load during service calls (prototype)")}</p>
          {[
            [tt("Technician A"), 72],
            [tt("Technician B"), 41],
            [tt("Technician C"), 88],
          ].map(([who, v]) => (
            <div key={who as string} className="flex items-center gap-2">
              <span className="w-24 shrink-0">{who}</span>
              <span className="h-2.5 flex-1 overflow-hidden rounded bg-mist"><span className="block h-full rounded" style={{ width: `${v}%`, background: (v as number) > 80 ? "#DC2626" : "#0E7490" }} /></span>
              <span className="w-24 shrink-0 text-right">{tt(`load index ${v}`)}</span>
            </div>
          ))}
          <p className="text-[11.5px] text-[#55606E]">{tt("Source: eye-tracking glasses and heart rate during real calls. Consent: “covered by the employment contract (to be checked)”. Use of the results: not decided.")}</p>
          {real && <p className="rounded bg-[#FFFBEB] px-2 py-1">{tt("In a real call, technician C was dealing with an angry customer and a seized valve. The index cannot tell the two apart.")}</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 border-t border-line pt-2">
        <Toggle on={note === "mgmt"} onClick={() => setNote(note === "mgmt" ? "" : "mgmt")}>{tt("Note from the management")}</Toggle>
        <Toggle on={note === "dept"} onClick={() => setNote(note === "dept" ? "" : "dept")}>{tt("Notes from the departments")}</Toggle>
        <Toggle on={note === "invest"} onClick={() => setNote(note === "invest" ? "" : "invest")}>{tt("The investment proposal")}</Toggle>
      </div>
      {note === "mgmt" && <p className="rounded-lg border border-line bg-paper p-3 text-[12.5px]">{tt("“Everybody talks about RealityFlow. We want a visible innovation signal at the spring fair. Let's go big this year.”")}</p>}
      {note === "dept" && (
        <ul className="space-y-1 rounded-lg border border-line bg-paper p-3 text-[12.5px]">
          <li><b>{tt("Service")}:</b> {tt("It works at a desk, not at a machine. Show us it works on a real call.")}</li>
          <li><b>{tt("Training")}:</b> {tt("We need proof that trainees do better, not that they enjoyed it.")}</li>
          <li><b>{tt("Data protection")}:</b> {tt("Nobody asked us about the interaction analysis.")}</li>
        </ul>
      )}
      {note === "invest" && (
        <div tabIndex={0} role="region" aria-label={tt("The investment proposal")} className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[28rem] border-collapse text-[12px]">
            <caption className="px-2 py-1.5 text-left font-semibold">{tt("Proposal: all three prototypes in all twelve branches this year")}</caption>
            <thead><tr className="bg-mist text-left text-micro uppercase text-ash"><th scope="col" className="px-2 py-1.5">{tt("Assumption")}</th><th scope="col" className="px-2 py-1.5">{tt("Status")}</th></tr></thead>
            <tbody>
              {[
                [tt("Technicians will use AR guidance every day"), tt("untested")],
                [tt("The training transfers to real work"), tt("untested")],
                [tt("The analysis improves our processes"), tt("untested")],
                [tt("Devices and network are available in every branch"), tt("partly")],
                [tt("Staff accept being measured"), tt("not asked")],
              ].map(([a, s]) => <tr key={a} className="border-t border-line"><th scope="row" className="px-2 py-1.5 text-left font-normal">{a}</th><td className="px-2 py-1.5">{s}</td></tr>)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ FutureInteraction Hub · three options */

export function FutureHub({ option }: { option: "A" | "B" | "C" }) {
  const head = option === "A" ? "#B91C1C" : option === "B" ? "#0F766E" : "#334155";
  const wrap = (title: string, children: ReactNode) => (
    <div className="space-y-2 rounded-lg border border-line bg-white p-3 text-[12.5px] text-[#26323F]">
      <div className="rounded px-2 py-1 text-white" style={{ background: head }}><b>{title}</b></div>
      {children}
    </div>
  );
  if (option === "A")
    return wrap(tt("FutureInteraction Hub · launch board Q1"), (
      <>
        <ul className="grid gap-1 sm:grid-cols-2">
          {[
            [tt("AR product preview"), tt("Shop"), "#7C3AED"],
            [tt("VR onboarding"), tt("HR"), "#DB2777"],
            [tt("Voice navigation"), tt("App"), "#2563EB"],
            [tt("Gesture menu"), tt("Kiosk"), "#EA580C"],
            [tt("Mood-adaptive theme"), tt("App"), "#16A34A"],
            [tt("3D account overview"), tt("Portal"), "#0891B2"],
            [tt("AR store map"), tt("Stores"), "#CA8A04"],
          ].map(([n, a, c]) => (
            <li key={n} className="flex items-center justify-between rounded border border-line px-2 py-1"><span>{n}</span><span className="rounded px-1.5 text-[11px] text-white" style={{ background: c }}>{a}</span></li>
          ))}
        </ul>
        <p className="text-[11.5px] text-[#55606E]">{tt("Seven functions, five areas, one quarter. Design consistency check: not planned. Ethics review: after launch. Owners: each area.")}</p>
      </>
    ));
  if (option === "B")
    return wrap(tt("FutureInteraction Hub · focused pilot plan"), (
      <>
        {[
          [tt("AR product preview (shop)"), tt("Need: returns because items do not fit. Test: orientation, overload, acceptance, transfer at home.")],
          [tt("Voice navigation (app)"), tt("Need: users with low vision. Test: error robustness, acceptance, accessibility.")],
        ].map(([n, d]) => (
          <div key={n} className="rounded border border-line px-2 py-1"><p className="font-semibold">{n}</p><p>{d}</p></div>
        ))}
        <p className="text-[11.5px] text-[#55606E]">{tt("Ethics and data review before each pilot. Gates at month 3 and month 6: scale, change or stop. Other ideas on the watch list.")}</p>
      </>
    ));
  return wrap(tt("FutureInteraction Hub · research and observation"), (
    <>
      <ul className="space-y-1">
        {[
          [tt("Spatial interfaces"), tt("Watch · reading, two conferences")],
          [tt("Neuro-adaptive UI"), tt("Watch · research partner talks")],
          [tt("Voice and gesture"), tt("Watch · competitor analysis")],
        ].map(([k, v]) => <li key={k} className="flex flex-wrap justify-between gap-2 rounded border border-line px-2 py-1"><span className="font-semibold">{k}</span><span className="text-[#475569]">{v}</span></li>)}
      </ul>
      <p className="text-[11.5px] text-[#55606E]">{tt("Next visible result: none planned. Review: twice a year.")}</p>
    </>
  ));
}

/* ------------------------------------------------------------------ NextWorld UX · the decision board */

type Move = "" | "scale" | "test" | "pause" | "stop";
export function NextWorld() {
  const [tab, setTab] = useState<"protos" | "grid" | "feedback" | "decide">("protos");
  const [vr3d, setVr3d] = useState(false);
  const [moves, setMoves] = useState<Record<string, Move>>({ ar: "", vr: "", neuro: "" });
  const protos = [
    { id: "ar", name: tt("AR-supported advice"), fmt: tt("Report: quotes") },
    { id: "vr", name: tt("VR-based training"), fmt: tt("Report: counts") },
    { id: "neuro", name: tt("Neuro-informed UX research"), fmt: tt("Report: heatmaps") },
  ];
  return (
    <div className="space-y-3 text-[#26323F]">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded px-3 py-1.5 text-white" style={{ background: "#155E75" }}>
        <b>{tt("NextWorld UX · decision board")}</b>
        <span className="text-[11px]">{tt("Management: decide what scales, what is tested further, what stops · 16 weeks")}</span>
      </div>
      <Radio label={tt("NextWorld UX")} value={tab} set={setTab} options={[["protos", tt("Prototypes")], ["grid", tt("One grid")], ["feedback", tt("Feedback")], ["decide", tt("Sort them")]]} />

      {tab === "protos" && (
        <div className="grid gap-2 md:grid-cols-3">
          <div className="space-y-1 rounded-lg border border-line bg-white p-2 text-[12px]">
            <p className="font-semibold">{tt("AR-supported advice")}</p>
            <p className="text-[11px] text-[#55606E]">{tt("Report: quotes from the opening week")}</p>
            <p>{tt("“Amazing!” “Like magic.” “My kids loved it.”")}</p>
            <p>{tt("“I didn't know where to point the phone.”")}</p>
            <p className="text-[11px] text-[#55606E]">{tt("Second visits: not tracked. Ethics: camera image sent to a cloud service.")}</p>
          </div>
          <div className="space-y-1 rounded-lg border border-line bg-white p-2 text-[12px]">
            <p className="font-semibold">{tt("VR-based training")}</p>
            <p className="text-[11px] text-[#55606E]">{tt("Report: counts")}</p>
            <p>{tt("42 sessions completed; 6 participants felt unwell; average rating 4.1 of 5.")}</p>
            <p className="text-[11px] text-[#55606E]">{tt("Errors on the real machines afterwards: not measured. Ethics: no review.")}</p>
            <Toggle on={vr3d} onClick={() => setVr3d((v) => !v)}>{tt("View the training scene")}</Toggle>
          </div>
          <div className="space-y-1 rounded-lg border border-line bg-white p-2 text-[12px]">
            <p className="font-semibold">{tt("Neuro-informed UX research")}</p>
            <p className="text-[11px] text-[#55606E]">{tt("Report: heatmaps")}</p>
            <div aria-hidden className="relative h-16 rounded border border-line bg-[#F8FAFC]"><span className="absolute left-[30%] top-[20%] h-8 w-12 rounded-full bg-[#DC2626] opacity-40 blur-sm" /><span className="absolute left-[60%] top-[50%] h-6 w-8 rounded-full bg-[#F59E0B] opacity-40 blur-sm" /></div>
            <p>{tt("“Attention is highest on the banner.” 10 colleagues.")}</p>
            <p className="text-[11px] text-[#55606E]">{tt("Consent form: “to be added”. Hypothesis: none written.")}</p>
          </div>
          {vr3d && (
            <div className="md:col-span-3">
              <ModelStage src="/day14/models/industrial-machine.glb" alt={tt("The machine of the VR training scene")} fallback="/day14/fallback/industrial-machine.svg" orbit="20deg 78deg 3.4m" target="0m 0.9m 0m" aspect="16 / 9" />
            </div>
          )}
        </div>
      )}

      {tab === "grid" && (
        <div className="space-y-2">
          <p className="text-[12.5px]">{tt("The management asked for one table. Here are the three reports put on the same grid; every cell says what the report contains.")}</p>
          <div tabIndex={0} role="region" aria-label={tt("The three prototypes on one grid")} className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[40rem] border-collapse text-[12px]">
              <caption className="sr-only">{tt("The three prototypes on one grid")}</caption>
              <thead>
                <tr className="bg-mist text-left text-micro uppercase text-ash">
                  {[tt("Prototype"), tt("User value"), tt("Maturity"), tt("Risk"), tt("Economic viability"), tt("Ethics")].map((h) => <th key={h} scope="col" className="px-2 py-1.5">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  [tt("AR advice"), tt("quotes; repeat use unknown"), tt("pilot in 1 branch"), tt("not assessed"), tt("no figures"), tt("cloud camera, unreviewed")],
                  [tt("VR training"), tt("rating 4.1; transfer unknown"), tt("pilot, 2 sites"), tt("6 felt unwell"), tt("cost per session known"), tt("no review")],
                  [tt("Neuro research"), tt("“attention on banner”"), tt("study, 10 colleagues"), tt("not assessed"), tt("no figures"), tt("consent missing")],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-line align-top">
                    <th scope="row" className="px-2 py-1.5 text-left font-semibold">{r[0]}</th>
                    {r.slice(1).map((c, i) => <td key={i} className="px-2 py-1.5">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11.5px] text-[#55606E]">{tt("Every column has a different kind of answer, or none. The grid exists; the evidence to fill it does not yet.")}</p>
        </div>
      )}

      {tab === "feedback" && (
        <ul className="space-y-1.5 text-[12.5px]">
          {[
            [tt("Customer, AR advice"), tt("“Saved me a trip to the shop. I'd use it again.”")],
            [tt("Customer, AR advice"), tt("“Too much moving around on the screen. I gave up and asked staff.”")],
            [tt("Technician, VR training"), tt("“I finally understood the guard mechanism.”")],
            [tt("Technician, VR training"), tt("“After ten minutes I felt sick. I'd rather learn on the real machine.”")],
            [tt("IT"), tt("“Three prototypes, three platforms, three vendors. We cannot support all of them.”")],
            [tt("Data protection"), tt("“The heatmap study had no consent. It must not continue like this.”")],
          ].map(([who, text], i) => <li key={i} className="rounded border border-line bg-white px-2 py-1.5"><b>{who}:</b> {text}</li>)}
        </ul>
      )}

      {tab === "decide" && (
        <div className="space-y-2">
          <p className="text-[12.5px]">{tt("A sandbox for your thinking: sort each prototype. Your choice stays in this window only; nothing is stored or marked right or wrong.")}</p>
          {protos.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-2 rounded border border-line bg-white px-2 py-1.5">
              <span className="w-56 shrink-0 text-[12.5px] font-semibold">{p.name}</span>
              <Radio<Move> label={p.name} value={moves[p.id]} set={(v) => setMoves((m) => ({ ...m, [p.id]: v }))} options={[["scale", tt("Scale")], ["test", tt("Test further")], ["pause", tt("Pause")], ["stop", tt("Stop")]]} />
            </div>
          ))}
          {Object.values(moves).every(Boolean) && <p className="rounded bg-[#F1F5F9] px-2 py-1 text-[12.5px]">{tt("Now write down, for each, which evidence would change your mind. That is the start of question 5.")}</p>}
        </div>
      )}
    </div>
  );
}
