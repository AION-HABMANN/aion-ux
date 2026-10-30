"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, DecisionFig, ElementsFig, MeaningChainFig, NarrativeLayersFig, OverloadFig, StoryFig, TransitionFig, WeighFig, WeightFig } from "@/components/day8/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D8 } from "@/components/day8/comicScenes";
import { COMICS_D8 } from "@/data/day8/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Lantern Kitchens, Iris, Pavel, June and Arne; never StartSmart, FutureSkills or
 * GreenHome, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const LK = () => tt("Lantern Kitchens, Iris, Pavel, June and Arne are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("People make sense of what they do as a story: where they start, where they are going, how far they have come. A process that shows only functions still gets read as a journey, and without a story it feels lost or endless.")}
      sources={["bruner1991", "quesenbery2010", "lupton2017", "green2000", "kivetz2006", "nunes2006"]}
      reasoning={[
        tt("Look at the first screen and ask: does it show where the journey leads, or only what the product can do?"),
        tt("Ask whether people can tell, at any point, where they are and how much is left."),
        tt("Ask whether the end of the journey feels like an end."),
        tt("Write an effect as a hypothesis: “for users this could mean that …”."),
        tt("A process that works but tells no story is still experienced as a journey: a poor one."),
      ]}
    >
      <ComicButton comic={COMICS_D8.A1} art={ART_D8} />
      <StoryFig />
      <DataTable
        caption={tt("Processing a process as a story")}
        head={[tt("People look for"), tt("What they ask"), tt("If it is missing")]}
        rows={[
          [tt("A beginning"), tt("Where do I start, and is this for me?"), tt("They browse and leave.")],
          [tt("A goal"), tt("What will I have at the end?"), tt("No reason to begin or to go on.")],
          [tt("A way"), tt("How far have I come, how much is left?"), tt("It feels endless; they give up halfway.")],
          [tt("An end"), tt("Am I done, and was it worth it?"), tt("They are unsure it worked.")],
        ]}
      />
      <DataTable
        caption={tt("Why people experience a process as a story: evidence")}
        head={[tt("Idea"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("Narrative as a way of thinking"), tt("Jerome Bruner described narrative as one of two basic ways in which people order experience, next to logical argument (Bruner 1991)."), tt("People make sense of a sequence of steps as “what happens to me”, whether or not the designer meant a story.")],
          [tt("Absorption"), tt("Green and Brock described transportation: absorption into a story through imagery, feeling and focused attention, which makes people more open to the story's view (Green and Brock 2000)."), tt("A well-told step holds attention; the same effect can carry a message that has not been checked, so tell only what is true.")],
          [tt("Progress pulls"), tt("In a real café reward programme, customers bought coffee more often the closer they were to a free coffee, and customers who got a card with two stamps already filled in completed it faster (Kivetz et al. 2006)."), tt("Show where the person is on the way, because the felt distance to the goal drives effort.")],
          [tt("A head start"), tt("At a car wash, customers who got a card that needed ten stamps with two filled in were compared with customers who got a card that needed eight (Nunes and Drèze 2006; the study is often quoted for its effect on completion)."), tt("A visible head start makes a long path feel begun.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} Narrative as a way of making sense of experience follows Bruner (1991); storytelling for user experience follows Quesenbery and Brooks (2010); design as a sequence with a beginning, tension and resolution follows Lupton (2017). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Bruner (1991) argued that people do not store experience as a list of facts but as stories with actors, goals and turns. In a digital product the actor is the user, the goal is what they came to do, and the turns are the steps, the obstacles and the help. A product that does not offer this structure leaves people to build it themselves, and many give up before they do.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Seven elements guide a journey: starting situation, goal, relevance, obstacle, support, progress and resolution. Without a visible goal and progress it feels endless; without a resolution it ends without achievement.")}
      sources={["quesenbery2010", "freytag1863", "kivetz2006", "govukQuestion"]}
      reasoning={[
        tt("Starting situation: does the journey begin where the user is, in their words?"),
        tt("Goal and relevance: does it say what they will have and why it matters for them?"),
        tt("Obstacle and support: does it say honestly what is hard and offer help at that point?"),
        tt("Progress: can they see how far they have come?"),
        tt("Resolution: does the end show that the goal is reached?"),
      ]}
    >
      <ComicButton comic={COMICS_D8.A2} art={ART_D8} />
      <ElementsFig />
      <DataTable
        caption={tt("The seven elements of narrative guidance")}
        head={[tt("Element"), tt("In a story"), tt("In a digital journey")]}
        rows={[
          [tt("Starting situation"), tt("Where the hero is."), tt("“You have a room and an idea.”")],
          [tt("Goal"), tt("What the hero wants."), tt("“At the end you have a plan and an offer.”")],
          [tt("Relevance"), tt("Why it matters."), tt("“So your cabinets fit to the centimetre.”")],
          [tt("Obstacle"), tt("What stands in the way."), tt("“Measuring is the hardest part.”")],
          [tt("Support"), tt("Who helps."), tt("A short guide right at that step.")],
          [tt("Progress"), tt("How far the hero has come."), tt("A path of stages with “you are here”.")],
          [tt("Resolution"), tt("The goal reached."), tt("The plan shown, the next step named.")],
        ]}
      />
      <DataTable
        caption={tt("The elements of narrative guidance: sources and use")}
        head={[tt("Source"), tt("Real finding or example"), tt("What it means for a screen")]}
        rows={[
          [tt("Dramatic structure"), tt("Gustav Freytag described a drama as a pyramid of exposition, rising action, climax, falling action and resolution (Freytag 1863)."), tt("Start with the situation, build to the decision, and end with a clear resolution.")],
          [tt("Stories in UX"), tt("Quesenbery and Brooks describe how stories help teams and users with context, goals and obstacles (Quesenbery and Brooks 2010)."), tt("Write the starting situation and the goal in the person's words, not the company's.")],
          [tt("One step at a time"), tt("The GOV.UK Design System asks, in its question pages pattern, to start with one question per page, so users understand what they are asked and can focus on it (GOV.UK Design System)."), tt("A sequence gives a path with an end: each page is a step.")],
          [tt("Progress"), tt("Customers bought more often as they neared a reward (Kivetz et al. 2006)."), tt("Show a path of stages with “you are here”.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} The dramatic arc follows Freytag (1863); people speeding up as they see a goal come closer follows Kivetz et al. (2006). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Kivetz et al. (2006) showed the goal-gradient effect: people work faster the closer they see themselves to a goal, and even an illusion of progress (a card that starts with two stamps already filled) makes them finish more often. In a journey this is why visible progress matters most in the middle, where people are furthest from both the start and the end and most likely to stop.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Telling a story is not guiding with one. Dramaturgy in a journey is tension, expectation, sequence, transition, confirmation and emotional context, and it lives in small places: the first screen, the line between steps, the message after a step.")}
      sources={["lupton2017", "freytag1863", "nielsen1994", "govukForms", "gdsOneThing2015", "govukQuestion"]}
      reasoning={[
        tt("Tension: does the user know what is at stake for them?"),
        tt("Expectation: do they know what comes next, and roughly how much?"),
        tt("Sequence: do the steps follow the user's logic, or the order of the database?"),
        tt("Transition: does each step say what was done and lead to the next?"),
        tt("Confirmation and emotional context: is a finished step acknowledged and framed by what it means for them?"),
      ]}
    >
      <ComicButton comic={COMICS_D8.A3} art={ART_D8} />
      <TransitionFig />
      <DataTable
        caption={tt("Narrative communication and narratively structured guidance")}
        head={[tt("Aspect"), tt("Narrative communication"), tt("Narratively structured guidance")]}
        rows={[
          [tt("What it is"), tt("A story about the product or brand."), tt("A journey built like a story.")],
          [tt("Where it lives"), tt("Films, campaigns, the website."), tt("The first screen, transitions, confirmations.")],
          [tt("Whose story"), tt("The company's."), tt("The user's.")],
          [tt("Its cost"), tt("Attention and time before the task."), tt("A line or two inside the task.")],
        ]}
      />
      <DataTable
        caption={tt("Narrative communication or narrative guidance: a real pattern")}
        head={[tt("Topic"), tt("Real finding or example"), tt("What it means for a screen")]}
        rows={[
          [tt("A real pattern of guidance"), tt("The GOV.UK Service Manual advises to split a form across several pages with each page containing just one thing (GOV.UK Service Manual, Form structure)."), tt("Structure the journey by what the person decides now, page by page.")],
          [tt("What it buys"), tt("A 2015 GDS design note found the one-question-per-page layout better at handling errors, branches, loops and saving progress than the alternatives it compared (Government Digital Service 2015)."), tt("The sequence is not only dramaturgy: it carries the logic of the process.")],
          [tt("What it costs"), tt("The pattern lengthens a form, so a service should only ask for what it needs (Scottish Government Design System; GOV.UK Design System)."), tt("Count the pages: each transition needs a reason.")],
          [tt("System status"), tt("Keep users informed about what is going on, through appropriate feedback within a reasonable time (Nielsen 1994)."), tt("Each transition says where you are and what comes next.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} The dramatic arc follows Freytag (1863) and its use in design follows Lupton (2017); visibility of system status is Nielsen's heuristic (1994). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("A good transition has three parts and fits in one line: a confirmation of what was done (“Your room is in.”), the expectation of what comes next (“Next: your style.”) and a word on its size or difficulty (“A few choices, all changeable.”). It is the cheapest piece of dramaturgy there is, and the one most often missing.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("A clear story raises orientation, motivation and memorability, and makes people feel the product is for them. Too much staging, too little clarity, more text and longer paths turn it into overload that costs time and trust.")}
      sources={["green2000", "kivetz2006", "krug2014", "kahneman1993", "nielsen1997"]}
      reasoning={[
        tt("Check that every narrative element serves the task: does it orient, motivate or give context?"),
        tt("Count what the story adds: screens, words, seconds. Is it worth it for these users?"),
        tt("Prefer a goal, a path and short transitions to scenes and long texts."),
        tt("Make the story about the user's goal, not about the brand."),
        tt("If the steps are harder to find than before, the story has become overload."),
      ]}
    >
      <ComicButton comic={COMICS_D8.A4} art={ART_D8} />
      <OverloadFig />
      <DataTable
        caption={tt("What a clear story does, and how it turns into overload")}
        head={[tt("A clear story"), tt("What it raises"), tt("Overload instead")]}
        rows={[
          [tt("A goal and a path"), tt("Orientation: I know where I am."), tt("A story that hides the steps.")],
          [tt("Visible progress"), tt("Motivation: I am getting closer."), tt("Long scenes between the steps.")],
          [tt("A real ending"), tt("Memorability: I remember it worked."), tt("A finale that delays the result.")],
          [tt("The user's goal"), tt("Relevance and bond: this is for me."), tt("The brand's story instead of mine.")],
        ]}
      />
      <DataTable
        caption={tt("Orientation, motivation, memory and overload: findings")}
        head={[tt("Effect"), tt("Real finding"), tt("What it means for a screen")]}
        rows={[
          [tt("Orientation"), tt("A visitor should be able to tell at once where they are and what they can do (Krug 2014)."), tt("Every step names its place in the journey.")],
          [tt("Motivation"), tt("Effort rises as the goal gets closer (Kivetz et al. 2006)."), tt("Show progress early, and show how much is left.")],
          [tt("Memory"), tt("The end of an episode weighs more than its length in the memory of it (Kahneman et al. 1993, as reported)."), tt("Give the journey a real ending: the result, and the next step.")],
          [tt("Overload"), tt("79% of users always scanned a new page (Nielsen and Morkes 1997)."), tt("A scene that must be read before the task starts will be skipped; keep the story to a line or two inside the task.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} Being absorbed in a story and moved by it follows Green and Brock (2000); the goal-gradient effect follows Kivetz et al. (2006); not making people think follows Krug (2014). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Green and Brock (2000) found that stories move people when they are absorbed in them, and that absorption depends on the story fitting the reader. In a product, users absorbed in a staged story about someone else's kitchen are not absorbed in their own task. The narrative that works in a journey is the user's own: their goal, their progress, their result.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Storytelling activates, gives context and embeds an action in a meaning: a goal makes it easy to begin, a reason turns a demand into sense, a finished step framed as progress feels like achievement. Weigh measures on effect on users, feasibility, risk and time pressure.")}
      sources={["quesenbery2010", "kivetz2006", "gibbons2018", "green2000", "foggWeb2003"]}
      reasoning={[
        tt("Activation: does the first screen give a goal and a clear first step?"),
        tt("Context: does each demanding question say why it is asked?"),
        tt("Emotional embedding: is each finished step framed as progress towards the user's goal?"),
        tt("Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure."),
        tt("A rating is a judgement with a reason, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D8.A5} art={ART_D8} />
      <MeaningChainFig />
      <WeighFig />
      <DataTable
        caption={tt("Embedding an action in its context: findings")}
        head={[tt("Finding"), tt("What it shows"), tt("What it means for a measure")]}
        rows={[
          [tt("Context makes relevance"), tt("Transported readers take more of a story's view (Green and Brock 2000)."), tt("Explain why a step matters in the person's situation, in one line, before asking for the action.")],
          [tt("Progress as context"), tt("Perceived distance to the goal drives effort (Kivetz et al. 2006)."), tt("A path of stages with “you are here” is a measure with a visible effect.")],
          [tt("Credibility"), tt("The design look and the tone are read as signs of care (Fogg et al. 2003)."), tt("A story that reads as marketing in a serious context costs trust: weigh it.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} Designing around users' goals follows Quesenbery and Brooks (2010); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Context turns a demand into a reason. “Enter your annual consumption” is a demand; “Your annual consumption shows which funding you can get” is the same field with a reason. The second needs a few more words, but it answers the question people ask silently at every field: why do they want this?")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("The journey people experience is built by product teams step by step, not by communication. Narrative UX designs it on purpose: a guiding vision, principles, patterns for entries, progress, transitions and endings, and an owner.")}
      sources={["quesenbery2010", "lupton2017", "bruner1991", "govukForms", "mailchimpVoice", "freytag1863"]}
      reasoning={[
        tt("Check where the story is decided today: in campaigns, or in the journeys themselves?"),
        tt("Write a guiding vision that says how every journey begins, carries people and ends."),
        tt("Turn it into a few principles and patterns every team uses."),
        tt("Decide by journey which ones need most guidance: the long, important ones first."),
        tt("At senior level, storytelling is a design logic for relevance, activation and bond, and part of the decision architecture."),
      ]}
    >
      <ComicButton comic={COMICS_D8.B1} art={ART_D8} />
      <ArchitectureFig />
      <NarrativeLayersFig />
      <DataTable
        caption={tt("Narrative UX as experience architecture: real structures")}
        head={[tt("Part"), tt("Real example"), tt("What it means")]}
        rows={[
          [tt("A journey of single steps"), tt("The GOV.UK pattern of one thing per page turns a whole service into a sequence of small decisions (GOV.UK Service Manual)."), tt("Plan the journey as a sequence across channels, not as a campaign.")],
          [tt("A tone by situation"), tt("A steady voice with a tone that follows the situation of the reader (Mailchimp, Voice and Tone)."), tt("Decide how the story sounds at each point of the journey.")],
          [tt("A dramatic structure"), tt("Freytag's five parts give the arc of a journey: situation, build-up, decision, resolution (Freytag 1863)."), tt("Name the moment of decision and the moment of resolution of each journey.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} Storytelling as part of UX design follows Quesenbery and Brooks (2010) and Lupton (2017). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A guiding vision for narrative UX is short and testable: one sentence that names the beginning, the way and the end. “In every journey customers know where it leads, see how far they are, and finish with something in hand” can be checked on every flow. “Every click tells a story” cannot, and it invites staging.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Efficiency against dramaturgy, emotionalisation against seriousness, comprehensibility against staging, brand effect against the user's task. Use story only where it serves the task, keep it short, and decide by journey.")}
      sources={["green2000", "krug2014", "gibbons2018", "nielsen1997", "govukQuestion", "mathur2019", "gds2012"]}
      reasoning={[
        tt("Name the conflict as two goals and say who stands for each: marketing, the department, the product team, the users."),
        tt("Decide by journey: a quick routine needs no story, a long and important one needs a goal, a path and an ending."),
        tt("Treat every staged scene and long text inside a flow as a cost to efficiency and clarity, and ask what it buys."),
        tt("Write the rule down, so the conflict is not fought again in every flow."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D8.B2} art={ART_D8} />
      <WeightFig />
      <DataTable
        caption={tt("Standing conflicts of narrative UX")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Efficiency against dramaturgy"), tt("Users with little time, against a journey with moments."), tt("How long and how important is this journey for them?")],
          [tt("Emotionalisation against seriousness"), tt("Marketing, against the specialist department."), tt("Can it be inspiring and correct in the same line?")],
          [tt("Brand effect against the user's task"), tt("The brand story, against what the user came to do."), tt("Whose story is this step telling?")],
        ]}
      />
      <DataTable
        caption={tt("Conflicts of narrative UX, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Efficiency against dramaturgy"), tt("79% of users always scanned a new page (Nielsen and Morkes 1997), and a one-question-per-page form is longer (GOV.UK Design System)."), tt("Ask how long and how important the journey is for the person, and tell the story only where it helps the task.")],
          [tt("Emotionalisation against seriousness"), tt("Pressure and false urgency were found on about 11% of the crawled shopping websites (Mathur et al. 2019)."), tt("Keep the emotion true to the situation; test whether the message would work if people knew why it was written.")],
          [tt("Brand effect against the user's task"), tt("GOV.UK started from user needs, not from the existing way of working (Government Digital Service 2012)."), tt("Ask whose story each step tells.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} The three journeys are a reading of the example, not a rule for every product. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("A simple rule settles most conflicts: the amount of narrative guidance grows with the length of the journey and its weight for the user. A rule like this, written into the principles, lets marketing tell its story where people have time for it (the website) and keeps it out of the steps where they do not.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Narrative UX lives only with governance: an owner of the principles and patterns, experts who check the facts, marketing who owns the brand story, and a rule for conflicts. A decision with little data says what it decides, does not know, would reverse and gives up.")}
      sources={["simon1956", "klein2007", "quesenbery2010", "govukQuestion", "dsa2022", "mailchimpVoice"]}
      reasoning={[
        tt("Name who owns the narrative UX principles and patterns, and who only uses them."),
        tt("Give the specialist department a veto on clarity, and marketing ownership of the brand story."),
        tt("Settle conflicts by clarity first, then the user's experience in that step, then the brand."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
        tt("Start where changes are cheap, quick to check and easy to reverse: entries, progress, transitions."),
      ]}
    >
      <ComicButton comic={COMICS_D8.B3} art={ART_D8} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of narrative UX governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Lantern Kitchens)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the principles and patterns; who uses them?"), tt("The head of customer experience owns them; every team uses them.")],
          [tt("Who checks"), tt("Who makes sure the story never blurs the facts?"), tt("The planning experts check every line; marketing checks the brand.")],
          [tt("How a conflict is decided"), tt("What happens when clarity, brand and experience quality disagree?"), tt("Clarity, then the customer, then the brand; the product owner settles a tie.")],
        ]}
      />
      <DataTable
        caption={tt("Owning narrative UX: real rules and cases")}
        head={[tt("Part"), tt("Real example or rule"), tt("What it means")]}
        rows={[
          [tt("Who owns the pattern"), tt("The GOV.UK Design System keeps its question pages pattern as a shared, reviewed standard (GOV.UK Design System)."), tt("Name an owner for the patterns and let teams use them.")],
          [tt("Who checks"), tt("Article 25 of the EU Digital Services Act forbids manipulative interface design on online platforms."), tt("Have the specialist and the legal view check every line that carries emotion.")],
          [tt("A shared guide"), tt("Mailchimp's voice and tone guide is a public document its writers share (Mailchimp, Voice and Tone)."), tt("Publish the story and tone rules, so a conflict can be decided against them.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${LK()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Imagine it is a year later and the narrative journeys have failed, and ask why (Klein 2007). The usual answers: the story grew in every release until the steps were hard to find; marketing used the patterns for campaigns; the experts stopped checking the lines. Each answer is a governance gap, not a writing gap.")}</p>
      </Extra>
    </MaterialCard>
  );
}
