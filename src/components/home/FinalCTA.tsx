"use client";

import { useRef } from "react";
import { useT } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { LogoMark } from "@/components/brand/Logo";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/** Closing CTA over a huge logo built from neon lines that draw with scroll. */
export function FinalCTA() {
  const t = useT();
  const c = t.finalCta;
  const root = useRef<HTMLElement>(null);

  useGsapContext(() => {
    if (prefersReducedMotion()) return;
    const draws = gsap.utils.toArray<SVGElement>("[data-cta-mark] [data-draw]");
    gsap.set(draws, { strokeDashoffset: 1 });
    gsap.to(draws, {
      strokeDashoffset: 0,
      stagger: 0.12,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 45%", scrub: 0.8 },
    });
    gsap.fromTo("[data-cta-mark]", { scale: 0.9, rotate: -3 }, { scale: 1.05, rotate: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  }, root);

  return (
    <section ref={root} className="relative isolate overflow-hidden border-t border-line py-40 md:py-56" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        <div data-cta-mark className="w-[min(120vw,1500px)] opacity-80">
          <LogoMark strokeWidth={1.6} className="w-full [filter:drop-shadow(0_0_8px_rgba(127,227,75,.45))]" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(8,10,8,.75),rgba(8,10,8,.2)_60%,transparent)]" aria-hidden="true" />

      <div className="wrap text-center">
        <MaskText id="cta-title" lines={c.title} className="h-xl" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />
        <Reveal className="mx-auto mt-10 max-w-md">
          <p className="text-lg text-ink/85">{c.text}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/pricing">{c.primary}</ButtonLink>
          <ButtonLink href="/contact" variant="ghost" icon={false}>
            {c.secondary}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
