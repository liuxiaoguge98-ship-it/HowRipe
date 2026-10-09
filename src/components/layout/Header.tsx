import Link from "next/link";
import { BrandLink } from "./BrandLink";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <BrandLink eager />
        <span className="header-note">A little know-how. Better fruit.</span>
        <nav aria-label="Main navigation">
          <Link className="editorial-link" href="/#fruit-guides">Choose a fruit <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
