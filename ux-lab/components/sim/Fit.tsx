"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/** Scales a screen drawn at `width` px to the width it is given, so a picture of a platform is the real page at any size (DL-STANDARD section 5). Not clickable: the caller marks it aria-hidden. */
export function Fit({ children, width = 560 }: { children: ReactNode; width?: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ s: 0.6, h: 360 });
  useEffect(() => {
    const fit = () => {
      const w = outer.current?.clientWidth ?? width;
      const s = Math.min(1, w / width);
      setBox({ s, h: Math.ceil((inner.current?.offsetHeight ?? 0) * s) });
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (outer.current) ro.observe(outer.current);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={outer} className="w-full overflow-hidden rounded-md border border-[#8793A3] bg-white" style={{ height: box.h }}>
      <div ref={inner} style={{ width, transform: `scale(${box.s})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}
