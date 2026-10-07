import type { Metadata } from "next";
import type { FruitContent } from "@/content/fruits";
import { fruitAssets } from "./fruit-assets";
import { pageMetadata } from "./site-metadata";

export function fruitMetadata(fruit: FruitContent): Metadata {
  const image = fruit.hero.assetKey ? fruitAssets[fruit.hero.assetKey].src : undefined;
  return pageMetadata(`/${fruit.slug}`, fruit.seo.title, fruit.seo.description, image);
}
