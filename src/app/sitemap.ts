import type { MetadataRoute } from "next";
import { SOLUTIONS } from "@/content/solutions";
import { siteUrl } from "@/server/config/env";

const STATIC_PATHS = [
  "",
  "/solutions",
  "/platform",
  "/security",
  "/how-we-work",
  "/engagement",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...SOLUTIONS.map((s) => `/solutions/${s.slug}`)];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/solutions") ? 0.9 : 0.7,
  }));
}
