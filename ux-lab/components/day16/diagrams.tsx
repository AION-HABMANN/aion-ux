"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { Corridor, MeasureThumb } from "@/components/day16/mocks";
import { StateFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the teaching diagrams of Materi A and B. Example: Fernwood, a made-up hotel chain, with Leila and Sam (guests), Rafael (UX lead) and Greta (product
 * owner); never RealityFlow, FutureInteraction Hub or NextWorld UX, so no task is answered here. Ideas from the original Day 16 kept here: the ladder with a gate
 * at each rung (A1), the test bench's stress test and six aspects (A2), the portfolio board (A4), the tension sliders (B2), the go/no-go decision (B3).
 */

/* ------------------------------------------------------------------ A1 · the gates of the ladder (the working ladder is components/day16/ladderLab.tsx) */

export function GatesFig() {
  return (
    <ChainFig
      label={tt("The gates between the rungs, and what each must answer")}
      steps={[
        { h: tt("Concept → prototype"), b: tt("Which question will the prototype answer, and for whom?"), kind: "m" },
        { h: tt("Prototype → pilot"), b: tt("Did it answer the question? Is it robust enough for real users? Are consent and data settled?"), kind: "a" },
        { h: tt("Pilot → scale"), b: tt("Does it work in real use, for all kinds of users, and can the organisation run it?"), kind: "a" },
        { h: tt("Scaled → keep or switch off"), b: tt("Is it still used and still worth its upkeep?"), kind: "s" },
      ]}
      caption={tt("A gate is a decision with criteria set in advance: go on, change, pause or stop. Without gates, every rung is climbed by enthusiasm.")}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the stress test (interactive) */

export function StressTestFig() {
  const [crowd, setCrowd] = useState(false);
  const [signal, setSignal] = useState<0 | 1 | 2>(2);
  const [dim, setDim] = useState(false);
  const id = useId();
  const notes: string[] = [];
  if (crowd) notes.push(tt("Orientation: the crowd hides the floor the arrow is drawn on; guests look at people, not at the screen."));
  if (signal === 1) notes.push(tt("Error robustness: with a weak signal the arrow drifts and fades. A guest may follow it into the wrong door."));
  if (signal === 0) notes.push(tt("Error robustness: the arrow is gone. Is there a fallback, such as signs or a text route, or is the guest stuck?"));
  if (dim) notes.push(tt("Transfer: the night lighting of the corridor was never tested; tracking needs light, and the room numbers are hard to read."));
  return (
    <Diagram label={tt("Fernwood's AR arrow under a stress test: crowd, signal and light · Exploratory · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A prototype that works in a quiet, bright corridor tells you little about a busy Friday night. Test it under stress on purpose: crowds, a weak signal, dim light. What breaks is what you test next.")}</ThePoint>
        <div className="flex flex-wrap items-center gap-2 text-caption">
          <button type="button" aria-pressed={crowd} onClick={() => setCrowd((v) => !v)} className={clsx("min-h-[36px] rounded border px-2.5 font-semibold", crowd ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-line bg-white text-ink")}>{tt("A crowd in the corridor")}</button>
          <button type="button" aria-pressed={dim} onClick={() => setDim((v) => !v)} className={clsx("min-h-[36px] rounded border px-2.5 font-semibold", dim ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-line bg-white text-ink")}>{tt("Night lighting")}</button>
          <label htmlFor={id} className="font-semibold text-ink">{tt("Signal")}</label>
          <select id={id} value={signal} onChange={(e) => setSignal(Number(e.target.value) as 0 | 1 | 2)} className="min-h-[36px] rounded border border-line bg-white px-2 text-ink">
            <option value={2}>{tt("good")}</option>
            <option value={1}>{tt("weak")}</option>
            <option value={0}>{tt("lost")}</option>
          </select>
        </div>
        <Corridor crowd={crowd} signal={signal} dim={dim} label={tt(`The corridor with the AR arrow${crowd ? ", a crowd" : ""}${dim ? ", night lighting" : ""}, signal ${signal === 2 ? "good" : signal === 1 ? "weak" : "lost"}`)} />
        <Insight>{notes.length ? notes.join(" ") : tt("In the quiet, bright corridor the arrow sits on the floor and points to room 216. This is the demo condition. Switch on a stress and watch what happens.")}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · feasible or responsible (static) and seven ethical questions */

export function FeasibleFig() {
  return (
    <CompareFig
      label={tt("Fernwood asking “can we build it?” or “should we, and how?”")}
      left={tt("Feasibility thinking")}
      right={tt("A responsible UX strategy")}
      rows={[
        [tt("“The lobby camera can read guests' moods. Let's use it.”"), tt("“What would guests gain, would they agree, and could it be misused?”")],
        [tt("The demo works on the newest phone."), tt("It works for guests with old phones, poor sight or no app, or there is another way.")],
        [tt("Data is collected because it can be."), tt("Only what the purpose needs, explained, and deleted.")],
        [tt("Launch, then fix complaints."), tt("Ethical questions answered at the concept stage, when they are cheap.")],
      ]}
      caption={tt("Feasibility is a necessary question, never a sufficient one.")}
    />
  );
}

export function EthicsGridFig() {
  const qs = [tt("Data protection"), tt("Voluntariness"), tt("Manipulation"), tt("Overload"), tt("Transparency"), tt("Accessibility"), tt("Inclusion")];
  const rows: [string, string[]][] = [
    [tt("AR wayfinding"), [tt("Camera image stays on the phone."), tt("Signs and staff remain."), tt("None, unless offers are added to the route."), tt("One arrow at a time."), tt("Says what the camera does."), tt("Hard for low vision; add audio."), tt("Guests without the app need signs.")]],
    [tt("VR housekeeping course"), [tt("Head and hand movements."), tt("Staff may feel they cannot refuse."), tt("None."), tt("Motion sickness in long sessions."), tt("Say what is recorded."), tt("Not for everyone with a headset."), tt("A non-VR course must exist.")]],
    [tt("Mood-reading lobby screens"), [tt("Faces and inferred emotions."), tt("Guests are never asked."), tt("Offers aimed at moods."), tt("None."), tt("Invisible to guests."), tt("Not relevant."), tt("Misreads some faces more than others.")]],
  ];
  return (
    <Diagram label={tt("Seven ethical questions asked of three Fernwood ideas · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("New interaction and neurotechnologies raise seven ethical questions. Ask all seven of every idea at the concept stage; the answers show which idea needs work, and which should not be built.")}</ThePoint>
        <div tabIndex={0} role="region" aria-label={tt("The ethics grid; scroll sideways on a small screen")} className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-caption">
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

/* ------------------------------------------------------------------ A4 · the portfolio board (interactive) and the future architecture */

type Init = { id: string; name: string; move: "scale" | "test" | "pause" | "stop"; resp: boolean; conn: boolean; gov: boolean; why: string };
export function PortfolioFig() {
  const items: Init[] = [
    { id: "way", name: tt("AR wayfinding"), move: "test", resp: true, conn: true, gov: true, why: tt("Responsible, fits the app, and has an owner. The pilot worked in one hotel; transfer to night arrivals is untested. Test further in two hotels, then decide.") },
    { id: "vr", name: tt("VR housekeeping course"), move: "scale", resp: true, conn: true, gov: true, why: tt("Proven in two hotels: fewer room-check errors, a non-VR option exists, the training team owns it. Scale to more hotels.") },
    { id: "mini", name: tt("AR minibar menu"), move: "pause", resp: true, conn: false, gov: false, why: tt("Harmless, but it needs a separate app module nobody maintains, and guests opened it once. Pause; revisit if the app is rebuilt.") },
    { id: "chat", name: tt("AI concierge chat"), move: "test", resp: false, conn: true, gov: true, why: tt("Used often, but it does not say it is an AI. Make it transparent, then test again.") },
    { id: "mood", name: tt("Mood-reading lobby screens"), move: "stop", resp: false, conn: true, gov: false, why: tt("Reads guests' faces without asking, for offers. Not responsible, whatever it could earn. Stop.") },
  ];
  const [sel, setSel] = useState("way");
  const cur = items.find((x) => x.id === sel)!;
  const cols: [Init["move"], string][] = [
    ["scale", tt("Scale")],
    ["test", tt("Test further")],
    ["pause", tt("Pause")],
    ["stop", tt("Stop")],
  ];
  const mark = (ok: boolean) => (ok ? tt("yes") : tt("not yet"));
  return (
    <Diagram label={tt("Fernwood's five initiatives on a portfolio board · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A technology must be responsible, connectable and governable, not only new. A portfolio makes four moves: scale what has proven itself, test further what is promising, pause what cannot be supported yet, and stop what should not exist.")}</ThePoint>
        <div className="grid gap-2 sm:grid-cols-4">
          {cols.map(([k, h]) => (
            <div key={k} className={clsx("rounded-lg border p-2", k === "stop" ? "border-[#E8A1A1] bg-[#FDF2F2]" : k === "scale" ? "border-[#7CC48D] bg-[#F2FAF4]" : "border-line bg-paper")}>
              <p className="mb-1 text-caption font-semibold text-ink">{h}</p>
              {items.filter((x) => x.move === k).map((x) => (
                <button key={x.id} type="button" aria-pressed={sel === x.id} onClick={() => setSel(x.id)} className={clsx("mb-1 block w-full rounded border px-1.5 py-1 text-left text-[12px]", sel === x.id ? "border-accent bg-accentSoft font-semibold" : "border-line bg-white")}>{x.name}</button>
              ))}
            </div>
          ))}
        </div>
        <Insight>{tt(`${cur.name} · responsible: ${mark(cur.resp)} · connectable: ${mark(cur.conn)} · governable: ${mark(cur.gov)}. ${cur.why}`)}</Insight>
      </div>
    </Diagram>
  );
}

export function FutureChainFig() {
  return (
    <ChainFig
      label={tt("How a steerable future architecture grows out of experiments, pilots and research")}
      steps={[
        { h: tt("Experiments and research"), b: tt("Many small tries, each with a question."), kind: "m" },
        { h: tt("Pilots"), b: tt("The few that answered well, in real use."), kind: "a" },
        { h: tt("Comparable evidence"), b: tt("Every pilot judged on the same grid."), kind: "a" },
        { h: tt("Portfolio decisions"), b: tt("Scale, test further, pause, stop; reviewed every quarter."), kind: "a" },
        { h: tt("A future architecture"), b: tt("An organisation that learns how to decide, not only what to build."), kind: "s" },
      ]}
      caption={tt("Innovation maturity and organisational learning grow together: a company that decides well can afford bolder bets.")}
    />
  );
}

/* ------------------------------------------------------------------ A5 · when not to scale (interactive checklist) and three measures weighed */

export function NotScaleFig() {
  const signs = [
    tt("It impresses, but people rarely use it a second time"),
    tt("It works only for some users"),
    tt("It has not been tested in real use"),
    tt("Its ethical and data questions are not settled"),
    tt("The organisation cannot support or maintain it"),
    tt("It does not fit the strategy"),
  ];
  const [on, setOn] = useState<boolean[]>(signs.map(() => false));
  const n = on.filter(Boolean).length;
  return (
    <Diagram label={tt("Six signs that Fernwood should not scale yet, tried on the AR minibar menu · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Not scaling can be the better leadership decision. Try the six signs on Fernwood's AR minibar menu: guests opened it once, it needs a module nobody maintains, and it was never tested in a real stay. Tick the signs you think apply.")}</ThePoint>
        <fieldset className="space-y-1 text-caption text-ink">
          <legend className="sr-only">{tt("Signs that apply to the AR minibar menu")}</legend>
          {signs.map((s, i) => (
            <label key={i} className="flex min-h-[36px] cursor-pointer items-center gap-2 rounded border border-line bg-paper px-2">
              <input type="checkbox" checked={on[i]} onChange={() => setOn((a) => a.map((v, j) => (j === i ? !v : v)))} />
              {s}
            </label>
          ))}
        </fieldset>
        <Insight>{n === 0 ? tt("Tick the signs that apply. There is no score: the signs are reasons to discuss, not a formula.") : tt(`You see ${n} of 6 signs. Each one is a reason to pause or to test further before scaling; even one, such as unsettled ethics, can be enough. What would have to change for each sign to disappear?`)}</Insight>
      </div>
    </Diagram>
  );
}

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "test",
      name: tt("Transfer test of AR wayfinding in two hotels"),
      cells: {
        effect: { level: 3, reason: tt("Shows whether guests really find their rooms at night.") },
        feasibility: { level: 3, reason: tt("Two hotels, the existing app, a few weeks.") },
        risk: { level: 1, reason: tt("Low: signs and staff remain.") },
        time: { level: 3, reason: tt("Results within a season.") },
        strategy: { level: 3, reason: tt("Decides the largest line with evidence.") },
      },
    },
    {
      id: "all",
      name: tt("Roll the AR minibar menu out to all 40 hotels"),
      cells: {
        effect: { level: 1, reason: tt("Guests opened it once.") },
        feasibility: { level: 2, reason: tt("Possible, but nobody maintains the module.") },
        risk: { level: 2, reason: tt("Wasted spend; a feature that breaks.") },
        time: { level: 2, reason: tt("Months.") },
        strategy: { level: 1, reason: tt("Does not serve the vision of finding your way.") },
      },
    },
    {
      id: "pause",
      name: tt("Pause the mood-reading lobby screens"),
      cells: {
        effect: { level: 2, reason: tt("Protects guests from being read without asking.") },
        feasibility: { level: 3, reason: tt("Switch them off.") },
        risk: { level: 1, reason: tt("Low; removes a reputation risk.") },
        time: { level: 3, reason: tt("Immediately.") },
        strategy: { level: 3, reason: tt("Shows the vision is meant.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Fernwood weighs three measures on effect on users, feasibility, risk, time pressure and strategic viability · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A focused test that decides the biggest line teaches the most; a broad rollout of a weak feature spends the most; pausing a harmful idea costs little and protects much. Weigh each measure on the same criteria, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["test", "all", "pause"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Fernwood · three portfolio measures")}
          caption={tt("Three measures for Fernwood (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "feasibility", label: tt("Feasibility") },
            { id: "risk", label: tt("Risk") },
            { id: "time", label: tt("Time pressure: fits the time") },
            { id: "strategy", label: tt("Strategic viability") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · collecting experiments or a future architecture (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Fernwood collecting experiments, or running a steerable future architecture")}
      left={tt("A collection of experiments")}
      right={tt("A steerable future architecture")}
      rows={[
        [tt("Every team starts its own pilot with a sponsor."), tt("A guiding vision: innovation that makes guests' and staff's tasks easier, responsibly.")],
        [tt("Each reports in its own way: quotes, counts, pictures."), tt("One evaluation grid, comparable tests, transfer to real use included.")],
        [tt("Ethics is handled if someone asks."), tt("An ethics gate before every pilot and every step to scale.")],
        [tt("Nothing is ever stopped."), tt("A quarterly portfolio review: scale, test further, pause, stop.")],
      ]}
      caption={tt("Experiments become a future only when each one ends in a decision.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of a responsible innovation architecture, from a guiding vision to every pilot")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“We innovate where it helps guests and staff, and scale only what is proven and fair.”"), kind: "m" },
        { h: tt("Grid and gates"), b: tt("Value, maturity, risk, economics, responsibility; a gate at every rung."), kind: "a" },
        { h: tt("A focused portfolio"), b: tt("At most three active lines; the rest watched; reviewed quarterly."), kind: "a" },
        { h: tt("Every pilot"), b: tt("AR wayfinding, the VR course, the AI concierge."), kind: "s" },
      ]}
      caption={tt("Leaders decide on the left: the vision, the grid and the gates. Teams run pilots on the right and bring back comparable evidence.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · how many lines at once (interactive slider) */

export function TensionFig() {
  const [n, setN] = useState(3);
  const id = useId();
  const read = [
    tt("One line: maximum focus and learning on it, little to show, and if it fails, nothing is left. Innovation pressure is ignored."),
    tt("Two lines: a safe one and a bolder one. Strong learning, modest visibility; the management may find it slow."),
    tt("Three lines: a balance most portfolios aim for. Each gets enough people to test properly; visibility is real but not loud."),
    tt("Four lines: visibility grows, but testing gets thinner; ethics reviews start to queue; IT runs four platforms."),
    tt("Five lines: every stakeholder gets a project. Little is tested well, nothing is stopped, and the budget is spread thin. Maximum visibility, minimum learning."),
  ][n - 1];
  return (
    <Diagram label={tt("How many lines Fernwood runs at once, and what is gained and lost · Exploratory · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Innovation pressure, ethics, economics, user value, maturity and the long-term portfolio pull apart. The number of active lines is where the conflict becomes a decision.")}</ThePoint>
        <div className="space-y-1">
          <label htmlFor={id} className="text-caption font-semibold text-ink">{tt(`Active lines of innovation: ${n}`)}</label>
          <input id={id} type="range" min={1} max={5} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-[#1750A8]" aria-valuetext={tt(`${n} lines`)} />
        </div>
        <div className="grid grid-cols-5 gap-1" aria-hidden>
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className={clsx("h-3 rounded", i <= n ? "bg-[#F59E0B]" : "bg-mist")} />)}
        </div>
        <Insight>{read}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision with incomplete data, filled in for Fernwood (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Fernwood")}
      boxes={[
        [tt("What we decide"), tt("We scale the VR housekeeping course to three more hotels, test AR wayfinding further in two, pause the AR minibar and stop the mood-reading screens.")],
        [tt("What we do not know"), tt("Whether AR wayfinding works for night arrivals and older guests, and whether the VR course's effect lasts.")],
        [tt("When we would reverse it"), tt("We stop the VR rollout if room-check errors do not fall in the new hotels; we scale AR wayfinding if guests find their rooms without staff at night.")],
        [tt("What we give up"), tt("An AR headline at the spring trade fair, and two teams' favourite projects.")],
      ]}
      rule={[
        [tt("Who decides"), tt("The head of guest experience owns the grid; an ethics review approves and may stop; an innovation board decides at each gate and reviews the portfolio every quarter.")],
        [tt("How a conflict is decided"), tt("Guests' and staff's rights and safety first, then proven value, then cost, then visibility; the management settles what that does not.")],
      ]}
      caption={tt("Stopping an innovation with a reason is a leadership decision. Scaling one without evidence is a bet with other people's trust.")}
    />
  );
}
