'use client';

import { anchors, type Block, type Field, type Item } from '@/data/day1';
import { Gloss } from '@/lib/Gloss';
import { jumpTo } from '@/lib/flash';
import { blockMissing, itemMissing } from '@/lib/logic';
import { useHydrated, useSession, useStore } from '@/store/useStore';
import { ExampleAnswer, MissingNotice, WritingHelp } from '@/components/ui/Help';
import { AutoTextarea, Pill } from '@/components/ui/kit';

function FieldInput({ f, many }: { f: Field; many: boolean }) {
  const value = useStore((s) => s.answers[f.key] ?? '');
  const setAnswer = useStore((s) => s.setAnswer);
  const id = anchors.field(f.key);
  const labelId = `${id}-l`;
  if (f.kind === 'pick') {
    return (
      <fieldset id={id} tabIndex={-1} className="space-y-1">
        <legend className="smallcaps">{f.label}</legend>
        <div className="flex flex-wrap gap-2">
          {f.options!.map((o) => (
            <label key={o} className={`flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border px-3 ${value === o ? 'border-accent bg-accentSoft' : 'border-line bg-paper'}`}>
              <input type="radio" name={f.key} checked={value === o} onChange={() => setAnswer(f.key, o)} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  return (
    <div className="space-y-1">
      {many || f.prefix ? (
        <label id={labelId} htmlFor={id} className="smallcaps block">
          {f.label}
        </label>
      ) : null}
      {f.prefix ? <p className="text-caption text-ash">{f.prefix}</p> : null}
      <AutoTextarea id={id} value={value} onChange={(v) => setAnswer(f.key, v)} rows={f.kind === 'lines' ? 4 : 3} labelledBy={many || f.prefix ? labelId : `${id}-q`} />
      {f.kind === 'lines' ? <p className="text-caption text-ash">One per line · at least {f.min}</p> : null}
    </div>
  );
}

function ItemView({ block, item, total, onOpenCard }: { block: Block; item: Item; total: number; onOpenCard: (id: string) => void }) {
  const answers = useStore((s) => s.answers);
  const unlocked = useSession((s) => s.unlocked);
  const missing = itemMissing(item, answers);
  const qid = anchors.item(block.id, item.n);
  return (
    <section id={qid} aria-labelledby={`${qid}-t`} className="space-y-3 rounded-lg border border-line bg-paper p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="smallcaps text-accent">
          Question {item.n} of {total}
        </p>
        <span className={`pill ${missing ? 'border-rust/50 bg-rustSoft text-rust' : 'border-signal/50 bg-signalSoft text-signal'}`}>{missing ? 'Not complete' : 'Complete'}</span>
      </div>
      <h4 id={`${qid}-t`} className="text-h3">
        <span id={`${anchors.field(item.fields[0].key)}-q`}>
          <Gloss>{item.prompt}</Gloss>
        </span>
      </h4>
      {item.help ? <p className="text-caption text-ash">{item.help}</p> : null}
      <p className="text-caption text-ash">
        Draws on:{' '}
        {item.refs.map((r, i) => (
          <span key={r}>
            {i ? ' · ' : ''}
            <button type="button" className="underline underline-offset-2" onClick={() => onOpenCard(r)}>
              Card {r}
            </button>
          </span>
        ))}
      </p>
      <div className={item.fields.length > 3 ? 'grid gap-3 md:grid-cols-2' : 'space-y-3'}>
        {item.fields.map((f) => (
          <FieldInput key={f.key} f={f} many={item.fields.length > 1} />
        ))}
      </div>
      <WritingHelp id={qid} steps={item.steps} />
      <ExampleAnswer id={qid} text={item.example} />
      {unlocked ? (
        <div className="insight rounded bg-signalSoft px-3 py-2 text-caption text-ink">
          <span className="smallcaps block text-signal">Mentor · model answer {block.id === '2.1' ? '(the plan’s Musterlösung)' : '(draft, for your review)'}</span>
          {item.fields.map((f) => (
            <p key={f.key} className="whitespace-pre-line">
              {item.fields.length > 1 ? <strong>{f.label}: </strong> : null}
              {item.model[f.key]}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/** One task block: the case once, the plan's questions in the plan's order, a live "still missing" notice, the aim (CLAUDE.md #12, #34). */
export function TaskBlock({ block, step, onOpenCard }: { block: Block; step?: string; onOpenCard: (id: string) => void }) {
  const hydrated = useHydrated();
  const answers = useStore((s) => s.answers);
  const missing = hydrated ? blockMissing(block, answers) : [];
  const id = anchors.block(block.id);
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="space-y-4">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {step ? <span className="smallcaps text-accent">{step}</span> : null}
          <Pill tone="core">Core</Pill>
          <Pill>about {block.minutes} min</Pill>
          <Pill tone="draft">{block.planRow}</Pill>
        </div>
        <h3 id={`${id}-t`} className="text-h2">
          {block.title.replace(/^Block \d\.\d · /, `Block ${block.id} · `)}
        </h3>
      </header>

      <div className="card space-y-3 p-5">
        <p className="text-body">
          <Gloss>{block.intro}</Gloss>
        </p>
        {block.groups.map((g) => (
          <div key={g.heading} className="space-y-1">
            <p className="smallcaps">{g.heading}</p>
            <ul className="list-disc space-y-1 pl-5 text-body">
              {g.points.map((p) => (
                <li key={p.slice(0, 40)}>
                  <Gloss>{p}</Gloss>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-caption text-ash">
          The case is fictional. The figures and conditions are the plan’s own; where the plan says only “limited” or “unclear”, decide anyway and say what you assume.
        </p>
      </div>

      <div className="space-y-3">
        {block.items.map((item) => (
          <ItemView key={item.n} block={block} item={item} total={block.items.length} onOpenCard={onOpenCard} />
        ))}
      </div>

      <MissingNotice title={`Still missing in Block ${block.id}`} items={missing} />
      <p className="text-caption text-ash">
        <strong>Aim of the block:</strong> {block.aim}
      </p>
    </section>
  );
}
