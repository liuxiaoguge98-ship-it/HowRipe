import { describe, expect, it } from "vitest";

import { getFruitContent } from "../src/content/fruits";
import { fruitMetadata } from "../src/lib/fruit-metadata";

describe("fruit content registry", () => {
  it("retrieves avocado content with its required SEO heading", () => {
    const fruit = getFruitContent("avocado");

    expect(fruit.seo.h1).toBe("How to Tell If an Avocado Is Ripe");
  });

  it("creates metadata solely from the fruit SEO record", () => {
    const fruit = getFruitContent("avocado");

    expect(fruitMetadata(fruit)).toMatchObject({
      title: fruit.seo.title,
      description: fruit.seo.description,
    });
  });
});
