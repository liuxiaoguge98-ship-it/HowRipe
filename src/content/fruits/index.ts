import { avocado } from "./avocado";
import { kiwi } from "./kiwi";
import { pomegranate } from "./pomegranate";
import { persimmon } from "./persimmon";
import type { FruitContent, FruitSlug } from "./types";

export type { FruitContent, FruitSlug, QuickCheck } from "./types";

export const fruitGuides: Array<{ slug: FruitSlug; name: string }> = [
  { slug: "avocado", name: "Avocado" },
  { slug: "kiwi", name: "Kiwi" },
  { slug: "pomegranate", name: "Pomegranate" },
  { slug: "persimmon", name: "Persimmon" },
];

const fruitContent: Record<FruitSlug, FruitContent | undefined> = {
  avocado,
  kiwi,
  pomegranate,
  persimmon,
};

export function hasFruitContent(slug: FruitSlug): boolean {
  return Boolean(fruitContent[slug]);
}

export function getLiveFruitGuides(): Array<{ slug: FruitSlug; name: string }> {
  return fruitGuides.filter((guide) => hasFruitContent(guide.slug));
}

export function getFruitContent(slug: FruitSlug): FruitContent {
  const fruit = fruitContent[slug];

  if (!fruit) {
    throw new Error(`Fruit content is not available yet: ${slug}`);
  }

  return fruit;
}
