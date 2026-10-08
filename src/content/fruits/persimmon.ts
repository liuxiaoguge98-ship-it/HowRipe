import type { FruitContent } from "./types";

export const persimmon: FruitContent = {
  presentation: "editorial-lab", slug: "persimmon", name: "Persimmon",
  theme: { primary: "#D77B29", dark: "#673516", soft: "#F8E4CC" },
  seo: { title: "How to Tell If a Persimmon Is Ripe: Fuyu vs Hachiya", description: "Identify Fuyu or Hachiya first. Learn why mature Fuyu can be ready while firm, why Hachiya needs to be very soft, and how to distinguish normal ripening from damage.", h1: "How to Tell If a Persimmon Is Ripe" },
  hero: {
    eyebrow: "PERSIMMON · TYPE FIRST", title: "How to Tell If a Persimmon Is Ripe",
    directAnswer: "First identify the type. Fuyu persimmons can be ready to eat while still firm and crisp. Hachiya persimmons should become fully ripe and very soft before fresh eating.",
    primaryCta: "See the quick checks", secondaryCta: "Test your eye", secondaryCtaHref: "#quiz",
    note: "This guide focuses on the common Japanese/Oriental persimmon types Fuyu and Hachiya. Other cultivars may behave differently. Hachiya guidance here is for fresh, untreated fruit.",
    assetKey: "persimmon.hero",
    specimens: [{ assetKey: "persimmon.hero", name: "Fuyu", rule: "Firm can be ready" }, { assetKey: "persimmon.variant.hachiya", name: "Hachiya", rule: "Wait until very soft" }],
  },
  quickChecks: [
    { id: "type", label: "TYPE", summary: "Fuyu or Hachiya?" },
    { id: "shape", label: "SHAPE", summary: "Flat or acorn-shaped?" },
    { id: "feel", label: "FEEL", summary: "Firm means different things" },
    { id: "color", label: "COLOR", summary: "Mature color helps" },
    { id: "check", label: "CHECK", summary: "Avoid real damage" },
  ],
  variantOverview: {
    layout: "variant-lab", title: "Which persimmon do you have?",
    intro: "Start with the label or ask the seller. Shape helps you recognize the type; it does not replace variety confirmation.",
    variants: [
      { id: "fuyu-card", name: "Fuyu", descriptor: "NON-ASTRINGENT", rule: "FIRM CAN BE RIPE.",
        summary: "Flat, squat, squarish-round. Mature Fuyu is commonly eaten firm and crisp.",
        readyCriteria: "Look for mature yellow-orange/orange color, firm or slightly softened texture, and sound skin.",
        assetKey: "persimmon.variant.fuyu", assetAlt: "Whole flat, squat Fuyu persimmon", targetId: "#fuyu",
        path: [
          { label: "Green / immature", description: "Wait for mature color appropriate to the cultivar.", state: "wait" },
          { label: "Mature color + firm / crisp", description: "Firm can be ready. Slight softening is also possible; it is not required.", state: "ready" },
        ],
      },
      { id: "hachiya-card", name: "Hachiya", descriptor: "ASTRINGENT", rule: "WAIT UNTIL VERY SOFT.",
        summary: "Elongated, pointed, acorn-like. Orange and firm can mean mature, but not ready for fresh eating.",
        readyCriteria: "Look for mature orange/reddish-orange color and very soft whole-fruit feel, without decay or localized damage.",
        assetKey: "persimmon.variant.hachiya", assetAlt: "Whole elongated, pointed Hachiya persimmon", targetId: "#hachiya",
        path: [
          { label: "Green / immature", description: "Wait for mature color appropriate to the cultivar.", state: "wait" },
          { label: "Orange + still firm", description: "Mature / ripening. Still astringent; not yet ready for fresh eating.", state: "wait" },
          { label: "Very soft throughout", description: "Fully ripe, jelly-like softness can be normal. Check for sound skin and no decay.", state: "ready" },
        ],
      },
    ],
  },
  pickingSections: [
    {
      id: "fuyu", layout: "photo", title: "Fuyu — firm can be ready.", lead: "Firmness is not a reason to reject a mature Fuyu.",
      body: "Confirm the flat, squat type with the label or seller. Look for mature yellow-orange/orange color for its cultivar. Firm, crisp fruit can be ready for fresh eating; slight softening is also possible.",
      checks: { lookFor: "Mature color, full healthy structure and intact skin. Firm is fine.", avoid: "Significant cracks, bruises, mechanical injury or decay. Do not wait for softness as the standard rule." },
      assetKey: "persimmon.variant.fuyu", assetAlt: "Whole firm-looking Fuyu with full squat shape and intact orange skin", visualTreatment: "photo", visualCaption: "Fuyu · mature color + firm / crisp can be ready",
    },
    {
      id: "hachiya", layout: "comparison", title: "Hachiya — wait for very soft.", lead: "Mature orange color is only one step.",
      body: "For fresh, untreated Hachiya, orange skin with a firm feel is not the normal ready-to-eat state. Support the whole fruit gently. Wait until it is very soft throughout; the ripe fruit may appear subtly translucent and feel jelly-like. Confirm by touch, not the photo alone.",
      comparison: { detail: "whole", samples: [
        { assetKey: "persimmon.quiz.q03.a", alt: "Intact orange Hachiya with a taut, firm-looking structure", label: "ORANGE + FIRM · MATURE, STILL WAIT" },
        { assetKey: "persimmon.quiz.q03.b", alt: "Intact fully ripe Hachiya with gently relaxed structure and no local injury", label: "VERY SOFT THROUGHOUT · READY FOR FRESH EATING" },
      ] },
    },
    {
      id: "damage", layout: "comparison", title: "Normal softness or real damage?", lead: "Very soft does not automatically mean spoiled.",
      body: "Normal Hachiya ripening softens the whole fruit evenly. A localized collapsed pocket is different. Check for significant cracks, injury, decay or abnormal leaking. The comparison keeps maturity similar and isolates one damaged area.",
      comparison: { detail: "whole", samples: [
        { assetKey: "persimmon.quiz.q04.a", alt: "Whole ripe Hachiya, evenly relaxed, with intact skin", label: "UNIFORM SOFTNESS · NORMAL RIPENING" },
        { assetKey: "persimmon.quiz.q04.b", alt: "Similarly ripe Hachiya with one localized sunken injury on its right side", label: "ONE COLLAPSED POCKET · LOCALIZED DAMAGE" },
      ] },
    },
    {
      id: "color", layout: "comparison", title: "Color confirms. Type + texture decide.",
      body: "Color supports maturity judgment and varies by cultivar. Fuyu develops mature yellow-orange/orange tones; Hachiya progresses toward orange/reddish-orange. These two orange fruits are both described as firm, yet their readiness differs.",
      comparison: { detail: "whole", samples: [
        { assetKey: "persimmon.variant.fuyu", alt: "Mature-colored whole Fuyu", label: "ORANGE + FIRM FUYU · CAN BE READY" },
        { assetKey: "persimmon.variant.hachiya", alt: "Mature-colored whole Hachiya", label: "ORANGE + FIRM HACHIYA · WAIT" },
      ] },
    },
  ],
  dontOverthink: [
    { label: "FIRM = UNRIPE", summary: "Not for Fuyu." },
    { label: "SOFT = BAD", summary: "Not for a properly ripened Hachiya." },
    { label: "ORANGE = READY", summary: "Not by itself." },
    { label: "ONE RULE FITS BOTH", summary: "Definitely not. Identify the type first." },
  ],
  quiz: {
    stage: "compact-game", title: "TEST YOUR EYE", intro: "Identify the type. Compare the whole fruit and the described hand-feel.",
    completion: { eyebrow: "TYPE FIRST", title: "Two types. Two different rules.", summary: "Mature color supports the decision. Variety and texture tell you when to eat.", takeaways: [
      { label: "TYPE", text: "Identify Fuyu or Hachiya first" }, { label: "FUYU", text: "Firm can be ready" },
      { label: "HACHIYA", text: "Wait until very soft" }, { label: "COLOR", text: "Supporting evidence" },
      { label: "DAMAGE", text: "Cracks, injury, decay or local collapse" },
    ] },
    questions: [
      { id: "q01-type", inspection: "whole", question: "Which one is a Fuyu persimmon?", helperText: "Look at the whole-fruit shape.",
        options: [{ id: "a", assetKey: "persimmon.variant.fuyu", accessibilityLabel: "Option A" }, { id: "b", assetKey: "persimmon.variant.hachiya", accessibilityLabel: "Option B" }], correctOption: "a",
        optionExplanations: { a: "Flat and squat: the typical Fuyu shape.", b: "Elongated and acorn-like: the typical Hachiya shape." }, correctFeedback: "Correct. Start by identifying the type.", incorrectFeedback: "This elongated shape is typical of Hachiya. Fuyu is flatter and squat.", learningPoint: "Identify the type before judging ripeness. Confirm with the label or seller.", autoAdvanceOnCorrect: false },
      { id: "q02-fuyu", question: "You want a crisp persimmon to eat now. Which one would you choose?", helperText: "Both are confirmed Fuyu and feel firm. Inspect their condition.",
        options: [{ id: "a", illustrations: ["persimmon.quiz.q02.a"], text: "Fuyu · mature orange color, full shape and intact skin." }, { id: "b", illustrations: ["persimmon.quiz.q02.b"], text: "Fuyu · orange skin with a significant crack." }], correctOption: "a",
        optionExplanations: { a: "Mature and sound. Firm, crisp Fuyu can be ready.", b: "The crack is a condition concern; firmness is not the problem." }, correctFeedback: "Good choice. This sound Fuyu can be enjoyed firm and crisp.", incorrectFeedback: "Choose the intact Fuyu. You do not need to wait for it to soften.", learningPoint: "A mature Fuyu can be ready while still firm.", autoAdvanceOnCorrect: false },
      { id: "q03-hachiya", question: "Which Hachiya is ready for fresh eating?", helperText: "Both have intact skin. Compare the images and gentle touch descriptions.",
        options: [{ id: "a", illustrations: ["persimmon.quiz.q03.a"], text: "Hachiya · orange, but still firm throughout." }, { id: "b", illustrations: ["persimmon.quiz.q03.b"], text: "Hachiya · fully ripe, very soft evenly throughout." }], correctOption: "b",
        optionExplanations: { a: "Mature color, but still firm and astringent. Wait.", b: "Even, very soft ripeness is expected for Hachiya." }, correctFeedback: "Correct. Very soft throughout is the Hachiya ready-to-eat state.", incorrectFeedback: "Orange color alone is not enough. This Hachiya still needs to soften.", learningPoint: "Fresh, untreated Hachiya needs to become very soft before fresh eating.", autoAdvanceOnCorrect: false },
      { id: "q04-soft-or-damaged", question: "Which one shows normal Hachiya ripening rather than localized damage?", helperText: "Both are mature-colored Hachiya. Compare the pattern of softness.",
        options: [{ id: "a", illustrations: ["persimmon.quiz.q04.a"], text: "Whole fruit is uniformly very soft, with intact skin." }, { id: "b", illustrations: ["persimmon.quiz.q04.b"], text: "One area is sunken and damaged; its feel differs from the rest." }], correctOption: "a",
        optionExplanations: { a: "Even whole-fruit softness can be normal ripe Hachiya.", b: "A localized collapsed pocket indicates damage." }, correctFeedback: "Correct. Normal soft ripening affects the whole fruit.", incorrectFeedback: "That localized injury differs from normal even softening.", learningPoint: "Whole-fruit softness can be normal for Hachiya. Localized damage is different.", autoAdvanceOnCorrect: false },
      { id: "q05-final-pick", question: "Both are firm and mature-colored. Which one is ready to eat now?", helperText: "The seller confirms the varieties shown. Both fruits are in good condition.",
        options: [{ id: "a", illustrations: ["persimmon.variant.fuyu"], text: "Fuyu · mature-colored and firm." }, { id: "b", illustrations: ["persimmon.variant.hachiya"], text: "Hachiya · mature-colored and firm." }], correctOption: "a",
        optionExplanations: { a: "Firm, mature Fuyu can be ready for fresh eating.", b: "Firm Hachiya still needs to become very soft." }, correctFeedback: "Exactly. The same firmness means different things for these two types.", incorrectFeedback: "Identify the type first. Firm Hachiya should wait; firm Fuyu can be ready.", learningPoint: "The same firmness means different things depending on the variety.", autoAdvanceOnCorrect: false },
    ],
  },
  nutrition: { basis: "per 100g", metrics: [{ label: "Calories", value: "70 kcal" }, { label: "Carbohydrate", value: "18.6 g" }, { label: "Fiber", value: "3.6 g" }, { label: "Sugars", value: "12.5 g" }, { label: "Potassium", value: "161 mg" }] },
  faq: [{ question: "How can you tell a Fuyu from a Hachiya persimmon?", answer: "Fuyu is generally flat and squarish-round, while Hachiya is usually oblong or conical. The important eating difference is that Fuyu can be firm, while Hachiya should be very soft." }, { question: "Can you eat a Fuyu persimmon while it is firm?", answer: "Yes. Fuyu is non-astringent and is commonly enjoyed while firm." }, { question: "When is a Hachiya persimmon ready to eat?", answer: "Wait until it is very soft so its astringency has faded." }, { question: "Can I buy a firm Hachiya persimmon?", answer: "Yes. A sound, mature-colored Hachiya can be bought to soften at home. For fresh, untreated fruit, wait until it is very soft before eating. Firmness alone is not damage." }, { question: "Should you choose a persimmon based on color alone?", answer: "No. Use mature color as a supporting clue, but identify the type and check texture and condition too." }, { question: "What should you avoid when choosing persimmons?", answer: "Avoid growth cracks, major mechanical injuries, and decay." }],
  sources: [{ label: "UC Agriculture and Natural Resources — persimmon eating textures", url: "https://ucanr.edu/node/137200/printable/print" }, { label: "UC Davis Fruit & Nut Research and Information Center — persimmon scion selection", url: "https://fruitsandnuts.ucdavis.edu/persimmon-scion-rooststock-selection" }, { label: "UC Davis Postharvest Center — Persimmon maturity and quality", url: "https://postharvest.ucdavis.edu/produce-facts-sheets/persimmon" }, { label: "UC Davis Postharvest Center — Fuyu ripening guidance", url: "https://postharvest.ucdavis.edu/ask-produce-docs/how-should-i-get-my-fuyu-persimmons-ripen-quickly" }, { label: "USDA FoodData Central — FDC 169941", url: "https://fdc.nal.usda.gov/food-details/169941/nutrients" }],
  relatedFruits: ["avocado", "kiwi", "pomegranate"],
};
