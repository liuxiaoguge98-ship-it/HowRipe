# Avocado stem lesson and reference-style interaction board

2026-09-30. User-authorized follow-up to the green study page. Local preview: http://localhost:3107/avocado?v=stem-study#quiz.

## Delivered

- Dedicated generated macro of the intact Hass stem, replacing a 3.3× CSS enlargement of the hero. Native image is **1254×1254**; no upscaling. The source PNG is saved as `stem-macro-original.png`; optimized production WebP is `public/fruits/avocado/education/stem-macro.webp` (about 368 KiB). Caption identifies it as an illustrative example. No embedded text.
- Full-width stem lesson has the macro beside **Look for / Avoid** cards. Copy distinguishes intact surrounding skin from wounds, shriveling, mushiness, visible mold and suspicious spreading lesions. It separates stem condition from palm-pressure ripeness assessment. Metadata, source list and alt text updated.
- Interaction board uses a continuous sage surface, rounded Q badge, large A/B circles, equal detail lenses, curved arrows, outlined rounded answer cards and a rounded teaching footer. White photographic backgrounds are composited into the board with CSS multiply; existing paired source pixels and equal inspection geometry are retained. The native image assets are not transparent exports.
- Both options show their own correct/incorrect status and reason after answering. No reason or answer-specific color is rendered before choosing. Tactile Check firmness stays independently operable. Both outcomes still require Got it, including the last question.
- Scope: Avocado presentation and optional data consumed by the shared components. Other fruit styles and answer timing retained.

## Verification

- 69 tests / 21 files, lint, TypeScript and production build pass.
- Real headless Chrome: native 1440, 768, 390 and 360 widths, five wrong-answer flows, correct-answer waiting, completion and Restart; no JS errors or horizontal overflow. All 20 measured Got it transitions retain scroll position.
- Screenshots include stem, Q01/Q03/Q05 before and after answering for each width.
- Native stage reserves 740px on desktop/tablet and 764px on phones. It can grow with translations or enlarged text; no fixed clipping or internal scrolling.
- Controlled Chinese translation injection at 1440/390/360: no horizontal overflow and all per-option explanations remain inside their controls. This is a fixture, not a test of an installed translation extension.
- Other three fruit pages: five-question flow and Restart passed without browser errors.
- `check.mjs`, `results.json`, `translation.mjs` and `translation-results.json` contain the reproducible checks and measurements.

## Teaching sources

- [UC Davis: Avocado quality and stem-end rot](https://postharvest.ucdavis.edu/produce-facts-sheets/avocado) — physical defects and dark lesions developing from the stem.
- [California Avocado Commission: Selecting ripe avocados](https://californiaavocado.com/how-to/how-to-choose-and-use-an-avocado/) — gentle palm pressure, slight give, avoiding overly soft fruit.
- [California Avocado Commission: FAQs](https://californiaavocado.com/faqs/) — shriveled stem end warrants closer inspection.

The photo is AI-generated teaching imagery, not evidence of a particular specimen's internal condition. The text does not diagnose ripeness from the stem button's color.

## Generation provenance

Built-in `image_gen.imagegen`, **scientific-educational**, generated from text (no input image). Returned source: `exec-49affc68-4328-44fb-9b02-36109752afd9.png`. The prompt requested 2048×2048 or higher; the actual returned native resolution is 1254×1254, recorded above. Sharp was used only to encode the native image as WebP.

### Final prompt

Use case: scientific-educational. Asset type: high-resolution macro photograph for an avocado selection teaching website. Generate a brand new dedicated 2048 x 2048 or higher square photograph, not a magnified low-resolution whole-fruit picture. Extreme macro close-up of the upper shoulder of a healthy Hass avocado, with the small natural tan corky attached stem button near the upper middle at about 40 percent of image height, surrounded by sharply resolved natural dark olive-green pebbled skin. The whole stem button and surrounding intact skin must be in sharp focus, displaying real fine cork grain and irregular skin pores without oversharpening. Stem stays attached; no open hole, no cut, no removed cap. No mold, no wet decay, no collapsed skin. Upper avocado shoulder fills lower 85 percent of frame, gently curves out through both sides and bottom; soft pale warm sage background #eff5e4 in the upper corners. Beautiful realistic soft daylight studio photography, diffused highlights, dark forest and natural olive tones matching a calm rounded green educational website. No text, arrows, annotations, graphics, hands or additional fruits. This is a representative visual teaching example, not a diagnostic scan.
