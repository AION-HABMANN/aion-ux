// STOP 5 — Why your brain reacts (neuro-design demos).

import CognitiveLoadDemo from "./CognitiveLoadDemo";
import PredictabilityDemo from "./PredictabilityDemo";
import ReliefDemo from "./ReliefDemo";
import { Block, ExplainPanel, NextStop, SectionHeader } from "@/components/day11/SectionShell";

export default function WhyYourBrainReactsPage() {
  return (
    <div>
      <SectionHeader
        stopId={5}
        title="Why your brain reacts"
        intro="Three small demos. Each one is about what the interface does to you, not what it says. Run them rather than read about them — the effect only lands if you feel it."
      />

      <Block kind="feel" title="Demo 1 — the invisible menu">
        <CognitiveLoadDemo />
      </Block>

      <Block kind="see" title="What your brain did">
        <ExplainPanel>
          <p>
            Working memory is the small mental notepad you use for things you're holding
            right now — and it fits about four items, briefly. The spoken menu asked you
            to hold eight, in order, while listening for more.
          </p>
          <p>
            On screen, the list does the remembering for you, so your attention goes to
            choosing instead of storing. Nothing about you got smarter; the load moved
            off you and onto the interface.
          </p>
        </ExplainPanel>
      </Block>

      <Block kind="feel" title="Demo 2 — the promise it kept, and the one it didn't">
        <PredictabilityDemo />
      </Block>

      <Block kind="see" title="What your brain did">
        <ExplainPanel>
          <p>
            You built an expectation the moment the assistant said what it would do.
            When the result matched, the expectation closed quietly and you moved on.
          </p>
          <p>
            When it did extra, the mismatch forced you to re-check everything — what
            else did it do, and what else can it do? That's the real cost of a surprise:
            not the newsletter, but the audit you now have to run in your head.
          </p>
        </ExplainPanel>
      </Block>

      <Block kind="feel" title="Demo 3 — everything at once, or one next step">
        <ReliefDemo />
      </Block>

      <Block kind="see" title="What your brain did">
        <ExplainPanel>
          <p>
            Speech arrives in a line, one word after another, and you can't skim it. So
            a reply packed with options doesn't feel rich — it feels like homework being
            read at you.
          </p>
          <p>
            A single clear next step lets you close the task and put it down. That
            feeling of being able to stop thinking about it is what “mental relief”
            actually means.
          </p>
        </ExplainPanel>
      </Block>

      <Block kind="carry" title="Take this with you">
        <p className="max-w-3xl text-sm leading-relaxed text-navy/75">
          Good intelligent interfaces lower mental effort and never surprise you in a bad
          way. That's the standard you'll hold designs to — including your own.
        </p>
      </Block>

      <NextStop stopId={5} />
    </div>
  );
}
