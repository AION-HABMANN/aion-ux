import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 12 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow
 * the plan's Wissen cell in its order: accessibility, access, usability and inclusive design, and why digital participation is a matter of quality, law and
 * responsibility; barriers in perception (contrast, colour, text alternatives); barriers in interaction (keyboard, focus order); barriers in language and structure
 * (plain language, clear structure, forms and error messages); standards as a framework, legal and user requirements, the risks of missing accessibility and why it
 * must be built in early, and weighing a measure. Then, for Level 3: accessibility as a quality and responsibility architecture; the conflicts between effort,
 * standardisation, user diversity, legal certainty and feasibility; and governance with a decision under uncertainty. Every card is Core. The plan's title also
 * names neurodiversity (ADHD, autism, dyslexia), which its Wissen cell does not list; cards A1 and A4 cover it where it belongs (whom inclusive design includes;
 * language, structure and distraction), and Day 13 goes deeper.
 *
 * Ideas kept from the original Day 12 (a page of thirteen widgets, /day/12/original/): the contrast slider (here with the real WCAG ratio computed live), the focus
 * order demonstration (here a form you tab through yourself), plain language and error tolerance before and after, and "modern against accessible". Its cases
 * were the plan's own, so the cards use a made-up company.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Accessibility, usability and inclusive design: who is left out, and why it matters"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Barriers in perception: contrast, colour and text alternatives"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Barriers in interaction: keyboard, focus and order"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Barriers in language and structure: plain words, forms, errors, neurodiversity"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Standards, law and risk: build it in early, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Accessibility as quality and responsibility, not a compliance task"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Effort, standards, diversity, law: the conflicts of accessibility"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who owns accessibility, and deciding with incomplete data"), minutes: 20 },
]);

