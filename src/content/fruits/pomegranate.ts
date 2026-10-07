import type { FruitContent, QuizOption } from "./types";

const option = <Q extends "q02" | "q03">(id: "a" | "b", question: Q): QuizOption => ({ id, assetKey: `pomegranate.quiz.${question}.${id}`, accessibilityLabel: `Option ${id.toUpperCase()}` });

export const pomegranate: FruitContent = {
  presentation: "editorial-lab", slug: "pomegranate", name: "Pomegranate", theme: { primary: "#9E3341", dark: "#4F1923", soft: "#F2DDE0" },
  seo: { title: "How to Tell If a Pomegranate Is Ripe (5 Quick Checks)", description: "Learn how to choose a mature pomegranate using weight, shape, intact skin, and simple checks for cracks, bruises, and decay.", h1: "How to Tell If a Pomegranate Is Ripe" },
  hero: { eyebrow: "POMEGRANATE", title: "How to Tell If a Pomegranate Is Ripe", directAnswer: "Choose a pomegranate that feels heavy for its size and has intact skin. Slight angles can offer another clue. Pomegranates do not continue ripening after harvest.", primaryCta: "See the quick checks", secondaryCta: "Test your eye", secondaryCtaHref: "#quiz", assetKey: "pomegranate.hero" },
  quickChecks: [{ id: "weigh", label: "WEIGH", summary: "Heavy for its size" }, { id: "shape", label: "SHAPE", summary: "Look for slight angles" }, { id: "skin", label: "SKIN", summary: "Intact and healthy" }, { id: "avoid", label: "AVOID", summary: "Cracks, bruises and decay" }, { id: "know", label: "KNOW", summary: "It won't ripen after harvest" }],
  pickingSections: [
    {
      id: "weight", layout: "photo", title: "Same size. Compare the weight.", lead: "Pick up two before you choose.",
      body: "Compare fruits of similar size, one in each hand. Prefer the one that feels heavier for its size, then check its rind. This is a practical selection clue, not a guarantee of sweetness.",
      checks: { lookFor: "A substantial, heavy feel for its size.", avoid: "Comparing a large fruit with a small one; size alone tells you little." },
      assetKey: "pomegranate.picking.weight", assetAlt: "Two similar-sized pomegranates resting in open palms for a weight comparison",
      visualTreatment: "photo", visualCaption: "Heft by hand · the photo shows the method, not the weight",
    },
    {
      id: "damage", layout: "comparison", title: "Inspect the rind all the way around",
      body: "Turn the fruit to check the sides and base. Choose intact skin; avoid buying fruit with open cracks, cuts, major bruises, or decay. A small surface scuff alone is less concerning.",
      assetKey: "pomegranate.picking.damage", assetAlt: "A pomegranate rind with a localized structural crack",
      comparison: { detail: "surface", samples: [
        { assetKey: "pomegranate.quiz.q03.a", alt: "A pomegranate with intact rind", label: "INTACT · LOOK FOR" },
        { assetKey: "pomegranate.quiz.q03.b", alt: "A pomegranate with a structural crack", label: "CRACKED · AVOID" },
      ] },
    },
    {
      id: "shape", layout: "comparison", title: "Slight angles are a supporting clue",
      body: "A mature pomegranate may have gently flattened sides. Shape varies, so a round fruit is not automatically a bad choice. Use this clue alongside weight and rind condition.",
      assetKey: "pomegranate.picking.shape", assetAlt: "A mature pomegranate with gentle angular sides",
      comparison: { detail: "outline", samples: [
        { assetKey: "pomegranate.quiz.q02.a", alt: "A pomegranate with gently angular sides", label: "SLIGHT ANGLES" },
        { assetKey: "pomegranate.quiz.q02.b", alt: "A rounder pomegranate", label: "ROUNDER SHAPE" },
      ] },
    },
    {
      id: "color", layout: "photo", title: "Different colors. Different varieties.",
      lead: "Redder does not always mean better.",
      body: "Rind color depends on the cultivar. Pale pink and deep red can both be normal. These examples show color variation, not a ripening sequence. Pomegranates will not ripen further on your counter.",
      checks: { lookFor: "Good condition and a heavy feel, whatever its normal rind color.", avoid: "Picking the darkest red fruit without checking it, or waiting for it to ripen at home." },
      assetKey: "pomegranate.picking.colors", assetAlt: "Three intact pomegranates with pale pink, pink-red, and deep red rinds",
      visualTreatment: "photo", visualCaption: "Illustrative color variation · not stages of ripeness",
    },
  ],
  dontOverthink: [{ label: "THE DARKEST RED", summary: "Isn't automatically the best." }, { label: "A PERFECTLY ROUND FRUIT", summary: "Isn't the maturity goal." }, { label: "LEAVING IT ON THE COUNTER", summary: "Won't make it truly riper." }, { label: "ONE COSMETIC MARK", summary: "Doesn't automatically mean poor internal quality." }],
  quiz: { stage: "compact-game", title: "TEST YOUR EYE", intro: "Think you've got it? Pick the pomegranate that best fits each situation.", completion: { eyebrow: "YOU'VE GOT IT", title: "You know what to look for.", summary: "For pomegranate, weight, shape, and healthy skin matter more than color alone.", takeaways: [{ label: "WEIGH", text: "Heavy for size" }, { label: "SHAPE", text: "Slight angles" }, { label: "CHECK", text: "Intact skin" }, { label: "IGNORE", text: "Color alone" }, { label: "AVOID", text: "Cracks and major damage" }] }, questions: [
    { id: "q01-heavy", question: "Which one would you choose?", helperText: "Both fruits are the same size. Compare their described weight in your hand.", options: [{ id: "a", illustrations: ["pomegranate.quiz.q03.a"], text: "Same size; feels heavier in your hand." }, { id: "b", illustrations: ["pomegranate.quiz.q03.a"], text: "Same size; feels lighter in your hand." }], correctOption: "a", optionExplanations: { a: "Heavier for the same size is the useful signal.", b: "Lighter for the same size is the weaker choice." }, correctFeedback: "Good pick. The heavier fruit is generally the better choice.", incorrectFeedback: "For two similar-sized pomegranates, look for the heavier one.", learningPoint: "For two similar-sized pomegranates, the heavier fruit is generally the better pick.", autoAdvanceOnCorrect: false },
    { id: "q02-shape", inspection: "whole", question: "Which shape is the better maturity clue?", options: [option("a", "q02"), option("b", "q02")], correctOption: "a", optionExplanations: { a: "Slight angles can support the maturity judgment.", b: "Perfect roundness is not the maturity goal." }, correctFeedback: "Right. Slight angles can be a useful maturity clue.", incorrectFeedback: "Perfectly round is not the maturity goal.", learningPoint: "Somewhat angular or slightly squared can be a useful clue, not an absolute rule.", autoAdvanceOnCorrect: false },
    { id: "q03-damage", inspection: "whole", intent: "avoid-buying", question: "Which pomegranate should you avoid buying?", helperText: "Select the fruit you should NOT buy.", options: [option("a", "q03"), option("b", "q03")], correctOption: "b", optionExplanations: { a: "Intact rind. This is the better buying choice.", b: "Do not buy this fruit: a deep crack breaks the rind." }, correctFeedback: "Correct. Meaningful damage is a concern.", incorrectFeedback: "Look for cracks, cuts, significant bruising, and decay.", learningPoint: "Avoid pomegranates with meaningful cracks, cuts, significant bruising, or decay.", autoAdvanceOnCorrect: false },
    { id: "q04-color", question: "Which pomegranate would you buy?", helperText: "Compare rind condition and the described weight, as well as color.", options: [{ id: "a", illustrations: ["pomegranate.illustration.pale"], text: "Lighter red rind; heavy for size and intact skin." }, { id: "b", illustrations: ["pomegranate.quiz.q03.a"], text: "Darker red rind; light for size." }], correctOption: "a", optionExplanations: { a: "Weight and intact skin are useful signals.", b: "Deep red alone does not compensate for low weight." }, correctFeedback: "Exactly. Weight and condition matter more than color alone.", incorrectFeedback: "Rind color varies by cultivar.", learningPoint: "Rind color varies by cultivar. Use several signals together.", autoAdvanceOnCorrect: false },
    { id: "q05-final-pick", question: "FINAL PICK Which pomegranate would you take home?", options: [{ id: "a", illustrations: ["pomegranate.quiz.q02.a"], text: "Heavy for size, slightly angular, with intact skin." }, { id: "b", illustrations: ["pomegranate.quiz.q03.b"], text: "Lighter for size, rounder, with a meaningful crack." }], correctOption: "a", optionExplanations: { a: "Combines weight, slight angles, and intact skin.", b: "A deep crack is a reason to avoid buying this fruit." }, correctFeedback: "Great final pick. This one combines the better signals.", incorrectFeedback: "Look for weight, slight angles, intact skin, and no meaningful damage.", learningPoint: "Choose a pomegranate that is heavy for its size, slightly angular, and free from meaningful damage.", autoAdvanceOnCorrect: false },
  ] },
  nutrition: { basis: "per 100g", metrics: [{ label: "Calories", value: "83 kcal" }, { label: "Carbohydrate", value: "18.7 g" }, { label: "Fiber", value: "4 g" }, { label: "Potassium", value: "236 mg" }, { label: "Vitamin C", value: "10.2 mg" }] },
  faq: [{ question: "How do you choose a ripe pomegranate?", answer: "Look for a fruit that feels heavy for its size, has intact skin, and may be somewhat angular rather than perfectly round." }, { question: "Does a pomegranate ripen after you buy it?", answer: "No. Pomegranates do not continue ripening after harvest, so choose one in good condition at the store." }, { question: "Should a ripe pomegranate feel heavy?", answer: "For two similarly sized fruits, the heavier one is generally the better pick." }, { question: "Are cracks in a pomegranate a bad sign?", answer: "Meaningful cracks, cuts, significant bruising, and decay are reasons to choose another fruit." }, { question: "How should a whole pomegranate be stored?", answer: "Keep whole fruit cool and handle it gently to protect the intact rind." }],
  sources: [{ label: "Utah State University Extension — pomegranate cultivar colors", url: "https://extension.usu.edu/yardandgarden/research/pomegranate-fruit-of-the-desert" }, { label: "UC Davis Postharvest Center — Pomegranate maturity and quality", url: "https://postharvest.ucdavis.edu/produce-facts-sheets/pomegranate" }, { label: "Utah State University Extension — pomegranate selection", url: "https://extension.usu.edu/fscreate/files/2023-26-staff/Create-Better-Health-4-Lesson-Curriculum.pdf" }, { label: "University of Georgia Cooperative Extension — Pomegranate production", url: "https://extension.uga.edu/publications/detail.html?number=C997&title=pomegranate-production" }, { label: "USDA FoodData Central — FDC 169134", url: "https://fdc.nal.usda.gov/food-details/169134/nutrients" }],
  relatedFruits: ["avocado", "kiwi", "persimmon"],
};
