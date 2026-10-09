import Image from "next/image";
import Link from "next/link";

export function BrandLink({ eager = false }: { eager?: boolean }) {
  return (
    <Link className="site-wordmark" href="/" aria-label="HowRipe home">
      <Image
        className="site-brand-mark"
        src="/brand/howripe-mark.svg"
        width={30}
        height={30}
        alt=""
        aria-hidden="true"
        loading={eager ? "eager" : "lazy"}
        fetchPriority="low"
        unoptimized
      />
      <span>HowR<span className="site-wordmark-i">i</span>pe</span>
    </Link>
  );
}
