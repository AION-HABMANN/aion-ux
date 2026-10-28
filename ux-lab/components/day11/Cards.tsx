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
      sources={["cohen2004", "pearl2016"]}
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
        head={[tt("Chance"), tt("What it looks like"), tt("Limit"), tt("What it looks like")]}
        rows={[
          [tt("Hands-free"), tt("Cooking, driving, carrying."), tt("Misunderstandings"), tt("“Thirteen” for “thirty”.")],
          [tt("Speed"), tt("One sentence instead of five taps."), tt("Loss of context"), tt("“And for four people?” is not linked to the recipe.")],
          [tt("Accessibility"), tt("For people who cannot see or use a screen well."), tt("Error-proneness"), tt("Noise, accents, half sentences.")],
          [tt("Situational relief"), tt("Help at the moment hands are busy."), tt("Invisible options"), tt("Nobody sees what can be said.")],
          [tt("Natural interaction"), tt("Talking is learned, not taught."), tt("High expectations"), tt("People expect it to understand like a person.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Dialogue logic and the strengths and limits of spoken interfaces follow Cohen et al. (2004) and Pearl (2016).`)}</p>
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
      sources={["pearl2016", "cohen2004", "norman2013"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Setting expectations, confirming and escalating errors follow Pearl (2016); feedback and visible options follow Norman (2013).`)}</p>
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
      sources={["cowan2001", "sweller1988", "norman2013"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} The small capacity of working memory follows Cowan (2001); extra load leaving less for the task follows Sweller (1988); mental models follow Norman (2013).`)}</p>
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
      sources={["houde1997", "kelley1984"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Choosing a prototype by its question follows Houde and Hill (1997); the Wizard-of-Oz method follows Kelley (1984).`)}</p>
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
      sources={["pearl2016", "gibbons2018"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} When voice is the wrong choice follows Pearl (2016); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.`)}</p>
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
      sources={["pearl2016", "norman2013"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} The design of spoken services follows Pearl (2016).`)}</p>
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
      sources={["pearl2016", "cowan2001"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} The conflicts are a reading of the example, not a rule for every product.`)}</p>
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
      sources={["simon1956", "klein2007"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LD()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("A test standard is only real if someone can say no. Without a stop right, a test board becomes a reporting step: it writes down the risks the launch then ignores. Give the right to stop to the people who will answer the complaints.")}</p>
      </Extra>
    </MaterialCard>
  );
}
