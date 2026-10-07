import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "../src/app/page";
import { sitemapForSiteUrl } from "../src/app/sitemap";
import { FruitPage } from "../src/components/fruit/FruitPage";
import { fruitGuides, getFruitContent, getLiveFruitGuides } from "../src/content/fruits";
import { fruitMetadata } from "../src/lib/fruit-metadata";

const expectedH1 = {
  avocado: "How to Tell If an Avocado Is Ripe",
  kiwi: "How to Tell If a Kiwi Is Ripe",
  pomegranate: "How to Tell If a Pomegranate Is Ripe",
  persimmon: "How to Tell If a Persimmon Is Ripe",
};

describe("four-fruit production audit", () => {
  it("has four live guides with unique metadata, core static content, sources, and linked related fruit", () => {
    expect(getLiveFruitGuides()).toEqual(fruitGuides);
    const metadata = fruitGuides.map((guide) => fruitMetadata(getFruitContent(guide.slug)));
    expect(new Set(metadata.map((item) => item.title)).size).toBe(4);
    expect(new Set(metadata.map((item) => item.description)).size).toBe(4);
    fruitGuides.forEach((guide) => {
      const fruit = getFruitContent(guide.slug);
      const html = renderToStaticMarkup(<FruitPage fruit={fruit} />);
      expect(fruit.seo.h1).toBe(expectedH1[guide.slug]);
      expect(html).toContain(fruit.hero.directAnswer);
      for (const heading of ["QUICK CHECKS", "HOW TO PICK", "NUTRITION SNAPSHOT", "FAQ", "SOURCES", "PICK YOUR NEXT FRUIT"]) expect(html).toContain(heading);
      expect(fruit.nutrition.basis).toBe("per 100g");
      expect(fruit.nutrition.metrics.length).toBeLessThanOrEqual(5);
      expect(fruit.sources?.length).toBeGreaterThan(0);
      expect(fruit.sources?.every((source) => /^https:\/\//.test(source.url))).toBe(true);
      fruit.relatedFruits.forEach((related) => expect(html).toContain(`href=\"/${related}\"`));
    });
  });

  it("keeps the homepage editorial, fully linked, and registry-driven sitemap-ready", () => {
    const homepage = renderToStaticMarkup(<Home />);
    expect(homepage).toContain("Pick better fruit.");
    expect(homepage).toContain("Learn it once. Use it forever.");
    expect(homepage).toContain("GENERAL PICKING PRINCIPLES");
    fruitGuides.forEach((guide) => expect(homepage).toContain(`href=\"/${guide.slug}\"`));
    expect(sitemapForSiteUrl("https://fruit.example").map((entry) => entry.url)).toEqual(["https://fruit.example/", "https://fruit.example/avocado", "https://fruit.example/kiwi", "https://fruit.example/pomegranate", "https://fruit.example/persimmon"]);
  });
});
