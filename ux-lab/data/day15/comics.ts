import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 15 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Mara, Joon, Ines, Bastian and the bank Tessel), so it is the card said again in pictures, not a new case. The last panel states the card's rule and
 * names the task block that uses it. The drawings are in components/day15/comicScenes.tsx.
 */
const NOTE = "Mara, Joon, Ines, Bastian and Tessel are made up for this lesson, like the examples on the card: a Case assumption. FocusSense, LearningPulse and VisionMind Lab, the cases of the task, are in the task.";
const NAMES = { mara: "Mara, a customer", joon: "Joon, a customer", ines: "Ines, UX researcher", bastian: "Bastian, product owner" };

export const COMICS_D15 = bi({
  A1: comicOf({
    id: "d15-a1", title: "Three pictures of one look", teaser: "The same recording as a path, a heatmap and boxes.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Mara sends money while an eye-tracker under the screen records her gaze.", say: [["mara", "Just do what you'd do at home?"]], tag: ["plain", "A RECORDING"], means: "The eye jumps and pauses; the pauses are fixations." }),
      panel({ art: "a1-2", scene: "Ines shows the scanpath: numbered circles, in order.", say: [["ines", "First the form, then the advert, then a long stop."]], tag: ["teal", "SCANPATH"], means: "The order of looks." }),
      panel({ art: "a1-3", scene: "Bastian prefers the heatmap: one red spot on the fee line.", say: [["bastian", "Red means important!"]], tag: ["plain", "HEATMAP"], means: "Time added up; the order is gone." }),
      panel({ art: "a1-4", scene: "Ines writes the three views on the board.", say: [["ines", "Each view shows something and hides something."]], tag: ["ink", "THE RULE"], means: "Know what the data is before you read it. You use this in Block 1.1 for FocusSense's recordings and in Block 2.1 for VisionMind Lab's methods." }),
    ],
  }),
  A2: comicOf({
    id: "d15-a2", title: "A long look", teaser: "Interest, confusion or slow reading? The recording cannot say.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Fixation 8: one and a half seconds on the fee line.", say: [["bastian", "They're really interested in fees!"]], tag: ["plain", "A CLAIM"], means: "A long look is read as interest." }),
      panel({ art: "a2-2", scene: "Ines replays it for Mara and asks what she was thinking.", say: [["mara", "Section 4.2 of what? I didn't get it."]], tag: ["teal", "ASKED"], means: "The same look was confusion." }),
      panel({ art: "a2-3", scene: "Joon's long look had a third reason.", say: [["joon", "Small grey text just takes me longer."]], tag: ["teal", "ANOTHER READING"], means: "The same look was effort." }),
      panel({ art: "a2-4", scene: "Ines draws the ladder: seen, attended, understood, agreed.", say: [["ines", "Looking is not understanding."]], tag: ["ink", "THE RULE"], means: "Every step up needs more evidence. You use this in Block 1.1 for FocusSense's “objective truth data” and in Block 2.1 for VisionMind Lab's overestimated data." }),
    ],
  }),
  A3: comicOf({
    id: "d15-a3", title: "The focus headband", teaser: "On sale is not the same as proven.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Bastian brings a consumer headband with a focus score.", say: [["bastian", "It reads concentration!"]], tag: ["plain", "A GADGET"], means: "A product on sale, with a big promise." }),
      panel({ art: "a3-2", scene: "Joon frowns, scratches his head, talks: the score jumps.", say: [["joon", "Am I unfocused now?", true]], tag: ["plain", "NOISE"], means: "Movement and muscles disturb the signal." }),
      panel({ art: "a3-3", scene: "Ines places seven technologies by evidence and everyday use.", say: [["ines", "The headband sits on sale, but not proven."]], tag: ["teal", "MATURITY"], means: "Eye-tracking in labs is established; app control by thought is research." }),
      panel({ art: "a3-4", scene: "Ines writes the rule.", say: [["ines", "Place it where it really is."]], tag: ["ink", "THE RULE"], means: "Tell research, method and product apart for neurofeedback and BCI. You use this in Block 1.1 for FocusSense's neurofeedback, in Block 1.2 for LearningPulse and in Block 2.1 for VisionMind Lab." }),
    ],
  }),
  A4: comicOf({
    id: "d15-a4", title: "Fund the question", teaser: "A study that starts with a device produces pictures.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Bastian wants to “do eye-tracking” on the whole app.", say: [["bastian", "Let's measure everything!"]], tag: ["plain", "A DEVICE"], means: "No question, no decision: only pictures." }),
      panel({ art: "a4-2", scene: "Ines asks what they need to know.", say: [["ines", "Why do people abandon transfers?"]], tag: ["teal", "A QUESTION"], means: "Start from what you need to know." }),
      panel({ art: "a4-3", scene: "They sort five ideas: research, experiment, product, not at all.", say: [["bastian", "So the stress-adaptive app waits."]], tag: ["teal", "THREE TRACKS"], means: "Keep experiments out of the product." }),
      panel({ art: "a4-4", scene: "Ines writes the chain.", say: [["ines", "Question, hypothesis, method, decision."]], tag: ["ink", "THE RULE"], means: "Separate research, experiment and product, and fund the question. You use this in Block 1.2 for LearningPulse and in Block 2.1 for VisionMind Lab's tracks and hypotheses." }),
    ],
  }),
  A5: comicOf({
    id: "d15-a5", title: "The pre-ticked box", teaser: "Consent is part of the design.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Bastian's update screen: a big Continue, a tiny pre-ticked box.", say: [["bastian", "Everyone agrees, technically."]], tag: ["plain", "HIDDEN"], means: "Agreement nobody knows they gave." }),
      panel({ art: "a5-2", scene: "Mara reads the small print and is angry.", say: [["mara", "My bank watches my eyes for adverts?", true]], tag: ["plain", "TRUST LOST"], means: "Gaze and brain data are intimate." }),
      panel({ art: "a5-3", scene: "Ines writes a clear invitation, with what Tessel will not infer.", say: [["ines", "No must be as easy as yes."]], tag: ["teal", "CLEAR"], means: "What, who, how long, what not, and a real no." }),
      panel({ art: "a5-4", scene: "They weigh three measures on five criteria.", say: [["ines", "Effect, feasibility, risk, time, reputation."]], tag: ["ink", "THE RULE"], means: "Design consent and weigh every measure with a reason. You use this in Block 1.1 for ethics and acceptance and in Block 2.1 for the consent framework and the four measures." }),
    ],
  }),
  B1: comicOf({
    id: "d15-b1", title: "We can see what they think", teaser: "A newsletter headline, and what stands behind it.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "The newsletter: “We can now see what our customers think.”", say: [["ines", "Based on eight colleagues and ten seconds?", true]], tag: ["plain", "FASCINATION"], means: "Measurement is mistaken for knowledge." }),
      panel({ art: "b1-2", scene: "Ines writes a vision: measure to simplify, never to judge.", say: [["ines", "First the vision. Then the tracks."]], tag: ["teal", "A VISION"], means: "What insight the company wants, and what it will not do." }),
      panel({ art: "b1-3", scene: "Three tracks and an evidence grade on the wall.", say: [["bastian", "So nothing reaches the app without a grade."]], tag: ["teal", "AN ARCHITECTURE"], means: "Research, UX analysis, product." }),
      panel({ art: "b1-4", scene: "Ines draws the layers.", say: [["ines", "Insight is an architecture, not a gadget."]], tag: ["ink", "THE RULE"], means: "Treat neuro-based UX as an insight architecture. You use this in Block 3.1 for the guiding vision, the three decisions and what is researched first." }),
    ],
  }),
  B2: comicOf({
    id: "d15-b2", title: "Three bets", teaser: "Safe, medium, bold: each with an exit date.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "The board wants a stress-adaptive app.", say: [["bastian", "Be first!"], ["ines", "With which valid measure?"]], tag: ["plain", "TWO GOALS"], means: "A scientific image against validity." }),
      panel({ art: "b2-2", scene: "Ines lays out three bets of different size.", say: [["ines", "Lab tests, an EEG study, and the app on the watch list."]], tag: ["teal", "A PORTFOLIO"], means: "A few bets, each with a hypothesis." }),
      panel({ art: "b2-3", scene: "Under each bet they write what it assumes.", say: [["bastian", "We assume the score means stress…"], ["ines", "Do we know?"]], tag: ["teal", "ASSUMPTIONS"], means: "Data quality, acceptance, maturity, value." }),
      panel({ art: "b2-4", scene: "Ines writes the rule.", say: [["ines", "A measure of success and an exit date first."]], tag: ["ink", "THE RULE"], means: "Name the conflicts, hold a portfolio, write down what each bet assumes. You use this in Block 3.1 for the decisions and the risk analysis." }),
    ],
  }),
  B3: comicOf({
    id: "d15-b3", title: "Who said yes?", teaser: "A headband study nobody approved.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "The data protection officer finds EEG data on a vendor's cloud.", say: [["bastian", "Who approved this?", true]], tag: ["plain", "NO OWNER"], means: "Neurodata without an owner is a risk." }),
      panel({ art: "b3-2", scene: "Ines writes four roles: standard, approval, studies, translation.", say: [["ines", "Every study gets an approval first."]], tag: ["teal", "GOVERNANCE"], means: "Owner, ethics review, evidence grade, translation." }),
      panel({ art: "b3-3", scene: "Little evidence yet. Ines decides on small lab tests anyway.", say: [["ines", "If two change nothing, we stop."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the record before anyone asks.", say: [["ines", "Who approves, what we infer, when we delete."]], tag: ["ink", "THE RULE"], means: "Give neurodata an owner and limits, and decide under uncertainty with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
