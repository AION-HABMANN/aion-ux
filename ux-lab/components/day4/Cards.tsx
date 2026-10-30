"use client";

import type { ReactNode } from "react";
import { ChoiceFig, ConflictFig, DecisionFig, ExpectFig, FrictionFig, MemoryFig, SimpleFig, StepsFig, SystemChainFig, WeighFig } from "@/components/day4/diagrams";
import { StructureLab } from "@/components/day4/labs";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D4 } from "@/components/day4/comicScenes";
import { COMICS_D4 } from "@/data/day4/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Pedalo, Nina, Sam, Yusuf and Clara; never ServicePoint, WorkFlow Hub or MyEnergy, so
 * no task is answered here. Every statement comes from the plan's Wissen cell and the laws its title names; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const PD = () => tt("Pedalo, Nina, Sam, Yusuf and Clara are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Intuitive use is designed. Using an interface runs through perceiving, attending, remembering and acting; friction appears where a design asks too much of one of them. Looking simple is not being intuitive.")}
      sources={["norman2013", "iso9241110", "krug2014", "raskin1994", "baymard2024", "rayner1998", "cowan2001"]}
      reasoning={[
        tt("Walk through a task and note where you hesitate: that is where friction is."),
        tt("Locate each hesitation in one of the four steps: not seen (perceive), lost among others (attend), forgotten (remember), unsure what to do or whether it worked (act)."),
        tt("Do not confuse few elements with intuitive use: unlabelled icons and hidden next steps look simple and make people guess."),
        tt("Ask whether the next step is visible, named and clearly the main action."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A1} art={ART_D4} />
      <StepsFig />
      <SimpleFig />
      <DataTable
        caption={tt("A simple-looking surface and truly intuitive guidance")}
        head={[tt("Aspect"), tt("Looks simple"), tt("Is intuitive")]}
        rows={[
          [tt("Elements"), tt("Few, often unlabelled icons."), tt("As many as the task needs, each named.")],
          [tt("Next step"), tt("Has to be guessed."), tt("Visible and clearly the main action.")],
          [tt("Feedback"), tt("Nothing after an action."), tt("Says that it worked and what comes next.")],
          [tt("Checked by"), tt("How clean it looks."), tt("Whether people finish their task without thinking about the interface.")],
        ]}
      />
      <DataTable
        caption={tt("Intuitive use is designed: evidence")}
        head={[tt("Idea"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("Intuitive means familiar"), tt("Jef Raskin argued in 1994 that “intuitive” in practice means familiar: an interface is intuitive when it uses skills people already have (Raskin 1994)."), tt("A new layout is intuitive only for people who know its pattern: start from patterns your users already know.")],
          [tt("Perception, attention, memory, action"), tt("The eyes rest for about 200 to 300 ms per fixation (Rayner 1998), and working memory holds about four chunks (Cowan 2001)."), tt("What a person must notice, hold and decide in one step has to fit in that budget.")],
          [tt("Friction has a price"), tt("In Baymard's quantitative study, 17% of the US online shoppers had abandoned an order in the past quarter because the checkout seemed too long or complicated; the average cart abandonment rate across all reasons is 70.19% (Baymard Institute 2024)."), tt("A step that is hard to follow costs completions, not only comfort.")],
          [tt("Simple surface or intuitive guidance"), tt("ISO 9241-110 asks for self-descriptiveness and conformity with user expectations, not for few elements (ISO 9241-110)."), tt("Judge a screen by whether people finish the task without thinking about the interface, not by how clean it looks.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} Designing for how people perceive and act follows Norman (2013); the interaction principles (suitability for the task, self-descriptiveness, conformity with expectations) follow ISO 9241-110. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("ISO 9241-110 lists seven interaction principles: suitability for the task, self-descriptiveness, conformity with user expectations, learnability, controllability, use error robustness and user engagement. Most hesitations in a walkthrough break one of them, which gives the team a shared word for the problem.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("People take in the options, compare them and decide. The more equally weighted options there are, the longer the decision takes (Hick's law). Give frequent choices priority and group the rest.")}
      sources={["hick1952", "hyman1953", "iyengar2000", "yablonski2020", "larson1998"]}
      reasoning={[
        tt("Count the equally weighted options at each decision point: menu items, tiles, buttons, passes."),
        tt("Hick's law bites hardest when the options are unfamiliar and look alike; a familiar, well-sorted list can be long."),
        tt("Do not delete functions; give the frequent ones priority and group the rest one step deeper."),
        tt("Watch for new choices after every step with no clear right path: each one is a new decision."),
        tt("Many options can attract interest and still make people choose less often."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A2} art={ART_D4} />
      <ChoiceFig />
      <StructureLab />
      <DataTable
        caption={tt("When many options hurt, and when they do not")}
        head={[tt("Situation"), tt("Effect of many options"), tt("What helps")]}
        rows={[
          [tt("Unfamiliar options that look alike"), tt("Slow decisions, wrong choices, giving up."), tt("Priority for the frequent ones, a short line on who each is for.")],
          [tt("A familiar, sorted list (countries, dates)"), tt("Little harm; people jump to what they know."), tt("A clear order and search.")],
          [tt("Experienced users who know the layout"), tt("Little harm; they go straight to their item."), tt("Keep positions stable.")],
          [tt("A choice after every step"), tt("Every step becomes a new decision."), tt("One recommended path, alternatives as a secondary link.")],
        ]}
      />
      <DataTable
        caption={tt("Choice and decision time: findings")}
        head={[tt("Finding"), tt("What was measured"), tt("What it means for a screen")]}
        rows={[
          [tt("Hick-Hyman law"), tt("The time to choose grows with the logarithm of the number of equally likely alternatives, RT = a + b·log2(n + 1) (Hick 1952; Hyman 1953)."), tt("Each added option costs time, a little less each time. The law holds for unfamiliar, equally likely options, not for sorted lists people know.")],
          [tt("Depth against breadth"), tt("In a study of web structures, more depth harmed search performance, and a medium structure of depth and breadth beat the broadest, shallowest one (Larson and Czerwinski 1998)."), tt("Do not flatten everything into one long menu, and do not hide items under many levels: group into a few clear levels.")],
          [tt("Choice overload"), tt("A display of 24 jams drew more stops and far fewer purchases than a display of 6 (Iyengar and Lepper 2000; a small study, with later mixed results)."), tt("Recommend a few options first and keep the rest one step away.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} Hick's law follows Hick (1952) and Hyman (1953); that many options can make people choose less follows Iyengar and Lepper (2000). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Hick and Hyman measured simple reactions to lights, not people choosing a tariff, so the law is a direction, not a formula for screens. What carries over is the shape: each extra equal option adds decision effort, and the effect shrinks when people already know where to look. That is why stable positions matter for experienced users as much as fewer options matter for new ones.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("People act on their mental model: they expect things where other products put them and the same element to work the same everywhere. A large, close target is reached faster and missed less (Fitts's law).")}
      sources={["norman2013", "fitts1954", "iso9241110", "yablonski2020", "wcag22", "appleHig", "nielsen2000", "nielsen1994"]}
      reasoning={[
        tt("Ask where people would look for the main action, from habit with other products, and put it there."),
        tt("Check recognisability: the same element looks and works the same on every screen and in every area."),
        tt("Check the action logic: what to do, in which order, and what happens after each step."),
        tt("Apply Fitts's law: the frequent, important targets are large and close to where the hand or thumb already is."),
        tt("Changing patterns between areas make people relearn each area and cause wrong actions."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A3} art={ART_D4} />
      <ExpectFig />
      <DataTable
        caption={tt("Four sources of intuitive action")}
        head={[tt("Source"), tt("What it means"), tt("A sign it is missing")]}
        rows={[
          [tt("Conformity with expectations"), tt("Things are where people expect from other products."), tt("The main button is somewhere unusual.")],
          [tt("Recognisability"), tt("The same element looks and works the same everywhere."), tt("A red button ends a ride on one screen and pauses it on another.")],
          [tt("A clear action logic"), tt("Start, steps and end are visible."), tt("New options appear without saying which path is right.")],
          [tt("Fitts's law"), tt("Important targets are large and close."), tt("A small button far from the thumb is missed.")],
        ]}
      />
      <DataTable
        caption={tt("Targets, expectations and mental models: numbers and rules")}
        head={[tt("Topic"), tt("Real rule or finding"), tt("What to check")]}
        rows={[
          [tt("Fitts's law"), tt("The time to hit a target grows with its distance D and shrinks with its width W, MT = a + b·log2(2D/W) (Fitts 1954)."), tt("Make the main target large and near the thumb or the pointer; do not put it in a far corner.")],
          [tt("Target size"), tt("WCAG 2.2 asks for pointer targets of at least 24 by 24 CSS pixels at level AA (2.5.8, with a spacing exception) and 44 by 44 at level AAA (2.5.5); the platform guidelines of Apple and Google give 44 points and 48 dp (Apple; as commonly given)."), tt("Measure the tap area, not the icon, and keep the targets apart.")],
          [tt("Conformity with expectations"), tt("Users spend most of their time on other sites, so they expect yours to work like those (Nielsen 2000, Jakob's law). Consistency and standards are one of the ten heuristics (Nielsen 1994)."), tt("Put the main action where other products put it, and let one element do one thing everywhere.")],
          [tt("Mental models"), tt("People form a model of how a thing works from what they see; when the system works differently, errors follow (Norman 2013)."), tt("Name things in the words users use, and show the state of the system.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} Mental models follow Norman (2013); Fitts's law follows Fitts (1954); conformity with user expectations is an interaction principle of ISO 9241-110; Jakob's law is described by Yablonski (2020). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Fitts's law has a corner case worth knowing: on a desktop screen, the edges and corners are effectively infinitely large targets, because the pointer stops there. On a phone the same thinking applies to the bottom of the screen, where the thumb rests: the most frequent actions belong there.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Working memory holds only a few things at once (Miller's rule; later research says nearer four). Making people remember raises the load, and with it errors, abandonment and uncertainty.")}
      sources={["miller1956", "cowan2001", "sweller1988", "nielsen1994", "baymard2024", "iso13616"]}
      reasoning={[
        tt("List what a person has to keep in mind during a task: a code, a choice made two steps back, a term from another page."),
        tt("Let the system carry what it already knows; show instead of asking people to recall."),
        tt("Too many options, unclear structures and inconsistent patterns all add load, not only long texts."),
        tt("Load shows up as errors, abandoned processes and people unsure whether something worked; feedback after each step lowers the uncertainty."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A4} art={ART_D4} />
      <MemoryFig />
      <DataTable
        caption={tt("Where load comes from, and what it does")}
        head={[tt("Source of load"), tt("What it does"), tt("What helps")]}
        rows={[
          [tt("Information to carry across steps"), tt("Forgotten or mistyped; the task starts again."), tt("The system carries it over.")],
          [tt("Too many options"), tt("Comparing in the head; slow and unsure."), tt("Frequent options first.")],
          [tt("Unclear structure"), tt("People do not know where they are."), tt("Visible steps and a clear place.")],
          [tt("Inconsistent patterns"), tt("What was learnt does not hold; wrong actions."), tt("The same pattern everywhere.")],
          [tt("No feedback"), tt("Uncertainty; repeated or abandoned actions."), tt("A clear confirmation after each step.")],
        ]}
      />
      <DataTable
        caption={tt("Memory and load: findings")}
        head={[tt("Finding"), tt("What it shows"), tt("What it means for a screen")]}
        rows={[
          [tt("Miller 1956 and Cowan 2001"), tt("Miller described a span of about seven chunks; later work puts it nearer four (Miller 1956; Cowan 2001). The number is about chunks, not about menu items."), tt("Do not build a rule on seven; treat memory as small and let the system carry information across steps.")],
          [tt("Chunking in practice"), tt("An IBAN is written in groups of four characters (ISO 13616), and card numbers are printed in groups of four digits."), tt("Group long codes, so they can be read, remembered and checked in pieces.")],
          [tt("Load and abandonment"), tt("17% of the US online shoppers had abandoned an order in the past quarter because the checkout seemed too long or complicated (Baymard Institute 2024)."), tt("Count what a step asks people to remember and to compare, and remove it.")],
          [tt("Extraneous load"), tt("Effort spent on working out the interface is missing for the task (Sweller 1988)."), tt("Remove the effort that does not serve the task before adding any help.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} The limits of short-term memory follow Miller (1956) and Cowan (2001); cognitive load follows Sweller (1988); recognition rather than recall is Nielsen's heuristic (1994). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Miller's “seven, plus or minus two” is often quoted as a rule for menus (“never more than seven items”). That is a misreading: Miller wrote about holding items in memory, not about choosing from items that stay visible. A visible menu with ten items does not have to be remembered; a code on the previous screen does.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("UX laws are tools: each points to a kind of friction and a kind of fix. To put measures in order, weigh each on effect on users, feasibility, risk and time pressure, with a reason.")}
      sources={["yablonski2020", "gibbons2018", "nielsen1994", "us5960411", "wcag22", "cowan2001"]}
      reasoning={[
        tt("Use the laws to find fixes: Hick to fewer equal choices, Miller to less to remember, Fitts to larger, closer targets, expectations to familiar places and patterns."),
        tt("Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure."),
        tt("A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer."),
        tt("Prefer fixes that remove a step or a choice over fixes that add explanation, such as help texts and videos."),
        tt("Ordering and grouping functions usually needs agreement from the teams that own them: count that in feasibility and risk."),
      ]}
    >
      <ComicButton comic={COMICS_D4.A5} art={ART_D4} />
      <WeighFig />
      <DataTable
        caption={tt("UX laws as tools")}
        head={[tt("Law or principle"), tt("The friction it points to"), tt("The kind of fix")]}
        rows={[
          [tt("Hick's law"), tt("Too many equal choices."), tt("Frequent ones first, the rest grouped.")],
          [tt("Miller's rule"), tt("Too much to remember."), tt("The system remembers; show, do not ask.")],
          [tt("Fitts's law"), tt("Targets small or far away."), tt("Important targets large and close.")],
          [tt("Conformity with expectations"), tt("Things in unexpected places; changing patterns."), tt("Familiar places, one pattern.")],
        ]}
      />
      <DataTable
        caption={tt("The laws of UX as tools, and where they stop")}
        head={[tt("Law"), tt("What it is good for"), tt("Where it stops")]}
        rows={[
          [tt("Hick's law"), tt("Ordering and grouping options: frequent ones first, the rest grouped."), tt("It is about equally likely, unfamiliar options; it does not say that fewer is always better (Larson and Czerwinski 1998).")],
          [tt("Fitts's law"), tt("Sizing and placing targets."), tt("It models pointing; on touch screens thumb reach and accidental taps matter as well (WCAG 2.5.8).")],
          [tt("Miller's rule"), tt("Reminding that memory is small."), tt("Seven is not a limit for menus; the span is about chunks and is nearer four (Cowan 2001).")],
          [tt("Jakob's law"), tt("Choosing familiar patterns."), tt("Familiar is not always best: a new pattern can pay if it removes real friction.")],
          [tt("A real step reduction"), tt("Amazon's patent for one-click ordering (US 5,960,411, granted 1999) describes a purchase in one action by reusing stored data."), tt("The saving came from carrying information for the user, not from a smaller screen.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} The laws as practical tools follow Yablonski (2020); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("A help text or a tutorial video is often the cheapest-looking fix and the weakest: it adds something to read and remember, and it helps only the people who find it. When a team proposes one, ask which step or choice could be removed instead, so that the help is not needed.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Usability is strategic when it decides what is done first. Organisations answer problems with new functions, which add load; leaders reduce friction in the whole system first.")}
      sources={["norman2013", "iso9241110", "yablonski2020", "baymard2024", "larson1998", "raskin1994"]}
      reasoning={[
        tt("Look at where customers search, remember and guess across all channels, and what it costs in support and abandonment."),
        tt("Before a new function, ask which existing friction it is meant to solve, and whether removing that friction would solve it."),
        tt("Think in processes across channels, not single screens: the same task in the portal, the app and the service should follow the same logic."),
        tt("Leaders steer usability as a factor of impact, not only provide functions."),
      ]}
    >
      <ComicButton comic={COMICS_D4.B1} art={ART_D4} />
      <FrictionFig />
      <SystemChainFig />
      <DataTable
        caption={tt("Usability as a strategic factor: evidence")}
        head={[tt("Evidence"), tt("What it shows"), tt("What it means for a decision")]}
        rows={[
          [tt("Baymard Institute 2024"), tt("17% of the US online shoppers abandoned an order in the past quarter because of a long or complicated checkout."), tt("Friction is a business figure: it shows in completions.")],
          [tt("Larson and Czerwinski 1998"), tt("How content is structured changes how fast people find it, independent of the content."), tt("Structure is a decision with a measurable effect, not a layout detail.")],
          [tt("Raskin 1994"), tt("Intuitive means familiar."), tt("A strategy for ease of use starts from what users already know, across all channels.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} Designing for how people act follows Norman (2013); the interaction principles follow ISO 9241-110. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A simple test for a roadmap: for each planned function, write the user problem it solves and the step or choice it adds. If the problem could be solved by removing a step, the function waits. Teams that apply it usually find that the first quarter's work is in existing processes, not new ones.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Scope of functions against simplicity, completeness against efficiency, new against experienced users, the ideal against time. Keep every function, but order them: frequent tasks first.")}
      sources={["iyengar2000", "gibbons2018", "hick1952", "larson1998", "nielsen2000", "baymard2024"]}
      reasoning={[
        tt("Name the conflict as two goals and say who stands for each: a department, the UX team, new users, experienced users."),
        tt("Showing every function at once is not the same as people finishing their task; past a point it is worse."),
        tt("Keep every function reachable, give the frequent ones priority, and group the rest one step deeper with a clear entry and search."),
        tt("Under time pressure, prefer the change that helps most people soon over the ideal rebuild that helps nobody this year."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D4.B2} art={ART_D4} />
      <ConflictFig />
      <DataTable
        caption={tt("Standing conflicts of intuitive use")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Scope of functions against simplicity"), tt("Departments that want their functions seen, against users who need few choices."), tt("Which tasks do most users do most often?")],
          [tt("New against experienced users"), tt("A calm start, against everything in one click."), tt("Can the frequent tasks serve both, with shortcuts for experts?")],
          [tt("The ideal against time and feasibility"), tt("A full rebuild, against what fits the release."), tt("What helps most users within the time there is?")],
        ]}
      />
      <DataTable
        caption={tt("Conflicts of intuitive use, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Scope of functions against simplicity"), tt("More choice can mean fewer decisions (Iyengar and Lepper 2000), and a medium structure beats the broadest one (Larson and Czerwinski 1998)."), tt("Put the frequent tasks first and group the rest in few levels.")],
          [tt("New against experienced users"), tt("Users expect a product to work like the others they know (Nielsen 2000)."), tt("Keep the main pattern familiar and add shortcuts for experts.")],
          [tt("The ideal against time"), tt("Abandonment through a long checkout is common (Baymard Institute 2024)."), tt("Fix the steps that lose the most people first.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} That many options can make people choose less follows Iyengar and Lepper (2000); the matrix is a reading of the example, not a score. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Departments often fear that a function one step deeper will not be used. A useful agreement: move it, give it a clear entry and search, and look at the use after a quarter. If it really drops for customers who need it, it moves back up. The fear becomes a check instead of a veto.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("The interaction logic needs an owner, or every team adds its function wherever it likes. A decision with partial user data says what it decides, what it does not know, when it would reverse it and what it gives up.")}
      sources={["simon1956", "klein2007", "iso9241110", "conway1968", "frost2016", "wcag22"]}
      reasoning={[
        tt("Name who owns the order of tasks, the steps of each process and the patterns across channels; departments own their content and rules."),
        tt("Give conflicts a rule: how often users need a task and how much support it causes, using the data there is; then a named person."),
        tt("Accept a new function only with a plan for where it sits and what it replaces."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D4.B3} art={ART_D4} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of a governance model for the interaction logic")}
        head={[tt("Part"), tt("The question"), tt("An example (Pedalo)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the order of tasks and the steps; who owns content?"), tt("The head of UX owns the order and the steps; each team owns its content and rules.")],
          [tt("How a request is decided"), tt("What happens when a team wants its function on top?"), tt("How often riders need it and how much support it causes decide.")],
          [tt("When a function may be added"), tt("What must a new function bring?"), tt("A plan for where it sits and what it replaces.")],
        ]}
      />
      <DataTable
        caption={tt("Who owns the interaction logic: evidence and rules")}
        head={[tt("Part"), tt("Evidence or rule"), tt("What it means")]}
        rows={[
          [tt("Ownership"), tt("The structure of a product tends to copy the structure of the organisation behind it (Conway 1968)."), tt("Name one owner of the order of tasks and steps, or each department will shape its own.")],
          [tt("Shared rules"), tt("Interfaces built from shared rules and components stay consistent (Frost 2016); ISO 9241-110 gives seven principles to decide by."), tt("Write the rules down once and let teams build within them.")],
          [tt("A floor"), tt("WCAG 2.2 fixes minimum target sizes and spacing."), tt("Treat the target size as a rule, not as a taste.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${PD()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Imagine it is a year later and customers still call about the same tasks, and ask why (Klein 2007). Typical answers: a team added its function to the start screen anyway; a process was fixed in the app but not in the portal; the confirmation was written but never tested. Each answer points to a missing owner or a missing check.")}</p>
      </Extra>
    </MaterialCard>
  );
}
