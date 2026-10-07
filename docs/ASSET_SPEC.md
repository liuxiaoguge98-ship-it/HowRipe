# Production fruit assets

## Current — Kiwi quiz scenario illustrations (2026-10-01)

**50 production records**: Avocado 18, Kiwi 13, Pomegranate 10, Persimmon 9. Six new transparent 960×960 WebP scene illustrations in `public/fruits/kiwi/quiz/scenarios/` accompany Q03–Q05. Q03: fridge / bag with apple. Q04: six on counter / two out and four cold. Q05: all together / one now and three later. All fruit remain whole. Images illustrate the stated plan; text supplies firmness. No answer markers are baked into images. Generated via built-in imagegen and encoded with alpha preserved. [Exact prompts](qa/kiwi-quiz-illustrations/prompts.json), [original/output paths and sizes](qa/kiwi-quiz-illustrations/assets.json).

## Previous — Kiwi controlled comparisons (2026-10-01)

**44 production records**: Avocado 18, Kiwi 7, Pomegranate 10, Persimmon 9. Retain Kiwi hero, accurate palm-cradle photograph and neutral whole-fruit master. Built-in imagegen produced `public/fruits/kiwi/education/wrinkles-v2.webp` (1254×1254, 259,414 bytes) and `local-bruise.webp` (1254×1254, 263,906 bytes), each a controlled edit of `quiz/neutral.webp`. Same identity, camera, scale, light and neutral white background; only realistic dehydration or a localized shallow bruise changes. No mold, open wound or giant crater. Production backgrounds blend into the theme.

Earlier wrinkles/scuff/bruise assets remain historical files but are removed from runtime references. Q01 uses identical photos with explicit touch descriptions; Q02 uses neutral/local bruise; Q03–Q05 have no images by design. Storage/batch diagrams are semantic HTML/CSS/SVG with text equivalents. [Asset audit](qa/kiwi-ripening/README.md), [full prompts and paths](qa/kiwi-ripening/prompts.json).

## Previous — Persimmon TYPE-FIRST asset audit (2026-10-01)

Runtime inventory: **46 records** (Avocado 18, Kiwi 9, Pomegranate 10, Persimmon 9). This supersedes historical counts below. Persimmon hero now combines the approved whole Fuyu and Hachiya references. Q02 reuses the intact/cracked Fuyu controlled pair; Q03 compares the original firm-looking whole Hachiya with a new uniformly soft-ripe variant; Q04 reuses that exact soft image against its localized-injury edit. Q01/Q05 use clear whole-variety specimens.

Two built-in imagegen edits were accepted: `public/fruits/persimmon/variants/hachiya-soft.webp` (1122×1402, 118,680 bytes) and `hachiya-local-damage.webp` (1122×1402, 124,024 bytes). Same identity, camera, light, white background and displayed scale; only global ripe appearance and then one localized injury change. White backgrounds blend with the page in every interaction state. No text is baked into photos. Soft fruit has no mold, open flesh, leakage or dark rot. Hand-feel remains described evidence, not a claimed photo measurement.

Cut-flesh images, the former single generic hero and the hand-action photo are not used by this page. Files remain historical artifacts, but their rejected/superseded compositions do not survive in production registry references. Neutral quiz alt text and existing pair contracts are preserved. [Disposition audit, sources and QA](qa/persimmon-type-first/README.md), [full prompts and file paths](qa/persimmon-type-first/prompts.json).

## UI-01B educational additions (historical)

The registry now contains 37 records: the original 31 ASSET-02 contracts, unchanged, plus six Avocado educational keys. One new reference-led palm-pressure WebP is 1200×900 / 124,548 bytes. Five additional lazy educational records reuse the approved Q03, Q05 and Hero files without re-encoding or replacing them. Square teaching comparisons retain 1:1 source framing; the stem uses a 4:3 contain wrapper with a controlled CSS detail crop. These educational aliases request appropriate below-fold responsive resolution while leaving Quiz roles/sizes/accessibility unchanged. See `docs/qa/ui-01b/ASSETS.md` for provenance and prompt.

## ASSET-02 release-candidate contract (historical checkpoint)

