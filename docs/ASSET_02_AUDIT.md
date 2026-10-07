# ASSET-02 release visual audit

Status: **PASS** for the four-fruit release candidate. This is a human-readable audit; `src/lib/fruit-assets.ts` remains the only runtime registry. No JSON/YAML inventory was added. The original ASSET-01A inventory had 55 semantic records (11 Avocado, 18 Kiwi, 13 Pomegranate, 13 Persimmon). The structured-text checkpoint removed Persimmon Q05 A/B (53); this completion retains 31 production-backed records (11 / 6 / 7 / 7) and removes 24 original slots overall. No `status: "placeholder"` record remains.

## Necessity and final disposition of all 55 original records

`{a,b}` expands to two separately counted semantic keys. `REQUIRED_PRODUCTION`, `OPTIONAL_PRODUCTION`, `INTERACTION_FIRST`, and `REMOVE_SLOT` are the Phase 1 necessity decisions. Final `PRODUCTION` means the image itself provides useful visual evidence; final `INTERACTION_FIRST` means the retained, identical A/B production photograph is only a neutral substrate for a user-initiated firmness interaction. `INTENTIONALLY_NO_VISUAL` means the slot was removed from content **and** registry, with educational evidence remaining in text. No `OPTIONAL_DEFERRED` or unfinished placeholder remains.

| Original key(s) | Count | Phase 1 | Final | Reason |
| --- | ---: | --- | --- | --- |
| `avocado.hero` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Approved existing Hero. |
| `avocado.quiz.q01.{a,b}` | 2 | INTERACTION_FIRST | INTERACTION_FIRST | Same neutral Avocado photo; on-demand tactile firmness carries the distinction. |
| `avocado.quiz.q02.{a,b}` | 2 | INTERACTION_FIRST | INTERACTION_FIRST | Same photo, distinct on-demand firmness cues. |
| `avocado.quiz.q03.{a,b}` | 2 | REQUIRED_PRODUCTION | PRODUCTION | Existing controlled scuff / dent pair. |
| `avocado.quiz.q04.{a,b}` | 2 | INTERACTION_FIRST | INTERACTION_FIRST | Same photo; timing/firmness is interactive. |
| `avocado.quiz.q05.{a,b}` | 2 | REQUIRED_PRODUCTION | PRODUCTION | Existing controlled healthy / shallow soft-pocket pair. |
| `kiwi.hero` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Whole green kiwi and cut half communicate fruit identity. |
| `kiwi.ripeness.veryFirm` | 1 | REMOVE_SLOT | INTENTIONALLY_NO_VISUAL | Timing stage text is complete; a still cannot show firmness. |
| `kiwi.ripeness.soon` | 1 | REMOVE_SLOT | INTENTIONALLY_NO_VISUAL | Same. |
| `kiwi.ripeness.today` | 1 | REMOVE_SLOT | INTENTIONALLY_NO_VISUAL | Same. |
| `kiwi.ripeness.tooSoft` | 1 | REMOVE_SLOT | INTENTIONALLY_NO_VISUAL | Same. |
| `kiwi.picking.press` | 1 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Existing section copy teaches gentle pressure; no fake static hand/force cue. |
| `kiwi.picking.softSpot` | 1 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Localized softness is tactile; copy remains. |
| `kiwi.picking.wrinkles` | 1 | OPTIONAL_PRODUCTION | PRODUCTION | A visibly wrinkled surface adds honest visual education. |
| `kiwi.quiz.q01.{a,b}` | 2 | INTERACTION_FIRST | INTERACTION_FIRST | Same neutral whole-kiwi photo; configured generic firmness check. |
| `kiwi.quiz.q02.{a,b}` | 2 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Soft pocket vs cosmetic mark expressed as plain-text choices. |
| `kiwi.quiz.q03.{a,b}` | 2 | REMOVE_SLOT | INTENTIONALLY_NO_VISUAL | Fuzz alone is not ripeness evidence; text states the competing condition. |
| `kiwi.quiz.q04.{a,b}` | 2 | INTERACTION_FIRST | INTERACTION_FIRST | Same neutral photo; timing/firmness uses the existing generic check. |
| `kiwi.quiz.q05.{a,b}` | 2 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Two controlled static B candidates failed the mobile teaching-variable gate; text preserves the intended condition judgment. |
| `pomegranate.hero` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Whole fruit plus cut arils. |
| `pomegranate.picking.shape` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Credibly angular rind. |
| `pomegranate.picking.damage` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Localized meaningful crack. |
| `pomegranate.quiz.q01.{a,b}` | 2 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Same-size weight cannot be photographed honestly; text gives the hand-feel evidence. |
| `pomegranate.quiz.q02.{a,b}` | 2 | REQUIRED_PRODUCTION | PRODUCTION | Controlled angular-vs-round silhouette pair. |
| `pomegranate.quiz.q03.{a,b}` | 2 | REQUIRED_PRODUCTION | PRODUCTION | Controlled intact-vs-cracked rind pair. |
| `pomegranate.quiz.q04.{a,b}` | 2 | REMOVE_SLOT | INTENTIONALLY_NO_VISUAL | Color trap depends on weight and condition; text avoids pretending a photo shows weight. |
| `pomegranate.quiz.q05.{a,b}` | 2 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Final synthesis includes weight; plain text supplies all relevant facts. |
| `persimmon.hero` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Fuyu and Hachiya together. |
| `persimmon.variant.fuyu` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Flat/squat Fuyu source. |
| `persimmon.variant.hachiya` | 1 | REQUIRED_PRODUCTION | PRODUCTION | Oblong/conical Hachiya source. |
| `persimmon.quiz.q01.{a,b}` | 2 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Type-plus-firmness rule is expressed in text, not fabricated tactile imagery. |
| `persimmon.quiz.q02.{a,b}` | 2 | INTERACTION_FIRST | INTENTIONALLY_NO_VISUAL | Hachiya softness is tactile; text choices retain the question. |
| `persimmon.quiz.q03.{a,b}` | 2 | REQUIRED_PRODUCTION | PRODUCTION | Distinct cultivar shapes from a shared two-fruit Hero reference. |
| `persimmon.quiz.q04.{a,b}` | 2 | REQUIRED_PRODUCTION | PRODUCTION | Controlled intact Fuyu / single-crack edit. |
| `persimmon.quiz.q05.{a,b}` | 2 | REMOVE_SLOT | INTENTIONALLY_NO_VISUAL | Already removed at the structured-text checkpoint; Quiz Q05 and answer A remain. |

