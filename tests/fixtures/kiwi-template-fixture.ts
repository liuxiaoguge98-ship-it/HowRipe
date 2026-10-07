import type { FruitContent, QuizOption } from "../../src/content/fruits/types";

// Test fixture only. This is deliberately not production Kiwi copy or content.
const option = <Q extends "q01" | "q02">(id: "a" | "b", question: Q): QuizOption => ({
  id,
  assetKey: `kiwi.quiz.${question}.${id}`,
  accessibilityLabel: `Fixture Kiwi option ${id.toUpperCase()}`,
});

export const kiwiTemplateFixture: FruitContent = {
  slug: "kiwi",
  name: "Kiwi fixture",
  theme: { primary: "#547B22", dark: "#203D16", soft: "#E5EFD8" },
  seo: {
    title: "Fixture Kiwi template title",
    description: "Test-only non-production Kiwi fixture description.",
    h1: "Fixture Kiwi template heading",
  },
  hero: {
    eyebrow: "KIWI FIXTURE",
    title: "Fixture Kiwi template heading",
    directAnswer: "Test-only direct answer for generic template validation.",
    primaryCta: "Review fixture checks",
    assetKey: "kiwi.hero",
  },
  quickChecks: [
    { id: "weight", label: "WEIGHT", summary: "Fixture weight check" },
    { id: "give", label: "GIVE", summary: "Fixture gentle give" },
    { id: "skin", label: "SKIN", summary: "Fixture skin check" },
    { id: "timing", label: "TIMING", summary: "Fixture timing check" },
  ],
  pickingSections: [
    { id: "weight", title: "Fixture weight", body: "Test-only picking body one." },
    { id: "give", title: "Fixture gentle pressure", body: "Test-only picking body two." },
    { id: "skin", title: "Fixture skin", body: "Test-only picking body three." },
  ],
  quiz: {
    title: "FIXTURE TEST YOUR EYE",
    intro: "Test-only Quiz intro.",
    questions: [
      {
        id: "fixture-q01",
        question: "Fixture question one",
        options: [option("a", "q01"), option("b", "q01")],
        correctOption: "a",
        correctFeedback: "Fixture correct one.",
        incorrectFeedback: "Fixture incorrect one.",
        learningPoint: "Fixture learning point one.",
        autoAdvanceOnCorrect: true,
      },
      {
        id: "fixture-q02",
        question: "Fixture question two",
        options: [option("a", "q02"), option("b", "q02")],
        correctOption: "b",
        correctFeedback: "Fixture correct two.",
        incorrectFeedback: "Fixture incorrect two.",
        learningPoint: "Fixture learning point two.",
        autoAdvanceOnCorrect: true,
      },
    ],
    completion: {
      title: "Fixture complete",
      takeaways: [
        { label: "WEIGHT", text: "Fixture takeaway one" },
        { label: "GIVE", text: "Fixture takeaway two" },
      ],
    },
  },
  nutrition: {
    basis: "fixture per 100g",
    metrics: [
      { label: "Fixture calories", value: "61 kcal" },
      { label: "Fixture fiber", value: "3 g" },
      { label: "Fixture sugar", value: "9 g" },
    ],
  },
  faq: [
    { question: "Fixture FAQ one?", answer: "Test-only fixture answer one." },
    { question: "Fixture FAQ two?", answer: "Test-only fixture answer two." },
  ],
  relatedFruits: ["avocado", "pomegranate"],
};
