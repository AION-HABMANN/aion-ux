"use client";

import type { ReactNode } from "react";
import { BusinessChainFig, ConflictFig, DecisionFig, FittsFig, HickFig, LawsFig, MillerFig, StandardsFig, WeighFig } from "@/components/day5/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D5 } from "@/components/day5/comicScenes";
import { COMICS_D5 } from "@/data/day5/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Ticketo, Leon, Mara, Priya and Tobias; never BankDirect, AdminFlow or MoveEasy, so no
 * task is answered here. Every statement comes from the plan's Wissen cell; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const TK = () => tt("Ticketo, Leon, Mara, Priya and Tobias are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("The time to hit a target grows with its distance and shrinks with its size (Fitts's law). Make main actions large, close to the hand and spaced apart; on a phone, where the thumb already is.")}
      sources={["fitts1954", "mackenzie1992", "parhi2006", "hoober2013", "wcag22"]}
      reasoning={[
        tt("Find the most important action on each screen and check its size: can it be hit without aiming?"),
        tt("Check its distance: is it near where the pointer or the thumb already is, or in a far corner?"),
        tt("Check the space around it: targets that touch are confused, above all similar ones."),
        tt("On a phone held in one hand, the thumb reaches the lower middle easily and the top corners badly."),
        tt("The click or touch area can be larger than the visible label; make it so for small labels."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A1} art={ART_D5} />
      <FittsFig />
      <DataTable
        caption={tt("Fitts's law on screens")}
        head={[tt("Lever"), tt("What it does"), tt("A sign it is missing")]}
        rows={[
          [tt("Size"), tt("A larger target is hit faster and missed less."), tt("Small links for the main task; tiny phone buttons.")],
          [tt("Distance and position"), tt("A target near the hand is reached faster."), tt("The main action in a far top corner.")],
          [tt("Spacing"), tt("Space between targets prevents mix-ups."), tt("Similar buttons that touch.")],
          [tt("Touch area"), tt("The area that reacts can be larger than the label."), tt("Only the word itself reacts to a tap.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} Fitts's law follows Fitts (1954) and, for screens, MacKenzie (1992); small targets under the thumb follow Parhi, Karlson and Bederson (2006); how people hold phones follows Hoober (2013); WCAG 2.2 sets a minimum target size in criterion 2.5.8.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("WCAG 2.2 criterion 2.5.8 asks that a pointer target is at least 24 by 24 CSS pixels, or has enough space around it; the older enhanced criterion 2.5.5 asks for 44 by 44. Neither is a design goal: they are a floor below which people with less precise hands, or anyone on a moving bus, start to fail.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("The more equally weighted options, the longer the choice (Hick's law). Fewer options at once, a clear priority and staged choices cut decision effort; too many stages become a hurdle.")}
      sources={["hick1952", "hyman1953", "iyengar2000", "nielsen2006"]}
      reasoning={[
        tt("Count the equal options at each decision point: menu items, tiles, buttons, list entries."),
        tt("Show what most people need and make the likely choice stand out."),
        tt("Split a large choice into a few small stages with few options each."),
        tt("Count the stages too: when a short choice needs many screens, reduction has become a hurdle."),
        tt("Long lists of similar options are a decision problem as well as a reach problem."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A2} art={ART_D5} />
      <HickFig />
      <DataTable
        caption={tt("Three ways to lower decision effort, and their limit")}
        head={[tt("Way"), tt("What it does"), tt("Its limit")]}
        rows={[
          [tt("Fewer options at once"), tt("Less to compare."), tt("Rare needs must stay findable.")],
          [tt("A clear priority"), tt("The likely choice stands out."), tt("A wrong priority misleads.")],
          [tt("Staged choices"), tt("A few options per step."), tt("Each stage is a step; too many steps slow people down.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} Hick's law follows Hick (1952) and Hyman (1953); many options making people choose less follows Iyengar and Lepper (2000); showing options in stages follows Nielsen (2006) on progressive disclosure.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Hick's law grows with the logarithm of the number of options, not in a straight line: going from two options to four costs about as much as going from four to eight. That is why the first few extra options hurt most, and why a short, well-ordered list often beats a cleverer structure with more steps.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Short-term memory holds only a few items (Miller's rule; later research says nearer four). Chunking and structure make information easier to take in and remember; showing it where needed avoids remembering at all.")}
      sources={["miller1956", "cowan2001", "gobet2001", "nielsen1994"]}
      reasoning={[
        tt("List what people must take in or keep in mind at each step: codes, numbers, tariffs, conditions, earlier choices."),
        tt("Chunk long strings into blocks of three or four, and group related details in one place."),
        tt("Show information where it is needed, so it does not have to be carried from one screen to the next."),
        tt("Forms that show everything at once hide the few fields that matter: structure them into small groups."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A3} art={ART_D5} />
      <MillerFig />
      <DataTable
        caption={tt("Chunking and structure")}
        head={[tt("Technique"), tt("What it does"), tt("An example")]}
        rows={[
          [tt("Chunk a string"), tt("A long string becomes a few units."), tt("A booking code in three blocks of four.")],
          [tt("Group related details"), tt("What belongs together is read together."), tt("Time, hall and seats in one box.")],
          [tt("Show where needed"), tt("Nothing has to be carried across screens."), tt("The conditions next to the ticket being chosen.")],
          [tt("Split a long form"), tt("A few fields per group, each with a heading."), tt("Who travels · When · How to pay.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} The limits of short-term memory follow Miller (1956) and Cowan (2001); chunking follows Gobet et al. (2001); recognition rather than recall is Nielsen's heuristic (1994).`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Chunks are meaningful units, not just shorter pieces: an experienced traveller sees a train number and a platform as one chunk, a newcomer as several. That is why grouping by meaning (all the details of one ticket together) helps more than splitting text at a fixed length.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Fitts is the hand, Hick the decision, Miller the memory. On navigation, interaction and interface elements they add up: each adds reaction time, raises the error probability and the cognitive load.")}
      sources={["yablonski2020", "fitts1954", "hick1952", "miller1956", "sweller1988"]}
      reasoning={[
        tt("For each hurdle, ask which of the three it is about: reaching a target, choosing between options, or holding information."),
        tt("Many hurdles touch two laws at once, such as a long list of small, similar items (Fitts and Hick)."),
        tt("Small click targets, overloaded menus and too much information at once weaken use because each law adds time and errors."),
        tt("Reaction time, error probability and cognitive load rise together; lowering one law's cost lowers all three a little."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A4} art={ART_D5} />
      <LawsFig />
      <DataTable
        caption={tt("The three laws side by side")}
        head={[tt("Law"), tt("What it is about"), tt("Typical hurdle"), tt("Typical fix")]}
        rows={[
          [tt("Fitts's law"), tt("The hand: reaching and hitting a target."), tt("Small, far, crowded targets."), tt("Large, close, spaced targets.")],
          [tt("Hick's law"), tt("The decision: choosing between options."), tt("Many equal options."), tt("Fewer, prioritised, staged options.")],
          [tt("Miller's rule"), tt("The memory: holding information."), tt("Codes and conditions to remember."), tt("Chunked, grouped, shown where needed.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} The three laws together follow Yablonski (2020); cognitive load follows Sweller (1988).`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("The laws also trade against each other. Making every target large (Fitts) on a small screen leaves room for fewer options (Hick), which can push some into a second step that has to be remembered (Miller). Good interaction design looks for the arrangement that keeps all three costs low for the most frequent tasks.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Good UX reduces searching, operating errors and decision stress; the laws give efficient guidance a basis beyond looks. Weigh measures on effect on users, feasibility, risk and time pressure, with a reason.")}
      sources={["yablonski2020", "gibbons2018", "wcag22"]}
      reasoning={[
        tt("Say for each measure which of the three it reduces: searching, operating errors or decision stress."),
        tt("Prefer measures that change a shared element (a button, a menu, a code layout) used on many screens."),
        tt("Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure."),
        tt("A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer."),
        tt("Judge a design by how fast and safely people finish, not only by how it looks."),
      ]}
    >
      <ComicButton comic={COMICS_D5.A5} art={ART_D5} />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} The laws as practical tools follow Yablonski (2020); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("An aesthetic redesign can make all three laws worse at once: thinner buttons, more items in a sleek menu, information spread over a cleaner layout. A quick check before any visual change: is every main target as large and close as before, are there as few equal options, and is nothing new to remember?")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("An interaction decision repeats on every screen and every visit; it is an architecture of effect, not a detail. At senior level the laws become interaction standards every team follows.")}
      sources={["yablonski2020", "frost2016", "wcag22"]}
      reasoning={[
        tt("Look for the same interaction problem on several screens: it is a missing standard, not a missing fix."),
        tt("Write the laws down as standards: a minimum target size and position, a limit on equal options, a rule for chunking."),
        tt("Apply the standards to new functions from the start, so they do not undo earlier fixes."),
        tt("Follow the chain from an element to the business: support contacts, abandoned purchases, customers who leave."),
      ]}
    >
      <ComicButton comic={COMICS_D5.B1} art={ART_D5} />
      <StandardsFig />
      <BusinessChainFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} Building interfaces from shared rules and components follows Frost (2016); the target size floor follows WCAG 2.2.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("Interaction standards work best when they live in the shared components, not only in a document: a button component that cannot be smaller than the minimum, a menu that warns beyond a number of items. Then a team that builds a new screen gets the standard without having to remember it, which is Miller's rule applied to the organisation.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Feature richness against speed, simplicity against brand, the ideal against feasibility. Reduction is not always the answer: give the main actions size and priority, keep the rest reachable.")}
      sources={["iyengar2000", "gibbons2018", "nielsen2006"]}
      reasoning={[
        tt("Name the conflict as two goals and say who stands for each: a department, marketing, IT, frequent or occasional users."),
        tt("“Everything at a glance” and “one button, many steps” are both slow; look for main actions first, the rest one step away."),
        tt("A minimal brand look must not shrink the targets below what hands can hit."),
        tt("Under time and feasibility limits, prefer the change that helps most users now over the ideal later."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D5.B2} art={ART_D5} />
      <ConflictFig />
      <DataTable
        caption={tt("Standing conflicts of efficient interaction")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Feature richness against speed"), tt("A department or marketing, against users in a hurry."), tt("Which actions do most users need most often?")],
          [tt("Reduction against steps"), tt("A calm screen, against reaching the action quickly."), tt("How many steps does the frequent task take now?")],
          [tt("A minimal brand look against reachability"), tt("The brand team, against users on phones."), tt("Are the main targets still large and close enough?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} Many options making people choose less follows Iyengar and Lepper (2000); progressive disclosure follows Nielsen (2006); the matrix is a reading of the example, not a score.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("A useful compromise for “everything visible”: keep every function one tap from the first screen, behind a clearly labelled entry, and give the first screen only to the few actions most users take. The department's functions are still reachable, and the users' main tasks are still fast.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Interaction standards hold only with an owner and a rule for exceptions. A decision with incomplete data says what it decides, what it does not know, when it would reverse it and what it gives up.")}
      sources={["simon1956", "klein2007", "wcag22"]}
      reasoning={[
        tt("Name who owns the interaction standards across all interfaces, and who owns the content."),
        tt("Give exceptions a rule: how often the function is needed and what the error and support data say."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
        tt("A small interaction problem becomes a strategic business problem when it repeats on every visit; say when you will check."),
      ]}
    >
      <ComicButton comic={COMICS_D5.B3} art={ART_D5} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of a governance model for interaction standards")}
        head={[tt("Part"), tt("The question"), tt("An example (Ticketo)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the standards; who owns the content?"), tt("The head of UX owns sizes, limits and chunking; teams own their content.")],
          [tt("How an exception is decided"), tt("What happens when a team wants more visible options?"), tt("It shows how often they are used and what the error data says.")],
          [tt("How a standard changes"), tt("When may a standard itself change?"), tt("Only with evidence from users, errors or support.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TK()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("When no one records mis-taps, the support contacts are the best available sign: “I booked the wrong ticket”, “I cancelled by mistake”. Counting them before and after a change is a simple way to check a decision made under uncertainty, without waiting for perfect data.")}</p>
      </Extra>
    </MaterialCard>
  );
}
