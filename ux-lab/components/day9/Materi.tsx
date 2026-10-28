"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day9/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day9/materials";
import { tt } from "@/lib/lang";

/** Day 9 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["deterding2011", "hamari2014", "nicholson2015", "ryan2000", "bandura1977", "festinger1954", "deci1999", "tversky1991", "kivetz2006", "lepper1973", "gibbons2018"],
  refsB: ["nicholson2015", "ryan2000", "hamari2014", "tversky1991", "festinger1954", "deci1999", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Gamification: what it is, why people react, the tools and how they backfire, story and game together, and credible gamification in serious fields"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Brightwater Savings, a made-up savings bank, and its people, so the task is never answered for you. The pictures show the real thing: a playful screen, a quest, a loud screen with eight reward signals."),
    headB: tt("Activation as a leadership task: architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop choosing badges and start deciding which motivation every product should create, which levers the company uses and which not, who answers for a mechanic, and what to decide when nobody knows why people leave. Each picture uses Brightwater Savings, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
