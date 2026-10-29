import type { GlossEntry } from "@/data/glossary";

/**
 * Day 16 · the plain-language glossary entries for the terms Day 16 adds (CLAUDE.md #19). Prototype tests, stage gates, presence, cybersickness and the decision
 * under uncertainty are explained on earlier days and not repeated.
 */
export const GLOSSARY_D16: GlossEntry[] = [
  { id: "concept-idea", title: "Concept idea", match: ["concept idea"], plain: "A described possibility: what it could be and for whom. Nothing has been built or tested yet." },
  { id: "pilot", title: "Pilot", match: ["pilot", "pilots", "piloting"], plain: "A real use of a solution by real users in one limited place and time, to learn whether it works before it grows.", from: "Cooper 1990" },
  { id: "scalable-solution", title: "Scalable solution", match: ["scalable solution", "scaling"], plain: "A solution that keeps working when many more people, places or devices use it, with support, maintenance and governance in place." },
  { id: "transfer", title: "Transfer to real use", match: ["transfer to real use", "transfer to real work"], plain: "Whether what works in a test also works in the real situation: noise, time pressure, gloves, fatigue, other people." },
  { id: "error-robustness", title: "Error robustness", match: ["error robustness"], plain: "How well a system copes with mistakes and failures, such as a lost signal or a wrong step, without leaving people stuck." },
  { id: "testability", title: "Testability", match: ["testability", "testable"], plain: "Whether a prototype is built so that a test can show something: a task, a measure and a question it can answer." },
  { id: "evaluation-grid", title: "Evaluation grid", match: ["evaluation grid"], plain: "One set of criteria used for every idea, prototype and pilot, so that they can be compared and decided the same way." },
  { id: "responsible-innovation", title: "Responsible innovation", match: ["responsible innovation"], plain: "Innovation that anticipates harm, reflects on its own assumptions, includes those affected and changes course when needed.", from: "Stilgoe, Owen & Macnaghten 2013" },
  { id: "organisational-learning", title: "Organisational learning", match: ["organisational learning", "ability to learn"], plain: "An organisation getting better at deciding, by questioning not only what it did but the assumptions behind it.", from: "Argyris & Schön 1978" },
  { id: "comfort-rating", title: "Comfort rating", match: ["comfort rating", "comfort ratings"], plain: "A label telling people how much motion and intensity a VR experience has before they start it.", from: "Meta Horizon Store policies" },
];
