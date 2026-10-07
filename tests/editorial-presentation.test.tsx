import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FruitPage } from "../src/components/fruit/FruitPage";
import { getFruitContent } from "../src/content/fruits";

describe("editorial presentation opt-in", () => {
  it("renders numbered checks, editorial layouts and explicit decision labels", () => {
    const html = renderToStaticMarkup(<FruitPage fruit={getFruitContent("avocado")} />);
    expect(html).toContain('data-presentation="editorial-lab"');
    expect(html).toContain('data-layout="statement"');
    expect(html).toContain('class="check-number"');
    expect(html).toContain('Choose A');
    expect(html).toContain('aria-label="Option A"');
    expect(html).toContain('loading="lazy"');
  });
  it("keeps legacy rendering available regardless of fruit identity", () => {
    const fruit = getFruitContent("avocado");
    const html = renderToStaticMarkup(<FruitPage fruit={{ ...fruit, presentation: undefined }} />);
    expect(html).not.toContain('data-presentation="editorial-lab"');
    expect(html).not.toContain('class="check-number"');
    expect(html).not.toContain('Choose A');
    for (const slug of ["kiwi", "pomegranate", "persimmon"] as const) {
      expect(getFruitContent(slug).presentation).toBe("editorial-lab");
    }
  });
});
