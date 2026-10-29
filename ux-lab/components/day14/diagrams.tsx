"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { MeasureThumb } from "@/components/day14/mocks";
import { StateFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { ModelStage } from "@/components/sim/ModelStage";
import { tt } from "@/lib/lang";
import { IntensifyLab, ModesLab } from "@/components/day14/labs";

/**
 * Day 14 · the teaching diagrams of Materi A and B. Example: Brewline, a made-up maker of coffee machines, with Zara and Edgar (customers), Kim (UX designer) and
 * Ruth (product owner); never BuildVision, HealthSpace or IndustryXR, so no task is answered here. The Brewline machine is the bundled retail-product model (0.46 m
 * wide, 0.65 m high), with labels anchored to its parts. Ideas from the original Day 14 kept here: flat against spatial and the AR overlay (A1), cognitive load
 * and intensify or overwhelm (A2, A3), fascination against impact (A4), ethics and reputation (A5, B2).
 */
const MODEL = "/day14/models/retail-product.glb";
const FALLBACK = "/day14/fallback/retail-product.svg";
const PARTS = () => [
  { slot: "hotspot-tank", pos: "0 0.62 -0.06", normal: "0 1 0", label: tt("Water tank") },
  { slot: "hotspot-spout", pos: "0 0.36 0.19", normal: "0 0 1", label: tt("Spout") },
  { slot: "hotspot-tray", pos: "0 0.06 0.19", normal: "0 0 1", label: tt("Drip tray") },
  { slot: "hotspot-buttons", pos: "0.23 0.5 0.02", normal: "1 0 0", label: tt("Buttons") },
];
const EXTRA = () => [
  { slot: "hotspot-x1", pos: "-0.2 0.55 0.15", normal: "0 0 1", label: tt("⚠ Hot!") },
  { slot: "hotspot-x2", pos: "0.18 0.25 0.18", normal: "0 0 1", label: tt("Tip: descale monthly") },
  { slot: "hotspot-x3", pos: "-0.18 0.2 0.18", normal: "0 0 1", label: tt("Order capsules 🛒") },
  { slot: "hotspot-x4", pos: "0.1 0.64 0.1", normal: "0 1 0", label: tt("Model BX-7") },
  { slot: "hotspot-x5", pos: "-0.23 0.35 0", normal: "-1 0 0", label: tt("Rate us ⭐") },
];
const Label = ({ slot, pos, normal, children, loud }: { slot: string; pos: string; normal: string; children: string; loud?: boolean }) => (
  <div slot={slot} data-position={pos} data-normal={normal} className={clsx("pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold shadow", loud ? "bg-[#FEF3C7] text-[#78350F] motion-safe:animate-pulse" : "bg-white/95 text-[#1D2733]")}>
    {children}
  </div>
);

/* ------------------------------------------------------------------ A1 · flat, 3D, AR (interactive, real 3D) */

export function ModesFig() {
  return <ModesLab />;
}

/* ------------------------------------------------------------------ A2 · attention and load in space (interactive, real 3D) */

export function AttentionFig() {
  const [n, setN] = useState(0);
  const id = useId();
  const names = [tt("Two labels"), tt("Nine labels"), tt("Nine labels, moving")];
  const parts = PARTS();
  const insight = [
    tt("In plain words: the two labels Zara needs now, tank and spout. Her attention goes straight there."),
    tt("In plain words: nine labels compete. Each one is true; together they are noise, and she has to search for the one she needs."),
    tt("In plain words: the warnings and offers now pulse. Movement captures attention involuntarily, so the eye goes to “Order capsules”, not to the step. Under stress people follow the most visible cue, not the most important one."),
  ][n];
  return (
    <Diagram label={tt("The Brewline machine with two labels, nine labels, and nine moving labels · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Presence makes immersive experiences intense, but the brain's limits stay the same: attention is narrow and working memory is small. Every label, sound and movement competes for it. Good immersive design steers perception to what matters now and keeps the load low.")}</ThePoint>
        <div className="space-y-1">
          <label htmlFor={id} className="text-caption font-semibold text-ink">{tt(`On the machine: ${names[n]}`)}</label>
          <input id={id} type="range" min={0} max={2} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-[#1750A8]" aria-valuetext={names[n]} />
        </div>
        <ModelStage key={n} src={MODEL} alt={tt(`The Brewline machine with ${names[n].toLowerCase()}`)} fallback={FALLBACK} orbit="25deg 75deg 1.6m" target="0m 0.32m 0m">
          {(n === 0 ? parts.slice(0, 2) : parts).map((p) => <Label key={p.slot} slot={p.slot} pos={p.pos} normal={p.normal}>{p.label}</Label>)}
          {n > 0 && EXTRA().map((p) => <Label key={p.slot} slot={p.slot} pos={p.pos} normal={p.normal} loud={n === 2}>{p.label}</Label>)}
        </ModelStage>
        <Insight>{insight}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · intensify or overwhelm (interactive) */

export function IntensifyFig() {
  return <IntensifyLab />;
}

/* ------------------------------------------------------------------ A4 · fascination or impact (interactive) */

type Idea = { id: string; name: string; value: number; maturity: number; why: string };
export function ValueFig() {
  const ideas: Idea[] = [
    { id: "descale", name: tt("AR descaling guide"), value: 3, maturity: 3, why: tt("A real, frequent task; phone AR is mature. High value, high maturity: a candidate to pilot.") },
    { id: "counter", name: tt("“See it on your counter” AR"), value: 2, maturity: 3, why: tt("Helps a buying decision (does it fit?), mature technology, modest value: a good small feature.") },
    { id: "barista", name: tt("VR barista course for café staff"), value: 3, maturity: 1, why: tt("Practising without wasting milk could help, but headsets in cafés and motion sickness are unsolved: valuable, not yet mature.") },
    { id: "showroom", name: tt("VR café showroom at the trade fair"), value: 1, maturity: 2, why: tt("Impresses visitors for five minutes; solves no customer problem: fascination, not impact.") },
    { id: "eye", name: tt("Eye-tracking ads in the app"), value: 1, maturity: 1, why: tt("Little value for customers, immature on phones, and ethically questionable: leave it.") },
  ];
  const [sel, setSel] = useState<string>("descale");
  const cur = ideas.find((i) => i.id === sel)!;
  const cell = (v: number, m: number) => ideas.filter((i) => i.value === v && i.maturity === m);
  return (
    <Diagram label={tt("Brewline's five ideas placed by user value and maturity · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A future technology is relevant only when it solves a real problem better than a classic interface, works reliably in the real setting, and can be used and paid for at scale. Place every idea by user value and maturity before anyone falls in love with a demo.")}</ThePoint>
        <div className="mx-auto grid max-w-[520px] grid-cols-[auto_1fr_1fr_1fr] gap-1 text-caption">
          <div />
          {[tt("Maturity low"), tt("medium"), tt("high")].map((h) => <div key={h} className="text-center font-semibold text-ash">{h}</div>)}
          {[3, 2, 1].map((v) => (
            <div key={v} className="contents">
              <div className="flex items-center pr-1 font-semibold text-ash">{[tt("Value low"), tt("medium"), tt("Value high")][v - 1]}</div>
              {[1, 2, 3].map((m) => (
                <div key={m} className={clsx("min-h-[56px] rounded border p-1", v >= 2 && m >= 2 ? "border-[#7CC48D] bg-[#F2FAF4]" : "border-line bg-paper")}>
                  {cell(v, m).map((i) => (
                    <button key={i.id} type="button" aria-pressed={sel === i.id} onClick={() => setSel(i.id)} className={clsx("mb-1 block w-full rounded border px-1 py-0.5 text-left text-[12px]", sel === i.id ? "border-accent bg-accentSoft font-semibold" : "border-line bg-white")}>{i.name}</button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Insight>{tt(`${cur.name}: ${cur.why}`)}</Insight>
      </div>
    </Diagram>
  );
}

export function MaturityChainFig() {
  return (
    <ChainFig
      label={tt("From an idea to a product in use, and where most immersive projects stop")}
      steps={[
        { h: tt("An idea"), b: tt("“AR for descaling.” Exciting; nothing is known yet."), kind: "m" },
        { h: tt("A lab prototype"), b: tt("Works on the designer's phone, in good light, with a clean machine."), kind: "a" },
        { h: tt("A pilot in real kitchens"), b: tt("Fifty customers, steam, bad light, weak Wi-Fi, a child crying: the real test."), kind: "a" },
        { h: tt("In use at scale"), b: tt("Every model, every phone, every country, with support and updates."), kind: "s" },
      ]}
      caption={tt("Most impressive demos live in the second box. Maturity is proven in the third, and value is only real in the fourth.")}
    />
  );
}

/* ------------------------------------------------------------------ A5 · ethics (static) and three measures weighed (interactive) */

export function EthicsFig() {
  const qs = [tt("What does it record?"), tt("Who is left out?"), tt("Can it make people sick or tired?"), tt("Does it steer attention for us, not them?"), tt("Can people say no?")];
  const rows: [string, string[]][] = [
    [tt("AR descaling guide"), [tt("The camera sees the kitchen; nothing stored."), tt("People without an AR phone: a video instead."), tt("No."), tt("No, if no adverts are added."), tt("Yes: the manual stays.")]],
    [tt("VR barista course"), [tt("Hand and head movements."), tt("Staff who get motion sick."), tt("Yes, in long sessions."), tt("No."), tt("Only if a non-VR course exists.")]],
    [tt("Eye-tracking ads"), [tt("Where people look, how long."), tt("Nobody, but everyone is watched."), tt("No."), tt("Yes: that is its purpose."), tt("Hardly.")]],
  ];
  return (
    <Diagram label={tt("Five ethical questions asked of three Brewline ideas · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Immersive and neuro-based interfaces see more of people than a screen does: rooms, bodies, gaze. Ask five questions of every idea before it is piloted.")}</ThePoint>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] border-collapse text-caption">
            <thead>
              <tr className="bg-mist text-left text-micro uppercase text-ash">
                <th scope="col" className="px-2 py-2">{tt("Idea")}</th>
                {qs.map((q) => <th key={q} scope="col" className="px-2 py-2 normal-case">{q}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([m, a]) => (
                <tr key={m} className="border-t border-line align-top">
                  <th scope="row" className="px-2 py-2 text-left font-semibold text-ink">{m}</th>
                  {a.map((x, i) => <td key={i} className="px-2 py-2 text-ink">{x}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Diagram>
  );
}

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "descale",
      name: tt("Pilot the AR descaling guide with fifty customers"),
      cells: {
        effect: { level: 3, reason: tt("A frequent, annoying task done without the manual.") },
        feasibility: { level: 3, reason: tt("Phone AR and one model; a few weeks.") },
        risk: { level: 1, reason: tt("Low: the manual and a video stay.") },
        time: { level: 3, reason: tt("Results within a quarter.") },
        invest: { level: 3, reason: tt("Small spend; clear measures (use, completion, support calls).") },
      },
    },
    {
      id: "showroom",
      name: tt("Build a VR café showroom for the trade fair"),
      cells: {
        effect: { level: 1, reason: tt("Five minutes of wow for visitors; no customer problem solved.") },
        feasibility: { level: 2, reason: tt("An agency can build it.") },
        risk: { level: 2, reason: tt("Motion sickness at a crowded stand; looks dated next year.") },
        time: { level: 3, reason: tt("Ready for the fair.") },
        invest: { level: 1, reason: tt("Expensive and teaches nothing about users.") },
      },
    },
    {
      id: "eye",
      name: tt("Add eye-tracking to measure attention to offers in the app"),
      cells: {
        effect: { level: 1, reason: tt("Helps marketing, not customers.") },
        feasibility: { level: 1, reason: tt("Unreliable on phones; needs consent.") },
        risk: { level: 3, reason: tt("High: privacy and trust.") },
        time: { level: 2, reason: tt("Months.") },
        invest: { level: 1, reason: tt("Uncertain return; reputational risk.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Brewline weighs three measures on effect on users, feasibility, risk, time pressure and investment security · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A small pilot with a real task and clear measures teaches the most for the least; a showroom buys attention; eye-tracking buys risk. Weigh each measure on the same criteria, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["descale", "showroom", "eye"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Brewline · three measures for the app")}
          caption={tt("Three measures for Brewline (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "feasibility", label: tt("Feasibility") },
            { id: "risk", label: tt("Risk") },
            { id: "time", label: tt("Time pressure: fits the time") },
            { id: "invest", label: tt("Investment security") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · chasing trends or running a portfolio (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Brewline chasing headsets to look innovative, or running an innovation portfolio with gates")}
      left={tt("Chasing the trend")}
      right={tt("A decision architecture for the future")}
      rows={[
        [tt("The board sees a headset at a fair; a VR project starts."), tt("A guiding vision: immersive help where it beats a classic interface for a real task.")],
        [tt("Each unit runs its own demo with its own budget."), tt("One portfolio: watch, pilot, scale; one evaluation grid for every idea.")],
        [tt("Demos end in the lab; nobody measures anything."), tt("Every pilot has success measures and a date to scale, change or stop.")],
        [tt("The next trend replaces the last one."), tt("What works grows; what does not is stopped, and that counts as a good decision.")],
      ]}
      caption={tt("At senior level, future technologies are managed as investments in user value, not as signals of being modern.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of an innovation architecture, from a guiding vision to every pilot")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“Immersive help at the machine, where it beats the manual; never only to look modern.”"), kind: "m" },
        { h: tt("Principles and grid"), b: tt("Value, maturity, effort, scaling, responsibility: every idea scored the same way."), kind: "a" },
        { h: tt("Portfolio and gates"), b: tt("Watch, pilot, scale; measures before the start; a date to decide."), kind: "a" },
        { h: tt("Every pilot"), b: tt("The AR descaling guide, the counter preview, later perhaps the barista course."), kind: "s" },
      ]}
      caption={tt("Leaders decide on the left: the vision, the grid and the gates. Teams build pilots on the right and bring back evidence.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · three bets (interactive) */

export function BetsFig() {
  const box = (title: string, body: string, who: string) => (
    <div role="img" aria-label={`${title}. ${body}. ${who}`} className="mx-auto max-w-[360px] space-y-2 rounded-lg border border-line bg-white p-3 text-caption text-ink">
      <p className="font-semibold">{title}</p>
      <p>{body}</p>
      <p className="text-ash">{who}</p>
    </div>
  );
  return (
    <StateFig
      label={tt("Brewline's three bets: safe, medium and bold · Exploratory · Case assumption")}
      point={tt("Innovation, user value, maturity, investment risk, ethics and feasibility pull apart. A portfolio holds a few bets of different size, each with a reason, measures set in advance and a date to decide, and a written list of what each bet assumes.")}
      states={[
        { id: "safe", button: tt("Safe: AR descaling"), picture: box(tt("A safe bet"), tt("Phone AR for one frequent task. Mature, cheap, measurable. Assumes: customers descale and will open the app to do it."), tt("Service and finance like it; marketing finds it too modest.")), insight: tt("In plain words: little visibility, much learning. If the assumption fails, little is lost.") },
        { id: "medium", button: tt("Medium: VR barista course"), picture: box(tt("A medium bet"), tt("A short VR course for café staff, piloted with one chain. Assumes: staff accept headsets and learn faster than with a trainer."), tt("Training wants it; safety asks about motion sickness.")), insight: tt("In plain words: real value possible, maturity uncertain. A small, time-boxed pilot with a stop date fits.") },
        { id: "bold", button: tt("Bold: a mixed-reality café"), picture: box(tt("A bold bet"), tt("A full mixed-reality experience in flagship cafés. Assumes: customers want it, devices are ready, it pays off."), tt("The board loves it; nobody can name the user problem.")), insight: tt("In plain words: maximum visibility, maximum risk, many untested assumptions. A portfolio might keep it on the watch list, not in the budget.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Brewline (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Brewline")}
      boxes={[
        [tt("What we decide"), tt("We pilot the AR descaling guide with fifty customers for eight weeks; no VR showroom at the fair this year.")],
        [tt("What we do not know"), tt("Whether customers will open the app to descale, and how it works in real kitchens.")],
        [tt("When we would reverse it"), tt("We stop if few customers use it twice or support calls do not fall; we scale if both happen.")],
        [tt("What we give up"), tt("A headline at the fair, and the board's wish to look innovative this spring.")],
      ]}
      rule={[
        [tt("Who owns innovation"), tt("The head of UX owns the portfolio and the grid; an innovation board decides at each gate; product safety may stop any pilot.")],
        [tt("How a conflict is decided"), tt("Safety first, then proven user value, then effort, then visibility; the board settles a tie.")],
      ]}
      caption={tt("A pilot that is stopped with evidence is a good decision. A demo that is never measured is the expensive one.")}
    />
  );
}
