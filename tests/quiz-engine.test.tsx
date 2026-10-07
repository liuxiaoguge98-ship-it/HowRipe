// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { QuizEngine } from "../src/components/quiz/QuizEngine";
import type { QuizConfig } from "../src/content/fruits/types";
import { kiwiTemplateFixture } from "./fixtures/kiwi-template-fixture";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
const quiz: QuizConfig = { title: "Test your eye", questions: [{ id: "one", question: "Choose A", options: [{ id: "a", assetKey: "avocado.quiz.q01.a", accessibilityLabel: "Option A" }, { id: "b", assetKey: "avocado.quiz.q01.b", accessibilityLabel: "Option B" }], correctOption: "a", correctFeedback: "Correct choice.", incorrectFeedback: "Not this time.", learningPoint: "A learning point.", autoAdvanceOnCorrect: true }, { id: "two", question: "Choose B", options: [{ id: "a", assetKey: "avocado.quiz.q01.a", accessibilityLabel: "Option A again" }, { id: "b", assetKey: "avocado.quiz.q01.b", accessibilityLabel: "Option B again" }], correctOption: "b", correctFeedback: "Correct again.", incorrectFeedback: "Try the other principle.", learningPoint: "Second point.", autoAdvanceOnCorrect: true }], completion: { title: "Complete", takeaways: [{ label: "LOOK", text: "Use the checks." }] } };

describe("QuizEngine", () => {
  it("does not advance twice while a browser transition is awaiting its update", () => {
    let update: (() => void) | undefined;
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: (callback: () => void) => {
      update = callback;
      return { finished: Promise.resolve() };
    } });
    try {
      render(<QuizEngine quiz={quiz} />);
      fireEvent.click(screen.getByRole("button", { name: "Option B" }));
      const gotIt = screen.getByRole("button", { name: /got it/i });
      fireEvent.click(gotIt);
      fireEvent.click(gotIt);
      act(() => update?.());
      expect(screen.getByText("Choose B")).toBeTruthy();
      expect(screen.queryByText("Complete")).toBeNull();
      expect(screen.queryByText("A learning point.")).toBeNull();
    } finally {
      Reflect.deleteProperty(document, "startViewTransition");
    }
  });
  it("preserves correct progression with reduced motion and bypasses visual transitions", () => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const transition = vi.fn();
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: transition });
    try {
      render(<QuizEngine quiz={quiz} />);
      fireEvent.click(screen.getByRole("button", { name: "Option A" }));
      expect(screen.getByText("A learning point.")).toBeTruthy();
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByText("Choose B")).toBeTruthy();
      expect(transition).not.toHaveBeenCalled();
    } finally {
      Reflect.deleteProperty(document, "startViewTransition");
    }
  });
  it("starts neutrally with semantic options and no feedback", () => { render(<QuizEngine quiz={quiz} />); expect(screen.getByText("Choose A")).toBeTruthy(); expect(screen.getByRole("button", { name: "Option A" })).toBeTruthy(); expect(screen.getByText("01 / 02")).toBeTruthy(); expect(screen.queryByText("Correct")).toBeNull(); expect(screen.queryByText("A learning point.")).toBeNull(); });
  it("lays out neutral A/B options as a constrained two-column comparison", () => { render(<QuizEngine quiz={quiz} />); expect(screen.getByRole("button", { name: "Option A" }).parentElement?.className).toContain("grid-cols-2"); });
  it("shows correct feedback then auto-advances", () => { vi.useFakeTimers(); render(<QuizEngine quiz={quiz} />); fireEvent.click(screen.getByRole("button", { name: "Option A" })); expect(screen.getByText("Correct")).toBeTruthy(); expect(screen.getByRole("button", { name: "Option B" })).toHaveProperty("disabled", true); act(() => vi.advanceTimersByTime(1000)); expect(screen.getByText("Choose B")).toBeTruthy(); vi.useRealTimers(); });
  it("requires Got it after a wrong answer", () => { render(<QuizEngine quiz={quiz} />); fireEvent.click(screen.getByRole("button", { name: "Option B" })); expect(screen.getByText("Not quite")).toBeTruthy(); expect(screen.getByText("A learning point.")).toBeTruthy(); fireEvent.click(screen.getByRole("button", { name: /got it/i })); expect(screen.getByText("Choose B")).toBeTruthy(); });
  it("reaches completion only after the final correct feedback timer", () => { vi.useFakeTimers(); render(<QuizEngine quiz={quiz} />); fireEvent.click(screen.getByRole("button", { name: "Option A" })); act(() => vi.advanceTimersByTime(1000)); fireEvent.click(screen.getByRole("button", { name: "Option B again" })); expect(screen.getByText("Correct")).toBeTruthy(); expect(screen.queryByText("Complete")).toBeNull(); act(() => vi.advanceTimersByTime(999)); expect(screen.queryByText("Complete")).toBeNull(); act(() => vi.advanceTimersByTime(1)); expect(screen.getByText("Complete")).toBeTruthy(); });
  it("reaches completion from the final wrong answer only after Got it", () => { vi.useFakeTimers(); render(<QuizEngine quiz={quiz} />); fireEvent.click(screen.getByRole("button", { name: "Option A" })); act(() => vi.advanceTimersByTime(1000)); fireEvent.click(screen.getByRole("button", { name: "Option A again" })); expect(screen.getByText("Not quite")).toBeTruthy(); act(() => vi.advanceTimersByTime(5000)); expect(screen.queryByText("Complete")).toBeNull(); fireEvent.click(screen.getByRole("button", { name: /got it/i })); expect(screen.getByText("Complete")).toBeTruthy(); });
  it("derives progress from a two-question fixture and cleans up timers on unmount", () => { vi.useFakeTimers(); const { unmount } = render(<QuizEngine quiz={quiz} />); expect(screen.getByText("01 / 02")).toBeTruthy(); fireEvent.click(screen.getByRole("button", { name: "Option A" })); unmount(); expect(() => act(() => vi.advanceTimersByTime(1000))).not.toThrow(); });
  it("uses the non-production Kiwi fixture's dynamic progress and completion flow", () => {
    vi.useFakeTimers();
    render(<QuizEngine quiz={kiwiTemplateFixture.quiz} />);
    expect(screen.getByText("01 / 02")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Fixture Kiwi option A" }));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("Fixture question two")).toBeTruthy();
    expect(screen.getByText("02 / 02")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Fixture Kiwi option A" }));
    expect(screen.getByText("Fixture incorrect two.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /got it/i }));
    expect(screen.getByText("Fixture complete")).toBeTruthy();
  });
});
