import { describe, expect, it } from "vitest";

import { resolveFruitAsset } from "../src/lib/fruit-assets";

describe("fruit asset registry", () => {
  it("resolves the approved semantic avocado hero key to its production source", () => {
    expect(resolveFruitAsset("avocado.hero")).toMatchObject({
      fruit: "avocado",
      role: "hero",
      status: "production",
      src: "/fruits/avocado/hero/hero.webp",
    });
  });

  it("rejects keys that are not registered", () => {
    expect(() => resolveFruitAsset("avocado.unknown")).toThrow(
      "Unknown fruit asset key: avocado.unknown",
    );
  });
});
