// @vitest-environment jsdom
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { metadata } from "../src/app/layout";
import { Header } from "../src/components/layout/Header";
import { Footer } from "../src/components/layout/Footer";
import manifest from "../src/app/manifest";

const sharp = createRequire(import.meta.resolve("next"))("sharp");

it("uses one public icon source with a square search icon and Apple icon", () => {
  expect(fs.existsSync("src/app/favicon.ico")).toBe(false);
  expect(metadata.icons).toMatchObject({
    icon: expect.arrayContaining([
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ]),
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  });
  const icons = metadata.icons as { icon: { url: string }[]; apple: { url: string }[] };
  for (const icon of [...icons.icon, ...icons.apple]) {
    expect(fs.existsSync(path.join("public", icon.url)), icon.url).toBe(true);
  }
});

it("ships correctly sized PNGs and decodable ICO frames", async () => {
  for (const [file, size] of [
    ["favicon-16x16.png", 16], ["favicon-32x32.png", 32],
    ["apple-touch-icon.png", 180], ["icon-192.png", 192], ["icon-512.png", 512],
  ] as const) {
    expect(await sharp(`public/${file}`).metadata()).toMatchObject({ format: "png", width: size, height: size });
  }
  const ico = fs.readFileSync("public/favicon.ico");
  expect([...ico.subarray(0, 6)]).toEqual([0, 0, 1, 0, 3, 0]);
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    const length = ico.readUInt32LE(entry + 8), offset = ico.readUInt32LE(entry + 12);
    expect(ico[entry]).toBe(size);
    expect(ico[entry + 1]).toBe(size);
    expect(await sharp(ico.subarray(offset, offset + length)).metadata()).toMatchObject({ width: size, height: size });
  }
});

it("keeps header and footer home links accessible with the same decorative mark", () => {
  for (const component of [<Header key="header" />, <Footer key="footer" />]) {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(component);
    const home = container.querySelector('a[aria-label="HowRipe home"]')!;
    expect(home.getAttribute("href")).toBe("/");
    expect(home.textContent).toBe("HowRipe");
    const mark = home.querySelector("img")!;
    expect(mark.getAttribute("src")).toBe("/brand/howripe-mark.svg");
    expect(mark.getAttribute("alt")).toBe("");
    expect(mark.getAttribute("aria-hidden")).toBe("true");
  }
});

it("exposes the English brand and real app icons without claiming maskable artwork", () => {
  const result = manifest();
  expect(result).toMatchObject({ name: "HowRipe", short_name: "HowRipe", lang: "en", start_url: "/", display: "browser" });
  expect(result.icons).toEqual([
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  ]);
  for (const icon of result.icons!) expect(fs.existsSync(path.join("public", icon.src))).toBe(true);
});
