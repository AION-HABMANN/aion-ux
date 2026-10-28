import type { VoiceCfg } from "@/components/sim/VoiceSim";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the voice assistants you can talk to (components/sim/VoiceSim.tsx). HomeAssist Voice as the plan describes it (Block 1.1), the three CareVoice designs
 * (Block 1.2) and CityHelp Voice as its first prototypes behave (Block 2.1). The plan's clues are kept exactly and nothing is added that changes the answer:
 * HomeAssist answers fast but not comprehensibly on complex requests, repeats a standard answer on a misunderstanding, gives no hint what can be said, and makes
 * suggestions that are partly unexpected; CareVoice A understands free speech and acts on it, also wrongly in complex situations, B guides with a limited set of
 * commands, C adds a screen that shows what it understood; CityHelp understands simple requests, fails on ambiguous ones with technical errors, and reads a
 * sensitive result aloud without checking who is listening.
 *
 * Shown for real (user rule 2026-10-28): the learner meets the misunderstanding loop, the technical error code and the over-eager action in a dialogue, instead of
 * reading about them. Times, names, codes and kilowatt hours are interface labels of made-up products, not figures about users. Keys are matched in order, first
 * match wins; they are English.
 */

/* ------------------------------------------------------------------ HomeAssist Voice: energy, devices, service */

export const homeAssist = (): VoiceCfg => {
  const standard = tt("I can help you with energy, devices and service.");
  return {
    name: "HomeAssist Voice",
    color: "#0F5C7A",
    greeting: tt("HomeAssist here. How can I help?"),
    devices: [
      { id: "light", label: tt("Living room light"), value: tt("on") },
      { id: "heat", label: tt("Heating"), value: "20 °C" },
      { id: "wash", label: tt("Washing machine"), value: tt("off") },
    ],
    rules: [
      { keys: ["why", "bill", "higher", "more expensive", "last year", "compare"], say: tt("Today you have used 7.4 kilowatt hours.") },
      { keys: ["consumption", "how much power", "electricity", "usage", "kwh", "used today", "energy today", "how much energy"], say: tt("Today you have used 7.4 kilowatt hours.") },
      { keys: ["light off", "lights off", "turn off the light", "switch off the light", "turn the light off", "switch the light off"], say: tt("The living room light is off."), set: { light: tt("off") } },
      { keys: ["light on", "lights on", "turn on the light", "switch on the light", "turn the light on"], say: tt("The living room light is on."), set: { light: tt("on") } },
      { keys: ["eco", "yes", "okay", "sure"], say: tt("Eco mode is now on every night from 22:00."), set: { heat: tt("20 °C · eco at night") } },
      { keys: ["heating", "temperature", "warmer", "colder", "degrees", "heat up"], say: tt("The heating is set to 22 degrees. By the way: shall I switch your heating to eco mode every night from now on?"), set: { heat: "22 °C" } },
      { keys: ["washing", "laundry", "cheapest", "cheap", "best time", "tariff"], say: tt("The washing machine is ready. I recommend running your devices at night. Shall I order a smart plug for you?") },
      { keys: ["fault", "broken", "not working", "error", "noise", "e7", "report", "problem with"], say: [tt("Please describe the fault."), tt("Thank you. Your service request has been created.")] },
      { keys: ["help", "what can you do", "what can i say", "commands", "options"], say: standard },
    ],
    fallback: standard,
  };
};

/* ------------------------------------------------------------------ CareVoice, a health platform's voice assistant: three designs */

/** Variant A: very natural, free speech input with high flexibility, but a higher error rate in complex situations. */
export const careVoiceA = (): VoiceCfg => ({
  name: "CareVoice",
  color: "#9F1239",
  greeting: tt("Hi, I'm CareVoice! Just tell me what you need, in your own words. 😊"),
  rules: [
    { keys: ["move", "reschedule", "change my appointment", "instead", "postpone", "later"], say: tt("Done! I've booked you an appointment with Dr Brandt on Friday at 11:00. Anything else?") },
    { keys: ["cancel"], say: tt("Cancelled. Anything else?") },
    { keys: ["appointment", "see a doctor", "see the doctor", "book", "doctor"], say: tt("Done! You're booked with Dr Brandt tomorrow at 9:20. See you there!") },
    { keys: ["prescription", "refill", "medication", "medicine", "tablets", "pills"], say: tt("Sure! Your prescription for ibuprofen 400 has been renewed and sent to your pharmacy.") },
    { keys: ["result", "blood", "lab", "test"], say: tt("Good news: your blood results are in. Your cholesterol is slightly raised, everything else is normal.") },
    { keys: ["hello", "hi ", "hey", "good morning"], say: tt("Hi! What can I do for you today?") },
  ],
  fallback: [tt("Hmm, could you say that a little differently?"), tt("Sorry, I'm still not sure. Could you rephrase that?")],
});

