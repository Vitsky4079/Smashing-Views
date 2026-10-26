"use client";

import { useRef, type ElementType } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { useIntroReady } from "@/components/motion/IntroLoader";
import { cn } from "@/lib/cn";

type Props = {
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  /** Per-line class (e.g. highlight a line in green). */
  lineClassName?: (i: number) => string | undefined;
  /** Hold the lines hidden; caller reveals them (used by the hero timeline). */
  manual?: boolean;
  start?: string;
};

/**
 * Headline with a line-by-line mask reveal triggered when it scrolls into view
 * (and only after the first-load intro has finished).
 */
export function MaskText({ lines, as: Tag = "h2", id, className, lineClassName, manual = false, start = "top 88%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();

  // 1) hidden state (stays visible without JS / with reduced motion)
  useGsapContext(() => {
    if (prefersReducedMotion()) return;
    const inner = ref.current?.querySelectorAll<HTMLElement>(".mask-line > span");
    if (inner?.length) gsap.set(inner, { yPercent: 160 });
  }, ref);

  // 2) reveal trigger once the intro is done
  useGsapContext(() => {
    if (manual || !ready || prefersReducedMotion()) return;
    const inner = ref.current?.querySelectorAll<HTMLElement>(".mask-line > span");
    if (!inner?.length) return;
    ScrollTrigger.create({
      trigger: ref.current,
      start,
      once: true,
      onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.09 }),
    });
  }, ref, [ready]);

  return (
    <Tag ref={ref} id={id} className={cn("display", className)}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span className={lineClassName?.(i)}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
