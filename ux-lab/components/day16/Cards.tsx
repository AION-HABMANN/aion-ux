"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, DecisionFig, EthicsGridFig, FeasibleFig, FutureChainFig, GatesFig, LadderFig, LayersChainFig, NotScaleFig, PortfolioFig, StressTestFig, TensionFig, WeighFig } from "@/components/day16/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
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
      sources={["houde1997", "buchenau2000", "cooper1990"]}
      reasoning={[
        tt("Say which rung a project is really on, whatever its slides say."),
        tt("Name the one question a prototype must answer."),
        tt("Check the five requirements: context of use, clear interaction, robustness, resilience, testability."),
        tt("Set the gate criteria before the rung is climbed."),
        tt("Count the cost of the last rung: maps, support, updates, an owner."),
      ]}
    >
      <ComicButton comic={COMICS_D16.A1} art={ART_D16} />
      <LadderFig />
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} What prototypes prototype follows Houde and Hill (1997) and Buchenau and Fulton Suri (2000); gates between stages follow Cooper (1990).`)}</p>
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
      sources={["witmer1998", "kennedy1993", "meta2025"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Asking about presence follows Witmer and Singer (1998); asking about simulator sickness follows Kennedy et al. (1993); rating comfort on one scale before release follows Meta's store policies.`)}</p>
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Anticipation, reflection, inclusion and responsiveness follow Stilgoe, Owen and Macnaghten (2013); the EU bans emotion recognition at work and in education and harmful manipulation (European Commission, AI Act).`)}</p>
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
      sources={["argyris1978", "cooper1990"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Learning by questioning one's own assumptions follows Argyris and Schön (1978); deciding at gates follows Cooper (1990).`)}</p>
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
      sources={["cooper1990", "gibbons2018"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study.`)}</p>
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
      sources={["stilgoe2013", "cooper1990"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Responsible innovation follows Stilgoe, Owen and Macnaghten (2013); gates follow Cooper (1990).`)}</p>
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
      sources={["ec2026", "stilgoe2013"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} The lines and their trade-offs are a reading of the example, not a rule for every company.`)}</p>
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
      sources={["ec2026", "simon1956", "klein2007"]}
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
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${FW()} Monitoring after launch follows the European Commission's summary of the AI Act; deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Write the stop criteria before the pilot starts, when nobody is attached to it yet. The person who may stop an initiative should not be the person whose bonus depends on it.")}</p>
      </Extra>
    </MaterialCard>
  );
}
