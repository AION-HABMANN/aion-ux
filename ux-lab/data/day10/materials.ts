import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 10 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * plan's Wissen cell in its order: intelligent interfaces and AI-supported interaction, rule-based against adaptive against learning systems; how AI supports guidance,
 * recommendations, help and the course of an interaction, and adapting to context against personalising from data against steering the interaction; the potentials
 * (relevance, time saved, relief, anticipating help, fit) and risks (opacity, loss of control, misadaptation, over-personalisation, loss of trust); transparency,
 * clear expectations and comprehensible logic, and automation against autonomy and perceived control; data quality, context and the situation of use, why intelligent
 * interfaces are a psychological and strategic design task, and weighing a measure. Then, for Level 3: intelligent interfaces as a decision architecture for
 * guidance, service quality and differentiation; the conflicts between personalisation, transparency, trust, efficiency and feasibility; and the responsibility of
 * leaders with a decision under uncertainty. Every card is Core. The plan's title also names voice control and voice user interface design, which its Wissen cell does
 * not list; card A2 covers a voice assistant as one form of intelligent interface, and Day 11 goes deeper.
 *
 * Ideas kept from the original Day 10 (a companion page, /day/10/original/): the three-question test of transparency, control and recoverability, and "which type is
 * this?" for rule-based, adaptive and learning behaviour. Its everyday examples from real products are replaced by a made-up company, so no task is answered on a card.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Rule-based, adaptive or learning: what makes an interface intelligent"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("How AI guides, recommends and helps: context, personal data and steering"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("What intelligent interfaces give, and how they go wrong"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Why, change, undo: transparency, control and the feeling of control"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Data, context and situation, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Intelligent UX as a decision architecture, not a technology trend"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Personalisation against transparency and trust: the conflicts of intelligent UX"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who answers for an intelligent interface, and deciding with patchy data"), minutes: 20 },
]);

