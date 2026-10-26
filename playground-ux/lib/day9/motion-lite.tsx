'use client';

/**
 * A small stand-in for the part of framer-motion that Day 9 used, built on the
 * browser's own Web Animations API. No dependency.
 *
 * Supported: `motion.<tag>` with `initial`, `animate`, `exit`, `whileInView` +
 * `viewport`, `transition`, `onAnimationComplete`; `AnimatePresence` (default,
 * `initial={false}`, `mode="wait"`).
 *
 * Animated values: opacity, x, y, scale, scaleX, scaleY, rotate, width, height
 * (including 'auto'), strokeDashoffset, pathLength, and the SVG attributes
 * `d`, `points` and `r` (tweened in script when the number layout matches).
 * An array value is a list of keyframes ({ scale: [1, 1.1, 1] }). `transition` may
 * carry one entry per property. `layout` animates a change of position (translate only).
 *
 * Reduced motion: every duration is capped at 150 ms when the user asks for it.
 */

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  createElement,
  type CSSProperties,
  type ForwardRefExoticComponent,
  type JSX,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
} from 'react';

type Primitive = number | string;
type Value = Primitive | Primitive[];
export type Target = Record<string, Value>;

export interface Transition {
  duration?: number;
  delay?: number;
  ease?: readonly number[] | string;
  type?: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
  bounce?: number;
  /** A transition for one property, e.g. { width: { duration: 0.7 }, opacity: { duration: 0.9 } }. */
  [property: string]: unknown;
}

export interface Viewport {
  once?: boolean;
  margin?: string;
  amount?: number | 'some' | 'all';
}

