"use client";

import type { ReactNode } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";

/** Shared sub-page hero: technical label, mask-revealed headline, sub copy and a visual slot. */
export function PageHero({
  eyebrow,
  title,
  sub,
  visual,
  labels,
  accentLine = 1,
}: {
  eyebrow: string;
  title: readonly string[];
  sub: string;
  visual: ReactNode;
  labels?: string[];
  accentLine?: number;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44" aria-labelledby="page-title">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-[10%] top-0 -z-10 h-[80%] w-[55%]"
        style={{ background: "radial-gradient(closest-side, rgba(127,227,75,0.12), transparent)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-90 lg:w-[58%]" aria-hidden="true">
        {visual}
      </div>
      <div className="wrap relative">
        <p className="label label-green mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-green" />
          {eyebrow}
        </p>
        <MaskText id="page-title" as="h1" lines={title} className="text-[clamp(2.2rem,9vw,3.4rem)] md:text-[clamp(3rem,8.2vw,8.4rem)]" lineClassName={(i) => (i === accentLine ? "text-green" : undefined)} />
        <Reveal delay={0.15} className="mt-8 max-w-lg">
          <p className="text-base leading-relaxed text-mute md:text-lg">{sub}</p>
        </Reveal>
        {labels && (
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2" aria-hidden="true">
            {labels.map((l) => (
              <span key={l} className="label">{l}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
