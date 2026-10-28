import type { GlossEntry } from "@/data/glossary";

/**
 * Day 9 · the plain-language glossary entries for the terms Day 9 adds (CLAUDE.md #19). Activation, feedback, milestone, the goal-gradient effect and dark patterns are
 * explained on earlier days and not repeated.
 */
export const GLOSSARY_D9: GlossEntry[] = [
  { id: "gamification", title: "Gamification", match: ["gamification", "gamified"], plain: "Using the structure of games (a goal, a visible position, feedback, recognition, a challenge) in something that is not a game.", from: "Deterding et al. 2011" },
  { id: "playful-design", title: "Playful design", match: ["playful design", "playful tone"], plain: "Changing only the look and tone of a product to feel light and fun (colours, round shapes, cheerful words), without adding goals or feedback." },
  { id: "game-mechanic", title: "Game mechanic", match: ["game mechanics", "game mechanic", "activation mechanics", "activation mechanic"], plain: "One visible element borrowed from games, such as points, a badge, a level, a streak or a ranking." },
  { id: "lever", title: "Motivation lever", match: ["motivation mechanisms", "motivation lever", "levers"], plain: "What a mechanic actually pulls on in people: reward, a feeling of competence, self-efficacy, social validation, the experience of progress, or a trigger to act." },
  { id: "retention", title: "Retention", match: ["long-term retention", "retention", "user retention"], plain: "People coming back and staying active over time, not only trying something once." },
  { id: "self-efficacy", title: "Self-efficacy", match: ["self-efficacy"], plain: "Believing you can do something; it grows mostly from your own experience of succeeding.", from: "Bandura 1977" },
  { id: "intrinsic", title: "Intrinsic motivation", match: ["intrinsic motivation", "intrinsically motivated"], plain: "Doing something because it is worth it to you, not for a reward from outside.", from: "Ryan & Deci 2000" },
  { id: "overjustification", title: "Overjustification effect", match: ["overjustification"], plain: "When a reward is attached to something people already do gladly, they start doing it for the reward, and stop when the reward stops.", from: "Lepper et al. 1973" },
  { id: "streak", title: "Streak", match: ["streaks", "streak"], plain: "A count of days in a row on which someone did something; it rewards regularity and punishes a single missed day." },
  { id: "badge", title: "Badge", match: ["badges", "badge"], plain: "A small symbol that marks something someone has done; it means something only while it is rare." },
  { id: "leaderboard", title: "Ranking (leaderboard)", match: ["leaderboards", "leaderboard", "rankings", "ranking"], plain: "A list that orders people by points or results; it motivates those near the top and can shame those near the bottom.", from: "Festinger 1954" },
  { id: "reward-inflation", title: "Reward inflation", match: ["reward inflation", "belohnungsinflation"], plain: "Ever more and bigger rewards for less, until no single reward means anything." },
  { id: "overstimulation", title: "Overstimulation", match: ["overstimulation", "stimulus overload"], plain: "Too many signals at once (badges, sounds, pop-ups, counters), so people stop noticing any of them or feel pushed." },
  { id: "loss-aversion", title: "Loss aversion", match: ["loss aversion"], plain: "People feel a loss more strongly than an equal gain; “don't lose your streak” uses it.", from: "Tversky & Kahneman 1991" },
  { id: "activation-architecture", title: "Activation architecture", match: ["activation architecture", "retention architecture", "activation and retention architecture"], plain: "A company's whole plan for why people start and keep using its products: a vision, principles on which levers it uses, shared patterns and an owner." },
];
