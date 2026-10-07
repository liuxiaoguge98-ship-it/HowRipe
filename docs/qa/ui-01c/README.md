# UI-01C — compact Game Stage + educational media surfaces

**Result: PASS; ready for user visual approval.** Worktree `<historical-worktree>`, branch `feature/ui-01c-avocado-compact-game`. Started from clean screenshot-producing UI-01B HEAD `3ba89b9d7af52deb090bcf88236136c15033a064`. No reset, merge, deployment or UI-02 rollout. Final delivery message records the commit hashes and clean status.

## 1. Diagnoses and evidence boundaries

### Horizontal overflow

The user's screenshots visibly contain bilingual text and a horizontal scrollbar. The checked-in application has English copy only. Access to the user's live Chrome tab timed out, so its exact extension DOM was unavailable. We do not claim to have inspected that extension or prove it was the only source in that particular browser session.

Native baseline production checks at 1440, 1024, 768, 390 and 360 showed no horizontal overflow. A controlled bilingual injection into the nutrition values reproduced an actual source-level defect: `white-space: nowrap` combined with intrinsic minimum grid widths. Added text widened the columns and therefore the document. This is an explicit reproduction, not an attribution based solely on the screenshot.

| Width | Baseline native scrollWidth | Baseline bilingual stress scrollWidth | Final native + stress scrollWidth/clientWidth |
| --- | --- | --- | --- |
| 1440 | 1440 | 2261 | 1440 / 1440 |
| 1024 | 1024 | 2181 | 1024 / 1024 |
| 768 | 768 | 1593 | 768 / 768 |
| 390 | 390 | 785 | 390 / 390 |
| 360 | 360 | 785 | 360 / 360 |

Source fix: nutrition values wrap, grid tracks use `minmax(0, 1fr)`, and relevant grid/flex children can shrink. Translation receives separate secondary styling. Related, Timing, teaching comparisons and Quiz are covered by viewport checks. No html/body overflow-x mask, arbitrary fixed page width, or image-source change. [Baseline](baseline.json), [same-fixture before/after evidence](overflow-results.json), [reproduction script](overflow-check.mjs).

### Oversized stage and Got it

The current UI-01B board was 990px on desktop and 892px on phone. A 990px board already exceeds a 900px usable viewport; its large reserved evidence/question regions and vertically stacked feedback make Got it difficult to reach. Injected translations add more visual weight.

Five fresh baseline Got it measurements had zero document scroll, stage-top and stage-height deltas. The UI-01B fix had already stabilized progression. UI-01C therefore fixes **reachability and density**, preserving the already-correct focus behavior. It does not falsely attribute current movement to focus, anchors or View Transition. No new scrollTo/scrollIntoView call, focus logic change or state-machine change exists in product code.

## 2. Compact game design

The board uses a pale avocado laboratory surface with one border and almost no shadow. A compact header/progress badge leads into a centered question, clearly labeled A/B specimens, nearby Check firmness/Resistance/Choose controls, then one integrated feedback footer.

The screenshot-3 reference is translated into real HTML organization. No reference asset is shipped, no answer labels are baked into images, and no correct/wrong color or icon appears before selection. Only the selected answer receives the existing restrained result underline after submission. Text-only options continue to use their readable statement area without a blank image slot.

| Viewport | Old height | Final native height | All five neutral/wrong states + completion |
| --- | --- | --- | --- |
| 1440×900 | 990 | **626** | Stable |
| 1024×900 | 990 | **626** | Stable |
| 768×900 | 990 | **678** | Stable |
| 390×844 | 892 | **700** | Stable |
| 360×844 | 892 | **700** | Stable |

626px is 69.6% of the desktop test viewport. Desktop specimen image regions are 230px high; removing excess surrounding whitespace makes the evidence more prominent relative to the board. Phones keep height:auto with responsive content minima rather than receiving the desktop vh constraint. Enlarged/longer text may grow naturally; there is no clipping or internal scrolling.

The footer reserves space in neutral, correct and wrong states. On desktop, result, explanation, learning principle and Got it sit in compact columns; on phones, text and the action remain adjacent. At 1440/1024, every wrong-state Got it was verified inside the viewport with the stage top at approximately 70px and without scrolling after selection. Completion remains inside the native footprint and preserves Restart plus explicit Continue ↓.

