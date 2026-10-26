/**
 * Custom looping motion-graphic concepts for each service tile (pure SVG + CSS keyframes,
 * no images). Animations pause via `[data-active="false"] .sv-anim` to save CPU.
 */

const G = "#7fe34b";
const L = "#b5ff7a";
const W = "#f5f7f4";

export function FacebookLiveVisual() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      <rect x="20" y="16" width="200" height="128" fill="none" stroke={W} strokeOpacity=".28" />
      <path d="M20 28V16h12M208 16h12v12M220 132v12h-12M32 144H20v-12" stroke={G} fill="none" strokeWidth="1.5" />
      <rect x="32" y="26" width="38" height="14" fill="#e5322d" />
      <circle cx="41" cy="33" r="2.4" fill="#fff" className="sv-anim live-dot" />
      <text x="48" y="36.6" fontSize="8" fontWeight="700" fill="#fff" fontFamily="var(--font-space-grotesk)" letterSpacing="1">LIVE</text>
      <text x="176" y="37" fontSize="8" fill={L} fontFamily="var(--font-jetbrains)" className="sv-anim sv-blink">+ viewers</text>
      {Array.from({ length: 18 }).map((_, i) => (
        <rect key={i} x={36 + i * 10} y="64" width="5" height="64" fill={i % 4 === 0 ? L : G} opacity={0.85} className="sv-anim sv-bar" style={{ animationDelay: `${(i * 97) % 1100}ms`, animationDuration: `${1.2 + (i % 5) * 0.2}s` }} />
      ))}
      <line x1="32" y1="132" x2="208" y2="132" stroke={W} strokeOpacity=".3" />
    </svg>
  );
}

export function YouTubeVisual() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      <rect x="24" y="18" width="192" height="108" rx="2" fill="none" stroke={W} strokeOpacity=".28" />
      <g style={{ transformOrigin: "120px 72px" }} className="sv-anim sv-spin">
        <circle cx="120" cy="72" r="38" fill="none" stroke={G} strokeOpacity=".5" strokeDasharray="3 7" />
      </g>
      <circle cx="120" cy="72" r="26" fill="none" stroke={G} strokeWidth="1.5" />
      <path d="M113 60 L135 72 L113 84 Z" fill={L} />
      <line x1="24" y1="142" x2="216" y2="142" stroke={W} strokeOpacity=".25" strokeWidth="3" />
      <rect x="24" y="140.5" width="192" height="3" fill={G} className="sv-anim sv-progress" />
      <circle cx="24" cy="142" r="4.5" fill={L} className="sv-anim sv-scrub" />
      <path d="M24 30V18h12M204 18h12v12" stroke={G} fill="none" strokeWidth="1.5" />
      <text x="32" y="118" fontSize="8" fill={W} fillOpacity=".6" fontFamily="var(--font-jetbrains)">00:00 / LIVE</text>
    </svg>
  );
}

export function VideoVisibilityVisual() {
  const tracks = [
    { y: 34, w: 70, x: 30, d: 0 },
    { y: 62, w: 96, x: 64, d: 400 },
    { y: 90, w: 54, x: 112, d: 800 },
  ];
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={24 + i * 27} y1="20" x2={24 + i * 27} y2="128" stroke={W} strokeOpacity=".1" />
      ))}
      {tracks.map((t, i) => (
        <g key={i}>
          <rect x="24" y={t.y} width="192" height="18" fill="none" stroke={W} strokeOpacity=".18" />
          <rect x={t.x} y={t.y + 3} width={t.w} height="12" fill={i === 1 ? L : G} opacity=".85" className="sv-anim sv-clip" style={{ animationDelay: `${t.d}ms` }} />
        </g>
      ))}
      <g className="sv-anim sv-playhead-svg">
        <line x1="24" y1="14" x2="24" y2="132" stroke={L} strokeWidth="1.5" />
        <path d="M19 10h10l-5 7z" fill={L} />
      </g>
      <polyline points="24,150 56,146 88,148 120,138 152,140 184,130 216,126" fill="none" stroke={G} strokeWidth="1.5" pathLength={1} strokeDasharray={1} className="sv-anim sv-trace" />
    </svg>
  );
}

export function SocialNetworkVisual() {
  const pts = [
    { x: 120, y: 80, label: "", r: 9 },
    { x: 48, y: 42, label: "fb", r: 12 },
    { x: 192, y: 40, label: "yt", r: 12 },
    { x: 56, y: 124, label: "ig", r: 12 },
    { x: 188, y: 124, label: "tt", r: 12 },
  ];
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {pts.slice(1).map((p, i) => (
        <line key={i} x1="120" y1="80" x2={p.x} y2={p.y} stroke={G} strokeOpacity=".5" className="sv-anim flow" />
      ))}
      <polygon points="48,42 192,40 188,124 56,124" fill="none" stroke={W} strokeOpacity=".12" />
      <circle cx="120" cy="80" r="9" fill={G} />
      <circle cx="120" cy="80" r="9" fill="none" stroke={G} className="sv-anim sv-pulse" />
      <circle cx="120" cy="80" r="9" fill="none" stroke={G} className="sv-anim sv-pulse" style={{ animationDelay: "1.1s" }} />
      {pts.slice(1).map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r={p.r} fill="#080a08" stroke={L} strokeWidth="1.5" />
          <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="8" fill={L} fontFamily="var(--font-jetbrains)">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

export const serviceVisuals = {
  "fb-live": FacebookLiveVisual,
  "yt-live": YouTubeVisual,
  video: VideoVisibilityVisual,
  social: SocialNetworkVisual,
} as const;
