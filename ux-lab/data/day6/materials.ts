import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 6 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell in the plan's order: the Gestalt laws for intuitive navigation (proximity, similarity, continuity, closure, figure and ground,
 * common region) and how people group, distinguish and navigate; visual hierarchy for attention, priority and action, and arrangement against deliberate steering;
 * progressive disclosure, helpful reduction against problematic hiding; the link between hierarchy, navigation logic and cognitive relief, with consistent patterns;
 * UX laws in components, patterns and standards, and weighing a measure (effect on users, feasibility, risk, time pressure, as Block 2.1 names them). Then, for
 * Level 3: design systems for consistency, scale and steering, the conflicts between consistency, flexibility, speed, clarity and standardisation, and design-system
 * governance. Every card is Core.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Gestalt laws for navigation: how people see groups and paths"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Visual hierarchy: attention, priority and the next action"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Progressive disclosure: helpful reduction, not hiding"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Hierarchy, navigation logic and relief: one pattern for one task"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("From screens to components: UX laws in a design system, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Design systems for consistency, scale and steering"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicts of goals: consistency, flexibility, speed, clarity and standardisation"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Design-system governance, and deciding with incomplete data"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51): the idea, why it matters for the task, and how to read the picture. */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "People do not see a screen as separate pieces; they see groups. Things close together belong together (proximity). Things that look alike belong together (similarity). Things on one line or curve are followed as a path (continuity). An almost closed shape is seen as closed (closure). One thing stands out from a background (figure and ground). Things inside one frame or area belong together (common region). A layout that follows these laws lets people group, tell apart and navigate in a glance; one that breaks them makes related things look unrelated.",
    ),
    why: t(
      "Block 1.1 asks about OfficeSphere's information without visual grouping and its similar functions that look unrelated, and Block 2.1 asks about CitizenFlow's page types that group content differently. This card gives you the six laws to name what you see.",
    ),
    picture: t(
      "One Seabird Ferries page with three switches: proximity, similarity and common region. Switch them on one at a time and read what Elif now sees as belonging together. Press “Read the comic” for a short story.",
    ),
  },
  A2: {
    idea: t(
      "A visual hierarchy is an order of importance the eye can follow: the most important thing is the strongest, the next is weaker, and the rest is quiet. It steers attention, sets priority and shows the next action. The key difference is between primary actions (the one thing most people should do now) and secondary actions (other things they might do). Simply arranging elements side by side is not the same as steering navigation: steering means deciding what comes first and making it look first.",
    ),
    why: t(
      "Block 1.1 asks about OfficeSphere's primary and secondary actions that look equally strong and its competing notices, Block 1.2 asks you to rate CareAssist on orientation and navigation clarity, and Block 2.1 asks about CitizenFlow's unseparated actions and unprioritised help and warnings. This card gives you the order and the primary-secondary distinction.",
    ),
    picture: t(
      "The same Seabird Ferries booking step twice: every element equally strong, and a clear hierarchy with one primary action. Choose one and read where Noah's eye goes. Press “Read the comic” for a short story.",
    ),
  },
  A3: {
    idea: t(
      "Progressive disclosure means showing only what is relevant in the current step and revealing the rest when it is needed. It lowers cognitive load: a form asks only the questions that apply, and details sit one clearly labelled step away. But there is a line between helpful reduction and problematic hiding. When information people need to decide (a condition, a fee, a deadline) is buried too deep, the screen is calm and the decision is unsafe.",
    ),
    why: t(
      "Block 1.1 asks about OfficeSphere's forms that show every field at once, Block 1.2 asks you to judge CareAssist's three structures, one of which hides context too deep, and Block 2.1 asks about CitizenFlow's forms and its help that is not disclosed in context. This card gives you the principle and its limit.",
    ),
    picture: t(
      "One Seabird Ferries booking form in three forms: every field at once, disclosed step by step, and reduced so far that the luggage rules are hidden. Choose one and read what Elif can do. Press “Read the comic” for a short story.",
    ),
  },
  A4: {
    idea: t(
      "Visual hierarchy, navigation logic and cognitive relief belong together. When every page of the same type is grouped the same way, the primary action is always in the same place and similar tasks follow the same steps, people learn once and then predict. Each new pattern for a similar task costs them a fresh orientation. Inconsistent patterns across areas undermine predictability even when each single page is well designed.",
    ),
    why: t(
      "Block 1.1 asks about OfficeSphere's different patterns for similar tasks, and Block 2.1 asks about CitizenFlow's navigation patterns that vary between similar areas. This card gives you the link between consistency and relief.",
    ),
    picture: t(
      "Two Seabird Ferries areas, tickets and freight, built with different patterns and with the same pattern. Choose one and read how Noah does in the second area. Press “Read the comic” for a short story.",
    ),
  },
  A5: {
    idea: t(
      "UX laws are not only for single screens. When they are built into components (a form that discloses step by step, a primary button, a status label), patterns (how a page type is grouped) and standards (minimum sizes, one primary action per step), every screen built from them follows the laws automatically. A design system is that set of components, patterns and standards. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure.",
    ),
    why: t(
      "Block 1.2 asks for a decision between three structures, and Block 2.1 asks for four measures, one of which can anchor the others in a design system, their justification on these four criteria and a decision for 14 weeks. The example uses Seabird Ferries and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t(
      "First the chain from a UX law to the screens built from it. Then three measures Seabird considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating.",
    ),
  },
  B1: {
    idea: t(
      "A design system is a shared set of principles, components and patterns that every team uses to build its screens. It serves three purposes: consistency (the same thing looks and works the same everywhere), scale (new screens are built faster from ready parts) and steering (a change to a component reaches every screen at once). Leaders use it to translate UX principles into system logic, standards and governance, instead of optimising here and there. Without one, every team keeps inventing its own patterns, and users pay for the differences.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for systemic user guidance, three decisions on Gestalt, hierarchy, disclosure and the design system, and an order of what is standardised first, for an organisation whose teams set their own patterns. You decide the system, not the pages.",
    ),
    picture: t(
      "Left Seabird's teams each building their own patterns, right building from one design system. Below, what a design system holds, from principles to screens. Nothing to click.",
    ),
  },
  B2: {
    idea: t(
      "Design systems sit between goals that pull against each other: consistency against flexibility for a team with a special case, product speed today against system quality over years, clarity for users against the departments' wish to show more, and standardisation against each team's autonomy. Short-term pressure favours single solutions; long-term quality needs shared ones. The way through is to make the shared component the easy path, allow documented exceptions, and say what each choice gives up.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis about behaviour, transparency and standardisation, and a governance model for conflicts between teams. Each of these is a decision between conflicting goals.",
    ),
    picture: t(
      "The matrix places five Seabird approaches by how standardised they are (to the right) and how fast teams can deliver (upwards). A position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story.",
    ),
  },
  B3: {
    idea: t(
      "A design system lives only with governance: a team that owns its principles and components, a clear way for other teams to propose new components or ask for an exception, and a rule for conflicts between teams. Because data is rarely complete, a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. Missing visual order becomes a structural problem of the organisation when no one is responsible for the patterns across teams.",
    ),
    why: t(
      "Block 3.1 asks for a governance model for component standards and UX principles, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each.",
    ),
    picture: t(
      "The four boxes at the top are the parts of a decision, filled in for Seabird. The two boxes below are the rule for future decisions. Nothing to click.",
    ),
  },
});

const M = makeMaterials(6, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
