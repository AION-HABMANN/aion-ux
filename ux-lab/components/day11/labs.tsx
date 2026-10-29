"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { speak } from "@/components/sim/VoiceSim";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the working products of the study cards (UX-STANDARD 2.16): Ladle, a made-up cooking app with a voice assistant, so no task is answered here. Each lab
 * gives one task and versions of the same app to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx). What the assistant says is spoken
 * aloud through the browser's own speech synthesis where available and shown as text; what the learner "says" is chosen from quick replies or typed, so no
 * microphone is used.
 */
const ACC = "#C2410C";
const Brand = "Ladle";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

/** A spoken dialogue: the assistant's lines are spoken and written; the learner taps what they say. */
function Dialogue({ lines, replies }: { lines: string[]; replies: [string, () => void][] }) {
  return (
    <div className="space-y-2">
      <div aria-live="polite" className="max-h-44 space-y-1 overflow-y-auto rounded bg-[#FFF7ED] p-2 text-[12.5px]">
        {lines.map((l, i) => <p key={i} className={l.startsWith("🗣") ? "text-right" : ""}>{l}</p>)}
      </div>
      <div className="flex flex-wrap gap-1">
        {replies.map(([t, f]) => <button key={t} type="button" onClick={f} className="rounded-full border border-[#FDBA74] bg-white px-2.5 py-1 text-[12px]">{`“${t}”`}</button>)}
      </div>
    </div>
  );
}
function useTalk(first: string) {
  const [lines, setLines] = useState<string[]>([`🔊 ${first}`]);
  const say = (you: string, reply?: string) => {
    setLines((l) => [...l, `🗣 ${you}`, ...(reply ? [`🔊 ${reply}`] : [])]);
    if (reply) speak(reply);
  };
  return { lines, say };
}

/* ------------------------------------------------------------------ A1 · screen, chat, voice */

function Modes({ ctx, mode }: { ctx: LabCtx; mode: "screen" | "chat" | "voice" }) {
  const [serv, setServ] = useState(4);
  const [timer, setTimer] = useState(0);
  const [text, setText] = useState("");
  const [log, setLog] = useState<string[]>([tt("Ladle: Hi! What can I do?")]);
  const t = useTalk(tt("Ladle is listening. What would you like?"));
  const id = useId();
  const check = (s: number, tm: number) => { if (s === 8 && tm === 25) ctx.done(tt("8 servings and a 25-minute timer")); };
  if (ctx.finished) return <Done text={tt("Bread dough for 8 · flour 1 kg, water 600 ml · timer 25:00 running")} />;
  if (mode === "screen")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="font-bold">{tt("Bread dough")}</p>
        <div className="flex items-center gap-2">{tt("Servings")}<button type="button" aria-label={tt("Fewer")} onClick={() => setServ((s) => Math.max(1, s - 1))} className="h-8 w-8 rounded border">−</button><span aria-live="polite">{serv}</span><button type="button" aria-label={tt("More")} onClick={() => { const n = serv + 1; setServ(n); ctx.hit(tt(`Servings: ${n}`)); check(n, timer); }} className="h-8 w-8 rounded border">+</button></div>
        <p className="text-[12px] text-[#475569]">{tt(`Flour ${serv * 125} g · water ${serv * 75} ml`)}</p>
        <div className="flex flex-wrap gap-1">{[10, 15, 25, 40].map((m) => <button key={m} type="button" onClick={() => { setTimer(m); (m === 25 ? ctx.hit : ctx.miss)(tt(`Timer ${m} min`)); check(serv, m); }} className={clsx("rounded border px-2 py-1", timer === m && "border-[#C2410C] bg-[#FFF7ED]")}>{tt(`${m} min`)}</button>)}</div>
      </AppScreen>
    );
  if (mode === "chat")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <div className="max-h-40 space-y-1 overflow-y-auto text-[12.5px]">{log.map((l, i) => <p key={i}>{l}</p>)}</div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const m = text.toLowerCase();
          const sv = /(\d+)\s*(serv|portion|people)/.exec(m);
          const tm = /(\d+)\s*(min|minute)/.exec(m);
          const ns = sv ? Number(sv[1]) : serv;
          const nt = tm ? Number(tm[1]) : timer;
          setServ(ns); setTimer(nt);
          setLog((l) => [...l, tt(`You: ${text}`), sv || tm ? tt(`Ladle: ${sv ? `scaled to ${ns} servings. ` : ""}${tm ? `timer set to ${nt} minutes.` : ""}`) : tt("Ladle: sorry, I didn't get that. Try “8 servings” or “timer 25 minutes”.")]);
          (sv || tm ? ctx.hit : ctx.miss)(tt(`Typed: ${text}`));
          setText("");
          check(ns, nt);
        }} className="flex gap-1">
          <label htmlFor={id} className="sr-only">{tt("Message")}</label>
          <input id={id} value={text} onChange={(e) => setText(e.target.value)} placeholder={tt("Type a message")} className="flex-1 rounded border border-[#94A3B8] px-2 py-1" />
          <button type="submit" className="rounded px-2 text-white" style={{ background: ACC }}>{tt("Send")}</button>
        </form>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC} status={tt("🎙 listening")}>
      <Dialogue lines={t.lines} replies={[
        [tt("Make it for eight"), () => { setServ(8); t.say(tt("Make it for eight"), tt("Eight servings: one kilo of flour, six hundred millilitres of water, twenty grams of yeast.")); ctx.hit(tt("Scaled by voice")); check(8, timer); }],
        [tt("Set a timer for twenty-five minutes"), () => { setTimer(25); t.say(tt("Set a timer for twenty-five minutes"), tt("Timer set: twenty-five minutes.")); ctx.hit(tt("Timer by voice")); check(serv, 25); }],
        [tt("How much water was that?"), () => { t.say(tt("How much water was that?"), serv === 8 ? tt("Six hundred millilitres.") : tt("Three hundred millilitres.")); ctx.miss(tt("Had to ask again: nothing to look at")); }],
      ]} />
    </AppScreen>
  );
}

