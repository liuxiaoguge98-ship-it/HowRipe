// @vitest-environment jsdom
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "../src/app/page";
import sitemap from "../src/app/sitemap";
import { FruitPage } from "../src/components/fruit/FruitPage";
import { Footer } from "../src/components/layout/Footer";
import { getFruitContent, getLiveFruitGuides } from "../src/content/fruits";
import { fruitAssets, resolveFruitAsset, validateFruitAssetContracts, type FruitAssetRecord } from "../src/lib/fruit-assets";
import { fruitMetadata } from "../src/lib/fruit-metadata";

const pear = () => getFruitContent("pear");
const documentFor = (html: string) => {
  const root = document.createElement("div");
  root.innerHTML = html;
  return root;
};

describe("PEAR-01 production guide", () => {
  it("registers Pear as the fifth live guide", () => {
    expect(getLiveFruitGuides().map(guide => guide.slug)).toEqual(["avocado", "kiwi", "pomegranate", "persimmon", "pear"]);
  });

  it("uses the shared route wrapper and production metadata", async () => {
    const fruit = pear();
    const route = await import("../src/app/pear/page");
    expect(fruit.seo.h1).toBe("How to Tell If a Pear Is Ripe");
    expect(fruitMetadata(fruit)).toMatchObject({
      title: "How to Tell If a Pear Is Ripe | HowRipe",
      description: fruit.seo.description,
      alternates: { canonical: "https://www.howripe.com/pear" },
      openGraph: { url: "https://www.howripe.com/pear" },
    });
    expect(route.metadata).toEqual(fruitMetadata(fruit));
    const page = documentFor(renderToStaticMarkup(route.default()));
    expect(page.querySelector('article[data-fruit="pear"][data-presentation="editorial-lab"]')).not.toBeNull();
    expect(page.querySelectorAll("h1")).toHaveLength(1);
    expect(JSON.stringify(route.metadata)).not.toMatch(/localhost|vercel\.app/);
  });

  it("adds a descriptive homepage link, footer navigation, and the sixth production sitemap URL", () => {
    const home = documentFor(renderToStaticMarkup(<Home />));
    const entries = home.querySelectorAll("#fruit-guides article a");
    expect(entries).toHaveLength(5);
    const link = home.querySelector('#fruit-guides a[href="/pear"]')!;
    expect(link).not.toBeNull();
    const label = home.querySelector(`#${link.getAttribute("aria-labelledby")}`);
    expect(label?.textContent).toContain("How to tell if a pear is ripe");
    const footer = documentFor(renderToStaticMarkup(<Footer />));
    expect(footer.querySelector('nav[aria-label="Fruit guides"] a[href="/pear"]')?.textContent).toBe("Pear");
    expect(sitemap().map(entry => entry.url)).toEqual([
      "https://www.howripe.com/", "https://www.howripe.com/avocado", "https://www.howripe.com/kiwi",
      "https://www.howripe.com/pomegranate", "https://www.howripe.com/persimmon", "https://www.howripe.com/pear",
    ]);
  });

  it("server-renders eight varied picking sections with the core type, place, feel, color, and timing lessons", () => {
    const fruit = pear();
    expect(fruit.quickChecks.map(check => check.label)).toEqual(["TYPE", "NECK", "COLOR", "DAMAGE", "PLAN"]);
    expect(fruit.hero.memoryLine).toBe("CHECK THE NECK.");
    expect(fruit.pickingSections.map(section => section.title.replace(/\s+/g, " ").replace(/’/g, "'").replace(/\.$/, "").toUpperCase())).toEqual([
      "KNOW YOUR TYPE", "CHECK THE NECK", "DON'T PRESS THE BELLY", "COLOR DEPENDS ON THE VARIETY",
      "LOOK FOR REAL DAMAGE", "MATCH YOUR TIMING", "CONTROL THE RIPENING", "TOO MANY RIPE AT ONCE?",
    ]);
    expect(new Set(fruit.pickingSections.map(section => section.layout)).size).toBeGreaterThanOrEqual(4);
    const root = documentFor(renderToStaticMarkup(<FruitPage fruit={fruit} />));
    expect(root.querySelectorAll("#guide-foundation > div > article")).toHaveLength(8);
    expect(root.querySelectorAll("h1")).toHaveLength(1);
    const text = root.textContent!.replace(/\s+/g, " ");
    for (const pattern of [/European pear/i, /Asian pear/i, /near the stem/i, /slight.*give/i, /Bartlett/, /Anjou/, /Bosc/, /Comice/, /crisp can be ripe/i, /paper bag/i, /apple or banana/i, /room temperature/i, /refrigerat/i, /3[–-]5 days/, /lemon/i]) {
      expect(text, String(pattern)).toMatch(pattern);
    }
    expect(root.querySelectorAll('img[fetchpriority="high"]')).toHaveLength(1);
    for (const image of root.querySelectorAll('#guide-foundation img, [data-editorial-section="related"] img')) expect(image.getAttribute("loading")).toBe("lazy");
  });

  it("keeps separate European and Asian readiness paths and the three neck/body states visible", () => {
    const fruit = pear();
    const type = fruit.pickingSections.find(section => section.typeComparison)?.typeComparison;
    expect(type?.variants).toHaveLength(2);
    const [european, asian] = type!.variants;
    expect(european.name).toMatch(/European/);
    expect(asian.name).toMatch(/Asian/);
    expect(european.path?.map(step => step.state)).toEqual(["wait", "ready", "inspect"]);
    expect(asian.path?.some(step => step.state === "ready")).toBe(true);
    const pressure = fruit.pickingSections.find(section => section.pressureCheck)?.pressureCheck;
    expect(pressure?.states.map(state => state.level)).toEqual(["very_firm", "ripe", "body_soft"]);
    expect(pressure?.states[0].label).toMatch(/very firm at neck/i);
    expect(pressure?.states[1].label).toMatch(/slight give at neck/i);
    expect(pressure?.states[2].label).toMatch(/soft through body/i);
    const text = documentFor(renderToStaticMarkup(<FruitPage fruit={fruit} />)).textContent!;
    for (const state of pressure!.states) {
      expect(text).toContain(state.label);
      expect(text).toContain(state.result);
    }
  });

  it("shows the same pear with HTML pressure-location markers and four variety-specific checks", () => {
    const fruit = pear();
    const location = fruit.pickingSections.find(section => section.pressureLocation)?.pressureLocation;
    expect(location?.samples).toHaveLength(2);
    expect(location?.samples.map(sample => sample.marker)).toEqual(expect.arrayContaining([{ x: 54, y: 31 }, { x: 50, y: 68 }]));
    const varieties = fruit.pickingSections.find(section => section.varietyCues)?.varietyCues;
    expect(varieties?.map(variety => variety.name)).toEqual(["Bartlett", "Anjou", "Bosc", "Comice"]);
    expect(varieties?.[0].summary).toMatch(/green.*yellow|green.*golden/i);
    expect(varieties?.[1].summary).toMatch(/not.*dramatic|limited|stay.*green|doesn.t.*change/i);
    expect(varieties?.[2].summary).toMatch(/russet|cinnamon.brown/i);
    expect(varieties?.[2].check).toMatch(/firm/i);
    const root = documentFor(renderToStaticMarkup(<FruitPage fruit={fruit} />));
    const section = root.querySelector(`#${fruit.pickingSections.find(item => item.pressureLocation)!.id}`)!;
    const sources = [...section.querySelectorAll("img")].map(image => image.getAttribute("src"));
    expect(sources).toHaveLength(2);
    expect(sources[0]).toBe(sources[1]);
  });

  it("resolves every Pear asset as production WebP and preserves complete controlled pairs", () => {
    const records = Object.entries(fruitAssets).filter(([, asset]) => asset.fruit === "pear");
    expect(records).toHaveLength(16);
    expect(validateFruitAssetContracts()).toEqual([]);
    for (const [key, asset] of records) {
      expect(resolveFruitAsset(key)).toMatchObject({ status: "production" });
      expect(asset.src).toMatch(/^\/fruits\/pear\/.+\.webp$/);
      expect(existsSync(resolve(process.cwd(), "public", asset.src!.slice(1)))).toBe(true);
    }
    expect(records.filter(([, asset]) => asset.loading === "critical")).toHaveLength(1);
    for (const id of ["q01", "q02", "q03", "q04", "q05"]) {
      const pair: FruitAssetRecord[] = [resolveFruitAsset(`pear.quiz.${id}.a`), resolveFruitAsset(`pear.quiz.${id}.b`)];
      expect(pair.map(asset => asset.status)).toEqual(["production", "production"]);
      expect(pair[0].pairId).toBe(pair[1].pairId);
    }
    expect(pear().nutrition.metrics.length).toBeLessThanOrEqual(5);
    expect(pear().sources?.every(source => /^https:\/\//.test(source.url))).toBe(true);
  });
});
