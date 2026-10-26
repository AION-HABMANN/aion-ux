import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 5 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Leon, Mara, Priya, Tobias and the ticket app Ticketo), so it is the card said again in pictures, not a new case. The last panel states the card's rule and
 * names the task block that uses it. The drawings are in components/day5/comicScenes.tsx.
 */
const NOTE = "Leon, Mara, Priya, Tobias and Ticketo are made up for this lesson, like the examples on the card: a Case assumption. BankDirect, AdminFlow and MoveEasy, the cases of the task, are in the task.";
const NAMES = { leon: "Leon, a customer", mara: "Mara, a customer", priya: "Priya, UX lead", tobias: "Tobias, product owner" };

export const COMICS_D5 = bi({
  A1: comicOf({
    id: "d5-a1", title: "Cancelled by the thumb", teaser: "Leon pays on the bus and cancels by mistake.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Leon buys two tickets on the bus, phone in one hand. Pay and Cancel are tiny and touch each other at the top of the screen.", say: [["leon", "Where exactly is Pay?", true]], tag: ["plain", "SMALL AND FAR"], means: "A small target far from the thumb is slow to hit and easy to miss.", look: "the two tiny buttons at the top" }),
      panel({ art: "a1-2", scene: "He stretches his thumb, the bus brakes, and he hits Cancel.", say: [["leon", "No! I cancelled it."]], tag: ["plain", "A MIS-TAP"], means: "Targets close together are easily confused. The error is the interface's, not Leon's." }),
      panel({ art: "a1-3", scene: "The new checkout has a large Pay button in the lower part of the screen, with space to Cancel.", say: [["leon", "Pay. Done, first time."]], tag: ["teal", "LARGE, CLOSE, SPACED"], means: "Fitts's law: the time to hit a target grows with distance and shrinks with size. Space between targets prevents mix-ups." }),
      panel({ art: "a1-4", scene: "Priya, the UX lead, draws the thumb's easy reach on a phone outline.", say: [["priya", "Main actions here, where the thumb already is."]], tag: ["ink", "THE RULE"], means: "Make main targets large, close to the hand and spaced apart. You use this in Block 1.1 for BankDirect's small links and buttons and in Block 2.1 for MoveEasy's booking buttons and touch targets." }),
    ],
  }),
  A2: comicOf({
    id: "d5-a2", title: "Thirty buttons", teaser: "Mara wants Saturday evening and faces every showing of the week.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Mara wants to see a film on Saturday evening. The page shows thirty equal time buttons for every film and day.", say: [["mara", "Which of these is Saturday?", true]], tag: ["plain", "TOO MANY AT ONCE"], means: "Many equal options make the choice slow and uncertain." }),
      panel({ art: "a2-2", scene: "Priya names the law and three ways out.", say: [["priya", "Fewer at once, a clear favourite, and steps."]], tag: ["teal", "HICK'S LAW"], means: "Decision time grows with the number of equal options. Fewer options, a clear priority and staged choices help." }),
      panel({ art: "a2-3", scene: "The new page asks for the day, then the film, then the time.", say: [["mara", "Saturday, Lighthouse, 20:15."]], tag: ["teal", "STAGED"], means: "Each stage has only a few options, and the likely one stands out." }),
      panel({ art: "a2-4", scene: "Tobias asks whether more steps are always better. Priya shakes her head.", say: [["priya", "Three steps help. Six would be a new hurdle."]], tag: ["ink", "THE RULE"], means: "Lower the options per step, but keep the steps few. You use this in Block 1.1 for BankDirect's 14 options, in Block 1.2 to rate AdminFlow's variants and in Block 2.1 for MoveEasy's too many options and equal choices." }),
    ],
  }),
  A3: comicOf({
    id: "d5-a3", title: "Twelve characters", teaser: "Leon tries to read out his booking code at the door.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "At the door the staff ask for Leon's booking code: twelve characters in one string.", say: [["leon", "T, K, X, 7… sorry, again."]], tag: ["plain", "TOO LONG"], means: "Short-term memory holds only a few items; a long string has to be read again and again." }),
      panel({ art: "a3-2", scene: "Then he scrolls to find his hall and his seats, spread over the screen.", say: [["leon", "Where did it say the row?", true]], tag: ["plain", "SCATTERED"], means: "Information that belongs together but is spread out has to be collected and held in mind." }),
      panel({ art: "a3-3", scene: "The new ticket shows the code in three blocks of four, and the time, hall and seats in one box.", say: [["leon", "TKX7, Q2MR, 84LZ. Hall 3, row 7."]], tag: ["teal", "CHUNKED"], means: "Chunking groups items into a few meaningful units; structure puts together what belongs together." }),
      panel({ art: "a3-4", scene: "Priya writes Miller's rule on the board.", say: [["priya", "Blocks, not strings. Together, not scattered."]], tag: ["ink", "THE RULE"], means: "Chunk what people must take in, and show it where it is needed. You use this in Block 1.1 for BankDirect's crowded forms and numbers to remember and in Block 2.1 for MoveEasy's tariffs and conditions." }),
    ],
  }),
  A4: comicOf({
    id: "d5-a4", title: "One menu, three laws", teaser: "Mara taps the wrong item in a long menu of thin strips.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Mara opens the menu: twelve thin strips, no groups. She taps the one below Tickets.", say: [["mara", "That's Films, not Tickets!", true]], tag: ["plain", "SLOW AND WRONG"], means: "Small targets, many items and no grouping each add reaction time and raise the chance of an error." }),
      panel({ art: "a4-2", scene: "Priya shows the team that one menu breaks all three laws.", say: [["priya", "Thin: Fitts. Twelve: Hick. Ungrouped: Miller."]], tag: ["teal", "THE INTERPLAY"], means: "Fitts is the hand, Hick the decision, Miller the memory. On a real screen they add up." }),
      panel({ art: "a4-3", scene: "The new menu has four large items, grouped, with the rest one step deeper.", say: [["mara", "Tickets. There."]], tag: ["teal", "ALL THREE"], means: "Fixing all three laws changes the menu: faster, fewer errors, less load." }),
      panel({ art: "a4-4", scene: "Priya adds a three-line check to the team's list.", say: [["priya", "Can they hit it? Choose it? Remember it?"]], tag: ["ink", "THE RULE"], means: "Tell the laws apart and check all three on every element. You use this in Block 1.1 to assign BankDirect's problems to the laws, in Block 1.2 to rate AdminFlow and in Block 2.1 to sort MoveEasy's problems." }),
    ],
  }),
  A5: comicOf({
    id: "d5-a5", title: "Which fix first", teaser: "Tobias has three fixes, and time for one first.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Tobias, the product owner, has three fixes: a big Pay button, staged showings, a chunked code.", say: [["tobias", "One release. Which one?"]], tag: ["plain", "THREE FIXES"], means: "Good UX reduces searching, operating errors and decision stress; each law points to a fix." }),
      panel({ art: "a5-2", scene: "Priya weighs the Pay button on four questions.", say: [["priya", "High effect, two buttons, low risk, next release."]], tag: ["teal", "WEIGHED"], means: "Effect on users, feasibility, risk and time pressure, each with a reason." }),
      panel({ art: "a5-3", scene: "Staging the showings helps more, but needs two releases and a shortcut for regulars.", say: [["tobias", "Bigger win, more work, a bit more risk."]], tag: ["plain", "FEASIBILITY"], means: "A measure with a high effect can still come second when it needs more time and carries more risk." }),
      panel({ art: "a5-4", scene: "The team writes the order and the reasons.", say: [["priya", "Pay button and code now, showings next. And here is why."]], tag: ["ink", "THE RULE"], means: "Use the laws to find the fixes, then weigh each with a reason. You use this in Block 1.1 for the two biggest weaknesses, in Block 1.2 for the decision and in Block 2.1 for the four measures, their justification and the 10 weeks." }),
    ],
  }),
  B1: comicOf({
    id: "d5-b1", title: "Three Pay buttons", teaser: "Every team built its own Pay button.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Checkout, gift cards and events each have a Pay button of a different size.", say: [["tobias", "We fixed the checkout last month. Why are gift cards failing now?"]], tag: ["plain", "A DETAIL EACH TIME"], means: "Fixing one screen at a time leaves every other screen to fail the same way." }),
      panel({ art: "b1-2", scene: "Priya counts how often the team has fixed the same thing.", say: [["priya", "Same problem, fourth screen."]], tag: ["plain", "NOT A DETAIL"], means: "An interaction decision repeats on every screen and every visit; it is an architecture of effect." }),
      panel({ art: "b1-3", scene: "The team writes one standard: every main action has a minimum size and sits within the thumb's reach.", say: [["priya", "One rule, every screen, including the next one we build."]], tag: ["teal", "A STANDARD"], means: "At senior level the laws become interaction standards every team follows." }),
      panel({ art: "b1-4", scene: "Priya draws the chain from a button to the business.", say: [["priya", "A button, then a pattern, then the product, then the support costs."]], tag: ["ink", "THE RULE"], means: "Decide the laws once, as standards, and the product is fast and safe by design. You use this in Block 3.1 for the guiding vision, the three decisions and the order of what is improved first." }),
    ],
  }),
  B2: comicOf({
    id: "d5-b2", title: "Everything, or one button?", teaser: "Tobias wants every offer visible; Mara wants to buy fast.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Tobias wants every film and every offer on the first screen. Mara wants her ticket in seconds.", say: [["tobias", "If they don't see it, they won't buy it!"], ["mara", "I just want my ticket."]], tag: ["plain", "TWO GOALS"], means: "Feature richness against speed, simplicity against brand, the ideal against feasibility." }),
      panel({ art: "b2-2", scene: "Priya places five designs on two axes: options shown and how fast people finish.", say: [["priya", "Everything at once is slow. One button and six steps is slow too."]], tag: ["teal", "THE MATRIX"], means: "Reduction is not always the answer; hiding everything behind many steps becomes a hurdle." }),
      panel({ art: "b2-3", scene: "She chooses large main actions first and the rest one tap away, and writes what it gives up.", say: [["priya", "We give up everything on one screen. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision between conflicting goals names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "Priya adds the five goals to the checklist.", say: [["priya", "Name the two goals before you choose."]], tag: ["ink", "THE RULE"], means: "Name the conflict between features, speed, simplicity, brand and feasibility, choose, and say what you give up. You use this in Block 3.1 for the decisions, the risk analysis and the rule for feature richness against usability." }),
    ],
  }),
  B3: comicOf({
    id: "d5-b3", title: "Who owns the button size?", teaser: "Ticketo does not record mis-taps. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "The app records finished purchases, not mis-taps. Tobias does not know how many purchases fail.", say: [["tobias", "Shouldn't we wait for proper data?"]], tag: ["plain", "INCOMPLETE DATA"], means: "Waiting is a decision too; the mis-taps go on meanwhile." }),
      panel({ art: "b3-2", scene: "Priya decides on a minimum size for every main action, starting with checkout, and says when she would reverse it.", say: [["priya", "If the calls about wrong tickets don't drop, we look again."]], tag: ["teal", "A DECISION"], means: "A decision under uncertainty says what is decided, what is not known, when it would be reversed and what is given up." }),
      panel({ art: "b3-3", scene: "Tobias asks who decides when a team wants an exception.", say: [["priya", "UX owns the standard. A team shows how often it's needed and what the error data says."]], tag: ["teal", "WHO OWNS IT"], means: "Interaction standards hold only with an owner and a rule for exceptions." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["priya", "An owner of the standards. Exceptions need data. Decide, then check."]], tag: ["ink", "THE RULE"], means: "Give the interaction standards an owner and a rule, and say when a decision will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
