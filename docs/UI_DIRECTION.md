# BRAND-HOME-01 — HowRipe shared identity (2026-10-07)

**PUBLIC BRAND:** HowRipe. **DESIGN SYSTEM:** Editorial Fruit Lab, as evolved by the current production fruit pages. **HOMEPAGE ROLE:** Brand introduction + fruit index.

The user explicitly chose the current fruit-page display family over the historical serif wording: `Arial Rounded MT Bold`, `Trebuchet MS`, Arial, sans-serif, weight 800. Body text stays Arial/Helvetica/sans-serif. The global display token matches the existing fruit-page token. Brand uses compact tracking; headings use approximately -.055em; 12px uppercase labels use .16em. The homepage uses an 86px desktop / 57px phone two-line H1 and clear 46px / 35px section titles. Inner-page typography remains unchanged.

Use warm paper (#f7f5ef), one soft index surface (#f0f1e7), and a slightly deeper neutral footer. Preserve fruit-specific green/olive/ruby/orange accents. Shared header/footer structure and text wordmark work on every route; their inherited fruit theme remains contextual. Header navigation is one clear “Choose a fruit” link, with 44px targets. Footer preserves the descriptive line and adds all live guide links; no legal claim is invented.

Homepage imagery uses existing transparent production assets, including the original whole Fuyu/Hachiya hero. One overlapping still life introduces the range; open numbered index entries use radial media light without cards, blend modes, recoloring or generated imagery. Names appear before specimens so navigation scans quickly. Offset two-column desktop rhythm becomes one ordered column on phones. Keep concise, fruit-specific learning promises; educational detail belongs in the fruit guides.

Reuse the existing one-time hero entrance and reduced-motion override. Link arrows and a maximum 1.02 specimen hover scale provide restrained feedback. No looping motion, parallax or new animation dependency.

**LANGUAGE:** English only. The user's follow-up removes authored secondary-language hero copy on Kiwi/Persimmon; retain all English facts, quizzes, answers, tactile mappings, storage, nutrition and sources. Existing compatibility styles for user-controlled translation extensions do not produce text.

[Baseline, iteration, screenshots and verification](qa/brand-home-01/BASELINE.md). This section supersedes prior homepage branding and typography instructions; older entries below record historical fruit design work.

---

# Kiwi quiz imagery update (2026-10-01)

The latest user request supersedes the earlier text-only Q03–Q05 decision. All five questions now have imagery for both options. Three scenario pairs use transparent product-style illustrations, the Kiwi cream/olive palette, unframed image areas and compact choice pills. The image framing stays complete on hover. Text remains explicit for facts a photograph cannot establish, especially firmness. The existing tactile and localized-damage pairs remain unchanged. See [quiz image audit](qa/kiwi-quiz-illustrations/README.md).

## Current Kiwi direction — READY / CONTROL / PLAN (2026-10-01)

READY = slight give with plump structure. SPEED UP = room temperature + ethylene-producing apple/banana. SLOW DOWN = refrigerator. BATCH CONTROL = ripen only what you will eat soon. Green/fuzzy scope is explicit; Gold is not generalized. Eight compact editorial lessons include controlled whole-fruit evidence and a strong fuzz-is-not-ripeness statement. Storage uses three open columns and simple native graphics. The batch diagram shows 2–3 out/rest cold and the next small batch, followed by a five-step rescue workflow.

Q01 uses qualitative tactile evidence, Q02 a controlled visual bruise pair, and Q03–Q05 intentional text scenarios without empty image slots. All feedback is acknowledged with Got it. This supersedes earlier requirements for a photo in every Kiwi question. Kiwi retains flesh-green/earth-tone theming. [Source, assets and QA](qa/kiwi-ripening/README.md).

## Current Persimmon direction — TYPE FIRST / VARIANT LAB (2026-10-01)

Persimmon now leads with two whole specimens and two rules: **Fuyu — firm can be ready; Hachiya — very soft for fresh eating.** An open editorial comparison replaces generic variant cards. Both types remain side by side on phones. Two independent, server-rendered readiness paths distinguish mature color from ready-to-eat texture; no shared Timing Guide and no hidden tabs.

Dedicated Fuyu, Hachiya, softness-vs-damage and color sections use intact whole-fruit evidence. Normal uniform Hachiya softness is not automatically damage. Controlled Hachiya images vary overall ripe appearance, then only a localized injury; touch descriptions remain explicit. Orange alone does not establish readiness. Five visual scenarios synthesize type, condition and texture with A/A/B/A/A answers and manual Got it. New layout capabilities are opt-in; other fruit content and styles are unchanged. [Full audit](qa/persimmon-type-first/README.md).

## Previous — image-led fruit lessons (2026-09-30)

Kiwi, Pomegranate and Persimmon now use a dedicated `photo` lesson layout with large uncropped 4:3 educational photos, HTML captions and concise decision checks. Every remaining picking lesson contains an image. Desktop is text/photo; phone orders title, lead, photo, explanation and checks. Five new imagegen assets illustrate actions and textures; no static photo pretends to measure firmness or weight. Repeated lessons have been consolidated; approved Avocado styling remains unchanged. [Content rationale, assets and QA](qa/fruit-visual-lessons/README.md).

# Current rollout — fruit-specific color and teaching composition

2026-09-30: The approved Avocado design now extends to Kiwi, Pomegranate and Persimmon. Kiwi uses flesh green and warm natural tones for its tactile lessons; Pomegranate uses ruby/rose for weight, shape and rind inspection; Persimmon uses orange/cream with a dedicated Fuyu/Hachiya comparison. Seven semantic color roles style each entire page while retaining the approved Avocado fallbacks. All use compact reading blocks, large fruit evidence, visible firmness controls where applicable, and manual Got it for both answer outcomes. Text questions have their own compact card treatment with per-option explanations.

The latest user approval supersedes older instructions to defer the rollout or preserve auto-advance. No imagery, answer keys, nutrition or source URLs changed. [Communication summary](FRUIT_UI_SYSTEM.md) · [Full browser QA and before/after evidence](qa/fruit-theme-rollout/README.md).

# Latest Quiz refinement — larger fruit, fewer boxes

2026-09-30: Keep the sage stage with a single thin outer outline and more top inset. Give fruit images more space; choice pills are 44px tall rather than full-width panels. After answering, present per-option outcomes as unboxed icon/text, followed by a thin divider and compact explanation/Got it row. Preserve the explicit Check firmness control. Never scale the transparent visual-option parent: it isolates multiply blending and exposes the white photo substrate. Hover uses choice-button color feedback.

[Verified layouts and hover comparison](qa/avocado-quiz-balance/README.md).

# Current Avocado direction — reference-inspired teaching UI

2026-09-30: Apply the user's two teaching references across the Avocado page. Cream `#F8FBF0`, forest text `#10371E`, leaf accent `#54851C`, pale green `#E9F4D4`, rounded bold headings, outlined callouts and pill controls now form the page-wide design. The palm lesson gives its action and supporting explanation separate annotation boxes. Quick checks, timing, teaching inspections, Quiz, nutrition, FAQ, related cards and scoped header/footer share the language.

Quiz A/B remains equally treated before answering. State colors appear after selection; explicit text accompanies them. Both correct and wrong answers still require Got it. Native document scrolling, enlarged firmness controls and source evidence are preserved. Other fruit pages retain their design.

[Reference analysis, color contrast and screenshots](qa/avocado-reference/README.md). This visual direction supersedes earlier serif/editorial styling notes below; historical interaction decisions remain subject to their explicit latest updates.

---

# UI-01D — current Avocado Quiz refinement

Desktop wheel isolation is **REVOKED**; the stage is visually independent and normal page scrolling is restored everywhere. The compact 626px desktop stage keeps a reserved feedback footer and reachable Got it. Native mobile stage is 720px; text may grow without clipping. No horizontal overflow remains at 1440/1024/768/390/360 in browser QA.

Evidence is medium-specific: identical static specimens for tactile questions, clearer restrained press/contact shadow and numeric Resistance after Check; original visual pairs for Q03/Q05 with equal neutral 116px desktop / 82px mobile detail lenses. The Q05 contour remains harder than Q03 surface damage. One near-white specimen well integrates both source backgrounds without recoloring. English stays primary and translated Chinese secondary. No correctness cues before choosing. Other fruit design rollout remains deferred.

[UI-01D audit, second pass, scores and screenshots](qa/ui-01d/README.md). Historical wheel-isolation guidance below is superseded.

---

# UI-01 — Editorial Fruit Lab

Avocado is the first opt-in implementation. Warm ivory, avocado green, Georgia and the existing system sans create an editorial guide that culminates in an interactive comparison apparatus.

## Composition

- Oversized, unframed approved Hero image and an approximately 85px desktop / 54px mobile H1. No fabricated metadata or reading time.
- Numbered Quick Checks use open columns and rules. Timing is one continuous horizontal axis, becoming a vertical sequence on mobile.
- Picking uses feature, offset text, principle comparison, paired details and a dark green statement. Avocado has no approved independent teaching photos; typography carries these sections without repurposing Quiz answer images.
- Don't Overthink is a rule list. Nutrition gives the four existing values typographic emphasis. FAQ retains native disclosures. Related navigation reuses approved Hero assets with lazy loading.
- TEST YOUR EYE stays the semantic title. Two open samples live inside one light stage. Underlined Check firmness is a utility; solid Choose A/B is the decision. Resistance is a neutral measurement metaphor, with an unread dash before checking and the existing dots afterward. Correct/wrong feedback uses restrained accents and explicit text.

## Implementation boundary

`FruitContent.presentation?: "editorial-lab"` opts into the scoped CSS module. The existing `PickingSection.layout` vocabulary gains feature/comparison/detail/statement. There is no fruit-slug styling branch, arbitrary layout JSON, new state machine or new client boundary. Other fruits keep the default template.

CSS in `src/components/fruit/EditorialLab.module.css` is the styling source of truth. This document describes intent, not duplicate tokens.

## Reuse

The system is suitable for selective reuse after review. Each other fruit needs its own editorial composition, especially Persimmon's variety distinction and mixed text/image Quizzes. Do not enable the presentation flag globally.

See [UI-01 QA and screenshots](qa/ui-01/README.md) for the baseline, ten-point critique, second pass and verification.

## UI-01B — visual teaching and an isolated Game Stage

Avocado remains the only redesigned route in this node. UI-02 rollout was explicitly cancelled before its product edits.

### Teaching through evidence

- Press gently uses one reference-led photograph of an adult hand cradling the approved Hass identity across the palm. Broad relaxed contact is visible; there is no fingertip poke, squeezed dent or baked annotation.
- A correct static hand photograph is the selected fallback. It is not separated into unreliable layers and the flattened photo is not deformed. The existing tactile Quiz animation remains separate.
- Q03's approved scuff/dent pair and Q05's natural-outline/localized-collapse pair are reused for static teaching. Captions remain HTML. Native disclosures reveal closer CSS crops, with a single 240ms opacity/scale entrance; reduced motion removes that animation.
- Stem inspection crops the intact attached stem from the approved Hero. It teaches condition, without stem removal or a made-up abnormal specimen.
- Color remains a typographic statement plus the existing firmness reminder. No color sequence implying reliable ripeness is added.
- Dedicated lazy educational keys reuse existing image files at educational responsive sizes. The original Hero/Quiz asset records and files retain their contracts.

### Independent Game Stage

`QuizConfig.stage = "isolated-game"` is an optional generic capability enabled only for Avocado. Question, evidence and feedback regions reserve minimum space; they can grow for larger content rather than clip it. Completion remains in the same footprint, shows existing takeaways, and offers an explicit Continue ↓ link to Nutrition.

For an active game on a hover-capable fine-pointer device, vertical wheel events originating inside the stage are intentionally inert. A non-passive listener lives only on the section and is cleaned up on completion/unmount; Ctrl+wheel browser zoom is retained. Moving outside immediately restores ordinary page wheel scrolling. Completion releases isolation; Restart reinstates it.

Touchmove is never intercepted, touch-action stays native, and mobile swipes remain available from all controls and images. No keyboard handlers, modal semantics, body lock, internal scroll container or scrollTo compensation are introduced.

This is the user-approved UI-01B exception to the former blanket no-wheel-capture policy. See [interaction specification](INTERACTION_SPEC.md) and [UI-01B evidence](qa/ui-01b/README.md).
# UI-01C — current Avocado refinement

UI-01C supersedes UI-01B's oversized stage geometry. At 1440×900 and 1024×900, the native English Game Stage is 626px tall (69.6% of a 900px viewport). It uses compact progress, a centered 34px question, a 230px specimen image area, adjacent firmness/resistance controls, Choose buttons, and one reserved integrated feedback footer. Wrong feedback and Got it are visible without scrolling when the board is in view. The neutral, wrong, correct and completion states preserve the tested footprint. At 768px the footprint is 678px; phone layout is auto-height with content minima, measuring 700px for approved English content.

Screenshot 3 contributes hierarchy only: clear A/B identity, dominant evidence, nearby controls and a consolidated teaching footer. No baked labels, answer colors or correctness graphics are copied. The initial state remains neutral.

The page uses warm ivory, the game a pale avocado surface, and the footer a slightly deeper related tone. Opaque Q03/Q05 sources sit in intentional specimen wells with softly integrated source margins. The transparent stem crop uses the theme directly. No blend mode, background removal or source-image alteration is used. The approved UI-01B palm-pressure photograph is reused with a warm media edge; hand motion remains static to avoid false deformation. Detail disclosure retains its restrained optional reveal. Color remains a typographic principle and firmness reminder.

The supplied screenshots include browser-injected Chinese; the repository's source copy is English. Preserve external translations. Known translation markup and Chinese language spans receive secondary type hierarchy: headline translation is 18px below the 34px English headline, with compact supporting translations. This is CSS compatibility, not a new translation service or deleted bilingual content.

No horizontal page scrolling: use shrinkable tracks/children and wrapping content, never a root overflow mask. In particular, nutrition values must not force nowrap intrinsic column widths when translation is injected. Validate 1440, 1024, 768, 390 and 360, including translation stress. Desktop stage-local wheel isolation, completion release, native phone swipes and keyboard exit remain the approved UI-01B behavior.

Evidence, iterations and limitations: `docs/qa/ui-01c/README.md`. Scope remains Avocado only; UI-02 and deployment are not part of this node.


### Stem + quiz reference follow-up — 2026-09-30

The current Avocado quiz uses a continuous pale sage board with source-white backgrounds composited via multiply. Equal source geometry and crop centers are preserved. Round letter badges, circular detail lenses, arrows and pale outlined decision cards follow the user's reference. Correct/wrong badges and per-option reasons appear only after answering; both outcomes wait for Got it. The stem lesson has a dedicated native-resolution macro and explicit good-condition/avoid cards, with sources. This supersedes earlier instructions to reuse the hero crop and avoid blend modes for this requested area. See `docs/qa/avocado-stem-quiz/README.md`.


### Compact reading blocks + stem pair — 2026-09-30

Default teaching media heights are bounded by viewport height, not wide-column aspect ratios. Target a complete reading unit in a typical 650px-high laptop content viewport. Use side-by-side normal/avoid stem cards with matched crops. Preserve natural height growth for larger text, translations and expanded detail, without clipping or nested scroll containers. The compact Quiz is 610px on desktop in the tested bilingual flows; phone sizes adapt to readable content. Ordinary-motion compositing needs a sage backdrop inside the animated question layer. See `docs/qa/avocado-compact-pair/README.md`.
