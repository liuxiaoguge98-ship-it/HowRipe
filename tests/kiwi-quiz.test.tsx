// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { QuizEngine } from "../src/components/quiz/QuizEngine";
import { kiwi } from "../src/content/fruits/kiwi";

afterEach(() => document.body.replaceChildren());

describe("production Kiwi Quiz initial state", () => {
  it("starts neutral with only its question, helper, progress, and neutral A/B controls", () => {
    render(<QuizEngine quiz={kiwi.quiz} />);

    expect(screen.getByText("01 / 05")).toBeTruthy();
    expect(screen.getByText("Which kiwi would you eat today?")).toBeTruthy();
    expect(screen.getByText("Both look plump and healthy. Check firmness on each: the photos cannot tell you how they feel.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Option A" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Option B" })).toBeTruthy();
    expect(screen.queryByText("Correct")).toBeNull();
    expect(screen.queryByText("Not quite")).toBeNull();
    expect(screen.queryByText("A ripe green kiwifruit should yield slightly to gentle pressure without feeling mushy.")).toBeNull();
  });
});
