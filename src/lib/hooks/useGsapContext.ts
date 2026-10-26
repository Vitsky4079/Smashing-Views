"use client";

import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs `fn` inside a gsap.context scoped to `scope`; everything created inside
 * (tweens, timelines, ScrollTriggers) is reverted on unmount / dependency change.
 */
export function useGsapContext(
  fn: (self: gsap.Context) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(fn, scope.current);
    return () => ctx.revert();
  }, deps);
}