/** Variant B: clearly guided dialogues with a limited set of commands, but high comprehensibility and robustness. */
export const careVoiceB = (): VoiceCfg => {
  const menu = tt("You can say: one, appointments; two, prescriptions; three, test results. Or say: person, to speak to the practice team.");
  return {
    name: "CareVoice",
    color: "#0F766E",
    greeting: tt(`Welcome to CareVoice. ${menu}`),
    rules: [
      { keys: ["person", "someone", "human", "team", "staff"], say: tt("I am connecting you to the practice team. They answer from 8 am to 6 pm.") },
      { keys: ["repeat", "again", "menu", "back", "start"], say: menu },
      { keys: ["ramipril"], say: tt("Renew ramipril 5 milligrams and send it to your usual pharmacy? Say yes or no.") },
      { keys: ["ibuprofen"], say: tt("Renew ibuprofen 400 and send it to your usual pharmacy? Say yes or no.") },
      { keys: ["change", "move", "reschedule"], say: tt("You have one appointment: Thursday at 10:00 with Dr Brandt. Move it to Friday at 11:00? Say yes or no.") },
      { keys: ["new one", "new appointment", "book", "new"], say: tt("The next free time with Dr Brandt is tomorrow at 9:20. Shall I book it? Say yes or no.") },
      { keys: ["one", "appointment", "1"], say: tt("Appointments. Say: new, to book one; change, to move one; or back.") },
      { keys: ["two", "prescription", "medication", "2"], say: tt("Prescriptions. You have two: ibuprofen 400 and ramipril 5. Say the name of the one to renew.") },
      { keys: ["three", "result", "3"], say: tt("Test results. For your privacy, please say your date of birth first.") },
      { keys: ["19", "born", "birth"], say: tt("Thank you. Your blood test from 14 October is ready. Shall I read it now? Make sure nobody else is listening. Say yes or no.") },
      { keys: ["yes", "okay"], say: tt("Done. You will get a text message with the details. Say menu, or goodbye.") },
      { keys: ["no"], say: tt(`Nothing changed. ${menu}`) },
      { keys: ["bye", "goodbye", "stop"], say: tt("Goodbye.") },
    ],
    fallback: [tt(`Sorry, I did not get that. ${menu}`), tt("I still did not get that. Say one, two or three, or say person."), tt("I am connecting you to the practice team.")],
  };
};

/** Variant C: voice, visual support and AI help combined, but a higher implementation effort. */
export const careVoiceC = (): VoiceCfg => ({
  name: "CareVoice",
  color: "#5B21B6",
  greeting: tt("Hello, I'm CareVoice. Speak, or tap on the screen. The screen shows what I understood."),
  screen: [tt("What would you like to do?"), tt("Appointment"), tt("Prescription"), tt("Test results"), tt("Talk to the practice team")],
  rules: [
    { keys: ["practice team", "person", "human"], say: tt("I am connecting you to the practice team. Your request so far is on their screen too."), screen: [tt("Connecting to the practice team …")] },
    { keys: ["undo"], say: tt("Undone. Your appointment stays on Thursday at 10:00."), screen: [tt("✓ Nothing changed"), tt("Appointment"), tt("Prescription")] },
    { keys: ["move", "reschedule", "change my appointment", "instead", "postpone"], say: tt("You want to move your appointment on Thursday at 10:00. Where to? The free times are on your screen."), screen: [tt("I understood: move Thursday 10:00, Dr Brandt"), tt("Friday 11:00"), tt("Monday 8:40"), tt("Keep Thursday")] },
    { keys: ["friday", "monday", "9:20", "tomorrow"], say: tt("Done: your appointment is now on that day, with Dr Brandt. If that was wrong, say undo or tap it."), screen: [tt("✓ Booked with Dr Brandt"), tt("Undo")] },
    { keys: ["keep"], say: tt("Your appointment stays on Thursday at 10:00."), screen: [tt("✓ Nothing changed"), tt("Appointment"), tt("Prescription")] },
    { keys: ["appointment", "book", "doctor"], say: tt("I can book with Dr Brandt. Two times are free; they are on your screen. Which one?"), screen: [tt("I understood: book an appointment, Dr Brandt"), tt("Tomorrow 9:20"), tt("Friday 11:00"), tt("Other times")] },
    { keys: ["ramipril", "ibuprofen"], say: tt("Renewed and sent to your usual pharmacy. You see it on the screen; tap undo if that was not what you meant."), screen: [tt("✓ Renewed, sent to the pharmacy"), tt("Undo")] },
    { keys: ["prescription", "refill", "medication", "medicine", "tablets"], say: tt("You have two prescriptions. Which one? Both are on your screen."), screen: [tt("I understood: renew a prescription"), tt("Ibuprofen 400"), tt("Ramipril 5")] },
    { keys: ["result", "blood", "lab"], say: tt("Your results are ready. For your privacy I show them on the screen only, after you confirm it is you."), screen: [tt("Your results are ready"), tt("Confirm it is me"), tt("Not now")] },
    { keys: ["confirm it is me"], say: tt("Thank you. Your results are on the screen. I will not read them aloud."), screen: [tt("Blood test, 14 October"), tt("Talk to the practice team")] },
  ],
  fallback: tt("I am not sure what you meant. Did you mean an appointment, a prescription or your results? Tap one, or say it."),
});

