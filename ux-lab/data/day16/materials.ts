import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 16 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow
 * the plan's Wissen cell: the practical implementation of immersive prototyping and testing, the difference between a concept idea, a prototype, a pilot and a
 * scalable solution, and what an immersive prototype must have (context of use, clarity of interaction, technical robustness, resilience, testability); the test
 * aspects (orientation, presence, overload, error robustness, acceptance, transfer to real use); technological feasibility against a responsible UX strategy, with
 * the ethical questions (data protection, voluntariness, manipulation, cognitive overload, transparency, accessibility, inclusion); responsible, connectable and
 * governable, with innovation maturity, organisational learning and the UX portfolio; and when not to scale, with weighing a measure. Then, for Level 3: a future
 * architecture grown from experiments, pilots and research; the conflicts between innovation pressure, ethics, economics, user value, maturity and the long-term
 * portfolio; and who decides to scale, pause or stop. Every card is Core.
 *
 * Ideas kept from the original Day 16 (The Ladder, The Test Bench, The Portfolio Room and the NextWorld case, /day/16/original/): the ladder from concept to
 * scalable with a gate at each rung and a stress test (A1), the test bench with its six aspects and an evidence grade (A2), the portfolio board with its tension
 * sliders and quarter log (A4, B2), the go/no-go meeting (B3). Its cases were the plan's own, so the cards use a made-up company.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("From concept idea to scalable solution: the ladder of immersive prototyping"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Testing immersive systems: orientation, presence, overload, error robustness, acceptance, transfer"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Feasible or responsible: future-proof UX strategy and its ethical questions"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Responsible, connectable, governable: maturity, learning and the UX portfolio"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("When not to scale, and weighing a scaling decision"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Future-proof UX as a responsible innovation and decision architecture"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Innovation pressure, ethics, economics, value, maturity, portfolio: the conflicts"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who decides to scale, pause or stop, and deciding with incomplete data"), minutes: 20 },
]);

