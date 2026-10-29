"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { ModelStage } from "@/components/sim/ModelStage";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 14 · the working products of the study cards (UX-STANDARD 2.16): Brewline, a made-up maker of coffee machines with an AR app, so no task is answered here.
 * The machine is the bundled retail-product model (public/day14/models), with tappable points anchored to its parts. Each lab gives one task and versions to use,
 * with time, wrong taps, stress tests and a "how did that feel?" after each run (components/sim/TaskLab.tsx).
 */
const MODEL = "/day14/models/retail-product.glb";
const FALLBACK = "/day14/fallback/retail-product.svg";
const BRAND = "#6B3E26";
const PARTS = () => [
  { id: "tank", slot: "hotspot-tank", pos: "0 0.62 -0.06", normal: "0 1 0", label: tt("Water tank") },
  { id: "spout", slot: "hotspot-spout", pos: "0 0.36 0.19", normal: "0 0 1", label: tt("Spout") },
  { id: "tray", slot: "hotspot-tray", pos: "0 0.06 0.19", normal: "0 0 1", label: tt("Drip tray") },
  { id: "buttons", slot: "hotspot-buttons", pos: "0.23 0.5 0.02", normal: "1 0 0", label: tt("Buttons") },
];
const Done = ({ text }: { text: string }) => <AppScreen brand="Brewline" color={BRAND}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

/* ------------------------------------------------------------------ A1 · flat, 3D, AR */

function FindTank({ ctx, mode }: { ctx: LabCtx; mode: "flat" | "3d" | "ar" }) {
  const [page, setPage] = useState(1);
  const parts = PARTS();
  if (ctx.finished) return <Done text={tt("Found the water tank: it lifts out at the back, on top")} />;
  const tap = (id: string, name: string) => (id === "tank" ? ctx.done(tt(`Tapped ${name}`)) : ctx.miss(tt(`Tapped ${name}`)));
  if (mode === "flat")
    return (
      <AppScreen brand={tt("Brewline · manual (PDF)")} color={BRAND} status={tt(`page ${page} of 24`)}>
        {page === 12 ? (
          <>
            <p className="text-[12px] font-semibold">{tt("Figure 3")}</p>
            <svg viewBox="0 0 200 200" className="mx-auto h-44" role="img" aria-label={tt("A line drawing of the machine with the letters A to D")}>
              <rect x="50" y="40" width="100" height="140" fill="#F5F5F4" stroke="#57534E" />
              <rect x="60" y="20" width="80" height="22" fill="#E7E5E4" stroke="#57534E" />
              <rect x="88" y="95" width="24" height="16" fill="#D6D3D1" stroke="#57534E" />
              <rect x="70" y="165" width="60" height="10" fill="#D6D3D1" stroke="#57534E" />
              <circle cx="140" cy="70" r="6" fill="#D6D3D1" stroke="#57534E" />
              {[["B", 100, 32, "tank"], ["D", 100, 106, "spout"], ["A", 100, 174, "tray"], ["C", 150, 66, "buttons"]].map(([l, x, y, id]) => (
                <g key={l as string}><circle cx={x as number} cy={(y as number) - 4} r="7" fill="#FFFFFF" stroke="#1C1917" /><text x={x as number} y={y as number} textAnchor="middle" fontSize="9" fontWeight="700">{l}</text></g>
              ))}
            </svg>
            <div className="grid grid-cols-4 gap-1">{[["A", "tray"], ["B", "tank"], ["C", "buttons"], ["D", "spout"]].map(([l, id]) => <button key={l} type="button" onClick={() => tap(id, tt(`part ${l}`))} className="rounded border border-[#A8A29E] py-1 font-bold">{l}</button>)}</div>
            <p className="text-[11px] text-[#57534E]">{tt("Legend: see page 14.")}</p>
          </>
        ) : page === 14 ? (
          <p className="text-[12px]">{tt("Legend to figure 3: A drip tray · B water tank · C buttons · D spout")}</p>
        ) : (
          <p className="text-[12px] text-[#57534E]">{tt("Safety instructions … warranty … installation …")}</p>
        )}
        <div className="flex flex-wrap gap-1">{[1, 12, 14].map((p) => <button key={p} type="button" onClick={() => { setPage(p); ctx.hit(tt(`Page ${p}`)); }} className={clsx("rounded border px-2 text-[11px]", page === p && "border-[#6B3E26] bg-[#F5EFEA]")}>{tt(`p. ${p}`)}</button>)}</div>
      </AppScreen>
    );
  return (
    <div className="space-y-1">
      <ModelStage src={MODEL} alt={mode === "ar" ? tt("The Brewline machine with tappable labels on its water tank, spout, drip tray and buttons") : tt("The Brewline machine with four unlabelled tappable points")} fallback={FALLBACK} orbit="25deg 75deg 1.6m" target="0m 0.32m 0m" ar={mode === "ar"}>
        {parts.map((p, i) => (
          <button key={p.slot} type="button" slot={p.slot} data-position={p.pos} data-normal={p.normal} onClick={() => tap(p.id, mode === "ar" ? p.label : tt(`point ${i + 1}`))} aria-label={mode === "ar" ? p.label : tt(`Point ${i + 1}`)} className={clsx("whitespace-nowrap rounded-full text-[11px] font-semibold shadow", mode === "ar" ? "bg-white/95 px-2 py-0.5 text-[#1D2733]" : "h-5 w-5 bg-[#6B3E26] text-white")}>
            {mode === "ar" ? p.label : i + 1}
          </button>
        ))}
      </ModelStage>
      {mode === "3d" && <p className="text-[11.5px] text-ash">{tt("Turn the machine and tap the point you think is the water tank.")}</p>}
      <p className="flex flex-wrap items-center gap-1 text-[11px] text-ash">
        {tt("No 3D on this device? The same points:")}
        {parts.map((p, i) => <button key={p.id} type="button" onClick={() => tap(p.id, mode === "ar" ? p.label : tt(`point ${i + 1}`))} className="rounded border border-line px-1.5">{mode === "ar" ? p.label : tt(`Point ${i + 1}`)}</button>)}
      </p>
    </div>
  );
}

