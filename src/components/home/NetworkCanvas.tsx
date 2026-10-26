"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { isLiteDevice, prefersReducedMotion } from "@/lib/gsap";

export type NetState = {
  /** 0→1: nodes populate and edges appear. */
  reveal: number;
  /** 0→1: free network organises into the technical lattice (scroll-driven). */
  organize: number;
  /** Pointer parallax, -1..1. */
  mx: number;
  my: number;
  /** Hub (panel centre) in 0..1 viewport coordinates. */
  hubX: number;
  hubY: number;
};

export const createNetState = (): NetState => ({ reveal: 0, organize: 0, mx: 0, my: 0, hubX: 0.7, hubY: 0.5 });

type Node = { x: number; y: number; z: number; ph: number; gx: number; gy: number };
type Packet = { from: number; t: number; speed: number };

const GREEN = "127,227,75";
const LIME = "181,255,122";

/**
 * Canvas-2D audience network: drifting nodes, proximity edges, packets travelling to the
 * hub, pulse rings, and a scroll-driven morph into the site's 72px technical lattice.
 * Pauses off-screen / when the tab is hidden; static frame for reduced motion.
 */
export function NetworkCanvas({ stateRef, className }: { stateRef: MutableRefObject<NetState>; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // lattice follows the site grid (4.5rem), so it scales with the desktop UI zoom
    const GRID = 4.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const lite = isLiteDevice();
    const still = prefersReducedMotion();
    const count = lite ? 34 : 84;
    const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.6);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const pulses: number[] = [0, 0.5];

    const build = () => {
      const cols = Math.ceil(w / GRID);
      const rows = Math.ceil(h / GRID);
      nodes = Array.from({ length: count }, (_, i) => {
        const gx = Math.floor(Math.random() * cols) * GRID;
        const gy = Math.floor(Math.random() * rows) * GRID;
        return {
          // bias toward the right half where the panel lives, but fill the field
          x: Math.random() * 0.95 + 0.02,
          y: Math.random() * 0.95 + 0.02,
          z: 0.35 + Math.random() * 0.65,
          ph: Math.random() * Math.PI * 2 + i,
          gx,
          gy,
        };
      });
      packets.length = 0;
      for (let i = 0; i < (lite ? 6 : 16); i++) packets.push({ from: (Math.random() * count) | 0, t: Math.random(), speed: 0.12 + Math.random() * 0.18 });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(now / 1000, dt);
    };

    const draw = (time: number, dt: number) => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, w, h);
      const org = s.organize;
      const free = 1 - org;
      const hubX = s.hubX * w;
      const hubY = s.hubY * h;

      // lattice fades in as the network organises
      if (org > 0.02) {
        ctx.strokeStyle = `rgba(${GREEN},${0.1 * org})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += GRID) {
          ctx.moveTo(x + 0.5, 0);
          ctx.lineTo(x + 0.5, h);
        }
        for (let y = 0; y <= h; y += GRID) {
          ctx.moveTo(0, y + 0.5);
          ctx.lineTo(w, y + 0.5);
        }
        ctx.stroke();
      }

      // positions
      const pos = nodes.map((n, i) => {
        const driftX = Math.sin(time * 0.18 * n.z + n.ph) * 22 * n.z;
        const driftY = Math.cos(time * 0.15 * n.z + n.ph * 1.3) * 18 * n.z;
        const fx = n.x * w + driftX + s.mx * 26 * n.z;
        const fy = n.y * h + driftY + s.my * 18 * n.z;
        const x = fx * free + n.gx * org;
        const y = fy * free + n.gy * org;
        const a = Math.max(0, Math.min(1, s.reveal * 1.5 - (i / count) * 0.5));
        return { x, y, a, z: n.z };
      });

      // edges
      const R = (lite ? 120 : 150) * free + 1;
      const R2 = R * R;
      ctx.lineWidth = 1;
      for (let i = 0; i < pos.length; i++) {
        const p = pos[i];
        if (p.a <= 0) continue;
        for (let j = i + 1; j < pos.length; j++) {
          const q = pos[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > R2) continue;
          const k = 1 - d2 / R2;
          ctx.strokeStyle = `rgba(${GREEN},${k * 0.28 * Math.min(p.a, q.a) * free})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // hub pulses
      if (s.reveal > 0.3 && free > 0.05) {
        for (let i = 0; i < pulses.length; i++) {
          pulses[i] = (pulses[i] + dt * 0.22) % 1;
          const r = pulses[i] * Math.min(w, h) * 0.42;
          ctx.strokeStyle = `rgba(${GREEN},${(1 - pulses[i]) * 0.22 * s.reveal * free})`;
          ctx.beginPath();
          ctx.arc(hubX + s.mx * 10, hubY + s.my * 8, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // packets → hub
      if (s.reveal > 0.4 && free > 0.05) {
        for (const pk of packets) {
          pk.t += dt * pk.speed;
          if (pk.t >= 1) {
            pk.t = 0;
            pk.from = (Math.random() * pos.length) | 0;
          }
          const src = pos[pk.from];
          if (!src || src.a < 0.5) continue;
          const e = pk.t * pk.t * (3 - 2 * pk.t);
          const x = src.x + (hubX - src.x) * e;
          const y = src.y + (hubY - src.y) * e;
          const alpha = Math.sin(pk.t * Math.PI) * free;
          ctx.fillStyle = `rgba(${LIME},${alpha * 0.18})`;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${LIME},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes
      for (const p of pos) {
        if (p.a <= 0) continue;
        const r = (1 + p.z * 1.6) * (1 + org * 0.4);
        ctx.fillStyle = `rgba(${GREEN},${p.a * (0.35 + p.z * 0.65)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    if (still) {
      stateRef.current.reveal = 1;
      draw(0, 0);
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [stateRef]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