const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "An immersive idea climbs a ladder. A concept idea describes what could be. A prototype makes one question testable, for example “can guests find their room with AR arrows?”. A pilot puts a working version in front of real users in one place for a limited time. A scalable solution keeps working for many people, places and devices, with support and maintenance. Each rung proves something different, and each needs a gate before the next. An immersive prototype must fit the context of use, make the interaction clear, be technically robust, cope with stress (resilience) and be testable.",
    ),
    why: t(
      "Block 1.1 asks where RealityFlow's prototyping is not clarified enough, Block 1.2 compares strategies that climb at different speeds, and Block 2.1 asks which of NextWorld UX's prototypes is ready to scale. This card gives you the rungs and what each must prove.",
    ),
    picture: t("Fernwood's AR wayfinding on four rungs: a sketch, a prototype, a pilot in one hotel, and forty hotels. Switch between them and read what each proves and what it cannot. Below, the five requirements a prototype must meet. Press “Read the comic” for a short story."),
  },
  A2: {
    idea: t(
      "Immersive systems need tests that a screen never needed. Orientation: do people know where they are and where to go? Presence: do they feel there, and is that helpful? Overload: is it too much to take in? Error robustness: what happens when the signal drops or someone makes a mistake? Acceptance: will people use it again, all kinds of people? Transfer: does what works in the test work in real use, with noise, time pressure and other people? Transfer is the most underestimated, and the most decisive for scaling.",
    ),
    why: t(
      "Block 1.1 asks where RealityFlow's testing is unclear, and Block 2.1 asks why NextWorld UX's feedback cannot be compared and what makes a prototype ready to scale. This card gives you the six aspects and a way to test each.",
    ),
    picture: t("Fernwood's AR arrow under test. Turn up the crowd, drop the signal or dim the light and see what happens to the arrow. Below, the six test aspects with how to test each. Press “Read the comic” for a short story."),
  },
  A3: {
    idea: t(
      "Technological feasibility asks “can we build it?”. A responsible UX strategy asks “should we, for whom, and how?”. New interaction and neurotechnologies raise seven ethical questions: data protection (what is recorded), voluntariness (can people say no), potential for manipulation (does it steer people for us), cognitive overload (is it too much), transparency (do people know what happens), accessibility (can everyone use it) and inclusion (who is left out). They are cheapest to answer at the concept stage and most expensive after scaling.",
    ),
    why: t(
      "Block 1.1 asks where RealityFlow's ethics are unclear, Block 1.2 rates the ethics of three strategies, and Block 2.1 asks to build ethics into the scaling logic. This card gives you the questions by name.",
    ),
    picture: t("Left Fernwood asking “can we build it?”, right “should we, and how?”. Below, the seven ethical questions asked of three Fernwood ideas. Press “Read the comic” for a short story."),
  },
  A4: {
    idea: t(
      "A new technology must be not only innovative but responsible (it does no avoidable harm), connectable (it fits the products, processes and systems the company already runs) and governable (someone can decide about it, measure it and stop it). How far a company can go depends on the maturity of the technology and on its own ability to learn: an organisation that tests, compares and decides well can hold more bold bets. Together they shape the UX portfolio: what is scaled, what is tested further, what is paused, what is stopped.",
    ),
    why: t(
      "Block 1.1 asks about RealityFlow's scalability and organisational capability, Block 1.2 rates capacity to innovate and steerability, and Block 2.1 asks to focus NextWorld UX's portfolio. This card gives you the three tests and the four moves of a portfolio.",
    ),
    picture: t("Fernwood's five initiatives on a portfolio board. Select one to read whether it is responsible, connectable and governable, and what Fernwood does with it. Below, how experiments grow into a steerable future architecture."),
  },
  A5: {
    idea: t(
      "Not scaling can be the best decision. Signs that a technology should not be scaled yet: it impresses but is rarely used again; it works only for some users; it has not been tested in real use; its ethics are not settled; the organisation cannot support it; or it does not fit the strategy. To put measures in order, weigh each on effect on users, feasibility, risk, time pressure and strategic viability, with a reason for every rating.",
    ),
    why: t(
      "Block 1.1 asks for the biggest strategic risks, and Block 2.1 asks for four measures for a responsible scaling decision, justified on effect on users, feasibility, risk, time pressure and strategic viability. The example uses Fernwood and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t("Six signs that Fernwood should not scale yet, as a checklist you can try on its AR minibar. Then three measures rated on five criteria. Select a cell to read the reason for its rating."),
  },
  B1: {
    idea: t(
      "At senior level, future-proof UX is a responsible innovation and decision architecture: a guiding vision of the innovation and responsibility the company wants, one evaluation grid with comparable evidence, gates from prototype to pilot to scale with ethics built in, and a portfolio reviewed regularly. A steerable future architecture grows out of experiments, pilots and research when each one ends in a decision, not in a demo.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for future-proof UX, three decisions on prototyping, testing, scaling, ethics and portfolio, and what continues, pauses or ends. You decide the architecture, not single technologies.",
    ),
    picture: t("Left Fernwood collecting experiments, right running a steerable future architecture. Below, the layers from a guiding vision to every pilot. Nothing to click."),
  },
  B2: {
    idea: t(
      "Future-proof UX sits between goals that pull apart: innovation pressure against maturity, ethics against speed, economic viability against the pioneer role, user value against visibility, and the next quarter against the long-term portfolio. More active lines bring more visibility and less learning per line; fewer lines bring focus and the risk of missing something. A good portfolio states which conflicts it accepts, and writes down what each line assumes.",
    ),
    why: t(
      "Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about future technologies, market maturity, user acceptance and governance, and a governance model for conflicts. Each is a decision between conflicting goals.",
    ),
    picture: t("A slider for how many lines Fernwood runs at once, from one to five. Move it and read what is gained and lost. Press “Read the comic” for a short story."),
  },
  B3: {
    idea: t(
      "Scaling needs owners: someone who owns the evaluation grid and scores every initiative, an ethics and data protection review that approves before a pilot and before scaling and may stop anything, a board that decides at each gate to scale, test further, pause or stop, and a regular portfolio review. With incomplete data, a decision says what it decides, what it does not know, when it would reverse and what it gives up.",
    ),
    why: t("Block 3.1 asks for a governance model for innovation evaluation, ethical approvals, scaling decisions and portfolio adjustments, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each."),
    picture: t("The four boxes at the top are the parts of a decision, filled in for Fernwood. The two boxes below are the rule for future decisions. Nothing to click."),
  },
});

const M = makeMaterials(16, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
