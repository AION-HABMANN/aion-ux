'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { useEffect, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { CONCEPT_SECTIONS, conceptBySlug } from '@/original/data/day9/concepts';
import { darkPatternContent, DARK_PATTERN_SECONDS } from '@/original/data/day9/darkpattern';
import { DUR } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Card, Mono } from '@/original/components/day9/ui';
import { Section } from '@/original/components/day9/learn/Section';
import { Diagram } from '@/original/components/day9/learn/Diagram';
import { DemoFrame } from '@/original/components/day9/learn/DemoFrame';
import { SelfCheck } from '@/original/components/day9/learn/SelfCheck';
import { CanNowCard } from '@/original/components/day9/learn/CanNowCard';
import {
  FiveLeverBoard,
  MotivationMixer,
  ThreePanelComparator,
} from '@/original/components/day9/learn/demos/knowledge';
import {
  MechanicSandbox,
  NarrativeLayerToggle,
  OverjustificationDemo,
  RetentionCurveLab,
  RewardInflationSimulator,
} from '@/original/components/day9/learn/demos/application';
import {
  DomainFitMatrix,
  GovernanceDecisionTree,
  ReflectionField,
} from '@/original/components/day9/learn/demos/management';
import { useDarkPattern } from '@/original/components/day9/gamification/DarkPatternLayer';

const DEMOS: Record<string, (props: { onInteract: () => void }) => React.JSX.Element> = {
  ThreePanelComparator,
  FiveLeverBoard,
  MotivationMixer,
  MechanicSandbox,
  RewardInflationSimulator,
  NarrativeLayerToggle,
  RetentionCurveLab,
  OverjustificationDemo,
  DomainFitMatrix,
  GovernanceDecisionTree,
};

/** Bold markers in the content pack render as emphasis, not as literal stars. */
function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <p className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

const LABEL = Object.fromEntries(CONCEPT_SECTIONS.map((s) => [s.id, s.label])) as Record<string, string>;
const FOLD = Object.fromEntries(CONCEPT_SECTIONS.map((s) => [s.id, 'fold' in s ? s.fold : undefined])) as Record<string, string | undefined>;

/**
 * What opens when a card is opened on the route page: the demo and "you can now" are always there;
 * the self-check (optional, never counted), the story, the full idea, the mechanism and the rest are one
 * "＋ Show" row each. A card is "read" only when the reader says so (the button on the card).
 * (The card's front, with its plain words, is drawn by InlineCard.)
 */
