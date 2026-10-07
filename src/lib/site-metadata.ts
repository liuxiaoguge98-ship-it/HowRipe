import type { Metadata } from "next";
import { absoluteSiteUrl } from "./site-url";

export function pageMetadata(
  pathname: string,
  title: string,
  description: string,
  imagePath?: string,
): Metadata {
  const url = absoluteSiteUrl(pathname);
  const image = imagePath ? absoluteSiteUrl(imagePath) : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "HowRipe",
      url,
      title,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
