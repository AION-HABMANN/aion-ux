"use client";

// Free-play simulator. All replies come from lib/responseEngine.ts — no network,
// no model, fully deterministic. The reaction strip only logs a gut feeling; it
// never tells the learner whether they were "right".

import { useCallback, useRef, useState } from "react";
import MicButton from "@/original/components/day11/MicButton";
import { ChatFrame, ChatLog, type Bubble } from "@/original/components/day11/ChatMock";
import {
  OPENING_LINE,
  QUICK_SUGGESTIONS,
  getCityHelpReply,
} from "@/original/lib/day11/responseEngine";
import { useReactionLog } from "@/original/lib/day11/storage";

const REPLY_DELAY_MS = 550;

export default function FreePlay() {
  const [bubbles, setBubbles] = useState<Bubble[]>([
    { role: "system", text: OPENING_LINE },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lastExchange, setLastExchange] = useState<string | null>(null);
  const [reactedTo, setReactedTo] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { log, addReaction } = useReactionLog();

  const send = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    setBubbles((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const reply = getCityHelpReply(text);
      setBubbles((prev) => [...prev, { role: "system", text: reply.text }]);
      setTyping(false);
      setLastExchange(text);
      setReactedTo(null);
    }, REPLY_DELAY_MS);
  }, [typing]);

  function react(reaction: "helped" | "confusing") {
    if (!lastExchange) return;
    addReaction({ prompt: lastExchange, reaction, at: Date.now() });
    setReactedTo(lastExchange);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <ChatFrame label="Free play">
          <ChatLog bubbles={bubbles} typing={typing} />

          <div className="border-t border-navy/10 px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <label htmlFor="freeplay-input" className="sr-only">
                Type what you'd say to CityHelp
              </label>
              <input
                id="freeplay-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type what you'd say to CityHelp…"
                className="aion-input"
                autoComplete="off"
              />
              <MicButton onTranscript={(t) => send(t)} />
              <button type="submit" className="aion-btn shrink-0" disabled={typing}>
                Send
              </button>
            </form>

            {/* Reaction strip — appears after each exchange. Purely a gut-feeling log. */}
            {lastExchange && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {reactedTo === lastExchange ? (
                  <p className="text-xs text-navy/60" aria-live="polite">
                    Noted. Your reactions are collected on the right.
                  </p>
                ) : (
                  <>
                    <span className="text-xs text-navy/55">How did that land?</span>
                    <button
                      type="button"
                      onClick={() => react("helped")}
                      className="aion-chip text-xs"
                      aria-label="That reply helped"
                    >
                      That helped
                    </button>
                    <button
                      type="button"
                      onClick={() => react("confusing")}
                      className="aion-chip text-xs"
                      aria-label="That reply was confusing"
                    >
                      That was confusing
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </ChatFrame>

        <div className="mx-auto mt-4 w-full max-w-md">
          <p className="aion-label">Try one of these</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="aion-chip text-xs"
                disabled={typing}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="aion-card h-fit">
        <h3 className="text-sm font-semibold text-navy">Your reactions so far</h3>
        <p className="mt-1 text-xs text-navy/60">
          Just your gut, no labels yet. Come back to this after the next two stops and
          see whether you can name each one.
        </p>
        {log.length === 0 ? (
          <p className="mt-4 text-sm text-navy/50">
            Nothing yet. Send a message and tell it how the reply landed.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {log
              .slice()
              .reverse()
              .slice(0, 12)
              .map((entry, i) => (
                <li
                  key={`${entry.at}-${i}`}
                  className="rounded-card border border-navy/10 px-3 py-2 text-xs"
                >
                  <span
                    className={
                      entry.reaction === "helped"
                        ? "font-semibold text-purple"
                        : "font-semibold text-navy/70"
                    }
                  >
                    {entry.reaction === "helped" ? "Helped" : "Confusing"}
                  </span>
                  <span className="text-navy/60"> · “{entry.prompt}”</span>
                </li>
              ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
