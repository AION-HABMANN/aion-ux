import type { GlossEntry } from "@/data/glossary";

/**
 * Day 5 · the plain-language glossary entries for the terms Day 5 adds (CLAUDE.md #19). The three laws, working memory and chunks are explained on Day 4 and not
 * repeated.
 */
export const GLOSSARY_D5: GlossEntry[] = [
  { id: "touch-target", title: "Touch target", match: ["touch target", "touch targets", "click area", "click areas", "click target", "click targets"], plain: "The area of a button or link that reacts to a tap or a click. It can be larger than the visible label; too small, and people miss it.", from: "WCAG 2.2, 2.5.8" },
  { id: "thumb-zone", title: "Thumb zone", match: ["thumb zone", "thumb's reach", "within reach of the thumb"], plain: "The part of a phone screen the thumb reaches easily when the phone is held in one hand, usually the lower middle. The top corners are hard to reach.", from: "Hoober 2013" },
  { id: "reachability", title: "Reachability", match: ["reachability", "reachable"], plain: "How easily a target can be reached and hit: its size, its distance from the hand or pointer, and the space around it." },
  { id: "staged-choice", title: "Staged choice", match: ["staged choice", "staged choices", "staged selection"], plain: "One large choice split into a few small ones, such as first the day, then the film, then the time. Each stage has few options; too many stages become a hurdle." },
  { id: "decision-stress", title: "Decision stress", match: ["decision stress", "stress of deciding"], plain: "The strain people feel when they have to choose between many similar options and fear choosing wrongly." },
  { id: "mis-tap", title: "Mis-tap", match: ["mis-tap", "mis-taps", "mis-tapped"], plain: "A tap that hits the wrong target, often because targets are small or close together." },
  { id: "error-probability", title: "Error probability", match: ["error probability", "error risk"], plain: "How likely a person is to make a mistake at a given step. Small targets, many similar options and things to remember all raise it." },
  { id: "reaction-time", title: "Reaction time", match: ["reaction time"], plain: "The time a person needs to see, decide and act. Each of the three laws adds to it in its own way." },
  { id: "interaction-standard", title: "Interaction standard", match: ["interaction standard", "interaction standards"], plain: "A written rule every team follows for how interaction works, such as a minimum target size, one main action per screen or a limit on equal options." },
  { id: "mobile-usability", title: "Mobile usability", match: ["mobile usability"], plain: "How well a product can be used on a phone: one-handed, on a small screen, often on the move." },
];