### Bilingual hierarchy

No bilingual content is removed. The application source remains English. CSS handles known injected translation markup (`immersive-translate-target-inner`) and Chinese language spans. The question uses 34px English and an 18px secondary Chinese line; helper/feedback Chinese remains readable at 12px and button translations at 11px. Existing browser-added text is not copied into a new product localization system.

The controlled bilingual fixture adds translations to the title, helper, controls, feedback and nutrition. Desktop Q01 remains within 680px; all five widths retain zero horizontal overflow. See [translation measurements](translation-results.json), [1440 fixture](translated-1440.png), [1024](translated-1024.png), [768](translated-768.png), [390](translated-390.png), [360](translated-360.png). Fixture text is test-only. This is not certification of the user's live extension or every extension DOM structure.

## 3. Educational visuals and source preservation

- **Press:** reuse the accepted UI-01B 1200×900 / 124,548-byte hand photograph. Broad relaxed adult palm contact, natural supporting fingers, undistorted Hass, no fingertip poke. A warm specimen edge integrates it into the page. Static fallback retained: no fake flattened-photo deformation or unreliable hand layers.
- **Damage:** reuse Q03 controlled production pair, with existing HTML labels and native expandable detail crops. A shared soft media surface makes the comparison read as material evidence.
- **Shape:** reuse Q05 natural asymmetry versus localized contour collapse. No round/pear correctness rule or new pair generation.
- **Stem:** reuse the transparent approved Hero crop on a pale radial theme surface. It shows an intact attached stem as a condition reference; no fabricated diseased specimen and no stem-removal instruction.
- **Color:** retain the full-width typographic principle and firmness reminder, with no misleading color-only ripeness photograph.
- **Rhythm:** large hand → lighter timing text → large damage pair → smaller contour pair and macro stem → color statement. Both full-page screenshots were reviewed.

Asset audit confirmed Hero has alpha, while Q03/Q05 and the hand photo are opaque. Opaque sources receive intentional light specimen wells with a soft inset edge; transparent media uses the themed background directly. No destructive blend mode, fake transparency, source recoloring, new Hero/Quiz image or generated asset. All existing files, 37 asset contracts, pair lineage, loading and accessibility semantics are unchanged. Existing native detail reveal remains 240ms and respects reduced motion; no new motion dependency.

## 4. Visual iteration and self-critique

Baseline → first implementation → screenshot review → second refinement → final production captures completed. The first version passed compactness but showed a rectangular white-source edge inside an overly rounded well and undersized fruit. The second pass unified the well background, reduced the corner treatment, enlarged desktop image regions to 230px, filled the footer to the outer boundary, reserved enough title space for long phone/tablet questions and aligned completion height. Final translated helper/feedback text was enlarged for readability.

| Review question | Final assessment |
| --- | --- |
| Is the stage still too tall? | Desktop is 626px, down 364px; whole question/action/footer fits in the test viewport. |
| Is Got it naturally visible? | Visible in the integrated footer in every desktop wrong state without post-answer scrolling. |
| Is evidence large enough? | 230px desktop image region; less whitespace and compact controls improve its proportion of the board. |
| Does reference hierarchy read? | Centered question, progress badge, explicit A/B, nearby controls and consolidated bottom teaching. |
| Game-like rather than exam-like? | One continuous pale laboratory board; no nested floating cards or modal. |
| Are white sources still sticker-like? | Hard source edges are softened into a shared specimen surface. Sources remain honest opaque photographs. |
| Does Press teach palm contact? | Existing accepted photograph clearly demonstrates relaxed broad contact. |
| Are images factual? | All relate to palm contact, surface condition, contour or attached stem; no decorative additions. |
| Is How to Pick varied? | Feature, text, large comparison, paired detail/macro and statement retain different scales. |
| Is phone usability retained? | Compact auto-height board, 44px controls, adjacent feedback action and native swipes. |
| Is horizontal overflow gone? | All five native and translated stress measurements equal clientWidth. No root mask. |

## 5. Browser and interaction QA

Final production browser: installed Chrome **154.0.8037.58** via existing external Playwright. No project dependency added. [Full results](browser-results.json) / [QA script](qa.mjs).

