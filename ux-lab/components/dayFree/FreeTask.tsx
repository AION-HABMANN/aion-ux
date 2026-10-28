"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { CaseKnown } from "@/components/ui/CaseKnown";
import { FacilitatorCard } from "@/components/ui/FacilitatorCard";
import { Field } from "@/components/ui/Field";
import { FormOrTable, GridTable, CellField, LayoutLink } from "@/components/ui/FormOrTable";
import type { TableGuide } from "@/components/ui/FormOrTable";
import { FrameTable, RowsTable } from "@/components/ui/RowsTable";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { routeHref } from "@/data/course";
import { fieldDomId, freeMissing, itemDomId, rowDomId } from "@/lib/dayFree/missing";
import { freeAnalysisBody, freeMemoBody } from "@/lib/dayFree/exportDoc";
import { guideOf, pickKey } from "@/lib/dayFree/mentor";
import { blocksOf, listCount, sliceOf } from "@/lib/dayFree/model";
import { route1Minutes, route2Minutes } from "@/lib/dayFree/progress";
import type { BlockSpec, Brief, FreeField, FreeKit, FreeSpec, GuideSpec, ListsField } from "@/lib/dayFree/spec";
import { DOC_CSS } from "@/lib/exportDoc";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { useJumpTo } from "@/lib/useJumpTo";
import { tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { FreeRoute } from "@/store/dayTypesFree";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/**
 * The two tasks of a free-form day (DL-STANDARD v1.1, CLAUDE.md #57), drawn from the day's spec: the plan's own questions as free answers, every block Core,
 * hidden facilitator cards for the plan rows without a deliverable, a quiet table link under every list or assessment, and the pictures and simulations the
 * day's kit plugs in through slots.
 */

type Ctx = { spec: FreeSpec; kit: FreeKit; route: 1 | 2 };

function useRoute(spec: FreeSpec, route: 1 | 2) {
  const key = `d${spec.day}`;
  const r = useStore((s) => (s as unknown as Record<string, { r1: FreeRoute; r2: FreeRoute }>)[key][route === 1 ? "r1" : "r2"]);
  const patchStd = useStore((s) => s.patchStd);
  const mentor = useStore((s) => s.mentorUnlocked);
  const patch = (p: Partial<FreeRoute> | ((s: FreeRoute) => Partial<FreeRoute>)) => patchStd(spec.day, route, p);
  return { r, patch, mentor };
}

const refsOf = (f: { refs?: { label: string; value: string; target: string; card?: string }[] }) =>
  f.refs?.map((x) => ({ label: x.label, value: x.value, target: x.target, before: x.card ? () => showCardPart(x.card as "A1", "rules") : undefined }));

/* ------------------------------------------------------------------ the case brief */

function CaseBrief({ spec, route }: { spec: FreeSpec; route: 1 | 2 }) {
  const b: Brief = route === 1 ? spec.brief1 : spec.brief2;
  const jump = useJumpTo();
  const { r: r1 } = useRoute(spec, 1);
  const pk = spec.pointer;
  const pickedField = pk ? spec.blocks1.find((x) => x.id === pk.block)?.fields.find((x) => x.id === pk.field) : undefined;
  const picked = pickedField && pickedField.kind === "pick" ? pickedField.options.find((o) => o.id === r1.picks[pickedField.id])?.label : undefined;
  const minutes = route === 1 ? route1Minutes(spec) : route2Minutes(spec);
  return (
    <section id={route === 1 ? "case-brief" : "task-2"} aria-labelledby={`case-h-${route}`} className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={`case-h-${route}`}>{b.heading}</h2>
        <span className="smallcaps">{b.readTime}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>{b.paragraph}</Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{b.conditions.title}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            {b.conditions.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">
            {b.runTitle} · {tt(`about ${minutes} min`, `ca. ${minutes} Min.`)}
          </p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            {b.run.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </div>
      </div>
      {route === 2 && pk && (
        <p className="text-caption text-ash">
          {picked ? (
            <>
              {pk.lead} <strong className="text-ink">{picked}</strong>.{" "}
              <button type="button" onClick={() => jump(`block-${pk.block.replace(".", "-")}`, routeHref(spec.day, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
                {pk.open}
              </button>
            </>
          ) : (
            pk.none
          )}
        </p>
      )}
      {b.known && <CaseKnown id={route === 1 ? "case-known" : "case-known-2"} title={b.known.title} columns={b.known.columns} note={b.known.note} />}
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{b.assumption}</p>
      </Callout>
    </section>
  );
}

/** The hidden facilitator cards that sit right after a case brief (the "if a participant asks" card; DL-STANDARD section 14). */
function CaseCards({ spec, after }: { spec: FreeSpec; after: "brief1" | "brief2" }) {
  return (
    <>
      {spec.cards
        .filter((c) => c.after === after)
        .map((c) => (
          <FacilitatorCard key={c.id} id={c.id} ariaLabel={c.ariaLabel} openLabel={c.openLabel} hideLabel={c.hideLabel} sections={c.sections} />
        ))}
    </>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

/** The guide of a table as the shared table component wants it: the spec's hints and example plus the course-wide title and example label (section 15). */
function guideOf2(g: GuideSpec | undefined): TableGuide | undefined {
  if (!g) return undefined;
  return {
    title: tt("How to fill this table", "So füllen Sie diese Tabelle aus"),
    exampleLabel: tt("Example from another company, not this case", "Beispiel aus einem anderen Unternehmen, nicht aus diesem Fall"),
    hints: { first: "", ...g.hints },
    example: { first: g.example.first ?? "", cells: g.example.cells },
    suggest: g.suggest,
  };
}

/** The quiet link under a list, an assessment or a text that switches between boxes and a table; both layouts are kept (CLAUDE.md #57, section 15). */
function ModeLink({ mode, onMode, guided, back }: { mode: "text" | "table"; onMode: (m: "text" | "table") => void; guided: boolean; back?: string }) {
  return <LayoutLink mode={mode} onMode={onMode} guided={guided} backText={back ?? tt("Back to text boxes.", "Zurück zu Textfeldern.")} />;
}

/* ------------------------------------------------------------------ one field */

function FieldView({ ctx, f }: { ctx: Ctx; f: FreeField }) {
  const { spec, kit, route } = ctx;
  const { r, patch, mentor } = useRoute(spec, route);
  const slot = f.slot ? kit.slots[f.slot] : undefined;
  const q = f.qLabel;
  const setMode = (m: "text" | "table") => patch((s) => ({ modes: { ...s.modes, [f.id]: m } }));
  const head = (
    <>
      {slot && <div id={`slot-${f.slot}`}>{slot()}</div>}
      {q && <p className="smallcaps text-ash">{q}</p>}
    </>
  );

  if (f.kind === "text") {
    const g = guideOf(spec, f.id)!;
    const t = f.table;
    const mode = r.modes[f.id] ?? "text";
    const kit = <WritingHelp id={`${f.id}-kit`} refs={refsOf(f)} steps={f.steps} />;
    const setRows = (fn: (rows: Record<string, string>[]) => Record<string, string>[]) => patch((s) => ({ rows: { ...s.rows, [f.id]: fn(s.rows[f.id] ?? []) } }));
    const setCell = (i: number, k: string, v: string) => setRows((rows) => rows.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
    return (
      <>
        {head}
        {t && mode === "table" ? (
          t.kind === "rows" ? (
            <RowsTable
              id={fieldDomId(f.id)}
              label={f.label}
              help={t.help}
              cols={t.cols}
              rows={r.rows[f.id] ?? []}
              onCell={setCell}
              onAdd={() => setRows((rows) => [...rows, Object.fromEntries(t.cols.map((c) => [c.key, ""]))])}
              onRemoveLast={() => setRows((rows) => rows.slice(0, -1))}
              rowId={(i) => rowDomId(f.id, i)}
              guide={guideOf2(t.guide)!}
              numbered={t.numbered}
              orderHead={t.orderHead}
            >
              {kit}
            </RowsTable>
          ) : (
            <FrameTable
              id={fieldDomId(f.id)}
              label={f.label}
              help={t.help}
              head={t.head}
              rows={t.rows}
              cols={t.cols}
              values={r.rows[f.id] ?? []}
              onCell={setCell}
              rowId={(i) => rowDomId(f.id, i)}
              guide={guideOf2(t.guide)!}
            >
              {kit}
            </FrameTable>
          )
        ) : (
          <TextBox
            id={fieldDomId(f.id)}
            label={f.label}
            help={f.help}
            value={r.text[f.id] ?? ""}
            onChange={(v) => patch((s) => ({ text: { ...s.text, [f.id]: v } }))}
            min={f.min}
            rows={f.rows}
            placeholder={f.placeholder}
          >
            {kit}
          </TextBox>
        )}
        {t && <ModeLink mode={mode} onMode={setMode} guided back={tt("Back to one text box.", "Zurück zu einem Textfeld.")} />}
        <ExampleAnswer id={`${f.id}-example`} guide={g} />
        {mentor && <MentorGuide guide={g} />}
      </>
    );
  }

  if (f.kind === "pick") {
    return (
      <>
        {head}
        <Field id={fieldDomId(f.id)} label={f.label} help={f.help}>
          <OptionList<string>
            options={f.options.map((o) => ({ id: o.id, label: o.label }))}
            value={r.picks[f.id] ?? null}
            onChange={(id) => patch((s) => ({ picks: { ...s.picks, [f.id]: id } }))}
            label={f.optionsLabel}
            cols={f.cols ?? 1}
          />
        </Field>
        <AnswerKey block={pickKey(f)} />
      </>
    );
  }

  if (f.kind === "assess") {
    const g = guideOf(spec, f.id)!;
    const mode = r.modes[f.id] ?? "text";
    return (
      <>
        {head}
        <FormOrTable
          id={fieldDomId(f.id)}
          label={f.label}
          help={mode === "text" ? f.helpText : f.helpTable}
          mode={mode}
          onMode={setMode}
          items={f.items}
          cols={f.cols}
          text={r.assessText[f.id] ?? {}}
          rows={r.assessRows[f.id] ?? {}}
          onText={(id, v) => patch((s) => ({ assessText: { ...s.assessText, [f.id]: { ...s.assessText[f.id], [id]: v } } }))}
          onCell={(id, k, v) => patch((s) => ({ assessRows: { ...s.assessRows, [f.id]: { ...s.assessRows[f.id], [id]: { ...s.assessRows[f.id]?.[id], [k]: v } } } }))}
          rowId={(id) => itemDomId(f.id, id)}
          firstCol={f.firstCol}
          guide={guideOf2(f.tableGuide)}
        >
          <WritingHelp id={`${f.id}-kit`} refs={refsOf(f)} steps={f.steps} />
        </FormOrTable>
        <ExampleAnswer id={`${f.id}-example`} guide={g} />
        {mentor && <MentorGuide guide={g} />}
      </>
    );
  }

  return <ListsView ctx={ctx} f={f} r={r} patch={patch} mentor={mentor} head={head} setMode={setMode} />;
}

function ListsView({ ctx, f, r, patch, mentor, head, setMode }: { ctx: Ctx; f: ListsField; r: FreeRoute; patch: (p: (s: FreeRoute) => Partial<FreeRoute>) => void; mentor: boolean; head: React.ReactNode; setMode: (m: "text" | "table") => void }) {
  const { spec } = ctx;
  const mode = r.modes[f.id] ?? "text";
  const help = <WritingHelp id={`${f.id}-kit`} refs={refsOf(f)} steps={f.steps} />;
  return (
    <>
      {head}
      {mode === "text" ? (
        f.lists.map((l, i) => {
          const g = guideOf(spec, l.id)!;
          const c = listCount(f, i, r);
          return (
            <div key={l.id} className="space-y-3">
              <TextBox
                id={fieldDomId(l.id)}
                label={l.label}
                help={`${l.help} ${tt("You have", "Sie haben")} ${c} ${tt("of", "von")} ${f.n}.`}
                value={r.text[l.id] ?? ""}
                onChange={(v) => patch((s) => ({ text: { ...s.text, [l.id]: v } }))}
                rows={Math.max(4, f.n + 1)}
                placeholder={l.placeholder}
              >
                {i === 0 ? help : null}
              </TextBox>
              <ExampleAnswer id={`${l.id}-example`} guide={g} />
              {mentor && <MentorGuide guide={g} />}
            </div>
          );
        })
      ) : (
        <div className="space-y-3">
          <Field id={fieldDomId(f.id)} label={f.label} help={f.table.help}>
            <div className="space-y-2">
              <GridTable
                head={f.table.cols.map((c) => c.label)}
                hints={f.table.guide ? f.table.cols.map((c) => f.table.guide!.hints[c.key]) : undefined}
                example={f.table.guide ? f.table.cols.map((c) => f.table.guide!.example.cells[c.key]) : undefined}
                exampleLabel={tt("Example from another company, not this case", "Beispiel aus einem anderen Unternehmen, nicht aus diesem Fall")}
                rows={(r.rows[f.id] ?? []).map((row, i) => ({
                  id: rowDomId(f.id, i),
                  cells: f.table.cols.map((c) => (
                    <CellField
                      key={c.key}
                      value={row[c.key] ?? ""}
                      onChange={(v) => patch((s) => ({ rows: { ...s.rows, [f.id]: s.rows[f.id].map((x, j) => (j === i ? { ...x, [c.key]: v } : x)) } }))}
                      label={`${i + 1}: ${c.label}`}
                    />
                  )),
                }))}
              />
              {help}
            </div>
          </Field>
          {f.lists.map((l) => {
            const g = guideOf(spec, l.id)!;
            return (
              <div key={l.id} className="space-y-3">
                <ExampleAnswer id={`${l.id}-example`} guide={g} />
                {mentor && <MentorGuide guide={g} />}
              </div>
            );
          })}
        </div>
      )}
      <ModeLink mode={mode} onMode={setMode} guided={!!f.table.guide} />
    </>
  );
}

/* ------------------------------------------------------------------ one block */

function BlockView({ ctx, b, missing }: { ctx: Ctx; b: BlockSpec; missing: MissingEntry[] }) {
  const { kit } = ctx;
  return (
    <AnswerBlock id={`block-${b.id.replace(".", "-")}`} title={b.title} kind="JUDGED" core minutes={b.minutes} findIt={b.findIt}>
      <MaterialRefs refs={b.refs} />
      {b.lead && <p className="max-w-prose text-body text-ink">{b.lead}</p>}
      {b.slots?.map((s) => (
        <div key={s} id={`slot-${s}`}>
          {kit.slots[s]?.()}
        </div>
      ))}
      {b.fields.map((f) => (
        <FieldView key={f.id} ctx={ctx} f={f} />
      ))}
      <BlockMissing block={b.id} missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the tasks */

export function FreeTask1({ spec, kit }: { spec: FreeSpec; kit: FreeKit }) {
  const p = usePersisted();
  const missing = freeMissing(p, spec, 1);
  const filename = exportName(p.participant.name, spec.day, 1);
  const ctx: Ctx = { spec, kit, route: 1 };
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · ${spec.blocks1.length} blocks`, `Task 1 · ${spec.blocks1.length} Blöcke`)}</p>
        <h2 id="task1-h">{spec.route1.title}</h2>
      </header>
      <CaseBrief spec={spec} route={1} />
      <CaseCards spec={spec} after="brief1" />
      <PartHeading id="part-1" n={1} title={spec.route1.part1.title} level={spec.route1.part1.level} />
      {blocksOf(spec, 1).map((b) => (
        <div key={b.id} className="space-y-6">
          {b.id === spec.route1.part2Before && <PartHeading id="part-2" n={2} title={spec.route1.part2.title} level={spec.route1.part2.level} />}
          <BlockView ctx={ctx} b={b} missing={missing} />
          {spec.cards
            .filter((c) => c.after === b.id)
            .map((c) => (
              <FacilitatorCard key={c.id} id={c.id} ariaLabel={c.ariaLabel} openLabel={c.openLabel} hideLabel={c.hideLabel} sections={c.sections} />
            ))}
        </div>
      ))}
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your UX Analysis File", "Vorschau Ihrer UX Analysis File")}
        exportLabel={tt("Export the UX Analysis File", "UX Analysis File exportieren")}
        docTitle="UX Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => freeAnalysisBody(p, spec)}
      />
      <p className="text-caption text-ash print:hidden">
        {tt("Suggested next: ", "Empfohlen als Nächstes: ")}
        <Link href={routeHref(spec.day, 2)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Route 2 · Level 3 →", "Route 2 · Level 3 →")}
        </Link>{" "}
        {tt("It is only a suggestion; nothing is locked.", "Das ist nur eine Empfehlung; nichts ist gesperrt.")}
      </p>
    </section>
  );
}

function MemoPanel({ spec }: { spec: FreeSpec }) {
  const p = usePersisted();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(true);
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (hydrated) setHtml(freeMemoBody(p, spec));
  }, [hydrated, p, spec]);
  return (
    <section id="memo-panel" aria-labelledby="memo-h" className="card p-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id="memo-h">{tt("The memo as it builds", "Das Memo, wie es entsteht")}</h3>
        <button type="button" aria-expanded={open} aria-controls="memo-body" onClick={() => setOpen((o) => !o)} className="btn-ghost btn-sm">
          {open ? tt("Hide the memo", "Das Memo ausblenden") : tt("Show the memo", "Das Memo einblenden")}
        </button>
      </div>
      {open && (
        <div id="memo-body" className="mx-auto mt-3 max-w-[48rem] overflow-x-auto rounded-lg border border-line bg-paper p-4 md:p-6">
          <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />
          <div className="doc" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </section>
  );
}

export function FreeTask2({ spec, kit }: { spec: FreeSpec; kit: FreeKit }) {
  const p = usePersisted();
  const missing = freeMissing(p, spec, 2);
  const filename = exportName(p.participant.name, spec.day, 2);
  const ctx: Ctx = { spec, kit, route: 2 };
  void sliceOf;
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · one block", "Task 2 · ein Block")}</p>
        <h2>{spec.route2.title}</h2>
      </header>
      <CaseBrief spec={spec} route={2} />
      <CaseCards spec={spec} after="brief2" />
      <BlockView ctx={ctx} b={spec.block2} missing={missing} />
      {spec.cards
        .filter((c) => c.after === spec.block2.id)
        .map((c) => (
          <FacilitatorCard key={c.id} id={c.id} ariaLabel={c.ariaLabel} openLabel={c.openLabel} hideLabel={c.hideLabel} sections={c.sections} />
        ))}
      <MemoPanel spec={spec} />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => freeMemoBody(p, spec)} />
    </div>
  );
}