const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "An interface can look smart for three different reasons. A rule-based system follows fixed rules: the same input gives the same output, every time, and the rule can be explained in one sentence. An adaptive system reacts to the situation now: where you are, what time it is, what you just did. A learning system changes with data over time: it gets to know a person, and the same input can give a different output next month. Many products mix the three. An interface is intelligent when it supports people in a way that fits their situation; one that only does things automatically is automated, not intelligent.",
    ),
    why: t(
      "Block 1.1 asks what SmartAssist's suggestions do for users and notes that they cannot tell rules from AI, and Block 2.1 asks why CareGuide's recommendations fit only sometimes. This card gives you the three kinds of system behind a smart-looking screen.",
    ),
    picture: t("The same Northline Rail moment, a delayed train, handled by a rule, by the situation and by what the app has learned. Choose one and read what Ilka sees and why. Press “Read the comic” for a short story."),
  },
  A2: {
    idea: t(
      "AI can support people in four places: guidance (what to do next), recommendations (what might suit them), help (an answer at the moment of need) and the course of an interaction (a dialogue that shortens itself). There are three ways to adapt. Adapting to context uses the situation now (time, place, device). Personalising from data uses what is known about the person (history, preferences). Dynamic steering changes the interaction itself (skipping steps, reordering, a voice assistant asking only what is missing). Each needs different data and carries a different risk; voice interfaces are one form, where saying back what was understood replaces what a screen would show.",
    ),
    why: t(
      "Block 1.2 asks you to rate three ways CareerNavigator could personalise, and Block 2.1 asks what CareGuide's recommendations do. This card tells context, personal data and steering apart.",
    ),
    picture: t("The Northline Rail app in three versions: adapting to the station Mats is at, personalising from his usual trips, and steering the booking itself. Choose one and read which data it needs. Press “Read the comic” for a short story."),
  },
  A3: {
    idea: t(
      "Intelligent interfaces can raise relevance (what people see fits them), save time, relieve people of steps, help before they ask, and fit the way people already work. They can also go wrong in five ways: opacity (nobody can see why), loss of control (people cannot change it), misadaptation (it fits the wrong situation), over-personalisation (it knows too much, or narrows what people see) and loss of trust (after one bad surprise, people doubt every suggestion). The same feature can do both; whether it helps depends on how well it fits, and how easy it is to see and to correct.",
    ),
    why: t(
      "Block 1.1 asks for the chances and risks of SmartAssist and for its two biggest chances and risks, and Block 2.1 asks for CareGuide's central chances and risks. This card gives you the potentials and the risks by name.",
    ),
    picture: t("One Northline Rail message, from not personal at all to far too personal. Move the slider and read when it stops helping and starts to feel watched. Press “Read the comic” for a short story."),
  },
  A4: {
    idea: t(
      "People trust a suggestion they can understand and change. Three questions test it: Can the person see why the system did what it did (transparency)? Can they change, steer or turn it off (control)? If it gets it wrong, can it be undone (recoverability)? If the answer to all three is no, the feature needs redesign before it ships, however clever the system behind it. Clear expectations matter too: people should know what the system will and will not do. The more a system acts on its own, the more people need to feel in control; perceived control is not the same as real control, but it decides how people feel about automation.",
    ),
    why: t(
      "Block 1.1 asks about transparency and control at SmartAssist, Block 1.2 asks you to weigh explainability and user control at CareerNavigator, and Block 2.1 asks why CareGuide's members do not understand its recommendations. This card gives you the three questions to ask of every suggestion.",
    ),
    picture: t("One Northline Rail suggestion with three switches: a reason, a way to change it, and an undo. Switch them on one at a time and read what Ilka can now do. Press “Read the comic” for a short story."),
  },
  A5: {
    idea: t(
      "An intelligent interface is only as good as its data and its sense of the situation. Incomplete or old data produces confident mistakes; a suggestion that fits at home may not fit on a platform in the rain. So intelligent interfaces are a psychological task (expectations, trust, the feeling of control) and a strategic one (where it is worth it, and where it is too risky), not only a technical one. Start with robust cases: the frequent, simple situations where the data is good. To put measures in order, weigh each on effect on users, feasibility, risk and time pressure, the four Block 2.1 names.",
    ),
    why: t(
      "Block 1.2 asks about CareerNavigator with only partial user data, and Block 2.1 asks for four prioritised measures for CareGuide, justified on effect on users, feasibility, risk and time pressure, with data of mixed quality. The example uses Northline Rail and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t("First the chain from data to a suggestion and where it breaks. Then three measures Northline Rail considered, rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating."),
  },
  B1: {
    idea: t(
      "Inside many companies AI is first an innovation signal: a feature to announce. At senior level an intelligent interface is a decision architecture: what kind of support, how much personalisation and how much autonomy the company wants for its users, decided once and applied in every journey. It shapes guidance, service quality and how the product stands apart, so it is designed from the user's need, not from what the technology can do. The rule of thumb: fewer, reliable, explainable suggestions in the journeys where they help most, before anything clever anywhere else.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for intelligent UX, three decisions on transparency, control, adaptivity, depth of personalisation and trustworthy AI interaction, and an order of which journeys, functions or touchpoints become intelligent first. You decide the architecture, not single AI features.",
    ),
    picture: t("Left Northline Rail adding AI features to look modern, right building an intelligent UX architecture. Below, the layers from a guiding vision to every touchpoint. Nothing to click."),
  },
  B2: {
    idea: t(
      "Intelligent UX sits between goals that pull apart: personalisation against transparency (the deeper it goes, the harder to explain), automation against autonomy (doing it for people against letting them choose), comfort against data protection, efficiency against trust, and all of these against what can be built. The way through is to decide the depth of personalisation per journey: shallow where mistakes are costly or data is poor, deeper where it is safe and the person benefits; to say what is given up; and to keep a human answer for the exceptions.",
    ),
    why: t(
      "Block 3.1 asks for three guiding decisions, a risk analysis of wrong assumptions about user behaviour, data quality and the effect of AI, and a governance model for conflicts between innovation, data protection, trust and economic viability. Each is a decision between conflicting goals.",
    ),
    picture: t("Three Northline Rail journeys and how deep the personalisation should go in each, with who stands for each side. Choose one and read why. Press “Read the comic” for a short story."),
  },
  B3: {
    idea: t(
      "An intelligent interface needs an owner: someone who owns the principles (what the system may suggest, what it must explain, what users can switch off), the data protection side that may veto, the product teams that apply it, and a rule for when innovation and trust disagree. Data is often patchy; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. Explanations, controls and undo are cheap to add and quick to check: a safe start when nobody knows how users will react.",
    ),
    why: t("Block 3.1 asks for a governance model for intelligent UX principles, a decision despite patchy data, and a statement to the management. This card gives you the parts of each."),
    picture: t("The four boxes at the top are the parts of a decision, filled in for Northline Rail. The two boxes below are the rule for future decisions. Nothing to click."),
  },
});

const M = makeMaterials(10, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
