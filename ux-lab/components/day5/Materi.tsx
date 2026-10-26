"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day5/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day5/materials";
import { tt } from "@/lib/lang";

/** Day 5 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["fitts1954", "mackenzie1992", "parhi2006", "hoober2013", "wcag22", "hick1952", "hyman1953", "iyengar2000", "nielsen2006", "miller1956", "cowan2001", "gobet2001", "nielsen1994", "yablonski2020", "sweller1988", "gibbons2018"],
  refsB: ["yablonski2020", "frost2016", "wcag22", "iyengar2000", "gibbons2018", "nielsen2006", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Fitts, Hick and Miller in practice: target size and the thumb, fewer and staged choices, chunking, the three laws together, and how to weigh a measure"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses Ticketo, a made-up cinema and event ticket app, and its people, so the task is never answered for you."),
    headB: tt("Interaction as an architecture of effect: the laws as standards, the conflict between features and speed, and who owns the interaction standards"),
    leadB: tt("Three cards for Level 3. You stop fixing single buttons and start deciding the standards a whole company follows, which conflicts to settle, who owns them, and what to decide when data is incomplete. Each diagram uses Ticketo, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
