import type { Metadata } from "next";
import { FruitPage } from "@/components/fruit/FruitPage";
import { getFruitContent } from "@/content/fruits";
import { fruitMetadata } from "@/lib/fruit-metadata";

const persimmon = getFruitContent("persimmon");

export const metadata: Metadata = fruitMetadata(persimmon);

export default function PersimmonPage() { return <FruitPage fruit={persimmon} />; }