export interface MotionProps {
  /** Animate position changes caused by layout (translate only). */
  layout?: boolean;
  initial?: Target | false;
  animate?: Target;
  exit?: Target;
  whileInView?: Target;
  viewport?: Viewport;
  transition?: Transition;
  onAnimationComplete?: () => void;
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const TRANSFORM_KEYS = ['x', 'y', 'scale', 'scaleX', 'scaleY', 'rotate'];
const ATTR_KEYS = ['d', 'points', 'r'];

function prefersReduced(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

/** Framer-style target to CSS style + SVG attributes. */
const pick = (v: Value, i: number): Primitive => (Array.isArray(v) ? v[Math.min(i, v.length - 1)] : v);
const frameCount = (t: Target) => Math.max(1, ...Object.values(t).map((v) => (Array.isArray(v) ? v.length : 1)));

function split(target: Target | undefined, index = Infinity): { style: CSSProperties; attrs: Record<string, Primitive> } {
  const style: Record<string, Primitive> = {};
  const attrs: Record<string, Primitive> = {};
  if (!target) return { style, attrs };
  const t: Record<string, Primitive> = {};
  for (const [k, v] of Object.entries(target)) t[k] = pick(v, index);
  let hasTransform = false;
  for (const [k, v] of Object.entries(t)) {
    if (TRANSFORM_KEYS.includes(k)) hasTransform = true;
    else if (ATTR_KEYS.includes(k)) attrs[k] = v;
    else if (k === 'pathLength') {
      style.strokeDasharray = 1;
      style.strokeDashoffset = 1 - Number(v);
      attrs.pathLength = 1;
    } else if ((k === 'width' || k === 'height') && typeof v === 'number') style[k] = `${v}px`;
    else style[k] = v;
  }
  if (hasTransform) {
    const g = (k: string, d: number) => (t[k] === undefined ? d : Number(t[k]));
    const sx = t.scaleX !== undefined ? g('scaleX', 1) : g('scale', 1);
    const sy = t.scaleY !== undefined ? g('scaleY', 1) : g('scale', 1);
    style.transform = `translate(${g('x', 0)}px, ${g('y', 0)}px) rotate(${g('rotate', 0)}deg) scale(${sx}, ${sy})`;
  }
  return { style: style as CSSProperties, attrs };
}

function easing(tr: Transition | undefined): string {
  if (tr?.type === 'spring') return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  const e = tr?.ease;
  if (Array.isArray(e) && e.length === 4) return `cubic-bezier(${e.join(',')})`;
  if (typeof e === 'string') {
    const map: Record<string, string> = { linear: 'linear', easeIn: 'ease-in', easeOut: 'ease-out', easeInOut: 'ease-in-out' };
    return map[e] ?? 'ease-out';
  }
  return 'cubic-bezier(0.22, 1, 0.36, 1)';
}

function timing(tr: Transition | undefined) {
  let duration = tr?.duration ?? (tr?.type === 'spring' ? 0.55 : 0.3);
  if (prefersReduced()) duration = Math.min(duration, 0.15);
  return { duration: duration * 1000, delay: (tr?.delay ?? 0) * 1000, easing: easing(tr) };
}

// ---- script tween for SVG numbers (d, points, r) ---------------------------------------------
const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;

function tweenAttr(el: Element, name: string, to: Primitive, tr: Transition | undefined): () => void {
  const toS = String(to);
  const fromS = el.getAttribute(name) ?? toS;
  const set = (v: string) => el.setAttribute(name, v);
  const a = fromS.match(NUM);
  const b = toS.match(NUM);
  const sameShape = a && b && a.length === b.length && fromS.replace(NUM, '#') === toS.replace(NUM, '#');
  const { duration, delay } = timing(tr);
  if (!sameShape || duration <= 0) {
    set(toS);
    return () => {};
  }
  const an = a!.map(Number);
  const bn = b!.map(Number);
  const parts = toS.split(NUM);
  let raf = 0;
  const start = performance.now() + delay;
  const frame = (now: number) => {
    const p = Math.min(1, Math.max(0, (now - start) / duration));
    const k = 1 - Math.pow(1 - p, 3);
    let out = parts[0];
    for (let i = 0; i < bn.length; i++) out += String(an[i] + (bn[i] - an[i]) * k) + parts[i + 1];
    set(out);
    if (p < 1) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

// ---- presence ---------------------------------------------------------------------------------
interface Presence {
  exiting: boolean;
  skipInitial: boolean;
  register: () => () => void;
}
const PresenceCtx = createContext<Presence>({ exiting: false, skipInitial: false, register: () => () => {} });

function readComputed(el: Element, keys: string[]): Record<string, string> {
  const cs = getComputedStyle(el);
  const out: Record<string, string> = {};
  for (const k of keys) out[k] = (cs as unknown as Record<string, string>)[k];
  return out;
}


/** Build the animations that take `el` from where it is now to `goal`. */
function play(el: Element, goal: Target, transition: Transition | undefined, fill: FillMode): { anims: Animation[]; cancels: Array<() => void> } {
  const anims: Animation[] = [];
  const cancels: Array<() => void> = [];
  const { style: toStyle, attrs } = split(goal);
  const keys = Object.keys(toStyle);
  const sub = (k: string): Transition | undefined => {
    const v = transition?.[k];
    return v && typeof v === 'object' ? (v as Transition) : undefined;
  };
  if (keys.length && typeof el.animate === 'function') {
    const arrays = Object.values(goal).some(Array.isArray);
    if (arrays) {
      const n = frameCount(goal);
      const frames = Array.from({ length: n }, (_, i) => split(goal, i).style);
      const t = timing(transition);
      anims.push(el.animate(frames as unknown as Keyframe[], { duration: t.duration, delay: t.delay, easing: t.easing, fill }));
    } else {
      const from = readComputed(el, keys);
      const to: Record<string, Primitive> = { ...(toStyle as Record<string, Primitive>) };
      if (to.height === 'auto') to.height = `${(el as HTMLElement).scrollHeight}px`;
      const perProp = keys.some((k) => sub(k));
      const groups: string[][] = perProp ? keys.map((k) => [k]) : [keys];
      for (const g of groups) {
        const t = timing(sub(g[0]) ?? transition);
        const f: Record<string, string> = {};
        const o: Record<string, Primitive> = {};
        for (const k of g) {
          f[k] = from[k];
          o[k] = to[k];
        }
        anims.push(el.animate([f, o] as unknown as Keyframe[], { duration: t.duration, delay: t.delay, easing: t.easing, fill }));
      }
    }
  }
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'pathLength') el.setAttribute('pathLength', '1');
    else cancels.push(tweenAttr(el, k, v, transition));
  }
  return { anims, cancels };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = MotionProps & { style?: CSSProperties; children?: ReactNode } & Record<string, any>;

function makeMotion(tag: string) {
  const Comp = forwardRef<Element, AnyProps>(function MotionElement(props, outerRef) {
    const { layout, initial, animate, exit, whileInView, viewport, transition, onAnimationComplete, style, children, ...rest } = props;
    const presence = useContext(PresenceCtx);
    const ref = useRef<Element | null>(null);
    const setRefs = useCallback(
      (node: Element | null) => {
        ref.current = node;
        if (typeof outerRef === 'function') outerRef(node);
        else if (outerRef) (outerRef as { current: Element | null }).current = node;
      },
      [outerRef],
    );

    const startTarget = initial === false || presence.skipInitial ? animate ?? whileInView : initial ?? undefined;
    const [shown, setShown] = useState<Target | undefined>(startTarget);
    const [inView, setInView] = useState(false);
    const anims = useRef<Animation[]>([]);
    const cancelTween = useRef<Array<() => void>>([]);
    const goal: Target | undefined = whileInView ? (inView ? whileInView : undefined) : animate;
    const goalKey = JSON.stringify(goal ?? null);

    // whileInView
    useEffect(() => {
      if (!whileInView || !ref.current || typeof IntersectionObserver === 'undefined') {
        if (whileInView) setInView(true);
        return;
      }
      const amount = viewport?.amount === 'all' ? 1 : typeof viewport?.amount === 'number' ? viewport.amount : 0;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setInView(true);
              if (viewport?.once) io.disconnect();
            } else if (!viewport?.once) setInView(false);
          }
        },
        { rootMargin: viewport?.margin ?? '0px', threshold: amount },
      );
      io.observe(ref.current);
      return () => io.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!!whileInView]);

    // enter / change
    useIsoLayoutEffect(() => {
      const el = ref.current;
      if (!el || !goal || presence.exiting) return;
      if (JSON.stringify(shown ?? null) === goalKey) return;

      anims.current.forEach((x) => x.cancel());
      cancelTween.current.forEach((c) => c());
      const played = play(el, goal, transition, 'backwards');
      anims.current = played.anims;
      cancelTween.current = played.cancels;
      const main = played.anims[0];
      const t = timing(transition);
      setShown(goal);
      if (onAnimationComplete) {
        if (main) main.finished.then(onAnimationComplete).catch(() => {});
        else setTimeout(onAnimationComplete, t.duration + t.delay);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goalKey, presence.exiting]);

    // exit (driven by AnimatePresence)
    useIsoLayoutEffect(() => {
      const el = ref.current;
      if (!presence.exiting || !exit || !el || typeof el.animate !== 'function') return;
      const done = presence.register();
      anims.current.forEach((x) => x.cancel());
      const played = play(el, exit, transition, 'forwards');
      anims.current = played.anims;
      cancelTween.current = played.cancels;
      if (!played.anims.length) {
        done();
        return;
      }
      Promise.all(played.anims.map((x) => x.finished)).then(() => done()).catch(() => done());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presence.exiting]);

    // layout: when the element has moved since the last render, slide it from the old spot
    const lastRect = useRef<{ left: number; top: number } | null>(null);
    useIsoLayoutEffect(() => {
      const el = ref.current;
      if (!layout || !el) return;
      const r = el.getBoundingClientRect();
      const last = lastRect.current;
      lastRect.current = { left: r.left, top: r.top };
      if (!last || typeof el.animate !== 'function') return;
      const dx = last.left - r.left;
      const dy = last.top - r.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      const t = timing(transition);
      el.animate([{ translate: `${dx}px ${dy}px` }, { translate: '0px 0px' }] as unknown as Keyframe[], { duration: Math.max(t.duration, 150), easing: t.easing });
    });

    useEffect(
      () => () => {
        anims.current.forEach((a) => a.cancel());
        cancelTween.current.forEach((c) => c());
      },
      [],
    );

    const { style: shownStyle, attrs } = split(shown);
    const attrProps: Record<string, Primitive> = {};
    for (const [k, v] of Object.entries(attrs)) attrProps[k] = v;
    const userStyle: Record<string, unknown> = { ...(style as Record<string, unknown>) };
    if ('originX' in userStyle || 'originY' in userStyle) {
      userStyle.transformOrigin = `${userStyle.originX ?? '50%'} ${userStyle.originY ?? '50%'}`;
      delete userStyle.originX;
      delete userStyle.originY;
    }
    return createElement(tag, { ...rest, ...attrProps, ref: setRefs, style: { ...userStyle, ...shownStyle } }, children);
  });
  Comp.displayName = `motion.${tag}`;
  return Comp;
}

