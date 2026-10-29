import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 14 · the reference platforms (DL-STANDARD v1.9, section 16), one per block, read on the real pages on 29.10.2026 without an account:
 *
 * - Block 2.1 (IndustryXR: which use cases deserve immersion, overload and acceptance risks, a responsible pilot): Apple's Human Interface Guidelines, "Immersive
 *   experiences" for visionOS: best practices, promoting comfort, transitions, and creating an environment. A platform maker's own guidance on when immersion
 *   helps and when it harms.
 * - Block 3.1 (an innovation architecture for future technologies: maturity, portfolio, piloting, stopping, governance): the GOV.UK Service Manual, "How the
 *   discovery phase works" and "How the alpha phase works": define the problem before the solution, test the riskiest assumptions with throwaway prototypes, and
 *   decide with evidence whether to go on or stop. (NASA's technology readiness level page did not load on the day.)
 *
 * Every row is something read on those pages; labels and quotes are verbatim; the phase durations in one row are the manual's own words, used as guidance, not data. Screenshots: public/real/apple-* and
 * govuk-* (cookies refused on GOV.UK).
 */
const VISIT = "29.10.2026";
const AP = "https://developer.apple.com/design/human-interface-guidelines/immersive-experiences";
const AL = "https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works";
const DI = "https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works";

const R21 = defineBlockReference("2.1", {
  name: "Apple · Immersive experiences",
  visit: VISIT,
  site: {
    url: AP,
    page: "Apple's Human Interface Guidelines, “Immersive experiences” (visionOS): best practices, promoting comfort, transitions and environments",
    shot: "/real/apple-meaningful-2026-10-29.png",
    note: "A public design guide by a headset maker for the people who build on its platform; it is guidance, not a study.",
  },
  intro:
    "Apple sells a mixed-reality headset and tells developers, in its own guidelines, when not to use immersion. Its advice speaks directly to IndustryXR's open questions in Block 2.1: which use cases deserve immersion, how to avoid overload and disorientation, and how people stay in control.",
  rows: [
    {
      topic: "Real value · Materi A4",
      problem: "It is unclear which use cases really offer immersive value",
      did: "“Reserve immersion for meaningful moments and content. Not every task benefits from immersion, and not every immersive task needs to be fully immersive.”",
      where: "Immersive experiences · Best practices",
      url: AP,
      shot: "/real/apple-meaningful-2026-10-29.png",
    },
    {
      topic: "Overload · Materi A2, A3",
      problem: "Usage risks like overload are not assessed",
      did: "“Be mindful of people’s visual comfort”, prefer placing content “within people’s field of view”, and “Avoid encouraging people to move while they’re in a progressive or fully immersive experience.”",
      where: "Immersive experiences · Promoting comfort",
      url: AP,
      shot: "/real/apple-comfort-2026-10-29.png",
    },
    {
      topic: "Orientation and control · Materi A2",
      problem: "Disorientation and loss of control",
      did: "“Design smooth, predictable transitions when changing immersion”, and “Let people choose when to enter or exit a more immersive experience. It can be disorienting for someone to suddenly enter a more immersive experience when they’re not expecting it.”",
      where: "Immersive experiences · Transitioning between immersive styles",
      url: AP,
      shot: "/real/apple-transitions-2026-10-29.png",
    },
    {
      topic: "Attention · Materi A2",
      problem: "Steering attention without overwhelming",
      did: "“Minimize distracting content”, “Keep animation subtle”, and “Always avoid displaying too much movement near the edges of a person’s field of view”; “Help people feel grounded” with a ground plane.",
      where: "Immersive experiences · Creating an environment",
      url: AP,
      shot: "/real/apple-environment-2026-10-29.png",
    },
    {
      topic: "Acceptance · Materi A3, A5",
      problem: "Acceptance across different users",
      did: "“Offer multiple ways to use your app or game”, supporting “the accessibility features people use”, and “Prefer launching your app or game in the Shared Space or using the mixed immersion style”, which “gives people more control, letting them choose when to increase immersion.”",
      where: "Immersive experiences · Best practices",
      url: AP,
      shot: "/real/apple-meaningful-2026-10-29.png",
    },
  ],
  discuss: [
    "“Not every task benefits from immersion”: which of IndustryXR's ideas (AR instructions, VR training, attention steering) pass that test, and which do not?",
    "Apple advises against encouraging movement in full immersion. What does that mean for a maintenance technician on a ladder, or a trainee in a VR hall?",
    "How would you let a technician “choose when to enter or exit” AR guidance in the middle of a repair?",
    "A headset maker tells its developers to use less immersion. What does that say to a management that wants visible innovation?",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "GOV.UK Service Manual · discovery and alpha",
  visit: VISIT,
  site: {
    url: AL,
    page: "The GOV.UK Service Manual, “How the discovery phase works” and “How the alpha phase works”",
    shot: "/real/govuk-alpha-2026-10-29.png",
    note: "Public guidance for UK government digital teams; it describes stages and decisions, not a specific technology.",
  },
  intro:
    "The UK government's digital service manual describes how a new idea earns the right to grow: first understand the problem, then test the riskiest assumptions with prototypes, then decide with evidence, including the decision to stop. Block 3.1 asks for exactly this decision architecture for immersive and neuro-based technologies.",
  rows: [
    {
      topic: "Problem before technology · Materi B1",
      problem: "Trend fascination instead of a problem to solve",
      did: "“you might be presented with a pre-defined solution or told you’re building a specific thing … you’ll need to interrogate that solution and reframe it as a problem to be solved”; “a problem is not: “We need to build an interactive map …””.",
      where: "How the discovery phase works · Define the problem",
      url: DI,
      shot: "/real/govuk-discovery-2026-10-29.png",
    },
    {
      topic: "Pilot the riskiest part · Materi B2",
      problem: "Which pilots first, and how big?",
      did: "“A crucial part of alpha is identifying your riskiest assumptions and testing them”; “build things that are just complex enough to let you test different ideas … Expect to throw away any code - and lots of the ideas you test”.",
      where: "How the alpha phase works · Focus on testing your riskiest assumptions",
      url: AL,
      shot: "/real/govuk-alpha-2026-10-29.png",
    },
    {
      topic: "A gate to scale · Materi B3",
      problem: "When does a pilot become a product?",
      did: "To move on, teams must be confident that they “can create something that meets users’ needs and is cost-effective” and have “the budget and people necessary”, explained “using the success metrics you identified at the end of discovery.”",
      where: "How the alpha phase works · Deciding whether to move on to beta",
      url: AL,
      shot: "/real/govuk-beta-2026-10-29.png",
    },
    {
      topic: "The right to stop · Materi B3",
      problem: "Wrong decisions raise costs and damage reputation",
      did: "“It’s not a failure to stop at the end of the discovery phase if your research shows that’s the best thing to do. In fact, you’ll be saving time and money that could be better spent elsewhere.”",
      where: "How the discovery phase works · How you know discovery is finished",
      url: DI,
      shot: "/real/govuk-stop-2026-10-29.png",
    },
    {
      topic: "A time box · Materi B2",
      problem: "First pilots must be visible soon",
      did: "Discovery: “around 4 to 8 weeks is typical”; alpha: “Alphas tend to last between 6 and 8 weeks”, and “Alpha services should not be available for the public to use.”",
      where: "How the discovery phase works; How the alpha phase works",
      url: AL,
      shot: "/real/govuk-alpha-2026-10-29.png",
    },
  ],
  discuss: [
    "Reframe one of your company's technology wishes (“we need a VR training”) as a problem to be solved, as the manual asks.",
    "What is the riskiest assumption of your first immersive pilot, and what is the cheapest prototype that tests it?",
    "Which success metrics would you set before a pilot, so that the decision to scale or stop is not made by enthusiasm?",
    "“It’s not a failure to stop”: who in your company would have the right to stop a pilot the management likes?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
