import type { GlossEntry } from "@/data/glossary";

/**
 * Day 11 · the plain-language glossary entries for the terms Day 11 adds (CLAUDE.md #19). Voice user interface, cognitive load, trust and the decision under
 * uncertainty are explained on earlier days and not repeated.
 */
export const GLOSSARY_D11: GlossEntry[] = [
  { id: "dialogue-logic", title: "Dialogue logic", match: ["dialogue logic", "guided dialogue", "guided dialogues"], plain: "The order of turns in a voice conversation: who speaks when, one question at a time, and what happens after each answer." },
  { id: "error-handling", title: "Error handling", match: ["error handling", "error-robust", "error robustness"], plain: "What an assistant does when it does not understand: a good one asks a better question or hands over to a person instead of repeating itself." },
  { id: "escalation-path", title: "Escalation path", match: ["escalation path", "escalation paths", "handover"], plain: "The way from the assistant to a person (or a screen) when the assistant cannot help." },
  { id: "stimulus-reduction", title: "Stimulus reduction", match: ["stimulus reduction"], plain: "Showing or saying fewer things at once, so the mind can attend to what matters." },
  { id: "wizard-of-oz", title: "Wizard of Oz", match: ["wizard of oz", "wizard-of-oz"], plain: "A test where a person secretly plays the system, so a dialogue can be tried before it is built.", from: "Kelley 1984" },
  { id: "test-prototype", title: "Functional, interaction and test prototype", match: ["functional prototype", "interaction prototype", "test prototype"], plain: "Three kinds of prototype: one checks whether the technology works, one how the dialogue feels, one how real users manage real tasks.", from: "Houde & Hill 1997" },
  { id: "multimodal", title: "Multimodal", match: ["multimodal"], plain: "Using more than one way at once, for example voice and a screen together." },
];
