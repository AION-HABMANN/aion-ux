import { defineBlockReference } from "@/data/free/reference";

/**
 * Day 9 · the reference platforms (DL-STANDARD v1.9, section 16): a real platform that already handles the case's problem, opened together in class. One per block,
 * each the best fit for its own question, compared on the real pages on 28.10.2026 and opened without an account:
 *
 * - Block 2.1 (MoveWell, a prevention platform whose progress, feedback and stages are weak): the NHS Couch to 5K programme of the UK's National Health Service. A
 *   serious health provider that guides beginners over 9 weeks with named weeks, a confirmation at the start of each week, milestones, links between the runs and
 *   the body, permission to repeat, and a printable certificate; no points and no ranking. Pages: "Get running with Couch to 5K" and "Couch to 5K running plan".
 * - Block 3.1 (an activation and retention architecture): Duolingo, whose product needs an account but whose public blog explains in its own words why it built
 *   and later changed its streak, leaderboards and rewards. A consumer app with strong gamification, so the class also sees what a health provider may decide
 *   against. Posts: "The habit-building research behind your Duolingo streak" (31.01.2022), "Improving the streak" (19.11.2020), "How do Duolingo leaderboards
 *   work?" (03.05.2023) and "How we developed Time Spent Learning Well" (13.06.2024).
 *
 * Every row is something read on those pages; labels and quotes are verbatim. Figures the companies print about their own tests are their claims and are not
 * repeated here. Screenshots: public/real/*-2026-10-28.png, taken with cookies refused.
 */
const VISIT = "28.10.2026";
const NHS = "https://www.nhs.uk/better-health/get-active/get-running-with-couch-to-5k/";
const PLAN = `${NHS}couch-to-5k-running-plan/`;
const STREAK = "https://blog.duolingo.com/how-duolingo-streak-builds-habit/";
const GOAL = "https://blog.duolingo.com/improving-the-streak/";
const LEAGUES = "https://blog.duolingo.com/duolingo-leagues-leaderboards/";
const TSLW = "https://blog.duolingo.com/time-spent-learning-well/";

const R21 = defineBlockReference("2.1", {
  name: "NHS Couch to 5K",
  visit: VISIT,
  site: {
    url: NHS,
    page: "“Get running with Couch to 5K”, the section on the app",
    shot: "/real/nhs-c25k-app-2026-10-28.png",
    note: "The phone pictures are the NHS's own: a plan of weeks and runs with the finished ones ticked, a run timer, a choice of trainers.",
  },
  intro:
    "Couch to 5K is a free programme of the NHS, the UK's public health service: it guides beginners from not running at all to running 30 minutes in 9 weeks. A serious health provider, it makes progress, stages and encouragement visible without points, badges or a ranking: the problems MoveWell has in Block 2.1.",
  rows: [
    {
      topic: "Progress · Materi A2",
      problem: "Progress is only faintly visible",
      did: "The plan is 9 weeks of 3 runs, and every run is named: “Week 5: Run 2”. The app “sets a plan that builds week by week”; its pictures show the weeks with the finished runs ticked.",
      where: "Couch to 5K running plan · the weeks",
      url: PLAN,
      shot: "/real/nhs-plan-week5-2026-10-28.png",
    },
    {
      topic: "Feedback · Materi A2, A4",
      problem: "Successes are hardly fed back or reinforced",
      did: "Each week opens by confirming what was done: “You’ve made it through the first week, great job!” (week 2), “You’ve made it through your first 20-minute run and that’s a huge achievement!” (week 6).",
      where: "Couch to 5K running plan · weeks 2 and 6",
      url: PLAN,
      shot: "/real/nhs-plan-week3-2026-10-28.png",
    },
    {
      topic: "Stages and milestones · Materi A3",
      problem: "No motivating intermediate goals or stages",
      did: "Named thresholds inside the 9 weeks: “over halfway through the plan” and “your first 20-minute run” (week 5), runs of 25 minutes (week 7), “You’re nearly at the finish line!” (week 8), 30 minutes (week 9).",
      where: "Couch to 5K running plan · week 5",
      url: PLAN,
      shot: "/real/nhs-plan-week5-2026-10-28.png",
    },
    {
      topic: "Narrative frame · Materi A4",
      problem: "The journey is functional, not activating",
      did: "A start and a goal in the first lines: “guiding you from the couch to running 5km in just 9 weeks. Let’s take it one step at a time.” Week 1 is “the start of your running journey”; the first step is small: “once you pick your first run day, you’ve already made progress.”",
      where: "Get running with Couch to 5K · the top and “How do I get started?”",
      url: NHS,
      shot: "/real/nhs-c25k-top-2026-10-28.png",
    },
    {
      topic: "Self-efficacy · Materi A2, A5",
      problem: "No link between the person's development and using the product",
      did: "Week 3 ties the runs to what the body does: “you may notice steadier breathing and quicker recovery. That’s a sign you’re getting fitter!” The benefits list names heart and lungs, mood and confidence.",
      where: "Couch to 5K running plan · week 3",
      url: PLAN,
      shot: "/real/nhs-plan-week3-2026-10-28.png",
    },
    {
      topic: "Tone and credibility · Materi A3, A5",
      problem: "Feedback is technical, and the brand must stay trustworthy",
      did: "Plain second-person language with permission instead of failure: “if you need to repeat any of the runs or weeks, that’s totally okay” (week 5), “If you didn’t quite finish yet, that’s okay too!” Recognition stays modest: a certificate to print and “write your name on it”; “there’s no pressure to keep up with anyone else”.",
      where: "Couch to 5K running plan · “You made it, well done you!”",
      url: PLAN,
      shot: "/real/nhs-plan-end-2026-10-28.png",
    },
  ],
  discuss: [
    "Which of MoveWell's six problems does Couch to 5K address, and with what: a game mechanic, a sentence, or the structure of the plan?",
    "Couch to 5K has a finish line (30 minutes in week 9). Prevention may never end. What could MoveWell use as its stages and its finish lines?",
    "What would MoveWell have to change first within 12 weeks and €150,000, and what would it give up?",
    "Where does Couch to 5K leave a gap that MoveWell's case also has, for example for someone who stops in week 4?",
  ],
});