/* ------------------------------------------------------------------ CityHelp Voice, the city's voice assistant, as its first prototypes behave */

/** CityHelp Voice: simple requests understood, ambiguous ones fail with technical errors, unclear inputs, hard to control, a sensitive answer read aloud. */
export const cityHelp = (): VoiceCfg => ({
  name: "CityHelp Voice",
  color: "#1D4E89",
  greeting: tt("Welcome to CityHelp, the voice service of your city. How can I help?"),
  rules: [
    { keys: ["other time", "another time", "different time", "later"], say: tt("Other free appointments this week: Wednesday at 8:30 and Friday at 14:15. Which one shall I take?") },
    { keys: ["wednesday", "friday", "thursday"], say: tt("Your appointment is booked. Reference B-2291. You will get a text message.") },
    { keys: ["appointment", "book", "citizens' office", "citizens office", "termin"], say: tt("The next free appointment at the citizens' office Mitte is Thursday at 10:00. Shall I book it? You can also say: other time.") },
    { keys: ["status", "how far", "where is my", "application", "ready"], say: tt("Your ID card application from 12 July is in production. You can pick it up from 28 July at the citizens' office Mitte.") },
    { keys: ["streetlight", "street light", "lamp", "pothole", "rubbish", "damage"], say: tt("Thank you. Your report has the reference 4471. You will get a text message when a repair is planned. Anything else?") },
    { keys: ["documents", "id card", "passport", "what do i need"], say: tt("Please bring a passport photo and your old ID card. By the way: shall I also renew your dog licence and sign you up for the city newsletter?") },
    { keys: ["cancel"], say: tt("Done.") },
    { keys: ["benefit", "housing", "rejected", "residence", "permit", "social", "debt"], say: tt("Your housing benefit application was rejected on 3 October because your household income is above the limit. Shall I read the full decision?") },
    { keys: ["address", "move", "moving", "moved", "register"], say: tt("Error 422: intent not resolved. Please rephrase your request.") },
    { keys: ["parking", "car", "resident"], say: tt("ERR_NO_MATCH (code 7). Please say a valid command.") },
    { keys: ["help", "what can you do", "what can i say", "options"], say: tt("I can help with many topics. What would you like to do?") },
    { keys: ["yes", "okay", "sure"], say: tt("Your appointment is booked. Reference B-2291.") },
    { keys: ["person", "human", "someone", "staff"], say: tt("All service lines are busy. Please try again later.") },
  ],
  fallback: tt("Error: input not recognised (code 404). Returning to the main menu."),
});

/** Things to try, for the exercise (shown outside the product, labelled as such). */
export const TRY = {
  homeAssist: () => [tt("How much power did I use today?"), tt("Turn off the living room light"), tt("Why is my bill higher than last year?"), tt("Make it warmer"), tt("Yes"), tt("My heat pump shows error E7"), tt("The thing in the hallway is blinking")],
  careVoice: () => [tt("I need to see a doctor"), tt("Can you move my Thursday appointment to later in the week?"), tt("I need my blood pressure tablets again"), tt("What were my blood results?"), tt("Talk to a person")],
  cityHelp: () => [tt("I need an appointment at the citizens' office"), tt("Where is my ID card application?"), tt("The streetlight in Lindenstraße is broken"), tt("I have moved and need to change something"), tt("I need a parking permit"), tt("What happened to my housing benefit?"), tt("Cancel my appointment"), tt("Can I talk to a person?")],
};
