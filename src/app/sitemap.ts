import type { MetadataRoute } from "next";
import { getLiveFruitGuides } from "@/content/fruits";
import { siteOrigin } from "@/lib/site-url";

export function sitemapForSiteUrl(siteUrl: string): MetadataRoute.Sitemap {
  const baseUrl = new URL(siteUrl);
  return ["/", ...getLiveFruitGuides().map((guide) => `/${guide.slug}`)].map((pathname) => ({ url: new URL(pathname, baseUrl).toString() }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapForSiteUrl(siteOrigin);
}
