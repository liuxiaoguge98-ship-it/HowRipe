import type { FruitVariantOverview, HeroContent } from "@/content/fruits/types";
import { FruitAsset } from "./FruitAsset";
import styles from "./VariantLab.module.css";

export function VariantHero({ specimens }: { specimens: NonNullable<HeroContent["specimens"]> }) {
  return <div className={styles.heroPair} aria-label="Two types, two ripeness rules">
    {specimens.map(specimen => <figure key={specimen.name}>
      <FruitAsset assetKey={specimen.assetKey} alt={`Whole ${specimen.name} persimmon`} />
      <figcaption><strong>{specimen.name}</strong><span>{specimen.rule}</span></figcaption>
    </figure>)}
  </div>;
}

/** Both types and both paths stay visible in server-rendered HTML. */
export function VariantLab({ overview }: { overview: FruitVariantOverview }) {
  return <div className={styles.lab}>
    <section id="variant-lab" data-editorial-section="variant-lab" aria-labelledby="variant-overview-title">
      <p className="eyebrow">VARIANT LAB · TYPE FIRST</p>
      <h2 id="variant-overview-title">{overview.title}</h2>
      <p className={styles.intro}>{overview.intro}</p>
      <div className={styles.specimens}>
        {overview.variants.map(variant => <article key={variant.id} id={variant.id}>
          <header><h3>{variant.name}</h3><span>{variant.descriptor}</span></header>
          {variant.assetKey ? <FruitAsset assetKey={variant.assetKey} alt={variant.assetAlt ?? ""} /> : null}
          <p className={styles.rule}>{variant.rule}</p>
          <p>{variant.summary}</p>
          <p className={styles.criteria}>{variant.readyCriteria}</p>
          {variant.targetId ? <a href={variant.targetId}>Check {variant.name} <span aria-hidden="true">↓</span></a> : null}
        </article>)}
      </div>
    </section>
    <section id="ready-paths" className={styles.paths} aria-labelledby="ready-paths-title">
      <p className="eyebrow">MATURE ≠ READY TO EAT</p>
      <h2 id="ready-paths-title">Two types. Two paths to ready.</h2>
      <p className={styles.intro}>Mature color is a milestone. The variety decides what firmness means.</p>
      <div className={styles.pathPair}>{overview.variants.map(variant => <article key={variant.id} aria-label={`${variant.name} ready-to-eat path`}>
        <h3>{variant.name}</h3>
        <ol>{variant.path?.map((step, index) => <li key={step.label} data-state={step.state}>
          <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{step.label}</strong><p>{step.description}</p><span className={styles.status}>{step.state === "ready" ? "READY TO EAT" : "WAIT"}</span></div>
        </li>)}</ol>
      </article>)}</div>
    </section>
  </div>;
}
