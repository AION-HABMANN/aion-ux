'use client';

import { motion } from '@/lib/day9/motion-lite';
import { useId, type CSSProperties, type ReactNode } from 'react';
import { DUR, EASE } from '@/lib/day9/motion';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';

/** Shared primitives. Every one of these reads its motion from lib/motion.ts. */

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

// ── Buttons ─────────────────────────────────────────────────────────────────

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'quiet' | 'risk';
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  'aria-pressed'?: boolean;
  title?: string;
};

const BUTTON_VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-ink text-white border-ink hover:bg-[#1d2939]',
  secondary: 'bg-raised text-ink border-hairline hover:border-ink',
  quiet: 'bg-transparent text-ink-soft border-transparent hover:text-ink hover:bg-black/[0.04]',
  risk: 'bg-transparent text-risk-text border-risk/40 hover:bg-risk/10',
};

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'secondary',
  size = 'md',
  disabled,
  className,
  title,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={rest['aria-pressed']}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded border font-medium transition-colors',
        size === 'sm' ? 'px-3 py-1.5 text-14' : 'px-4 py-2.5 text-14',
        BUTTON_VARIANTS[variant],
        disabled && 'cursor-not-allowed opacity-40',
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Surfaces ────────────────────────────────────────────────────────────────

export function Card({
  children,
  className,
  as: As = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  return <As className={cx('card p-5', className)}>{children}</As>;
}

export function Eyebrow({ children, tone }: { children: ReactNode; tone?: 'inspect' | 'risk' }) {
  return (
    <p
      className="mono-label"
      style={tone ? { color: tone === 'inspect' ? 'var(--inspect-text)' : 'var(--risk-text)' } : undefined}
    >
      {children}
    </p>
  );
}

export function Mono({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={cx('font-mono text-12 tabular-nums', className)} style={style}>
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  deck,
  aside,
}: {
  eyebrow?: string;
  title: string;
  deck?: string;
  aside?: ReactNode;
}) {
  const { transition } = useMotionSafe();
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(DUR.base)}
        className="max-w-2xl"
      >
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-2 text-34 sm:text-46">{title}</h1>
        {deck ? <p className="mt-3 text-16 text-ink-soft">{deck}</p> : null}
      </motion.div>
      {aside}
    </header>
  );
}

// ── Fields ──────────────────────────────────────────────────────────────────

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="mono-label block">
        {label}
      </label>
      {hint ? <p className="text-14 text-ink-soft">{hint}</p> : null}
      {children}
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
  id,
  disabled,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <textarea
      id={id}
      aria-label={ariaLabel}
      value={value}
      rows={rows}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-y rounded border border-hairline bg-raised px-3 py-2 text-16 text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none disabled:opacity-50"
    />
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  id,
  ariaLabel,
  onEnter,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  onEnter?: () => void;
}) {
  return (
    <input
      id={id}
      aria-label={ariaLabel}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onEnter) onEnter();
      }}
      className="w-full rounded border border-hairline bg-raised px-3 py-2 text-16 text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
    />
  );
}

/** A labelled 0–100 slider that reads as an instrument, not a toy. */
export function Slider({
  value,
  onChange,
  label,
  sublabel,
  id,
  min = 0,
  max = 100,
  accent = 'var(--activation)',
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  sublabel?: string;
  id?: string;
  min?: number;
  max?: number;
  accent?: string;
}) {
  // a label with nothing to point at names nothing: fall back to a generated id
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={fieldId} className="text-14 font-medium">
          {label}
        </label>
        <Mono className="text-ink-soft">{value}</Mono>
      </div>
      {sublabel ? <p className="text-12 text-ink-soft">{sublabel}</p> : null}
      <input
        id={fieldId}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to right, ${accent} 0%, ${accent} ${
            ((value - min) / (max - min)) * 100
          }%, var(--hairline) ${((value - min) / (max - min)) * 100}%, var(--hairline) 100%)`,
        }}
      />
    </div>
  );
}

// ── States ──────────────────────────────────────────────────────────────────

/** Empty states are invitations to act, never reports of emptiness (§6.6). */
export function EmptyState({
  message,
  action,
}: {
  message: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded border border-dashed border-hairline px-6 py-10 text-center">
      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" aria-hidden>
        <path
          d="M4 30 L18 14 L28 22 L40 8 L52 18"
          stroke="var(--hairline)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="8" r="3" fill="var(--activation)" />
      </svg>
      <p className="max-w-sm text-14 text-ink-soft">{message}</p>
      {action ? (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}

/** A horizontal bar that always animates to its value — never jumps (§0.2). */
export function Meter({
  value,
  max = 100,
  accent = 'var(--activation)',
  height = 6,
  pulse = false,
  label,
}: {
  value: number;
  max?: number;
  accent?: string;
  height?: number;
  pulse?: boolean;
  label?: string;
}) {
  const { reduced } = useMotionSafe();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-black/[0.06]"
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: accent }}
        initial={false}
        animate={{
          width: `${pct}%`,
          opacity: pulse && !reduced ? [1, 0.45, 1, 0.45, 1] : 1,
        }}
        transition={{
          width: reduced
            ? { duration: 0.15 }
            : { duration: DUR.fill, ease: EASE.out as number[] },
          opacity: { duration: DUR.meterPulse },
        }}
      />
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cx('border-0 border-t border-hairline', className)} />;
}

/** Screen-reader-only text. */
export function SrOnly({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
