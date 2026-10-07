import type { PickingSection } from "@/content/fruits/types";
import { FruitAsset } from "./FruitAsset";

/** Captions explain evidence in HTML; production photographs remain unmarked. */
export function TeachingEvidence({ section }: { section: PickingSection }) {
  if (section.conditionGuide && section.assetKey) {
    const guide = section.conditionGuide;
    return <div className="condition-guide">
      <div className="condition-pair">
        {[{state: "good", title: "Look for", icon: "✓", key: section.assetKey, alt: section.assetAlt ?? "", text: guide.lookFor},
          {state: "avoid", title: "Avoid", icon: "×", key: guide.avoidAssetKey, alt: guide.avoidAlt, text: guide.avoid}].map(sample => <figure className="condition-check" data-condition={sample.state} key={sample.key}>
          <div className="evidence-window"><FruitAsset assetKey={sample.key} alt={sample.alt} /></div>
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
          <div className="evidence-window"><FruitAsset assetKey={sample.assetKey} alt={sample.alt} /></div>
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
    <div className="evidence-window"><FruitAsset assetKey={section.assetKey} alt={section.assetAlt ?? ""} /></div>
    <figcaption>{section.visualCaption ?? (section.visualTreatment === "pressure" ? "BROAD, GENTLE PALM CONTACT" : "INTACT STEM AREA · ILLUSTRATIVE EXAMPLE")}</figcaption>
  </figure>;
}
