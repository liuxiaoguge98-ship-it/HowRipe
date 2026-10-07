# KIWI-REDESIGN — readiness and ripening control

2026-10-01 · **PASS** · Local implementation on `feature/ui-01d-avocado-evidence-clarity`, based on `66da104`. Scope: green / fuzzy Kiwi. The other fruit pages retain their approved content and design.

> Follow-up: the later user request adds illustrations to Q03–Q05. The original text-only decision below is historical. See [current quiz image audit](../kiwi-quiz-illustrations/README.md).

## Content decisions

The old page mainly repeated firmness and localized-damage choices. FUZZ occupied a Quick Check, four timing stages mixed readiness with calendar intent, and the quiz did not teach ripening speed or batch control. Storage and excess ripe-fruit rescue were absent.

The new household model is:

- **VERY FIRM → NOT YET:** almost no give; counter to ripen, fridge to hold.
- **SLIGHT GIVE → READY:** plump, slight even give, still structured, not mushy; eat or refrigerate.
- **VERY SOFT → EAT SOON / CHECK:** inspect for localized breakdown, bruising and excessive shriveling. Only prioritize while still in good condition; soft is not automatically rotten.

Hero retains the search-intent H1 and explains the three states, with a Chinese direct answer and explicit green/fuzzy scope. The Chinese final sentence was clarified to require inspection before prioritizing mushy or locally soft fruit. Gold is not generalized. Quick Checks are PRESS, PLUMP, CHECK, PLAN, STORE.

### Eight teaching sections

1. Press gently — existing accurate palm-cradle photograph; light even broad contact, no thumb poking or hard squeezing.
2. Look for a plump kiwi — full, intact whole specimen; plumpness does not establish firmness.
3. Watch for localized soft spots — controlled healthy/local-bruise pair, with actual softness requiring touch.
4. Check for wrinkling / shriveling — controlled full/shriveled pair, without implying rot.
5. Don't judge the fuzz — strong editorial statement; firmness, plumpness and condition matter.
6. Pick for your timing — ready fruit tonight plus firmer fruit later, checked by feel daily.
7. Control the ripening — three open editorial columns with small inline diagrams: fridge, counter, paper bag + apple/banana.
8. Too many ripe at once? — counter/fridge illustration and a five-step rescue sequence.

### Storage and batch workflow

Cold slows further ripening and softening; it does not stop them. Separate stored kiwi from apples/bananas when slowing it down. A small counter batch ripens normally out of direct sunlight. For faster ripening, put firm kiwi in a paper bag with an apple/banana at room temperature; their ethylene helps. Check daily rather than promising an exact day count.

The 2–3-out/rest-cold example is a practical implementation of staged household ripening, not a scientific quantity rule. When the counter fruit is nearly ready, bring out the next small batch. Rescue: sort very soft/ready/firm → eat the softest sound fruit first → refrigerate ripe fruit → keep firm fruit cold until wanted → peel/cut and freeze sound ripe excess for blended uses. Thawed texture is softer. Cut fruit storage appears concisely in the FAQ.

## Final quiz

| # | Exact question | Evidence | Answer |
|---|---|---|---|
| 01 | Which kiwi would you eat today? | Tactile; identical neutral photos, independent Check firmness controls | A |
| 02 | Which kiwi should you avoid buying? | Visual; controlled local-bruise comparison | B |
| 03 | You want this firm kiwi ready sooner. What should you do? | Text: fridge versus room temperature with apple/banana | B |
| 04 | Six kiwi are almost ripe, but you can only eat two soon. What's the better plan? | Text: all on counter versus refrigerating the extra fruit | B |
| 05 | You want one kiwi tonight and several for later. Which shopping plan is better? | Text: all very soft versus ready + firmer fruit | B |

Q02 deliberately preserves the user's earlier request for unambiguous **avoid buying**, rather than reintroducing “leave behind” from the brief. Feedback explicitly distinguishes the correct answer from the fruit to purchase. Q03–Q05 have no photo slots or decorative fruit fillers. Q01 checked evidence uses **Slight give · still holds its shape** and **Very firm · almost no give**, not a numerical pressure scale. Both results require Got it, including the final question. The state model is unchanged. Optional descriptive touch props leave other fruits' existing behavior intact.

## Asset audit

| Asset | Decision |
|---|---|
| Existing hero | Reuse to identify green kiwifruit; the cut half identifies flesh, never supplies pre-purchase quiz evidence |
| Existing palm-pressure scene | Reuse; broad relaxed cradle, no fingertip poke or exaggerated deformation |
| `quiz/neutral.webp` | Pair master, plump teaching specimen, Q01 tactile substrate and Q02 A |
| `education/wrinkles-v2.webp` | New controlled edit of neutral master; 1254×1254, 259,414 bytes |
| `education/local-bruise.webp` | New controlled edit of neutral master; 1254×1254, 263,906 bytes |
| Earlier wrinkles / scuff / bruise photos | Retire from runtime; original files retained as historical work |
| Former Kiwi Q04 photo contracts | Remove; batch-control Q04 is intentionally text |
| Storage/batch graphics | Small HTML/CSS/SVG diagrams; no AI lifestyle photos or inventory-management feature |