type MotionComponents = {
  [K in keyof JSX.IntrinsicElements]: ForwardRefExoticComponent<
    Omit<JSX.IntrinsicElements[K], 'ref' | 'style'> & { style?: CSSProperties & { originX?: string | number; originY?: string | number } } & MotionProps & RefAttributes<Element>
  >;
};

const cache: Record<string, ReturnType<typeof makeMotion>> = {};
export const motion = new Proxy({} as MotionComponents, {
  get: (_t, tag: string) => (cache[tag] ??= makeMotion(tag)),
});

// ---- AnimatePresence ---------------------------------------------------------------------------
interface Item {
  key: string;
  element: ReactElement;
  exiting: boolean;
}

export function AnimatePresence({
  children,
  initial = true,
  mode = 'sync',
}: {
  children?: ReactNode;
  initial?: boolean;
  mode?: 'sync' | 'wait' | 'popLayout';
}) {
  const [, force] = useReducer((n: number) => n + 1, 0);
  const present = useRef<Item[]>([]);
  const firstKeys = useRef<Set<string> | null>(null);
  const controllers = useRef<Record<string, { count: number; finished: boolean }>>({});

  const incoming: Item[] = [];
  Children.forEach(children, (c) => {
    if (isValidElement(c)) incoming.push({ key: String(c.key ?? incoming.length), element: c, exiting: false });
  });
  if (firstKeys.current === null) firstKeys.current = new Set(incoming.map((i) => i.key));

  const incomingKeys = new Set(incoming.map((i) => i.key));
  const result = [...incoming];
  const prev = present.current;
  prev.forEach((p, idx) => {
    if (incomingKeys.has(p.key)) return;
    let at = 0;
    for (let j = idx - 1; j >= 0; j--) {
      const pos = result.findIndex((r) => r.key === prev[j].key);
      if (pos >= 0) {
        at = pos + 1;
        break;
      }
    }
    result.splice(at, 0, { ...p, exiting: true });
  });
  present.current = result;

  const complete = (key: string) => {
    const c = controllers.current[key];
    if (!c || c.finished) return;
    c.finished = true;
    present.current = present.current.filter((i) => i.key !== key);
    delete controllers.current[key];
    force();
  };

  const visible = mode === 'wait' && result.some((r) => r.exiting) ? result.filter((r) => r.exiting) : result;

  return (
    <>
      {visible.map((item) => {
        let ctl = controllers.current[item.key];
        if (item.exiting && !ctl) {
          ctl = controllers.current[item.key] = { count: 0, finished: false };
          // after the children's layout effects have registered their exits
          setTimeout(() => {
            if (controllers.current[item.key]?.count === 0) complete(item.key);
          }, 0);
          setTimeout(() => complete(item.key), 2500); // safety net
        }
        const value: Presence = {
          exiting: item.exiting,
          skipInitial: !initial && !!firstKeys.current?.has(item.key),
          register: () => {
            const c = controllers.current[item.key];
            if (c) c.count += 1;
            return () => {
              const cc = controllers.current[item.key];
              if (!cc) return;
              cc.count -= 1;
              if (cc.count <= 0) complete(item.key);
            };
          },
        };
        return (
          <PresenceCtx.Provider key={item.key} value={value}>
            {item.element}
          </PresenceCtx.Provider>
        );
      })}
    </>
  );
}
