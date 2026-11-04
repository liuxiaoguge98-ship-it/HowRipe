import type { Metadata } from "next";

import { FruitPage } from "@/components/fruit/FruitPage";
import { getFruitContent } from "@/content/fruits";
import { fruitMetadata } from "@/lib/fruit-metadata";

const pear = getFruitContent("pear");

export const metadata: Metadata = fruitMetadata(pear);

export default function PearPage() {
  return <FruitPage fruit={pear} />;
}
