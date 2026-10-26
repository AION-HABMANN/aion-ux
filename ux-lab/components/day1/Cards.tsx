"use client";

import type { ReactNode } from "react";
import { AimsFig, AttentionFig, ChannelsFig, ConflictFig, DecisionFig, LooksWorksFig, SeeChainFig, SteerChainFig, ToneFig, WeighFig4 } from "@/components/day1/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D1 } from "@/components/day1/comicScenes";
import { COMICS_D1 } from "@/data/day1/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Nordwind, Mia, Tom, Jana, Ben; never CarePath, SkillFlow or SafeHome, so no task is
 * answered here. Every statement comes from the plan's Wissen cell; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const NW = () => tt("Nordwind, Mia, Tom, Jana and Ben are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("UX is what people go through, UI is the surface. A design is judged by its effect on attention, understanding, feeling and decision, not only by how it looks.")}
      sources={["normanNielsen", "iso9241210", "norman2013", "tractinsky2000"]}
      reasoning={[
        tt("Describe the effect before you judge: what does the person notice first, understand, feel and do?"),
        tt("Separate taste (“I like it”) from an effect assumption (“users will probably overlook the button, because …”). Only the second can be tested."),
        tt("Check the mental model: does the screen work the way the person believes it works?"),
        tt("A beautiful page can work badly and a plain one well: judge each by what it does, not by how it looks."),
      ]}
    >
      <ComicButton comic={COMICS_D1.A1} art={ART_D1} />
      <LooksWorksFig />
      <DataTable
        caption={tt("The basic words of psychological UX design")}
        head={[tt("Word"), tt("What it means"), tt("On a screen")]}
        rows={[
          [tt("UX (user experience)"), tt("Everything a person goes through when using a product."), tt("Finding the trip, understanding it, booking, feeling sure it worked.")],
          [tt("UI (user interface)"), tt("The surface: what is seen and touched."), tt("Buttons, colours, type, layout.")],
          [tt("Perception"), tt("Taking in what the senses deliver."), tt("Seeing a banner, a button, a colour.")],
          [tt("Attention"), tt("What the mind picks out to work on."), tt("The banner is noticed, the small link is not.")],
          [tt("Cognition"), tt("Thinking, remembering, comparing, deciding."), tt("Working out which of three buttons books.")],
          [tt("Emotion"), tt("The feeling a design triggers."), tt("Feeling safe, rushed or worried.")],
          [tt("Mental model"), tt("What a person believes the product is and does."), tt("“The basket shows what I chose.”")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The definition of user experience follows ISO 9241-210 and Norman and Nielsen; mental models follow Norman (2013).`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("People rate an attractive interface as easier to use before they have used it (Tractinsky, Katz and Ikar 2000). That is why looks matter, and also why they mislead: the first judgement is not the experience. Psychological UX design takes both seriously and tests which one holds.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("The brain takes in the stimulus, steers attention, recognises patterns and makes sense of them. A strong signal pulls the eye by itself (bottom-up); the goal pulls it too (top-down).")}
      sources={["ittiKoch2001", "corbetta2002", "treisman1980"]}
      reasoning={[
        tt("Find the strongest signals on a screen: what moves, glows, is red or much larger than the rest. They are seen first."),
        tt("Ask whether the strongest signal is the task. If it is not, it competes with the task: count it as a distraction."),
        tt("Ask what the person is looking for (their goal) and whether it is easy to find with that goal in mind."),
        tt("A single feature, such as a colour, pops out at once; a combination of features has to be searched. Make the important thing differ in one clear way."),
      ]}
    >
      <ComicButton comic={COMICS_D1.A2} art={ART_D1} />
      <SeeChainFig />
      <AttentionFig />
      <DataTable
        caption={tt("Two forces of attention, and what they mean for a screen")}
        head={[tt("Force"), tt("What steers it"), tt("What it means for a screen")]}
        rows={[
          [tt("Bottom-up"), tt("The stimulus: movement, colour, contrast, size."), tt("Strong signals are seen first, wanted or not.")],
          [tt("Top-down"), tt("The person's goal, knowledge and expectation."), tt("People look for what they came for, in the words they expect.")],
          [tt("Both at once"), tt("A strong signal that is not the goal."), tt("Slower, with more mistakes: the signal competes with the task.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} Bottom-up attention follows Itti and Koch (2001); the two attention systems follow Corbetta and Shulman (2002).`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Feature-integration theory explains why a single red item among grey ones pops out immediately, while a red square among red circles and grey squares has to be searched item by item (Treisman and Gelade 1980). For a screen, it means: the important thing should differ from the rest in one clear way, and only a few things should differ at all.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("People bring prior knowledge, expectations, context and habits. A good interface uses them to give orientation, reduce confusion and steer attention to what matters.")}
      sources={["krug2014", "nielsen1994", "sweller1988"]}
      reasoning={[
        tt("Orientation: can the person tell where they are, what they can do here and what comes next?"),
        tt("Count how many elements are equally strong. Many equally strong elements mean there is no visual order: an orientation problem."),
        tt("A variation with no system (three button colours that mean nothing) breaks orientation, because the person cannot learn what a colour means."),
        tt("Every extra signal adds to the cognitive load. Small type on important information and moving elements that must be ignored cost effort that is missing for the task."),
        tt("Put things where people expect them and use the words they use; going against a habit is a cost, not a style."),
      ]}
    >
      <ComicButton comic={COMICS_D1.A3} art={ART_D1} />
      <AimsFig />
      <DataTable
        caption={tt("Three aims of an interface, and a sign that one is missing")}
        head={[tt("Aim"), tt("What it means"), tt("A sign it is missing")]}
        rows={[
          [tt("Orientation"), tt("Where am I, what can I do, what comes next."), tt("Nine equal tiles; no step line; the menu in an unexpected place.")],
          [tt("Less confusion"), tt("Few competing signals, one system, plain words."), tt("Three button colours with no meaning; legal text before the action.")],
          [tt("Steered attention"), tt("What matters is the strongest thing on the screen."), tt("A flashing banner is stronger than the main button.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The orientation questions follow Krug (2014); consistency and minimalist design follow Nielsen (1994); cognitive load follows Sweller (1988).`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Context changes the effect: the same screen is read differently by someone in a hurry, someone worried, or someone using it for the first time. A health app or an insurance portal is often opened in a stressful moment, so every extra signal weighs more than it would in a game.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("People feel a screen before they read it. Trust, reactance, overload, safety and liking work unconsciously; you infer them from the design and write them as a hypothesis.")}
      sources={["lindgaard2006", "brehm1966", "fogg2003", "kahneman2011"]}
      reasoning={[
        tt("A warning shown when nothing is wrong teaches people to ignore warnings or to feel unsafe: a trust problem and an emotional one."),
        tt("Pressure in the wording or the design (countdowns, “only 1 left”) can trigger reactance instead of action."),
        tt("Personal data placed next to advertising or clutter weakens the feeling of safety, often without the person knowing why."),
        tt("Write an effect as a hypothesis: “This element could make users feel …”. It is an assumption until it is tested."),
      ]}
    >
      <ComicButton comic={COMICS_D1.A4} art={ART_D1} />
      <ToneFig />
      <DataTable
        caption={tt("Five effects that work before thinking")}
        head={[tt("Effect"), tt("What builds it"), tt("What breaks it")]}
        rows={[
          [tt("Trust"), tt("Clear language, consistency, warnings that match a real risk."), tt("False alarms; data next to advertising.")],
          [tt("Reactance"), tt("(Avoid it) Leave people the choice."), tt("Countdowns, pressure, “only 1 left”.")],
          [tt("Overload"), tt("(Avoid it) Few signals, one step at a time."), tt("Many equal elements, moving notices, long texts.")],
          [tt("Safety"), tt("A visible way back, clear steps, a calm tone."), tt("Threatening wording; no sign of progress.")],
          [tt("Liking"), tt("Warmth, tone, visual quality."), tt("A cold or careless look; it helps, but it is not clarity.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The first impression follows Lindgaard et al. (2006); reactance follows Brehm (1966); how people judge credibility follows Fogg (2003).`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Kahneman (2011) describes two ways of judging: a fast, automatic one and a slow, deliberate one. Most of what a design does to people happens in the fast one, which is why users can rarely tell you that a red banner made them uneasy; they only know they did not trust the page.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("To put design measures in order, weigh each on the same four questions: effect on users, feasibility, risk and time pressure. The reason next to each rating carries the decision.")}
      sources={["gibbons2018", "nielsen1994"]}
      reasoning={[
        tt("Rate every measure on the same four questions, so they can be compared."),
        tt("Effect on users: what does it change for the people who use the product, and for how many?"),
        tt("Feasibility: can it be done with the people and the technical room there is? Risk: what could go wrong or backfire? Time pressure: does it fit the time, and does it show results soon?"),
        tt("A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer."),
        tt("When the conditions are tight, the measure with a high effect that can be done quickly and safely usually comes first."),
      ]}
    >
      <ComicButton comic={COMICS_D1.A5} art={ART_D1} />
      <WeighFig4 />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} Rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Many teams use Low, Medium and High for each criterion. The scale only helps if the reason is written next to it; without the reason, nobody can tell later why one measure came first, and nobody can check whether the reason still holds.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("A design steers what people perceive, understand, do and decide. A Neuro-UX strategy chooses one effect and makes every touchpoint serve it.")}
      sources={["norman2013", "kahneman2011", "normanNielsen"]}
      reasoning={[
        tt("Start from the effect you want (what should customers perceive, understand, feel and do?), then choose the design means."),
        tt("Prefer one shared effect logic for every channel over isolated improvements to single screens."),
        tt("Look at the changeovers between channels: that is where people are lost when each channel follows its own logic."),
        tt("Steering behaviour is a responsibility: say why an effect is in the customer's interest; if you cannot, it is a risk."),
      ]}
    >
      <ComicButton comic={COMICS_D1.B1} art={ART_D1} />
      <SteerChainFig />
      <ChannelsFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The chain from perception to decision restates the plan's “design as the steering of perception, behaviour and decision”.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("User experience, in Norman and Nielsen's definition, covers every part of a person's interaction with a company, its services and its products. A strategy therefore cannot stop at one channel: the customer judges the company by the whole journey, including the moment of moving from one channel to the next.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Goals pull against each other: aesthetics against clarity, innovation against familiarity, activation against overload. At management level, effort, risk, brand and economics join them.")}
      sources={["tractinsky2000", "krug2014", "gibbons2018"]}
      reasoning={[
        tt("Name the conflict as two goals before you choose between them."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
        tt("Optimising for aesthetics instead of effect gives a handsome interface that can still lose people: name it as a risk."),
        tt("A new pattern must earn the cost of being unfamiliar; where it does not, prefer the familiar one."),
        tt("Good management decisions balance user interest, feasibility, regulatory requirements, brand impact and resources."),
      ]}
    >
      <ComicButton comic={COMICS_D1.B2} art={ART_D1} />
      <ConflictFig />
      <DataTable
        caption={tt("Three standing conflicts of UX design")}
        head={[tt("Conflict"), tt("What each side gives"), tt("What to ask")]}
        rows={[
          [tt("Aesthetics against clarity"), tt("Attraction against ease of use."), tt("Does the look help people do what they came for?")],
          [tt("Innovation against familiarity"), tt("Surprise against effortless use."), tt("Is the new pattern worth learning?")],
          [tt("Activation against overload"), tt("Energy against mental load."), tt("How many activating elements before it tires people out?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The three conflicts are the plan's own; the matrix is a reading of the example, not a score.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Krug (2014) argues that conventions are a gift to the user: a pattern people already know needs no thinking. That is why innovation in an interface has a price paid by the user, and why it should be spent where it changes something that matters to them.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Design decisions are accountable effect decisions, not matters of taste. They need rules for who decides, and, because data is never complete, a decision that says what is not known and when it will be checked.")}
      sources={["simon1956", "klein2007", "kahneman2011"]}
      reasoning={[
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
        tt("Name who decides and on what basis whenever departments disagree; that is a governance question, not a design question."),
        tt("Prefer the decision that can be reversed and that the first results will show within a short time."),
        tt("Before you commit, imagine the plan has failed and ask why: the answers are the wrong assumptions to watch."),
        tt("Make the effect, the risk and the priority explicit, so the board can challenge them."),
      ]}
    >
      <ComicButton comic={COMICS_D1.B3} art={ART_D1} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of a governance model")}
        head={[tt("Part"), tt("The question"), tt("An example (Nordwind)")]}
        rows={[
          [tt("Who decides"), tt("Who may take which UX decision?"), tt("The head of customer experience, across channels.")],
          [tt("Who answers for it"), tt("Who carries the professional responsibility for the effect?"), tt("The head of customer experience.")],
          [tt("How conflicts are settled"), tt("What happens when departments want different things?"), tt("The effect principles decide; legal and IT may object with a reason; the board settles a tie.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Simon (1956) showed that people with limited time and information choose an option that is good enough rather than search for the best one. A manager who waits for complete data is not more careful; they have only postponed a decision under uncertainty and paid for the wait.")}</p>
      </Extra>
    </MaterialCard>
  );
}
