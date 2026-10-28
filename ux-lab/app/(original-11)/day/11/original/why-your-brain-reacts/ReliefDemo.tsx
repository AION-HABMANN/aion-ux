"use client";

// DEMO 3 — stimulus vs relief.
// The same answer, twice. One buries the next step in options; one says the next
// step and stops. Toggling between them is the whole demo.

import { useState } from "react";

const CLUTTERED = `Your appointment request has been received. You can view it in the citizen portal, or in the app, or by calling the hotline. You may also want to check whether you need the extended service, which requires an additional form (Form A-14b), available online or at any Bürgeramt. Please note that appointments can be rescheduled up to 24 hours in advance, cancelled up to 2 hours in advance, or transferred to another person with written authorisation. Would you like to hear about parking near the office, accessibility options, opening hours, or related services?`;

const CALM = `Your appointment is confirmed: Thursday, 3 August at 10:00, Bürgeramt Mitte. Bring your old ID. That's all you need to do.`;

export default function ReliefDemo() {
  const [calm, setCalm] = useState(false);

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-navy/60">Same answer, two ways of saying it:</span>
        <button
          type="button"
          onClick={() => setCalm(false)}
          aria-pressed={!calm}
          className={`aion-chip text-xs ${!calm ? "aion-chip-active" : ""}`}
        >
          Everything at once
        </button>
        <button
          type="button"
          onClick={() => setCalm(true)}
          aria-pressed={calm}
          className={`aion-chip text-xs ${calm ? "aion-chip-active" : ""}`}
        >
          One clear next step
        </button>
      </div>

      <div className="aion-card">
        <p className="aion-label">CityHelp says</p>
        <p
          key={calm ? "calm" : "cluttered"}
          className="mt-2 animate-fade-in text-sm leading-relaxed text-navy"
        >
          {calm ? CALM : CLUTTERED}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-navy/70">
        Read both out loud at speaking pace. The first one is 90 words that end in a
        question you can't answer; the second is 30 words that end in permission to stop
        thinking.
      </p>
    </div>
  );
}
