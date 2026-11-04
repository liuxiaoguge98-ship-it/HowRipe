import type { CSSProperties, Ref } from "react";
import type { EvidenceMarker } from "@/content/fruits/types";
import styles from "./TeachingLab.module.css";

/** The same neutral contact marker is used in teaching and either quiz choice. */
export function SpecimenMarker({ point, markerRef }: { point: EvidenceMarker; markerRef?: Ref<HTMLSpanElement> }) {
  return <span ref={markerRef} aria-hidden="true" className={styles.marker} style={{ left: `${point.x}%`, top: `${point.y}%` } as CSSProperties}><span /></span>;
}
