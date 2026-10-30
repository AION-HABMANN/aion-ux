"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, DecisionFig, FitFig, FreedomFig, LayersChainFig, LoadFig, MemoryFig, ModesFig, PrototypesFig, RequirementsFig, WeighFig } from "@/components/day11/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D11 } from "@/components/day11/comicScenes";
import { COMICS_D11 } from "@/data/day11/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the
 * rules it gives the task (folded) → sources → Mark as read. Example company and people: Ladle, Noor, Ole, Freya and Piet; never HomeAssist Voice, CareVoice or
 * CityHelp Voice, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings keep the original Day 11's
 * points (voice is not a symbol of innovation, the frustrating hotline loop, "test the risky moments") in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const LD = () => tt("Ladle, Noor, Ole, Freya and Piet are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("A screen shows every option at once, a chat keeps a written record, voice leaves nothing to look at. Voice offers hands-free use, speed, accessibility, situational relief and natural interaction; it fails through misunderstandings, lost context, error-proneness, invisible options and high expectations of naturalness.")}
      sources={["cohen2004", "pearl2016", "xiong2017", "koenecke2020", "strayer2015", "wcag22"]}
      reasoning={[
        tt("Ask which mode a task needs: screen, chat or voice."),
        tt("Name the chance voice offers here: hands-free, speed, accessibility, relief, natural."),
        tt("Name the limit next to it: misunderstanding, lost context, error, invisible options, expectations."),
        tt("Check what people must remember after a spoken answer."),
        tt("Expect people to talk to it like a person; check what happens when it cannot keep up."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A1} art={ART_D11} />
      <ModesFig />
      <DataTable
        caption={tt("What voice can do, and where it fails")}
        head={[tt("Chance"), tt("What it looks like"), tt("Limit"), tt("How it shows")]}
        rows={[
          [tt("Hands-free"), tt("Cooking, driving, carrying."), tt("Misunderstandings"), tt("“Thirteen” for “thirty”.")],
          [tt("Speed"), tt("One sentence instead of five taps."), tt("Loss of context"), tt("“And for four people?” is not linked to the recipe.")],
          [tt("Accessibility"), tt("For people who cannot see or use a screen well."), tt("Error-proneness"), tt("Noise, accents, half sentences.")],
          [tt("Situational relief"), tt("Help at the moment hands are busy."), tt("Invisible options"), tt("Nobody sees what can be said.")],
          [tt("Natural interaction"), tt("Talking is learned, not taught."), tt("High expectations"), tt("People expect it to understand like a person.")],
        ]}
      />
      <DataTable
        caption={tt("What voice can do and where it fails: evidence")}
        head={[tt("Topic"), tt("Real finding or rule"), tt("What it means for a screen")]}
        rows={[
          [tt("Accuracy in a test"), tt("A research system reached a word error rate of 5.1% on a standard test of telephone conversations, which the authors report as matching the human transcription error of the careful benchmark (Xiong et al. 2017)."), tt("Recognition can be very good under test conditions; the test is not your users' kitchen.")],
          [tt("Accuracy for whom"), tt("In a study of five commercial speech recognition systems, the average word error rate was 0.35 for Black speakers and 0.19 for white speakers (Koenecke et al. 2020)."), tt("Test with the full range of your users' voices, or the error-proneness lands on some of them.")],
          [tt("Hands-free is not risk-free"), tt("In a study of the infotainment systems of ten cars, mental distraction after a task lasted up to 27 seconds for the worst-performing systems, and practice did not remove it (Strayer et al. 2015, as reported)."), tt("Voice in a driving or cooking context still takes attention: keep dialogues short.")],
          [tt("Voice and accessibility"), tt("WCAG 2.2 asks that the accessible name of a control contains its visible label (success criterion 2.5.3), so that people who control a screen by voice can say what they see."), tt("Name the controls the way they are written on screen.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Dialogue logic and the strengths and limits of spoken interfaces follow Cohen et al. (2004) and Pearl (2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Voice is often launched as a symbol: it shows that a company is modern. The test of whether it is more than a symbol is simple: would people miss it if it were gone, for a task they do often? A timer while cooking passes; “ask me anything” usually does not. When voice is a symbol, the cost is paid by the people who believed it and got stuck.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A good voice interface needs clear dialogue logic, clear expectations, feedback, error handling, repeatability and user control. Without them a misunderstanding becomes a loop, and people stop trusting it.")}
      sources={["pearl2016", "cohen2004", "norman2013", "nielsen1994", "cowan2001"]}
      reasoning={[
        tt("Dialogue logic: one question at a time, and it is clear whose turn it is."),
        tt("Expectations: does it say what it can do?"),
        tt("Feedback: does it say what it understood and did?"),
        tt("Error handling: after a miss, a better question; after the second, another way (a screen, a person)."),
        tt("Repeat and control: can people hear it again, stop, change or go back?"),
      ]}
    >
      <ComicButton comic={COMICS_D11.A2} art={ART_D11} />
      <RequirementsFig />
      <DataTable
        caption={tt("Six requirements, and the sentence that shows each")}
        head={[tt("Requirement"), tt("Without it"), tt("With it (Ladle)")]}
        rows={[
          [tt("Dialogue logic"), tt("Four instructions and a question in one breath."), tt("“Step 3: fold in the egg whites. Say next when ready.”")],
          [tt("Clear expectations"), tt("People guess what it understands."), tt("“You can say: next, repeat, timer, stop.”")],
          [tt("Feedback"), tt("“Okay.”"), tt("“Timer for 5 minutes, for the nuts, started.”")],
          [tt("Error handling"), tt("“Sorry, I didn't understand that.” Twice."), tt("“Five minutes, or ten?” then the screen.")],
          [tt("Repeatability"), tt("“We are at step 4.”"), tt("“Step 3: fold in the egg whites.”")],
          [tt("User control"), tt("“Timer cannot be changed.”"), tt("“Timer stopped. Say start to start again.”")],
        ]}
      />
      <DataTable
        caption={tt("A good voice dialogue: principles with sources")}
        head={[tt("Requirement"), tt("Real principle"), tt("What it means for a dialogue")]}
        rows={[
          [tt("Clear expectations"), tt("Norman calls the quality that makes the available actions visible discoverability (Norman 2013); with voice, nothing is visible unless the system says it."), tt("Say what can be said, at the moment it matters: “You can say next, repeat, timer, stop.”")],
          [tt("Feedback"), tt("One of the ten heuristics asks the system to keep users informed about what is going on, through appropriate feedback within a reasonable time (Nielsen 1994)."), tt("Repeat back what was understood: “Timer for 5 minutes, for the nuts, started.”")],
          [tt("Error handling"), tt("Another heuristic asks that error messages are expressed in plain language, indicate the problem and suggest a solution (Nielsen 1994)."), tt("Ask a narrow question after a failure, and offer the screen as a way out.")],
          [tt("Repeatability"), tt("Speech passes by and cannot be re-read; working memory holds about four chunks (Cowan 2001)."), tt("Let people say “repeat”, and keep each answer to a few chunks.")],
          [tt("Design practice"), tt("Voice interface design books describe the same elements: dialogue logic, prompts, confirmation and recovery (Cohen et al. 2004; Pearl 2016)."), tt("Write the dialogue as a script and read it aloud before building it.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Setting expectations, confirming and escalating errors follow Pearl (2016); feedback and visible options follow Norman (2013). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("The hotline loop everybody knows, “Sorry, I didn't understand. Returning to the main menu”, is not a technical failure but a design decision: someone decided that a misunderstanding ends where it began. Error handling is where a voice interface earns or loses trust, because it is the moment people need it most and have the least patience.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Neuro-design asks what the brain needs: predictability, cognitive relief, trust, a clear mental model and fewer stimuli. Voice raises the load quickly, because everything said must be held in working memory, which holds only a few things.")}
      sources={["cowan2001", "sweller1988", "norman2013", "strayer2015"]}
      reasoning={[
        tt("Predictability: does the same request give the same kind of answer?"),
        tt("Relief: does the interface remember, so the person does not have to?"),
        tt("Mental model: can people picture what it can and cannot do?"),
        tt("Stimulus reduction: is there one thing per answer, or five?"),
        tt("Count the options in a spoken answer: past three or four, people lose them."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A3} art={ART_D11} />
      <MemoryFig />
      <LoadFig />
      <DataTable
        caption={tt("Predictable, light on memory, calm: evidence")}
        head={[tt("Principle"), tt("Real finding"), tt("What it means for a voice screen")]}
        rows={[
          [tt("Light on memory"), tt("People hold about four chunks in mind at once (Cowan 2001)."), tt("Offer at most three options in one prompt, and say the most likely one first.")],
          [tt("Less extraneous load"), tt("Effort spent on working out the interface is missing for the task (Sweller 1988)."), tt("Do not make people remember the commands: say them.")],
          [tt("Load can be measured"), tt("Distraction ratings of voice systems in cars ranged from 2.4 for the best system to 4.6 for the worst on a five-point scale (Strayer et al. 2015, as reported)."), tt("Measure the load of a dialogue, for example with a dual task, before launch.")],
          [tt("Mental models"), tt("People act on what they believe a system is and does (Norman 2013)."), tt("Tell the person what kind of assistant it is, and keep that behaviour stable.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} The small capacity of working memory follows Cowan (2001); extra load leaving less for the task follows Sweller (1988); mental models follow Norman (2013). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("An intelligent interface can lower load (it remembers the recipe, the time, the last step) or raise it (it adds tips, offers and choices to every answer). The difference is rarely the technology; it is what the team decided to say. The calmer interface usually feels more intelligent, because people can follow it.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("A functional prototype tests whether the technology works, an interaction prototype how the dialogue feels (often a person secretly plays the system), a test prototype whether real users manage real tasks. Test comprehensibility, error robustness, met expectations, transparency and acceptance, and test risky situations on purpose.")}
      sources={["houde1997", "kelley1984", "koenecke2020", "xiong2017"]}
      reasoning={[
        tt("Name the question first, then choose the prototype."),
        tt("Try a dialogue with a person playing the system before building it."),
        tt("Test the five aspects: comprehensibility, error robustness, expectations met, transparency, acceptance."),
        tt("Sort test scenarios by risk; test the high-risk and ambiguous ones on purpose."),
        tt("Test with the people who will find it hardest, not only with colleagues."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A4} art={ART_D11} />
      <PrototypesFig />
      <DataTable
        caption={tt("A Ladle test plan by risk level")}
        head={[tt("Risk level"), tt("Example scenario"), tt("Tested how"), tt("Must pass before")]}
        rows={[
          [tt("Low"), tt("Next step, repeat, timer."), tt("Test prototype, a few cooks."), tt("Launch.")],
          [tt("Medium"), tt("Change a running timer; noise; half sentences."), tt("Test prototype in real kitchens, on purpose."), tt("Launch.")],
          [tt("High"), tt("Allergy substitutes; paying."), tt("Wizard of Oz first, then test prototype, with the nutrition team."), tt("Any voice answer at all.")],
        ]}
      />
      <DataTable
        caption={tt("Prototyping and testing an AI interface: methods and findings")}
        head={[tt("Method or finding"), tt("Real source"), tt("What it means for a test")]}
        rows={[
          [tt("Wizard of Oz"), tt("In the 1984 study of natural language office applications, a person played the part of the system behind the screen, so the design could be tested before it was built (Kelley 1984)."), tt("Test the dialogue with a hidden human first; build the recogniser later.")],
          [tt("What a prototype is for"), tt("A prototype can answer questions about the role of a product, about its look and feel, and about its implementation (Houde and Hill 1997)."), tt("Say which of the three questions each prototype answers: functional, interaction or test prototype.")],
          [tt("Test with all voices"), tt("Recognition error rates differ between groups of speakers (Koenecke et al. 2020)."), tt("Recruit test participants across accents, ages and speaking styles.")],
          [tt("A test set is not the world"), tt("A word error rate of 5.1% was measured on a standard telephone test set (Xiong et al. 2017)."), tt("Test in the real setting: noise, half sentences, interruptions.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Choosing a prototype by its question follows Houde and Hill (1997); the Wizard-of-Oz method follows Kelley (1984). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Most voice tests use the easy cases, because they make the demo look good. The cases that decide trust are the ambiguous and the sensitive ones, and they are exactly the ones nobody wants to try in front of the board. A risk-based test plan forces them onto the list before the public finds them.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Voice belongs where tasks are simple, frequent and clear, hands or eyes are busy and a mistake is cheap. Leaders keep technology where it supports reliably instead of impressing. Weigh measures on effect on users, feasibility, risk and time pressure.")}
      sources={["pearl2016", "gibbons2018", "koenecke2020", "strayer2015", "norman2013"]}
      reasoning={[
        tt("Ask the five questions of every task: hands busy, frequent, few known choices, short answer, cheap if wrong."),
        tt("Keep voice where most answers are yes; give the rest a screen or a person."),
        tt("Prefer a reliable small voice service to an impressive broad one."),
        tt("Rate every measure on the same four questions, with a reason; a rating is a judgement, never a mark."),
        tt("Say what you leave out on purpose."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A5} art={ART_D11} />
      <FitFig />
      <WeighFig />
      <DataTable
        caption={tt("Where voice belongs: evidence")}
        head={[tt("Topic"), tt("Real finding or rule"), tt("What it means for a measure")]}
        rows={[
          [tt("Good fit"), tt("Hands and eyes are busy, the task is short and frequent, and the vocabulary is small (Pearl 2016)."), tt("Choose voice for the tasks that fit this profile.")],
          [tt("Poor fit"), tt("Error rates differ between speakers (Koenecke et al. 2020), and invisible options make rare commands undiscoverable (Norman 2013)."), tt("Keep a screen path for rare and sensitive tasks.")],
          [tt("Risk in context"), tt("Hands-free systems in cars still distract for many seconds after a task (Strayer et al. 2015, as reported)."), tt("Rate each voice journey by the cost of a wrong action and of lost attention.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} When voice is the wrong choice follows Pearl (2016); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("A narrow voice service that always works earns the trust a broad one later needs. Teams that start broad meet their hardest cases first, in public, and spend the trust before they have it. The responsible choice often looks less innovative at launch and more innovative a year later.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Inside many companies voice is first an innovation signal. At senior level voice and AI interaction are part of the service architecture: which relief, control and service experience the company creates, where voice is used and where not, how it hands over, and how it is tested before it grows.")}
      sources={["pearl2016", "norman2013", "cohen2004", "eu2024aiact"]}
      reasoning={[
        tt("Check where voice is decided today: in a vision, or one feature at a time?"),
        tt("Write a guiding vision: the relief, the control, the service experience."),
        tt("Decide the fields of use for voice, and where it is not used."),
        tt("Decide how voice hands over to a screen or a person."),
        tt("Order the journeys: simple, frequent, clear and cheap if wrong first."),
      ]}
    >
      <ComicButton comic={COMICS_D11.B1} art={ART_D11} />
      <ArchitectureFig />
      <LayersChainFig />
      <DataTable
        caption={tt("Voice as a service architecture: structures")}
        head={[tt("Part"), tt("Real example or source"), tt("What it means")]}
        rows={[
          [tt("Principles for speaking, confirming and failing"), tt("Voice design practice treats the persona, the prompts, the confirmation and the recovery as one designed whole (Cohen et al. 2004; Pearl 2016)."), tt("Define the principles once, for every voice journey.")],
          [tt("A duty to tell"), tt("The EU AI Act (Article 50) requires that people are told when they interact with an AI system, unless that is obvious from the context."), tt("Make the voice announce what it is.")],
          [tt("Discoverability"), tt("Voice leaves the options invisible (Norman 2013)."), tt("Plan where the screen shows what the voice can do.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} The design of spoken services follows Pearl (2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A guiding vision for voice is short and testable. “Ladle lets you cook with your hands full: short, clear, and you are always in charge” can be checked on every dialogue: is this answer short, is it clear what to say, can the cook stop it? “Voice-first” cannot be checked, and it invites voice everywhere.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Voice sits between comfort and precision, trust and effort, robustness and natural conversation, and all of them against scalability. Decide per journey how free the dialogue may be, where a screen confirms and where a person takes over, and write down the assumptions the plan rests on.")}
      sources={["pearl2016", "cowan2001", "koenecke2020", "xiong2017", "strayer2015"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: product, safety, support, sales."),
        tt("Decide per journey: free speech, voice with a screen, or a screen or person."),
        tt("Write down the assumptions about naturalness, behaviour, acceptance and scalability, and which would be critical if wrong."),
        tt("Remember that what works for three journeys may not work for twenty."),
        tt("Say what the choice gives up."),
      ]}
    >
      <ComicButton comic={COMICS_D11.B2} art={ART_D11} />
      <FreedomFig />
      <DataTable
        caption={tt("Standing conflicts of voice")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Comfort against precision"), tt("Product, against safety and service."), tt("What happens if it hears the wrong word here?")],
          [tt("Natural conversation against robustness"), tt("Marketing, against engineering and support."), tt("How often will it fail, and where does the person go then?")],
          [tt("Innovation against trust"), tt("The board, against the people who answer complaints."), tt("What happens after its first public mistake?")],
          [tt("All of these against effort and scalability"), tt("Finance and engineering, against everyone."), tt("What does each new journey cost to build and to test?")],
        ]}
      />
      <DataTable
        caption={tt("Conflicts of voice, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Comfort against precision"), tt("Word error rates of 0.19 to 0.35 were found across the speakers of five systems (Koenecke et al. 2020)."), tt("Ask what happens if it hears the wrong word here, and confirm where the cost is high.")],
          [tt("Natural conversation against robustness"), tt("A test result of 5.1% on a standard set does not predict the failure rate in real use (Xiong et al. 2017)."), tt("Plan how often it will fail and where the person goes then.")],
          [tt("Innovation against trust"), tt("Distraction after hands-free tasks lasted up to 27 seconds in the weakest systems (Strayer et al. 2015, as reported)."), tt("Plan what happens after its first public mistake.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} The conflicts are a reading of the example, not a rule for every product. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Scalability is the assumption most voice plans get wrong. Each new journey adds new words, new misunderstandings and new test cases, and they multiply rather than add. A plan that says “three journeys now, twenty next year” should say what has to be true for the next seventeen, and how the company will know.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Voice and AI interaction need owners: someone who owns the voice principles, test standards by risk level that must be met before a launch, the right to stop one, and a rule for when innovation, trust and effort disagree. With thin test data, a decision says what it decides, does not know, would reverse and gives up.")}
      sources={["simon1956", "klein2007", "strayer2015", "koenecke2020", "eu2024aiact"]}
      reasoning={[
        tt("Name who owns how the assistant speaks, confirms, fails and hands over."),
        tt("Write test standards by risk level, and say who signs off."),
        tt("Give someone the right to stop a launch."),
        tt("Settle conflicts by safety and trust first, then comfort, then effort; say who settles a tie."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D11.B3} art={ART_D11} />
      <DecisionFig />
      <DataTable
        caption={tt("Four parts of voice governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Ladle)")]}
        rows={[
          [tt("Who owns the principles"), tt("Who decides how it speaks, confirms, fails and hands over?"), tt("The head of product experience.")],
          [tt("Test standards"), tt("What must be tested, by risk level, before a launch?"), tt("Low: a few cooks; high: Wizard of Oz and real kitchens, with the nutrition team.")],
          [tt("The stop right"), tt("Who may stop a launch?"), tt("The test board of UX research, the nutrition team and support.")],
          [tt("How a conflict is decided"), tt("What happens when innovation, trust and effort disagree?"), tt("Safety and trust first, then comfort, then effort; the board settles a tie.")],
        ]}
      />
      <DataTable
        caption={tt("Voice governance: test standards and rules")}
        head={[tt("Part"), tt("Real example or rule"), tt("What it means")]}
        rows={[
          [tt("Test standards by risk"), tt("The automotive study rated ten systems with 257 drivers on a common scale, and a rating of 2 or more counted as potentially dangerous (Strayer et al. 2015, as reported)."), tt("Define the test and the threshold before the launch, by risk level.")],
          [tt("Who may stop a launch"), tt("Differences in recognition between groups of speakers were found only because the systems were tested across groups (Koenecke et al. 2020)."), tt("Give a test board with UX research, the domain experts and support the right to stop.")],
          [tt("The duty to inform"), tt("EU AI Act, Article 50."), tt("Add the notice to the release checklist.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("A test standard is only real if someone can say no. Without a stop right, a test board becomes a reporting step: it writes down the risks the launch then ignores. Give the right to stop to the people who will answer the complaints.")}</p>
      </Extra>
    </MaterialCard>
  );
}
