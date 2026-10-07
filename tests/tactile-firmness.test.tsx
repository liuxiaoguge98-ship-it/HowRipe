// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { avocado } from "../src/content/fruits/avocado";
import { QuizEngine } from "../src/components/quiz/QuizEngine";
import { TactileFirmnessCheck } from "../src/components/quiz/TactileFirmnessCheck";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it("configures only the three tactile questions without changing answers", () => {
 expect(avocado.quiz.questions.map(q => q.options.map(o => o.tactile?.level))).toEqual([
  ["ripe", "very_firm"], ["very_firm", "ripe"], [undefined, undefined], ["beginning_to_soften", "ripe"], [undefined, undefined],
 ]);
 expect(avocado.quiz.questions.map(q => q.correctOption)).toEqual(["a", "b", "a", "a", "a"]);
});

it.each([false, true])("checks independently, resets through full mixed flow and restart (reduce=%s)", reduce => {
 vi.useFakeTimers();
 vi.stubGlobal("matchMedia", () => ({ matches: reduce }));
 const { container } = render(<QuizEngine quiz={avocado.quiz} />);
 const check = (option: string) => fireEvent.click(screen.getByRole("button", { name: `Check firmness Option ${option}` }));
 const answer = (option: string) => fireEvent.click(screen.getByRole("button", { name: `Option ${option}` }));
 const next = () => {
  act(() => vi.advanceTimersByTime(1000));
  if (screen.queryByText("Correct")) fireEvent.click(screen.getByRole("button", {name: /Got it/}));
 };
 expect(container.querySelector("button button")).toBeNull();
 expect(screen.queryByText(/Resistance level/)).toBeNull();
 expect(screen.queryByText("Correct")).toBeNull();
 check("A"); check("B");
 expect(screen.getByText("Option A: Resistance level 2 of 4")).toBeTruthy();
 expect(screen.getByText("Option B: Resistance level 4 of 4")).toBeTruthy();
 next(); expect(screen.getByText("01 / 05")).toBeTruthy();
 answer("A"); expect(screen.getByRole("button", {name:"Check firmness Option B"})).toHaveProperty("disabled",true);
 next(); expect(screen.queryByText(/Resistance level/)).toBeNull();
 check("A"); check("B"); answer("A"); next();
 expect(screen.getByText("02 / 05")).toBeTruthy();
 fireEvent.click(screen.getByRole("button", { name: /Got it/ }));
 expect(screen.queryByRole("button", {name:/Check firmness/})).toBeNull();
 expect(container.querySelectorAll("#quiz img")).toHaveLength(2);
 answer("A"); next();
 expect(screen.queryByText(/Resistance level/)).toBeNull();
 check("A"); check("B");
 expect(screen.getByText("Option A: Resistance level 3 of 4")).toBeTruthy();
 answer("A"); next();
 expect(screen.queryByRole("button", {name:/Check firmness/})).toBeNull();
 expect(container.querySelectorAll("#quiz img")).toHaveLength(2);
 answer("A"); next();
 fireEvent.click(screen.getByRole("button", {name:"Restart"}));
 expect(screen.queryByText(/Resistance level/)).toBeNull();
 expect(screen.getByText("01 / 05")).toBeTruthy();
});

it("suppresses compression for reduced motion and cancels it when answers lock", () => {
 const cancel = vi.fn();
 const animate = vi.fn(() => ({cancel}));
 const original = Element.prototype.animate;
 Object.defineProperty(Element.prototype, "animate", { configurable: true, writable: true, value: animate });
 let reduce = true;
 vi.stubGlobal("matchMedia", () => ({ matches: reduce }));
 try {
  const {rerender} = render(<TactileFirmnessCheck level="ripe" optionLabel="Option A" disabled={false}><div>Visual</div></TactileFirmnessCheck>);
  fireEvent.click(screen.getByRole("button"));
  expect(animate).not.toHaveBeenCalled();
  expect(screen.getByText("Option A: Resistance level 2 of 4")).toBeTruthy();
  reduce = false; fireEvent.click(screen.getByRole("button"));
  expect(animate).toHaveBeenCalledTimes(1);
  rerender(<TactileFirmnessCheck level="ripe" optionLabel="Option A" disabled><div>Visual</div></TactileFirmnessCheck>);
  expect(cancel).toHaveBeenCalled();
 } finally { Element.prototype.animate = original; }
});
