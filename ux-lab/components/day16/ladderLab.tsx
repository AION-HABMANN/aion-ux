"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Corridor } from "@/components/day16/mocks";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * Day 16 · card A1 · the ladder as a working product (UX-STANDARD 2.16, model: the original Day 16's Ladder with CityPass AR). One made-up product, Fernwood's
 * "Find your room" AR wayfinding, is built four times: a concept slide, a clickable prototype, a pilot app with a live session log and a consent step, and a
 * scaled service across the chain. The task never changes, so maturity is the only variable. A gate rail beside each stage switches the stage's gates; a gate
 * that is not met visibly damages the product. Six stress tests change what each stage does. Every number is a Case assumption of the example company; nothing
 * is marked right or wrong, and nothing is stored.
 */
type Stage = "concept" | "prototype" | "pilot" | "scale";
type Stress = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";
type Gate = { id: string; name: string; off: string };

const STAGES = (): [Stage, string, string][] => [
  ["concept", tt("Concept idea"), tt("A slide")],
  ["prototype", tt("Prototype"), tt("A clickable build")],
  ["pilot", tt("Pilot"), tt("One hotel, real guests")],
  ["scale", tt("Scalable solution"), tt("The whole chain")],
];

const GATES = (): Record<Stage, Gate[]> => ({
  concept: [
    { id: "c1", name: tt("Guest and situation named"), off: tt("The “For” line now says “every guest”. Nobody could be left out by it, so it names nobody.") },
    { id: "c2", name: tt("Value in the guest's own terms"), off: tt("The value line now speaks of Fernwood's image. The claims below stay just as confident.") },
    { id: "c3", name: tt("Riskiest assumption written down"), off: tt("The “What we do not know yet” box is gone. The slide reads better, and the uncertainty is now invisible.") },
  ],
  prototype: [
    { id: "p1", name: tt("One question written"), off: tt("The test card has no question. Whatever happens in the sessions, nobody can say what it proved.") },
    { id: "p2", name: tt("Testers like the guests"), off: tt("The five testers are now marketing colleagues who know the building.") },
    { id: "p3", name: tt("Task and measure set"), off: tt("No timer and no “asked staff” count. Sessions produce impressions, not results.") },
    { id: "p4", name: tt("A failure path exists"), off: tt("When tracking is lost, the screen goes blank. The guest is stuck.") },
  ],
  pilot: [
    { id: "g1", name: tt("Representative guests"), off: tt("The session log now shows only staff and invited regulars. Late arrivals and older guests are missing.") },
    { id: "g2", name: tt("Scope stated"), off: tt("The scope line in the footer is gone. Results from one wing at night will be read as true for every hotel.") },
    { id: "g3", name: tt("Saying no has a working alternative"), off: tt("The consent screen loses its “No” button. Taking part is no longer voluntary.") },
    { id: "g4", name: tt("Data protection settled before start"), off: tt("The recording banner now says the camera stream is uploaded for analysis. Nobody agreed to that.") },
    { id: "g5", name: tt("A comparison group"), off: tt("The dashboard loses the signs-only column. Nobody can say whether the app is better than the signs.") },
    { id: "g6", name: tt("Night arrivals included"), off: tt("Sessions only run between 10:00 and 16:00. The situation the idea was for is never tested.") },
  ],
  scale: [
    { id: "s1", name: tt("An owner for maps and upkeep"), off: tt("Seven hotels show “map outdated” after renovations. Nobody is asked to fix them.") },
    { id: "s2", name: tt("Works in the guests' languages"), off: tt("The language switch disappears. Every guest gets English.") },
    { id: "s3", name: tt("An accessible alternative"), off: tt("Audio directions and printed maps are removed. Guests who cannot use the camera have nothing.") },
    { id: "s4", name: tt("Governance and a switch-off rule"), off: tt("The governance panel is empty. Nobody may switch it off in a hotel where it fails.") },
  ],
});

const STRESS = (): [Stress, string][] => [
  ["S1", tt("A colour-blind guest uses it")],
  ["S2", tt("The signal drops in the lift lobby")],
  ["S3", tt("A guest says no to the camera")],
  ["S4", tt("A guest who only reads Spanish")],
  ["S5", tt("A coach of 60 guests arrives")],
  ["S6", tt("Legal asks who owns it and when it stops")],
];

