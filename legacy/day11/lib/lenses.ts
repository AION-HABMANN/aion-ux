// The six lenses. These names and questions are the shared vocabulary for the
// whole day — every other stop refers back to them, so edit with care.

import type { Lens, LensId, SortingItem } from "./types";

export const LENSES: Lens[] = [
  {
    id: "comprehensibility",
    name: "Comprehensibility",
    question: "Does the user know what they can say and what's happening?",
  },
  {
    id: "error_robustness",
    name: "Error robustness",
    question: "When something goes wrong, does it recover helpfully?",
  },
  {
    id: "user_control",
    name: "User control",
    question: "Can the user steer, confirm, undo, or stop?",
  },
  {
    id: "predictability",
    name: "Predictability",
    question: "Does it behave the way the user expects?",
  },
  {
    id: "mental_relief",
    name: "Mental relief",
    question: "Does it reduce effort, or add worry?",
  },
  {
    id: "trust",
    name: "Trust",
    question: "Can the user rely on it with something that matters?",
  },
];

export function getLens(id: LensId): Lens {
  const found = LENSES.find((l) => l.id === id);
  if (!found) throw new Error(`Unknown lens: ${id}`);
  return found;
}

/** Good/bad example pair per lens, drawn from the T1-T6 transcripts. */
export const LENS_EXAMPLES: Record<
  LensId,
  { good: string; goodWhy: string; bad: string; badWhy: string }
> = {
  comprehensibility: {
    good: "“Shall I book it? You can also say 'other times' or 'other location'.”",
    goodWhy: "It says out loud what you are allowed to say next.",
    bad: "“I didn't catch that. Please say a valid command.”",
    badWhy: "It asks for a valid command without ever naming one.",
  },
  error_robustness: {
    good: "“I heard 'parking'. Did you mean a resident permit or a visitor permit?”",
    goodWhy: "A misunderstanding becomes a narrower question, not a wall.",
    bad: "“Sorry, I don't understand. Returning to the main menu.” (twice, unchanged)",
    badWhy: "The same failure repeats with no new route out of it.",
  },
  user_control: {
    good: "“Shall I book it?” — nothing happens until you say yes.",
    goodWhy: "You confirm before the system commits anything.",
    bad: "“Done.” after “Cancel my appointment on Tuesday”, with two appointments that week.",
    badWhy: "Something irreversible happened and you can't tell what.",
  },
  predictability: {
    good: "“Got it. Reference number 4471. You'll get an SMS when a repair is scheduled.”",
    goodWhy: "It does exactly the thing you asked for, and says so.",
    bad: "“A passport photo and your old ID. By the way — shall I also renew your dog registration…”",
    badWhy: "It answers, then wanders off into things you never mentioned.",
  },
  mental_relief: {
    good: "“The next slot is Thursday, 3 August at 10:00, Bürgeramt Mitte.”",
    goodWhy: "One concrete option to react to — nothing to hold in your head.",
    bad: "“I can help with many topics. What would you like to do?”",
    badWhy: "You have to invent the phrasing yourself, from nothing.",
  },
  trust: {
    good: "“Reference number 4471. You'll get an SMS when a repair is scheduled.”",
    goodWhy: "A receipt and a promise you can check later.",
    bad: "“Done.”",
    badWhy: "No proof, no detail — you have to take its word on something that matters.",
  },
};

// ---------------------------------------------------------------------------
// SORTING GAME ITEMS
// Fresh CityHelp lines (deliberately NOT the T1-T6 transcripts), in the same
// municipal spirit. Each carries a one-line "why" so a wrong pick still teaches.
// ---------------------------------------------------------------------------
export const SORTING_ITEMS: SortingItem[] = [
  {
    id: "s1",
    text: "“I've cancelled your Tuesday 09:00 appointment at Bürgeramt Nord. Shall I undo that?”",
    lens: "user_control",
    direction: "strengthens",
    why: "It names exactly what it did and hands you a way to reverse it.",
  },
  {
    id: "s2",
    text: "“That topic is not available by voice. Goodbye.”",
    lens: "error_robustness",
    direction: "weakens",
    why: "A failure that ends the call instead of offering another route.",
  },
  {
    id: "s3",
    text: "“You can say: book, cancel, check status, or report a problem.”",
    lens: "comprehensibility",
    direction: "strengthens",
    why: "It tells you the vocabulary instead of making you guess it.",
  },
  {
    id: "s4",
    text: "“I've registered your new address — and updated your marital status while I was there.”",
    lens: "predictability",
    direction: "weakens",
    why: "It did something you never asked for, on official records.",
  },
  {
    id: "s5",
    text: "“I've saved your details, so you won't have to repeat them next time.”",
    lens: "mental_relief",
    direction: "strengthens",
    why: "It carries the remembering for you.",
  },
  {
    id: "s6",
    text: "“Your request has been processed.” — with no reference number and no date.",
    lens: "trust",
    direction: "weakens",
    why: "Nothing you can check later, on something that matters.",
  },
  {
    id: "s7",
    text: "“I didn't get the street name. Was it Hauptstraße or Hafenstraße?”",
    lens: "error_robustness",
    direction: "strengthens",
    why: "The misunderstanding turns into one easy question.",
  },
  {
    id: "s8",
    text: "“Please state your full request in one sentence, including date, office, and service type.”",
    lens: "mental_relief",
    direction: "weakens",
    why: "You have to compose a perfect sentence before you're allowed to start.",
  },
  {
    id: "s9",
    text: "“Before I submit this, here's what I'll send: name, address, and photo. Correct?”",
    lens: "user_control",
    direction: "strengthens",
    why: "You get to see and approve the action before it happens.",
  },
  {
    id: "s10",
    text: "“I can help with many things. Just say what you need.”",
    lens: "comprehensibility",
    direction: "weakens",
    why: "It sounds welcoming but leaves you with no idea what actually works.",
  },
];
