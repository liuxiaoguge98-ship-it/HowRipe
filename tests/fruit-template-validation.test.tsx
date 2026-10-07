import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FruitPage } from "../src/components/fruit/FruitPage";
import { fruitMetadata } from "../src/lib/fruit-metadata";
import { kiwiTemplateFixture } from "./fixtures/kiwi-template-fixture";

describe("non-production fruit template fixture", () => {
  it("renders variable Kiwi fixture data without optional Avocado sections or metadata", () => {
    const html = renderToStaticMarkup(<FruitPage fruit={kiwiTemplateFixture} />);

    expect(html).toContain("Fixture Kiwi template heading");
    expect(html).not.toContain("How to Tell If an Avocado Is Ripe");
    expect(html).toContain("aspect-[4/5]");
    expect(html).not.toContain("kiwi.hero");
    expect(html).toContain("Fixture weight check");
    expect(html).toContain("Fixture gentle give");
    expect(html).toContain("Fixture skin check");
    expect(html).toContain("Fixture timing check");
    expect(html.match(/min-h-30/g)).toHaveLength(4);
    expect(html).toContain("Fixture weight");
    expect(html).toContain("Fixture gentle pressure");
    expect(html).toContain("Fixture skin");
    expect(html).not.toContain("WHEN WILL YOU EAT IT?");
    expect(html).not.toContain("DON&#x27;T OVERTHINK THESE");
    expect(html).not.toContain("SOURCES");
    expect(html).toContain("Fixture calories");
    expect(html).toContain("Fixture fiber");
    expect(html).toContain("Fixture sugar");
    expect(html).toContain("Fixture FAQ one?");
    expect(html).toContain("Fixture FAQ two?");
    expect(html).toContain('href="/avocado"');
    expect(html).toContain(">AVOCADO</a>");
    expect(html).toContain('href="/pomegranate"');
    expect(html).toContain(">POMEGRANATE</a>");
    expect(html).toContain("--fruit-primary:#547B22");
    expect(html).toContain("--fruit-dark:#203D16");
    expect(html).toContain("--fruit-soft:#E5EFD8");
    expect(fruitMetadata(kiwiTemplateFixture)).toMatchObject({
      title: "Fixture Kiwi template title",
      description: "Test-only non-production Kiwi fixture description.",
    });
  });
});
