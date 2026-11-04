// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuizEngine } from "../src/components/quiz/QuizEngine";
import { getFruitContent } from "../src/content/fruits";
import { resolveFruitAsset } from "../src/lib/fruit-assets";

const pear = () => getFruitContent("pear");
const questions = () => pear().quiz.questions;
const source = (key: string) => resolveFruitAsset(key).src;
const renderQuestion = (index: number) => {
  const fruit = pear();
  return render(<QuizEngine quiz={{ ...fruit.quiz, questions: [fruit.quiz.questions[index]] }} presentation={fruit.presentation} />);
};

beforeEach(() => vi.stubGlobal("matchMedia", () => ({ matches: true })));
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("PEAR-01 Quiz evidence", () => {
  it("keeps the five intended answers and waits for acknowledgement", () => {
    expect(questions()).toHaveLength(5);
    expect(new Set(questions().map(question => question.id)).size).toBe(5);
    expect(questions().map(question => question.correctOption)).toEqual(["b", "b", "a", "b", "b"]);
    expect(questions().every(question => question.autoAdvanceOnCorrect === false)).toBe(true);
  });

  it("Q01 compares belly A and neck B on the same specimen using neutral HTML location markers", () => {
    const [a, b] = questions()[0].options;
    if (a.text === undefined || b.text === undefined) throw new Error("Location evidence must have visible option text");
    expect(a.text).toMatch(/middle|belly/i);
    expect(b.text).toMatch(/neck.*stem|stem.*neck/i);
    expect(a.marker).toEqual({ x: 50, y: 68 });
    expect(b.marker).toEqual({ x: 54, y: 31 });
    expect(a.illustrations).toHaveLength(1);
    expect(b.illustrations).toHaveLength(1);
    expect(source(a.illustrations![0])).toBe(source(b.illustrations![0]));
    const { container } = renderQuestion(0);
    const options = container.querySelectorAll(".quiz-text-option");
    for (const [index, option] of [...options].entries()) {
      const marker = [...option.querySelectorAll<HTMLElement>("[style]")].find(element => {
        const css = element.getAttribute("style") ?? "";
        return /50%/.test(css) && /68%/.test(css) || /54%/.test(css) && /31%/.test(css);
      });
      expect(marker, `Option ${index ? "B" : "A"} has a visible location marker`).toBeDefined();
      expect(marker?.getAttribute("aria-hidden")).toBe("true");
    }
    expect(container.querySelectorAll("#quiz img")).toHaveLength(2);
    expect(container.querySelector("[data-result]")).toBeNull();
  });

  it("Q02 shares the image and neck placement while keeping firmness hidden until checking", () => {
    const [a, b] = questions()[1].options;
    expect(a.tactile?.level).toBe("very_firm");
    expect(b.tactile?.level).toBe("ripe");
    expect(source(a.assetKey!)).toBe(source(b.assetKey!));
    for (const option of [a, b]) {
      expect(option.tactile?.placement).toEqual({ x: 54, y: 31 });
      expect(option.tactile?.actionLabel).toBe("Check neck");
    }
    const { container } = renderQuestion(1);
    for (const option of [a, b]) expect(screen.queryByText(option.tactile!.description!)).toBeNull();
    expect(container.querySelectorAll(".touch-description")).toHaveLength(0);
    expect(screen.getByRole("button", { name: "Check neck Option A" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Check neck Option B" })).toBeTruthy();
    expect(container.querySelector("button button")).toBeNull();
  });

  it("Q03 identifies Bartlett A versus Anjou B with illustrated variety evidence", () => {
    const [a, b] = questions()[2].options;
    expect(a.text).toMatch(/^Bartlett\b/);
    expect(b.text).toMatch(/^Anjou\b/);
    expect(a.illustrations).toHaveLength(1);
    expect(b.illustrations).toHaveLength(1);
    expect(source(a.illustrations![0])).not.toBe(source(b.illustrations![0]));
    expect(source(a.illustrations![0])).not.toBe(source("pear.variety.bartlett"));
    expect(source(a.illustrations![0])).toMatch(/quiz\/bartlett-green\.webp$/);
  });

  it("Q04 asks Yes A or No B about the same normal russeted Bosc", () => {
    const question = questions()[3];
    expect(question.question).toMatch(/Bosc.*russet/i);
    expect(question.options.map(option => option.text)).toEqual(["Yes", "No"]);
    const [a, b] = question.options;
    expect(a.illustrations).toHaveLength(1);
    expect(b.illustrations).toHaveLength(1);
    expect(source(a.illustrations![0])).toBe(source(b.illustrations![0]));
    expect(source(a.illustrations![0])).toBe(source("pear.variety.bosc"));
  });

  it("Q05 contrasts European A with firm, crisp Asian B", () => {
    const question = questions()[4];
    expect(question.question).toMatch(/firm.*crisp|crisp.*firm/i);
    expect(question.options[0].text).toMatch(/European pear/i);
    expect(question.options[1].text).toMatch(/Asian pear/i);
    expect(question.options.every(option => option.illustrations?.length === 1)).toBe(true);
    expect(source(question.options[0].illustrations![0])).not.toBe(source(question.options[1].illustrations![0]));
  });

  it.each([0, 1, 2, 3, 4])("Q%s starts without verdicts, hidden explanations, or inactive evidence", index => {
    const question = questions()[index];
    const { container } = renderQuestion(index);
    expect(screen.getByRole("heading", { name: question.question })).toBeTruthy();
    expect(container.querySelector("[data-result]")).toBeNull();
    expect(container.querySelector(".option-outcome")).toBeNull();
    expect(container.innerHTML).not.toMatch(/very_firm|beginning_to_soften|body_soft|correctOption|data-asset-key/);
    for (const text of [question.correctFeedback, question.incorrectFeedback, question.learningPoint, ...Object.values(question.optionExplanations ?? {})]) expect(screen.queryByText(text)).toBeNull();
    for (const image of container.querySelectorAll("#quiz img")) expect(image.getAttribute("alt")).toBe("");
    expect(container.querySelectorAll("#quiz img")).toHaveLength(2);
    expect(container.querySelectorAll('button[aria-label="Choose A"], button[aria-label="Choose B"]')).toHaveLength(2);
  });

  it("lets keyboard users check both necks independently and announces the feel without choosing", async () => {
    const user = userEvent.setup();
    const { container } = renderQuestion(1);
    const [a, b] = questions()[1].options;
    screen.getByRole("button", { name: "Check neck Option A" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText(a.tactile!.description!)).toBeTruthy();
    expect(screen.queryByText(b.tactile!.description!)).toBeNull();
    screen.getByRole("button", { name: "Check neck Option B" }).focus();
    await user.keyboard(" ");
    expect(screen.getByText(b.tactile!.description!)).toBeTruthy();
    expect(container.querySelectorAll('.resistance-slot[aria-live="polite"][aria-atomic="true"]')).toHaveLength(2);
    expect(container.querySelector("[data-result]")).toBeNull();
    expect(container.querySelector("#quiz")?.getAttribute("data-game-state")).toBe("ANSWERING");
    screen.getByRole("button", { name: "Choose B" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Correct")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Check neck Option A" })).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Check neck Option B" })).toHaveProperty("disabled", true);
  });

  it.each([0, 1, 2, 3, 4])("Q%s explains both choices after either answer and requires Got it", index => {
    vi.useFakeTimers();
    const question = questions()[index];
    for (const id of ["a", "b"] as const) {
      const { container, unmount } = renderQuestion(index);
      fireEvent.click(screen.getByRole("button", { name: `Choose ${id.toUpperCase()}` }));
      expect(screen.getByText(id === question.correctOption ? "Correct" : "Not quite")).toBeTruthy();
      expect(screen.getByText(id === question.correctOption ? question.correctFeedback : question.incorrectFeedback)).toBeTruthy();
      expect(screen.getByText(question.learningPoint)).toBeTruthy();
      expect(container.querySelectorAll(".option-outcome")).toHaveLength(2);
      for (const choice of ["a", "b"] as const) {
        expect(screen.getByText(question.optionExplanations![choice])).toBeTruthy();
        const button = screen.getByRole("button", { name: `Choose ${choice.toUpperCase()}` });
        expect(button).toHaveProperty("disabled", true);
        expect(button.getAttribute("data-result")).toBe(choice === question.correctOption ? "correct" : "wrong");
      }
      act(() => vi.advanceTimersByTime(5000));
      expect(screen.queryByRole("button", { name: "Restart" })).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: "Got it →" }));
      expect(screen.getByRole("button", { name: "Restart" })).toBeTruthy();
      unmount();
    }
  });

  it("keeps only the active question mounted, completes all five takeaways, and resets cleanly", () => {
    const fruit = pear();
    const { container } = render(<QuizEngine quiz={fruit.quiz} presentation={fruit.presentation} />);
    for (const [index, question] of fruit.quiz.questions.entries()) {
      expect(screen.getByText(`${String(index + 1).padStart(2, "0")} / 05`)).toBeTruthy();
      expect(screen.getByRole("heading", { name: question.question })).toBeTruthy();
      expect(container.querySelectorAll("#quiz img")).toHaveLength(2);
      for (const inactive of fruit.quiz.questions.filter(item => item !== question)) expect(screen.queryByRole("heading", { name: inactive.question })).toBeNull();
      if (index === 1) {
        fireEvent.click(screen.getByRole("button", { name: "Check neck Option A" }));
        fireEvent.click(screen.getByRole("button", { name: "Check neck Option B" }));
      }
      fireEvent.click(screen.getByRole("button", { name: `Choose ${question.correctOption.toUpperCase()}` }));
      fireEvent.click(screen.getByRole("button", { name: "Got it →" }));
      expect(container.querySelector("[data-result]")).toBeNull();
    }
    expect(container.querySelectorAll("#quiz img")).toHaveLength(0);
    expect(fruit.quiz.completion?.takeaways?.map(item => item.label)).toEqual(["TYPE", "PLACE", "FEEL", "COLOR", "TIMING"]);
    for (const takeaway of fruit.quiz.completion!.takeaways!) expect(screen.getByText(takeaway.text)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(screen.getByText("01 / 05")).toBeTruthy();
    expect(container.querySelector("[data-result]")).toBeNull();
    expect(container.querySelector(".option-outcome")).toBeNull();
    expect(container.querySelector(".touch-description")).toBeNull();
  });
});
