import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 14 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Zara, Edgar, Kim, Ruth and the coffee-machine maker Brewline), so it is the card said again in pictures, not a new case. The last panel states the
 * card's rule and names the task block that uses it. The drawings are in components/day14/comicScenes.tsx.
 */
const NOTE = "Zara, Edgar, Kim, Ruth and Brewline are made up for this lesson, like the examples on the card: a Case assumption. BuildVision, HealthSpace and IndustryXR, the cases of the task, are in the task.";
const NAMES = { zara: "Zara, a customer", edgar: "Edgar, a customer", kim: "Kim, UX designer", ruth: "Ruth, product owner" };

export const COMICS_D14 = bi({
  A1: comicOf({
    id: "d14-a1", title: "Where is the tank?", teaser: "A drawing, a 3D model, and labels on the parts.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Zara holds the manual: “A: water tank, see figure 3.”", say: [["zara", "Which one is A?", true]], tag: ["plain", "FLAT"], means: "A drawing must be mapped onto the real object." }),
      panel({ art: "a1-2", scene: "Ruth wants VR: a whole virtual café.", say: [["ruth", "Let's go full VR!"]], tag: ["plain", "A TREND"], means: "VR replaces the world; Zara needs help in hers." }),
      panel({ art: "a1-3", scene: "Kim shows AR: the label sits on the tank, on Zara's own machine.", say: [["zara", "Oh, there it is."]], tag: ["teal", "AR"], means: "AR lays help over the real object." }),
      panel({ art: "a1-4", scene: "Kim writes the technologies on the board.", say: [["kim", "Name the task first, then the technology."]], tag: ["ink", "THE RULE"], means: "Tell AR, VR and MR apart by what they do. You use this in Block 1.1 for BuildVision, in Block 1.2 for HealthSpace and in Block 2.1 for IndustryXR." }),
    ],
  }),
  A2: comicOf({
    id: "d14-a2", title: "Nine labels", teaser: "Every label was true. Together they were noise.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Two labels: tank and spout. Zara finds them at once.", say: [["zara", "Easy."]], tag: ["teal", "FOCUS"], means: "Attention goes where the important cue is." }),
      panel({ art: "a2-2", scene: "Ruth adds seven more: warnings, tips, offers, a rating.", say: [["ruth", "More information is more helpful!"]], tag: ["plain", "MORE"], means: "Every label competes for the same narrow attention." }),
      panel({ art: "a2-3", scene: "The offers pulse. Zara looks at “Order capsules”, not at the step.", say: [["zara", "Wait, what was I doing?", true]], tag: ["plain", "STEERED AWAY"], means: "Movement captures attention involuntarily." }),
      panel({ art: "a2-4", scene: "Kim writes the rule.", say: [["kim", "The important cue must be the most visible one."]], tag: ["ink", "THE RULE"], means: "Steer perception, keep the load low. You use this in Block 1.1 for BuildVision's overload in stress and in Block 2.1 for IndustryXR's attention steering." }),
    ],
  }),
  A3: comicOf({
    id: "d14-a3", title: "Sunday and Monday", teaser: "The same AR guide: a help on Sunday, a burden on Monday.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "On a quiet Sunday Zara descales with the AR guide in five minutes.", say: [["zara", "No manual needed!"]], tag: ["teal", "INTENSIFIES"], means: "Help at the object: a real chance." }),
      panel({ art: "a3-2", scene: "Monday 7:30: the machine beeps, a child cries, the signal is weak.", say: [["zara", "Too much!", true]], tag: ["plain", "OVERWHELMS"], means: "The same feature in stress becomes a burden." }),
      panel({ art: "a3-3", scene: "Edgar will not try AR at all.", say: [["edgar", "Just give me the paper."]], tag: ["plain", "ACCEPTANCE"], means: "Not everyone accepts immersive formats." }),
      panel({ art: "a3-4", scene: "Kim writes chances and risks side by side.", say: [["kim", "Design for Monday, not only for the demo."]], tag: ["ink", "THE RULE"], means: "Name the chance and the risk, and test in the stressful moment. You use this in Block 1.1 for BuildVision's two biggest chances and risks and in Block 2.1 for IndustryXR." }),
    ],
  }),
  A4: comicOf({
    id: "d14-a4", title: "The showroom", teaser: "Five minutes of wow, and nothing solved.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Ruth wants a VR café showroom for the trade fair.", say: [["ruth", "Everyone will talk about us!"]], tag: ["plain", "FASCINATION"], means: "Impressive is not the same as useful." }),
      panel({ art: "a4-2", scene: "Kim places five ideas on a grid of value and maturity.", say: [["kim", "Which problem does it solve?"]], tag: ["teal", "THE TEST"], means: "Value, maturity, marketability." }),
      panel({ art: "a4-3", scene: "The descaling guide sits top right; the showroom bottom left.", say: [["ruth", "Hm. Nobody would miss the showroom."]], tag: ["teal", "IMPACT"], means: "Would people miss it if it disappeared?" }),
      panel({ art: "a4-4", scene: "Kim writes the rule.", say: [["kim", "Real value first. Fascination is not a reason."]], tag: ["ink", "THE RULE"], means: "Pilot only what beats a classic interface. You use this in Block 1.1 for demonstrative use cases, in Block 1.2 for user value and in Block 2.1 to prioritise IndustryXR's use cases." }),
    ],
  }),
  A5: comicOf({
    id: "d14-a5", title: "Where are they looking?", teaser: "Eye-tracking for offers. Kim asks five questions.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Ruth proposes eye-tracking to see where customers look at offers.", say: [["ruth", "We'll know what catches the eye!"]], tag: ["plain", "A TEMPTATION"], means: "Neuro-based data can steer people." }),
      panel({ art: "a5-2", scene: "Kim asks: what is recorded, who is left out, who is it for?", say: [["kim", "For the customer, or for us?"]], tag: ["teal", "FIVE QUESTIONS"], means: "Recording, exclusion, sickness, steering, saying no." }),
      panel({ art: "a5-3", scene: "They rate three measures on five criteria.", say: [["ruth", "The descaling pilot is small…"], ["kim", "…and teaches us the most."]], tag: ["teal", "FIVE CRITERIA"], means: "Effect, feasibility, risk, time, investment security." }),
      panel({ art: "a5-4", scene: "Kim writes the rule.", say: [["kim", "Effect, money, responsibility. Not fascination."]], tag: ["ink", "THE RULE"], means: "Ask the ethical questions and weigh every measure with a reason. You use this in Block 1.2 for trust and risk and in Block 2.1 for the four measures and their justification." }),
    ],
  }),
  B1: comicOf({
    id: "d14-b1", title: "Another demo", teaser: "The lab makes demos. Nothing reaches customers.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "The lab shows its fifth demo this year. None is in use.", say: [["ruth", "What happened to the last four?", true]], tag: ["plain", "SHOWCASES"], means: "Demos end in the lab when nobody decides." }),
      panel({ art: "b1-2", scene: "Kim writes a vision: immersive help where it beats the manual.", say: [["kim", "First the vision. Then the grid."]], tag: ["teal", "A VISION"], means: "A guiding vision of the immersive value wanted." }),
      panel({ art: "b1-3", scene: "One portfolio: watch, pilot, scale; gates with dates.", say: [["ruth", "So every idea is judged the same way."]], tag: ["teal", "A PORTFOLIO"], means: "An evaluation grid and stage gates." }),
      panel({ art: "b1-4", scene: "Kim draws the layers.", say: [["kim", "Innovation is an investment, not a showcase."]], tag: ["ink", "THE RULE"], means: "Treat future technologies as decision architecture. You use this in Block 3.1 for the guiding vision, the three decisions and what is piloted first." }),
    ],
  }),
  B2: comicOf({
    id: "d14-b2", title: "Three bets", teaser: "Safe, medium, bold: each with a stop date.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "The board wants a mixed-reality café now.", say: [["ruth", "Be first!"], ["kim", "With which user problem?"]], tag: ["plain", "TWO GOALS"], means: "Innovation and visibility against value and maturity." }),
      panel({ art: "b2-2", scene: "Kim lays out three bets of different size.", say: [["kim", "A safe one, a medium one, a bold one on the watch list."]], tag: ["teal", "A PORTFOLIO"], means: "A few bets, each with a reason." }),
      panel({ art: "b2-3", scene: "Under each bet they write what it assumes.", say: [["ruth", "We assume customers want it…"], ["kim", "Do we know?"]], tag: ["teal", "ASSUMPTIONS"], means: "Innovation, behaviour, maturity, economics." }),
      panel({ art: "b2-4", scene: "Kim writes the rule.", say: [["kim", "Measures and a stop date before the start."]], tag: ["ink", "THE RULE"], means: "Name the conflicts, hold a portfolio, write down what each bet assumes. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts." }),
    ],
  }),
  B3: comicOf({
    id: "d14-b3", title: "It's not a failure to stop", teaser: "A pilot nobody wanted to end.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "A VR pilot runs for two years. Nobody measures it; nobody stops it.", say: [["ruth", "Who decides about this?", true]], tag: ["plain", "NO GATE"], means: "Pilots without gates live on goodwill." }),
      panel({ art: "b3-2", scene: "Kim writes an owner, a grid, gates and a stop right.", say: [["kim", "Every pilot gets a date to decide."]], tag: ["teal", "GOVERNANCE"], means: "Owner, grid, gates, stop right, a rule for conflicts." }),
      panel({ art: "b3-3", scene: "No test data yet. Kim decides on a small pilot anyway.", say: [["kim", "Fifty customers, eight weeks. If few use it twice, we stop."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the paragraph before anyone asks.", say: [["kim", "Who owns it, what we measure, when we stop."]], tag: ["ink", "THE RULE"], means: "Give future technologies an owner and gates, and decide under uncertainty with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
