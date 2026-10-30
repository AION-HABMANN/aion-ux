"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, DecisionFig, EthicsGridFig, FeasibleFig, FutureChainFig, GatesFig, LayersChainFig, NotScaleFig, PortfolioFig, StressTestFig, TensionFig, WeighFig } from "@/components/day16/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { LadderLab } from "@/components/day16/ladderLab";
import { ART_D16 } from "@/components/day16/comicScenes";
import { COMICS_D16 } from "@/data/day16/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the
 * rules it gives the task (folded) → sources → Mark as read. Example company and people: Fernwood, Leila, Sam, Rafael and Greta; never RealityFlow,
 * FutureInteraction Hub or NextWorld UX, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings
 * keep the original Day 16's points (the go/no-go meeting, the evidence grade, the quarter log) in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const FW = () => tt("Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("An immersive idea climbs a ladder: a concept idea says what could be, a prototype makes one question testable, a pilot shows whether it works for real users in one place, a scalable solution keeps working for many with support and an owner. Each rung proves something different, with a gate before the next. A prototype must fit the context of use, make the interaction clear, be technically robust, resilient and testable.")}
      sources={["houde1997", "buchenau2000", "cooper1990", "gdsStandard"]}
      reasoning={[
        tt("Say which rung a project is really on, whatever its slides say."),
        tt("Name the one question a prototype must answer."),
        tt("Check the five requirements: context of use, clear interaction, robustness, resilience, testability."),
        tt("Set the gate criteria before the rung is climbed."),
        tt("Count the cost of the last rung: maps, support, updates, an owner."),
      ]}
    >
      <ComicButton comic={COMICS_D16.A1} art={ART_D16} />
      <LadderLab />
      <DataTable
        caption={tt("What an immersive prototype must have")}
        head={[tt("Requirement"), tt("The question"), tt("Example (Fernwood)")]}
        rows={[
          [tt("Context of use"), tt("Where, when and by whom will it be used?"), tt("Late arrivals with luggage, tired, in a new wing.")],
          [tt("Clarity of interaction"), tt("Is it obvious what to do?"), tt("One arrow, one room number, nothing else.")],
          [tt("Technical robustness"), tt("Does it work on the devices guests have?"), tt("Old phones, low battery, weak signal.")],
          [tt("Resilience"), tt("Does it cope with stress and failure?"), tt("A fallback route when tracking is lost.")],
          [tt("Testability"), tt("Can a test show something?"), tt("A task, a measure: found the room without asking staff.")],
        ]}
      />
      <GatesFig />
      <DataTable
        caption={tt("The ladder in real practice")}
        head={[tt("Rung or tool"), tt("Real source or example"), tt("What it means for a decision")]}
        rows={[
          [tt("What a prototype answers"), tt("A prototype can answer questions about the role of a product, its look and feel, and its implementation (Houde and Hill 1997)."), tt("Say which question each rung answers, and do not read more into it.")],
          [tt("Experience prototyping"), tt("Experience prototypes let people live through a situation rather than only look at a design (Buchenau and Fulton Suri 2000)."), tt("For immersive systems test the experience in the place of use, not a screenshot.")],
          [tt("Gates"), tt("A stage-gate system separates stages by gates where a project must meet criteria to continue, change or stop (Cooper 1990). UK government services pass discovery, alpha, beta and live, each with an assessment (GOV.UK Service Standard)."), tt("Write the gate criteria before the pilot starts.")],
          [tt("A real case on the ladder"), tt("Google ran an Explorer programme for Glass from 2013, ended the sale of the consumer version in January 2015, sold an enterprise edition from 2017 and stopped selling it in March 2023 (press reports, as reported)."), tt("A product can leave a rung or step back to another: the ladder is not a one-way road.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} What prototypes prototype follows Houde and Hill (1997) and Buchenau and Fulton Suri (2000); gates between stages follow Cooper (1990). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("The go/no-go meeting is the moment a ladder is either climbed or abandoned. It works only if the criteria were written before the rung, by people who will not be judged by the answer. Otherwise every prototype passes, because everyone in the room wants it to.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Immersive systems need six kinds of test: orientation (do people know where they are), presence (do they feel there, and does it help), overload (is it too much), error robustness (what happens when something fails), acceptance (will all kinds of people use it again) and transfer (does it work in real use). Transfer is the most underestimated and the most decisive for scaling.")}
      sources={["witmer1998", "kennedy1993", "meta2025", "kaplan2021", "miller2020vr"]}
      reasoning={[
        tt("Test in the worst realistic moment: crowds, dark, no signal, time pressure."),
        tt("Ask about presence and discomfort with standard questions after each session."),
        tt("Break things on purpose and watch what people do."),
        tt("Test with the people least like the team: older, newer, tired, sceptical."),
        tt("Make every test comparable: the same tasks and measures across prototypes."),
      ]}
    >
      <ComicButton comic={COMICS_D16.A2} art={ART_D16} />
      <StressTestFig />
      <DataTable
        caption={tt("Six test aspects and how to test them")}
        head={[tt("Aspect"), tt("How to test it"), tt("Example (Fernwood)")]}
        rows={[
          [tt("Orientation"), tt("Give a task; watch where people hesitate or turn back."), tt("Find room 216 from the lift.")],
          [tt("Presence"), tt("Ask a short presence questionnaire after the session."), tt("Did the VR room feel like a real room?")],
          [tt("Overload"), tt("Count what competes for attention; ask how demanding it was."), tt("Arrow, number, offers, sounds.")],
          [tt("Error robustness"), tt("Cause failures on purpose: lost signal, a wrong turn."), tt("Tracking lost in the lift lobby.")],
          [tt("Acceptance"), tt("Ask again after the second and third use; include sceptics."), tt("Would Sam use it on his next stay?")],
          [tt("Transfer"), tt("Test in the real place and moment, not the lab."), tt("Friday night, crowd, night lighting.")],
        ]}
      />
      <DataTable
        caption={tt("Testing immersive systems: instruments and rules")}
        head={[tt("Aspect"), tt("Real instrument or rule"), tt("What it means for a test")]}
        rows={[
          [tt("Overload and sickness"), tt("The Simulator Sickness Questionnaire asks about 16 symptoms on a four-step scale and scores nausea, oculomotor strain and disorientation (Kennedy et al. 1993)."), tt("Use a standard instrument before and after a session, not an ad hoc question.")],
          [tt("Presence"), tt("The Presence Questionnaire gives a structured way to ask how present people felt (Witmer and Singer 1998)."), tt("Ask after the session, and relate it to the task, not only to the feeling.")],
          [tt("Comfort on a platform"), tt("Meta's store policies ask apps to rate their comfort on one scale and to show content ratings and warnings before release (Meta Horizon Store policies)."), tt("Plan for the rating the platform will require.")],
          [tt("Transfer"), tt("XR training was about as effective as non-simulated training in a meta-analysis (Kaplan et al. 2021)."), tt("Test in the real place and moment: the lab result is not the transfer.")],
          [tt("Data"), tt("Motion tracking data identified people with above 95% accuracy in a study of over 500 participants (Miller et al. 2020, as reported)."), tt("Decide what a test records, and for how long it is kept.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Asking about presence follows Witmer and Singer (1998); asking about simulator sickness follows Kennedy et al. (1993); rating comfort on one scale before release follows Meta's store policies. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Grade the evidence, not only the result. A finding from five colleagues in a quiet room is a hint; the same finding from thirty real guests on busy nights is evidence. Write the grade next to every result, so that a hint is never presented as proof.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Feasibility asks “can we build it?”; a responsible UX strategy asks “should we, for whom, and how?”. New interaction and neurotechnologies raise seven ethical questions: data protection, voluntariness, potential for manipulation, cognitive overload, transparency, accessibility and inclusion. They are cheapest to answer at the concept stage and most expensive after scaling.")}
      sources={["stilgoe2013", "ec2026", "eu2024aiact"]}
      reasoning={[
        tt("Ask all seven questions of every idea before the first prototype."),
        tt("Write down what is recorded, inferred and kept, and for how long."),
        tt("Check that saying no is possible and costs nothing."),
        tt("Ask whose interest any steering serves."),
        tt("Name who cannot use it, and what they get instead."),
      ]}
    >
      <ComicButton comic={COMICS_D16.A3} art={ART_D16} />
      <FeasibleFig />
      <EthicsGridFig />
      <DataTable
        caption={tt("Feasible or responsible: a framework and the rules")}
        head={[tt("Source"), tt("Real framework or rule"), tt("What it means for a strategy")]}
        rows={[
          [tt("Responsible innovation"), tt("Stilgoe, Owen and Macnaghten name four dimensions: anticipation, reflexivity, inclusion and responsiveness (Stilgoe et al. 2013)."), tt("Ask the four questions at every gate: what could follow, what are we assuming, who is missing, what will we change?")],
          [tt("Banned practice"), tt("The EU AI Act prohibits emotion recognition in workplaces and educational institutions, with exceptions for medical and safety reasons (Article 5(1)(f))."), tt("Some applications are not allowed at all: check before you build.")],
          [tt("Transparency"), tt("People have to be told that they are interacting with an AI system, unless that is obvious (EU AI Act, Article 50)."), tt("Label AI in immersive scenes, including AI characters.")],
          [tt("Social acceptance"), tt("Glass met a public backlash, with signs in businesses and the name “Glassholes”, in the account of press reports (as reported)."), tt("Include the people around the user in the inclusion question.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Anticipation, reflection, inclusion and responsiveness follow Stilgoe, Owen and Macnaghten (2013); the EU bans emotion recognition at work and in education and harmful manipulation (European Commission, AI Act). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("The biggest blind spots sit between feasibility and responsibility: a team that can build something rarely asks whether it should, and the people who would ask are rarely in the room when it is built. Invite them to the concept stage, not the launch.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("A new technology must be responsible (no avoidable harm), connectable (fits the products, processes and systems already run) and governable (someone can decide, measure and stop it). How far a company can go depends on the technology's maturity and on its own ability to learn. Together they shape the UX portfolio: scale, test further, pause, stop.")}
      sources={["argyris1978", "cooper1990", "gdsStandard", "govuk2026"]}
      reasoning={[
        tt("Ask three questions of every initiative: responsible, connectable, governable?"),
        tt("Place it by maturity: concept, prototype, pilot, scalable."),
        tt("Make one of four moves: scale, test further, pause, stop."),
        tt("Review the portfolio regularly, not only when something goes wrong."),
        tt("Ask what the organisation learned, not only what it built."),
      ]}
    >
      <ComicButton comic={COMICS_D16.A4} art={ART_D16} />
      <PortfolioFig />
      <FutureChainFig />
      <DataTable
        caption={tt("Maturity, learning and the portfolio: real practice")}
        head={[tt("Idea"), tt("Real source"), tt("What it means for a portfolio")]}
        rows={[
          [tt("Stages and gates"), tt("Cooper's stage-gate system manages new products through stages with gates (Cooper 1990)."), tt("Run every immersive line through the same gates, so lines can be compared.")],
          [tt("Learning"), tt("Organisations learn when they question the assumptions behind their actions, not only the actions (Argyris and Schön 1978)."), tt("At each gate ask what the pilot taught about the assumptions, not only about the product.")],
          [tt("Phased government practice"), tt("UK government services move through discovery, alpha, beta and live, and the Service Standard is applied at each (GOV.UK Service Standard; GOV.UK Service Manual)."), tt("Limit the number of lines in each phase.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Learning by questioning one's own assumptions follows Argyris and Schön (1978); deciding at gates follows Cooper (1990). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Keep a quarter log: every three months, one line per initiative saying what was decided and why. After a year the log shows whether the company learns from its experiments, or only starts new ones.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Not scaling can be the best decision. Signs: it impresses but is rarely used again; it works only for some; it has not been tested in real use; its ethics are not settled; the organisation cannot support it; it does not fit the strategy. Weigh measures on effect on users, feasibility, risk, time pressure and strategic viability, with a reason for every rating.")}
      sources={["cooper1990", "gibbons2018", "kaplan2021", "miller2020vr", "rebenitsch2016", "govuk2026"]}
      reasoning={[
        tt("Check the six signs before every step to scale."),
        tt("Treat a pause as a decision with a date to look again."),
        tt("Treat a stop as a result: write down what was learned."),
        tt("Rate every measure on the same five criteria, with a reason; a rating is a judgement, never a mark."),
        tt("Prefer the measure that decides the biggest question for the least."),
      ]}
    >
      <ComicButton comic={COMICS_D16.A5} art={ART_D16} />
      <NotScaleFig />
      <WeighFig />
      <DataTable
        caption={tt("When not to scale: findings and a case")}
        head={[tt("Reason not to scale"), tt("Real evidence"), tt("What it means for a decision")]}
        rows={[
          [tt("No advantage over the plain way"), tt("Training in extended reality was equally effective as non-simulated training (Kaplan et al. 2021)."), tt("If the plain way is as good, the case for scaling is cost, access or safety, not effect.")],
          [tt("A harm that grows with scale"), tt("Motion tracking data can identify people (Miller et al. 2020, as reported), and sickness symptoms affect a large share of users (Rebenitsch and Owen 2016, as reported)."), tt("Ask what would be regretted if it went wrong at scale.")],
          [tt("A product can be stopped"), tt("Google stopped selling Glass to consumers in January 2015 and the enterprise edition in March 2023 (press reports, as reported); government practice includes the decision to stop (GOV.UK Service Manual)."), tt("Name the stop decision as an expected outcome, not as a failure.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("When ethics are only looked at after scaling, every answer is expensive: the system is built, people rely on it, and changing it means breaking promises. The same question asked at the concept stage costs a conversation.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("At senior level, future-proof UX is a responsible innovation and decision architecture: a guiding vision of the innovation and responsibility wanted, one evaluation grid with comparable evidence, gates from prototype to pilot to scale with ethics built in, and a portfolio reviewed regularly. Experiments become a future when each one ends in a decision.")}
      sources={["stilgoe2013", "cooper1990", "eu2024aiact"]}
      reasoning={[
        tt("Write a guiding vision: what innovation, for whom, and what responsibility."),
        tt("Use one evaluation grid for every prototype and pilot."),
        tt("Put an ethics gate before every pilot and every step to scale."),
        tt("Keep a focused portfolio and review it every quarter."),
        tt("Tell operational decisions (one pilot) from strategic ones (portfolio, governance, market position)."),
      ]}
    >
      <ComicButton comic={COMICS_D16.B1} art={ART_D16} />
      <ArchitectureFig />
      <LayersChainFig />
      <Callout label={tt("Closing question of the course · talk it through")}>
        <p>{tt("What makes a UX strategy sustainable in the long run? A starting point from this card: a vision that outlives single technologies, decisions made on comparable evidence, responsibility built in before scaling, and the courage to pause or stop.")}</p>
      </Callout>
      <DataTable
        caption={tt("Future-proof UX as a responsible decision architecture: structures")}
        head={[tt("Part"), tt("Real source"), tt("What it means")]}
        rows={[
          [tt("Four dimensions"), tt("Anticipation, reflexivity, inclusion and responsiveness (Stilgoe et al. 2013)."), tt("Build the four questions into the process, not into a slide.")],
          [tt("Gates"), tt("Stage-gate (Cooper 1990) and the phases of the GOV.UK Service Standard."), tt("Define who decides at each gate and on what.")],
          [tt("Law as a design input"), tt("EU AI Act, Articles 5 and 50."), tt("Put the legal limits into the brief, not into the final review.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Responsible innovation follows Stilgoe, Owen and Macnaghten (2013); gates follow Cooper (1990). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A future project is strategically connected when it would still matter if the technology changed: when it serves a lasting need of customers or staff. If it only matters because the technology is new, it is symbolic innovation, and it will age with the technology.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Future-proof UX sits between innovation pressure and maturity, ethics and speed, economic viability and a pioneer role, user value and visibility, the next quarter and the long-term portfolio. More active lines bring more visibility and less learning per line. A good portfolio states which conflicts it accepts and writes down what each line assumes.")}
      sources={["ec2026", "stilgoe2013", "kaplan2021", "miller2020vr", "eu2024aiact"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: management, innovation, IT, departments, data protection, users."),
        tt("Decide how many lines can be tested properly at once."),
        tt("Write down what each line assumes about technology, market, acceptance and governance."),
        tt("Check which lines fall under stricter rules, such as AI that recognises emotions."),
        tt("Say what the choice gives up."),
      ]}
    >
      <ComicButton comic={COMICS_D16.B2} art={ART_D16} />
      <TensionFig />
      <DataTable
        caption={tt("Standing conflicts of future-proof UX")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Innovation pressure against maturity"), tt("Management and innovation, against product and IT."), tt("Which rung is it really on?")],
          [tt("Ethics against speed"), tt("Data protection and works council, against the launch date."), tt("What would we regret if it went wrong at scale?")],
          [tt("Pioneer role against economic viability"), tt("Strategy, against finance."), tt("What is the smallest step that keeps us ahead?")],
          [tt("Short-term signal against long-term portfolio"), tt("Marketing, against the portfolio owner."), tt("Will this still matter when the technology changes?")],
        ]}
      />
      <DataTable
        caption={tt("Conflicts of future-proof UX, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Innovation pressure against maturity"), tt("A consumer product can be withdrawn after a few years (Google Glass, 2013 to 2015, as reported)."), tt("Ask which rung it is really on.")],
          [tt("Ethics against speed"), tt("Some applications are banned outright (EU AI Act, Article 5(1)(f)), and tracking data identifies people (Miller et al. 2020, as reported)."), tt("Ask what would be regretted if it went wrong at scale.")],
          [tt("Pioneer role against viability"), tt("XR training was not more effective than plain training (Kaplan et al. 2021)."), tt("Choose the smallest step that keeps you informed.")],
          [tt("Short-term signal against the portfolio"), tt("An enterprise edition was sold for six years and then stopped (Google Glass, 2017 to 2023, as reported)."), tt("Ask whether it will still matter when the technology changes.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} The lines and their trade-offs are a reading of the example, not a rule for every company. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Stopping an innovation is the better leadership decision when continuing it would teach nothing new, cost trust, or keep people from work that matters more. The sign of a mature portfolio is not how much it starts, but how calmly it stops.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Scaling needs owners: someone who owns the evaluation grid, an ethics and data protection review that approves before a pilot and before scaling and may stop anything, a board that decides at each gate to scale, test further, pause or stop, and a regular portfolio review. With incomplete data, a decision says what it decides, does not know, would reverse and gives up.")}
      sources={["ec2026", "simon1956", "klein2007", "cooper1990", "stilgoe2013", "govuk2026"]}
      reasoning={[
        tt("Name who owns the grid and scores every initiative."),
        tt("Name who approves ethically and may stop, including data protection and employee representatives."),
        tt("Name who decides at each gate, and how often the portfolio is reviewed."),
        tt("Settle conflicts by rights and safety first, then proven value, then cost, then visibility; say who settles a tie."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D16.B3} art={ART_D16} />
      <DecisionFig />
      <DataTable
        caption={tt("Four responsibilities of innovation governance")}
        head={[tt("Responsibility"), tt("The question"), tt("An example (Fernwood)")]}
        rows={[
          [tt("Innovation evaluation"), tt("Who scores every initiative on one grid?"), tt("The head of guest experience and a small team.")],
          [tt("Ethical approval"), tt("Who says yes before a pilot and before scaling, and may stop?"), tt("An ethics and data review with the data protection officer.")],
          [tt("Scaling decision"), tt("Who decides scale, test further, pause or stop at each gate?"), tt("An innovation board.")],
          [tt("Portfolio adjustment"), tt("Who reviews the whole portfolio, and how often?"), tt("The board, every quarter, at most three active lines.")],
        ]}
      />
      <DataTable
        caption={tt("Who decides to scale, pause or stop: real practice")}
        head={[tt("Responsibility"), tt("Real source"), tt("What it means")]}
        rows={[
          [tt("Evaluation"), tt("A common grid for every initiative is what stage-gate systems use (Cooper 1990)."), tt("Score every initiative on one grid: value, maturity, effort, scaling, responsibility.")],
          [tt("Ethical approval"), tt("The four dimensions of responsible innovation include inclusion and responsiveness (Stilgoe et al. 2013)."), tt("Put an ethics and data review before every pilot and before scaling.")],
          [tt("The decision"), tt("Government practice names the decision to stop as one of the possible outcomes (GOV.UK Service Manual)."), tt("Give the board the right to scale, test further, pause or stop.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Monitoring after launch follows the European Commission's summary of the AI Act; deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Write the stop criteria before the pilot starts, when nobody is attached to it yet. The person who may stop an initiative should not be the person whose bonus depends on it.")}</p>
      </Extra>
    </MaterialCard>
  );
}
