"use client";

import clsx from "clsx";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { tt } from "@/lib/lang";

/**
 * A scripted voice assistant (UX Day 11, "show it real"): the learner types, or speaks where the browser offers speech recognition, and the assistant answers from
 * keyword rules, first match wins, so the same input always gives the same reply. Replies can be read aloud with the browser's own speech synthesis. No network, no
 * model, nothing stored by this page; typed input stays in this browser tab (speech recognition, where used, is the browser's own service). Planted flaws (a repeated standard answer, a technical error, an unasked suggestion) are data in the
 * config, written to match the plan's description, and are never marked as right or wrong.
 */
export type VoiceRule = {
  /** Lower-case fragments; the rule fires if the input contains any of them. */
  keys: string[];
  /** The reply; a list gives the next line each time the rule fires again (the last one repeats). */
  say: string | string[];
  /** Device states the reply changes, for an assistant that controls things. */
  set?: Record<string, string>;
  /** Choices the product itself shows or offers after this reply (tapping one sends it). */
  chips?: string[];
  /** Lines the product shows on its screen after this reply (a voice assistant with a screen). */
  screen?: string[];
};
export type VoiceCfg = {
  name: string;
  color: string;
  greeting: string;
  rules: VoiceRule[];
  /** Said when nothing matches; a list escalates with each miss in a row (the last one repeats). */
  fallback: string | string[];
  /** Choices the product shows from the start (only if the product really does). */
  chips?: string[];
  /** A screen next to the voice (a multimodal assistant): its first lines. */
  screen?: string[];
  /** Things the product controls, with their state. */
  devices?: { id: string; label: string; value: string }[];
};

type Line = { who: "you" | "it"; text: string };

type SR = { lang: string; interimResults: boolean; maxAlternatives: number; start: () => void; stop: () => void; onresult: ((e: { results: { 0: { transcript: string } }[] }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null };
const recognizer = (): (new () => SR) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

export function speak(text: string, rate = 1) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.rate = rate;
  window.speechSynthesis.speak(u);
  return true;
}
export const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;

/** A small "Hear it" button for a written voice line (the cards' phones). */
export function HearIt({ text, label }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(canSpeak()), []);
  if (!ok) return null;
  return (
    <button type="button" onClick={() => speak(text)} className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink hover:border-ash">
      🔊 {label ?? tt("Hear it")}
    </button>
  );
}

