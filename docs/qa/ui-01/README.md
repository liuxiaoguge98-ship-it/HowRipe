# UI-01 — Avocado Editorial Interaction Redesign

**Result: PASS.** Local presentation work completed 2026-09-29. No merge, push, deployment or automatic propagation.

- Branch: `feature/ui-01-avocado-editorial-redesign`
- Base: `0b3fca52f9d3eeafd9d6ecce21913b696c9446e7` on the verified DEV-12 / ASSET-02 / INTERACT-01 lineage.
- Worktree: `<historical-worktree>`; clean at creation, before baseline capture.
- Browser: installed Google Chrome 153.0.8010.53 through externally installed Playwright. No project dependency added.
- Baseline and final use a production build. Pass 1 used the development server; its Next development indicator is visible in some evidence.

## Baseline evidence and problems

Baseline captured before product edits at 1440×1000 and 390×844. Full pages plus Hero, Timing, Picking, Quiz and Nutrition are in `baseline/`.

1. The Hero fruit sat in a colored bordered rectangle; image presentation resembled a catalog thumbnail.
2. Quick Checks lacked numbering and a clear reading rhythm.
3. Timing appeared as four unrelated bordered boxes.
4. Six identical Picking rows flattened the teaching hierarchy.
5. Quiz began without a coherent stage, with weak question hierarchy and visually similar utility/answer actions.
6. Blank Resistance slots read as accidental spacing; Nutrition values were small; related links were tiny chips.

## Screenshots

| Evidence | Desktop | Mobile |
| --- | --- | --- |
| Baseline | [1440 full](baseline/1440-full.png) | [390 full](baseline/390-full.png) |
| Pass 1 | [1440 full](pass-1/1440-full.png) | [390 full](pass-1/390-full.png) |
| Final | [1440 full](final/1440-full.png) | [390 full](final/390-full.png) |
| Hero | [1440](final/1440-hero.png) | [390](final/390-hero.png) |
| Timing | [1440](final/1440-timing.png) | [390](final/390-timing.png) |
| Picking | [1440](final/1440-picking.png) | [390](final/390-picking.png) |
| Lab | [1440](final/1440-quiz.png) | [390](final/390-quiz.png) |
| Resistance | [1440](final/1440-resistance.png) | [390](final/390-resistance.png) |
| Long Q04 | [1440](final/1440-q04.png) | [390](final/390-q04.png) |
| Static Q05 pair | [1440](final/1440-q05.png) | [390](final/390-q05.png) |
| Wrong feedback | [1440](final/1440-wrong-feedback.png) | [390](final/390-wrong-feedback.png) |
| Nutrition | [1440](final/1440-nutrition.png) | [390](final/390-nutrition.png) |

Additional screenshots cover keyboard focus, correct feedback and completion. Full screenshots and focused regions were opened and visually reviewed; overflow assertions were not used as a substitute for visual review.

## Ten-point self-critique and second pass

| Criterion | Pass-1 judgment / final action |
| --- | --- |
| Premium editorial Hero? | Yes: large two-line desktop headline and unframed fruit. Mobile preserves a confident three-line title and full fruit. |
| Quick Checks still cards? | No: numbers, open columns and thin rules; mobile has a deliberate two-column index. |
| Timing one system? | Yes: connected stage markers; horizontal on desktop, vertical on mobile. No slider or invented stage images. |
| Picking rhythm? | Yes: large opening, offset timing, comparison against a principle, paired details, dark statement. Teaching remains typography-led because separate approved teaching assets do not exist. |
| Quiz one apparatus? | Mostly in pass 1; a warm-white stage still exposed white photo tiles. Second pass sets the stage to white, reducing visible tile boundaries. |
| Firmness connected to fruit? | Utility sits below each responsive fruit, but the empty measurement slot looked accidental. Second pass adds neutral RESISTANCE / — before measurement, then the unchanged dots. Tightened spacing by 8px without changing timing or mappings. |
| Nutrition typographic? | Yes: large values, labels and rules, with exactly the existing four metrics. |
| Mobile designed? | Yes: vertical Timing, adjusted Picking scale, two simultaneous samples and visual navigation rows. Long Q04 fits in a 627px stage before feedback. |
| Too much chrome? | No repeated rounded cards. Quiz is the only rounded bounded stage; article structure uses rules and tonal fields. |
| More memorable? | Yes: oversized fruit, numbered index, dark color principle and a cohesive light experiment stage create distinct landmarks. |

