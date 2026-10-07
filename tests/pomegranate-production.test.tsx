import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FruitPage } from "../src/components/fruit/FruitPage";
import { getFruitContent, hasFruitContent } from "../src/content/fruits";
import { pomegranate } from "../src/content/fruits/pomegranate";
import { fruitMetadata } from "../src/lib/fruit-metadata";

describe("production pomegranate guide", () => {
  it("registers unique SEO content and omits the timing guide", () => {
    expect(getFruitContent("pomegranate")).toBe(pomegranate);
    expect(fruitMetadata(pomegranate)).toMatchObject({ title: pomegranate.seo.title, description: pomegranate.seo.description });
    const html = renderToStaticMarkup(<FruitPage fruit={pomegranate} />);
    expect(html).toContain("How to Tell If a Pomegranate Is Ripe");
    expect(html).not.toContain("WHEN WILL YOU EAT IT?");
    expect(html).toContain("Same size. Compare the weight.");
    expect(html).toContain("will not ripen further on your counter");
    expect(html).toContain("USDA FoodData Central");
  });
  it("uses five neutral A/B questions with A/A/B/A/A answers and live availability", () => {
    expect(pomegranate.quiz.questions.map((q) => q.correctOption)).toEqual(["a", "a", "b", "a", "a"]);
    expect(new Set(pomegranate.quiz.questions.map((q) => q.id)).size).toBe(5);
    expect(pomegranate.quiz.questions[4].learningPoint).toContain("heavy for its size");
    expect(hasFruitContent("pomegranate")).toBe(true);
  });
});
