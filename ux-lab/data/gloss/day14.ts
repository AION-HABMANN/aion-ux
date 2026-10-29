import type { GlossEntry } from "@/data/glossary";

/**
 * Day 14 · the plain-language glossary entries for the terms Day 14 adds (CLAUDE.md #19). Cognitive load, attention, working memory and the decision under
 * uncertainty are explained on earlier days and not repeated.
 */
export const GLOSSARY_D14: GlossEntry[] = [
  { id: "ar", title: "Augmented reality (AR)", match: ["augmented reality"], plain: "Digital information laid over the real world, for example labels on a machine seen through a phone or glasses.", from: "Milgram & Kishino 1994" },
  { id: "vr", title: "Virtual reality (VR)", match: ["virtual reality"], plain: "A digital world that replaces the real one, usually through a headset.", from: "Milgram & Kishino 1994" },
  { id: "mr", title: "Mixed reality (MR)", match: ["mixed reality"], plain: "Digital objects that sit in the real room and react to it, between AR and VR.", from: "Milgram & Kishino 1994" },
  { id: "presence", title: "Presence", match: ["presence"], plain: "The feeling of really being in a place that is digital or partly digital.", from: "Slater & Sanchez-Vives 2016" },
  { id: "immersion", title: "Immersion", match: ["immersion", "immersive"], plain: "How much a technology surrounds the senses and shuts out the real surroundings; more immersion can mean more presence, and more load." },
  { id: "embodiment", title: "Embodiment", match: ["embodiment"], plain: "Using the body (hands, movement, position) to interact, instead of only a mouse or a touch screen." },
  { id: "cybersickness", title: "Cybersickness", match: ["cybersickness", "motion sickness"], plain: "Dizziness or nausea in VR when what the eyes see and what the body feels do not match.", from: "Rebenitsch & Owen 2016" },
  { id: "maturity", title: "Maturity", match: ["maturity", "technology readiness"], plain: "How far a technology is from an idea to reliable use: does it work, in the real environment, for real users, at scale?" },
  { id: "stage-gate", title: "Stage gate", match: ["stage gates", "stage gate"], plain: "A planned decision point where a pilot must show evidence before it gets more money: scale, change or stop.", from: "GOV.UK Service Manual" },
  { id: "hotspot", title: "Anchored label", match: ["anchored label", "anchored labels"], plain: "A label fixed to a part of a real or 3D object, so it moves with the object when you turn it." },
];
