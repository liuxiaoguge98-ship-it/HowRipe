import type { FruitAssetKey } from "@/lib/fruit-assets";

export type FruitSlug = "avocado" | "kiwi" | "pomegranate" | "persimmon";

export type FruitTheme = {
  primary: string;
  dark: string;
  soft: string;
};

export type FruitSEO = {
  title: string;
  description: string;
  h1: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  directAnswer: string;
  primaryCta: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  note?: string;
  assetKey?: FruitAssetKey;
  specimens?: [{ assetKey: FruitAssetKey; name: string; rule: string }, { assetKey: FruitAssetKey; name: string; rule: string }];
  directAnswerZh?: string;
};

export type QuickCheck = {
  id: string;
  label: string;
  summary: string;
};

export type TimingStage = {
  label: string;
  timing: string;
  summary: string;
  assetKey?: FruitAssetKey;
};

export type TimingGuide = {
  title: string;
  intro?: string;
  stages: TimingStage[];
  principle?: string;
  colorNote?: string;
};

export type FruitVariantOverview = {
  layout?: "variant-lab";
  title: string;
  intro?: string;
  variants: Array<{
    id: string;
    name: string;
    descriptor: string;
    summary: string;
    assetKey?: FruitAssetKey;
    assetAlt?: string;
    targetId?: string;
    rule?: string;
    readyCriteria?: string;
    path?: Array<{ label: string; description: string; state: "wait" | "ready" }>;
  }>;
};

export type TeachingComparison = {
  detail: "surface" | "outline" | "whole";
  samples: [{ assetKey: FruitAssetKey; alt: string; label: string }, { assetKey: FruitAssetKey; alt: string; label: string }];
};

export type PickingSection = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  lead?: string;
  principle?: string;
  checks?: { lookFor: string; avoid: string };
  assetKey?: FruitAssetKey;
  assetAlt?: string;
  visualTreatment?: "pressure" | "stem-detail" | "photo";
  visualCaption?: string;
  conditionGuide?: { lookFor: string; avoid: string; note: string; avoidAssetKey: FruitAssetKey; avoidAlt: string };
  comparison?: TeachingComparison;
  layout?: "text" | "split" | "feature" | "comparison" | "detail" | "statement" | "photo";
};

export type DontOverthinkItem = {
  label: string;
  summary: string;
};

export type FirmnessLevel = "very_firm" | "beginning_to_soften" | "ripe";
export type QuizTactileCue = { kind: "firmness"; level: FirmnessLevel; description?: string };

export type VisualQuizOption = {
  id: "a" | "b";
  assetKey: FruitAssetKey;
  accessibilityLabel: string;
  tactile?: QuizTactileCue;
  text?: never;
  illustrations?: never;
};

export type TextQuizOption = {
  id: "a" | "b";
  text: string;
  /** Illustrations accompany the scenario; tactile/weight facts stay in text. */
  illustrations?: [FruitAssetKey] | [FruitAssetKey, FruitAssetKey];
  assetKey?: never;
  accessibilityLabel?: never;
  tactile?: never;
};

export type QuizOption = VisualQuizOption | TextQuizOption;

export type QuizQuestion = {
  intent?: "avoid-buying";
  /** Neutral equal-scale inspection for both specimens; never answer-specific. */
  inspection?: "surface" | "outline" | "whole";
  id: string;
  question: string;
  helperText?: string;
  tactileInstruction?: string;
  options: [QuizOption, QuizOption];
  correctOption: "a" | "b";
  optionExplanations?: Record<"a" | "b", string>;
  correctFeedback: string;
  incorrectFeedback: string;
  learningPoint: string;
  autoAdvanceOnCorrect: boolean;
};

export type QuizConfig = {
  stage?: "compact-game";
  title: string;
  intro?: string;
  questions: QuizQuestion[];
  completion?: QuizCompletion;
};
export type QuizCompletion = { eyebrow?: string; title: string; summary?: string; takeaways?: Array<{ label: string; text: string }>; ctaLabel?: string };

export type NutritionSnapshot = {
  basis: string;
  metrics: Array<{ label: string; value: string }>;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type SourceReference = {
  label: string;
  url: string;
};

export type FruitContent = {
  presentation?: "editorial-lab";
  slug: FruitSlug;
  name: string;
  theme: FruitTheme;
  seo: FruitSEO;
  hero: HeroContent;
  quickChecks: QuickCheck[];
  variantOverview?: FruitVariantOverview;
  timingGuide?: TimingGuide;
  pickingSections: PickingSection[];
  dontOverthink?: DontOverthinkItem[];
  quiz: QuizConfig;
  nutrition: NutritionSnapshot;
  faq: FAQItem[];
  relatedFruits: FruitSlug[];
  sources?: SourceReference[];
};
