import type { PickingSection } from "@/content/fruits/types";
import type { FruitAssetKey } from "@/lib/fruit-assets";
import { FruitAsset } from "./FruitAsset";

// Existing hand/photo wells bound the contained artwork, including on phones.
const photoSizes: Partial<Record<FruitAssetKey, string>> = {
  "avocado.picking.press": "(max-width: 639px) 254px, 427px",
  "kiwi.picking.press": "(max-width: 639px) 294px, 400px",
  "pomegranate.picking.weight": "(max-width: 639px) calc(100vw - 74px), 520px",
  "pomegranate.picking.colors": "(max-width: 639px) calc(100vw - 74px), 520px",
};

/** Captions explain evidence in HTML; production photographs remain unmarked. */
export function TeachingEvidence({ section }: { section: PickingSection }) {
  if (section.conditionGuide && section.assetKey) {
    const guide = section.conditionGuide;
    return <div className="condition-guide">
      <div className="condition-pair">
        {[{state: "good", title: "Look for", icon: "✓", key: section.assetKey, alt: section.assetAlt ?? "", text: guide.lookFor},
          {state: "avoid", title: "Avoid", icon: "×", key: guide.avoidAssetKey, alt: guide.avoidAlt, text: guide.avoid}].map(sample => <figure className="condition-check" data-condition={sample.state} key={sample.key}>
          <div className="evidence-window"><FruitAsset assetKey={sample.key} alt={sample.alt} sizes="(max-width: 639px) max(130px, calc((100vw - 112px) / 2)), 50vw" /></div>
          <figcaption><h3><span aria-hidden="true">{sample.icon}</span>{sample.title}</h3><p>{sample.text}</p></figcaption>
        </figure>)}
      </div>
      <p className="condition-note">{guide.note}</p>
      <p className="condition-caption">STEM CONDITION · ILLUSTRATIVE COMPARISON</p>
    </div>;
  }
  if (section.comparison) return (
    <div className="teaching-comparison" data-detail={section.comparison.detail}>
      {section.comparison.samples.map(sample => (
        <figure key={sample.assetKey}>
          <div className="evidence-window"><FruitAsset assetKey={sample.assetKey} alt={sample.alt} sizes="(max-width: 639px) calc((100vw - 106px) * 0.6), 360px" /></div>
          <figcaption>{sample.label}</figcaption>
        </figure>
      ))}
      {section.comparison.detail !== "whole" && (
        <details className="evidence-inspection">
          <summary>Inspect the {section.comparison.detail === "surface" ? "surface" : "outline"} detail</summary>
          <div className="inspection-pair">{section.comparison.samples.map(sample => (
            <figure key={sample.assetKey}>
              <div className="detail-window"><FruitAsset assetKey={sample.assetKey} alt={sample.alt} /></div>
              <figcaption>{sample.label}</figcaption>
            </figure>
          ))}</div>
        </details>
      )}
    </div>
  );
  if (!section.assetKey) return null;
  return <figure className="teaching-figure" data-treatment={section.visualTreatment}>
    <div className="evidence-window"><FruitAsset assetKey={section.assetKey} alt={section.assetAlt ?? ""} sizes={photoSizes[section.assetKey]} /></div>
    <figcaption>{section.visualCaption ?? (section.visualTreatment === "pressure" ? "BROAD, GENTLE PALM CONTACT" : "INTACT STEM AREA · ILLUSTRATIVE EXAMPLE")}</figcaption>
  </figure>;
}
