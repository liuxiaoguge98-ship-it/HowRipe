import type { PickingSection } from "@/content/fruits/types";
import { FruitAsset } from "./FruitAsset";
import { TeachingEvidence } from "./TeachingEvidence";

export function PickingGuide({ sections }: { sections: PickingSection[] }) {
  return <section data-editorial-section="picking" data-section-reveal id="guide-foundation" className="border-t border-[var(--color-border)] py-14 sm:py-20">
    <p className="eyebrow">HOW TO PICK</p>
    <div className="mt-8 divide-y divide-[var(--color-border)]">{sections.map((section, index) => {
      const teaching = Boolean(section.visualTreatment || section.comparison);
      return <article data-layout={section.layout} data-teaching={teaching || undefined} id={section.id} className="grid gap-5 py-8 md:grid-cols-[8rem_1fr]" key={section.id}>
        <p className="text-xs font-bold tracking-[0.14em] text-[var(--fruit-dark)]">{String(index + 1).padStart(2, "0")}</p>
        <div>
          {!teaching && section.assetKey ? <FruitAsset assetKey={section.assetKey} alt={section.assetAlt ?? ""} className="mb-5 max-w-md" /> : null}
          <h2 className="font-serif text-3xl tracking-[-0.03em]">{section.title}</h2>
          {section.lead ? <p className="picking-lead mt-4 text-lg font-medium">{section.lead}</p> : null}
          <p className="picking-body mt-4 max-w-2xl leading-7 text-[var(--color-ink-soft)]">{section.body}</p>
          {section.principle ? <p className="picking-principle mt-5 border-l-2 border-[var(--fruit-primary)] pl-4 font-serif text-xl">{section.principle}</p> : null}
          {section.checks ? <dl className="picking-checks"><div><dt>Look for</dt><dd>{section.checks.lookFor}</dd></div><div><dt>Watch out for</dt><dd>{section.checks.avoid}</dd></div></dl> : null}
          {teaching ? <TeachingEvidence section={section} /> : null}

        </div>
      </article>;
    })}</div>
  </section>;
}
