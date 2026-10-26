import type { GlossEntry } from "@/data/glossary";

/**
 * Day 3 · the plain-language glossary entries for the terms Day 3 adds (CLAUDE.md #19). Terms Days 1 and 2 already explain (contrast, readability, consistency,
 * visual hierarchy and others) are not repeated.
 */
export const GLOSSARY_D3: GlossEntry[] = [
  { id: "colour-psych", title: "Colour psychology", match: ["colour psychology"], plain: "The study of how colours affect what people notice, feel and do. The effects are learnt and depend on context and culture, so they are hypotheses to check, not laws.", from: "Elliot & Maier 2014" },
  { id: "functional-colour", title: "Functional colour", match: ["functional colour", "functional colour system", "colour system"], plain: "Colour with a job: it tells people what can be done, what matters most or what state something is in. Each colour keeps one meaning everywhere." },
  { id: "decorative-colour", title: "Decorative colour", match: ["decorative colour"], plain: "Colour used for the look only. It is not wrong in itself, but it must not compete with the colours that carry a meaning." },
  { id: "status-colour", title: "Status colour", match: ["status colour", "status message", "status messages", "status display", "status displays"], plain: "A colour that shows the state of something, such as sent, waiting or failed. It needs a word or a symbol next to it, because colour alone is missed or misread.", from: "WCAG 2.2, 1.4.1" },
  { id: "typography", title: "Typography", match: ["typography", "typographic"], plain: "How text is set: which typeface, which size, weight, line spacing and line length, and how the text is broken into levels and parts." },
  { id: "legibility", title: "Legibility", match: ["legibility", "legible"], plain: "How easily single letters and words can be told apart. Thin, decorative or very small type is less legible.", from: "Beier 2012" },
  { id: "line-spacing", title: "Line spacing", match: ["line spacing", "leading"], plain: "The space between lines of text. Too little and lines run together; enough and the eye finds the next line easily." },
  { id: "weight", title: "Font weight", match: ["font weight", "weight of the type", "type weight"], plain: "How thick the strokes of the letters are: thin, regular, bold. Thin strokes can vanish on a screen, above all at small sizes." },
  { id: "type-hierarchy", title: "Typographic hierarchy", match: ["typographic hierarchy", "typographic hierarchies", "type hierarchy", "heading level", "heading levels"], plain: "A small, fixed set of text levels, such as page heading, section heading, body text and note, that look clearly different and mean the same on every page." },
  { id: "body-text", title: "Body text", match: ["body text"], plain: "The running text of a page, as opposed to headings, labels and buttons. It carries most of the information and must be the easiest to read." },
  { id: "cta", title: "Call to action", match: ["call to action", "calls to action"], plain: "An element that asks people to do something, such as “Report damage” or “Pay now”. It should be the easiest thing on the screen to see and press." },
  { id: "corporate-design", title: "Corporate design", match: ["corporate design"], plain: "A company's fixed visual identity: logo, brand colours, typeface and the way they are used. Functional adjustments can often be made within it." },
  { id: "accessibility", title: "Accessibility", match: ["accessibility", "accessible"], plain: "Designing so that everyone can use a product, also people who see less well, see colours differently, or use a keyboard or a screen reader.", from: "WCAG 2.2" },
  { id: "contrast-ratio", title: "Contrast ratio", match: ["contrast ratio", "minimum contrast"], plain: "A measure of how much text differs in brightness from its background. WCAG asks for at least 4.5 to 1 for normal text.", from: "WCAG 2.2, 1.4.3" },
  { id: "design-logic", title: "Design logic", match: ["design logic", "design system", "design tokens"], plain: "A set of decided rules and shared components, such as which colour means what and which type levels exist, used for every screen so everything stays consistent.", from: "Frost 2016" },
  { id: "brand", title: "Brand effect", match: ["brand effect", "brand's effect", "recognition value"], plain: "How a design makes people recognise the company and what they feel about it, such as modern, serious or friendly." },
];
