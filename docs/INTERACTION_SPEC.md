# Kiwi update — qualitative touch and practical scenarios (2026-10-01)

Kiwi Q01 is the only tactile question. Its independently checked, live text reads **Slight give · still holds its shape** or **Very firm · almost no give**. The optional `description` cue overrides the numerical Resistance display only where configured; Avocado/Persimmon behavior is preserved. Kiwi idle instructions explain comparing the feel instead of numerical resistance. The existing restrained opt-in motion, reduced-motion behavior, native Check firmness buttons and reset/disabled behavior remain.

Q02 is visual, with explicit avoid-buying feedback. The follow-up request adds a scene illustration to each Q03–Q05 text option; the existing illustrated-option rendering supplies these without changing the state machine. Firmness remains written evidence, not a visual measurement. Answer key A/B/B/B/B. Correct and wrong answers both require Got it, including Q05. No new state model, timer or scroll lock. [Browser and test evidence](qa/kiwi-ripening/README.md).

# UI-01D — current Avocado Quiz interaction contract

**2026-09-30 user update:** All five Avocado questions require **Got it** after both correct and wrong answers. Correct feedback no longer advances on a timer. The final question also waits for acknowledgement before completion; Restart clears the result and checked evidence. Existing `autoAdvanceOnCorrect` is now honored by QuizEngine and set to false for Avocado. This supersedes historical automatic-progression descriptions below.

**Desktop wheel isolation is REVOKED.** Normal document wheel/trackpad scrolling and mobile vertical swipes work everywhere inside the Quiz: images, checks, Resistance, answer buttons, feedback, Got it and blank surface. No wheel preventDefault, body lock or internal Quiz scrolling. Game Stage independence is visual only; configuration is now `stage: "compact-game"`. Historical UI-01B/UI-01C isolation instructions below are superseded.

Q01/Q02/Q04 preserve identical static specimens and use stronger opt-in checked evidence: scaleY .998/.988/.978, tiny scaleX 1.001/1.004/1.008, contact-shadow width 1.02/1.09/1.16, 640ms gentle return. Neutral dots plus explicit 4/4, 3/4, 2/4 appear only after checking. Reduced motion leaves the readable evidence and disables both animations. Other fruits retain their existing treatment.

Q03/Q05 retain approved production pairs with equal, always-visible, same-source detail lenses on both sides. Q03 uses the surface region; Q05 includes lower-left silhouette. No answer-revealing labels or extra keyboard stops. Native stage heights are 626px at 1440/1024, 678px at 768 and 720px at 390/360, identical through wrong feedback and completion. Got it stays in the reserved footer; all 25 transitions preserve scroll and height. Enlarged/translated text can grow naturally. No horizontal overflow at the five tested widths, including bilingual stress.

See [UI-01D evidence and QA](qa/ui-01d/README.md) for measurements, scores, browser limits and screenshots.

---

# UI-01C — historical compact Avocado Game Stage

UI-01C retains the scoped UI-01B wheel behavior below and replaces its 990px/892px geometry. Measured native stage heights are 626px at 1440/1024, 678px at 768, and 700px at 390/360. The desktop board is roughly two thirds of the 900px test viewport. Phones use auto-height, not desktop vh locking.

The live feedback region exists before an answer. Result, explanation, learning principle and Got it form one compact footer. A wrong answer does not expand the tested stage. All 25 Got it transitions across five widths preserve scrollY, stage top and stage height, including completion. No state-machine, focus-restoration, transition, answer, timing or wheel-hook changes were needed.

The UI-01C baseline did not reproduce a Got it document jump: its five measurements had zero scroll/top/height delta. The demonstrated usability cause was the existing 990px board extending beyond a 900px viewport, with Got it low in the stacked feedback. Compact evidence/control spacing and a reserved footer solve reachability without scroll compensation. Do not confuse this diagnosis with UI-01B's earlier height-collapse measurement.

External Chinese translations remain visible with secondary typography. The source application is English. Controlled injected-translation fixtures verify wrapping and compactness; the user's live browser extension could not be inspected because native browser access timed out. These fixtures are not certification of every translation extension.

Horizontal scrolling is prohibited. The reproduced bilingual overflow source was nutrition's nowrap values plus intrinsic grid minimum widths. Shrinkable tracks/children and wrapping values fix the source without `html/body overflow-x:hidden`. Five widths and translated-content stress have zero horizontal overflow. User-enlarged or unusually long text may grow the board; content is never clipped.

Full evidence: `docs/qa/ui-01c/README.md`.

## UI-01B wheel policy retained; historical geometry below

The user explicitly approved this exception on 2026-09-29. It supersedes the previous blanket **no wheel capture inside Quiz** rule only for an opted-in isolated game.

| Input / state | Behavior |
| --- | --- |
| Active game; `(hover: hover) and (pointer: fine)`; vertical wheel originates inside stage | Stage-local non-passive wheel listener calls preventDefault. No internal scrolling or question navigation. |
| Pointer outside stage | Ordinary document wheel scrolling. No global listener/body lock. |
| Completed game | Listener removed; ordinary wheel scrolling restored. |
| Restart | Active stage-local isolation reinstated. |
| Ctrl+wheel / horizontal-only wheel | Native browser behavior retained. |
| Touch / phone swipe, including over images and controls | Native page scrolling. No touchmove handler and no touch-action:none. |
| Keyboard | Tab can leave. PageUp/PageDown/Space are not globally handled; native button activation remains. |

The section is not a modal and has no aria-modal. Continue ↓ is an explicit user-activated anchor to `#nutrition`; transitions and completion do not navigate or automatically scroll.

## Position stability diagnosis and fix

