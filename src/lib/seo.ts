import { headers } from "next/headers";

const LOCALHOST_URL = "http://localhost:3000";
export const DEFAULT_SOCIAL_IMAGE_ALT =
  "Mohamad Al-Kahfi portfolio preview";
export const DEFAULT_SOCIAL_IMAGE_WIDTH = 1200;
export const DEFAULT_SOCIAL_IMAGE_HEIGHT = 630;
export const DEFAULT_OPEN_GRAPH_IMAGE_PATH = "/opengraph-image";
export const DEFAULT_TWITTER_IMAGE_PATH = "/twitter-image";
const PRODUCTION_URL_KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_URL",
  "URL",
  "DEPLOY_PRIME_URL",
  "CF_PAGES_URL",
  "RENDER_EXTERNAL_URL",
  "RAILWAY_PUBLIC_DOMAIN",
] as const;

function ensureProtocol(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

function normalizeUrl(url: string) {
  return stripTrailingSlash(ensureProtocol(url));
}

function readFirstEnvUrl(keys: readonly string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }

  return undefined;
}

export function getSiteUrl() {
  const configured = readFirstEnvUrl(["NEXT_PUBLIC_SITE_URL", "SITE_URL"]);
  if (configured) {
    return normalizeUrl(configured);
  }

  if (process.env.NODE_ENV === "production") {
    const platformUrl = readFirstEnvUrl(PRODUCTION_URL_KEYS);
    return platformUrl ? normalizeUrl(platformUrl) : undefined;
  }

  return LOCALHOST_URL;
}

export function getSiteOrigin() {
  return getMetadataBase()?.origin;
}

export function getMetadataBase() {
  const siteUrl = getSiteUrl();
  return siteUrl ? new URL(siteUrl) : undefined;
}

export async function getRequestMetadataBase() {
  const configured = getMetadataBase();
  if (configured) return configured;

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (!host) {
    return new URL(LOCALHOST_URL);
  }

  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return new URL(`${protocol}://${host}`);
}

export function toAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const origin = getSiteOrigin();
  return origin ? `${origin}${normalizedPath}` : normalizedPath;
}

export function getDefaultOpenGraphImage(alt = DEFAULT_SOCIAL_IMAGE_ALT) {
  return {
    url: DEFAULT_OPEN_GRAPH_IMAGE_PATH,
    width: DEFAULT_SOCIAL_IMAGE_WIDTH,
    height: DEFAULT_SOCIAL_IMAGE_HEIGHT,
    alt,
    type: "image/png",
  } as const;
}

export function getDefaultTwitterImage() {
  return DEFAULT_TWITTER_IMAGE_PATH;
}
