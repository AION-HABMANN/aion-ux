"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day12/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day12/materials";
import { tt } from "@/lib/lang";

/** Day 12 · the study cards of Materi A and B, with the references of each block (the simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["holmes2018", "wcag22", "bda2023", "eaa2019", "wad2016", "gibbons2018"],
  refsB: ["holmes2018", "eaa2019", "wad2016", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Accessibility: who is left out, barriers in perception, interaction and language, and what the standard and the law ask"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Greenway, a made-up online grocer, and its customers, so the task is never answered for you. The pictures show the real thing: a contrast ratio computed as you slide, a form you test with the Tab key, an error message you trigger yourself."),
    headB: tt("Accessibility as a leadership task: quality, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop repairing single barriers and start deciding what participation every service guarantees, where barriers are fixed once, who owns the target and can stop a release, and what to decide when the complaints are not sorted. Each picture uses Greenway, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
