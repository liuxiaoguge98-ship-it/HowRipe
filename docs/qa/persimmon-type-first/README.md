# PERSIMMON-REDESIGN — TYPE FIRST

2026-10-01. **PASS**. Local implementation on `feature/ui-01d-avocado-evidence-clarity`, based on `dff973f`. Scope is `/persimmon`; no redesign of Avocado, Kiwi or Pomegranate, no push/deployment.

## 1. Prior content errors

The previous revision corrected cut-fruit evidence, but still emphasized shopping time over the central variety distinction. The single hero did not explain two types. Repeated identical Hachiya images did not teach the transition to normal soft ripeness. The last quiz question tested buying for later, rather than synthesizing the different meaning of firmness. The old Q04 used Fuyu damage and could not teach normal Hachiya softness versus localized injury.

## 2. Corrected knowledge model

- **Fuyu:** non-astringent, typically flat/squat/squarish-round. Mature color plus healthy structure may be ready while firm and crisp. Slight softening is possible, never a required standard.
- **Hachiya:** astringent, typically elongated/conical/acorn-like. Mature orange color can precede eating readiness. Fresh untreated fruit should become fully ripe and very soft throughout; subtle translucency and jelly-like softness may be normal.
- **Mature versus ready:** two independent HTML paths end at different textures. Fuyu reaches ready at mature color plus firm/crisp; orange firm Hachiya remains at WAIT before its very-soft step.
- **Quality:** uniform whole-fruit softening differs from a collapsed local pocket, significant crack, injury, decay or abnormal leakage. No medical or safety claims, folk tests or pressure measurements.
- **Scope:** common Japanese/Oriental Fuyu and Hachiya; other cultivars may differ. Treatment scope is noted for Hachiya.

## 3. Page and interaction changes

1. H1 retained. Paired whole specimens and English/Chinese direct answer lead the hero.
2. Five Quick Checks: TYPE, SHAPE, FEEL, COLOR, CHECK.
3. **VARIANT LAB:** open side-by-side specimens, astringency labels, strong variety-specific rules, condition criteria and native anchors. Both types remain visible on phones; no tabs.
4. **Two readiness paths:** independent server-rendered ordered lists with visible WAIT/READY labels; no universal Timing Guide or reliance on color alone.
5. **How to Pick:** dedicated firm-ready Fuyu, very-soft-ready Hachiya, normal-soft/damaged Hachiya and color/type/texture comparisons. All show whole fruit.
6. **Don't Overthink:** rejects firm=unripe, soft=bad, orange=ready, one-rule-fits-both.
7. Manual Got it remains mandatory for both feedback outcomes, including the final question. QuizEngine itself did not require changes.

## 4. Final quiz wording and answers

| Question | Exact wording | Answer | Evidence |
|---|---|---|---|
| Q01 | Which one is a Fuyu persimmon? | A | Squat Fuyu versus elongated Hachiya; no variety label in initial image alt text |
| Q02 | You want a crisp persimmon to eat now. Which one would you choose? | A | Both confirmed firm Fuyu; healthy mature specimen versus a significant crack |
| Q03 | Which Hachiya is ready for fresh eating? | B | Orange firm Hachiya versus uniformly very soft ripe Hachiya, with touch descriptions |
| Q04 | Which one shows normal Hachiya ripening rather than localized damage? | A | Same ripe appearance; evenly soft intact fruit versus one localized sunken injury |
| Q05 | Both are firm and mature-colored. Which one is ready to eat now? | A | Clearly identified whole Fuyu versus Hachiya, same stated firmness/condition |

Completion reinforces TYPE, FUYU, HACHIYA, COLOR and DAMAGE. Before answering, no result labels, green/red verdicts or explanatory feedback are rendered.

## 5. Production asset audit

| Asset | Disposition | Reason |
|---|---|---|
| `variants/fuyu.webp` | Reuse in hero/variant/lesson/Q01/Q05 | Clear intact flat/squat Fuyu, mature orange color, full structure |
| `variants/hachiya.webp` | Reuse in hero/variant/Q01/Q03/Q05 | Clear intact acorn-like Hachiya, firm-looking reference |
| `quiz/fuyu.webp` + `quiz/crack.webp` | Reuse as Q02 pair | Same Fuyu type; crack supplies observable poor-condition evidence |
| `variants/hachiya-soft.webp` | Generate from original Hachiya | Normal ripe appearance: subtle even relaxation, luminous skin, no localized injury or rot |
| `variants/hachiya-local-damage.webp` | Edit accepted soft image | Same maturity, identity, camera/light/scale; only one local damaged pocket changes |
| Former single `hero/hero.webp` | Superseded | A generic single specimen cannot introduce both rules |
| Cut-flesh teaching/Q02 assets | Reject for current page | Whole-fruit choosing cannot depend on cutting it first |
| Whole-fruit hand-action teaching photo | Retire from page | Shows technique, but does not supply the required controlled ripeness comparison |
| Old Q03 type/Q04 Fuyu-damage mappings | Replace | Repurposed questions now require Hachiya-specific evidence |

