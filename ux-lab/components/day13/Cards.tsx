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
      sources={["barkley2015", "pun2016", "bda2023", "polanczyk2007", "who2022autism", "dyslexiaaction", "coga2021"]}
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
      <DataTable
        caption={tt("Different minds, different loads: how many people, and what the guidance says")}
        head={[tt("Topic"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("ADHD"), tt("A review of 102 studies with 171,756 children and adolescents found a pooled worldwide prevalence of ADHD of 5.29% (Polanczyk et al. 2007)."), tt("Distraction-prone users are in every audience: a quiet default serves them and everyone else.")],
          [tt("Autism"), tt("About one in 100 children has autism, as an average estimate with large differences between studies (World Health Organization 2022)."), tt("A predictable, literal interface is not a special case.")],
          [tt("Dyslexia"), tt("How many people have dyslexia depends on the definition and is best seen as a continuum; the often-quoted 10% has no traceable source (Dyslexia Action)."), tt("Design for a range of reading ability, not for a label.")],
          [tt("Where the guidance comes from"), tt("The W3C working group on cognitive accessibility publishes objectives and patterns as supplemental guidance beyond WCAG; following it is not required for WCAG conformance (W3C COGA 2021)."), tt("Use the patterns as a design toolkit and test them; do not claim conformance from them.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} The load factors are the ones the plan names; ADHD as a difference in attention and executive function follows Barkley (2015); the dos and don'ts follow the Home Office posters (Pun 2016) and the British Dyslexia Association (2023). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["coga2021", "barkley2015", "wcag22"]}
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
      <DataTable
        caption={tt("Stimuli and focus: rules")}
        head={[tt("Topic"), tt("Real rule"), tt("What it means for a screen")]}
        rows={[
          [tt("Moving content"), tt("Content that moves, blinks or scrolls, starts automatically and lasts more than five seconds must have a mechanism to pause, stop or hide it (WCAG 2.2.2)."), tt("No auto-playing carousels, tickers or animated backgrounds without a stop.")],
          [tt("Timing"), tt("Where a time limit is set, users must be able to turn it off, adjust it or extend it (WCAG 2.2.1)."), tt("Do not rush a task that needs thought.")],
          [tt("Motion on request"), tt("Browsers pass on the user's setting for reduced motion (the prefers-reduced-motion media feature), and WCAG 2.3.3 asks that motion triggered by interaction can be disabled (level AAA)."), tt("Respect the setting: calm by choice, lively by choice.")],
          [tt("Redundant entry"), tt("WCAG 2.2 asks that information a user already gave in the same process is not asked for again (3.3.7)."), tt("Carry data across steps: it spares the memory and the patience.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Limiting interruptions, avoiding too much content and five or fewer main choices per screen follow the W3C's “Making Content Usable” (2021). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["pun2016", "coga2021", "wcag22"]}
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
      <DataTable
        caption={tt("Predictability and literal words: rules and guidance")}
        head={[tt("Topic"), tt("Real rule or guidance"), tt("What it means for a screen")]}
        rows={[
          [tt("Consistent navigation"), tt("Navigation that repeats on several pages must keep the same relative order (WCAG 3.2.3), and components with the same function must be identified consistently (3.2.4)."), tt("Keep the same pattern in the same place on every page.")],
          [tt("Labels and instructions"), tt("Labels or instructions must be provided where content asks for user input (WCAG 3.3.2)."), tt("Say what is asked and in what format, before the person types.")],
          [tt("Understand and find"), tt("Among the objectives of the cognitive accessibility guidance are helping users understand what things are and how to use them, and helping users find what they need (W3C COGA 2021)."), tt("Use literal, descriptive words; avoid idioms and jokes in instructions.")],
          [tt("Unusual words"), tt("WCAG asks at its highest level that a mechanism is available for finding the meaning of unusual words, idioms and jargon (3.1.3)."), tt("If you must use a term, explain it where it appears.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Descriptive buttons, simple consistent layouts and no figures of speech follow the Home Office poster for users on the autistic spectrum (Pun 2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["bda2023", "pun2016", "rello2013", "wcag22"]}
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
      <DataTable
        caption={tt("Readability: what was tested")}
        head={[tt("Finding"), tt("What was measured"), tt("What it means for a screen")]}
        rows={[
          [tt("Fonts"), tt("Forty-eight readers with dyslexia read twelve texts in twelve fonts; Helvetica, Courier, Arial, Verdana and Computer Modern Unicode came out as good fonts, and italic fonts consistently reduced readability (Rello and Baeza-Yates 2013)."), tt("Use a plain sans-serif for body text and avoid italics for blocks of text.")],
          [tt("A special font"), tt("In the same study a font made for dyslexia did not lead to better or worse readability than the standard fonts, and the participants preferred Verdana and Helvetica (Rello and Baeza-Yates 2013)."), tt("A special font is not a shortcut: structure, size and spacing matter more.")],
          [tt("A style guide"), tt("The dyslexia style guide of the British Dyslexia Association recommends plain, left-aligned text with good spacing; summaries of it name sans-serif type of at least 12 points and a line spacing of about 1.5 (British Dyslexia Association 2023, as reported)."), tt("Set type size and line spacing as rules in your components.")],
          [tt("Reading level"), tt("WCAG asks at its highest level for supplemental content when text requires a reading ability beyond the lower secondary level (3.1.5)."), tt("Write at the level of the audience and give a summary where needed.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} The typography advice follows the British Dyslexia Association's style guide (2023) and the Home Office poster for users with dyslexia (Pun 2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["coga2021", "houde1997", "kelley1984", "gibbons2018", "nielsen2000five", "wcag22"]}
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
      <DataTable
        caption={tt("Patterns, assistive technology and testing: evidence")}
        head={[tt("Topic"), tt("Real finding or rule"), tt("What it means for a test")]}
        rows={[
          [tt("How many to test"), tt("In Nielsen's model, five users find about 85% of the usability problems of a design in a qualitative test; for each distinct group of users more are needed (Nielsen 2000, as reported)."), tt("Plan six or so participants per round, from several groups, and test again after fixes.")],
          [tt("What a prototype shows"), tt("A prototype can answer questions about role, look and feel and implementation (Houde and Hill 1997), and a hidden human can play the system in an early test (Kelley 1984)."), tt("Say which question the prototype answers, and test before you build.")],
          [tt("Authentication"), tt("WCAG 2.2 asks that a login does not depend on remembering or transcribing a code, unless an alternative is offered (3.3.8)."), tt("Test the login with a password manager and with paste.")],
          [tt("Self-determined use"), tt("People use their own assistive technologies and settings, such as a screen reader, reduced motion or a text size (WCAG 1.4.4, 2.3.3)."), tt("Test with people's own settings and tools.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Including people in usability testing and asking ahead about support follow the W3C's “Making Content Usable” (2021); choosing a prototype by its question follows Houde and Hill (1997) and Kelley (1984); rating options on the same criteria follows Gibbons (2018). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["coga2021", "holmes2018", "wcag22"]}
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
      <DataTable
        caption={tt("Neurodiverse UX as a better base architecture: structures")}
        head={[tt("Part"), tt("Real example or rule"), tt("What it means")]}
        rows={[
          [tt("A shared base"), tt("WCAG 2.2 added criteria that help people with cognitive and learning disabilities, such as redundant entry, accessible authentication and target size (WCAG 2.2)."), tt("Put the criteria into the base components, so every team inherits them.")],
          [tt("Supplemental guidance"), tt("The cognitive accessibility guidance gives objectives and patterns beyond WCAG (W3C COGA 2021)."), tt("Adopt the patterns that fit your journeys and test them.")],
          [tt("Mismatch as a view"), tt("Holmes treats disability as a mismatch between a person and a design and shows that solutions for one group extend to many (Holmes 2018)."), tt("Design the base for the range, not for the average.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Inclusion as better design for many follows Holmes (2018); a simplified version from the same code base follows the W3C's “Making Content Usable” (2021). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["coga2021", "pun2016", "rello2013", "wcag22", "nielsen2000five"]}
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
      <DataTable
        caption={tt("Conflicts of neurodiverse UX, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("One standard against individual adaptation"), tt("A special font did not beat plain standard fonts in a study with readers with dyslexia (Rello and Baeza-Yates 2013)."), tt("Ask which needs pull apart and which are shared; solve the shared ones in the base first.")],
          [tt("A dynamic brand against a calm interface"), tt("Auto-playing movement must be stoppable (WCAG 2.2.2)."), tt("Let the brand live in images and headlines and keep the task area calm.")],
          [tt("Test effort against the risk of not testing"), tt("Five participants find most problems in a qualitative test (Nielsen 2000, as reported)."), tt("Run a small test early rather than a large one late.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} That some needs pull in different directions, and that testing finds the balance, follows the Home Office's note on its posters (Pun 2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
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
      sources={["coga2021", "simon1956", "klein2007", "nielsen2000five", "wcag22"]}
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
      <DataTable
        caption={tt("Owning neurodiverse UX: real rules")}
        head={[tt("Part"), tt("Real rule or source"), tt("What it means")]}
        rows={[
          [tt("Test strategy"), tt("A small qualitative test with several groups finds most serious problems (Nielsen 2000, as reported)."), tt("Fix the number and the groups in the plan, and name who runs it.")],
          [tt("Checks"), tt("WCAG 2.2 gives testable criteria for each requirement."), tt("Put a pattern check in the definition of done.")],
          [tt("Owners"), tt("Supplemental patterns have no conformance level of their own (W3C COGA 2021)."), tt("Name an owner for the patterns, or they are not applied.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${HE()} Including people with cognitive and learning disabilities in research and testing follows the W3C's “Making Content Usable” (2021); deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Without an owner, a design system drifts: each product adds one exception, and two years later the consistency that autistic customers relied on is gone. Owning the patterns means saying no to exceptions, and it is the least visible and most important job in neurodiverse UX.")}</p>
      </Extra>
    </MaterialCard>
  );
}