- All five viewport runs completed five wrong/manual Got it transitions, then Restart and five correct auto-advance transitions. Expected tactile mappings/reset, neutral initial state, single progression and completion passed.
- **25/25 Got it transitions:** scrollY delta0, stage-top delta0, stage-height delta0, including completion. Existing 360ms transition and 1000ms correct-feedback timing remain.
- Desktop six wheel origins (both visuals, Check firmness, Resistance, feedback, Got it): delta0. Outside and completed stage: +230px. Stage-local listener and cleanup implementation unchanged.
- 390px actual CDP touch gestures: visual +165, check +299, Resistance +308, answer +288, feedback +298px. Native document scroll remains available. This is emulation, not physical-device certification.
- Keyboard: Tab exits; PageDown native; Check firmness Space, Choose Enter, Got it Space and Restart Space passed. Focus outline remains visible, Got it restores focus without scrolling. [Keyboard/reduced results](keyboard-results.json).
- Reduced motion: 390 full flow and dedicated 1440 reduced run passed. Tactile animations absent, Resistance available, game geometry and desktop wheel behavior retained.
- No horizontal overflow or browser errors in final runs. All images loaded. One H1 and unchanged page title; static teaching and native inspection work with JavaScript disabled. No modal semantics. Existing neutral names, live feedback, FAQ, text choices and focus behavior remain.
- Kiwi, Pomegranate, Persimmon: no game/teaching opt-in; full five-question completion smoke on each, no horizontal overflow/page errors. No other-fruit data or visual composition edits.
- An early development-run immediate visibility assertion failed once at 768. Direct question/state tracing completed all five transitions; final production QA waits for visible question readiness and passed the whole matrix. No reproduced skipped-question bug or product-state workaround was introduced.

## 6. Screenshots

| View | Baseline | Pass 1 | Pass 2 | Final |
| --- | --- | --- | --- | --- |
| Desktop full | [1440](baseline/1440-full.png) | [1440](pass-1/1440-full.png) | [1440](pass-2/1440-full.png) | [1440](final/1440-full.png) |
| Phone full | [390](baseline/390-full.png) | [390](pass-1/390-full.png) | [390](pass-2/390-full.png) | [390](final/390-full.png) |

Desktop final: [Press](final/1440-press.png), [Damage](final/1440-damage.png), [Shape](final/1440-shape.png), [Stem](final/1440-stem.png), [sequence](final/1440-guide-foundation.png), [neutral](final/1440-quiz.png), [checked](final/1440-checked.png), [wrong](final/1440-wrong.png), [completion](final/1440-completed.png).

Phone final: [Press](final/390-press.png), [Damage](final/390-damage.png), [Shape](final/390-shape.png), [Stem](final/390-stem.png), [neutral](final/390-quiz.png), [checked](final/390-checked.png), [wrong](final/390-wrong.png), [completion](final/390-completed.png).

## 7. Engineering and handoff

- `pnpm test`: **20 files / 57 tests PASS**, including existing scoped wheel/focus/no-touch/default/completion tests and new persistent live-footer coverage. The browser compactness regression was first demonstrated failing against the 990px baseline, then passing with the implementation.
- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` (existing Webpack mode) and `git diff --check`: **PASS**. All fruit routes remain static.
- No dependency, package/lockfile, factual-copy, SEO, nutrition, asset registry, production-image, answer, tactile mapping/timing or state-machine changes. Product changes are the scoped editorial stylesheet and three feedback presentation classes.
- UI_DIRECTION, INTERACTION_SPEC and PROJECT_STATE updated. ASSET_SPEC needs no new contracts because no assets were added or changed.
- No merge or deployment. Final implementation and evidence commits are reported with final HEAD/clean status in the delivery response.

**Remaining boundaries:** exact live translation-extension integration remains unverified because native browser access timed out; translated-content fixtures are reproducible substitutes, not a claim of extension certification. Unusually long translations or enlarged accessibility text may grow the board without clipping. Physical touch-device checks remain an existing public-launch gate. These do not block local visual approval of UI-01C.

**Recommendation:** present this Avocado build to the user for visual approval. Do not propagate to other fruits or deploy automatically. Stop after UI-01C.
