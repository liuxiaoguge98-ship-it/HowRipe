// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { QuizEngine } from "../src/components/quiz/QuizEngine";
import { avocado } from "../src/content/fruits/avocado";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
const config = { ...avocado.quiz, stage: "compact-game" as const };
function wheel(element: Element, init = {}) {
 const event = new WheelEvent("wheel", { bubbles:true, cancelable:true, deltaY:120, ...init });
 element.dispatchEvent(event);return event.defaultPrevented;
}
it("allows native wheel and touch throughout an active game and after unmount", () => {
 let fine = true;vi.stubGlobal("matchMedia", () => ({get matches(){return fine}}));
 const {container,unmount}=render(<QuizEngine quiz={config} presentation="editorial-lab" />);
 const stage=container.querySelector('#quiz')!;
 expect(wheel(stage)).toBe(false);expect(wheel(document.body)).toBe(false);
 for(const element of stage.querySelectorAll('img, button, .resistance-slot, .quiz-feedback')) expect(wheel(element)).toBe(false);
 fireEvent.click(screen.getByRole('button',{name:'Choose B'}));
 expect(wheel(screen.getByRole('button',{name:'Got it →'}))).toBe(false);
 expect(wheel(stage.querySelector('.motion-feedback')!)).toBe(false);
 expect(wheel(stage,{ctrlKey:true})).toBe(false);expect(wheel(stage,{deltaY:0,deltaX:120})).toBe(false);
 fine=false;expect(wheel(stage)).toBe(false);
 const touch=new Event('touchmove',{bubbles:true,cancelable:true});stage.dispatchEvent(touch);expect(touch.defaultPrevented).toBe(false);
 fine=true;unmount();expect(wheel(stage)).toBe(false);
});
it("retains default document scrolling for other quiz configurations", () => {
 vi.stubGlobal("matchMedia", () => ({matches:true}));
 const {container}=render(<QuizEngine quiz={{...avocado.quiz,stage:undefined}} />);
 expect(wheel(container.querySelector('#quiz')!)).toBe(false);
});
it("keeps one live feedback footer from neutral through wrong and correct answers", () => {
 vi.useFakeTimers();vi.stubGlobal("matchMedia", () => ({matches:true}));
 const {container}=render(<QuizEngine quiz={config} presentation="editorial-lab" />);
 const footer=container.querySelector('.quiz-feedback')!;
 expect(footer.getAttribute('aria-live')).toBe('polite');
 expect(footer.textContent).toContain('CHECK FIRST');
 expect(footer.textContent).not.toContain(config.questions[0].learningPoint);
 fireEvent.click(screen.getByRole('button',{name:'Choose B'}));
 expect(container.querySelector('.quiz-feedback')).toBe(footer);
 expect(footer.textContent).toContain(config.questions[0].incorrectFeedback);
 expect(footer.textContent).toContain(config.questions[0].learningPoint);
 expect(footer.contains(screen.getByRole('button',{name:'Got it →'}))).toBe(true);
 fireEvent.click(screen.getByRole('button',{name:'Got it →'}));
 const nextFooter=container.querySelector('.quiz-feedback')!;
 fireEvent.click(screen.getByRole('button',{name:'Choose B'}));
 expect(container.querySelector('.quiz-feedback')).toBe(nextFooter);
 expect(nextFooter.textContent).toContain(config.questions[1].correctFeedback);
 expect(screen.getByRole('button',{name:'Got it →'})).toBeTruthy();
});
it("Got it restores focus without scrolling; completion and Restart keep native scrolling", () => {
 vi.useFakeTimers();vi.stubGlobal("matchMedia", () => ({matches:true}));
 const focus=vi.spyOn(HTMLElement.prototype,'focus');const scroll=vi.fn();vi.stubGlobal('scrollTo',scroll);
 const quiz={...config,questions:[avocado.quiz.questions[0]]};const {container}=render(<QuizEngine quiz={quiz} presentation="editorial-lab" />);
 fireEvent.click(screen.getByRole('button',{name:'Choose B'}));const got=screen.getByRole('button',{name:'Got it →'});got.focus();focus.mockClear();fireEvent.click(got);
 expect(focus).toHaveBeenCalledWith({preventScroll:true});expect(scroll).not.toHaveBeenCalled();
 expect(wheel(container.querySelector('#quiz')!)).toBe(false);
 expect(screen.getByRole('link',{name:/Continue/}).getAttribute('href')).toBe('#nutrition');
 fireEvent.click(screen.getByRole('button',{name:'Restart'}));expect(wheel(container.querySelector('#quiz')!)).toBe(false);
 expect(container.querySelector('[data-result]')).toBeNull();expect(screen.queryByText(/Resistance level/)).toBeNull();
 fireEvent.click(screen.getByRole('button',{name:'Choose A'}));act(()=>vi.advanceTimersByTime(1000));fireEvent.click(screen.getByRole('button',{name:'Got it →'}));expect(wheel(container.querySelector('#quiz')!)).toBe(false);
});

it.each(['A', 'B'])("requires acknowledgement after choosing %s, including the final question and Restart", answer => {
 vi.useFakeTimers();vi.stubGlobal('matchMedia',()=>({matches:true}));
 render(<QuizEngine quiz={{...config,questions:[config.questions[0]]}} presentation="editorial-lab" />);
 fireEvent.click(screen.getByRole('button',{name:`Choose ${answer}`}));
 const got=screen.getByRole('button',{name:'Got it →'});
 act(()=>vi.advanceTimersByTime(10000));
 expect(screen.getByText('01 / 01')).toBeTruthy();
 expect(screen.queryByRole('button',{name:'Restart'})).toBeNull();
 expect(screen.getByRole('button',{name:'Choose A'})).toHaveProperty('disabled',true);
 fireEvent.click(got);
 expect(screen.getByRole('button',{name:'Restart'})).toBeTruthy();
 fireEvent.click(screen.getByRole('button',{name:'Restart'}));
 expect(screen.queryByRole('button',{name:'Got it →'})).toBeNull();
 expect(screen.getByRole('button',{name:'Choose A'})).toHaveProperty('disabled',false);
});