export function ModesLab() {
  return (
    <TaskLab
      label={tt("The Brewline coffee machine as a flat manual, as a 3D object and with AR labels · a working product · real 3D · Case assumption, example company")}
      point={tt("Classic interfaces are flat; immersive ones put content into space. A 3D object can be turned and seen from any side; AR labels sit on the parts themselves, so nobody has to map a diagram onto the machine. On a phone that supports AR, the labelled machine can be placed on your own table.")}
      task={tt("You are Zara. Find the water tank, so you can fill it with descaler.")}
      stresses={["small", "eyes", "ping"]}
      device="desktop"
      feel={[tt("searching"), tt("obvious")]}
      versions={[
        { id: "flat", label: tt("Flat: the manual"), render: (ctx) => <FindTank ctx={ctx} mode="flat" />, insight: tt("In plain words: a drawing with letters on page 12 and the legend on page 14. Zara finds the right page, then the letter, then maps it onto her machine.") },
        { id: "3d", label: tt("3D: turn it"), render: (ctx) => <FindTank ctx={ctx} mode="3d" />, insight: tt("In plain words: the real shape, from every side, but four unnamed points. Nicer than a drawing, and still no answer to “where is the tank?”.") },
        { id: "ar", label: tt("AR: labels on the parts"), render: (ctx) => <FindTank ctx={ctx} mode="ar" />, insight: tt("In plain words: the labels sit on the parts and turn with the machine. This is augmented reality; virtual reality would replace the kitchen altogether.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · intensify or overwhelm */

const STEPS = () => [tt("Fill the tank with descaler"), tt("Cup under the spout"), tt("Press both buttons"), tt("Rinse the tank")];
function Descale({ ctx, stress }: { ctx: LabCtx; stress: boolean }) {
  const [step, setStep] = useState(0);
  const [jit, setJit] = useState(0);
  const [beep, setBeep] = useState(false);
  useEffect(() => {
    if (!stress || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => { setJit((j) => j + 1); setBeep((b) => !b); }, 1200);
    return () => window.clearInterval(id);
  }, [stress]);
  const steps = STEPS();
  const extras = useMemo(() => [tt("⚠ Hot water!"), tt("Tip: use Brewline descaler"), tt("Order descaler 🛒")], []);
  if (ctx.finished) return <Done text={tt("Descaled · the machine is ready")} />;
  const tap = (i: number) => {
    if (i !== step) return ctx.miss(tt(`Tapped step ${i + 1} out of order`));
    ctx.hit(tt(`Step ${i + 1}: ${steps[i]}`));
    if (i === 3) ctx.done(tt("All four steps in order"));
    else setStep(i + 1);
  };
  const pos = [[30, 10], [40, 46], [62, 30], [20, 70]];
  const off = (i: number) => (stress ? ((jit + i) % 3) * 6 - 6 : 0);
  return (
    <AppScreen brand={tt("Brewline · AR")} color={BRAND} status={stress ? tt("📶 weak") : undefined}>
      {stress && <p className={clsx("rounded px-2 py-0.5 text-[11px] font-bold text-white", beep ? "bg-[#B91C1C]" : "bg-[#7F1D1D]")}>{tt("🔔 BEEP · descaling needed · 👶 crying next door")}</p>}
      <div className="relative h-56 overflow-hidden rounded-lg bg-[#57534E]">
        <div className="absolute left-1/2 top-6 h-44 w-28 -translate-x-1/2 rounded bg-[#D6D3D1]" aria-hidden />
        {(stress ? steps.map((s, i) => [s, i] as const) : [[steps[step], step] as const]).map(([s, i]) => (
          <button key={i} type="button" onClick={() => tap(i)} className="absolute whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold shadow" style={{ left: `${pos[i][0] + off(i)}%`, top: `${pos[i][1] + off(i + 1)}%` }}>{`${i + 1} · ${s}`}</button>
        ))}
        {stress && extras.map((e, i) => <button key={e} type="button" onClick={() => ctx.miss(tt(`Tapped “${e}”`))} className="absolute whitespace-nowrap rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-semibold text-[#78350F] shadow" style={{ left: `${[8, 55, 12][i] + off(i)}%`, top: `${[34, 60, 85][i]}%` }}>{e}</button>)}
      </div>
      {!stress && <p className="rounded bg-[#F5EFEA] px-2 py-1 text-[12px]">{tt(`Step ${step + 1} of 4 · ${step < 3 ? `next: ${steps[step + 1].toLowerCase()}` : "last step"}`)}</p>}
    </AppScreen>
  );
}

export function IntensifyLab() {
  return (
    <TaskLab
      label={tt("The Brewline AR descaling guide in a calm and a stressful moment · a working product · Case assumption, example company")}
      point={tt("The same immersive feature can intensify an experience or overwhelm it. In a quiet moment, AR at the machine is a real help; with noise, time pressure and a weak connection, the same overlays become a burden. Design and test for the stressful moment, not only the demo.")}
      task={tt("You are Zara. Descale the machine: tap the four steps in order.")}
      feel={[tt("overwhelmed"), tt("helped")]}
      versions={[
        { id: "calm", label: tt("A quiet Sunday"), render: (ctx) => <Descale ctx={ctx} stress={false} />, insight: tt("In plain words: one label on the part that matters now and a step counter. Zara descales without the manual.") },
        { id: "stress", label: tt("A stressful morning"), render: (ctx) => <Descale ctx={ctx} stress />, insight: tt("In plain words: the machine beeps, a child cries, the weak signal makes the labels jump, and seven labels appear at once, two of them adverts. The help became part of the stress.") },
      ]}
    />
  );
}