const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Accessibility (in German law, Barrierefreiheit) means people with disabilities can use a product without special help. Access is the wider word: everyone can reach and use it. Usability means it is easy to use. Inclusive design is the approach: design with the range of people from the start, including disabilities that are permanent, temporary or situational, and different minds (ADHD, autism, dyslexia). Digital participation is a matter of quality, of law and of responsibility: when a public or commercial service is only digital, a barrier means someone cannot take part.",
    ),
    why: t(
      "Block 1.1 asks which hurdles PublicAccess puts in front of different groups of users, and Block 1.2 rates three designs on accessibility and user-friendliness. This card tells the words apart and shows whom a barrier excludes.",
    ),
    picture: t("The same Greenway checkout for four people: Kofi with a screen reader, Liv with dyslexia, Arjun with one arm in a cast, and someone in bright sunlight. Choose one and read what stops them. Press “Read the comic” for a short story."),
  },
  A2: {
    idea: t(
      "Perception barriers stop people from seeing or hearing what is there. Weak contrast between text and background makes text unreadable for many, not only for people with low vision; the standard asks for a contrast ratio of at least 4.5 to 1 for normal text. Information given by colour alone (a red field, a green dot) is lost for people who cannot tell the colours apart. Images, icons and symbols need a text alternative that says what they mean, so a screen reader can say it.",
    ),
    why: t(
      "Block 1.1 asks about PublicAccess's colour-only hints, weak contrast and images without descriptions, Block 1.2 about LearnAccess's reduced contrast and small text, and Block 2.1 about CitizenConnect's weak contrast and visual-only hints. This card shows how to see these barriers and measure them.",
    ),
    picture: t("A slider changes the contrast of a Greenway price label and computes the real contrast ratio as you move it. Below, an out-of-stock hint by colour alone and with words, and an image with and without a text alternative. Press “Read the comic” for a short story."),
  },
  A3: {
    idea: t(
      "Interaction barriers stop people from operating a product. Many people do not use a mouse: they use a keyboard, a switch, voice control or a screen reader, all of which need everything to work by keyboard. The focus (the marker showing where you are) must be visible, and it must move in a sensible order. A menu that opens only on mouse hover, a button that is really a picture, or a focus that jumps around makes a service unusable for them.",
    ),
    why: t(
      "Block 1.1 asks about PublicAccess's navigation that works well only with a mouse, and Block 2.1 about CitizenConnect's patchy keyboard operation. This card lets you try it yourself, with the Tab key.",
    ),
    picture: t("A small Greenway form in three versions: mouse only, keyboard with an invisible focus and a jumping order, and keyboard done right. Click into it and press Tab. Press “Read the comic” for a short story."),
  },
  A4: {
    idea: t(
      "Language and structure barriers stop people from understanding. Long nested sentences and official terms exclude people with dyslexia, with learning difficulties, with another first language, and anyone in a hurry. Clear structure (headings, short steps, the same pattern on similar pages) helps everyone find their way. Forms need clear labels and instructions, and error messages must say what went wrong and how to fix it. Neurodivergent people benefit in particular: fewer distractions (ADHD), predictable, literal language (autism), plain words and good spacing (dyslexia).",
    ),
    why: t(
      "Block 1.1 asks about PublicAccess's complex forms and unhelpful error messages, Block 1.2 about LearnAccess's plain language, and Block 2.1 about CitizenConnect's unclear forms, complicated content and inconsistent page types. This card shows plain language and error tolerance before and after.",
    ),
    picture: t("A Greenway delivery form in official language and in plain language; then submit it with a mistake and compare the two error messages. Press “Read the comic” for a short story."),
  },
  A5: {
    idea: t(
      "Standards give a shared target. The Web Content Accessibility Guidelines (WCAG) group requirements under four principles: perceivable, operable, understandable, robust; level AA is the usual target. In the EU, public bodies must meet it, and since 28 June 2025 the European Accessibility Act also covers many private services such as online shops and banking. Missing accessibility excludes people and causes frustration, reputational damage, legal risk and more support calls. Building it in from the start costs far less than repairing it later. To put measures in order, weigh each on effect on users, legal certainty, feasibility, risk and time pressure.",
    ),
    why: t(
      "Block 1.2 asks about legal certainty, and Block 2.1 asks for four prioritised measures for CitizenConnect, justified on effect on users, legal certainty, feasibility, risk and time pressure. The example uses Greenway and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t("The four principles of the standard, each with a Greenway example. Then three measures rated on effect on users, legal certainty, feasibility, risk and time pressure. Select a cell to read the reason for its rating."),
  },
  B1: {
    idea: t(
      "Inside many companies accessibility is first a compliance task: a check before launch, an audit, a statement. At senior level it is a quality and responsibility dimension: part of what “done” means for every product, built into the design system once, tested with disabled people, and owned by someone. Systems that formally work but exclude people are not finished. The rule of thumb: fix it where it is made (components, templates, content rules), not page by page afterwards.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision of digital participation, three decisions on standards, inclusive design, prioritising barriers and governance, and an order of which journeys, components or systems come first. You decide the architecture, not single fixes.",
    ),
    picture: t("Left Greenway treating accessibility as a launch check, right building it into how products are made. Below, the layers from a guiding vision to every page. Nothing to click."),
  },
  B2: {
    idea: t(
      "Accessibility sits between goals that pull apart: effort against reach, one standard for all against the diversity of users, the brand's look against legibility, legal certainty against what can be done this year. The way through is to decide where to fix once (components, templates), where to give people options (settings), and where the law sets the minimum; and to write down which assumptions about users, effort and legal certainty the plan rests on.",
    ),
    why: t(
      "Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about user diversity, effort and legal certainty, and a governance model for conflicts between brand, technology, law and user interest. Each is a decision between conflicting goals.",
    ),
    picture: t("Three Greenway decisions, each a conflict between goals: the brand colour, an optional settings panel, and the order of repairs. Choose one and read why. Press “Read the comic” for a short story."),
  },
  B3: {
    idea: t(
      "Accessibility needs an owner: someone who owns the principles and the target level, a check in every release (part of “done”), testing with disabled people, rules for what is bought from suppliers, a public accessibility statement, and a rule for when brand, technology, law and users disagree. Data on real barriers is often incomplete; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.",
    ),
    why: t("Block 3.1 asks for a governance model for accessibility principles, a decision despite patchy data, and a statement to the management. This card gives you the parts of each."),
    picture: t("The four boxes at the top are the parts of a decision, filled in for Greenway. The two boxes below are the rule for future decisions. Nothing to click."),
  },
});

const M = makeMaterials(12, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
