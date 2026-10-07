import type { QuizOption } from "../src/content/fruits/types";

// This file is checked by tsc, not executed by Vitest.
const visual = { id: "a", assetKey: "avocado.quiz.q03.a", accessibilityLabel: "Option A" } satisfies QuizOption;
const tactile = { id: "b", assetKey: "avocado.quiz.q01.b", accessibilityLabel: "Option B", tactile: { kind: "firmness", level: "very_firm" } } satisfies QuizOption;
const text = { id: "a", text: "An explicit rule choice" } satisfies QuizOption;
// @ts-expect-error text and asset are mutually exclusive
const mixed = { id: "a", text: "Rule", assetKey: "avocado.hero", accessibilityLabel: "Option A" } satisfies QuizOption;
// @ts-expect-error text choices cannot carry tactile metadata
const textTactile = { id: "a", text: "Rule", tactile: { kind: "firmness", level: "ripe" } } satisfies QuizOption;
// @ts-expect-error every option must supply a medium
const empty = { id: "a" } satisfies QuizOption;
// @ts-expect-error text choices derive their accessible name from visible text
const hiddenRule = { id: "a", text: "Rule", accessibilityLabel: "Option A" } satisfies QuizOption;
// @ts-expect-error production keys stay statically checked
const unknown = { id: "a", assetKey: "avocado.quiz.q06.a", accessibilityLabel: "Option A" } satisfies QuizOption;
void [visual, tactile, text, mixed, textTactile, empty, hiddenRule, unknown];
