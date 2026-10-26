import type { GlossEntry } from "@/data/glossary";

/**
 * Day 8 · the plain-language glossary entries for the terms Day 8 adds (CLAUDE.md #19). Touchpoints, microcopy, activation and over-emotionalisation are explained on
 * earlier days and not repeated.
 */
export const GLOSSARY_D8: GlossEntry[] = [
  { id: "storytelling-ux", title: "Storytelling in UX", match: ["storytelling in UX/UI design", "storytelling in UX", "storytelling"], plain: "Building a digital journey so it has what a story has: a beginning that shows the goal, a way that shows progress, and an end that feels like an end.", from: "Quesenbery & Brooks 2010" },
  { id: "narrative-guidance", title: "Narrative guidance", match: ["narrative guidance", "narrative user guidance", "narratively structured user guidance"], plain: "Guiding people through a process as a journey: where they start, where they are going, why it matters, how far they have come and when they are done." },
  { id: "dramaturgy", title: "Dramaturgy", match: ["dramaturgical guidance", "dramaturgical elements", "dramaturgy", "dramaturgical"], plain: "The order and rhythm of a journey: tension, expectation, sequence, transitions, confirmation and emotional context.", from: "Freytag 1863" },
  { id: "narrative-arc", title: "Narrative arc", match: ["narrative arc", "arc of tension", "arc of progress"], plain: "The shape of a story from beginning to end: a start, rising tension or progress, and a resolution.", from: "Lupton 2017" },
  { id: "user-journey", title: "User journey", match: ["user journey", "user journeys"], plain: "The whole path a person takes to reach a goal with a product, across steps and touchpoints." },
  { id: "transition", title: "Transition", match: ["transitions between steps", "transition"], plain: "The moment between two steps: what was done, what comes next and why." },
  { id: "milestone", title: "Milestone", match: ["milestone", "milestones"], plain: "A visible point on the way that shows a part of the journey is done." },
  { id: "goal-gradient", title: "Goal-gradient effect", match: ["goal-gradient", "goal gradient"], plain: "People speed up and keep going as they see themselves getting closer to a goal.", from: "Kivetz et al. 2006" },
  { id: "narrative-overload", title: "Narrative overload", match: ["narrative overload", "over-staging", "overstaging"], plain: "Too much story: staged scenes, long texts or longer paths that cost clarity and time instead of guiding." },
  { id: "onboarding", title: "Onboarding", match: ["onboarding"], plain: "The first journey with a product, from signing up to being ready to use it." },
];
