import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { courseHero, courseOutcomes, courseOutline, footerOf, richLessonPages, shellNav, shellPages } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60). SkillRise as the plan describes it (Block 1.1), the three HealthJourney activation designs
 * (Block 1.2), MoveWell as it is today (Block 2.1), and the provider's app, customer portal and service offer (Block 3.1). Every link and button opens a real page.
 * The plan's clues are kept exactly (paths, tasks and certificates but little visible progress, neutral messages, no milestones, nothing that shows development;
 * points, badges, daily challenges and rankings against progress, milestones and confirming feedback against a narrative journey with stages; faint progress,
 * successes hardly fed back, no stages, a functional journey, no link between development and use, technical messages) and nothing is added that changes the
 * answer.
 *
 * Shown for real (user rule 2026-10-28): HealthJourney's Variant A is built as a convincing, loud gamified app, with points in the header that rise as you use it,
 * a streak, a weekly league with a "drop zone", a pulsing daily challenge and a cascade of rewards after one action, so the learner meets overstimulation and
 * reward inflation instead of reading about them. Points, levels, league places and step targets are interface labels of a made-up app, not figures about users.
 * The names and contents are made up; nothing is marked right or wrong.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });
/** Small grey text, as the plan's "only faintly visible" progress. */
const FAINT = { fontSize: 11, color: "#6B7280" } as const;

/* ------------------------------------------------------------------ SkillRise, a learning and development platform for professional further training */

const SR = { size: 14 };
const srPages = (): Record<string, PPage> => {
  const lessons = richLessonPages(6, {
    back: "path",
    section: "paths",
    noPlace: true,
    extra: (i) => [
      {
        t: "finish",
        label: tt("Mark as complete"),
        task: tt("Task: apply this lesson to a negotiation from your own work and note what you would do."),
        feedback: [tt("Task completed.")],
        key: `srDone${i}`,
        ...(i === 0 ? { mark: 2 } : {}),
      },
    ],
  });
  return {
    dash: { title: tt("My learning"), section: "dash", blocks: [
      { t: "h", mark: 6, text: tt("My learning") },
      { t: "p", text: tt("Your employer has assigned you two learning paths. Open a path to continue.") },
      { t: "cards", mark: 1, items: [
        { title: tt("Negotiation basics"), text: tt("Prepare, open and close negotiations in everyday work."), tag: tt("Learning path"), meta: tt("6 modules · Certificate"), go: "path" },
        { title: tt("Data literacy for managers"), text: tt("Read reports and dashboards and ask the right questions."), tag: tt("Learning path"), meta: tt("8 modules · Certificate"), go: "path2" },
      ] },
      { t: "sub", text: tt("Recommended for you") },
      { t: "cards", items: [{ title: tt("Giving feedback"), text: tt("Short course for team leads."), tag: tt("Course"), meta: tt("3 modules"), go: "catalog" }] },
    ] },
    path: { title: tt("Negotiation basics"), crumb: tt("Negotiation basics"), section: "paths", blocks: [
      ...courseHero({ ...SR }, 6).map((b, i) => (i === 0 ? ({ ...b, mark: 4 } as Blk) : b)),
      { t: "sub", text: tt("Modules") },
      { ...courseOutline(6, SR, { track: false }), mark: 3 } as Blk,
      { t: "note", title: tt("Certificate"), text: tt("A certificate is issued when all modules of the learning path are completed.") },
      ...courseOutcomes(SR),
    ] },
    path2: { title: tt("Data literacy for managers"), crumb: tt("Data literacy for managers"), section: "paths", blocks: [
      { t: "h", text: tt("Data literacy for managers") },
      { t: "p", text: tt("Read reports and dashboards with confidence and ask the questions that matter. Eight modules with a task each.") },
      { t: "list", items: [tt("1. What a number can and cannot say"), tt("2. Averages and spreads"), tt("3. Reading a dashboard"), tt("4. Questions to ask your analyst")] },
      back("dash", tt("My learning")),
    ] },
    paths: { title: tt("Learning paths"), section: "paths", blocks: [
      { t: "h", text: tt("Learning paths") },
      { t: "list", items: [tt("Negotiation basics · assigned"), tt("Data literacy for managers · assigned")] },
      { t: "links", items: [{ label: tt("Open Negotiation basics"), go: "path" }, { label: tt("Open Data literacy for managers"), go: "path2" }] },
    ] },
    certs: { title: tt("Certificates"), section: "certs", blocks: [
      { t: "h", text: tt("Certificates") },
      { t: "p", text: tt("No certificates available.") },
      { t: "p", text: tt("Certificates are issued after completion of a learning path.") },
    ] },
    profile: { title: tt("Profile"), section: "profile", blocks: [
      { t: "h", text: tt("Profile") },
      { t: "table", mark: 5, head: [tt("Field"), tt("Value")], rows: [[tt("Name"), "Alex Brandt"], [tt("Department"), tt("Sales")], [tt("Employee ID"), "SR-20417"], [tt("Language"), tt("English")], [tt("Assigned learning paths"), "2"]] },
      { t: "form", fields: [tt("Job title"), tt("Phone")], button: tt("Save"), msg: tt("Saved.") },
    ] },
    ...lessons,
    ...shellPages(SR, "path"),
  };
};

