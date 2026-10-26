"use client";

import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef } from "react";
import type { TextareaHTMLAttributes } from "react";

/**
 * A text field that grows with what is typed, like a cell of a Google Docs table (CLAUDE.md #58): it starts at `minRows`, becomes as tall as the
 * text needs, and never cuts a long answer off or hides it behind a scrollbar. Used for every free-text field and every table cell.
 */
export function AutoTextarea({ value, minRows = 2, className, ...rest }: { value: string; minRows?: number } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "rows">) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fit = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  };
  useLayoutEffect(fit, [value]);
  useEffect(() => {
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return <textarea ref={ref} rows={minRows} value={value} className={clsx("field resize-none overflow-hidden", className)} {...rest} />;
}