The full 55-record necessity/disposition audit, controlled-pair decisions, source provenance, encoded file inventory, and browser QA are in [ASSET_02_AUDIT.md](./ASSET_02_AUDIT.md). The current `fruitAssets` registry has **31 records** (Avocado 11, Kiwi 6, Pomegranate 7, Persimmon 7), all production-backed; the other 24 historical slots were intentionally removed. No development placeholder appears in the four-fruit release candidate. The registry object keys remain the only runtime semantic keys; `FruitAssetKey` is derived with `keyof typeof fruitAssets`. This document and the audit are human-readable records, not a second runtime registry.

Four visual Quiz pairs are newly production-ready: Pomegranate Q02 shape and Q03 damage, and Persimmon Q03 type and Q04 condition; Avocado Q03/Q05 remain as previously approved. Avocado Q01/Q02/Q04 and Kiwi Q01/Q04 use a **single identical neutral production photo within each tactile A/B pair**: the image is substrate, not evidence of firmness. Kiwi Q02/Q03/Q05, Pomegranate Q01/Q04/Q05, and Persimmon Q01/Q02/Q05 now use the bounded plain-text Quiz option capability, with no image slot. Kiwi Timing/pressure/soft-spot sections remain static educational text without an asset slot. No Quiz correctness, fruit business logic, or section layout was added to `FruitAsset`.

## ASSET-02 text-only Quiz inventory change

At the earlier structured-text checkpoint, Persimmon Q05 became TEXT_OPTION; its former `persimmon.quiz.q05.a` and `.b` slots became REMOVE_SLOT / INTENTIONALLY_NO_VISUAL. Neither content nor renderer references them. Inventory at that checkpoint was 53 contracts (Avocado 11, Kiwi 18, Pomegranate 13, Persimmon 11), down from 55. The final ASSET-02 inventory is 31 as recorded above. Plain-text answer evidence belongs to Quiz content, not the asset registry. All remaining pair-validation rules are unchanged.

TypeScript in `src/lib/fruit-assets.ts` is the runtime source of truth. Every key is a registry object key; ASSET-01B replaces a placeholder by setting its existing record to `status: "production"` and adding a local `/fruits/<fruit>/...` derivative. Do not change page content or component callers.

Use transparent masters where appropriate, otherwise white; keep masters outside `public/`. Deliver optimized WebP/AVIF derivatives under `public/fruits/<fruit>/{hero,timing,education,variants,quiz}/` with stable names such as `hero.webp` and `quiz/q01-a.webp`.

Roles: hero (4:5, contain, critical); timing (1:1, contain, lazy); education (4:3, lazy); comparison (1:1, contain, interactive, neutral quiz accessibility); variant (4:5, contain, lazy). Quiz A/B records share pairId, ratio, fit, background policy, fruit, and neutral accessibility. No dark source backgrounds are allowed.

Targets: hero <=300KB (220KB preferred); education/variant <=220KB (160KB preferred); quiz <=160KB (120KB preferred). Hero masters should be 1800–2400px on the long edge; other roles 1400–1800px.

## ASSET-01B Avocado Hero pilot

Only `avocado.hero` is in production for this pilot. Its approved master remains outside the repository at `source-assets/avocado/avocado-hero-approved-master.png`; no master is copied into `public/`. The untouched master is RGBA PNG, 1374×1145, 1,268,854 bytes. Its long edge is below the preferred 1800–2400px source target, so it was not upscaled.

The runtime derivative is `/fruits/avocado/hero/hero.webp`: 916×1145 pixels (exact 4:5), transparent alpha, 181,158 encoded bytes. It was made by trimming only transparent canvas space from the approved RGBA master and encoding WebP; the fruit is neither distorted nor content-cropped. The `avocado.hero` record retains its existing `contain`, `critical`, and `descriptive` contract values, so `FruitAsset` renders it through `next/image` with preload behavior. All ten Avocado Quiz records remain `placeholder` with `neutral-quiz` accessibility.

## ASSET-01C Avocado controlled Quiz pilot

Q01 is `DEFERRED — requires tactile/motion support`. A neutral Q01 Pair Master was created from the approved Hero visual identity and saved outside runtime at `source-assets/avocado/quiz/q01-pair-master.png`. Static product photography cannot show gentle give or timing without a misleading color shortcut, fake deformation, or an answer annotation. Both Q01 records therefore remain atomic `placeholder` records with no source paths.

