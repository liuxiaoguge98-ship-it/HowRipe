import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getFruitContent } from "../src/content/fruits";
import { FruitPage } from "../src/components/fruit/FruitPage";

describe("FruitPage", () => {
  it("renders generic hero and quick-check content from a fruit record", () => {
    const fruit = getFruitContent("avocado");
    const html = renderToStaticMarkup(<FruitPage fruit={fruit} />);

    expect(html).toContain(fruit.seo.h1);
    expect(html).toContain(fruit.hero.directAnswer);
    expect(html).toContain("Gentle give");
    expect(html).toContain("aspect-[4/5]");
    expect(html).not.toContain("avocado.hero");
    expect(html).toContain("WHEN WILL YOU EAT IT?");
    expect(html).toContain("VERY FIRM");
    expect(html).toContain("3–5 days");
    expect(html).toContain("Press gently");
    expect(html).toContain("Color helps. It doesn&#x27;t decide.");
    expect(html).toContain("DON&#x27;T OVERTHINK THESE");
    expect(html).toContain("NUTRITION SNAPSHOT");
    expect(html).toContain("per 100g");
    expect(html).toContain("FAQ");
    expect(html).toContain("Is color enough to tell whether an avocado is ripe?");
    expect(html).toContain("<details");
    expect(html).toContain("PICK YOUR NEXT FRUIT");
    expect(html).toContain("KIWI");
  });

  it("omits optional timing and don't-overthink sections when absent", () => {
    const fruit = getFruitContent("avocado");
    const html = renderToStaticMarkup(
      <FruitPage fruit={{ ...fruit, timingGuide: undefined, dontOverthink: undefined }} />,
    );

    expect(html).not.toContain("WHEN WILL YOU EAT IT?");
    expect(html).not.toContain("DON'T OVERTHINK THESE");
  });
});
