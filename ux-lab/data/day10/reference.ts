import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 10 · the reference platforms (DL-STANDARD v1.9, section 16), one per block, read on the real pages on 28.10.2026 without an account (English pages; the browser's
 * locale served Indonesian, so the pages were opened in their English versions):
 *
 * - Block 2.1 (CareGuide: recommendations that partly fit, users not knowing why something is shown or how strongly the portal personalises, little control):
 *   Spotify, "Understanding recommendations on Spotify" (Safety and Privacy center, "Last updated: October 23, 2026"). It names the inputs of a recommendation,
 *   separates editorial picks from personalised ones, lists the user's controls, and says when commercial considerations influence a recommendation.
 * - Block 3.1 (an architecture for intelligent and adaptive interfaces: transparency, control, depth of personalisation, trustworthy AI, governance): YouTube,
 *   "Algorithm-based recommendations on YouTube – How YouTube works". It sets a different standard for topics where accuracy matters (news, personal finance,
 *   medical and scientific information), uses external evaluators, gives users control over their history, and labels AI-made content.
 *
 * Every row is something read on those pages; labels and quotes are verbatim. Neither page prints figures that are used here. Screenshots: public/real/sp-* and yt-*.
 */
const VISIT = "28.10.2026";
const SP = "https://www.spotify.com/us/safetyandprivacy/understanding-recommendations";
const YT = "https://www.youtube.com/intl/en_us/howyoutubeworks/recommendations/";

