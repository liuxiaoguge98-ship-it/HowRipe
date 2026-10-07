import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site-metadata";
import { getLiveFruitGuides, type FruitSlug } from "@/content/fruits";
import styles from "./Home.module.css";

export const metadata = pageMetadata(
  "/",
  "HowRipe — How to Pick Ripe Fruit",
  "Learn how to pick ripe fruit, tell when it is ready to eat, and plan ripening and storage. Explore practical avocado, kiwi, pomegranate and persimmon guides.",
);

const specimens: Record<FruitSlug, { accent: string; wash: string; topics: string; promise: string }> = {
  avocado: { accent: "#476f22", wash: "#e9f0d8", topics: "Firmness · Timing · Damage", promise: "Find the gentle give. Pick for when you’ll eat it." },
  kiwi: { accent: "#526d22", wash: "#edf0d7", topics: "Ripeness · Storage · Timing", promise: "Know when it’s ready. Keep the rest on your schedule." },
  pomegranate: { accent: "#9a3048", wash: "#f5e4e5", topics: "Weight · Shape · Skin", promise: "Look beyond the red. Learn what to feel and inspect." },
  persimmon: { accent: "#a95116", wash: "#f8e6ce", topics: "Fuyu · Hachiya · Ready to eat", promise: "Start with the type. Firm means different things." },
};

function Specimen({ slug, hero = false }: { slug: FruitSlug; hero?: boolean }) {
  return <Image src={`/fruits/${slug}/hero/hero.webp`} alt="" fill sizes={hero ? "(max-width: 639px) 50vw, (max-width: 1023px) 27vw, 310px" : "(max-width: 639px) 75vw, 440px"} preload={hero && slug === "avocado"} loading={hero ? "eager" : "lazy"} />;
}

export default function Home() {
  const fruits = getLiveFruitGuides();
  return (
    <div className={styles.home}>
      <section className={`site-container ${styles.hero}`} aria-labelledby="home-title">
        <div className="motion-hero-text">
          <p className="eyebrow">A FIELD GUIDE TO RIPE FRUIT</p>
          <h1 id="home-title">Pick better<br /><span>fruit.</span></h1>
          <p className={styles.intro}>Know what’s ripe, when to eat it, and how to keep it at its best.</p>
          <a className={`editorial-link ${styles.heroLink}`} href="#fruit-guides">Find your fruit <span aria-hidden="true">↓</span></a>
        </div>
        <div className={`${styles.stillLife} motion-hero-asset`} aria-hidden="true">
          {fruits.map(({ slug }) => <div className={`${styles.specimen} ${styles[slug]}`} key={slug}><Specimen slug={slug} hero /></div>)}
          <span className={styles.stillLifeCaption}>Different fruit. Different clues.</span>
        </div>
      </section>

      <section className={styles.index} id="fruit-guides" aria-labelledby="index-title">
        <div className="site-container">
          <div className={styles.indexHeading}>
            <div><p className="eyebrow">THE FRUIT INDEX</p><h2 id="index-title">Choose a fruit.</h2></div>
            <p>A few good clues.<br /> A better choice at the market.</p>
          </div>
          <div className={styles.entries}>
            {fruits.map(({ slug, name }, i) => {
              const specimen = specimens[slug];
              return (
                <article className={styles.entry} key={slug} style={{ "--entry-accent": specimen.accent, "--entry-wash": specimen.wash } as CSSProperties}>
                  <Link className={styles.entryLink} href={`/${slug}`} aria-labelledby={`${slug}-name`} aria-describedby={`${slug}-promise`}>
                    <div className={styles.entryTop}><span className={styles.number}>0{i + 1}</span><span className={styles.topics}>{specimen.topics}</span><span className={styles.entryArrow} aria-hidden="true">↗</span></div>
                    <h3 className={styles.entryTitle} id={`${slug}-name`}>{name}</h3>
                    <div className={`${styles.mediaWell} ${styles[`${slug}Well`]}`}><Specimen slug={slug} /></div>
                    <div className={styles.entryCopy}><p id={`${slug}-promise`}>{specimen.promise}</p><span className={styles.readGuide}>Explore guide <span aria-hidden="true">→</span></span></div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`site-container ${styles.closing}`} aria-labelledby="closing-title">
        <p className="eyebrow">A LITTLE KNOW-HOW GOES A LONG WAY</p>
        <h2 id="closing-title">No universal trick.<br />Just the right clues.</h2>
        <p>Firmness, weight, skin, variety. Every fruit tells a different story. Learn what matters for the one in your hand.</p>
        <a className="editorial-link" href="#fruit-guides">Choose your guide <span aria-hidden="true">↑</span></a>
      </section>
    </div>
  );
}
