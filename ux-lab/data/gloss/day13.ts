import type { GlossEntry } from "@/data/glossary";

/**
 * Day 13 · the plain-language glossary entries for the terms Day 13 adds (CLAUDE.md #19). Neurodiversity, assistive technology, predictability and working memory are
 * explained on earlier days and not repeated.
 */
export const GLOSSARY_D13: GlossEntry[] = [
  { id: "adhd", title: "ADHD", match: ["adhd"], plain: "Attention deficit hyperactivity disorder: a different way of directing attention and controlling impulses; busy pages, distractions and long unstructured tasks are especially hard.", from: "Barkley 2015" },
  { id: "autism", title: "Autism", match: ["autistic", "autism"], plain: "A different way of perceiving and processing; inconsistent patterns, ambiguous words and sensory overload are especially hard, predictability helps." },
  { id: "dyslexia", title: "Dyslexia", match: ["dyslexia", "dyslexic"], plain: "A difference in reading and spelling; dense, justified text, unsuitable typography and complex language are especially hard." },
  { id: "stimulus-load", title: "Stimulus load", match: ["stimulus load", "stimulus density", "overstimulation", "sensory overload"], plain: "How much competes for attention at once (colours, banners, movement, notifications); too much tires, distracts or overwhelms." },
  { id: "inclusive-pattern", title: "Inclusive design pattern", match: ["inclusive design patterns", "inclusive design pattern", "inclusive patterns"], plain: "A reusable solution that helps several groups at once, such as one task per screen, a step indicator or a summary before sending.", from: "W3C COGA 2021" },
  { id: "adaptation-mode", title: "Adaptation mode", match: ["adaptation modes", "adaptation mode", "reading mode", "simplified view"], plain: "An optional setting that changes how a product looks or behaves for someone's needs, such as fewer stimuli, a reading mode or a simplified view; it works best on top of a good default." },
  { id: "reading-ruler", title: "Reading ruler", match: ["reading ruler"], plain: "A band that highlights the line being read and dims the rest, which helps some readers with dyslexia or ADHD keep their place." },
];
