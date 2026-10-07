# UI-01D — PASS, ready for user visual approval

## Scope and provenance

- Worktree: `<historical-worktree>`
- Branch: `feature/ui-01d-avocado-evidence-clarity`
- Implementation commit: `7c1de07` (`fix(avocado): restore page scrolling and clarify quiz evidence`).
- Baseline: UI-01C `baf89cec32b29548fea772de4f254e0c38ec1ba8`, clean before branching.
- Local production preview: `http://localhost:3107/avocado`.
- Only Avocado presentation changed. No UI-02, deployment, merge, source image changes, answer changes or new dependencies.

## Scrolling

Desktop wheel isolation is **REVOKED**. `useGameStageWheel.ts`, its invocation and the “Scroll beside the stage” hint were removed. `stage: "compact-game"` describes visual independence only. No Quiz wheel listener, preventDefault, body lock or internal scrollbar exists.

Chrome 154.0.8037.58 production browser tests: pointer over A/B images, Check firmness, Resistance, Choose A/B, empty header surface, feedback and Got it each allowed **230px document scrolling**. Outside and completion also passed. Desktop reduced-motion keyboard run observed 220px wheel scroll. Tab leaves the stage and PageDown scrolls normally.

Chrome mobile emulated touch swipes from image/check/Resistance/answer/feedback moved the document 165/285/301/303/295px respectively. This is real browser touch-event emulation, not physical-device certification.

## Evidence

See [before/after audit and ratings](EVIDENCE_AUDIT.md).

| Firmness (internal only) | scaleY | scaleX | Contact shadow width | Visible checked Resistance |
|---|---:|---:|---:|---|
| Very firm | .998 | 1.001 | 1.02× | ●●●● 4 / 4 |
| Beginning to soften | .988 | 1.004 | 1.09× | ●●●○ 3 / 4 |
| Ripe | .978 | 1.008 | 1.16× | ●●○○ 2 / 4 |

640ms gentle return, no bounce. Only fruit layer compresses; surface stays still. Neutral contact shadow changes opacity .12→.24→.12. Other fruits keep previous tactile values and 420ms duration. Checking never selects an answer. Values are hidden initially, reset on progression/Restart, announced once in the existing live slot. Reduced motion cancels both animations, including a live preference change, while numbers stay available.

Q03/Q05 use original production pairs with equal always-visible CSS circular crops. Both use a source plane 3.6× the lens diameter (approximately 284px source patch); Q03 center `(360,700)`, Q05 `(325,690)` in 1024px sources. Lens diameter 116px desktop / 82px phone. Q03 emphasizes the surface; Q05 includes the silhouette. Neutral “Detail” label, no extra focus stop or hover requirement. Same resolution, framing, lighting, background and crop treatment across A/B. Original production bytes and asset contracts unchanged.

One near-white paired specimen well integrates white image margins; no destructive blending/recoloring. Main images remain comparable and compact; desktop well reduced 230→220px to reserve space for larger indicators and keep 626px stage height. Close-up detail adds usable evidence without enlarging the entire board.

## Layout and flow

| Width | Viewport height | Native stage height, all Q + completion | Document overflow | Translation wrong state |
|---|---:|---:|---|---:|
| 1440 | 900 | 626 | 0px | 657.67px |
| 1024 | 900 | 626 | 0px | 657.67px |
| 768 | 900 | 678 | 0px | 678px |
| 390 | 844 | 720 | 0px | 751.66px |
| 360 | 844 | 720 | 0px | 751.66px |

Native wrong feedback does not change stage height. 25 Got it transitions preserve document scrollY, stage top and height, including completion. At desktop top alignment 70px the entire stage and Got it fit 900px. Layout minima grow for text rather than clip it. Bilingual fixture preserves subordinate Chinese type, compact paired button labels and one educational footer. No factual copy was shortened.