Totals: 21 visual-evidence production contracts + 10 interaction-first neutral production contracts + 24 intentionally absent contracts = **55 audited**. The 31 retained contracts all have local WebP sources. `FruitAssetKey = keyof typeof fruitAssets` remains strict; a removed semantic key is not a production content key. All retained pairs share production status, pair metadata, 1:1 ratio and neutral Quiz accessibility.

## Source provenance and controlled-pair gate

All new photographs were produced with the built-in image-generation/edit workflow. Selected PNG masters and accepted source edits are preserved outside `public/` in `source-assets/{kiwi,pomegranate,persimmon}/`; the worktree's `source-assets/` is ignored. No existing Avocado master was modified. The three new Hero sources are 1122×1402 PNG—below the preferred 1800–2400px master long-edge target; they were not upscaled merely to satisfy that preference. Their 1080×1350 runtime derivatives are native-detail-preserving 4:5 `contain` encodes. The existing approved Avocado derivative remains unchanged.

Final built-in image prompt set, condensed without changing its constraints: (1) Kiwi Hero — realistic whole fuzzy green kiwifruit beside a cut half, clean premium studio light, transparent background, no decoration or typography; (2) Pomegranate Hero — realistic whole mature rind beside a cut aril half, same studio system and transparency; (3) Persimmon Hero — one flat/squat Fuyu and one oblong/conical Hachiya, same light and transparency; (4) each single-fruit/education source — clean white studio reference with factual texture and only its named visual concept; (5) each controlled edit — change only the stated shape, crack, or wrinkle variable, preserve source identity, stem/calyx, orientation, crop, scale, color family, lighting, background and unaffected skin; no text, labels, feedback colors, arrows or annotations. The accepted Pomegranate Q02 v2 edit additionally required organic angular shoulders and sides legible at ~170px, without geometric exaggeration or a weight cue.