/** What a stress test does at a stage that has nothing to show for it. */
const ABSENT = (stage: Stage, s: Stress): string | null => {
  if (stage === "concept") return { S1: tt("There is no screen yet, only a slide. Nothing can be checked for colour."), S2: tt("There is no software that could lose a signal."), S3: tt("There is no data collection to decline, because there is no data collection."), S4: tt("The product has no words yet, only words on a slide."), S5: tt("One guest cannot use it either: it does not exist."), S6: tt("Nobody owns a slide. The question is asked too early, or too late.") }[s];
  if (stage === "prototype") return { S1: null, S2: null, S3: tt("There is no consent step in this build. Saying no is not an available action."), S4: tt("Every text is hard-coded English. There is no language switch to try."), S5: tt("The prototype runs on one test phone. The second guest waits."), S6: tt("There is no owner and no rule. It is a prototype; that is only a problem if it is presented as a product.") }[s];
  if (stage === "pilot") return { S1: null, S2: null, S3: null, S4: tt("“Lo sentimos”: the pilot build is English only. The guest is sent to reception."), S5: tt("The pilot was sized for 40 guests over six weeks. With 60 at once, sessions queue and the log falls behind."), S6: tt("The pilot has a project lead, but no rule for when it stops after the six weeks.") }[s];
  return null;
};

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={onClick} className="flex w-full items-start gap-2 rounded border border-line bg-white px-2 py-1.5 text-left text-[12.5px] text-ink">
      <span aria-hidden className={clsx("mt-0.5 inline-flex h-4 w-7 shrink-0 items-center rounded-full p-0.5", on ? "bg-[#4F46E5]" : "bg-[#CBD5E1]")}>
        <span className={clsx("h-3 w-3 rounded-full bg-white motion-safe:transition-transform", on && "translate-x-3")} />
      </span>
      <span className="flex-1">{children}</span>
      <span className={clsx("shrink-0 rounded px-1.5 text-[10.5px] font-bold", on ? "bg-[#DCFCE7] text-[#14532D]" : "bg-[#FEE2E2] text-[#991B1B]")}>{on ? tt("MET") : tt("NOT MET")}</span>
    </button>
  );
}

