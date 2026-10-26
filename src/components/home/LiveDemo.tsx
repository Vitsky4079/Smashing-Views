"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { useLocale, useNf, useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { VIEWER_OPTIONS, type ViewerOption, getFacebookLivePrice, formatPLN } from "@/data/pricing";
import { MaskText } from "@/components/motion/MaskText";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { LiveDashboard } from "./LiveDashboard";


/** Interactive SIMULATION of Facebook LIVE package configuration. Not real activity. */
export function LiveDemo() {
  const t = useT();
  const nf = useNf();
  const locale = useLocale();
  const d = t.demo;
  const [viewers, setViewers] = useState<ViewerOption>(500);
  const duration = 60;

  return (
    <section id="demo" className="relative border-y border-line bg-surface/40 py-28 md:py-40" aria-labelledby="demo-title">
      <div className="wrap">
        <p className="label label-green mb-6">{d.eyebrow}</p>
        <MaskText id="demo-title" lines={d.title} className="h-lg" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />

        <div className="mt-14 grid gap-px bg-line lg:grid-cols-12">
          <div className="bg-bg p-4 sm:p-6 lg:col-span-8 lg:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="label label-green flex items-center gap-2">
                <span className="size-1.5 bg-green" />
                {d.label}
              </span>
            </div>
            <LiveDashboard
              viewers={viewers}
              minutes={duration}
              labels={{ live: t.hero.panel.live, viewers: t.hero.panel.viewers, activity: t.hero.panel.activity, nodes: t.hero.panel.nodes, unit: t.hero.panel.nodesUnit }}
            />
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mute">
              <Info className="mt-0.5 size-3.5 shrink-0 text-green" aria-hidden />
              {d.notice}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-bg p-6 lg:col-span-4 lg:p-8">
            <div>
              <p id="demo-select" className="label mb-4">{d.selectLabel}</p>
              <div role="radiogroup" aria-labelledby="demo-select" className="grid grid-cols-2 gap-2">
                {VIEWER_OPTIONS.map((v) => {
                  const on = v === viewers;
                  return (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setViewers(v)}
                      className={cn(
                        "min-h-14 border px-4 py-3 text-left font-display text-2xl font-semibold tabular-nums transition-all duration-300",
                        on ? "border-green bg-green/10 text-green shadow-[0_0_0_1px_var(--sv-green),0_0_32px_-8px_rgba(127,227,75,.55)]" : "border-line-strong text-ink hover:border-ink/50",
                      )}
                    >
                      {nf.format(v)}
                    </button>
                  );
                })}
              </div>
            </div>

            <dl className="divide-y divide-line border-y border-line text-sm">
              {[
                [d.params.platform, "Facebook LIVE"],
                [d.params.viewers, <AnimatedNumber key="v" value={viewers} format={(n) => `${nf.format(Math.round(n))} ${d.viewersUnit}`} />],
                [d.params.duration, `${duration} min`],
                [d.params.price, <AnimatedNumber key="p" value={getFacebookLivePrice(viewers, duration)} format={(n) => formatPLN(Math.round(n), 0, locale)} className="text-green" />],
              ].map(([k, v], i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <dt className="label">{k}</dt>
                  <dd className="font-display font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            <ButtonLink href="/pricing#kalkulator" className="w-full">
              {d.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