export function VoiceSim({ cfg, tryThese }: { cfg: VoiceCfg; tryThese?: string[] }) {
  const uid = useId().replace(/:/g, "");
  const [log, setLog] = useState<Line[]>([{ who: "it", text: cfg.greeting }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [aloud, setAloud] = useState(false);
  const [listening, setListening] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const [ttsOk, setTtsOk] = useState(false);
  const [chips, setChips] = useState<string[]>(cfg.chips ?? []);
  const [screen, setScreen] = useState<string[] | undefined>(cfg.screen);
  const [devices, setDevices] = useState(cfg.devices ?? []);
  const fired = useRef<Record<number, number>>({});
  const misses = useRef(0);
  const aloudRef = useRef(aloud);
  const endRef = useRef<HTMLDivElement>(null);
  aloudRef.current = aloud;

  useEffect(() => {
    setMicOk(!!recognizer());
    setTtsOk(canSpeak());
    return () => {
      if (canSpeak()) window.speechSynthesis.cancel();
    };
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [log, busy]);

  const answer = useCallback(
    (input: string) => {
      const q = input.toLowerCase();
      const i = cfg.rules.findIndex((r) => r.keys.some((k) => q.includes(k)));
      let text: string;
      if (i >= 0) {
        misses.current = 0;
        const r = cfg.rules[i];
        const n = fired.current[i] ?? 0;
        fired.current[i] = n + 1;
        text = Array.isArray(r.say) ? r.say[Math.min(n, r.say.length - 1)] : r.say;
        if (r.set) setDevices((d) => d.map((x) => (r.set![x.id] ? { ...x, value: r.set![x.id] } : x)));
        setChips(r.chips ?? cfg.chips ?? []);
        if (r.screen) setScreen(r.screen);
      } else {
        const f = cfg.fallback;
        text = Array.isArray(f) ? f[Math.min(misses.current, f.length - 1)] : f;
        misses.current += 1;
        setChips(cfg.chips ?? []);
      }
      return text;
    },
    [cfg],
  );

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    setLog((l) => [...l, { who: "you", text }]);
    setDraft("");
    setBusy(true);
    window.setTimeout(() => {
      const reply = answer(text);
      setLog((l) => [...l, { who: "it", text: reply }]);
      setBusy(false);
      if (aloudRef.current) speak(reply);
    }, 550);
  };

  const listen = () => {
    const R = recognizer();
    if (!R || listening) return;
    const r = new R();
    r.lang = "en-GB";
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.onresult = (e) => send(e.results[0][0].transcript);
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    setListening(true);
    r.start();
  };

  const reset = () => {
    fired.current = {};
    misses.current = 0;
    setLog([{ who: "it", text: cfg.greeting }]);
    setChips(cfg.chips ?? []);
    setScreen(cfg.screen);
    setDevices(cfg.devices ?? []);
    if (canSpeak()) window.speechSynthesis.cancel();
  };

  return (
    <div className="space-y-3">
      <div className={clsx("grid gap-3", (screen || devices.length > 0) && "md:grid-cols-[minmax(0,1fr)_14rem]")}>
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="flex items-center justify-between px-3 py-2 text-[13px] font-bold text-white" style={{ background: cfg.color }}>
            <span>🎙 {cfg.name}</span>
            <button type="button" onClick={reset} className="rounded border border-white/60 px-2 py-0.5 text-[12px] font-semibold">{tt("↺ Start again")}</button>
          </div>
          <div role="log" aria-live="polite" aria-label={tt(`Conversation with ${cfg.name}`)} className="max-h-[320px] min-h-[180px] space-y-2 overflow-y-auto p-3 text-[14px] text-[#26323F]">
            {log.map((m, k) => (
              <div key={k} className={clsx("max-w-[88%] rounded-lg px-3 py-1.5", m.who === "you" ? "ml-auto bg-[#EEF2F7]" : "border border-[#E1E5EA] bg-[#FAFBFC]")}>
                <span className="sr-only">{m.who === "you" ? tt("You: ") : `${cfg.name}: `}</span>
                {m.who === "it" && <span aria-hidden className="mr-1">🔊</span>}
                {m.text}
              </div>
            ))}
            {busy && <div className="text-[13px] text-[#5F6B78]" aria-hidden>{tt(`${cfg.name} is answering …`)}</div>}
            <div ref={endRef} />
          </div>
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-[#E1E5EA] px-3 py-2">
              {chips.map((c) => (
                <button key={c} type="button" onClick={() => send(c)} className="min-h-[36px] rounded-full border border-[#C9D1DA] bg-white px-3 text-[13px] text-[#26323F] hover:bg-[#F1F4F8]">{c}</button>
              ))}
            </div>
          )}
          <form
            className="flex flex-wrap items-center gap-2 border-t border-[#E1E5EA] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <label htmlFor={`${uid}-say`} className="sr-only">{tt(`What you say to ${cfg.name}`)}</label>
            <input id={`${uid}-say`} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={tt("Type what you would say …")} className="min-h-[40px] min-w-0 flex-1 rounded border border-[#B9C2CC] px-3 text-[14px]" autoComplete="off" />
            <button type="submit" className="min-h-[40px] rounded px-4 text-[14px] font-semibold text-white" style={{ background: cfg.color }}>{tt("Say it")}</button>
            {micOk && (
              <button type="button" onClick={listen} aria-pressed={listening} className="min-h-[40px] rounded border border-[#B9C2CC] bg-white px-3 text-[14px]">
                {listening ? tt("● Listening …") : tt("🎤 Speak")}
              </button>
            )}
          </form>
        </div>
        {(screen || devices.length > 0) && (
          <div className="space-y-2">
            {screen && (
              <div className="rounded-xl border border-line bg-white p-3 text-[13px] text-[#26323F]">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#5F6B78]">{tt("On the screen")}</p>
                <ul className="space-y-1">
                  {screen.map((s, k) =>
                    k === 0 ? (
                      <li key={s} className="font-semibold">{s}</li>
                    ) : (
                      <li key={s}>
                        <button type="button" onClick={() => send(s)} className="min-h-[36px] w-full rounded border border-[#C9D1DA] px-2 text-left hover:bg-[#F1F4F8]">{s}</button>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
            {devices.length > 0 && (
              <div className="rounded-xl border border-line bg-white p-3 text-[13px] text-[#26323F]">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#5F6B78]">{tt("Your home")}</p>
                <ul className="space-y-1" aria-live="polite">
                  {devices.map((d) => (
                    <li key={d.id} className="flex justify-between gap-2"><span>{d.label}</span><span className="font-semibold">{d.value}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-caption text-ash">
        {ttsOk && (
          <label className="inline-flex min-h-[40px] items-center gap-2">
            <input type="checkbox" checked={aloud} onChange={(e) => setAloud(e.target.checked)} className="h-4 w-4" />
            {tt("Read the replies aloud")}
          </label>
        )}
        <span>{micOk ? tt("Speaking uses your browser's speech recognition and asks for the microphone first; some browsers send the audio to their maker's service to recognise it. Typing stays in this tab.") : tt("Your browser offers no speech recognition here, so you type; it works the same.")}</span>
      </div>
      {tryThese && tryThese.length > 0 && (
        <div className="rounded-lg border border-dashed border-line p-3 text-caption text-ink">
          <p className="font-semibold">{tt("For the exercise, things you could try (the product itself does not show these):")}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {tryThese.map((s) => (
              <button key={s} type="button" onClick={() => send(s)} className="min-h-[36px] rounded border border-line bg-paper px-2 text-left hover:border-ash">“{s}”</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
