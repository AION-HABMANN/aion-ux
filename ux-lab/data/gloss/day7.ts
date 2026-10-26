import type { GlossEntry } from "@/data/glossary";

/**
 * Day 7 · the plain-language glossary entries for the terms Day 7 adds (CLAUDE.md #19). Neuro-design, microcopy, touchpoints and feedback are explained on earlier days
 * and not repeated.
 */
export const GLOSSARY_D7: GlossEntry[] = [
  { id: "emotional-bond", title: "Emotional bond", match: ["emotional bonding", "emotional bond"], plain: "The sense, built over time, that a product is on your side. It makes people trust it and come back.", from: "Norman 2004" },
  { id: "experience-quality", title: "Experience quality", match: ["experience quality", "emotional experience quality"], plain: "How using a product feels, on the way and afterwards. It goes beyond usability, which only asks whether people reach their goal.", from: "Hassenzahl 2010" },
  { id: "emotional-safety", title: "Emotional safety", match: ["emotional safety"], plain: "Feeling that you know what is happening, that nothing bad will follow from a mistake, and that help is there." },
  { id: "emotional-factor", title: "Emotional factors", match: ["emotional factors", "emotional factor"], plain: "The feelings that matter most in UX: safety, control, joy, belonging and recognition, and their opposites, frustration and uncertainty." },
  { id: "activation", title: "Activation", match: ["activation", "activating messages", "activating"], plain: "Getting people to act now, often with strong stimuli. It can help for a moment and tire or push people if overdone." },
  { id: "over-emotional", title: "Over-emotionalisation", match: ["over-emotionalisation", "over-emotionalising", "over-emotional"], plain: "More feeling than the situation carries: exclamation marks, confetti or warmth where people need calm facts." },
  { id: "incongruent", title: "Incongruent address", match: ["incongruent address", "incongruent"], plain: "A feeling that does not fit the situation, such as a cheerful tone about a worry or a fault." },
  { id: "dark-pattern", title: "Dark pattern", match: ["dark patterns", "dark pattern", "manipulation", "manipulative"], plain: "A design that uses emotion against people's own interest, such as false urgency, guilt or hidden costs.", from: "Mathur et al. 2019" },
  { id: "tone-guide", title: "Tone guide", match: ["tone guide", "tone of voice"], plain: "A short written rule for how a product speaks: which words, how formal, how it sounds when something goes wrong.", from: "Walter 2011" },
  { id: "perceived-competence", title: "Perceived competence", match: ["perceived competence"], plain: "How capable a product or company seems to people, judged from small signals such as clear feedback and careful wording." },
  { id: "peak-end", title: "Peak-end rule", match: ["peak-end rule", "peak-end"], plain: "People remember an experience mostly by its strongest moment and how it ended, not by its average.", from: "Kahneman et al. 1993" },
];
