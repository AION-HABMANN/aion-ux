import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 1 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: the basic terms and the difference between aesthetic and psychologically effective design; the neural basics
 * of visual perception and the interplay of bottom-up and top-down; prior knowledge, expectations, context and habits, and the use of neuroscience in the interface
 * (orientation, less confusion, steered attention); emotional and unconscious design effects; then, for Level 3, the Neuro-UX strategy, the conflicting goals and the role
 * of future managers. A5 teaches the criteria Block 2.1 names (effect on users, feasibility, risk, time pressure). Every card is Core: a Core block draws on each.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("UX, UI and the psychology behind them: looking good is not the same as working well"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("How people see: from stimulus to decision, bottom-up and top-down"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Expectations and habits, and three aims of an interface: orientation, less confusion, steered attention"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Feelings that work before thinking: trust, reactance, overload, safety, liking"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a design measure: effect on users, feasibility, risk, time pressure"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Design steers perception, behaviour and decision: a Neuro-UX strategy"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: aesthetics against clarity, innovation against familiarity, activation against overload"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Accountable decisions under uncertainty: the role, the rules and a decision you can answer for"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "UX (user experience) is everything a person goes through when using a product: what they notice, understand, feel and do. UI (user interface) is only the surface they see and touch. A page can look beautiful and still make people overlook the button, doubt the company or give up. Psychological UX design therefore judges a design by its effect on attention, understanding, feeling and decision, not only by how it looks.",
    ),
    why: t(
      "Block 1.1 asks you to describe what the CarePath app does to its users before you judge it, and Block 2.1 asks for the effect problems of the SafeHome portal. This card gives you the words for an effect and the test that separates it from taste.",
    ),
    picture: t(
      "The same Nordwind booking page twice: designed to look good, and designed to work. Choose a version and read what Mia notices, understands and does. Press “Read the comic” for a short story.",
    ),
  },
  A2: {
    idea: t(
      "Seeing is not a camera. The eye takes in light, the brain picks out what stands out, recognises patterns and then makes sense of them. Two forces steer this at once. A strong signal, such as movement, a bright colour or a large shape, pulls attention by itself (bottom-up). What a person wants, knows and expects pulls it too (top-down). When the two point to different places, people are slowed down or led astray.",
    ),
    why: t(
      "Block 1.1 asks which elements of CarePath bind or distract attention, and Block 1.2 asks you to rate three start pages on orientation and activation. You need both forces to say why an element pulls the eye and whether that helps the user.",
    ),
    picture: t(
      "First the four steps from what the eye takes in to a decision. Then one Nordwind screen in three readings: the strongest signal wins, Mia's goal leads, and both pull at once. Choose a reading and read where her eye goes. Press “Read the comic” for a short story.",
    ),
  },
  A3: {
    idea: t(
      "People never meet a screen empty-handed. They bring prior knowledge, expectations, their situation and habits: they look for the menu where other products put it and read a red colour as danger. A good interface uses this to reach three aims: orientation (where am I, what can I do, what comes next), less confusion (few competing signals, one system, plain words) and steered attention (what matters is the strongest thing on the screen).",
    ),
    why: t(
      "Block 1.1 asks you to sort CarePath's problems into categories such as orientation and cognitive load, Block 1.2 asks for orientation and understandability, and Block 2.1 asks for problems of perception and action guidance. These three aims are what you check.",
    ),
    picture: t(
      "One Nordwind screen with three switches: where am I, one main action, and the menu where people expect it. Switch them on one at a time and read what Tom can now do.",
    ),
  },
  A4: {
    idea: t(
      "People react to a design before they have thought about it. In a fraction of a second they feel whether it looks trustworthy, safe and pleasant, and that first feeling colours what follows. Five effects matter most: trust, reactance (pushing back when you feel pushed), overload, a sense of safety and plain liking. Because they work unconsciously, users rarely name them; you have to infer them from the design and say them as a hypothesis.",
    ),
    why: t(
      "Block 1.1 asks for the emotional effect of CarePath, three places where an unconscious effect could play a role, and a hypothesis per category. Block 1.2 asks about trust and activation, and Block 2.1 about trust and the off-putting upload. This card gives you the five effects and how to write one as a hypothesis.",
    ),
    picture: t(
      "The same Nordwind payment step in three tones: alarm, pressure and calm. Choose one and read what Mia feels before she has read a word. Press “Read the comic” for a short story.",
    ),
  },
  A5: {
    idea: t(
      "To put design measures in order, weigh each one on the same four questions that Block 2.1 names. Effect on users: what does it change for the people who use the product, and for how many? Feasibility: can it be done with the people and the technical room there is? Risk: what could go wrong or backfire? Time pressure: does it fit the time there is, and does it show results soon? The reason next to each rating matters more than the rating.",
    ),
    why: t(
      "Block 1.1 asks for a first prioritisation, Block 1.2 for a decision between three start pages, and Block 2.1 for four measures in order with a justification on these four criteria. The example uses Nordwind and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "Three measures Nordwind considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating. A rating is a reading of the example, not a mark.",
    ),
  },
  B1: {
    idea: t(
      "A design is not only a surface. Every choice steers what people perceive, what they understand, what they do and what they decide. A Neuro-UX strategy states the effect a company wants to create, such as orientation, trust or less overload, and then makes every touchpoint serve that one effect. Screens that each follow their own logic lose people where they move from one channel to the next.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision, three strategic decisions for 24 months and an order of touchpoints for a company that loses users between its website, portal, app and chatbot. You work from the effect you want, not from single screens.",
    ),
    picture: t(
      "The chain reads from left to right: what people perceive, understand, do and decide. Below it, the same Nordwind journey with a different logic in each channel and with one shared logic. Nothing to click.",
    ),
  },
  B2: {
    idea: t(
      "In UX the goals often pull against each other: the most attractive page is not always the clearest, a new pattern impresses while a familiar one is understood at once, and activating elements raise energy until there are too many. At management level the conflicts widen to user effect, brand image, effort, risk and economics. There is rarely one right answer, so the work is to name the conflict, choose, and say what you give up.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis (what happens if you optimise for aesthetics rather than effect) and a governance model for conflicts between marketing, compliance, IT and sales. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "The matrix places five Nordwind designs by how clear they are (to the right) and how strongly they activate (upwards). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story.",
    ),
  },
  B3: {
    idea: t(
      "A person who leads UX is accountable for the effect of design decisions: “I like it” is not a reason, an effect, a risk and a priority are. Accountability needs rules: who may decide what, who answers for it and how a conflict is settled. And because perfect information never arrives, a decision under uncertainty says four things: what you decide, what you do not know, when you would reverse it, and what you give up.",
    ),
    why: t(
      "Block 3.1 asks for a governance model, a decision under uncertainty that you can still answer for, and a statement to the board. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Nordwind. The two boxes below are the rule for future decisions. Nothing to click.",
    ),
  },
});

const M = makeMaterials(1, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
