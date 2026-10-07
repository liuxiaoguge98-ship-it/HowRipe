# UI-01B — Avocado teaching + isolated Game Stage

**Result: PASS — 2026-09-29.** Branch `feature/ui-01b-avocado-teaching-game-stage`, based on clean verified UI-01 `7c8a96cdcc09a934f4173b5ad2bdfa558576dc17`. Only Avocado opts into the new presentation. UI-02 was cancelled before product edits. No merge or deployment.

## Baseline and measured cause

The previous guide had strong type hierarchy but Press, Damage, Shape and Stem had no direct photographic teaching evidence. Its existing neutral Quiz photographs were useful controlled comparisons, but were not presented where those concepts were explained. Color already communicated the correct limitation and needed no decorative fruit photograph.

The reported downward document movement was **not reproduced** in the baseline Chrome trace. Normal motion, reduced motion, disabled scroll anchoring, and disabled View Transition were each tested at stage-top and feedback-bottom alignments. All eight runs had zero scrollY and stage-top delta. Instrumentation observed only `focus({preventScroll:true})`; no scrollTo, scrollIntoView, or anchor navigation during Got it.

The confirmed defect was outer geometry: Q01 wrong feedback → Q02 reduced the stage from **995.328125px to 823.359375px**, a **171.96875px collapse**, moving its bottom and subsequent content. DOM content replacement changed the required height. We fixed this measured instability; we do not claim an unobserved focus or document-scroll root cause. See [raw baseline trace](baseline-scroll.json) and [diagnostic script](diagnose.mjs).

## Educational imagery and composition

- Press: one new 1200×900 / 124,548-byte WebP, reference-led Hass identity, realistic adult hand and broad relaxed palm contact. Visual inspection accepted anatomy and rejected no feature. Static hand fallback is deliberate: no flattened-photo squash, fake layers or recurring pressure animation.
- Damage: existing approved Q03 controlled pair, external HTML labels, whole-fruit evidence plus native expandable material-detail crops.
- Shape: existing Q05 intact/asymmetric versus shallow localized-collapse pair. Same camera, identity and lighting; no round-versus-pear rule.
- Stem: accurate attached-stem close-up from approved Hero. No fabricated abnormal specimen or instruction to remove the stem.
- Color: existing typographic principle and firmness reminder retained; no misleading color-only ripeness scale.
- Six educational registry records added: one new source and five education aliases. Original 31 asset records, Quiz pair IDs, runtime images, neutral names and FruitAsset API remain unchanged. Education aliases request appropriate responsive image sizes. [Full asset audit and generation prompt](ASSETS.md).
- Composition: asymmetric text/hand feature, large damage evidence, smaller contour pair beside stem detail, then the dark color principle. On phones these become a clear vertical sequence. Teaching HTML remains server-rendered.
- Micro-motion: explicit native detail disclosure uses a restrained 240ms opacity/scale reveal. Reduced motion disables that animation. Hand and stem remain static; no looping decoration.

## Game Stage implementation

One bounded light surface contains reserved header, question, evidence and feedback regions. CSS uses minimum sizes that can grow for larger content, without clipping or internal scrolling. At the tested viewports the stage remains **990px at 1440** and **892px at 390**, including completion. Empty feedback is occupied by the existing neutral Quiz introduction. Tactile evidence retains Check firmness → Resistance → Choose; static questions retain large samples; the generic text-option style uses readable rule text without empty image boxes.

The small generic opt-in is `quiz.stage = "isolated-game"`. Only Avocado sets it. `useGameStageWheel` attaches a non-passive wheel listener to the active stage element, checks `(hover: hover) and (pointer: fine)`, and cancels vertical wheel movement. Horizontal-only input and Ctrl+wheel remain native. Cleanup removes the listener on completion/unmount; Restart restores it. No document listener, body lock, touch handler, keyboard handler, nested scroll or modal is introduced.

The original state machine, answers, feedback, tactile mappings, auto-advance timing, 360ms transition and non-scrolling focus restoration are unchanged. Completion displays existing summary/takeaways, Restart, and an explicit Continue ↓ link to Nutrition. Completion never auto-scrolls and releases wheel isolation.

This approved desktop rule supersedes the earlier blanket no-wheel-capture rule. Touch swipes and keyboard navigation always retain native behavior. The desktop neutral state explains that scrolling beside the stage continues reading.

## First-pass critique → second pass

