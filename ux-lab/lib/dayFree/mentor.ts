import { blocksOf, emptyFreeRoute, fieldsOf } from "@/lib/dayFree/model";
import type { FreeField, FreeSpec } from "@/lib/dayFree/spec";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import type { MentorGuide } from "@/lib/mentorGuide";
import type { FreeRoute } from "@/store/dayTypesFree";

/**
 * The model answers of a free-form day (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, in both layouts of a list or an
 * assessment (the learner's chosen layout is not changed), so after one fill every missing list is empty and both documents export at once. The texts follow the
 * site's language because the spec is resolved at read time. A different, well-reasoned answer also exports (#38).
 */
export function freeRouteKey(spec: FreeSpec, route: 1 | 2): FreeRoute {
  const r = emptyFreeRoute(fieldsOf(spec, route));
  for (const f of fieldsOf(spec, route)) {
    if (f.kind === "text") {
      r.text[f.id] = f.model;
      if (f.table) r.rows[f.id] = f.table.model.map((m) => ({ ...m }));
    } else if (f.kind === "lists") {
      f.lists.forEach((l) => (r.text[l.id] = l.model));
      r.rows[f.id] = f.table.model.map((m) => ({ ...m }));
    } else if (f.kind === "assess") {
      r.assessText[f.id] = { ...f.modelText };
      r.assessRows[f.id] = Object.fromEntries(Object.entries(f.modelRows).map(([k, v]) => [k, { ...v }]));
    } else r.picks[f.id] = f.model;
  }
  return r;
}

/** Mentor-only worked answers (CLAUDE.md #23): `answer` is the same text the fill enters. `example` is the learner-facing example on another company. */
export function guideOf(spec: FreeSpec, id: string): MentorGuide | undefined {
  for (const b of [...blocksOf(spec, 1), ...blocksOf(spec, 2)]) {
    for (const f of b.fields) {
      if (f.kind === "text" && f.id === id) return { title: `${b.id} · ${f.label}`, answer: f.model, example: f.guide.example, why: f.guide.why, lookFor: f.guide.lookFor, pitfalls: f.guide.pitfalls };
      if (f.kind === "lists") {
        const l = f.lists.find((x) => x.id === id);
        if (l) return { title: `${b.id} · ${l.label}`, answer: l.model, example: l.guide.example, why: l.guide.why, lookFor: l.guide.lookFor, pitfalls: l.guide.pitfalls };
      }
      if (f.kind === "assess" && f.id === id) return { title: `${b.id} · ${f.label}`, answer: Object.entries(f.modelText).map(([k, v]) => `${k}: ${v}`).join(" "), example: f.guide.example, why: f.guide.why, lookFor: f.guide.lookFor, pitfalls: f.guide.pitfalls };
    }
  }
  return undefined;
}

/** The answer key of a fixed choice: the expected pick and a reason per option, with a teaching note that a different, reasoned choice exports (#7, #38). */
export function pickKey(f: Extract<FreeField, { kind: "pick" }>): AnswerKeyBlock {
  return {
    title: f.keyTitle,
    expected: f.options.find((o) => o.expected)?.label ?? "",
    options: f.options.map((o) => ({ label: o.label, expected: o.expected, why: o.why })),
    teachingNote: f.teaching,
  };
}
