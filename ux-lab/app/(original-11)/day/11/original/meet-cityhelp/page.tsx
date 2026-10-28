// STOP 1 — Meet CityHelp Voice (free-play simulator).

import FreePlay from "./FreePlay";
import { Block, ExplainPanel, NextStop, SectionHeader } from "@/original/components/day11/SectionShell";

export default function MeetCityHelpPage() {
  return (
    <div>
      <SectionHeader
        stopId={1}
        title="Meet CityHelp Voice"
        intro="Just use it. Ask it for something a citizen would actually ask for, and notice how you feel after each reply. No theory yet — that comes next."
      />

      <Block kind="feel" title="Talk to the assistant">
        <FreePlay />
      </Block>

      <Block kind="see" title="What just happened and why">
        <ExplainPanel>
          <p>
            You just met a real pattern: the same assistant can feel great in one moment
            and useless in the next. Booking gave you a concrete slot and a way out.
            Changing your address probably sent you round in a circle.
          </p>
          <p>
            That inconsistency is normal in shipped voice products, and it is not
            random — each good and bad moment has a cause you can name. The rest of this
            playground gives you the words for why.
          </p>
        </ExplainPanel>
      </Block>

      <Block kind="carry" title="Take this with you">
        <p className="max-w-3xl text-sm leading-relaxed text-navy/75">
          Keep your gut reactions. In the next stop you'll meet six moments like these
          again, slowed down — and you'll be able to name what made each one land or
          fail.
        </p>
      </Block>

      <NextStop stopId={1} />
    </div>
  );
}
