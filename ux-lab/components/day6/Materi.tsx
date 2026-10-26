"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day6/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day6/materials";
import { tt } from "@/lib/lang";

/** Day 6 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["wertheimer1923", "palmer1992", "wagemans2012", "ware2012", "krug2014", "nielsen1994", "nielsen2006", "sweller1988", "iso9241110", "frost2016", "kholmatova2017", "gibbons2018"],
  refsB: ["kholmatova2017", "frost2016", "curtis2010", "nielsen2006", "gibbons2018", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Gestalt, hierarchy and progressive disclosure: how people see groups, what comes first, what to show now, one pattern per task, and UX laws in components"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses Seabird Ferries, a made-up ferry operator, and its people, so the task is never answered for you."),
    headB: tt("Design systems and governance: consistency, scale and steering, the conflicts between teams, and who owns the system"),
    leadB: tt("Three cards for Level 3. You stop correcting pages and start deciding the system every team builds from, which conflicts to settle, who owns it, and what to decide when data is incomplete. Each diagram uses Seabird Ferries, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
