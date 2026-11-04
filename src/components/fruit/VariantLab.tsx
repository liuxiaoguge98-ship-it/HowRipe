import type { FruitVariantOverview, HeroContent } from "@/content/fruits/types";
import { FruitAsset } from "./FruitAsset";
import styles from "./VariantLab.module.css";

export function VariantHero({ specimens }: { specimens: NonNullable<HeroContent["specimens"]> }) {
  return <div className={styles.heroPair} aria-label="Two types, two ripeness rules">
    {specimens.map((specimen, index) => <figure key={specimen.name}>
      <FruitAsset assetKey={specimen.assetKey} alt={`Whole ${specimen.name} persimmon`} sizes="(max-width: 639px) 168px, 288px" loading="eager" fetchPriority={index === 0 ? "high" : "low"} />
      <figcaption><strong>{specimen.name}</strong><span>{specimen.rule}</span></figcaption>
    </figure>)}
  </div>;
}

/** Both types and both paths stay visible in server-rendered HTML. */
export function VariantLab({ overview, embedded = false }: { overview: FruitVariantOverview; embedded?: boolean }) {
  const Title = embedded ? "h3" : "h2";
  const Name = embedded ? "h4" : "h3";
  return <div className={`${styles.lab} ${embedded ? styles.embedded : ""}`}>
    <section id="variant-lab" data-editorial-section="variant-lab" aria-labelledby="variant-overview-title">
      <p className="eyebrow">VARIANT LAB · TYPE FIRST</p>
      <Title id="variant-overview-title">{overview.title}</Title>
      <p className={styles.intro}>{overview.intro}</p>
      <div className={styles.specimens}>
        {overview.variants.map(variant => <article key={variant.id} id={variant.id}>
          <header><Name>{variant.name}</Name><span>{variant.descriptor}</span></header>
          {variant.assetKey ? <FruitAsset assetKey={variant.assetKey} alt={variant.assetAlt ?? ""} sizes="(max-width: 639px) 136px, 232px" /> : null}
          <p className={styles.rule}>{variant.rule}</p>
          <p>{variant.summary}</p>
          <p className={styles.criteria}>{variant.readyCriteria}</p>
          {variant.targetId ? <a href={variant.targetId}>Check {variant.name} <span aria-hidden="true">↓</span></a> : null}
        </article>)}
      </div>
    </section>
    <section id="ready-paths" className={styles.paths} aria-labelledby="ready-paths-title">
      <p className="eyebrow">{overview.pathEyebrow ?? "MATURE ≠ READY TO EAT"}</p>
      <Title id="ready-paths-title">{overview.pathTitle ?? "Two types. Two paths to ready."}</Title>
      <p className={styles.intro}>{overview.pathIntro ?? "Mature color is a milestone. The variety decides what firmness means."}</p>
      <div className={styles.pathPair}>{overview.variants.map(variant => <article key={variant.id} aria-label={`${variant.name} ready-to-eat path`}>
        <Name>{variant.name}</Name>
        <ol>{variant.path?.map((step, index) => <li key={step.label} data-state={step.state}>
          <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{step.label}</strong><p>{step.description}</p><span className={styles.status}>{step.status ?? (step.state === "ready" ? "READY TO EAT" : step.state === "inspect" ? "INSPECT" : "WAIT")}</span></div>
        </li>)}</ol>
      </article>)}</div>
    </section>
  </div>;
}