/** SkillRise as the plan describes it: paths, tasks and certificates, little visible progress, neutral messages, no milestones, nothing that shows development. */
export const skillRise = (): PlatformCfg => ({
  name: "SkillRise",
  start: "dash",
  color: "#2D4A6B",
  nav: [{ label: tt("My learning"), go: "dash" }, { label: tt("Learning paths"), go: "paths" }, { label: tt("Certificates"), go: "certs" }, { label: tt("Profile"), go: "profile" }, ...shellNav()],
  pages: srPages(),
  footer: footerOf("SkillRise"),
});

/* ------------------------------------------------------------------ HealthJourney, a prevention platform: three activation designs */

/** Variant A: strong gamification with points, badges, daily challenges and rankings, built as loud as such apps are. */
export const hjA = (): PlatformCfg => ({
  name: "HealthJourney",
  start: "home",
  color: "#6D28D9",
  phone: true,
  header: (v) => `⭐ ${1240 + v.length * 40} XP · 🔥 ${v.includes("chDone") ? 5 : 4}`,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("League"), go: "league" }, { label: tt("Badges"), go: "badges" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [
      { t: "hero", kicker: tt("DAILY CHALLENGE · 3 h 12 min left ⏰"), title: tt("Hey Sam! Ready to crush today? 💪"), text: tt("Finish today's challenge for DOUBLE XP and keep your 🔥 streak alive!"), button: { label: tt("Start challenge ⚡"), go: "challenge" } },
      { t: "meta", items: [tt("🔥 4-day streak"), tt("Level 6 · Health Hero"), tt("🏅 7 badges"), tt("🥈 Silver league")], colors: ["#DC2626", "#6D28D9", "#B45309", "#475569"] },
      { t: "links", grid: 2, items: [
        { label: tt("🎯 Today: 8,000 steps"), go: "challenge", color: "#DC2626", pulse: true },
        { label: tt("🏆 Weekly league"), go: "league", color: "#6D28D9" },
        { label: tt("🏅 My badges"), go: "badges", color: "#B45309" },
        { label: tt("➕ Log activity (+10 XP)"), go: "log", color: "#047857" },
      ] },
      { t: "note", title: tt("⚠️ Don't lose your streak!"), text: tt("You haven't logged anything today. Log one activity before midnight to keep your 4-day streak."), go: { label: tt("Log now"), go: "log" } },
    ] },
    challenge: { title: tt("Daily challenge"), section: "home", blocks: [
      { t: "h", text: tt("⚡ Daily challenge: 8,000 steps") },
      { t: "p", text: tt("Walk 8,000 steps before midnight. Today only: DOUBLE XP! Your league rivals are already on it. 👀") },
      { t: "finish", big: true, key: "chDone", label: tt("I did it! 🎉"), task: tt("Tap when you've reached your steps."), feedback: [tt("🎉 +100 XP! (DOUBLE XP)"), tt("🔥 Streak extended: 5 days!"), tt("🏅 Badge unlocked: Early Bird"), tt("🏅 Badge unlocked: Step Master"), tt("📈 You moved up to #12 in the Silver league!"), tt("🎁 Mystery chest unlocked: open it tomorrow!"), tt("⚡ Come back tomorrow: TRIPLE XP weekend starts!")] },
      back("home", tt("Back home")),
    ] },
    league: { title: tt("League"), section: "league", blocks: [
      { t: "h", text: tt("🥈 Silver league · ends in 2 days") },
      { t: "p", text: tt("Top 5 move up to Gold. Bottom 5 drop to Bronze.") },
      { t: "table", head: ["#", tt("Name"), "XP"], rows: [["1", "Lina 🔥", "2,840"], ["2", "Marco", "2,610"], ["3", "Jess", "2,450"], ["…", "…", "…"], ["14", tt("You (Sam)"), "1,240"], ["15", "Ben", "1,180"], ["16", "Petra", "990"], ["17", "Udo", "620"], ["18", "Karin", "410"]] },
      { t: "note", title: tt("🔻 You are close to the drop zone!"), text: tt("Earn 300 XP before Sunday to stay in Silver. Petra, Udo and Karin are about to drop to Bronze."), go: { label: tt("Earn XP now"), go: "challenge" } },
    ] },
    badges: { title: tt("Badges"), section: "badges", blocks: [
      { t: "h", text: tt("🏅 Your badges · 7 of 48") },
      { t: "meta", items: [tt("🌅 Early Bird"), tt("👟 First Steps"), tt("💧 Hydration Hero"), tt("🦉 Night Owl"), tt("🥗 Veggie Week"), tt("🔥 3-Day Streak"), tt("📅 Weekend Warrior")], colors: ["#B45309", "#047857", "#0369A1", "#4338CA", "#15803D", "#DC2626", "#7C3AED"] },
      { t: "sub", text: tt("Locked") },
      { t: "list", items: [tt("🔒 Perfect Week · log every day for 7 days"), tt("🔒 Top 3 · finish a week in the top 3 of your league"), tt("🔒 Marathon Month · 30-day streak")] },
    ] },
    log: { title: tt("Log activity"), section: "home", blocks: [
      { t: "h", text: tt("➕ Log activity") },
      { t: "form", fields: [tt("Activity"), tt("Minutes")], button: tt("Log it (+10 XP)"), msg: tt("+10 XP! 🚀 You're on fire! Only 290 XP to stay in Silver!") },
      back("home", tt("Back home")),
    ] },
  },
  footer: productFooter("HealthJourney"),
});

