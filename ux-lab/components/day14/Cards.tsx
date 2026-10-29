"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, AttentionFig, BetsFig, DecisionFig, EthicsFig, IntensifyFig, LayersChainFig, MaturityChainFig, ModesFig, ValueFig, WeighFig } from "@/components/day14/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D14 } from "@/components/day14/comicScenes";
import { COMICS_D14 } from "@/data/day14/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 14 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the
 * rules it gives the task (folded) → sources → Mark as read. Example company and people: Brewline, Zara, Edgar, Kim and Ruth; never BuildVision, HealthSpace or
 * IndustryXR, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings keep the original Day 14's
 * points (flat against spatial, fascination against impact, reputation risk) in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const BL = () => tt("Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Classic interfaces are flat; immersive ones put content into space. AR lays information over the real world, VR replaces it, MR lets digital objects sit in the real room. Spatial interfaces, sensory interaction and context-adaptive systems add depth, touch, sound and situation. Each solves different problems at different cost and maturity.")}
      sources={["milgram1994", "slater2016"]}
      reasoning={[
        tt("Say which technology a proposal means: AR, VR, MR, spatial, sensory or context-adaptive."),
        tt("Ask what it adds over a flat screen for this task: place, depth, hands-free, practice without risk."),
        tt("Ask what it needs: devices, light, network, space, content."),
        tt("Remember that AR keeps people in their world; VR takes them out of it."),
        tt("Treat “the metaverse” as a word, not a plan: ask for the task."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A1} art={ART_D14} />
      <ModesFig />
      <DataTable
        caption={tt("Future interfaces and what they are good for")}
        head={[tt("Technology"), tt("What it does"), tt("Good for"), tt("Needs")]}
        rows={[
          [tt("Augmented reality (AR)"), tt("Lays information over the real world."), tt("Help at an object; seeing if something fits."), tt("A phone or glasses, light, a stable view.")],
          [tt("Virtual reality (VR)"), tt("Replaces the world with a digital one."), tt("Practice without risk; places you cannot visit."), tt("A headset, space, short sessions.")],
          [tt("Mixed reality (MR)"), tt("Digital objects in and reacting to the real room."), tt("Planning in place; working on a virtual object."), tt("Advanced headsets; mapping of the room.")],
          [tt("Spatial interfaces"), tt("Use position and depth."), tt("Seeing structure and order."), tt("3D content.")],
          [tt("Sensory interaction"), tt("Touch, sound, gesture."), tt("Hands-busy work; feedback without looking."), tt("Sensors; careful design.")],
          [tt("Context-adaptive systems"), tt("Change with the situation."), tt("The right help at the right moment."), tt("Good data about the situation.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} The continuum from the real world through AR to VR follows Milgram and Kishino (1994).`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Flat and spatial are not better and worse; they are good at different things. A list of steps is faster to scan on a flat screen; the place of a part is faster to find in space. Most good immersive products combine both: the step in a calm panel, the place on the object.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Immersion creates presence: the feeling of being there, with space, attention, the body and several senses involved. The brain's limits stay: attention is narrow, working memory small, and under stress people follow the most visible cue. Good immersive design steers perception, keeps load low and supports decisions.")}
      sources={["slater2016", "lavie2005"]}
      reasoning={[
        tt("Count what competes for attention in the scene: labels, sounds, movement."),
        tt("Show only what the person needs for this step."),
        tt("Use movement and sound sparingly: they capture attention whether people want it or not."),
        tt("Design the most important cue to be the most visible one."),
        tt("Test in the stressful moment, when attention narrows most."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A2} art={ART_D14} />
      <AttentionFig />
      <DataTable
        caption={tt("Neuroscience basics, and what they mean in immersive space")}
        head={[tt("Basic"), tt("What it means"), tt("For immersive design")]}
        rows={[
          [tt("Attention"), tt("Only a little can be attended to at once."), tt("One focus per step; quiet everything else.")],
          [tt("Cognitive load"), tt("Working memory fills up fast."), tt("Show, don't make people remember; short steps.")],
          [tt("Perception steering"), tt("Contrast, movement, sound and position decide what is noticed."), tt("Make the important thing the most noticeable.")],
          [tt("Stimulus processing"), tt("More stimuli, more effort; some people are more sensitive."), tt("Fewer stimuli; a calm option.")],
          [tt("Decision behaviour"), tt("Under stress, people take the most available cue."), tt("Make the right action the obvious one.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Presence follows Slater and Sanchez-Vives (2016); selective attention under load follows Lavie (2005).`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Presence is double-edged. The feeling of being there is what makes VR training memorable, and it is also why a badly designed scene can feel threatening or exhausting. The same intensity that teaches a safety procedure can overwhelm someone who is already anxious.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Immersive UX can intensify experiences or overwhelm people. Chances: better visualisation, support in the situation, training, experiencing complex content, new interaction. Risks: stimulus overload, disorientation, low acceptance, technical hurdles and high implementation effort. The same feature can help in calm and hurt in stress.")}
      sources={["rebenitsch2016", "lavie2005"]}
      reasoning={[
        tt("Name the chance: what does immersion make possible that a screen does not?"),
        tt("Name the risk next to it: overload, disorientation, acceptance, technology, effort."),
        tt("Picture the worst realistic moment of use: noise, gloves, time pressure, bad light, no network."),
        tt("Ask who will not or cannot use it: older users, people prone to motion sickness, people without the device."),
        tt("Count the effort beyond the demo: devices, content, updates, support."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A3} art={ART_D14} />
      <IntensifyFig />
      <DataTable
        caption={tt("Chances and risks of immersive UX")}
        head={[tt("Chance"), tt("Example (Brewline)"), tt("Risk"), tt("What it looks like")]}
        rows={[
          [tt("Better visualisation"), tt("See inside the machine."), tt("Stimulus overload"), tt("Nine labels and an advert.")],
          [tt("Support in the situation"), tt("The descaling step on the tank."), tt("Disorientation"), tt("Labels that drift with a weak signal.")],
          [tt("Training"), tt("Café staff practise milk foam in VR."), tt("Low acceptance"), tt("Edgar will not use AR at all.")],
          [tt("Experiencing complex content"), tt("How the brewing unit works."), tt("Technical hurdles"), tt("Steam, bad light, old phones.")],
          [tt("New interaction"), tt("Ask the machine with your hands full."), tt("High effort"), tt("Content for every model, every update.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Motion sickness in VR follows Rebenitsch and Owen (2016).`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Users are often impressed in the first test and overwhelmed in the third week. The first test measures novelty; daily use measures value. A pilot that ends after the wow phase has not tested anything that matters for an investment decision.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("A future technology is relevant only when it creates real value for users: it solves a real problem better than a classic interface. Four things decide together: the user's need, the innovation, its maturity in the real environment, and its marketability. Fascination is not a reason.")}
      sources={["govuk2026", "apple2026"]}
      reasoning={[
        tt("Name the user's problem first, then the technology."),
        tt("Compare with the classic solution: is the immersive one clearly better for this task?"),
        tt("Judge maturity in the real environment, not in the lab."),
        tt("Ask whether people will use it and whether it can be built, run and paid for at scale."),
        tt("Leave out what only impresses."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A4} art={ART_D14} />
      <ValueFig />
      <MaturityChainFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Reserving immersion for meaningful moments follows Apple's guidelines; reframing a solution as a problem follows the GOV.UK Service Manual.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Demonstrative use cases are attractive because they are easy to show and hard to evaluate. A useful test: would a customer miss it if it disappeared next month? A descaling guide they used twice, yes; a trade-fair showroom they saw once, no.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Immersive and neuro-based interfaces see more of people than screens: rooms, bodies, gaze. They can make people sick, exclude those without devices, and steer attention in the company's interest. Responsible leaders prioritise by effect, economics and responsibility, not fascination. Weigh measures on effect, feasibility, risk, time pressure and investment security.")}
      sources={["rebenitsch2016", "gibbons2018"]}
      reasoning={[
        tt("What does it record about people and their surroundings, and where does it go?"),
        tt("Who is left out, and what do they use instead?"),
        tt("Can it make people sick, tired or anxious?"),
        tt("Does it steer attention for the user or for the company?"),
        tt("Rate every measure on the same five criteria, with a reason; a rating is a judgement, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D14.A5} art={ART_D14} />
      <EthicsFig />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Neuro-informed design knows how attention works, which makes it powerful in both directions. The same knowledge that puts the right step in front of a technician can put an offer in front of a tired customer. The line between guidance and manipulation is whose interest the steering serves.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("At senior level future technologies are a decision architecture for innovation, service quality and differentiation: a guiding vision of the immersive value wanted, a portfolio that separates watching, piloting and scaling, one evaluation grid, and stage gates where pilots prove themselves. Innovation is managed like an investment.")}
      sources={["govuk2026", "apple2026"]}
      reasoning={[
        tt("Check how future technologies are decided today: by enthusiasm, or by a grid?"),
        tt("Write a guiding vision: what immersive value, for whom, and what is not done for show."),
        tt("Separate watching, piloting and scaling in one portfolio."),
        tt("Use one evaluation grid: value, maturity, effort, scaling, responsibility."),
        tt("Put a gate before every step up: measures set in advance, a date to decide."),
      ]}
    >
      <ComicButton comic={COMICS_D14.B1} art={ART_D14} />
      <ArchitectureFig />
      <LayersChainFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Discovery, alpha and the decision to go on or stop follow the GOV.UK Service Manual.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("Innovation labs often produce demos rather than products, because a demo is the end of their task. A portfolio changes the task: the lab's job is to produce evidence for a decision, and a stopped pilot with clear evidence is a success.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Future technologies sit between the degree of innovation and user value, visibility and maturity, investment risk and the risk of falling behind, ethics and speed, and feasibility. A portfolio of a few bets of different size, each with a reason, measures set in advance and a decision date, makes the conflicts manageable; write down what each bet assumes.")}
      sources={["govuk2026", "slater2016"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: board, units, safety, finance, users."),
        tt("Hold a few bets of different size: safe, medium, bold."),
        tt("Write down the assumptions each bet rests on: innovation, user behaviour, market maturity, economics."),
        tt("Set the measures and the decision date before the pilot starts."),
        tt("Say what the choice gives up."),
      ]}
    >
      <ComicButton comic={COMICS_D14.B2} art={ART_D14} />
      <BetsFig />
      <DataTable
        caption={tt("Standing conflicts of future technologies")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Innovation against user value"), tt("The board and the lab, against users and service."), tt("Which user problem does it solve better?")],
          [tt("Visibility against maturity"), tt("Marketing, against engineering."), tt("Does it work in the real environment, at scale?")],
          [tt("Investment risk against falling behind"), tt("Finance, against strategy."), tt("What is the smallest bet that teaches us enough?")],
          [tt("Ethics against speed"), tt("Data protection and safety, against the launch date."), tt("What does it record, and who could be harmed?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} The bets are a reading of the example, not a rule for every company.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("A future technology becomes a reputational risk when it is launched as a promise and experienced as a gimmick: when the headline outruns the product. The safest way to protect reputation is to let the evidence lead the announcement, not the other way round.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Future technologies need an owner of the portfolio, one evaluation grid for every idea, stage gates with measures set before a pilot, the right to stop a pilot (not a failure), and a rule for when visibility, effect, risk and effort disagree. With patchy tests, a decision says what it decides, does not know, would reverse and gives up.")}
      sources={["govuk2026", "simon1956", "klein2007"]}
      reasoning={[
        tt("Name who owns the innovation portfolio and the grid."),
        tt("Set the measures and the decision date before every pilot."),
        tt("Give a board the right to scale, change or stop, and safety the right to stop."),
        tt("Settle conflicts by safety first, then proven value, then effort, then visibility; say who settles a tie."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D14.B3} art={ART_D14} />
      <DecisionFig />
      <DataTable
        caption={tt("Four parts of innovation governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Brewline)")]}
        rows={[
          [tt("Owner and grid"), tt("Who owns the portfolio; how is every idea scored?"), tt("The head of UX; value, maturity, effort, scaling, responsibility.")],
          [tt("Gates"), tt("What must a pilot show before it grows?"), tt("Use, completion, support calls, cost, by a set date.")],
          [tt("Stop right"), tt("Who may stop a pilot?"), tt("The innovation board; product safety at any time.")],
          [tt("How a conflict is decided"), tt("What happens when visibility, effect, risk and effort disagree?"), tt("Safety, then proven value, then effort, then visibility; the board settles a tie.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} “It's not a failure to stop” follows the GOV.UK Service Manual; deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("The most expensive innovation decisions are the ones nobody made: pilots that were never stopped and never scaled, kept alive by goodwill. A gate with a date forces the decision. Write the stop criteria down before the pilot starts, when nobody is attached to it yet.")}</p>
      </Extra>
    </MaterialCard>
  );
}
