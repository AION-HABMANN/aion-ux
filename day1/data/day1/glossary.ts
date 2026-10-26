import type { GlossEntry } from './types';

/**
 * Plain-language glossary (CLAUDE.md #19, #49): every technical term in a card or a task is one click from an easy explanation.
 * The learners are working adults who may have no UX background, so each entry says what the word means in everyday words.
 */
export const GLOSSARY: GlossEntry[] = [
  { term: 'UX', match: ['user experience', 'UX'], plain: 'Short for user experience: everything a person goes through when using a product, from the first look to what they do next and how they feel about it.' },
  { term: 'UI', match: ['user interface', 'UI'], plain: 'Short for user interface: the part of a product that a person sees and touches, such as screens, buttons and text.' },
  { term: 'perception', match: ['perception', 'perceive', 'perceived'], plain: 'Taking in what the senses deliver, for example what the eyes see on a screen, before thinking about it.' },
  { term: 'cognition', match: ['cognition', 'cognitive'], plain: 'The thinking side of the mind: remembering, comparing, understanding and deciding.' },
  { term: 'attention', match: ['attention'], plain: 'The mind’s spotlight. Only a small part of what is on a screen is processed at any moment; attention decides which part.' },
  { term: 'mental model', match: ['mental model', 'mental models'], plain: 'What a person believes a product is and how it works. A design feels natural when it fits that belief and confusing when it does not.', example: 'Most people believe a shopping basket icon shows what they have chosen so far.' },
  { term: 'bottom-up', match: ['bottom-up'], plain: 'Attention that is pulled by the stimulus itself: something moves, glows or is very large, so you look at it whether or not it matters.' },
  { term: 'top-down', match: ['top-down'], plain: 'Attention that is steered by what you want and know: you look for the “pay” button because you want to pay.' },
  { term: 'cognitive load', match: ['cognitive load', 'mental load', 'mental effort'], plain: 'How much a person has to hold in mind and work out at the same time. Every extra signal or choice adds to it, and when it is too high people skip, freeze or leave.' },
  { term: 'reactance', match: ['reactance'], plain: 'The urge to resist when something feels like pressure or control. A pushy prompt can make people do the opposite of what it asks.' },
  { term: 'orientation', match: ['orientation', 'oriented'], plain: 'Knowing where you are, what you can do here and what happens next.' },
  { term: 'visual hierarchy', match: ['visual hierarchy', 'visual order', 'hierarchy'], plain: 'An order the eye can follow: the most important thing is clearly strongest, the rest quieter. Without it, everything competes equally.' },
  { term: 'hypothesis', match: ['hypothesis', 'hypotheses'], plain: 'An assumption you could check later. “This banner could make users uneasy” is a hypothesis; “this banner is bad” is only an opinion.' },
  { term: 'touchpoint', match: ['touchpoint', 'touchpoints'], plain: 'Any place where a person meets the company: the website, the app, the customer portal, a chatbot or a phone call.' },
  { term: 'governance', match: ['governance'], plain: 'The rules about who may decide what, who is answerable for it and how disagreements are settled.' },
  { term: 'microcopy', match: ['microcopy', 'microtexts'], plain: 'The small pieces of text in an interface, such as button labels, hints and error messages.' },
  { term: 'conversion', match: ['conversion'], plain: 'The share of visitors who do what the company hopes for, such as signing up or buying.' },
  { term: 'stakeholder', match: ['stakeholder', 'stakeholders'], plain: 'A person or department with an interest in the decision, such as marketing, IT, compliance or sales.' },
  { term: 'Neuro-UX', match: ['Neuro-UX', 'neuro design', 'neuro-design'], plain: 'Designing an interface with knowledge of how people see, attend, feel and decide, so that the design steers those processes on purpose.' },
  { term: 'decision architecture', match: ['decision architecture'], plain: 'A set of connected design and management decisions that are made on purpose and written down, instead of many separate fixes.' },
  { term: 'effect', match: ['effect', 'effects'], plain: 'What a design does to the person: what they notice, understand, feel and do. It is not the same as how the design looks.' },
  { term: 'prioritisation', match: ['prioritisation', 'prioritise', 'prioritised', 'priority'], plain: 'Putting things in order of what should be done first, with a reason.' },
];