const WEEKS = ["w1", "w2", "w3", "w4"];
/** Variant B: a restrained activation logic with progress displays, milestones and confirming feedback. */
export const hjB = (): PlatformCfg => ({
  name: "HealthJourney",
  start: "home",
  color: "#0F766E",
  phone: true,
  nav: [{ label: tt("My plan"), go: "home" }, { label: tt("Milestones"), go: "miles" }],
  pages: {
    home: { title: tt("My plan"), section: "home", blocks: [
      { t: "h", text: tt("Your plan: more movement in everyday life") },
      { t: "progress", label: tt("Weeks of your plan you have looked at"), of: WEEKS },
      { t: "p", text: tt("Four weeks, one small step each. Open the week you are in.") },
      { t: "links", items: WEEKS.map((w, i) => ({ label: tt(`Week ${i + 1}`), go: w, track: true })) },
      { t: "links", small: true, items: [{ label: tt("Log an activity"), go: "log" }] },
    ] },
    w1: { title: tt("Week 1"), section: "home", blocks: [{ t: "progress", label: tt("Your plan"), of: WEEKS }, { t: "h", text: tt("Week 1 · A walk on three days") }, { t: "p", text: tt("Milestone this week: three days with a walk of at least 15 minutes.") }, { t: "links", items: [{ label: tt("Next: week 2"), go: "w2" }] }] },
    w2: { title: tt("Week 2"), section: "home", blocks: [{ t: "progress", label: tt("Your plan"), of: WEEKS }, { t: "h", text: tt("Week 2 · Add a fourth day") }, { t: "note", title: tt("Milestone reached"), text: tt("You completed week 1: three active days.") }, { t: "links", items: [{ label: tt("Next: week 3"), go: "w3" }] }] },
    w3: { title: tt("Week 3"), section: "home", blocks: [{ t: "progress", label: tt("Your plan"), of: WEEKS }, { t: "h", text: tt("Week 3 · A little longer") }, { t: "p", text: tt("Milestone this week: one walk of 30 minutes.") }, { t: "links", items: [{ label: tt("Next: week 4"), go: "w4" }] }] },
    w4: { title: tt("Week 4"), section: "home", blocks: [{ t: "progress", label: tt("Your plan"), of: WEEKS }, { t: "h", text: tt("Week 4 · Keep it going") }, { t: "p", text: tt("Milestone: four active days in one week. After this, you choose your next plan.") }, back("home", tt("My plan"))] },
    miles: { title: tt("Milestones"), section: "miles", blocks: [{ t: "h", text: tt("Your milestones") }, { t: "list", items: [tt("Week 1 · three active days"), tt("Week 2 · four active days"), tt("Week 3 · one walk of 30 minutes"), tt("Week 4 · four active days, your own way")] }] },
    log: { title: tt("Log"), section: "home", blocks: [{ t: "h", text: tt("Log an activity") }, { t: "form", fields: [tt("Activity"), tt("Minutes")], button: tt("Save"), msg: tt("Saved. That is another active day towards this week's milestone.") }, back("home", tt("My plan"))] },
  },
  footer: productFooter("HealthJourney"),
});

