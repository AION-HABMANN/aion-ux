import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 9 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: gamification strategies for activation and retention, and the difference between gamification,
 * playful design and a complete game; why people react to progress, feedback, recognition, challenge and goal attainment, and the motivation mechanisms (reward,
 * competence, self-efficacy, social validation, the experience of progress, activation triggers); the chances and limits of points, badges, levels, challenges,
 * streaks, feedback mechanics and status displays, and the risks of bad gamification (manipulation, overstimulation, reward inflation, loss of motivation, damage to
 * trust); integrating storytelling and gamification, and short-term activation against sustainable retention; intrinsic motivation and emotional experience, the
 * conditions for credible gamification in serious fields, and weighing a measure (effect on users, feasibility, risk, time pressure, as Block 2.1 names them).
 * Then, for Level 3: gamification as activation and experience architecture rather than a surface mechanic; the conflicts between motivation, seriousness, user
 * autonomy, brand effect and economic viability; and the responsibility of leaders, governance and a decision under uncertainty. Every card is Core.
 *
 * Ideas kept from the original Day 9 (the Activation Lab, /day/9/original/): the three layers (structure, tone, fiction), "information about your own position",
 * the lever under every mechanic, "stacking mechanics does not stack motivation", "trust damage does not repair", "the story makes the same mechanics mean more",
 * "the reporting window chooses the winner", the overjustification effect, the four questions before a mechanic ships, and "adding a mechanic needs a champion,
 * removing one needs a business case". Its health and learning examples are replaced by another company, so no task is answered on a card.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Gamification, playful design and a game: three different requests"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Why people react to progress, feedback and recognition: the levers under a mechanic"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Points, badges, levels, streaks: what each tool does, and how gamification goes wrong"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Story and game together, and a quick spike against lasting use"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Intrinsic motivation, credible gamification in serious fields, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Gamification as activation architecture, not a game layer"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Motivation against seriousness and autonomy: the conflicts of activation"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who answers for a mechanic, and deciding without knowing who stays"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Three different things are called gamification. Gamification proper borrows the structure of games: a goal, a visible position, feedback, a challenge, inside something that is not a game. Playful design changes only the tone: colours, round shapes, cheerful words. A game builds a world with characters and a story of its own. They differ in effort (a few days for one person against months for a team) and in risk: structure helps almost any product, a playful tone can make a serious provider look careless, and a game that does not convince is worse than none. Gamification strategies aim at two different things: activation (people start and do something now) and retention (they keep coming back).",
    ),
    why: t(
      "Block 1.1 asks what SkillRise's plain learning paths do to motivation and retention, Block 1.2 asks you to rate three activation designs for HealthJourney, and Block 2.1 asks for measures for MoveWell that keep it serious. This card gives you the words to say which of the three a design asks for.",
    ),
    picture: t(
      "One Brightwater Savings task, “set up your savings goal”, in three versions: with structure, with a playful tone, and as a game. Choose one and read what Vera understands and what it costs. Press “Read the comic” for a short story.",
    ),
  },
  A2: {
    idea: t(
      "People do not react to rewards as such. They react to information about their own position: how far they have come, whether what they just did counted, how much is left, whether they are good at it. Progress, feedback, recognition, a challenge and reaching a goal are ways of giving that information. Underneath every mechanic is a lever: reward, a feeling of competence, self-efficacy (believing you can do it), social validation, the experience of progress, or an activation trigger (a reminder, a nudge). The mechanic is what people see; the lever is what moves them. Choosing a mechanic without naming its lever is how a leaderboard lands in a product where nobody wants to be compared.",
    ),
    why: t(
      "Block 1.1 asks you to sort SkillRise's weak spots into motivation, progress, recognition, feedback, retention and self-efficacy, and Block 2.1 asks the same for MoveWell. This card tells the six apart and shows which lever each mechanic pulls.",
    ),
    picture: t(
      "One Brightwater Savings screen after a deposit, with five switches: progress, feedback, recognition, challenge and a reached goal. Switch them off and on and read what Kaspar learns about his own position. Press “Read the comic” for a short story.",
    ),
  },
  A3: {
    idea: t(
      "Each tool has one job. Points count activity; badges mark something rare; levels name a capability; challenges set a bounded task; streaks reward regularity; feedback says what an action did; a status display shows a position. Each also has a limit: points count effort, not value; badges lose meaning when there are many; streaks punish one missed day; a ranking motivates the top and shames the bottom. Stacking tools does not stack motivation: past a certain number each new one makes the others mean less. Bad gamification fails in five ways: manipulation (fake urgency, guilt), overstimulation (too many signals), reward inflation (more and bigger rewards for less), loss of motivation (the reward replaces the reason), and damage to trust. The first ones can be repaired by removing things; damaged trust repairs slowly, if at all.",
    ),
    why: t(
      "Block 1.2 asks you to rate a variant with points, badges, daily challenges and rankings against two quieter ones on motivation, credibility, retention, clarity and acceptance, and to name the risks that remain. Block 2.1 asks for gamification that stays serious. This card gives you what each tool is for and how it goes wrong.",
    ),
    picture: t(
      "The same Brightwater Savings home screen with one reward signal or with eight. Move the slider and watch what each new signal does to the others. Press “Read the comic” for a short story.",
    ),
  },
  A4: {
    idea: t(
      "Progress logic answers “where am I?”; a story answers “why does this place matter?”. Put together, they make the same mechanics mean more: a step called “Month 3: your emergency fund covers a broken boiler” motivates more than “Step 3 of 12”, and nothing new had to be built. The story should be the real process told well, not an invented quest. Activation and retention are different results: heavy rewards win the first week and often lose the third month, because the levers that rise fastest wear off fastest. Which result you measure, and over which period, decides which design looks like the winner.",
    ),
    why: t(
      "Block 1.2 asks you to judge a narrative variant against a heavily gamified one, and Block 2.1 asks for measures that combine visible progress, encouraging feedback and a narrative frame for MoveWell. This card shows how story and game work together and why a fast start is not lasting use.",
    ),
    picture: t(
      "The same Brightwater Savings plan with numbered steps or with named stages; the mechanics underneath do not change. Then three designs and a choice of period: 1 week, 1 month or 3 months. Choose and read which design looks best. Press “Read the comic” for a short story.",
    ),
  },
  A5: {
    idea: t(
      "People who already do something for its own sake can lose that reason when a reward is attached: they start doing it for the reward, and when the reward stops, so do they (the overjustification effect). So reward what people would not do anyway, and only report on what they already do gladly. In serious fields (health, money, public services, professional learning), credible gamification is a different selection, not a smaller dose: structure and honest feedback yes, a playful tone rarely, rankings and urgency almost never. Four questions decide whether a mechanic may ship: could we explain it in one plain sentence and would it still work; whom does it quietly put last; how does it read to someone in a bad moment; who can remove it later? To put measures in order, weigh each on effect on users, feasibility, risk and time pressure, the four Block 2.1 names.",
    ),
    why: t(
      "Block 1.2 asks about credibility and user acceptance for HealthJourney, and Block 2.1 asks for four prioritised measures for MoveWell, justified on effect on users, feasibility, risk and time pressure, that keep the brand trustworthy. The example uses Brightwater Savings and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "First the four questions, asked of two Brightwater Savings mechanics. Then three measures Brightwater considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating.",
    ),
  },
  B1: {
    idea: t(
      "In many companies gamification arrives as a feature request: “add badges”, “make it fun”. At senior level it is part of the activation and experience architecture: a guiding vision for what people should feel and do, principles that say which levers the company uses and which it does not, patterns for progress, feedback and recognition built once for every product, and a plan for which journeys come first. It also steers behaviour, so it is a matter of responsibility: a mechanic that moves people should be one the company would explain to them.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for activation and retention, three decisions on progress, reinforcement, the depth of gamification, storytelling and long-term retention, and an order of which journeys, functions or touchpoints come first. You decide the architecture, not single mechanics.",
    ),
    picture: t(
      "Left Brightwater Savings adding mechanics one request at a time, right building an activation architecture. Below, the layers from a guiding vision to every touchpoint. Nothing to click.",
    ),
  },
  B2: {
    idea: t(
      "Activation sits between goals that pull apart: motivation against seriousness (lively against trustworthy), activation against user autonomy (steering behaviour against letting people choose), brand effect against the user's interest, and all of these against economic viability (what it costs and what it brings). A metric can pull too: if the company counts sessions in the first week, the design that wins is the one with the loudest rewards. The way through is to decide per journey and per lever, say what you give up, and choose what you measure on purpose.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis of wrong assumptions about motivation, target group and mechanics, and a governance model for conflicts between brand, user interest and economic viability. Each is a decision between conflicting goals.",
    ),
    picture: t(
      "Three Brightwater Savings levers, each with what it gives and what it costs in trust or autonomy. Choose one and read who stands for each side. Press “Read the comic” for a short story.",
    ),
  },
  B3: {
    idea: t(
      "Mechanics pile up because adding one needs only a champion, while removing one needs a business case. Left alone for a few years, that makes a product loud without anyone having decided it. Governance corrects it: a named owner of the activation principles, a written rule for which levers are used, a way to remove a mechanic, and an escalation rule for conflicts between brand, user interest and economics. A works council, a regulator or a journalist will ask who decided, on what principle, and what would have changed the decision. With incomplete data, a decision says what you decide, what you do not know, when you would reverse it and what you give up.",
    ),
    why: t(
      "Block 3.1 asks for a governance model for activation principles, a decision despite patchy data, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Brightwater Savings. The two boxes below are the rule for future decisions. Nothing to click.",
    ),
  },
});

const M = makeMaterials(9, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
