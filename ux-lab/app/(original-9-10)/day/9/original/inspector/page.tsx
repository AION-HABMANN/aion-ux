'use client';

import { useMemo, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import {
  DOMAINS,
  DOMAIN_LABELS,
  LEVER_LABELS,
  VERDICT_LABEL,
  domainFit,
  mechanicById,
  mechanics,
} from '@/original/data/day9/mechanics';
import type { Domain, DomainVerdict, MotivationLever } from '@/original/data/day9/types';
import { NO_BADGE_ANSWER } from '@/original/lib/day9/progression';
import { Button, Card, Mono, PageHeader, cx } from '@/original/components/day9/ui';
import { useInspector } from '@/original/components/day9/inspector/InspectorProvider';

const LEVERS = Object.keys(LEVER_LABELS) as MotivationLever[];

type RiskFilter = 'all' | 'survives' | 'fails';

export default function InspectorPage() {
  const { open } = useInspector();
  const [lever, setLever] = useState<MotivationLever | 'all'>('all');
  const [domain, setDomain] = useState<Domain | 'all'>('all');
  const [risk, setRisk] = useState<RiskFilter>('all');

  const filtered = useMemo(
    () =>
      mechanics.filter((m) => {
        if (lever !== 'all' && !m.levers.includes(lever)) return false;
        if (domain !== 'all' && !m.fits.includes(domain)) return false;
        if (risk === 'survives' && !m.survivesExplanation) return false;
        if (risk === 'fails' && m.survivesExplanation) return false;
        return true;
      }),
    [lever, domain, risk]
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="REFERENCE"
        title={copy.inspector.title}
        deck={copy.inspector.deck}
        aside={<Mono className="text-ink-soft">{fmt(copy.inspector.count, { n: mechanics.length })}</Mono>}
      />

      {/* Filters */}
      <Card className="no-print">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <Mono className="text-ink-soft">{copy.inspector.filterLever}</Mono>
            <select
              value={lever}
              onChange={(e) => setLever(e.target.value as MotivationLever | 'all')}
              className="mt-1 w-full rounded border border-hairline bg-raised px-2 py-1.5 text-14"
            >
              <option value="all">{copy.inspector.filterAll}</option>
              {LEVERS.map((l) => (
                <option key={l} value={l}>
                  {LEVER_LABELS[l]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <Mono className="text-ink-soft">{copy.inspector.filterDomain}</Mono>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value as Domain | 'all')}
              className="mt-1 w-full rounded border border-hairline bg-raised px-2 py-1.5 text-14"
            >
              <option value="all">{copy.inspector.filterAll}</option>
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {DOMAIN_LABELS[d]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <Mono className="text-ink-soft">{copy.inspector.filterRisk}</Mono>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value as RiskFilter)}
              className="mt-1 w-full rounded border border-hairline bg-raised px-2 py-1.5 text-14"
            >
              <option value="all">{copy.inspector.filterAll}</option>
              <option value="survives">Survives being explained</option>
              <option value="fails">Fails the plain-language test</option>
            </select>
          </label>
        </div>
      </Card>

      {/* Catalogue */}
      <section aria-labelledby="catalogue">
        <h2 id="catalogue" className="sr-only">
          Mechanics
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {filtered.map((m) => (
            <li key={m.id}>
              <Card className="flex h-full flex-col" as="article">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-20">{m.name}</h3>
                  <Mono
                    style={{
                      color: m.survivesExplanation ? 'var(--integrity-text)' : 'var(--risk-text)',
                    }}
                  >
                    {m.survivesExplanation ? '✓ survives' : '✕ fails'}
                  </Mono>
                </div>

                <Mono className="mt-1 text-ink-soft">
                  {m.levers.map((l) => LEVER_LABELS[l] ?? l).join(' · ')}
                </Mono>

                <p className="mt-3 text-14">{m.whyItWorks}</p>
                <p className="mt-2 text-14" style={{ color: 'var(--risk-text)' }}>
                  {m.riskIfOverused}
                </p>

                <dl className="mt-3 space-y-1 text-12">
                  <div className="flex gap-2">
                    <dt className="mono-label w-24 shrink-0">{copy.inspector.fits}</dt>
                    <dd>
                      {m.fits.length ? m.fits.map((d) => DOMAIN_LABELS[d]).join(', ') : '—'}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="mono-label w-24 shrink-0">{copy.inspector.seenIn}</dt>
                    <dd className="text-ink-soft">{m.seenIn.join(' · ')}</dd>
                  </div>
                </dl>

                <Button size="sm" className="mt-4 self-start" onClick={() => open(m.id)}>
                  Open the panel
                </Button>
              </Card>
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="text-14 text-ink-soft">
            Nothing matches that combination. Widen one filter — the registry is deliberately small.
          </p>
        ) : null}
      </section>

      {/* Domain fit table */}
      <section aria-labelledby="domain-fit">
        <h2 id="domain-fit" className="mono-label mb-3">
          {copy.inspector.domainTable}
        </h2>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[520px] border-collapse text-14">
            <thead>
              <tr>
                <th scope="col" className="pb-2 text-left font-normal">
                  <Mono className="text-ink-soft">MECHANIC</Mono>
                </th>
                {DOMAINS.map((d) => (
                  <th key={d} scope="col" className="px-2 pb-2 text-left font-normal">
                    <Mono className="text-ink-soft">{DOMAIN_LABELS[d]}</Mono>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {domainFit.map((row) => (
                <tr key={row.mechanicId} className="border-t border-hairline">
                  <th scope="row" className="py-2 pr-3 text-left font-normal">
                    <button
                      type="button"
                      onClick={() => open(row.mechanicId)}
                      className="underline underline-offset-2 hover:no-underline"
                    >
                      {row.label}
                    </button>
                  </th>
                  {DOMAINS.map((d) => (
                    <td key={d} className="px-2 py-2">
                      <VerdictChip verdict={row.verdicts[d].verdict} note={row.verdicts[d].note} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Card className="border-dashed">
        <Mono className="text-ink-soft">{copy.badge.whyNoLoginQuestion}</Mono>
        <p className="mt-1 max-w-2xl text-14">{NO_BADGE_ANSWER}</p>
        <p className="mt-3 max-w-2xl text-12 text-ink-soft">
          Every gamified element in this app carries one of these {mechanics.length} IDs. Turn the
          Inspector on in the console and the tags appear on the elements themselves — including the
          streak chip, which is labelled with the risk it carries:{' '}
          {mechanicById.streaks.riskIfOverused}
        </p>
      </Card>
    </div>
  );
}

function VerdictChip({ verdict, note }: { verdict: DomainVerdict; note?: string }) {
  return (
    <span
      className={cx('inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-12')}
      style={{
        borderColor: verdict === 'do-not' ? 'var(--risk)' : 'var(--integrity)',
        background: verdict === 'ship' ? 'rgba(31,157,143,0.14)' : 'transparent',
        color: verdict === 'do-not' ? 'var(--risk-text)' : 'var(--ink)',
      }}
      title={note}
    >
      {VERDICT_LABEL[verdict]}
    </span>
  );
}
