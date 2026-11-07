"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AppScreen } from "@/components/sim/TaskLab";
import { StepControls, useStepper } from "@/components/sim/Stepper";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the learning arc of the Materi (UX-STANDARD 2.21). One thread runs through the day: a 50 ms first impression taken before A1, explained in A4 and
 * looked back on in B3. Block A lets people experience perception (an animation where the effect is too fast or invisible to notice, a try-it-yourself where
 * their own hand or eye is the evidence); Block B asks them to judge (a line between helping and manipulating, the roles of one conflict). Nothing here is
 * scored or exported; the 50 ms choice is kept in this browser only, so A4 and B3 can come back to it.
 */
const ACC = "#2F5D8A";
const Brand = "Nordwind";
const KEY = "ux-d1-arc";
type Pick = "1" | "2" | "none";
type Arc = { pick?: Pick };

function useArc(): [Arc, (a: Arc) => void] {
  const [a, setA] = useState<Arc>({});
  useEffect(() => {
    const read = () => {
      try {
        setA(JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Arc);
      } catch {
        setA({});
      }
    };
    read();
    window.addEventListener(KEY, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(KEY, read);
      window.removeEventListener("storage", read);
    };
  }, []);
  const save = (n: Arc) => {
    setA(n);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(n));
    } catch {
      /* no storage: the choice lasts until the page is left */
    }
    window.dispatchEvent(new Event(KEY));
  };
  return [a, save];
}

const Frame = ({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) => (
  <figure className="space-y-2 rounded-lg border border-line bg-[#F8FAFC] p-3">
    <figcaption className="text-[13px] font-semibold text-ink">{title}</figcaption>
    {lead && <p className="max-w-prose text-caption text-ash">{lead}</p>}
    {children}
  </figure>
);
const choice = (on: boolean) => clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ink hover:border-ash");

/* ------------------------------------------------------------------ the two screens of the 50 ms test */

const FERRIES = () => [
  { to: tt("Visby"), time: "10:35", gate: "A9" },
  { to: tt("Bergen"), time: "09:40", gate: "C7" },
  { to: tt("Kiel"), time: "09:25", gate: "A2" },
];

/** The polished screen: a colourful header and light type, destinations at the end of each line, an advert in the list and a pale Book button. */
function Polished() {
  return (
    <AppScreen brand={Brand} color="#0B1F33">
      <div className="-mx-3 -mt-3 flex h-[104px] flex-col justify-end px-3 pb-2" style={{ background: "linear-gradient(160deg, #F59E0B 0%, #DB2777 45%, #1E3A8A 100%)" }}>
        <p className="text-[24px] font-light tracking-wide text-white">{tt("Sail the North")}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">{tt("Summer departures")}</p>
      </div>
      <div className="space-y-1 pt-1">
        {FERRIES().map((f, i) => (
          <p key={i} className="text-[11px] font-light text-[#94A3B8]">{tt(`${f.time} · gate ${f.gate} · ${f.to}`, `${f.time} · Gate ${f.gate} · ${f.to}`)}</p>
        ))}
        <p className="rounded bg-[#FDE68A] px-2 py-1 text-[11px] font-bold text-[#78350F]">{tt("Duty-free 20% off")}</p>
      </div>
      <div className="flex justify-end pt-2"><span className="rounded-full border border-[#E2E8F0] px-4 py-1 text-[11px] font-light text-[#B6C2CF]">{tt("Book")}</span></div>
    </AppScreen>
  );
}

/** The plain screen: no picture, destinations first and in alphabetical order, no advert, a strong Book button. */
function Plain() {
  const rows = [...FERRIES()].sort((a, b) => a.to.localeCompare(b.to));
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[15px] font-bold">{tt("Ferries today")}</p>
      <p className="grid grid-cols-[1fr_auto_auto] gap-3 px-1 text-[10.5px] font-semibold text-[#475569]"><span>{tt("To")}</span><span>{tt("Time")}</span><span>{tt("Gate")}</span></p>
      {rows.map((f, i) => (
        <p key={i} className="grid grid-cols-[1fr_auto_auto] gap-3 rounded bg-[#EEF2F7] px-1 py-1 text-[12px]"><span className="font-bold">{f.to}</span><span>{f.time}</span><span className="font-bold">{f.gate}</span></p>
      ))}
      <div className="pt-2"><span className="block rounded py-2 text-center text-[13px] font-bold text-white" style={{ background: ACC }}>{tt("Book")}</span></div>
    </AppScreen>
  );
}

