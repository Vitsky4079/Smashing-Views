"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { LogoMark } from "@/components/brand/Logo";
import { useT } from "@/lib/i18n";

const KEY = "sv-intro-seen";

const IntroContext = createContext<{ ready: boolean }>({ ready: false });
/** `ready` flips true once the first-load intro has finished (or was skipped). */
export const useIntroReady = () => useContext(IntroContext).ready;

/**
 * Short branded first-load intro. Shown once per browser session.
 * `<html data-intro="seen">` is set by an inline script in the root layout (before paint)
 * so returning visitors never see the overlay.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const t = useT();
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    document.documentElement.dataset.intro = "seen";
    getLenis()?.start();
    setReady(true);
  }, []);

  useEffect(() => {
    const seen = document.documentElement.dataset.intro === "seen";
    const el = root.current;
    if (seen || prefersReducedMotion() || !el) {
      queueMicrotask(finish);
      return;
    }
    getLenis()?.stop();
    const ctx = gsap.context(() => {
      const draws = el.querySelectorAll<SVGElement>("[data-draw]");
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { display: "none" });
          finish();
        },
      });
      tlRef.current = tl;
      gsap.set(draws, { strokeDashoffset: 1, strokeOpacity: 0 });
      tl.to(draws, { strokeDashoffset: 0, strokeOpacity: 1, duration: 1.1, ease: "power2.inOut", stagger: 0.12 })
        .to(el.querySelectorAll("[data-fill]"), { opacity: 1, duration: 0.4, ease: "power1.out" }, "-=0.2")
        .fromTo("[data-intro-text]", { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.08 }, "-=0.5")
        .fromTo("[data-intro-bar]", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "<")
        .to({}, { duration: 0.25 })
        .to("[data-intro-content]", { opacity: 0, scale: 0.94, duration: 0.35, ease: "power2.in" })
        .to(el, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "-=0.1");
    }, el);
    return () => ctx.revert();
  }, [finish]);

  return (
    <IntroContext.Provider value={{ ready }}>
      <div
        ref={root}
        className="intro fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        aria-hidden="true"
      >
        <div data-intro-content className="flex flex-col items-center gap-8">
          <LogoMark outline className="w-[min(62vw,22rem)]" strokeWidth={1.8} />
          <div className="flex flex-col items-center gap-3">
            <div className="mask-line">
              <span data-intro-text className="display text-2xl tracking-[0.02em] text-ink sm:text-3xl">
                SMASHING <span className="text-green">VIEWS</span>
              </span>
            </div>
            <div data-intro-bar className="h-px w-40 origin-left bg-green" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            tlRef.current?.progress(1);
          }}
          className="label absolute bottom-6 right-6 hover:text-ink"
        >
          {t.intro.skip}
        </button>
      </div>
      {children}
    </IntroContext.Provider>
  );
}
