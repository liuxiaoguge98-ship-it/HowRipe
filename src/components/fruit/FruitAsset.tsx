import Image from "next/image";
import type { FruitAssetKey, FruitAssetRecord } from "@/lib/fruit-assets";
import { resolveFruitAsset } from "@/lib/fruit-assets";

const ratios = { "1:1": "aspect-square", "4:3": "aspect-[4/3]", "4:5": "aspect-[4/5]", "3:2": "aspect-[3/2]" } as const;
const sizes = { hero: "(max-width: 1023px) 85vw, 40vw", timing: "(max-width: 639px) 46vw, 22vw", education: "(max-width: 1023px) 100vw, 50vw", comparison: "(max-width: 639px) 46vw, 360px", variant: "(max-width: 639px) 45vw, 25vw" } as const;

export function FruitAsset({ assetKey, alt, className = "", sizes: displaySizes, loading = "lazy", fetchPriority }: { assetKey: FruitAssetKey; alt: string; className?: string; sizes?: string; loading?: "eager" | "lazy"; fetchPriority?: "high" | "low" | "auto" }) {
  const asset: FruitAssetRecord = resolveFruitAsset(assetKey);
  return <div className={`relative overflow-hidden bg-[var(--fruit-soft)] ${ratios[asset.aspectRatio]} ${className}`}>
    {/* The display context owns priority: a Hero source may also be Quiz art. */}
    {asset.status === "production" && asset.src ? <Image alt={alt} fill loading={loading} fetchPriority={fetchPriority} sizes={displaySizes ?? sizes[asset.role]} src={asset.src} style={{ objectFit: asset.objectFit, objectPosition: asset.desktopPosition }} /> : <div aria-hidden="true" className="h-full w-full" />}
  </div>;
}
