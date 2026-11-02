import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/insights";
import { SITE } from "@/content/site";
import { SOLUTIONS } from "@/content/solutions";
import { siteUrl } from "@/server/config/env";

const STATIC_PATHS = [
  "",
  "/solutions",
  "/platform",
  "/cloud-infra",
  "/security",
  "/how-we-work",
  "/proof-of-concept",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...STATIC_PATHS, ...SOLUTIONS.map((s) => `/solutions/${s.slug}`)].map((path) => ({
    path,
    lastModified: new Date(SITE.lastUpdated),
  }));

  // /insights stays out of the sitemap until there is at least one article.
  const insights =
    ARTICLES.length > 0
      ? [
          { path: "/insights", lastModified: new Date(SITE.lastUpdated) },
          ...ARTICLES.map((a) => ({ path: `/insights/${a.slug}`, lastModified: new Date(a.date) })),
        ]
      : [];

  return [...pages, ...insights].map(({ path, lastModified }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/solutions") ? 0.9 : 0.7,
  }));
}
