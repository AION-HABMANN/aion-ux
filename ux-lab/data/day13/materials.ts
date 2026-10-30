import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 13 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow
 * the plan's Wissen cell: neurodiversity and the load factors of ADHD, autism and dyslexia; stimuli and focus; predictability and orientation; readability and
 * language; inclusive design patterns, assistive technologies, and prototyping and testing (the start of the practice project), with weighing a measure. Then, for
 * Level 3: neurodiverse UX as better base architecture, not a special case; the conflicts between standardisation, individualisation, economic viability, user
 * diversity and test effort; and governance with a test strategy and a decision under uncertainty. Every card is Core.
 *
 * Ideas kept from the original Day 13 (one page with a Training Ground and four cases, /day/13/original/): the Stimulus Dial (A2), the Predictability Toggle
 * (A3), the Readability Lab with its sliders (A4), the Assistive Tech Strip and the Test Plan Builder (A5), and the Profile Lens (A1). Its cases were the plan's
 * own, so the cards use a made-up company.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Neurodiversity: different minds, different loads"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Stimuli and focus: when a page is too much (ADHD, sensory sensitivity)"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Predictability: consistent patterns and literal words (autism)"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Readability: text structure, typography and language (dyslexia)"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Inclusive patterns, assistive technologies, and testing a prototype"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Neurodiverse UX as better base architecture, not a special case"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("One standard or many modes: the conflicts of neurodiverse UX"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Who owns it, how it is tested, and deciding with patchy data"), minutes: 20 },
]);

