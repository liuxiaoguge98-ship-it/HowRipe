import type { TimingGuide } from "@/content/fruits/types";
import { kiwiStorage } from "@/content/fruits/kiwi";
import styles from "./KiwiGuide.module.css";

const actions = [
  { title: "RIPEN OR HOLD", text: "Room temperature to ripen; refrigerator when you want to slow it down." },
  { title: "EAT OR CHILL", text: "Enjoy now, or refrigerate to slow further softening." },
  { title: "CHECK FIRST", text: "Prioritize soon only if still in good condition. Check any mushy or unusually soft area." },
];

export function KiwiRipeness({ guide }: { guide: TimingGuide }) {
  return <section id="feel" className={`${styles.section} ${styles.feel}`} aria-labelledby="kiwi-feel-title">
    <p className="eyebrow">GREEN KIWI · READY TO EAT</p>
    <h2 id="kiwi-feel-title">{guide.title}</h2><p className={styles.intro}>{guide.intro}</p>
    <div className={styles.columns}>{guide.stages.map((stage, i) => <article key={stage.label} data-stage={i}>
      <p className={styles.number}>0{i + 1}</p><h3>{stage.label}</h3><p className={styles.verdict}>{stage.timing}</p>
      <p>{stage.summary}</p><div className={styles.action}><strong>{actions[i].title}</strong><p>{actions[i].text}</p></div>
    </article>)}</div>
  </section>;
}

/** Small, semantic diagrams: storage places, not an inventory UI. */
function StorageSymbol({ mode }: { mode: string }) {
  return <svg viewBox="0 0 100 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    {mode === "slow" ? <><rect x="25" y="5" width="48" height="62" rx="5"/><path d="M25 29h48M34 17v5M34 39v13"/><ellipse cx="52" cy="47" rx="10" ry="7"/></>
      : mode === "normal" ? <><path d="M12 49h76M19 49v17M81 49v17"/><ellipse cx="36" cy="37" rx="12" ry="9"/><ellipse cx="63" cy="37" rx="12" ry="9"/></>
      : <><path d="M18 19h43l6 45H12l6-45ZM18 19l7-12h29l7 12M25 7v12"/><ellipse cx="35" cy="44" rx="11" ry="8"/><path d="M73 39c-9-8-15 1-12 11 3 10 7 15 12 11 5 4 10-2 12-11 3-10-3-19-12-11ZM73 39c-1-8 4-11 7-11"/></>}
  </svg>;
}
function KiwiTokens({ count }: { count: number }) {
  return <div className={styles.tokens} aria-hidden="true">{Array.from({length: count}, (_, i) => <span key={i} />)}</div>;
}

export function KiwiStorageGuide() {
  return <div className={styles.storage}>
    <section id="store" className={styles.section} aria-labelledby="kiwi-store-title">
      <p className="eyebrow">07 · CONTROL THE RIPENING</p><h2 id="kiwi-store-title">Set the pace.</h2>
      <p className={styles.intro}>Firm green kiwi keeps ripening after purchase. Choose where it goes next.</p>
      <div className={`${styles.columns} ${styles.modes}`}>{kiwiStorage.modes.map(mode => <article key={mode.id}>
        <StorageSymbol mode={mode.id} /><p className={styles.verdict}>{mode.title}</p><h3>{mode.place}</h3><p>{mode.text}</p><strong className={styles.cue}>{mode.cue}</strong>
      </article>)}</div>
      <p className={styles.note}>Cold slows ripening; it does not stop it. The time needed depends on starting firmness and storage conditions.</p>
    </section>
    <section id="batch" className={`${styles.section} ${styles.batch}`} aria-labelledby="kiwi-batch-title">
      <p className="eyebrow">08 · TOO MANY RIPE AT ONCE?</p><h2 id="kiwi-batch-title">Don&apos;t ripen the whole box.</h2>
      <p className={styles.intro}>Try 2–3 fruit out. Keep the rest cold.</p>
      <figure className={styles.batchDiagram}>
        <div><span className={styles.verdict}>COUNTER</span><KiwiTokens count={2}/><strong>2–3 to ripen next</strong></div>
        <span className={styles.plus} aria-hidden="true">+</span>
        <div><span className={styles.verdict}>FRIDGE</span><KiwiTokens count={6}/><strong>The rest stay cold</strong></div>
        <figcaption>When the counter fruit is nearly ready: <strong>FRIDGE → COUNTER</strong> · take out the next 2–3.</figcaption>
      </figure>
      <ol className={styles.rescue}>{kiwiStorage.rescue.map((step, i) => <li key={step.title}><span aria-hidden="true">0{i+1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
      <p className={styles.note}>Long-term rescue: freeze prepared, sound ripe fruit. Thawed kiwi is softer.</p>
      <a className={styles.quizLink} href="#quiz">Test your pick and plan <span aria-hidden="true">→</span></a>
    </section>
  </div>;
}
