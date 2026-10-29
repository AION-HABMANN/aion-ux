import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 13 · the reference platforms (DL-STANDARD v1.9, section 16), one per block, read on the real pages on 29.10.2026 without an account:
 *
 * - Block 2.1 (LifeGuide: too many stimuli, inconsistent navigation, hard text and typography, long forms, unhelpful feedback in stress, no options to reduce):
 *   the UK Home Office's "Dos and don'ts on designing for accessibility" (Accessibility in government blog, 2 September 2016), six posters of short dos and
 *   don'ts, among them for users on the autistic spectrum and users with dyslexia.
 * - Block 3.1 (an architecture for neurodiverse use: base architecture, inclusive patterns, adaptation modes, test strategy, governance): the W3C Working Group Note
 *   "Making Content Usable for People with Cognitive and Learning Disabilities" (29 April 2021): objectives, design patterns, and how to include users in design
 *   and usability testing.
 *
 * Every row is something read on those pages; labels and quotes are verbatim. No figure from either page is used as data. Screenshots: public/real/homeoffice-*
 * and coga-* (cookies refused on GOV.UK).
 */
const VISIT = "29.10.2026";
const HO = "https://accessibility.blog.gov.uk/2016/09/02/dos-and-donts-on-designing-for-accessibility/";
const CG = "https://www.w3.org/TR/coga-usable/";

