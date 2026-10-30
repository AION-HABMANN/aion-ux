import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 3 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: colour psychology and the effects of colour on attention, trust, activation, warning and orientation;
 * decorative against functional colour, colour for action, priority and state, and the risks of unplanned colour; typography for readability (size, line spacing,
 * contrast, weight, text structure) and aesthetic against functional type; typographic hierarchy, scanning, and the interplay of colour, type and structure; the transfer
 * to practice and how to weigh a measure (effect on users, feasibility, risk, time pressure, as Block 2.1 names them). Then, for Level 3: colour and type as strategic
 * effect decisions, the conflicts between brand, accessibility, clarity, activation and standardisation, and the role of responsible leaders. Every card is Core.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("What colour does: attention, trust, activation, warning and orientation"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Decorative against functional colour: colour for action, priority and state"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Readable type: size, line spacing, contrast, weight and structure"), minutes: 13 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Typographic hierarchy, and colour, type and structure working together"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("From colour and type to behaviour, and weighing a measure"), minutes: 11 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Colour and type as strategic effect decisions: a design logic, not a style"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicts of goals: brand, accessibility, clarity, activation and standardisation"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who owns the visual standards, and deciding with incomplete data"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Colour is seen before shape or text, so it decides much of what people notice and feel first. It can draw attention to one element, signal a warning, make an action inviting, support trust with calm and consistent tones, and give orientation when each area or kind of thing keeps its colour. These effects are learnt and depend on context and culture: red means danger in a form and a sale in a shop. So a colour's effect is a hypothesis about these users in this context, not a law.",
    ),
    why: t(
      "Block 1.1 asks for your spontaneous impression of TravelEase and for the problems its four colours cause, Block 1.2 asks you to rate the trust and brand effect of HealthConnect's designs, and Block 2.1 asks about SecureLife's blues, greens and reds. This card gives you the five effects to look for.",
    ),
    picture: t(
      "One Kettle & Co order page with three switches for colour: an accent for the main action, red only for a real problem, and one colour per area. Switch them on one at a time and read what Rosa notices and feels. Press “Read the comic” for a short story. A table of what colour does, with evidence, follows.",
    ),
  },
  A2: {
    idea: t(
      "Decorative colour makes a screen look a certain way; functional colour tells people something. Functional colour has a job: it marks what can be done (action), what matters most (priority) and what state something is in (state, such as sent, waiting or failed). Unplanned colour creates three risks: overload, because everything is loud; misunderstanding, because one colour means several things or a colour alone carries a meaning; and no hierarchy, because nothing stands out when everything does.",
    ),
    why: t(
      "Block 1.1 asks about warnings, buttons and boxes in similar tones on TravelEase, and Block 2.1 about SecureLife's colours without a system, buttons that look like boxes and status messages coded only by colour. This card gives you the jobs colour can have and the risks when it has none.",
    ),
    picture: t(
      "The same Kettle & Co order page twice: coloured to decorate and coloured to function. Choose a version and read what Theo can tell from the colours. Press “Read the comic” for a short story. A table of colour rules and a real case follows.",
    ),
  },
  A3: {
    idea: t(
      "On a screen, readability depends on a few levers: type size, line spacing, contrast between text and background, the weight of the type (thin strokes vanish), and the structure of the text (short paragraphs, short lines, clear spacing). Aesthetic typography chooses type for its look; functional reading typography chooses it so people can read quickly and without effort, also older people and people on small screens. A text can look elegant and still be read badly.",
    ),
    why: t(
      "Block 1.1 asks about TravelEase's small grey notes and hard-to-read modern sections, Block 1.2 about HealthConnect's low contrast and smaller elegant type for users up to 70, and Block 2.1 about SecureLife's small, dense body text. These five levers are what you check.",
    ),
    picture: t(
      "One Kettle & Co delivery notice with four switches: larger type, more line spacing, more contrast and a clear structure. Switch them on one at a time and read what Rosa can now read. Then a second working example with line length, and a table of the numbers and rules for readable type.",
    ),
  },
  A4: {
    idea: t(
      "A typographic hierarchy is a small, fixed set of text levels (for example a page heading, a section heading, body text and a note) that look clearly different and mean the same on every page. It lets people scan: their eye jumps from heading to heading and picks the part they need. Colour, type and structure work together: a heading level, an action colour and a group of related content tell the eye where it is and where to go. When the levels differ from page to page, or headings look like body text, scanning breaks.",
    ),
    why: t(
      "Block 1.1 asks about TravelEase's decorative headings that do not stand out from the body text, and Block 2.1 about SecureLife's inconsistent typographic hierarchies and calls to action lost among other text. You need the idea of levels to say what is wrong and what a fix would standardise.",
    ),
    picture: t(
      "The same Kettle & Co help page in three forms: flat, with a clear hierarchy, and with too many styles. Choose one and read where Theo's eye goes. Press “Read the comic” for a short story. A table of hierarchy and scanning findings follows.",
    ),
  },
  A5: {
    idea: t(
      "Colour and type decisions change behaviour directly: whether people find the button, read the condition, understand the state of their order and trust the company. That is why they are judged like any other measure, on the four questions Block 2.1 names: effect on users (what it changes for them, and for how many), feasibility (with the people, the technical room and the corporate design there is), risk (what could go wrong or backfire) and time pressure (whether it fits the time and shows soon). The reason next to each rating matters more than the rating.",
    ),
    why: t(
      "Block 1.1 asks for the two most critical weaknesses, Block 1.2 for a decision between three designs, and Block 2.1 for four measures with a justification on these four criteria and a decision for 12 weeks. The example uses Kettle & Co and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "Three measures Kettle & Co considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating. A rating is a reading of the example, not a mark. A table of findings on behaviour, understanding and trust follows.",
    ),
  },
  B1: {
    idea: t(
      "Colour and type become strategic when they are decided once, as rules, and used everywhere: which colour means action, warning or state, which type levels exist and how large text must be. Such a design logic, often kept as a small set of named values and shared components, makes every touchpoint consistent and lets the brand be recognised by its consistency. When colours change with every campaign and each team sets type its own way, users have to relearn every screen, and the debate inside stays about taste.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for colour and type, three decisions on colour, reading, hierarchy and action, and an order of what is standardised first, for a company whose colours changed with campaigns and whose teams set type differently. You decide the rules, not the screens.",
    ),
    picture: t(
      "Left the same Kettle & Co elements decided campaign by campaign, right decided once as rules. Below, the chain from the brand to the screens. Nothing to click. A table of real systems follows.",
    ),
  },
  B2: {
    idea: t(
      "Colour and type sit between goals that pull against each other. The brand wants recognition and a certain look; accessibility needs contrast and size; clarity needs few, meaningful colours, while activation wants energy; standardisation wants one rule, while campaigns and teams want freedom. A common way through: the brand lives in the logo, the tone and the images, while the interface elements follow functional rules with minimum readability and contrast. The work is to name the conflict, choose, and say what you give up.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis about perception and the brand's effect, and a governance model for conflicts between brand and usability. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "The matrix places five Kettle & Co designs by how readable they are (to the right) and how strongly they carry the brand (upwards). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story. A table of conflicts with evidence follows.",
    ),
  },
  B3: {
    idea: t(
      "Visual standards only hold when someone owns them: who keeps the colour and type rules and the shared components, who keeps the brand, and who decides when the two conflict, on what basis. A rule that puts minimum readability and contrast first takes most conflicts out of the realm of taste. Because data is rarely complete, a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. A wrong priority shows up as lost trust, operating errors and support costs.",
    ),
    why: t(
      "Block 3.1 asks for a governance model for the visual standards and the conflict between brand and usability, a decision despite missing data, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Kettle & Co. The two boxes below are the rule for future decisions. Nothing to click. A table of a real case and a real rule follows.",
    ),
  },
});

const M = makeMaterials(3, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
