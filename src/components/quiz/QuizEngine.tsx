"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { FruitContent, QuizConfig } from "@/content/fruits/types";
import { FruitAsset } from "@/components/fruit/FruitAsset";
import { TactileFirmnessCheck } from "./TactileFirmnessCheck";

type State = "ANSWERING" | "CORRECT_FEEDBACK" | "WRONG_FEEDBACK" | "COMPLETED";

export function QuizEngine({ quiz, presentation }: { quiz: QuizConfig; presentation?: FruitContent["presentation"] }) {
  const editorial = presentation === "editorial-lab";
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<State>(quiz.questions.length ? "ANSWERING" : "COMPLETED");
  const [selected, setSelected] = useState<"a" | "b" | null>(null);
  const advancing = useRef(false);
  const stage = useRef<HTMLElement>(null);
  const question = quiz.questions[index];
  const game = quiz.stage === "compact-game";

  function advance() {
    if (advancing.current) return;
    advancing.current = true;
    const update = () => {
      const restoreFocus = stage.current?.contains(document.activeElement);
      flushSync(() => {
        setSelected(null);
        if (index + 1 === quiz.questions.length) setState("COMPLETED");
        else { setIndex(index + 1); setState("ANSWERING"); }
      });
      if (restoreFocus) stage.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
      advancing.current = false;
    };
    // Snapshot only this stage, never duplicate interactive DOM.
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const transition = document.startViewTransition(update);
      void transition.finished.catch(() => {});
    } else update();
  }

  useEffect(() => {
    if (state !== "CORRECT_FEEDBACK" || !question.autoAdvanceOnCorrect) return;
    const timer = window.setTimeout(advance, 1000);
    return () => window.clearTimeout(timer);
    // The callback consumes the current question and state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, index, quiz.questions.length, question?.autoAdvanceOnCorrect]);

  if (state === "COMPLETED") return (
    <section ref={stage} id="quiz" className="quiz-stage" data-game-stage={game || undefined} data-game-state={state} aria-label={quiz.title}>
      <div className="motion-completion">
        <h2>{quiz.completion?.title ?? "Complete"}</h2>
        {game && quiz.completion?.summary ? <p className="game-completion-summary">{quiz.completion.summary}</p> : null}
        {game && quiz.completion?.takeaways ? <dl className="game-takeaways">{quiz.completion.takeaways.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.text}</dd></div>)}</dl> : null}
        <button onClick={() => { setIndex(0); setSelected(null); setState("ANSWERING"); }}>Restart</button>
        {game ? <a className="game-continue" href="#nutrition">Continue ↓</a> : null}
      </div>
    </section>
  );

  const choose = (id: "a" | "b") => {
    if (state !== "ANSWERING" || advancing.current) return;
    setSelected(id);
    setState(id === question.correctOption ? "CORRECT_FEEDBACK" : "WRONG_FEEDBACK");
  };
  const message = state === "CORRECT_FEEDBACK" ? question.correctFeedback : state === "WRONG_FEEDBACK" ? question.incorrectFeedback : null;

  const revealed = game && editorial && state !== "ANSWERING";
  const resultFor = (id: "a" | "b") => revealed ? (id === question.correctOption ? "correct" : "wrong") : selected === id ? (state === "CORRECT_FEEDBACK" ? "correct" : "wrong") : undefined;
  const decision = (id: "a" | "b") => revealed ? <span className="option-outcome">
    <span className="outcome-icon" aria-hidden="true">{id === question.correctOption ? "✓" : "×"}</span>
    <span><strong>{question.intent === "avoid-buying" ? `${id.toUpperCase()}: ${id === question.correctOption ? "Correct — do not buy" : "Not the fruit to avoid"}` : `${id.toUpperCase()} is ${id === question.correctOption ? "correct" : "not correct"}`}</strong><span id={`${question.id}-${id}-reason`} className="outcome-reason">{question.optionExplanations?.[id]}</span></span>
  </span> : <>{editorial ? "Choose" : "Option"} {id.toUpperCase()}{editorial ? <span aria-hidden="true"> ↗</span> : null}</>;
  const sampleLabel = (id: "a" | "b") => <span className="sample-label" aria-hidden="true"><span className="sample-label-prefix">Option </span>{id.toUpperCase()}</span>;

  const heading = <><h2>{question.question}</h2>{question.helperText ? <p>{question.helperText}</p> : null}</>;

  return (
    <section ref={stage} id="quiz" className="quiz-stage" data-game-stage={game || undefined} data-game-state={state} data-evidence={question.options.every(option => option.text !== undefined) ? (question.options.some(option => option.illustrations?.length) ? "illustrated" : "text") : "visual"} aria-label={quiz.title}>
      <div key={question.id} className="motion-question">
        <div className="quiz-heading"><p>{quiz.title}</p>
        <p><span className={game && editorial ? "question-number" : undefined}>{String(index + 1).padStart(2, "0")} / {String(quiz.questions.length).padStart(2, "0")}</span></p></div>
        {game ? <div className="game-question">{heading}</div> : heading}
        <div className="quiz-samples grid max-w-[45.75rem] grid-cols-2 gap-3 sm:gap-6">{question.options.map((option) => option.text !== undefined ? (
          <button type="button" key={option.id} className="quiz-option quiz-text-option text-left"
            data-result={resultFor(option.id)} aria-label={editorial ? `Choose ${option.id.toUpperCase()}` : undefined}
            aria-describedby={editorial ? `${question.id}-${option.id}-text${revealed ? ` ${question.id}-${option.id}-reason` : ""}` : undefined}
            disabled={state !== "ANSWERING"} onClick={() => choose(option.id)}>
            {editorial ? sampleLabel(option.id) : <span aria-hidden="true" className="mb-3 block text-xs uppercase tracking-widest">Option {option.id.toUpperCase()}</span>}
            {option.illustrations ? <span className="quiz-illustrations" data-count={option.illustrations.length} aria-hidden="true">{option.illustrations.map(key => <FruitAsset key={key} assetKey={key} alt="" sizes={option.illustrations!.length > 1 ? "(max-width: 639px) calc((100vw - 70px) / 4), 180px" : "(max-width: 639px) calc((100vw - 64px) / 2), 360px"} />)}</span> : null}
            <span id={`${question.id}-${option.id}-text`}>{option.text}</span>
            {game && editorial ? <span className="sample-decision">{decision(option.id)}</span> : null}
          </button>
        ) : option.tactile ? (
          <div key={option.id} role="group" aria-label={option.accessibilityLabel} className="quiz-sample min-w-0" data-result={resultFor(option.id)}>
            {editorial ? sampleLabel(option.id) : null}
            <TactileFirmnessCheck enhanced={game && editorial} showPendingResistance={editorial} level={option.tactile.level} description={option.tactile.description} optionLabel={option.accessibilityLabel} disabled={state !== "ANSWERING"}>
              <FruitAsset assetKey={option.assetKey} alt="" />
            </TactileFirmnessCheck>
            <button type="button" className="quiz-option tactile-answer text-left" aria-label={editorial ? `Choose ${option.id.toUpperCase()}` : option.accessibilityLabel} disabled={state !== "ANSWERING"}
              data-result={resultFor(option.id)}
              aria-describedby={revealed ? `${question.id}-${option.id}-reason` : undefined}
              onClick={() => choose(option.id)}>{decision(option.id)}</button>
          </div>
        ) : (
          <button
            className="quiz-option text-left"
            data-result={resultFor(option.id)}
            aria-label={editorial ? `Choose ${option.id.toUpperCase()}` : option.accessibilityLabel}
            aria-describedby={revealed ? `${question.id}-${option.id}-reason` : undefined}
            disabled={state !== "ANSWERING"}
            key={option.id}
            onClick={() => choose(option.id)}
          >{editorial ? sampleLabel(option.id) : null}{game && editorial && question.inspection ? <div className="quiz-specimen" data-inspection={question.inspection}>
              <FruitAsset assetKey={option.assetKey} alt="" className="specimen-whole" />
              {question.inspection !== "whole" ? <><svg className="detail-arrow" viewBox="0 0 100 70" aria-hidden="true"><path d="M8 60 Q25 16 79 19 M64 5 L83 19 L68 36" /></svg><span className="quiz-detail" aria-hidden="true"><span className="quiz-detail-window"><FruitAsset assetKey={option.assetKey} alt="" /></span><span className="quiz-detail-caption">Detail</span></span></> : null}
            </div> : <FruitAsset assetKey={option.assetKey} alt="" className="mb-3" />}<span className="sample-decision">{decision(option.id)}</span></button>
        ))}</div>
        <div className="quiz-feedback" aria-live="polite" data-feedback={state === "WRONG_FEEDBACK" ? "wrong" : undefined}>{message ? (
          <div className="motion-feedback">
            <p className="feedback-result">{state === "CORRECT_FEEDBACK" ? "Correct" : "Not quite"}</p>
            <p className="feedback-explanation">{message}</p>
            <p className="feedback-principle">{question.learningPoint}</p>
            {state === "WRONG_FEEDBACK" || !question.autoAdvanceOnCorrect ? <button onClick={advance}>Got it →</button> : null}
          </div>
        ) : game ? <div className="game-feedback-idle"><p>{question.options.some(option => option.tactile) ? "CHECK FIRST" : "MAKE YOUR PICK"}</p><p>{question.options.some(option => option.tactile) ? question.tactileInstruction ?? "Check firmness on both fruits first. More Resistance means firmer. Then choose for your timing." : quiz.intro ?? "Compare the samples, then choose A or B."}</p></div> : null}</div>
      </div>
    </section>
  );
}
