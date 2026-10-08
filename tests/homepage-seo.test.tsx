// @vitest-environment jsdom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home, { metadata } from "../src/app/page";

const homepage = () => {
  const page = document.createElement("div");
  page.innerHTML = renderToStaticMarkup(<Home />);
  return page;
};

describe("homepage search and navigation structure", () => {
  it("expresses broad fruit ripeness intent in home and social metadata", () => {
    expect(metadata.title).toBe("HowRipe — How to Tell If Fruit Is Ripe");
    expect(metadata.openGraph).toMatchObject({ title: metadata.title, siteName: "HowRipe" });
    expect(metadata.twitter).toMatchObject({ title: metadata.title });
    expect(metadata.alternates?.canonical).toBe("https://www.howripe.com/");
  });

  it("gives every fruit one descriptive, crawlable index link with its name inside", () => {
    const document = homepage();
    const links = [...document.querySelectorAll("#fruit-guides article a")];
    expect(links).toHaveLength(4);
    for (const [href, name] of [
      ["/avocado", "How to tell if an avocado is ripe"],
      ["/kiwi", "How to tell if a kiwi is ripe"],
      ["/pomegranate", "How to choose a ripe pomegranate"],
      ["/persimmon", "How to tell if a persimmon is ripe"],
    ]) {
      const link = links.find(anchor => anchor.getAttribute("href") === href)!;
      expect(link, href).toBeDefined();
      expect(link.querySelector("h3"), href).not.toBeNull();
      expect(link.querySelector("a"), href).toBeNull();
      const label = document.querySelector(`#${link.getAttribute("aria-labelledby")}`);
      expect(label?.textContent, href).toContain(name);
    }
    expect(document.textContent).not.toContain("Explore guide");
  });

  it("server-renders the four editorial concepts and contextual routes below the fruit index", () => {
    const document = homepage();
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    const section = document.querySelector("#ripeness-principles")!;
    expect(section).not.toBeNull();
    expect(section.querySelector("h2")?.textContent).toBe("Why ripeness looks different for every fruit");
    expect([...section.querySelectorAll("h3")].map(h => h.textContent)).toEqual(["Firmness", "Color", "Variety", "Timing"]);
    expect(document.querySelector("#fruit-guides")!.nextElementSibling).toBe(section);
    expect(section.textContent).toContain("There is no single universal sign");
    for (const href of ["/avocado", "/kiwi", "/pomegranate", "/persimmon"]) {
      expect(section.querySelector(`a[href="${href}"]`), href).not.toBeNull();
    }
  });
});
