import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iOS (no rounded corners — iOS applies its own mask).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6 55%, #d946ef)",
          color: "white",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        AK
      </div>
    ),
    size,
  );
}
