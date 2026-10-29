import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 13 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Ayo, Mirko, Tilda, Pia, Lukas and the energy supplier Hearth Energy), so it is the card said again in pictures, not a new case. The last panel states
 * the card's rule and names the task block that uses it. The drawings are in components/day13/comicScenes.tsx.
 */
const NOTE = "Ayo, Mirko, Tilda, Pia, Lukas and Hearth Energy are made up for this lesson, like the examples on the card: a Case assumption. StudyPath, JobAccess and LifeGuide, the cases of the task, are in the task.";
const NAMES = { ayo: "Ayo, a customer with ADHD", mirko: "Mirko, an autistic customer", tilda: "Tilda, a customer with dyslexia", pia: "Pia, UX designer", lukas: "Lukas, product owner" };

export const COMICS_D13 = bi({
  A1: comicOf({
    id: "d13-a1", title: "Three customers, one screen", teaser: "The same start page stops three people for three reasons.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Ayo opens the app. Offers, badges and a bell call at once. He forgets why he came.", say: [["ayo", "Wait, what was I doing?", true]], tag: ["plain", "OVERLOAD"], means: "ADHD: overstimulation and an unclear task." }),
      panel({ art: "a1-2", scene: "Mirko sees icons without words and a red “4”.", say: [["mirko", "Four what?", true]], tag: ["plain", "UNCLEAR"], means: "Autism: ambiguous signals, unpredictable taps." }),
      panel({ art: "a1-3", scene: "Tilda finds the key line: tiny, grey, then a wall of text.", say: [["tilda", "I'll ask Jonas to do it.", true]], tag: ["plain", "READING"], means: "Dyslexia: typography and dense text." }),
      panel({ art: "a1-4", scene: "Pia writes three lenses on the board.", say: [["pia", "What overloads, what confuses, what tires?"]], tag: ["ink", "THE RULE"], means: "Look at every screen through three lenses. You use this in Block 1.1 for StudyPath and in Block 2.1 for LifeGuide's deficits." }),
    ],
  }),
  A2: comicOf({
    id: "d13-a2", title: "One more banner", teaser: "Every team wanted to be seen. The task disappeared.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Lukas adds a winter deal, a quiz and a chat bubble to the start page.", say: [["lukas", "Just one more banner!"]], tag: ["plain", "STACKING"], means: "Each element competes for the same attention." }),
      panel({ art: "a2-2", scene: "Ayo taps the quiz, then the chat. The meter reading stays unsent.", say: [["ayo", "Oh no, the deadline!", true]], tag: ["plain", "DRIFT"], means: "A busy page is easy to drift from." }),
      panel({ art: "a2-3", scene: "Pia shows one next step and one button; the long form becomes three steps.", say: [["ayo", "Done in thirty seconds."]], tag: ["teal", "CALM"], means: "One main task, quiet extras, short steps." }),
      panel({ art: "a2-4", scene: "Pia writes the rule.", say: [["pia", "One task per screen. Everything else quiet."]], tag: ["ink", "THE RULE"], means: "Reduce stimuli and break tasks into steps. You use this in Block 1.1 for StudyPath's start page, in Block 1.2 for JobAccess A and in Block 2.1 for LifeGuide." }),
    ],
  }),
  A3: comicOf({
    id: "d13-a3", title: "Go, OK, Let's go", teaser: "Three pages, three menus, three names for one button.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "On each page the menu moves and the main button has a new name.", say: [["mirko", "What does “Go” do?", true]], tag: ["plain", "INCONSISTENT"], means: "Inconsistent patterns make every page new." }),
      panel({ art: "a3-2", scene: "The confirmation says “You're all set!”.", say: [["mirko", "Set for what?", true]], tag: ["plain", "AMBIGUOUS"], means: "Idioms and vague words hide what happened." }),
      panel({ art: "a3-3", scene: "Menu at the top everywhere; buttons say what they do.", say: [["mirko", "“Send meter reading.” Clear."]], tag: ["teal", "PREDICTABLE"], means: "Same place, same name, literal words." }),
      panel({ art: "a3-4", scene: "Pia writes the rule.", say: [["pia", "Same place. Same name. Say what it does."]], tag: ["ink", "THE RULE"], means: "Make it predictable. You use this in Block 1.1 for StudyPath's varying navigation and in Block 2.1 for LifeGuide's inconsistent patterns." }),
    ],
  }),
  A4: comicOf({
    id: "d13-a4", title: "The wall of text", teaser: "Tilda reads the same notice twice and still does not know.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "The notice: capitals, italics, justified, one long sentence.", say: [["tilda", "The words swim.", true]], tag: ["plain", "HARD TO READ"], means: "Typography can stop a reader." }),
      panel({ art: "a4-2", scene: "Pia moves the sliders: larger, more line height, left-aligned.", say: [["tilda", "Better…"]], tag: ["teal", "TYPOGRAPHY"], means: "Size, spacing, alignment, line length." }),
      panel({ art: "a4-3", scene: "Then the plain version: four short sentences.", say: [["tilda", "Send it by 31 October. Got it."]], tag: ["teal", "PLAIN WORDS"], means: "Plain language does the rest." }),
      panel({ art: "a4-4", scene: "Pia writes the rule.", say: [["pia", "Left, large, spaced, short, plain."]], tag: ["ink", "THE RULE"], means: "Set text for readers, not for print. You use this in Block 1.1 for StudyPath's texts and in Block 2.1 for LifeGuide's texts." }),
    ],
  }),
  A5: comicOf({
    id: "d13-a5", title: "Test it with them", teaser: "The team was sure the new form was easy. Six customers said otherwise.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Lukas is sure the new form is easy: the team finished it in a minute.", say: [["lukas", "It's obvious!"]], tag: ["plain", "ASSUMPTION"], means: "The team's minds are not the customers' minds." }),
      panel({ art: "a5-2", scene: "In a quiet room, Ayo, Mirko and Tilda try the prototype. A phone rings mid-form.", say: [["ayo", "Where was I?", true]], tag: ["teal", "A REAL TEST"], means: "Prototypes tested with real people show real hurdles." }),
      panel({ art: "a5-3", scene: "Tilda uses read-aloud; Mirko uses a screen reader's list of buttons.", say: [["tilda", "Read-aloud helps, if the text is real."]], tag: ["teal", "ASSISTIVE TECH"], means: "Assistive technology works on a good base." }),
      panel({ art: "a5-4", scene: "Pia writes what to test first.", say: [["pia", "Entry pages, navigation, core forms. With them."]], tag: ["ink", "THE RULE"], means: "Use patterns that help many, and test with neurodivergent people. You use this in Block 2.1 for the four measures and the prototype and test approach." }),
    ],
  }),
  B1: comicOf({
    id: "d13-b1", title: "The easy mode", teaser: "A switch nobody found.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Lukas ships an “easy mode” in the settings. Few customers find it.", say: [["lukas", "We have inclusion now!"]], tag: ["plain", "A SPECIAL CASE"], means: "An option on top leaves the default unchanged." }),
      panel({ art: "b1-2", scene: "Pia draws a calm default for every product.", say: [["pia", "Build a better base."]], tag: ["teal", "A VISION"], means: "Calm, predictable, readable by default." }),
      panel({ art: "b1-3", scene: "The patterns go into the design system; modes come later, after tests.", say: [["lukas", "So every product gets it."]], tag: ["teal", "PATTERNS"], means: "Patterns carry the base into every product." }),
      panel({ art: "b1-4", scene: "Pia draws the layers.", say: [["pia", "Base first, modes on top."]], tag: ["ink", "THE RULE"], means: "Treat neurodiversity as architecture, not a special case. You use this in Block 3.1 for the guiding vision, the three decisions and what comes first." }),
    ],
  }),
  B2: comicOf({
    id: "d13-b2", title: "Make it pop", teaser: "Marketing wants motion; support wants calm.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Marketing wants animated offers; support wants a calm start page.", say: [["lukas", "Make it pop!"], ["pia", "And the meter reading?"]], tag: ["plain", "TWO GOALS"], means: "A dynamic brand against a calm interface." }),
      panel({ art: "b2-2", scene: "Pia moves the brand into colour and tone; the offers go below the task.", say: [["pia", "The brand lives. The task leads."]], tag: ["teal", "BOTH"], means: "Decide where the brand lives." }),
      panel({ art: "b2-3", scene: "They write down what they assume about their customers.", say: [["lukas", "Neurodivergent customers are few…"], ["pia", "And stressed ones?"]], tag: ["teal", "ASSUMPTIONS"], means: "Diversity, standardisation, cost." }),
      panel({ art: "b2-4", scene: "Pia writes the rule.", say: [["pia", "Base for all, modes where needs pull apart."]], tag: ["ink", "THE RULE"], means: "Name each conflict, decide base or mode, and write down the critical assumptions. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts." }),
    ],
  }),
  B3: comicOf({
    id: "d13-b3", title: "Just this one exception", teaser: "Each product changed the pattern a little.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "Two years later every product has its own menu again.", say: [["mirko", "It changed again.", true]], tag: ["plain", "DRIFT"], means: "Without an owner, a design system drifts." }),
      panel({ art: "b3-2", scene: "Pia names owners for the principles, the patterns and the tests.", say: [["pia", "Exceptions need a yes from the owner."]], tag: ["teal", "GOVERNANCE"], means: "Owners, a test strategy with a stop right, checks in every release." }),
      panel({ art: "b3-3", scene: "Nobody knows who would use a mode. Pia decides anyway.", say: [["pia", "Calm base first. If tests show a group stuck, their mode next."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the paragraph before anyone asks.", say: [["pia", "Who owns it, how we test, who can stop it."]], tag: ["ink", "THE RULE"], means: "Give neurodiverse UX owners and a test strategy, and decide under uncertainty with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
