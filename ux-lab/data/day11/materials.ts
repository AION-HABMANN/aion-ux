import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * Day 11 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow
 * the plan's Wissen cell in its order: voice control and voice user interface design, the difference between graphical, text and voice interaction, the chances and
 * limits of voice; the requirements of a good voice interface (clear dialogue logic, clear expectations, feedback, error handling, repeatability, user control);
 * neuro-design principles (predictability, cognitive relief, trust, mental models, stimulus reduction) and how intelligent interfaces raise or lower cognitive load;
 * prototyping and testing AI-supported interfaces (functional, interaction and test prototype; comprehensibility, error robustness, meeting expectations,
 * transparency, acceptance); where voice belongs, weighing a measure, and the leader's role (technology that supports reliably instead of impressing). Then, for
 * Level 3: voice and intelligent interfaces as service architecture; the conflicts between comfort, precision, trust, effort, error robustness and scalability;
 * and voice principles, test standards and a decision under uncertainty. Every card is Core.
 *
 * Ideas kept from the original Day 11 (a CityHelp Voice sandbox, /day/11/original/): "feel it before anyone explains it" (here: the cards' phones speak, and A3
 * lets you hear a long spoken menu and try to remember it), the dialogue moments where a voice assistant helps or wastes time, the predictability and cognitive-load
 * demonstrations, and the choice of prototype for a question. CityHelp itself is the case study now, so the cards use a made-up company.
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Screen, chat or voice: what voice can do and where it fails"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("A good voice dialogue: expectations, feedback, errors, repeat, control"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Neuro-design: predictable, light on memory, calm"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Prototyping and testing an AI interface"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Where voice belongs, and weighing a measure"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Voice and AI as a service architecture, not an innovation signal"), minutes: 20 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Comfort, precision, trust, effort: the conflicts of voice"), minutes: 20 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Voice principles, test standards and deciding with little test data"), minutes: 20 },
]);

