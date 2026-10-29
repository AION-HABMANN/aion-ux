import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 16 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Leila, Sam, Rafael, Greta and the hotel chain Fernwood), so it is the card said again in pictures, not a new case. The last panel states the card's
 * rule and names the task block that uses it. The drawings are in components/day16/comicScenes.tsx.
 */
const NOTE = "Leila, Sam, Rafael, Greta and Fernwood are made up for this lesson, like the examples on the card: a Case assumption. RealityFlow, FutureInteraction Hub and NextWorld UX, the cases of the task, are in the task.";
const NAMES = { leila: "Leila, a guest", sam: "Sam, a guest", rafael: "Rafael, UX lead", greta: "Greta, product owner" };

export const COMICS_D16 = bi({
  A1: comicOf({
    id: "d16-a1", title: "Forty hotels by Friday", teaser: "A demo is not a product.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Greta sees the AR arrow demo in a bright, empty corridor.", say: [["greta", "Perfect! Forty hotels by Friday!"]], tag: ["plain", "A DEMO"], means: "One corridor proves one question." }),
      panel({ art: "a1-2", scene: "Rafael draws four rungs: concept, prototype, pilot, scale.", say: [["rafael", "We are on rung two."]], tag: ["teal", "THE LADDER"], means: "Each rung proves something different." }),
      panel({ art: "a1-3", scene: "The pilot in one hotel: Leila arrives late with a suitcase.", say: [["leila", "The arrow froze in the lift lobby.", true]], tag: ["teal", "A PILOT"], means: "Real use shows what the demo hid." }),
      panel({ art: "a1-4", scene: "Rafael writes the rule.", say: [["rafael", "A gate before every rung."]], tag: ["ink", "THE RULE"], means: "Concept, prototype, pilot, scale, with a gate at each. You use this in Block 1.1 for RealityFlow and in Block 2.1 for NextWorld UX's scaling decision." }),
    ],
  }),
  A2: comicOf({
    id: "d16-a2", title: "Friday night", teaser: "The test nobody ran.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Tested at 10 am: every guest finds room 216.", say: [["greta", "Tested and done!"]], tag: ["plain", "THE LAB"], means: "Quiet, bright, rested testers." }),
      panel({ art: "a2-2", scene: "Friday 11 pm: a crowd, dim light, a weak signal.", say: [["sam", "Where did the arrow go?", true]], tag: ["plain", "REAL USE"], means: "Orientation and error robustness fail." }),
      panel({ art: "a2-3", scene: "Rafael lists six test aspects.", say: [["rafael", "We tested one of six."]], tag: ["teal", "SIX ASPECTS"], means: "Orientation, presence, overload, errors, acceptance, transfer." }),
      panel({ art: "a2-4", scene: "Rafael writes the rule.", say: [["rafael", "Test transfer, or you test a demo."]], tag: ["ink", "THE RULE"], means: "Test all six aspects, transfer to real use above all. You use this in Block 1.1 for RealityFlow's testing and in Block 2.1 for NextWorld UX's evidence." }),
    ],
  }),
  A3: comicOf({
    id: "d16-a3", title: "The lobby camera", teaser: "Can we, or should we?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Greta: the lobby camera can read guests' moods.", say: [["greta", "We could offer spa deals to stressed guests!"]], tag: ["plain", "FEASIBLE"], means: "Can we build it? Yes." }),
      panel({ art: "a3-2", scene: "Rafael asks seven questions.", say: [["rafael", "Did anyone ask the guests?"]], tag: ["teal", "SEVEN QUESTIONS"], means: "Data, voluntariness, manipulation, overload, transparency, access, inclusion." }),
      panel({ art: "a3-3", scene: "Leila finds out from a sign in small print.", say: [["leila", "You read my face?", true]], tag: ["plain", "TRUST"], means: "Invisible to guests, aimed at their moods." }),
      panel({ art: "a3-4", scene: "Rafael writes the rule.", say: [["rafael", "Should we, for whom, and how?"]], tag: ["ink", "THE RULE"], means: "Ask the ethical questions at the concept stage. You use this in Block 1.1 for RealityFlow's ethics, in Block 1.2 for the strategies and in Block 2.1 for the scaling logic." }),
    ],
  }),
  A4: comicOf({
    id: "d16-a4", title: "The portfolio board", teaser: "Scale, test, pause, stop.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Five initiatives, five teams, five sponsors.", say: [["greta", "All of them are important!"]], tag: ["plain", "EVERYTHING"], means: "Nothing is ever decided." }),
      panel({ art: "a4-2", scene: "Rafael asks three questions of each.", say: [["rafael", "Responsible? Connectable? Governable?"]], tag: ["teal", "THREE TESTS"], means: "Not only new." }),
      panel({ art: "a4-3", scene: "The board gets four columns.", say: [["greta", "So the minibar pauses, and the mood screens stop."]], tag: ["teal", "FOUR MOVES"], means: "Scale, test further, pause, stop." }),
      panel({ art: "a4-4", scene: "Rafael writes the rule.", say: [["rafael", "A company that decides well can bet bolder."]], tag: ["ink", "THE RULE"], means: "Maturity, learning and the portfolio grow together. You use this in Block 1.1, in Block 1.2 for capacity to innovate and in Block 2.1 to focus NextWorld UX's portfolio." }),
    ],
  }),
  A5: comicOf({
    id: "d16-a5", title: "Not now", teaser: "The best decision was not to scale.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Greta wants the AR minibar in all forty hotels.", say: [["greta", "Everyone loved it at the opening!"]], tag: ["plain", "A FIRST WOW"], means: "Opened once, never again." }),
      panel({ art: "a5-2", scene: "Rafael ticks the signs: rarely used again, no maintenance, not tested in a real stay.", say: [["rafael", "Three signs."]], tag: ["teal", "SIX SIGNS"], means: "Reasons to pause, not a score." }),
      panel({ art: "a5-3", scene: "They weigh three measures on five criteria.", say: [["greta", "The wayfinding test decides the most…"], ["rafael", "…for the least."]], tag: ["teal", "FIVE CRITERIA"], means: "Effect, feasibility, risk, time, strategy." }),
      panel({ art: "a5-4", scene: "Rafael writes the rule.", say: [["rafael", "Not scaling is a decision too."]], tag: ["ink", "THE RULE"], means: "Know when not to scale, and weigh every measure with a reason. You use this in Block 2.1 for the four measures and their justification." }),
    ],
  }),
  B1: comicOf({
    id: "d16-b1", title: "The collection", teaser: "Many experiments, no future.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "The wiki: five projects, five templates, nothing stopped.", say: [["greta", "Which one is working?", true]], tag: ["plain", "A COLLECTION"], means: "Experiments without decisions." }),
      panel({ art: "b1-2", scene: "Rafael writes a vision.", say: [["rafael", "Helpful, proven, fair. Then scale."]], tag: ["teal", "A VISION"], means: "What innovation, and what responsibility." }),
      panel({ art: "b1-3", scene: "One grid, gates and a quarterly review on the wall.", say: [["greta", "So every pilot ends in a decision."]], tag: ["teal", "AN ARCHITECTURE"], means: "Grid, gates, portfolio." }),
      panel({ art: "b1-4", scene: "Rafael draws the layers.", say: [["rafael", "Experiments become a future when they end in decisions."]], tag: ["ink", "THE RULE"], means: "Build a responsible innovation architecture. You use this in Block 3.1 for the vision, the three decisions and what continues, pauses or ends." }),
    ],
  }),
  B2: comicOf({
    id: "d16-b2", title: "How many at once?", teaser: "Visibility against learning.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "The board wants all five lines this year.", say: [["greta", "Visibility!"], ["rafael", "And learning?"]], tag: ["plain", "TWO GOALS"], means: "Innovation pressure against maturity." }),
      panel({ art: "b2-2", scene: "Rafael moves a slider from five lines to three.", say: [["rafael", "Three we can test properly."]], tag: ["teal", "A PORTFOLIO"], means: "Fewer lines, more learning." }),
      panel({ art: "b2-3", scene: "Under each line they write what it assumes.", say: [["greta", "We assume guests use it again…"], ["rafael", "Do we know?"]], tag: ["teal", "ASSUMPTIONS"], means: "Technology, market, acceptance, governance." }),
      panel({ art: "b2-4", scene: "Rafael writes the rule.", say: [["rafael", "Say which conflicts we accept."]], tag: ["ink", "THE RULE"], means: "Name the conflicts and decide how many lines. You use this in Block 3.1 for the decisions and the risk analysis." }),
    ],
  }),
  B3: comicOf({
    id: "d16-b3", title: "Who may stop it?", teaser: "A go/no-go meeting that decides.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "The mood screens have run for a year. Nobody may stop them.", say: [["greta", "Who decides this?", true]], tag: ["plain", "NO OWNER"], means: "Without owners, nothing stops." }),
      panel({ art: "b3-2", scene: "Rafael writes four roles.", say: [["rafael", "Evaluate, approve, decide, review."]], tag: ["teal", "GOVERNANCE"], means: "Grid owner, ethics review, board, quarterly review." }),
      panel({ art: "b3-3", scene: "Incomplete data. Rafael decides anyway.", say: [["rafael", "Scale the course, test the arrows, stop the screens."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the record before anyone asks.", say: [["rafael", "What we scaled, paused and stopped, and why."]], tag: ["ink", "THE RULE"], means: "Give scaling owners and decide with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
