import type { GlossEntry } from "@/data/glossary";

/**
 * Day 10 · the plain-language glossary entries for the terms Day 10 adds (CLAUDE.md #19). Trust, data protection and the decision under uncertainty are explained on
 * earlier days and not repeated.
 */
export const GLOSSARY_D10: GlossEntry[] = [
  { id: "intelligent-interface", title: "Intelligent interface", match: ["intelligent interfaces", "intelligent interface"], plain: "An interface that supports people in a way that fits their situation: it suggests, adapts or helps, instead of only doing the same thing for everyone." },
  { id: "rule-based", title: "Rule-based system", match: ["rule-based"], plain: "A system that follows fixed rules written by people: the same input always gives the same output, and the rule can be said in one sentence." },
  { id: "adaptive", title: "Adaptive system", match: ["adaptive systems", "adaptive system", "adaptive ux", "adaptive support"], plain: "A system that reacts to the situation now (time, place, device, what someone just did) without learning about the person over time." },
  { id: "learning-system", title: "Learning system", match: ["learning systems", "learning system"], plain: "A system that changes with data over time; it gets to know a person, so the same input can give a different output next month." },
  { id: "personalisation", title: "Personalisation", match: ["personalisation", "personalization"], plain: "Changing what someone sees from what is known about them: their history, their preferences, their profile." },
  { id: "misadaptation", title: "Misadaptation", match: ["misadaptation", "fehlanpassung"], plain: "When a system adapts to the wrong situation or the wrong picture of a person, so its help does not fit." },
  { id: "over-personalisation", title: "Over-personalisation", match: ["over-personalisation", "over-personalization", "over-personalised"], plain: "Personalising so much that it feels like being watched, or so narrowly that people only ever see more of the same.", from: "Pariser 2011" },
  { id: "explainability", title: "Explainability", match: ["explainability", "explainable"], plain: "A system can say, in words the person understands, why it suggested or did something.", from: "Amershi et al. 2019" },
  { id: "perceived-control", title: "Perceived control", match: ["perceived control", "feeling of control"], plain: "How much people feel they can steer a system; it decides how they feel about automation, even when it differs from the control they really have.", from: "Sundar 2020" },
  { id: "recoverability", title: "Recoverability", match: ["recoverability"], plain: "If the system gets it wrong, the person can undo it or set it right without help." },
  { id: "black-box", title: "Black box", match: ["black box", "black-box"], plain: "A system whose reasons nobody outside can see; people only see what goes in and what comes out." },
  { id: "voice-ui", title: "Voice user interface", match: ["voice user interface", "voice interface", "voice control", "voice assistant"], plain: "An interface people use by speaking and listening; it has no screen to show what it understood, so it has to say it back." },
];
