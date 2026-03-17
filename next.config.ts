import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const usePolling = process.env.NEXT_DEV_POLL === "1";
const isImageUnoptimized = process.env.NEXT_IMAGE_UNOPTIMIZED === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Keep optimization enabled by default for better Core Web Vitals.
    // Set NEXT_IMAGE_UNOPTIMIZED=1 only for fully static deployments.
    unoptimized: isImageUnoptimized,
    // Allow higher-quality output for UI screenshots that look soft at the default q=75.
    qualities: [75, 85, 90],
    // Allow local SVG icons to render in next/image
    dangerouslyAllowSVG: true,
  },
  // Enable polling when developing on WSL or network drives.
  ...(isDev && usePolling
    ? {
        watchOptions: {
          pollIntervalMs: 1000,
        },
      }
    : {}),
};

export default nextConfig;
