"use client";

import { useRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, isLiteDevice, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { TLink } from "./TLink";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex min-h-12 select-none items-center justify-center gap-3 overflow-hidden px-6 py-3 font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 will-change-transform";
const variants: Record<Variant, string> = {
  primary: "bg-green text-bg hover:bg-lime",
  ghost: "border border-line-strong text-ink hover:border-green hover:text-green",
};

function useMagnet<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  const onMove = (e: React.PointerEvent) => {
    if (isLiteDevice() || prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.35, ease: "power3.out", overwrite: "auto" });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)", overwrite: "auto" });
  };
  return { ref, onMove, onLeave };
}

type CommonProps = { variant?: Variant; icon?: boolean; className?: string; children: ReactNode };

/** Magnetic CTA rendered as a transition-aware link. */
export function ButtonLink({ href, variant = "primary", icon = true, className, children, ...rest }: CommonProps & { href: string } & Omit<React.ComponentProps<typeof TLink>, "href" | "className" | "children">) {
  const { ref, onMove, onLeave } = useMagnet<HTMLAnchorElement>();
  return (
    <TLink href={href} ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10">{children}</span>
      {icon && <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden />}
    </TLink>
  );
}

export function Button({ variant = "primary", icon = false, className, children, ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, onMove, onLeave } = useMagnet<HTMLButtonElement>(0.2);
  return (
    <button ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn(base, variants[variant], "disabled:cursor-not-allowed disabled:opacity-50", className)} {...rest}>
      <span className="relative z-10">{children}</span>
      {icon && <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden />}
    </button>
  );
}
