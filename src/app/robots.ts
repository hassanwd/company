import type { MetadataRoute } from "next";
import { siteUrl } from "@/server/config/env";

export default function robots(): MetadataRoute.Robots {
  return {
    // Public marketing site is indexable; the internal console is not.
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/users"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
