import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FruitPage } from "../src/components/fruit/FruitPage";
import { persimmon } from "../src/content/fruits/persimmon";

// Regression: ISSUE-001 — Persimmon variant overview links had no matching picking-section targets.
// Found by /qa on 2026-09-28.
// Report: docs/RELEASE_QA.md
describe("Persimmon variant navigation", () => {
  it("lands each variant link on its matching How to Pick article", () => {
    const html = renderToStaticMarkup(<FruitPage fruit={persimmon} />);

    expect(html).toContain('href="#fuyu"');
    expect(html).toContain('href="#hachiya"');
    expect(html).toMatch(/<article\b[^>]*\bid="fuyu"[^>]*>[\s\S]*?<h2[^>]*>Fuyu — firm can be ready\.<\/h2>/);
    expect(html).toMatch(/<article\b[^>]*\bid="hachiya"[^>]*>[\s\S]*?<h2[^>]*>Hachiya — wait for very soft\.<\/h2>/);
  });
});
