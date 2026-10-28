"use client";

// DEMO 2 — predictability and trust.
// Two confirmations for the same request. One does exactly what it said. The
// other quietly does something extra. The learner rates their trust in each, then
// sees both ratings next to each other.

import { useState } from "react";

type Version = "kept" | "extra";

const SCRIPTS: Record<Version, { label: string; lines: string[] }> = {
  kept: {
    label: "Version 1",
    lines: [
      "You: Register my new address, please.",
      "CityHelp: I'll register your new address at Hauptstraße 14. Nothing else will change. Shall I submit it?",
      "You: Yes.",
      "CityHelp: Submitted. Reference 5512. Your new address is registered from today. Anything else?",
    ],
  },
  extra: {
    label: "Version 2",
    // INTENTIONAL PLANTED FLAW: the quiet extra action. Same as T5's over-reach,
    // applied to something with legal weight. KEEP AS IS.
    lines: [
      "You: Register my new address, please.",
      "CityHelp: I'll register your new address at Hauptstraße 14. Shall I submit it?",
      "You: Yes.",
      "CityHelp: Submitted. I've also signed you up for the city newsletter and updated your waste collection plan. Anything else?",
    ],
  },
};

function TrustRating({
  value,
  onChange,
  version,
}: {
  value: number | null;
  onChange: (n: number) => void;
  version: Version;
}) {
  return (
    <fieldset className="mt-4">
      <legend className="aion-label">
        How much would you trust it with the next thing? (1 = not at all, 5 = fully)
      </legend>
      <div className="mt-2 flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-pressed={value === n}
            aria-label={`Rate ${n} out of 5 for ${SCRIPTS[version].label}`}
            className={`aion-chip h-9 w-9 justify-center px-0 text-sm ${
              value === n ? "aion-chip-active" : ""
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function PredictabilityDemo() {
  const [version, setVersion] = useState<Version>("kept");
  const [step, setStep] = useState(1);
  const [ratings, setRatings] = useState<Partial<Record<Version, number>>>({});

  const script = SCRIPTS[version];
  const bothRated = ratings.kept !== undefined && ratings.extra !== undefined;
  const finished = step >= script.lines.length;

  function switchVersion(v: Version) {
    setVersion(v);
    setStep(1);
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["kept", "extra"] as Version[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => switchVersion(v)}
            aria-pressed={version === v}
            className={`aion-chip text-xs ${version === v ? "aion-chip-active" : ""}`}
          >
            {SCRIPTS[v].label}
          </button>
        ))}
      </div>

      <div className="aion-card">
        <div className="space-y-2">
          {script.lines.slice(0, step).map((line, i) => (
            <p
              key={i}
              className={`animate-fade-in rounded-card px-3 py-2 text-sm leading-relaxed ${
                line.startsWith("You:")
                  ? "bg-purple text-white"
                  : "border border-navy/10 bg-lilac/50 text-navy"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {!finished ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="aion-btn mt-4"
          >
            Next line
          </button>
        ) : (
          <TrustRating
            version={version}
            value={ratings[version] ?? null}
            onChange={(n) => setRatings((prev) => ({ ...prev, [version]: n }))}
          />
        )}
      </div>

      {bothRated && (
        <div className="aion-card-soft animate-fade-in">
          <p className="aion-label">Your two ratings</p>
          <p className="mt-2 text-sm text-navy">
            Version 1: {ratings.kept}/5 · Version 2: {ratings.extra}/5
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy/80">
            {ratings.kept! > ratings.extra!
              ? "Both versions did the thing you asked. The second one just did more — and that extra is what cost it your trust."
              : "Interesting — most people drop the second one hard. Worth asking yourself what the extra actions would cost you if they'd been wrong."}
          </p>
        </div>
      )}
    </div>
  );
}
