import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 4 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Nina, Sam, Yusuf, Clara and the bike-sharing app Pedalo), so it is the card said again in pictures, not a new case. The last panel states the card's rule
 * and names the task block that uses it. The drawings are in components/day4/comicScenes.tsx.
 */
const NOTE = "Nina, Sam, Yusuf, Clara and Pedalo are made up for this lesson, like the examples on the card: a Case assumption. ServicePoint, WorkFlow Hub and MyEnergy, the cases of the task, are in the task.";
const NAMES = { nina: "Nina, a rider", sam: "Sam, a rider", yusuf: "Yusuf, UX lead", clara: "Clara, product owner" };

export const COMICS_D4 = bi({
  A1: comicOf({
    id: "d4-a1", title: "Clean, and still lost", teaser: "Nina finds a calm screen and no way to unlock a bike.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Nina opens Pedalo. A clean map and four round icons, no words.", say: [["nina", "Which one gets me a bike?", true]], tag: ["plain", "LOOKS SIMPLE"], means: "Few elements and much white space look simple. But Nina has to guess what each icon means.", look: "the four unlabelled icons" }),
      panel({ art: "a1-2", scene: "She taps the star (favourites), then the lines (settings). Still no bike.", say: [["nina", "This is taking ages."]], tag: ["plain", "NOT INTUITIVE"], means: "Each guess costs attention and memory. Friction appears wherever a design asks too much of perceiving, attending, remembering or acting." }),
      panel({ art: "a1-3", scene: "The new screen names the nearest bike and has one labelled button: Scan to unlock.", say: [["nina", "Scan, unlock, go."]], tag: ["teal", "INTUITIVE"], means: "Intuitive use is designed: the next step is visible, named and clearly the main action." }),
      panel({ art: "a1-4", scene: "Yusuf, the UX lead, writes the four steps on the board.", say: [["yusuf", "Perceive, attend, remember, act. Don't overload any of them."]], tag: ["ink", "THE RULE"], means: "Locate friction in the four steps; looking simple is not being intuitive. You use this in Block 1.1 to say where ServicePoint feels unclear or tiring and in Block 2.1 for MyEnergy's problems of use and cognition." }),
    ],
  }),
  A2: comicOf({
    id: "d4-a2", title: "Twelve passes", teaser: "Sam wants one ride and has to choose from twelve.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Sam wants a single ride. The pass page shows twelve buttons of the same size.", say: [["sam", "Day, Flex, Tourist… which is just one ride?", true]], tag: ["plain", "TWELVE EQUAL OPTIONS"], means: "Many equally weighted options make people compare them all before they can decide." }),
      panel({ art: "a2-2", scene: "Yusuf names the law behind it.", say: [["yusuf", "Hick's law: more equal choices, longer decisions."]], tag: ["teal", "HICK'S LAW"], means: "Decision time grows with the number of equally likely options. It hurts most when they are unfamiliar and look alike." }),
      panel({ art: "a2-3", scene: "The new page shows three passes, each with who it is for, and “All passes” below.", say: [["sam", "Single ride, one trip now. That's me."]], tag: ["teal", "PRIORITISED"], means: "Frequent choices first, the rest grouped one step deeper. Nothing is deleted." }),
      panel({ art: "a2-4", scene: "Clara asks whether the other passes are gone. Yusuf shakes his head.", say: [["yusuf", "All still there. Just not all at once."]], tag: ["ink", "THE RULE"], means: "Give the frequent choices priority and group the rest. You use this in Block 1.1 for ServicePoint's equal menu items, in Block 1.2 to rate WorkFlow Hub's variants and in Block 2.1 for MyEnergy's too many equal navigation items." }),
    ],
  }),
  A3: comicOf({
    id: "d4-a3", title: "Stop is not End", teaser: "Nina tries to end her ride and only pauses it.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Nina has arrived. The only way to end the ride is a faint word “finish” in the top corner; there is also a red round Stop button.", say: [["nina", "Red means end, right?", true]], tag: ["plain", "AGAINST EXPECTATION"], means: "People act on their mental model: red and round looks like the end; the real action is small and far away." }),
      panel({ art: "a3-2", scene: "Stop only pauses the ride. The meter keeps running.", say: [["nina", "Why is it still counting?"]], tag: ["plain", "A WRONG ACTION"], means: "When an element works differently from what people expect, or differently from the rest of the app, they make mistakes." }),
      panel({ art: "a3-3", scene: "The new screen has a large End ride button at the bottom, like the main button on every other screen.", say: [["nina", "End ride. Done."]], tag: ["teal", "EXPECTED, LARGE, CLOSE"], means: "Where people expect it, large and near the thumb (Fitts's law), and the same pattern everywhere: used without thinking." }),
      panel({ art: "a3-4", scene: "Yusuf adds three checks to the team's list.", say: [["yusuf", "Where would they look? How big and how close? Same as elsewhere?"]], tag: ["ink", "THE RULE"], means: "Conform to expectations, keep elements recognisable and follow one clear action logic. You use this in Block 1.1 for ServicePoint's unclear path, in Block 1.2 for WorkFlow Hub's changing patterns and in Block 2.1 for MyEnergy's invisible process logic." }),
    ],
  }),
  A4: comicOf({
    id: "d4-a4", title: "Six characters", teaser: "Sam has to carry a code from one screen to the next.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Step one shows the bike code. Step two asks Sam to type it.", say: [["sam", "B7K… 2… was it Q or O?"]], tag: ["plain", "TO REMEMBER"], means: "Working memory holds only a few things at once. Six characters from another screen is already a lot." }),
      panel({ art: "a4-2", scene: "He types one wrongly, gets an error and has to go back.", say: [["sam", "Again? I'll take the bus.", true]], tag: ["plain", "LOAD"], means: "Load causes errors, abandonment and uncertainty. Too many options, unclear structures and inconsistent patterns all add to it." }),
      panel({ art: "a4-3", scene: "Now the code comes from the scan and is already filled in.", say: [["sam", "Confirm. Unlocked."]], tag: ["teal", "THE SYSTEM REMEMBERS"], means: "Show instead of asking people to recall; carry what the system already knows." }),
      panel({ art: "a4-4", scene: "Yusuf writes Miller's rule on the board, with a newer number next to it.", say: [["yusuf", "Seven, maybe four. Either way: fewer than we ask."]], tag: ["ink", "THE RULE"], means: "Keep what people must remember below the limit; let the system remember. You use this in Block 1.1 for ServicePoint's steps to remember and in Block 2.1 for MyEnergy's information across steps and its unclear feedback." }),
    ],
  }),
  A5: comicOf({
    id: "d4-a5", title: "Which fix first", teaser: "Clara has three fixes, and time for one first.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Clara, the product owner, has three fixes from the team: three passes first, carry the code over, a large End ride button.", say: [["clara", "One release. Which one?"]], tag: ["plain", "THREE FIXES"], means: "Each UX law points to a fix: Hick to fewer equal choices, Miller to less to remember, Fitts to larger, closer targets." }),
      panel({ art: "a5-2", scene: "Yusuf weighs the passes on four questions.", say: [["yusuf", "High effect, one page, some risk with sales, fits the release."]], tag: ["teal", "WEIGHED"], means: "Effect on users, feasibility, risk and time pressure, each with a reason." }),
      panel({ art: "a5-3", scene: "Carrying the code helps every unlock, but the developers need weeks.", say: [["clara", "So the bigger fix comes second?"]], tag: ["plain", "FEASIBILITY"], means: "A fix with a high effect can still come later when it needs more people and time; the reason decides the order." }),
      panel({ art: "a5-4", scene: "The team writes down the order and the reasons.", say: [["yusuf", "Passes now, End ride with them, the code next. And here is why."]], tag: ["ink", "THE RULE"], means: "Use the laws to find the fixes, then weigh each on effect, feasibility, risk and time with a reason. You use this in Block 1.1 for the two biggest hurdles, in Block 1.2 for the decision and in Block 2.1 for the four measures, their justification and the 12 weeks." }),
    ],
  }),
  B1: comicOf({
    id: "d4-b1", title: "Three new features", teaser: "Pedalo added features to fix problems, and nothing changed.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Last quarter Clara's team shipped a pass quiz, a help video and a resume-ride feature. Support is as busy as before.", say: [["clara", "We built so much. Why didn't it help?"]], tag: ["plain", "NEW FUNCTIONS"], means: "Answering usability problems with new functions adds options and load; the friction stays." }),
      panel({ art: "b1-2", scene: "Yusuf explains what a feature costs.", say: [["yusuf", "Every feature is a new option, a new word and a new place to look."]], tag: ["plain", "MORE LOAD"], means: "Usability becomes strategic when it decides which work is done first." }),
      panel({ art: "b1-3", scene: "This quarter the team removed friction instead: three passes first, the code carried over, one clear End button. The calls dropped.", say: [["clara", "Less built, more solved."]], tag: ["teal", "LESS FRICTION"], means: "Reducing friction in the whole system often solves the problem the new function was meant to solve." }),
      panel({ art: "b1-4", scene: "Yusuf draws the chain from a screen to the priorities.", say: [["yusuf", "The laws matter when they change what we work on first."]], tag: ["ink", "THE RULE"], means: "Reduce friction in the whole system before adding functions. You use this in Block 3.1 for the guiding vision, the three decisions and the order of what is improved first." }),
    ],
  }),
  B2: comicOf({
    id: "d4-b2", title: "Everything on the start screen?", teaser: "Sales wants every pass visible; Nina wants a bike.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "The sales team wants every pass on the start screen. Nina only wants to ride.", say: [["clara", "Sales says people buy what they see!"], ["nina", "I just want a bike."]], tag: ["plain", "TWO GOALS"], means: "Scope of functions against simplicity, completeness against efficiency, new against experienced users, the ideal against time." }),
      panel({ art: "b2-2", scene: "Yusuf places five designs on two axes: functions shown at once and how easily riders finish.", say: [["yusuf", "Past a point, more on screen means fewer finished rides."]], tag: ["teal", "THE MATRIX"], means: "Showing every function is not the same as people finishing their task." }),
      panel({ art: "b2-3", scene: "He keeps every function, frequent tasks first, “All functions” below, and writes down what that gives up.", say: [["yusuf", "We give up everything on top. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision between conflicting goals names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "Yusuf adds the four conflicts to the checklist.", say: [["yusuf", "Name the two goals before you choose."]], tag: ["ink", "THE RULE"], means: "Name the conflict between scope, simplicity, time and feasibility, choose, and say what you give up. You use this in Block 3.1 for the decisions, the risk analysis and the rule for departments that want visibility." }),
    ],
  }),
  B3: comicOf({
    id: "d4-b3", title: "Who decides where things go?", teaser: "Pedalo does not know where riders give up. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "The app records crashes, not the step where riders give up. Clara does not know where they are lost.", say: [["clara", "Shouldn't we wait for better data?"]], tag: ["plain", "PARTIAL DATA"], means: "Waiting is also a decision; the friction keeps costing support and riders meanwhile." }),
      panel({ art: "b3-2", scene: "Yusuf decides to pause new features for a quarter and fix unlocking and passes first, and says when he would reverse it.", say: [["yusuf", "If the contacts don't drop, we look again."]], tag: ["teal", "A DECISION"], means: "A decision under uncertainty says what is decided, what is not known, when it would be reversed and what is given up." }),
      panel({ art: "b3-3", scene: "Clara asks who decides where a team's new function goes.", say: [["yusuf", "UX owns the order and the steps, teams own their content. How often riders need it decides."]], tag: ["teal", "WHO OWNS IT"], means: "The interaction logic needs an owner and a rule, or every team adds its function wherever it likes." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["yusuf", "One owner of the logic. Frequency and support decide. Decide, then check."]], tag: ["ink", "THE RULE"], means: "Give the interaction logic an owner and a rule, and say when a decision will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
