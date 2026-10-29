"use client";

import clsx from "clsx";
import { useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the working products of the study cards (UX-STANDARD 2.16): Northline Rail, a made-up rail company with an app, so no task is answered here. Each lab
 * gives one task and versions of the same app to use, with time, wrong taps, stress tests and a "how did that feel?" after each run (components/sim/TaskLab.tsx).
 * The "smart" behaviour is scripted for the lesson; nothing is learned from the learner and nothing is stored.
 */
const ACC = "#B45309";
const Brand = "Northline";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color="#1F2937"><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;
const Btn = ({ onClick, children, quiet }: { onClick: () => void; children: React.ReactNode; quiet?: boolean }) => (
  <button type="button" onClick={onClick} className={clsx("w-full rounded-lg py-2", quiet ? "border border-[#CBD5E1] text-[#334155]" : "font-bold text-white")} style={quiet ? undefined : { background: ACC }}>{children}</button>
);
const Row = ({ onClick, children, on }: { onClick: () => void; children: React.ReactNode; on?: boolean }) => (
  <button type="button" onClick={onClick} className={clsx("block w-full rounded border px-2 py-1.5 text-left text-[12.5px]", on ? "border-[#B45309] bg-[#FFFBEB]" : "border-[#CBD5E1]")}>{children}</button>
);
const TRAINS = () => [[tt("08:40 · RE 12 · platform 4 · arrives 09:22"), "a"], [tt("08:55 · IC 3 · platform 7 · arrives 09:41"), "b"], [tt("09:10 · RB 8 · platform 2 · arrives 10:02"), "c"]] as const;

/* ------------------------------------------------------------------ A1 · a rule, the situation, what it learned */

function Delay({ ctx, kind }: { ctx: LabCtx; kind: "rule" | "situation" | "learned" }) {
  const [search, setSearch] = useState(false);
  const [undo, setUndo] = useState(false);
  if (ctx.finished) return <Done text={tt("Rebooked: 08:40 to Linden, arrives 09:22 · meeting at 09:30")} />;
  const pick = (id: string) => (id === "a" ? ctx.done(tt("Took the 08:40")) : ctx.miss(tt("That train arrives after 09:30")));
  const list = <div className="space-y-1">{TRAINS().map(([t, id]) => <Row key={id} onClick={() => pick(id)}>{t}</Row>)}</div>;
  return (
    <AppScreen brand={Brand} color="#1F2937" status="08:05">
      {kind === "rule" && (
        <>
          <p className="rounded bg-[#FEF3C7] p-2 text-[12.5px]">{tt("Delay notice: the 08:12 to Linden is running about 25 minutes late. We apologise for the inconvenience.")}</p>
          {!search ? <Btn quiet onClick={() => { setSearch(true); ctx.hit(tt("Opened the journey planner")); }}>{tt("Journey planner")}</Btn> : <><p className="text-[11.5px]">{tt("From: Harbour · To: Linden · now")}</p>{list}</>}
        </>
      )}
      {kind === "situation" && (
        <>
          <p className="rounded bg-[#FEF3C7] p-2 text-[12.5px]">{tt("Your 08:12 is 25 minutes late. You're at Harbour, so the 08:40 from platform 4 gets you to Linden at 09:22.")}</p>
          <Btn onClick={() => pick("a")}>{tt("Take the 08:40 · platform 4")}</Btn>
          <button type="button" onClick={() => { setSearch(true); ctx.hit(tt("Looked at other trains")); }} className="text-[12px] underline">{tt("Other trains")}</button>
          {search && list}
        </>
      )}
      {kind === "learned" && (
        <>
          <p className="rounded bg-[#E0E7FF] p-2 text-[12.5px]">{tt("We've moved you to the 08:55 to Harbour Office, like every Tuesday. ✓")}</p>
          <p className="text-[11.5px] text-[#475569]">{tt("Today is Wednesday. Your meeting is in Linden.")}</p>
          {!undo ? <button type="button" onClick={() => { setUndo(true); ctx.miss(tt("The app guessed the wrong trip")); }} className="text-[12px] underline">{tt("That's not my trip")}</button> : <><p className="text-[11.5px]">{tt("Rebooking undone. Choose a train to Linden:")}</p>{list}</>}
        </>
      )}
    </AppScreen>
  );
}

export function KindsLab() {
  return (
    <TaskLab
      label={tt("One Northline delay handled by a rule, by the situation and by what the app has learned · a working product · Case assumption, example company")}
      point={tt("Three kinds of system can stand behind a smart-looking screen. A rule gives everyone the same answer. An adaptive system reacts to the situation now. A learning system uses what it has learned about a person. Each helps differently, and each fails differently.")}
      task={tt("You are Ilka at Harbour station. Your 08:12 is late. Get to your 09:30 meeting in Linden.")}
      feel={[tt("on my own"), tt("helped, in control")]}
      versions={[
        { id: "rule", label: tt("A rule"), render: (ctx) => <Delay ctx={ctx} kind="rule" />, insight: tt("In plain words: “if a train is more than 15 minutes late, tell everyone with a ticket”. Ilka gets the same message as every passenger and has to plan the rest herself. Predictable and easy to explain; it does not know her situation.") },
        { id: "situation", label: tt("The situation"), render: (ctx) => <Delay ctx={ctx} kind="situation" />, insight: tt("In plain words: the app knows where Ilka is now and where her ticket goes, so it offers the next train and its platform. It stores nothing about her; tomorrow it starts fresh.") },
        { id: "learned", label: tt("What it learned"), render: (ctx) => <Delay ctx={ctx} kind="learned" />, insight: tt("In plain words: from months of trips the app has learned her Tuesday routine and acted on it. Helpful when it is right; today it is Wednesday, she cannot see what it learned, and she has to undo its guess first.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · context, personal data, voice */

function Usual({ ctx, way }: { ctx: LabCtx; way: "context" | "personal" | "voice" }) {
  const [voice, setVoice] = useState<string[]>([tt("🔊 Where would you like to go?")]);
  if (ctx.finished) return <Done text={tt("Booked: Friday 18:19, Harbour to Elm Park")} />;
  if (way === "context")
    return (
      <AppScreen brand={Brand} color="#1F2937" status={tt("Harbour · Fri 17:58")}>
        <p className="font-bold">{tt("Departures from Harbour")}</p>
        {[["18:04", tt("Linden")], ["18:19", tt("Elm Park")], ["18:31", tt("Coastline")]].map(([t, d]) => <Row key={t} onClick={() => (t === "18:19" ? ctx.done(tt("Booked 18:19")) : ctx.miss(tt(`Booked ${t} to ${d}`)))}>{`${t} · ${d}`}</Row>)}
      </AppScreen>
    );
  if (way === "personal")
    return (
      <AppScreen brand={Brand} color="#1F2937" status={tt("Fri 17:58")}>
        <p className="rounded bg-[#FFFBEB] p-2">{tt("Your Friday trip: 18:19 Harbour → Elm Park. Book again?")}</p>
        <Btn onClick={() => ctx.done(tt("Booked in one tap"))}>{tt("Book again")}</Btn>
        <p className="text-[11px] text-[#475569]">{tt("Because you booked this trip on 9 Fridays. Change in Settings › Suggestions.")}</p>
      </AppScreen>
    );
  const say = (t: string, reply: string, end?: boolean) => { setVoice((v) => [...v, tt(`🗣 “${t}”`), reply]); if (end) ctx.done(tt("Booked by voice")); else ctx.hit(tt(`Said: ${t}`)); };
  return (
    <AppScreen brand={Brand} color="#1F2937" status={tt("Voice")}>
      <div aria-live="polite" className="space-y-1 text-[12.5px]">{voice.map((l, i) => <p key={i}>{l}</p>)}</div>
      <div className="flex flex-wrap gap-1">
        {voice.length === 1 && <button type="button" onClick={() => say(tt("Home"), tt("🔊 Home is Elm Park. The 18:19 from Harbour, like every Friday?"))} className="rounded-full border border-[#CBD5E1] px-2 py-1">{tt("“Home”")}</button>}
        {voice.length === 3 && <>
          <button type="button" onClick={() => say(tt("Yes"), tt("🔊 Booked: 18:19 to Elm Park."), true)} className="rounded-full border border-[#CBD5E1] px-2 py-1">{tt("“Yes”")}</button>
          <button type="button" onClick={() => { ctx.miss(tt("Said “no”")); setVoice((v) => [...v, tt("🗣 “No”"), tt("🔊 Sorry. Where would you like to go?")]); }} className="rounded-full border border-[#CBD5E1] px-2 py-1">{tt("“No”")}</button>
        </>}
      </div>
    </AppScreen>
  );
}

export function WaysLab() {
  return (
    <TaskLab
      label={tt("The Northline app adapting to context, personalising from data and steering the interaction by voice · a working product · Case assumption, example company")}
      point={tt("AI can guide, recommend, help and shorten an interaction in three different ways. Adapting to context uses the situation now and needs no data about the person. Personalising uses what is known and needs consent and good data. Steering, here by voice, shortens the dialogue; every guess it makes must be said back.")}
      task={tt("You are Mats, at Harbour on a Friday evening. Book your usual train home to Elm Park.")}
      feel={[tt("watched"), tt("helped")]}
      versions={[
        { id: "context", label: tt("Context: the situation now"), render: (ctx) => <Usual ctx={ctx} way="context" />, insight: tt("In plain words: the departures from the station he is at, now. It uses only his place and the time; if it guesses the station wrong, he sees it at once.") },
        { id: "personal", label: tt("Personal data: what is known"), render: (ctx) => <Usual ctx={ctx} way="personal" />, insight: tt("In plain words: one tap, because it knows his Friday trip. Very convenient, and it needs his history; if he moves house, it keeps suggesting the old trip until someone tells it.") },
        { id: "voice", label: tt("Steering, here by voice"), render: (ctx) => <Usual ctx={ctx} way="voice" />, insight: tt("In plain words: it asks only what it does not know and fills in the rest from his habits, and says back what it assumed. Shorter, but every guess has to be confirmed, because there is no screen to check.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · from not personal to far too personal */

function Message({ ctx, level }: { ctx: LabCtx; level: "none" | "fit" | "too" }) {
  if (ctx.finished) return <Done text={tt("Your 18:19 runs on time today")} />;
  const msg = {
    none: [tt("Service update"), tt("Engineering works this weekend on several lines. Delays possible on routes in the north and west. Read all notices.")],
    fit: [tt("Your trip today"), tt("Your 18:19 to Elm Park runs on time. Works only affect the weekend.")],
    too: [tt("Hi Mats 👋"), tt("We noticed you left work late three times this week and usually buy a coffee at Harbour. Your 18:19 runs on time. Since you're stressed, how about a weekend away? Offers for people like you ↓")],
  }[level];
  return (
    <AppScreen brand={Brand} color="#1F2937">
      <p className="font-bold">{msg[0]}</p>
      <p className="text-[12.5px]">{msg[1]}</p>
      {level === "none" && <button type="button" onClick={() => ctx.miss(tt("Opened all notices"))} className="text-[12px] underline">{tt("All notices (14)")}</button>}
      {level === "too" && <button type="button" onClick={() => ctx.miss(tt("Opened the offers"))} className="rounded bg-[#FCE7F3] px-2 py-1 text-[12px]">{tt("Weekend breaks for stressed commuters")}</button>}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Btn quiet onClick={() => ctx.miss(tt("Answered “affected”"))}>{tt("My train is affected")}</Btn>
        <Btn onClick={() => ctx.done(tt("Answered “runs on time”"))}>{tt("My train runs")}</Btn>
      </div>
    </AppScreen>
  );
}

export function PersonalLab() {
  return (
    <TaskLab
      label={tt("One Northline message from not personal at all to far too personal · a working product · Case assumption, example company")}
      point={tt("The same feature can help and harm. Relevance rises as a message fits the trip; past a point, more personal does not mean more helpful. It starts to feel like being watched, and it narrows what people see. Read each message and say how it felt.")}
      task={tt("You are Mats. From the message, find out whether your 18:19 home is affected today.")}
      feel={[tt("watched"), tt("looked after")]}
      versions={[
        { id: "none", label: tt("Not personal"), render: (ctx) => <Message ctx={ctx} level="none" />, insight: tt("In plain words: a notice for everyone. Safe, and Mats has to work out himself whether it touches his trip; many open all fourteen notices.") },
        { id: "fit", label: tt("Fits the trip"), render: (ctx) => <Message ctx={ctx} level="fit" />, insight: tt("In plain words: his trip, today, in one line. It uses his booking, which he expects the railway to know.") },
        { id: "too", label: tt("Far too personal"), render: (ctx) => <Message ctx={ctx} level="too" />, insight: tt("In plain words: it mentions when he leaves work and where he buys coffee, guesses he is stressed and sells him a weekend away. The answer is in there, but the message feels like being watched, and the offer narrows what he sees.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · why, change, undo */

type Q = { why: boolean; change: boolean; undo: boolean };
function Rebooked({ ctx, q }: { ctx: LabCtx; q: Q }) {
  const [view, setView] = useState<"home" | "options" | "tickets">("home");
  if (ctx.finished) return <Done text={tt("On the 10:05 to Linden")} />;
  if (view === "options")
    return (
      <AppScreen brand={Brand} color="#1F2937">
        <p className="font-bold">{tt("Other trains to Linden")}</p>
        {[["09:20", tt("arrives 10:01")], ["10:05", tt("arrives 10:44")]].map(([t, a]) => <Row key={t} onClick={() => (t === "10:05" ? ctx.done(tt("Chose the 10:05")) : ctx.miss(tt(`Chose ${t}`)))}>{`${t} · ${a}`}</Row>)}
      </AppScreen>
    );
  if (view === "tickets")
    return (
      <AppScreen brand={Brand} color="#1F2937">
        <p className="font-bold">{tt("My tickets")}</p>
        <p className="text-[12px]">{tt("09:20 to Linden (rebooked automatically)")}</p>
        <Btn quiet onClick={() => { setView("options"); ctx.miss(tt("Cancelled the ticket and searched again")); }}>{tt("Cancel ticket and search again")}</Btn>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color="#1F2937">
      <p className="rounded bg-[#E0E7FF] p-2 text-[12.5px]">{tt("Your 08:12 was cancelled. You are now on the 09:20 to Linden.")}</p>
      {q.why && <p className="text-[11.5px] text-[#475569]">{tt("Why: it's the first train with a seat that keeps your connection in Linden.")}</p>}
      {q.change && <Btn quiet onClick={() => { setView("options"); ctx.hit(tt("Opened other options")); }}>{tt("See other trains")}</Btn>}
      {q.undo && <button type="button" onClick={() => { setView("options"); ctx.hit(tt("Undid the rebooking")); }} className="text-[12px] underline">{tt("Undo, and choose myself")}</button>}
      {!q.change && !q.undo && <p className="pt-10 text-[10.5px] text-[#4B5563]"><button type="button" onClick={() => { setView("tickets"); ctx.miss(tt("Went to My tickets")); }} className="underline">{tt("My tickets")}</button></p>}
    </AppScreen>
  );
}

export function ThreeQuestionsLab() {
  const v = (id: string, label: string, q: Q, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Rebooked ctx={ctx} q={q} />, insight });
  return (
    <TaskLab
      label={tt("Northline's automatic rebooking with a reason, a way to change it and an undo · a working product · Case assumption, example company")}
      point={tt("Ask three questions of every automatic suggestion or action. Can the person see why (transparency)? Can they change or steer it (control)? Can they undo it if it is wrong (recoverability)? If all three answers are no, the feature needs redesign.")}
      task={tt("You are Ilka. The app has rebooked you, but you would rather take the 10:05. Get onto the 10:05.")}
      feel={[tt("at its mercy"), tt("in control")]}
      versions={[
        v("none", tt("No reason, no change, no undo"), { why: false, change: false, undo: false }, tt("In plain words: the app acted, says nothing about why, and offers no way out. Ilka has to cancel a ticket she never chose and search again.")),
        v("why", tt("A reason only"), { why: true, change: false, undo: false }, tt("In plain words: she understands the choice, and still cannot change it without cancelling.")),
        v("all", tt("Why, change and undo"), { why: true, change: true, undo: true }, tt("In plain words: a reason she can check, other trains one tap away, and an undo. The automation saves her time and leaves her in charge.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B · the personalisation console */

type Depth = "none" | "shallow" | "deep";
const JOURNEYS = (): { id: string; name: string; preview: Record<Depth, string>; who: Record<Depth, string> }[] => [
  { id: "remind", name: tt("Departure reminders"), preview: { none: tt("“Trains from Harbour: see the timetable.”"), shallow: tt("“Your 18:19 leaves in 30 minutes.”"), deep: tt("“Leave the office now: 12 minutes' walk, your 18:19 is on time.”") }, who: { none: tt("Product: a missed chance; reminders were the most wanted feature."), shallow: tt("Product and data protection: fine."), deep: tt("Product: wants it. Data protection: accepts it with an off switch, since bookings and walking time are reliable and a wrong reminder costs a minute.") } },
  { id: "price", name: tt("Price offers"), preview: { none: tt("“Saver fares on all routes.”"), shallow: tt("“Saver fares on your usual route, Harbour to Elm Park.” · Why? · Off"), deep: tt("“A special price just for you, Mats.”") }, who: { none: tt("Sales: too little."), shallow: tt("Sales, data protection and the brand: acceptable, with a reason and an off switch."), deep: tt("Data protection and the brand: no; prices that differ by who you are cost trust.") } },
  { id: "assist", name: tt("Travel assistance"), preview: { none: tt("“Tell us what help you need; a member of staff will confirm.”"), shallow: tt("“Need the ramp again, as last time?”"), deep: tt("“We booked a wheelchair ramp for you, based on your past trips.”") }, who: { none: tt("The risk says a person decides; efficiency would like automation."), shallow: tt("A suggestion is fine if staff still confirm."), deep: tt("A wrong guess strands a person. Nobody should own this risk.") } },
];
function Console({ ctx }: { ctx: LabCtx }) {
  const [d, setD] = useState<Record<string, Depth | undefined>>({});
  const js = JOURNEYS();
  return (
    <div className="space-y-2 rounded-lg border border-line bg-white p-3 text-[12.5px] text-ink">
      <p className="font-semibold">{tt("Northline · personalisation console (internal)")}</p>
      {js.map((j) => (
        <div key={j.id} className="space-y-1 rounded border border-line p-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold">{j.name}</span>
            <div role="radiogroup" aria-label={tt(`Depth for ${j.name}`)} className="flex gap-1">
              {(["none", "shallow", "deep"] as Depth[]).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={d[j.id] === k} onClick={() => {
                  const next = { ...d, [j.id]: k };
                  setD(next);
                  ctx.hit(tt(`${j.name}: ${k}`));
                  if (js.every((x) => next[x.id])) ctx.done(tt("All three journeys set"));
                }} className={clsx("rounded border px-2 py-0.5", d[j.id] === k ? "border-[#B45309] bg-[#B45309] text-white" : "border-line")}>{k === "none" ? tt("none") : k === "shallow" ? tt("shallow") : tt("deep")}</button>
              ))}
            </div>
          </div>
          {d[j.id] && (
            <>
              <p className="rounded bg-[#F8FAFC] px-2 py-1">{tt("Passenger sees:")} {j.preview[d[j.id]!]}</p>
              <p className="text-[11.5px] text-ash">{j.who[d[j.id]!]}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export function DepthLab() {
  return (
    <TaskLab
      label={tt("Northline's personalisation console: how deep personalisation goes in three journeys · a working product · Case assumption, example company")}
      point={tt("Personalisation is not one setting for the whole company. Decide it per journey: deep where the data is good and a mistake is harmless, shallow where it is costly or the data is poor, none where a person must decide. Each choice has someone for it and someone against it. Set each journey and see what passengers would get.")}
      task={tt("You are the head of digital at Northline. Set the depth for each of the three journeys.")}
      stresses={["ping"]}
      device="desktop"
      versions={[{ id: "console", label: tt("The console"), render: (ctx) => <Console ctx={ctx} />, insight: tt("In plain words: departure reminders can go deep, because bookings and walking time are reliable and a wrong reminder costs a minute; price offers stay by route, with a reason and an off switch; travel assistance stays with a person, because a wrong guess strands someone. There is no single right setting, only reasons someone will hold you to.") }]}
    />
  );
}
