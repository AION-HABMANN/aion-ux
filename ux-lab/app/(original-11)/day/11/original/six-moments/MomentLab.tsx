"use client";

import { useState } from "react";
import MomentReplay from "./MomentReplay";
import { MOMENTS } from "@/original/lib/day11/moments";

export default function MomentLab() {
  const [activeId, setActiveId] = useState(MOMENTS[0].id);
  const [seen, setSeen] = useState<string[]>([MOMENTS[0].id]);
  const active = MOMENTS.find((m) => m.id === activeId) ?? MOMENTS[0];

  function select(id: string) {
    setActiveId(id);
    setSeen((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  const allSeen = seen.length === MOMENTS.length;

  return (
    <div className="space-y-6">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="The six moments"
      >
        {MOMENTS.map((m) => {
          const isActive = m.id === activeId;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(m.id)}
              className={`aion-chip text-xs ${isActive ? "aion-chip-active" : ""}`}
            >
              <span className="font-semibold">{m.id}</span>
              <span className="ml-1.5 hidden sm:inline">{m.title}</span>
              {seen.includes(m.id) && !isActive && (
                <span className="ml-1.5 text-purple" aria-label="already viewed">
                  ·
                </span>
              )}
            </button>
          );
        })}
      </div>

      <MomentReplay key={active.id} moment={active} />

      {allSeen && (
        <div className="aion-card-soft animate-fade-in max-w-3xl">
          <p className="aion-label">All six</p>
          <p className="mt-2 text-sm leading-relaxed text-navy/85">
            You've now felt all six moments — two that worked and four that didn't, each
            failing in a different way. In Task 1 you'll do this cold, without the
            replay and without the reading. But you already have the instincts; the next
            stop just hands you the words.
          </p>
        </div>
      )}
    </div>
  );
}
