"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ModelStage } from "@/components/sim/ModelStage";
import { tt } from "@/lib/lang";

/**
 * Day 14 · the platforms of the tasks, with the plan's clues built in (show it real, user rule 2026-10-28). BuildVision (Block 1.1) is a real 3D service device you
 * can turn, with AR labels anchored to its parts, a PDF checklist to compare, a remote expert, a stressful situation that adds alarms and labels, a weak connection
 * that makes the guidance drop out, and a "show mode" that only impresses. HealthSpace's three approaches (Block 1.2) are drawn as the screens each would put in
 * front of a patient. IndustryXR (Block 2.1) is the company's pilot board, with a VR training demo on a real 3D machine. Hotspot positions for the bundled models
 * come from the original Day 14. The names and contents are made up; nothing is marked right or wrong.
 */

const STEPS = () => [
  { slot: "hotspot-display", pos: "0 1.42 0.34", normal: "0 0 1", n: 1, label: tt("Check the status display"), detail: tt("It must show “service mode” before you open anything.") },
  { slot: "hotspot-hatch", pos: "0 0.74 0.32", normal: "0 0 1", n: 2, label: tt("Open the service hatch"), detail: tt("Behind the front plate: the replaceable module.") },
  { slot: "hotspot-valves", pos: "-0.19 0.34 0.36", normal: "0 0 1", n: 3, label: tt("Close both valves"), detail: tt("Left valve first, then right.") },
  { slot: "hotspot-pipe", pos: "0.46 1.1 -0.05", normal: "1 0 0", n: 4, label: tt("Check the side connector"), detail: tt("Hand-tight only; no tools.") },
];
const NOISE = () => [
  { slot: "hotspot-n1", pos: "0.3 1.6 0.2", normal: "0 0 1", label: tt("⚠ Pressure 4.2 bar") },
  { slot: "hotspot-n2", pos: "-0.35 1.2 0.3", normal: "0 0 1", label: tt("Part no. SV-2231-B") },
  { slot: "hotspot-n3", pos: "0.35 0.5 0.3", normal: "0 0 1", label: tt("Tip: wear gloves") },
  { slot: "hotspot-n4", pos: "-0.3 0.9 0.3", normal: "0 0 1", label: tt("⚠ Hot surface") },
  { slot: "hotspot-n5", pos: "0.1 0.15 0.35", normal: "0 0 1", label: tt("Last service: 14 months") },
];

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={clsx("min-h-[36px] rounded border px-2.5 text-[12.5px] font-semibold", on ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-[#C3CCD6] bg-white text-[#26323F]")}>
      {children}
    </button>
  );
}

export function BuildVision() {
  const [mode, setMode] = useState<"ar" | "pdf">("ar");
  const [expert, setExpert] = useState(false);
  const [stress, setStress] = useState(false);
  const [weak, setWeak] = useState(false);
  const [show, setShow] = useState(false);
  const [online, setOnline] = useState(true);
  const [secs, setSecs] = useState(90);
  useEffect(() => {
    if (!weak) {
      setOnline(true);
      return;
    }
    const id = window.setInterval(() => setOnline((v) => !v), 2600);
    return () => window.clearInterval(id);
  }, [weak]);
  useEffect(() => {
    if (!stress) {
      setSecs(90);
      return;
    }
    const id = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, [stress]);
  const steps = STEPS();
  const labels = mode === "ar" && online;
  return (
    <div className="space-y-3 text-[#26323F]">
      <div className="flex flex-wrap gap-1.5">
        <Toggle on={mode === "ar"} onClick={() => setMode("ar")}>{tt("AR guidance")}</Toggle>
        <Toggle on={mode === "pdf"} onClick={() => setMode("pdf")}>{tt("PDF checklist")}</Toggle>
        <Toggle on={expert} onClick={() => setExpert((v) => !v)}>{tt("Remote expert")}</Toggle>
        <Toggle on={stress} onClick={() => setStress((v) => !v)}>{tt("Stressful situation")}</Toggle>
        <Toggle on={weak} onClick={() => setWeak((v) => !v)}>{tt("Weak connection")}</Toggle>
        <Toggle on={show} onClick={() => setShow((v) => !v)}>{tt("3D show mode")}</Toggle>
      </div>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="relative">
          {stress && (
            <div className="absolute left-2 right-2 top-2 z-10 rounded bg-[#B91C1C] px-2 py-1 text-[12px] font-bold text-white">{tt(`⚠ ALARM: pressure rising · line stop in 00:${String(secs).padStart(2, "0")} · supervisor calling`)}</div>
          )}
          {show && <div className="absolute bottom-2 left-2 right-2 z-10 rounded bg-gradient-to-r from-[#7C3AED] to-[#DB2777] px-2 py-1 text-center text-[12px] font-bold text-white">{tt("✨ Experience the future of service ✨")}</div>}
          {weak && !online && <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded bg-[#111827]/85 px-3 py-2 text-[12px] font-semibold text-white">{tt("Reconnecting … guidance paused")}</div>}
          <ModelStage src="/day14/models/service-device.glb" alt={tt("A generic service device with a display, a hatch, two valves and a side connector")} fallback="/day14/fallback/service-device.svg" orbit="18deg 76deg 5.2m" target="0m 0.92m 0m" autoRotate={show} ar aspect="1 / 1">
            {labels &&
              steps.map((s) => (
                <div key={s.slot} slot={s.slot} data-position={s.pos} data-normal={s.normal} className="pointer-events-none flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-[#1E3A5F]/40 bg-white/95 py-0.5 pl-0.5 pr-2 text-[11px] font-semibold shadow">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1E3A5F] text-[10px] text-white">{s.n}</span>
                  {s.label}
                </div>
              ))}
            {labels &&
              stress &&
              NOISE().map((s) => (
                <div key={s.slot} slot={s.slot} data-position={s.pos} data-normal={s.normal} className="pointer-events-none whitespace-nowrap rounded bg-[#FEF3C7] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#78350F] shadow">{s.label}</div>
              ))}
          </ModelStage>
        </div>
        <div className="space-y-2">
          {mode === "pdf" ? (
            <div className="rounded border border-[#C3CCD6] bg-white p-2 text-[12px]">
              <p className="font-semibold">{tt("Maintenance procedure SV-22 (PDF, page 14 of 38)")}</p>
              <ol className="mt-1 list-decimal space-y-0.5 pl-4">
                {steps.map((s) => <li key={s.slot}>{s.label}: {s.detail}</li>)}
              </ol>
              <p className="mt-1 text-[11px] text-[#5F6B78]">{tt("See figure 7 on page 31.")}</p>
            </div>
          ) : (
            <div className="rounded border border-[#C3CCD6] bg-white p-2 text-[12px]">
              <p className="font-semibold">{tt("AR guidance: the steps sit on the parts")}</p>
              <ul className="mt-1 space-y-0.5">{steps.map((s) => <li key={s.slot}>{s.n}. {s.detail}</li>)}</ul>
            </div>
          )}
          {expert && (
            <div className="rounded border border-[#C3CCD6] bg-[#F1F5F9] p-2 text-[12px]">
              <p className="font-semibold">🎥 {tt("Remote expert connected · Dana, service centre")}</p>
              <p>{online ? tt("“I can see your valves. Close the left one first, then the right one.”") : tt("“… you're breaking up … can you …”")}</p>
            </div>
          )}
          <p className="text-[11px] text-[#5F6B78]">{tt("Try the steps as a technician would: first calm, then switch on the stressful situation and the weak connection.")}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ HealthSpace A, B, C */

function Screen({ title, color, children }: { title: string; color: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#C3CCD6] bg-white text-[#26323F]">
      <div className="px-3 py-2 text-[14px] font-bold text-white" style={{ background: color }}>{title}</div>
      <div className="min-h-[260px] space-y-2 p-3 text-[13px]">{children}</div>
      <div className="border-t border-[#C3CCD6] px-3 py-1.5 text-[11px] text-[#5F6B78]">{tt("© HealthSpace · Simulation: the names and the contents are made up")}</div>
    </div>
  );
}

export function HealthSpace({ variant }: { variant: "A" | "B" | "C" }) {
  const [step, setStep] = useState(0);
  if (variant === "A")
    return (
      <Screen title="HealthSpace XR" color="#4C1D95">
        {step === 0 && (
          <>
            <div className="rounded bg-gradient-to-br from-[#4C1D95] to-[#0E7490] p-3 text-white">
              <p className="text-[16px] font-bold">{tt("Enter your immersive health world 🥽")}</p>
              <p className="text-[12px]">{tt("Counselling in VR, AR exercise coach, motivation island with your avatar.")}</p>
            </div>
            <button type="button" onClick={() => setStep(1)} className="rounded bg-[#4C1D95] px-3 py-2 text-[13px] font-semibold text-white">{tt("Start VR counselling")}</button>
          </>
        )}
        {step === 1 && (
          <>
            <p className="font-semibold">{tt("Before you start")}</p>
            <ul className="list-disc space-y-0.5 pl-5">
              <li>{tt("Connect a supported VR headset (Quest 3, Vision Pro).")}</li>
              <li>{tt("Clear 2 × 2 metres of space around you.")}</li>
              <li>{tt("Download the 3.4 GB health world.")}</li>
              <li>{tt("If you feel dizzy, remove the headset.")}</li>
            </ul>
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(2)} className="rounded bg-[#4C1D95] px-3 py-2 text-[13px] font-semibold text-white">{tt("I have no headset")}</button>
              <button type="button" onClick={() => setStep(0)} className="rounded border border-[#C3CCD6] px-3 py-2 text-[13px]">{tt("Back")}</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p>{tt("Without a headset, you can watch a 360° preview on your phone. Counselling in VR is not available without a headset.")}</p>
            <button type="button" onClick={() => setStep(0)} className="rounded border border-[#C3CCD6] px-3 py-2 text-[13px]">{tt("Back")}</button>
          </>
        )}
      </Screen>
    );
  if (variant === "B")
    return (
      <Screen title="HealthSpace" color="#0F766E">
        <p className="font-semibold">{tt("Your inhaler: practise the technique")}</p>
        <p>{tt("Point your phone camera at a table. A 3D inhaler appears and shows the four steps, one at a time, at real size.")}</p>
        <div className="flex gap-1" aria-hidden>{[0, 1, 2, 3].map((i) => <div key={i} className="h-1.5 flex-1 rounded" style={{ background: i <= step ? "#0F766E" : "#D1D5DB" }} />)}</div>
        <p className="rounded border border-[#C3CCD6] bg-[#F0FDFA] p-2">{[tt("1 · Shake the inhaler four times."), tt("2 · Breathe out fully, away from the inhaler."), tt("3 · Breathe in slowly while you press once."), tt("4 · Hold your breath for ten seconds.")][step]}</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => setStep((s) => Math.min(3, s + 1))} className="rounded bg-[#0F766E] px-3 py-2 text-[13px] font-semibold text-white">{step < 3 ? tt("Next step") : tt("Done")}</button>
          <button type="button" onClick={() => setStep(0)} className="rounded border border-[#C3CCD6] px-3 py-2 text-[13px]">{tt("Watch as a video instead")}</button>
        </div>
      </Screen>
    );
  return (
    <Screen title="HealthSpace" color="#1E3A5F">
      <p className="font-semibold">{tt("Your prevention plan")}</p>
      <ul className="space-y-1">
        <li className="rounded border border-[#C3CCD6] p-2">{tt("Inhaler technique · video and step-by-step text")}</li>
        <li className="rounded border border-[#C3CCD6] p-2">{tt("Back exercises · illustrated guide")}</li>
        <li className="rounded border border-[#C3CCD6] p-2">{tt("Book a counselling call")}</li>
      </ul>
      <p className="text-[12px] text-[#5F6B78]">{tt("Coming later: immersive formats, once we have tested them with patients.")}</p>
    </Screen>
  );
}

/* ------------------------------------------------------------------ IndustryXR: the pilot board, and a VR training demo */

const IDEAS = () => [
  { idea: tt("AR maintenance instructions"), unit: tt("Service"), status: tt("Prototype on tablet"), value: tt("not measured"), risk: tt("not assessed") },
  { idea: tt("VR safety training"), unit: tt("Training"), status: tt("Vendor demo seen"), value: tt("not measured"), risk: tt("not assessed") },
  { idea: tt("AR remote expert"), unit: tt("Service"), status: tt("Idea"), value: tt("not measured"), risk: tt("not assessed") },
  { idea: tt("VR showroom for trade fairs"), unit: tt("Sales"), status: tt("Agency offer"), value: tt("not measured"), risk: tt("not assessed") },
  { idea: tt("Attention-guidance overlay for assembly"), unit: tt("Production"), status: tt("Research paper"), value: tt("not measured"), risk: tt("not assessed") },
];

export function IndustryXR() {
  const [page, setPage] = useState<"board" | "roadmap" | "demo">("board");
  return (
    <div className="overflow-hidden rounded-xl border border-[#C3CCD6] bg-white text-[#26323F]">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1E293B] px-3 py-2 text-white">
        <span className="text-[14px] font-bold">IndustryXR · {tt("Innovation board")}</span>
        <div className="flex gap-1">
          {(
            [
              ["board", tt("Pilot ideas")],
              ["roadmap", tt("Roadmap")],
              ["demo", tt("VR training demo")],
            ] as ["board" | "roadmap" | "demo", string][]
          ).map(([k, l]) => (
            <button key={k} type="button" onClick={() => setPage(k)} className={clsx("rounded px-2 py-1 text-[12px] font-semibold", page === k ? "bg-white/25" : "hover:bg-white/15")}>{l}</button>
          ))}
        </div>
      </div>
      <div className="min-h-[300px] p-3 text-[13px]">
        {page === "board" && (
          <div className="space-y-2">
            <p className="font-semibold">{tt("Pilot ideas from the business units (order of submission)")}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-[12.5px]">
                <thead>
                  <tr className="bg-[#F1F5F9] text-left">
                    {[tt("Idea"), tt("Unit"), tt("Status"), tt("User value"), tt("Risk")].map((h) => <th key={h} scope="col" className="px-2 py-1">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {IDEAS().map((r) => (
                    <tr key={r.idea} className="border-t border-[#E2E8F0]">
                      <th scope="row" className="px-2 py-1 text-left font-semibold">{r.idea}</th>
                      <td className="px-2 py-1">{r.unit}</td>
                      <td className="px-2 py-1">{r.status}</td>
                      <td className="px-2 py-1 text-[#5F6B78]">{r.value}</td>
                      <td className="px-2 py-1 text-[#5F6B78]">{r.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="rounded bg-[#FEF3C7] p-2 text-[12px]">{tt("Comments: Sales: “We need the showroom for the spring fair.” · Safety: “No headsets near moving machines.” · Finance: “Business case first.” · Training: “VR is the future of learning!”")}</p>
          </div>
        )}
        {page === "roadmap" && (
          <div className="space-y-2">
            <p className="font-semibold">{tt("Roadmap 2026–2027")}</p>
            <p className="rounded border border-dashed border-[#C3CCD6] p-3 text-[#5F6B78]">{tt("To be defined. Next step: discuss in the innovation round (no date set).")}</p>
          </div>
        )}
        {page === "demo" && (
          <div className="space-y-2">
            <p className="font-semibold">{tt("VR training demo (vendor): the machine in 3D")}</p>
            <ModelStage src="/day14/models/industrial-machine.glb" alt={tt("A generic industrial machine with an operating panel, a gantry head and a lower guard")} fallback="/day14/fallback/industrial-machine.svg" orbit="20deg 78deg 3.4m" target="0m 0.9m 0m" autoRotate aspect="16 / 10">
              {[
                ["hotspot-panel", "-0.55 1.03 0.46", "0 0 1", tt("Operating panel")],
                ["hotspot-head", "0.22 1.47 0.02", "0 1 0", tt("Gantry head")],
                ["hotspot-guard", "0.2 0.28 0.45", "0 0 1", tt("Lower guard")],
              ].map(([slot, pos, normal, label]) => (
                <div key={slot} slot={slot} data-position={pos} data-normal={normal} className="pointer-events-none whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold shadow">{label}</div>
              ))}
            </ModelStage>
            <p className="text-[12px] text-[#5F6B78]">{tt("The vendor's demo: impressive in a meeting room. Which task does it train, and how would we know it worked?")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
