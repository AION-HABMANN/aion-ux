"use client";

// The closing decision: which tasks get a voice route at all.
// Deciding what to REFUSE is the point — the summary rewards a narrow scope
// and warns when everything is switched on.

import { useState } from "react";
import { DECISION_TASKS } from "@/lib/day11/proveIt";

export default function DecisionWidget() {
  const [voiceFor, setVoiceFor] = useState<string[]>([]);

  function toggle(id: string) {
    setVoiceFor((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const onCount = voiceFor.length;
  const riskyOn = DECISION_TASKS.filter(
    (t) => !t.goodForVoice && voiceFor.includes(t.id)
  );
  const easyOff = DECISION_TASKS.filter(
    (t) => t.goodForVoice && !voiceFor.includes(t.id)
  );

  let summary: string;
  if (onCount === 0) {
    summary =
      "Nothing on the voice line at all. Defensible, but you've given up the easy wins — a citizen asking about opening hours now has to open a website.";
  } else if (onCount === DECISION_TASKS.length) {
    summary =
      "Everything is on the voice line. That's the most common mistake: the hard, irreversible cases drag down trust in the easy ones, and one bad address change is worth more complaints than a hundred good opening-hours answers.";
  } else if (riskyOn.length === 0 && easyOff.length <= 1) {
    summary =
      "A tight, defensible scope. You've kept the frequent low-damage tasks on voice and sent the irreversible ones somewhere safer. That's a shippable first release.";
  } else if (riskyOn.length > 0) {
    summary = `You've put ${riskyOn.length === 1 ? "one high-risk task" : `${riskyOn.length} high-risk tasks`} on the voice line. That can work — but only if you can say out loud how the user confirms and how they undo it.`;
  } else {
    summary =
      "Cautious scope. Nothing dangerous is on the line, though you're leaving some easy wins on the table. Worth asking what it would take to add one of them.";
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div className="grid gap-2 sm:grid-cols-2">
        {DECISION_TASKS.map((task) => {
          const on = voiceFor.includes(task.id);
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => toggle(task.id)}
              aria-pressed={on}
              className={`rounded-card border p-3 text-left transition-colors ${
                on ? "border-purple bg-lilac" : "border-navy/10 bg-white hover:border-purple"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-navy">{task.label}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    on ? "bg-purple text-white" : "bg-white text-navy/55 ring-1 ring-navy/15"
                  }`}
                >
                  {on ? "Voice" : "Not voice"}
                </span>
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-navy/70">
                {on ? task.ifVoice : task.ifNotVoice}
              </span>
            </button>
          );
        })}
      </div>

      <div className="aion-card-soft" aria-live="polite">
        <p className="aion-label">Your scope</p>
        <p className="mt-2 text-sm font-medium text-navy">
          {onCount === 0
            ? "Voice is for nothing yet."
            : `Voice is for ${onCount} of ${DECISION_TASKS.length} tasks.`}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy/80">{summary}</p>
      </div>
    </div>
  );
}
