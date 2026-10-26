import type { GlossEntry } from "@/data/glossary";

/**
 * Day 6 · the plain-language glossary entries for the terms Day 6 adds (CLAUDE.md #19). Gestalt principles, grouping, progressive disclosure, consistency and the design
 * logic are explained on earlier days and not repeated.
 */
export const GLOSSARY_D6: GlossEntry[] = [
  { id: "proximity", title: "Proximity", match: ["proximity"], plain: "A Gestalt law: things that are close together are seen as belonging together.", from: "Wertheimer 1923" },
  { id: "similarity", title: "Similarity", match: ["similarity"], plain: "A Gestalt law: things that look alike, in colour, shape or size, are seen as belonging together.", from: "Wertheimer 1923" },
  { id: "continuity", title: "Continuity", match: ["continuity"], plain: "A Gestalt law: elements on one line or curve are followed as a path." },
  { id: "closure", title: "Closure", match: ["closure"], plain: "A Gestalt law: an almost closed shape is seen as closed; people fill in the gap." },
  { id: "figure-ground", title: "Figure and ground", match: ["figure and ground", "figure-ground"], plain: "A Gestalt law: one thing is seen as standing out (the figure) from what is behind it (the ground). A dialog over a dimmed page uses it." },
  { id: "common-region", title: "Common region", match: ["common region"], plain: "A Gestalt law: things inside one frame, box or background area are seen as a group.", from: "Palmer 1992" },
  { id: "primary-secondary", title: "Primary and secondary action", match: ["primary and secondary actions", "secondary action", "secondary actions"], plain: "The primary action is the one thing most people should do now and should look strongest; secondary actions are other options and look quieter." },
  { id: "component", title: "Component", match: ["component", "components"], plain: "A reusable building block of an interface, such as a button, a form field or a status label, built once and used on many screens.", from: "Curtis 2010" },
  { id: "ui-pattern", title: "UI pattern", match: ["UI pattern", "UI patterns", "binding patterns"], plain: "A repeated way of solving a design task, such as how a page type is grouped or how a form is split into steps." },
  { id: "design-system", title: "Design system", match: ["design systems", "design-system"], plain: "A shared set of principles, components and patterns that every team uses to build its screens, so the product stays consistent and new screens are built faster.", from: "Kholmatova 2017" },
  { id: "predictability", title: "Predictability", match: ["predictability"], plain: "Being able to tell in advance how something will work, because it works like what you have seen before." },
  { id: "problematic-hiding", title: "Problematic hiding", match: ["problematic hiding", "hidden too deep"], plain: "When information people need to decide is buried so deep that they miss it. It looks like simplicity and makes decisions unsafe." },
];
