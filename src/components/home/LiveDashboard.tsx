"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { useNf } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const POINTS = 44;

/** Activity level (0..1) grows with the illustrative viewer count. */
const baseFor = (viewers: number) => Math.min(0.9, 0.34 + 0.56 * Math.log10(Math.max(viewers, 100) / 100));

const seriesFor = (base: number) =>
  Array.from({ length: POINTS }, (_, i) => Math.min(0.95, Math.max(0.2, base + 0.1 * Math.sin(i / 4.2) + 0.06 * Math.sin(i / 1.7))));

/** Node count adapts to the illustrative viewer count. */
export const DOT_UNIT = 25;
const DOT_COLS = 12;
const DOT_ROWS = 5;

type Props = {
  /** Illustrative viewer count (demo data only). */
  viewers: number;
  className?: string;
  /** Show the tick-corner chrome and header labels. */
  labels: { live: string; viewers: string; activity: string; nodes: string; unit: string; platform?: string };
  minutes?: number;
  /** Fires with the simulated peak so parent cards can reuse it. */
  onPeak?: (n: number) => void;
};

/**
 * Simulated broadcast panel: LIVE badge, viewer counter, activity chart, audience-node
 * network and timeline. ALL numbers are illustrative demo data, not real activity.
 */
export function LiveDashboard({ viewers, className, labels, minutes = 60, onPeak }: Props) {
  const nf = useNf();
  const [series, setSeries] = useState<number[]>(() => seriesFor(baseFor(viewers)));
  const [shown, setShown] = useState(viewers);

  // Reset the simulation when the illustrative viewer count changes (adjust state during render).
  const [prevViewers, setPrevViewers] = useState(viewers);
  if (prevViewers !== viewers) {
    setPrevViewers(viewers);
    setShown(viewers);
    setSeries(seriesFor(baseFor(viewers)));
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let peak = viewers;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.min(0.95, Math.max(0.22, last + (Math.random() - 0.5) * 0.2 + (baseFor(viewers) - last) * 0.14));
        return [...prev.slice(1), next];
      });
      const v = Math.round(viewers * (0.94 + Math.random() * 0.1));
      peak = Math.max(peak, v);
      setShown(v);
      onPeak?.(peak);
    }, 1100);
    return () => window.clearInterval(id);
  }, [viewers, onPeak]);

  const W = 400;
  const H = 120;
  const { line, area } = useMemo(() => {
    const pts = series.map((v, i) => [(i / (POINTS - 1)) * W, H - 10 - v * (H - 26)] as const);
    const l = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    return { line: l, area: `${l} L${W} ${H} L0 ${H} Z` };
  }, [series]);

  // Audience: every dot stands for DOT_UNIT illustrative viewers, so the grid fills with the counter.
  const lit = Math.min(DOT_COLS * DOT_ROWS, Math.round(shown / DOT_UNIT));

  return (
    <div className={cn("panel tick-corners scanlines relative w-full overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 bg-[#e5322d] px-2.5 py-1 font-display text-[0.7rem] font-bold tracking-[0.14em] text-white">
            <span className="live-dot size-1.5 rounded-full bg-white" />
            {labels.live}
          </span>
          <span className="label hidden sm:inline">{labels.platform ?? "Facebook LIVE"}</span>
        </div>
        <span className="label tabular-nums">00:{String(Math.min(59, minutes)).padStart(2, "0")}:00</span>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-5">
        <div className="bg-surface p-4 sm:col-span-2">
          <p className="label">{labels.viewers}</p>
          <p className="display mt-2 text-[clamp(2.4rem,5vw,3.6rem)] leading-none tabular-nums text-ink">
            <AnimatedNumber value={shown} format={(n) => nf.format(Math.round(n))} />
          </p>
          <div className="mt-4 flex items-end gap-[0.1875rem]" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => {
              const v = series[(i * 2) % POINTS];
              return <span key={i} className="w-full bg-green/70 transition-[height] duration-700" style={{ height: `${6 + v * 26}px`, opacity: 0.35 + v * 0.65 }} />;
            })}
          </div>
        </div>

        <div className="bg-surface p-4 sm:col-span-3">
          <p className="label">{labels.nodes}</p>
          <div
            className="mt-3 grid gap-[0.4rem]"
            style={{ gridTemplateColumns: `repeat(${DOT_COLS}, minmax(0, 1fr))` }}
            role="img"
            aria-label={`${labels.nodes}: ${lit} × ${DOT_UNIT} ${labels.unit}`}
          >
            {Array.from({ length: DOT_COLS * DOT_ROWS }).map((_, i) => (
              <span
                key={i}
                className={cn("aspect-square rounded-full transition-all duration-500", i < lit ? "bg-lime shadow-[0_0_8px_rgba(181,255,122,0.45)]" : "bg-ink/10")}
                style={{ transitionDelay: `${(i % DOT_COLS) * 18}ms` }}
              />
            ))}
          </div>
          <p className="label mt-3 !text-[0.62rem]">
            <span className="text-lime">●</span> = {DOT_UNIT} {labels.unit}
          </p>
        </div>
      </div>

      <div className="border-t border-line bg-surface px-4 pb-3 pt-3">
        <div className="flex items-center justify-between">
          <p className="label">{labels.activity}</p>
          <p className="label label-green">DEMO</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-24 w-full" preserveAspectRatio="none" aria-hidden="true">
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#f5f7f4" strokeOpacity="0.06" />
          ))}
          <path d={area} fill="#7fe34b" fillOpacity="0.1" style={{ transition: "d .9s linear" }} />
          <path d={line} fill="none" stroke="#b5ff7a" strokeWidth="1.6" vectorEffect="non-scaling-stroke" style={{ transition: "d .9s linear" }} />
        </svg>
        <div className="relative mt-2 h-4" aria-hidden="true">
          <div className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
          {[0, 25, 50, 75, 100].map((p) => (
            <span key={p} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-line-strong" style={{ left: `${p}%` }} />
          ))}
          <span className="sv-playhead absolute top-0 h-4 w-0.5 bg-green" />
        </div>
      </div>
    </div>
  );
}
