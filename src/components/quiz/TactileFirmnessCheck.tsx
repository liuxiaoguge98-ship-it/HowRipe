"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { FirmnessLevel } from "@/content/fruits/types";

// Educational UI metaphors, never physical measurements.
const cues = {
  very_firm: { resistance: 4, scaleY: 0.998 },
  beginning_to_soften: { resistance: 3, scaleY: 0.994 },
  ripe: { resistance: 2, scaleY: 0.988 },
} satisfies Record<FirmnessLevel, { resistance: number; scaleY: number }>;

const enhancedCues = {
  very_firm: { scaleY: 0.998, scaleX: 1.001, shadow: 1.02 },
  beginning_to_soften: { scaleY: 0.988, scaleX: 1.004, shadow: 1.09 },
  ripe: { scaleY: 0.978, scaleX: 1.008, shadow: 1.16 },
} satisfies Record<FirmnessLevel, { scaleY: number; scaleX: number; shadow: number }>;

export function TactileFirmnessCheck({ level, optionLabel, disabled, children, description, showPendingResistance = false, enhanced = false }: {
  description?: string;
  showPendingResistance?: boolean;
  enhanced?: boolean;
  level: FirmnessLevel;
  optionLabel: string;
  disabled: boolean;
  children: ReactNode;
}) {
  const [checked, setChecked] = useState(false);
  const visual = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const shadow = useRef<HTMLSpanElement>(null);
  const shadowAnimation = useRef<Animation | null>(null);
  const cue = cues[level];
  const motion = enhancedCues[level];

  useEffect(() => {
    if (disabled) { animation.current?.cancel(); shadowAnimation.current?.cancel(); }
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const stop = () => { if (preference?.matches) { animation.current?.cancel(); shadowAnimation.current?.cancel(); } };
    preference?.addEventListener?.("change", stop);
    return () => {
      animation.current?.cancel();
      shadowAnimation.current?.cancel();
      preference?.removeEventListener?.("change", stop);
    };
  }, [disabled]);

  function check() {
    if (disabled) return;
    setChecked(true);
    animation.current?.cancel();
    shadowAnimation.current?.cancel();
    if (!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      animation.current = visual.current?.animate?.([
        { transform: "scaleY(1)" },
        { transform: enhanced ? `scale(${motion.scaleX}, ${motion.scaleY})` : `scaleY(${cue.scaleY})`, offset: 0.45 },
        { transform: "scaleY(1)" },
      ], { duration: enhanced ? 640 : 420, easing: "cubic-bezier(.2,.65,.3,1)" }) ?? null;
      if (enhanced) shadowAnimation.current = shadow.current?.animate?.([
        { transform: "scaleX(1)", opacity: 0.12 },
        { transform: `scaleX(${motion.shadow})`, opacity: 0.24, offset: 0.45 },
        { transform: "scaleX(1)", opacity: 0.12 },
      ], { duration: 640, easing: "cubic-bezier(.2,.65,.3,1)" }) ?? null;
    }
  }

  return <>
    {enhanced ? <div className="tactile-visual tactile-enhanced"><div ref={visual} className="tactile-fruit">{children}</div><span ref={shadow} className="tactile-contact" aria-hidden="true" /></div> : <div ref={visual} className="tactile-visual">{children}</div>}
    <button type="button" className="firmness-check" aria-label={`Check firmness ${optionLabel}`} disabled={disabled} onClick={check} data-checked={enhanced && checked ? "true" : undefined}>{enhanced ? <span className="firmness-step" aria-hidden="true">{checked ? "✓" : "1"}</span> : null}<span>Check firmness</span>{enhanced ? <span className="firmness-action" aria-hidden="true">{checked ? "↻" : "↓"}</span> : null}</button>
    <div className="resistance-slot" aria-live="polite" aria-atomic="true">
      {checked && description ? <span className="touch-description"><span className="sr-only">{optionLabel}: </span>{description}</span> : checked ? <span>
        <span className="sr-only">{optionLabel}: Resistance level {cue.resistance} of 4</span>
        <span aria-hidden="true">Resistance <span className="resistance-dots">{"●".repeat(cue.resistance)}{"○".repeat(4 - cue.resistance)}</span>{enhanced ? <span className="resistance-value">{cue.resistance} / 4</span> : null}</span>
      </span> : showPendingResistance ? <span aria-hidden="true">{description ? "Check the feel" : "Resistance"} <span className="resistance-dots">—</span></span> : null}
    </div>
  </>;
}
