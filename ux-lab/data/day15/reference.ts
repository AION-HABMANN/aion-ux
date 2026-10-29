import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 15 · the reference platforms (DL-STANDARD v1.9, section 16), one per block, read on the real pages on 29.10.2026 without an account:
 *
 * - Block 2.1 (VisionMind Lab: hypotheses, what eye-tracking can and cannot show, a responsible pilot): Tobii's blog post "Eye tracking and UX testing: when, how,
 *   and if you should use it" (13.11.2019). An eye-tracker maker's own advice to UX researchers: narrow questions, one feature at a time, measurable outcomes,
 *   eye-tracking as one tool among others, retrospective think-aloud, piloting the test. It also says eye-tracking shows "the why", which the class can question.
 * - Block 3.1 (governance for neuro-based research: consent, purpose, discrimination, high risk): the UK Information Commissioner's Office, "ICO tech futures:
 *   neurotechnology" (June 2023): executive summary and regulatory issues. A regulator's view, not a law; it covers data from the brain and nervous system and
 *   says eye movements belong to its earlier biometrics work.
 *
 * Every row is something read on those pages; quotes are verbatim. Screenshots: public/real/tobii-* (cookies denied) and ico-* (non-essential cookies rejected).
 */
const VISIT = "29.10.2026";
const TB = "https://www.tobii.com/blog/eye-tracking-and-ux-testing";
const IC = "https://ico.org.uk/about-the-ico/research-reports-impact-and-evaluation/research-and-reports/technology-and-innovation/tech-horizons-and-ico-tech-futures/ico-tech-futures-neurotechnology";
const ES = `${IC}/executive-summary/`;
const RI = `${IC}/regulatory-issues/`;

