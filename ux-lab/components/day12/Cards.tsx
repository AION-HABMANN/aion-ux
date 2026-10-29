"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, ConflictFig, ContrastFig, DecisionFig, ErrorFig, KeyboardFig, LayersChainFig, PeopleFig, PlainFig, PourFig, StockFig, WeighFig } from "@/components/day12/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D12 } from "@/components/day12/comicScenes";
import { COMICS_D12 } from "@/data/day12/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the
 * rules it gives the task (folded) → sources → Mark as read. Example company and people: Greenway, Kofi, Liv, Sanne and Henrik; never PublicAccess, LearnAccess or
 * CitizenConnect, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings keep the original Day
 * 12's points (more than meeting a norm, the barrier nobody noticed, compliance against quality) in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const GW = () => tt("Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Accessibility means people with disabilities can use a product on their own; usability means it is easy to use; inclusive design means designing with the full range of people from the start. Limits can be permanent, temporary or situational, and minds differ. Digital participation is a matter of quality, law and responsibility.")}
      sources={["holmes2018", "wad2016"]}
      reasoning={[
        tt("Ask who is left out, not only whether it works."),
        tt("Think of permanent, temporary and situational limits, and of different minds (ADHD, autism, dyslexia)."),
        tt("Tell accessibility (can people with disabilities use it?) from usability (is it easy?)."),
        tt("Remember that a barrier in a public or only-digital service can mean someone cannot take part at all."),
        tt("Expect a fix for one group to help many others."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A1} art={ART_D12} />
      <PeopleFig />
      <DataTable
        caption={tt("Four words that are often mixed up")}
        head={[tt("Word"), tt("The question it asks"), tt("Example (Greenway)")]}
        rows={[
          [tt("Accessibility"), tt("Can people with disabilities use it on their own?"), tt("Kofi can order with his screen reader.")],
          [tt("Access"), tt("Can everyone reach and use it, on any device?"), tt("The shop works on an old phone and a slow connection.")],
          [tt("Usability"), tt("Is it easy and efficient to use?"), tt("Reordering last week's basket takes one tap.")],
          [tt("Inclusive design"), tt("Did we design with the full range of people from the start?"), tt("Kofi and Liv were in the first tests, not the last.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} Disability as a mismatch between person and design, and permanent, temporary and situational limits, follow Holmes (2018). Public bodies' duty to make websites and apps accessible follows the EU Web Accessibility Directive (2016).`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("A product can meet every technical rule and still exclude people, and it can fail a rule and still be usable for most. Accessibility is about the person completing the task, not about the checklist. The checklist is how a team makes sure it did not forget anyone; it is not the goal.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Perception barriers stop people from seeing or hearing what is there: weak contrast (the standard asks for at least 4.5 to 1 for normal text), information by colour alone, and images or icons without a text alternative.")}
      sources={["wcag22", "holmes2018"]}
      reasoning={[
        tt("Measure the contrast of text against its background; do not judge it by eye on a good screen."),
        tt("Check every status, hint or error shown by colour: is it also said in words or with an icon?"),
        tt("Give every meaningful image or icon a text alternative that says what it means."),
        tt("Leave decorative images without one, so screen readers skip them."),
        tt("Remember sunlight, old screens and older eyes: contrast is for everyone."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A2} art={ART_D12} />
      <ContrastFig />
      <StockFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} The contrast ratios and the rule against colour alone follow WCAG 2.2; the ratio in the picture is computed with the standard's formula.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Light grey secondary text is the most common accessibility failure on the web, and it usually comes from a brand guide, not from a developer. It looks refined on a large, bright designer's screen and fails on a phone in the sun. That makes contrast a brand decision as much as a design one.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Interaction barriers stop people from operating a product. Many people use a keyboard, a switch, voice control or a screen reader: everything must work by keyboard, the focus must be visible, and it must move in a sensible order.")}
      sources={["wcag22"]}
      reasoning={[
        tt("Put the mouse away and press Tab: can you reach and use everything?"),
        tt("Can you always see where the focus is?"),
        tt("Does the focus move in the order you read?"),
        tt("Do menus and dialogs open, and close, with the keyboard too?"),
        tt("Are buttons real buttons, with names, not pictures that react to a click?"),
      ]}
    >
      <ComicButton comic={COMICS_D12.A3} art={ART_D12} />
      <KeyboardFig />
      <DataTable
        caption={tt("A ten-second keyboard test")}
        head={[tt("Key"), tt("What it should do"), tt("What a barrier looks like")]}
        rows={[
          [tt("Tab"), tt("Move to the next control, in reading order."), tt("Skips controls, or jumps around.")],
          [tt("Shift + Tab"), tt("Move back."), tt("Gets stuck in a box (a keyboard trap).")],
          [tt("Enter / Space"), tt("Activate the button or link."), tt("Nothing happens: it was a picture.")],
          [tt("Arrow keys"), tt("Move within menus, tabs, radio buttons."), tt("Menu opens only on mouse hover.")],
          [tt("Escape"), tt("Close a dialog or menu."), tt("The dialog cannot be closed.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} Keyboard operability, focus order and visible focus follow WCAG 2.2.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("A team without a keyboard user often never notices a keyboard barrier, because every one of them uses a mouse. That is why the most damaging barriers are often invisible inside the company: the people who meet them are not in the room. The ten-second test puts them in the room.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Language and structure barriers stop people from understanding: long nested sentences and official terms, unclear structure, forms without clear labels, and error messages that do not say how to fix the mistake. Neurodivergent people benefit in particular from fewer distractions, predictable pages, literal language and good spacing.")}
      sources={["bda2023", "wcag22"]}
      reasoning={[
        tt("One idea per sentence; everyday words; the question the person is answering."),
        tt("A label above every field, an example where the format matters."),
        tt("Error messages: what went wrong, where, how to fix it; keep what was typed."),
        tt("The same pattern on similar pages, so people know where things are."),
        tt("Left-aligned text, good spacing, no blocks of capitals or italics; few distractions."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A4} art={ART_D12} />
      <PlainFig />
      <ErrorFig />
      <DataTable
        caption={tt("What helps neurodivergent people (and almost everyone else)")}
        head={[tt("Who"), tt("Often hard"), tt("What helps")]}
        rows={[
          [tt("ADHD"), tt("Distractions, long pages, many choices at once."), tt("One task per screen, few moving parts, clear next step.")],
          [tt("Autism"), tt("Vague or figurative language, surprises, changing layouts."), tt("Literal, predictable wording; consistent pages; say what will happen.")],
          [tt("Dyslexia"), tt("Dense, justified text, capitals, italics, long words."), tt("Plain words, short sentences, left-aligned text, good spacing.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} The reading advice follows the British Dyslexia Association's style guide (2023); labels, instructions and error suggestions follow WCAG 2.2. Day 13 goes deeper into neurodiversity.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Plain language is often resisted as “dumbing down”, especially in legal and public services. It is the opposite: saying something precisely in everyday words is harder than saying it in jargon, and it is the cheapest accessibility measure with the widest effect, because everyone reads faster and makes fewer mistakes.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("WCAG groups its requirements under perceivable, operable, understandable and robust; level AA is the usual target. EU public bodies must meet it, and since 28 June 2025 the European Accessibility Act covers many private services. Missing accessibility excludes people and brings frustration, reputational damage, legal risk and support effort; building it in early costs far less than repairing it.")}
      sources={["wcag22", "eaa2019", "wad2016", "gibbons2018"]}
      reasoning={[
        tt("Use the four principles to sort any barrier: perceivable, operable, understandable, robust."),
        tt("Know which law applies: public body, or a service covered by the European Accessibility Act."),
        tt("Name the risks of doing nothing: exclusion, frustration, reputation, legal, support calls."),
        tt("Prefer fixing where barriers are made over repairing page by page."),
        tt("Rate every measure on the same criteria, with a reason; a rating is a judgement, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D12.A5} art={ART_D12} />
      <PourFig />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} The principles and levels follow WCAG 2.2; the dates follow the European Accessibility Act (Directive (EU) 2019/882) and the Web Accessibility Directive (2016/2102). Check the current state of the law before a course run. Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Retrofitting costs more than building in, for a simple reason: a barrier in a shared component is copied into every page that uses it, and every copy must then be found and fixed. A contrast rule written into the design system costs one decision; the same rule discovered in an audit costs a project.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Inside many companies accessibility is first a compliance task: an audit, a statement. At senior level it is a dimension of quality and responsibility: part of what “done” means, built into components and templates, tested with disabled people, and owned by someone. Fix it where it is made.")}
      sources={["holmes2018", "wad2016"]}
      reasoning={[
        tt("Check where accessibility is decided today: at the end, or where products are made?"),
        tt("Write a guiding vision of participation: who must be able to use every service, and how well."),
        tt("Set a target (WCAG 2.2 AA) and make it part of the definition of done."),
        tt("Fix barriers in components, templates and writing rules, not page by page."),
        tt("Order the work: what every page uses, and the key tasks, first."),
      ]}
    >
      <ComicButton comic={COMICS_D12.B1} art={ART_D12} />
      <ArchitectureFig />
      <LayersChainFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} Inclusion as a design approach follows Holmes (2018).`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A guiding vision for participation is short and testable. “Every customer can find, choose and pay on their own” can be checked on every page: can Kofi pay with his screen reader? “We are committed to accessibility” cannot be checked, and it is what most accessibility statements say.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Accessibility sits between effort and reach, one standard and the diversity of users, the brand's look and legibility, legal certainty and what can be done this year. Decide where to fix once, where to give options, and where the law sets the minimum; write down the assumptions about users, effort and law.")}
      sources={["eaa2019", "holmes2018"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: brand, legal, product, finance, users."),
        tt("Fix once where it is shared (components, templates); give options only on top of good defaults."),
        tt("Treat the legal minimum as the floor, not the goal."),
        tt("Write down the assumptions about user diversity, effort and legal certainty, and which would be critical if wrong."),
        tt("Say which barriers wait, and why."),
      ]}
    >
      <ComicButton comic={COMICS_D12.B2} art={ART_D12} />
      <ConflictFig />
      <DataTable
        caption={tt("Standing conflicts of accessibility")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Brand look against legibility"), tt("Brand and marketing, against accessibility and legal."), tt("Can the brand stay recognisable with a darker shade for text?")],
          [tt("One standard against diverse users"), tt("Engineering, against the people a default does not fit."), tt("Do the defaults work for most, and who needs an option?")],
          [tt("Effort against reach"), tt("Finance, against the users who are excluded."), tt("Where does one repair reach the most people?")],
          [tt("Legal certainty against feasibility this year"), tt("Legal, against product."), tt("Which failures carry the most legal and human risk?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} The conflicts are a reading of the example, not a rule for every product.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("The assumption that disabled users are a small group is the one that most often distorts the trade-off. Counting permanent, temporary and situational limits, older users and different minds together, the people who benefit from an accessible default are a large share of customers, and the share grows with an ageing population.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Accessibility needs an owner of the principles and the target, a check in every release (part of “done”), testing with disabled people, rules for what is bought, a public accessibility statement, and a rule for when brand, technology, law and users disagree. With incomplete data, a decision says what it decides, does not know, would reverse and gives up.")}
      sources={["wad2016", "simon1956", "klein2007"]}
      reasoning={[
        tt("Name who owns the principles and the target level."),
        tt("Put the accessibility check into every definition of done and every purchase."),
        tt("Give someone the right to stop a release that excludes people."),
        tt("Settle conflicts by the user's ability to complete the task and the legal minimum first, then brand, then effort."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D12.B3} art={ART_D12} />
      <DecisionFig />
      <DataTable
        caption={tt("Five parts of accessibility governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Greenway)")]}
        rows={[
          [tt("Owner and target"), tt("Who owns the principles; which level?"), tt("The head of UX; WCAG 2.2 AA.")],
          [tt("Check in every release"), tt("How does nothing ship that excludes people?"), tt("An accessibility check in the definition of done; the lead may stop it.")],
          [tt("Testing with people"), tt("Who tests, and when?"), tt("Disabled customers test checkout and search before each big release.")],
          [tt("Procurement and statement"), tt("What do suppliers deliver; what do we publish?"), tt("AA in every contract; an honest public statement with a contact for barriers.")],
          [tt("How a conflict is decided"), tt("What happens when brand, technology, law and users disagree?"), tt("Task and legal minimum first, then brand, then effort; the board settles a tie.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${GW()} The accessibility statement for public bodies follows the Web Accessibility Directive (2016); deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("An audit list without an owner ages quickly: by the time the last item is fixed, new pages have added new barriers. What lasts is a check that runs every release and a person who may say no. That is the difference between doing accessibility and anchoring it.")}</p>
      </Extra>
    </MaterialCard>
  );
}
