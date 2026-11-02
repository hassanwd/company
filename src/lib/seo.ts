import type { Metadata } from "next";
import { SITE } from "@/content/site";

/** The generated share image (src/app/opengraph-image.tsx). Page-level metadata replaces the
 * root image, so every page must name it again. */
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 };

type PageSeo = {
  title: string;
  description: string;
  /** Path of the page, e.g. "/security". Resolved against `metadataBase` in the root layout. */
  path: string;
  /** Use when the title already contains the brand and must not get the "| Brand" suffix. */
  fullTitle?: string;
};

/** Title, description, canonical, Open Graph and Twitter metadata for one marketing page. */
export function pageMetadata({ title, description, path, fullTitle }: PageSeo): Metadata {
  const socialTitle = fullTitle ?? `${title} | ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: socialTitle,
      description,
      url: path,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/twitter-image"],
    },
  };
}