export function ModesLab() {
  return (
    <TaskLab
      label={tt("One Ladle task, scaling a recipe and setting a timer, on a screen, in a chat and by voice · a working product · Case assumption, example company")}
      point={tt("The same task feels different on a screen, in a chat and by voice. A screen shows every option at once; a chat leaves a written record; voice leaves nothing to look at. Voice wins when hands and eyes are busy and the answer is short; it loses when there is much to compare or remember. Turn your sound on for the voice version.")}
      task={tt("You are Noor, hands covered in dough. Scale the bread to 8 servings and set a 25-minute timer.")}
      versions={[
        { id: "screen", label: tt("On a screen"), render: (ctx) => <Modes ctx={ctx} mode="screen" />, insight: tt("In plain words: servings, amounts and the timer at once, to check as often as she likes. But her hands are covered in dough, and the phone is across the counter.") },
        { id: "chat", label: tt("In a chat"), render: (ctx) => <Modes ctx={ctx} mode="chat" />, insight: tt("In plain words: one typed line, one written answer she can scroll back to. A record helps; typing with floury fingers does not.") },
        { id: "voice", label: tt("By voice"), render: (ctx) => <Modes ctx={ctx} mode="voice" />, insight: tt("In plain words: hands-free, fast, natural: three amounts in one breath. Could you repeat the amount of water without asking again? Voice leaves nothing to look at.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the six requirements of a voice dialogue */

type Req = { logic: boolean; expect: boolean; feedback: boolean; errors: boolean; repeat: boolean; control: boolean };
function Swap({ ctx, r }: { ctx: LabCtx; r: Req }) {
  const t = useTalk(r.expect ? tt("You can ask me to swap an ingredient, scale the recipe or read a step. What would you like?") : tt("Yes?"));
  const [stage, setStage] = useState(0);
  const [fails, setFails] = useState(0);
  if (ctx.finished) return <Done text={tt("Cake: butter swapped for 180 ml sunflower oil")} />;
  const misheard = () => {
    const n = fails + 1;
    setFails(n);
    ctx.miss(tt("Not understood"));
    t.say(tt("Butter … oil … the cake"), r.errors ? tt("I heard “butter” and “oil”. Do you want to replace the butter with oil? Say yes or no.") : tt("Sorry, I didn't understand that."));
    if (r.errors) setStage(1);
  };
  const replies: [string, () => void][] = [];
  if (stage === 0) {
    replies.push([tt("Swap the butter for oil"), () => { setStage(1); ctx.hit(tt("Asked for the swap")); t.say(tt("Swap the butter for oil"), r.logic ? tt("Replace 200 grams of butter with oil. Is that right?") : tt("OK. Do you also want to scale the recipe, read the next step, or set a timer? And which oil?")); }]);
    replies.push([tt("Butter … oil … the cake"), misheard]);
  } else if (stage === 1) {
    replies.push([tt("Yes"), () => { setStage(2); t.say(tt("Yes"), r.feedback ? tt("Done: 200 grams of butter replaced with 180 millilitres of sunflower oil. Step 2 now says oil.") : tt("OK.")); if (!r.feedback) ctx.miss(tt("No feedback: did it change?")); }]);
    if (r.control) replies.push([tt("No, stop"), () => { setStage(0); ctx.hit(tt("Cancelled and started again")); t.say(tt("No, stop"), tt("Stopped. Nothing was changed.")); }]);
  } else {
    if (r.repeat) replies.push([tt("Say that again"), () => { ctx.hit(tt("Asked for a repeat")); t.say(tt("Say that again"), tt("180 millilitres of sunflower oil instead of butter.")); }]);
    else replies.push([tt("Say that again"), () => { ctx.miss(tt("Repeat not supported")); t.say(tt("Say that again"), tt("Sorry, I didn't understand that.")); }]);
    replies.push([tt("Thanks"), () => ctx.done(tt("Swap confirmed"))]);
  }
  return (
    <AppScreen brand={Brand} color={ACC} status={tt("🎙 listening")}>
      <Dialogue lines={t.lines} replies={replies} />
      {fails > 1 && !r.errors && <p className="text-[11.5px] text-[#475569]">{tt("(The same sentence again. Try the other wording.)")}</p>}
    </AppScreen>
  );
}

export function RequirementsLab() {
  const v = (id: string, label: string, r: Req, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Swap ctx={ctx} r={r} />, insight });
  return (
    <TaskLab
      label={tt("One Ladle voice dialogue with and without the six requirements of a good voice interface · a working product · Case assumption, example company")}
      point={tt("A good voice dialogue needs six things: clear dialogue logic (one thing at a time), clear expectations (what can I say?), feedback (what did it understand and do?), error handling (a better question, not the same sentence), repeatability (say that again) and control (stop, undo). Try mumbling first, as people do with flour on their hands.")}
      task={tt("You are Ole. In the cake recipe, replace the butter with oil, and make sure it happened.")}
      stresses={["hurry", "ping"]}
      versions={[
        v("none", tt("None of the six"), { logic: false, expect: false, feedback: false, errors: false, repeat: false, control: false }, tt("In plain words: “Yes?” tells Ole nothing about what he can say, it asks three things at once, repeats “Sorry, I didn't understand that”, answers “OK” without saying what it did, and has no stop or repeat.")),
        v("half", tt("Logic, expectations and feedback"), { logic: true, expect: true, feedback: true, errors: false, repeat: false, control: false }, tt("In plain words: it says what he can ask, one thing at a time, and confirms what it changed; a mumble still gets the same useless sentence, and there is no stop or repeat.")),
        v("all", tt("All six"), { logic: true, expect: true, feedback: true, errors: true, repeat: true, control: true }, tt("In plain words: a mumble gets a better question with what it heard, he can stop, it says what it did and repeats it on request. The dialogue carries him.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · a spoken answer, from calm to busy */

function Spoken({ ctx, busy }: { ctx: LabCtx; busy: boolean }) {
  const [heard, setHeard] = useState(false);
  const [show, setShow] = useState(false);
  const id = useId();
  const [ans, setAns] = useState("");
  const text = busy
    ? tt("Great choice! Pancakes are our most popular recipe this week, with over two thousand cooks. For four people you need two hundred grams of flour, three eggs, a pinch of salt, and four hundred millilitres of milk, plus one tablespoon of melted butter. Did you know Ladle Premium has video lessons? Also, don't forget to rate this recipe!")
    : tt("For four people: two hundred grams of flour, three eggs, four hundred millilitres of milk.");
  if (ctx.finished) return <Done text={tt("Milk: 400 ml")} />;
  return (
    <AppScreen brand={Brand} color={ACC} status={tt("🔊 speaking")}>
      <button type="button" onClick={() => { speak(text); setHeard(true); ctx.hit(tt("Listened")); }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{heard ? tt("🔊 Play again") : tt("🔊 Ask: “What do I need for pancakes?”")}</button>
      <button type="button" onClick={() => { setShow((s) => !s); ctx.miss(tt("Read the text instead of listening")); }} className="text-[11.5px] underline">{show ? tt("Hide the text") : tt("No sound? Show the text (counts as a look)")}</button>
      {show && <p className="rounded bg-[#FFF7ED] p-2 text-[12px]">{text}</p>}
      <label htmlFor={id} className="block text-[12px] font-semibold">{tt("How much milk?")}</label>
      <select id={id} value={ans} onChange={(e) => { setAns(e.target.value); e.target.value === "400" ? ctx.done(tt("Remembered 400 ml")) : ctx.miss(tt(`Answered ${e.target.value} ml`)); }} className="w-full rounded border border-[#94A3B8] px-2 py-1">
        <option value="">{tt("choose")}</option>
        {["200", "300", "400", "600"].map((m) => <option key={m} value={m}>{tt(`${m} ml`)}</option>)}
      </select>
    </AppScreen>
  );
}

export function LoadLab() {
  return (
    <TaskLab
      label={tt("One Ladle spoken answer, calm and busy · a working product · Case assumption, example company")}
      point={tt("Neuro-design asks for predictability, relief, trust, a clear mental model and fewer stimuli. Each extra sentence in a spoken answer competes for the same small working memory. Listen once, without reading, and answer from memory.")}
      task={tt("You are Piet. Ask what you need for pancakes, listen once, then say how much milk.")}
      stresses={["ping", "hurry"]}
      versions={[
        { id: "calm", label: tt("Calm"), render: (ctx) => <Spoken ctx={ctx} busy={false} />, insight: tt("In plain words: three amounts, in the order he needs them, nothing else. One listen is enough.") },
        { id: "busy", label: tt("Busy"), render: (ctx) => <Spoken ctx={ctx} busy />, insight: tt("In plain words: praise, a statistic, five ingredients with the milk in the middle, an advert and a request for a rating. The amount he needed is gone by the time it stops talking.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B · how free the voice dialogue may be */

function Journey({ ctx, j }: { ctx: LabCtx; j: "timer" | "allergy" | "pay" }) {
  const t = useTalk(tt("Ladle is listening."));
  const [screen, setScreen] = useState(false);
  if (ctx.finished) return <Done text={j === "timer" ? tt("Timer 12 minutes running") : j === "allergy" ? tt("Confirmed on screen: the pesto contains pine nuts") : tt("Basket checked and paid on screen")} />;
  if (j === "timer")
    return <AppScreen brand={Brand} color={ACC}><Dialogue lines={t.lines} replies={[[tt("Remind me in twelve minutes"), () => { t.say(tt("Remind me in twelve minutes"), tt("Timer: twelve minutes.")); ctx.done(tt("Set by free speech")); }], [tt("Twelve-minute timer please"), () => { t.say(tt("Twelve-minute timer please"), tt("Timer: twelve minutes.")); ctx.done(tt("Set by free speech")); }]]} /></AppScreen>;
  if (j === "allergy")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <Dialogue lines={t.lines} replies={[[tt("Is there nuts in the pesto?"), () => { setScreen(true); ctx.hit(tt("Asked about nuts")); t.say(tt("Is there nuts in the pesto?"), tt("Yes: pine nuts. I've put the full ingredient list on your screen.")); }]]} />
        {screen && <div className="rounded border-2 border-[#C2410C] p-2 text-[12px]"><p className="font-bold">{tt("Pesto · contains: pine nuts, parmesan (milk)")}</p><p className="text-[11px] text-[#475569]">{tt("Source: ingredient list checked by the nutrition team, 3 March")}</p><button type="button" onClick={() => ctx.done(tt("Read the list on screen"))} className="mt-1 rounded px-2 py-0.5 text-white" style={{ background: ACC }}>{tt("I've checked it")}</button></div>}
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      <Dialogue lines={t.lines} replies={[[tt("Order the ingredients and pay"), () => { setScreen(true); ctx.hit(tt("Basket filled by voice")); t.say(tt("Order the ingredients and pay"), tt("I've filled your basket with 7 items. Please check and pay on the screen.")); }]]} />
      {screen && <div className="space-y-1 rounded border border-[#CBD5E1] p-2 text-[12px]"><p className="font-bold">{tt("Basket · 7 items")}</p><p>{tt("flour, eggs, milk, basil, pine nuts, parmesan, olive oil")}</p><button type="button" onClick={() => ctx.done(tt("Paid on screen"))} className="w-full rounded py-1.5 font-bold text-white" style={{ background: ACC }}>{tt("Pay")}</button></div>}
    </AppScreen>
  );
}

export function FreedomLab() {
  return (
    <TaskLab
      label={tt("Three Ladle journeys and how free the voice dialogue may be in each · a working product · Case assumption, example company")}
      point={tt("Comfort, precision, trust, effort, robustness and scalability pull against each other. Decide per journey: free speech where a mistake is cheap, voice with a screen where precision matters, a screen or a person where a mistake costs health or money.")}
      task={tt("You are Freya, testing Ladle. Do one thing in each journey.")}
      stresses={["hurry"]}
      versions={[
        { id: "timer", label: tt("Timers: free speech"), render: (ctx) => <Journey ctx={ctx} j="timer" />, insight: tt("In plain words: say it any way you like. Comfort wins, because a wrong timer costs a minute and the read-back catches it.") },
        { id: "allergy", label: tt("Allergies: voice and screen"), render: (ctx) => <Journey ctx={ctx} j="allergy" />, insight: tt("In plain words: precision wins over comfort: voice answers, the screen confirms, and the source is a list checked by people. Product would like a free AI answer; the nutrition team says no.") },
        { id: "pay", label: tt("Paying: screen only"), render: (ctx) => <Journey ctx={ctx} j="pay" />, insight: tt("In plain words: voice fills the basket, the screen takes the payment. Sales would like one-sentence ordering; trust and error robustness say a person checks what they pay.") },
      ]}
    />
  );
}