const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Neurodiversity means that human minds differ in how they take in, process and remember information. People with ADHD are loaded most by overstimulation, distraction, complex task structures and a lack of focus. Autistic people are loaded most by sensory overload, unclear navigation logic, inconsistent patterns and ambiguous communication. People with dyslexia are loaded most by difficult reading structures, unsuitable typography, unclear text structure and complex language. These are design factors, not exceptions: many people without a diagnosis feel the same loads when they are tired, stressed or distracted.",
    ),
    why: t(
      "Block 1.1 asks which hurdles StudyPath puts in front of people with different ways of perceiving and processing, and Block 2.1 asks for LifeGuide's deficits for neurodiverse use. This card gives you the load factors of ADHD, autism and dyslexia by name.",
    ),
    picture: t("The same Hearth Energy start page seen through three lenses: what loads Ayo (ADHD), Mirko (autism) and Tilda (dyslexia). Choose a lens. Press “Read the comic” for a short story."),
  },
  A2: {
    idea: t(
      "Every banner, badge, colour, notification and moving element competes for attention. For people with ADHD or sensory sensitivity, a busy page is not just untidy: it is hard to start, easy to drift from and tiring to finish. Calm pages show one main task first, keep secondary things quiet, avoid movement and interruptions, and break long tasks into steps with a visible next step. Fewer stimuli help almost everyone find what matters.",
    ),
    why: t(
      "Block 1.1 asks about StudyPath's start page full of hints, colours and notifications and its unprioritised tasks, Block 1.2 rates JobAccess's dense Variant A, and Block 2.1 asks about LifeGuide's competing stimuli and long forms. This card lets you turn the stimuli up and down.",
    ),
    picture: t("A dial turns the Hearth Energy start page from calm to overloaded: banners, badges, a moving ticker, a chat bubble, notifications. Then the same long form in one piece and in steps. Press “Read the comic” for a short story."),
  },
  A3: {
    idea: t(
      "Predictability means people can tell what will happen: the navigation is in the same place on every page, the same action has the same name, and words mean what they say. For many autistic people inconsistent patterns and ambiguous words are not a small annoyance but a real barrier, and they raise anxiety. Consistent layouts, descriptive buttons (“Send meter reading”, not “Go”) and literal language (no idioms, no vague hints) make an interface safe to use.",
    ),
    why: t(
      "Block 1.1 asks about StudyPath's navigation that varies between course areas, Block 1.2 about JobAccess A's changing navigation, and Block 2.1 about LifeGuide's inconsistent patterns and low predictability. This card shows the same three pages built consistently and inconsistently.",
    ),
    picture: t("Three Hearth Energy pages, first built inconsistently (the menu moves, the main button changes name and place), then consistently. Switch and compare. Press “Read the comic” for a short story."),
  },
  A4: {
    idea: t(
      "For people with dyslexia, and for many others, reading is work. Text is easier to read when it is left-aligned, in a plain sans-serif font at a good size, with enough line height and spacing, in short lines and short paragraphs, without blocks of capitals, italics or underlining, and in plain language with clear headings. Small typographic choices decide whether someone reads to the end.",
    ),
    why: t(
      "Block 1.1 asks about StudyPath's long, dense, complex texts, Block 1.2 rates JobAccess's readability, and Block 2.1 about LifeGuide's texts that are correct but hard to read. This card lets you change the typography of a real paragraph yourself.",
    ),
    picture: t("A Hearth Energy notice you can change: size, line height, line length, alignment, spacing, and an official or plain version. Press “Read the comic” for a short story."),
  },
  A5: {
    idea: t(
      "Inclusive design patterns are reusable solutions that help several groups at once: one task per screen, a step indicator, descriptive buttons, a summary before sending, a calm mode, a reading mode. Assistive technologies (screen readers, text-to-speech, reader modes, text scaling, focus and stimulus filters) let people use content their own way, but only if the base structure is good. And only prototypes tested with real people show the real hurdles instead of assumptions: test orientation, stimulus load, task completion, readability and the feeling of control, in calm and in stressful situations. To put measures in order, weigh each on effect on users, gain for inclusion, feasibility, risk and time pressure.",
    ),
    why: t(
      "Block 2.1 asks for four measures for LifeGuide, justified on effect on users, gain for inclusion, feasibility, risk and time pressure, and for an inclusive prototype approach with what to test first; Block 1.2 rates JobAccess C's adaptation modes. The example uses Hearth Energy and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t("The same Hearth Energy content through five assistive technologies, with a real text-to-speech button. Then a test plan for a prototype, and three measures rated on five criteria. Select a cell to read the reason for its rating."),
  },
  B1: {
    idea: t(
      "Many companies treat neurodiversity as a special case: an extra option, a separate “easy” version, a setting few people find. At senior level it is a strategic dimension of the product architecture: calm, predictable, readable defaults help everyone and especially neurodivergent people; patterns built once carry that into every product; adaptation modes come on top of a good base, not instead of it. The question is not “which option do we add?” but “what base do we build?”.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision of neurodiverse UX, three decisions on base architecture, patterns, assistive technologies, adaptation modes and test strategy, and an order of which journeys, components or product areas come first. You decide the architecture, not single screens.",
    ),
    picture: t("Left Hearth Energy adding an “easy mode” on top of a busy product, right building a calm base with patterns and modes. Below, the layers from a guiding vision to every product. Nothing to click."),
  },
  B2: {
    idea: t(
      "Neurodiverse UX sits between goals that pull apart: one standard for all against individual adaptation, a dynamic brand against a calm interface, economic viability against the diversity of users, and the cost of testing with many groups against the risk of not testing. The way through is to decide what belongs in the base (calm, consistent, readable), what becomes an optional mode, and whom to test with first; and to write down which assumptions about diversity, standardisation and cost the plan rests on.",
    ),
    why: t(
      "Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about user diversity, standardisation and economic viability, and a governance model for conflicts between brand, technology, product logic and inclusion. Each is a decision between conflicting goals.",
    ),
    picture: t("Three Hearth Energy decisions between conflicting goals: the dynamic brand, an extra mode, and whom to test with. Choose one and read why. Press “Read the comic” for a short story."),
  },
  B3: {
    idea: t(
      "Neurodiverse UX needs owners: someone who owns the principles and the patterns, a test strategy that includes neurodivergent people with the right support (a quiet room, breaks, time), checks built into every release, and a rule for when brand, technology, product logic and inclusion disagree. Test data is often patchy; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.",
    ),
    why: t("Block 3.1 asks for a governance model for neurodiverse UX principles, a decision despite patchy test data, and a statement to the management. This card gives you the parts of each."),
    picture: t("The four boxes at the top are the parts of a decision, filled in for Hearth Energy. The two boxes below are the rule for future decisions. Nothing to click."),
  },
});

const M = makeMaterials(13, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
