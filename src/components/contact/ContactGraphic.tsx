import { LogoMark } from "@/components/brand/Logo";

const nodes: Array<[number, number]> = [
  [60, 90], [150, 40], [260, 110], [350, 50], [450, 140], [120, 200], [240, 250], [380, 230], [500, 260], [300, 160], [90, 320], [210, 360], [420, 340], [520, 90],
];
const links: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [2, 9], [9, 6], [9, 4], [5, 10], [6, 11], [7, 12], [4, 13], [3, 13], [10, 11], [11, 12],
];

/** Decorative communication graphic: connected nodes, travelling light trails, logo geometry. */
export function ContactGraphic() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMaxYMid slice">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#7fe34b" strokeOpacity=".28" />
        ))}
        {links.filter((_, i) => i % 2 === 0).map(([a, b], i) => (
          <line key={`f${i}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#b5ff7a" strokeWidth="1.4" className="sv-anim flow" style={{ animationDelay: `${i * 180}ms` }} />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i % 4 === 0 ? 4.5 : 3} fill="#080a08" stroke="#b5ff7a" strokeWidth="1.4" />
            {i % 3 === 0 && <circle cx={x} cy={y} r="4" fill="none" stroke="#7fe34b" className="sv-anim sv-pulse" style={{ animationDelay: `${i * 140}ms` }} />}
          </g>
        ))}
      </svg>
      <div className="sv-draw-loop absolute right-[4%] top-[18%] w-[min(60%,420px)] opacity-60">
        <LogoMark outline strokeWidth={1.2} className="w-full" />
      </div>
    </div>
  );
}
