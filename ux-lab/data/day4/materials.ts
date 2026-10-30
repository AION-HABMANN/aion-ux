import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 4 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order, with the three laws the day's title names: intuitive use as the result of design, and perception,
 * attention, memory and action; efficiency, orientation and cognitive processing, a simple surface against truly intuitive guidance, and how users take in information,
 * compare options and decide (Hick's law); expectation conformity, recognisability, a clear action logic and mental models (with Fitts's law for reaching a target); the
 * influence of cognitive load on errors, abandonment and uncertainty, and why too many options, unclear structures and inconsistent patterns weaken usability (Miller's
 * rule and working memory); UX laws as instruments against friction, searching and misoperation, and weighing a measure (effect on users, feasibility, risk, time
 * pressure, as Block 2.1 names them). Then, for Level 3: usability as a strategic factor, the conflicts between scope of functions, simplicity, time pressure and
 * feasibility, and who steers the interaction logic. Every card is Core.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Intuitive use is designed: perception, attention, memory and action"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("How people compare options and decide: Hick's law and the cost of choice"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Expectations, recognisability and a clear action logic: mental models and Fitts's law"), minutes: 13 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Memory and load: Miller's rule, and why load causes errors, abandonment and uncertainty"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("UX laws as tools against friction, and weighing a measure"), minutes: 11 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Usability as a strategic factor: reducing friction in the whole system"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicts of goals: scope of functions against simplicity, completeness against efficiency"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who owns the interaction logic, and deciding with partial user data"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Intuitive use does not happen by chance; it is the result of design decisions. Using an interface runs through four steps: people perceive what is there, attend to part of it, hold what they need in memory, and act. Each step has limits, and friction appears wherever a design asks too much of one of them. A surface can look simple, with few elements and much white space, and still not be intuitive, if people cannot tell what to do next or have to guess what an icon means.",
    ),
    why: t(
      "Block 1.1 asks where ServicePoint feels unclear or tiring and which obstacles stop intuitive use, and Block 2.1 asks for MyEnergy's problems of use and cognition. This card gives you the four steps to locate the friction and the difference between looking simple and being intuitive.",
    ),
    picture: t(
      "First the four steps from seeing to acting. Then the same Pedalo screen twice: designed to look simple and designed to be intuitive. Choose one and read what Nina can do. Press “Read the comic” for a short story. Tables of the evidence follow.",
    ),
  },
  A2: {
    idea: t(
      "People take in the options, compare them and then decide. Hick's law describes the cost: the more equally weighted options there are to choose from, the longer the decision takes. It matters most when the options are unfamiliar and look alike; a familiar, well-sorted list can be long without hurting. The way out is not to delete functions but to give the frequent choices priority, group the rest, and show them one step deeper.",
    ),
    why: t(
      "Block 1.1 asks about ServicePoint's many equal menu items and new choices after every step, Block 1.2 asks you to rate WorkFlow Hub's variant with very many options against the reduced one, and Block 2.1 asks about MyEnergy's too many equal navigation items. This card gives you the reason and the limits of Hick's law.",
    ),
    picture: t(
      "One Pedalo pass page in two forms: twelve equal passes, and three recommended passes with “All passes” below. Choose one and read how long Sam needs to decide. Press “Read the comic” for a short story. Then a second working example, the help topics in three structures, and a table of findings on choice.",
    ),
  },
  A3: {
    idea: t(
      "People bring a mental model of how things work, learnt from other products: the menu is at the top, the main button at the bottom right, the same element works the same everywhere. An interface that conforms to these expectations, keeps its elements recognisable and follows a clear action logic (what to do, in which order, and what happens) is used without thinking. Fitts's law adds the physical side: a target that is large and close is reached faster and missed less often than a small, distant one.",
    ),
    why: t(
      "Block 1.1 asks about ServicePoint's unclear path and missing feedback, Block 1.2 asks about WorkFlow Hub's changing patterns between areas, and Block 2.1 asks about MyEnergy's invisible process logic. You need mental models and a clear action logic to say why these hurt.",
    ),
    picture: t(
      "One Pedalo screen with three switches: the button where people expect it, a large target near the thumb, and the same pattern on every screen. Switch them on one at a time and read what Nina can now do. A table of the numbers and rules for targets, expectations and mental models follows.",
    ),
  },
  A4: {
    idea: t(
      "Working memory holds only a few things at once. Miller's rule (“seven, plus or minus two”) made the point; later research puts the limit nearer four chunks. When an interface makes people remember a code from one screen for the next, or compare many options in their head, the load rises, and with it errors, abandonment and uncertainty. Too many options, unclear structures and inconsistent patterns all add load. The fix is to let the system remember, show instead of asking people to recall, and keep patterns consistent.",
    ),
    why: t(
      "Block 1.1 asks about ServicePoint's intermediate steps that must be remembered, and Block 2.1 asks about MyEnergy's information to remember across steps and its unclear feedback. This card gives you the limit and what it does to errors and abandonment.",
    ),
    picture: t(
      "The same Pedalo unlock step twice: Sam has to remember a code from the previous screen, or the system carries it for him. Choose one and read what happens. Press “Read the comic” for a short story. A table of findings on memory and load follows.",
    ),
  },
  A5: {
    idea: t(
      "UX laws are tools, not decoration: each one points to a kind of friction and a kind of fix. Hick: fewer equal choices, frequent ones first. Miller: less to remember, the system remembers. Fitts: important targets large and close. Expectations: put things where people look and keep patterns the same. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure. The reason next to each rating matters more than the rating.",
    ),
    why: t(
      "Block 1.1 asks for the two biggest hurdles, Block 1.2 for a decision between three navigation variants, and Block 2.1 for four measures, their justification on these four criteria and a decision for 12 weeks. The example uses Pedalo and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "Three measures Pedalo considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating. A rating is a reading of the example, not a mark. A table on the laws of UX and where they stop follows.",
    ),
  },
  B1: {
    idea: t(
      "Usability becomes a strategic factor when it decides which work is done first. Organisations often answer usability problems with new functions, which add options and load. A leader steers the other way: reduce friction in the whole system, in the processes customers run through several channels, before adding anything. The question is not “what else can the product do?” but “where do customers search, remember and guess, and what does that cost in support and abandonment?”.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for intuitive use, three decisions on orientation, efficiency, complexity and main tasks, and an order of the systems or processes to improve first, for a company that discusses new functions while central problems remain. You decide what comes first in the whole system.",
    ),
    picture: t(
      "Left Pedalo answering problems with new functions, right reducing friction first. Below, the chain from a screen to the whole product system. Nothing to click. A table of evidence follows.",
    ),
  },
  B2: {
    idea: t(
      "Intuitive use sits between goals that pull against each other: the scope of functions against simplicity, a department's wish for completeness and visibility against efficiency for users, new users who need a calm start against experienced users who want everything in one click, and the ideal solution against time pressure and feasibility. A common way through is to keep every function, but order them: the frequent tasks first, the rest grouped and findable one step deeper. The work is to name the conflict, choose, and say what you give up.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis about user behaviour and internal requirements, and a governance model for conflicts between departments that want variety and users who need simplicity. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "The matrix places five Pedalo designs by how many functions they show at once (to the right) and how easily riders finish their task (upwards). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story. A table of conflicts with evidence follows.",
    ),
  },
  B3: {
    idea: t(
      "The interaction logic, meaning the order of tasks, the steps of each process and the patterns across channels, needs an owner, or every department adds its function wherever it likes. Departments own their content and rules; someone owns how it all fits together; and a rule decides conflicts, such as how often customers need a task and how much support it causes. Because user data is rarely complete, a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.",
    ),
    why: t(
      "Block 3.1 asks for a governance model for the interaction logic, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Pedalo. The two boxes below are the rule for future decisions. Nothing to click. A table of evidence and rules follows.",
    ),
  },
});

const M = makeMaterials(4, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