/** Variant C: a narratively embedded user journey with motivating stages, but less visible classic rewards. */
export const hjC = (): PlatformCfg => ({
  name: "HealthJourney",
  start: "home",
  color: "#9A3412",
  phone: true,
  nav: [{ label: tt("Your journey"), go: "home" }],
  pages: {
    home: { title: tt("Your journey"), section: "home", blocks: [
      { t: "hero", kicker: tt("Your journey to more energy"), title: tt("Every healthy habit has a beginning."), text: tt("This journey has four stages. Each one is about what really happens when you start to move more: in your body, and in your week.") },
      { t: "p", text: tt("You are in stage 1.") },
      { t: "links", items: [{ label: tt("Stage 1 · Finding your time"), go: "s1" }, { label: tt("Stage 2 · The first two weeks"), go: "s2" }, { label: tt("Stage 3 · It gets easier"), go: "s3" }, { label: tt("Stage 4 · Making it yours"), go: "s4" }] },
    ] },
    s1: { title: tt("Stage 1"), section: "home", blocks: [{ t: "h", text: tt("Stage 1 · Finding your time") }, { t: "p", text: tt("The hardest part is not the exercise; it is finding a time that survives a busy week. Most people who keep going tie it to something they already do: after dropping the children at school, at lunch, after work.") }, { t: "form", fields: [tt("When could it fit in your week?")], button: tt("This is my time"), msg: tt("Good. That time is now part of your journey.") }, { t: "links", items: [{ label: tt("On to stage 2"), go: "s2" }] }] },
    s2: { title: tt("Stage 2"), section: "home", blocks: [{ t: "h", text: tt("Stage 2 · The first two weeks") }, { t: "p", text: tt("In the first two weeks your muscles may ache and it can feel like nothing changes. That is normal: your body is getting used to it. People who stop usually stop here, just before it gets easier.") }, { t: "links", items: [{ label: tt("On to stage 3"), go: "s3" }] }] },
    s3: { title: tt("Stage 3"), section: "home", blocks: [{ t: "h", text: tt("Stage 3 · It gets easier") }, { t: "p", text: tt("Around now stairs feel lighter and you recover faster after a walk. This is your body adapting. You might notice you sleep better.") }, { t: "links", items: [{ label: tt("On to stage 4"), go: "s4" }] }] },
    s4: { title: tt("Stage 4"), section: "home", blocks: [{ t: "h", text: tt("Stage 4 · Making it yours") }, { t: "p", text: tt("Now it is part of your week. Choose what comes next: more of the same, something new, or a goal with friends.") }, back("home", tt("Your journey"))] },
  },
  footer: productFooter("HealthJourney"),
});

