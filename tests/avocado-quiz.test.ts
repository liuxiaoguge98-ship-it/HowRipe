import { describe, expect, it } from "vitest";
import { avocado } from "../src/content/fruits/avocado";
import { resolveFruitAsset } from "../src/lib/fruit-assets";

describe("production avocado quiz", () => {
  it("has five unique A/B questions with intended correct options", () => {
    expect(avocado.quiz.questions).toHaveLength(5);
    expect(avocado.quiz.questions.map((q) => q.correctOption)).toEqual(["a", "b", "a", "a", "a"]);
    expect(new Set(avocado.quiz.questions.map((q) => q.id)).size).toBe(5);
    avocado.quiz.questions.forEach((question) => question.options.forEach((option) => {
      if (!option.assetKey) throw new Error("Avocado choices must retain visual/tactile evidence");
      const asset = resolveFruitAsset(option.assetKey);
      expect(asset.accessibility).toBe("neutral-quiz");
      expect(asset.status).toBe("production");
    }));
  });
  it("configures completion learning takeaways", () => {
    expect(avocado.quiz.completion?.takeaways?.map((x) => x.label)).toEqual(["PRESS", "PLAN", "FEEL", "LOOK", "AVOID"]);
  });
});
