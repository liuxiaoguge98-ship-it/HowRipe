import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FruitPage } from "../src/components/fruit/FruitPage";
import { kiwi } from "../src/content/fruits/kiwi";

// Regression: ISSUE-002 — the displayed Zespri ripening source linked to a retired 404 route.
// Found by /qa on 2026-09-28.
// Report: docs/RELEASE_QA.md
describe("Kiwi source navigation", () => {
  it("renders the verified official Zespri ripening FAQ link", () => {
    const html = renderToStaticMarkup(<FruitPage fruit={kiwi} />);

    expect(html).toContain('href="https://www.zespri.com/en-NZ/corporate-information/faqs"');
    expect(html).toContain("Zespri — Choosing, ripening and storing kiwifruit");
  });
});
