import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 8 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Iris, Pavel, June, Arne and the kitchen maker Lantern Kitchens), so it is the card said again in pictures, not a new case. The last panel states the
 * card's rule and names the task block that uses it. The drawings are in components/day8/comicScenes.tsx.
 */
const NOTE = "Iris, Pavel, June, Arne and Lantern Kitchens are made up for this lesson, like the examples on the card: a Case assumption. StartSmart, FutureSkills and GreenHome, the cases of the task, are in the task.";
const NAMES = { iris: "Iris, a customer", pavel: "Pavel, a customer", june: "June, content designer", arne: "Arne, product owner" };

export const COMICS_D8 = bi({
  A1: comicOf({
    id: "d8-a1", title: "Six functions", teaser: "Iris wants a kitchen and finds a list of functions.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Iris opens the planner. It shows six functions: room dimensions, catalogue, worktops, appliances, prices, saved plans.", say: [["iris", "Where do I start?", true]], tag: ["plain", "NO JOURNEY"], means: "A list of functions shows what a product can do, not where the journey leads." }),
      panel({ art: "a1-2", scene: "She browses the catalogue for a while and closes the tab.", say: [["iris", "I'll do it another day."]], tag: ["plain", "LOST"], means: "People look for a beginning, a goal and a way; without them they put it off." }),
      panel({ art: "a1-3", scene: "The new start page shows the goal, a plan and an offer, and a path of four stages.", say: [["iris", "Four stages, then I have an offer. Room first."]], tag: ["teal", "A JOURNEY"], means: "The same functions, shown as a journey, give people a reason and a place to start." }),
      panel({ art: "a1-4", scene: "June, the content designer, writes the four questions on the board.", say: [["june", "Where do I start, where am I going, how far am I, am I done?"]], tag: ["ink", "THE RULE"], means: "People read every process as a story; give them its beginning, goal, way and end. You use this in Block 1.1 for StartSmart's effect and in Block 2.1 for why GreenHome is abandoned." }),
    ],
  }),
  A2: comicOf({
    id: "d8-a2", title: "Data saved", teaser: "Pavel finishes stage three and is not sure what he has.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Pavel finishes his layout. The screen says “Data saved” and shows a Next button.", say: [["pavel", "How many more are there?", true]], tag: ["plain", "NO PROGRESS"], means: "Without a visible goal and progress, a journey feels endless." }),
      panel({ art: "a2-2", scene: "June lists the seven elements and circles three.", say: [["june", "He has no goal, no path and no ending."]], tag: ["teal", "SEVEN ELEMENTS"], means: "Starting situation, goal, relevance, obstacle, support, progress, resolution." }),
      panel({ art: "a2-3", scene: "Now the screen shows the goal, the path with “you are here”, and at the end: “Your plan is ready.”", say: [["pavel", "Done. And someone will call me."]], tag: ["teal", "A REAL ENDING"], means: "A goal, visible progress and a resolution turn a process into a journey." }),
      panel({ art: "a2-4", scene: "June adds the elements to the checklist.", say: [["june", "Show the goal, show the way, end it."]], tag: ["ink", "THE RULE"], means: "Check each journey for the seven elements. You use this in Block 1.1 for StartSmart's missing guidance and in Block 2.1 for GreenHome's deficits." }),
    ],
  }),
  A3: comicOf({
    id: "d8-a3", title: "Sunday morning", teaser: "Arne wants a story between the steps; Iris wants her kitchen.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Between two steps there is only a Next button. Iris does not know whether her room was saved.", say: [["iris", "Did that work?", true]], tag: ["plain", "BARE"], means: "Without a transition, people get no confirmation and no expectation." }),
      panel({ art: "a3-2", scene: "Arne, the product owner, adds a long scene about Sunday mornings and memories.", say: [["iris", "Nice… where is my kitchen?"]], tag: ["plain", "STAGED"], means: "Telling a story about the product is not guiding with one; it delays the task." }),
      panel({ art: "a3-3", scene: "June writes one line: your room is in, next your style, a few choices, all changeable.", say: [["iris", "Good. Style next."]], tag: ["teal", "A TRANSITION"], means: "Confirmation, expectation and sequence, in one line." }),
      panel({ art: "a3-4", scene: "June writes the six means on the board.", say: [["june", "Tension, expectation, sequence, transition, confirmation, context. In small places."]], tag: ["ink", "THE RULE"], means: "Put the dramaturgy into the journey, not around it. You use this in Block 1.1 for StartSmart's transitions, in Block 1.2 for FutureSkills's narrative journey and in Block 2.1 for GreenHome's sequence." }),
    ],
  }),
  A4: comicOf({
    id: "d8-a4", title: "More story!", teaser: "Arne adds a film and scenes; customers stop finishing.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Arne adds a brand film at the start and a scene before every step.", say: [["arne", "Now it's a real story!"]], tag: ["plain", "MORE STORY"], means: "More staging is not more guidance." }),
      panel({ art: "a4-2", scene: "Pavel skips the film, scrolls through a scene and cannot find the next step.", say: [["pavel", "I just want to plan my kitchen.", true]], tag: ["plain", "OVERLOAD"], means: "Too much staging, too little clarity: it costs time and trust." }),
      panel({ art: "a4-3", scene: "June places five journeys on two axes: how much story and how clear and quick.", say: [["june", "A clear story: goal, path, short lines."]], tag: ["teal", "A CLEAR STORY"], means: "A clear story raises orientation, motivation and memorability." }),
      panel({ art: "a4-4", scene: "The team writes the line on the board.", say: [["june", "If the steps are harder to find, the story is too big."]], tag: ["ink", "THE RULE"], means: "Use story where it orients, motivates or gives context, and stop there. You use this in Block 1.1 for StartSmart's weaknesses and in Block 1.2 for rating FutureSkills and its conflicts." }),
    ],
  }),
  A5: comicOf({
    id: "d8-a5", title: "Goal, path or film?", teaser: "Arne has three ideas; the smallest helps most.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Arne has three ideas: a goal on the first screen, a path of four stages, a brand film.", say: [["arne", "Which first?"]], tag: ["plain", "THREE IDEAS"], means: "Measures differ in effect, effort, risk and time." }),
      panel({ art: "a5-2", scene: "June weighs the goal on the first screen.", say: [["june", "Big effect, easy, low risk, next release."]], tag: ["teal", "WEIGHED"], means: "Effect on users, feasibility, risk and time pressure, each with a reason." }),
      panel({ art: "a5-3", scene: "The film is slow to make and delays everyone.", say: [["arne", "The biggest idea helps least?"]], tag: ["plain", "A RISK"], means: "A story that is not the user's own adds time, not meaning." }),
      panel({ art: "a5-4", scene: "The team writes the order and the reasons.", say: [["june", "Goal now, path next, no film. And here is why."]], tag: ["ink", "THE RULE"], means: "Give each action a context and a place in the journey, and weigh every measure with a reason. You use this in Block 1.2 for the decision and in Block 2.1 for the four measures, their justification and the 12 weeks." }),
    ],
  }),
  B1: comicOf({
    id: "d8-b1", title: "The website tells a story", teaser: "The website promises a journey; the planner is a form.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "The website tells the brand's story: “Your kitchen, planned with you.” The planner is a list of fields.", say: [["iris", "With me? It's a form.", true]], tag: ["plain", "COMMUNICATION"], means: "When storytelling is only communication, the product breaks its promise." }),
      panel({ art: "b1-2", scene: "June shows who builds the journey: the product teams, step by step, from the order of the data.", say: [["june", "Nobody decided how our journeys should go."]], tag: ["plain", "WHERE IT LIVES"], means: "The journey people experience is built by product teams every day." }),
      panel({ art: "b1-3", scene: "The company writes a guiding vision and patterns for entries, progress, transitions and endings.", say: [["arne", "So every journey keeps the promise."]], tag: ["teal", "ARCHITECTURE"], means: "Narrative UX belongs in the experience architecture: vision, principles, patterns." }),
      panel({ art: "b1-4", scene: "June draws the layers, from vision to every journey.", say: [["june", "We steer the journeys. The teams build from the patterns."]], tag: ["ink", "THE RULE"], means: "Make narrative structure part of the experience architecture, not a campaign. You use this in Block 3.1 for the guiding vision, the three decisions and which journeys come first." }),
    ],
  }),
  B2: comicOf({
    id: "d8-b2", title: "A story for a handle?", teaser: "Marketing wants the brand story in every journey, also in a reorder.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Marketing wants the brand story in every journey. The planning experts want plain steps.", say: [["arne", "Story everywhere!"], ["june", "Pavel only wants a handle."]], tag: ["plain", "TWO GOALS"], means: "Efficiency against dramaturgy, emotionalisation against seriousness, brand against the user's task." }),
      panel({ art: "b2-2", scene: "June shows three journeys: a reorder, the fitting day, a whole kitchen.", say: [["june", "The longer and more important, the more guidance."]], tag: ["teal", "BY JOURNEY"], means: "How much narrative a journey needs depends on its length and weight for the user." }),
      panel({ art: "b2-3", scene: "They agree: no story in the reorder, short lines in the fitting day, full guidance in the planner, the brand story on the website.", say: [["arne", "We give up the film in the planner. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "June adds the rule to the principles.", say: [["june", "Story where it serves the task, sized to the journey."]], tag: ["ink", "THE RULE"], means: "Name the conflict, size the story to the journey and say what you give up. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts between clarity, brand and experience quality." }),
    ],
  }),
  B3: comicOf({
    id: "d8-b3", title: "Where do they stop?", teaser: "Nobody can see where customers stop. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "The planner does not record where customers stop. Arne does not know which stage loses most.", say: [["arne", "Shouldn't we measure first?"]], tag: ["plain", "LITTLE DATA"], means: "Waiting is a decision too; customers keep stopping meanwhile." }),
      panel({ art: "b3-2", scene: "June decides on the goal and the path first, and says when she would reverse it.", say: [["june", "If no more people reach the offer, we look again."]], tag: ["teal", "A DECISION"], means: "Decide, say what is not known, when you would reverse it and what you give up." }),
      panel({ art: "b3-3", scene: "Arne asks who decides when marketing and the planning experts disagree.", say: [["june", "Clear first, then the customer, then the brand."]], tag: ["teal", "WHO OWNS IT"], means: "An owner of the principles, experts who check, and a rule for conflicts." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["june", "An owner of the journeys. A rule for conflicts. Decide, then check."]], tag: ["ink", "THE RULE"], means: "Give narrative UX an owner and a rule, and say when a decision will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
