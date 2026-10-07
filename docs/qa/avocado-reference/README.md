# Avocado reference-inspired visual refresh

User requested analysis and whole-page application of two provided teaching UI references. Based on `00403f3` on `feature/ui-01d-avocado-evidence-clarity`; local preview stays at `http://localhost:3107/avocado`.

## Reference analysis and translation into UI

| Reference characteristic | Application |
|---|---|
| Pale avocado green, cream interiors, dark forest text | Page canvas, Hero note, teaching panels, timing, Quiz, nutrition, FAQ and related navigation share a restrained leaf-green palette. |
| Heavy rounded headings with concise emphasis | Rounded system display-font stack, bold title hierarchy, readable regular body type. No downloaded font dependency. |
| Large real fruit and hand images | Existing approved Hero/hand teaching photos retained, with softly rounded studio surfaces and intact image color. |
| Rounded outlined teaching annotations | Palm guidance receives separate strong lead and supporting copy callouts. Other teaching principles use the same outline/rounding language. |
| Number badges and pill-shaped labels | Quick checks, section numbering, timing labels, Quiz progress, inspection captions and buttons form a coherent family. |
| Green/red result signals | Neutral equal A/B presentation before answering; green selected-correct state and red selected-wrong state after choosing, with explicit result text and symbols. |
| Whole specimen plus close-up detail | Existing controlled Q03/Q05 detail lenses and teaching inspection disclosures preserved. |

### Palette

Colors are design adaptations of the references, not an exact pixel sample.

- Page: `#F8FBF0`
- Main text: `#10371E`
- Secondary text: `#455D43`
- Leaf accent: `#54851C`
- Filled controls: `#46751B`
- Soft surface: `#E9F4D4`
- Incorrect result: `#B33428` on a pale warm-red footer
- Display stack: Arial Rounded MT Bold → Trebuchet MS → Arial → sans-serif

Measured WCAG contrast ratios: white/filled control **5.50:1**, white/error **6.11:1**, main text/page **12.63:1**, secondary text/page **6.91:1**, leaf heading/soft stage **5.32:1**.

## Coverage

Header/footer on the Avocado route, Hero, quick checks, timing guide, all six teaching sections, Don't Overthink, Quiz, nutrition, FAQ and related links were visually reviewed. Styles remain scoped to the editorial page; header/footer overrides require that page to exist. Only Avocado opts in. No Quiz answers, factual copy, assets, crop geometry, route structure or dependencies changed.

Preserved interactions: normal document scrolling, bordered Check firmness, independent Resistance checks, neutral pre-answer evidence, equal detail lenses, manual Got it after both outcomes, final-question acknowledgement, keyboard focus and reduced motion.

## Visual iteration

First pass: reviewed every section at 1440 and 390, and overflow at 1440/1024/768/390/360. Mobile palm-teaching callouts were too close because an inherited block layout removed grid gaps. Second pass restores the explicit grid so title, lead, body and photo have clear separation. Full-flow QA also found a 13px completion-height increase at 360px caused by the new takeaway cards. Reducing their mobile vertical padding restored the stable 722px completion height, confirmed at 1440/390/360 in `states.mjs`. Final screenshots are in `final/`; `first-pass/` preserves the comparison.

Native Quiz heights: 628px at 1440/1024, 680px at 768, 722px at 390/360. A 2px outline adds 2px versus the previous 1px outline. Text may naturally grow. Controlled bilingual fixture has no horizontal overflow at any tested width; long phone feedback grows to ~771px. Translation testing uses extension-like markup, not the user's installed extension.

## Verification artifacts

- `review.mjs`: captures 13 sections plus full page at desktop/phone and checks five widths.
- `final/results.json`: zero document overflow and zero page errors at 1440/1024/768/390/360.
- `flow.mjs` / `browser-results.json`: native scrolling, full Quiz flows, Got it stability, touch emulation, keyboard, reduced motion, other-fruit smoke and static teaching.
- `translation.mjs` / `translation-results.json`: bilingual stress fixture and five screenshots.
- 64 unit tests, lint, TypeScript, production build and diff-check passed. No new snapshot or style-only tests.
- `states.mjs`: final correct/wrong colors, neutral detail crops and completion screenshots at 1440/390/360, with matching initial/completion heights.

Physical devices and non-Chrome browsers were not part of this local verification. Approved source photos remain unchanged. No deployment or UI-02 rollout was performed.

Final browser regression **PASS**: all five widths complete both wrong/manual and correct/manual flows; 25 measured Got it transitions preserve scrollY, stage top and stage height. All desktop wheel origins scroll the document, five emulated-touch origins move normally, Tab/PageDown remain native, and Kiwi/Pomegranate/Persimmon complete their existing flows without errors. No console/page errors were recorded.
