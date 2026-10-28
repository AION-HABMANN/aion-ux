// Stop 6 — prototyping types, the risk-based testing grid, and the
// "where does voice belong" decision widget.

import type { RiskUseCase } from "./types";

export const PROTOTYPE_TYPES = [
  {
    id: "functional",
    name: "Functional prototype",
    definition: "Does the thing actually work end to end?",
    example:
      "CityHelp really books a slot in a test calendar — clunky voice, real booking.",
    tradeoff: "Proves feasibility. Tells you nothing about whether people can use it.",
  },
  {
    id: "interaction",
    name: "Interaction prototype",
    definition: "Does the conversation flow feel right?",
    example:
      "A clickable script of the booking dialogue — nothing behind it, but every turn is written out.",
    tradeoff: "Cheap and fast to change. Nothing is real, so timing surprises stay hidden.",
  },
  {
    id: "test",
    name: "Test prototype",
    definition: "What happens when a real person meets it?",
    example:
      "Five citizens book an appointment while you watch, including one who says “Perso” instead of “ID card”.",
    tradeoff: "Finds the failures you'd never predict. Costs real people's time.",
  },
] as const;

export const PROTOTYPE_FIRST_TAKE =
  "Most teams reach for the functional prototype first, because it feels like progress. For a voice interface the interaction prototype usually earns its place earlier: the expensive mistakes here are wrong wording and wrong turn-taking, and you can find those with a script and a colleague reading it aloud.";

// The 2x2 answer key. Frequency = how often citizens do this.
// Risk = how bad it is when the system gets it wrong.
export const RISK_USE_CASES: RiskUseCase[] = [
  { id: "book", label: "Book an appointment", frequency: "high", risk: "high" },
  { id: "status", label: "Check application status", frequency: "high", risk: "low" },
  { id: "streetlight", label: "Report a broken streetlight", frequency: "high", risk: "low" },
  { id: "address", label: "Change registered address", frequency: "low", risk: "high" },
  { id: "documents", label: "Ask which ID documents are needed", frequency: "high", risk: "low" },
  { id: "general", label: "General question about opening hours", frequency: "high", risk: "low" },
];

export const RISK_CELL_ADVICE: Record<string, string> = {
  "high-high":
    "Test hardest here. Frequent enough that failures pile up, serious enough that each one costs someone a real appointment or a legal deadline.",
  "high-low":
    "This is where voice shines first. Lots of people, low damage when it stumbles — a safe place to launch and learn.",
  "low-high":
    "Rare but dangerous. Don't lead with voice here; make sure there's an obvious human route, and test the escape hatch rather than the happy path.",
  "low-low":
    "Lowest priority. Nice if it works, not worth much testing budget.",
};

export const DECISION_TASKS = [
  {
    id: "status",
    label: "Check application status",
    goodForVoice: true,
    ifVoice: "Fast and hands-free. If it mishears, the citizen just asks again.",
    ifNotVoice: "Fine, but you've made people open a website for a ten-second answer.",
  },
  {
    id: "streetlight",
    label: "Report a broken streetlight",
    goodForVoice: true,
    ifVoice: "Perfect fit — short, repeatable, low damage if it needs a retry.",
    ifNotVoice: "You lose the one case where voice is clearly better than a form.",
  },
  {
    id: "hours",
    label: "Ask about opening hours",
    goodForVoice: true,
    ifVoice: "One sentence in, one sentence out. Nothing to go wrong.",
    ifNotVoice: "A missed easy win.",
  },
  {
    id: "book",
    label: "Book an appointment",
    goodForVoice: true,
    ifVoice: "Workable, but only with visible confirmation before anything is committed.",
    ifNotVoice: "Safer, though you give up the most-wanted service on the line.",
  },
  {
    id: "address",
    label: "Change registered address",
    goodForVoice: false,
    ifVoice: "Risky. Legal record, hard to undo, and names and street spellings are exactly what speech gets wrong.",
    ifNotVoice: "Good call. Send this to a form or a human and say so clearly.",
  },
  {
    id: "cancel",
    label: "Cancel an appointment",
    goodForVoice: false,
    ifVoice: "Only if it names which appointment. Otherwise you've rebuilt the “Done.” problem.",
    ifNotVoice: "Reasonable — an irreversible action with an ambiguous target is a bad first voice case.",
  },
];
