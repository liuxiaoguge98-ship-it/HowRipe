import type { PickingSection } from "@/content/fruits/types";
import { TactileFirmnessCheck } from "@/components/quiz/TactileFirmnessCheck";
import { FruitAsset } from "./FruitAsset";
import { SpecimenMarker } from "./SpecimenMarker";
import { VariantLab } from "./VariantLab";
import styles from "./TeachingLab.module.css";

/** Static evidence remains readable before enhancement; controls add a tactile metaphor. */
export function TeachingLab({ section }: { section: PickingSection }) {
  if (section.typeComparison) return <div className={styles.lab}><VariantLab overview={section.typeComparison} embedded /></div>;
  if (section.pressureLocation) {
    const guide = section.pressureLocation;
    return <div className={`${styles.lab} ${styles.locations}`}>{guide.samples.map(sample => <figure key={sample.label}>
      <div className={styles.specimen}><FruitAsset assetKey={guide.assetKey} alt={guide.alt} sizes="(max-width: 639px) calc((100vw - 96px) / 2), 230px" /><SpecimenMarker point={sample.marker} /></div>
      <figcaption><h3>{sample.label}</h3><p>{sample.summary}</p></figcaption>
    </figure>)}</div>;
  }
  if (section.pressureCheck) {
    const guide = section.pressureCheck;
    return <div className={styles.lab}>
      {section.assetKey ? <figure className={styles.hand}><FruitAsset assetKey={section.assetKey} alt={section.assetAlt ?? ""} sizes="(max-width: 639px) calc(100vw - 80px), 600px" /><figcaption>{section.visualCaption}</figcaption></figure> : null}
      <p className={styles.instruction}>{guide.instruction}</p>
      <div className={styles.feels}>{guide.states.map(state => <article key={state.label}>
        <h3>{state.label}</h3>
        <TactileFirmnessCheck level={state.level} placement={state.placement ?? guide.placement} actionLabel="Try gentle pressure" description={state.description} optionLabel={state.label} disabled={false}>
          <FruitAsset assetKey={guide.assetKey} alt={guide.alt} sizes="(max-width: 639px) 180px, 220px" />
        </TactileFirmnessCheck>
        <p className={styles.result}>{state.result}</p>
        <p>{state.description}</p>
      </article>)}</div>
    </div>;
  }
  if (section.varietyCues) return <div className={styles.lab}>
    <div className={styles.varieties}>{section.varietyCues.map(cue => <article key={cue.name}>
      <h3>{cue.name}</h3>{cue.assetKey ? <FruitAsset assetKey={cue.assetKey} alt={cue.assetAlt ?? ""} sizes="(max-width: 639px) calc(100vw - 80px), 460px" /> : null}
      <strong>{cue.rule}</strong><p>{cue.summary}</p>
    </article>)}</div>
    <div className={styles.reference}><p className="eyebrow">AT A GLANCE</p><dl>{section.varietyCues.map(cue => <div key={cue.name}><dt>{cue.name}</dt><dd>{cue.check}</dd></div>)}</dl></div>
  </div>;
  return null;
}
