"use client";

import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Scrolls to a y/selector using Lenis when active, native otherwise. */
export function scrollToTarget(target: number | string | HTMLElement, opts?: { immediate?: boolean; offset?: number }) {
  if (instance) {
    instance.scrollTo(target, { immediate: opts?.immediate, offset: opts?.offset ?? 0, duration: 1.2 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: opts?.immediate ? "auto" : "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: opts?.immediate ? "auto" : "smooth" });
  }
}