const R21 = defineBlockReference("2.1", {
  name: "Spotify",
  visit: VISIT,
  site: {
    url: SP,
    page: "“Understanding recommendations on Spotify” in its Safety and Privacy center, the section on what users can influence",
    shot: "/real/sp-controls-2026-10-28.png",
    note: "A public help page; the product itself needs an account. The page says some controls depend on the country and the plan.",
  },
  intro:
    "Spotify, a music and podcast service, personalises most of what people see. Its public page explains why a recommendation appears, how much is personal and how much is chosen by editors, what users can change, and when money plays a part: the questions CareGuide's members cannot answer in Block 2.1.",
  rows: [
    {
      topic: "Transparency · Materi A4",
      problem: "Members do not understand why certain content is shown",
      did: "The page names the inputs one by one, each with an example: the “taste profile” (searching, listening, skipping, saving), “Information we learn about you” (age, who you follow, device, language, location “only if you opt in”), trends, and information about the content.",
      where: "Understanding recommendations · “Your “taste profile”” and the sections below it",
      url: SP,
      shot: "/real/sp-inputs-2026-10-28.png",
    },
    {
      topic: "Depth of personalisation · Materi A2",
      problem: "No clear hint how strongly the system personalises",
      did: "It separates two kinds: “Some recommendations are based on editorial curation, like a pop playlist created by music editors. Other recommendations are tailored to each listener’s unique taste.”",
      where: "Understanding recommendations · “How do Spotify recommendations work?”",
      url: SP,
      shot: "/real/sp-top-2026-10-28.png",
    },
    {
      topic: "Control · Materi A4",
      problem: "The members' ways to intervene are limited or unclear",
      did: "A list of controls: “Exclude from taste profile”, “Give feedback on recommendations” (not interested, hide), on some playlists “remove personalization”, “Turn off Autoplay”, “Hide or Snooze” a track, filters, and notes to the Taste Profile (Beta), “a snapshot of what we've understood about your listening”.",
      where: "Understanding recommendations · “How can you influence what your recommendations are based on?”",
      url: SP,
      shot: "/real/sp-controls-2026-10-28.png",
    },
    {
      topic: "Misadaptation · Materi A3",
      problem: "Recommendations fit only partly",
      did: "Feedback changes what comes next: after “not interested” or hide, “you’ll be given fewer recommendations that are similar to it”; the page says “Your taste changes over time, and your recommendations should change with it.”",
      where: "Understanding recommendations · the controls and the opening section",
      url: SP,
      shot: "/real/sp-controls-2026-10-28.png",
    },
    {
      topic: "Trust · Materi A3, A4",
      problem: "Data protection warns of opacity and loss of trust",
      did: "It says when commercial considerations influence a recommendation (“Discovery Mode” raises the likelihood of a song being recommended, against a commission) and that this is not active in its editorial playlists.",
      where: "Understanding recommendations · “How do commercial considerations impact recommendations?”",
      url: SP,
      shot: "/real/sp-commercial-2026-10-28.png",
    },
  ],
  discuss: [
    "Which of CareGuide's problems would a page like this solve, and which can only be solved inside the portal, next to the recommendation itself?",
    "Spotify names its inputs. Which inputs could a health portal name without frightening its members, and which would it have to leave out?",
    "Spotify lets people remove personalisation on some playlists. Which of CareGuide's recommendations should members be able to switch off first?",
    "What would change for trust if CareGuide had to write a section like “How do commercial considerations impact recommendations?”",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "YouTube",
  visit: VISIT,
  site: {
    url: YT,
    page: "“Algorithm-based recommendations on YouTube” on its site “How YouTube works”, the section on high-quality information",
    shot: "/real/yt-quality-2026-10-28.png",
    note: "A public explanation page. The phone picture is YouTube's own animation, caught mid-way.",
  },
  intro:
    "YouTube runs one of the largest recommendation systems. Its public page states what the system is for, what it uses, what users control, and where it decides differently: for topics where accuracy matters. Block 3.1 asks for exactly such decisions: a guiding vision for intelligent UX, the depth of personalisation, transparency and control, governance and a decision under uncertainty.",
  rows: [
    {
      topic: "Guiding vision · Materi B1",
      problem: "Which support should the system create?",
      did: "It states the job of recommendations: “to meet user needs by helping people find the videos that they want to watch and that will give them value”, and says it uses “feedback, including from satisfaction surveys” besides viewing behaviour.",
      where: "Algorithm-based recommendations · “Recommendations on YouTube”",
      url: YT,
      shot: "/real/yt-top-2026-10-28.png",
    },
    {
      topic: "Depth of personalisation by topic · Materi B2",
      problem: "Where should the system personalise less?",
      did: "“For topics where accuracy and high quality are key — like news, personal finance and medical and scientific information — we elevate high-quality voices”; a “Health Information” shelf highlights sources for certain health searches.",
      where: "Algorithm-based recommendations · “How YouTube Elevates High-Quality Information”",
      url: YT,
      shot: "/real/yt-quality-2026-10-28.png",
    },
    {
      topic: "Control and data · Materi B2",
      problem: "How much data may the system use?",
      did: "“We also know that not everyone wants to always be logged in or to share their information with us, so we've built controls … Users can always pause, edit or delete their YouTube search and watch history whenever they want.”",
      where: "Algorithm-based recommendations · “Recommendations on YouTube”",
      url: YT,
      shot: "/real/yt-top-2026-10-28.png",
    },
    {
      topic: "Transparency about AI · Materi B1, B3",
      problem: "How do users know what is made or shaped by AI?",
      did: "Creators must disclose realistic “altered or synthetic media, including content made with gen AI, and then labels appear on the video or in its description”; information panels give context about publishers.",
      where: "Algorithm-based recommendations · “How YouTube Provides Additional Context”",
      url: YT,
      shot: "/real/yt-context-2026-10-28.png",
    },
    {
      topic: "Governance · Materi B3",
      problem: "Who checks what the system surfaces?",
      did: "It considers “the reputation and the quality of a channel” and uses “external evaluators to help us understand how an average viewer might perceive the content”.",
      where: "Algorithm-based recommendations · “Recommendations on YouTube”",
      url: YT,
      shot: "/real/yt-top-2026-10-28.png",
    },
  ],
  discuss: [
    "YouTube personalises less where accuracy matters. Which journeys of your company are such topics, and what would the system do there instead?",
    "Which of YouTube's controls (pause, edit, delete history) would your members need, and in which channel: app, portal or service platform?",
    "YouTube uses external evaluators. Who would play that role for your company's intelligent UX principles, and who decides when they disagree with the product team?",
    "This page explains the system from outside. What would your users need to see inside a journey, next to the suggestion itself?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
