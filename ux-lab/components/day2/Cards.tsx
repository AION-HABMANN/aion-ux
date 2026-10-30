"use client";

import type { ReactNode } from "react";
import { ConflictFig, DecisionFig, DensityFig, GuideFig, LogicFig, ScanChainFig, ScanFig, SideFig, SystemChainFig, WeighFig } from "@/components/day2/diagrams";
import { ContrastLab } from "@/components/day2/labs";
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
      sources={["iso9241210", "gould1985", "normanNielsen", "rosenfeld2015", "treisman1980", "rayner1998", "thorpe1996", "lindgaard2006", "gds2012"]}
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
      <DataTable
        caption={tt("Seeing a screen: what happens before anyone reads")}
        head={[tt("Step"), tt("What happens"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("Noticing"), tt("Features such as colour, size, orientation and movement are picked out in parallel, before attention is placed."), tt("A single odd item pops out at once; a combination of features has to be searched item by item (Treisman and Gelade 1980)."), tt("One clear difference is enough to be seen first; many differences compete.")],
          [tt("Fixating"), tt("Only a spot of about 2° is sharp; the eyes jump and rest, three to four times a second."), tt("A fixation lasts about 200 to 300 ms (Rayner 1998)."), tt("What is not fixated is seen only as a blur, so the important thing must sit where the eye goes.")],
          [tt("Recognising"), tt("Shapes and groups are matched to what the person knows within a fraction of a second."), tt("People tell whether a photo shown for 20 ms contains an animal; the brain shows the difference after about 150 ms (Thorpe et al. 1996)."), tt("Layout, icons and groups are understood before the first word is read.")],
          [tt("Judging"), tt("A first impression of the whole forms before the page is used."), tt("People rate the appeal of a web page after 50 ms (Lindgaard et al. 2006)."), tt("The look that is seen first sets the expectation for everything that follows.")],
        ]}
      />
      <DataTable
        caption={tt("User-centred design in practice: GOV.UK")}
        head={[tt("What happened"), tt("Real fact"), tt("What it shows")]}
        rows={[
          [tt("The principle"), tt("The design principles of GOV.UK begin with “Start with user needs”: the process starts from real user needs and designs around them, not around the way the official process is at the moment (Government Digital Service 2012)."), tt("A principle is only user-centred if it comes first, before the organisation's own wishes.")],
          [tt("The change"), tt("GOV.UK replaced the two main government websites, Directgov and Business Link, on 17 October 2012. The team analysed every piece of information on both sites and built new pages and tools around the needs it found; 28,500 mappings kept the old addresses working."), tt("User-centred design is not a new coat of paint on the same content: it changes what is there and how it is found.")],
          [tt("The result"), tt("The Government Digital Service reported 61% task success on GOV.UK against 46% on Business Link."), tt("These figures come from the Government Digital Service itself and are not an independent test: say who measured a result.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} User-centred design follows ISO 9241-210 and the principles of Gould and Lewis (1985): an early focus on users and their tasks, testing with real users, and iteration. The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
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
      sources={["nielsen1997", "pernice2017", "krug2014", "ittiKoch2001", "nielsen2008"]}
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
      <DataTable
        caption={tt("Scanning in numbers: what people read, and what they skip")}
        head={[tt("Step"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("Scan"), tt("In a test of web pages, 79% of the users always scanned a new page and only 16% read it word by word (Nielsen and Morkes 1997)."), tt("Set the page for a scan: clear headings, short paragraphs, one idea each.")],
          [tt("Select"), tt("On the average page view of 593 words, users could read at most 28% of the words if they spent all their time reading, and about 20% is more realistic. Reading time rose by only 4.4 seconds for each added 100 words (Nielsen 2008; data from 2005; an upper bound from time on page, not an eye-tracking result)."), tt("Every extra paragraph is read by fewer people: put the important thing first and cut the rest.")],
          [tt("Prioritise"), tt("Users read half of the information on an average visit only on pages of 111 words or fewer (Nielsen 2008)."), tt("If everything on the page must be read, there is too much on the page.")],
          [tt("Follow a pattern"), tt("In eye-tracking of unstructured text pages with 232 users, the eyes moved in an F-shape: across the top, across a little lower, then down the left edge (Pernice 2017)."), tt("The pattern shows what a page gives the eye; headings and bold key words change it.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Scanning follows Nielsen (1997); the F-shaped pattern on unstructured text follows Pernice (2017); the pull of strong signals follows Itti and Koch (2001). The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
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
      sources={["wagemans2012", "ware2012", "elliot2014", "wcag22", "nielsen1994", "wong2011", "gnambs2020", "wertheimer1923", "pernice2017", "ittiKoch2001"]}
      reasoning={[
        tt("Find the strongest contrast on the screen and ask whether it is the most important thing. If not, it misleads the eye."),
        tt("Check grouping: things that belong together should be close together or look alike, and unrelated things should not."),
        tt("Check structure: headings, columns and alignment the eye can follow from top to bottom."),
        tt("Count the competing boxes, colours and lines. Many strong ones of equal weight mean there is no visual guidance."),
        tt("Different page types with different structures make people learn every page again: keep one structure per page type."),
        tt("Use colour strategically: one accent for the main action, a warning colour only for real warnings, and never colour alone to carry a meaning."),
      ]}
    >
      <ComicButton comic={COMICS_D2.A3} art={ART_D2} />
      <GuideFig />
      <ContrastLab />
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
      <DataTable
        caption={tt("Colour used strategically, and colour used against the user")}
        head={[tt("Strategic use"), tt("What it does"), tt("Used against the user")]}
        rows={[
          [tt("One accent colour for the main action"), tt("The eye finds the action first."), tt("Three button colours with no meaning: the eye compares instead of acting.")],
          [tt("A warning colour only for real warnings"), tt("Red keeps its meaning, so people react when it matters."), tt("Red on neutral information: people learn to ignore it, or feel unsafe.")],
          [tt("Colour plus a word or an icon"), tt("Everyone gets the meaning, also people who see colours differently."), tt("Colour alone: “the red fields are required”.")],
          [tt("Colours that group"), tt("Things of one kind share a colour, so the eye reads groups."), tt("A different colour for every box: nothing belongs together.")],
        ]}
      />
      <DataTable
        caption={tt("Rules and numbers behind the means of visual guidance")}
        head={[tt("Means"), tt("Real rule or finding"), tt("What to check")]}
        rows={[
          [tt("Contrast"), tt("WCAG 2.2 asks for a contrast ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text (success criterion 1.4.3), and 3 to 1 for the parts of controls and graphics people need to see (1.4.11)."), tt("Measure the ratio of the main action and its label; do not judge it by how it looks on your own screen.")],
          [tt("Colour"), tt("Colour must not be the only way to give information (1.4.1). About 1 in 12 men and 1 in 200 women have a colour vision deficiency, roughly 8% and 0.5% (Wong 2011)."), tt("Add a word, an icon or a position to every colour that carries meaning.")],
          [tt("Grouping"), tt("Things that are close, alike or inside one boundary are read as a group; the principles come from Gestalt psychology (Wertheimer 1923; summary in Wagemans et al. 2012)."), tt("Make the space between related items smaller than the space between groups.")],
          [tt("Structure"), tt("Alignment, headings and columns give the eye a path; eye-tracking of text pages shows a pull to the top and to the left edge (Pernice 2017)."), tt("Put the first thing to see at the top left of the area it belongs to.")],
          [tt("Guidance of the gaze"), tt("Attention goes first to what differs most from its surroundings in colour, contrast, orientation or motion (Itti and Koch 2001; Ware 2012)."), tt("Give exactly one thing the strongest difference on the screen.")],
          [tt("A caution on colour meaning"), tt("Claims that one colour changes how people perform have not held up: a 2020 meta-analysis found no evidential value for an effect of red on intellectual performance after correcting for publication bias (Gnambs 2020)."), tt("Use colour for contrast, grouping and a few fixed meanings; do not rely on a claim that a colour makes people feel or act in one way.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Grouping by proximity and similarity follows the Gestalt research summarised by Wagemans et al. (2012); contrast and visual search follow Ware (2012); the meaning of colour follows Elliot and Maier (2014); not using colour alone follows WCAG 2.2, criterion 1.4.1. The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
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
      sources={["sweller1988", "kurosu1995", "moshagen2010", "tractinsky2000", "iyengar2000", "cowan2001", "sillence2004"]}
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
      <DataTable
        caption={tt("Density, choice and trust: real findings")}
        head={[tt("Finding"), tt("What was measured"), tt("What it means for a screen")]}
        rows={[
          [tt("Choice overload (Iyengar and Lepper 2000)"), tt("At a shop booth with 24 jams, about 60% of the passers-by stopped to taste and 3% of those who stopped bought a jar; with 6 jams, about 40% stopped and 30% of them bought."), tt("More to choose from drew more interest and fewer decisions. The study rests on few purchases and later reviews find the effect inconsistent: treat it as a warning, not as a law.")],
          [tt("Working memory (Cowan 2001)"), tt("People hold about four chunks in mind at once."), tt("A screen that asks people to compare more than a few things at once asks for more than they have.")],
          [tt("Design appeal and rejection (Sillence et al. 2004)"), tt("In a four-week study, fifteen women searching for health advice rejected sites because of their design appeal, and chose sites for the credibility of the information and its personalisation."), tt("A cluttered or careless page is rejected before its content is judged: order earns the chance to be read.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Cognitive load follows Sweller (1988); the aesthetic-usability effect follows Kurosu and Kashimura (1995) and Tractinsky et al. (2000); simplicity as a facet of visual aesthetics follows Moshagen and Thielsch (2010). The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
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
      sources={["nielsen1994", "krug2014", "gibbons2018", "standing1973", "gds2012"]}
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
      <DataTable
        caption={tt("Recognition and clarity, with evidence")}
        head={[tt("Principle"), tt("Real finding"), tt("What it looks like on a screen")]}
        rows={[
          [tt("Recognition rather than recall"), tt("Nielsen's sixth heuristic: make elements, actions and options visible so users do not have to remember them (Nielsen 1994)."), tt("A menu that lists the options; a form that shows the date format; the last search offered again.")],
          [tt("Recognition memory is large"), tt("In Standing's experiments (1973) people recognised pictures they had seen once among thousands, with no sign of saturation after 10,000 pictures."), tt("Show people the thing, with its picture and its words; do not ask them to name it from memory.")],
          [tt("Clarity rather than overload"), tt("The design principles of GOV.UK list “Do less” second, directly after “Start with user needs” (Government Digital Service 2012)."), tt("Remove a signal before adding one: ask what the person can do without.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Recognition rather than recall and aesthetic and minimalist design are Nielsen's heuristics (1994); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
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
      sources={["conway1968", "rosenfeld2015", "spencer2009", "nagappan2008", "gds2012"]}
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
      <DataTable
        caption={tt("Inside logic against user logic: the evidence")}
        head={[tt("Evidence"), tt("What it shows"), tt("What it means for a decision")]}
        rows={[
          [tt("Conway 1968"), tt("Organisations that design systems produce designs that are copies of their own communication structure."), tt("A menu with one item per department is not a coincidence: it is the organisation chart on the screen.")],
          [tt("Nagappan, Murphy and Basili 2008"), tt("On Windows Vista (3,404 binaries, more than 50 million lines of code), measures of the organisation behind the code predicted failure-proneness better than measures of the code itself."), tt("How an organisation is built shows in the product, down to its quality.")],
          [tt("GOV.UK 2012"), tt("The team did not copy the content of Directgov and Business Link; it started from user needs and built new pages and tools (Government Digital Service 2012)."), tt("To leave the inside logic, start from what the user comes to do and work back to the structure and the owners.")],
          [tt("Card sorting (Spencer 2009)"), tt("Users group the content in their own words, and the groups are compared with the organisation's structure."), tt("The gap between the two groupings is the inside logic, made visible.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} That organisations build what mirrors their communication structure follows Conway (1968); labelling in the users' language follows Rosenfeld, Morville and Arango (2015); card sorting follows Spencer (2009). The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
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
      sources={["nielsen2006", "gibbons2018", "krug2014", "nielsen2008", "iyengar2000", "gds2012"]}
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
      <DataTable
        caption={tt("Conflicts weighed with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Much information against simplicity"), tt("Users could read at most 28% of the words of an average page view (Nielsen 2008); a display of 24 jams led to fewer purchases than a display of 6 (Iyengar and Lepper 2000)."), tt("Show the few central tasks first and the rest one step deeper (Nielsen 2006); keep the detail available.")],
          [tt("Stakeholders against users"), tt("For GOV.UK, the team analysed all the information on both old sites against user needs rather than carrying over each department's wish list (Government Digital Service 2012)."), tt("Put the user needs, found with users, on the table next to each department's wish.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Progressive disclosure follows Nielsen (2006); the matrix is a reading of the example, not a score. The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
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
      sources={["simon1956", "klein2007", "iso9241210", "gdsStandard", "gds2012"]}
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
      <DataTable
        caption={tt("Owning user-centredness: a real example of governance")}
        head={[tt("Part"), tt("Real example"), tt("What it means")]}
        rows={[
          [tt("A standard to meet"), tt("The GOV.UK Service Standard has 14 points since July 2019 (18 before); point 1 is to understand users and their needs."), tt("Write down what every service must meet, and start with the users.")],
          [tt("An assessment"), tt("Services are assessed against the standard by a panel; a published assessment report says whether point 1 was met and what evidence of users the panel saw."), tt("Decide who checks, and on what evidence, before the work is finished.")],
          [tt("A named order"), tt("“Start with user needs” stands first among the GOV.UK design principles."), tt("The order of the principles shows what wins when they conflict.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${BW()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results and real cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Before committing, imagine it is a year later and the reorganisation has failed, and ask why (Klein 2007). The answers are usually wrong assumptions about users: that they browse when they search, that they know a term they do not, that they use a desktop when they use a phone. Those are the assumptions to check first.")}</p>
      </Extra>
    </MaterialCard>
  );
}
