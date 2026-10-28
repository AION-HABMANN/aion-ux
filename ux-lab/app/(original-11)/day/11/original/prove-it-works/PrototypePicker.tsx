"use client";

// The three prototype types, plus a "which would you build first" prompt that
// takes any answer seriously and then offers a reading.

import { useState } from "react";
import { PROTOTYPE_FIRST_TAKE, PROTOTYPE_TYPES } from "@/original/lib/day11/proveIt";

export default function PrototypePicker() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {PROTOTYPE_TYPES.map((p) => {
          const active = picked === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPicked(p.id)}
              aria-pressed={active}
              className={`rounded-card border p-4 text-left transition-colors ${
                active ? "border-purple bg-lilac" : "border-navy/10 bg-white hover:border-purple"
              }`}
            >
              <h3 className="text-sm font-semibold text-navy">{p.name}</h3>
              <p className="mt-1 text-xs text-navy/70">{p.definition}</p>
              <p className="mt-3 text-sm leading-relaxed text-navy/85">{p.example}</p>
              <p className="mt-2 text-xs text-navy/60">{p.tradeoff}</p>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-navy/70">
        Which would you build first for CityHelp? Pick one above.
      </p>

      {picked && (
        <div className="aion-card-soft animate-fade-in max-w-3xl" aria-live="polite">
          <p className="aion-label">One reading</p>
          <p className="mt-2 text-sm leading-relaxed text-navy/85">
            {PROTOTYPE_FIRST_TAKE}
          </p>
          <p className="mt-2 text-xs text-navy/55">
            {picked === "interaction"
              ? "That's the one most voice teams wish they'd started with."
              : "If you can say what your pick would tell you that the others wouldn't, it's a good pick."}
          </p>
        </div>
      )}
    </div>
  );
}
