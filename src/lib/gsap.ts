"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Coarse pointer / narrow viewport → reduced animation complexity. */
export const isLiteDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(pointer: coarse)").matches);
