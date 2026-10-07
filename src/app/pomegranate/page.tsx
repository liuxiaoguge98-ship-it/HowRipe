import type { Metadata } from "next";
import { FruitPage } from "@/components/fruit/FruitPage";
import { getFruitContent } from "@/content/fruits";
import { fruitMetadata } from "@/lib/fruit-metadata";
const pomegranate = getFruitContent("pomegranate");
export const metadata: Metadata = fruitMetadata(pomegranate);
export default function PomegranatePage() { return <FruitPage fruit={pomegranate} />; }
