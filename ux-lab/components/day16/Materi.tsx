"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day16/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day16/materials";
import { tt } from "@/lib/lang";

/** Day 16 · the study cards of Materi A and B, with the references of each block (the simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["houde1997", "buchenau2000", "cooper1990", "witmer1998", "kennedy1993", "meta2025", "stilgoe2013", "ec2026", "eu2024aiact", "argyris1978", "gibbons2018"],
  refsB: ["stilgoe2013", "cooper1990", "ec2026", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Immersive prototyping and future strategy: the ladder, testing, ethics, the portfolio, and when not to scale"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Fernwood, a made-up hotel chain, so the task is never answered for you. The AR corridor can be stress-tested: add a crowd, dim the light, drop the signal."),
    headB: tt("Future-proof UX as a leadership task: architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3, and the last of the course. You stop judging single technologies and start deciding how innovation is evaluated, scaled, paused and stopped, who owns each decision, and what to decide while data is incomplete. Each picture uses Fernwood, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
