import { FreeTask1, FreeTask2 } from "@/components/dayFree/FreeTask";
import type { DayConfig } from "@/components/day/DayPages";
import type { NavGroup, NavItem } from "@/components/chrome/PageNav";
import type { DayMaterials } from "@/data/materialRegistry";
import type { RailSection } from "@/data/materialTypes";
import type { RouteNo } from "@/data/course";
import { blockKey } from "@/lib/dayFree/model";
import { freeDossier, freeTaskBlocks, route1Minutes, route2Minutes } from "@/lib/dayFree/progress";
import type { FreeKit, FreeSpec } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Turns a free-form day's spec, its kit (study cards, pictures and simulations) and its materials into the `DayConfig` the shared page frames read
 * (components/day/DayPages.tsx): the rail, the page map, the route cards and the two tasks, built the same way for every free-form day.
 */
export function makeFreeConfig(spec: FreeSpec, kit: FreeKit, mats: DayMaterials): DayConfig {
  const day = spec.day;
  const cards = (block: "A" | "B"): NavItem[] => mats.MATERIALS.filter((m) => m.block === block).map((m) => ({ id: mats.materialAnchorId(m.id), short: m.id, title: m.title, done: { card: `d${day}:${m.id}` }, optional: m.optional }));
  const blk = (id: string, title: string): NavItem => ({ id: `block-${id.replace(".", "-")}`, short: id, title: title.replace(/^Block \d\.\d · /, ""), done: { block: blockKey(id) as never }, optional: false });
  const m1 = route1Minutes(spec);
  const m2 = route2Minutes(spec);

  const railSections = (route: RouteNo): RailSection[] =>
    route === 1
      ? [
          { id: "materi-a", label: "Materi A", sub: spec.route1.materiSub, minutes: 60 },
          { id: "task-1", label: "Task 1", sub: tt("UX Analysis File · one case", "UX Analysis File · ein Fall"), minutes: m1 },
        ]
      : [
          { id: "materi-b", label: "Materi B", sub: spec.route2.materiSub, minutes: 60 },
          { id: "task-2", label: "Task 2", sub: `UX Strategy Memo · ${spec.role}`, minutes: m2 },
        ];

  const pageNav = (route: RouteNo): NavGroup[] =>
    route === 1
      ? [
          { label: "Materi A", items: cards("A") },
          {
            label: "Task 1",
            items: [
              { id: "case-brief", short: tt("Case", "Fall"), title: spec.brief1.heading },
              ...spec.blocks1.map((b) => blk(b.id, b.title)),
              { id: "export-l1l2", short: "Export", title: tt("Export the UX Analysis File", "UX Analysis File exportieren") },
            ],
          },
        ]
      : [
          { label: "Materi B", items: cards("B") },
          {
            label: "Task 2",
            items: [
              { id: "task-2", short: tt("Case", "Fall"), title: spec.brief2.heading },
              blk(spec.block2.id, spec.block2.title),
              { id: "memo-panel", short: tt("Memo", "Memo"), title: tt("The memo as it builds", "Das Memo, wie es entsteht") },
              { id: "export-l3", short: "Export", title: tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren") },
            ],
          },
        ];

  const routeCard = (route: RouteNo) =>
    route === 1
      ? {
          title: spec.route1.title,
          blurb: spec.route1.blurb,
          plan: [
            { label: tt("Materi A · five cards (facilitator-led)", "Materi A · fünf Karten (moderiert)"), minutes: 60 },
            { label: tt(`Task 1 · UX Analysis File, blocks ${spec.blocks1.map((b) => b.id).join(", ")}`, `Task 1 · UX Analysis File, Blöcke ${spec.blocks1.map((b) => b.id).join(", ")}`), minutes: m1 },
          ],
          optional: "",
          export: "UX Analysis File",
        }
      : {
          title: spec.route2.title,
          blurb: spec.route2.blurb,
          plan: [
            { label: tt("Materi B · three cards (facilitator-led)", "Materi B · drei Karten (moderiert)"), minutes: 60 },
            { label: tt(`Task 2 · UX Strategy Memo, block ${spec.block2.id}`, `Task 2 · UX Strategy Memo, Block ${spec.block2.id}`), minutes: m2 },
          ],
          optional: "",
          export: "UX Strategy Memo",
        };

  return {
    n: day,
    heading: () => spec.heading,
    intro: spec.intro as unknown as DayConfig["intro"],
    routeCard,
    railSections,
    pageNav,
    MateriA: kit.MateriA,
    MateriB: kit.MateriB,
    Task1: () => <FreeTask1 spec={spec} kit={kit} />,
    Task2: () => <FreeTask2 spec={spec} kit={kit} />,
    progress: (p, route) => freeDossier(p, spec, mats.MATERIALS, route),
    taskBlocks: (p) => freeTaskBlocks(p, spec),
    routeHeading: (route) => {
      const x = route === 1 ? spec.route1 : spec.route2;
      return { kicker: x.kicker, h1: x.h1, order: x.order };
    },
  };
}
