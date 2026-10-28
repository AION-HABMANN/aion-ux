"use client";

import clsx from "clsx";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { GUIDE } from "@/data/day11/experience";
import { SPEC } from "@/data/day11/free";
import { MATERIALS, MATERIAL_PLAIN } from "@/data/day11/materials";
import { canSpeak, speak } from "@/components/sim/VoiceSim";
import { blockKey } from "@/lib/dayFree/model";
import { freeTaskBlocks } from "@/lib/dayFree/progress";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/**
 * Day 11 · the day practises what it teaches (UX-STANDARD 2.15). At the top of each route a voice guide for this page: type a command, or speak it where the browser
 * offers speech recognition, and it answers in one short sentence, aloud if you like. It meets card A2's six requirements (dialogue logic, clear expectations,
 * feedback, error handling, repeatability, user control), and the Inspector says where. An opt-in badly designed version shows the hotline loop and the long
 * spoken menu. It counts only what the lab already counts (cards marked read, blocks complete); it never scores an answer and never enters the missing list or the
 * export.
 */
type Route = 1 | 2;
type Unit = { id: string; kind: "card" | "block"; title: string; short: string; anchor: string; done: boolean };

function useUnits(route: Route): Unit[] {
  const p = usePersisted();
  const blocks = freeTaskBlocks(p, SPEC);
  const cards = MATERIALS.filter((m) => (route === 1 ? m.block === "A" : m.block === "B"));
  const bl = route === 1 ? SPEC.blocks1 : [SPEC.block2];
  return [
    ...cards.map((m) => ({ id: m.id, kind: "card" as const, title: m.title, short: tt(`card ${m.id}`), anchor: `mat-${m.id}`, done: !!p.ui.sectionsRead[`d11:${m.id}`] })),
    ...bl.map((b) => ({ id: b.id, kind: "block" as const, title: b.title, short: tt(`Block ${b.id}`), anchor: `block-${b.id.replace(".", "-")}`, done: !!blocks[blockKey(b.id)] })),
  ];
}

type SR = { lang: string; start: () => void; onresult: ((e: { results: { 0: { transcript: string } }[] }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null };
const recognizer = (): (new () => SR) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

function Tag({ on, children }: { on: boolean; children: string }) {
  if (!on) return null;
  return <span className="ml-1 inline-block rounded border border-[#B23A0A] bg-[#FBEDE6] px-1.5 py-0.5 align-middle text-micro font-semibold normal-case tracking-normal text-[#7A2A08]">⚙ {children}</span>;
}

/** The badly designed version, opt-in: a long menu and a loop. Nothing here does anything. */
function Bad() {
  const uid = useId();
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<string[]>([GUIDE.badMenu]);
  return (
    <div className="space-y-2 rounded-lg border-2 border-[#1F2937] bg-[#111827] p-3 text-white">
      <ul aria-live="polite" className="max-h-[180px] space-y-1 overflow-y-auto text-[13px]">
        {log.map((m, k) => <li key={k}>🔊 {m}</li>)}
      </ul>
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const x = draft.trim();
          if (!x) return;
          const reply = /repeat|help|menu/i.test(x) ? GUIDE.badMenu : tt("I didn't catch that. Please say a valid command.");
          setLog((l) => [...l, `› ${x}`, reply]);
          setDraft("");
          if (canSpeak()) speak(reply);
        }}
      >
        <label htmlFor={`${uid}-bad`} className="sr-only">{tt("Command for the badly designed guide")}</label>
        <input id={`${uid}-bad`} value={draft} onChange={(e) => setDraft(e.target.value)} className="min-h-[40px] min-w-0 flex-1 rounded border border-[#4B5563] bg-[#1F2937] px-2 text-[14px] text-white" placeholder={tt("Say something …")} autoComplete="off" />
        <button type="submit" className="min-h-[40px] rounded bg-[#374151] px-3 text-[14px] font-semibold">{tt("Say it")}</button>
        <button type="button" onClick={() => speak(GUIDE.badMenu)} className="min-h-[40px] rounded bg-[#374151] px-3 text-[14px] font-semibold">🔊 {tt("Hear the menu")}</button>
      </form>
      <p className="text-micro text-[#E5E7EB]">{tt("Demonstration of a badly designed voice guide: nine options in one breath, no hint what works, and the same sentence for every miss. None of it does anything. Try to remember option six, then switch it off.")}</p>
    </div>
  );
}