Q03 is `PASS`. Its source lineage is the neutral Pair Master at `source-assets/avocado/quiz/q03-pair-master.png`, edited separately into `q03-a-source.png` (minor shallow cosmetic scuff) and `q03-b-source.png` (restrained localized soft-looking structural dent). The two edits preserve the same Hass identity, outline, stem, orientation, crop, scale, lighting, pure-white background, and unaffected skin texture. They contain no text, labels, correctness coloring, marks, or annotations.

The accepted runtime pair is `/fruits/avocado/quiz/q03-a.webp` (1024×1024, 82,658 bytes) and `/fruits/avocado/quiz/q03-b.webp` (1024×1024, 84,468 bytes). Both records are production together; their existing comparison role, pairId, 1:1 ratio, `contain` fit, interactive loading, and `neutral-quiz` accessibility are unchanged.

Production-build Chrome QA passed at 1440×900 and 390×844. Q03 renders equal-size side-by-side options (about 354px each at 1440px and 169px each at 390px), has no horizontal overflow or initial-answer leakage, and uses neutral empty image alt text with unchanged Option A/B accessible names. The correct path auto-advances to Q04; the wrong path disables options, presents `Got it`, and advances only after that action. Normal document scrolling and no-page-error checks passed.

## ASSET-01D Avocado Q05 final-pick pair and tactile deferral

Q01 remains `DEFERRED — requires tactile/motion support`. Q02 is `DEFERRED — tactile firmness support required`, and Q04 is `DEFERRED — timing/firmness support required`. No Q01, Q02, or Q04 static candidate was produced: a still image would reduce the intended feel/timing judgment to unreliable color or appearance shortcuts. Their A/B registry pairs remain atomic `placeholder` records with no `src`.

Q05 is `PASS`. Its independent Pair Master is retained outside runtime at `source-assets/avocado/quiz/q05-pair-master.png` (1254×1254 RGB PNG, 1,468,723 bytes). Q05-A is the unaltered controlled duplicate at `q05-a-source.png`; Q05-B at `q05-b-source.png` is a targeted edit from that same Master. The first B candidate was rejected because the variable was too weak to teach. The accepted B has exactly one intended change: a restrained, localized shallow soft pocket on the lower-left outer contour. It retains intact skin and does not use a crater, broken skin, mold, rot, leakage, dramatic discoloration, or a color/ripeness shortcut.

The internal Q05 pair record is `PASS`: same avocado identity, stem, orientation, framing, scale, camera, lighting, pure-white background, and dark ripe Hass family; unaffected texture is preserved. The only intended difference is the shallow localized structural collapse. The pair is deliberately harder than Q03: both images remain plausibly healthy at first glance, and A wins only after a careful comparison for even structure. Review found no text, letters, A/B markers, correctness colors, check/X marks, arrows, circles, callouts, or other baked answer leakage.

The accepted runtime pair is `/fruits/avocado/quiz/q05-a.webp` (1024×1024 RGB, 52,544 bytes) and `/fruits/avocado/quiz/q05-b.webp` (1024×1024 RGB, 49,944 bytes). Both are under the 120KB preferred quiz target, use the existing `comparison` / `1:1` / `contain` / `interactive` / `neutral-quiz` contract, and were atomically switched to production with pair ID `avocado-q05`. They remain lazy-to-interaction assets: no preload is added.

Production-build Chrome QA passed at 1440×900 and 390×844 with ordinary motion. Both Q05 images load through `/_next/image`, preserve the matched 1:1 pair treatment (169×169 each on mobile), retain the same visual family with no crop or background mismatch, and create no horizontal overflow or disruptive layout shift. Initial state remains neutral with only `Option A` and `Option B` accessible names; no semantic key, runtime filename, internal label, or baked answer cue is exposed. Q05-A follows the correct auto-completion path; Q05-B gives the existing wrong-answer feedback and `Got it` continuation; both reach completion. Document scrolling works normally, Q03 still loads its unchanged production pair, and no browser error was recorded.

`INTERACT-01 — Tactile Firmness Support` is a future architecture note only. It may cover Q01, Q02, and Q04 with restrained interactive or micro-motion support; this node implements none of it.

The inventory is the registry: Avocado hero plus q01–q05 A/B; Kiwi hero, four timing, three education, q01–q05 A/B; Pomegranate hero, shape/damage education, q01–q05 A/B; Persimmon hero, Fuyu/Hachiya variants, q01–q05 A/B. Pomegranate intentionally has no timing series.
