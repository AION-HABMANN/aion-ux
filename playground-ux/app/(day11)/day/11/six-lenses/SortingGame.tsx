"use client";

// Practice, not a test. One fresh CityHelp line at a time; the learner picks a
// lens and a direction, and gets a one-line why either way. The running tally is
// deliberately phrased as encouragement, never as a mark.

import { useState } from "react";
import LensPicker from "@/components/day11/LensPicker";
import { SORTING_ITEMS, getLens } from "@/lib/day11/lenses";
import type { Direction, LensId } from "@/lib/day11/types";

export default function SortingGame() {
  const [index, setIndex] = useState(0);
  const [lens, setLens] = useState<LensId | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [checked, setChecked] = useState(false);
  const [matches, setMatches] = useState(0);

  const item = SORTING_ITEMS[index];
  const finished = index >= SORTING_ITEMS.length;

  if (finished) {
    return (
      <div className="aion-card-soft max-w-2xl">
        <p className="aion-label">Round finished</p>
        <p className="mt-2 text-lg font-semibold text-navy">
          {matches} of {SORTING_ITEMS.length} matched the reading above.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy/80">
          {matches >= 8
            ? "The vocabulary has landed. The ones you read differently are usually the interesting ones — most lines touch two lenses at once."
            : matches >= 5
              ? "Solid. The lenses overlap a lot, so a different pick is often a defensible pick rather than a miss."
              : "Worth another pass. Read each line and ask the lens question out loud — “does the user know what they can say?” — and the right one usually announces itself."}
        </p>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setMatches(0);
            setLens(null);
            setDirection(null);
            setChecked(false);
          }}
          className="aion-btn mt-4"
        >
          Run it again
        </button>
      </div>
    );
  }

  const isMatch = lens === item.lens && direction === item.direction;

  function check() {
    setChecked(true);
    if (lens === item.lens && direction === item.direction) {
      setMatches((m) => m + 1);
    }
  }

  function next() {
    setIndex((i) => i + 1);
    setLens(null);
    setDirection(null);
    setChecked(false);
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between text-xs text-navy/55">
        <span>
          Line {index + 1} of {SORTING_ITEMS.length}
        </span>
        <span>{matches} matched so far</span>
      </div>

      <div className="aion-card">
        <p className="text-base leading-relaxed text-navy">{item.text}</p>
      </div>

      <div className="aion-card">
        <LensPicker
          idPrefix={`sort-${item.id}`}
          selectedLens={lens}
          selectedDirection={direction}
          onSelectLens={setLens}
          onSelectDirection={setDirection}
          disabled={checked}
        />

        {!checked ? (
          <button
            type="button"
            onClick={check}
            className="aion-btn mt-5"
            disabled={!lens || !direction}
          >
            See the reading
          </button>
        ) : (
          <div className="mt-5 border-t border-navy/10 pt-4" aria-live="polite">
            <p className="text-sm font-semibold text-navy">
              {isMatch
                ? "Same reading."
                : `A UX lead would file this under ${getLens(item.lens).name}, ${item.direction}.`}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-navy/80">{item.why}</p>
            {!isMatch && lens && (
              <p className="mt-2 text-xs text-navy/55">
                You said {getLens(lens).name}, {direction}. Lines often touch two lenses
                — if you can defend yours out loud, keep it.
              </p>
            )}
            <button type="button" onClick={next} className="aion-btn mt-4">
              {index === SORTING_ITEMS.length - 1 ? "Finish the round" : "Next line"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
