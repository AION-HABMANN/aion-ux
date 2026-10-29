"use client";

import type { ReactNode } from "react";
import { AimsFig, AttentionFig, ChannelsFig, ConflictFig, DecisionFig, LooksWorksFig, SeeChainFig, SteerChainFig, ToneFig, WeighFig4 } from "@/components/day1/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { FoveaLab } from "@/components/day1/labs";
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
      sources={["normanNielsen", "iso9241210", "norman2013", "tractinsky2000", "rayner1998", "simons1999", "benway1998", "cowan2001", "lindgaard2006", "nielsen2000"]}
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
      <DataTable
        caption={tt("Each word with a real finding: what research shows, and what it means for a screen")}
        head={[tt("Word"), tt("A real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("UX"), tt("ISO 9241-210 counts the responses to the use and to the anticipated use of a product: the experience starts before the first tap, with the store page, the advert and what friends say."), tt("A good booking screen cannot repair a confusing confirmation e-mail: both are the experience.")],
          [tt("UI"), tt("Norman (2013) opens his book with doors: a handle that says “pull” on a door that must be pushed. The surface tells the hand one thing and the product does another."), tt("A button that looks like a label, or a label that looks like a button, is a UI fault even when the function behind it works.")],
          [tt("Perception"), tt("Only a spot of about 2° of the visual field is seen sharply; the eyes jump three to four times a second and take in information only during fixations of about 200 to 300 ms (Rayner 1998)."), tt("What the eye never lands on is seen only as a blur. A screen is perceived in jumps, not as a whole.")],
          [tt("Attention"), tt("46% of observers counting basketball passes did not notice a person in a gorilla suit walking through the video (Simons and Chabris 1999). Web users overlook what looks like an advert, even when it is what they need (Benway and Lane 1998)."), tt("Being on the screen is not being seen. What lies outside the task, or looks like an advert, is often not noticed at all.")],
          [tt("Cognition"), tt("Working memory holds about four chunks at once (Cowan 2001)."), tt("A form that asks people to remember a code from the previous screen, plus a date and a price, asks for most of what they have.")],
          [tt("Emotion"), tt("People rate the visual appeal of a web page after 50 ms, and the rating barely changes with longer viewing (Lindgaard et al. 2006)."), tt("The first feeling comes before the first word is read; it colours everything that follows.")],
          [tt("Mental model"), tt("Users spend most of their time on other sites, so they expect yours to work like those (Nielsen 2000, later called Jakob's Law)."), tt("The logo at the top left leads home, the magnifier means search, the basket sits at the top right: breaking such a model costs every user a moment of doubt.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The definition of user experience follows ISO 9241-210 and Norman and Nielsen; mental models follow Norman (2013). The findings in the second table are real research results; the sources are listed below.`)}</p>
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
      sources={["ittiKoch2001", "corbetta2002", "treisman1980", "rayner1998", "hubel1962", "mishkin1983", "thorpe1996", "wertheimer1923", "cowan2001", "pernice2017"]}
      reasoning={[
        tt("Find the strongest signals on a screen: what moves, glows, is red or much larger than the rest. They are seen first."),
        tt("Ask whether the strongest signal is the task. If it is not, it competes with the task: count it as a distraction."),
        tt("Ask what the person is looking for (their goal) and whether it is easy to find with that goal in mind."),
        tt("A single feature, such as a colour, pops out at once; a combination of features has to be searched. Make the important thing differ in one clear way."),
      ]}
    >
      <ComicButton comic={COMICS_D1.A2} art={ART_D1} />
      <SeeChainFig />
      <DataTable
        caption={tt("From light to meaning: the four steps in the brain, with real numbers")}
        head={[tt("Step"), tt("What happens in the brain"), tt("Real numbers"), tt("What it means for a screen")]}
        rows={[
          [tt("1 · Taking in the stimulus"), tt("Light falls on the retina. Only its centre, the fovea, sees sharp detail and colour; the edge of the field sees movement and contrast, blurred. The eyes jump (saccades) and rest (fixations); information comes in only while they rest."), tt("Sharp vision covers about 2° (a thumbnail at arm's length); three to four fixations a second, each about 200 to 300 ms (Rayner 1998)."), tt("People never see the whole screen sharp at once. Every element they need costs a jump of the eyes.")],
          [tt("2 · Steering attention"), tt("The brain decides where the next jump goes. Bottom-up, a “saliency map” marks what differs most from its surroundings; top-down, the goal marks what fits the search. Both feed the same decision."), tt("In eye-tracking studies with 232 users (2006, confirmed in 2017), people scanned text pages mostly in an F shape: the top lines, a shorter line below, then down the left edge (Pernice 2017)."), tt("The top and the left edge of a page get the jumps; what matters should start there, with the words people are looking for.")],
          [tt("3 · Recognising patterns"), tt("The early visual cortex (V1) splits the image into edges, orientations, colours and movement, in parallel (Hubel and Wiesel 1962). Two pathways follow: a ventral “what” pathway recognises objects, a dorsal “where” pathway locates them (Mishkin et al. 1983). Things close together or alike are grouped into one shape (Wertheimer 1923)."), tt("People can tell whether a photo shown for 20 ms contains an animal; the brain shows the difference about 150 ms after the image appears (Thorpe et al. 1996)."), tt("Familiar shapes, icons and groups are recognised before anything is read. Spacing and alignment say what belongs together before the words do.")],
          [tt("4 · Cognitive processing"), tt("What was recognised is held in working memory, compared with what the person knows and wants, and turned into a decision: tap, read on, or leave."), tt("Working memory holds about four chunks at once (Cowan 2001)."), tt("Every extra thing to hold or compare takes room from the task. Show the information where the decision is made, rather than asking people to remember it.")],
        ]}
      />
      <FoveaLab />
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
        <p>{tt(`${NW()} Bottom-up attention follows Itti and Koch (2001); the two attention systems follow Corbetta and Shulman (2002). The numbers in the table of the four steps are real research results; the ferry board is made up.`)}</p>
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
      sources={["krug2014", "nielsen1994", "sweller1988", "nielsen2000", "iso924111", "wood2002", "pernice2016"]}
      reasoning={[
        tt("Orientation: can the person tell where they are, what they can do here and what comes next?"),
        tt("Count how many elements are equally strong. Many equally strong elements mean there is no visual order: an orientation problem."),
        tt("A variation with no system (three button colours that mean nothing) breaks orientation, because the person cannot learn what a colour means."),
        tt("Every extra signal adds to the cognitive load. Small type on important information and moving elements that must be ignored cost effort that is missing for the task."),
        tt("Put things where people expect them and use the words they use; going against a habit is a cost, not a style."),
      ]}
    >
      <ComicButton comic={COMICS_D1.A3} art={ART_D1} />
      <DataTable
        caption={tt("What people bring to every screen, with real evidence")}
        head={[tt("What they bring"), tt("What it is"), tt("Real evidence"), tt("What it means for a screen")]}
        rows={[
          [tt("Prior knowledge"), tt("What people already know from other products and from the world: the alphabet, the clock, what a magnifier or a basket stands for."), tt("Users spend most of their time on other sites, so they expect yours to work the same way (Nielsen 2000)."), tt("Use the patterns people already know; a new pattern has to be learned, and every learner pays for it once.")],
          [tt("Expectations"), tt("What people believe will happen next, built from prior knowledge and from what the screen has shown so far."), tt("When navigation was hidden behind a menu icon, people on six live websites used it less often and later in the task, on desktop and on phones (Pernice and Budiu 2016)."), tt("People look for what they expect to see. What is hidden, or sits where nobody expects it, is used less, however good it is.")],
          [tt("Context"), tt("The situation of use: who uses it, for which task, with which resources, and in which physical, social and technical surroundings."), tt("ISO 9241-11 defines usability only for specified users, goals and a context of use; the same product can be usable in one context and not in another."), tt("Test in the real situation: at the gate, in a hurry, in sunlight, with one hand, with a weak signal. A quiet office is a different context.")],
          [tt("Habits"), tt("Actions repeated in the same situation until they run without thinking."), tt("In diary studies, about 43% of everyday actions were done almost daily, usually in the same place, often while thinking about something else (Wood et al. 2002)."), tt("Regular users tap where the button used to be. Moving a familiar element costs them a mistake; changing what a familiar gesture does costs more.")],
        ]}
      />
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
        <p>{tt(`${NW()} The orientation questions follow Krug (2014); consistency and minimalist design follow Nielsen (1994); cognitive load follows Sweller (1988). The evidence in the first table is real research; the sources are listed below.`)}</p>
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
      sources={["lindgaard2006", "brehm1966", "fogg2003", "kahneman2011", "foggWeb2003", "kurosu1995", "tractinsky2000"]}
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
      <DataTable
        caption={tt("Liking and trust in numbers: what research shows about the first feeling")}
        head={[tt("Finding"), tt("What was measured"), tt("What it means for a screen")]}
        rows={[
          [tt("50 ms are enough (Lindgaard et al. 2006)"), tt("People rated the visual appeal of web pages shown for 50 ms; the ratings were close to those after a longer look."), tt("Liking forms before reading. A careless or cold look is judged before the content can speak for itself.")],
          [tt("The look carries trust (Fogg et al. 2003)"), tt("2,684 people judged the credibility of 100 live websites; the design look was the factor they mentioned most often, in 46.1% of their comments."), tt("People judge whether they can trust a company from its screens. Layout, type and care are read as signs of seriousness.")],
          [tt("Beautiful seems easier (Kurosu and Kashimura 1995; Tractinsky et al. 2000)"), tt("People rated how easy cash-machine screen layouts would be to use mainly by how attractive they looked, before using them; a later study in Israel confirmed it."), tt("Liking lends a design credit. It buys patience for a small flaw; it does not repair a screen that does not work.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The first impression follows Lindgaard et al. (2006); reactance follows Brehm (1966); how people judge credibility follows Fogg (2003). The numbers in the second table are real research results.`)}</p>
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
      sources={["norman2013", "kahneman2011", "normanNielsen", "fogg2009", "johnson2003", "steffel2019", "dsa2022", "planet49"]}
      reasoning={[
        tt("Start from the effect you want (what should customers perceive, understand, feel and do?), then choose the design means."),
        tt("Prefer one shared effect logic for every channel over isolated improvements to single screens."),
        tt("Look at the changeovers between channels: that is where people are lost when each channel follows its own logic."),
        tt("Steering behaviour is a responsibility: say why an effect is in the customer's interest; if you cannot, it is a risk."),
      ]}
    >
      <ComicButton comic={COMICS_D1.B1} art={ART_D1} />
      <SteerChainFig />
      <DataTable
        caption={tt("How design steers behaviour: three levers with real evidence, and the limits")}
        head={[tt("Lever"), tt("What it is"), tt("Real evidence"), tt("What it means for a strategy")]}
        rows={[
          [tt("Motivation, ability, prompt"), tt("A behaviour happens when the person wants it enough, can do it easily enough, and is prompted at that moment: B = MAP."), tt("The Fogg Behavior Model (Fogg 2009). When a behaviour does not happen, one of the three is missing; most often it is ability or the right moment."), tt("Before adding persuasion, make the action easy and prompt it when people can act, for example a check-in reminder with a one-tap button, sent when check-in opens.")],
          [tt("Defaults"), tt("What happens if the person does nothing. Most people keep the default, because changing it costs effort and looks like a recommendation."), tt("In European countries where people had to opt out, almost everyone counted as a consenting organ donor; where they had to opt in, only a small minority did (Johnson and Goldstein 2003). Actual donations differ far less than these consent figures (Steffel et al. 2019)."), tt("Every default is a decision the company takes for its customers. Set it in their interest, and say so.")],
          [tt("Friction"), tt("Effort placed on purpose: removed from the wanted action, added before an action that is risky or hard to undo."), tt("Ability is the lever that is easiest to design (Fogg 2009): fewer steps, fewer fields, less to read."), tt("Make the main path the easy one; a confirmation step belongs before a deletion, not before a booking.")],
          [tt("The limits"), tt("Steering stops being design and becomes manipulation when it works against the person's interest or takes away an informed choice."), tt("The EU Digital Services Act (Article 25) forbids online platforms to design interfaces that deceive or manipulate users. The Court of Justice of the EU ruled in Planet49 (2019) that a pre-ticked box is not valid consent."), tt("A strategy names the behaviour it wants and why that is in the customer's interest. Pre-ticked extras, countdowns and hidden opt-outs are a legal risk as well as a risk to trust.")],
        ]}
      />
      <ChannelsFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${NW()} The chain from perception to decision restates the plan's “design as the steering of perception, behaviour and decision”. The evidence in the table of levers is real research and real law; the sources are listed below.`)}</p>
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
