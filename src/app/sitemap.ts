import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { dataProjects } from "@/data/projects";
import { getSiteOrigin } from "@/lib/seo";

const siteOrigin = getSiteOrigin();
const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries = staticRoutes.map((route) => ({
    url: `${siteOrigin}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries = dataProjects.map((project) => ({
    url: `${siteOrigin}/projects/${project.slug}`,
    lastModified: parseDate(project.timeline) ?? undefined,
    changeFrequency: "monthly" as const,
    priority: project.isLatest ? 0.8 : 0.7,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: `${siteOrigin}/blog/${post.slug}`,
    lastModified: parseDate(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...baseEntries, ...projectEntries, ...blogEntries];
}

function parseDate(value?: string) {
  if (!value) return undefined;

  const lastRangePart = value.split(/–|-/).pop()?.trim() ?? value;
  const parsedDate = new Date(lastRangePart);
  if (Number.isNaN(parsedDate.getTime())) return undefined;

  return parsedDate;
}
