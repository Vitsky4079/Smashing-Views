"use client";

import { useState } from "react";
import { Clock, Users } from "lucide-react";
import { useLocale, useNf, useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import {
  DEFAULT_DURATION,
  DEFAULT_VIEWERS,
  DURATION_OPTIONS,
  VIEWER_OPTIONS,
  formatPLN,
  getFacebookLivePrice,
  type DurationOption,
  type ViewerOption,
} from "@/data/pricing";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

const glow = "border-green bg-green/10 text-green shadow-[0_0_0_1px_var(--sv-green),0_0_34px_-8px_rgba(127,227,75,.6)]";

/** Option tile used for both the selectors and the matrix cells. */
function OptionGroup<T extends number>({
  label,
  icon,
  options,
  value,
  onChange,
  render,
}: {
  label: string;
  icon: React.ReactNode;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render: (v: T) => React.ReactNode;
}) {
  const id = `grp-${label.replace(/\s/g, "")}`;
  return (
    <div>
      <p id={id} className="label mb-3 flex items-center gap-2">
        {icon}
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={id} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((o, i) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => onChange(o)}
              onKeyDown={(e) => {
                const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                if (!dir) return;
                e.preventDefault();
                const next = options[(i + dir + options.length) % options.length];
                onChange(next);
                (e.currentTarget.parentElement?.children[(i + dir + options.length) % options.length] as HTMLElement)?.focus();
              }}
              className={cn(
                "min-h-[4.5rem] border px-4 py-3 text-left transition-all duration-300",
                on ? glow : "border-line-strong text-ink hover:border-ink/50",
              )}
            >
              {render(o)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Custom visual indicator: viewer "stack" bars + duration arc, both driven by the selection. */
function ConfigMeter({ viewers, duration }: { viewers: ViewerOption; duration: DurationOption }) {
  const nf = useNf();
  const vi = VIEWER_OPTIONS.indexOf(viewers);
  const frac = duration / 150;
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 200 84" className="h-24 w-full" role="img" aria-label={`${nf.format(viewers)} / ${duration} min`}>
      {VIEWER_OPTIONS.map((v, i) => {
        const on = i <= vi;
        const h = 14 + i * 16;
        return (
          <g key={v}>
            <rect x={6 + i * 24} y={78 - h} width="16" height={h} fill="none" stroke="#f5f7f4" strokeOpacity=".16" />
            <rect
              x={6 + i * 24}
              y={78 - h}
              width="16"
              height={h}
              fill="#7fe34b"
              style={{ transformBox: "fill-box", transformOrigin: "bottom", transform: `scaleY(${on ? 1 : 0})`, opacity: i === vi ? 1 : 0.45, transition: "transform .6s cubic-bezier(.16,1,.3,1), opacity .4s" }}
            />
          </g>
        );
      })}
      <g transform="translate(152 42)">
        <circle r={R} fill="none" stroke="#f5f7f4" strokeOpacity=".14" strokeWidth="5" />
        <circle
          r={R}
          fill="none"
          stroke="#b5ff7a"
          strokeWidth="5"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - frac)}
          transform="rotate(-90)"
          style={{ transition: "stroke-dashoffset .7s cubic-bezier(.16,1,.3,1)" }}
        />
        <text textAnchor="middle" y="5" fontSize="15" fontWeight="700" fill="#f5f7f4" fontFamily="var(--font-space-grotesk)">
          {duration}
        </text>
        <text textAnchor="middle" y="18" fontSize="6" fill="#9ea5a0" fontFamily="var(--font-jetbrains)" letterSpacing="1">
          MIN
        </text>
      </g>
    </svg>
  );
}

export function Configurator({ initialViewers, initialDuration }: { initialViewers?: ViewerOption; initialDuration?: DurationOption }) {
  const t = useT();
  const nf = useNf();
  const locale = useLocale();
  const c = t.pricing.calc;
  const m = t.pricing.matrix;
  const [viewers, setViewers] = useState<ViewerOption>(initialViewers ?? DEFAULT_VIEWERS);
  const [duration, setDuration] = useState<DurationOption>(initialDuration ?? DEFAULT_DURATION);
  const price = getFacebookLivePrice(viewers, duration);

  const contactHref = `/contact?service=facebook-live&viewers=${viewers}&duration=${duration}&price=${price}#formularz`;

  return (
    <section id="kalkulator" className="relative scroll-mt-24 py-16 md:py-24" aria-labelledby="calc-title">
      <div className="wrap">
        <p className="label label-green mb-5">{t.pricing.eyebrow}</p>
        <MaskText id="calc-title" lines={[c.title]} className="h-md mb-12" />

        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <OptionGroup
              label={c.viewers}
              icon={<Users className="size-3.5 text-green" aria-hidden />}
              options={VIEWER_OPTIONS}
              value={viewers}
              onChange={setViewers}
              render={(v) => (
                <>
                  <span className="display block text-2xl tabular-nums leading-none">{nf.format(v)}</span>
                  <span className="label mt-1 block !text-[0.6rem]">{c.viewersUnit}</span>
                </>
              )}
            />
            <OptionGroup
              label={c.duration}
              icon={<Clock className="size-3.5 text-green" aria-hidden />}
              options={DURATION_OPTIONS}
              value={duration}
              onChange={setDuration}
              render={(v) => (
                <>
                  <span className="display block text-2xl tabular-nums leading-none">{v}</span>
                  <span className="label mt-1 block !text-[0.6rem]">{c.minutes}</span>
                </>
              )}
            />

            {/* full matrix */}
            <div id="macierz" className="scroll-mt-24 pt-6">
              <h3 className="display h-md mb-2 !text-[clamp(1.4rem,2.4vw,2rem)]">{m.title}</h3>
              <p className="mb-5 text-sm text-mute">{m.sub}</p>
              <div className="grid grid-cols-[3.4rem_repeat(4,minmax(0,1fr))] gap-1 sm:grid-cols-[6rem_repeat(4,minmax(0,1fr))]" role="group" aria-label={m.title}>
                <div className="contents">
                  <div className="label flex items-end pb-2 !text-[0.55rem] sm:!text-[0.65rem]">{m.corner}</div>
                  {VIEWER_OPTIONS.map((v) => (
                    <div key={v} className={cn("pb-2 text-center font-display text-sm font-semibold tabular-nums transition-colors sm:text-lg", v === viewers ? "text-green" : "text-ink/70")}>
                      {nf.format(v)}
                    </div>
                  ))}
                </div>
                {DURATION_OPTIONS.map((d) => (
                  <div key={d} className="contents">
                    <div className={cn("flex items-center font-display text-sm font-semibold tabular-nums transition-colors sm:text-lg", d === duration ? "text-green" : "text-ink/70")}>
                      {d}<span className="label ml-1 !text-[0.55rem]">min</span>
                    </div>
                    {VIEWER_OPTIONS.map((v) => {
                      const on = v === viewers && d === duration;
                      const inCross = v === viewers || d === duration;
                      return (
                        <button
                          key={v}
                         
                          type="button"
                          aria-label={`${m.select}: ${nf.format(v)}, ${d} min — ${formatPLN(getFacebookLivePrice(v, d), 0, locale)}`}
                          aria-pressed={on}
                          onClick={() => {
                            setViewers(v);
                            setDuration(d);
                          }}
                          className={cn(
                            "min-h-12 border py-3 text-center font-display text-[0.8rem] font-semibold tabular-nums transition-all duration-300 sm:min-h-14 sm:text-base",
                            on ? glow : inCross ? "border-line-strong bg-surface text-ink" : "border-line text-ink/75 hover:border-ink/40 hover:text-ink",
                          )}
                        >
                          {formatPLN(getFacebookLivePrice(v, d), 0, locale)}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* sticky summary */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Reveal>
              <div className="panel tick-corners p-6 sm:p-8" aria-live="polite">
                <p className="label label-green flex items-center gap-2">
                  <span className="live-dot size-1.5 rounded-full bg-green" />
                  {c.platform}
                </p>
                <ConfigMeter viewers={viewers} duration={duration} />
                <dl className="mt-4 space-y-1">
                  <dt className="sr-only">{c.viewers}</dt>
                  <dd className="display text-[clamp(1.8rem,3vw,2.6rem)] tabular-nums">
                    <AnimatedNumber value={viewers} format={(n) => `${nf.format(Math.round(n))} ${c.viewersUnit}`} />
                  </dd>
                  <dt className="sr-only">{c.duration}</dt>
                  <dd className="display text-[clamp(1.8rem,3vw,2.6rem)] tabular-nums text-ink/60">
                    <AnimatedNumber value={duration} format={(n) => `${Math.round(n)} ${c.minutes}`} />
                  </dd>
                </dl>
                <div className="mt-6 border-t border-line pt-6">
                  <p className="label">{c.total}</p>
                  <p className="display mt-2 text-[clamp(3.2rem,6vw,5rem)] tabular-nums text-green [text-shadow:0_0_40px_rgba(127,227,75,.35)]">
                    <AnimatedNumber value={price} format={(n) => formatPLN(n, 2, locale)} />
                  </p>
                </div>
                <ButtonLink href={contactHref} className="mt-7 w-full">
                  {c.cta}
                </ButtonLink>
                <p className="mt-4 text-xs leading-relaxed text-mute">{c.note}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
