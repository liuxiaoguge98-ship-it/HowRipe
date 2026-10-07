import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FruitPage } from "../src/components/fruit/FruitPage";
import { getFruitContent } from "../src/content/fruits";
import { fruitAssets, validateFruitAssetContracts } from "../src/lib/fruit-assets";

const fruits = ["avocado", "kiwi", "pomegranate", "persimmon"] as const;
const expectedCount = { avocado: 18, kiwi: 13, pomegranate: 10, persimmon: 9 };
const textQuestions = {
  kiwi: ["q03-ripen-faster", "q04-batch", "q05-pick-and-plan"],
  pomegranate: ["q01-heavy", "q04-color", "q05-final-pick"],
  persimmon: ["q02-fuyu", "q03-hachiya", "q04-soft-or-damaged", "q05-final-pick"],
};

describe("ASSET-02 release visual inventory", () => {
  it("has no development placeholders and every retained contract is used by content", () => {
    const referenced = new Set<string>();
    fruits.forEach((slug) => {
      const content = getFruitContent(slug);
      [content.hero.assetKey, ...content.hero.specimens?.map(s => s.assetKey) ?? [], ...content.timingGuide?.stages.map(s => s.assetKey) ?? [],
        ...content.pickingSections.flatMap(s => [s.assetKey, s.conditionGuide?.avoidAssetKey, ...s.comparison?.samples.map(v => v.assetKey) ?? []]),
        ...content.variantOverview?.variants.map(v => v.assetKey) ?? [],
        ...content.quiz.questions.flatMap(q => q.options.flatMap(o => [o.assetKey, ...o.illustrations ?? []]))]
        .filter(Boolean).forEach(key => referenced.add(key!));
    });
    expect(Object.keys(fruitAssets)).toHaveLength(50);
    expect(validateFruitAssetContracts()).toEqual([]);
    expect(Object.values(fruitAssets).every(a => a.status === "production" && Boolean(a.src))).toBe(true);
    expect(new Set(Object.keys(fruitAssets))).toEqual(referenced);
    expect(Object.fromEntries(fruits.map(slug => [slug, Object.values(fruitAssets).filter(a => a.fruit === slug).length]))).toEqual(expectedCount);
  });

  it("uses local WebP files with matching roles and one critical hero per fruit", () => {
    for (const [key, record] of Object.entries(fruitAssets)) {
      if (record.status !== "production" || !record.src) throw new Error(`${key} is unfinished`);
      expect(record.src).toMatch(/^\/fruits\/(avocado|kiwi|pomegranate|persimmon)\//);
      const file = resolve(process.cwd(), "public", record.src.slice(1));
      expect(existsSync(file)).toBe(true);
      expect(readFileSync(file).toString("ascii", 8, 12)).toBe("WEBP");
      if (record.role === "hero") expect(record.loading).toBe("critical");
      else expect(record.loading).not.toBe("critical");
      if (record.role === "comparison") expect(record.accessibility).toBe("neutral-quiz");
    }
    fruits.forEach(slug => {
      expect(Object.values(fruitAssets).filter(a => a.fruit === slug && a.loading === "critical")).toHaveLength(1);
      const html = renderToStaticMarkup(<FruitPage fruit={getFruitContent(slug)} />);
      expect(html).toContain("QUICK CHECKS");
      expect(html).toContain("NUTRITION SNAPSHOT");
      expect(html).not.toContain("placeholder");
    });
  });

  it("keeps tactile facts in text alongside illustrations and Kiwi timing interactive", () => {
    for (const [slug, ids] of Object.entries(textQuestions)) {
      const content = getFruitContent(slug as (typeof fruits)[number]);
      for (const id of ids) {
        const question = content.quiz.questions.find(q => q.id === id);
        expect(question?.options.every(o => typeof o.text === "string" && !o.assetKey && Boolean(o.illustrations?.length))).toBe(true);
      }
    }
    const kiwi = getFruitContent("kiwi");
    expect(kiwi.timingGuide?.stages.every(s => !s.assetKey)).toBe(true);
    expect(kiwi.quiz.questions.filter(q => q.options.some(o => o.tactile)).map(q => q.id)).toEqual(["q01-eat-today"]);
    expect(kiwi.quiz.questions[0].options.map(o => o.tactile?.level)).toEqual(["ripe", "very_firm"]);
    expect(kiwi.quiz.questions[3].options.every(o => o.text && o.illustrations?.length)).toBe(true);
    for (const slug of ["avocado", "kiwi"] as const) {
      for (const question of getFruitContent(slug).quiz.questions.filter(q => q.options.some(o => o.tactile))) {
        const [a, b] = question.options;
        if (!a.assetKey || !b.assetKey) throw new Error(`${slug} tactile pair is missing a visual substrate`);
        expect(fruitAssets[a.assetKey].src).toBe(fruitAssets[b.assetKey].src);
      }
    }
  });

  it("describes production teaching and variant images without changing neutral Quiz alt text", () => {
    const kiwi = renderToStaticMarkup(<FruitPage fruit={getFruitContent("kiwi")} />);
    const pomegranate = renderToStaticMarkup(<FruitPage fruit={getFruitContent("pomegranate")} />);
    const persimmon = renderToStaticMarkup(<FruitPage fruit={getFruitContent("persimmon")} />);
    expect(kiwi).toContain('alt="A noticeably shriveled green kiwi"');
    expect(pomegranate).toContain('alt="A pomegranate with gently angular sides"');
    expect(pomegranate).toContain('alt="A pomegranate with a structural crack"');
    expect(persimmon).toContain('alt="Whole flat, squat Fuyu persimmon"');
    expect(persimmon).toContain('alt="Whole elongated, pointed Hachiya persimmon"');
  });
});
