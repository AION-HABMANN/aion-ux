"use client";

// DEMO 1 — cognitive load.
// Same goal, same eight options, two presentations. In the hidden version the
// options are only "spoken" (revealed one at a time, then gone), so the learner
// has to hold them in working memory. The timer is there to make the difference
// visible, not to score anyone.

import { useEffect, useRef, useState } from "react";

const MENU = [
  "For appointments, press 1.",
  "For application status, press 2.",
  "To report a problem, press 3.",
  "For opening hours, press 4.",
  "For address registration, press 5.",
  "To cancel an appointment, press 6.",
  "For fees and payment, press 7.",
  "To hear these options again, press 8.",
];

const GOAL_INDEX = 5; // "cancel an appointment" — press 6
const SPOKEN_MS = 1300;

type Mode = "hidden" | "visible";

export default function CognitiveLoadDemo() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [running, setRunning] = useState(false);
  const [spokenIndex, setSpokenIndex] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [results, setResults] = useState<Partial<Record<Mode, number>>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const startedAt = useRef(0);
  const timersRef = useRef<ReturnType<typeof setInterval | typeof setTimeout>[]>([]);

  function clearTimers() {
    timersRef.current.forEach((t) => {
      clearTimeout(t as ReturnType<typeof setTimeout>);
      clearInterval(t as ReturnType<typeof setInterval>);
    });
    timersRef.current = [];
  }

  useEffect(() => clearTimers, []);

  function start() {
    clearTimers();
    setFeedback(null);
    setElapsed(0);
    setSpokenIndex(-1);
    setRunning(true);
    startedAt.current = Date.now();

    const tick = setInterval(() => {
      setElapsed(Date.now() - startedAt.current);
    }, 100);
    timersRef.current.push(tick);

    if (mode === "hidden") {
      // Read the menu out one line at a time; each line disappears after it's read.
      MENU.forEach((_, i) => {
        timersRef.current.push(
          setTimeout(() => setSpokenIndex(i), i * SPOKEN_MS)
        );
      });
      timersRef.current.push(
        setTimeout(() => setSpokenIndex(-1), MENU.length * SPOKEN_MS)
      );
    }
  }

  function press(index: number) {
    if (!running) return;
    const time = Date.now() - startedAt.current;
    if (index === GOAL_INDEX) {
      clearTimers();
      setRunning(false);
      setElapsed(time);
      setSpokenIndex(-1);
      setResults((prev) => ({ ...prev, [mode]: time }));
      setFeedback(`Right one. That took ${(time / 1000).toFixed(1)} seconds.`);
    } else {
      setFeedback("That's a different service. Back to the menu.");
    }
  }

  const bothDone = results.hidden !== undefined && results.visible !== undefined;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="aion-card-soft">
        <p className="aion-label">Your goal</p>
        <p className="mt-1 text-sm text-navy">Cancel a Tuesday appointment.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["hidden", "visible"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              clearTimers();
              setRunning(false);
              setMode(m);
              setFeedback(null);
              setElapsed(0);
              setSpokenIndex(-1);
            }}
            aria-pressed={mode === m}
            className={`aion-chip text-xs ${mode === m ? "aion-chip-active" : ""}`}
          >
            {m === "hidden" ? "Voice only (options not shown)" : "Options visible on screen"}
          </button>
        ))}
      </div>

      <div className="aion-card">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-navy">
            {mode === "hidden" ? "CityHelp hotline" : "CityHelp hotline, with the menu on screen"}
          </p>
          <p className="text-xs tabular-nums text-navy/60" aria-live="off">
            {(elapsed / 1000).toFixed(1)}s
          </p>
        </div>

        <div className="mt-3 min-h-[7rem] rounded-card border border-navy/10 bg-lilac/40 p-3">
          {mode === "visible" ? (
            <ol className="space-y-1 text-sm text-navy/85">
              {MENU.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          ) : !running ? (
            <p className="text-sm text-navy/55">
              Press start. The options are read out one at a time and then they're gone —
              exactly like a phone line.
            </p>
          ) : spokenIndex >= 0 ? (
            <p className="animate-fade-in text-sm text-navy" aria-live="polite">
              {MENU[spokenIndex]}
            </p>
          ) : (
            <p className="text-sm text-navy/55">…that's the whole menu. Your choice?</p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {MENU.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => press(i)}
              disabled={!running}
              className="aion-chip h-9 w-9 justify-center px-0 text-sm"
              aria-label={`Press ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" onClick={start} className="aion-btn" disabled={running}>
            {running ? "Running…" : "Start this version"}
          </button>
          {feedback && (
            <p className="text-sm text-navy/75" aria-live="polite">
              {feedback}
            </p>
          )}
        </div>
      </div>

      {bothDone && (
        <div className="aion-card-soft animate-fade-in">
          <p className="aion-label">Side by side</p>
          <p className="mt-2 text-sm text-navy">
            Voice only: {(results.hidden! / 1000).toFixed(1)}s · On screen:{" "}
            {(results.visible! / 1000).toFixed(1)}s
          </p>
        </div>
      )}
    </div>
  );
}
