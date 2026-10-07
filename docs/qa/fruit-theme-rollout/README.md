# UI-02 — Fruit theme rollout

2026-09-30. **Implementation PASS; ready for user visual review.**

Branch: `feature/ui-01d-avocado-evidence-clarity`. Continued from the user's approved Avocado revision `2f865ca`, rather than the superseded early UI-01 branch. The latest approved rounded/compact style and manual Got it flow supersede the older UI-02 serif/auto-advance requirements.

## Shared presentation

- Seven theme roles cover page, surface, wash, line, accent, ink and muted text. Existing Avocado values remain the fallback; its approved hero screenshot is pixel-identical.
- Fruit themes are composed through CSS Modules. Generic components contain no fruit-specific layout branch.
- All three pages have numbered checks, deliberate lesson layouts, large photographic evidence, compact Quiz, five-column desktop nutrition, responsive FAQ and illustrated related navigation.
- The themed page disables browser scroll anchoring so switching between differently sized photo/text questions does not pull the document toward the section below. No scroll events are intercepted.
- Text questions have readable A/B cards rather than empty image slots. Both text and image questions reveal each option's conclusion and explanation only after selection.
- Correct and wrong answers both wait for Got it, including the final question. Kiwi's existing firmness controls and level mappings are preserved. Images, answer keys, nutrition, sources and routes are unchanged.
- Text controls retain their option text and result explanations in accessible descriptions; native buttons, details, live feedback and reduced-motion behavior remain available.

## Before / first pass / refinement

The `before-*` screenshots were reconstructed from the exact previous commit `2f865ca` in a temporary directory on port 3108. They were captured after implementation began and are an honest reference to the previous pages, not contemporaneous pre-edit captures.

| Fruit | Previous issues | Adaptation | Second-pass correction |
| --- | --- | --- | --- |
| Kiwi | Default component layout, white image wells, lone wrinkle image, no shared compact stage | Warm natural palette with flesh-green actions; plump/wrinkled comparison; clear pressure and soft-pocket checks; timing retained | Removed visible hero background rectangle; compacted feature copy; separated translated text from English |
| Pomegranate | Single shape/damage photos; default hierarchy; no per-choice result explanation | Ruby/rose identity; angular/round and intact/cracked pairs; weight guidance; no ripening timeline | Tightened the text-heavy weight lesson; separated brand red from green/red correctness icons; balanced five nutrition metrics |
| Persimmon | Oversized default variety cards; one shared texture rule could dominate visually | Orange/cream identity; Fuyu/Hachiya remain a distinct paired lesson; explicit contrasting texture instructions; damage pair | Bounded variety image height, enlarged fruit within it, reduced padding; compact bilingual text questions |

Visual self-review: all three belong to the approved design family while preserving their own teaching model. Existing images are used as evidence. No new image or UI/animation/font dependency was added. The hero-background issue found in the first pass is fixed. Correctness is never conveyed by color alone.

## Browser coverage

- Production Chrome, all three pages at 1366×650 and 390×844, normal motion: all 30 questions/acknowledgements, both answer outcomes, two explanations, completion, Restart, no page errors or horizontal overflow.
- 1024×768 normal motion and 360×800 reduced motion with injected Chinese layout stress: all 30 acknowledgements had zero scroll delta. Visual-choice hover white-pixel counts were unchanged.
- Four-route final smoke at 1440×1000 normal and 390×844 reduced motion: one H1, decoded images, neutral Quiz start, keyboard Enter, Got it, native FAQ toggle, related links, no nested buttons, no horizontal overflow or page errors. See `routes-results.json`.
- Avocado: approved 1366px hero matches the prior screenshot byte-for-byte after pixel decoding; no factual/style redesign applied to it.
- The approved Avocado page has an existing −6px offset in one 390px keyboard/focus flow. A side-by-side run on the archived baseline and final build reproduced exactly −6px on both. The approved page was preserved; the baseline offset is recorded rather than presented as a new zero-scroll result.

| Page | Native desktop Quiz | Native phone Quiz | Bilingual 360px maximum |
| --- | --- | --- | --- |
| Kiwi | 510–610px | 610–666px | 831px |
| Pomegranate | 510–610px | 610–660px | 792px |
| Persimmon | 510–610px | 610–660px | 775px |

At 360×800, Kiwi's longest bilingual text question grows 31px past the viewport. Content stays readable with normal document scrolling and no clipping. The fixture adds Chinese text; it is not a test of an installed translation extension or a physical device.

## Verification and delivery

- 72 tests / 22 files pass. Updated obsolete auto-advance/opt-in tests and added all-three-fruit text result/acknowledgement coverage.
- Lint, TypeScript, production build and `git diff --check` pass.
- Static educational content stays server rendered. H1/SEO intent, canonical/robots/sitemap and all source links are unchanged.
- All new styling and QA evidence are committed locally. No merge, push or deployment.
- Recommendation: the four-fruit design is ready for a preview deployment after the user reviews these three new page themes; no automatic deployment was performed.

## Historical local preview

These links require the development server used for the recorded QA run.

- [Kiwi](http://localhost:3107/kiwi?v=fruit-themes)
- [Pomegranate](http://localhost:3107/pomegranate?v=fruit-themes)
- [Persimmon](http://localhost:3107/persimmon?v=fruit-themes)

[Communication summary and design rules](../../FRUIT_UI_SYSTEM.md)
