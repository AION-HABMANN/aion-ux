"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day3/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day3/materials";
import { tt } from "@/lib/lang";

/** Day 3 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["elliot2014", "labrecque2012", "mehta2009", "ware2012", "wcag22", "nielsen1994", "rello2016", "dyson2004", "beier2012", "bringhurst2004", "pernice2017", "gibbons2018"],
  refsB: ["frost2016", "nielsen1994", "labrecque2012", "wcag22", "gibbons2018", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Colour, typography and readability: what colour does, functional colour, readable type, typographic hierarchy, and how to weigh a measure"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses Kettle & Co, a made-up online grocery shop, and its people, so the task is never answered for you."),
    headB: tt("Colour and type as strategic decisions: a design logic, the conflicts between brand and usability, and who owns the standards"),
    leadB: tt("Three cards for Level 3. You stop choosing colours and fonts and start deciding the rules a whole company uses, which conflicts to settle, who owns the visual standards, and what to decide when data is incomplete. Each diagram uses Kettle & Co, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