const R31 = defineBlockReference("3.1", {
  name: "Duolingo",
  visit: VISIT,
  site: {
    url: TSLW,
    page: "the Duolingo blog post on its metric “Time Spent Learning Well”, the section “How we influence TSLW”",
    shot: "/real/duo-tslw-2026-10-28.png",
    note: "The product itself needs an account; the blog is public. The phone pictures are Duolingo's own: Daily Quests and a weekly leaderboard.",
  },
  intro:
    "Duolingo, a language app, is the best-known example of strong gamification: streaks, points (XP), leagues, quests. Its public blog explains, in the company's own words, why it built these and how it later changed them. Block 3.1 asks for such decisions: what motivation to create, what to reward, how deep to go, which wrong assumptions are dangerous, who decides and how to decide without full data. It is a consumer app, so it also shows what a trustworthy health provider may decide against.",
  rows: [
    {
      topic: "Guiding vision · Materi B1",
      problem: "Which motivation should the product create, and how will we know?",
      did: "Duolingo built a “quality metric”, Time Spent Learning Well, to “optimize for learning alongside growth”: it favours the sessions that “move you down the path”, not every session.",
      where: "“How we developed Time Spent Learning Well” · “How we arrived at TSLW”",
      url: TSLW,
      shot: "/real/duo-tslw-2026-10-28.png",
    },
    {
      topic: "Decision on reinforcement · Materi B2",
      problem: "What earns a reward?",
      did: "After leaderboards led to “XP grinding”, it “increased XP along the path so that XP rewards are proportionate to effort and learning outcomes”, and moved the Monthly Challenge from XP to Quests because learners were “gaming the system to earn XP in bulk”.",
      where: "“How we developed Time Spent Learning Well” · Leaderboards, Monthly Challenges",
      url: TSLW,
      shot: "/real/duo-tslw-2026-10-28.png",
    },
    {
      topic: "Decision on progress · Materi B1, B2",
      problem: "How high is the bar for a habit?",
      did: "It separated the streak from the daily goal, so “just a single lesson each day” keeps the streak, and printed what this cost: “fewer learners were actually reaching their daily goals”.",
      where: "“Improving the streak” · “An easier way to keep your streak”",
      url: GOAL,
      shot: "/real/duo-streak-goal-2026-10-28.png",
    },
    {
      topic: "Gamification depth and autonomy · Materi B2",
      problem: "How much pressure may a mechanic put on people?",
      did: "Leaderboards can be switched off: “Leaderboards aren’t for everyone.” A Streak Freeze pauses the streak for a day, because breaking it “can … feel quite demotivating” and “the fear of losing a streak could prevent learners from even attempting one”.",
      where: "“How do Duolingo leaderboards work?” and the streak post · “we all need a little flexibility”",
      url: LEAGUES,
      shot: "/real/duo-leagues-optout-2026-10-28.png",
    },
    {
      topic: "Risk analysis · Materi B2, B3",
      problem: "Which wrong assumptions about motivation are critical?",
      did: "The company names two of its own: that “more sessions = better for learning” (“Not quite!”), and that a competitive feature helps everyone, when it mostly moved “a small group of learners who … were already doing more than enough”.",
      where: "“How we developed Time Spent Learning Well” · “Total Sessions”, “Time Spent Learning”",
      url: TSLW,
    },
    {
      topic: "Governance · Materi B3",
      problem: "Who decides which levers are acceptable?",
      did: "For long streaks the company says it taps into “loss aversion” and reminds learners “so as not to lose your hard-earned progress”. The lever is named in public, which is what makes it possible to decide on it.",
      where: "“The habit-building research behind your Duolingo streak” · “Consistency is key”",
      url: STREAK,
      shot: "/real/duo-streak-top-2026-10-28.png",
    },
    {
      topic: "Decision under uncertainty · Materi B3",
      problem: "How to decide when the data is incomplete",
      did: "“Test everything” is called one of its operating principles; the streak change was an experiment, “A) separating daily goal and streak versus B) keeping them combined”, decided on results the company reports as its own.",
      where: "“Improving the streak” · “An easier way to keep your streak”",
      url: GOAL,
      shot: "/real/duo-streak-freeze-2026-10-28.png",
    },
  ],
  discuss: [
    "Which of Duolingo's decisions would you carry over to a health provider whose brand must stay trustworthy and close to health, and which not? Why?",
    "Duolingo names loss aversion as a lever. Who in your governance model would decide whether your company may use it, and on which principle?",
    "Duolingo changed its rewards after people gamed them. Which wrong assumption about your users would your concept have to check first?",
    "Duolingo decides by experiments with very many users. What would you do instead when your data is only partly there?",
  ],
});

export const REF_21 = R21.REF;
export const REF_31 = R31.REF;
export const REF_CARD_21 = R21.CARD;
export const REF_CARD_31 = R31.CARD;
