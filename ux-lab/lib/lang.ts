/**
 * The active language as a plain module value (no React, no store), so data files, the export builders and the components all
 * read it the same way. `<LangProvider>` (lib/i18n.tsx) sets it before its children render and remounts them when it changes.
 *
 * Two ways to write bilingual text (CLAUDE.md #32: common technical terms stay English, every explanation is German):
 *  - inline, in a component or a function: `tt("English", "Deutsch")`, for a string or for JSX;
 *  - in a data file: `t("English", "Deutsch")` as a field value, and the exported object wrapped in `bi(...)`. `bi` turns every
 *    such field into a getter, so the text follows the language at read time and nothing is frozen at import.
 */
import { DE } from "@/data/de";

export type Lang = "en" | "de";

let current: Lang = "en";

export const getLang = (): Lang => current;
export const setCurrentLang = (l: Lang) => {
  current = l;
};
export const isDe = () => current === "de";

/**
 * The German of an English text: the pair written beside the call, or else the dictionary of `data/de` (one file per day, English text -> German text).
 * A text with no German reads as English and is remembered in `deMisses()`, which `verify:de` and the browser (`window.__DE_MISS`) report.
 */
const miss = new Set<string>();
const missMentor = new Set<string>();
if (typeof window !== "undefined") (window as unknown as { __DE_MISS?: Set<string> }).__DE_MISS = miss;
export const deMisses = () => [...miss];
/** Texts only the facilitator sees (model answers, the guide's why / look for / pitfalls); they are translated after the learner texts. */
export const deMissesMentor = () => [...missMentor];
/** Does this text need a German version? A real word, not a number or a short abbreviation (UX, VR, EEG). */
export const needsDe = (s: string) => /[A-Za-z]{3}/.test(s) && !/^(?:UX|UI|CTA|FAQ|VR|AR|AI|EEG|BCI|WCAG|ARIA|ISO|URL|PDF|CSS|HTML)\b[\s\d.,:·\/-]*$/.test(s.trim());
export function deText(en: string, mentor = false): string {
  const d = DE[en];
  if (d !== undefined) return d;
  if (needsDe(en)) (mentor ? missMentor : miss).add(en);
  return en;
}

/** The English text a German dictionary entry came from (a chip or button the learner tapped), so scripted assistants can match their English rules. */
let reverse: Map<string, string> | null = null;
export function enOf(de: string): string {
  if (!reverse) {
    reverse = new Map();
    for (const [en, d] of Object.entries(DE)) if (!reverse.has(d)) reverse.set(d, en);
  }
  return reverse.get(de) ?? de;
}

/** The text of the active language. Works for strings and for JSX. UX writes English first (UX-STANDARD decision 4); the German is the pair or the dictionary entry, and a missing one falls back to English. */
export function tt<T>(en: T, de?: T): T {
  if (current !== "de") return en;
  if (de !== undefined) return de;
  return typeof en === "string" ? (deText(en) as unknown as T) : en;
}

/* ------------------------------------------------------------------ bilingual data */

const TX = "__tx" as const;
/** A bilingual string inside a data file. Resolved to a plain string by `bi()`. */
export type Tx = { readonly [TX]: true; readonly en: string; readonly de?: string };
/** `de` may be left out: the German is then the dictionary entry of `data/de`, or English where there is none. */
export const t = (en: string, de?: string): Tx => ({ [TX]: true, en, de }) as Tx;
const deOf = (x: Tx, mentor = false) => (x.de !== undefined ? x.de : deText(x.en, mentor));
const isTx = (v: unknown): v is Tx => typeof v === "object" && v !== null && (v as Record<string, unknown>)[TX] === true;

/** The type a data structure has once every Tx in it is a string. */
export type Res<T> = T extends Tx
  ? string
  : T extends (...args: never[]) => unknown
    ? T
    : T extends readonly (infer U)[]
      ? Res<U>[]
      : T extends object
        ? { [K in keyof T]: Res<T[K]> }
        : T;