const R21 = defineBlockReference("2.1", {
  name: "Tobii · Eye tracking and UX testing",
  visit: VISIT,
  site: {
    url: TB,
    page: "Tobii's blog, “Eye tracking and UX testing: when, how, and if you should use it” (13 November 2019)",
    shot: "/real/tobii-question-2026-10-29.png",
    note: "A blog post by a maker of eye-trackers for its customers; it is practical advice from a seller of the method, not a study.",
  },
  intro:
    "Tobii builds eye-trackers and advises UX researchers on when to use them. Its advice speaks directly to VisionMind Lab's open questions in Block 2.1: how to frame a study, what eye-tracking adds, and how to run it well. One sentence in it also claims more than Materi A2 would allow, which makes it a good page to read critically.",
  rows: [
    {
      topic: "Hypotheses · Materi A4",
      problem: "A high gain in insight is hoped for without hypotheses",
      did: "Rather than “assess user interaction with the product”, “be narrow with your objectives and explore each question individually, such as, ‘determine if button X is seen and understood’”; “Focus on one feature or function at a time”.",
      where: "Ask the right questions and get the most from your user testing",
      url: TB,
      shot: "/real/tobii-question-2026-10-29.png",
    },
    {
      topic: "Measurable outcomes · Materi A4, B3",
      problem: "Pilots cannot show whether they worked",
      did: "“make your test outcomes measurable, e.g. ‘successfully complete task X’ or ‘complete task Y within 2 minutes’. This will help with benchmarking, reporting design improvements, and making your case to other stakeholders”.",
      where: "Ask the right questions and get the most from your user testing",
      url: TB,
      shot: "/real/tobii-question-2026-10-29.png",
    },
    {
      topic: "The right method · Materi A1, A4",
      problem: "Unclear which methods are product-near and which exploratory",
      did: "Quoting a UX educator: “eye tracking is a tool in the toolbox and it’s not always needed for everything”; to see whether people can locate a button, “a simple time-based success or failure test might be sufficient”.",
      where: "When to use eye tracking in UX testing",
      url: TB,
      shot: "/real/tobii-when-2026-10-29.png",
    },
    {
      topic: "What gaze adds · Materi A1, A2",
      problem: "The meaning of neuro-based data is overestimated",
      did: "It uncovers “Gaze patterns”, “Stumbling points” and “Blindspots – elements that are simply ignored”; recordings “can be used for retrospective think-aloud interviews”. The page also says eye-tracking is useful “when you want to know the why”.",
      where: "What eye tracking can add to user testing; When to use eye tracking",
      url: TB,
      shot: "/real/tobii-adds-2026-10-29.png",
    },
    {
      topic: "Robust in real use · Materi A3",
      problem: "Unclear how robust the data are",
      did: "“Pilot your tests before participants arrive”, check whether participants “wear glasses”, factor in more time for the interview, and “very bright lights or intense sunlight can affect some eye trackers.”",
      where: "How to start implementing eye tracking into your user tests",
      url: TB,
      shot: "/real/tobii-pilot-2026-10-29.png",
    },
  ],
  discuss: [
    "Tobii advises “determine if button X is seen and understood”. Write one such narrow question for VisionMind Lab's service portal.",
    "The page says eye-tracking shows “the why”. With Materi A2 in mind: what does a gaze recording show, and what does the retrospective interview add?",
    "When would “a simple time-based success or failure test” be enough for VisionMind Lab, and save the eye-tracker?",
    "This is advice from a company that sells eye-trackers. What would you check before following it?",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "ICO · Tech futures: neurotechnology",
  visit: VISIT,
  site: {
    url: ES,
    page: "The UK Information Commissioner's Office, “ICO tech futures: neurotechnology” (June 2023): executive summary and regulatory issues",
    shot: "/real/ico-summary-2026-10-29.png",
    note: "A report by the UK data protection regulator; it is its view of the risks, not a law or a ruling.",
  },
  intro:
    "The UK's data protection regulator looked at what happens when organisations gather and use data produced by the brain and nervous system. Its concerns map onto the governance Block 3.1 asks for: what counts as neurodata, discrimination by inaccurate systems, and whether people can give meaningful consent at all.",
  rows: [
    {
      topic: "What is covered · Materi A1, A3",
      problem: "Which data are we dealing with?",
      did: "The report covers “information that is directly produced by the brain and nervous system, referred to as neurodata”, from “monitoring concentration levels at work” to smart prosthetics; it does not consider data “inferred from broader biometric information, such as eye movements”, which its earlier biometrics work covers.",
      where: "Executive summary",
      url: ES,
      shot: "/real/ico-summary-2026-10-29.png",
    },
    {
      topic: "High risk · Materi A5, B3",
      problem: "Data protection and ethical sensitivity are high",
      did: "Classifying people “emotionally and behaviourally” brings a risk of profiling; the report sees “the need to consider neurodata as high impact and high risk even when used in contexts that do not explicitly count as special category data.”",
      where: "Regulatory issues · Issue 1: Regulatory definitions",
      url: RI,
      shot: "/real/ico-highrisk-2026-10-29.png",
    },
    {
      topic: "Validity and discrimination · Materi A2, B2",
      problem: "The meaning of neuro-based data is overestimated",
      did: "“The science underpinning the analysis of human emotion is highly debated”; “Without robust and independent verification of these models, there is a risk that these approaches will be rooted in systemic bias”, and neurodivergent people may be at risk from systems trained on “neuro-normative patterns”.",
      where: "Regulatory issues · Issue 2: Neurodiscrimination",
      url: RI,
      shot: "/real/ico-discrimination-2026-10-29.png",
    },
    {
      topic: "Devices tested on few people · Materi A3",
      problem: "Unclear how robust the data are",
      did: "Risks emerge “when devices are not trialled and assessed on a wide variety of people”, even as simple as whether devices “sit appropriately and comfortably”; otherwise data sets “become biased and incomplete due to device calibration issues.”",
      where: "Regulatory issues · Issue 2: Neurodiscrimination",
      url: RI,
      shot: "/real/ico-discrimination-2026-10-29.png",
    },
    {
      topic: "Consent · Materi A5, B3",
      problem: "Consent and acceptance are not addressed",
      did: "“Are there any circumstances in which a person can provide fully informed consent … when they are not aware of what the exact nature of this information is?” Organisations may give “specific guarantees about the inferences that they intend to draw”; at work, “Given the power imbalance between employer and employee, it is likely that consent is not the appropriate basis”.",
      where: "Regulatory issues · Issue 3: Consent",
      url: RI,
      shot: "/real/ico-consent-2026-10-29.png",
    },
  ],
  discuss: [
    "The ICO asks whether people can consent to data whose nature they do not know. What would VisionMind Lab's consent text have to say about the inferences it will and will not draw?",
    "Eye movements fall under the ICO's biometrics work, EEG under neurodata. Does your governance treat them differently, and should it?",
    "“Without robust and independent verification”: who would verify an overload score before it reaches the product?",
    "If the company tested a headband on its own staff, why might consent not be the right basis, according to the ICO?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
