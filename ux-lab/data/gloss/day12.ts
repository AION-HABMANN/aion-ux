import type { GlossEntry } from "@/data/glossary";

/**
 * Day 12 · the plain-language glossary entries for the terms Day 12 adds (CLAUDE.md #19). Contrast, plain language and cognitive load are explained on earlier days
 * and not repeated.
 */
export const GLOSSARY_D12: GlossEntry[] = [
  { id: "barrierefreiheit", title: "Accessibility (Barrierefreiheit)", match: ["barrierefreiheit"], plain: "People with disabilities can use a product on their own, without special help." },
  { id: "inclusive-design", title: "Inclusive design", match: ["inclusive design"], plain: "Designing with the full range of people from the start, including permanent, temporary and situational limits and different minds.", from: "Holmes 2018" },
  { id: "wcag", title: "WCAG", match: ["wcag"], plain: "The Web Content Accessibility Guidelines: the international standard for accessible web content, with levels A, AA and AAA; AA is the usual target.", from: "WCAG 2.2" },
  { id: "assistive-technology", title: "Assistive technology", match: ["assistive technologies", "assistive technology", "screen reader", "screen readers"], plain: "Tools people use to operate digital products, such as a screen reader that reads the screen aloud, a magnifier, a switch or voice control." },
  { id: "keyboard-operable", title: "Keyboard operability", match: ["keyboard operability", "keyboard operation", "keyboard alone"], plain: "Everything can be reached and used with the keyboard alone (Tab, Enter, the arrow keys), which many assistive technologies rely on." },
  { id: "focus-order", title: "Focus", match: ["focus order", "visible focus"], plain: "The marker that shows which element the keyboard is on; it must be visible and move in a sensible order." },
  { id: "text-alternative", title: "Text alternative", match: ["text alternative", "text alternatives", "alt text", "alternative text"], plain: "A short text that says what an image or icon means, so a screen reader can say it." },
  { id: "neurodiversity", title: "Neurodiversity", match: ["neurodiversity", "neurodivergent"], plain: "The natural variety of human minds, including ADHD, autism and dyslexia; designs that reduce distraction and use plain, predictable language help many of them." },
  { id: "accessibility-statement", title: "Accessibility statement", match: ["accessibility statement"], plain: "A public page that says how accessible a service is, what is not yet accessible, and how people can report a barrier.", from: "EU 2016 (Web Accessibility Directive)" },
];
