// The six canonical CityHelp moments (T1-T6).
//
// The transcript lines are FIXED COURSE MATERIAL — they are quoted verbatim in
// the worksheet, so they must not be reworded, softened, or "improved". Four of
// them are bad on purpose; each is marked below. KEEP AS IS.

import type { Moment } from "./types";

export const MOMENTS: Moment[] = [
  {
    id: "T1",
    title: "The parking permit",
    // INTENTIONAL PLANTED FLAW: a dead-end. The user names a real service and
    // gets told to say a "valid command" that is never defined. KEEP AS IS.
    lines: [
      { role: "user", text: "I need help with my parking permit." },
      { role: "system", text: "I can help with many topics. What would you like to do?" },
      { role: "user", text: "Parking permit." },
      { role: "system", text: "I didn't catch that. Please say a valid command." },
    ],
    feeling: "You answered the question it asked, and it still told you that you were wrong.",
    primaryLens: "comprehensibility",
    direction: "weakens",
    expertReading:
      "The assistant never says what it can actually take. “Many topics” sounds open but gives you nothing to aim at, and “a valid command” blames you for a vocabulary you were never shown. A UX lead would read this mostly as comprehensibility, weakened — you can't know what to say. Error robustness is weak here too, since the recovery adds no new information.",
  },
  {
    id: "T2",
    title: "The address change",
    // INTENTIONAL PLANTED FLAW: the main-menu loop. The identical failure
    // repeats forever with no new route out. KEEP AS IS.
    lines: [
      { role: "user", text: "Change my registered address." },
      { role: "system", text: "Sorry, I don't understand. Returning to the main menu." },
      { role: "user", text: "Address change." },
      { role: "system", text: "Sorry, I don't understand. Returning to the main menu." },
      { role: "user", text: "I want to change my address." },
      { role: "system", text: "Sorry, I don't understand. Returning to the main menu." },
    ],
    feeling: "You said the same thing twice and it still didn't get you anywhere.",
    primaryLens: "error_robustness",
    direction: "weakens",
    expertReading:
      "The second attempt is treated exactly like the first — the system learns nothing from failing. “Returning to the main menu” moves you backwards, so effort is spent and ground is lost. A UX lead would read this mostly as error robustness, weakened. A robust version would narrow down (“Do you mean registering a new address?”) or hand you to a human.",
  },
  {
    id: "T3",
    title: "The cancelled appointment",
    // INTENTIONAL PLANTED FLAW: ambiguous confirmation. The user has two
    // appointments that week; "Done." never says which one died. KEEP AS IS.
    lines: [
      { role: "user", text: "Cancel my appointment on Tuesday." },
      { role: "system", text: "Done." },
      {
        role: "system",
        text: "(The user has two appointments that week. The system doesn't say which one it cancelled.)",
      },
    ],
    feeling: "Something just happened to your calendar and you don't know what.",
    primaryLens: "user_control",
    direction: "weakens",
    expertReading:
      "The action was irreversible and the confirmation contains no detail — no time, no office, no undo. You cannot verify it and you cannot take it back. A UX lead would read this mostly as user control, weakened, with trust weakened alongside it: a one-word receipt for a real-world consequence is not something you can rely on.",
  },
  {
    id: "T4",
    title: "The booking that works",
    // GOOD BEHAVIOUR — the counter-example. Keep it as the positive anchor.
    lines: [
      { role: "user", text: "Book an appointment at the Bürgeramt." },
      {
        role: "system",
        text: "The next slot is Thursday, 3 August at 10:00, Bürgeramt Mitte. Shall I book it? You can also say 'other times' or 'other location'.",
      },
    ],
    feeling: "You know exactly what it's offering and exactly what you can say next.",
    primaryLens: "comprehensibility",
    direction: "strengthens",
    expertReading:
      "One concrete proposal, named out loud, plus two named escape routes. Nothing is committed until you say yes. A UX lead would read this mostly as comprehensibility, strengthened — you can hear your options. User control and mental relief are strengthened too: you confirm before anything happens, and you only have to react rather than compose.",
  },
  {
    id: "T5",
    title: "The helpful over-reach",
    // INTENTIONAL PLANTED FLAW: over-reach. A correct answer followed by an
    // unrequested upsell on unrelated services. KEEP AS IS.
    lines: [
      { role: "user", text: "What documents do I need for a new ID card?" },
      {
        role: "system",
        text: "A passport photo and your old ID. By the way — shall I also renew your dog registration and sign you up for the newsletter?",
      },
    ],
    feeling: "It answered you, then started selling — and now you wonder what else it knows about you.",
    primaryLens: "predictability",
    direction: "weakens",
    expertReading:
      "The answer itself is fine. What breaks is the turn after it: the assistant leaves the topic you opened and starts proposing things you never mentioned. A UX lead would read this mostly as predictability, weakened — it isn't behaving the way you expected. Trust takes the second hit, because an assistant that volunteers your dog registration clearly has more of your data in play than the conversation implied.",
  },
  {
    id: "T6",
    title: "The streetlight report",
    // GOOD BEHAVIOUR — the second positive anchor.
    lines: [
      { role: "user", text: "Report a broken streetlight on Hauptstraße." },
      {
        role: "system",
        text: "Got it. Reference number 4471. You'll get an SMS when a repair is scheduled. Anything else?",
      },
    ],
    feeling: "It's handled, you have proof, and you can stop thinking about it.",
    primaryLens: "trust",
    direction: "strengthens",
    expertReading:
      "A reference number is something you can hold on to, and “you'll get an SMS” tells you who is carrying the task next — not you. A UX lead would read this mostly as trust, strengthened. Mental relief follows: the report is closed in your head, which is the whole point of reporting it.",
  },
];

export function getMoment(id: string): Moment | undefined {
  return MOMENTS.find((m) => m.id === id);
}
