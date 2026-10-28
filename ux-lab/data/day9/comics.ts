import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 9 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Vera, Kaspar, Rhea, Dominik and the savings bank Brightwater Savings), so it is the card said again in pictures, not a new case. The last panel states
 * the card's rule and names the task block that uses it. The drawings are in components/day9/comicScenes.tsx.
 */
const NOTE = "Vera, Kaspar, Rhea, Dominik and Brightwater Savings are made up for this lesson, like the examples on the card: a Case assumption. SkillRise, HealthJourney and MoveWell, the cases of the task, are in the task.";
const NAMES = { vera: "Vera, a customer", kaspar: "Kaspar, a customer", rhea: "Rhea, UX designer", dominik: "Dominik, product owner" };

export const COMICS_D9 = bi({
  A1: comicOf({
    id: "d9-a1", title: "Make it like a game", teaser: "Dominik asks for a game; Rhea asks which kind.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Dominik brings the brief from the board: make the savings app more like a game.", say: [["dominik", "Make it fun! Like a game!"]], tag: ["plain", "A VAGUE BRIEF"], means: "“Like a game” can mean structure, tone or a whole game." }),
      panel({ art: "a1-2", scene: "Rhea shows the pink piggy version. Vera frowns at it.", say: [["vera", "Is this my money or a toy?", true]], tag: ["plain", "TONE ONLY"], means: "A playful tone on a serious task can look careless, and it adds no information." }),
      panel({ art: "a1-3", scene: "Rhea shows three steps and one line: your goal is named, next the amount.", say: [["vera", "Step 2 of 3. Clear."]], tag: ["teal", "STRUCTURE"], means: "Gamification borrows the structure of games: a goal, a position, feedback." }),
      panel({ art: "a1-4", scene: "Rhea writes three words on the board.", say: [["rhea", "Structure freely. Tone carefully. Fiction almost never."]], tag: ["ink", "THE RULE"], means: "Ask which of the three a brief wants before you agree to it. You use this in Block 1.2 for HealthJourney's designs and in Block 2.1 for MoveWell's serious gamification." }),
    ],
  }),
  A2: comicOf({
    id: "d9-a2", title: "Transaction completed", teaser: "Kaspar saves every month and never learns what it did.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Kaspar transfers his savings. The app says: Transaction completed.", say: [["kaspar", "And? Is that good?", true]], tag: ["plain", "NO POSITION"], means: "Without information about their position, people cannot tell whether a step counted." }),
      panel({ art: "a2-2", scene: "Rhea lists five kinds of information and the lever under each.", say: [["rhea", "Progress, feedback, recognition, challenge, goal."]], tag: ["teal", "FIVE SIGNALS"], means: "Under every mechanic is a lever: reward, competence, self-efficacy, social validation, progress, a trigger." }),
      panel({ art: "a2-3", scene: "The new screen: two of three months saved, and four months in a row noticed.", say: [["kaspar", "Four months. I can actually do this."]], tag: ["teal", "SELF-EFFICACY"], means: "Seeing his own success builds belief that he can keep going." }),
      panel({ art: "a2-4", scene: "Rhea adds the rule to the board.", say: [["rhea", "Name the lever before you pick the mechanic."]], tag: ["ink", "THE RULE"], means: "People react to information about their own position; every mechanic pulls a lever. You use this in Block 1.1 to sort SkillRise's weak spots and in Block 2.1 for MoveWell's categories." }),
    ],
  }),
  A3: comicOf({
    id: "d9-a3", title: "One more badge", teaser: "Every team adds one signal; nobody adds up the screen.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Each team adds one thing: points, a badge, a countdown, a ranking, a mystery chest.", say: [["dominik", "Just one more badge!"]], tag: ["plain", "STACKING"], means: "Stacking mechanics does not stack motivation." }),
      panel({ art: "a3-2", scene: "Vera opens the app: eight signals blink at once. She closes it.", say: [["vera", "Too much. Where is my savings?", true]], tag: ["plain", "OVERSTIMULATION"], means: "Too many signals become noise, then pressure." }),
      panel({ art: "a3-3", scene: "The countdown said bonus interest ends tonight. It ends every night.", say: [["vera", "They tricked me."]], tag: ["plain", "TRUST DAMAGE"], means: "Manipulation and reward inflation can be removed; lost trust repairs slowly, if at all." }),
      panel({ art: "a3-4", scene: "Rhea writes each tool's one job and its limit.", say: [["rhea", "One job per tool. Count the signals. Never fake urgency."]], tag: ["ink", "THE RULE"], means: "Know what each tool is for and where it backfires. You use this in Block 1.2 to rate HealthJourney's Variant A and its risks, and in Block 2.1 for restrained gamification." }),
    ],
  }),
  A4: comicOf({
    id: "d9-a4", title: "Step 6 of 12", teaser: "Vera is halfway and feels far away; the same step gets a name.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Vera's plan says: Step 6 of 12.", say: [["vera", "Still six to go…", true]], tag: ["plain", "NUMBERS ONLY"], means: "A position without a meaning feels long." }),
      panel({ art: "a4-2", scene: "Rhea renames the stages: month 6, a month's rent if work stops.", say: [["vera", "Oh. That is real."]], tag: ["teal", "A STORY"], means: "The story makes the same mechanics mean more. Nothing new was built." }),
      panel({ art: "a4-3", scene: "Dominik shows week one: the loud design wins. Rhea shows month three.", say: [["rhea", "Look again in three months."]], tag: ["teal", "THE WINDOW"], means: "Quick activation is not lasting retention; the period you measure picks the winner." }),
      panel({ art: "a4-4", scene: "The team writes the rule.", say: [["rhea", "Name the stages after real life. Measure what lasts."]], tag: ["ink", "THE RULE"], means: "Combine progress with a true story, and judge by retention, not by the first week. You use this in Block 1.2 for HealthJourney's narrative design and in Block 2.1 for MoveWell's narrative frame." }),
    ],
  }),
  A5: comicOf({
    id: "d9-a5", title: "Coins for saving", teaser: "Kaspar saved gladly; then the coins came, and went.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Kaspar saves every month because he wants a cushion. Then the app pays him coins for it.", say: [["kaspar", "Coins! Nice."]], tag: ["plain", "A REWARD"], means: "A reward attached to something people already do gladly changes why they do it." }),
      panel({ art: "a5-2", scene: "The coin programme ends. Kaspar stops saving.", say: [["kaspar", "Why bother now?", true]], tag: ["plain", "OVERJUSTIFICATION"], means: "When the reward stops, the behaviour stops too." }),
      panel({ art: "a5-3", scene: "Rhea asks four questions about the next idea, a city ranking.", say: [["rhea", "Who does it put last? How does it read after losing a job?"]], tag: ["teal", "FOUR QUESTIONS"], means: "Explain it plainly; who is put last; a bad moment; who can remove it." }),
      panel({ art: "a5-4", scene: "The team weighs three measures and writes the reasons.", say: [["rhea", "Stages and honest words first. No ranking. Here is why."]], tag: ["ink", "THE RULE"], means: "Reward only what people would not do anyway, and weigh every measure with a reason. You use this in Block 1.2 for credibility and acceptance and in Block 2.1 for the four measures and their justification." }),
    ],
  }),
  B1: comicOf({
    id: "d9-b1", title: "Badges by request", teaser: "Five years of requests; nobody decided the app.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Over five years every request added a mechanic. The app is loud; nobody chose it.", say: [["vera", "Why does my bank flash at me?", true]], tag: ["plain", "NO ARCHITECTURE"], means: "Mechanics added one request at a time make a product nobody designed." }),
      panel({ art: "b1-2", scene: "Rhea draws what customers should feel: their cushion growing, no push.", say: [["rhea", "First the vision. Then the levers we use, and the ones we don't."]], tag: ["teal", "A VISION"], means: "A guiding vision and principles decide once which levers the company uses." }),
      panel({ art: "b1-3", scene: "Patterns for progress, feedback and recognition, built once for every product.", say: [["dominik", "So the branch screen says the same as the app."]], tag: ["teal", "PATTERNS"], means: "Patterns turn principles into every touchpoint." }),
      panel({ art: "b1-4", scene: "Rhea draws the layers from vision to touchpoint.", say: [["rhea", "We steer behaviour, so we answer for it."]], tag: ["ink", "THE RULE"], means: "Treat gamification as activation architecture, not a game layer. You use this in Block 3.1 for the guiding vision, the three decisions and what comes first." }),
    ],
  }),
  B2: comicOf({
    id: "d9-b2", title: "Midnight", teaser: "Sales wants streak warnings; the advisers want dignity.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Sales wants a streak warning at midnight and a city ranking. The advisers object.", say: [["dominik", "Activity goes up!"], ["rhea", "And dignity goes down."]], tag: ["plain", "TWO GOALS"], means: "Motivation against seriousness, activation against autonomy, brand against the customer's interest." }),
      panel({ art: "b2-2", scene: "Rhea shows three levers and what each one costs.", say: [["rhea", "Loss aversion costs autonomy. Comparison costs trust."]], tag: ["teal", "LEVER BY LEVER"], means: "Decide per lever, and say who stands for each side." }),
      panel({ art: "b2-3", scene: "They choose milestones, drop the ranking and give up the midnight warning.", say: [["dominik", "We give up the launch spike. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "Rhea writes the rule and the metric they will report.", say: [["rhea", "Choose the lever on purpose, and choose what you measure."]], tag: ["ink", "THE RULE"], means: "Name each conflict, decide per lever and per journey, and measure what lasts. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts." }),
    ],
  }),
  B3: comicOf({
    id: "d9-b3", title: "Who decided this?", teaser: "A journalist asks about the ranking. Nobody knows.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "A journalist asks who decided the savings ranking, and why. Nobody can answer.", say: [["dominik", "It was… added?", true]], tag: ["plain", "NO OWNER"], means: "Adding a mechanic needs a champion; removing it needs a business case." }),
      panel({ art: "b3-2", scene: "Rhea writes an owner, a principle, a removal path and an escalation rule.", say: [["rhea", "Every mechanic gets a reason, an owner and a yearly review."]], tag: ["teal", "GOVERNANCE"], means: "A named owner, a written rule, a way to remove, a way to decide conflicts." }),
      panel({ art: "b3-3", scene: "Data on why customers stop is missing. Rhea decides anyway and says when to reverse.", say: [["rhea", "If no more are saving in six months, we look again."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the paragraph before anyone asks.", say: [["rhea", "Who decided, on what principle, what would change it."]], tag: ["ink", "THE RULE"], means: "Give activation an owner and a record, and decide under uncertainty with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
