// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuizEngine } from "../src/components/quiz/QuizEngine";
import { persimmon } from "../src/content/fruits/persimmon";
import { fruitAssets } from "../src/lib/fruit-assets";

const ruleA = "Fuyu · mature-colored and firm.";
const ruleB = "Hachiya · mature-colored and firm.";
const finalQuiz = { ...persimmon.quiz, questions: [persimmon.quiz.questions[4]] };
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("structured text Quiz choices", () => {
  it("illustrates both Q05 specimens without changing accessible choices or revealing feedback", () => {
    const { container } = render(<QuizEngine quiz={finalQuiz} />);
    expect(screen.getByRole("button", { name: ruleA })).toBeTruthy();
    expect(screen.getByRole("button", { name: ruleB })).toBeTruthy();
    expect(container.querySelectorAll(".quiz-illustrations img")).toHaveLength(2);
    expect(container.querySelector(".tactile-visual")).toBeNull();
    for (const text of ["Correct", "Not quite", persimmon.quiz.questions[4].learningPoint]) expect(screen.queryByText(text)).toBeNull();
    expect(persimmon.quiz.questions[4].correctOption).toBe("a");
    expect(Object.keys(fruitAssets)).toHaveLength(50);
    expect(Object.keys(fruitAssets)).not.toContain("persimmon.quiz.q05.a");
    expect(Object.keys(fruitAssets)).not.toContain("persimmon.quiz.q05.b");
    expect(persimmon.quiz.questions[4].options.every((option) => !("assetKey" in option))).toBe(true);
  });

  it("selects the correct choice and waits for Got it before completion", () => {
    vi.useFakeTimers();
    render(<QuizEngine quiz={finalQuiz} />);
    fireEvent.click(screen.getByRole("button", { name: ruleA }));
    expect(screen.getByText("Correct")).toBeTruthy();
    act(() => vi.advanceTimersByTime(999));
    expect(screen.queryByText(persimmon.quiz.completion!.title)).toBeNull();
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByText(persimmon.quiz.completion!.title)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Got it/ }));
    expect(screen.getByText(persimmon.quiz.completion!.title)).toBeTruthy();
  });

  it("keeps the wrong choice on screen until Got it, then reaches completion", () => {
    vi.useFakeTimers();
    render(<QuizEngine quiz={finalQuiz} />);
    fireEvent.click(screen.getByRole("button", { name: ruleB }));
    expect(screen.getByText("Not quite")).toBeTruthy();
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByText(persimmon.quiz.completion!.title)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Got it/ }));
    expect(screen.getByText(persimmon.quiz.completion!.title)).toBeTruthy();
  });

  it.each(["{Enter}", " "])("activates the native text choice with %s", async (key) => {
    const user = userEvent.setup();
    render(<QuizEngine quiz={finalQuiz} />);
    screen.getByRole("button", { name: ruleB }).focus();
    await user.keyboard(key);
    expect(screen.getByText("Not quite")).toBeTruthy();
  });

  it("retains correct progression under reduced motion without starting a view transition", () => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const transition = vi.fn();
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: transition });
    try {
      render(<QuizEngine quiz={finalQuiz} />);
      fireEvent.click(screen.getByRole("button", { name: ruleA }));
      act(() => vi.advanceTimersByTime(1000));
      fireEvent.click(screen.getByRole("button", { name: /Got it/ }));
      expect(screen.getByText(persimmon.quiz.completion!.title)).toBeTruthy();
      expect(transition).not.toHaveBeenCalled();
    } finally { Reflect.deleteProperty(document, "startViewTransition"); }
  });
});
