"use client";

import type { ReactNode } from "react";
import { ATFig, ArchitectureFig, ConflictFig, DecisionFig, LayersChainFig, LensFig, PredictFig, ReadabilityFig, StepsFig, StimulusFig, WeighFig } from "@/components/day13/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D13 } from "@/components/day13/comicScenes";
import { COMICS_D13 } from "@/data/day13/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the
 * rules it gives the task (folded) → sources → Mark as read. Example company and people: Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas; never StudyPath, JobAccess
 * or LifeGuide, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings keep the original Day 13's
 * points (not a side topic, the mental model of the designer, patterns that help many at once) in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const HE = () => tt("Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Minds differ in how they take in, process and remember information. ADHD: overstimulation, distraction, complex task structures, lack of focus. Autism: sensory overload, unclear navigation logic, inconsistent patterns, ambiguous communication. Dyslexia: difficult reading structures, unsuitable typography, unclear text structure, complex language.")}
      sources={["barkley2015", "pun2016", "bda2023"]}
      reasoning={[
        tt("Look at a screen through three lenses: ADHD, autism, dyslexia."),
        tt("Ask what overloads, what confuses, and what tires."),
        tt("Remember that many people without a diagnosis feel the same in stress."),
        tt("Tell neurodiverse needs apart from general usability: the same screen can be usable and still overload."),
        tt("Expect some needs to pull in different directions, and test to find the balance."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A1} art={ART_D13} />
      <LensFig />
      <DataTable
        caption={tt("Load factors by mind, and what usually helps")}
        head={[tt("Mind"), tt("What loads most"), tt("What usually helps")]}
        rows={[
          [tt("ADHD"), tt("Overstimulation, distraction, complex task structures, lack of focus."), tt("One main task, quiet extras, short steps, a visible next step.")],
          [tt("Autism"), tt("Sensory overload, unclear navigation logic, inconsistent patterns, ambiguous words."), tt("Calm colours, the same patterns everywhere, literal and descriptive words.")],
          [tt("Dyslexia"), tt("Difficult reading structures, unsuitable typography, unclear structure, complex language."), tt("Left-aligned, readable type, spacing, headings, plain language, read-aloud.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} The load factors are the ones the plan names; ADHD as a difference in attention and executive function follows Barkley (2015); the dos and don'ts follow the Home Office posters (Pun 2016) and the British Dyslexia Association (2023).`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Many hurdles come less from technology than from the mental model of the people who design: a team that reads fast, ignores banners easily and likes variety builds a product for people like itself. Neurodiversity asks the team to design for minds that work differently from their own, and to test with them, because intuition is exactly what fails here.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Every element competes for attention. A busy page is hard to start, easy to drift from and tiring to finish, for people with ADHD or sensory sensitivity most of all. Show one main task first, keep extras quiet, avoid movement and interruptions, and break long tasks into short steps.")}
      sources={["coga2021", "barkley2015"]}
      reasoning={[
        tt("Count what competes for attention on the first screen."),
        tt("Is the most important task the most visible thing?"),
        tt("Does anything move, blink or pop up without being asked?"),
        tt("Are long tasks broken into steps with a visible position and a named next step?"),
        tt("Can people stop and come back without losing their place?"),
      ]}
    >
      <ComicButton comic={COMICS_D13.A2} art={ART_D13} />
      <StimulusFig />
      <StepsFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Limiting interruptions, avoiding too much content and five or fewer main choices per screen follow the W3C's “Making Content Usable” (2021).`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Stimulus reduction is often resisted because each element has an owner who wants it seen. The page fills up one reasonable request at a time. A rule such as “one main task per screen, everything else quiet” protects the page from its own stakeholders, and it helps the customers who never asked for the extras.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Predictability means people can tell what will happen: the menu stays in one place, the same action has the same name, buttons say what they do, words mean what they say. Inconsistent patterns and ambiguous words are a real barrier for many autistic people and raise anxiety for many others.")}
      sources={["pun2016", "coga2021"]}
      reasoning={[
        tt("Is the navigation in the same place on every page?"),
        tt("Does the same action always have the same name and place?"),
        tt("Do buttons say what they do (“Send meter reading”), not “Go” or “Click here”?"),
        tt("Is the language literal, without idioms or vague hints?"),
        tt("Does the product say what will happen before it happens?"),
      ]}
    >
      <ComicButton comic={COMICS_D13.A3} art={ART_D13} />
      <PredictFig />
      <DataTable
        caption={tt("Ambiguous or literal")}
        head={[tt("Ambiguous"), tt("Literal"), tt("Why it matters")]}
        rows={[
          [tt("“Let's go!”"), tt("“Report your move”"), tt("People know what will happen.")],
          [tt("“You're all set!”"), tt("“Your meter reading for 31 October was received.”"), tt("People know what was done.")],
          [tt("“Hang tight…”"), tt("“Loading your bills. This takes about 10 seconds.”"), tt("No idiom; a time to expect.")],
          [tt("“Oops, something went sideways”"), tt("“We could not save your reading. Please try again.”"), tt("What happened, and what to do.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Descriptive buttons, simple consistent layouts and no figures of speech follow the Home Office poster for users on the autistic spectrum (Pun 2016).`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Playful copy (“Oops!”, “Let's go!”) is often added to make a product feel friendly. For many autistic people, and for anyone using a translation tool or reading in a second language, it does the opposite: it hides what happened. Friendliness can be in the tone of a literal sentence; it does not need idioms.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Reading is work for people with dyslexia and for many others. Left-aligned text, a plain sans-serif font at a good size, enough line height and spacing, short lines and paragraphs, no blocks of capitals, italics or underlining, clear headings and plain language decide whether people read to the end.")}
      sources={["bda2023", "pun2016"]}
      reasoning={[
        tt("Left-aligned, never justified."),
        tt("At least 15 to 16 pixels, line height around 1.5, lines of 60 to 75 characters."),
        tt("No blocks of capitals, italics or underlining."),
        tt("Short paragraphs under clear headings; one idea per sentence."),
        tt("Let people change contrast and size; offer read-aloud where reading is long."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A4} art={ART_D13} />
      <ReadabilityFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} The typography advice follows the British Dyslexia Association's style guide (2023) and the Home Office poster for users with dyslexia (Pun 2016).`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Justified text is a print habit. On paper, with careful hyphenation, it looks tidy; on a screen it opens uneven gaps between words that form “rivers” down the text, and readers with dyslexia lose their place in them. Left alignment costs nothing and removes the problem.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Inclusive design patterns help several groups at once; assistive technologies let people use content their own way, but only on a good base; and only prototypes tested with real people show the real hurdles. Test orientation, stimulus load, task completion, readability and the feeling of control. Weigh measures on effect, gain for inclusion, feasibility, risk and time pressure.")}
      sources={["coga2021", "houde1997", "kelley1984", "gibbons2018"]}
      reasoning={[
        tt("Prefer a pattern that helps many (steps, one main task, descriptive buttons) over a special screen."),
        tt("Check that assistive technology can work: real headings, buttons, text, layouts that grow."),
        tt("Prototype the entry pages, the navigation and the core forms first."),
        tt("Test with neurodivergent people, with the support they need, also in a stressful moment."),
        tt("Evaluate where people stop, hesitate or feel unsure, not only technical errors."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A5} art={ART_D13} />
      <ATFig />
      <DataTable
        caption={tt("A first test plan for a Hearth Energy prototype")}
        head={[tt("Part"), tt("What we do")]}
        rows={[
          [tt("What the prototype contains"), tt("The start page, the menu, and the moving-house form in steps; a quiet mode.")],
          [tt("Who takes part"), tt("Six customers, among them people with ADHD, autistic people and people with dyslexia; asked ahead what support they need.")],
          [tt("Tasks"), tt("Send a meter reading; report a move; find your last bill.")],
          [tt("A stressful moment"), tt("A phone call in the middle of the form; a time limit on one task.")],
          [tt("What we watch"), tt("Orientation, stimulus load, task completion, readability, the feeling of control.")],
          [tt("How we evaluate"), tt("Where people stopped, hesitated, misread or felt unsure; quotes; then the next change.")],
        ]}
      />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Including people in usability testing and asking ahead about support follow the W3C's “Making Content Usable” (2021); choosing a prototype by its question follows Houde and Hill (1997) and Kelley (1984); rating options on the same criteria follows Gibbons (2018).`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Inclusive design is often presented as adaptation: extra options for people who need them. The stronger argument is architecture: the patterns that neurodivergent people need most (calm, consistent, readable, step by step) make the product better for nearly everyone, and they make assistive technology work. A better base is cheaper than many special cases.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Treated as a special case, neurodiversity becomes an option few people find. At senior level it is a strategic dimension of product architecture: calm, predictable, readable defaults built from shared patterns, with adaptation modes on top. The question is which base to build, not which option to add.")}
      sources={["coga2021", "holmes2018"]}
      reasoning={[
        tt("Check whether neurodiverse needs sit in the base or in an option."),
        tt("Write a guiding vision: relief, predictability, readability, adaptability."),
        tt("Put the inclusive patterns in the design system, so every product gets them."),
        tt("Add modes on top of the base, after tests show who uses them."),
        tt("Order the work: shared patterns and journeys taken in stress first."),
      ]}
    >
      <ComicButton comic={COMICS_D13.B1} art={ART_D13} />
      <ArchitectureFig />
      <LayersChainFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Inclusion as better design for many follows Holmes (2018); a simplified version from the same code base follows the W3C's “Making Content Usable” (2021).`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("The “easy mode” is attractive to management because it is visible and contained: one switch, one announcement. It is also the version that changes least for most customers. The harder message for a board is that the default itself is the product most people use, and that is where inclusion has to happen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Neurodiverse UX sits between one standard and individual adaptation, a dynamic brand and a calm interface, economic viability and the diversity of users, and the cost of testing against the risk of not testing. Decide what belongs in the base, what becomes a mode, and whom to test with first; write down the assumptions.")}
      sources={["coga2021", "pun2016"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: marketing, engineering, research, finance, users."),
        tt("Put what helps nearly everyone into the base; make only what pulls apart into a mode."),
        tt("Write down the assumptions about user diversity, standardisation and cost, and which would be critical if wrong."),
        tt("Choose a small, well-composed test over no test."),
        tt("Say what the choice gives up."),
      ]}
    >
      <ComicButton comic={COMICS_D13.B2} art={ART_D13} />
      <ConflictFig />
      <DataTable
        caption={tt("Standing conflicts of neurodiverse UX")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("One standard against individual adaptation"), tt("Engineering, against the people a standard does not fit."), tt("Which needs pull apart, and which do all share?")],
          [tt("A dynamic brand against a calm interface"), tt("Marketing, against UX and support."), tt("Where can the brand live without competing with the task?")],
          [tt("Economic viability against diversity"), tt("Finance, against users."), tt("What does the busy default cost in support calls and abandoned tasks?")],
          [tt("Test effort against the risk of not testing"), tt("Finance, against research."), tt("Which small test would find the most serious hurdles?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} That some needs pull in different directions, and that testing finds the balance, follows the Home Office's note on its posters (Pun 2016).`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("The most expensive assumption is usually “neurodivergent customers are a small group”. Many people never had a diagnosis, and anyone under stress (after a high bill, a bereavement, a move) processes like someone with less attention to spare. Designing for the stressed customer is designing for a large share of the customers who matter most to a service.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Neurodiverse UX needs an owner of the principles and patterns, a test strategy that includes neurodivergent people with the right support, checks in every release, and a rule for when brand, technology, product logic and inclusion disagree. With patchy test data, a decision says what it decides, does not know, would reverse and gives up.")}
      sources={["coga2021", "simon1956", "klein2007"]}
      reasoning={[
        tt("Name who owns the principles, and who owns the patterns in the design system."),
        tt("Name who owns the test strategy, and give them a stop right."),
        tt("Include neurodivergent people in research and tests, with a quiet room, breaks and time."),
        tt("Settle conflicts by the user's ability to complete a task in stress first, then brand, then convenience."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D13.B3} art={ART_D13} />
      <DecisionFig />
      <DataTable
        caption={tt("Four parts of neurodiverse UX governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Hearth Energy)")]}
        rows={[
          [tt("Owners"), tt("Who owns the principles and the patterns?"), tt("The head of UX the principles; the design system team the patterns.")],
          [tt("Test strategy"), tt("Who tests what, with whom, before release?"), tt("Research tests the key journeys with six people incl. neurodivergent customers; may stop a release.")],
          [tt("Checks"), tt("How does each release keep the base calm and consistent?"), tt("A pattern check in the definition of done.")],
          [tt("How a conflict is decided"), tt("What happens when brand, technology, product logic and inclusion disagree?"), tt("Completing a task in stress first, then brand, then convenience; the board settles a tie.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Including people with cognitive and learning disabilities in research and testing follows the W3C's “Making Content Usable” (2021); deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Without an owner, a design system drifts: each product adds one exception, and two years later the consistency that autistic customers relied on is gone. Owning the patterns means saying no to exceptions, and it is the least visible and most important job in neurodiverse UX.")}</p>
      </Extra>
    </MaterialCard>
  );
}
