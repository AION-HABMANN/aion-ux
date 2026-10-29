import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 15 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow
 * the plan's Wissen cell: eye-tracking technologies and what they show (fixations, scanpaths, distribution of attention, search behaviour, visual priority) and
 * their relevance for navigation, information architecture, interface evaluation and prototype tests; the difference between capturing gaze, steering attention
 * and actual cognitive processing, and the limits of the method; neurofeedback and brain-computer interfaces, their fields of use and maturity; robust UX research
 * against experimental technology against a marketable application, with chances and risks; ethics, data protection and voluntariness, with weighing a measure.
 * Then, for Level 3: neuro-based UX as a decision architecture for insight, personalisation and new interaction; the conflicts between value, validity, effort,
 * ethics, data protection and market maturity; governance for neurodata and a decision with thin evidence. Every card is Core.
 *
 * Ideas kept from the original Day 15 (an executive decision lab, /day/15/original/): one recording seen three ways (A1), "one pattern, three readings" and the
 * interpretation ladder (A2), placing six technologies at their real maturity (A3), "fund the question, not the technology" (A4), consent as a design variable
 * and ranking by what the top choice costs in trust (A5), operative or strategic and the four roles (B1, B3). Its cases were the plan's own, so the cards use a
 * made-up company.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("What eye-tracking measures: fixations, scanpaths, heatmaps and areas of interest"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Looking is not understanding: the limits of gaze data"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Neurofeedback and brain-computer interfaces at their real maturity"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Insight, interpretation risk and decision relevance: research, experiment or product?"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Ethics, data protection and voluntariness, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Neuro-based UX as an insight architecture, not measurement fascination"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Value, validity, effort, ethics, data protection, maturity: the conflicts of neuro-based UX"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Governance for neurodata, and deciding with thin evidence"), minutes: 20 },
]);

