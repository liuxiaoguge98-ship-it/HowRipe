import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FruitPage } from "../src/components/fruit/FruitPage";
import { getFruitContent, hasFruitContent } from "../src/content/fruits";
import { persimmon } from "../src/content/fruits/persimmon";
import { fruitMetadata } from "../src/lib/fruit-metadata";
import { resolveFruitAsset } from "../src/lib/fruit-assets";

describe("production Persimmon guide", () => {
  it("uses only whole-fruit imagery in pre-purchase lessons and every quiz choice", () => {
    const keys = [
      ...persimmon.pickingSections.flatMap(s => [s.assetKey, ...s.comparison?.samples.map(o => o.assetKey) ?? []]),
      ...persimmon.quiz.questions.flatMap(q => q.options.flatMap(o => [o.assetKey, ...o.illustrations ?? []])),
    ].filter((key) => key !== undefined);
    for (const key of keys) expect(resolveFruitAsset(key).src).not.toMatch(/texture|hachiya-firm/);
    const hachiya = persimmon.quiz.questions[2];
    expect(hachiya.options[1].text).toContain("very soft evenly throughout");
    expect(hachiya.options[0].text).toContain("still firm throughout");
    expect(persimmon.quiz.questions.every(q => q.options.every(o => o.assetKey || o.illustrations?.length))).toBe(true);
  });
  it("registers SEO content and renders the generic static variant overview without timing", () => {
    expect(getFruitContent("persimmon")).toBe(persimmon);
    expect(fruitMetadata(persimmon)).toMatchObject({ title: persimmon.seo.title, description: persimmon.seo.description });
    const html = renderToStaticMarkup(<FruitPage fruit={persimmon} />);
    expect(html).toContain("Which persimmon do you have?");
    expect(html).toContain("Fuyu");
    expect(html).toContain("Hachiya");
    expect(html).toContain('href="#fuyu"');
    expect(html).toContain('href="#hachiya"');
    expect(html).not.toContain("WHEN WILL YOU EAT IT?");
    expect(html).toContain("USDA FoodData Central");
  });

  it("uses five illustrated scenarios with A/A/B/A/A answers and live availability", () => {
    expect(persimmon.quiz.questions.map((question) => question.correctOption)).toEqual(["a", "a", "b", "a", "a"]);
    expect(new Set(persimmon.quiz.questions.map((question) => question.id)).size).toBe(5);
    expect(persimmon.quiz.questions[4].learningPoint).toContain("same firmness means different things");
    expect(hasFruitContent("persimmon")).toBe(true);
  });
  it("renders both independent paths, paired hero and maturity distinction without JavaScript", () => {
    expect(persimmon.timingGuide).toBeUndefined();
    expect(persimmon.hero.specimens?.map(s => s.name)).toEqual(["Fuyu", "Hachiya"]);
    const html = renderToStaticMarkup(<FruitPage fruit={persimmon} />);
    for (const copy of ["FIRM CAN BE RIPE.", "WAIT UNTIL VERY SOFT.", "MATURE ≠ READY TO EAT", "Fuyu ready-to-eat path", "Hachiya ready-to-eat path", "Still astringent", "localized collapsed pocket", "Other cultivars may behave differently"]) expect(html).toContain(copy);
    expect(persimmon.variantOverview?.variants.map(v => v.path?.map(s => s.state))).toEqual([["wait", "ready"], ["wait", "wait", "ready"]]);
  });
  it("uses an actual controlled soft/damage Hachiya pair and visible variety evidence for Q05", () => {
    const ripe = resolveFruitAsset("persimmon.quiz.q03.b").src;
    expect(ripe).toBe(resolveFruitAsset("persimmon.quiz.q04.a").src);
    expect(ripe).not.toBe(resolveFruitAsset("persimmon.quiz.q03.a").src);
    expect(ripe).not.toBe(resolveFruitAsset("persimmon.quiz.q04.b").src);
    expect(persimmon.quiz.questions[4].options.map(o => o.illustrations)).toEqual([["persimmon.variant.fuyu"], ["persimmon.variant.hachiya"]]);
    expect(persimmon.quiz.questions[4].question).not.toContain("Which rule");
  });
});