Keyboard Check/Choose/Got it/Restart, visible focus, neutral option names, persistent live feedback, reduced motion and native Continue anchor passed. Crop adds no keyboard stop. All five wrong/manual flows and correct/automatic flows passed at five widths. Other three fruits completed smoke flows without presentation changes, errors or overflow. Static teaching and native disclosure still work without JS.

## Screenshots and executable checks

- `first-pass/`: first pass (28 screenshots), captures initial clipped-lens issue and inconsistent heights.
- `second-pass/`: corrected lenses and stable native stage (28 screenshots).
- `final/`: production screenshots for every question at 1440/390, initial, checked if tactile, wrong feedback, completion; six actual WAAPI pressure-peak captures. Pressure captures pause actual animations only for evidence, not production behavior.
- `translated-*.png`: controlled bilingual stress at all five widths.
- `browser-results.json`: wheel/touch origins, native heights, all 25 Got it transitions and other fruit smoke.
- `translation-results.json`, `keyboard-results.json`, `motion-results.json`: focused results.
- `qa.mjs`, `capture.mjs`, `translation-check.mjs`, `keyboard-reduced.mjs`, `motion-check.mjs`: reproducible browser checks using installed Chrome and existing external Playwright runtime; no runtime package added.

## Automated verification

- Baseline: 20 files / 57 tests passed.
- Red phase: 7 expected failures (wheel prevention still present, numeric Resistance and detail crops absent).
- Final: 21 files / 62 tests passed, including existing production inventory, pair status, identical tactile substrates and neutral asset contracts.
- `pnpm lint`: exit 0.
- `pnpm exec tsc --noEmit`: exit 0.
- `pnpm build`: exit 0, all 10 static pages generated.
- `git diff --check`: exit 0.
- Browser flows: no console/page errors.

Local startup note: Turbopack rejected the existing external node_modules symlink; Webpack dev and production build/start succeeded. System Git remains unavailable due to Xcode license; existing CommandLineTools Git was used without changing system settings.

## Decision

**UI-01D PASS — recommend user visual approval.** Internal clarity/fairness/difference ratings: Q01 4/5/4, Q02 4/5/4, Q03 4/5/4, Q04 4/5/4, Q05 4/4/3. All answer-leakage checks PASS. Q05 is intentionally subtle. Real-user judgment and physical-device/installed-extension checks remain outside this local-browser verification; no known executable UI-01D fix remains. Stop here: no UI-02 or deployment.

## User follow-up — make Check firmness obvious (2026-09-30)

Replaced the understated underlined action with a full-width, 44px minimum bordered button, pale green surface, bold label and circled first-step marker. Checked state shows a neutral checkmark and permits checking again. Avocado tactile intro now explicitly asks users to check both fruits and explains that more Resistance means firmer before choosing for their timing. Answer rules and other-fruit styling remain unchanged.

`firmness-callout/` contains initial, checked and translated-control screenshots at 1440/390/360 and executable QA. Buttons remain at least 44px, independent checks do not submit, and document/button horizontal overflow is zero. Desktop stage stays 626px; mobile translated buttons may grow stage to ~734px. 62 tests, lint and production build (including TypeScript) pass. Local preview on port 3107 was rebuilt and restarted.

## User follow-up — acknowledge every answer (2026-09-30)

Avocado Q01–Q05 now wait for **Got it** after both correct and incorrect answers. The final answer also waits before completion. QuizEngine honors the existing per-question `autoAdvanceOnCorrect` flag; all Avocado questions set it to false. Other fruits retain their existing settings. Feedback, locked answer controls, focus restoration and Restart reset remain intact. This supersedes the original UI-01D correct/automatic-flow description above.

`manual-progression/` contains desktop/mobile correct and wrong screenshots and the focused browser check. Unit regression holds both final-answer outcomes for ten seconds before acknowledgement. Automated verification: 64 tests, lint, TypeScript, production build and diff-check pass.

Production browser verification passed 20 confirmations (five questions × correct/wrong × desktop/mobile): no advancement after 1.6 seconds, Enter on Got it advances once, final completion waits, Restart resets, document scroll delta is zero, and no horizontal overflow or page error occurred.