export function Day11Experience({ route }: { route: Route }) {
  const uid = useId();
  const hydrated = useHydrated();
  const units = useUnits(route);
  const [log, setLog] = useState<{ who: "you" | "it"; text: string }[]>([]);
  const [draft, setDraft] = useState("");
  const [aloud, setAloud] = useState(false);
  const [inspect, setInspect] = useState(false);
  const [bad, setBad] = useState(false);
  const [misses, setMisses] = useState(0);
  const [micOk, setMicOk] = useState(false);
  const [ttsOk, setTtsOk] = useState(false);
  const [listening, setListening] = useState(false);
  const last = useRef("");
  useEffect(() => {
    setMicOk(!!recognizer());
    setTtsOk(canSpeak());
    return () => {
      if (canSpeak()) window.speechSynthesis.cancel();
    };
  }, []);

  const open = useMemo(() => units.filter((u) => !u.done), [units]);
  const next = hydrated ? open[0] : undefined;
  const done = hydrated ? units.length - open.length : 0;

  const say = (text: string, forceAloud = false) => {
    last.current = text;
    setLog((l) => [...l.slice(-5), { who: "it", text }]);
    if ((aloud || forceAloud) && canSpeak()) speak(text);
  };
  const go = (u: Unit) => document.getElementById(u.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handle = (raw: string) => {
    const x = raw.trim();
    if (!x) return;
    setLog((l) => [...l.slice(-5), { who: "you", text: x }]);
    setDraft("");
    const q = x.toLowerCase();
    const target = units.find((u) => q.includes(u.id.toLowerCase()));
    if (/\bstop\b|quiet|be quiet/.test(q)) {
      setMisses(0);
      if (canSpeak()) window.speechSynthesis.cancel();
      last.current = tt("Stopped.");
      setLog((l) => [...l.slice(-5), { who: "it", text: tt("Stopped.") }]);
      return;
    }
    if (/repeat|again|say that/.test(q)) {
      setMisses(0);
      return say(last.current || tt("Nothing to repeat yet. Say: next."), true);
    }
    if (/help|what can i say|commands/.test(q)) {
      setMisses(0);
      return say(tt(`You can say: ${GUIDE.commands.join(", ")}. Or a card or block, for example “card A3”.`));
    }
    if (/where|progress|how far/.test(q)) {
      setMisses(0);
      return say(next ? tt(`You have done ${done} of ${units.length}. Next is ${next.short}. Say next to go there.`) : tt(`You have done all ${units.length}. Nothing is left in this route.`));
    }
    if (/read/.test(q)) {
      setMisses(0);
      const u = target ?? next;
      if (!u) return say(tt("Everything is done; there is nothing left to read."));
      if (u.kind === "block") return say(tt(`${u.short} is a task, not a card. Say next to go there; I read cards only.`));
      const idea = (MATERIAL_PLAIN as Record<string, { idea: string }>)[u.id]?.idea ?? "";
      go(u);
      say(tt(`Reading ${u.short}, in plain words. Say stop to stop.`));
      if (canSpeak()) speak(idea);
      return;
    }
    if (target) {
      setMisses(0);
      go(target);
      return say(tt(`Going to ${target.short}: ${target.title}.`));
    }
    if (/next|go|continue/.test(q)) {
      setMisses(0);
      if (!next) return say(tt("Everything in this route is done."));
      go(next);
      return say(tt(`Going to ${next.short}: ${next.title}. Say read it to hear it.`));
    }
    const m = misses + 1;
    setMisses(m);
    say(m === 1 ? tt("I did not catch that. You can say: next, read it, repeat, where am I, or stop.") : tt("I still did not catch that. Choose one of the buttons below, or type it."));
  };

  const listen = () => {
    const R = recognizer();
    if (!R || listening) return;
    const r = new R();
    r.lang = "en-GB";
    r.onresult = (e) => handle(e.results[0][0].transcript);
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    setListening(true);
    r.start();
  };

  return (
    <section aria-labelledby="voiceguide-h" className="card space-y-3 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="smallcaps text-accent">{tt("Today you learn voice interfaces by using one")}</p>
          <h2 id="voiceguide-h" className="text-h3">{tt(`Your voice guide · ${done} of ${units.length} done`)}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={inspect} onClick={() => setInspect((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", inspect ? "border-[#B23A0A] bg-[#FBEDE6] text-[#7A2A08]" : "border-line bg-paper text-ink hover:border-ash")}>
            {inspect ? tt("⚙ Hide how it is built") : tt("⚙ How is this voice guide built?")}
          </button>
          <button type="button" aria-pressed={bad} onClick={() => setBad((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", bad ? "border-[#1F2937] bg-[#E5E7EB] text-ink" : "border-line bg-paper text-ink hover:border-ash")}>
            {bad ? tt("Switch the bad version off") : tt("Show a badly designed version (a demonstration)")}
          </button>
        </div>
      </div>

      <p className="text-caption text-ink">
        {tt(`You can say: ${GUIDE.commands.join(" · ")} · or a card or block, such as “card A3”.`)}
        <Tag on={inspect}>{tt("Clear expectations")}</Tag>
      </p>

      <div role="log" aria-live="polite" aria-label={tt("Voice guide conversation")} className="space-y-1 text-body">
        {log.length === 0 ? (
          <p className="text-ash">{next ? tt(`Say “next” to go to ${next.short}, or “read it” to hear it.`) : hydrated ? tt("Everything in this route is done.") : tt("Loading your progress…")}</p>
        ) : (
          log.map((m, k) => (
            <p key={k} className={m.who === "you" ? "text-ash" : "text-ink"}>
              {m.who === "you" ? `› ${m.text}` : `🔊 ${m.text}`}
              {m.who === "it" && k === log.length - 1 && <Tag on={inspect}>{tt("Feedback")}</Tag>}
            </p>
          ))
        )}
      </div>

      {misses >= 2 && (
        <div className="flex flex-wrap gap-1.5">
          {GUIDE.commands.map((c) => (
            <button key={c} type="button" onClick={() => handle(c)} className="min-h-[40px] rounded-full border border-line bg-paper px-3 text-caption text-ink hover:border-ash">{c}</button>
          ))}
          <Tag on={inspect}>{tt("Error handling, second miss")}</Tag>
        </div>
      )}

      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handle(draft);
        }}
      >
        <label htmlFor={`${uid}-cmd`} className="sr-only">{tt("Command for the voice guide")}</label>
        <input id={`${uid}-cmd`} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={tt("Type a command, for example: next")} className="min-h-[40px] min-w-0 flex-1 rounded border border-line px-3 text-body" autoComplete="off" />
        <button type="submit" className="btn-primary btn-sm min-h-[40px]">{tt("Say it")}</button>
        {micOk && (
          <button type="button" onClick={listen} aria-pressed={listening} className="btn btn-sm min-h-[40px] border border-line bg-paper">{listening ? tt("● Listening …") : tt("🎤 Speak")}</button>
        )}
        {ttsOk && (
          <label className="inline-flex min-h-[40px] items-center gap-2 text-caption text-ink">
            <input type="checkbox" checked={aloud} onChange={(e) => setAloud(e.target.checked)} className="h-4 w-4" />
            {tt("Answer aloud")}
            <Tag on={inspect}>{tt("User control")}</Tag>
          </label>
        )}
      </form>

      {inspect && (
        <div className="space-y-1 rounded-lg border border-[#E8C3B0] bg-[#FDF7F3] p-3 text-caption text-ink">
          <p className="font-semibold">{tt("The six requirements of card A2, and where this guide meets them")}</p>
          <ul className="space-y-0.5">
            {GUIDE.requirements.map((r) => (
              <li key={r.name}>✓ <span className="font-semibold">{r.name}</span>: {r.where}</li>
            ))}
          </ul>
          <p className="text-ash">{tt("It is rule-based: a few commands, matched by words, the same answer every time. Speaking uses your browser's own speech recognition; some browsers send the audio to their maker's service to recognise it. This page sends nothing and stores nothing.")}</p>
        </div>
      )}

      {bad && <Bad />}
    </section>
  );
}
