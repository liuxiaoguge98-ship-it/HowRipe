// @vitest-environment jsdom
import { renderToStaticMarkup } from "react-dom/server";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { kiwi, kiwiStorage } from "../src/content/fruits/kiwi";
import { FruitPage } from "../src/components/fruit/FruitPage";
import { QuizEngine } from "../src/components/quiz/QuizEngine";
import Home from "../src/app/page";
import { getFruitContent, hasFruitContent } from "../src/content/fruits";
import { fruitMetadata } from "../src/lib/fruit-metadata";
import { fruitAssets } from "../src/lib/fruit-assets";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
it("makes readiness, storage and batch rescue available in static HTML", () => {
  const html = renderToStaticMarkup(<FruitPage fruit={kiwi} />);
  expect(kiwi.quickChecks.map(c => c.label)).toEqual(["PRESS", "PLUMP", "CHECK", "PLAN", "STORE"]);
  expect(kiwi.timingGuide?.stages.map(s => s.label)).toEqual(["VERY FIRM", "SLIGHT GIVE", "VERY SOFT"]);
  for (const text of ["HOW DOES IT FEEL?", "CONTROL THE RIPENING", "TOO MANY RIPE AT ONCE?", "2–3", "FRIDGE", "COUNTER", "Sort by firmness", "Freeze the excess", "ethylene", "Gold varieties", "green / fuzzy"])
    expect(html).toContain(text);
  expect(html).toContain('id="store"');
  expect(html).toContain('id="batch"');
  expect(kiwiStorage.rescue).toHaveLength(5);
  expect(kiwi.sources?.some(s => s.url.includes('postharvest.ucdavis.edu'))).toBe(true);
  expect(kiwi.pickingSections.map(s => s.id)).toEqual(["press","plump","check","wrinkles","fuzz","plan"]);
});
it("uses a tactile then visual pair, followed by three illustrated scenarios with explicit text evidence", () => {
  expect(kiwi.quiz.questions.map(q => q.correctOption)).toEqual(["a","b","b","b","b"]);
  expect(kiwi.quiz.questions[0].options.map(o => o.tactile?.level)).toEqual(["ripe","very_firm"]);
  expect(kiwi.quiz.questions[1].options.every(o => o.assetKey && !o.tactile)).toBe(true);
  expect(JSON.stringify(kiwi.quiz)).not.toMatch(/leave behind|leave this|leave it/i);
  for (const q of kiwi.quiz.questions.slice(2)) {
    const { container, unmount } = render(<QuizEngine quiz={{...kiwi.quiz,questions:[q]}} presentation="editorial-lab"/>);
    expect(container.querySelectorAll("#quiz img")).toHaveLength(2);
    expect(container.querySelectorAll(".quiz-text-option")).toHaveLength(2);
    expect(container.querySelector(".option-outcome")).toBeNull();
    expect(container.querySelector(".tactile-visual")).toBeNull();
    expect(container.querySelector("#quiz")?.getAttribute("data-evidence")).toBe("illustrated");
    unmount();
  }
});
it.each([false,true])("reveals qualitative touch independently without numerical pressure (reduce=%s)", reduce => {
  vi.stubGlobal("matchMedia",()=>({matches:reduce}));
  const {container}=render(<QuizEngine quiz={kiwi.quiz} presentation="editorial-lab"/>);
  expect(screen.queryByText(/Slight give ·/)).toBeNull();
  fireEvent.click(screen.getByRole("button",{name:"Check firmness Option A"}));
  expect(screen.getByText(/Slight give · still holds/)).toBeTruthy();
  expect(screen.queryByText(/Very firm · almost/)).toBeNull();
  fireEvent.click(screen.getByRole("button",{name:"Check firmness Option B"}));
  expect(screen.getByText(/Very firm · almost/)).toBeTruthy();
  expect(container.textContent).not.toMatch(/Resistance|[234] \/ 4/);
});
it("requires Got it for correct and incorrect text answers before completion", () => {
  vi.useFakeTimers();
  render(<QuizEngine quiz={{...kiwi.quiz,questions:[kiwi.quiz.questions[4]]}} presentation="editorial-lab"/>);
  for(const choice of ["A","B"]) {
    fireEvent.click(screen.getByRole("button",{name:`Choose ${choice}`}));
    act(()=>vi.advanceTimersByTime(5000));
    expect(screen.queryByRole("button",{name:"Restart"})).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:"Got it →"}));
    fireEvent.click(screen.getByRole("button",{name:"Restart"}));
  }
});
it("uses matching whole-fruit masters and controlled edits alongside the new scenario illustrations", () => {
  expect(fruitAssets["kiwi.quiz.q01.a"].src).toBe(fruitAssets["kiwi.quiz.q01.b"].src);
  expect(fruitAssets["kiwi.quiz.q02.a"].src).toBe(fruitAssets["kiwi.quiz.q01.a"].src);
  expect(fruitAssets["kiwi.quiz.q02.b"].src).toContain("local-bruise");
  expect(fruitAssets["kiwi.picking.wrinkles"].src).toContain("wrinkles-v2");
});

it("retains route, SEO intent and registry links", () => {
  expect(getFruitContent("kiwi")).toBe(kiwi);
  expect(hasFruitContent("kiwi")).toBe(true);
  expect(kiwi.seo.h1).toBe("How to Tell If a Kiwi Is Ripe");
  expect(fruitMetadata(kiwi)).toMatchObject({title:kiwi.seo.title,description:kiwi.seo.description});
  expect(renderToStaticMarkup(<Home/>)).toContain('href="/kiwi"');
  const html=renderToStaticMarkup(<FruitPage fruit={kiwi}/>);
  for(const href of ["/avocado","/pomegranate","/persimmon"])expect(html).toContain(`href="${href}"`);
  for(const text of ["NUTRITION SNAPSHOT","FAQ","SOURCES","USDA FoodData Central"])expect(html).toContain(text);
  expect(new Set(kiwi.quiz.questions.map(q=>q.id)).size).toBe(5);
});
