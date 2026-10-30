import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 14 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow
 * the plan's Wissen cell: classic against immersive interfaces and the technologies (AR, VR, MR, spatial interfaces, sensory interaction, context-adaptive
 * systems); space, presence, attention, embodiment and multisensory perception with the neuroscience basics (attention, cognitive load, perception steering,
 * stimulus processing, decision behaviour); intensify or overwhelm, with chances and risks; real user value, innovation, maturity and marketability; ethics and
 * responsibility, with weighing a measure. Then, for Level 3: future technologies as decision architecture and portfolio; the conflicts between innovation, user
 * value, maturity, investment risk, ethics and feasibility; and governance with stage gates and a decision under uncertainty. Every card is Core.
 *
 * Ideas kept from the original Day 14 (ten widgets with 3D scenes, /day/14/original/): Flat against spatial (A1), the AR overlay on a real object (A1, with its
 * bundled 3D models), the cognitive-load and "intensify or overwhelm" widgets (A2, A3), "fascination against impact" (A4) and the ethics and reputation widgets
 * (A5, B2). Its training ground's XP and badges are left out: they reward clicking, not judgement. Its cases were the plan's own, so the cards use a made-up company.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("From screen to space: AR, VR, MR and other future interfaces"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Presence, attention and load: what the brain does in immersive space"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Intensify or overwhelm: the chances and risks of immersive UX"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Fascination or impact: user value, maturity and marketability"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Ethics and responsibility, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Future technologies as decision architecture, not a trend"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Innovation, value, maturity, risk, ethics: the conflicts of the future"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who decides on future technologies, and deciding without test data"), minutes: 20 },
]);

