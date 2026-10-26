"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { useIntroReady } from "@/components/motion/IntroLoader";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { MaskText } from "@/components/motion/MaskText";
import { useNf } from "@/lib/i18n";
import { LiveDashboard, nodesFor } from "./LiveDashboard";
import { NetworkCanvas, createNetState, type NetState } from "./NetworkCanvas";

const DEMO_VIEWERS = 1248;

/**
 * Cinematic hero. Choreography (GSAP timeline, starts after the first-load intro):
 *  1 logo line-draw → 2 logo unfolds (rotateY) → 3 light trails → 4 dashboard materialises
 *  → 5 viewer counter → 6 audience nodes → 7 headline mask reveal → 8 CTAs.
 * Scroll: scene scales back in perspective while the network organises into the lattice.
 * Three nested wrappers (in / scroll / mouse) keep the three transform sources independent.
 * ALL viewer numbers are illustrative demo data.
 */
export function Hero() {
  const t = useT();
  const nf = useNf();
  const ready = useIntroReady();
  const root = useRef<HTMLElement>(null);
  const net = useRef<NetState>(createNetState());
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [viewers, setViewers] = useState(0);
  const [peak, setPeak] = useState(DEMO_VIEWERS);
  const h = t.hero;

  useGsapContext(() => {
    const el = root.current!;
    const q = (s: string) => el.querySelectorAll<HTMLElement>(s);
    const reduced = prefersReducedMotion();

    if (reduced) {
      net.current.reveal = 1;
      queueMicrotask(() => setViewers(DEMO_VIEWERS));
      return;
    }

    // ----- initial hidden state (visible by default for no-JS / reduced motion) -----
    const draws = q("[data-bigmark] [data-draw]");
    gsap.set(draws, { strokeDashoffset: 1 });
    gsap.set("[data-scene-in]", { opacity: 0, z: -420, rotateX: 24, rotateY: 22, clipPath: "inset(-20% -20% 100% -20%)" });
    gsap.set(q("[data-card]"), { opacity: 0, y: 30 });
    gsap.set(q("[data-trail]"), { xPercent: -120, opacity: 0 });
    gsap.set(q("[data-fade]"), { opacity: 0, y: 24 });
    gsap.set("[data-bigmark]", { rotateY: -80, scale: 1.1, opacity: 1 });

    const state = net.current;
    const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    tl.current = intro;

    intro
      // 1–2 logo draws, then unfolds
      .to(draws, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", stagger: 0.07 }, 0)
      .to("[data-bigmark]", { rotateY: 0, duration: 1.7, ease: "expo.out" }, 0.2)
      // 3 light trails
      .to(q("[data-trail]"), { opacity: 1, xPercent: 340, duration: 1.5, ease: "power2.inOut", stagger: 0.18 }, 0.9)
      .to(q("[data-trail]"), { opacity: 0, duration: 0.3 }, ">-0.3")
      // logo recedes into the background mark
      .to("[data-bigmark]", { scale: 0.82, opacity: 0.1, duration: 1.4, ease: "power2.inOut" }, 1.9)
      // 4 dashboard materialises
      .to("[data-scene-in]", { opacity: 1, z: 0, rotateX: 0, rotateY: 0, clipPath: "inset(-20% -20% 0% -20%)", duration: 1.5, ease: "expo.out", onComplete: () => gsap.set("[data-scene-in]", { clearProps: "clipPath" }) }, 1.55)
      // 5 viewer counter
      .call(() => setViewers(DEMO_VIEWERS), undefined, 2.2)
      // floating metric cards
      .to(q("[data-card]"), { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 2.3)
      // 6 audience nodes populate the field
      .to(state, { reveal: 1, duration: 2.6, ease: "power1.inOut" }, 1.7)
      // 7 headline lines (mask) then 8 CTAs
      .to(q("[data-hero-h1] .mask-line > span"), { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.12 }, 1.9)
      .to(q("[data-fade]"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 2.5);

    // ----- pointer parallax (desktop only) -----
    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    const cleanups: Array<() => void> = [];
    if (fine) {
      const rx = gsap.quickTo("[data-scene-mouse]", "rotateX", { duration: 0.9, ease: "power3.out" });
      const ry = gsap.quickTo("[data-scene-mouse]", "rotateY", { duration: 0.9, ease: "power3.out" });
      const mx = gsap.quickTo(state, "mx", { duration: 1.2, ease: "power3.out" });
      const my = gsap.quickTo(state, "my", { duration: 1.2, ease: "power3.out" });
      const cardMoves = Array.from(q("[data-card]")).map((c) => {
        const d = Number(c.dataset.depth ?? 1);
        return { x: gsap.quickTo(c.querySelector("[data-card-in]")!, "x", { duration: 1, ease: "power3.out" }), y: gsap.quickTo(c.querySelector("[data-card-in]")!, "y", { duration: 1, ease: "power3.out" }), d };
      });
      const onMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        ry(nx * 5);
        rx(-ny * 4);
        mx(nx);
        my(ny);
        cardMoves.forEach((c) => {
          c.x(nx * 16 * c.d);
          c.y(ny * 12 * c.d);
        });
      };
      el.addEventListener("pointermove", onMove);
      cleanups.push(() => el.removeEventListener("pointermove", onMove));
    }

    // ----- scroll: scene recedes in perspective, network organises into the lattice -----
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=95%", pin: true, scrub: 0.7, anticipatePin: 1 }, defaults: { ease: "none" } })
        .to("[data-scene-scroll]", { scale: 0.52, rotateX: 46, rotateY: 8, z: -520, y: -40, opacity: 0.0, duration: 1 }, 0)
        .to("[data-text]", { y: -90, opacity: 0, duration: 0.6 }, 0)
        .to("[data-bigmark-wrap]", { opacity: 0, duration: 0.4 }, 0)
        .to("[data-scrollcue-wrap]", { opacity: 0, duration: 0.2 }, 0)
        .to(state, { organize: 1, duration: 0.9 }, 0.1);
    });
    mm.add("(max-width: 1023px)", () => {
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 }, defaults: { ease: "none" } })
        .to("[data-scene-scroll]", { scale: 0.88, opacity: 0.2, y: 40, duration: 1 }, 0)
        .to(state, { organize: 0.9, duration: 1 }, 0);
    });

    return () => {
      cleanups.forEach((c) => c());
      mm.revert();
      intro.kill();
    };
  }, root);

  useEffect(() => {
    if (ready) tl.current?.play();
  }, [ready]);

  return (
    <section ref={root} id="hero" className="relative isolate overflow-hidden lg:h-[100svh] lg:min-h-[680px]" aria-labelledby="hero-title">
      <NetworkCanvas stateRef={net} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="grid-bg pointer-events-none absolute inset-0 -z-20 opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-[10%] top-[8%] -z-20 h-[70%] w-[60%]"
        style={{ background: "radial-gradient(closest-side, rgba(127,227,75,0.13), transparent)" }}
        aria-hidden="true"
      />

      {/* big logo line-drawing */}
      <div data-bigmark-wrap className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center [perspective:1200px]" aria-hidden="true">
        <div data-bigmark className="w-[min(86vw,820px)] [transform-style:preserve-3d]">
          <LogoMark strokeWidth={3.2} className="w-full" />
        </div>
      </div>

      {/* light trails */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {[22, 51, 78].map((top, i) => (
          <div key={i} data-trail className="absolute left-0 h-px w-[32vw]" style={{ top: `${top}%`, background: "linear-gradient(90deg, transparent, rgba(181,255,122,.9), transparent)" }} />
        ))}
      </div>

      <div className="wrap relative grid min-h-[100svh] items-center gap-6 pb-20 pt-28 lg:min-h-0 lg:h-full lg:grid-cols-12 lg:gap-4 lg:pb-12">
        <div data-text className="relative z-20 lg:col-span-7">
          <p data-fade className="label label-green mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-green" />
            {h.eyebrow}
          </p>
          <div data-hero-h1>
            <MaskText
              as="h1"
              manual
              lines={h.lines}
              className="text-[clamp(1.95rem,8.2vw,2.7rem)] md:text-[clamp(2.6rem,4.7vw,5.6rem)]"
              lineClassName={(i) => (i === 2 ? "text-green" : "text-ink")}
            />
          </div>
          <p id="hero-title" className="sr-only">
            {h.lines.join(" ")}
          </p>
          <p data-fade className="mt-7 max-w-[34rem] text-[0.98rem] leading-relaxed text-mute md:text-lg">
            {h.sub}
          </p>
          <div data-fade className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/pricing">{h.ctaPrimary}</ButtonLink>
            <ButtonLink href="/contact" variant="ghost" icon={false}>
              {h.ctaSecondary}
            </ButtonLink>
          </div>
        </div>

        <div className="relative z-10 mt-16 h-[420px] sm:mt-10 sm:h-[520px] lg:col-span-5 lg:mt-0 lg:h-[620px]" aria-hidden="true">
          <div className="absolute inset-0 flex items-center [perspective:1500px]">
            <div data-scene-scroll className="preserve-3d w-full will-change-transform">
              <div data-scene-mouse className="preserve-3d w-full">
                <div data-scene-in className="preserve-3d relative w-full">
                  <div className="w-full [transform:rotateY(-14deg)_rotateX(6deg)_rotateZ(0.5deg)] [transform-style:preserve-3d] lg:w-[100%]">
                    <LiveDashboard
                      viewers={viewers}
                      minutes={90}
                      onPeak={setPeak}
                      labels={{ live: h.panel.live, viewers: h.panel.viewers, activity: h.panel.activity, nodes: h.panel.nodes }}
                      className="shadow-[0_40px_120px_-30px_rgba(127,227,75,0.25)]"
                    />
                    {/* reflection */}
                    <div className="pointer-events-none mt-2 h-14 w-full opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]">
                      <div className="h-full w-full border border-line bg-surface/60" />
                    </div>
                  </div>

                  <div data-card data-depth="1.6" className="absolute -top-3 right-[4%] z-10 hidden sm:right-[6%] sm:block" style={{ transform: "translateZ(90px)" }}>
                    <div data-card-in className="panel flex items-center gap-3 px-4 py-3 backdrop-blur-sm">
                      <div>
                        <p className="label">{h.panel.card1}</p>
                        <p className="display mt-1 text-xl tabular-nums text-lime">
                          <AnimatedNumber value={viewers ? peak : 0} format={(n) => nf.format(Math.round(n))} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div data-card data-depth="1" className="absolute -right-1 top-[44%] z-10 hidden sm:block lg:-right-8" style={{ transform: "translateZ(60px)" }}>
                    <div data-card-in className="panel px-4 py-3">
                      <p className="label">{h.panel.card2}</p>
                      <p className="display mt-1 text-xl text-ink">90 min</p>
                    </div>
                  </div>
                  <div data-card data-depth="2" className="absolute -bottom-3 left-[8%] z-10 hidden sm:block lg:-bottom-2" style={{ transform: "translateZ(120px)" }}>
                    <div data-card-in className="panel px-4 py-3">
                      <p className="label">{h.panel.card3}</p>
                      <p className="display mt-1 text-xl text-ink">
                        {nodesFor(viewers || 0)} <span className="text-sm text-mute">{h.panel.nodesUnit}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-scrollcue-wrap className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <p data-fade className="label flex items-center gap-2">
          <ChevronDown className="size-3.5 text-green" />
          {h.scroll}
        </p>
      </div>
      <p data-fade className="label absolute bottom-6 left-[clamp(1.25rem,4vw,3.5rem)] hidden max-w-[18rem] lg:block">
        <span className="text-green">●</span> {h.demoNote}
      </p>
    </section>
  );
}
