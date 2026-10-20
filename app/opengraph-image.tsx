import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DataLearn: From learning to proven work.";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0E5A4E", color: "#fff" }}>
        <svg width="140" height="140" viewBox="0 0 96 96">
          <path d="M6 48H24V88H6Z" fill="#fff" />
          <path d="M28 36H46V64.08A24 24 0 0 0 28 74.73Z" fill="#fff" />
          <path d="M50 24H68V74.73A24 24 0 0 0 50 64.08Z" fill="#fff" />
          <path d="M72 12H90V88H72Z" fill="#F2A516" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>From learning to proven work.</div>
          <div style={{ fontSize: 32, opacity: 0.8 }}>DataLearn · Bridging education and employment</div>
        </div>
      </div>
    ),
    size,
  );
}
