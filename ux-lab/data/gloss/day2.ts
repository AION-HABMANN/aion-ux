import type { GlossEntry } from "@/data/glossary";

/**
 * Day 2 · the plain-language glossary entries for the terms Day 2 adds (CLAUDE.md #19). Terms Day 1 already explains (orientation, cognitive load, visual hierarchy,
 * touchpoint, stakeholder, governance and others) are not repeated.
 */
export const GLOSSARY_D2: GlossEntry[] = [
  { id: "ucd", title: "User-centred design", match: ["user-centred design", "user-centred", "user-centredness", "human-centred design"], plain: "Designing from what the users come to do, how they see and what words they use, and checking the design with them, instead of starting from how the organisation is built.", from: "ISO 9241-210; Gould & Lewis 1985" },
  { id: "provider-centred", title: "Provider-centred design", match: ["provider-centred", "provider's perspective", "inside logic", "internal logic"], plain: "Designing from the organisation's own point of view: its departments, its terms and what it wants to say. The result is often complete but hard to use.", example: "A menu with one item per department, named as the departments call themselves." },
  { id: "scan", title: "Scanning", match: ["scan", "scanning", "scannable", "scan for"], plain: "Looking over a screen quickly and picking out what seems relevant, instead of reading it word by word. Most people scan first.", from: "Nielsen 1997" },
  { id: "f-pattern", title: "F-pattern", match: ["F-pattern", "F-shape", "F-shaped"], plain: "A common way the eye scans a text-heavy page without structure: across the top, across a little lower, then down the left edge. Headings and short blocks break it up.", from: "Pernice 2017" },
  { id: "visual-guidance", title: "Visual guidance", match: ["visual guidance", "guides the eye", "guide the eye"], plain: "Using contrast, grouping and structure on purpose so the eye goes first to what matters and then along a clear path." },
  { id: "contrast", title: "Contrast", match: ["contrast", "contrasts"], plain: "How much something differs from its surroundings in brightness, colour or size. Strong contrast makes it stand out; too many strong contrasts make everything compete." },
  { id: "grouping", title: "Grouping", match: ["grouping", "grouped"], plain: "Showing what belongs together, for example by putting it close together or making it look alike. The eye reads a group as one unit.", from: "Wagemans et al. 2012" },
  { id: "gestalt", title: "Gestalt principles", match: ["Gestalt", "Gestalt principles", "Gestalt laws"], plain: "Rules for how people see parts as a whole, such as proximity (close things belong together) and similarity (alike things belong together)." },
  { id: "density", title: "Information density", match: ["information density", "density"], plain: "How much a screen shows at once. Too much and everything competes; too little and people have to click a lot to reach anything." },
  { id: "findability", title: "Findability", match: ["findability", "findable"], plain: "How easily people can find what they are looking for, by browsing the menu or by searching." },
  { id: "readability", title: "Readability", match: ["readability", "readable"], plain: "How easily a text can be read and understood: its size, contrast, line length, wording and how it is broken into parts." },
  { id: "consistency", title: "Consistency", match: ["consistency", "consistent", "inconsistent"], plain: "The same thing looks, is named and works the same way everywhere, so what people learn on one page holds on the next." },
  { id: "recognition", title: "Recognition instead of recall", match: ["recognition instead of search", "recognition rather than recall", "recognition instead of recall"], plain: "Showing people the options and the next step so they can recognise them, instead of making them remember or hunt for them.", from: "Nielsen 1994" },
  { id: "ia", title: "Information architecture", match: ["information architecture"], plain: "How the content of a website or app is organised, grouped and named, and how people move through it. It is the structure behind the screens.", from: "Rosenfeld et al. 2015" },
  { id: "page-type", title: "Page type", match: ["page type", "page types"], plain: "A kind of page that appears many times, such as a course page, a certificate page or a booking page. Each type should keep the same structure." },
  { id: "progressive", title: "Progressive disclosure", match: ["progressive disclosure", "one step deeper"], plain: "Showing the few most important things first and the rest one step deeper, on request, so the first screen stays clear.", from: "Nielsen 2006" },
  { id: "card-sorting", title: "Card sorting", match: ["card sorting", "card sort"], plain: "A simple method: users sort cards with the names of content into groups and name the groups, which shows how they think the content belongs together.", from: "Spencer 2009" },
  { id: "aesthetic-usability", title: "Aesthetic-usability effect", match: ["aesthetic-usability effect", "aesthetic-usability"], plain: "People judge an ordered, attractive interface as easier to use, often before they have used it.", from: "Kurosu & Kashimura 1995" },
  { id: "timeliness", title: "Timeliness", match: ["timeliness"], plain: "How soon a measure shows its effect for the users. A measure with high timeliness is noticed in days or weeks, not next year." },
  { id: "effort", title: "Effort", match: ["effort (time and people)"], plain: "What a measure takes in time and people: who has to work on it and for how long. On this course effort is never a price." },
];
