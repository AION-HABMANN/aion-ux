import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 7 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: emotional bonding, psychology and neuro-design, and how emotions act on attention, motivation, trust,
 * memory and decisions; functional usability against emotional experience quality, and the emotional factors of UX (safety, control, joy, belonging, frustration,
 * uncertainty, recognition); how visual stimuli, interaction patterns, tone and feedback create emotional effect; short activation against lasting use, and the risks
 * of over-emotionalisation, manipulation and incongruent address; trust as the link between cognitive and emotional effect, and weighing a measure (effect on users,
 * feasibility, risk, time pressure, as Block 2.1 names them). Then, for Level 3: emotional UX as part of the UX architecture and a leadership task, the conflicts
 * between seriousness, closeness, activation and credibility, and the governance of emotional UX principles with a decision under uncertainty. Every card is Core.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Emotions steer behaviour: attention, motivation, trust, memory and decisions"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Usable is not enough: the emotional factors of an experience"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Where feelings come from: visual mood, interaction, tone and feedback"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Activation, overload and manipulation: when emotion turns against use"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Trust and perceived competence, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Emotional UX as part of the UX architecture, not a campaign"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Seriousness against closeness: the conflicts of emotional UX"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who owns emotional UX, and deciding with little data on feelings"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "People feel before they judge. Within moments a screen makes them feel welcome or distant, safe or unsure, and that feeling steers what they do next: where they look (attention), whether they go on (motivation), whether they believe what they read (trust), what they remember afterwards (memory) and what they choose (decisions). Psychology and neuro-design study these effects. Emotional bonding is the result over time: the sense that a product is on your side, which makes people come back.",
    ),
    why: t(
      "Block 1.1 asks for the spontaneous emotional effect of WellTrack on a first-time user and for effect statements of the form “for users this could mean that …”. This card gives you the five things a feeling acts on, so you can say what it does.",
    ),
    picture: t(
      "The same Moss & Pine order confirmation twice: cold and warm. Choose one and read what Hana feels, does and remembers. Press “Read the comic” for a short story.",
    ),
  },
  A2: {
    idea: t(
      "A product can be usable and still a poor experience. Usability asks whether people can reach their goal; emotional experience quality asks how it feels on the way and afterwards. The emotional factors that matter most in UX are safety (I know what is happening), control (I can steer and undo), joy (something is pleasant), belonging (this is for people like me), recognition (my effort is seen), and their opposites: frustration and uncertainty. A screen can pass every usability check and still leave people unsure, unseen or frustrated.",
    ),
    why: t(
      "Block 1.1 asks you to sort WellTrack's observations into trust, safety, motivation, frustration, closeness and experience quality, Block 1.2 asks you to rate three designs on trust, motivation, safety, clarity and experience quality, and Block 2.1 asks you to sort LifeSupport's problems into five such categories. This card gives you the factors to name what you see.",
    ),
    picture: t(
      "One Moss & Pine checkout with three switches: safety, control and recognition. Switch them on one at a time and read how Jonas feels about the same, equally usable step. Press “Read the comic” for a short story.",
    ),
  },
  A3: {
    idea: t(
      "Feelings in a product are not added by a campaign; they come from four things on the screen. Visual mood: colour, images, space and type set a temperature before anything is read. Interaction patterns: what happens when people act, how fast, and whether they can undo. Tone: the words, above all in microcopy, error messages and confirmations. Feedback: whether the product says what happened, what comes next and that it went well. Most of the emotional effect sits in feedback and tone at the critical moments: an error, a wait, a success.",
    ),
    why: t(
      "Block 1.1 asks about WellTrack's technical errors and missing positive feedback, Block 1.2 asks about CareerPath's unclear feedback, and Block 2.1 asks about LifeSupport's distant visual language, technical feedback and correct but cold tone. This card gives you the four sources to say where a feeling comes from.",
    ),
    picture: t(
      "One Moss & Pine error message written three ways: technical, cheerful and supportive. Choose one and read what Hana does next. Press “Read the comic” for a short story.",
    ),
  },
  A4: {
    idea: t(
      "Emotion can activate people for a moment or bond them for years, and the two are not the same. Many stimuli, badges, countdowns and exclamation marks raise activation, but they can overload, tire and feel pushy. Over-emotionalisation is more feeling than the situation carries; incongruent address is a feeling that does not fit it, such as cheerfulness about a worry. Manipulation, often called dark patterns, uses emotion against people's own interest: false urgency, guilt, hidden costs. Lasting use comes from feelings that fit the situation and keep their promise.",
    ),
    why: t(
      "Block 1.1 asks for WellTrack's two biggest emotional weaknesses, Block 1.2 asks you to judge CareerPath's Variant A with many emotional stimuli and to name the conflicts between emotionalisation and credibility, and Block 2.1 warns against measures that are only decoration. This card gives you the line between activation and manipulation.",
    ),
    picture: t(
      "The matrix places five Moss & Pine messages by how strongly they activate (upwards) and how well they fit the situation (to the right). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story.",
    ),
  },
  A5: {
    idea: t(
      "Trust is where thinking and feeling meet. People trust a product when it seems competent (it knows what it is doing), honest (it says what will happen) and benevolent (it is on their side), and they judge all three from small signals: a clear confirmation, an error message that does not blame, information that says where it comes from. A beautiful design raises perceived competence at first; broken promises lower it fast. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure.",
    ),
    why: t(
      "Block 1.1 asks about WellTrack's health information that does not build trust, Block 1.2 asks you to rate trust in three designs and choose one, and Block 2.1 asks for four measures, their justification on these four criteria and a decision for 12 weeks. The example uses Moss & Pine and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "First the chain from a small signal to trust and use. Then three measures Moss & Pine considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating.",
    ),
  },
  B1: {
    idea: t(
      "In many companies emotion is treated as a marketing question: a campaign, a slogan, a nicer picture. But what people feel in a product comes mostly from its feedback, its tone in critical moments and its interaction logic, which product teams build every day. Emotional UX therefore belongs in the UX architecture: principles for how every touchpoint should feel, a tone guide, patterns for confirmations, errors and waiting, and someone who owns them. At senior level it becomes a leadership task when it shapes loyalty, acceptance and how the company is perceived.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for emotional UX, three decisions on trust, emotional safety, motivation and supportive interaction, and an order of which touchpoints, interactions or communication patterns come first, for a company that sees emotion as marketing. You decide the principles, not the pictures.",
    ),
    picture: t(
      "Left Moss & Pine treating emotion as a campaign, right building it into the UX architecture. Below, the layers from a guiding vision to every message. Nothing to click.",
    ),
  },
  B2: {
    idea: t(
      "Emotional UX sits between goals that pull against each other: seriousness against closeness (a brand that must be credible and approachable), activation against credibility (more stimuli against looking like a sales channel), brand effect against user effect (what marketing wants to say against what a worried user needs to hear), and speed against care. Over-emotionalisation and manipulation are not only design faults but strategic risks: they weaken credibility and acceptance. The way through is to fit the feeling to the situation, write the rule down, and say what each choice gives up.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis of wrong assumptions about emotional effect, credibility and user behaviour, and a governance model for conflicts between brand, expertise and user effect. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "The same Moss & Pine reminder for four situations, with the feeling each one needs. Choose a situation and read which tone fits and which would harm. Press “Read the comic” for a short story.",
    ),
  },
  B3: {
    idea: t(
      "Emotional quality lives only with governance: someone who owns the principles and the tone guide, the experts who check that a warm message is still correct, marketing who owns the brand, and a rule for when they disagree. Data on feelings is rarely complete, so a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. Small, reversible changes to words and feedback are the safest place to start, because they can be checked soon.",
    ),
    why: t(
      "Block 3.1 asks for a governance model for emotional UX principles, a decision despite patchy data, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Moss & Pine. The two boxes below are the rule for future decisions. Nothing to click.",
    ),
  },
});

const M = makeMaterials(7, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
