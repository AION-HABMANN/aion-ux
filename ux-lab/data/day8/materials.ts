import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 8 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: storytelling in UX/UI design and why people process digital experiences narratively, and narrative
 * structures; the basic elements of narrative guidance (starting situation, goal, relevance, obstacle, support, progress, resolution); narrative communication against
 * narratively structured user guidance, and the dramaturgical elements of tension, expectation, sequence, transition, confirmation and emotional context; how
 * storytelling raises orientation, motivation and memorability, its link to bond and perceived relevance, and the risks of narrative overload; storytelling for
 * activation, context and the emotional embedding of user actions, and weighing a measure (effect on users, feasibility, risk, time pressure, as Block 2.1 names
 * them). Then, for Level 3: narrative UX as part of the experience and decision architecture, the conflicts between efficiency, emotionalisation, seriousness,
 * comprehensibility and brand effect, and the governance of narrative UX principles with a decision under uncertainty. Every card is Core.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Why people experience a process as a story"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("The elements of narrative guidance: from starting point to resolution"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Telling a story or guiding with one: dramaturgy in a journey"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Orientation, motivation and memorability, and the risk of overload"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Embedding an action in its context, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Narrative UX as experience architecture, not communication"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Efficiency against story: the conflicts of narrative UX"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who owns narrative UX, and deciding without seeing where people stop"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "People make sense of what they do as a story: where they started, where they want to go, what stands in the way and how far they have come. A digital process is experienced the same way, whether it was designed as a story or not. When it shows only functions and forms, people still look for the story, and when they cannot find one they feel lost, bored or left alone. Storytelling in UX/UI design means building the journey so that the story people look for is there: a beginning that shows the goal, a way that shows progress, and an end that feels like an end.",
    ),
    why: t(
      "Block 1.1 asks for the effect of StartSmart on a first-time user and for effect statements of the form “for users this could mean that …”, and Block 2.1 asks why GreenHome's complete onboarding is abandoned. This card gives you the reason a working process can still feel like no journey at all.",
    ),
    picture: t(
      "The same Lantern Kitchens planner twice: as a list of functions and as a journey. Choose one and read what Iris understands and does. Press “Read the comic” for a short story.",
    ),
  },
  A2: {
    idea: t(
      "Narrative guidance has seven elements. The starting situation: where the user is now. The goal: what they will have at the end. Relevance: why it matters for them. The obstacle: what makes it hard, said honestly. Support: what helps them over it. Progress: how far they have come. The resolution: the end, where the goal is reached and seen. A process that leaves out the goal or the progress feels endless; one that leaves out the resolution ends without a sense of achievement.",
    ),
    why: t(
      "Block 1.1 asks for five places where StartSmart's narrative guidance is missing and for its two biggest weaknesses, and Block 2.1 asks for GreenHome's central narrative deficits. This card gives you the seven elements to say which part of the journey is missing.",
    ),
    picture: t(
      "One Lantern Kitchens planner with three switches: a goal, visible progress and a resolution. Switch them on one at a time and read how Pavel's journey changes. Press “Read the comic” for a short story.",
    ),
  },
  A3: {
    idea: t(
      "Telling a story about a product (a video, a slogan, a brand story) is not the same as guiding people with a story. Narratively structured guidance builds the journey itself: tension (something is at stake), expectation (people know what comes next), sequence (the steps follow a logic people can feel, not an administrative one), transition (each step leads to the next), confirmation (a finished step is acknowledged) and emotional context (the step is framed by what it means for them). Most of it lives in small places: the first screen, the line between two steps, the message after a step is done.",
    ),
    why: t(
      "Block 1.1 asks about StartSmart's missing transitions and steps that are not picked up, Block 1.2 asks you to judge a strongly narrative journey against an efficient one, and Block 2.1 asks about GreenHome's administrative sequence and transitions. This card gives you the dramaturgical means to name them.",
    ),
    picture: t(
      "The moment between two steps of the Lantern Kitchens planner, written three ways: a bare Next, a staged scene and a short transition. Choose one and read what Iris does. Press “Read the comic” for a short story.",
    ),
  },
  A4: {
    idea: t(
      "A clear story raises three things. Orientation: people know where they are and what comes next. Motivation: they see that they are getting closer. Memorability: they remember the journey and its end. Narrative clarity, emotional bond and perceived relevance go together: when people see why a step matters for them, they feel the product is for them. But storytelling can overload: too much staging, too little clarity, more text and longer paths. Then it costs efficiency and trust instead of building them.",
    ),
    why: t(
      "Block 1.1 asks for StartSmart's two biggest weaknesses, Block 1.2 asks you to rate three journeys on orientation, motivation, relevance, efficiency and experience quality and to name the conflicts between efficiency and dramaturgy, and Block 2.1 warns against measures that are only staging. This card gives you what a story does and where it stops helping.",
    ),
    picture: t(
      "The matrix places five Lantern Kitchens journeys by how much story they carry (upwards) and how clear and quick they stay (to the right). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story.",
    ),
  },
  A5: {
    idea: t(
      "Storytelling can activate people, give them context and embed what they do in a meaning. Activation: a goal and a next step make it easy to begin. Context: a line that says why a question is asked turns a demand into a reason. Emotional embedding: a finished step framed as progress towards their own goal feels like an achievement, not like paperwork. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure.",
    ),
    why: t(
      "Block 1.2 asks for a decision between three journeys, and Block 2.1 asks for four measures, their justification on these four criteria and a decision for 12 weeks. The example uses Lantern Kitchens and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "First the chain from an action to its meaning for the user. Then three measures Lantern Kitchens considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating.",
    ),
  },
  B1: {
    idea: t(
      "In many companies storytelling is a matter for communication: the brand story on the website, a campaign film. But the journey people experience is built by product teams, step by step, usually from the specialist logic. Narrative UX means designing that journey on purpose: a guiding vision for how every journey begins, carries people and ends, patterns for entries, progress, transitions and endings, and someone who owns them. At senior level it becomes a design logic for relevance, activation and bond, and part of the decision architecture.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for narrative UX, three decisions on entry, dramaturgical guidance, the experience of progress and narrative relevance, and an order of which journeys, touchpoints or interactions come first, for a company that sees storytelling as communication. You decide the journeys, not the texts.",
    ),
    picture: t(
      "Left Lantern Kitchens treating storytelling as communication, right building it into the experience architecture. Below, the layers from a guiding vision to every step. Nothing to click.",
    ),
  },
  B2: {
    idea: t(
      "Narrative UX sits between goals that pull against each other: efficiency against dramaturgy (people with little time against a journey with moments), emotionalisation against seriousness (inspiring against credible), comprehensibility against staging (plain steps against a story), and brand effect against the user's task (what marketing wants to tell against what the user came to do). The way through is to use story only where it serves the task, keep it short, and decide by journey: a long, important journey needs more guidance than a quick routine one.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis of wrong assumptions about user needs, storytelling and seriousness, and a governance model for conflicts between clarity, brand and experience quality. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "Three Lantern Kitchens journeys of different length and weight, with how much narrative guidance each needs. Choose one and read what fits and what would harm. Press “Read the comic” for a short story.",
    ),
  },
  B3: {
    idea: t(
      "Narrative UX lives only with governance: someone who owns the principles and the patterns, the experts who check that the story never blurs the facts, marketing who owns the brand story, and a rule for when they disagree. Data on journeys is often incomplete; people cannot be seen where they stop. A decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. An entry, a progress display and a transition are cheap to change and quick to check, which makes them a safe start.",
    ),
    why: t(
      "Block 3.1 asks for a governance model for narrative UX principles, a decision despite patchy data, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Lantern Kitchens. The two boxes below are the rule for future decisions. Nothing to click.",
    ),
  },
});

const M = makeMaterials(8, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
