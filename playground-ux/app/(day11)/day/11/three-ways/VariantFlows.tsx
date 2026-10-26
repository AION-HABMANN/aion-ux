"use client";

// Three genuinely different implementations of the SAME task:
// "Book a Bürgeramt appointment." The learner runs each one for real, so the
// trade-off is felt rather than read off a table.

import { useState } from "react";
import { ChatFrame, ChatLog, type Bubble } from "@/components/day11/ChatMock";
import MicButton from "@/components/day11/MicButton";
import {
  VARIANT_B_STEPS,
  VARIANT_C_SUGGESTIONS,
  variantAReply,
} from "@/lib/day11/variants";

// ---------------------------------------------------------------------------
// VARIANT A — free text. Natural to speak, brittle to build.
// ---------------------------------------------------------------------------
export function VariantAFlow() {
  const [bubbles, setBubbles] = useState<Bubble[]>([
    { role: "system", text: "CityHelp: What would you like to do?" },
  ]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);

  function send(raw: string) {
    const text = raw.trim();
    if (!text || done) return;
    const reply = variantAReply(text);
    setBubbles((prev) => [
      ...prev,
      { role: "user", text },
      { role: "system", text: reply.text },
    ]);
    setInput("");
    if (reply.ok) setDone(true);
  }

  return (
    <div>
      <ChatFrame label="Variant A · free input">
        <ChatLog bubbles={bubbles} />
        <div className="border-t border-navy/10 px-4 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <label htmlFor="variant-a-input" className="sr-only">
              Say anything to CityHelp
            </label>
            <input
              id="variant-a-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say anything…"
              className="aion-input"
              autoComplete="off"
              disabled={done}
            />
            <MicButton onTranscript={send} />
            <button type="submit" className="aion-btn shrink-0" disabled={done}>
              Send
            </button>
          </form>
        </div>
      </ChatFrame>

      <div className="mx-auto mt-3 w-full max-w-md">
        <p className="text-xs text-navy/55">
          Try “Book an appointment at the Bürgeramt” — then try “I need to sort out my
          Perso next week”. Both are things a citizen would really say.
        </p>
        {done && (
          <button
            type="button"
            onClick={() => {
              setBubbles([{ role: "system", text: "CityHelp: What would you like to do?" }]);
              setDone(false);
            }}
            className="aion-btn-ghost mt-3"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VARIANT B — the fixed spoken menu. Never fails, never delights.
// ---------------------------------------------------------------------------
export function VariantBFlow() {
  const [step, setStep] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([
    { role: "system", text: VARIANT_B_STEPS[0].prompt },
  ]);
  const [finished, setFinished] = useState(false);

  const current = finished ? null : VARIANT_B_STEPS[step];

  function choose(option: { label: string; next?: number; result?: string }) {
    const next: Bubble[] = [{ role: "user", text: option.label }];
    if (option.result) {
      next.push({ role: "system", text: `CityHelp: ${option.result}` });
      setBubbles((prev) => [...prev, ...next]);
      setFinished(true);
      return;
    }
    if (option.next !== undefined) {
      next.push({ role: "system", text: VARIANT_B_STEPS[option.next].prompt });
      setBubbles((prev) => [...prev, ...next]);
      setStep(option.next);
    }
  }

  function reset() {
    setStep(0);
    setBubbles([{ role: "system", text: VARIANT_B_STEPS[0].prompt }]);
    setFinished(false);
  }

  return (
    <div>
      <ChatFrame label="Variant B · fixed options">
        <ChatLog bubbles={bubbles} />
        <div className="border-t border-navy/10 px-4 py-3">
          {current ? (
            <div className="flex flex-wrap gap-2">
              {current.options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => choose(opt)}
                  className="aion-chip text-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <button type="button" onClick={reset} className="aion-btn-ghost">
              Start over
            </button>
          )}
        </div>
      </ChatFrame>
      <p className="mx-auto mt-3 w-full max-w-md text-xs text-navy/55">
        Count the turns it takes to book one appointment. Nothing can go wrong — and
        nothing can go fast.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VARIANT C — voice or typing, but every guess is shown on screen to confirm.
// ---------------------------------------------------------------------------
export function VariantCFlow() {
  const [input, setInput] = useState("");
  const [heard, setHeard] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  return (
    <div>
      <ChatFrame label="Variant C · voice plus screen">
        <div className="space-y-4 bg-lilac/40 px-4 py-4">
          <div className="rounded-card border border-navy/15 bg-white px-3 py-2 text-sm text-navy">
            CityHelp: Tell me what you need, or pick from the list below.
          </div>

          {heard && (
            <div className="animate-fade-in rounded-card border border-purple/30 bg-white px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-purple">
                I heard
              </p>
              <p className="mt-0.5 text-sm text-navy">“{heard}”</p>
              <p className="mt-1 text-xs text-navy/60">
                Not right? Say it again or pick from the list — nothing is booked yet.
              </p>
            </div>
          )}

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/60">
              Suggested slots · tap to confirm
            </p>
            <ul className="mt-2 space-y-2">
              {VARIANT_C_SUGGESTIONS.map((s) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => setConfirmed(s.label)}
                    aria-pressed={confirmed === s.label}
                    className={`w-full rounded-card border px-3 py-2 text-left transition-colors ${
                      confirmed === s.label
                        ? "border-purple bg-lilac"
                        : "border-navy/15 bg-white hover:border-purple"
                    }`}
                  >
                    <span className="block text-sm font-medium text-navy">{s.label}</span>
                    <span className="block text-xs text-navy/60">{s.detail}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {confirmed && (
            <div className="animate-fade-in rounded-card border border-navy/15 bg-white px-3 py-2 text-sm text-navy">
              CityHelp: Booked — {confirmed}. Reference 8820. Shall I add it to your
              calendar?
            </div>
          )}
        </div>

        <div className="border-t border-navy/10 px-4 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                setHeard(input.trim());
                setInput("");
              }
            }}
            className="flex gap-2"
          >
            <label htmlFor="variant-c-input" className="sr-only">
              Say or type what you need
            </label>
            <input
              id="variant-c-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say or type what you need…"
              className="aion-input"
              autoComplete="off"
            />
            <MicButton onTranscript={(t) => setHeard(t)} />
            <button type="submit" className="aion-btn shrink-0">
              Send
            </button>
          </form>
        </div>
      </ChatFrame>
      <p className="mx-auto mt-3 w-full max-w-md text-xs text-navy/55">
        Say anything at all — even nonsense. Notice that a mishearing costs you nothing
        here, because the screen always shows what it thinks before it acts.
      </p>
    </div>
  );
}
