// STOP 2 — Six moments, six lessons (T1-T6 replay lab).

import MomentLab from "./MomentLab";
import { Block, ExplainPanel, NextStop, SectionHeader } from "@/components/SectionShell";

export default function SixMomentsPage() {
  return (
    <div>
      <SectionHeader
        stopId={2}
        title="Six moments, six lessons"
        intro="Six short exchanges with CityHelp, replayed at conversation speed. Watch each one before you judge it — the timing is half the experience."
      />

      <Block kind="feel" title="Replay a moment, then name what happened">
        <MomentLab />
      </Block>

      <Block kind="see" title="What just happened and why">
        <ExplainPanel>
          <p>
            Two of these six worked. The other four broke in four different ways: a
            dead-end you can't get out of, a loop that never learns, a confirmation with
            no detail, and an answer that wanders off into things you never asked about.
          </p>
          <p>
            Naming which kind of failure you're looking at is the whole job. “It's bad”
            doesn't tell a team what to change; “the recovery adds no new information”
            does.
          </p>
        </ExplainPanel>
      </Block>

      <Block kind="carry" title="Take this with you">
        <p className="max-w-3xl text-sm leading-relaxed text-navy/75">
          When you meet one of these moments in the worksheet, you'll be able to say
          which lens it belongs to and whether it strengthens or weakens it. Your notes
          above stay saved — reuse your own wording.
        </p>
      </Block>

      <NextStop stopId={2} />
    </div>
  );
}