/** The phone the prototype, pilot and scale stages run in. */
function Phone({ title, status, rec, children }: { title: string; status?: string; rec?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[26px] border-[6px] border-[#1F2730] bg-white shadow-md">
      <div className="flex items-center justify-between bg-[#1F1B3A] px-4 pt-1.5 text-[10px] font-semibold text-white">
        <span>23:10</span>
        <span aria-hidden>▂▄▆ ◔</span>
      </div>
      <div className="flex items-center justify-between bg-[#1F1B3A] px-3 pb-2 pt-1 text-white">
        <span className="text-[12.5px] font-bold">{title}</span>
        {status && <span className="rounded bg-white/15 px-1.5 text-[10px]">{status}</span>}
      </div>
      {rec}
      <div className="space-y-2 p-3 text-[12px] leading-snug text-[#1D2733]">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ stage 1 · the concept slide */

function ConceptSlide({ g, onPresent }: { g: Record<string, boolean>; onPresent: () => void }) {
  return (
    <div className="space-y-2 rounded-lg border border-line bg-white p-4 text-[13px] text-[#1D2733] shadow-sm">
      <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#7C2D12]">{tt("Innovation board · slide 4 of 9")}</p>
      <p className="text-[18px] font-bold">{tt("Find your room: AR arrows from lift to door")}</p>
      <p><b>{tt("For")}:</b> {g.c1 ? tt("a guest arriving after 22:00 at Fernwood Harbour, tired, with luggage in one hand, looking for a room in the new wing on their own phone.") : tt("every guest.")}</p>
      <p><b>{tt("Value")}:</b> {g.c2 ? tt("finds the room without walking the wrong corridor or calling reception; no searching for room numbers in dim light.") : tt("positions Fernwood as the most innovative hotel brand in the region.")}</p>
      <ul className="list-disc space-y-0.5 pl-5">
        <li>{tt("Works on any modern phone")}</li>
        <li>{tt("No new hardware in the hotel")}</li>
        <li>{tt("Ready for all 40 hotels next year")}</li>
      </ul>
      {g.c3 && (
        <div className="rounded border border-[#FCD34D] bg-[#FFFBEB] px-2 py-1.5">
          <b>{tt("What we do not know yet")}:</b> {tt("whether tired guests will hold up a phone while carrying luggage. If they will not, nothing else on this slide matters.")}
        </div>
      )}
      <button type="button" onClick={onPresent} className="min-h-[36px] rounded border border-[#7C2D12] px-3 text-[12.5px] font-semibold text-[#7C2D12]">{tt("Present to the board")}</button>
    </div>
  );
}

/* ------------------------------------------------------------------ stage 2 · the clickable prototype */

function Prototype({ g, stress, onLog }: { g: Record<string, boolean>; stress: Stress | null; onLog: (s: string) => void }) {
  const [screen, setScreen] = useState<"A" | "B" | "C" | "dead">("A");
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(false);
  const [asked, setAsked] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  useEffect(() => {
    if (stress === "S2" && screen === "B") setScreen(g.p4 ? "B" : "dead");
  }, [stress, screen, g.p4]);
  const lost = stress === "S2" && screen === "B";
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px]">
      <div style={{ filter: stress === "S1" ? "url(#d16-cvd)" : undefined }}>
        <Phone title={tt("Find your room · proto v0.3")} status={tt("test phone")}>
          <div className="rounded bg-[#F1F5F9] px-2 py-1 text-[10.5px] text-[#475569]">{tt("Grey wireframe · fixed data · one route built")}</div>
          {screen === "A" && (
            <>
              <p className="font-semibold">{tt("Where do you want to go?")}</p>
              {[tt("Room 216"), tt("Breakfast room"), tt("Spa"), tt("Car park P2")].map((d, i) => (
                <button key={d} type="button" onClick={() => {
                  if (i === 0) { setScreen("B"); setRunning(true); onLog(tt("Session started: Room 216")); }
                  else onLog(tt(`Deviation: “${d}” is not built in the prototype`));
                }} className="block w-full rounded border border-[#CBD5E1] bg-[#F8FAFC] px-2 py-1.5 text-left">{d}</button>
              ))}
            </>
          )}
          {screen === "B" && (
            <>
              <Corridor signal={lost ? 0 : 2} label={tt("The prototype's camera view of the corridor with an arrow to room 216")} />
              {lost && g.p4 && <p className="rounded bg-[#FEF3C7] px-2 py-1">{tt("Tracking lost. Text route: turn left out of the lift, room 216 is the fourth door on the right.")}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={() => { setAsked((a) => a + 1); onLog(tt("Tester asked staff")); }} className="flex-1 rounded border border-[#CBD5E1] px-2 py-1">{tt("Ask staff")}</button>
                <button type="button" onClick={() => { setScreen("C"); setRunning(false); onLog(tt(`Arrived at 216 after ${secs} s`)); }} className="flex-1 rounded bg-[#334155] px-2 py-1 font-semibold text-white">{tt("I'm at the door")}</button>
              </div>
            </>
          )}
          {screen === "C" && (
            <>
              <p className="text-[14px] font-bold">{tt("You have arrived: 216")}</p>
              <button type="button" onClick={() => { setScreen("A"); setSecs(0); }} className="w-full rounded border border-[#CBD5E1] px-2 py-1">{tt("Next tester")}</button>
            </>
          )}
          {screen === "dead" && <div className="flex h-40 items-center justify-center rounded bg-[#0F172A] text-[11px] text-[#64748B]">{tt("(blank screen)")}</div>}
        </Phone>
      </div>
      <div className="space-y-2 text-[12px] text-ink">
        <div className="rounded border border-line bg-white p-2">
          <p className="font-semibold">{tt("Test card")}</p>
          <p>{g.p1 ? tt("Question: can a guest find room 216 from the lift with the arrow alone?") : tt("Question: (none written)")}</p>
          <p className="mt-1">{g.p2 ? tt("Testers: 5 guests who have never stayed in the new wing, two over 65.") : tt("Testers: 5 marketing colleagues.")}</p>
        </div>
        {g.p3 ? (
          <div className="rounded border border-line bg-white p-2">
            <p className="font-semibold">{tt("Measures")}</p>
            <p>{tt(`Time: ${secs} s`)}</p>
            <p>{tt(`Asked staff: ${asked}`)}</p>
          </div>
        ) : (
          <div className="rounded border border-dashed border-line p-2 text-ash">{tt("No measures set.")}</div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ stage 3 · the pilot app */

type Dest = { id: string; name: string; walk: string; beats: string[] };
const DESTS = (): Dest[] => [
  { id: "216", name: tt("Room 216"), walk: tt("85 m · 2 turns · lift to 2nd floor"), beats: [tt("Lift lobby, ground floor: take the lift to floor 2."), tt("Floor 2: turn left out of the lift."), tt("Corridor B: follow the arrow past 210 to 214."), tt("Room 216 is on your right.")] },
  { id: "bf", name: tt("Breakfast room"), walk: tt("40 m · 1 turn · level access"), beats: [tt("Reception: walk past the bar."), tt("Turn right at the garden doors."), tt("The breakfast room is ahead.")] },
  { id: "spa", name: tt("Spa"), walk: tt("120 m · 3 turns · one flight of stairs"), beats: [tt("Lift lobby: take the stairs down one floor."), tt("Lower ground: follow the arrow to the left."), tt("Pass the pool windows."), tt("The spa desk is at the end.")] },
  { id: "p2", name: tt("Car park P2"), walk: tt("150 m · 2 turns · lift to level -2"), beats: [tt("Lift lobby: take the lift to level -2."), tt("Exit left through the fire door."), tt("Your bay is in row C.")] },
];

function Pilot({ g, stress, onLog }: { g: Record<string, boolean>; stress: Stress | null; onLog: (s: string) => void }) {
  const [consent, setConsent] = useState<"ask" | "yes" | "no">("ask");
  const [dest, setDest] = useState<Dest | null>(null);
  const [beat, setBeat] = useState(0);
  const [c, setC] = useState({ sessions: 0, done: 0, staff: 0, declined: 0, lost: 0, signsDone: 0 });
  const [guest, setGuest] = useState(12);
  useEffect(() => {
    if (stress === "S3") { setConsent("ask"); setDest(null); }
  }, [stress]);
  useEffect(() => {
    if (!g.g3 && consent === "no") setConsent("ask");
  }, [g.g3, consent]);
  const lost = stress === "S2" && dest !== null && beat === 0;
  useEffect(() => {
    if (lost) setC((x) => ({ ...x, lost: x.lost + 1 }));
  }, [lost]);
  const rec = (
    <div className={clsx("px-3 py-1 text-[10.5px] text-white", g.g4 ? "bg-[#7F1D1D]" : "bg-[#B91C1C]")}>
      {g.g4
        ? tt(`● REC · session log on · Guest ${guest} of 40 · camera image stays on the phone`)
        : tt(`● REC · Guest ${guest} of 40 · camera stream uploaded for analysis`)}
      <br />
      {lost ? tt("Tracking: lost") : tt("Tracking: strong")}
    </div>
  );
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
      <div className="relative" style={{ filter: stress === "S1" ? "url(#d16-cvd)" : undefined }}>
        <Phone title={tt("Fernwood · Find your room")} status={tt("pilot 1.2.0")} rec={rec}>
          {consent === "ask" && (
            <div className="space-y-2 rounded border border-line bg-[#F8FAFC] p-2">
              <p className="font-semibold">{tt("Before you start")}</p>
              <p>{tt("This pilot uses your camera to place arrows in the corridor. We log which route you chose, how long it took and whether you asked staff.")}</p>
              {g.g4 ? <p>{tt("The camera image stays on your phone. The log is deleted after the pilot.")}</p> : <p>{tt("Camera recordings are used to improve the service.")}</p>}
              <div className={clsx("grid gap-2", g.g3 ? "grid-cols-2" : "grid-cols-1")}>
                {g.g3 && <button type="button" onClick={() => { setConsent("no"); setC((x) => ({ ...x, declined: x.declined + 1 })); onLog(tt("Guest declined; printed map offered")); }} className="rounded border border-[#1F1B3A] px-2 py-1.5 font-semibold text-[#1F1B3A]">{tt("No, thanks")}</button>}
                <button type="button" onClick={() => { setConsent("yes"); onLog(tt("Consent given")); }} className="rounded bg-[#1F1B3A] px-2 py-1.5 font-semibold text-white">{tt("Agree and start")}</button>
              </div>
            </div>
          )}
          {consent === "no" && (
            <div className="space-y-2">
              <p className="font-semibold">{tt("Signage mode")}</p>
              <p className="rounded bg-[#F1F5F9] p-2">{tt("Text directions: take the lift to floor 2, turn left, room 216 is the fourth door on the right. A printed map is at reception.")}</p>
              <button type="button" onClick={() => { setC((x) => ({ ...x, signsDone: x.signsDone + 1 })); onLog(tt("Reached the room with the printed map")); }} className="w-full rounded border border-[#1F1B3A] px-2 py-1.5">{tt("I reached my room this way")}</button>
              <button type="button" onClick={() => setConsent("ask")} className="w-full rounded border border-line px-2 py-1.5">{tt("See the camera question again")}</button>
            </div>
          )}
          {consent === "yes" && !dest && (
            <>
              <p className="font-semibold">{tt("Where are you going?")}</p>
              {DESTS().map((d) => (
                <button key={d.id} type="button" onClick={() => { setDest(d); setBeat(0); setC((x) => ({ ...x, sessions: x.sessions + 1 })); onLog(tt(`Route started: ${d.name}`)); }} className="block w-full rounded border border-[#CBD5E1] px-2 py-1.5 text-left">
                  <span className="block font-semibold">{d.name}</span>
                  <span className="block text-[11px] text-[#475569]">{d.walk}</span>
                </button>
              ))}
              <p className="text-[10.5px] text-[#16A34A]">{tt("● Maps of Fernwood Harbour loaded · 4 routes built and checked on site")}</p>
            </>
          )}
          {consent === "yes" && dest && (
            <>
              <Corridor signal={lost ? 0 : 2} dim={g.g6} label={tt(`The pilot app's camera view on the way to ${dest.name}`)} />
              <p className="rounded bg-[#EEF2FF] px-2 py-1 font-semibold">{tt(`${beat + 1}/${dest.beats.length} · ${dest.beats[beat]}`)}</p>
              {lost && <p className="rounded bg-[#FEF3C7] px-2 py-1">{tt("Tracking lost in the lift lobby. Text route shown until the signal returns.")}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={() => { setC((x) => ({ ...x, staff: x.staff + 1 })); onLog(tt("Guest asked staff")); }} className="flex-1 rounded border border-[#CBD5E1] px-2 py-1">{tt("Call reception")}</button>
                {beat < dest.beats.length - 1 ? (
                  <button type="button" onClick={() => setBeat((b) => b + 1)} className="flex-1 rounded bg-[#1F1B3A] px-2 py-1 font-semibold text-white">{tt("Walk on")}</button>
                ) : (
                  <button type="button" onClick={() => { setC((x) => ({ ...x, done: x.done + 1 })); onLog(tt(`Arrived: ${dest.name}`)); setDest(null); setGuest((n) => Math.min(40, n + 1)); }} className="flex-1 rounded bg-[#16A34A] px-2 py-1 font-semibold text-white">{tt("I'm here")}</button>
                )}
              </div>
            </>
          )}
          {g.g2 && <p className="border-t border-line pt-1 text-[10px] text-[#64748B]">{tt("Scope: Fernwood Harbour only · new wing · 6 weeks · English · own phones")}</p>}
        </Phone>
      </div>
      <div className="space-y-2 text-[12px] text-ink">
        <div className="rounded border border-line bg-white p-2">
          <p className="font-semibold">{tt("Pilot dashboard (Case assumption)")}</p>
          <table className="mt-1 w-full text-[11.5px]">
            <caption className="sr-only">{tt("Pilot counters")}</caption>
            <thead><tr className="text-left text-ash"><th scope="col">{tt("Measure")}</th><th scope="col">{tt("App")}</th>{g.g5 && <th scope="col">{tt("Signs only")}</th>}</tr></thead>
            <tbody>
              <tr><th scope="row" className="text-left font-normal">{tt("Routes started")}</th><td>{c.sessions}</td>{g.g5 && <td>{c.declined}</td>}</tr>
              <tr><th scope="row" className="text-left font-normal">{tt("Arrived")}</th><td>{c.done}</td>{g.g5 && <td>{c.signsDone}</td>}</tr>
              <tr><th scope="row" className="text-left font-normal">{tt("Called reception")}</th><td>{c.staff}</td>{g.g5 && <td>–</td>}</tr>
              <tr><th scope="row" className="text-left font-normal">{tt("Tracking lost")}</th><td>{c.lost}</td>{g.g5 && <td>–</td>}</tr>
            </tbody>
          </table>
        </div>
        <div className="rounded border border-line bg-white p-2">
          <p className="font-semibold">{tt("Who is in the log")}</p>
          <p>{g.g1 ? tt("Late arrivals, families, two wheelchair users, guests over 65, first-time guests.") : tt("Staff and invited regulars.")}</p>
          <p className="mt-1">{g.g6 ? tt("Sessions: 07:00–01:00, night arrivals included.") : tt("Sessions: 10:00–16:00 only.")}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ stage 4 · the scaled service */

const HOTELS = () => [
  [tt("Harbour"), tt("live"), tt("mapped 03/26")],
  [tt("Old Town"), tt("live"), tt("mapped 02/26")],
  [tt("Airport"), tt("live"), tt("mapped 04/26")],
  [tt("Riverside"), tt("live"), tt("renovated 05/26")],
  [tt("Lakeside"), tt("live"), tt("mapped 01/26")],
  [tt("Central"), tt("paused"), tt("signal too weak in wing C")],
];

function Scale({ g, stress, onLog }: { g: Record<string, boolean>; stress: Stress | null; onLog: (s: string) => void }) {
  const [lang, setLang] = useState("EN");
  useEffect(() => {
    if (stress === "S4" && g.s2) setLang("ES");
  }, [stress, g.s2]);
  const text: Record<string, [string, string]> = {
    EN: [tt("Where are you going?"), tt("Room 216 · 85 m")],
    DE: ["Wohin möchten Sie?", "Zimmer 216 · 85 m"],
    ES: ["¿Adónde va?", "Habitación 216 · 85 m"],
    FR: ["Où allez-vous ?", "Chambre 216 · 85 m"],
  };
  const t = g.s2 ? text[lang] : text.EN;
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div style={{ filter: stress === "S1" ? "url(#d16-cvd)" : undefined }}>
        <Phone title={tt("Fernwood app")} status={tt("v4.2 · 40 hotels")}>
          {g.s2 && (
            <div role="radiogroup" aria-label={tt("Language")} className="flex gap-1">
              {Object.keys(text).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={lang === k} onClick={() => { setLang(k); onLog(tt(`Language: ${k}`)); }} className={clsx("rounded border px-1.5 text-[11px]", lang === k ? "border-[#1F1B3A] bg-[#1F1B3A] text-white" : "border-line")}>{k}</button>
              ))}
            </div>
          )}
          <p className="font-semibold">{t[0]}</p>
          <div className="rounded border border-[#CBD5E1] px-2 py-1.5">{t[1]}</div>
          {g.s3 && <p className="text-[11px] text-[#475569]">{tt("No camera? 🔊 Audio directions · 🗺 printed map at reception")}</p>}
          {stress === "S4" && !g.s2 && <p className="rounded bg-[#FEF3C7] px-2 py-1 text-[11px]">{tt("The app is English only. The guest shows the phone at reception and asks for help.")}</p>}
          {stress === "S5" && <p className="rounded bg-[#ECFDF5] px-2 py-1 text-[11px]">{tt("60 arrivals in 10 minutes: maps are on the phones, nothing queues. Reception gets a heads-up.")}</p>}
          {stress === "S3" && <p className="rounded bg-[#F1F5F9] px-2 py-1 text-[11px]">{g.s3 ? tt("Camera declined: audio directions start. The choice is remembered.") : tt("Camera declined: the app shows nothing else.")}</p>}
        </Phone>
      </div>
      <div className="space-y-2 text-[12px] text-ink">
        <div tabIndex={0} role="region" aria-label={tt("Hotels in the chain (Case assumption)")} className="overflow-x-auto rounded border border-line bg-white">
          <table className="w-full min-w-[16rem] text-[11.5px]">
            <caption className="px-2 pt-1 text-left font-semibold">{tt("Hotels (6 of 40 shown · Case assumption)")}</caption>
            <tbody>
              {HOTELS().map(([h, st, m], i) => (
                <tr key={h} className="border-t border-line">
                  <th scope="row" className="px-2 py-1 text-left font-normal">{h}</th>
                  <td className="px-2 py-1">{st}</td>
                  <td className={clsx("px-2 py-1", !g.s1 && i % 2 === 0 && "text-[#B91C1C]")}>{!g.s1 && i % 2 === 0 ? tt("map outdated") : m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={clsx("rounded border p-2", stress === "S6" ? "border-[#4F46E5] bg-[#EEF2FF]" : "border-line bg-white")}>
          <p className="font-semibold">{tt("Governance")}</p>
          {g.s4 ? (
            <ul className="list-disc pl-4">
              <li>{tt("Owner: head of guest experience")}</li>
              <li>{tt("Maps updated within 2 weeks of any renovation")}</li>
              <li>{tt("Switched off in a hotel if more than a quarter of routes fail in a month")}</li>
              <li>{tt("Review: every quarter; next 01/27")}</li>
            </ul>
          ) : (
            <p className="text-ash">{tt("Owner: — · Switch-off rule: — · Review: —")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ the instrument */

export function LadderLab() {
  const [stage, setStage] = useState<Stage>("concept");
  const allGates = useMemo(() => GATES(), []);
  const [gates, setGates] = useState<Record<string, boolean>>(() => Object.fromEntries(Object.values(allGates).flat().map((x) => [x.id, true])));
  const [stress, setStress] = useState<Stress | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<string | null>(null);
  const stageGates = allGates[stage];
  const met = stageGates.filter((x) => gates[x.id]).length;
  const offNotes = stageGates.filter((x) => !gates[x.id]);
  const addLog = (s: string) => setLog((l) => [s, ...l].slice(0, 6));
  const go = (s: Stage) => {
    setStage(s);
    setStress(null);
    setNote(null);
    setVerdict(null);
    setLog([]);
  };
  const run = (s: Stress) => {
    setStress(s);
    setNote(ABSENT(stage, s));
  };
  const stages = STAGES();
  const idx = stages.findIndex(([k]) => k === stage);
  return (
    <Diagram label={tt("Fernwood's “Find your room” built four times: concept, prototype, pilot, scaled · a working product · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("One product, built four times over. The task never changes, so maturity is the only variable. Switch a gate off and watch the product get worse; run a stress test and watch what each stage can and cannot do.")}</ThePoint>
        <svg aria-hidden width="0" height="0" className="absolute">
          <filter id="d16-cvd"><feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0" /></filter>
        </svg>
        <div className="rounded-lg bg-[#1F1B3A] px-3 py-2 text-white">
          <p className="text-[10.5px] uppercase tracking-wide text-white/70">{tt("Your task at every stage")}</p>
          <p className="text-[13.5px]">{tt("You are a guest arriving at Fernwood Harbour at 23:10 with a suitcase. Find room 216 in the new wing.")}</p>
        </div>
        <ol className="grid gap-1.5 sm:grid-cols-4" aria-label={tt("The four stages")}>
          {stages.map(([k, l, sub], i) => (
            <li key={k}>
              <button type="button" aria-current={stage === k ? "step" : undefined} onClick={() => go(k)} className={clsx("min-h-[48px] w-full rounded border px-2 py-1 text-left text-[12px]", stage === k ? "border-[#4F46E5] bg-[#EEF2FF]" : "border-line bg-white")}>
                <span className="block text-[10.5px] text-ash">{tt(`Step ${i + 1}`)}</span>
                <span className="block font-semibold text-ink">{l}</span>
                <span className="block text-[10.5px] text-ash">{sub}</span>
              </button>
            </li>
          ))}
        </ol>
        <p aria-live="polite" className="font-mono text-[12px] text-[#312E81]">{tt(`Now running: ${stages[idx][1]} · gates met ${met} of ${stageGates.length}`)}</p>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-2 rounded-lg border border-line bg-[#F8FAFC] p-3">
            {stage === "concept" && <ConceptSlide g={gates} onPresent={() => addLog(tt("The board liked the slide. Nobody asked what it proves."))} />}
            {stage === "prototype" && <Prototype g={gates} stress={stress} onLog={addLog} />}
            {stage === "pilot" && <Pilot g={gates} stress={stress} onLog={addLog} />}
            {stage === "scale" && <Scale g={gates} stress={stress} onLog={addLog} />}
            {note && <p className="rounded border border-[#CBD5E1] bg-white px-2 py-1 text-[12px] text-ink">{note}</p>}
            {stress === "S1" && <p className="text-[11px] text-ash">{tt("The screen is shown as a guest with red-green colour blindness sees it. The arrow and the warning colours now look alike; only shape and text still tell them apart.")}</p>}
            {log.length > 0 && (
              <div className="rounded border border-line bg-white p-2 font-mono text-[11px] text-[#334155]">
                <p className="font-sans font-semibold text-ink">{tt("Session log")}</p>
                {log.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="rounded-lg border border-line bg-white p-2">
              <p className="text-[12.5px] font-semibold text-ink">{tt(`Gate rail · ${met} of ${stageGates.length} met`)}</p>
              <p className="mb-1 text-[11px] text-ash">{tt("All gates start on. Switch one off and watch the stage.")}</p>
              <div className="space-y-1">
                {stageGates.map((x) => <Toggle key={x.id} on={gates[x.id]} onClick={() => setGates((m) => ({ ...m, [x.id]: !m[x.id] }))}>{x.name}</Toggle>)}
              </div>
              {offNotes.length > 0 && (
                <ul className="mt-2 space-y-1 text-[11.5px] text-[#7F1D1D]">
                  {offNotes.map((x) => <li key={x.id}>{x.off}</li>)}
                </ul>
              )}
            </div>
            <div className="rounded-lg border border-line bg-white p-2">
              <p className="text-[12.5px] font-semibold text-ink">{tt("Stress tests")}</p>
              <div className="mt-1 space-y-1">
                {STRESS().map(([k, l]) => (
                  <button key={k} type="button" aria-pressed={stress === k} onClick={() => run(k)} className={clsx("block w-full rounded border px-2 py-1 text-left text-[12px]", stress === k ? "border-[#4F46E5] bg-[#EEF2FF] font-semibold" : "border-line bg-white")}>{`${k} · ${l}`}</button>
                ))}
                {stress && <button type="button" onClick={() => { setStress(null); setNote(null); }} className="text-[11.5px] underline">{tt("Clear the stress test")}</button>}
              </div>
            </div>
          </div>
        </div>
        {idx < 3 && (
          <div className="rounded-lg border border-dashed border-line p-3 text-[12.5px] text-ink">
            <p className="font-semibold">{tt(`Gate meeting: go from ${stages[idx][1]} to ${stages[idx + 1][1]}?`)}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {[["go", tt("Go")], ["change", tt("Change and test again")], ["stop", tt("Stop")]].map(([k, l]) => (
                <button key={k} type="button" aria-pressed={verdict === k} onClick={() => setVerdict(k)} className={clsx("min-h-[36px] rounded border px-3", verdict === k ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-line bg-white")}>{l}</button>
              ))}
            </div>
            {verdict && (
              <p className="mt-2">
                {verdict === "go"
                  ? offNotes.length
                    ? tt(`You go on with ${offNotes.length} gate(s) not met. The next stage inherits them: ${offNotes.map((x) => x.name.toLowerCase()).join("; ")}.`)
                    : tt("You go on with every gate met. The next stage starts from evidence, not from enthusiasm.")
                  : verdict === "change"
                    ? tt("You stay on this rung and fix what the gates and stress tests showed. Slower, and cheaper than fixing it at the next rung.")
                    : tt("You stop here and write down what you learned. A stop with a reason is a result, not a failure.")}
              </p>
            )}
          </div>
        )}
        <p className="text-[11px] text-ash">{tt("Fernwood, its hotels, guests and every number here are made up for this lesson (Case assumption). Nothing is stored or marked right or wrong.")}</p>
      </div>
    </Diagram>
  );
}
