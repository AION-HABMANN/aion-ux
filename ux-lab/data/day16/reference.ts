import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 16 · the reference platforms (DL-STANDARD v1.9, section 16), one per block, read on the real pages on 29.10.2026 without an account:
 *
 * - Block 2.1 (NextWorld UX: a common evaluation logic, comparable evidence, overload, attention against use, ethics before scaling): Meta's "App policies" for
 *   the Meta Horizon Store, the rules a VR app must meet before it reaches the market: comfort ratings on one scale, a minimum of utility, content ratings and
 *   warnings. A headset platform's own release gate.
 * - Block 3.1 (a governance for immersive, AI-supported and neuro-based systems: tiers, bans, duties before market, monitoring after): the European Commission's
 *   "AI Act" page on Shaping Europe's digital future: four levels of risk, the banned practices (including manipulation and emotion recognition at work and in
 *   education), the obligations before high-risk systems go to market, and monitoring once they are used. The Commission's summary, not the regulation itself.
 *
 * Every row is something read on those pages; quotes are verbatim. Screenshots: public/real/meta-* and ec-* (only essential cookies accepted on the Commission's
 * site; no banner on Meta's).
 */
const VISIT = "29.10.2026";
const MP = "https://developers.meta.com/horizon/policy/store-policies/";
const EC = "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai";

const R21 = defineBlockReference("2.1", {
  name: "Meta Horizon Store · App policies",
  visit: VISIT,
  site: {
    url: MP,
    page: "Meta Horizon OS Developers, “App policies” for the Meta Horizon Store: comfort ratings, content ratings, limited functionality, streaming",
    shot: "/real/meta-comfort-2026-10-29.png",
    note: "The rules of a headset maker's app store for the developers who publish there; a release gate, not a study.",
  },
  intro:
    "Before a VR app reaches Meta's store, it has to pass the store's rules. Several of them speak directly to NextWorld UX's open questions in Block 2.1: one common scale for judging comfort, a minimum of real usefulness, and ratings and warnings settled before release, not after.",
  rows: [
    {
      topic: "One scale for every app · Materi A2, A4",
      problem: "No common evaluation logic for the prototypes",
      did: "“You must assign your app one of three comfort ratings: Comfortable, Moderate, or Intense.” “Comfortable” experiences “generally avoid camera movement, player motion, or disorienting content and effects”; “Intense” ones “usually incorporate first person camera motion, acceleration, or significant camera movement”.",
      where: "App policies · 5.1 Comfort ratings",
      url: MP,
      shot: "/real/meta-comfort-2026-10-29.png",
    },
    {
      topic: "Uneven experiences · Materi A2",
      problem: "Some users find high value, others overload",
      did: "“Comfort is a subjective, variable, and individual experience. However, we want to communicate to users as best we can about what they can generally expect from a VR app.”",
      where: "App policies · 5.1 Comfort ratings",
      url: MP,
      shot: "/real/meta-comfort-2026-10-29.png",
    },
    {
      topic: "Overload is worth fixing · Materi A2, A5",
      problem: "Overload and scepticism in some users",
      did: "“In general, pay a lot of attention to comfort in the user’s VR experience. Investing in comfort is worth it. Even “Moderate” and “Intense” apps should strive to be as comfortable as possible.”",
      where: "App policies · 5.1.2",
      url: MP,
      shot: "/real/meta-comfort-2026-10-29.png",
    },
    {
      topic: "Attention is not use · Materi A4",
      problem: "Pilots that attract attention but have limited practical use",
      did: "Apps that are paid or use platform features “may not provide only limited utility or functionality”; the store “generally do[es] not accept apps that only present a small number of 2D videos, nor apps that are a wrapper for a single 360 video.”",
      where: "App policies · 4.3 Limited functionality apps; 4.5 Video container apps",
      url: MP,
      shot: "/real/meta-utility-2026-10-29.png",
    },
    {
      topic: "Settled before release · Materi A3",
      problem: "Ethics handled differently in each project",
      did: "“All apps must be rated by the International Age Rating Coalition (IARC)” before release; “If the introduction of streaming may cause customer discomfort, developers should provide a robust warning to users.”",
      where: "App policies · 5.2 Content ratings; 3.2 Streaming",
      url: MP,
      shot: "/real/meta-ratings-2026-10-29.png",
    },
  ],
  discuss: [
    "Meta judges every app on one comfort scale before release. What would one common scale for NextWorld UX's three prototypes look like?",
    "“Comfort is a subjective, variable, and individual experience”, yet it is rated. How would you rate overload when some users love a prototype and others feel overwhelmed?",
    "Meta does not accept apps with “only limited utility”. Which of NextWorld UX's pilots would pass that test today?",
    "This is a store protecting its own platform. Which of its rules would you adopt inside your company, and which not?",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "European Commission · AI Act",
  visit: VISIT,
  site: {
    url: EC,
    page: "The European Commission's page “AI Act” on Shaping Europe's digital future: the risk-based approach, prohibited practices, high-risk obligations, monitoring",
    shot: "/real/ec-tiers-2026-10-29.png",
    note: "The Commission's public summary of the EU regulation on artificial intelligence; for legal questions the regulation and its guidelines count.",
  },
  intro:
    "Many future UX systems are AI-supported, and some read emotions or steer behaviour. The EU sorts AI uses into levels of risk, bans some, and demands checks before others reach the market and monitoring afterwards. That is a governance architecture in itself, and Block 3.1 asks for one.",
  rows: [
    {
      topic: "Tiers, not one rule · Materi B1",
      problem: "No portfolio logic across the lines of innovation",
      did: "“The AI Act defines 4 levels of risk for AI systems”: unacceptable risk, high risk, transparency risk, and minimal or no risk; “The vast majority of AI systems currently used in the EU fall into” the last.",
      where: "A Risk-based Approach",
      url: EC,
      shot: "/real/ec-tiers-2026-10-29.png",
    },
    {
      topic: "Some lines must end · Materi B2, B3",
      problem: "Which initiatives are ended, and why?",
      did: "“All AI systems considered a clear threat to the safety, livelihoods and rights of people are banned”, among them “harmful AI-based manipulation and deception” and “emotion recognition in workplaces and education institutions”.",
      where: "Unacceptable risk",
      url: EC,
      shot: "/real/ec-prohibited-2026-10-29.png",
    },
    {
      topic: "A gate before scaling · Materi B3",
      problem: "Ethical approvals and scaling decisions",
      did: "High-risk systems “will be subject to strict obligations before they can be put on the market”: “adequate risk assessment and mitigation systems”, “high-quality of the datasets … to minimise risks of discriminatory outcomes”, “logging of activity”, “appropriate human oversight measures” and “high level of robustness, cybersecurity and accuracy”.",
      where: "High risk",
      url: EC,
      shot: "/real/ec-highrisk-2026-10-29.png",
    },
    {
      topic: "Transparency · Materi A3",
      problem: "Trust in AI-supported interaction",
      did: "“when using AI systems such as chatbots, humans should be made aware that they are interacting with a machine so they can take an informed decision.”",
      where: "Transparency risk",
      url: EC,
      shot: "/real/ec-highrisk-2026-10-29.png",
    },
    {
      topic: "After launch, not done · Materi B3",
      problem: "Portfolio adjustments once systems are in use",
      did: "“Once an AI system is on the market, authorities are in charge of market surveillance, deployers ensure human oversight and monitoring, and providers have a post-market monitoring system in place. Providers and deployers will also report serious incidents and malfunctioning.”",
      where: "How does it all work in practice for providers of high-risk AI systems?",
      url: EC,
      shot: "/real/ec-practice-2026-10-29.png",
    },
  ],
  discuss: [
    "Sort your company's five lines into the four levels of risk. Which one would the EU call unacceptable, and what does that mean for your portfolio?",
    "The obligations before market read like a scaling gate. Which of them would you require of every immersive pilot, even where the law does not?",
    "“Humans should be made aware that they are interacting with a machine”: where in your products would that change the design?",
    "The law asks for monitoring after launch. Who in your governance model watches an initiative once it has scaled?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
