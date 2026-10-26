"use client";

import { useT } from "@/lib/i18n";
import { LogoMark } from "@/components/brand/Logo";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";

/** Typography-led section with a technical ring graphic. No claims, no invented proof. */
export function Why() {
  const t = useT();
  const w = t.why;
  return (
    <section id="dlaczego" className="relative overflow-hidden border-t border-line py-28 md:py-40" aria-labelledby="why-title">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="label label-green mb-6">{w.eyebrow}</p>
            <MaskText id="why-title" lines={w.title} className="h-lg" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />

            <div className="relative mt-14 hidden aspect-square w-full max-w-[380px] lg:block" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
                <circle cx="100" cy="100" r="96" fill="none" stroke="#f5f7f4" strokeOpacity=".1" />
                <circle cx="100" cy="100" r="76" fill="none" stroke="#7fe34b" strokeOpacity=".5" strokeDasharray="2 6" className="sv-spin" style={{ transformOrigin: "100px 100px" }} />
                <circle cx="100" cy="100" r="56" fill="none" stroke="#f5f7f4" strokeOpacity=".14" />
                <g className="sv-spin" style={{ transformOrigin: "100px 100px", animationDuration: "26s", animationDirection: "reverse" }}>
                  <circle cx="100" cy="4" r="3" fill="#b5ff7a" />
                  <circle cx="176" cy="100" r="2" fill="#7fe34b" />
                </g>
                {Array.from({ length: 36 }).map((_, i) => (
                  <line key={i} x1="100" y1="2" x2="100" y2={i % 3 === 0 ? 10 : 6} stroke="#f5f7f4" strokeOpacity=".3" transform={`rotate(${i * 10} 100 100)`} />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <LogoMark className="w-[44%]" strokeWidth={5} />
              </div>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {w.items.map((item, i) => (
            <li key={item.title} className="group border-t border-line last:border-b">
              <Reveal className="grid grid-cols-[3.2rem_1fr] gap-4 py-8 transition-colors duration-500 group-hover:bg-surface/50 md:grid-cols-[5rem_1fr_1.1fr] md:gap-8 md:px-4">
                <span className="label pt-2 transition-colors group-hover:text-green">0{i + 1}</span>
                <h3 className="display text-[clamp(1.4rem,2.3vw,2.2rem)] leading-[1] transition-transform duration-500 group-hover:translate-x-1">{item.title}</h3>
                <p className="col-start-2 leading-relaxed text-mute md:col-start-auto">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
