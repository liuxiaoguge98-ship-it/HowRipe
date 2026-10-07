import type { FruitSlug } from "@/content/fruits/types";

export type FruitAssetRole = "hero" | "timing" | "education" | "comparison" | "variant";
export type FruitAssetRecord = { fruit: FruitSlug; role: FruitAssetRole; required: boolean; aspectRatio: "1:1" | "4:3" | "4:5" | "3:2"; sourceBackground: "transparent-preferred" | "white-preferred" | "transparent-or-white" | "scene"; objectFit: "contain" | "cover"; desktopPosition?: string; mobilePosition?: string; loading: "critical" | "lazy" | "interactive"; accessibility: "descriptive" | "neutral-quiz" | "decorative"; pairId?: string; purpose: string; status: "placeholder" | "production"; src?: string };
const placeholder = <T extends FruitAssetRecord>(asset: T) => asset;
const hero = (fruit: FruitSlug, purpose: string) => placeholder({ fruit, role: "hero", required: true, aspectRatio: "4:5", sourceBackground: "transparent-preferred", objectFit: "contain", loading: "critical", accessibility: "descriptive", purpose, status: "placeholder" } as const);
const education = (fruit: FruitSlug, purpose: string) => placeholder({ fruit, role: "education", required: true, aspectRatio: "4:3", sourceBackground: "transparent-or-white", objectFit: "contain", loading: "lazy", accessibility: "descriptive", purpose, status: "placeholder" } as const);
const comparison = (fruit: FruitSlug, pairId: string) => placeholder({ fruit, role: "comparison", required: true, aspectRatio: "1:1", sourceBackground: "transparent-or-white", objectFit: "contain", loading: "interactive", accessibility: "neutral-quiz", pairId, purpose: "Controlled neutral quiz comparison", status: "placeholder" } as const);
const productionComparison = (fruit: FruitSlug, pairId: string, src: string) => ({ ...comparison(fruit, pairId), status: "production" as const, src });
const variant = (fruit: FruitSlug, purpose: string) => placeholder({ fruit, role: "variant", required: true, aspectRatio: "4:5", sourceBackground: "transparent-or-white", objectFit: "contain", loading: "lazy", accessibility: "descriptive", purpose, status: "placeholder" } as const);
const productionHero = (fruit: FruitSlug, purpose: string, src: string) => ({ ...hero(fruit, purpose), status: "production" as const, src });
const productionEducation = (fruit: FruitSlug, purpose: string, src: string) => ({ ...education(fruit, purpose), status: "production" as const, src });
const productionVariant = (fruit: FruitSlug, purpose: string, src: string) => ({ ...variant(fruit, purpose), status: "production" as const, src });
const teachingPhoto = (fruit: FruitSlug, purpose: string, src: string) => ({ ...productionEducation(fruit, purpose, src), sourceBackground: "scene" as const });

