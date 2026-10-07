import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { FruitPage } from "../src/components/fruit/FruitPage";
import { fruitGuides, getFruitContent } from "../src/content/fruits";

it("renders every fruit guide in English without secondary-language copy", () => {
  for (const { slug } of fruitGuides) {
    const html = renderToStaticMarkup(<FruitPage fruit={getFruitContent(slug)} />);
    expect(/\p{Script=Han}/u.test(html), `${slug} contains Chinese`).toBe(false);
    expect(html, slug).not.toMatch(/lang="(?!en)[^"]+"/);
  }
});
