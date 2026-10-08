import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site-metadata";
import { getLiveFruitGuides, type FruitSlug } from "@/content/fruits";
import styles from "./Home.module.css";

export const metadata = pageMetadata(
  "/",
  "HowRipe — How to Tell If Fruit Is Ripe",
  "Learn when avocados, kiwis, pomegranates, and persimmons are ripe and ready to eat. Choose fruit with practical clues and timing that fits your plans.",
);

const specimens: Record<FruitSlug, { accent: string; wash: string; topics: string; promise: string; guideLabel: string }> = {
  avocado: { accent: "#476f22", wash: "#e9f0d8", topics: "Firmness · Timing · Damage", promise: "Find the gentle give. Pick for when you’ll eat it.", guideLabel: "How to tell if an avocado is ripe" },
  kiwi: { accent: "#526d22", wash: "#edf0d7", topics: "Ripeness · Storage · Timing", promise: "Know when it’s ready. Keep the rest on your schedule.", guideLabel: "How to tell if a kiwi is ripe" },
  pomegranate: { accent: "#9a3048", wash: "#f5e4e5", topics: "Weight · Shape · Skin", promise: "Look beyond the red. Learn what to feel and inspect.", guideLabel: "How to choose a ripe pomegranate" },
  persimmon: { accent: "#a95116", wash: "#f8e6ce", topics: "Fuyu · Hachiya · Ready to eat", promise: "Start with the type. Firm means different things.", guideLabel: "How to tell if a persimmon is ripe" },
};

function Specimen({ slug, hero = false }: { slug: FruitSlug; hero?: boolean }) {
  // Contained 4:5 artwork is height-limited; the transparent canvas is wider.
  const heroSizes = {
    avocado: "(max-width: 639px) 170px, (max-width: 1023px) 237px, 295px",
    kiwi: "(max-width: 639px) 123px, (max-width: 1023px) 172px, 214px",
    pomegranate: "(max-width: 639px) 155px, (max-width: 1023px) 217px, 269px",
    persimmon: "(max-width: 639px) 123px, (max-width: 1023px) 172px, 214px",
  };
  return <Image src={`/fruits/${slug}/hero/hero.webp`} alt="" fill sizes={hero ? heroSizes[slug] : "(max-width: 639px) 196px, (max-width: 1023px) 208px, 248px"} loading={hero ? "eager" : "lazy"} fetchPriority={hero && slug === "avocado" ? "high" : "low"} />;
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
                  <Link className={styles.entryLink} href={`/${slug}`} aria-labelledby={`${slug}-guide`} aria-describedby={`${slug}-promise`}>
                    <div className={styles.entryTop}><span className={styles.number}>0{i + 1}</span><span className={styles.topics}>{specimen.topics}</span><span className={styles.entryArrow} aria-hidden="true">↗</span></div>
                    <h3 className={styles.entryTitle} id={`${slug}-name`}>{name}</h3>
                    <div className={`${styles.mediaWell} ${styles[`${slug}Well`]}`}><Specimen slug={slug} /></div>
                    <div className={styles.entryCopy}><p id={`${slug}-promise`}>{specimen.promise}</p><span className={styles.readGuide} id={`${slug}-guide`}>{specimen.guideLabel} <span aria-hidden="true">→</span></span></div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`site-container ${styles.principles}`} id="ripeness-principles" aria-labelledby="principles-title">
        <div className={styles.principlesIntro}>
          <p className="eyebrow">READ THE RIGHT CLUES</p>
          <h2 id="principles-title">Why ripeness looks different for every fruit</h2>
          <p>There is no single universal sign that tells you every fruit is ripe. A color or texture that helps with one fruit can mean something different in another.</p>
          <p>HowRipe starts with the fruit in front of you, then connects a few useful clues to a practical decision: what to choose, and when to eat it.</p>
        </div>
        <div className={styles.concepts}>
          <article className={styles.concept}>
            <div className={styles.conceptHeading}><span aria-hidden="true">01</span><h3>Firmness</h3></div>
            <p>Firmness can help you judge readiness, but “softer” does not always mean “better.” Hass avocados and green kiwis should have a slight give when ready to eat, while still holding their structure.</p>
            <p>That is a starting point, not a rule for every fruit. Use the <Link href="/avocado">avocado ripeness guide</Link> to understand gentle give, or the <Link href="/kiwi">kiwi readiness guide</Link> to connect the feel with your eating plans.</p>
          </article>
          <article className={styles.concept}>
            <div className={styles.conceptHeading}><span aria-hidden="true">02</span><h3>Color</h3></div>
            <p>Color is supporting evidence. A darker Hass avocado may be further along, but firmness still matters. Pomegranate rind color varies by variety: pale pink and deep red can both be normal.</p>
            <p>An attractive color is a reason to look more closely, not the whole decision. The <Link href="/pomegranate">pomegranate selection guide</Link> brings weight, shape and skin condition together so you can choose beyond the deepest red.</p>
          </article>
          <article className={styles.concept}>
            <div className={styles.conceptHeading}><span aria-hidden="true">03</span><h3>Variety</h3></div>
            <p>Identify the type before borrowing a ripeness rule. Persimmons make this especially clear: a mature Fuyu can be ready while firm and crisp, while an untreated Hachiya needs to become very soft before fresh eating.</p>
            <p>The same firm feel can therefore point to two different decisions. The <Link href="/persimmon">Fuyu and Hachiya persimmon guide</Link> explains which clues belong to each type, so “firm” does not become an automatic reason to eat or reject it.</p>
          </article>
          <article className={styles.concept}>
            <div className={styles.conceptHeading}><span aria-hidden="true">04</span><h3>Timing</h3></div>
            <p>The best fruit for your basket depends on when you will eat it. A ready-to-eat avocado makes sense for today; firmer fruit can be a better fit for later. A whole batch of very soft kiwi gives you less flexibility.</p>
            <p>Think in meals, not just ripeness. Choose some fruit for now and some for later, then use the individual guides for the ripening and storage details that suit each fruit.</p>
          </article>
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
