/**
 * Mentor-only worked answers (CLAUDE.md #23): the model answer, why it is that, what a good answer must contain and the typical mistakes.
 * `example` is the learner-facing worked example on a different company (shown by ExampleAnswer); `answer` is the real model text and is
 * shown to the mentor only. The guides themselves are built per day (lib/dayN/guides.ts).
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };
