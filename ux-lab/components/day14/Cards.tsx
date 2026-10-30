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
      sources={["milgram1994", "slater2016", "apple2026"]}
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
      <DataTable
        caption={tt("From screen to space: the concepts and where they come from")}
        head={[tt("Concept"), tt("Real source"), tt("What it means for a decision")]}
        rows={[
          [tt("The continuum"), tt("Milgram and Kishino placed displays on a reality–virtuality continuum, from the real world through augmented and mixed reality to a fully virtual one (Milgram and Kishino 1994)."), tt("Say where on the continuum a product sits: it decides what it can show, what it needs and what it risks.")],
          [tt("Presence"), tt("Slater and Sanchez-Vives describe presence as the feeling of being in the virtual place, built from immersion and the plausibility of what happens there (Slater and Sanchez-Vives 2016)."), tt("Immersion is a means: ask what presence adds to the task.")],
          [tt("Immersion for a reason"), tt("Apple's guidelines advise to reserve immersion for meaningful moments, to attend to comfort, and to let people choose when to enter and leave (Apple, Immersive experiences)."), tt("Offer the immersive mode as a choice, with an easy exit.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} The continuum from the real world through AR to VR follows Milgram and Kishino (1994). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["slater2016", "lavie2005", "rebenitsch2016"]}
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
      <DataTable
        caption={tt("Presence, attention and load: findings")}
        head={[tt("Finding"), tt("What it shows"), tt("What it means for a screen in space")]}
        rows={[
          [tt("Perceptual load"), tt("Attention is limited, and under load what is processed depends on what competes for it (Lavie 2005)."), tt("One focus per step: every extra object in space competes with the task.")],
          [tt("Cybersickness"), tt("Papers that cite the main review report that between about 30% and 80% of users get symptoms in virtual environments, and the estimates vary widely with hardware, people and measures (Rebenitsch and Owen 2016, as reported)."), tt("Plan for sickness as a normal case: short sessions, stable views, a comfort option.")],
          [tt("Plausibility"), tt("Presence depends on the plausibility of what happens as well as on the display (Slater and Sanchez-Vives 2016)."), tt("Labels that drift or lag break the illusion: test tracking in the real room.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Presence follows Slater and Sanchez-Vives (2016); selective attention under load follows Lavie (2005). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["rebenitsch2016", "lavie2005", "kaplan2021"]}
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
      <DataTable
        caption={tt("Intensify or overwhelm: what the evidence says")}
        head={[tt("Topic"), tt("Real finding"), tt("What it means for a product")]}
        rows={[
          [tt("Training"), tt("A meta-analysis of studies on the transfer of training found that training in virtual, augmented or mixed reality was about as effective as training in a non-simulated environment, not better (Kaplan et al. 2021)."), tt("Its case rests on what the real setting cannot offer: danger, cost, access.")],
          [tt("Visualisation and situational help"), tt("Immersive displays can show what cannot be seen, such as the inside of a machine, but each added object adds load (Lavie 2005)."), tt("Show the one thing the step needs.")],
          [tt("Sickness and comfort"), tt("A large share of users get cybersickness symptoms, with wide variation between studies (Rebenitsch and Owen 2016, as reported)."), tt("Make the comfort option easy to find, and never rely on the long session.")],
          [tt("Acceptance and effort"), tt("The people and the setting decide whether it is used at all; there is no figure that holds for every product."), tt("Test with the actual users in the actual place.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Motion sickness in VR follows Rebenitsch and Owen (2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["govuk2026", "apple2026", "kaplan2021", "gdsStandard"]}
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
      <DataTable
        caption={tt("Fascination or impact: how to test value and maturity")}
        head={[tt("Source"), tt("Real practice"), tt("What it means for a decision")]}
        rows={[
          [tt("Test the riskiest assumption"), tt("The GOV.UK Service Manual advises to define the problem, to test the riskiest assumptions with throwaway prototypes and to decide on the evidence, including the decision to stop (GOV.UK Service Manual)."), tt("Start with a cheap test of the value, not with a build.")],
          [tt("The case for the real setting"), tt("Training in extended reality was equally effective as non-simulated training (Kaplan et al. 2021)."), tt("Use immersive technology where the real thing is dangerous, rare or expensive.")],
          [tt("Phases and assessment"), tt("Services in the UK government are assessed against the Service Standard at the discovery, alpha, beta and live phases (GOV.UK Service Standard)."), tt("Define what a pilot must show before it may grow.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Reserving immersion for meaningful moments follows Apple's guidelines; reframing a solution as a problem follows the GOV.UK Service Manual. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["rebenitsch2016", "gibbons2018", "miller2020vr", "apple2026"]}
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
      <DataTable
        caption={tt("Ethics and responsibility: a real finding")}
        head={[tt("Topic"), tt("Real finding"), tt("What it means for a measure")]}
        rows={[
          [tt("Identifiability of movement"), tt("In a study with more than 500 participants who watched 360-degree videos, a simple model identified people with above 95% accuracy from less than five minutes of head and hand tracking data (Miller et al. 2020, as reported)."), tt("Treat motion data as personal data, even without a name attached.")],
          [tt("Comfort and choice"), tt("Apple's guidelines ask that people choose when to enter and exit an immersive experience and that comfort is considered (Apple, Immersive experiences)."), tt("Build consent, comfort and an exit into the first version.")],
          [tt("Who is harmed"), tt("Sickness, disorientation and data exposure fall on the user (Rebenitsch and Owen 2016; Miller et al. 2020)."), tt("Ask who could be harmed before asking what could be shown.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["govuk2026", "apple2026", "milgram1994"]}
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
      <DataTable
        caption={tt("Future technologies as decision architecture: structures")}
        head={[tt("Part"), tt("Real example"), tt("What it means")]}
        rows={[
          [tt("A map of the field"), tt("The reality–virtuality continuum organises the technologies into one map (Milgram and Kishino 1994)."), tt("Use one map for the portfolio, so bets are comparable.")],
          [tt("Phased evidence"), tt("The GOV.UK phases move from discovery to alpha, beta and live, each with a test of the riskiest assumption (GOV.UK Service Manual)."), tt("Give each bet a phase and a question.")],
          [tt("Platform rules"), tt("Apple's guidelines set expectations for comfort and for entering and leaving immersion (Apple, Immersive experiences)."), tt("Build on the rules of the platform instead of inventing your own.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} Discovery, alpha and the decision to go on or stop follow the GOV.UK Service Manual. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["govuk2026", "slater2016", "kaplan2021", "rebenitsch2016", "miller2020vr"]}
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
      <DataTable
        caption={tt("Conflicts of the future, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Innovation against user value"), tt("Training in extended reality was about as effective as non-simulated training, not more (Kaplan et al. 2021)."), tt("Ask which user problem it solves better than the plain way.")],
          [tt("Visibility against maturity"), tt("Cybersickness estimates range from about 30% to 80% of users in the reviewed work (Rebenitsch and Owen 2016, as reported)."), tt("Show it only where it works in the real environment, at scale.")],
          [tt("Investment risk against falling behind"), tt("Government practice tests the riskiest assumption with a throwaway prototype first (GOV.UK Service Manual)."), tt("Choose the smallest bet that teaches enough.")],
          [tt("Ethics against speed"), tt("Tracking data of five minutes can identify a person among hundreds (Miller et al. 2020, as reported)."), tt("Ask what it records and who could be harmed.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} The bets are a reading of the example, not a rule for every company. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["govuk2026", "simon1956", "klein2007", "gdsStandard", "miller2020vr"]}
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
      <DataTable
        caption={tt("Who decides on future technologies: real practice")}
        head={[tt("Part"), tt("Real example"), tt("What it means")]}
        rows={[
          [tt("Gates"), tt("Each phase of a UK government service ends with an assessment against the Service Standard (GOV.UK Service Standard)."), tt("Write the gate for each pilot: use, completion, support, cost, by a date.")],
          [tt("The stop right"), tt("The guidance says to decide on evidence, including to stop (GOV.UK Service Manual)."), tt("Name who may stop a pilot, and give product safety a stop at any time.")],
          [tt("The record"), tt("Motion data is identifying (Miller et al. 2020, as reported)."), tt("Record what each pilot collects, and who can see it.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BL()} “It's not a failure to stop” follows the GOV.UK Service Manual; deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("The most expensive innovation decisions are the ones nobody made: pilots that were never stopped and never scaled, kept alive by goodwill. A gate with a date forces the decision. Write the stop criteria down before the pilot starts, when nobody is attached to it yet.")}</p>
      </Extra>
    </MaterialCard>
  );
}
