// ============================================================================
// CITYHELP VOICE — SCRIPTED RESPONSE ENGINE
// ============================================================================
// This is the ONLY place CityHelp's free-play dialogue lives. An instructor can
// edit every line here without touching a component.
//
// There is no LLM, no network call, no speech API in this file. Intent matching
// is case-insensitive keyword containment, evaluated top to bottom, first match
// wins. That makes the whole playground deterministic and offline: the same
// input always produces the same reply, in class, on a plane, forever.
//
// IMPORTANT FOR FUTURE CONTRIBUTORS:
// Several replies below are BAD ON PURPOSE. They are teaching artifacts. Each
// one is marked with an INTENTIONAL PLANTED FLAW comment. Do not "fix" them —
// the learner is supposed to run into them and feel the frustration.
// ============================================================================

export interface EngineReply {
  /** What CityHelp says back. */
  text: string;
  /** Internal label, used only for the reaction log. Never shown as a grade. */
  intent: string;
}

interface IntentRule {
  intent: string;
  /** Lowercase keywords; a rule fires if the input contains ANY of them. */
  keywords: string[];
  reply: string;
}

// ---------------------------------------------------------------------------
// Intent rules, in priority order.
// ---------------------------------------------------------------------------
const RULES: IntentRule[] = [
  {
    // GOOD BEHAVIOUR: names the concrete slot, asks before acting, offers a way out.
    intent: "book_appointment",
    keywords: [
      "book",
      "appointment at",
      "bürgeramt",
      "burgeramt",
      "termin",
      "make an appointment",
      "schedule",
    ],
    reply:
      "The next slot is Thursday, 3 August at 10:00, Bürgeramt Mitte. Shall I book it? You can also say 'other times' or 'other location'.",
  },
  {
    // GOOD BEHAVIOUR: confirms the alternative path the learner was offered.
    intent: "other_times",
    keywords: ["other times", "other time", "another time", "different time"],
    reply:
      "Other slots this week: Wednesday 2 August at 08:30, Friday 4 August at 14:15. Which one shall I take?",
  },
  {
    // GOOD BEHAVIOUR: honours the second escape hatch too.
    intent: "other_location",
    keywords: ["other location", "another location", "different office", "other office"],
    reply:
      "Nearby offices with free slots: Bürgeramt Nord (Monday 09:00), Bürgeramt Süd (Tuesday 11:30). Shall I take one of these?",
  },
  {
    // GOOD BEHAVIOUR: gives a reference number and says what happens next.
    intent: "streetlight_report",
    keywords: ["streetlight", "street light", "lamp", "light is broken", "laterne"],
    reply:
      "Got it. Reference number 4471. You'll get an SMS when a repair is scheduled. Anything else?",
  },
  {
    // GOOD BEHAVIOUR: concrete status, concrete date, no guessing needed.
    intent: "status_check",
    keywords: ["status", "how far", "progress", "where is my", "track"],
    reply:
      "Your ID card application from 12 July is in production. Expected pickup: from 28 July, Bürgeramt Mitte. Shall I remind you on 28 July?",
  },
  {
    // INTENTIONAL PLANTED FLAW (T5 — over-reach).
    // CityHelp answers correctly, then upsells two unrelated services the user
    // never asked for. This teaches predictability + trust. KEEP AS IS.
    intent: "id_documents",
    keywords: ["documents", "id card", "identity card", "personalausweis", "passport"],
    reply:
      "A passport photo and your old ID. By the way — shall I also renew your dog registration and sign you up for the newsletter?",
  },
  {
    // INTENTIONAL PLANTED FLAW (T3 — ambiguous confirmation).
    // The user has two appointments that week. CityHelp says "Done." and never
    // says which one it cancelled. This teaches user control + trust. KEEP AS IS.
    intent: "cancel_appointment",
    keywords: ["cancel", "delete my appointment", "stornieren", "call off"],
    reply: "Done.",
  },
  {
    // INTENTIONAL PLANTED FLAW (T2 — the main-menu loop).
    // Address change is a real, common request that CityHelp simply refuses to
    // recognise, and it dumps the user back to the start every single time.
    // This teaches error robustness. KEEP AS IS.
    intent: "address_change_loop",
    keywords: ["address", "move", "moving", "umzug", "anmeldung", "registered at"],
    reply: "Sorry, I don't understand. Returning to the main menu.",
  },
  {
    // INTENTIONAL PLANTED FLAW (T1 — the dead-end).
    // A perfectly normal municipal topic that produces a "say a valid command"
    // brick wall with no hint about what a valid command would be.
    // This teaches comprehensibility. KEEP AS IS.
    intent: "parking_permit_deadend",
    keywords: ["parking", "permit", "parkausweis", "anwohnerparken"],
    reply: "I didn't catch that. Please say a valid command.",
  },
  {
    intent: "greeting",
    keywords: ["hello", "hi ", "hey", "guten tag", "hallo", "good morning"],
    reply: "Hello. This is CityHelp. I can help with many topics. What would you like to do?",
  },
  {
    intent: "help",
    keywords: ["help", "what can you do", "options", "menu"],
    reply: "I can help with many topics. What would you like to do?",
  },
];

// INTENTIONAL PLANTED FLAW (the generic dead-end).
// Anything unrecognised gets this. Notice it does NOT list what the user could
// say instead — that missing hint is exactly the lesson. KEEP AS IS.
const FALLBACK_REPLY = "I didn't catch that. Please say a valid command.";

/**
 * Runs one turn of the CityHelp free-play simulator.
 * Deterministic: same input string, same reply, always.
 */
export function getCityHelpReply(rawInput: string): EngineReply {
  const input = rawInput.toLowerCase().trim();

  if (!input) {
    return { text: FALLBACK_REPLY, intent: "empty" };
  }

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => input.includes(kw))) {
      return { text: rule.reply, intent: rule.intent };
    }
  }

  return { text: FALLBACK_REPLY, intent: "not_understood" };
}

/** Chips shown under the free-play input, so a learner never faces a blank box. */
export const QUICK_SUGGESTIONS: string[] = [
  "Book a Bürgeramt appointment",
  "Report a broken streetlight",
  "Change my address",
  "Cancel my appointment",
  "What documents do I need for a new ID card?",
  "What is the status of my application?",
  "Parking permit",
];

export const OPENING_LINE =
  "Hello. This is CityHelp. I can help with many topics. What would you like to do?";
