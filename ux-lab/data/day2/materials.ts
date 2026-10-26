import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 2 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: the basics of visual perception in interface design and user-centred against provider-centred design;
 * perception processes and how users scan, select and prioritise; visual guidance, contrast, grouping and structure; information density, orientation, load and perceived
 * quality; the first principles of user guidance (recognition instead of search, clarity instead of overload). Then, for Level 3: why good UI decisions come from the user's
 * perspective and not from inside logic, the conflicts of goals, and user-centredness as the basis of accountable decisions. A5 teaches the criteria Block 2.1 names (effect
 * on users, effort, risk, timeliness). Every card is Core: a Core block draws on each.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Seeing an interface, and designing from the user's side: user-centred against provider-centred design"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("How people scan, select and prioritise: perception as the basis of UI decisions"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("What guides the eye: visual guidance, contrast, grouping and structure"), minutes: 13 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("How much at once: information density, orientation, load and why order looks like quality"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Recognition instead of search, clarity instead of overload, and weighing a measure"), minutes: 11 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Inside logic against user logic: why good UI decisions come from the user's side"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicts of goals: much information against simplicity, stakeholders against users"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("User-centredness as the basis of accountable decisions: who owns the structure, and deciding with partial data"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Before people read a screen they see it: shapes, contrasts and groups decide what is noticed and what is missed. User-centred design starts from what the users come to do and how they see, and checks the design with them. Provider-centred design starts from how the organisation is built and what it wants to say, so the menu mirrors its departments and the start page mirrors its wishes. Both can be complete; only one is easy to use.",
    ),
    why: t(
      "Block 1.1 asks you to read CityDesk as a first-time user, Block 1.2 to choose a start page from a user-centred point of view, and Block 2.1 to find CampusNow's problems, several of which come from inside logic. This card gives you the difference to look for.",
    ),
    picture: t(
      "The same Brightwater start page twice: built from the provider's side and from the user's side. Choose a version and read what Ana sees and does. Press “Read the comic” for a short story.",
    ),
  },
  A2: {
    idea: t(
      "People rarely read a screen; they scan it. The eye jumps to what stands out, picks out headings, words and buttons that look relevant to the goal, and skips the rest. On text-heavy pages the jumps often follow an F-shape: across the top, across a little lower, then down the left edge. What is not picked out in this first pass is, for the user, not there. A UI decision is therefore a decision about what the scan will catch.",
    ),
    why: t(
      "Block 1.1 asks what a first-time user perceives first on CityDesk and which obstacles stop them, and Block 2.1 asks why CampusNow's long text blocks are hard to scan. You need the scan to say why something is seen or missed.",
    ),
    picture: t(
      "First the four steps of a scan. Then one Brightwater page in two forms: a dense block of text and the same content structured for scanning. Choose one and read where Felix's eye lands. Press “Read the comic” for a short story.",
    ),
  },
  A3: {
    idea: t(
      "Four means guide the eye. Contrast makes one thing stand out from its surroundings. Grouping shows what belongs together: things that are close to each other or look alike are read as one group. Structure gives an order the eye can follow, such as headings, columns and alignment. Visual guidance is these three used on purpose, so that the eye goes first to what matters and then along a path. Used against each other, boxes, colours and lines compete and the eye finds no way.",
    ),
    why: t(
      "Block 1.1 asks you to sort CityDesk's problems into visual guidance, structure and other categories, and Block 2.1 asks about CampusNow's missing prioritisation and inconsistent page types. These four means are what you check.",
    ),
    picture: t(
      "One Brightwater page with three switches: contrast, grouping and structure. Switch them on one at a time and read what Ana can now see and find.",
    ),
  },
  A4: {
    idea: t(
      "Information density is how much a screen shows at once. When it is too high, everything competes, orientation is lost and the cognitive load rises: people have to hold and sort too much. When it is very low, people click a lot to reach anything. Visual order also changes how good a product seems: a calm, ordered page is judged more trustworthy and of higher quality, often before it has been used. Order is not decoration; it is part of the quality people perceive.",
    ),
    why: t(
      "Block 1.1 asks about CityDesk's information density, Block 1.2 asks you to weigh EduFlex's crowded, reduced and image-led start pages, and Block 2.1 asks about the overloaded start page of CampusNow. This card gives you the trade-off and its effect on load and on perceived quality.",
    ),
    picture: t(
      "One Brightwater start page at three densities: crowded, balanced and sparse. Choose one and read what Felix has to do and what he thinks of the centre. Press “Read the comic” for a short story.",
    ),
  },
  A5: {
    idea: t(
      "Two first principles of user guidance. Recognition instead of search: show people the options, words and next step so they can recognise them, instead of making them remember or hunt. Clarity instead of overload: a few clear signals do more than many loud ones. To put measures in order, weigh each one on the four questions Block 2.1 names: effect on users, effort (the time and the people it takes), risk and timeliness (how soon users notice it). The reason next to each rating matters more than the rating.",
    ),
    why: t(
      "Block 1.1 asks for the two biggest hurdles for an inexperienced user, Block 1.2 asks you to rate start pages on findability and focus, and Block 2.1 asks you to rate four measures on effect, effort, risk and timeliness and to decide what comes first. The example uses Brightwater and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "Three measures Brightwater considered, rated on effect on users, effort, risk and timeliness. Select a cell to read the reason for its rating. A rating is a reading of the example, not a mark.",
    ),
  },
  B1: {
    idea: t(
      "Organisations tend to build their digital services the way they are built themselves: one menu item per department, one page layout per team, the organisation's own words. Users do not know the organisation chart; they know their task. Good UI decisions therefore start from the users' tasks and words and work back to screens, structures and owners. When the inside logic wins, users search instead of being guided, and the problem is no longer a design problem but one of how the organisation decides.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision, three decisions on orientation, structure, information priority and guidance, and an order of the areas to rework, for an organisation that discusses colours while the cause lies in its structure. You work from the users' tasks, not from the organisation chart.",
    ),
    picture: t(
      "Left the same Brightwater services ordered by the inside logic, right by the users' tasks. Below, the chain from a single screen to the structure behind it. Nothing to click.",
    ),
  },
  B2: {
    idea: t(
      "In user-centred design the goals pull against each other. Much information on the first page helps the department that wants everything seen, and hurts the user who needs relief. One standard for every page helps IT and predictability, and limits what a team can adapt. Activation helps marketing and can cost focus. A common way through is to show the few central tasks first and the rest one step deeper (progressive disclosure). The work is to name the conflict, choose, and say what you give up.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis and a governance model for stakeholders with different goals. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "The matrix places five Brightwater start pages by how much they show at once (to the right) and how easily people find their task (upwards). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story.",
    ),
  },
  B3: {
    idea: t(
      "User-centredness only lasts when someone is responsible for it: who owns the structure and the words across all touchpoints, who answers for what users experience, and how a conflict between departments is settled. Because the data is rarely complete, a decision under uncertainty says four things: what you decide, what you do not know, when you would reverse it, and what you give up. A wrong priority is not neutral; it shows up as support effort and dissatisfied users.",
    ),
    why: t(
      "Block 3.1 asks for a governance model, a decision under uncertainty that you can still justify, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Brightwater. The two boxes below are the rule for future decisions. Nothing to click.",
    ),
  },
});

const M = makeMaterials(2, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
