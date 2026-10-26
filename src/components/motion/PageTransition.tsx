"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { LogoMark } from "@/components/brand/Logo";

const BARS = 6;

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

/**
 * Route transition: vertical bars cover the viewport with a green edge line + logo,
 * the route changes underneath, then the bars lift away. Skipped for reduced motion.
 * Never replays the intro — that lives in IntroProvider and is session-gated.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<(() => void) | null>(null);
  const pathRef = useRef(pathname);

  // When the pathname actually changes, resolve the waiting reveal.
  useEffect(() => {
    if (pathRef.current !== pathname) {
      pathRef.current = pathname;
      pending.current?.();
      pending.current = null;
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const samePage = url.pathname === window.location.pathname;

      if (samePage) {
        if (url.hash) scrollToTarget(url.hash, { offset: -80 });
        else scrollToTarget(0);
        return;
      }
      if (busy.current) return;
      const el = overlay.current;
      if (!el || prefersReducedMotion()) {
        router.push(href);
        return;
      }

      busy.current = true;
      getLenis()?.stop();
      const bars = el.querySelectorAll("[data-bar]");
      const mark = el.querySelectorAll("[data-draw]");
      gsap.set(el, { display: "block" });
      gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set(mark, { strokeDashoffset: 1, strokeOpacity: 0 });
      gsap.set(el.querySelectorAll("[data-fill]"), { opacity: 0 });
      gsap.set("[data-pt-line]", { scaleX: 0 });

      const reveal = () => {
        if (url.hash) {
          requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView());
        } else {
          window.scrollTo(0, 0);
          getLenis()?.scrollTo(0, { immediate: true });
        }
        gsap
          .timeline({
            onComplete: () => {
              gsap.set(el, { display: "none" });
              getLenis()?.start();
              busy.current = false;
            },
          })
          .to("[data-pt-logo]", { opacity: 0, duration: 0.25 })
          .set(bars, { transformOrigin: "50% 0%" })
          .to(bars, { scaleY: 0, duration: 0.6, ease: "expo.inOut", stagger: { each: 0.04, from: "end" } }, "<0.05");
      };

      gsap
        .timeline({
          onComplete: () => {
            // Wait for the new route; safety timeout so we can never get stuck.
            let done = false;
            const go = () => {
              if (done) return;
              done = true;
              reveal();
            };
            pending.current = go;
            router.push(href);
            setTimeout(go, 2500);
          },
        })
        .to(bars, { scaleY: 1, duration: 0.5, ease: "expo.inOut", stagger: { each: 0.04, from: "start" } })
        .set("[data-pt-logo]", { opacity: 1 }, "-=0.2")
        .to(mark, { strokeDashoffset: 0, strokeOpacity: 1, duration: 0.5, ease: "power2.inOut", stagger: 0.06 }, "<")
        .to(el.querySelectorAll("[data-fill]"), { opacity: 1, duration: 0.3 }, ">-0.15")
        .to("[data-pt-line]", { scaleX: 1, duration: 0.4, ease: "power3.inOut" }, "<");
    },
    [router],
  );

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div ref={overlay} className="pointer-events-none fixed inset-0 z-[90] hidden" aria-hidden="true">
        <div className="absolute inset-0 flex">
          {Array.from({ length: BARS }).map((_, i) => (
            <div key={i} data-bar className="h-full flex-1 bg-surface" style={{ borderRight: i < BARS - 1 ? "1px solid rgba(127,227,75,.12)" : undefined }} />
          ))}
        </div>
        <div data-pt-logo className="absolute inset-0 flex flex-col items-center justify-center gap-6 opacity-0">
          <LogoMark outline className="w-40 sm:w-52" strokeWidth={1.8} />
          <div data-pt-line className="h-px w-32 origin-left bg-green" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
