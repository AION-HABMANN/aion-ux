// STOP 3 — The six lenses (category trainer).

import SortingGame from "./SortingGame";
import LensCard from "@/original/components/day11/LensCard";
import { Block, ExplainPanel, NextStop, SectionHeader } from "@/original/components/day11/SectionShell";
import { LENSES } from "@/original/lib/day11/lenses";

export default function SixLensesPage() {
  return (
    <div>
      <SectionHeader
        stopId={3}
        title="The six lenses"
        intro="Six questions to ask about any voice or AI interface. Each card shows one CityHelp line that answers the question well, and one that answers it badly."
      />

      <Block kind="feel" title="The vocabulary, in pairs">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {LENSES.map((lens) => (
            <LensCard key={lens.id} lens={lens} />
          ))}
        </div>
      </Block>

      <Block kind="feel" title="Practice: sort ten fresh lines">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-navy/70">
          These are new CityHelp lines, not the six moments. Pick the lens that fits
          best and say whether the line strengthens or weakens it. There's a reason
          given either way, so a different pick still teaches you something.
        </p>
        <SortingGame />
      </Block>

      <Block kind="see" title="What just happened and why">
        <ExplainPanel>
          <p>
            Most lines touch more than one lens. “Done.” weakens user control and trust
            at the same time; a reference number strengthens trust and mental relief
            together.
          </p>
          <p>
            That's fine. The lens you name is the one you'd fix first — the question is
            which change would help the citizen most, not which label is technically
            correct.
          </p>
        </ExplainPanel>
      </Block>

      <Block kind="carry" title="Take this with you">
        <p className="max-w-3xl text-sm leading-relaxed text-navy/75">
          These six words are the vocabulary for the whole day. Task 1 and Task 3 both
          live in them, so it's worth being able to say each question from memory.
        </p>
      </Block>

      <NextStop stopId={3} />
    </div>
  );
}
