import type { FruitContent } from "@/content/fruits";
import { VariantHero } from "./VariantLab";
import { FruitAsset } from "./FruitAsset";

export function FruitHero({ hero, h1 }: { hero: FruitContent["hero"]; h1: string }) {
  const asset = hero.assetKey;
  // Include the existing CSS magnification in the contained artwork's width.
  const imageSizes = asset === "kiwi.hero" ? "(max-width: 639px) 174px, 363px"
    : asset === "avocado.hero" ? "(max-width: 639px) 216px, 400px"
    : "(max-width: 639px) 200px, 363px";
  return <section className="motion-hero grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16"><div className="motion-hero-text"><p className="eyebrow">{hero.eyebrow}</p><h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">{h1}</h1><p className="mt-6 max-w-xl text-xl leading-8 text-[var(--color-ink-soft)]">{hero.directAnswer}</p><div className="mt-8 flex flex-wrap gap-3 text-sm font-medium"><a className="button-primary" href="#quick-checks">{hero.primaryCta}</a>{hero.secondaryCta ? <a className="button-secondary" href={hero.secondaryCtaHref ?? "#guide-foundation"}>{hero.secondaryCta}</a> : null}</div>{hero.note ? <p className="mt-6 max-w-xl text-sm leading-6 text-[var(--color-muted)]">{hero.note}</p> : null}</div>{hero.specimens ? <VariantHero specimens={hero.specimens} /> : asset ? <FruitAsset assetKey={asset} alt={h1} sizes={imageSizes} loading="eager" fetchPriority="high" className="motion-hero-asset border border-[var(--fruit-primary)]" /> : null}</section>;
}
