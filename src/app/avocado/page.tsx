import type { Metadata } from "next";
import { FruitPage } from "@/components/fruit/FruitPage";
import { getFruitContent } from "@/content/fruits";
import { fruitMetadata } from "@/lib/fruit-metadata";
const avocado = getFruitContent("avocado");
export const metadata: Metadata = fruitMetadata(avocado);
export default function AvocadoPage() { return <FruitPage fruit={avocado} />; }
