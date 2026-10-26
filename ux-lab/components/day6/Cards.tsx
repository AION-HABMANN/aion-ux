"use client";

import type { ReactNode } from "react";
import { ConflictFig, DecisionFig, DisclosureFig, GestaltFig, HierarchyFig, LayersFig, PatternFig, SystemChainFig, SystemFig, WeighFig } from "@/components/day6/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D6 } from "@/components/day6/comicScenes";
import { COMICS_D6 } from "@/data/day6/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Seabird Ferries, Elif, Noah, Greta and Malte; never OfficeSphere, CareAssist or
 * CitizenFlow, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const SB = () => tt("Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("People see groups, not pieces: what is close, alike, on one line, almost closed, standing out or inside one frame belongs together. Layouts that follow these laws let people group, tell apart and navigate at a glance.")}
      sources={["wertheimer1923", "palmer1992", "wagemans2012"]}
      reasoning={[
        tt("Ask which elements belong together in meaning, and check whether they also look as if they belong together."),
        tt("Proximity first: put related things close and unrelated things apart; spacing alone does much of the work."),
        tt("Similarity: give elements of one kind one look, and elements of another kind a different one."),
        tt("Common region: a frame or a background area turns scattered elements into a group."),
        tt("Similar functions designed differently are not seen as related: make them look alike."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A1} art={ART_D6} />
      <GestaltFig />
      <DataTable
        caption={tt("Six Gestalt laws in the interface")}
        head={[tt("Law"), tt("What people see"), tt("Used in an interface")]}
        rows={[
          [tt("Proximity"), tt("Close things belong together."), tt("Spacing between groups larger than within them.")],
          [tt("Similarity"), tt("Alike things belong together."), tt("All links of one kind in one style.")],
          [tt("Continuity"), tt("Things on one line form a path."), tt("Steps of a process on one line.")],
          [tt("Closure"), tt("An almost closed shape is seen as closed."), tt("Cards and sections without full borders still read as units.")],
          [tt("Figure and ground"), tt("One thing stands out from the rest."), tt("A dialog over a dimmed page.")],
          [tt("Common region"), tt("Things in one frame belong together."), tt("A framed section with a heading.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} The grouping laws follow Wertheimer (1923) and the review by Wagemans et al. (2012); common region follows Palmer (1992).`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("When the laws disagree, the stronger one wins. Palmer (1992) showed that a common region can override proximity: two dots far apart inside one frame are grouped, two close dots in different frames are not. In an interface this means a frame or background can rescue a layout where spacing alone does not work, and can also break one when it groups the wrong things.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A visual hierarchy is an order of importance the eye can follow. It steers attention, priority and the next action. Arranging elements side by side is not steering: decide what comes first and make it look first.")}
      sources={["ware2012", "krug2014", "nielsen1994"]}
      reasoning={[
        tt("Find the one primary action of each step and make it the strongest element."),
        tt("Make secondary actions clearly quieter: a link or an outlined button, not a second strong button."),
        tt("Give notices, warnings and help a level below the task, unless they are a real risk."),
        tt("Check that notices, status displays and navigation do not compete for the same strength."),
        tt("If several elements are equally strong, the page has no hierarchy, whatever its layout."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A2} art={ART_D6} />
      <HierarchyFig />
      <DataTable
        caption={tt("Levels of a visual hierarchy on one step")}
        head={[tt("Level"), tt("What belongs there"), tt("How it looks")]}
        rows={[
          [tt("1 · The primary action"), tt("The one thing most people should do now."), tt("The strongest element: size, colour, position.")],
          [tt("2 · The content of the step"), tt("What the person needs to decide."), tt("Clear headings and readable text.")],
          [tt("3 · Secondary actions"), tt("Other things they might do."), tt("Quiet links or outlined buttons.")],
          [tt("4 · Notices and offers"), tt("Information that helps but is not the task."), tt("Smaller, calmer; warnings only for real risks.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} What pops out and guides the eye follows Ware (2012); a clear visual hierarchy follows Krug (2014).`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("A quick test for hierarchy: squint at the screen, or blur a screenshot. What remains visible is what the eye sees first. If it is the offer banner and not the primary action, the hierarchy steers attention away from the task.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Progressive disclosure shows what is relevant now and keeps the rest one clear step away; it lowers the load. When information people need to decide is buried too deep, reduction has become hiding.")}
      sources={["nielsen2006", "sweller1988", "krug2014"]}
      reasoning={[
        tt("For a form, ask which fields apply to everyone and which only in special cases; show the special ones only when they apply."),
        tt("Split long processes into a few steps and show where the person is."),
        tt("Keep the rest reachable in one clearly labelled step: “Add a vehicle”, “Show details”."),
        tt("Never hide what people need to decide (a condition, a fee, a deadline): show it next to the choice it affects."),
        tt("Check the line: is a hidden item something people rarely need, or something they need and miss?"),
      ]}
    >
      <ComicButton comic={COMICS_D6.A3} art={ART_D6} />
      <DisclosureFig />
      <DataTable
        caption={tt("Helpful reduction and problematic hiding")}
        head={[tt("Aspect"), tt("Helpful reduction"), tt("Problematic hiding")]}
        rows={[
          [tt("What is hidden"), tt("What does not apply now."), tt("What people need to decide.")],
          [tt("How it is reached"), tt("One clearly labelled step."), tt("Several levels deep, or only in help pages.")],
          [tt("The effect"), tt("Less load, the same safety."), tt("Less load at first sight, unsafe decisions.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} Progressive disclosure follows Nielsen (2006); cognitive load follows Sweller (1988).`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Progressive disclosure has a cost that grows with each level: people have to know or guess that more exists. Nielsen (2006) advises keeping it to one, at most two levels, and making the step to the second level obvious. A third level of disclosure is usually a sign that the first level holds the wrong things.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("When pages of one type are grouped the same way, the primary action sits in the same place and similar tasks follow the same steps, people learn once and predict. Inconsistent patterns undermine predictability.")}
      sources={["nielsen1994", "krug2014", "iso9241110"]}
      reasoning={[
        tt("List the similar tasks in different areas and check whether they follow the same pattern."),
        tt("Check that each page type groups its content the same way, wherever it appears."),
        tt("Keep the primary action in the same place for the same kind of step."),
        tt("A well-designed page with its own pattern still costs users a fresh orientation."),
        tt("Visual hierarchy, navigation logic and cognitive relief belong together: order on each page and the same order across pages."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A4} art={ART_D6} />
      <PatternFig />
      <DataTable
        caption={tt("What consistency means on three levels")}
        head={[tt("Level"), tt("Consistent when"), tt("A sign it is missing")]}
        rows={[
          [tt("The page type"), tt("Every page of one type is grouped the same way."), tt("Two service pages, two layouts.")],
          [tt("The action"), tt("The primary action is always in the same place."), tt("Continue at the bottom here, Next at the top there.")],
          [tt("The task"), tt("Similar tasks follow the same steps."), tt("Booking a ticket and booking freight work differently.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} Consistency and standards is Nielsen's heuristic (1994); conformity with user expectations is an interaction principle of ISO 9241-110.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Inconsistency usually grows from good intentions: each team improves its own area, and the improvements differ. That is why consistency is rarely fixed on the screen; it is fixed where the patterns come from, which is the subject of the next card and of Materi B.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("UX laws belong in components, patterns and standards, not only in single screens; built in once, they hold everywhere. Weigh measures on effect on users, feasibility, risk and time pressure, with a reason.")}
      sources={["frost2016", "kholmatova2017", "gibbons2018"]}
      reasoning={[
        tt("For each fix, ask whether it can live in a component or a pattern, so every screen gets it."),
        tt("Evaluate a design system by whether its components carry the laws: grouping, hierarchy, disclosure, one primary action."),
        tt("Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure."),
        tt("A quick fix on a page and a shared component can both be right; the component keeps the quick fixes from drifting."),
        tt("A rating is a judgement with a reason, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D6.A5} art={ART_D6} />
      <SystemChainFig />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} Building interfaces from shared components follows Frost (2016) and Kholmatova (2017); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Evaluating a design system against the UX laws is a simple audit: take each component and ask whether it groups, ranks and discloses as the principles say. A button component that allows three equally strong buttons side by side, or a form component that cannot hide fields, will reproduce the problem on every screen that uses it.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("A design system is a shared set of principles, components and patterns every team builds from. It gives consistency, scale and steering; leaders use it to turn UX principles into system logic, standards and governance.")}
      sources={["kholmatova2017", "frost2016", "curtis2010"]}
      reasoning={[
        tt("Look at how many teams build the same kind of element in their own way: each is a missing component."),
        tt("Start with the principles (grouping, hierarchy, disclosure, one primary action), then the components that carry them."),
        tt("Make the shared component the easy path for teams, or they will keep building their own."),
        tt("Steer at the level of principles and ownership; let teams build at the level of screens."),
      ]}
    >
      <ComicButton comic={COMICS_D6.B1} art={ART_D6} />
      <SystemFig />
      <LayersFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} Design systems and their parts follow Kholmatova (2017), Frost (2016) and Curtis (2010).`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A design system is a product for internal users, the teams. Like any product, it fails when it is hard to use: missing components, poor documentation, slow answers to requests. Many organisations therefore give it a small permanent team and treat the other teams' adoption as its main measure of success.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Consistency against flexibility, speed today against quality over years, clarity against showing more, standardisation against team autonomy. Make the shared component the easy path and allow documented exceptions.")}
      sources={["kholmatova2017", "nielsen2006", "gibbons2018"]}
      reasoning={[
        tt("Name the conflict as two goals and say who stands for each: a team under time pressure, the design-system lead, a department, the users."),
        tt("Short-term pressure favours single solutions; long-term quality needs shared ones. Say which one you serve and why."),
        tt("A strict system with no exceptions makes teams wait; a system without components makes teams build their own."),
        tt("Allow exceptions with a reason and a review, and turn repeated exceptions into new components."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D6.B2} art={ART_D6} />
      <ConflictFig />
      <DataTable
        caption={tt("Standing conflicts of design systems")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Consistency against flexibility"), tt("The design-system lead, against a team with a special case."), tt("Is the case really special, or a missing option of a component?")],
          [tt("Speed today against quality over years"), tt("A team with a deadline, against everyone who maintains it later."), tt("What will this single solution cost each time it must change?")],
          [tt("Visibility against clarity"), tt("Departments that want more shown, against users who need less at once."), tt("What does the user need in this step, and what can be one step away?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} The matrix is a reading of the example, not a score.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("A useful rule for exceptions: the first time a team needs something the system lacks, it may build it with a note; the second time another team needs the same thing, it becomes a component. The system grows from real needs, and nobody waits for a perfect library.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("A design system lives only with governance: an owner of its principles and components, a way to propose new ones, and a rule for conflicts between teams. A decision with incomplete data says what it decides, what it does not know, when it would reverse it and what it gives up.")}
      sources={["simon1956", "klein2007", "kholmatova2017"]}
      reasoning={[
        tt("Name who owns the principles and the components, and who only uses them."),
        tt("Give teams a clear way to propose a component or ask for an exception, and say who decides on what basis."),
        tt("Settle conflicts between teams by the principles first, then by need and effect on users, then by a named person."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
        tt("Missing visual order becomes an organisational problem when no one owns the patterns across teams."),
      ]}
    >
      <ComicButton comic={COMICS_D6.B3} art={ART_D6} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of design-system governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Seabird)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the principles and components; who uses them?"), tt("The design-system lead owns them; teams use them.")],
          [tt("How a request is decided"), tt("How does a team get a new component or an exception?"), tt("It proposes; the lead decides on need and effect on users.")],
          [tt("How a conflict is decided"), tt("What happens when two teams want different patterns?"), tt("The principles decide; the product owner settles a tie.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${SB()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Imagine it is a year later and the design system has failed, and ask why (Klein 2007). The usual answers: the components came too late, so teams built their own; nobody answered requests; the principles were written but never enforced in reviews. Each answer is a governance gap, not a design gap.")}</p>
      </Extra>
    </MaterialCard>
  );
}
