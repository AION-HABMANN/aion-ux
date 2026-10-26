"use client";

import type { ReactNode } from "react";
import { ConflictFig, DecisionFig, DensityFig, GuideFig, LogicFig, ScanChainFig, ScanFig, SideFig, SystemChainFig, WeighFig } from "@/components/day2/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D2 } from "@/components/day2/comicScenes";
import { COMICS_D2 } from "@/data/day2/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Brightwater, Ana, Felix, Lea and Omar; never CityDesk, EduFlex or CampusNow, so no
 * task is answered here. Every statement comes from the plan's Wissen cell; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const BW = () => tt("Brightwater, Ana, Felix, Lea and Omar are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("People see a screen before they read it. User-centred design starts from what users come to do and how they see; provider-centred design starts from how the organisation is built.")}
      sources={["iso9241210", "gould1985", "normanNielsen", "rosenfeld2015"]}
      reasoning={[
        tt("Read the screen as someone who has never seen it: what would they come to do, and can they see where to do it?"),
        tt("Look for the organisation in the interface: menu items named after departments, the organisation's own words, a page that opens with what the provider wants to say."),
        tt("A complete interface is not the same as a usable one: everything can be there and still not be found."),
        tt("Judge a UI decision from the user's side, not from the inside logic of the people who built it."),
      ]}
    >
      <ComicButton comic={COMICS_D2.A1} art={ART_D2} />
      <SideFig />
      <DataTable
        caption={tt("Provider-centred and user-centred design")}
        head={[tt("Aspect"), tt("Provider-centred"), tt("User-centred")]}
        rows={[
          [tt("Starts from"), tt("The organisation's structure and wishes."), tt("The users' tasks, words and way of seeing.")],
          [tt("The menu"), tt("One item per department."), tt("One item per task people come for.")],
          [tt("The words"), tt("The organisation's terms."), tt("The words users would type or say.")],
          [tt("Checked by"), tt("Whether everything is there."), tt("Whether users can do their task, tested with them.")],
          [tt("Typical result"), tt("Complete, but people search and call."), tt("The same content, found and used.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} User-centred design follows ISO 9241-210 and the principles of Gould and Lewis (1985): an early focus on users and their tasks, testing with real users, and iteration.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("ISO 9241-210 calls it human-centred design and names four activities that repeat: understand the context of use, specify the users' requirements, produce design solutions, and evaluate them against the requirements. The point is the loop: a design is not finished when it is complete, but when users can do what they came for.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("People scan before they read: the eye jumps to what stands out and what looks relevant, ranks it and skips the rest. What the scan does not catch is, for the user, not there.")}
      sources={["nielsen1997", "pernice2017", "krug2014", "ittiKoch2001"]}
      reasoning={[
        tt("Ask what a first-time user sees in the first second or two: the strongest contrasts, the largest shapes, the top and the left edge."),
        tt("Ask what they would look for, in their own words, and whether those words appear where the scan passes."),
        tt("Treat a long, dense block as invisible in the first pass: what is in its middle is usually missed."),
        tt("Headings, short labelled facts and clear buttons give the scan something to catch."),
      ]}
    >
      <ComicButton comic={COMICS_D2.A2} art={ART_D2} />
      <ScanChainFig />
      <ScanFig />
      <DataTable
        caption={tt("What the scan catches, and what it misses")}
        head={[tt("The scan catches"), tt("The scan misses")]}
        rows={[
          [tt("Strong contrasts, large shapes, movement."), tt("Pale, small or low-contrast elements, such as a grey search box.")],
          [tt("Headings and the first words of lines."), tt("The middle of long, dense paragraphs.")],
          [tt("Words that match the goal (“Book”, “Opening hours”)."), tt("The organisation's own terms the user does not know.")],
          [tt("The top of the page and the left edge."), tt("What is far down the page or only after long scrolling.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Scanning follows Nielsen (1997); the F-shaped pattern on unstructured text follows Pernice (2017); the pull of strong signals follows Itti and Koch (2001).`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("The F-pattern is not a rule to design for; it is a sign that a page gives the eye nothing better. Pernice (2017) describes how headings, bullet points, bold key words and short paragraphs change the pattern: the eye then jumps from anchor to anchor instead of skimming the top and sliding down the left edge.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Contrast makes one thing stand out, grouping shows what belongs together, structure gives the eye a path. Used on purpose, they guide the eye; used against each other, everything competes.")}
      sources={["wagemans2012", "ware2012", "nielsen1994"]}
      reasoning={[
        tt("Find the strongest contrast on the screen and ask whether it is the most important thing. If not, it misleads the eye."),
        tt("Check grouping: things that belong together should be close together or look alike, and unrelated things should not."),
        tt("Check structure: headings, columns and alignment the eye can follow from top to bottom."),
        tt("Count the competing boxes, colours and lines. Many strong ones of equal weight mean there is no visual guidance."),
        tt("Different page types with different structures make people learn every page again: keep one structure per page type."),
      ]}
    >
      <ComicButton comic={COMICS_D2.A3} art={ART_D2} />
      <GuideFig />
      <DataTable
        caption={tt("The means of visual guidance, and a sign that one is missing")}
        head={[tt("Means"), tt("What it does"), tt("A sign it is missing")]}
        rows={[
          [tt("Contrast"), tt("Makes one element stand out from its surroundings."), tt("The main action is as pale as everything else; or everything is loud.")],
          [tt("Grouping"), tt("Shows what belongs together (close together, alike)."), tt("Related items are scattered; unrelated items share a box.")],
          [tt("Structure"), tt("Gives an order the eye can follow: headings, columns, alignment."), tt("Boxes placed anywhere; every page type laid out differently.")],
          [tt("Visual guidance"), tt("All three on purpose: the eye goes first to what matters, then along a path."), tt("Boxes, colours and lines compete; the eye jumps.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Grouping by proximity and similarity follows the Gestalt research summarised by Wagemans et al. (2012); contrast and visual search follow Ware (2012).`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Proximity usually wins over colour: two items close together are read as a group even if their colours differ, and a heading placed nearer the text below it than the text above it is read as belonging to the text below. Much visual guidance is therefore done with spacing alone, before any colour is chosen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Too much at once and everything competes: orientation is lost and the load rises. Too little and people click a lot. An ordered page also looks more trustworthy and of higher quality.")}
      sources={["sweller1988", "kurosu1995", "moshagen2010", "tractinsky2000"]}
      reasoning={[
        tt("Count what the first screen asks the user to take in at once. Every extra element adds to the cognitive load."),
        tt("A crowded page costs orientation; a very sparse one costs clicks. Choose the density for the task the page serves."),
        tt("Visual order changes how good a product seems: a disordered page is judged less trustworthy before it is used."),
        tt("On a phone the same content is longer and narrower, so density problems grow."),
      ]}
    >
      <ComicButton comic={COMICS_D2.A4} art={ART_D2} />
      <DensityFig />
      <DataTable
        caption={tt("Three densities and what they do")}
        head={[tt("Density"), tt("Orientation and load"), tt("How the product seems")]}
        rows={[
          [tt("Crowded"), tt("Everything competes; orientation is lost; the load is high."), tt("Chaotic, less trustworthy.")],
          [tt("Balanced"), tt("The main tasks are seen at once; the rest is close by."), tt("Calm, well run, of higher quality.")],
          [tt("Sparse"), tt("Calm, but the tasks are behind menus; many clicks."), tt("Elegant, but it can seem empty or evasive.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Cognitive load follows Sweller (1988); the aesthetic-usability effect follows Kurosu and Kashimura (1995) and Tractinsky et al. (2000); simplicity as a facet of visual aesthetics follows Moshagen and Thielsch (2010).`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Moshagen and Thielsch (2010) found four facets of how good a website looks: simplicity, diversity, colour and craftsmanship. Simplicity, the order and clarity of the layout, is the one a crowded page loses first. That is why an overloaded portal is judged not only harder to use but also of lower quality, even when its content is complete.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Let people recognise instead of search, and give a few clear signals instead of many loud ones. To put measures in order, weigh each on effect on users, effort, risk and timeliness, with a reason.")}
      sources={["nielsen1994", "krug2014", "gibbons2018"]}
      reasoning={[
        tt("Recognition instead of search: show the options, the words and the next step so people recognise them, instead of making them remember or hunt."),
        tt("Clarity instead of overload: one main action per screen, a visible search, and only the signals that help the task."),
        tt("Rate every measure on the same four questions: effect on users, effort (the time and the people it takes), risk, timeliness (how soon users notice it)."),
        tt("A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer."),
        tt("A measure with a high effect, little effort, low risk and a quick result usually comes first; a larger, strategic one can still be started early."),
      ]}
    >
      <ComicButton comic={COMICS_D2.A5} art={ART_D2} />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Recognition rather than recall and aesthetic and minimalist design are Nielsen's heuristics (1994); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Effort on this course is always time and people: who has to work on a measure and for how long. That keeps the comparison honest when the money is fixed, and it shows where a measure needs a department's time, such as agreeing new names, rather than a developer's.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Organisations tend to build what mirrors their own structure. Good UI decisions start from the users' tasks and words and work back to screens, structures and owners.")}
      sources={["conway1968", "rosenfeld2015", "spencer2009"]}
      reasoning={[
        tt("Look for the organisation chart in the interface: menu items per department, page layouts per team, the organisation's words."),
        tt("Start from the users' tasks: name and order everything by what people come to do."),
        tt("When a problem keeps coming back on the screen, look further down: the structure, the information architecture, who owns them."),
        tt("Discussions about colours and single screens are a sign that nobody owns the structure."),
        tt("Find the users' logic with them, for example with a card sort, instead of guessing it from the inside."),
      ]}
    >
      <ComicButton comic={COMICS_D2.B1} art={ART_D2} />
      <LogicFig />
      <SystemChainFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} That organisations build what mirrors their communication structure follows Conway (1968); labelling in the users' language follows Rosenfeld, Morville and Arango (2015); card sorting follows Spencer (2009).`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A card sort is simple: write the names of the content on cards, ask a few users to group them and name the groups, and compare their groups with your menu. Where users put things together that your menu keeps apart, the structure follows the inside logic.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Much information against simplicity, standardisation against fit, stakeholders against users: the goals pull against each other. Show the few central tasks first and the rest one step deeper.")}
      sources={["nielsen2006", "gibbons2018", "krug2014"]}
      reasoning={[
        tt("Name the conflict as two goals before you choose between them, and say who stands for each."),
        tt("More on the first page is not better findability; past a point it is worse."),
        tt("Progressive disclosure: the few central tasks first, the rest on request, so the first screen stays clear."),
        tt("A standard for every page helps predictability and IT; say where it does not fit and what happens then."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D2.B2} art={ART_D2} />
      <ConflictFig />
      <DataTable
        caption={tt("Three standing conflicts of user-centred design")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Much information against simplicity"), tt("A department that wants everything seen, against users who need relief."), tt("What do most users need first, and what can be one step deeper?")],
          [tt("Standardisation against fit"), tt("IT and predictability, against a team with a special case."), tt("Does the special case really need its own structure?")],
          [tt("Stakeholders against users"), tt("Marketing's activation, a department's visibility, against the users' task."), tt("Whose goal does this element serve, and at what cost to the task?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Progressive disclosure follows Nielsen (2006); the matrix is a reading of the example, not a score.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Progressive disclosure has one condition: the first level must hold what most people need most of the time. If it does not, people dig through the second level for everything and the design is slower than a crowded page. Choosing the first level is therefore the real decision, and it needs evidence about the users' tasks.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("User-centredness lasts only when someone owns it. A decision with partial data says what it decides, what it does not know, when it would reverse it and what it gives up.")}
      sources={["simon1956", "klein2007", "iso9241210"]}
      reasoning={[
        tt("Name who owns the structure and the names across all touchpoints, and who owns only the content."),
        tt("Name who answers for what users experience, not only for a single page."),
        tt("Give conflicts a rule: the users' task decides, shown by evidence; where it does not settle it, a named person does."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
        tt("A wrong priority is not neutral: it shows up as support effort and dissatisfied users. Say when you will check."),
      ]}
    >
      <ComicButton comic={COMICS_D2.B3} art={ART_D2} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of a governance model for user-centred design")}
        head={[tt("Part"), tt("The question"), tt("An example (Brightwater)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the structure, the names and the page patterns; who owns the content?"), tt("Digital services own the structure; each department owns its texts.")],
          [tt("Who answers for it"), tt("Who answers for what users experience across touchpoints?"), tt("The head of digital services.")],
          [tt("How conflicts are settled"), tt("What happens when departments want different things?"), tt("The visitors' task decides, shown by calls, searches and tests; the director settles a tie.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Before committing, imagine it is a year later and the reorganisation has failed, and ask why (Klein 2007). The answers are usually wrong assumptions about users: that they browse when they search, that they know a term they do not, that they use a desktop when they use a phone. Those are the assumptions to check first.")}</p>
      </Extra>
    </MaterialCard>
  );
}
