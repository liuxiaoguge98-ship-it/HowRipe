# Compact Avocado lessons + healthy/damaged stem pair

2026-09-30, user follow-up. Preview: http://localhost:3107/avocado?v=compact-lessons#stem.

## Changes

- Added an AI-edited abnormal stem macro with localized collapse, dark decay and visible mold, paired with the healthy source at the same angle. Two side-by-side cards now connect each image directly to its selection guidance. Both are marked as illustrative examples; ordinary brown stem color is not treated as spoilage.
- New production asset `public/fruits/avocado/education/stem-damage.webp`, native 1254×1254. Registry now has 38 entries, including 18 Avocado entries. [Generation prompt and master](GENERATION.md).
- Reviewed the complete page's individual reading blocks. Reduced hero, heading, card padding and section gaps; bounded teaching media by viewport height rather than letting square media grow with wide columns. Shape and surface comparison photographs now have consistent restrained heights. Expanded inspection remains available via its existing disclosure.
- Stem uses shallow desktop macro crops with the full stem button visible, and compact side-by-side cards on phones. The text was shortened while retaining selection criteria and the palm-pressure ripeness check.
- Quiz media, heading, answer panels, progress badge and footer were reduced. Both correct and wrong answers still require Got it. Per-option explanations and independent firmness checks remain.
- Reproduced the normal-motion white-background issue: the question animation creates an isolated compositing layer. Providing the sage surface inside that layer preserves the blend during normal animation as well as reduced motion.
- Corrected translation styles so translated labels do not inherit icon-circle dimensions or warning backgrounds. Teaching-title translations sit on a subordinate line.

## Measured browser results

Real headless Chrome, including default motion (not just reduced-motion tests). Heights are CSS pixels. “Bilingual” is controlled Chinese translation injection, not certification of an installed extension.

| Viewport | Copy | Shape | Stem | Quiz incl. feedback |
|---|---|---:|---:|---:|
| 1440×720 | English | 476 | 484 | 610 |
| 1440×720 | Bilingual | 521 | 567 | 610 |
| 1366×650 | Bilingual | 500 | 548 | 610 |
| 1024×768 | Bilingual | 535 | 635 | 610–616 |
| 390×844 | English | 413 | 561 | 660–670 |
| 390×844 | Bilingual | 488 | 741 | 660–781 |

At 1366×650, every measured default reading block is at most 610px. At 390×844, default blocks and all tested quiz states remain below the viewport height. These are natural minimum heights, not clipping: longer translations, enlarged text and expanded detail disclosures can grow.

## Verification

- 69 tests / 21 files, lint, TypeScript, production build and diff-check pass.
- Six viewport/language/motion scenarios; full five-question incorrect-answer flow to completion. All 30 Got it transitions preserve document scroll position. No horizontal overflow or JS errors.
- Visual inspection of ordinary animation, bilingual stem captions, complete macro crops, shape pair, pressure guide and question/result views.
- `check.mjs` and `results.json` record all measured page sections, quiz state heights, errors and scroll deltas. PNGs show native and injected bilingual views.
- Generated master: `stem-damage-original.png`; generation used the built-in imagegen tool. Sharp only encoded the image to WebP without upscaling.