Built-in `image_gen` was used for the two edits. [Full prompts, source and generated paths](prompts.json). Both preserve the same stem, identity, orientation, camera, light, scale and white background; the production UI blends white into the fruit theme. Shriveling has no rot/mold; localized damage is a restrained shallow depression, not an open wound or giant crater. No text or verdict is baked into either image. The registry has **44 production records**: Avocado 18, Kiwi 7, Pomegranate 10, Persimmon 9.

## Source audit

Reviewed 2026-10-01; the sources could be read successfully. There was no material conflict in the basic storage model. Exact storage durations vary between source pages and are intentionally not presented as guarantees.

- [UC Davis — Kiwifruit](https://postharvest.ucdavis.edu/produce-facts-sheets/kiwifruit): physical quality, cold storage and high ethylene sensitivity. Commercial concentrations, pressure values and controlled-atmosphere settings are excluded.
- [Utah State Extension — Kiwifruit](https://extension.usu.edu/fscreate/files/handoutFFruitsKiwiHandout.pdf): plump, slightly soft ripe fruit, bruising checks and post-purchase room-temperature ripening.
- [Zespri FAQ](https://www.zespri.com/en-NZ/corporate-information/faqs): gentle give, soft spots/wrinkles, paper bag with apple/banana, larger batches refrigerated and small amounts brought out of direct sunlight, Gold differences.
- [Zespri — How do I ripen kiwi fruit?](https://www.zespri.com/en-US/blogdetail/how-do-i-ripen-kiwifruit): practical ripening and cold storage of larger quantities.
- [Zespri — Storage and freezing](https://www.zespri.com/en-US/blogdetail/how-to-store-kiwi-fruit-for-freshness-and-flavor): prepared sliced/chopped fruit frozen on a tray then packed; smoothies/frozen uses, softer thawed texture and refrigerated covered cut fruit. Promotional acceleration percentages and rigid times omitted.

## QA and verification

See [browser script](check.mjs), [measurements](results.json) and neighboring screenshots. Coverage: 1440×900, 390×844, 390×900 reduced motion and JavaScript-disabled static content. Each quiz cycle checks tactile descriptions, honest image counts, no pre-answer verdicts, positive/negative feedback, manual Got it, keyboard selection, completion/restart and scroll position. No page errors or horizontal overflow.

The ripeness system, all eight lessons, storage/batch instructions, FAQ and sources are available in server-rendered HTML. H1, route and primary search intent remain. Existing metadata/structured-data generation is retained. Native buttons and links, accessible names, live touch descriptions and visible text/icon verdicts are preserved; inline diagrams are decorative and have equivalent HTML explanations. Reduced motion removes animation without removing knowledge. No new dependency or state machine.

All automated gates passed: **81 tests / 22 files**, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` and `git diff --check`. Production build statically generates all existing routes.

Final measured heights (native English with bilingual hero):

| Module | 1440px | 390px |
|---|---:|---:|
| Hero | 588px | 808px |
| Three feel stages | 483px | 711px |
| Six picking lessons | 252–510px | 324–637px |
| Ripening control | 538px | 786px |
| Batch diagram + five-step rescue + CTA | 667px | 839px |
| Quiz including feedback | 600–616px | 660–720px |

All tested modules fit the 900px desktop / 844px phone viewport individually. All 15 Got it transitions had zero scroll delta. A final targeted layout pass (`final-layout.mjs`) verifies the batch module after shortening its duplicated introduction. Screenshots were captured after entry animations settled; visual inspection confirmed the palm demonstration, realistic shriveled/bruise evidence, transparent-looking interaction backgrounds, and clear intentionally text-only options.

## Nine-point self-review

1. Ready now? Slight give, plump and structured, stated in hero/system/lesson/Q01.
2. Normal ripening versus damage? Even softness distinguished from one damaged pocket.
3. Speed up? Paper bag + apple/banana at room temperature.
4. Slow down? Fridge and ethylene separation, no claim of stopping.
5. Whole box ripening? Five-step rescue workflow.
6. Stagger the batch? Explicit 2–3 counter/rest cold diagram and next-batch arrow.
7. Fuzz/color myths? Removed from readiness criteria; addressed as distractions.
8. Honest quiz evidence? Tactile / visual / text / text / text.
9. Household usefulness? No commercial pressure, gas concentration or exact shelf-life promise.

Remaining limits: illustrations cannot measure softness; actual touch matters. Phone QA is browser emulation, not a physical device or the user's live translation extension. No fail-fast condition was reached. **PASS** for the requested local redesign. Final commit and clean status are reported at delivery. No deployment requested.