const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "An eye-tracker records where a person looks. The eye does not glide; it jumps (saccades) and pauses (fixations), and we take in information during the pauses. One recording can be shown in several ways: as a scanpath (the order of fixations, numbered), as a heatmap (where looks piled up, added over people) or as areas of interest (marked parts of the page, with how soon and how long they were looked at). Each view shows something and hides something; which one a team is shown is a decision someone made. In UX, eye-tracking helps with navigation, information architecture, interface evaluation and prototype tests: what is seen first, what is never seen, where people search.",
    ),
    why: t(
      "Block 1.1 asks where FocusSense's eye-tracking gives real insight, Block 1.2 rates eye-tracking in prototype tests, and Block 2.1 asks which of VisionMind Lab's methods are product-near. This card tells you what the data actually is.",
    ),
    picture: t("One recording of Mara on the Tessel transfer page, shown three ways: as a numbered scanpath, as a heatmap, and as areas of interest with when and how long she looked. Switch between them and read what each hides. Press “Read the comic” for a short story."),
  },
  A2: {
    idea: t(
      "Capturing where someone looks, steering their attention, and what they actually understand are three different things. Looking is not understanding: a long fixation can mean interest, confusion or slow reading. Attention is not agreement: looking at an offer is not wanting it. And the eye can rest on something without the person noticing it. The measurement is a fact; its meaning is an interpretation, and it needs another source, such as asking people what they were thinking. Each step up the ladder (seen, attended, understood, agreed) needs more evidence.",
    ),
    why: t(
      "Block 1.1 asks where FocusSense over-stretches its data and why “objective truth data” is a problem, and Block 2.1 asks about VisionMind Lab's overestimated data and missing hypotheses. This card gives you the limits by name.",
    ),
    picture: t("The same gaze pattern on Tessel's fee line, read three ways. The picture stays the same; only what Mara said afterwards changes. Below, the ladder from seen to agreed. Press “Read the comic” for a short story."),
  },
  A3: {
    idea: t(
      "Neurofeedback shows people a signal of their own brain activity (usually from EEG) so they can learn to change it; it is used in therapy and research, with mixed evidence. A brain-computer interface (BCI) turns brain signals into commands, for example to type without moving; today it is mostly medical and research use. Possible fields: training, adaptive systems, support for attention, assistive use and experimental interaction. Maturity differs enormously: eye-tracking in lab tests is an established method, a consumer headband's “focus score” is not validated, and a BCI to control a website by thought is a research topic. Chances: deeper insight into load, attention and reactions, new ways to interact. Risks: over-interpretation, poor fitness for daily use, high technical hurdles, data protection and ethics.",
    ),
    why: t(
      "Block 1.1 asks about FocusSense's neurofeedback for concentration and overload, Block 1.2 rates experimental neurofeedback and BCI observation for LearningPulse, and Block 2.1 asks which methods are product-near. This card places them where they really are.",
    ),
    picture: t("Seven technologies placed by evidence and everyday use, for Tessel. Select one to read why it sits where it does. Press “Read the comic” for a short story."),
  },
  A4: {
    idea: t(
      "Not every measurement belongs in a product. Robust UX research answers a written question with a fitting method and the participants' consent; experimental technology is explored to learn what it can do; a marketable application must work reliably for everyone, every day. Mixing the three is how weak data ends up deciding a product. Fund the question, not the technology: start from what you need to know, write a hypothesis, choose the method that can answer it, and say which decision the answer will inform. Then judge each finding on its insight value, its interpretation risk and its decision relevance.",
    ),
    why: t(
      "Block 1.1 asks about decision relevance and the two biggest chances and risks, Block 1.2 compares approaches near and far from the product, and Block 2.1 asks for separate tracks and hypothesis-based pilots. This card gives you the three tracks and the chain from question to decision.",
    ),
    picture: t("Tessel's five ideas sorted into research, experiment, product, or not at all. Select one to read why. Below, the chain from a question to a decision. Press “Read the comic” for a short story."),
  },
  A5: {
    idea: t(
      "Gaze and brain data are more intimate than clicks: they can reveal tiredness, stress, reading difficulties or health, often without the person knowing. Regulators treat neurodata as high risk. Consent is part of the design: say what is recorded, what will and will not be inferred, who sees it, when it is deleted, and make saying no as easy as saying yes. At work, consent is rarely free. Leaders weigh neuro-based measures by effect on users, feasibility, risk, time pressure and reputation security, and judge them with a differentiated view instead of a scientific aura.",
    ),
    why: t(
      "Block 1.1 asks about ethics and acceptance, Block 1.2 about sensitive data protection, and Block 2.1 asks for an ethics, data protection and consent framework and four measures justified on effect on users, feasibility, risk, time pressure and reputation security. The example uses Tessel and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t("Three consent screens for the same Tessel study: hidden, clear, and clear with limits on what is inferred. Then three measures rated on five criteria. Select a cell to read the reason for its rating."),
  },
  B1: {
    idea: t(
      "At senior level, neuro-based UX is not a new gadget but a decision architecture for insight, personalisation and new interaction: a guiding vision of what the company wants to understand and why, separate tracks for research, UX analysis and product, hypotheses before studies, and an evidence grade that decides what may influence strategy. Operational decisions concern a single study; strategic ones concern the research portfolio, product development and the protection of trust.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for neuro-based UX research and interaction, three decisions on eye-tracking, neurofeedback, BCI, ethics, data protection and product connection, and an order of what is looked at first. You decide the architecture, not single methods.",
    ),
    picture: t("Left Tessel chasing measurements to look scientific, right running an insight architecture. Below, the layers from a guiding vision to every study. Nothing to click."),
  },
  B2: {
    idea: t(
      "Neuro-based UX sits between goals that pull apart: insight against validity, a scientific image against what the data can carry, personalisation against privacy, research depth against market maturity, speed against interpretation effort, and all of them against effort and money. The way through is a portfolio of a few bets of different size, each with a hypothesis, a measure of success and an exit date, and a written list of what each bet assumes about data quality, acceptance, maturity and strategic value.",
    ),
    why: t(
      "Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about data quality, user acceptance, market maturity and strategic value, and a governance model for conflicts. Each is a decision between conflicting goals.",
    ),
    picture: t("Tessel's three bets, a safe one, a medium one and a bold one, with what each costs and what it assumes. Choose one and read why. Press “Read the comic” for a short story."),
  },
  B3: {
    idea: t(
      "Neurodata needs owners and limits: someone who owns neuro-based research and the evidence grade, an ethics and data review that approves every study and may stop any, a translation step that decides what may reach a product, and a rule for when insight, speed and trust disagree. Four roles help: whoever sets the standard, whoever approves, whoever runs the studies, whoever translates. Evidence is usually thin at the start; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.",
    ),
    why: t("Block 3.1 asks for a governance model for neuro-based research, ethical approvals and the translation into product decisions, a decision despite patchy evidence, and a statement to the management. This card gives you the parts of each."),
    picture: t("The four boxes at the top are the parts of a decision, filled in for Tessel. The two boxes below are the rule for future decisions. Nothing to click."),
  },
});

const M = makeMaterials(15, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
