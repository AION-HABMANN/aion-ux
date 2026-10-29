import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 12 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Kofi, Liv, Sanne, Henrik and the online grocer Greenway), so it is the card said again in pictures, not a new case. The last panel states the card's
 * rule and names the task block that uses it. The drawings are in components/day12/comicScenes.tsx.
 */
const NOTE = "Kofi, Liv, Sanne, Henrik and Greenway are made up for this lesson, like the examples on the card: a Case assumption. PublicAccess, LearnAccess and CitizenConnect, the cases of the task, are in the task.";
const NAMES = { kofi: "Kofi, a customer who uses a screen reader", liv: "Liv, a customer with dyslexia", sanne: "Sanne, UX designer", henrik: "Henrik, product owner" };

export const COMICS_D12 = bi({
  A1: comicOf({
    id: "d12-a1", title: "Button, button, image", teaser: "The checkout works. Not for Kofi.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Henrik shows the new checkout. It works perfectly with a mouse.", say: [["henrik", "Done! It works."]], tag: ["plain", "IT WORKS"], means: "Working is not the same as usable by everyone." }),
      panel({ art: "a1-2", scene: "Kofi's screen reader says: button, button, image.", say: [["kofi", "Which one pays?", true]], tag: ["plain", "LEFT OUT"], means: "A barrier is a mismatch between a design and a person." }),
      panel({ art: "a1-3", scene: "Sanne lists who else meets the same barrier: a broken arm, bright sun.", say: [["sanne", "Permanent, temporary, situational."]], tag: ["teal", "MANY PEOPLE"], means: "One barrier stops many kinds of people." }),
      panel({ art: "a1-4", scene: "Sanne writes the rule.", say: [["sanne", "Ask who is left out, not only whether it works."]], tag: ["ink", "THE RULE"], means: "Design with the full range of people. You use this in Block 1.1 for PublicAccess's hurdles and in Block 1.2 for LearnAccess's users." }),
    ],
  }),
  A2: comicOf({
    id: "d12-a2", title: "Elegant grey", teaser: "The brand guide chose light grey. Liv's mother cannot read it.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "The new design uses light grey for prices and delivery times.", say: [["henrik", "So elegant!"]], tag: ["plain", "FAINT"], means: "Weak contrast looks refined on a good screen." }),
      panel({ art: "a2-2", scene: "Outside in the sun, Liv cannot read her delivery time.", say: [["liv", "Is it Thursday or Tuesday?", true]], tag: ["plain", "GONE"], means: "Contrast is for everyone: sun, old screens, older eyes." }),
      panel({ art: "a2-3", scene: "Sanne measures the contrast and darkens the text.", say: [["sanne", "2.4 to 1. We need 4.5."]], tag: ["teal", "MEASURE IT"], means: "Contrast can be measured, not guessed." }),
      panel({ art: "a2-4", scene: "Sanne adds words to every colour-only hint.", say: [["sanne", "Contrast, words, text alternatives."]], tag: ["ink", "THE RULE"], means: "Make it perceivable for everyone. You use this in Block 1.1 for PublicAccess's colour and contrast, in Block 1.2 for LearnAccess A and in Block 2.1 for CitizenConnect." }),
    ],
  }),
  A3: comicOf({
    id: "d12-a3", title: "Put the mouse away", teaser: "Sanne hides Henrik's mouse for ten seconds.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Kofi presses Tab. The focus jumps from the logo to the footer.", say: [["kofi", "Where is Pay?", true]], tag: ["plain", "NO KEYBOARD"], means: "If it does not work by keyboard, many people cannot use it." }),
      panel({ art: "a3-2", scene: "Sanne takes Henrik's mouse away. He presses Tab.", say: [["henrik", "I can't see where I am!", true]], tag: ["plain", "NO FOCUS"], means: "The focus must be visible." }),
      panel({ art: "a3-3", scene: "Real buttons, in reading order, with a strong focus marker.", say: [["kofi", "Tab, Tab, Enter. Paid."]], tag: ["teal", "OPERABLE"], means: "Keyboard, visible focus, sensible order." }),
      panel({ art: "a3-4", scene: "Sanne writes the test on the board.", say: [["sanne", "Ten seconds, no mouse, every release."]], tag: ["ink", "THE RULE"], means: "Test with the keyboard alone. You use this in Block 1.1 for PublicAccess's mouse-only navigation and in Block 2.1 for CitizenConnect's patchy keyboard operation." }),
    ],
  }),
  A4: comicOf({
    id: "d12-a4", title: "Invalid input", teaser: "Liv makes one mistake and gives up.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "The delivery form: one sentence of forty words.", say: [["liv", "What do they want from me?", true]], tag: ["plain", "OFFICIAL WORDS"], means: "Long nested sentences exclude many readers." }),
      panel({ art: "a4-2", scene: "Liv types a date. The form says: Invalid input.", say: [["liv", "Which part?", true]], tag: ["plain", "NO HELP"], means: "An error must say what, where and how to fix it." }),
      panel({ art: "a4-3", scene: "Sanne rewrites: Where should we deliver? and an example date.", say: [["liv", "Oh. Easy."]], tag: ["teal", "PLAIN AND KIND"], means: "Plain words and helpful errors help everyone." }),
      panel({ art: "a4-4", scene: "Sanne writes the rule.", say: [["sanne", "Plain words. Clear labels. Errors that help."]], tag: ["ink", "THE RULE"], means: "Make it understandable and error-tolerant. You use this in Block 1.1 for PublicAccess's forms and in Block 2.1 for CitizenConnect's forms, language and page types." }),
    ],
  }),
  A5: comicOf({
    id: "d12-a5", title: "The magic widget", teaser: "A sales e-mail promises 100% compliance in one line of code.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Henrik reads an offer: an accessibility widget, compliant today.", say: [["henrik", "One line of code!"]], tag: ["plain", "A SHORTCUT"], means: "A widget on top does not repair what is underneath." }),
      panel({ art: "a5-2", scene: "Sanne shows the four principles and the law.", say: [["sanne", "Perceivable, operable, understandable, robust."]], tag: ["teal", "THE STANDARD"], means: "WCAG level AA; the law in the EU." }),
      panel({ art: "a5-3", scene: "They rate three measures on five criteria.", say: [["henrik", "The widget is fastest…"], ["sanne", "…and changes nothing."]], tag: ["teal", "FIVE CRITERIA"], means: "Effect, legal certainty, feasibility, risk, time." }),
      panel({ art: "a5-4", scene: "They choose to fix the shared components first.", say: [["sanne", "Fix it where it is made. Here is why."]], tag: ["ink", "THE RULE"], means: "Build accessibility in early, and weigh every measure with a reason. You use this in Block 1.2 for legal certainty and in Block 2.1 for the four measures and their justification." }),
    ],
  }),
  B1: comicOf({
    id: "d12-b1", title: "Partially compliant", teaser: "Every year the same audit, the same statement.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "The yearly audit: 140 failures. The statement says “partially compliant”, again.", say: [["henrik", "Didn't we fix this last year?", true]], tag: ["plain", "A CHECK AT THE END"], means: "Accessibility as a compliance task comes too late." }),
      panel({ art: "b1-2", scene: "Sanne writes what every customer must be able to do.", say: [["sanne", "First the vision. Then the target."]], tag: ["teal", "A VISION"], means: "A guiding vision of participation, and a target level." }),
      panel({ art: "b1-3", scene: "Accessible buttons, fields and tiles in the design system.", say: [["henrik", "So every new page is right from the start."]], tag: ["teal", "WHERE IT IS MADE"], means: "Fix barriers in components and rules, not page by page." }),
      panel({ art: "b1-4", scene: "Sanne draws the layers.", say: [["sanne", "Part of done, not a check at the end."]], tag: ["ink", "THE RULE"], means: "Treat accessibility as quality and responsibility. You use this in Block 3.1 for the guiding vision, the three decisions and what comes first." }),
    ],
  }),
  B2: comicOf({
    id: "d12-b2", title: "Our green", teaser: "The brand team loves the light green. It fails.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "The brand team insists on light green buttons with white text.", say: [["henrik", "It is our colour!"], ["sanne", "And nobody can read it."]], tag: ["plain", "TWO GOALS"], means: "Brand look against legibility." }),
      panel({ art: "b2-2", scene: "Sanne proposes: light green for shapes, a darker green for text.", say: [["sanne", "The brand stays. The text passes."]], tag: ["teal", "BOTH"], means: "Decide where the brand lives and where the rule applies." }),
      panel({ art: "b2-3", scene: "They write down what they assume about their customers.", say: [["henrik", "Disabled customers are a small group…"], ["sanne", "Are they?"]], tag: ["teal", "ASSUMPTIONS"], means: "Permanent, temporary, situational, older: a large share." }),
      panel({ art: "b2-4", scene: "Sanne writes the rule.", say: [["sanne", "Fix once, options on top, law as the floor."]], tag: ["ink", "THE RULE"], means: "Name each conflict, decide where to fix once, and write down the critical assumptions. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts." }),
    ],
  }),
  B3: comicOf({
    id: "d12-b3", title: "Who can say no?", teaser: "A release goes out with a keyboard trap. Nobody could stop it.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "A new checkout ships. Kofi is trapped in the voucher box.", say: [["kofi", "I can't get out!", true]], tag: ["plain", "NO OWNER"], means: "Without a check in every release, barriers come back." }),
      panel({ art: "b3-2", scene: "Sanne writes an owner, a check in “done” and a stop right.", say: [["sanne", "No release that excludes someone."]], tag: ["teal", "GOVERNANCE"], means: "An owner, a target, a check, a stop right, a rule for conflicts." }),
      panel({ art: "b3-3", scene: "Complaints are not sorted. Sanne decides anyway.", say: [["sanne", "Components and checkout first. If tests say otherwise, we change."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the paragraph before anyone asks.", say: [["sanne", "Who owns it, what we check, who can stop it."]], tag: ["ink", "THE RULE"], means: "Give accessibility an owner and a check in every release, and decide under uncertainty with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
