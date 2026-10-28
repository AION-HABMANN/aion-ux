import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 11 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Noor, Ole, Freya, Piet and the cooking app Ladle), so it is the card said again in pictures, not a new case. The last panel states the card's rule
 * and names the task block that uses it. The drawings are in components/day11/comicScenes.tsx.
 */
const NOTE = "Noor, Ole, Freya, Piet and Ladle are made up for this lesson, like the examples on the card: a Case assumption. HomeAssist Voice, CareVoice and CityHelp Voice, the cases of the task, are in the task.";
const NAMES = { noor: "Noor, a home cook", ole: "Ole, a home cook", freya: "Freya, UX designer", piet: "Piet, product owner" };

export const COMICS_D11 = bi({
  A1: comicOf({
    id: "d11-a1", title: "Flour on the phone", teaser: "Noor's hands are full; the screen is no help.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Noor kneads dough. The recipe is on the phone, across the counter.", say: [["noor", "How much milk again?", true]], tag: ["plain", "HANDS BUSY"], means: "A screen needs clean hands and eyes." }),
      panel({ art: "a1-2", scene: "She asks Ladle aloud. It answers at once.", say: [["noor", "Hands-free. Nice."]], tag: ["teal", "VOICE HELPS"], means: "Hands-free, fast, natural: voice's strengths." }),
      panel({ art: "a1-3", scene: "Ladle reads eight amounts in one go. Noor forgets the third.", say: [["noor", "Wait, what came after the eggs?", true]], tag: ["plain", "NOTHING TO LOOK AT"], means: "Once spoken, it is gone: voice's limit." }),
      panel({ art: "a1-4", scene: "Freya writes the strengths and limits side by side.", say: [["freya", "Voice for busy hands and short answers."]], tag: ["ink", "THE RULE"], means: "Name the chance and the limit of voice for each task. You use this in Block 1.1 for HomeAssist Voice, in Block 1.2 for CareVoice and in Block 2.1 for CityHelp Voice." }),
    ],
  }),
  A2: comicOf({
    id: "d11-a2", title: "Sorry, I didn't understand that", teaser: "Ole asks for a timer; Ladle says sorry, twice.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Ole: “Timer for the nuts.” Ladle: “Sorry, I didn't understand that.” Twice.", say: [["ole", "The nuts are burning!", true]], tag: ["plain", "A LOOP"], means: "Repeating the same sentence is not error handling." }),
      panel({ art: "a2-2", scene: "Freya rewrites it: “Five minutes, or ten?”", say: [["ole", "Five. Done."]], tag: ["teal", "A BETTER QUESTION"], means: "After a miss, ask a better question; after the second, offer another way." }),
      panel({ art: "a2-3", scene: "Ladle starts by saying what Ole can ask, and says back what it set.", say: [["ole", "So I can just say next. Good."]], tag: ["teal", "EXPECT · FEEDBACK"], means: "Clear expectations and feedback." }),
      panel({ art: "a2-4", scene: "Freya writes six words on the board.", say: [["freya", "Logic, expectations, feedback, errors, repeat, control."]], tag: ["ink", "THE RULE"], means: "Check every voice dialogue for the six requirements. You use this in Block 1.1 for HomeAssist Voice's misunderstandings, in Block 1.2 for guided against free dialogues and in Block 2.1 for CityHelp Voice's errors." }),
    ],
  }),
  A3: comicOf({
    id: "d11-a3", title: "Eight options", teaser: "Ladle reads a long menu; Noor remembers two.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Ladle reads eight options while Noor stirs.", say: [["noor", "Number six was…?", true]], tag: ["plain", "TOO MUCH"], means: "Working memory holds only a few things." }),
      panel({ art: "a3-2", scene: "Piet adds a tip, an offer and a streak to every answer.", say: [["piet", "More is more helpful!"]], tag: ["plain", "BUSY"], means: "Every extra sentence competes for the same small memory." }),
      panel({ art: "a3-3", scene: "The calm version: one step, one breath.", say: [["noor", "Step four. Got it."]], tag: ["teal", "CALM"], means: "Predictable, short answers are relief." }),
      panel({ art: "a3-4", scene: "Freya writes the neuro-design principles.", say: [["freya", "Predictable. Light on memory. Calm."]], tag: ["ink", "THE RULE"], means: "Lower the load, never raise it. You use this in Block 1.1 for predictability and relief at HomeAssist Voice and in Block 2.1 for CityHelp Voice's users who do not know what is possible." }),
    ],
  }),
  A4: comicOf({
    id: "d11-a4", title: "Behind the curtain", teaser: "Freya plays Ladle before anyone builds it.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Piet shows a perfect demo with three easy recipes.", say: [["piet", "It works!"]], tag: ["plain", "ONLY EASY CASES"], means: "A demo tests what makes a demo look good." }),
      panel({ art: "a4-2", scene: "Freya sits behind a screen and types Ladle's replies. Ole talks to it.", say: [["ole", "Can I swap the nuts?"]], tag: ["teal", "WIZARD OF OZ"], means: "An interaction prototype tests the dialogue before it is built." }),
      panel({ art: "a4-3", scene: "In real kitchens, with the fan on and an allergy question.", say: [["freya", "This is where it breaks."]], tag: ["teal", "TEST THE RISKY ONES"], means: "A test prototype with risky scenarios on purpose." }),
      panel({ art: "a4-4", scene: "Freya sorts the tests by risk level.", say: [["freya", "Choose the prototype by the question."]], tag: ["ink", "THE RULE"], means: "Functional, interaction or test prototype; test by risk level. You use this in Block 2.1 for CityHelp Voice's risk-based test scenarios and in Block 1.2 where tests have only begun." }),
    ],
  }),
  A5: comicOf({
    id: "d11-a5", title: "Talk to Ladle about anything", teaser: "Piet wants a free AI chat; Freya asks five questions.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Piet wants voice for everything, also paying and allergies.", say: [["piet", "Ask me anything!"]], tag: ["plain", "EVERYWHERE"], means: "Not every task suits voice." }),
      panel({ art: "a5-2", scene: "Freya asks five questions of each task.", say: [["freya", "Hands busy? Frequent? Few choices? Short? Cheap if wrong?"]], tag: ["teal", "FIVE QUESTIONS"], means: "Voice where most answers are yes." }),
      panel({ art: "a5-3", scene: "They rate three measures on four questions.", say: [["piet", "The free chat is the most exciting…"], ["freya", "…and the riskiest."]], tag: ["teal", "FOUR CRITERIA"], means: "Effect on users, feasibility, risk, time pressure." }),
      panel({ art: "a5-4", scene: "They choose the hint and the screen after a second miss.", say: [["freya", "Reliable before impressive. Here is why."]], tag: ["ink", "THE RULE"], means: "Keep voice where it supports reliably, and weigh every measure with a reason. You use this in Block 1.2 to choose a CareVoice design and in Block 2.1 for the four measures and their justification." }),
    ],
  }),
  B1: comicOf({
    id: "d11-b1", title: "A microphone on every screen", teaser: "Every team added voice; no two dialogues behave alike.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Every screen got a microphone. Each one answers differently.", say: [["ole", "Why does the shop talk differently?", true]], tag: ["plain", "NO ARCHITECTURE"], means: "Voice added one feature at a time makes a service nobody designed." }),
      panel({ art: "b1-2", scene: "Freya drafts what relief voice gives, and where it is not used.", say: [["freya", "First the vision. Then the fields of use."]], tag: ["teal", "A VISION"], means: "A guiding vision decides relief, control and experience once." }),
      panel({ art: "b1-3", scene: "Shared principles and tests, built once.", say: [["piet", "So the oven speaks like the app."]], tag: ["teal", "PRINCIPLES"], means: "Principles and test standards turn the vision into every touchpoint." }),
      panel({ art: "b1-4", scene: "Freya draws the layers.", say: [["freya", "Robust core uses first."]], tag: ["ink", "THE RULE"], means: "Treat voice as service architecture, not an innovation signal. You use this in Block 3.1 for the guiding vision, the three decisions and what comes first." }),
    ],
  }),
  B2: comicOf({
    id: "d11-b2", title: "One sentence to pay", teaser: "Sales wants ordering by voice; support says no.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Sales wants one-sentence ordering and paying.", say: [["piet", "Order everything by voice!"], ["freya", "And if it mishears?"]], tag: ["plain", "TWO GOALS"], means: "Comfort against precision, innovation against trust." }),
      panel({ art: "b2-2", scene: "Freya sorts three journeys by how free voice may be.", say: [["freya", "Timers free. Allergies with a screen. Paying on the screen."]], tag: ["teal", "PER JOURNEY"], means: "Decide per journey by the cost of a mistake." }),
      panel({ art: "b2-3", scene: "They write down what they assume about scale.", say: [["piet", "Three journeys work. Twenty?"]], tag: ["teal", "ASSUMPTIONS"], means: "Each new journey multiplies words, errors and tests." }),
      panel({ art: "b2-4", scene: "Freya writes the rule.", say: [["freya", "Free where cheap, checked where it matters."]], tag: ["ink", "THE RULE"], means: "Name each conflict, decide per journey, and write down the critical assumptions. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts." }),
    ],
  }),
  B3: comicOf({
    id: "d11-b3", title: "Who said it was tested?", teaser: "A wrong allergy answer; nobody signed off.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "A cook complains: Ladle suggested hazelnuts for a nut-free cake.", say: [["piet", "Who tested that?", true]], tag: ["plain", "NO OWNER"], means: "Without test standards, the public finds the risky cases." }),
      panel({ art: "b3-2", scene: "Freya writes an owner, test standards by risk and a stop right.", say: [["freya", "No high-risk answer without sign-off."]], tag: ["teal", "GOVERNANCE"], means: "An owner, test standards, a stop right, a rule for conflicts." }),
      panel({ art: "b3-3", scene: "Test data is thin. Freya decides anyway and says when to reverse.", say: [["freya", "Steps and timers only. If many sessions fail, we look again."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the paragraph before anyone asks.", say: [["freya", "Who owns it, what was tested, who can stop it."]], tag: ["ink", "THE RULE"], means: "Give voice an owner, test standards and a stop right, and decide under uncertainty with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
