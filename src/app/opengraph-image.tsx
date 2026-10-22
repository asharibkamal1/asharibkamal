import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social share card for every page.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #070912 0%, #151a2e 60%, #2a1a4a 100%)",
          color: "#eef0fa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              background: "linear-gradient(100deg, #60a5fa, #a78bfa, #e879f9)",
            }}
          >
            AK
          </div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{siteConfig.domain}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 36, marginTop: 16, color: "#a78bfa" }}>{siteConfig.role}</div>
          <div style={{ fontSize: 28, marginTop: 24, color: "#9aa0bd", maxWidth: 950 }}>
            Software engineering · AI · Building online income
          </div>
        </div>
      </div>
    ),
    size,
  );
}
