"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, DecisionFig, FourQuestionsFig, LayersChainFig, LayersFig, LeverFig, PositionFig, SignalsFig, StagesFig, WeighFig, WindowFig } from "@/components/day9/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D9 } from "@/components/day9/comicScenes";
import { COMICS_D9 } from "@/data/day9/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Brightwater Savings, Vera, Kaspar, Rhea and Dominik; never SkillRise, HealthJourney
 * or MoveWell, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings keep the original Day 9's
 * serious-domain notes (why leaderboards fail in prevention, the trust asymmetry, the four questions, the works council's question) in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const BW = () => tt("Brightwater Savings, Vera, Kaspar, Rhea and Dominik are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Gamification borrows the structure of games (a goal, a position, feedback). Playful design changes only the tone. A game builds a world. They differ in effort and risk; gamification strategies aim at activation (starting) and retention (staying).")}
      sources={["deterding2011", "hamari2014", "nicholson2015"]}
      reasoning={[
        tt("Ask which of the three a request wants: structure, tone or a game."),
        tt("Structure helps almost any product; check whether people can see their goal, their position and what a step did."),
        tt("Treat a playful tone in a serious field as a risk to credibility, not as a free extra."),
        tt("Treat a game as a project of months; do not accept it with the time and people of a small change."),
        tt("Say whether a measure aims at activation (people start now) or retention (they keep coming back)."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A1} art={ART_D9} />
      <LayersFig />
      <DataTable
        caption={tt("Three things called gamification")}
        head={[tt("What it is"), tt("What changes"), tt("Effort"), tt("Main risk")]}
        rows={[
          [tt("Gamification (structure)"), tt("Goals, a visible position, feedback, recognition, challenges."), tt("Days; one or two people."), tt("Little, if the goal is real.")],
          [tt("Playful design (tone)"), tt("Colours, shapes, a cheerful voice."), tt("Weeks; design and writing."), tt("A serious provider looks careless.")],
          [tt("A game (fiction)"), tt("A world, characters, a story of its own."), tt("Months; a whole team."), tt("Unconvincing fiction; looks childish.")],
        ]}
      />
      <DataTable
        caption={tt("Gamification, playful design and a game: definitions and evidence")}
        head={[tt("Source"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("The definition"), tt("Gamification is the use of game design elements in non-game contexts (Deterding et al. 2011)."), tt("Ask which element you borrow (a goal, a position, feedback) and for what real task.")],
          [tt("Does it work?"), tt("A review of 24 empirical studies found mostly positive effects, but the effects depended greatly on the context and on the users (Hamari et al. 2014)."), tt("Do not assume an effect: name the context and the group, and measure.")],
          [tt("Meaningful gamification"), tt("Nicholson argues that gamification should be built around what is meaningful for the user, not around rewards alone (Nicholson 2015)."), tt("Start from the user's own goal, then choose the mechanic.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Gamification as game design elements in non-game contexts, apart from playful design and full games, follows Deterding et al. (2011); its context-dependent effects follow Hamari et al. (2014). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("A health insurer, a bank or a public service can use the structure layer freely: visible progress, milestones, confirmation. What it can rarely risk is the playful tone: the moment a claims or a savings screen looks cheerful, people read it as a company that takes their situation less seriously than they do. Most failed gamification projects tried to build the fiction layer with the time and the team of a structure project.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("People react to information about their own position: progress, feedback, recognition, a challenge, a goal reached. Under every mechanic is a lever: reward, competence, self-efficacy, social validation, the experience of progress, an activation trigger.")}
      sources={["ryan2000", "bandura1977", "festinger1954", "kivetz2006"]}
      reasoning={[
        tt("Progress: can people see how far they have come and how much is left?"),
        tt("Feedback: does a finished step say what it did, in the person's terms?"),
        tt("Recognition: is a real achievement noticed?"),
        tt("Self-efficacy: does the product show people what they can now do?"),
        tt("Name the lever under every mechanic before you choose it: whom does it move, and whom does it put off?"),
      ]}
    >
      <ComicButton comic={COMICS_D9.A2} art={ART_D9} />
      <PositionFig />
      <DataTable
        caption={tt("The motivation levers and the mechanics that pull them")}
        head={[tt("Lever"), tt("What it means"), tt("Mechanics that pull it"), tt("Who it may put off")]}
        rows={[
          [tt("Reward"), tt("Getting something for an action."), tt("Points, coins, prizes."), tt("People who did it for its own sake.")],
          [tt("Competence"), tt("Feeling good at something."), tt("Levels named by skill, feedback."), tt("Few, if levels are honest.")],
          [tt("Self-efficacy"), tt("Believing you can do it."), tt("Visible progress, “you can now …”."), tt("Few.")],
          [tt("Social validation"), tt("Others see or confirm it."), tt("Rankings, sharing, likes."), tt("Those at the bottom; private people.")],
          [tt("Experience of progress"), tt("Getting closer to a goal."), tt("Progress bars, milestones, stages."), tt("Few, if the goal is theirs.")],
          [tt("Activation trigger"), tt("A cue to act now."), tt("Reminders, notifications, streaks."), tt("People who feel pushed.")],
        ]}
      />
      <DataTable
        caption={tt("Why people react to progress, feedback and recognition: sources")}
        head={[tt("Lever"), tt("Real finding"), tt("What it means for a mechanic")]}
        rows={[
          [tt("Autonomy, competence, relatedness"), tt("Self-determination theory names three basic needs whose satisfaction supports lasting motivation (Ryan and Deci 2000)."), tt("Check each mechanic against the three needs: does it give choice, a sense of skill and a link to others?")],
          [tt("Self-efficacy"), tt("Bandura described the belief that one can do something as a main source of effort and persistence (Bandura 1977)."), tt("Show what the person can do now that they could not before.")],
          [tt("Social comparison"), tt("People judge their own ability by comparing themselves with others (Festinger 1954)."), tt("Rankings motivate those near the top and can discourage those at the bottom.")],
          [tt("Progress"), tt("Customers in a real reward programme bought more often the closer they were to the reward (Kivetz et al. 2006)."), tt("Show the distance to a goal that is the person's own.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Competence, autonomy and relatedness as needs behind lasting motivation follow Ryan and Deci (2000); self-efficacy follows Bandura (1977); social comparison follows Festinger (1954). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("In a prevention or health product, the people who most need to continue are often the ones doing worst. A ranking tells exactly those people, every week, that they are at the bottom, in a field where being at the bottom is already a source of shame. It works on the fittest few, who need it least. That is the clearest case of a mechanic that raises the average while harming the people the product exists for.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Points, badges, levels, challenges, streaks, feedback and status displays each have one job and one limit. Stacking them does not stack motivation. Bad gamification fails through manipulation, overstimulation, reward inflation, lost motivation and lost trust.")}
      sources={["hamari2014", "deci1999", "tversky1991", "lepper1973"]}
      reasoning={[
        tt("Give each tool one job; if you cannot say its job, leave it out."),
        tt("Count the signals on a screen: past a few, each new one makes the others mean less."),
        tt("Check for manipulation: fake urgency, guilt, a countdown that never ends."),
        tt("Check for reward inflation: are rewards getting bigger for less?"),
        tt("Remember the asymmetry: too much can be removed, lost trust repairs slowly."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A3} art={ART_D9} />
      <SignalsFig />
      <DataTable
        caption={tt("The tools of gamification: their job and their limit")}
        head={[tt("Tool"), tt("Its job"), tt("Where it stops working")]}
        rows={[
          [tt("Points"), tt("Count activity."), tt("They count effort, not value; easy to game.")],
          [tt("Badges"), tt("Mark something rare."), tt("When there are many, none means anything.")],
          [tt("Levels"), tt("Name a capability."), tt("When they name activity (“Level 6”), not skill.")],
          [tt("Challenges"), tt("Set a bounded task."), tt("When they are daily duties, not invitations.")],
          [tt("Streaks"), tt("Reward regularity."), tt("One missed day resets them; people stop altogether.")],
          [tt("Feedback"), tt("Say what an action did."), tt("When it is technical or empty praise.")],
          [tt("Status displays"), tt("Show a position or rank."), tt("They motivate the top and shame the bottom.")],
        ]}
      />
      <DataTable
        caption={tt("The limits of the tools: evidence")}
        head={[tt("Finding"), tt("What was measured"), tt("What it means for a mechanic")]}
        rows={[
          [tt("Rewards can undermine interest"), tt("A meta-analysis of 128 experiments found that tangible rewards undermined intrinsic motivation (Deci et al. 1999)."), tt("Do not pay for what people already do for its own sake.")],
          [tt("Expected rewards"), tt("Preschool children who liked drawing and were promised a certificate drew less in later free play than children who got the same certificate unexpectedly or none (Lepper et al. 1973; 18, 18 and 15 children, as reported)."), tt("A reward that is announced turns the activity into a means to the reward.")],
          [tt("Losses weigh more"), tt("Losses loom larger than equal gains (Tversky and Kahneman 1991)."), tt("A broken streak hurts more than a kept streak pleases: offer a way to recover.")],
          [tt("Context decides"), tt("The effects of gamification depended greatly on context and on users (Hamari et al. 2014)."), tt("Test each tool in the setting where it will be used.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Mixed effects of gamification follow Hamari et al. (2014); rewards lowering intrinsic motivation follow Deci et al. (1999); loss aversion, the lever behind “don't lose your streak”, follows Tversky and Kahneman (1991). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("The five failures are not equally repairable. Overstimulation and lost motivation can be fixed by removing things. Reward inflation can be fixed slowly, because people expect the bigger rewards. Lost trust hardly repairs: once people decide a product is trying to trick them, they discount everything it says. In a game they would leave; in a bank, a health service or a public service they often cannot, so they stay and stop believing the messages. That is worse than leaving.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Progress logic says where you are; a story says why it matters. Together they make the same mechanics mean more. Activation and retention differ: the loudest rewards win the first week and often lose the third month, so the period you measure picks the winner.")}
      sources={["nicholson2015", "kivetz2006", "ryan2000", "patel2017"]}
      reasoning={[
        tt("Give each stage a name that says what it means in the person's life."),
        tt("Tell the real process well; do not invent a quest."),
        tt("Keep the mechanics; let the story change their meaning."),
        tt("Say whether a design aims at activation or at retention."),
        tt("Judge a design over the period that matters for its goal, not over its launch week."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A4} art={ART_D9} />
      <StagesFig />
      <WindowFig />
      <DataTable
        caption={tt("A quick spike against lasting use: a real trial")}
        head={[tt("Finding"), tt("What was measured"), tt("What it means for a mechanic")]}
        rows={[
          [tt("A real trial"), tt("In the BE FIT randomized trial, 200 adults of 94 families played a game with points and levels based on step goals for 12 weeks; their steps rose by 1,661 a day against 636 in the control group (Patel et al. 2017, as reported)."), tt("A mechanic that is built around a real goal can move behaviour.")],
          [tt("After the game"), tt("In the 12 weeks after the game, the gain shrank to 1,385 against 798 steps, still above the control group (Patel et al. 2017, as reported)."), tt("Plan for the decay: a mechanic needs a renewal or a hand-over to a habit.")],
          [tt("Progress and story"), tt("Perceived distance to the goal drives effort (Kivetz et al. 2006), and a narrative frame carries a person through a long path (Nicholson 2015)."), tt("Use the story to explain why the goal matters and the progress to show the way.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Meaningful gamification built on the person's own goals follows Nicholson (2015); people speeding up as a goal comes closer follows Kivetz et al. (2006). The bars in the second picture are a typical pattern to think with, not measured data. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("The best story material in a serious field is usually the real process, described well: what changes at each stage, why the third week is the hard one, what the person can do now that they could not before. That is storytelling: it has stages, causes and stakes, and none of it is invented. Inventing a quest is what teams do when they have not looked closely at what people actually go through.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("A reward for something people already do gladly can replace their own reason. In serious fields credible gamification is a different selection: structure and honest feedback yes, playful tone rarely, rankings and urgency almost never. Weigh measures on effect on users, feasibility, risk and time pressure.")}
      sources={["lepper1973", "deci1999", "gibbons2018", "patel2017", "mathur2019", "dsa2022"]}
      reasoning={[
        tt("Reward only what people would not do anyway; report on what they already do gladly."),
        tt("Ask: could we explain it in one plain sentence, and would it still work?"),
        tt("Ask: whom does it quietly put last, and how does it read in a bad moment?"),
        tt("Ask: who can remove it next year?"),
        tt("Rate every measure on the same four questions, with a reason; a rating is a judgement, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D9.A5} art={ART_D9} />
      <FourQuestionsFig />
      <WeighFig />
      <DataTable
        caption={tt("Intrinsic motivation and credible gamification in serious fields")}
        head={[tt("Topic"), tt("Real finding or rule"), tt("What it means for a measure")]}
        rows={[
          [tt("Intrinsic motivation"), tt("Rewards for an activity people already enjoy can reduce their interest (Deci et al. 1999; Lepper et al. 1973)."), tt("Give feedback and recognition for progress and skill; keep rewards for tasks people do not enjoy.")],
          [tt("A serious field"), tt("A game-based intervention with social incentives raised the daily steps of families in a community study of a heart health programme (Patel et al. 2017, as reported)."), tt("In health and finance, a mechanic is credible when it serves a goal the person has and is evaluated.")],
          [tt("Manipulation"), tt("Pressure patterns such as countdown timers and false scarcity were found on about 11% of the crawled shopping websites (Mathur et al. 2019), and the EU Digital Services Act (Article 25) forbids manipulative interface design on online platforms."), tt("A mechanic that pushes people against their interest is a legal risk and a loss of trust.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} The overjustification effect follows Lepper et al. (1973) and Deci et al. (1999); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("In professional learning, health and public services, the people who take part without being pushed are the intrinsically motivated ones, and they are exactly the people a reward layer can damage. The people a points programme moves are often those who were not taking part, and they tend to stop again when the points stop. So a successful points quarter can leave a product weaker than it started: it lost some of the people it had and rented the people it wanted.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("At senior level gamification is not a feature request but activation architecture: a guiding vision for what people should feel and do, principles on which levers the company uses and which not, patterns built once, and an order of what comes first. It steers behaviour, so it is a responsibility.")}
      sources={["nicholson2015", "ryan2000", "hamari2014", "patel2017"]}
      reasoning={[
        tt("Check where activation is decided today: in a vision, or one request at a time?"),
        tt("Write a guiding vision that says what motivation people should feel, and what the company will not do."),
        tt("Turn it into principles on levers, and into patterns every team uses."),
        tt("Decide which journeys come first: where most people start and leave."),
        tt("Treat every mechanic that steers behaviour as something the company would explain to the people it steers."),
      ]}
    >
      <ComicButton comic={COMICS_D9.B1} art={ART_D9} />
      <ArchitectureFig />
      <LayersChainFig />
      <DataTable
        caption={tt("Gamification as an activation architecture: evidence")}
        head={[tt("Part"), tt("Real finding"), tt("What it means")]}
        rows={[
          [tt("Context decides"), tt("The effects of gamification depended greatly on the context and the users (Hamari et al. 2014)."), tt("An activation strategy names the context and the group before it names a mechanic.")],
          [tt("A design framework"), tt("Nicholson's framework for meaningful gamification starts with the user's own purposes and lets the user choose how to take part (Nicholson 2015)."), tt("Build the architecture from the goal outwards, not from the game layer inwards.")],
          [tt("Evidence of effect and decay"), tt("A trial showed a clear effect during the game and a smaller one after it (Patel et al. 2017, as reported)."), tt("Plan the phases: start, hold, hand over.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Lasting motivation through competence and autonomy follows Ryan and Deci (2000); meaningful gamification follows Nicholson (2015). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A guiding vision for activation is short and testable. “Customers keep saving because they see their cushion grow, not because we push them” can be checked on every screen: does this element show growth, or does it push? “Make saving fun” cannot be checked, and it invites every mechanic anyone suggests.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Activation sits between motivation and seriousness, between steering behaviour and user autonomy, between brand effect and the user's interest, and all of them against economic viability. Decide per lever and per journey, say what you give up, and choose what you measure on purpose.")}
      sources={["tversky1991", "festinger1954", "deci1999", "patel2017", "hamari2014", "ryan2000"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: marketing, sales, the experts, the users."),
        tt("Decide per lever: progress and honest feedback cost little; loss aversion costs autonomy; comparison costs trust."),
        tt("Treat the metric as a decision: what you count, and over which period, decides which design wins."),
        tt("Write the rule down, so the conflict is not fought again for every mechanic."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D9.B2} art={ART_D9} />
      <LeverFig />
      <DataTable
        caption={tt("Standing conflicts of activation")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Motivation against seriousness"), tt("Marketing, against the experts."), tt("Can it be lively and credible at once?")],
          [tt("Activation against autonomy"), tt("Growth targets, against the user's own choice."), tt("Would people choose this push if asked?")],
          [tt("Brand effect against user interest"), tt("Visibility for the company, against the user's goal."), tt("Whose interest does this mechanic serve?")],
          [tt("All of these against economic viability"), tt("Finance, against everyone."), tt("What does it cost, and what does it bring over months?")],
        ]}
      />
      <DataTable
        caption={tt("Conflicts of activation, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Motivation against seriousness"), tt("Gamification worked in a trial about health (Patel et al. 2017, as reported), but effects depend on context (Hamari et al. 2014)."), tt("Test lively elements in the serious setting with its users before scaling.")],
          [tt("Activation against autonomy"), tt("Autonomy is one of the three basic needs for lasting motivation (Ryan and Deci 2000), and announced rewards can undermine interest (Deci et al. 1999)."), tt("Ask: would people choose this push if asked?")],
          [tt("Cost against effect"), tt("In the trial the effect shrank after the game ended (Patel et al. 2017, as reported)."), tt("Count the cost over months, not only the first weeks.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} The three levers are a reading of the example, not a rule for every product. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Activation numbers cannot see the risks of a lever. A streak warning at midnight raises daily activity; it does not show the people who stopped altogether after the streak broke, or the ones who now open the app with a small feeling of dread. Decide which numbers you will look at, and over which period, before you decide on the lever, or the lever will choose the numbers for you.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Adding a mechanic needs only a champion; removing one needs a business case, so mechanics pile up. Governance: a named owner, written principles, a way to remove, an escalation rule. A decision with little data says what it decides, does not know, would reverse and gives up.")}
      sources={["simon1956", "klein2007", "nicholson2015", "dsa2022", "patel2017"]}
      reasoning={[
        tt("Name who owns the activation principles and patterns, and who only uses them."),
        tt("Require a short written reason for every new mechanic: its lever, whom it may put last, who can remove it."),
        tt("Review every mechanic once a year, and remove what no longer earns its place."),
        tt("Settle conflicts by the user's interest, then credibility, then economics; say who settles a tie."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D9.B3} art={ART_D9} />
      <DecisionFig />
      <DataTable
        caption={tt("Four parts of activation governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Brightwater)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the principles and patterns; who uses them?"), tt("The head of customer experience owns them; every team uses them.")],
          [tt("Who checks"), tt("Who makes sure no mechanic harms or misleads?"), tt("The advisers check every message; legal checks rankings and data.")],
          [tt("How a mechanic leaves"), tt("Who can remove a mechanic, and when?"), tt("A yearly review; the owner removes what no longer earns its place.")],
          [tt("How a conflict is decided"), tt("What happens when brand, customer and business disagree?"), tt("Customer first, then credibility, then the business case; the board settles a tie.")],
        ]}
      />
      <DataTable
        caption={tt("Who answers for a mechanic: rules and evidence")}
        head={[tt("Part"), tt("Evidence or rule"), tt("What it means")]}
        rows={[
          [tt("Who checks"), tt("Article 25 of the EU Digital Services Act forbids manipulative interface design on online platforms."), tt("Have legal and the specialists check every ranking, notification and countdown.")],
          [tt("How a mechanic leaves"), tt("Effects decay after a mechanic ends or loses its novelty (Patel et al. 2017, as reported)."), tt("Review each mechanic every year; remove what no longer earns its place.")],
          [tt("Who owns"), tt("Meaningful gamification has to be designed around the user's purposes (Nicholson 2015)."), tt("Give one owner the principles and let every team build within them.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("A works council, a regulator and a journalist all ask the same thing in different words: who decided this, on what principle, and what would have led to a different decision? A company that can answer in one paragraph is in a different position from one that cannot, whatever the mechanic. In a field where trust is the product, a missing decision record is itself the finding. Write the paragraph before anyone asks.")}</p>
      </Extra>
    </MaterialCard>
  );
}
