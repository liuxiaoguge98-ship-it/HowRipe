import type { Metadata } from "next";

import { FruitPage } from "@/components/fruit/FruitPage";
import { getFruitContent } from "@/content/fruits";
import { fruitMetadata } from "@/lib/fruit-metadata";

const kiwi = getFruitContent("kiwi");

export const metadata: Metadata = fruitMetadata(kiwi);

export default function KiwiPage() {
  return <FruitPage fruit={kiwi} />;
}
