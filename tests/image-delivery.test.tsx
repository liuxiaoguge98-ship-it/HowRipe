// @vitest-environment jsdom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FruitAsset } from "../src/components/fruit/FruitAsset";
import { FruitHero } from "../src/components/fruit/FruitHero";
import { persimmon } from "../src/content/fruits/persimmon";

const markup = (element: React.ReactNode) => {
  const root = document.createElement("div");
  root.innerHTML = renderToStaticMarkup(element);
  return root;
};

describe("image delivery follows the display context", () => {
  it("does not eagerly load a hero source reused as a Quiz illustration", () => {
    const root = markup(<FruitAsset assetKey="persimmon.hero" alt="" />);
    expect(root.querySelector("img")?.getAttribute("loading")).toBe("lazy");
    expect(root.querySelector("img")?.getAttribute("fetchpriority")).not.toBe("high");
  });

  it("gives only the critical specimen in the paired Hero high priority", () => {
    const root = markup(<FruitHero h1={persimmon.seo.h1} hero={persimmon.hero} />);
    const images = [...root.querySelectorAll("img")];
    expect(images).toHaveLength(2);
    expect(images.filter(i => i.getAttribute("fetchpriority") === "high")).toHaveLength(1);
    expect(images[0].getAttribute("loading")).toBe("eager");
    expect(images[1].getAttribute("loading")).toBe("eager");
    expect(images[0].alt).toBe("Whole Fuyu persimmon");
    expect(images[1].alt).toBe("Whole Hachiya persimmon");
  });
});
