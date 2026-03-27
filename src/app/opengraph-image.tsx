import { ImageResponse } from "next/og";
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_HEIGHT,
  DEFAULT_SOCIAL_IMAGE_WIDTH,
} from "@/lib/seo";

export const alt = DEFAULT_SOCIAL_IMAGE_ALT;
export const size = {
  width: DEFAULT_SOCIAL_IMAGE_WIDTH,
  height: DEFAULT_SOCIAL_IMAGE_HEIGHT,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #dbeafe 36%, #bfdbfe 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 12% 18%, rgba(14, 165, 233, 0.22), transparent 28%), radial-gradient(circle at 88% 18%, rgba(59, 130, 246, 0.18), transparent 24%), radial-gradient(circle at 82% 78%, rgba(15, 23, 42, 0.12), transparent 24%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 420,
            height: 420,
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.35)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 64,
            width: 240,
            height: 240,
            borderRadius: "48px",
            background: "rgba(15, 23, 42, 0.08)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "68px 72px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 82,
                height: 82,
                borderRadius: "24px",
                background: "#0f172a",
                color: "#f8fafc",
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              MK
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#0f172acc",
                }}
              >
                Portfolio
              </span>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                Mohamad Al-Kahfi
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 920,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 74,
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              Frontend Web Developer
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.35,
                color: "#0f172acc",
                maxWidth: 920,
              }}
            >
              Crafting polished digital experiences with performance,
              structure, and visual precision.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 20px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.58)",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                fontSize: 22,
                color: "#0f172acc",
              }}
            >
              Next.js
              <span style={{ color: "#64748b" }}>•</span>
              TypeScript
              <span style={{ color: "#64748b" }}>•</span>
              UI Engineering
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              al-kahfi.dev
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
