import { afterEach, expect, it, vi } from "vitest";
import { fruitGuides, getFruitContent } from "../src/content/fruits";
import { fruitMetadata } from "../src/lib/fruit-metadata";
import { absoluteSiteUrl, siteOrigin } from "../src/lib/site-url";
import { metadata as homeMetadata } from "../src/app/page";
import { metadata as rootMetadata } from "../src/app/layout";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

it("uses the same www production origin for root metadata, home and crawl routes", () => {
  expect(siteOrigin).toBe("https://www.howripe.com");
  expect(String(rootMetadata.metadataBase)).toBe("https://www.howripe.com/");
  expect(homeMetadata.alternates?.canonical).toBe("https://www.howripe.com/");
  expect(sitemap().map(item => item.url)).toEqual([
    "https://www.howripe.com/", ...fruitGuides.map(f => `https://www.howripe.com/${f.slug}`),
  ]);
  expect(robots()).toEqual({ rules: { userAgent: "*", allow: "/" }, sitemap: "https://www.howripe.com/sitemap.xml" });
});

it("canonicalizes each fruit to itself and uses production absolute social images", () => {
  for (const guide of fruitGuides) {
    const fruit = getFruitContent(guide.slug);
    const metadata = fruitMetadata(fruit);
    expect(metadata.alternates?.canonical).toBe(`https://www.howripe.com/${fruit.slug}`);
    expect(metadata.openGraph).toMatchObject({ url: metadata.alternates?.canonical, title: fruit.seo.title, description: fruit.seo.description });
    expect(JSON.stringify(metadata.openGraph?.images)).toContain("https://www.howripe.com/fruits/");
    expect(JSON.stringify(metadata.twitter)).toContain("https://www.howripe.com/fruits/");
    expect(JSON.stringify(metadata)).not.toMatch(/localhost|vercel\.app/);
  }
});

it("preserves an explicit development origin and normalizes the configured base", async () => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3107/some-path/");
  vi.resetModules();
  const configured = await import("../src/lib/site-url");
  expect(configured.siteOrigin).toBe("http://localhost:3107");
  expect(configured.absoluteSiteUrl("/kiwi")).toBe("http://localhost:3107/kiwi");
  expect(absoluteSiteUrl("/avocado")).toBe("https://www.howripe.com/avocado");
});

it("uses HowRipe as the public metadata brand without losing fruit search intent", () => {
  expect(rootMetadata.title).toBe("HowRipe — How to Pick Ripe Fruit");
  expect(homeMetadata.title).toBe("HowRipe — How to Pick Ripe Fruit");
  expect(homeMetadata.openGraph).toMatchObject({ siteName: "HowRipe", title: homeMetadata.title });
  expect(homeMetadata.twitter).toMatchObject({ title: homeMetadata.title });
  for (const guide of fruitGuides) {
    const metadata = fruitMetadata(getFruitContent(guide.slug));
    expect(String(metadata.title)).toMatch(/How to Tell If/);
    expect(JSON.stringify(metadata)).not.toMatch(/Fruit Picking Guide|fruit-picking-guide/i);
    expect(metadata.openGraph).toMatchObject({ siteName: "HowRipe" });
  }
});
