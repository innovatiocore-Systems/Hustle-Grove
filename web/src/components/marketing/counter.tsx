"use client";

import * as React from "react";

/**
 * Animates the numeric portion of a value string (e.g. "12,000+", "4.8", "94%")
 * from 0 to target when it scrolls into view, preserving any prefix/suffix and
 * formatting (decimals, thousands separators).
 */
export function Counter({ value }: { value: string }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numberStr = match?.[2] ?? value;
  const suffix = match?.[3] ?? "";

  const target = parseFloat(numberStr.replace(/,/g, ""));
  const decimals = numberStr.includes(".")
    ? numberStr.split(".")[1].length
    : 0;
  const useGrouping = numberStr.includes(",");

  const [display, setDisplay] = React.useState(
    match ? `${prefix}0${suffix}` : value
  );

  React.useEffect(() => {
    if (!match || Number.isNaN(target)) return;
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      `${prefix}${n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping,
      })}${suffix}`;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(format(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDisplay(format(target));
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>{display}</span>;
}
