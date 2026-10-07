# Avocado Quiz balance — 2026-09-30

## Changes

- More top inset (12→22px desktop, 10→20px phone), thinner outer frame.
- Larger fruit presentation (156→208px at 1366×650; 140→174px phone).
- Compact 44px choice pills; unboxed icon/text outcome explanations.
- Feedback uses a single divider rather than a large nested panel. Firmness callout stays visible.

## Hover root cause and verification

The global option hover transform created a compositing boundary around the transparent option. Its multiply-blended photographic child then exposed the white source background. Scoped removal of parent transform/animation preserves blending in hover, active and result states. Button color still signals hover.

Q03 actual Chrome hover before fix: 133 near-white pixels at rest, 20,377 on hover. Removing only the parent transform restored 133. After production rebuild, both Q03 and Q05 measured 133 at rest and 133 on hover. See before/after screenshots; the one-off `hover.mjs` probe remains only in the historical archive; Q05 machine results are saved in `after-q5-hover.json`. Counts include small white badge details, and apply to the captured option area.

## Layout and interaction QA

Installed Chrome, production build on port 3107:

| Viewport | Text | Stage height range |
| --- | --- | --- |
| 1366×650 | English | 610px |
| 1366×650 | Injected Chinese + English | 610–620px |
| 390×844 | Injected Chinese + English | 660–789px |
| 360×800 | English, reduced motion | 660–666px |

All five questions completed in each scenario. Correct feedback remains visible until Got it; all 20 transitions had zero scroll delta. No horizontal overflow or application page errors. Screenshots reviewed for desktop initial/result and phone bilingual result. Translation fixture is layout stress testing, not certification of a specific browser extension or physical device.

69 tests / 21 files passed; lint, TypeScript and production build passed. Only Avocado-scoped CSS changed in the product. Quiz logic, assets and other fruit pages are unchanged.
