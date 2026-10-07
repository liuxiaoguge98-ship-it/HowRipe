import Link from "next/link";

export function Header() {
  return <header className="border-b border-[var(--color-border)]"><div className="site-container flex min-h-16 items-center justify-between"><Link className="text-sm font-semibold tracking-[0.16em]" href="/">FRUIT PICKING GUIDE</Link><span className="text-xs tracking-[0.12em] text-[var(--color-muted)]">PICK WITH CONFIDENCE</span></div></header>;
}
