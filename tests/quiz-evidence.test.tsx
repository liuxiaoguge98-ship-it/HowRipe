// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { avocado } from "../src/content/fruits/avocado";
import { QuizEngine } from "../src/components/quiz/QuizEngine";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it.each([0,1,3])("reveals distinct numeric resistance only after independent checks in Q%s", index => {
 vi.stubGlobal("matchMedia", () => ({ matches: true }));
 const {container}=render(<QuizEngine quiz={{...avocado.quiz,questions:[avocado.quiz.questions[index]]}} presentation="editorial-lab" />);
 expect(container.querySelectorAll('.resistance-value')).toHaveLength(0);
 for(const letter of ['A','B']) fireEvent.click(screen.getByRole('button',{name:`Check firmness Option ${letter}`}));
 expect([...container.querySelectorAll('.resistance-value')].map(e=>e.textContent)).toEqual(index===0?['2 / 4','4 / 4']:index===1?['4 / 4','2 / 4']:['3 / 4','2 / 4']);
 expect(container.querySelector('[data-result]')).toBeNull();
 expect(container.querySelector('#quiz')?.getAttribute('data-game-state')).toBe('ANSWERING');
});
it.each([2,4])("offers equal neutral detail crops from the unchanged production pair in Q%s", index => {
 const question=avocado.quiz.questions[index];
 const {container}=render(<QuizEngine quiz={{...avocado.quiz,questions:[question]}} presentation="editorial-lab" />);
 const options=container.querySelectorAll('.quiz-option');
 for(const [i,option] of [...options].entries()){
  expect(option.getAttribute('aria-label')).toBe(`Choose ${i?'B':'A'}`);
  const detail=option.querySelector('.quiz-detail');expect(detail).not.toBeNull();
  expect(detail?.getAttribute('aria-hidden')).toBe('true');
  const images=option.querySelectorAll('img');expect(images).toHaveLength(2);
  expect(images[0].getAttribute('src')).toBe(images[1].getAttribute('src'));
  expect(images[1].getAttribute('alt')).toBe('');
  expect(option.querySelector('[tabindex]')).toBeNull();
  expect(option.innerHTML).not.toMatch(/avocado\.quiz|very_firm|beginning_to_soften|data-result|data-asset-key/);
  expect(option.textContent).toMatch(/^Option [AB]DetailChoose [AB]/);
 }
 expect(options[0].querySelector('.quiz-specimen')?.getAttribute('data-inspection')).toBe(options[1].querySelector('.quiz-specimen')?.getAttribute('data-inspection'));
 expect(container.querySelectorAll('button')).toHaveLength(2);
});
it.each([0,1,2,3,4])("explains both options only after answering Q%s and keeps the correct side accurate", index => {
 const question=avocado.quiz.questions[index];
 const {container}=render(<QuizEngine quiz={{...avocado.quiz,questions:[question]}} presentation="editorial-lab" />);
 expect(container.querySelectorAll('.option-outcome')).toHaveLength(0);
 for(const reason of Object.values(question.optionExplanations!)) expect(screen.queryByText(reason)).toBeNull();
 fireEvent.click(screen.getByRole('button',{name:`Choose ${question.correctOption==='a'?'B':'A'}`}));
 for(const id of ['a','b'] as const){
  const button=screen.getByRole('button',{name:`Choose ${id.toUpperCase()}`});
  expect(button.getAttribute('data-result')).toBe(id===question.correctOption?'correct':'wrong');
  expect(button.textContent).toContain(question.optionExplanations![id]);
  expect(button).toHaveProperty('disabled',true);
 }
 expect(screen.getByRole('button',{name:'Got it →'})).toBeTruthy();
});