Instrumented Chrome baseline on 7c8a96c tested normal animation, reduced motion, disabled scroll anchoring and disabled View Transitions, each at two scroll alignments. **The reported change to document scrollY was not reproduced:** all eight deltas and stage-top deltas were zero. The only intentional browser positioning call was already `focus({preventScroll:true})`; there was no scrollIntoView, scrollTo or anchor change during Got it.

A real layout movement was measured: Q01 wrong feedback to Q02 shrank the stage from 995.33px to 823.36px (171.97px), shifting its bottom and following content. UI-01B addresses that measured defect with minimum question/evidence/feedback regions and an equal completion footprint. The existing non-scrolling focus restoration and 1000ms/360ms progression behavior remain. No compensating scroll calls were added.

Production Chrome verified all five wrong/Got it transitions at 1440 and 390: scrollY delta 0, stage-top delta 0, stage-height delta 0, including completion. Approved content yields 990px desktop and 892px mobile footprints. Minima may expand for user-enlarged text; no height clips content. Six active desktop wheel origins stayed at delta 0; outside/completed wheel scrolled 230px. Four mobile touch origins scrolled normally. Full results: `docs/qa/ui-01b/browser-results.json`.

## Teaching interaction

New palm-pressure image is deliberately static. Native surface/outline detail disclosures reveal cropped existing evidence; a short 240ms reveal is disabled by reduced motion. Static teaching and disclosures work without JS. Teaching captions and descriptive alt text are outside the image files; Quiz images and controls remain neutral.

---

## Historical interaction contracts (UI-01B exception above takes precedence)

# Quiz firmness checks

## Structured text choices — ASSET-02

QuizOption is a backwards-compatible union: visual options retain their assetKey, neutral accessibilityLabel and optional tactile metadata; text options supply only id and plain text. TypeScript rejects mixed media, tactile text choices, and choices with no evidence. There is no rich-content framework or added dependency.

Text choices use native answer buttons and the existing two-column comparison, focus and answer-state motion. Their visible statement is their accessible name; no FruitAsset or blank image slot is rendered. Persimmon Q05 makes the existing static guide's intended comparison explicit: A, “Firm Fuyu can be ready to eat; Hachiya should be very soft.” versus B, “Both Fuyu and Hachiya must be very soft before eating.” B is the deliberately incorrect rule, not additional advice. Correct option A, feedback, learning point, one-second advancement and completion are unchanged.

INTERACT-01 adds optional Quiz-layer `tactile: { kind: "firmness", level }` metadata. `FirmnessLevel` is `very_firm | beginning_to_soften | ripe`. Content supplies categories, never animation values. FruitAsset and the asset registry continue to own only image rendering and contracts.

| Avocado question | A | B | Answer |
| --- | --- | --- | --- |
| Q01 | ripe | very_firm | A |
| Q02 | very_firm | ripe | B |
| Q04 | beginning_to_soften | ripe | A |

Q03 and Q05 retain their static production comparison images and simple answer buttons. Q01/Q02/Q04 images remain placeholders; future image replacements use the same child FruitAsset API.

## Interaction and accessibility

Each tactile option is a noninteractive named group containing a visual, a native **Check firmness** button, a reserved resistance slot, and a separate answer button. The keyboard order is check A, answer A, check B, answer B. Click, tap, Enter and Space request a check without answering. There are no nested controls, hold gestures, pointer capture, touchmove handlers, preventDefault calls, or internal scroll containers.

Checking reveals neutral `Resistance` dots and a concise, separate polite live announcement: `Option A: Resistance level 2 of 4`, for example. Indicators are empty before checking and use no correctness colors or ripeness labels. Resistance is 4/4 for very firm, 3/4 for beginning to soften, and 2/4 for ripe. A reserved 32px minimum slot prevents the indicator itself from shifting the answer button.

One check runs a 420ms transform-only gentle compression on the inner visual wrapper, using scaleY 0.998 / 0.994 / 0.988 respectively and a calm cubic-bezier(.2,.65,.3,1). These are educational UI metaphors, **not physical deformation, pressure, or scientific ripeness measurements**. The intentionally small motion is reinforced by the readable resistance indicator. No numeric scale values are rendered to users.

Reduced motion immediately reveals the same indicator without starting an animation. A live preference change cancels a running check. Answer submission disables both checks and cancels tactile animation; existing correct/wrong answer transforms remain on the separate answer control. Question-key remounts and completion/restart reset local check state, and cleanup cancels animation. Existing one-second correct advance and wrong/Got it continuation remain unchanged.

## Verification — 2026-09-08

Production-build Chrome at 1440×900 and 390×844 verified Q01/Q02/Q04 A/B checks, the distinct resistance levels, neutral initial state, reset on advancing and restarting, and full Q01–Q05 mixed correct/wrong/Got it completion. Q03/Q05 retain two production images and no firmness controls. Desktop visual slots are 354px square; mobile slots are 169px square, with no horizontal overflow. Controls have at least 44px total height; the user's translation extension can increase check-control height without overflow. Keyboard Enter/Space, check A → answer A → check B → answer B, visible 3px focus outline, Got it and completion passed. Normal document keyboard scrolling worked; no browser errors were recorded.

Chrome DevTools reduced-motion emulation was enabled and confirmed with matchMedia: resistance remained available and both visual transforms were `none`. The emulation was cleared after testing. Normal-mode browser sampling confirmed an active compression transform; the restrained values above were retained after visual inspection.

The browser-control wheel probe did not reliably move the document and is not counted as a passing swipe test. Physical-device swipes beginning on the visual, check button, and answer button remain Release QA. Source inspection confirms native `touch-action: auto`, no gesture interception, and no added scroll container. No dependency was added.
