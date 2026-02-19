// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
    // Allow local SVG icons to render in next/image
    dangerouslyAllowSVG: true,
  },
  // Enable file watching via polling when using Webpack dev (useful on WSL or network drives)
  ...(isDev && usePolling
    ? {
        webpackDevMiddleware: (config) => {
          config.watchOptions = {
            // Check for changes every 1s; tune as needed
            poll: 1000,
            aggregateTimeout: 300,
          } as any;
          return config;
        },
      }
    : {}),
};

export default nextConfig;
