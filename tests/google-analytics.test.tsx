// @vitest-environment jsdom
import { runInNewContext } from "node:vm";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import RootLayout from "../src/app/layout";

// afterInteractive scripts mount in the browser. Expose their server-provided
// content here; the production-browser check exercises the real next/script.
vi.mock("next/script", () => ({
  default: ({ strategy, children, ...props }: {
    strategy?: string; children?: ReactNode; id?: string; src?: string;
  }) => <script data-strategy={strategy} {...props}>{children}</script>,
}));

afterEach(() => vi.unstubAllEnvs());

function renderLayout() {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(RootLayout({
    children: <p>Analytics test page</p>, params: Promise.resolve({}),
  }));
  return container;
}

function productionEnvironment() {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-HRTEST0001");
}

it.each(["preview", "development", undefined])("keeps %s deployments out of production analytics", environment => {
  productionEnvironment();
  vi.stubEnv("VERCEL_ENV", environment);
  expect(renderLayout().querySelectorAll("script")).toHaveLength(0);
});

it("does not track local development even if production settings were copied", () => {
  productionEnvironment();
  vi.stubEnv("NODE_ENV", "development");
  expect(renderLayout().querySelectorAll("script")).toHaveLength(0);
});

it.each([undefined, "", "GTM-TEST0001", "G-TEST</script>"])("does not load a tracker for an unconfigured or invalid ID: %s", id => {
  productionEnvironment();
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", id);
  expect(renderLayout().querySelectorAll("script")).toHaveLength(0);
});

it("initializes one production GA4 destination after hydration without manual duplicate pageviews", () => {
  productionEnvironment();
  const container = renderLayout();
  const scripts = [...container.querySelectorAll("script")];
  const external = scripts.filter(script => script.src);
  expect(external).toHaveLength(1);
  expect(external[0].src).toBe("https://www.googletagmanager.com/gtag/js?id=G-HRTEST0001");
  expect(scripts).toHaveLength(2);
  expect(scripts.every(script => script.dataset.strategy === "afterInteractive")).toBe(true);

  const window: { dataLayer?: IArguments[] } = {};
  runInNewContext(scripts.find(script => !script.src)!.textContent!, { window });
  const calls = window.dataLayer!.map(entry => Array.from(entry));
  expect(calls.map(call => call[0])).toEqual(["js", "config"]);
  expect(calls[1]).toEqual(["config", "G-HRTEST0001", {
    allow_google_signals: false, allow_ad_personalization_signals: false,
  }]);
});
