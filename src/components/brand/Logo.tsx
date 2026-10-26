import { cn } from "@/lib/cn";

/**
 * Smashing Views geometric mark, redrawn as stroke paths from the supplied logo
 * (gray "N" frame, green triangles, two node circles) so it can be line-drawn.
 * Every shape carries `data-draw` + pathLength=1 for GSAP stroke reveals.
 */
export function LogoMark({
  className,
  strokeWidth = 8,
  title,
}: {
  className?: string;
  strokeWidth?: number;
  title?: string;
}) {
  const common = {
    fill: "none",
    strokeWidth,
    strokeLinejoin: "miter" as const,
    strokeLinecap: "butt" as const,
    pathLength: 1,
    "data-draw": "",
    style: { strokeDasharray: 1, strokeDashoffset: 0 },
  };
  return (
    <svg
      viewBox="-6 -6 322 192"
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* gray N frame */}
      <path d="M75 9 H103 L235 141 V165 H207 L75 33 Z" stroke="#9ea5a0" {...common} />
      <path d="M75 33 V84" stroke="#9ea5a0" {...common} />
      <path d="M235 24 V84" stroke="#9ea5a0" {...common} />
      {/* green wedges */}
      <path d="M34 43 L156 165 H75 V100" stroke="#7fe34b" {...common} />
      <path d="M272 132 L149 9 H235 V24" stroke="#7fe34b" {...common} />
      {/* nodes */}
      <circle cx="26" cy="35" r="12" stroke="#7fe34b" {...common} data-node="" />
      <circle cx="283" cy="143" r="14" stroke="#7fe34b" {...common} data-node="" />
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
