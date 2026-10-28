"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day11/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day11/materials";
import { tt } from "@/lib/lang";

/** Day 11 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["cohen2004", "pearl2016", "norman2013", "cowan2001", "sweller1988", "houde1997", "kelley1984", "gibbons2018"],
  refsB: ["pearl2016", "norman2013", "cowan2001", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Voice interfaces: what voice can do, a good voice dialogue, neuro-design, prototyping and testing, and where voice belongs"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Ladle, a made-up cooking app with a voice mode, and its people, so the task is never answered for you. The pictures show the real thing: the phones speak, a spoken menu tests your memory, and a busy answer really is busy."),
    headB: tt("Voice and AI as a leadership task: architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop choosing voice features and start deciding which relief voice gives, where it is used and where not, who owns its principles and tests, and what to decide when test data is thin. Each picture uses Ladle, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
