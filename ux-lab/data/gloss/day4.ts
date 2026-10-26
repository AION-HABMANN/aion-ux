import type { GlossEntry } from "@/data/glossary";

/**
 * Day 4 · the plain-language glossary entries for the terms Day 4 adds (CLAUDE.md #19). Terms earlier days already explain (cognitive load, mental model, orientation,
 * consistency and others) are not repeated.
 */
export const GLOSSARY_D4: GlossEntry[] = [
  { id: "ux-law", title: "UX law", match: ["UX law", "UX laws"], plain: "A well-tested finding about how people perceive, decide or act, used as a rule of thumb in design, such as Hick's law or Fitts's law. It explains why something is hard; it does not replace looking at the users.", from: "Yablonski 2020" },
  { id: "hick", title: "Hick's law", match: ["Hick's law"], plain: "The more equally weighted options people have to choose from, the longer the decision takes. It matters most for unfamiliar options that look alike.", from: "Hick 1952; Hyman 1953" },
  { id: "fitts", title: "Fitts's law", match: ["Fitts's law"], plain: "A target is reached faster and missed less often when it is large and close. Small, distant buttons cost time and cause wrong taps.", from: "Fitts 1954" },
  { id: "miller", title: "Miller's rule", match: ["Miller's rule"], plain: "Short-term memory holds only a few things at once, about seven in Miller's old estimate and nearer four in later research. Interfaces should not make people remember what the system knows.", from: "Miller 1956; Cowan 2001" },
  { id: "working-memory", title: "Working memory", match: ["working memory", "short-term memory"], plain: "The part of memory that holds what you are using right now, such as a code you just read. It is small and easily overloaded.", from: "Cowan 2001" },
  { id: "chunk", title: "Chunk", match: ["chunk", "chunks", "chunking"], plain: "A group of items the memory treats as one, such as a phone number split into blocks. Grouping information into chunks makes it easier to hold." },
  { id: "intuitive", title: "Intuitive use", match: ["intuitive use"], plain: "Use that works without thinking about the interface: people find what they need, know what to do next and know when they are done. It is designed, not a matter of luck." },
  { id: "expectation", title: "Conformity with expectations", match: ["expectation conformity", "conformity with user expectations", "conforms to these expectations"], plain: "An interface behaves the way people expect from other products and from its own earlier screens: the menu where menus usually are, the same element working the same way.", from: "ISO 9241-110" },
  { id: "jakob", title: "Jakob's law", match: ["Jakob's law"], plain: "People spend most of their time on other products, so they expect yours to work the same way. Familiar patterns need no learning.", from: "Yablonski 2020" },
  { id: "action-logic", title: "Action logic", match: ["action logic"], plain: "The order in which a task runs: where it starts, which steps follow, what each step asks and how the person knows they are done." },
  { id: "decision-effort", title: "Decision effort", match: ["decision effort", "effort of deciding"], plain: "The mental work of comparing options and choosing one. Many equal options raise it." },
  { id: "memory-load", title: "Memory load", match: ["memory load"], plain: "How much a person has to keep in mind while using an interface, such as a number from an earlier screen or the option chosen two steps back." },
  { id: "feedback", title: "Feedback", match: ["feedback in the process", "clear feedback", "context-related feedback"], plain: "What the system tells people after they act: that a step worked, what happens next, or what went wrong and how to fix it." },
  { id: "friction", title: "Friction", match: ["friction", "cognitive friction"], plain: "Everything that slows people down or makes them think about the interface instead of their task: searching, choosing, remembering, guessing." },
  { id: "misoperation", title: "Operating error", match: ["operating error", "operating errors", "misoperation"], plain: "A wrong action caused by the interface, such as tapping the wrong button or sending a form twice because nothing confirmed it." },
];