Pair Master and decision log:

| Pair | Master → A/B lineage | Decision | Gate result |
| --- | --- | --- | --- |
| Avocado Q03 | Existing approved Q03 master → cosmetic scuff / restrained structural dent | PASS (previous node) | Same identity, stem, crop, scale, lighting, unaffected texture; no annotations. |
| Avocado Q05 | Existing approved Q05 master → unaltered A / shallow soft-pocket B | PASS (previous node) | Same ripe Hass identity and structure outside intended pocket. |
| Kiwi Q05 | `kiwi/quiz/pair-master.png` → two referenced B edits | REJECT as static pair | Both preserved neutral fruit identity but failed to make a truthful localized pocket legible at mobile scale. No B candidate is shipped; Q05 is text. |
| Pomegranate Q02 | `pomegranate/quiz/pair-master.png` → angular A edit / unaltered round B | PASS for v2; v1 REJECT | First angular edit was too weak at 390px. `q02-angular-v2-source.png` keeps crown, orientation, scale, color, light, background and texture family while making broad organic shoulder/side angles legible at ~170px. No color or weight shortcut. |
| Pomegranate Q03 | Same neutral Pomegranate master → unaltered intact A / localized crack B | PASS | Same fruit identity, crown, framing, light and background; one structural crack only, no annotation or dramatic decay. |
| Persimmon Fuyu/Hachiya | Shared `persimmon/hero-master.png` two-cultivar reference → individual Fuyu/Hachiya source edits | PASS | Cultivar shape is the deliberate identity difference. Same white studio system, crop/scale family and lighting. Initial Fuyu candidate with baked checkerboard was rejected; accepted edit is pure white. |
| Persimmon Q04 | Accepted Fuyu source as Pair Master → unchanged A / single-crack B | PASS | Same Fuyu, calyx, angle, scale, light, background and unaffected orange rind; visible but restrained crack. |

Every accepted pair has no baked text, A/B, check/X, feedback color, callout, or answer marker. Pair consistency and factual teaching value took priority over single-image polish. Quiz imagery has empty image alt text and neutral Option A/B controls; text choices expose their evidence openly but no correctness feedback before selection.

The three production educational images and two Persimmon variant images have caller-owned, image-specific descriptive alt text (wrinkles, angular sides, structural crack, flat Fuyu, pointed Hachiya). `FruitAsset` remains presentation-only and holds no fruit copy. Quiz pair images intentionally retain empty alt because their A/B controls and question provide the neutral pre-answer context.

## Runtime performance inventory

Each row identifies every production record using that derivative. All files are WebP, served from local `public/fruits/...` through the existing `FruitAsset` → `next/image` boundary. `critical` means exactly one preloaded Hero per route; `lazy` means below-fold; `interactive` means only the current Quiz step mounts the image (never globally eager). Dimensions are encoded pixels; sizes are encoded bytes. Hero target <=300 KB, education/variant <=220 KB, Quiz <=160 KB. Kiwi Hero and neutral Quiz substrate exceed only the *preferred* 220/120 KB thresholds, respectively, not their targets; further quality loss was rejected.

