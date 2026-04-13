import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Meus Peptídeos — A ciência por trás dos compostos da nova medicina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "#0f172a",
            border: "3px solid #2dd4bf",
            marginBottom: 32,
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 512 512"
            fill="none"
          >
            <path
              d="M148 310 L216 200 L296 310 L364 200"
              stroke="#2dd4bf"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="148" cy="310" r="28" fill="#14b8a6" />
            <circle cx="216" cy="200" r="28" fill="#14b8a6" />
            <circle cx="296" cy="310" r="28" fill="#14b8a6" />
            <circle cx="364" cy="200" r="28" fill="#14b8a6" />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          Meus Peptídeos
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "#2dd4bf",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          A ciência por trás dos compostos da nova medicina
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 40,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          meuspeptideos.com.br
        </div>
      </div>
    ),
    { ...size }
  );
}
