// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { QuizEngine } from "../src/components/quiz/QuizEngine";
import { getFruitContent } from "../src/content/fruits";

afterEach(() => { cleanup(); vi.useRealTimers(); });
it.each(["kiwi", "pomegranate", "persimmon"] as const)("%s uses intentional evidence and makes avoidance feedback explicit", slug => {
  const fruit = getFruitContent(slug);
  expect(JSON.stringify(fruit.quiz)).not.toMatch(/leave behind|leave this|leave it/i);
  for (const question of fruit.quiz.questions) {
    const {container, unmount} = render(<QuizEngine quiz={{ ...fruit.quiz, questions: [question] }} presentation={fruit.presentation} />);
    expect(container.querySelectorAll("#quiz img").length).toBe(question.options.every(o => o.text && !o.illustrations) ? 0 : 2);
    expect(container.querySelector("[data-result]")).toBeNull();
    if (question.intent === "avoid-buying") {
      expect(question.question).toContain("avoid buying");
      fireEvent.click(screen.getByRole("button", {name: `Choose ${question.correctOption.toUpperCase()}`}));
      expect(screen.getByText(`${question.correctOption.toUpperCase()}: Correct — do not buy`)).toBeTruthy();
      expect(container.querySelector("#quiz")?.getAttribute("data-game-state")).toBe("CORRECT_FEEDBACK");
    }
    unmount();
  }
});
it.each(["kiwi", "pomegranate", "persimmon"] as const)("%s explains both text choices and waits for acknowledgement", slug => {
  vi.useFakeTimers();
  const fruit = getFruitContent(slug);
  const question = fruit.quiz.questions.find(q => q.options.every(o => o.text))!;
  const quiz = { ...fruit.quiz, questions: [question] };
  const {container} = render(<QuizEngine quiz={quiz} presentation={fruit.presentation} />);
  expect(container.querySelector(".option-outcome")).toBeNull();
  expect(container.querySelectorAll("#quiz img").length).toBe(question.options.every(o => o.text && !o.illustrations) ? 0 : 2);
  for (const choice of ["a", "b"] as const) {
    fireEvent.click(screen.getByRole("button", {name: `Choose ${choice.toUpperCase()}`}));
    expect(container.querySelectorAll(".option-outcome")).toHaveLength(2);
    expect(screen.getByText(question.optionExplanations!.a)).toBeTruthy();
    expect(screen.getByText(question.optionExplanations!.b)).toBeTruthy();
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByRole("button", {name: "Restart"})).toBeNull();
    fireEvent.click(screen.getByRole("button", {name: "Got it →"}));
    fireEvent.click(screen.getByRole("button", {name: "Restart"}));
    expect(container.querySelector("[data-result]")).toBeNull();
  }
});
