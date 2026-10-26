import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 1 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Mia, Tom, Jana, Ben and the travel-booking app Nordwind), so it is the card said again in pictures, not a new case. The last panel states the card's
 * rule and names the task block that uses it. The drawings are in components/day1/comicScenes.tsx.
 */
const NOTE = "Mia, Tom, Jana, Ben and Nordwind are made up for this lesson, like the examples on the card: a Case assumption. CarePath, SkillFlow and SafeHome Online, the cases of the task, are in the task.";
const NAMES = { mia: "Mia, a customer", tom: "Tom, a customer", jana: "Jana, UX lead", ben: "Ben, product owner" };

export const COMICS_D1 = bi({
  A1: comicOf({
    id: "d1-a1", title: "Looks good, works badly", teaser: "Mia likes a booking page and still cannot book.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Mia wants to book a weekend in Lisbon. The page is beautiful: a large photo, the dates in thin grey type and three buttons that look the same.", say: [["mia", "Which one books? Details, Book, Share… they all look alike.", true]], tag: ["plain", "IT LOOKS GOOD"], means: "The surface is attractive, but Mia has to read and compare before she can act. A design is judged by its effect: what she notices, understands, feels and does.", look: "the three equal buttons" }),
      panel({ art: "a1-2", scene: "Jana, the UX lead, separates two things the team keeps mixing up.", say: [["jana", "UX is everything Mia goes through. UI is only the surface she sees and touches."]], tag: ["teal", "UX AND UI"], means: "UX covers perception, cognition, attention, emotion and the mental model a person has of the product. The UI is one part of it." }),
      panel({ art: "a1-3", scene: "The team tries a plainer page: the trip, the dates in large type and one strong Book button.", say: [["mia", "Lisbon, three nights, Book now. Done."]], tag: ["teal", "IT WORKS"], means: "The plainer page works better: one clear action, the facts she needs, nothing to compare. Looking good and working well are not the same thing." }),
      panel({ art: "a1-4", scene: "Jana keeps one test for any design discussion.", say: [["jana", "Don't tell me you like it. Tell me what people will notice and do."]], tag: ["ink", "THE RULE"], means: "Say the effect, not your taste: what is noticed, understood, felt and done. You use this in Block 1.1 to describe what CarePath does to its users and in Block 2.1 for the effect problems of SafeHome Online." }),
    ],
  }),
  A2: comicOf({
    id: "d1-a2", title: "Two pulls on the eye", teaser: "A flashing banner and Mia's own goal pull her eye to different places.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Mia opens her trip page. A red, flashing sale banner sits at the top.", say: [["mia", "Flash sale? Where…", true]], tag: ["plain", "BOTTOM-UP"], means: "A strong signal pulls attention by itself: it is red, it moves, it differs from everything around it. This is bottom-up attention, and it works whether or not the signal matters.", look: "the ring around the banner" }),
      panel({ art: "a2-2", scene: "But Mia came to change her booking. She scans the page for exactly those words.", say: [["mia", "Change booking… there."]], tag: ["teal", "TOP-DOWN"], means: "Her goal steers her eye too. This is top-down attention: what a person wants, knows and expects decides where they look." }),
      panel({ art: "a2-3", scene: "Both pull at once. The banner keeps catching her eye while she looks for the small link, and she taps the banner by mistake.", say: [["mia", "Oops, that is the sale, not my booking."]], tag: ["plain", "BOTH AT ONCE"], means: "When the strongest signal on the screen is not the task, it competes with the task. People are slower and make more mistakes." }),
      panel({ art: "a2-4", scene: "Jana sums up what the team checks on every screen.", say: [["jana", "Is the strongest thing on the screen the thing people came for?"]], tag: ["ink", "THE RULE"], means: "A strong signal that is not the task is a distraction; let the signal and the goal point to the same place. You use this in Block 1.1 to mark what binds or distracts attention in CarePath and in Block 1.2 to rate the three start pages." }),
    ],
  }),
  A3: comicOf({
    id: "d1-a3", title: "Where people expect things", teaser: "Tom looks for the menu at the top and the next step on the screen.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Tom checks in for a flight. He looks for the menu at the top right, where every other app has it. Nordwind put it in the footer.", say: [["tom", "Where is the menu?", true]], tag: ["plain", "AGAINST HABIT"], means: "People bring prior knowledge, expectations and habits. A design that goes against them costs time and causes mistakes." }),
      panel({ art: "a3-2", scene: "On the seat screen four buttons look the same: Continue, Skip, Change flight, Extras.", say: [["tom", "Which one takes me on?"]], tag: ["plain", "NO ORDER"], means: "Four equal buttons give no visual order. Tom has to read and compare, which adds to his mental load." }),
      panel({ art: "a3-3", scene: "The new version shows “Step 2 of 3”, one strong Continue button and the menu at the top right.", say: [["tom", "Step two of three, continue. Easy."]], tag: ["teal", "THREE AIMS MET"], means: "Orientation (where am I, what next), less confusion (one main action) and steered attention (the task is the strongest thing) make the screen easy to use." }),
      panel({ art: "a3-4", scene: "Jana writes the three aims on the team's board.", say: [["jana", "Where am I, what can I do, what comes next: answered at a glance."]], tag: ["ink", "THE RULE"], means: "Check orientation, confusion and attention, and use what people expect. You use this in Block 1.1 to sort CarePath's problems, in Block 1.2 for orientation and understandability, and in Block 2.1 for perception and action guidance." }),
    ],
  }),
  A4: comicOf({
    id: "d1-a4", title: "The first second", teaser: "The same payment step makes people feel unsafe, pushed or at ease.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Mia reaches the payment step. Two red warnings say she must check everything and that errors may cancel her trip, although nothing is wrong.", say: [["mia", "Is something wrong with my booking?", true]], tag: ["plain", "ALARM"], means: "People feel a screen before they read it. Warnings that do not match a real risk create a feeling of danger and cost trust." }),
      panel({ art: "a4-2", scene: "Tom gets another version: a countdown and “only 1 seat left!”.", say: [["tom", "Don't rush me. I'll book somewhere else."]], tag: ["plain", "PRESSURE"], means: "Pressure can trigger reactance: the urge to resist when you feel pushed. The design causes the opposite of what it wanted." }),
      panel({ art: "a4-3", scene: "The calm version says it is the last step, that everything can still be changed and that the payment is secure.", say: [["mia", "Fine, I can still change it. Pay."]], tag: ["teal", "CALM"], means: "A sense of safety and control lets people go on. Trust, reactance, overload, safety and liking all work before thinking." }),
      panel({ art: "a4-4", scene: "Jana shows the team how to write such an effect down.", say: [["jana", "This red warning could make users feel unsafe. That's a hypothesis we can test."]], tag: ["ink", "THE RULE"], means: "Write an effect as a hypothesis: this element could make users feel or do something. You use this in Block 1.1 for the hypothesis per category and the three places of unconscious effect." }),
    ],
  }),
  A5: comicOf({
    id: "d1-a5", title: "Which fix first", teaser: "Ben has three ideas, and there is time for one.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Ben, the product owner, has three ideas for the next release: one clear Book button, a step line in the check-in, and large photos on every page.", say: [["ben", "Which one first? We only have time for one."]], tag: ["plain", "THREE IDEAS"], means: "Measures compete for the same time and people. To put them in order, weigh each one on the same questions." }),
      panel({ art: "a5-2", scene: "Jana weighs the Book button on four questions: the effect on users, whether it can be done, the risk and whether it fits the time.", say: [["jana", "High effect, easy to do, low risk, fits the release."]], tag: ["teal", "WEIGHED"], means: "Effect on users, feasibility, risk and time pressure, each with a reason. The reason counts more than the rating." }),
      panel({ art: "a5-3", scene: "The photos look good, but they push the dates and the Book button down.", say: [["ben", "So the nicest idea is the riskiest one?"]], tag: ["plain", "A HIGH RISK"], means: "A measure can make the product more attractive and still work against what people came for. That is a risk, not a detail." }),
      panel({ art: "a5-4", scene: "The team writes down the order and the reasons.", say: [["jana", "Button first, step line next, photos later. And here is why."]], tag: ["ink", "THE RULE"], means: "Weigh every measure on effect, feasibility, risk and time, with a reason next to each, and let the order follow. You use this in Block 1.1 for a first prioritisation, in Block 1.2 for the decision and in Block 2.1 for the four measures and their justification." }),
    ],
  }),
  B1: comicOf({
    id: "d1-b1", title: "One effect for every channel", teaser: "Mia books on the website and gets lost in the app.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Mia booked on the website. Now she opens the app to check in. The app does not say “booking”, it says “trip”, and the next step is somewhere else.", say: [["mia", "Where is my booking?", true]], tag: ["plain", "LOST BETWEEN"], means: "A design steers what people perceive, understand, do and decide. When each channel steers differently, people are lost at the changeovers." }),
      panel({ art: "b1-2", scene: "Ben explains how it happened.", say: [["ben", "Each team improved its own screens. Nobody owned the whole journey."]], tag: ["plain", "SINGLE FIXES"], means: "Isolated design changes can each be good and still add up to a confusing whole." }),
      panel({ art: "b1-3", scene: "Jana proposes one effect for every channel: customers always know where they are and can trust what they read.", say: [["jana", "One word, one next step, one meaning for red. Everywhere."]], tag: ["teal", "ONE EFFECT"], means: "A Neuro-UX strategy chooses the effect first and makes every touchpoint serve it." }),
      panel({ art: "b1-4", scene: "The team writes the strategy in one line.", say: [["jana", "Start from the effect we want, not from the next screen."]], tag: ["ink", "THE RULE"], means: "Start from the effect on perception, behaviour and decision, and keep it the same in every channel. You use this in Block 3.1 for the guiding vision, the three strategic decisions and the order of touchpoints." }),
    ],
  }),
  B2: comicOf({
    id: "d1-b2", title: "Two goals at once", teaser: "Activation or fewer calls: Nordwind cannot have the most of both.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Ben wants an animated wall of deals to raise activation. Tom from support wants fewer calls from confused customers.", say: [["ben", "More excitement!"], ["tom", "Fewer questions, please."]], tag: ["plain", "TWO GOALS"], means: "Goals pull against each other: activation against overload, aesthetics against clarity, innovation against familiarity." }),
      panel({ art: "b2-2", scene: "Jana places five designs on two axes: how clear they are and how much they activate.", say: [["jana", "The deals wall excites but nobody finds the booking. The plain list is clear but dull."]], tag: ["teal", "THE MATRIX"], means: "The aim is the top right: clear enough to act on, activating enough to want to. Every other place gives something up." }),
      panel({ art: "b2-3", scene: "The team chooses the next trip first, with one inspiring tip, and writes down what it gives up.", say: [["jana", "We give up the deals wall. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision between conflicting goals names the conflict, chooses and says what is given up. At management level, effort, risk, brand and economics join the list." }),
      panel({ art: "b2-4", scene: "Jana adds the three standing conflicts to the team's checklist.", say: [["jana", "Name the two goals before you choose."]], tag: ["ink", "THE RULE"], means: "Name the conflict as two goals, choose, and say what you give up. You use this in Block 3.1 for the guiding decisions, the risk analysis and the rule for conflicts between departments." }),
    ],
  }),
  B3: comicOf({
    id: "d1-b3", title: "Decide without knowing everything", teaser: "Nordwind does not know where customers are lost. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "Ben does not know whether customers get lost coming from the website or from e-mail links.", say: [["ben", "Shouldn't we wait until we have the data?"]], tag: ["plain", "MISSING DATA"], means: "Perfect information never arrives. Waiting is also a decision, and it has its own cost." }),
      panel({ art: "b3-2", scene: "Jana decides, and says what she does not know and when she would reverse it.", say: [["jana", "We start with the change-booking path. If calls don't drop, we change course."]], tag: ["teal", "A DECISION"], means: "A decision under uncertainty says what is decided, what is not known, when it would be reversed and what is given up." }),
      panel({ art: "b3-3", scene: "Ben asks who has the last word when departments disagree.", say: [["jana", "The head of customer experience decides; legal and IT can object with a reason; the board settles a tie."]], tag: ["teal", "WHO DECIDES"], means: "Accountability needs rules: who may decide what, who answers for it and how a conflict is settled. That is governance." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["jana", "Effect, not taste. Rules for who decides. Decide, then check."]], tag: ["ink", "THE RULE"], means: "An accountable decision names the effect, the risk and what is not known, and says when it will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the board." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