const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "The same task can be done on a screen, in a typed chat or by voice. A screen shows every option at once; a chat keeps a written record; voice leaves nothing to look at. Voice is strong when hands or eyes are busy, when speed matters, for people who find screens hard, and because talking is natural. It fails through misunderstandings, lost context, errors that are hard to notice, options nobody can see, and the expectation that it understands like a person.",
    ),
    why: t(
      "Block 1.1 asks for the chances and risks of HomeAssist Voice, Block 1.2 rates three voice designs for CareVoice, and Block 2.1 asks what CityHelp Voice's assistant does well and badly. This card gives you the strengths and limits of voice by name.",
    ),
    picture: t("One Ladle task, scaling a recipe and setting a timer, on a screen, in a chat and by voice. Choose one, read it, and press “Hear it” to hear the voice version. Press “Read the comic” for a short story."),
  },
  A2: {
    idea: t(
      "A good voice interface needs six things. Clear dialogue logic: one question at a time, and it is clear whose turn it is. Clear expectations: people know what it can do. Feedback: it says what it understood and what it did. Error handling: when it does not understand, it asks a better question instead of repeating itself. Repeatability: “say that again” works. User control: people can stop, go back and change their mind.",
    ),
    why: t(
      "Block 1.1 asks where HomeAssist Voice strengthens or weakens comprehensibility, trust and control, Block 1.2 asks about guided against free dialogues, and Block 2.1 asks for measures for CityHelp Voice's dialogue and error handling. This card gives you the six requirements.",
    ),
    picture: t("One Ladle voice dialogue with six switches, one per requirement. Switch them on one at a time, read what changes, and press “Hear it”. Press “Read the comic” for a short story."),
  },
  A3: {
    idea: t(
      "Neuro-design asks what the brain needs from an intelligent interface. Predictability: the same request gives the same kind of answer. Cognitive relief: the interface remembers, so the person does not have to. Trust: it does what it says. A mental model: people can picture how it works. Stimulus reduction: fewer things at once. Voice raises the load quickly, because everything said must be held in working memory; a spoken list of eight options is much harder than one on a screen.",
    ),
    why: t(
      "Block 1.1 asks about predictability and relief at HomeAssist Voice, Block 1.2 about comfort and comprehensibility, and Block 2.1 about CityHelp's users who do not know what is possible. This card explains why voice can relieve or overload the mind.",
    ),
    picture: t("A memory test: Ladle reads out a menu of options, then asks for one. Try a long menu and a short one and notice the difference. Then a slider from calm to busy. Press “Read the comic” for a short story."),
  },
  A4: {
    idea: t(
      "AI interfaces are tested with three kinds of prototype. A functional prototype checks whether the technology works at all. An interaction prototype checks how the dialogue feels, often with a person secretly playing the system (“Wizard of Oz”). A test prototype is close to the real thing and is tried with real users on real tasks. Test five things: comprehensibility, error robustness, whether expectations are met, transparency and acceptance; and test the risky and ambiguous situations on purpose, not only the easy ones.",
    ),
    why: t(
      "Block 2.1 asks for measures that include prototyping and testing CityHelp Voice with risk-based scenarios, and Block 1.2 notes that CareVoice's user tests exist only in first approaches. This card gives you the prototypes and what to test.",
    ),
    picture: t("Three Ladle questions, each answered by a different prototype. Choose one and read what it can and cannot show. Below, a test plan by risk level. Press “Read the comic” for a short story."),
  },
  A5: {
    idea: t(
      "Not every task suits voice. Voice belongs where tasks are simple, frequent and clear, where hands or eyes are busy, and where a mistake is cheap; it does not belong where choices are many and unfamiliar or a mistake is costly. Leaders make sure the technology supports reliably instead of impressing. To put measures in order, weigh each on effect on users, feasibility, risk and time pressure, the four Block 2.1 names.",
    ),
    why: t(
      "Block 2.1 asks for four prioritised measures for CityHelp Voice, justified on effect on users, feasibility, risk and time pressure, and Block 1.2 asks which CareVoice design holds. The example uses Ladle and its own measures, so the answer for the task cases is not given.",
    ),
    picture: t("Five questions that decide whether a task suits voice, tried on three Ladle tasks. Then three measures rated on effect on users, feasibility, risk and time pressure. Select a cell to read the reason for its rating."),
  },
  B1: {
    idea: t(
      "Inside many companies voice is first an innovation signal: a feature to show. At senior level voice and AI interaction are part of the service architecture: which kind of relief, control and service experience the company creates, in which journeys voice is used and where it is not, how it hands over to a screen or a person, and how it is tested before it grows. The rule of thumb: robust core uses first, broad coverage later.",
    ),
    why: t(
      "Block 3.1 asks for a guiding vision for voice and AI interaction, three decisions on where voice is used, neuro-design, error robustness, prototyping and testing, and an order of which journeys come first. You decide the architecture, not single voice features.",
    ),
    picture: t("Left Ladle adding voice everywhere to look modern, right building a voice service architecture. Below, the layers from a guiding vision to every touchpoint. Nothing to click."),
  },
  B2: {
    idea: t(
      "Voice sits between goals that pull apart: comfort (say anything) against precision (understand it correctly), trust against effort, error robustness against natural conversation, and all of them against scalability: what works in one journey may not work in twenty. The way through is to decide per journey how free the dialogue may be, where a screen confirms, and where a person takes over, and to write down which assumptions about naturalness, behaviour and acceptance the plan rests on.",
    ),
    why: t(
      "Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about naturalness, user behaviour, acceptance and scalability, and a governance model for conflicts between innovation, trust and effort. Each is a decision between conflicting goals.",
    ),
    picture: t("Three Ladle journeys and how free the voice dialogue may be in each, with who stands for each side. Choose one and read why. Press “Read the comic” for a short story."),
  },
  B3: {
    idea: t(
      "Voice and AI interaction need owners: someone who owns the voice principles (how it speaks, confirms, fails and hands over), test standards that say what must be tested before anything goes live (by risk level), and a rule for when innovation, trust and effort disagree. Test data is often thin; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. A small, well-tested core is a safe start.",
    ),
    why: t("Block 3.1 asks for a governance model for voice principles and test standards, a decision despite patchy data, and a statement to the management. This card gives you the parts of each."),
    picture: t("The four boxes at the top are the parts of a decision, filled in for Ladle. The two boxes below are the rule for future decisions. Nothing to click."),
  },
});

const M = makeMaterials(11, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
