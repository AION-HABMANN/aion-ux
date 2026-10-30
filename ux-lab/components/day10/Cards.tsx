"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, DataChainFig, DecisionFig, DepthFig, KindsFig, LayersChainFig, PersonalFig, ThreeQuestionsFig, WaysFig, WeighFig } from "@/components/day10/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D10 } from "@/components/day10/comicScenes";
import { COMICS_D10 } from "@/data/day10/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the
 * rules it gives the task (folded) → sources → Mark as read. Example company and people: Northline Rail, Ilka, Mats, Saskia and Bram; never SmartAssist,
 * CareerNavigator or CareGuide, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings keep the
 * original Day 10's points (automated is not intelligent, the three-question test, "which type is this?") in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const NL = () => tt("Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Three kinds of system can stand behind a smart-looking screen: a rule (same input, same output), an adaptive system (reacts to the situation now) and a learning system (changes with data about a person). An interface is intelligent when its support fits the situation; doing things automatically is only automation.")}
      sources={["horvitz1999", "amershi2019"]}
      reasoning={[
        tt("Ask which kind of system is behind a suggestion: a rule, the situation, or learning about the person."),
        tt("A rule can be explained in one sentence; check whether the screen says it."),
        tt("An adaptive system needs the situation to be read correctly; check what happens when it is misread."),
        tt("A learning system can change its answer over time; check whether people can see what it learned."),
        tt("Do not call it intelligent because it is automatic; call it intelligent when its help fits."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A1} art={ART_D10} />
      <KindsFig />
      <DataTable
        caption={tt("Three kinds of system behind an interface")}
        head={[tt("Kind"), tt("What it uses"), tt("Can it explain itself?"), tt("Typical mistake")]}
        rows={[
          [tt("Rule-based"), tt("Fixed rules written by people."), tt("Yes, in one sentence."), tt("Treats everyone the same, also when the situation differs.")],
          [tt("Adaptive"), tt("The situation now: place, time, device, the last step."), tt("Yes, if it names the situation."), tt("Misreads the situation.")],
          [tt("Learning"), tt("Data about the person, collected over time."), tt("Only partly; it has to be designed."), tt("Confident mistakes from old or missing data.")],
        ]}
      />
      <DataTable
        caption={tt("Kinds of intelligent behaviour: sources")}
        head={[tt("Source"), tt("Real finding or rule"), tt("What it means for a screen")]}
        rows={[
          [tt("Mixed initiative"), tt("Horvitz set out principles for interfaces in which the user and an automated service share the initiative, including acting only when the expected benefit outweighs the cost of a wrong action (Horvitz 1999)."), tt("An intelligent suggestion has a price when it is wrong: weigh it before showing it.")],
          [tt("Guidelines for human-AI interaction"), tt("Amershi et al. distilled 18 guidelines, from more than 160 candidate recommendations, grouped by when they apply: initially, during interaction, when the system is wrong, and over time (Amershi et al. 2019)."), tt("Check an intelligent feature in each of the four phases, not only in the demo.")],
          [tt("Rule-based, adaptive, learning"), tt("A rule is fixed and can be explained in a sentence; an adaptive system reacts to the situation now; a learning system draws on data about the person over time."), tt("Say which kind sits behind the screen: it decides what you can promise and explain.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} When an automated service should act, ask or wait follows Horvitz (1999); making clear what a system can do and why it did something follows Amershi et al. (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Many products mix the three, and the people using them cannot tell which part is which. That matters: a rule that is wrong is wrong for everyone and is fixed once; a learning system that is wrong may be wrong only for some people, quietly, for months. When nobody can say which kind decided, nobody can say who to ask when it goes wrong. “Which type is this?” is the first question to ask of any smart-looking screen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("AI supports people in four places: guidance, recommendations, help, and the course of an interaction. It adapts in three ways: to the context now, to personal data, or by steering the interaction itself. Each needs different data and carries a different risk. A voice interface is one form; it must say back what it understood.")}
      sources={["amershi2019", "horvitz1999", "sundar2020", "gomezuribe2015"]}
      reasoning={[
        tt("Say which of the four a feature does: guide, recommend, help, or shorten the interaction."),
        tt("Say which way it adapts: context, personal data or steering."),
        tt("Context needs no data about the person; prefer it where it is enough."),
        tt("Personal data needs consent and good data; check both."),
        tt("Steering skips steps; check that people can still see and correct what was filled in, by voice especially."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A2} art={ART_D10} />
      <WaysFig />
      <DataTable
        caption={tt("Three ways an interface can adapt")}
        head={[tt("Way"), tt("What it uses"), tt("Example (Northline)"), tt("Main risk")]}
        rows={[
          [tt("Adapting to context"), tt("The situation now."), tt("Departures from the station Mats is at."), tt("A misread situation.")],
          [tt("Personalising from data"), tt("What is known about the person."), tt("His usual Friday trip, ready to book."), tt("Old data; feeling watched.")],
          [tt("Steering the interaction"), tt("The course of the dialogue itself."), tt("The voice assistant asks only what is missing."), tt("Guesses the person did not see.")],
        ]}
      />
      <DataTable
        caption={tt("How AI guides, recommends and helps: a real platform and the rules")}
        head={[tt("Topic"), tt("Real finding or example"), tt("What it means for a screen")]}
        rows={[
          [tt("Recommendation at scale"), tt("Netflix reported that its recommender influences the choice for about 80% of the hours streamed, and the rest comes from search; the company also estimated the value of personalisation and recommendations at over one billion dollars a year (Gomez-Uribe and Hunt 2015; the figures are the company's own)."), tt("A recommendation is not a side feature: on a large platform it is the main way into the content.")],
          [tt("Context and data"), tt("Guidelines ask a system to make clear what it can do and how well it can do it, to match social norms, and to time its services by the person's context (Amershi et al. 2019)."), tt("Show the person what the assistant knows and does not know.")],
          [tt("Steering the dialogue"), tt("A system that acts on a guess should be easy to dismiss (Amershi et al. 2019)."), tt("Give every guess a one-tap way out.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} People reacting to an AI's agency, as convenient or intrusive depending on control, follows Sundar (2020). Voice interfaces go deeper on Day 11. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Context is the cheapest and safest kind of intelligence, and the most often skipped. Teams reach for personal data because it feels more impressive, when the situation alone (where someone is, what they just did) would have answered the question without storing anything. Ask first whether the situation is enough; personalise only for what it cannot answer.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Intelligent interfaces can raise relevance, save time, relieve people of steps, help before they ask and fit how people work. They go wrong through opacity, loss of control, misadaptation, over-personalisation and loss of trust. The same feature can do both.")}
      sources={["pariser2011", "parasuraman1997", "lee2004", "bakshy2015"]}
      reasoning={[
        tt("Name the potential a feature aims at: relevance, time, relief, anticipating help, fit."),
        tt("Name the risk next to it: opacity, loss of control, misadaptation, over-personalisation, loss of trust."),
        tt("Ask where more personal stops being more helpful."),
        tt("Remember that one bad surprise lowers trust in every suggestion after it."),
        tt("Check whether personalisation narrows what people can find."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A3} art={ART_D10} />
      <PersonalFig />
      <DataTable
        caption={tt("What intelligent interfaces give, and how they go wrong")}
        head={[tt("Potential"), tt("What it looks like"), tt("Risk"), tt("How it shows")]}
        rows={[
          [tt("Relevance"), tt("What people see fits them."), tt("Opacity"), tt("Nobody can see why.")],
          [tt("Time saved"), tt("Fewer steps to the goal."), tt("Loss of control"), tt("People cannot change it.")],
          [tt("Relief"), tt("The system does the routine part."), tt("Misadaptation"), tt("It fits the wrong situation.")],
          [tt("Anticipating help"), tt("Help before people ask."), tt("Over-personalisation"), tt("It knows too much, or narrows the view.")],
          [tt("Fit"), tt("It matches how people already work."), tt("Loss of trust"), tt("After one bad surprise, every suggestion is doubted.")],
        ]}
      />
      <DataTable
        caption={tt("What intelligent interfaces give, and how they go wrong: evidence")}
        head={[tt("Topic"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("A narrowed view"), tt("In a study of 10.1 million US Facebook users, the ranking algorithm reduced the share of ideologically cross-cutting content that users saw by about 5% for conservatives and 8% for liberals; the users' own clicks reduced it by about 17% and 6% (Bakshy et al. 2015, as reported)."), tt("A system narrows the view in two ways: by what it ranks and by what people choose from it; measure both.")],
          [tt("The filter bubble claim"), tt("Eli Pariser warned that personalisation could lock people into a view of their own (Pariser 2011); the size of the effect is contested, as the study above shows."), tt("Treat over-personalisation as a risk to test, not as a certainty.")],
          [tt("Use and misuse of automation"), tt("Parasuraman and Riley described the use, misuse, disuse and abuse of automation: people rely on it too much or reject it, depending on how well it matches their trust (Parasuraman and Riley 1997)."), tt("Design for calibrated trust, not for maximum use.")],
          [tt("Trust in automation"), tt("Trust should follow the actual reliability of the system; trust that is too high or too low leads to error (Lee and See 2004)."), tt("Show reliability honestly, and let the person see when the system is unsure.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} Personalisation narrowing what people see follows Pariser (2011); people abandoning automation after visible failures follows Parasuraman and Riley (1997); trust that should match what a system can do follows Lee and See (2004). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Trust in automation is lost faster than it is gained. People who see a system make an obvious mistake often stop using it altogether, including for the things it does well. That is why a few confident wrong suggestions can cost more than many right ones bring: the risk is not one bad recommendation, but every recommendation after it.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("People trust what they can understand and change. Ask three questions of every suggestion: can they see why (transparency), change it (control), undo it (recoverability)? Clear expectations matter: what the system will and will not do. The more it acts alone, the more people need to feel in control.")}
      sources={["amershi2019", "lee2004", "sundar2020", "gdpr2016", "eu2024aiact"]}
      reasoning={[
        tt("Why: does the screen say why, in the person's words?"),
        tt("Change: can the person steer, dismiss or switch it off?"),
        tt("Undo: if it is wrong, can the person go back without help?"),
        tt("If all three answers are no, redesign before it ships."),
        tt("Say what the system will and will not do, so people know what to expect."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A4} art={ART_D10} />
      <ThreeQuestionsFig />
      <DataTable
        caption={tt("The three questions, with Northline examples")}
        head={[tt("Question"), tt("What it tests"), tt("Northline, before"), tt("Northline, after")]}
        rows={[
          [tt("Can I see why?"), tt("Transparency"), tt("“You have been rebooked.”"), tt("“… because your 7:42 is cancelled.”")],
          [tt("Can I change it?"), tt("Control"), tt("No other trains shown."), tt("Two other trains to choose.")],
          [tt("Can I undo it?"), tt("Recoverability"), tt("Only through the hotline."), tt("“Undo rebooking” in one tap.")],
        ]}
      />
      <DataTable
        caption={tt("Transparency, control and undo: guidelines and rules")}
        head={[tt("Question"), tt("Real guideline or rule"), tt("What it means for a screen")]}
        rows={[
          [tt("Can I see why?"), tt("One of the guidelines asks to make clear why the system did what it did (Amershi et al. 2019). Under the GDPR, people can ask for meaningful information about the logic of an automated decision."), tt("State the reason in one sentence next to the suggestion.")],
          [tt("Can I change it?"), tt("The guidelines ask to support efficient correction and to encourage granular feedback (Amershi et al. 2019)."), tt("Offer other options at the point of decision, not in a settings page.")],
          [tt("Can I undo it?"), tt("The guidelines ask for global controls over what the system monitors and how it behaves (Amershi et al. 2019). Article 22 of the GDPR gives people a right not to be subject to a decision based solely on automated processing with legal or similarly significant effects, with safeguards such as human intervention and the right to contest it."), tt("Make undo one tap, and give a human route for decisions that matter.")],
          [tt("Do I know it is a machine?"), tt("The EU AI Act (Article 50) requires that people are told when they are interacting with an AI system, unless that is obvious from the context."), tt("Label the assistant and say what it is.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} Showing why, supporting dismissal and correction follows Amershi et al. (2019); perceived control shaping how people feel about automation follows Sundar (2020). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Automation and autonomy pull against each other. The more a system does on its own, the less the person decides, and the more it matters that they could decide if they wanted to. An undo that nobody uses is still worth building: knowing it is there is what makes people comfortable letting the system act at all.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("An intelligent interface is only as good as its data and its reading of the situation. Incomplete data gives confident mistakes. So intelligent interfaces are a psychological and strategic design task, not only a technical one. Start with robust, frequent cases; weigh measures on effect on users, feasibility, risk and time pressure.")}
      sources={["parasuraman1997", "lee2004", "gibbons2018", "amershi2019"]}
      reasoning={[
        tt("Ask which data a suggestion uses, and how complete and current it is."),
        tt("Ask whether the situation of use is read correctly: at home, on the move, in a hurry."),
        tt("Start with frequent cases where the data is good; leave rare, costly ones to people."),
        tt("Treat expectations, trust and the feeling of control as part of the design."),
        tt("Rate every measure on the same four questions, with a reason; a rating is a judgement, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D10.A5} art={ART_D10} />
      <DataChainFig />
      <WeighFig />
      <DataTable
        caption={tt("Data, context and situation: findings")}
        head={[tt("Topic"), tt("Real finding"), tt("What it means for a measure")]}
        rows={[
          [tt("Trust follows reliability"), tt("Trust should be calibrated to how reliable the automation really is (Lee and See 2004)."), tt("Measure how often the suggestion is right, and show people the result.")],
          [tt("Misuse and disuse"), tt("Over-reliance (misuse) and rejection (disuse) both follow from a poor match between trust and reliability (Parasuraman and Riley 1997)."), tt("A measure that raises use without raising reliability raises risk.")],
          [tt("Learning over time"), tt("The guidelines ask to notify users about changes, to update cautiously and to learn from behaviour (Amershi et al. 2019)."), tt("Announce when the system changes what it does, and change it in small steps.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} Rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Data quality is rarely even. Most companies have one kind of data that is complete and current (bookings, appointments, contracts) and several that are patchy (reading history, preferences, free text). The robust core cases are where the good data is. An intelligent interface that starts there earns the trust it later needs for the harder cases; one that starts with the impressive cases on patchy data spends that trust before it has any.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Inside many companies AI is first an innovation signal. At senior level an intelligent interface is a decision architecture: what support, how much personalisation and how much autonomy users get, decided once for every journey. It shapes guidance, service quality and differentiation, and is designed from the user's need.")}
      sources={["amershi2019", "horvitz1999", "lee2004", "gdpr2016", "eu2024aiact"]}
      reasoning={[
        tt("Check where intelligent features are decided today: in a vision, or one AI feature at a time?"),
        tt("Write a guiding vision: what help people get, how personal it may be, what stays their decision."),
        tt("Turn it into principles on transparency, control, depth of personalisation and AI interaction."),
        tt("Decide which journeys become intelligent first: frequent, good data, low harm if wrong."),
        tt("Prefer fewer, reliable, explainable suggestions to many clever ones."),
      ]}
    >
      <ComicButton comic={COMICS_D10.B1} art={ART_D10} />
      <ArchitectureFig />
      <LayersChainFig />
      <DataTable
        caption={tt("Intelligent UX as a decision architecture: structures")}
        head={[tt("Part"), tt("Real example"), tt("What it means")]}
        rows={[
          [tt("Four phases"), tt("Amershi et al. grouped the guidelines into initially, during interaction, when wrong and over time (Amershi et al. 2019)."), tt("Plan the architecture over the whole life of a feature, not for its launch.")],
          [tt("Mixed initiative"), tt("Horvitz asked that automated services act only when the expected benefit outweighs the cost of error (Horvitz 1999)."), tt("Set a rule for when the system may act on its own and when it must ask.")],
          [tt("Legal frame"), tt("The GDPR (Articles 13 to 15 and 22) and the EU AI Act (Article 50) set duties of information and human oversight."), tt("Build the information and the human route into the architecture from the start.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} Designing the human side of AI from the user's need follows Amershi et al. (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A guiding vision for intelligent UX is short and testable. “Northline helps passengers make the next good decision, says why and leaves the choice to them” can be checked on every screen: does this suggestion say why, and can the passenger decline it? “AI-first” cannot be checked, and it invites every feature anyone proposes.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Intelligent UX sits between goals that pull apart: personalisation against transparency, automation against autonomy, comfort against data protection, efficiency against trust, and all of them against what can be built. Decide the depth of personalisation per journey, say what you give up, and keep a person for the exceptions.")}
      sources={["pariser2011", "lee2004", "eu2024aiact", "gomezuribe2015", "gdpr2016", "parasuraman1997"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: innovation, data protection, sales, service."),
        tt("Decide the depth per journey: deep where data is good and mistakes are harmless, none where a person must decide."),
        tt("Write down the assumptions about user behaviour, data quality and what AI does, and which would be critical if wrong."),
        tt("Tell people when they deal with an automated system."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D10.B2} art={ART_D10} />
      <DepthFig />
      <DataTable
        caption={tt("Standing conflicts of intelligent UX")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Personalisation against transparency"), tt("Product, against data protection."), tt("Can we still explain it at this depth?")],
          [tt("Automation against autonomy"), tt("Efficiency targets, against the user's own choice."), tt("Would people choose to let it act for them?")],
          [tt("Innovation against trust"), tt("The innovation team, against service and the brand."), tt("What happens after its first confident mistake?")],
          [tt("All of these against economic viability"), tt("Finance, against everyone."), tt("What does it cost to build, explain and maintain?")],
        ]}
      />
      <DataTable
        caption={tt("Conflicts of intelligent UX, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Personalisation against transparency"), tt("Recommendations steer about 80% of the hours on a large platform (Gomez-Uribe and Hunt 2015), and the GDPR gives people a right to information about the logic of automated decisions."), tt("Decide how deep an explanation can go, and test that it can be given in a sentence.")],
          [tt("Automation against autonomy"), tt("Decisions based solely on automated processing with significant effects need safeguards (GDPR Article 22)."), tt("Ask whether people would choose to let the system act for them.")],
          [tt("Innovation against trust"), tt("Trust that does not match reliability leads to misuse or disuse (Lee and See 2004; Parasuraman and Riley 1997)."), tt("Plan what happens after the first confident mistake.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} The duty to inform people when they interact with an AI system follows the EU AI Act (2024); check the current state of its application before a course run. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Click numbers cannot see the cost of a wrong suggestion. A recommendation that was clicked may have been clicked out of curiosity, confusion or alarm; one that was not clicked may have quietly lowered trust. Decide which signals you will look at (dismissals, reasons opened, controls used, complaints) before you decide how deep to personalise, or the click rate will decide for you.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("An intelligent interface needs an owner: someone who owns its principles, a data protection side that may veto, teams that apply it, and a rule for when innovation and trust disagree. With patchy data, a decision says what it decides, does not know, would reverse and gives up. Explanations, controls and undo are a safe start.")}
      sources={["simon1956", "klein2007", "eu2024aiact", "amershi2019", "gdpr2016"]}
      reasoning={[
        tt("Name who owns what the system may suggest, explain and switch off."),
        tt("Give data protection a veto on every new use of data."),
        tt("Require a short record for every intelligent function: what it suggests, from which data, how it explains itself, how it is switched off."),
        tt("Settle conflicts by trust and data protection first, then the user's benefit, then economics; say who settles a tie."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D10.B3} art={ART_D10} />
      <DecisionFig />
      <DataTable
        caption={tt("Four parts of intelligent UX governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Northline)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the principles; who applies them?"), tt("The head of customer experience owns them; every product team applies them.")],
          [tt("Who checks"), tt("Who makes sure no suggestion misleads or misuses data?"), tt("Data protection may veto; service checks the wording.")],
          [tt("The record"), tt("What is written down for each intelligent function?"), tt("What it suggests, from which data, how it explains itself, how it is switched off.")],
          [tt("How a conflict is decided"), tt("What happens when innovation, data protection and economics disagree?"), tt("Trust and data protection first, then the passenger, then economics; the board settles a tie.")],
        ]}
      />
      <DataTable
        caption={tt("Owning an intelligent interface: records and rules")}
        head={[tt("Part"), tt("Real rule or guideline"), tt("What it means")]}
        rows={[
          [tt("The record"), tt("The guidelines ask for clarity on what the system can do and how well, on why it acted, and on how it changes (Amershi et al. 2019)."), tt("Write down for each intelligent function what it suggests, from which data, how it explains itself and how it is switched off.")],
          [tt("Who checks"), tt("The GDPR sets conditions for automated decisions and for the data behind them (GDPR Article 22)."), tt("Give data protection a right to veto, and let service check the wording.")],
          [tt("The duty to inform"), tt("The EU AI Act (Article 50) requires that people are informed when they interact with an AI system."), tt("Add the notice to the release checklist.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NL()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("When a passenger, a regulator or a journalist asks why the app suggested something, the answer has to exist before the question. A company that keeps a one-paragraph record per intelligent function (what it suggests, from which data, how it explains itself, how it is switched off, who owns it) can answer in a day. One that cannot has found its first governance gap.")}</p>
      </Extra>
    </MaterialCard>
  );
}
