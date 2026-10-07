import Link from "next/link";
import { pageMetadata } from "@/lib/site-metadata";
import { fruitGuides, hasFruitContent } from "@/content/fruits";

export const metadata = pageMetadata(
  "/",
  "Fruit Picking Guide",
  "Practical guidance for choosing ripe, good-quality fruit.",
);

export default function Home() {
  return <div className="site-container py-16 sm:py-24"><section className="max-w-3xl"><p className="eyebrow">PICK WITH CONFIDENCE</p><h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl">Pick better fruit.<br />Learn it once. Use it forever.</h1><p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--color-ink-soft)]">Practical guides for choosing fruit with signals that make sense for the fruit in front of you.</p></section><section className="mt-16"><p className="eyebrow">FRUIT GUIDES</p><div className="mt-5 grid border-l border-t border-[var(--color-border)] sm:grid-cols-2">{fruitGuides.map((guide) => <article className="border-b border-r border-[var(--color-border)] p-6 sm:p-8" key={guide.slug}><h2 className="font-serif text-3xl tracking-[-0.03em]">{guide.name}</h2>{hasFruitContent(guide.slug) ? <Link className="mt-8 inline-flex text-sm font-semibold underline underline-offset-4" href={`/${guide.slug}`}>Explore guide</Link> : <p className="mt-8 text-sm text-[var(--color-muted)]">Coming soon</p>}</article>)}</div></section><section className="mt-16 max-w-3xl border-t border-[var(--color-border)] pt-10 sm:mt-20"><p className="eyebrow">GENERAL PICKING PRINCIPLES</p><h2 className="mt-4 font-serif text-4xl tracking-[-0.03em]">There is no universal ripeness trick.</h2><p className="mt-5 text-lg leading-8 text-[var(--color-ink-soft)]">Different fruits call for different signals: firmness, weight, skin condition, variety, and when you plan to eat it. Start with the fruit&apos;s own guide instead of relying on a single rule.</p></section></div>;
}
