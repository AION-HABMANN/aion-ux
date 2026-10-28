import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 11 · the reference platforms (DL-STANDARD v1.9, section 16), one per block, read on the real pages on 29.10.2026 without an account:
 *
 * - Block 2.1 (CityHelp Voice: users do not know which inputs are possible, errors reported technically, ambiguous requests fail, distrust in sensitive matters):
 *   Amazon's Alexa Design Guide ("Alexa Haus"), the conversation design principles checklist ("Should you use Alexa?", "Be brief", "Be contextual", "Be
 *   trustworthy") and the pattern "Handling errors gracefully" (updated April 14, 2023). It is the voice platform's own guidance to the people who build on it.
 * - Block 3.1 (a strategic architecture for voice, AI interaction and testing: fields of use, error robustness, testing standards, governance, a decision under
 *   uncertainty): the Government Digital Service's post "5 things we learned testing GOV.UK Chat: an AI assistant for government" (Inside GOV.UK, 16 March 2026):
 *   two public pilots, how answers are evaluated, safety guardrails, questions it cannot answer, the trade-off between speed and accuracy, and its research methods.
 *
 * Every row is something read on those pages; labels and quotes are verbatim; no figure from either page is used as data. Screenshots: public/real/alexa-* and
 * govchat-* (cookies refused on GOV.UK).
 */
const VISIT = "29.10.2026";
const AH = "https://developer.amazon.com/en-US/alexa/alexa-haus/design-principles";
const AE = "https://developer.amazon.com/en-US/alexa/alexa-haus/patterns-and-components/patterns-errors";
const GC = "https://insidegovuk.blog.gov.uk/2026/03/16/5-things-we-learned-testing-gov-uk-chat-an-ai-assistant-for-government/";

