import Image from "next/image";
import type { FruitSlug } from "@/content/fruits/types";
import { resolveFruitAsset } from "@/lib/fruit-assets";
import { getFruitContent, hasFruitContent } from "@/content/fruits";

const labels: Record<FruitSlug, string> = {
  avocado: "AVOCADO", kiwi: "KIWI", pomegranate: "POMEGRANATE", persimmon: "PERSIMMON",
};

export function RelatedFruits({ fruits, visual = false }: { fruits: FruitSlug[]; visual?: boolean }) {
  return (
    <section data-editorial-section="related" data-section-reveal className="border-t border-[var(--color-border)] py-14 sm:py-20">
      <p className="eyebrow">PICK YOUR NEXT FRUIT</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {fruits.map((fruit) => {
          const available = hasFruitContent(fruit);
          const key = visual && available ? getFruitContent(fruit).hero.assetKey : undefined;
          const asset = key ? resolveFruitAsset(key) : undefined;
          const className = "border border-[var(--color-border)] px-4 py-3 text-sm font-bold tracking-[0.12em] text-[var(--color-muted)]";
          return available ? (
            <a className={className} href={`/${fruit}`} key={fruit}>
              {/* Navigation reuses approved art lazily; the destination Hero retains its critical loading contract. */}
              {asset?.src ? <span className="related-visual"><Image src={asset.src} alt="" fill loading="lazy" sizes="(max-width: 639px) 140px, 30vw" style={{ objectFit: asset.objectFit }} /></span> : null}
              {visual ? <span>{labels[fruit]}<span aria-hidden="true"> ↗</span></span> : labels[fruit]}
            </a>
          ) : <span className={className} key={fruit}>{labels[fruit]} <span className="font-normal">COMING SOON</span></span>;
        })}
      </div>
    </section>
  );
}
