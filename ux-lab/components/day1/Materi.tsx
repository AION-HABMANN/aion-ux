"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day1/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day1/materials";
import { tt } from "@/lib/lang";

/** Day 1 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["normanNielsen", "iso9241210", "norman2013", "tractinsky2000", "ittiKoch2001", "corbetta2002", "treisman1980", "krug2014", "nielsen1994", "sweller1988", "lindgaard2006", "brehm1966", "fogg2003", "kahneman2011", "gibbons2018"],
  refsB: ["norman2013", "kahneman2011", "normanNielsen", "tractinsky2000", "krug2014", "gibbons2018", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Perception and effect: the basic words, how people see, what they expect, what they feel before they think, and how to weigh a measure"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses Nordwind, a made-up travel-booking app, and its people, so the task is never answered for you."),
    headB: tt("Design steers behaviour and decision: a Neuro-UX strategy, the conflicting goals, and accountable decisions under uncertainty"),
    leadB: tt("Three cards for Level 3. You stop judging single screens and start deciding which effect a whole company should create, which conflicts to settle, who decides, and what to decide when data is missing. Each diagram uses Nordwind, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
