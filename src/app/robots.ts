import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo";

const siteOrigin = getSiteOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: siteOrigin ? `${siteOrigin}/sitemap.xml` : "/sitemap.xml",
    host: siteOrigin,
  };
}
