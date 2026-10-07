import type { FruitVariantOverview } from "@/content/fruits/types";
import { VariantLab } from "./VariantLab";
import { FruitAsset } from "./FruitAsset";

export function VariantOverview({ overview }: { overview: FruitVariantOverview }) {
  if (overview.layout === "variant-lab") return <VariantLab overview={overview} />;
  return <section data-editorial-section="variants" data-section-reveal aria-labelledby="variant-overview-title" className="border-b border-[var(--color-border)] py-10 sm:py-12"><p className="eyebrow">KNOW YOUR TYPE</p><h2 id="variant-overview-title" className="mt-3 font-serif text-3xl tracking-[-0.03em]">{overview.title}</h2>{overview.intro ? <p className="mt-4 max-w-2xl leading-7 text-[var(--color-ink-soft)]">{overview.intro}</p> : null}<div className="mt-7 grid gap-px bg-[var(--color-border)] md:grid-cols-2">{overview.variants.map((variant) => <article className="bg-[var(--color-page)] p-6" key={variant.id}>{variant.assetKey ? <FruitAsset assetKey={variant.assetKey} alt={variant.assetAlt ?? ""} className="mb-4" /> : null}<p className="text-xs font-semibold tracking-[0.14em] text-[var(--fruit-dark)]">{variant.descriptor}</p><h3 className="mt-3 font-serif text-2xl">{variant.name}</h3><p className="mt-3 leading-7 text-[var(--color-ink-soft)]">{variant.summary}</p>{variant.targetId ? <a className="mt-5 inline-flex font-semibold text-[var(--fruit-dark)] underline underline-offset-4" href={variant.targetId}>Learn about {variant.name} <span aria-hidden="true">→</span></a> : null}</article>)}</div></section>;
}
