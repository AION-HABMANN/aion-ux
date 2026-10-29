"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day14/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day14/materials";
import { tt } from "@/lib/lang";

/** Day 14 · the study cards of Materi A and B, with the references of each block (the simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["milgram1994", "slater2016", "lavie2005", "rebenitsch2016", "apple2026", "govuk2026", "gibbons2018"],
  refsB: ["govuk2026", "apple2026", "slater2016", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Immersive technologies: from screen to space, attention and load, chances and risks, value against fascination, and ethics"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Brewline, a made-up maker of coffee machines, so the task is never answered for you. The pictures are real 3D: a machine you can turn, AR labels on its parts, and on an AR phone you can place it on your own table."),
    headB: tt("Future technologies as a leadership task: architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop picking trend technologies and start deciding which immersive value the company wants, how ideas are scored and gated, who may stop a pilot, and what to decide before any test data exists. Each picture uses Brewline, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
