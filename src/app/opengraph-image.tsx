import { ImageResponse } from "next/og";

export const alt = "Smashing Views — widoczność transmisji LIVE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#080a08", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#f5f7f4", fontFamily: "sans-serif" }}>
        <svg width="260" height="156" viewBox="-6 -6 322 192">
          <g fill="none" strokeWidth="9">
            <path d="M75 9H103L235 141V165H207L75 33Z" stroke="#9ea5a0" />
            <path d="M34 43L156 165H75V100" stroke="#7fe34b" />
            <path d="M272 132L149 9H235V24" stroke="#7fe34b" />
            <circle cx="26" cy="35" r="12" stroke="#7fe34b" />
            <circle cx="283" cy="143" r="14" stroke="#7fe34b" />
          </g>
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
