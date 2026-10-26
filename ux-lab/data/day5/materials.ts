import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 5 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: Fitts's law (target size, distance, speed; click areas, touch targets, button sizes and position); Hick's
 * law (number of options and decision time; fewer options, clear priority, staged choices); Miller's rule (limited short-term processing; chunking, structure,
 * memorability); the differences and interplay of the three laws on navigation, interaction and interface elements, with reaction time, error probability and cognitive
 * load; how good UX reduces search, operating errors and decision stress, and weighing a measure (effect on users, feasibility, risk, time pressure, as Block 2.1 names
 * them). Then, for Level 3: interaction decisions as an architecture of effect, the conflicts between feature richness, speed, simplicity, brand and feasibility, and who
 * owns the interaction standards. Every card is Core.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Fitts's law: target size, distance and position, on a screen and under a thumb"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Hick's law: fewer options, clear priority and staged choices"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Miller's rule: chunking, structure and what people can hold in mind"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("The three laws together: reaction time, errors and load on navigation and interaction"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Less searching, fewer errors, less decision stress, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Interaction as an architecture of effect: the laws as standards, not details"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicts of goals: feature richness, speed, simplicity, brand and feasibility"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who owns the interaction standards, and deciding with incomplete data"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Fitts's law says that the time to hit a target grows with its distance and shrinks with its size. On a screen that means: important buttons and links must be large enough and close to where the pointer or the thumb already is. On a phone, people often hold the device in one hand, and the thumb reaches the lower middle of the screen easily and the top corners badly. Targets that are small, far away or packed close together are slow to hit and easy to miss.",
    ),
    why: t(
      "Block 1.1 asks about BankDirect's small top-right transfer link, its buttons close together and its small mobile buttons, and Block 2.1 asks about MoveEasy's small, badly placed booking buttons and touch targets. This card gives you size, distance, spacing and the thumb's reach.",
    ),
    picture: t(
      "One Ticketo checkout on a phone with three switches: a larger Pay button, placed where the thumb reaches, and space between the buttons. Switch them on one at a time and read what Leon's thumb does. Press “Read the comic” for a short story.",
    ),
  },
  A2: {
    idea: t(
      "Hick's law says that the more equally weighted options people choose between, the longer the choice takes. Three things help. Fewer options at once: show what most people need. Clear priority: make the likely choice stand out. Staged choices: split one large choice into a few small ones (first the day, then the film, then the time), each with only a few options. Staging has a price: every stage is a step, and too many steps become a hurdle of their own.",
    ),
    why: t(
      "Block 1.1 asks about BankDirect's 14 equal menu options, Block 1.2 asks you to rate AdminFlow's all-at-once, staged and minimalist variants, and Block 2.1 asks about MoveEasy's too many options and equal choices in every step. This card gives you the three ways to lower decision effort and the limit of reduction.",
    ),
    picture: t(
      "The same Ticketo choice in two forms: every showing of the week at once, and staged by day, film and time. Choose one and read how long Mara needs. Press “Read the comic” for a short story.",
    ),
  },
  A3: {
    idea: t(
      "Miller's rule says that short-term memory holds only a small number of items; later research puts it nearer four. Two things help. Chunking: group items into a few meaningful units, such as a booking code in blocks of three, or seat, time and price in one box. Structure: put what belongs together together, and show information where it is needed, so it does not have to be carried from one screen to the next. What people must remember is a common source of typing errors and wrong choices.",
    ),
    why: t(
      "Block 1.1 asks about BankDirect's crowded forms and the numbers and options users must remember at once, and Block 2.1 asks about MoveEasy's tariffs and conditions to remember. This card gives you chunking and structure as fixes.",
    ),
    picture: t(
      "The same Ticketo confirmation twice: a long code and scattered details, and a chunked code with the details in one box. Choose one and read what Leon can repeat at the cinema. Press “Read the comic” for a short story.",
    ),
  },
  A4: {
    idea: t(
      "The three laws describe different things: Fitts the hand (reaching a target), Hick the decision (choosing between options), Miller the memory (holding information). On a real screen they work together. A menu can be slow because its items are small (Fitts), because there are many of them (Hick) and because the labels have to be compared in the head (Miller). Each adds reaction time, and each raises the chance of an error; together they raise the cognitive load. Small click targets, overloaded menus and too much information at once weaken use for that reason.",
    ),
    why: t(
      "Block 1.1 asks you to assign BankDirect's problems to the three laws, Block 1.2 asks you to rate AdminFlow on reachability, decision effort and memory load, and Block 2.1 asks you to sort MoveEasy's problems by reachability, decision effort, memory load, mobile usability and error risk. This card shows how to tell the laws apart and how they combine.",
    ),
    picture: t(
      "One Ticketo menu with three switches, one per law: larger items, fewer items, and labels grouped by meaning. Switch them on one at a time and read what changes for Mara.",
    ),
  },
  A5: {
    idea: t(
      "Good UX design reduces three things the laws explain: searching (where is it?), operating errors (the wrong tap, the wrong choice, the wrong number) and decision stress (too many similar options). The laws give efficient user guidance a basis, beyond how a screen looks. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure. The reason next to each rating matters more than the rating.",
    ),
    why: t(
      "Block 1.1 asks for the two biggest weaknesses for efficiency and error risk, Block 1.2 for a decision between three navigation variants, and Block 2.1 for four measures, their justification on these four criteria and a decision for 10 weeks. The example uses Ticketo and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "Three measures Ticketo considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating. A rating is a reading of the example, not a mark.",
    ),
  },
  B1: {
    idea: t(
      "An interaction decision is not a detail. The size of a button, the number of options in a menu and the way a form groups information decide how fast and safely thousands of people use a product, and how many call support. At senior level the three laws become steering tools: they are written down as interaction standards (minimum target sizes, a limit on equal options, a rule for chunking) that every team follows, so the product is fast and safe by design instead of fixed screen by screen.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for efficient interaction, three decisions on reachability, choice, information and main actions, and an order of what is improved first, for a company that adds functions while known interaction problems stay. You decide standards, not single buttons.",
    ),
    picture: t(
      "Left Ticketo fixing details one screen at a time, right deciding interaction standards once. Below, the chain from a button to the business. Nothing to click.",
    ),
  },
  B2: {
    idea: t(
      "Efficient interaction sits between goals that pull against each other: feature richness against speed of use, everything visible against few, large targets, a minimal brand look against reachable buttons, and the ideal against what is technically feasible now. Reduction is not always the answer: hiding options behind many steps can be slower than showing them. The way through is to give the main actions size and priority, keep the rest reachable, and say what each choice gives up.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis about user behaviour and the need for functions, and a governance model for conflicts between feature richness and usability. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "The matrix places five Ticketo designs by how many options they show at once (to the right) and how fast and safely people finish (upwards). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story.",
    ),
  },
  B3: {
    idea: t(
      "Interaction standards hold only when someone owns them and a rule decides when a team wants an exception: how often a function is needed and what errors and support data say. Because data is rarely complete, a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. A small interaction problem becomes a strategic business problem when it repeats on every visit: then it costs support, abandoned processes and customers.",
    ),
    why: t(
      "Block 3.1 asks for a governance model for the interaction standards, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Ticketo. The two boxes below are the rule for future decisions. Nothing to click.",
    ),
  },
});

const M = makeMaterials(5, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
