"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { useIntroReady } from "@/components/motion/IntroLoader";
import { cn } from "@/lib/cn";

/**
 * Fade/slide-in on scroll. With `stagger`, direct children animate in sequence.
 * Content is visible by default (no-JS, reduced motion) and only hidden once GSAP is ready.
 */
export function Reveal({
  children,
  className,
  stagger,
  y = 28,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useIntroReady();

  useGsapContext(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    gsap.set(stagger ? Array.from(el.children) : [el], { opacity: 0, y });
  }, ref);

  useGsapContext(() => {
    const el = ref.current;
    if (!el || !ready || prefersReducedMotion()) return;
    const targets = stagger ? Array.from(el.children) : [el];
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => gsap.to(targets, { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out", stagger: stagger ?? 0 }),
    });
  }, ref, [ready]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
