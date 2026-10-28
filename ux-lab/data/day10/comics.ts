import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 10 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Ilka, Mats, Saskia, Bram and the rail company Northline Rail), so it is the card said again in pictures, not a new case. The last panel states the
 * card's rule and names the task block that uses it. The drawings are in components/day10/comicScenes.tsx.
 */
const NOTE = "Ilka, Mats, Saskia, Bram and Northline Rail are made up for this lesson, like the examples on the card: a Case assumption. SmartAssist, CareerNavigator and CareGuide, the cases of the task, are in the task.";
const NAMES = { ilka: "Ilka, a passenger", mats: "Mats, a passenger", saskia: "Saskia, UX designer", bram: "Bram, product owner" };

export const COMICS_D10 = bi({
  A1: comicOf({
    id: "d10-a1", title: "Which kind is it?", teaser: "Bram wants the app to be smart; Saskia asks smart how.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Bram brings the board's wish: make the app intelligent.", say: [["bram", "Make it smart! Use AI!"]], tag: ["plain", "A VAGUE WISH"], means: "“Intelligent” can mean a rule, the situation, or learning about a person." }),
      panel({ art: "a1-2", scene: "Ilka's train is late. The app sends the same message to everyone.", say: [["ilka", "And my connection?", true]], tag: ["plain", "A RULE"], means: "A rule treats everyone the same: predictable, but blind to her situation." }),
      panel({ art: "a1-3", scene: "The adaptive version knows she is on platform 4 and shows the next train.", say: [["ilka", "Platform 6. Got it."]], tag: ["teal", "THE SITUATION"], means: "An adaptive system reads the situation now and stores nothing about her." }),
      panel({ art: "a1-4", scene: "Saskia writes three words on the board.", say: [["saskia", "Rule, situation, learning. Ask which, before you ask for AI."]], tag: ["ink", "THE RULE"], means: "Say which kind of system is behind a screen, and what it can and cannot know. You use this in Block 1.1 when users cannot tell rules from AI at SmartAssist, and in Block 2.1 for CareGuide." }),
    ],
  }),
  A2: comicOf({
    id: "d10-a2", title: "Same as usual?", teaser: "Mats moved house; the app did not notice.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "At the station, the app shows Mats the departures from there.", say: [["mats", "Handy. It knows where I am."]], tag: ["teal", "CONTEXT"], means: "Adapting to context uses the situation now and needs no data about him." }),
      panel({ art: "a2-2", scene: "On Friday it offers his usual trip home. He moved last month.", say: [["mats", "I don't live there any more!", true]], tag: ["plain", "OLD DATA"], means: "Personalising from data is only as good as the data." }),
      panel({ art: "a2-3", scene: "The voice assistant books and says back what it heard.", say: [["mats", "Bremen, 8:19. Yes, right."]], tag: ["teal", "STEERING"], means: "Steering skips steps; by voice it must say back what it understood." }),
      panel({ art: "a2-4", scene: "Saskia sorts the three ways on the board.", say: [["saskia", "Context first. Personal data only where context is not enough."]], tag: ["ink", "THE RULE"], means: "Tell context, personal data and steering apart; each needs different data and carries a different risk. You use this in Block 1.2 to rate CareerNavigator's designs and in Block 2.1 for CareGuide's recommendations." }),
    ],
  }),
  A3: comicOf({
    id: "d10-a3", title: "Running late again?", teaser: "Each fact was true. Together they felt like being watched.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "The app tells Ilka her train is late and her connection is safe.", say: [["ilka", "Thanks, that saves me checking."]], tag: ["teal", "RELEVANCE"], means: "A message that fits the trip saves time and relieves her." }),
      panel({ art: "a3-2", scene: "Bram adds more: her late starts this week, her gym class.", say: [["bram", "More personal is more helpful!"]], tag: ["plain", "MORE AND MORE"], means: "Past a point, more personal does not mean more helpful." }),
      panel({ art: "a3-3", scene: "Ilka reads: “Running late again? Third time this week.”", say: [["ilka", "Who is watching me?", true]], tag: ["plain", "LOSS OF TRUST"], means: "One message like this, and she doubts every message after it." }),
      panel({ art: "a3-4", scene: "Saskia writes the gains and the risks side by side.", say: [["saskia", "Fit the trip. Not the person's whole life."]], tag: ["ink", "THE RULE"], means: "Name the potential and the risk of every intelligent feature. You use this in Block 1.1 for SmartAssist's two biggest chances and risks, and in Block 2.1 for CareGuide's central ones." }),
    ],
  }),
  A4: comicOf({
    id: "d10-a4", title: "You have been rebooked", teaser: "The choice was good. It still felt done to her.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "The app rebooks Ilka onto the 8:12 and says only that.", say: [["ilka", "Why? Can I change it?", true]], tag: ["plain", "DONE TO HER"], means: "Without why, change or undo, even a good choice feels imposed." }),
      panel({ art: "a4-2", scene: "Saskia adds a reason: your 7:42 is cancelled.", say: [["ilka", "Oh. That makes sense."]], tag: ["teal", "WHY"], means: "Transparency: she sees why." }),
      panel({ art: "a4-3", scene: "She picks the 8:42 instead, and could undo it all.", say: [["ilka", "My choice. Good."]], tag: ["teal", "CHANGE · UNDO"], means: "Control and recoverability: the system proposes, she decides." }),
      panel({ art: "a4-4", scene: "Saskia writes the three questions.", say: [["saskia", "Why? Change? Undo? Three no's, and it doesn't ship."]], tag: ["ink", "THE RULE"], means: "Ask the three questions of every automatic suggestion. You use this in Block 1.1 for transparency and control at SmartAssist, in Block 1.2 for CareerNavigator's designs and in Block 2.1 for CareGuide." }),
    ],
  }),
  A5: comicOf({
    id: "d10-a5", title: "Confidently wrong", teaser: "The app picked a train for Ilka. She was on holiday.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "On a Tuesday in August the app picks Ilka's usual commuter train.", say: [["ilka", "I'm on holiday!", true]], tag: ["plain", "MISREAD SITUATION"], means: "Incomplete data and a misread situation give confident mistakes." }),
      panel({ art: "a5-2", scene: "Saskia traces it back: the data never knew about holidays.", say: [["saskia", "The suggestion is only as good as the data under it."]], tag: ["teal", "THE CHAIN"], means: "Data, situation, suggestion: each step can break." }),
      panel({ art: "a5-3", scene: "The team weighs three measures on four questions.", say: [["bram", "The chatbot is the most exciting…"], ["saskia", "…and the riskiest."]], tag: ["teal", "FOUR QUESTIONS"], means: "Effect on users, feasibility, risk, time pressure." }),
      panel({ art: "a5-4", scene: "They choose reasons and “not for me” first.", say: [["saskia", "Robust cases first. Here is why."]], tag: ["ink", "THE RULE"], means: "Start where the data is good, and weigh every measure with a reason. You use this in Block 1.2 with partial data and in Block 2.1 for the four measures and their justification." }),
    ],
  }),
  B1: comicOf({
    id: "d10-b1", title: "AI in the app", teaser: "Three teams, three recommenders, nobody can explain one.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Every team added its own AI feature. Nobody can say why Mats saw a suggestion.", say: [["mats", "Why does it keep offering me first class?", true]], tag: ["plain", "NO ARCHITECTURE"], means: "AI features added one at a time make a product nobody designed." }),
      panel({ art: "b1-2", scene: "Saskia drafts what help passengers should get, and what stays theirs.", say: [["saskia", "First the vision. Then the principles."]], tag: ["teal", "A VISION"], means: "A guiding vision decides support, depth and autonomy once." }),
      panel({ art: "b1-3", scene: "One suggestion pattern: a reason, not for me, undo, built once.", say: [["bram", "So the station screen works like the app."]], tag: ["teal", "PATTERNS"], means: "Patterns turn principles into every touchpoint." }),
      panel({ art: "b1-4", scene: "Saskia draws the layers from vision to touchpoint.", say: [["saskia", "Fewer, reliable suggestions first."]], tag: ["ink", "THE RULE"], means: "Treat intelligent interfaces as a decision architecture, not a technology trend. You use this in Block 3.1 for the guiding vision, the three decisions and what comes first." }),
    ],
  }),
  B2: comicOf({
    id: "d10-b2", title: "How deep?", teaser: "Sales wants prices by person; data protection says no.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Sales wants personal prices; data protection objects.", say: [["bram", "Better offers!"], ["saskia", "Prices by who you are?"]], tag: ["plain", "TWO GOALS"], means: "Personalisation against transparency, comfort against data protection, innovation against trust." }),
      panel({ art: "b2-2", scene: "Saskia sorts three journeys by how deep they may go.", say: [["saskia", "Reminders deep. Offers medium. Assistance: a person."]], tag: ["teal", "PER JOURNEY"], means: "Decide the depth per journey: data quality and the cost of a mistake." }),
      panel({ art: "b2-3", scene: "They write down what they assume, and which would hurt if wrong.", say: [["bram", "We give up personal prices. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "Saskia writes the rule.", say: [["saskia", "Deep where it is safe. A person where it is not."]], tag: ["ink", "THE RULE"], means: "Name each conflict, decide the depth per journey, and keep a person for the exceptions. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts." }),
    ],
  }),
  B3: comicOf({
    id: "d10-b3", title: "Why did it suggest that?", teaser: "A journalist asks. Nobody owns the answer.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "A journalist asks why the app suggested first class to pensioners. Nobody knows.", say: [["bram", "The model… decided?", true]], tag: ["plain", "NO OWNER"], means: "An intelligent feature is easy to switch on and hard to explain afterwards." }),
      panel({ art: "b3-2", scene: "Saskia writes an owner, a veto, a record per function and a rule.", say: [["saskia", "Every function gets a record and an owner."]], tag: ["teal", "GOVERNANCE"], means: "An owner, data protection's veto, a record, a rule for conflicts." }),
      panel({ art: "b3-3", scene: "Nobody knows how often suggestions are wrong. Saskia decides anyway.", say: [["saskia", "Reasons and undo first. If nobody uses them, we look again."]], tag: ["teal", "A DECISION"], means: "Decide, say what you do not know, when you would reverse it and what you give up." }),
      panel({ art: "b3-4", scene: "The team writes the paragraph before anyone asks.", say: [["saskia", "What it suggests, from which data, how to switch it off."]], tag: ["ink", "THE RULE"], means: "Give intelligent UX an owner and a record, and decide under uncertainty with a reason. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
