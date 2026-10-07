import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { getFruitContent } from "../src/content/fruits";
import { fruitAssets, resolveFruitAsset, validateFruitAssetContracts } from "../src/lib/fruit-assets";

const launchFruits = ["avocado", "kiwi", "pomegranate", "persimmon"] as const;

function referencedKeys(slug: (typeof launchFruits)[number]) {
  const fruit = getFruitContent(slug);
  return [
    fruit.hero.assetKey, ...fruit.hero.specimens?.map(s => s.assetKey) ?? [],
    ...fruit.timingGuide?.stages.map((stage) => stage.assetKey) ?? [],
    ...fruit.pickingSections.flatMap((section) => [section.assetKey, ...section.comparison?.samples.map(sample => sample.assetKey) ?? []]),
    ...fruit.variantOverview?.variants.map((variant) => variant.assetKey) ?? [],
    ...fruit.quiz.questions.flatMap((question) => question.options.flatMap((option) => [option.assetKey, ...option.illustrations ?? []])),
  ].filter((key): key is NonNullable<typeof key> => Boolean(key));
}

describe("fruit asset contract", () => {
  it("covers every key referenced by launch content", () => {
    launchFruits.flatMap(referencedKeys).forEach((key) => expect(resolveFruitAsset(key)).toBeDefined());
  });

  it("keeps interaction-first imagery neutral and visual pairs atomic", () => {
    expect(fruitAssets["avocado.hero"]).toMatchObject({
      status: "production",
      src: "/fruits/avocado/hero/hero.webp",
      role: "hero",
      aspectRatio: "4:5",
      loading: "critical",
      accessibility: "descriptive",
    });

    for (const id of ["q01", "q02", "q04"]) {
      const pair = [resolveFruitAsset(`avocado.quiz.${id}.a`), resolveFruitAsset(`avocado.quiz.${id}.b`)];
      expect(pair.map((asset) => asset.status)).toEqual(["production", "production"]);
      expect(pair.map((asset) => asset.src)).toEqual(["/fruits/avocado/quiz/q05-a.webp", "/fruits/avocado/quiz/q05-a.webp"]);
      expect(pair.every((asset) => asset.accessibility === "neutral-quiz" && asset.loading === "interactive")).toBe(true);
    }

    const q03Sources = ["/fruits/avocado/quiz/q03-a.webp", "/fruits/avocado/quiz/q03-b.webp"] as const;
    ["avocado.quiz.q03.a", "avocado.quiz.q03.b"].forEach((key, index) => {
      const asset = resolveFruitAsset(key);
      expect(asset).toMatchObject({
        status: "production",
        src: q03Sources[index],
        role: "comparison",
        aspectRatio: "1:1",
        loading: "interactive",
        accessibility: "neutral-quiz",
      });
      expect(existsSync(resolve(process.cwd(), "public", q03Sources[index].slice(1)))).toBe(true);
    });

    const q05Sources = ["/fruits/avocado/quiz/q05-a.webp", "/fruits/avocado/quiz/q05-b.webp"] as const;
    ["avocado.quiz.q05.a", "avocado.quiz.q05.b"].forEach((key, index) => {
      const asset = resolveFruitAsset(key);
      expect(asset).toMatchObject({
        status: "production",
        src: q05Sources[index],
        role: "comparison",
        aspectRatio: "1:1",
        loading: "interactive",
        accessibility: "neutral-quiz",
      });
      expect(existsSync(resolve(process.cwd(), "public", q05Sources[index].slice(1)))).toBe(true);
    });

    expect(Object.values(fruitAssets).every((asset) => asset.status === "production" && "src" in asset)).toBe(true);
  });

  it("enforces complete compatible neutral quiz pairs and fruit-specific rules", () => {
    expect(validateFruitAssetContracts()).toEqual([]);
    expect(Object.keys(fruitAssets).some((key) => key.startsWith("pomegranate.ripeness."))).toBe(false);
    const variants = Object.values(fruitAssets).filter((asset) => asset.fruit === "persimmon" && asset.role === "variant");
    expect(variants.map((asset) => [asset.aspectRatio, asset.objectFit, asset.sourceBackground])).toEqual([["4:5", "contain", "transparent-or-white"], ["4:5", "contain", "transparent-or-white"]]);
  });
});
