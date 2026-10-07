"use client";

import { useEffect, useRef } from "react";

// Static content stays visible without JavaScript or observer support. Animate
// only on entry, once; never hide offscreen reading content while waiting.
export function MotionEnhancement() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.closest("article");
    if (!root || !window.IntersectionObserver) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!preference.matches) entry.target.classList.add("motion-enter");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05 });
    root.querySelectorAll("[data-section-reveal]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <span ref={marker} hidden aria-hidden="true" />;
}
