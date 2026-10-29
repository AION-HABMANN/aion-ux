import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 12 · the reference platforms (DL-STANDARD v1.9, section 16), one per block, read on the real pages on 29.10.2026 without an account:
 *
 * - Block 2.1 (CitizenConnect: weak contrast, unstructured forms with unclear errors, patchy keyboard use, hints only visual, no full relaunch): the W3C Web
 *   Accessibility Initiative's "Before and After Demonstration" (BAD), an inaccessible city portal, CityLights, next to its retrofitted version, with numbered
 *   annotations for each barrier (status 20 February 2012, WCAG 2.0), and WAI's "Web Accessibility First Aid: Approaches for Interim Repairs", on what to repair
 *   first when a full rebuild is not possible.
 * - Block 3.1 (an accessibility and inclusion architecture: a vision of participation, standards, prioritising barriers, governance, a decision under uncertainty):
 *   WAI's "Planning and Managing Web Accessibility", the stages Initiate, Plan, Implement and Sustain (policy, responsibilities, budget, monitoring, evaluating
 *   early, prioritising issues).
 *
 * Every row is something read on those pages; labels and quotes are verbatim. No figure from either page is used as data. Screenshots: public/real/bad-* and wai-*.
 * BAD is from 2012 and uses WCAG 2.0; the card says so, and the barriers it shows are the same today.
 */
const VISIT = "29.10.2026";
const BH = "https://www.w3.org/WAI/demos/bad/before/annotated/home.html";
const BS = "https://www.w3.org/WAI/demos/bad/before/annotated/survey.html";
const BA = "https://www.w3.org/WAI/demos/bad/after/survey.html";
const FA = "https://www.w3.org/WAI/planning/interim-repairs/";
const PL = "https://www.w3.org/WAI/planning-and-managing/plan/";
const IM = "https://www.w3.org/WAI/planning-and-managing/implement/";