/* ------------------------------------------------------------------ opening, before A1 · the 50 ms test */

type Phase = "idle" | "s1" | "m1" | "s2" | "m2" | "ask";
const FLASH_MS = 50;

export function FlashTest() {
  const [arc, save] = useArc();
  const [phase, setPhase] = useState<Phase>("idle");
  useEffect(() => {
    const next: Partial<Record<Phase, [Phase, number]>> = { s1: ["m1", FLASH_MS], m1: ["s2", 700], s2: ["m2", FLASH_MS], m2: ["ask", 300] };
    const n = next[phase];
    if (!n) return;
    const id = window.setTimeout(() => setPhase(n[0]), n[1]);
    return () => window.clearTimeout(id);
  }, [phase]);
  const mask = <div aria-hidden className="mx-auto h-[340px] w-full max-w-[300px] rounded-[24px]" style={{ background: "repeating-conic-gradient(#CBD5E1 0% 25%, #F1F5F9 0% 50%) 0 0 / 14px 14px" }} />;
  const answer = (p: Pick) => { save({ pick: p }); setPhase("idle"); };
  return (
    <Frame
      title={tt("Before you start: a first impression in about 50 ms")}
      lead={tt("Two Nordwind start screens will each flash for about 50 ms, the time research gives for a first judgement of a web page. Do not try to read. Just notice which one you would trust with your ferry ticket. Card A4 comes back to your choice.")}
    >
      <div className="mx-auto w-full max-w-[300px]" aria-live="polite">
        {phase === "s1" && <div aria-hidden><Polished /></div>}
        {phase === "s2" && <div aria-hidden><Plain /></div>}
        {(phase === "m1" || phase === "m2") && mask}
        {phase === "ask" && (
          <div className="space-y-2 rounded-lg border border-line bg-white p-3">
            <p className="text-[13px] font-semibold">{tt("Which app would you trust with your ferry ticket?")}</p>
            <div className="flex flex-col gap-2">
              <button type="button" className={choice(false)} onClick={() => answer("1")}>{tt("The first screen")}</button>
              <button type="button" className={choice(false)} onClick={() => answer("2")}>{tt("The second screen")}</button>
              <button type="button" className={choice(false)} onClick={() => answer("none")}>{tt("I could not tell")}</button>
            </div>
          </div>
        )}
        {phase === "idle" && (
          <div className="space-y-2">
            {arc.pick ? (
              <p className="rounded bg-accentSoft p-2 text-caption text-ink">
                {arc.pick === "none" ? tt("Noted: you could not tell. Card A4 comes back to it.") : tt(`Noted: you chose the ${arc.pick === "1" ? "first" : "second"} screen. Card A4 comes back to it.`, `Notiert: Sie haben den ${arc.pick === "1" ? "ersten" : "zweiten"} Bildschirm gewählt. Karte A4 kommt darauf zurück.`)}
              </p>
            ) : (
              <p className="text-caption text-ash">{tt("The test is visual. If you cannot see the screen, skip it: card A4 describes both screens in words.")}</p>
            )}
            <button type="button" className="btn btn-sm min-h-[40px] border border-accent bg-accent text-white hover:bg-accentHi" onClick={() => setPhase("s1")}>
              {arc.pick ? tt("Take the test again") : tt("Start the test")}
            </button>
          </div>
        )}
      </div>
      <p className="text-[11px] text-ash">{tt("Your choice stays in this browser only. It is not scored and not exported.")}</p>
    </Frame>
  );
}

/* ------------------------------------------------------------------ A4 · from the first feeling to the first thought, and the 50 ms choice explained */

const LOG = (ms: number) => Math.min(100, Math.max(0, (Math.log10(ms / 10) / 3) * 100)); // 10 ms … 10 s on a log scale

