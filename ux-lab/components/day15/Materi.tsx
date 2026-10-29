"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day15/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day15/materials";
import { tt } from "@/lib/lang";

/** Day 15 · the study cards of Materi A and B, with the references of each block (the simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["holmqvist2011", "duchowski2017", "just1980", "sitaram2017", "wolpaw2002", "tobii2019", "ico2023", "ienca2017", "gibbons2018"],
  refsB: ["ico2023", "tobii2019", "sitaram2017", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Eye-tracking, neurofeedback and BCI: what is measured, what it means, how mature it is, research or product, and ethics"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Tessel, a made-up bank, so the task is never answered for you. The first picture is a gaze recording you can replay and read three ways; nothing on this page uses your camera."),
    headB: tt("Neuro-based UX as a leadership task: architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop asking what can be measured and start deciding what the company wants to understand, which tracks and rules hold, who approves and who translates, and what to decide while evidence is thin. Each picture uses Tessel, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
