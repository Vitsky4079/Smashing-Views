"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/ui/TLink";
import { serviceVisuals } from "./ServiceVisuals";

/**
 * Interactive grid: on desktop the tiles behave like an accordion row (hover / focus
 * expands one and starts its preview animation); on mobile every tile is fully visible.
 */
export function Services() {
  const t = useT();
  const s = t.services;
  const [active, setActive] = useState(0);

  return (
    <section id="oferta" className="relative py-28 md:py-40" aria-labelledby="services-title">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="wrap relative">
        <p className="label label-green mb-6">{s.eyebrow}</p>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <MaskText id="services-title" lines={s.title} className="h-lg" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />
          <Reveal className="max-w-sm">
            <p className="text-mute">{s.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-16 flex flex-col gap-px bg-line lg:h-[35rem] lg:flex-row" onMouseLeave={() => undefined}>
          {s.items.map((item, i) => {
            const Visual = serviceVisuals[item.id as keyof typeof serviceVisuals];
            const isActive = active === i;
            return (
              <li
                key={item.id}
                data-active={isActive}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                className={cn(
                  "group relative flex min-w-0 flex-col justify-between overflow-hidden bg-bg p-6 transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:p-8",
                  "lg:flex-1 lg:basis-0",
                  isActive ? "lg:grow-[2.6] lg:bg-surface" : "lg:grow-[1]",
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="label">0{i + 1}</span>
                  <ArrowUpRight className={cn("size-5 transition-all duration-500", isActive ? "text-green" : "text-mute/60")} strokeWidth={1.5} aria-hidden />
                </div>

                <div
                  className={cn(
                    "pointer-events-none my-6 h-44 w-full transition-all duration-700 lg:absolute lg:w-auto lg:inset-x-8 lg:top-[5.5rem] lg:my-0 lg:h-[15.625rem]",
                    isActive ? "opacity-100 lg:scale-100" : "opacity-60 lg:scale-90 lg:opacity-35",
                  )}
                >
                  <Visual />
                </div>

                <div className="relative lg:mt-auto lg:pt-[16.875rem]">
                  <h3 className="display text-[clamp(1.6rem,6vw,2.2rem)] lg:text-[clamp(1.2rem,1.75vw,2.1rem)]">{item.name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">{item.short}</p>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-out",
                      "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0",
                      isActive && "lg:grid-rows-[1fr] lg:opacity-100",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80">{item.detail}</p>
                      <TLink
                        href={item.href}
                        className="u-link label label-green mt-5 inline-flex items-center gap-2 !text-[0.72rem]"
                        tabIndex={0}
                      >
                        {item.cta}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </TLink>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