| Runtime path (prefix `/fruits/`) | Production semantic record(s) | Role / loading | Dimensions | Bytes |
| --- | --- | --- | ---: | ---: |
| `avocado/hero/hero.webp` | `avocado.hero` | hero / critical | 916×1145 | 181,158 |
| `avocado/quiz/q03-a.webp` | `avocado.quiz.q03.a` | comparison / interactive | 1024² | 82,658 |
| `avocado/quiz/q03-b.webp` | `avocado.quiz.q03.b` | comparison / interactive | 1024² | 84,468 |
| `avocado/quiz/q05-a.webp` | `avocado.quiz.q01.a`, `avocado.quiz.q01.b`, `avocado.quiz.q02.a`, `avocado.quiz.q02.b`, `avocado.quiz.q04.a`, `avocado.quiz.q04.b`, `avocado.quiz.q05.a` | comparison / interactive | 1024² | 52,544 |
| `avocado/quiz/q05-b.webp` | `avocado.quiz.q05.b` | comparison / interactive | 1024² | 49,944 |
| `kiwi/hero/hero.webp` | `kiwi.hero` | hero / critical | 1080×1350 | 250,948 |
| `kiwi/education/wrinkles.webp` | `kiwi.picking.wrinkles` | education / lazy | 960×720 | 86,480 |
| `kiwi/quiz/neutral.webp` | `kiwi.quiz.q01.a`, `kiwi.quiz.q01.b`, `kiwi.quiz.q04.a`, `kiwi.quiz.q04.b` | comparison / interactive | 960² | 133,232 |
| `pomegranate/hero/hero.webp` | `pomegranate.hero` | hero / critical | 1080×1350 | 218,382 |
| `pomegranate/education/shape-v2.webp` | `pomegranate.picking.shape` | education / lazy | 960×720 | 64,662 |
| `pomegranate/education/damage.webp` | `pomegranate.picking.damage` | education / lazy | 960×720 | 65,018 |
| `pomegranate/quiz/angular-v2.webp` | `pomegranate.quiz.q02.a` | comparison / interactive | 960² | 106,618 |
| `pomegranate/quiz/neutral.webp` | `pomegranate.quiz.q02.b`, `pomegranate.quiz.q03.a` | comparison / interactive | 960² | 115,934 |
| `pomegranate/quiz/crack.webp` | `pomegranate.quiz.q03.b` | comparison / interactive | 960² | 106,160 |
| `persimmon/hero/hero.webp` | `persimmon.hero` | hero / critical | 1080×1350 | 110,102 |
| `persimmon/variants/fuyu.webp` | `persimmon.variant.fuyu` | variant / lazy | 1080×1350 | 66,554 |
| `persimmon/variants/hachiya.webp` | `persimmon.variant.hachiya` | variant / lazy | 1080×1350 | 68,686 |
| `persimmon/quiz/fuyu.webp` | `persimmon.quiz.q03.a`, `persimmon.quiz.q04.a` | comparison / interactive | 960² | 39,670 |
| `persimmon/quiz/hachiya.webp` | `persimmon.quiz.q03.b` | comparison / interactive | 960² | 39,734 |
| `persimmon/quiz/crack.webp` | `persimmon.quiz.q04.b` | comparison / interactive | 960² | 39,358 |

No PNG source master is served from `public/`; no new runtime dependency or route architecture was added. The one-off encoder reused an already installed Sharp transitive package without changing `package.json` or the lockfile.

## Browser and automated QA

Production-build installed Google Chrome/Playwright on 2026-09-28: all four routes returned 200 at 1440×900 normal motion and 390×844 actual `prefers-reduced-motion: reduce`. Every route had exactly one Hero image preload and a 4:5 loaded Hero; all educational/variant images loaded in their 4:3/4:5 boxes and were lazy; all five Quiz questions reached completion with correct answers, initial A/B state was neutral, no development placeholder or internal semantic key/legacy label appeared, no horizontal overflow or browser page/HTTP error occurred. Pomegranate Q02/Q03 and Persimmon Q03/Q04 were also visually reviewed as ~170px mobile A/B pairs after controlled edits. Reduced-motion Hero animation was suppressed. A separate 390px JavaScript-disabled Persimmon check retained Hero, variant, Quick Checks, How to Pick, Nutrition, FAQ and Sources with no overflow. This browser check does not replace the existing open physical-device touch/swipe Release QA items.

Automated gates: `pnpm test`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, and `git diff --check`; exact final result and commit are recorded in `PROJECT_STATE.md` after closure.