/* ------------------------------------------------------------------ MoveWell today, a health provider's platform for exercise and prevention */

const mwPages = (): Record<string, PPage> => ({
  home: { title: tt("MoveWell"), section: "home", blocks: [
    { t: "h", text: tt("MoveWell") },
    { t: "p", mark: 1, text: tt("Goal status: active"), css: FAINT },
    { t: "links", grid: 2, mark: 4, items: [{ label: tt("Log activity"), go: "log" }, { label: tt("Activity history"), go: "history" }, { label: tt("My goal"), go: "goal" }, { label: tt("Content library"), go: "library" }, { label: tt("Settings"), go: "settings" }] },
  ] },
  log: { title: tt("Log activity"), section: "home", blocks: [
    { t: "h", text: tt("Log activity") },
    { t: "form", mark: 2, fields: [tt("Activity type"), tt("Duration (min)"), tt("Date")], button: tt("Submit"), msg: tt("Entry stored.") },
    back("home", tt("Home")),
  ] },
  synced: { title: tt("Sync"), section: "home", blocks: [
    { t: "p", mark: 6, text: tt("Sync completed (status 200). Record ID MW-48211 written to activity log.") },
    back("home", tt("Home")),
  ] },
  history: { title: tt("Activity history"), section: "home", blocks: [
    { t: "h", text: tt("Activity history") },
    { t: "table", mark: 5, head: [tt("Date"), tt("Type"), tt("Duration (min)"), tt("Record ID")], rows: [["03.10.", tt("Walking"), "30", "MW-47702"], ["05.10.", tt("Cycling"), "45", "MW-47851"], ["08.10.", tt("Back exercises"), "15", "MW-48016"], ["10.10.", tt("Walking"), "35", "MW-48211"]] },
    { t: "links", small: true, items: [{ label: tt("Sync with device"), go: "synced" }, { label: tt("Home"), go: "home" }] },
  ] },
  goal: { title: tt("My goal"), section: "home", blocks: [
    { t: "h", text: tt("My goal") },
    { t: "table", mark: 3, head: [tt("Field"), tt("Value")], rows: [[tt("Goal"), tt("More stamina")], [tt("Start date"), "01.10."], [tt("Duration"), tt("open-ended")], [tt("Status"), tt("active")]] },
    { t: "form", fields: [tt("Change goal")], button: tt("Update"), msg: tt("Goal updated.") },
    back("home", tt("Home")),
  ] },
  library: { title: tt("Content library"), section: "home", blocks: [
    { t: "h", text: tt("Content library") },
    { t: "p", text: tt("Reviewed by our medical advisory board.") },
    { t: "cards", items: [
      { title: tt("Why a short walk after meals helps"), text: tt("What ten minutes of walking does to blood sugar, explained by our doctors."), tag: tt("Article"), meta: tt("5 min read"), go: "art1" },
      { title: tt("Back exercises for desk workers"), text: tt("Six exercises with video, safe for beginners."), tag: tt("Video"), meta: tt("12 min"), go: "art1" },
      { title: tt("Building stamina safely"), text: tt("How to increase step by step without overdoing it."), tag: tt("Guide"), meta: tt("8 min read"), go: "art1" },
    ] },
  ] },
  art1: { title: tt("Article"), section: "home", blocks: [
    { t: "h", text: tt("Why a short walk after meals helps") },
    { t: "p", text: tt("After a meal, your muscles can take up sugar from the blood. A walk of about ten minutes uses that window. Our medical advisory board recommends it especially for people who sit a lot.") },
    back("library", tt("Content library")),
  ] },
  settings: { title: tt("Settings"), section: "home", blocks: [{ t: "toggle", label: tt("Notifications"), on: tt("Notifications on."), off: tt("Notifications off.") }, back("home", tt("Home"))] },
});