/**
 * A plain English string in a data file (written without `t()`): it follows the language too. Only a text is looked up (it has a space, or is already in the
 * dictionary), so an id such as "problems" or "mat-A3" is never touched.
 */
const isText = (s: string) => DE[s] !== undefined || (/\s/.test(s) && /[A-Za-z]{3}/.test(s));
const plainLeaf = (s: string, mentor: boolean) => () => (current === "de" && isText(s) ? deText(s, mentor) : s);
const MENTOR_KEYS = new Set(["model", "modelText", "modelRows", "why", "lookFor", "pitfalls"]);

const isPlain = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && Object.getPrototypeOf(v) === Object.prototype;

/**
 * Deep-copies a data structure and turns every `t(en, de)` in it into a getter that returns the active language. Arrays and plain
 * objects are walked; anything else (numbers, functions, strings) is copied as it is.
 */
export function bi<T>(v: T, mentor = false): Res<T> {
  if (Array.isArray(v)) {
    const out: unknown[] = [];
    v.forEach((x, i) => {
      if (isTx(x)) Object.defineProperty(out, i, { get: () => (current === "de" ? deOf(x, mentor) : x.en), enumerable: true, configurable: true });
      else if (typeof x === "string") Object.defineProperty(out, i, { get: plainLeaf(x, mentor), enumerable: true, configurable: true });
      else out[i] = bi(x, mentor);
    });
    return out as Res<T>;
  }
  if (isPlain(v)) {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) {
      const m = mentor || MENTOR_KEYS.has(k);
      if (isTx(x)) Object.defineProperty(out, k, { get: () => (current === "de" ? deOf(x, m) : x.en), enumerable: true, configurable: true });
      else if (typeof x === "string") Object.defineProperty(out, k, { get: plainLeaf(x, m), enumerable: true, configurable: true });
      else out[k] = bi(x, m);
    }
    return out as Res<T>;
  }
  if (isTx(v)) return (current === "de" ? deOf(v) : v.en) as Res<T>;
  return v as Res<T>;
}

/* ------------------------------------------------------------------ numbers */

/** The locale for numbers: German writes 1.234,5. */
export const locale = () => (current === "de" ? "de-DE" : "en-US");

/** A number in the active language's format. */
export const num = (n: number, opts?: Intl.NumberFormatOptions) => n.toLocaleString(locale(), opts);

/** One decimal place: 42.7 in English, 42,7 in German. */
export const d1 = (n: number) => num(n, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Euros: €60,000 in English, 60.000 € in German (with a no-break space). A negative amount keeps its sign in front. */
export const euro = (n: number) => {
  const sign = n < 0 ? "−" : "";
  const v = num(Math.abs(Math.round(n)));
  return current === "de" ? `${sign}${v} €` : `${sign}€${v}`;
};

/** Euros with a sign: +€3,416 / −€4,872 in English, +3.416 € / −4.872 € in German. A zero has no sign. */
export const euroSigned = (n: number) => {
  const sign = n < 0 ? "−" : n > 0 ? "+" : "";
  const v = num(Math.abs(Math.round(n)));
  return current === "de" ? `${sign}${v} €` : `${sign}€${v}`;
};

/** Thousands of euros: €56k / 56 T€. */
export const euroK = (n: number) => (current === "de" ? `${num(Math.round(n / 1000))} T€` : `€${num(Math.round(n / 1000))}k`);

/** A percentage: 12% / 12 %. */
export const pct = (n: number, digits = 0) => `${num(n, { minimumFractionDigits: digits, maximumFractionDigits: digits })}${current === "de" ? " %" : "%"}`;

/** An object whose string properties are read lazily, so a value chosen with `tt` follows the language at read time. */
export function lazyRecord<K extends string>(defs: Record<K, () => string>): Record<K, string> {
  const o = {} as Record<K, string>;
  for (const k of Object.keys(defs) as K[]) Object.defineProperty(o, k, { get: defs[k], enumerable: true });
  return o;
}

/** Plural helper for English; German callers pass both forms. */
export const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
