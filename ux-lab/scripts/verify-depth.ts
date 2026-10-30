/**
 * verify:depth · the depth gate of UX-STANDARD 2.17, for the parts a script can check.
 * All days: every source a card cites exists in the reference list, and no two days define the same source key (the lists are merged with a spread, so a
 * duplicate would silently replace the other). Days in DEPTH_CHECKED (the days whose Materi was matched to the plan's Wissen): each card cites at least
 * two sources, and each Materi block cites at least eight. What a script cannot check, the coverage map against the plan and the verified numbers, stays in the
 * day's README (2.17).
 */
import { readFileSync, readdirSync } from "node:fs";
import { REFERENCES } from "../data/references";

const DEPTH_CHECKED = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let fail = 0;
const ok = (c: boolean, m: string) => { console.log(`${c ? "ok  " : "FAIL"}  ${m}`); if (!c) fail++; };

const owner: Record<string, number[]> = {};
for (const f of readdirSync("data/refs").filter((x) => /^day\d+\.ts$/.test(x))) {
  const day = Number(f.match(/\d+/)![0]);
  for (const m of readFileSync(`data/refs/${f}`, "utf8").matchAll(/^  (\w+): r\(/gm)) (owner[m[1]] ??= []).push(day);
}
const dup = Object.entries(owner).filter(([, d]) => d.length > 1);
ok(dup.length === 0, `no source key is defined on two days${dup.length ? ": " + dup.map(([k, d]) => `${k} (days ${d.join(", ")})`).join("; ") : ""}`);

for (let day = 1; day <= 16; day++) {
  const src = readFileSync(`components/day${day}/Cards.tsx`, "utf8");
  const cards = [...src.matchAll(/<MaterialCard\s+id="([AB]\d)"[\s\S]*?sources=\{\[([^\]]*)\]\}/g)].map((m) => ({ id: m[1], keys: [...m[2].matchAll(/"(\w+)"/g)].map((k) => k[1]) }));
  const missing = cards.flatMap((c) => c.keys.filter((k) => !(k in REFERENCES)).map((k) => `${c.id}:${k}`));
  ok(cards.length === 8 && missing.length === 0, `day ${day}: 8 cards, every cited source exists${missing.length ? " · missing " + missing.join(", ") : ""}`);
  if (DEPTH_CHECKED.includes(day)) {
    ok(cards.every((c) => c.keys.length >= 2), `day ${day}: every card cites at least two sources`);
    for (const b of ["A", "B"]) {
      const n = new Set(cards.filter((c) => c.id.startsWith(b)).flatMap((c) => c.keys)).size;
      ok(n >= 8, `day ${day}: Materi ${b} cites ${n} different sources (at least 8)`);
    }
  }
}
if (fail) { console.error(`\n${fail} check(s) failed`); process.exit(1); }
console.log("\nAll checks passed");
