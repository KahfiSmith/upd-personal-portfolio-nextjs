import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { dataProjects } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteOrigin = new URL(siteUrl).origin;
const now = new Date().toISOString();

const staticRoutes = ["/", "/about", "/projects", "/blog", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries = staticRoutes.map((path) => ({
    url: `${siteOrigin}${path}`,
    lastModified: now,
  }));

  const projectEntries = dataProjects.map((project) => ({
    url: `${siteOrigin}/projects/${project.slug}`,
    lastModified: parseLastModified(project.timeline) ?? now,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: `${siteOrigin}/blog/${post.slug}`,
    lastModified: post.publishedAt ?? now,
  }));

  return [...baseEntries, ...projectEntries, ...blogEntries];
}

function parseLastModified(timeline?: string) {
  if (!timeline) return undefined;
  const lastRangePart = timeline.split(/–|-/).pop()?.trim();
  if (!lastRangePart) return undefined;

  const parsedDate = new Date(lastRangePart);
  if (Number.isNaN(parsedDate.getTime())) return undefined;

  return parsedDate.toISOString();
}
