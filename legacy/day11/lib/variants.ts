// Stop 4 — the three build variants for one shared task:
// "Book a Bürgeramt appointment."
//
// The five ratings below are the fixed ground truth used across the course.
// Do not tune them to taste — they are quoted verbatim in the worksheet.

import type { RatingLevel, UserPersona, VariantId, VariantProfile } from "./types";

export const VARIANTS: Record<VariantId, VariantProfile> = {
  A: {
    id: "A",
    name: "Variant A",
    subtitle: "Free / natural — say anything you like",
    comfort: "High",
    comprehensibility: "Low",
    robustness: "Low",
    control: "Medium",
    cost: "Low",
  },
  B: {
    id: "B",
    name: "Variant B",
    subtitle: "Guided / constrained — pick from fixed options",
    comfort: "Low",
    comprehensibility: "High",
    robustness: "High",
    control: "High",
    cost: "Low",
  },
  C: {
    id: "C",
    name: "Variant C",
    subtitle: "Hybrid — voice plus an on-screen list you confirm",
    comfort: "Medium",
    comprehensibility: "High",
    robustness: "High",
    control: "High",
    cost: "High",
  },
};

export const VARIANT_ORDER: VariantId[] = ["A", "B", "C"];

export const PROPERTY_ROWS: {
  key: keyof Pick<
    VariantProfile,
    "comfort" | "comprehensibility" | "robustness" | "control" | "cost"
  >;
  label: string;
}[] = [
  { key: "comfort", label: "Comfort / naturalness" },
  { key: "comprehensibility", label: "Comprehensibility" },
  { key: "robustness", label: "Error robustness" },
  { key: "control", label: "User control" },
  { key: "cost", label: "Cost / build effort" },
];

/**
 * VARIANT A ENGINE — powerful but brittle, on purpose.
 *
 * INTENTIONAL PLANTED FLAW: only a narrow band of phrasings works. Anything
 * slightly sideways ("I gotta sort out my Perso", "next week sometime") falls
 * over. That brittleness IS the lesson of Variant A. KEEP AS IS.
 */
export function variantAReply(rawInput: string): { text: string; ok: boolean } {
  const input = rawInput.toLowerCase().trim();
  if (!input) {
    return { text: "I didn't catch that. Please say a valid command.", ok: false };
  }

  const hasIntent = ["book", "appointment", "termin", "reserve"].some((k) =>
    input.includes(k)
  );
  const hasPlace = ["bürgeramt", "burgeramt", "city office", "town hall", "citizen"].some(
    (k) => input.includes(k)
  );

  if (hasIntent && hasPlace) {
    return {
      text: "Booked: Thursday, 3 August at 10:00, Bürgeramt Mitte. Confirmation sent.",
      ok: true,
    };
  }
  if (hasIntent && !hasPlace) {
    return {
      text: "Sorry, I don't understand. Returning to the main menu.",
      ok: false,
    };
  }
  return { text: "I didn't catch that. Please say a valid command.", ok: false };
}

/** Variant B — the fixed spoken menu. Slow, rigid, and it always works. */
export const VARIANT_B_STEPS: {
  prompt: string;
  options: { label: string; next?: number; result?: string }[];
}[] = [
  {
    prompt: "CityHelp: Which service do you need? Say one: appointment, status, or report a problem.",
    options: [
      { label: "Appointment", next: 1 },
      { label: "Status", result: "For status checks, please have your file number ready. Returning to the start." },
      { label: "Report a problem", result: "For reports, please have the street name ready. Returning to the start." },
    ],
  },
  {
    prompt: "CityHelp: Which office? Say one: Mitte, Nord, or Süd.",
    options: [
      { label: "Bürgeramt Mitte", next: 2 },
      { label: "Bürgeramt Nord", next: 2 },
      { label: "Bürgeramt Süd", next: 2 },
    ],
  },
  {
    prompt: "CityHelp: Which day? Say one: Wednesday, Thursday, or Friday.",
    options: [
      { label: "Wednesday", next: 3 },
      { label: "Thursday", next: 3 },
      { label: "Friday", next: 3 },
    ],
  },
  {
    prompt: "CityHelp: Confirm the booking? Say yes or no.",
    options: [
      { label: "Yes", result: "Booked. You'll receive a confirmation by post within five working days." },
      { label: "No", result: "Cancelled. Returning to the start." },
    ],
  },
];

/** Variant C — free input, but every guess is shown on screen for confirmation. */
export const VARIANT_C_SUGGESTIONS = [
  { label: "Bürgeramt Mitte · Thursday 3 Aug, 10:00", detail: "Nearest office, next free slot" },
  { label: "Bürgeramt Nord · Monday 7 Aug, 09:00", detail: "Quieter, 2 stops further" },
  { label: "Bürgeramt Süd · Tuesday 8 Aug, 11:30", detail: "Step-free access" },
];

/** Which variant a given persona tends to get on best with, and why. */
export const PERSONA_VERDICT: Record<
  UserPersona,
  { label: string; best: VariantId; note: string }
> = {
  tech_savvy: {
    label: "Tech-savvy 25-year-old",
    best: "A",
    note: "They already know what to say, so free input is the fastest route. A fixed menu just slows them down, and they will happily retry after a stumble.",
  },
  elderly_first_time: {
    label: "Elderly citizen, first time",
    best: "C",
    note: "They need to see what's on offer and confirm before anything happens. Free input asks them to invent the phrasing; the hybrid shows the options and still lets them speak.",
  },
};

/** How each variant lands for each persona. Same ratings, different verdict. */
export const PERSONA_NOTES: Record<UserPersona, Record<VariantId, string>> = {
  tech_savvy: {
    A: "They already know the magic words, so free input is the fastest route to done. A stumble costs them one retry and no confidence.",
    B: "Correct, but slow. Four fixed questions to book one appointment feels like being put on hold by a machine.",
    C: "Safe and clear, though the confirmation step is friction they didn't need. They'd tolerate it, not love it.",
  },
  elderly_first_time: {
    A: "Hardest for them. A blank prompt asks them to invent the right phrasing, and the failure message blames them for getting it wrong.",
    B: "Slow but survivable — every option is read out, so nothing has to be guessed. The rigidity is the price of never being lost.",
    C: "They can see the options and still speak. Nothing is committed until they tap, so a mishearing costs nothing.",
  },
};

export const RATING_TONE: Record<RatingLevel, string> = {
  High: "border-purple bg-purple text-white",
  Medium: "border-purple/30 bg-lilac text-navy",
  Low: "border-navy/15 bg-white text-navy/70",
};
