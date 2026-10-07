import type { CSSProperties } from "react";
import type { FruitContent } from "@/content/fruits";
import { DontOverthink } from "./DontOverthink";
import { FruitFAQ } from "./FruitFAQ";
import { FruitHero } from "./FruitHero";
import { NutritionSnapshot } from "./NutritionSnapshot";
import { PickingGuide } from "./PickingGuide";
import { QuickChecks } from "./QuickChecks";
import { RelatedFruits } from "./RelatedFruits";
import { SourcesList } from "./SourcesList";
import { KiwiRipeness, KiwiStorageGuide } from "./KiwiGuide";
import { TimingGuide } from "./TimingGuide";
import { VariantOverview } from "./VariantOverview";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { MotionEnhancement } from "./MotionEnhancement";
import styles from "./EditorialLab.module.css";
import themes from "./FruitThemes.module.css";

export function FruitPage({ fruit }: { fruit: FruitContent }) {
  const editorial = fruit.presentation === "editorial-lab";
  const theme = {
    "--fruit-primary": fruit.theme.primary,
    "--fruit-dark": fruit.theme.dark,
    "--fruit-soft": fruit.theme.soft,
  } as CSSProperties;

  return (
    <article style={theme} data-fruit={fruit.slug} data-presentation={fruit.presentation} className={editorial ? `${styles.editorial} ${themes[fruit.slug] ?? ""}` : undefined}>
      <MotionEnhancement />
      <div className="site-container">
        <FruitHero h1={fruit.seo.h1} hero={fruit.hero} />
        <QuickChecks checks={fruit.quickChecks} numbered={editorial} />
        {fruit.variantOverview ? <VariantOverview overview={fruit.variantOverview} /> : null}
        {fruit.timingGuide ? fruit.slug === "kiwi" ? <KiwiRipeness guide={fruit.timingGuide} /> : <TimingGuide guide={fruit.timingGuide} /> : null}
        <PickingGuide sections={fruit.pickingSections} />
        {fruit.slug === "kiwi" ? <KiwiStorageGuide /> : null}
      </div>
      {fruit.dontOverthink ? <DontOverthink items={fruit.dontOverthink} /> : null}
      <div className="site-container">
        <QuizEngine quiz={fruit.quiz} presentation={fruit.presentation} />
        <NutritionSnapshot nutrition={fruit.nutrition} />
        <FruitFAQ items={fruit.faq} />
        {fruit.sources ? <SourcesList sources={fruit.sources} /> : null}
        <RelatedFruits fruits={fruit.relatedFruits} visual={editorial} />
      </div>
    </article>
  );
}
