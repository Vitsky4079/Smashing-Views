/** Abstract technical backdrop for the pricing hero: stepped bars + measuring ticks. */
export function PricingHeroVisual() {
  const cols = [0.2, 0.4, 0.62, 0.85, 1];
  return (
    <svg viewBox="0 0 600 500" className="h-full w-full" preserveAspectRatio="xMaxYMid slice">
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#f5f7f4" strokeOpacity=".05" />
      ))}
      {cols.map((v, i) => (
        <g key={i}>
          <rect x={150 + i * 80} y={440 - v * 320} width="46" height={v * 320} fill="none" stroke="#7fe34b" strokeOpacity={0.25 + v * 0.5} />
          <rect x={150 + i * 80} y={440 - v * 320} width="46" height="3" fill="#b5ff7a" className="sv-anim sv-blink" style={{ animationDelay: `${i * 220}ms` }} />
          <text x={150 + i * 80} y="462" fontSize="9" fill="#9ea5a0" fontFamily="var(--font-jetbrains)" letterSpacing="1">
            {[100, 200, 500, 1000, "…"][i]}
          </text>
        </g>
      ))}
      <path d="M150 420 L230 360 L310 290 L390 200 L470 130" fill="none" stroke="#7fe34b" strokeWidth="1.4" strokeDasharray="4 8" className="flow" />
      {[
        [150, 420],
        [230, 360],
        [310, 290],
        [390, 200],
        [470, 130],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#080a08" stroke="#b5ff7a" strokeWidth="1.5" />
      ))}
      <path d="M520 60h40v40M520 440h40v-40" fill="none" stroke="#7fe34b" strokeWidth="1.5" />
    </svg>
  );
}
