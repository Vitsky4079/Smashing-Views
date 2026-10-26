"use client";

import { useRef } from "react";
import { CalendarCheck, Send, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { useT } from "@/lib/i18n";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { MaskText } from "@/components/motion/MaskText";

const icons = [SlidersHorizontal, Send, CalendarCheck];

/** Three connected milestones; a glowing line fills as the section scrolls. */
export function Process() {
  const t = useT();
  const p = t.process;
  const root = useRef<HTMLElement>(null);

  useGsapContext(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-fill]", { scaleX: 1, scaleY: 1 });
      gsap.set("[data-step]", { opacity: 1 });
      return;
    }
    const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
    gsap.set("[data-fill]", { scaleX: 0, scaleY: 0 });
    gsap.set(steps, { opacity: 0.35 });

    gsap.to("[data-fill-h]", { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-track]", start: "top 70%", end: "bottom 55%", scrub: 0.5 } });
    gsap.to("[data-fill-v]", { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 60%", scrub: 0.5 } });

    steps.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 65%",
        onEnter: () => {
          gsap.to(el, { opacity: 1, duration: 0.6 });
          el.dataset.on = "true";
        },
        onLeaveBack: () => {
          gsap.to(el, { opacity: 0.35, duration: 0.4 });
          el.dataset.on = "false";
        },
      });
    });
  }, root);

  return (
    <section ref={root} id="proces" className="relative py-28 md:py-40" aria-labelledby="process-title">
      <div className="wrap">
        <p className="label label-green mb-6">{p.eyebrow}</p>
        <MaskText id="process-title" lines={p.title} className="h-lg" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />

        <div className="relative mt-20">
          {/* horizontal track (md+) */}
          <div data-track className="absolute left-0 right-0 top-[2.125rem] hidden h-px bg-line-strong md:block" aria-hidden="true">
            <div data-fill data-fill-h className="h-full origin-left bg-green shadow-[0_0_14px_2px_rgba(127,227,75,.6)]" />
          </div>
          {/* vertical track (mobile) */}
          <div className="absolute bottom-4 left-[2.125rem] top-4 w-px bg-line-strong md:hidden" aria-hidden="true">
            <div data-fill data-fill-v className="h-full origin-top bg-green shadow-[0_0_14px_2px_rgba(127,227,75,.6)]" />
          </div>

          <ol data-steps className="relative grid gap-14 md:grid-cols-3 md:gap-10">
            {p.steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.n} data-step className="relative pl-24 md:pl-0">
                  <div className="absolute left-0 top-0 flex size-[4.25rem] items-center justify-center border border-green/60 bg-bg md:static md:mb-10">
                    <Icon className="size-7 text-green" strokeWidth={1.4} aria-hidden />
                  </div>
                  <p className="display text-[clamp(3.5rem,6vw,6rem)] text-green">
                    {s.n}
                  </p>
                  <h3 className="display mt-4 text-[clamp(1.5rem,2.2vw,2.1rem)]">{s.title}</h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-mute">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-16 flex items-center gap-3 border border-line px-5 py-4 text-sm text-ink/85 md:max-w-xl">
          <ShieldCheck className="size-5 shrink-0 text-green" strokeWidth={1.5} aria-hidden />
          {p.note}
        </p>
      </div>
    </section>
  );
}
