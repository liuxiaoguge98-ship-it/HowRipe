import Link from "next/link";
import { getLiveFruitGuides } from "@/content/fruits";
import { BrandLink } from "./BrandLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div>
          <BrandLink />
          <p className="footer-description">Practical fruit-picking guidance for the market aisle.</p>
        </div>
        <nav className="footer-guides" aria-label="Fruit guides">
          {getLiveFruitGuides().map((fruit) => <Link href={`/${fruit.slug}`} key={fruit.slug}>{fruit.name}</Link>)}
        </nav>
        <div className="footer-bottom"><span>Pick with confidence.</span><Link href="/#fruit-guides">Find your fruit <span aria-hidden="true">↑</span></Link></div>
      </div>
    </footer>
  );
}
