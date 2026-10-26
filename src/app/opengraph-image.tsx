import { ImageResponse } from "next/og";
import logo from "@/components/brand/logo-paths.json";

const [vx, vy, vw, vh] = logo.viewBox;

export const alt = "Smashing Views — widoczność transmisji LIVE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#080a08", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#f5f7f4", fontFamily: "sans-serif" }}>
        <svg width="300" height={Math.round(300 * (vh / vw))} viewBox={`${vx} ${vy} ${vw} ${vh}`}>
          {logo.shapes.map((sh, i) => (
            <path key={i} d={sh.d} fill={sh.color === "green" ? "#7fe34b" : "#9ea5a0"} />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>TWOJA TRANSMISJA.</div>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1, color: "#7fe34b" }}>WIĘKSZA WIDOCZNOŚĆ.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#9ea5a0" }}>SMASHING VIEWS</div>
        </div>
      </div>
    ),
    size,
  );
}
