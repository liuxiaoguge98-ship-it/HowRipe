# UI-01D evidence audit — before implementation

Baseline: UI-01C baf89cec32b29548fea772de4f254e0c38ec1ba8. Source pairs reviewed at full 1024 × 1024 resolution before edits. Ratings are internal design judgments, not user research.

| Question | Intended medium/evidence | Current clarity | Problem / honesty | Proposed change |
|---|---|---|---|---|
| Q01 | Tactile: ripe A vs very firm B | 2/5 | Identical static specimens are honest; 0.988 vs 0.998 compression and small dots are hard to notice. No excessive clue. | Opt-in compression, lateral/contact shadow cue, neutral numeric Resistance after checking. |
| Q02 | Tactile: very firm A vs ripe B | 2/5 | Same honest evidence, reversed answers. Users may not understand what changed. | Same treatment as Q01, no static image differences. |
| Q03 | Visual: cosmetic scuff A vs localized depression B | 2/5 | Approved image difference exists around lower-left surface, but small rendered image hides depth. Neither side should be made prettier. | Identical always-visible 3.6× detail crop centered at source (360,700) plus whole specimen. |
| Q04 | Tactile: beginning-to-soften A vs ripe B | 2/5 | Smaller firmness contrast is appropriate, but .994 vs .988 is nearly invisible. | Distinct 3/4 vs 2/4 Resistance, restrained .988 vs .978 compression. |
| Q05 | Visual: intact A vs subtle collapse B | 2/5 | Honest, deliberately difficult pair. Left contour change is hard to discover at current scale. | Identical crop including outside silhouette, centered at (325,690), 3.6×; retain subtle approved pair. |

Correct answers remain A/B/A/A/A. No new factual copy or pre-answer ripeness/damage labels. Both image pairs remain production/production at identical quality. UI-01C wheel isolation is explicitly revoked by UI-01D.

## Final visual review

Ratings are internal assessments at 1440 × 900 and 390 × 844. Tactile visual-difference scores refer to checked evidence (motion plus persistent indicator), not static fruit appearance.

| Question | Clarity | Fairness | Visual difference | Answer leakage | Result |
|---|---:|---:|---:|---|---|
| Q01 | 4 | 5 | 4 | PASS | Gentle give and 2/4 vs 4/4 are clear after Check; identical initial substrate retained. |
| Q02 | 4 | 5 | 4 | PASS | Reversed firmness evidence uses exactly the same treatment; neither position privileged. |
| Q03 | 4 | 5 | 4 | PASS | Circular details expose shallow surface marking vs a visible localized depression. |
| Q04 | 4 | 5 | 4 | PASS | 3/4 vs 2/4 is readable without motion; modest deformation difference stays restrained. |
| Q05 | 4 | 4 | 3 | PASS | Both look plausible initially; close comparison shows the lower-left contour concern. Deliberately harder than Q03. |

### First-pass critique and second-pass changes

1. Native page scrolling restored: deleted wheel listener, no replacement listener or body lock.
2. Tactile: values now persistent and readable; 640ms compression plus contact shadow adds a gentle physical metaphor. This is an educational simulation, not a physical measurement.
3. Q03: correct source region visible, but initial lens was clipped by the old direct-child overflow selector. Corrected specificity, then reviewed full lenses again.
4. Q05: same clipping corrected; source crop includes white exterior and contour, so its subtle indentation can be compared. No image regeneration or artificial damage.
5. Fairness: A/B share dimensions, crop coordinates, zoom, optimizer sizes, background, label and position within each half. No semantic asset keys, ripeness labels or correctness colors added before selection.
6. Media: two white rectangles are integrated into one near-white specimen surface, with subtle neutral edge treatment and no blend mode.
7. Compactness: first pass varied between 644–652px desktop / 704–720px mobile. Removed extra vertical specimen padding and reserved matching evidence rows; final native heights remain 626px / 720px across questions and completion.
8. Got it: remains inside reserved footer and within viewport when stage is aligned near top; all 25 native transitions have zero scroll, top or height delta.
9. Bilingual: existing English-primary/Chinese-secondary rules preserved. Translation stress grows naturally to ~658px desktop and ~752px phone for long feedback. No clipping or horizontal overflow.
10. Mobile: paired options remain adjacent; 82px detail lenses and 44px controls retain simultaneous comparison. Desktop lens is 116px.

Remaining review limits: no physical phone tested; translation test uses controlled extension-like markup, not the user's installed extension. Ratings await the user's visual judgment, especially Q05's intended difficulty. No known implementation blocker remains.
