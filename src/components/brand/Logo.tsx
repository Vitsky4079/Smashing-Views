import { cn } from "@/lib/cn";
import logo from "./logo-paths.json";

const COLORS = { gray: "#9ea5a0", green: "#7fe34b" } as const;
const [vx, vy, vw, vh] = logo.viewBox;

/**
 * Smashing Views mark, vectorised from the supplied logo file (SMASHING.png) so it matches
 * the original exactly: gray "N" frame, green wedges with the two node rings.
 *
 * - default: filled mark (navbar, footer, …)
 * - `outline`: stroke-only paths marked `data-draw` (pathLength=1) for GSAP line-drawing, plus a
 *   hidden `data-fill` layer that animations can fade in once the strokes are drawn.
 */
export function LogoMark({
  className,
  strokeWidth = 1.6,
  outline = false,
  title,
}: {
  className?: string;
  strokeWidth?: number;
  outline?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {logo.shapes.map((s, i) => {
        const color = COLORS[s.color as keyof typeof COLORS];
        return outline ? (
          <g key={i}>
            <path data-fill d={s.d} fill={color} fillRule="evenodd" style={{ opacity: 0 }} />
            <path
              data-draw
              d={s.d}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinejoin="miter"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
            />
          </g>
        ) : (
          <path key={i} d={s.d} fill={color} fillRule="evenodd" />
        );
      })}
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("display inline-flex items-baseline gap-[0.35em] text-[0.95rem] tracking-[-0.01em]", className)}>
      <span className="text-ink">SMASHING</span>
      <span className="text-green">VIEWS</span>
    </span>
  );
}