const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Classic interfaces are flat: a screen you look at. Immersive interfaces put content into space. Augmented reality (AR) lays digital information over the real world; virtual reality (VR) replaces the world with a digital one; mixed reality (MR) lets digital objects sit in and react to the real room. Spatial interfaces use position and depth, sensory interaction adds touch, sound or gesture, and context-adaptive systems change with the situation. Each solves different problems, at different cost and maturity.",
    ),
    why: t(
      "Block 1.1 asks what BuildVision's AR overlays and spatial visualisation add, Block 1.2 rates HealthSpace's AR and VR designs, and Block 2.1 asks which of IndustryXR's ideas offer real immersive value. This card tells the technologies apart.",
    ),
    picture: t("A real 3D Brewline coffee machine you can turn: as a flat picture, as a 3D object, and with AR labels anchored to its parts. On a phone, “View in your space” places it on your table. Press “Read the comic” for a short story."),
  },
  A2: {
    idea: t(
      "In immersive space people feel present: they are “there”. Space, presence, attention, embodiment (using the body) and several senses at once make experiences intense. The brain's limits stay the same: attention is narrow, working memory small, and every overlay, sound and movement competes for it. Good immersive design steers perception (what people notice first), keeps cognitive load low, and remembers that decisions under stress follow the most visible cue, not the most important one.",
    ),
    why: t(
      "Block 1.1 asks why BuildVision's users are impressed but overwhelmed in stressful situations, Block 1.2 about acceptance of immersive formats, and Block 2.1 about IndustryXR's attention steering and overload risks. This card explains what immersion does to attention and load.",
    ),
    picture: t("The same Brewline machine with two AR labels, with nine, and with nine plus movement and sound cues. Move the slider and read when guidance turns into noise. Press “Read the comic” for a short story."),
  },
  A3: {
    idea: t(
      "Immersive technology can intensify an experience or overwhelm it. Its chances: better visualisation (seeing inside a machine), support in the situation (help at the object), training (practising without risk), experiencing complex content (a building before it is built), and new forms of interaction. Its risks: stimulus overload, disorientation, low acceptance, technical hurdles (devices, connection, light, noise) and high implementation effort. The same feature can be a help in a quiet room and a burden in a stressful moment.",
    ),
    why: t(
      "Block 1.1 asks for BuildVision's chances and risks and its two biggest of each, Block 1.2 for HealthSpace's risks, and Block 2.1 for IndustryXR's central chances and risks. This card gives you both lists by name.",
    ),
    picture: t("The Brewline descaling guide in AR, once on a quiet Sunday and once with a crying child, a beeping machine and a weak connection. Choose one and read what changes. Press “Read the comic” for a short story."),
  },
  A4: {
    idea: t(
      "A future technology is relevant only when it creates real value for users: it solves a real problem better than a classic interface would. Four things decide together: the user's need, the innovation itself, its maturity (does it work reliably, in the real environment, for real users?) and its marketability (will people use it, can it be built and paid for at scale?). Fascination is not a reason; many impressive demos solve nothing.",
    ),
    why: t(
      "Block 1.1 asks which of BuildVision's uses are helpful and which only demonstrative, Block 1.2 rates user value, maturity and economics, and Block 2.1 asks to prioritise IndustryXR's use cases by value and feasibility. This card gives you the test.",
    ),
    picture: t("Brewline's five ideas placed by user value and maturity. Select one to read why it sits where it does. Below, the steps from an idea to a product in use."),
  },
  A5: {
    idea: t(
      "Immersive and neuro-based interfaces raise their own ethical questions: cameras that scan homes and workplaces, data about where people look and how their body moves, motion sickness and exhaustion, exclusion of people who cannot use headsets, and attention steering that can slip into manipulation. Responsible leaders prioritise future technologies by effect, economics and responsibility, not by fascination. To put measures in order, weigh each on effect on users, feasibility, risk, time pressure and investment security.",
    ),
    why: t(
      "Block 1.2 asks about trust and risk in health, and Block 2.1 asks for four prioritised measures for IndustryXR, justified on effect on users, feasibility, risk, time pressure and investment security. The example uses Brewline and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t("Five ethical questions asked of three Brewline ideas. Then three measures rated on five criteria. Select a cell to read the reason for its rating."),
  },
  B1: {
    idea: t(
      "At senior level, future technologies are not a trend to follow but a decision architecture for innovation, service quality and differentiation: a guiding vision of what immersive value the company wants, a portfolio that separates watching, piloting and scaling, an evaluation grid (value, maturity, effort, scaling potential, responsibility), and stage gates where a pilot must prove itself before it grows. Innovation is managed like an investment, not like a showcase.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for future UX innovation, three decisions on technology use, maturity assessment, user value and portfolio, and an order of which use cases, touchpoints or product areas are piloted first. You decide the architecture, not single trend technologies.",
    ),
    picture: t("Left Brewline chasing headsets to look innovative, right running an innovation portfolio with gates. Below, the layers from a guiding vision to every pilot. Nothing to click."),
  },
  B2: {
    idea: t(
      "Future technologies sit between goals that pull apart: the degree of innovation against user value, visibility against maturity, investment risk against the risk of falling behind, ethics against speed, and all of them against feasibility. The way through is a portfolio: a few bets of different size and maturity, each with a reason, success measures set in advance, and a date to decide whether to scale, change or stop; and a written list of the assumptions each bet rests on.",
    ),
    why: t(
      "Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about innovation, user behaviour, market maturity and economics, and a governance model for conflicts between visibility, effect, risk and effort. Each is a decision between conflicting goals.",
    ),
    picture: t("Brewline's three bets, a safe one, a medium one and a bold one, with what each costs and what it can teach. Choose one and read why. Press “Read the comic” for a short story."),
  },
  B3: {
    idea: t(
      "Future technologies need owners and gates: someone who owns the innovation portfolio, an evaluation grid used for every idea, stage gates with success measures set before a pilot starts, the right to stop a pilot (it is not a failure), and a rule for when visibility, effect, risk and effort disagree. Real test data is usually missing at the start; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.",
    ),
    why: t("Block 3.1 asks for a governance model for future technologies in the UX portfolio, a decision despite missing tests, and a statement to the management. This card gives you the parts of each."),
    picture: t("The four boxes at the top are the parts of a decision, filled in for Brewline. The two boxes below are the rule for future decisions. Nothing to click."),
  },
});

const M = makeMaterials(14, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