export function CardBody({ slug }: { slug: string }) {
  const concept = conceptBySlug[slug];

  const Demo = DEMOS[concept.demo.component];

  return (
    <div className="space-y-8">
      <Section id="demo" slug={concept.slug} label={LABEL.demo} eyebrowTone="inspect">
        <DemoFrame
          slug={concept.slug}
          mechanicId={concept.inspectorTags[0] ?? 'visible-progress'}
          brief={concept.demo.brief}
          insight={concept.demo.insight}
        >
          {({ onInteract }) => (Demo ? <Demo onInteract={onInteract} /> : null)}
        </DemoFrame>

        {/* Module 05 hosts the Dark Pattern toggle — deliberately not in the console. */}
        {concept.hostsDarkPatternToggle ? <DarkPatternToggle /> : null}
      </Section>

      <Section id="cannow" slug={concept.slug} label={LABEL.cannow}>
        <div className="max-w-2xl">
          <CanNowCard capability={concept.canNow} supports={concept.supports} />
        </div>
      </Section>

      <Section id="check" slug={concept.slug} label={LABEL.check} fold={FOLD.check}>
        <div className="max-w-2xl space-y-4">
          {concept.selfChecks.map((check) => (
            <SelfCheck
              key={check.id}
              check={check}
              slug={concept.slug}
              capability={concept.canNow}
              sectionRef="the mechanism"
            />
          ))}
        </div>
      </Section>

      <Section id="hook" slug={concept.slug} label={LABEL.hook} fold={FOLD.hook}>
        <RichText text={concept.hook} className="max-w-2xl text-16" />
      </Section>

      <Section id="core" slug={concept.slug} label={LABEL.core} fold={FOLD.core}>
        <RichText
          text={concept.coreIdea}
          className="max-w-2xl border-l-2 pl-4 text-20 leading-snug"
        />
      </Section>

      <Section id="mechanism" slug={concept.slug} label={LABEL.mechanism} fold={FOLD.mechanism}>
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="prose-body max-w-2xl space-y-3">
            {concept.mechanism.map((para, i) => (
              <RichText key={i} text={para} className="text-16" />
            ))}
          </div>
          <Diagram kind={concept.diagram.kind} spec={concept.diagram.spec} />
        </div>
      </Section>

      <Section id="balance" slug={concept.slug} label={LABEL.balance} fold={FOLD.balance}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <Mono style={{ color: 'var(--integrity-text)' }}>{concept.worksLabel.toUpperCase()}</Mono>
            <ul className="mt-3 space-y-2">
              {concept.whenItWorks.map((item) => (
                <li key={item} className="flex gap-2 text-14">
                  <span aria-hidden style={{ color: 'var(--integrity-text)' }}>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <Mono style={{ color: 'var(--risk-text)' }}>{concept.backfiresLabel.toUpperCase()}</Mono>
            <ul className="mt-3 space-y-2">
              {concept.whenItBackfires.map((item) => (
                <li key={item} className="flex gap-2 text-14">
                  <span aria-hidden style={{ color: 'var(--risk-text)' }}>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="serious" slug={concept.slug} label={LABEL.serious} fold={FOLD.serious}>
        <div
          className="max-w-3xl rounded-lg border p-5"
          style={{ borderColor: 'var(--integrity)', background: 'rgba(31,157,143,0.05)' }}
        >
          <h3 className="text-20">{concept.seriousDomain.title}</h3>
          <p className="mt-2 text-16">{concept.seriousDomain.body}</p>
        </div>
      </Section>
    </div>
  );
}

/** BUILD_PROMPT §5.8 — 90 seconds of the manipulative version, then reflection. */
function DarkPatternToggle() {
  const { running, finished, elapsed, start, stop, clearFinished } = useDarkPattern();
  const setTried = useStore((s) => s.setDarkPatternTried);
  const setReflection = useStore((s) => s.setDarkPatternReflection);
  const stored = useStore((s) => s.flags.darkPatternReflection);
  const setCapstoneSection = useStore((s) => s.setCapstoneSection);
  const existingRisk = useStore((s) => s.capstone.risk ?? '');
  const { transition } = useMotionSafe();

  const [draft, setDraft] = useState(stored);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      className="mt-6 rounded-lg border p-5"
      style={{ borderColor: 'var(--risk)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={transition(DUR.base)}
    >
      <Mono style={{ color: 'var(--risk-text)' }}>{copy.darkpattern.toggleTitle}</Mono>
      <p className="mt-2 max-w-2xl text-14 text-ink-soft">{copy.darkpattern.toggleBody}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {running ? (
          <Button size="sm" variant="risk" onClick={stop}>
            {copy.darkpattern.stop}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="risk"
            onClick={() => {
              setTried();
              start();
            }}
          >
            {copy.darkpattern.start}
          </Button>
        )}
        {running ? (
          <Mono style={{ color: 'var(--risk-text)' }}>
            {fmt(copy.darkpattern.running, { n: DARK_PATTERN_SECONDS - elapsed })}
          </Mono>
        ) : null}
      </div>

      {finished ? (
        <div className="mt-5 border-t border-hairline pt-4">
          <ReflectionField
            prompt={darkPatternContent.reflectionPrompt}
            value={draft}
            onChange={setDraft}
            saved={saved}
            saveLabel={copy.darkpattern.reflectionSave}
            savedLabel={copy.darkpattern.reflectionSaved}
            onSave={() => {
              setReflection(draft);
              const line = `From the manipulation simulation: ${draft}`;
              setCapstoneSection('risk', existingRisk ? `${existingRisk}\n\n${line}` : line);
              setSaved(true);
              clearFinished();
            }}
          />
        </div>
      ) : null}
    </motion.div>
  );
}