const R21 = defineBlockReference("2.1", {
  name: "W3C Before and After Demonstration",
  visit: VISIT,
  site: {
    url: "https://www.w3.org/WAI/demos/bad/",
    page: "The Web Accessibility Initiative's “Before and After Demonstration”: CityLights, an inaccessible city portal, its retrofitted version, and the numbered notes on each barrier; with WAI's “Web Accessibility First Aid”",
    shot: "/real/bad-survey-before-2026-10-29.png",
    note: "A teaching demo by the W3C from 2012, based on WCAG 2.0 (the current version is WCAG 2.2). The page itself says it does not cover every barrier.",
  },
  intro:
    "The W3C, which writes the web's accessibility standard, built a fake city portal twice: once with typical barriers, once repaired, and annotated every barrier. It is CitizenConnect's situation in Block 2.1 made visible, and its “First Aid” page answers the question of what to repair first when a relaunch is not possible.",
  rows: [
    {
      topic: "Forms and errors · Materi A4",
      problem: "Forms are not cleanly structured and have unclear error messages",
      did: "The inaccessible survey is annotated: “Note 01: Instructions necessary for form completion are missing”, “Note 03: Radio button is not associated with its label”, “Note 04: Select box is missing caption”. The repaired survey states instructions and labels every field.",
      where: "Before and After Demonstration · Survey page, annotated and repaired",
      url: BS,
      shot: "/real/bad-survey-before-2026-10-29.png",
    },
    {
      topic: "Keyboard and focus · Materi A3",
      problem: "Keyboard operation is patchy",
      did: "“Note 05: Select box not easily usable by keyboard”, and “Note 06: Reading sequence not meaningful”: “The sequence of labels and input fields does not match the visual order and is not correct when the form is navigated by keyboard.”",
      where: "Before and After Demonstration · Survey page, notes 05 and 06",
      url: BS,
      shot: "/real/bad-survey-before-2026-10-29.png",
    },
    {
      topic: "Perceivable · Materi A2",
      problem: "Important hints are visual only; images are not described",
      did: "The home page is annotated with “Image without any text alternative”, “Link not visually distinct”, “Link text is not descriptive” and “Image with incorrect text alternative”.",
      where: "Before and After Demonstration · Home page, annotated",
      url: BH,
      shot: "/real/bad-home-before-2026-10-29.png",
    },
    {
      topic: "The repaired version · Materi A2, A4",
      problem: "What does the same page look like without the barriers?",
      did: "The same CityLights survey, rebuilt: the same content and look, with instructions, labelled fields and a sequence that works by keyboard; the demo switches between “Inaccessible” and “Accessible” for every page.",
      where: "Before and After Demonstration · Accessible survey page",
      url: BA,
      shot: "/real/bad-survey-after-2026-10-29.png",
    },
    {
      topic: "What to repair first · Materi A5",
      problem: "No full relaunch; first improvements must show soon",
      did: "“You may not be able to address all the issues on every part of your website at once.” It names what to prioritise: “Key tasks, such as registration, search, submit, or checkout processes”, “Key content”, “Reported content, that has known barriers”, and “In-development content”, then “High-impact repairs”.",
      where: "Web Accessibility First Aid · prioritising",
      url: FA,
      shot: "/real/wai-firstaid-2026-10-29.png",
    },
  ],
  discuss: [
    "Which of CitizenConnect's six problems can you find in the CityLights notes? Which of its problems does the demo not show?",
    "Use the First Aid list on CitizenConnect: which are its key tasks, and which content is reported? What would you repair in the first 14 weeks?",
    "The repaired CityLights looks almost the same as the broken one. What does that say to a marketing team that fears accessibility will make the portal look plain?",
    "BAD is from 2012. Which barriers in it have you met on a website this year?",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "W3C Planning and Managing Web Accessibility",
  visit: VISIT,
  site: {
    url: "https://www.w3.org/WAI/planning-and-managing/",
    page: "The Web Accessibility Initiative's guide “Planning and Managing Web Accessibility”: Initiate, Plan, Implement, Sustain",
    shot: "/real/wai-plan-2026-10-29.png",
    note: "A public guide by the W3C for organisations; it says its activities are not necessarily carried out in order.",
  },
  intro:
    "The W3C also describes how an organisation, not a single project, makes accessibility part of how it works: a policy, roles, a budget, monitoring, evaluating early and prioritising. Block 3.1 asks for exactly this: a vision of participation, decisions on standards and priorities, and a governance model.",
  rows: [
    {
      topic: "Policy and vision · Materi B1",
      problem: "Which accessibility should be guaranteed systematically?",
      did: "“Create accessibility policy: Document the accessibility goals, scope, and responsibilities important to your organization.”",
      where: "Planning and Managing · Plan · “Create accessibility policy”",
      url: PL,
      shot: "/real/wai-plan-2026-10-29.png",
    },
    {
      topic: "Responsibilities and budget · Materi B3",
      problem: "Who owns accessibility, and with what resources?",
      did: "“Assign responsibilities: Understand what roles are needed to ensure all tasks are covered.” Budgets cover “necessary reviews, training, audits, and testing with users.”",
      where: "Planning and Managing · Plan · “Assign responsibilities”, “Determine budget and resources”",
      url: PL,
      shot: "/real/wai-plan-2026-10-29.png",
    },
    {
      topic: "Prioritising barriers · Materi B2",
      problem: "Which journeys, components or systems come first?",
      did: "“Prioritize issues: Use resources effectively by addressing high impact, easy-to-resolve issues first”, and “Prioritize quick wins and communicate progress to increase commitment.”",
      where: "Planning and Managing · Implement · “Prioritize issues”",
      url: IM,
      shot: "/real/wai-prioritize-2026-10-29.png",
    },
    {
      topic: "Early, not added later · Materi B1",
      problem: "Accessibility is treated as compliance at the end",
      did: "“Evaluate early and regularly: Find and fix issues early in the process to reduce risk and cost”, and “Weave accessibility implementation throughout the process to minimize overhead”.",
      where: "Planning and Managing · Implement · “Evaluate early and regularly”",
      url: IM,
      shot: "/real/wai-evaluate-2026-10-29.png",
    },
    {
      topic: "Monitoring and standards · Materi B3",
      problem: "How is progress checked, and against what?",
      did: "“Establish monitoring framework: Create a standard way of monitoring and reporting findings”; First Aid adds that the “generally accepted target” is the latest WCAG Level AA, which “may be the legal requirement”, and allows “a phased approach with different dates for different levels”.",
      where: "Planning and Managing · Plan; Web Accessibility First Aid",
      url: PL,
      shot: "/real/wai-monitor-2026-10-29.png",
    },
  ],
  discuss: [
    "Write your company's accessibility policy in three sentences: goals, scope, responsibilities. What would you leave out on purpose?",
    "WAI says “high impact, easy-to-resolve issues first”. Which of your journeys or components fits that, and which high-impact barrier is not easy?",
    "Who in your company would own accessibility, and who could stop a release that does not meet it?",
    "A phased approach with different dates for different levels: which date would you promise the management, and what would you not promise yet?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
