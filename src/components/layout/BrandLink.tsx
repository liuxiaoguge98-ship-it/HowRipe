import Image from "next/image";
import Link from "next/link";

export function BrandLink({ eager = false }: { eager?: boolean }) {
  return (
    <Link className="site-wordmark" href="/" aria-label="HowRipe home">
      <Image
        className="site-brand-mark"
        src="/brand/howripe-mark.svg"
        width={32}
        height={36}
        alt=""
        aria-hidden="true"
        loading={eager ? "eager" : "lazy"}
        fetchPriority="low"
        unoptimized
      />
      <span>HowRipe</span>
    </Link>
  );
}