const R21 = defineBlockReference("2.1", {
  name: "Alexa Design Guide",
  visit: VISIT,
  site: {
    url: AE,
    page: "Amazon's Alexa Design Guide, the pattern “Handling errors gracefully” and the conversation design principles checklist",
    shot: "/real/alexa-errors-2026-10-29.png",
    note: "A public guide for people who build voice skills for Alexa; it is guidance, not a product. Some pages play example conversations that need a click.",
  },
  intro:
    "Amazon runs one of the most used voice assistants and publishes how voice dialogues should be designed. Its checklists answer the questions CityHelp Voice fails in Block 2.1: when voice suits a task at all, how to say what is possible, how to handle a misunderstanding, and when to confirm.",
  rows: [
    {
      topic: "Fit for voice · Materi A1, A5",
      problem: "The assistant works for simple requests, not for ambiguous ones",
      did: "A checklist before building: signs a task suits a conversation include “The task is commonly repeated” and “Choices are simple and restricted in number OR complex but known ahead of time to the customer”; tasks with a “large number of complicated choices” are named as a poor fit.",
      where: "Alexa Design Guide · “Should you use Alexa?”",
      url: AH,
      shot: "/real/alexa-should-2026-10-29.png",
    },
    {
      topic: "Errors · Materi A2",
      problem: "Errors are reported technically instead of helpfully",
      did: "A checklist for errors: “Explain to the customer what went wrong using the best available data”, “Reiterate the information the skill needs and why it’s needed to continue”, “Don’t blame the customer for errors”, and an escalating error flow with disambiguating questions (“Did you mean 12 noon, or 12 midnight?”).",
      where: "Handling errors gracefully · “Checklist for handling errors” and “Design the error flow”",
      url: AE,
      shot: "/real/alexa-errors-2026-10-29.png",
    },
    {
      topic: "Clear expectations · Materi A2, A3",
      problem: "Users do not know which inputs are possible",
      did: "“Help new customers understand the skill’s functions”, “Present options to the customer in order of most relevant”, and “Don’t bait and switch: Don’t offer options that will result in an error”.",
      where: "Conversation design principles checklist · “Be contextual”",
      url: AH,
      shot: "/real/alexa-context-2026-10-29.png",
    },
    {
      topic: "Cognitive load · Materi A3",
      problem: "Spoken answers are hard to follow",
      did: "“Responses can be read out by a human in one or two breaths”, “Give only one to a few options at a time”, and send a card to the app “when it needs to share information that’s easy to forget if it’s only read out verbally”.",
      where: "Conversation design principles checklist · “Be brief”",
      url: AH,
      shot: "/real/alexa-brief-2026-10-29.png",
    },
    {
      topic: "Trust and control · Materi A2",
      problem: "Distrust in sensitive matters",
      did: "“Confirm the intended listener … before revealing potentially sensitive information”, “Ask customers to confirm actions that have a high consequence for error”, and “Don’t interrupt an experience with an offer to take an unrelated action”.",
      where: "Conversation design principles checklist · “Be trustworthy”",
      url: AH,
      shot: "/real/alexa-trust-2026-10-29.png",
    },
  ],
  discuss: [
    "Go through Amazon's “Should you use Alexa?” signs for CityHelp's three tasks: appointments, status queries and simple requests. Which pass, and which do not?",
    "Rewrite one of CityHelp's technical error messages with the checklist for errors. What does the citizen need to hear?",
    "Amazon advises not to tell people explicitly what to say. CityHelp's users do not know what is possible. How do both fit together for people who are not at home with technology?",
    "Which of CityHelp's requests are “actions that have a high consequence for error”, and what would a confirmation sound like?",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "GOV.UK Chat",
  visit: VISIT,
  site: {
    url: GC,
    page: "“5 things we learned testing GOV.UK Chat: an AI assistant for government”, a post by the Government Digital Service on its blog Inside GOV.UK",
    shot: "/real/govchat-top-2026-10-29.png",
    note: "A public report by the UK government's digital service about its own AI assistant; the assistant itself is in the GOV.UK app. Cookies refused.",
  },
  intro:
    "The UK government tested an AI assistant for its public services in two public pilots before opening it more widely, and published what it measured, how, and what it changed. Block 3.1 asks for exactly these decisions: where voice and AI are used first, how they are tested, how errors and limits are handled, and who decides when innovation and trust pull apart.",
  rows: [
    {
      topic: "Staged rollout · Materi B1",
      problem: "Which journeys are supported first, and when is it widened?",
      did: "Two public pilots before a wider release: “Based on the findings, we feel confident to begin opening up access more widely, starting by making GOV.UK Chat available to all users of the GOV.UK app.” The website follows later.",
      where: "5 things we learned · the introduction and “What’s next”",
      url: GC,
      shot: "/real/govchat-top-2026-10-29.png",
    },
    {
      topic: "Testing standards · Materi B3",
      problem: "How is AI interaction tested before it scales?",
      did: "Answers are assessed by “a combination of subject matter experts, and automated evaluation tools”, rated accurate only “if it meets all the standards of published content”; the web pilot used six methods, among them task-based benchmarking, a diary study and conversation analysis.",
      where: "5 things we learned · finding 2 and “Our research methods”",
      url: GC,
      shot: "/real/govchat-methods-2026-10-29.png",
    },
    {
      topic: "Limits and escalation · Materi B2",
      problem: "What happens when the assistant cannot answer?",
      did: "It answers only within government guidance; for ambiguous questions it now asks “clarifying questions”; some people “wanted to speak to an advisor”, so a handover to departmental support “within the same interface” is being worked on.",
      where: "5 things we learned · finding 4",
      url: GC,
      shot: "/real/govchat-cannot-2026-10-29.png",
    },
    {
      topic: "Error robustness and safety · Materi B2, B3",
      problem: "Which risks must be managed before scaling?",
      did: "Attempts to “trick an AI system to provide an inappropriate or harmful response” are named “an ongoing risk we will need to manage”; users are told that it “can make mistakes”, with features to “double-check answers at source”.",
      where: "5 things we learned · findings 2 and 3",
      url: GC,
      shot: "/real/govchat-safety-2026-10-29.png",
    },
    {
      topic: "A conflict decided · Materi B2",
      problem: "Comfort against precision",
      did: "“There’s a trade-off right now between speed and accuracy … For us, accuracy is the most important thing”; faster, streamed answers tested well but need the safety guardrails redesigned first.",
      where: "5 things we learned · finding 5",
      url: GC,
      shot: "/real/govchat-speed-2026-10-29.png",
    },
  ],
  discuss: [
    "GOV.UK Chat went to the app first and to the website later. Which journeys and channels of your company would you open first, and on what evidence?",
    "Its team decided that accuracy comes before speed. Which conflict in your concept would you decide the same way, and which the other way?",
    "Six research methods in one pilot. Which two would you make a binding test standard before any voice function goes live, and who would own them?",
    "It hands people over to a person where it cannot help. Where in your journeys must that path exist from the first day?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
