// STOP 6 — Prove it works (prototyping & testing mini-lab).

import DecisionWidget from "./DecisionWidget";
import PrototypePicker from "./PrototypePicker";
import RiskSorter from "./RiskSorter";
import { Block, ExplainPanel, NextStop, SectionHeader } from "@/original/components/day11/SectionShell";

export default function ProveItWorksPage() {
  return (
    <div>
      <SectionHeader
        stopId={6}
        title="Prove it works"
        intro="You don't just ship a voice interface. You prototype it, you test the parts that can actually hurt someone, and you decide where voice belongs at all — including where it doesn't."
      />

      <Block kind="feel" title="Three kinds of prototype">
        <PrototypePicker />
      </Block>

      <Block kind="feel" title="Test by risk, not by feature list">
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-navy/70">
          Six CityHelp use cases. Put each one where you think it belongs: how often do
          citizens do it, and how bad is it when the system gets it wrong?
        </p>
        <RiskSorter />
      </Block>

      <Block kind="feel" title="Decide what voice is for">
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-navy/70">
          Switch each task on or off the voice line and watch the consequence. There's no
          correct configuration here — there's a scope you can defend.
        </p>
        <DecisionWidget />
      </Block>

      <Block kind="see" title="What just happened and why">
        <ExplainPanel>
          <p>
            Saying no is the strategy. A voice assistant that does four things reliably
            beats one that attempts twelve and loses your address change.
          </p>
          <p>
            The tasks you refuse still need a route — a form, a phone number, a human.
            “Not by voice” is only a decision if you say where it goes instead.
          </p>
        </ExplainPanel>
      </Block>

      <Block kind="carry" title="Take this with you">
        <p className="max-w-3xl text-sm leading-relaxed text-navy/75">
          You've now felt the full arc: use it, judge it, compare build options,
          understand the human, and decide where it belongs. Task 3 asks you to turn this
          into a plan; Task 4 asks you to turn it into a strategy. You're ready.
        </p>
      </Block>

      <NextStop stopId={6} />
    </div>
  );
}