Second-pass accessibility refinement: the visible Choose A/B decision text now matches its neutral accessible name. Sample groups retain Option A/B; Quiz images retain empty alt text. Screenshot review found the firmness focus outline's top edge was painted under the adjacent fruit; positioning the utility above that layer restores the complete ring. Existing state logic, feedback text and animation values are unchanged.

## Browser QA

See [machine-readable results](browser-results.json).

- 1440×1000 normal motion and 390×844 reduced motion: full Q01–Q05 mixed correct/wrong flows, 1000ms correct advancement, wrong feedback remaining until Got it, control locking, completion and Restart passed.
- Tactile Q01/Q02/Q04: neutral initial state, independent checks, original 2/4, 4/2 and 3/2 Resistance pairs, clearing between questions and Restart passed. Q03/Q05 remain their original static production pairs.
- Keyboard: Check firmness, Choose, Got it, Restart and native FAQ passed with visible focus outlines. Feedback remains `aria-live="polite"`; no nested buttons or correctness-only colors were introduced.
- 390px question stage heights: 592, 579, 527, 627, 541px before answer feedback. Wrong feedback remains in the document flow, with no stage-internal scrolling.
- No horizontal overflow at 320, 390, 640, 768, 1024 or 1440px. No page/console errors in Avocado flow.
- Static HTML with JavaScript disabled: one H1, six Picking H2s, four nutrition values and working native FAQ. Title and description match the approved content.
- Kiwi, Pomegranate and Persimmon: all five Quiz questions, completion/restart and 390px overflow smoke passed. Their 1440px opening screenshots are byte-for-byte identical to baseline PNGs.
- Emulated touch controls and document swipes are recorded separately in the JSON; this does not certify physical iOS/Android hardware.

## Engineering and freeze audit

- `pnpm test`: **18 files / 51 tests PASS**, including two focused presentation opt-in tests. Existing tests were retained unchanged.
- `pnpm lint`: PASS.
- `pnpm exec tsc --noEmit`: PASS after build-generated Next types.
- `pnpm build`: PASS; all fruit pages remain statically prerendered.
- `git diff --check`: PASS.
- All pnpm commands use `pnpm_config_verify_deps_before_run=false` because this isolated worktree reuses the installed node_modules directory.
- No package/lockfile change, new font download, animation library, image generation, asset replacement, asset-registry change, route change or server/client boundary change.
- The scoped CSS source is approximately 18.3KB / 3.3KB gzip. This is a source-size observation, not a field performance benchmark. Related navigation images are lazy; the actual Hero preload contract is untouched.
- Avocado content changes are solely the presentation flag and six layout selections. H1/SEO, educational facts, Quiz answers/feedback, tactile mapping/timing, nutrition and FAQ are unchanged.

## Files and responsibilities

- `src/content/fruits/types.ts`, `avocado.ts`: minimal opt-in and Picking layout selections.
- `src/components/fruit/EditorialLab.module.css`: scoped composition, responsive type, surface rhythm and lab controls.
- `FruitPage.tsx`: apply opt-in and pass presentation options.
- `QuickChecks.tsx`: optional numbers. `PickingGuide.tsx`: existing layout data attribute.
- `TimingGuide.tsx`, `DontOverthink.tsx`, `NutritionSnapshot.tsx`, `FruitFAQ.tsx`: inert section hooks for scoped styling.
- `RelatedFruits.tsx`: optional approved lazy visuals; default text navigation retained.
- `QuizEngine.tsx`, `TactileFirmnessCheck.tsx`: presentation hooks, sample labels, decision label and pending reading only.
- `tests/editorial-presentation.test.tsx`: opt-in/default rendering coverage.
- `docs/UI_DIRECTION.md`, this evidence directory, implementation plan and `PROJECT_STATE.md`: decisions and verification.

## Historical reproduction

The iteration scripts belong to the archived UI-01 implementation and have been removed from this production repository. Retained reports and screenshots describe that historical run. Use the maintained production smoke script described in [repository hygiene](../../REPOSITORY_HYGIENE.md) for the current snapshot.

## Remaining considerations

No blocking visual issue was identified in the reviewed desktop/mobile Chrome screenshots. Physical-device tactile/scroll certification and the existing permanent-domain launch work remain outside UI-01. The four fruit navigation images reuse current art; no custom editorial teaching photography was introduced. Recommend reviewing this Avocado design, then composing each additional fruit in a separate node rather than enabling the flag globally.

## Commits

- `c397518` — `feat: redesign avocado editorial page and interactive lab`
- The following documentation commit records the direction, three screenshot rounds, QA scripts/results and project state. Its final hash is reported in the completion message.
