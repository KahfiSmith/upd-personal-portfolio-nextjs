const LOCALHOST_URL = "http://localhost:3000";

function ensureProtocol(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return stripTrailingSlash(ensureProtocol(configured));
  }

  if (process.env.NODE_ENV === "production") {
    const vercelDomain =
      process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ??
      process.env.VERCEL_URL?.trim();
    if (vercelDomain) {
      return stripTrailingSlash(ensureProtocol(vercelDomain));
    }
  }

  return LOCALHOST_URL;
}

export function getSiteOrigin() {
  return new URL(getSiteUrl()).origin;
}

export function toAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteOrigin()}${normalizedPath}`;
}