| Question | Review and final decision |
| --- | --- |
| 1. Do images explain? | Every new/reused image maps to palm contact, surface damage, contour collapse or intact stem. No decorative additions. |
| 2. Does Press show palm pressure? | Broad contact, relaxed supporting fingers and firm undistorted fruit are legible. Static image accepted. |
| 3. Too catalog-flat? | Controlled pair photography remains intentionally consistent, but labels and material-detail reveals turn it into comparative evidence. |
| 4. Crop rhythm? | Large hand, full pair, smaller contour pair and stem macro give different scales. Second pass improved stem source resolution and crop framing. |
| 5. Does motion clarify? | Only user-requested inspection reveal. No fake pressure deformation or loops. |
| 6. One independent game? | Single outer boundary and continuous A/B evidence region. Reserved feedback initially felt empty; second pass added the existing introduction and tightened vertical regions. |
| 7. Anchored progression? | Five Got it transitions per viewport measured zero scroll/top/height deltas, including completion. |
| 8. Desktop isolation natural? | Explicit boundary and short desktop instruction; moving outside immediately restores scroll. Browser tested all six requested origins. |
| 9. Mobile scroll intact? | Real CDP touch gestures on all four requested origins scroll the page. Final mobile CSS also hides the desktop instruction. |
| 10. Engaging without gimmicks? | Teaching now has evidence and deliberate pacing. Quiet interaction and unchanged facts keep the page educational. |

Second pass also made the comparison principle more prominent, used education-sized aliases for sharp detail, refined the contour crop, and removed the stem crop's bottom white band. Final full-page and focused screenshots were refreshed after those final CSS changes and visually inspected.

## Browser QA

Installed Chrome **153.0.8010.53**, production build, Playwright from the existing external gstack runtime. No browser dependency added to this project. [Reusable QA script](qa.mjs) / [raw results](browser-results.json).

| Check | Result |
| --- | --- |
| 1440×1000 normal motion, all-wrong/manual progression + restart/all-correct | PASS |
| 390×844 reduced motion, same complete flows | PASS |
| Got it scrollY / stage top / outer height | All 10 transitions: delta **0 / 0 / 0px** |
| Desktop wheel: A visual, B visual, Check firmness, Resistance, feedback, Got it | Each scrollY delta **0px** |
| Desktop outside stage / completed stage | Native scroll, each delta **+230px** |
| Mobile swipe: visual / check / answer / feedback | Native scroll: **+307 / +298 / +306 / +305px** |
| Touch Check firmness; reduced-motion tactile animation | Resistance available; nonessential visual animation absent |
| Keyboard | Tab exits stage, PageDown scrolls normally; controls and FAQ activate |
| Completion | Same footprint, no auto-scroll, explicit Continue reaches #nutrition |
| Semantics / SEO | One H1, unchanged title, no aria-modal, neutral options, existing live feedback/focus/FAQ preserved |
| JavaScript disabled | Six teaching sections present; native inspection disclosure works |
| Assets / layout / errors | Images loaded, no horizontal overflow at both sizes, no console/page errors |
| Kiwi / Pomegranate / Persimmon | No game/teaching opt-in; all five questions completed on each; no overflow/page errors |

Touch results are browser emulation, **not a physical-device certification**. No screen-reader-device certification is claimed. Existing public-launch physical-device/domain gates remain separate.

## Screenshot evidence

| View | Baseline | First pass | Final |
| --- | --- | --- | --- |
| 1440 full | [baseline](baseline/1440-full.png) | [pass 1](pass-1/1440-full.png) | [final](final/1440-full.png) |
| 390 full | [baseline](baseline/390-full.png) | [pass 1](pass-1/390-full.png) | [final](final/390-full.png) |

Final desktop: [Press](final/1440-press.png), [teaching sequence](final/1440-guide-foundation.png), [Damage](final/1440-damage.png), [Shape](final/1440-shape.png), [Stem](final/1440-stem.png), [Color](final/1440-color.png), [detail](final/1440-inspection.png), [neutral](final/1440-quiz.png), [wrong](final/1440-wrong.png), [completion](final/1440-completed.png).

Final mobile: [Press](final/390-press.png), [teaching sequence](final/390-guide-foundation.png), [Damage](final/390-damage.png), [Shape](final/390-shape.png), [Stem](final/390-stem.png), [Color](final/390-color.png), [detail](final/390-inspection.png), [neutral](final/390-quiz.png), [wrong](final/390-wrong.png), [completion](final/390-completed.png).

## Engineering gates and delivery

- `pnpm test`: **20 files / 56 tests PASS**. Includes focused wheel scope/conditions/cleanup/touch/default/completion tests, Got it preventScroll/no-scroll intent, educational asset contracts and unchanged neutral Quiz semantics.
- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` (existing Webpack mode), `git diff --check`: **PASS** after final product CSS.
- No dependency, package manifest or lockfile changes. No factual copy, SEO metadata, nutrition values, Quiz answers or tactile mappings changed.
- Current rules recorded in UI_DIRECTION, INTERACTION_SPEC, PRODUCT_SPEC, ASSET_SPEC and PROJECT_STATE. Historical checkpoints remain labeled as history.
- Implementation and documentation/evidence are committed separately; exact final HEAD and clean status are reported in the delivery message to avoid a self-referential commit hash.

**Recommendation:** Avocado is visually ready as the reviewed reference for a separately authorized future rollout. Do not execute UI-02 in this node. Remaining tradeoffs: stage whitespace reserves the longest feedback rather than collapsing between questions; desktop wheel isolation is deliberate and requires pointer exit to resume reading; the stem is a single truthful intact example. These are accepted design choices. Physical touch-device verification remains a public-launch gate. Stop after UI-01B; no merge or automatic deployment.
