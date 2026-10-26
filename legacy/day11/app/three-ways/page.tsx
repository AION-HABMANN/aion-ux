// STOP 4 — Three ways to build it (A/B/C variant lab).

import VariantLab from "./VariantLab";
import { Block, ExplainPanel, NextStop, SectionHeader } from "@/components/SectionShell";

export default function ThreeWaysPage() {
  return (
    <div>
      <SectionHeader
        stopId={4}
        title="Three ways to build it"
        intro="One task — booking a Bürgeramt appointment — built three different ways. Run each one properly before you read the ratings; the numbers only mean something once you've felt them."
      />

      <Block kind="feel" title="Run the same task three ways">
        <VariantLab />
      </Block>

      <Block kind="see" title="What just happened and why">
        <ExplainPanel title="The conflict at the centre of the decision">
          <p>
            The more natural and free the input (A), the harder it is to keep precise
            and robust. You felt that the moment a normal sentence like “sort out my
            Perso” fell over.
          </p>
          <p>
            The most robust option (C) costs the most to build — it needs the speech
            layer <em>and</em> the screen, plus a confirmation step for every action.
            B is cheap and reliable but spends the user's patience instead of your
            budget.
          </p>
          <p>That tension is the whole decision. There is no variant without a bill.</p>
        </ExplainPanel>
      </Block>

      <Block kind="carry" title="Take this with you">
        <p className="max-w-3xl text-sm leading-relaxed text-navy/75">
          When you're asked which variant you'd pick, the answer is never one letter on
          its own. It's a letter plus a user plus a reason — and you just watched the
          winner change when the user changed.
        </p>
      </Block>

      <NextStop stopId={4} />
    </div>
  );
}
