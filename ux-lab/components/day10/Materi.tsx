"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day10/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day10/materials";
import { tt } from "@/lib/lang";

/** Day 10 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["horvitz1999", "amershi2019", "pariser2011", "parasuraman1997", "lee2004", "sundar2020", "gibbons2018"],
  refsB: ["amershi2019", "lee2004", "pariser2011", "eu2024aiact", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Intelligent interfaces: the kinds of system, how AI guides and personalises, what it gives and how it goes wrong, why people need to see why, change and undo, and why data and situation decide"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Northline Rail, a made-up rail company with an app, and its people, so the task is never answered for you. The pictures show the real thing: one delay handled three ways, a message that gets too personal, a suggestion you can or cannot question."),
    headB: tt("Intelligent UX as a leadership task: architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop choosing AI features and start deciding what kind of support the company gives, how deep personalisation goes in each journey, who answers for it, and what to decide when nobody knows how often the system is wrong. Each picture uses Northline Rail, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