/** MoveWell today: faint progress, successes hardly fed back, no stages, a functional journey, no link between development and use, technical messages. */
export const moveWell = (): PlatformCfg => ({ name: "MoveWell", start: "home", color: "#1E5B8A", phone: true, nav: [{ label: tt("Home"), go: "home" }, { label: tt("History"), go: "history" }, { label: tt("Library"), go: "library" }], pages: mwPages(), footer: productFooter("MoveWell") });

/* ------------------------------------------------------------------ The provider's customer portal and service offer (Route 2) */

/**
 * The brief of Route 2: an app (MoveWell), a customer portal and a digital service offer; many start, only some stay; an internal debate about more gamification.
 * Case assumption (marked “Clear” in the brief): the portal holds the member's programme and documents; the service offer includes coaching calls and a hotline.
 */
export const mwPortal = (): PlatformCfg => ({
  name: "MoveWell · Member portal",
  start: "home",
  color: "#21445F",
  nav: [{ label: tt("Overview"), go: "home" }, { label: tt("Documents"), go: "docs" }],
  pages: {
    home: { title: tt("Overview"), section: "home", blocks: [
      { t: "h", text: tt("Your prevention programme") },
      { t: "table", head: [tt("Programme"), tt("Status")], rows: [[tt("Movement and stamina"), tt("active")], [tt("Healthy back"), tt("not started")]] },
      { t: "links", items: [{ label: tt("Documents"), go: "docs" }, { label: tt("Book a coaching call"), go: "coach" }] },
    ] },
    docs: { title: tt("Documents"), section: "docs", blocks: [{ t: "list", items: [tt("Programme terms.pdf"), tt("Participation confirmation.pdf"), tt("Privacy notice.pdf")] }, back("home", tt("Overview"))] },
    coach: { title: tt("Coaching"), section: "home", blocks: [{ t: "form", fields: [tt("Preferred date"), tt("Topic")], button: tt("Request"), msg: tt("Request received. Reference CO-3317.") }, back("home", tt("Overview"))] },
  },
  footer: productFooter("MoveWell"),
});

export const mwService = (): PlatformCfg => ({
  name: "MoveWell · Service",
  start: "home",
  color: "#3F5168",
  nav: [{ label: tt("Service"), go: "home" }],
  pages: {
    home: { title: tt("Service"), section: "home", blocks: [
      { t: "h", text: tt("How can we help?") },
      { t: "links", items: [{ label: tt("Coaching calls"), go: "coaching" }, { label: tt("Hotline"), go: "hotline" }, { label: tt("Frequently asked questions"), go: "faq" }] },
    ] },
    coaching: { title: tt("Coaching calls"), section: "home", blocks: [{ t: "p", text: tt("A prevention coach calls you for 20 minutes to talk about your goal. Book through the member portal.") }, back("home", tt("Service"))] },
    hotline: { title: tt("Hotline"), section: "home", blocks: [{ t: "p", text: tt("Monday to Friday, 8 am to 6 pm.") }, back("home", tt("Service"))] },
    faq: { title: tt("FAQ"), section: "home", blocks: [{ t: "faq", items: [{ q: tt("How do I log an activity?"), a: tt("Open the app and choose Log activity.") }, { q: tt("Can I change my goal?"), a: tt("Yes, under My goal in the app.") }] }, back("home", tt("Service"))] },
  },
  footer: productFooter("MoveWell"),
});
