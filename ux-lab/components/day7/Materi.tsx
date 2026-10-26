"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day7/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day7/materials";
import { tt } from "@/lib/lang";

/** Day 7 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["norman2004", "damasio1994", "kahneman1993", "hassenzahl2010", "iso9241210", "walter2011", "norman2013", "nielsen1994", "mathur2019", "fogg2003", "lindgaard2006", "gibbons2018"],
  refsB: ["norman2004", "walter2011", "hassenzahl2010", "mathur2019", "fogg2003", "gibbons2018", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Emotional bonding: what feelings do, the emotional factors, where feelings come from, when emotion turns against use, and trust"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses Moss & Pine, a made-up garden centre, and its people, so the task is never answered for you."),
    headB: tt("Emotional UX as a leadership task: architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop polishing messages and start deciding how every touchpoint should feel, which conflicts to settle, who owns the tone, and what to decide when data on feelings is missing. Each diagram uses Moss & Pine, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