const MOMENTS = () => [
  { ms: 20, at: tt("20 ms"), say: tt("A photo shown for only 20 ms is enough for people to tell whether it holds an animal (Thorpe et al. 1996). The picture is in before anything is thought.") },
  { ms: 50, at: tt("50 ms"), say: tt("The page is liked or not liked. Ratings of visual appeal after 50 ms were close to those after a longer look (Lindgaard et al. 2006). This is the moment of your choice in the opening test.") },
  { ms: 150, at: tt("about 150 ms"), say: tt("The brain's response shows that it has sorted the picture into a category, about 150 ms after it appeared (Thorpe et al. 1996). The feeling about the page is already there.") },
  { ms: 250, at: tt("200 to 300 ms"), say: tt("The first fixation ends. Only now has the eye taken in one sharp spot of about 2°: a word or two (Rayner 1998).") },
  { ms: 1000, at: tt("1 s"), say: tt("Three or four fixations, three or four sharp spots. Reading has only begun.") },
  { ms: 5000, at: tt("a few seconds"), say: tt("Reading, comparing, deciding: the slow, deliberate way of judging (Kahneman 2011). It does not start from nothing; it starts from a feeling that is already there.") },
];

export function FirstFeelTimeline() {
  const m = MOMENTS();
  const s = useStepper(m.length);
  const cur = s.step >= 0 ? m[s.step] : null;
  return (
    <Frame title={tt("From the first feeling to the first thought: one second, slowed down")} lead={tt("The scale is logarithmic: each mark is ten times the one before. Play it or step through it.")}>
      <div aria-hidden className="relative mx-2 mb-8 mt-10 h-16">
        <div className="absolute inset-y-0 left-0 rounded-l bg-[#FDE7EF]" style={{ width: `${LOG(150)}%` }} />
        <div className="absolute inset-y-0 right-0 rounded-r bg-[#E0ECF8]" style={{ left: `${LOG(250)}%` }} />
        <p className="absolute -top-6 left-0 text-[11px] font-semibold text-[#9D174D]">{tt("fast, automatic: feeling")}</p>
        <p className="absolute -top-6 right-0 text-[11px] font-semibold text-[#1E4E8C]">{tt("slow, deliberate: thinking")}</p>
        <div className="absolute inset-x-0 top-1/2 h-[2px] bg-[#64748B]" />
        {[10, 100, 1000, 10000].map((t) => (
          <span key={t} className="absolute top-full mt-1 -translate-x-1/2 text-[10.5px] text-ash" style={{ left: `${LOG(t)}%` }}>{t < 1000 ? `${t} ms` : `${t / 1000} s`}</span>
        ))}
        {m.slice(0, s.step + 1).map((x, i) => (
          <span key={i} className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#334155]" style={{ left: `${LOG(x.ms)}%` }} />
        ))}
        {cur && <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#DB2777] shadow" style={{ left: `${LOG(cur.ms)}%`, transition: s.reduce ? undefined : "left 700ms ease" }} />}
      </div>
      <p className="text-caption font-semibold text-ash" aria-live="polite">{cur ? cur.at : tt("Press Play or Step to start.")}</p>
      <p className="min-h-[3.5rem] max-w-prose text-body text-ink" aria-live="polite">{cur ? cur.say : tt("What happens in the first second after a screen appears, in the order research has measured it.")}</p>
      <StepControls s={s} />
    </Frame>
  );
}

export function FirstImpressionReveal() {
  const [arc] = useArc();
  const [show, setShow] = useState(false);
  const open = Boolean(arc.pick) || show;
  const said =
    arc.pick === "1"
      ? tt("In the opening you trusted the first screen, the polished one. That is what the research predicts: in about 50 ms the judgement follows visual appeal (Lindgaard et al. 2006), and an attractive interface is judged easier to use before anyone has used it (Tractinsky et al. 2000).")
      : arc.pick === "2"
        ? tt("In the opening you trusted the second, plain screen. Perhaps its order or its strong Book button reached you in the flash; perhaps the colourful header of the first looked like an advert to you. Either way, the judgement was made before you had read a word.")
        : arc.pick === "none"
          ? tt("In the opening you could not tell. That is honest: in 50 ms nothing can be read. What remains is a feeling, and it is there even when it cannot be named.")
          : null;
  return (
    <Frame title={tt("Your 50 ms choice, explained")}>
      {!open ? (
        <div className="space-y-2">
          <p className="max-w-prose text-caption text-ink">{tt("You have not taken the 50 ms test at the start of card A1 yet. Take it there first: this part answers it, and reading it first would spoil the test.")}</p>
          <button type="button" className="text-[12px] underline" onClick={() => setShow(true)}>{tt("Show the answer anyway")}</button>
        </div>
      ) : (
        <>
          {said && <p className="max-w-prose rounded bg-accentSoft p-2 text-body text-ink">{said}</p>}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-[12px] font-semibold">{tt("First screen: liked at first sight")}</p>
              <div aria-hidden className="mx-auto max-w-[260px]"><Polished /></div>
              <ul className="list-disc space-y-0.5 pl-4 text-caption text-ink">
                <li>{tt("A colourful header and light type: visual appeal, read in the first 50 ms.")}</li>
                <li>{tt("The destination comes last in each line, so every line has to be read to its end.")}</li>
                <li>{tt("An advert sits in the list of ferries and pulls the eye.")}</li>
                <li>{tt("Book is pale grey on white: hard to find, and harder still in sunlight.")}</li>
              </ul>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-semibold">{tt("Second screen: plain, and it works")}</p>
              <div aria-hidden className="mx-auto max-w-[260px]"><Plain /></div>
              <ul className="list-disc space-y-0.5 pl-4 text-caption text-ink">
                <li>{tt("Destinations first, in bold and in alphabetical order.")}</li>
                <li>{tt("No advert between the ferries.")}</li>
                <li>{tt("Book is the strongest thing on the screen.")}</li>
                <li>{tt("Less to like at first sight: the work is done by order, not by polish.")}</li>
              </ul>
            </div>
          </div>
          <p className="max-w-prose text-caption text-ink">{tt("Both show the same three ferries. The first feeling and the working screen point in different directions here, and the first feeling comes first. This is why card A1 separates taste from effect, and why a first impression is a hypothesis to test, not a verdict.")}</p>
        </>
      )}
    </Frame>
  );
}

/* ------------------------------------------------------------------ A3 · the habit trap */

const TRIPS = 4;
const fmt = (ms: number) => tt(`${(ms / 1000).toFixed(1)} s`, `${(ms / 1000).toFixed(1).replace(".", ",")} s`);

export function HabitTrap() {
  const [trip, setTrip] = useState(1);
  const [times, setTimes] = useState<number[]>([]);
  const [slips, setSlips] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const t0 = useRef(0);
  const done = times.length >= TRIPS;
  const moved = trip === TRIPS;
  useEffect(() => {
    t0.current = Date.now();
  }, [trip, started]);
  const checkIn = () => {
    const ms = Date.now() - t0.current;
    setTimes((t) => [...t, ms]);
    setFlash(tt("✓ Checked in"));
    window.setTimeout(() => {
      setFlash(null);
      if (trip < TRIPS) setTrip(trip + 1);
    }, 600);
  };
  const reset = () => { setTrip(1); setTimes([]); setSlips(0); setFlash(null); setStarted(false); };
  const usual = times.length >= 3 ? (times[1] + times[2]) / 2 : 0;
  const slower = done && (slips > 0 || times[3] > usual * 1.3);
  return (
    <Frame
      title={tt("Try it yourself: four check-ins in a row, and an app update")}
      lead={tt("You are Ben, a weekly commuter. Check in for four ferries in a row, as quickly as you can. The time of each check-in is shown below.")}
    >
      <div className="mx-auto w-full max-w-[300px]">
        <AppScreen brand={Brand} color={ACC} status={done ? tt("all checked in") : tt(`trip ${trip} of ${TRIPS}`, `Fahrt ${trip} von ${TRIPS}`)}>
          <div className="relative h-[230px]">
            {moved && !done && <p className="rounded bg-[#E0F2FE] px-2 py-1 text-[11px] font-semibold text-[#075985]">{tt("New look! We moved a few things.")}</p>}
            {moved && !done && <button type="button" onClick={checkIn} className="mt-1 text-[12px] font-semibold underline" style={{ color: ACC }}>{tt("Check in")}</button>}
            <p className="mt-2 text-[14px] font-bold">{tt("Kiel → Oslo · 09:10")}</p>
            <p className="text-[12px] text-[#475569]">{tt("Gate B4 · seat 31 · boarding 08:40")}</p>
            {flash && <p className="mt-3 rounded bg-[#DCFCE7] px-2 py-1 text-[12px] font-semibold text-[#166534]" aria-live="polite">{flash}</p>}
            {!started ? (
              <button type="button" onClick={() => setStarted(true)} className="absolute inset-x-6 bottom-12 rounded border border-line bg-white py-3 text-[13px] font-semibold text-ink shadow">{tt("Ready? Start the first trip")}</button>
            ) : done ? (
              <p className="mt-3 text-[12px] font-semibold">{tt("All four ferries checked in.")}</p>
            ) : moved ? (
              <button type="button" onClick={() => { setSlips((n) => n + 1); setFlash(tt("That was Change seat: Check in has moved.")); window.setTimeout(() => setFlash(null), 1400); }} className="absolute bottom-0 right-0 rounded px-4 py-3 text-[13px] font-bold text-white" style={{ background: "#64748B" }}>{tt("Change seat")}</button>
            ) : (
              <button type="button" onClick={checkIn} disabled={Boolean(flash)} className="absolute bottom-0 right-0 rounded px-4 py-3 text-[13px] font-bold text-white" style={{ background: ACC }}>{tt("Check in")}</button>
            )}
          </div>
        </AppScreen>
      </div>
      {times.length > 0 && (
        <table className="mx-auto text-[12px]">
          <caption className="sr-only">{tt("Time per check-in")}</caption>
          <tbody>
            {times.map((ms, i) => (
              <tr key={i}><th scope="row" className="pr-3 text-left font-normal text-ash">{tt(`Trip ${i + 1}`, `Fahrt ${i + 1}`)}</th><td className="font-mono">{fmt(ms)}</td><td className="pl-3 text-ash">{i === TRIPS - 1 ? (slips > 0 ? tt(`after the update · ${slips} tap(s) on the old place`, `nach dem Update · ${slips} Tap(s) auf die alte Stelle`) : tt("after the update")) : ""}</td></tr>
            ))}
          </tbody>
        </table>
      )}
      {done && (
        <div className="space-y-2">
          <p className="max-w-prose rounded bg-accentSoft p-2 text-body text-ink">
            {slower
              ? tt("Three repeats were enough for a small expectation: your hand knew where Check in sits, and after the update it went there first, or hesitated. Real habits are built over weeks, and regular users meet a moved button on a morning when they are in a hurry. Moving a familiar element costs them a mistake; it is not a matter of style.")
              : tt("You adjusted at once. Three taps make only a weak expectation; real habits are built over weeks of the same action in the same place, and about 43% of everyday actions are done almost daily, often while thinking of something else (Wood et al. 2002). A regular user meets a moved button on a morning when they are in a hurry.")}
          </p>
          <button type="button" className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink" onClick={reset}>{tt("Start again")}</button>
        </div>
      )}
    </Frame>
  );
}

/* ------------------------------------------------------------------ B1 · where steering becomes manipulation */

const MARKS = () => [tt("Helps the customer"), tt("Mostly helps"), tt("Depends"), tt("Mostly against"), tt("Works against the customer")];
const PRACTICES = () => [
  { what: tt("The cheapest standard seat is pre-selected; every other seat is one tap away."), law: tt("No rule forbids a default. It is a decision the company takes for its customers, and defaults steer strongly (Johnson and Goldstein 2003): fine when it is in their interest and they can see it."), open: true },
  { what: tt("When check-in opens, Nordwind sends a reminder with a one-tap check-in button."), law: tt("No rule against it. A prompt at the moment people can act (Fogg 2009); it turns against them only when it is sent for the company's sake, or too often."), open: true },
  { what: tt("Travel insurance is added to the price with a pre-ticked box at payment."), law: tt("Not allowed for an extra payment: EU consumer law requires the customer's express consent, and if it was taken from a pre-ticked box, the customer can claim the money back (Consumer Rights Directive 2011/83/EU, Article 22)."), open: false },
  { what: tt("“Only 2 cabins left” appears on every sailing, whatever the real number."), law: tt("Misleading: false information about a product's availability that is likely to change the customer's decision is an unfair commercial practice in the EU (Unfair Commercial Practices Directive 2005/29/EC, Article 6)."), open: false },
  { what: tt("Signing up for the newsletter takes one tap; unsubscribing takes six screens."), law: tt("Where the newsletter rests on consent, withdrawing it must be as easy as giving it (GDPR, Article 7(3))."), open: false },
  { what: tt("The flexible fare, which most travellers do not need, is marked “Recommended” and shown first; nothing is ticked."), law: tt("No clear rule: it is legal as long as nothing is false or pre-ticked. Whether it helps or works against the customer is the company's call, and the reason it gives."), open: true },
];

export function SteeringLine() {
  const p = PRACTICES();
  const [mark, setMark] = useState<(number | null)[]>(p.map(() => null));
  const [shown, setShown] = useState(false);
  const all = mark.every((x) => x !== null);
  return (
    <Frame
      title={tt("Where does steering become manipulation? Six Nordwind practices on one line")}
      lead={tt("Place each practice first, with your own judgement. Then see where EU law draws its line, and where it draws none.")}
    >
      <ol className="space-y-3">
        {p.map((x, i) => (
          <li key={i} className="space-y-1 rounded border border-line bg-white p-2">
            <p className="text-[13px] text-ink"><span className="font-semibold">{i + 1}. </span>{x.what}</p>
            <div role="radiogroup" aria-label={tt(`Your mark for practice ${i + 1}`, `Ihre Einordnung für Praxis ${i + 1}`)} className="grid grid-cols-5 gap-1">
              {MARKS().map((m, k) => (
                <button key={k} type="button" role="radio" aria-checked={mark[i] === k} onClick={() => setMark((a) => a.map((v, j) => (j === i ? k : v)))} className={clsx("min-h-[40px] rounded border px-1 text-[10.5px] leading-tight", mark[i] === k ? "border-[#4F46E5] bg-[#EEF2FF] font-semibold" : "border-line bg-white text-ash")}>{m}</button>
              ))}
            </div>
            {shown && (
              <p className={clsx("rounded p-2 text-caption", x.open ? "bg-[#FEF9C3] text-[#713F12]" : "bg-[#FEE2E2] text-[#7F1D1D]")}>
                <span className="font-semibold">{x.open ? tt("The law leaves it to you: ") : tt("The law draws the line: ")}</span>{x.law}
              </p>
            )}
          </li>
        ))}
      </ol>
      {!shown ? (
        <button type="button" disabled={!all} onClick={() => setShown(true)} className="btn btn-sm min-h-[40px] border border-accent bg-accent text-white hover:bg-accentHi disabled:opacity-40">
          {all ? tt("Show where the law stands") : tt("Place all six to see where the law stands")}
        </button>
      ) : (
        <p className="max-w-prose rounded bg-accentSoft p-2 text-body text-ink">{tt("For three practices the law decides. For the other three it decides nothing, and that is where a Neuro-UX strategy needs its own rule. Where would your company draw that line, who draws it, and on what basis? Card B3 comes back to the question of who decides.")}</p>
      )}
      <p className="text-[11px] text-ash">{tt("Nordwind and its practices are made up; the rules quoted are real EU law, in short. Check the current text before you rely on it.")}</p>
    </Frame>
  );
}

/* ------------------------------------------------------------------ B2 · one conflict, four roles */

const ROLES = () => [
  {
    id: "mkt", name: tt("Marketing"),
    goal: tt("Sell the summer sale: the biggest campaign of the season, four weeks long."),
    case: tt("A moving banner is noticed by everyone: strong signals pull the eye by themselves (A2, bottom-up). And a lively, attractive screen is liked at first sight and buys patience (A4)."),
    hit: tt("Noticed is not wanted. A strong signal that is not the task makes the task slower, with more mistakes (A2, the third row of the two forces). Who pays for the slower booking, and does a slower booking sell more?"),
  },
  {
    id: "ux", name: tt("UX"),
    goal: tt("Booking first: people open the app to find a ferry."),
    case: tt("People look for what they came for (A2, top-down), and they overlook what looks like an advert, even when it is useful (A1, Benway and Lane 1998). The banner competes with the task and may not even be seen."),
    hit: tt("You assume it slows bookings, but nobody has measured it. And a campaign that nobody sees fails too: what would you offer marketing instead?"),
  },
  {
    id: "law", name: tt("Legal"),
    goal: tt("No claim the company cannot keep."),
    case: tt("A sale price must be true and available; a countdown that starts again, or “only 2 left” when it is not true, is misleading (B1)."),
    hit: tt("Legal can say what is forbidden, not what works. Being allowed is not the same as being good for the customer."),
  },
  {
    id: "it", name: tt("Product and IT"),
    goal: tt("Ship the release on time: one sprint is left."),
    case: tt("An animated banner on every screen size costs development and testing time; a static banner is cheaper and safer."),
    hit: tt("Effort is a reason to choose how, not whether. The trade between campaign and booking is not decided in the backlog."),
  },
];

export function RoleCards() {
  const r = ROLES();
  const [cur, setCur] = useState(r[0].id);
  const [hit, setHit] = useState<string[]>([]);
  const role = r.find((x) => x.id === cur) ?? r[0];
  return (
    <Frame
      title={tt("One conflict, four roles: the summer-sale banner")}
      lead={tt("Nordwind marketing wants an animated summer-sale banner at the top of the booking screen, above the ferry search. Take each role in turn. Every role must argue with an effect from Materi A, not with taste.")}
    >
      <div role="tablist" aria-label={tt("Roles")} className="flex flex-wrap gap-2">
        {r.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={cur === x.id} onClick={() => setCur(x.id)} className={choice(cur === x.id)}>{x.name}</button>
        ))}
      </div>
      <div role="tabpanel" className="space-y-2 rounded border border-line bg-white p-3 text-[13px] text-ink">
        <p><span className="font-semibold">{tt("Goal: ")}</span>{role.goal}</p>
        <p><span className="font-semibold">{tt("Best argument, with evidence: ")}</span>{role.case}</p>
        {hit.includes(role.id) ? (
          <p className="rounded bg-[#FEF3C7] p-2 text-[#713F12]"><span className="font-semibold">{tt("The strongest objection: ")}</span>{role.hit}</p>
        ) : (
          <button type="button" className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink" onClick={() => setHit((h) => [...h, role.id])}>{tt("Hear the strongest objection")}</button>
        )}
      </div>
      <div className="max-w-prose rounded bg-accentSoft p-2 text-caption text-ink">
        <p className="font-semibold">{tt("Three ways a conflict like this gets settled")}</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4">
          <li>{tt("A test: a week with and a week without the banner, comparing the time to book and the sales.")}</li>
          <li>{tt("A principle: the effect the company wants (B1) decides, for example “the customer's task comes first”.")}</li>
          <li>{tt("A decision-maker: someone who answers for the effect and settles it (B3).")}</li>
        </ul>
        <p className="mt-1">{tt("Which would your company use, and which would you trust?")}</p>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ B3 · back to the first 50 ms */

export function ClosingLook() {
  const [arc] = useArc();
  const what = arc.pick === "1" ? tt("you trusted the polished screen") : arc.pick === "2" ? tt("you trusted the plain screen") : arc.pick === "none" ? tt("you could not tell") : null;
  return (
    <Frame title={tt("Back to the first 50 ms")}>
      <p className="max-w-prose text-body text-ink">
        {what ? tt(`At the start of the day ${what}, in about 50 ms. Since then you have seen why: what the eye takes in, what it expects, what it feels before it thinks, and what a company may do with that.`, `Zu Beginn des Tages haben Sie in etwa 50 ms entschieden: ${what}. Seitdem haben Sie gesehen, warum: was das Auge aufnimmt, was es erwartet, was es fühlt, bevor es denkt, und was ein Unternehmen damit tun darf.`) : tt("The day began with a 50 ms first impression (card A1). Since then you have seen what the eye takes in, what it expects, what it feels before it thinks, and what a company may do with that.")}
      </p>
      <ul className="max-w-prose list-disc space-y-1 pl-5 text-body text-ink">
        <li>{tt("What would you now check before you trust a screen, your own or a supplier's?")}</li>
        <li>{tt("Which decision in your work is still made on a first impression, and who answers for it?")}</li>
      </ul>
    </Frame>
  );
}
