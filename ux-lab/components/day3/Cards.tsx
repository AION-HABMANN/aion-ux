"use client";

import type { ReactNode } from "react";
import { ColourFig, ConflictFig, DecisionFig, FunctionFig, HierFig, LogicChainFig, RulesFig, TypeFig, WeighFig } from "@/components/day3/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D3 } from "@/components/day3/comicScenes";
import { COMICS_D3 } from "@/data/day3/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Kettle & Co, Rosa, Theo, Ines and Karim; never TravelEase, HealthConnect or
 * SecureLife, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const KC = () => tt("Kettle & Co, Rosa, Theo, Ines and Karim are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Colour is seen first. It draws attention, signals a warning, invites action, supports trust and gives orientation. Its effect is learnt and depends on context, so it is a hypothesis.")}
      sources={["elliot2014", "labrecque2012", "mehta2009", "ware2012"]}
      reasoning={[
        tt("Find the strongest colour on the screen and ask whether it sits on the most important thing."),
        tt("Ask what each colour is meant to do: draw attention, warn, invite, build trust or show where you are."),
        tt("A warning colour on something that is not a problem alarms people and teaches them to ignore it."),
        tt("Many strong colours at once compete; colour then gives no orientation and no priority."),
        tt("Say a colour's effect as a hypothesis for these users in this context: red means danger in a form and a sale in a shop."),
      ]}
    >
      <ComicButton comic={COMICS_D3.A1} art={ART_D3} />
      <ColourFig />
      <DataTable
        caption={tt("Five effects of colour, and what breaks them")}
        head={[tt("Effect"), tt("Colour that builds it"), tt("Colour that breaks it")]}
        rows={[
          [tt("Attention"), tt("One strong accent on the thing that matters."), tt("Many strong colours that compete.")],
          [tt("Warning"), tt("A warning colour kept for real problems."), tt("Red for ordinary information.")],
          [tt("Activation"), tt("A warm, inviting colour on the action."), tt("The most inviting colour on the wrong button.")],
          [tt("Trust"), tt("Calm, consistent colours that keep their meaning."), tt("Loud colours, or colours that change from page to page.")],
          [tt("Orientation"), tt("Each area or kind of thing keeps its colour."), tt("A colour that means something different on every page.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} The effects of colour follow Elliot and Maier (2014); colour and brand perception follow Labrecque and Milne (2012); red as caution and blue as approach follow Mehta and Zhu (2009).`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Elliot and Maier (2014) stress that colour effects depend on context: the same red that improves attention to detail in one study can make people avoid a task in another, and the meaning of a colour differs between cultures. For an interface this means: decide the meaning of each colour for your users and your context, and check it; do not rely on a colour chart.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Functional colour has a job: action, priority or state, each with one meaning. Unplanned colour risks overload, misunderstanding and no hierarchy.")}
      sources={["wcag22", "nielsen1994", "ware2012"]}
      reasoning={[
        tt("Sort every colour on the screen into a job: action (can be done), priority (matters most), state (sent, waiting, failed), information, or decoration."),
        tt("Check that each job has one colour and each colour one job: a warning must not look like a button, nor a button like an information box."),
        tt("Never let a colour alone carry a meaning: add a word or a symbol, so the state is not missed or misread."),
        tt("Too many loud colours is overload; one colour with several meanings is a misunderstanding; everything equally strong is no hierarchy."),
      ]}
    >
      <ComicButton comic={COMICS_D3.A2} art={ART_D3} />
      <FunctionFig />
      <DataTable
        caption={tt("The jobs of functional colour")}
        head={[tt("Job"), tt("What it tells people"), tt("A typical use")]}
        rows={[
          [tt("Action"), tt("This can be pressed or done."), tt("One colour for every button that does something.")],
          [tt("Priority"), tt("This matters most here."), tt("The strongest accent on the main action only.")],
          [tt("State"), tt("This is the state of your matter."), tt("Green with “Delivered”, amber with “On its way”, red with “Failed”.")],
          [tt("Warning"), tt("Something needs your attention now."), tt("Red, kept for real problems, with a word.")],
          [tt("Information"), tt("Good to know, nothing to do."), tt("A calm neutral tone.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} That colour must not be the only way to convey information is WCAG 2.2, criterion 1.4.1; consistency and standards is Nielsen's heuristic (1994).`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("A noticeable share of people, more men than women, see some colours differently, most often red and green. A status shown only as a red or green dot can look the same to them. A word or a symbol next to the colour is therefore not a nicety but the only way the information reaches everyone.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Readable type on a screen comes from size, line spacing, contrast, weight and structure. Aesthetic type chooses for the look; functional reading type chooses for the reader.")}
      sources={["rello2016", "dyson2004", "beier2012", "wcag22"]}
      reasoning={[
        tt("Check the size of the type that carries important information; small type is skipped or misread."),
        tt("Check the contrast: light grey on white, or white on a light brand colour, is hard to read."),
        tt("Check the weight: thin strokes vanish at small sizes and on phones."),
        tt("Check the line spacing and the length of lines and paragraphs: dense blocks are hard to follow."),
        tt("Think of the whole target group: older people and small screens are where readability fails first."),
      ]}
    >
      <ComicButton comic={COMICS_D3.A3} art={ART_D3} />
      <TypeFig />
      <DataTable
        caption={tt("Aesthetic typography and functional reading typography")}
        head={[tt("Lever"), tt("Aesthetic choice"), tt("Functional choice")]}
        rows={[
          [tt("Size"), tt("Small, for an elegant look."), tt("Large enough for the whole target group.")],
          [tt("Contrast"), tt("Light grey or brand tints for softness."), tt("Dark text on a light background, at least the WCAG minimum.")],
          [tt("Weight"), tt("Thin, light styles."), tt("Regular for text; bold only for emphasis.")],
          [tt("Line spacing"), tt("Tight, compact blocks."), tt("Enough space for the eye to find the next line.")],
          [tt("Structure"), tt("One long, flowing paragraph."), tt("Short parts, short lines, clear spacing.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} The effect of type size and line spacing on screen reading follows Rello, Pielot and Marcos (2016); layout and line length follow Dyson (2004); legibility of letter shapes and weights follows Beier (2012); minimum text contrast is WCAG 2.2, criterion 1.4.3.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("In the study by Rello, Pielot and Marcos (2016), larger type improved both reading and comprehension on screen, while line spacing mattered much less. A practical consequence: when a team has room to change only one thing about its body text, a larger size usually helps more than any other single change.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("A typographic hierarchy is a few fixed text levels, clearly different and the same on every page. It lets people scan. Colour, type and structure work together to guide.")}
      sources={["bringhurst2004", "pernice2017", "nielsen1994"]}
      reasoning={[
        tt("Count the text levels on a page: page heading, section heading, body text, note. More than four or five, and they blur."),
        tt("Check that a heading is clearly different from body text in size or weight, not only in a decorative style."),
        tt("Check that the levels are the same on every page; a level that changes from page to page breaks scanning."),
        tt("Check that colour, type and structure point the same way: the action colour on the action, the heading level on the heading, related content grouped."),
        tt("A call to action set like body text is lost among it."),
      ]}
    >
      <ComicButton comic={COMICS_D3.A4} art={ART_D3} />
      <HierFig />
      <DataTable
        caption={tt("A small typographic hierarchy")}
        head={[tt("Level"), tt("What it is for"), tt("How it looks (example)")]}
        rows={[
          [tt("Page heading"), tt("Says where you are."), tt("The largest text, once per page.")],
          [tt("Section heading"), tt("Lets the eye jump to the part it needs."), tt("Clearly larger or bolder than body text.")],
          [tt("Body text"), tt("Carries the information."), tt("The most readable setting: size, contrast, spacing.")],
          [tt("Note"), tt("Adds a detail."), tt("Smaller, but never pale or tiny for important content.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} Hierarchy as a service to the reader follows Bringhurst (2004); headings that change how people scan follow Pernice (2017).`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Important information is often placed in the “note” level because it feels secondary to the designer: a condition, a deadline, a fee. That is the level users skip. A useful check: read only the headings and the body text of a page; if the user would miss something that can cost them money or time, it is in the wrong level.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Colour and type decisions change behaviour, understanding and trust directly. So they are weighed like any measure: effect on users, feasibility, risk and time pressure, with a reason.")}
      sources={["gibbons2018", "nielsen1994", "wcag22"]}
      reasoning={[
        tt("Say for each measure what users will do differently: find the button, read the condition, understand the state, trust the page."),
        tt("Rate every measure on the same four questions: effect on users, feasibility (people, technical room, corporate design), risk, time pressure."),
        tt("A change to one shared element (a button style, a status label, the body text) reaches every page at once and is often the strongest lever."),
        tt("A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer."),
        tt("Within a binding corporate design, how colours and type are used can usually change; the brand colours and the typeface themselves cannot."),
      ]}
    >
      <ComicButton comic={COMICS_D3.A5} art={ART_D3} />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} Rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("The plan's transfer question is how colour and type decisions act on behaviour, understanding and trust. A useful habit is to write each measure as “so that”: one action colour, so that customers find what to press; a word with every state, so that nobody misreads a failed payment. A measure without a “so that” is decoration.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Colour and type are strategic when they are decided once, as rules and shared components, and used everywhere. The brand is recognised by its consistency.")}
      sources={["frost2016", "nielsen1994", "labrecque2012"]}
      reasoning={[
        tt("Look for the places where colour and type are decided today: per campaign, per team, per screen."),
        tt("Decide the meaning of each colour and the type levels once, as rules, and build the shared components from them."),
        tt("A decision made at the rules or the components reaches every screen; a decision on one screen reaches one."),
        tt("Leaders orient design to effect, consistency and usability: ask whether a change breaks a rule and why, not whether it looks fresh."),
        tt("Campaigns can live in images and tone; the interface elements keep their meaning."),
      ]}
    >
      <ComicButton comic={COMICS_D3.B1} art={ART_D3} />
      <RulesFig />
      <LogicChainFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} Building interfaces from shared rules and components follows Frost (2016); consistency and standards is Nielsen's heuristic (1994).`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("Many teams keep their rules as a short list of named values, such as “action colour”, “warning colour”, “heading 2” and “body text size”, which every channel uses instead of raw colour codes and sizes. When a value changes, it changes everywhere at once, and a campaign can no longer change a button by accident.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Brand, accessibility, clarity, activation and standardisation pull against each other. A common way through: the brand in the logo, tone and images, the interface in functional rules with minimum readability.")}
      sources={["wcag22", "labrecque2012", "gibbons2018"]}
      reasoning={[
        tt("Name the conflict as two goals and say who stands for each: the brand team, marketing, IT, users of a certain age."),
        tt("Readability and contrast below the minimum are not a style choice; they shut people out."),
        tt("The brand can live in the logo, the brand colours used in their place, the tone and the images; it does not need every button."),
        tt("Campaign freedom against standardisation: decide where campaigns may set colour (images) and where they may not (interface elements)."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D3.B2} art={ART_D3} />
      <ConflictFig />
      <DataTable
        caption={tt("Standing conflicts of colour and type")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Brand against accessibility"), tt("The brand team, against users who see less well."), tt("Where can the brand live without lowering contrast or size?")],
          [tt("Clarity against activation"), tt("Users who need few, meaningful colours, against marketing's energy."), tt("Which one element may be loud, and why that one?")],
          [tt("Standardisation against freedom"), tt("IT and consistency, against campaigns and teams."), tt("Which elements are fixed by rule, and where is freedom allowed?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} The minimum contrast and the use of colour follow WCAG 2.2; the matrix is a reading of the example, not a score.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("A brand colour that fails the contrast minimum for text can still be used: as a background for large headings, in the logo, as a thin accent line, or darkened by a step for text. The brand team keeps its colour, and the text stays readable. Most brand-against-accessibility conflicts end there once someone asks where exactly the colour has to appear.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Visual standards hold only when someone owns them and a rule decides conflicts, minimum readability first. A decision with incomplete data says what it decides, what it does not know, when it would reverse it and what it gives up.")}
      sources={["simon1956", "klein2007", "wcag22"]}
      reasoning={[
        tt("Name who owns the colour and type rules and the shared components, and who owns the brand."),
        tt("Give conflicts between brand and usability a rule: minimum readability and contrast first, then evidence, then a named person."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
        tt("A wrong priority shows up as lost trust, operating errors and support costs; say when you will check."),
      ]}
    >
      <ComicButton comic={COMICS_D3.B3} art={ART_D3} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of a governance model for visual standards")}
        head={[tt("Part"), tt("The question"), tt("An example (Kettle & Co)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the rules and components; who owns the brand?"), tt("The head of UX owns the rules; the brand manager owns the logo and tone.")],
          [tt("How a conflict is decided"), tt("What happens when brand and usability clash?"), tt("Readability first; then both decide on the evidence; the director settles a tie.")],
          [tt("Where freedom is allowed"), tt("Where may campaigns and teams set colour and type?"), tt("In campaign images and headlines, not in buttons, states or body text.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${KC()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Before the standards go live, imagine it is a year later and customers still misread states and miss conditions, and ask why (Klein 2007). The usual answers: a team kept its own components, a campaign overrode a rule, or the minimum was written but nobody checked it. Each answer names an owner who is missing.")}</p>
      </Extra>
    </MaterialCard>
  );
}