const R21 = defineBlockReference("2.1", {
  name: "UK Home Office accessibility posters",
  visit: VISIT,
  site: {
    url: HO,
    page: "“Dos and don'ts on designing for accessibility”, the Home Office's posters as published on the UK government's accessibility blog",
    shot: "/real/homeoffice-autism-2026-10-29.png",
    note: "A public blog post from 2016 with the posters' text; the posters themselves are free to reuse under a Creative Commons licence. There is no separate poster for ADHD.",
  },
  intro:
    "A government department's accessibility team boiled its knowledge down to ten dos and don'ts per group of users and published them as posters. Two of them speak directly to LifeGuide's problems in Block 2.1: designing for users on the autistic spectrum and for users with dyslexia.",
  rows: [
    {
      topic: "Stimulus load · Materi A2",
      problem: "Many simultaneous stimuli and competing information areas",
      did: "For users on the autistic spectrum: “use simple colours”, “build simple and consistent layouts”; don't “use bright contrasting colours”, don't “build complex and cluttered layouts”.",
      where: "Dos and don'ts · Designing for users on the autistic spectrum",
      url: HO,
      shot: "/real/homeoffice-autism-2026-10-29.png",
    },
    {
      topic: "Predictability · Materi A3",
      problem: "Inconsistent navigation and low predictability",
      did: "“make buttons descriptive - for example, Attach files”; don't “make buttons vague and unpredictable - for example, Click here”; and don't “use figures of speech and idioms”.",
      where: "Dos and don'ts · Designing for users on the autistic spectrum",
      url: HO,
      shot: "/real/homeoffice-autism-2026-10-29.png",
    },
    {
      topic: "Readability · Materi A4",
      problem: "Texts correct but hard to read",
      did: "For users with dyslexia: “align text to the left and keep a consistent layout”, “keep content short, clear and simple”, “let users change the contrast between background and text”; don't “use large blocks of heavy text” or “underline words, use italics or write capitals”.",
      where: "Dos and don'ts · Designing for users with dyslexia",
      url: HO,
      shot: "/real/homeoffice-dyslexia-2026-10-29.png",
    },
    {
      topic: "Forms and memory · Materi A5",
      problem: "Long forms, little step-by-step help",
      did: "Don't “force users to remember things from previous pages - give reminders and prompts”, don't “rely on accurate spelling - use autocorrect or provide suggestions”, don't “put too much information in one place”.",
      where: "Dos and don'ts · Designing for users with dyslexia",
      url: HO,
      shot: "/real/homeoffice-dyslexia-2026-10-29.png",
    },
    {
      topic: "One size does not fit all · Materi A1",
      problem: "No options to reduce stimuli or simplify",
      did: "The team notes that the posters are general guidance: “Using bright contrast was advised for some (such as those with low vision) although some users on the autistic spectrum would prefer differently. Where advice seems contradictory, it’s always worth testing your designs with users to find the right balance”.",
      where: "Dos and don'ts · “The posters”",
      url: HO,
      shot: "/real/homeoffice-posters-2026-10-29.png",
    },
  ],
  discuss: [
    "Go through the autism poster for LifeGuide's start page: which of its five don'ts does LifeGuide do?",
    "The dyslexia poster says “let users change the contrast”, the autism poster says “use simple colours”. How would LifeGuide serve both on one page?",
    "Which of the posters' dos would help almost every LifeGuide user, not only the group it was written for?",
    "There is no poster for ADHD. Which dos from the other posters would you test first with people with concentration difficulties?",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "W3C Making Content Usable",
  visit: VISIT,
  site: {
    url: CG,
    page: "“Making Content Usable for People with Cognitive and Learning Disabilities”, a W3C Working Group Note: objectives, design patterns, user involvement and usability testing",
    shot: "/real/coga-toomuch-2026-10-29.png",
    note: "A W3C Working Group Note from 2021; it says it gives guidance beyond WCAG and is not required for conformance.",
  },
  intro:
    "The W3C's task force on cognitive and learning disabilities wrote down what people need, as eight objectives and reusable design patterns, and how to involve them in design and testing. Block 3.1 asks for exactly that architecture: the base structure, inclusive patterns, adaptation modes and a test strategy.",
  rows: [
    {
      topic: "Patterns, not special cases · Materi B1",
      problem: "Extra options, or a better base architecture?",
      did: "“Avoid Too Much Content (Pattern)”: “Keep the interface simple. Provide users with five or less main choices on each screen and remove unnecessary content. This can be provided via a simplified version, as an alternative that is generated in real time from the same code base as the main content.”",
      where: "Making Content Usable · 4.6.3 Avoid Too Much Content",
      url: CG,
      shot: "/real/coga-toomuch-2026-10-29.png",
    },
    {
      topic: "Adaptation and control · Materi B2",
      problem: "Which adaptation modes, and who controls them?",
      did: "“Limit Interruptions (Pattern)”: “Allowing the user to control and limit types of content which could cause them distraction or an undesirable reaction.” Objective 8 is “Support Adaptation and Personalization”.",
      where: "Making Content Usable · 4.6.1 Limit Interruptions; Objective 8",
      url: CG,
      shot: "/real/coga-interruptions-2026-10-29.png",
    },
    {
      topic: "Users in the process · Materi B3",
      problem: "Who is involved, and when?",
      did: "Key parts: “Including people with cognitive and learning disabilities in research methods such as usability testing” and “Including people with cognitive and learning disabilities in the design and development team.”",
      where: "Making Content Usable · 2.3 Building the User into the Development Process",
      url: CG,
      shot: "/real/coga-users-2026-10-29.png",
    },
    {
      topic: "Test strategy · Materi B3",
      problem: "What does a test have to find out?",
      did: "At the end of an evaluation “you should be able to answer: What prevents the user from completing a task? What creates confusion? … When does the user get frustrated or upset?”; when testing, “Ask ahead of time if they need any support for their needs. This could include a quiet room or frequent breaks.”",
      where: "Making Content Usable · 5.4 Usability Testing",
      url: CG,
      shot: "/real/coga-testing-2026-10-29.png",
    },
    {
      topic: "Making it testable · Materi B3",
      problem: "How does a standard become checkable?",
      did: "Each pattern's “use” and “avoid” examples “can be used as a testable case”, and processes can be checked too: “Confirm that the project user tests include testing for the objectives in this document”.",
      where: "Making Content Usable · 2.1.1 Testing Each Pattern",
      url: CG,
      shot: "/real/coga-testpattern-2026-10-29.png",
    },
  ],
  discuss: [
    "“Five or less main choices on each screen”: which of your company's start pages meets that today, and what would it cost to get there?",
    "A simplified version “generated in real time from the same code base”: is that an adaptation mode, or a better base architecture? What would you decide?",
    "Who would you include in the design team and in tests, and how would you prepare a quiet room or breaks?",
    "Which two patterns would you make binding in your design system first, with their “use” and “avoid” examples as tests?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
