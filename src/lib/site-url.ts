/** Shared origin for metadata, canonical URLs and crawl routes. */
export const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.howripe.com",
).origin;

export function absoluteSiteUrl(pathname: string): string {
  return new URL(pathname, `${siteOrigin}/`).toString();
}