export const fruitAssets = {
  "kiwi.illustration.fridge": { ...productionEducation("kiwi", "One whole kiwi in cold storage", "/fruits/kiwi/quiz/scenarios/fridge.webp"), aspectRatio: "1:1", sourceBackground: "transparent-preferred" },
  "kiwi.illustration.bag": { ...productionEducation("kiwi", "A whole kiwi and apple in an open paper bag", "/fruits/kiwi/quiz/scenarios/bag.webp"), aspectRatio: "1:1", sourceBackground: "transparent-preferred" },
  "kiwi.illustration.counter-six": { ...productionEducation("kiwi", "All six whole kiwi on the counter", "/fruits/kiwi/quiz/scenarios/counter-six.webp"), aspectRatio: "1:1", sourceBackground: "transparent-preferred" },
  "kiwi.illustration.split-six": { ...productionEducation("kiwi", "Two whole kiwi on the counter and four in cold storage", "/fruits/kiwi/quiz/scenarios/split-six.webp"), aspectRatio: "1:1", sourceBackground: "transparent-preferred" },
  "kiwi.illustration.all-now": { ...productionEducation("kiwi", "Four whole kiwi together; firmness is supplied by option text", "/fruits/kiwi/quiz/scenarios/all-now.webp"), aspectRatio: "1:1", sourceBackground: "transparent-preferred" },
  "kiwi.illustration.now-later": { ...productionEducation("kiwi", "One whole kiwi for today and three for later; firmness is supplied by option text", "/fruits/kiwi/quiz/scenarios/now-later.webp"), aspectRatio: "1:1", sourceBackground: "transparent-preferred" },
  "pomegranate.illustration.pale": { ...productionEducation("pomegranate", "Paler cultivar rind for color and weight scenario", "/fruits/pomegranate/quiz/pomegranate-pale.webp"), aspectRatio: "1:1", sourceBackground: "transparent-preferred" },
  "kiwi.picking.press": teachingPhoto("kiwi", "Gentle touch demonstration; firmness requires touch", "/fruits/kiwi/education/palm-pressure.webp"),
  "pomegranate.picking.weight": teachingPhoto("pomegranate", "Compare similarly sized fruit by hand; no weight verdict from the photograph", "/fruits/pomegranate/education/heft-comparison.webp"),
  "pomegranate.picking.colors": teachingPhoto("pomegranate", "Natural rind color variation across cultivars, not a ripeness sequence", "/fruits/pomegranate/education/color-varieties.webp"),
  "avocado.picking.scuff": { ...productionEducation("avocado", "Minor cosmetic scuff teaching", "/fruits/avocado/quiz/q03-a.webp"), aspectRatio: "1:1" },
  "avocado.picking.damage": { ...productionEducation("avocado", "Localized structural dent teaching", "/fruits/avocado/quiz/q03-b.webp"), aspectRatio: "1:1" },
  "avocado.picking.shapeNatural": { ...productionEducation("avocado", "Natural asymmetric contour teaching", "/fruits/avocado/quiz/q05-a.webp"), aspectRatio: "1:1" },
  "avocado.picking.shapeCollapse": { ...productionEducation("avocado", "Localized contour collapse teaching", "/fruits/avocado/quiz/q05-b.webp"), aspectRatio: "1:1" },
  "avocado.picking.stemDamage": { ...productionEducation("avocado", "Localized stem-area deterioration comparison", "/fruits/avocado/education/stem-damage.webp"), aspectRatio: "1:1" },
  "avocado.picking.stem": { ...productionEducation("avocado", "Dedicated high-resolution attached-stem macro teaching image", "/fruits/avocado/education/stem-macro.webp"), aspectRatio: "1:1" },
  "avocado.picking.press": productionEducation("avocado", "Broad gentle palm contact demonstration", "/fruits/avocado/education/palm-pressure.webp"),
  "avocado.hero": productionHero("avocado", "Primary above-the-fold avocado", "/fruits/avocado/hero/hero.webp"),
  "avocado.quiz.q01.a": productionComparison("avocado", "avocado-q01", "/fruits/avocado/quiz/q05-a.webp"),
  "avocado.quiz.q01.b": productionComparison("avocado", "avocado-q01", "/fruits/avocado/quiz/q05-a.webp"),
  "avocado.quiz.q02.a": productionComparison("avocado", "avocado-q02", "/fruits/avocado/quiz/q05-a.webp"),
  "avocado.quiz.q02.b": productionComparison("avocado", "avocado-q02", "/fruits/avocado/quiz/q05-a.webp"),
  "avocado.quiz.q03.a": productionComparison("avocado", "avocado-q03", "/fruits/avocado/quiz/q03-a.webp"),
  "avocado.quiz.q03.b": productionComparison("avocado", "avocado-q03", "/fruits/avocado/quiz/q03-b.webp"),
  "avocado.quiz.q04.a": productionComparison("avocado", "avocado-q04", "/fruits/avocado/quiz/q05-a.webp"),
  "avocado.quiz.q04.b": productionComparison("avocado", "avocado-q04", "/fruits/avocado/quiz/q05-a.webp"),
  "avocado.quiz.q05.a": productionComparison("avocado", "avocado-q05", "/fruits/avocado/quiz/q05-a.webp"),
  "avocado.quiz.q05.b": productionComparison("avocado", "avocado-q05", "/fruits/avocado/quiz/q05-b.webp"),
  "kiwi.quiz.q02.a": productionComparison("kiwi", "kiwi-q02", "/fruits/kiwi/quiz/neutral.webp"),
  "kiwi.quiz.q02.b": productionComparison("kiwi", "kiwi-q02", "/fruits/kiwi/education/local-bruise.webp"),
  "kiwi.hero": productionHero("kiwi", "Primary above-the-fold kiwi", "/fruits/kiwi/hero/hero.webp"),
  "kiwi.picking.wrinkles": productionEducation("kiwi", "Kiwi wrinkle education", "/fruits/kiwi/education/wrinkles-v2.webp"),
  "kiwi.quiz.q01.a": productionComparison("kiwi", "kiwi-q01", "/fruits/kiwi/quiz/neutral.webp"),
  "kiwi.quiz.q01.b": productionComparison("kiwi", "kiwi-q01", "/fruits/kiwi/quiz/neutral.webp"),
  "pomegranate.hero": productionHero("pomegranate", "Primary above-the-fold pomegranate", "/fruits/pomegranate/hero/hero.webp"),
  "pomegranate.picking.shape": productionEducation("pomegranate", "Pomegranate shape education", "/fruits/pomegranate/education/shape-v2.webp"),
  "pomegranate.picking.damage": productionEducation("pomegranate", "Pomegranate damage education", "/fruits/pomegranate/education/damage.webp"),
  "pomegranate.quiz.q02.a": productionComparison("pomegranate", "pomegranate-q02", "/fruits/pomegranate/quiz/angular-v2.webp"),
  "pomegranate.quiz.q02.b": productionComparison("pomegranate", "pomegranate-q02", "/fruits/pomegranate/quiz/neutral.webp"),
  "pomegranate.quiz.q03.a": productionComparison("pomegranate", "pomegranate-q03", "/fruits/pomegranate/quiz/neutral.webp"),
  "pomegranate.quiz.q03.b": productionComparison("pomegranate", "pomegranate-q03", "/fruits/pomegranate/quiz/crack.webp"),
  "persimmon.hero": productionHero("persimmon", "Fuyu specimen in the paired type-first hero", "/fruits/persimmon/variants/fuyu.webp"),
  "persimmon.variant.fuyu": productionVariant("persimmon", "Fuyu variety overview", "/fruits/persimmon/variants/fuyu.webp"),
  "persimmon.variant.hachiya": productionVariant("persimmon", "Hachiya variety overview", "/fruits/persimmon/variants/hachiya.webp"),
  "persimmon.quiz.q02.a": productionComparison("persimmon", "persimmon-q02", "/fruits/persimmon/quiz/fuyu.webp"),
  "persimmon.quiz.q02.b": productionComparison("persimmon", "persimmon-q02", "/fruits/persimmon/quiz/crack.webp"),
  "persimmon.quiz.q03.a": productionComparison("persimmon", "persimmon-q03", "/fruits/persimmon/variants/hachiya.webp"),
  "persimmon.quiz.q03.b": productionComparison("persimmon", "persimmon-q03", "/fruits/persimmon/variants/hachiya-soft.webp"),
  "persimmon.quiz.q04.a": productionComparison("persimmon", "persimmon-q04", "/fruits/persimmon/variants/hachiya-soft.webp"),
  "persimmon.quiz.q04.b": productionComparison("persimmon", "persimmon-q04", "/fruits/persimmon/variants/hachiya-local-damage.webp"),
} as const satisfies Record<string, FruitAssetRecord>;
export type FruitAssetKey = keyof typeof fruitAssets;
export function resolveFruitAsset(key: string) {
  const asset = fruitAssets[key as FruitAssetKey];
  if (!asset) throw new Error(`Unknown fruit asset key: ${key}`);
  return asset;
}
export function validateFruitAssetContracts(): string[] {
  const issues: string[] = [];
  const entries = Object.entries(fruitAssets) as Array<[FruitAssetKey, FruitAssetRecord]>;
  for (const [key, asset] of entries) { if (!key.startsWith(`${asset.fruit}.`)) issues.push(`${key} has wrong namespace`); if (asset.status === "placeholder" && asset.src) issues.push(`${key} placeholder has a source`); }
  const pairs = new Map<string, Array<[FruitAssetKey, FruitAssetRecord]>>();
  for (const entry of entries.filter(([, asset]) => asset.role === "comparison")) { const list = pairs.get(entry[1].pairId!) ?? []; list.push(entry); pairs.set(entry[1].pairId!, list); }
  for (const [pairId, pair] of pairs) { const [, first] = pair[0]; if (pair.length !== 2 || !pair.some(([key]) => key.endsWith(".a")) || !pair.some(([key]) => key.endsWith(".b")) || pair.some(([, asset]) => asset.fruit !== first.fruit || asset.aspectRatio !== first.aspectRatio || asset.objectFit !== first.objectFit || asset.sourceBackground !== first.sourceBackground || asset.accessibility !== "neutral-quiz" || asset.status !== first.status || (asset.status === "production" && !asset.src))) issues.push(`${pairId} is incompatible`); }
  return issues;
}