New images are generated with the built-in `image_gen` tool; both are 1122×1402 WebP. [Exact prompts, originals and workspace output paths](prompts.json). Native files were visually inspected, then encoded without semantic post-processing. The soft image is also the unchanged baseline for Q04: equal maturity prevents softness itself being presented as damage. Existing unused files remain historical artifacts, not runtime page references.

The camera and calyx identity remain matched. The global soft-ripe appearance is deliberately restrained; explicit gentle-touch descriptions carry firmness evidence. Q03 does not depict rot, mold, leakage or exposed flesh. Q04's localized sunken patch is visible at phone size.

## 6. Source audit

| Primary source | Supported concepts |
|---|---|
| [UC Davis Fruit & Nut — Persimmon selection](https://fruitsandnuts.ucdavis.edu/persimmon-scion-rooststock-selection) | Flat/squarish-round firm non-astringent Fuyu; oblong/conical Hachiya and loss of astringency at full ripeness |
| [UC Davis Postharvest — Persimmon](https://postharvest.ucdavis.edu/produce-facts-sheets/persimmon) | Cultivar-dependent maturity color, quality without cracks/injury/decay, softening and treatment-dependent astringency |
| [UC ANR — Persimmon harvesting](https://ucanr.edu/node/137200/printable/print) | Firm/crisp Fuyu and jelly-like ripe Hachiya |

Sources reviewed 2026-10-01. The guide does not generalize these two types to all cultivars or chemically deastringed products. Normal ripening versus localized injury is taught through the combined texture and quality criteria, without claiming that an image can establish firmness or detect internal decay.

## 7. Browser QA, accessibility and static HTML

`check.mjs` checks **1440×900**, **390×844** and **390×900 reduced motion**, plus a JavaScript-disabled page. Screenshots cover hero, variant lab, both paths, four lessons, all five questions and their feedback. All images decode; no horizontal overflow or page errors. The final specimen sizing pass increases quiz media and bounds Fuyu lesson whitespace. Native buttons, Enter selection, explicit Got it, completion/restart and stable scroll are verified. [Measured results](results.json).

Final native heights: quiz 610–650px at 1440 and 660–713px at 390; all 15 Got it transitions have zero scroll delta. Variant comparison is 735px desktop / 777px phone; paths 563px / 790px. Four lessons are 416–528px desktop and 518–731px phone. The bilingual hero is 581px desktop / 831px phone. Fuyu source white is blended into cream, matching the rest of the whole-fruit specimens.

Both paths and all core guidance are server-rendered, visible with JavaScript disabled and retained under reduced motion. Single H1 and existing route/SEO/nutrition/source structure remain; description now explains type-first readiness. The new lab uses headings, native links and ordered lists. Photo alternatives describe teaching specimens; quiz pictures remain neutral/decorative while text descriptions supply evidence. Verdicts use words/icons as well as color. No keyboard traps, client-only tabs or new dependencies.

## 8. Automated verification

- `pnpm test`: **78 tests / 22 files passed**.
- `pnpm lint`: passed.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed; all routes statically generated.
- `git diff --check`: passed.
- Focused assertions: variant paths in static HTML; no shared Timing Guide; whole-fruit images; same ripe source reused for Q03 B/Q04 A; distinct local-damage source; A/A/B/A/A key; illustrated Q05; no pre-answer results; keyboard/manual progression and resolving assets.

## 9. Eight-point self-review

1. Distinguish types immediately: paired labeled hero and open specimen lab — yes.
2. Firm Fuyu can be ready: hero, rule, path, lesson, Q02/Q05 — yes.
3. Firm Hachiya should wait: explicit middle WAIT step and Q03 — yes.
4. Very-soft Hachiya can be normal: intact soft specimen and positive Q04 — yes.
5. Normal softness versus damage: same mature baseline with one local injury — yes.
6. Color secondary: maturity/ready distinction and explicit color lesson — yes.
7. Visuals contradict rules: cut flesh and incorrect-type damage pair removed — no contradiction found.
8. Q05 synthesizes type-dependent firmness: same described firmness, different specimens — yes.

## 10. Delivery state

**PASS** for this local redesign. No fail-fast condition was reached: architecture supports independent rules, the required whole-fruit comparisons were achieved, and accessibility/QuizEngine contracts were retained. Final branch/commit and clean Git status are reported with delivery. Remaining limits: source images illustrate ripeness, actual hand-feel still needs touch; browser QA uses emulated phone viewports, not a physical phone or the user's translation extension. No deployment was requested or performed.
