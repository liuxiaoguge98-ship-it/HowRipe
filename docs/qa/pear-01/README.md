# PEAR-01 — Pear guide / Preview approval package

Date: 2026-11-04. Branch: `feature/pear-01`. Base: `078bc12d2755d7114ec3d075f5943de7bce1083f`.

**Release boundary:** Preview for visual/content approval. No merge into main, no Production deployment, no DNS or hosting-policy changes. The existing Production GA4 gate is unchanged; QA observed no analytics requests locally or in Preview.

## Implementation and content

1. **Data model:** `src/content/fruits/pear.ts`, the shared `FruitContent` registry and `/pear` route wrapper. Optional generic type-comparison, pressure-location/check, variety-cue and step capabilities extend the current renderer. No parallel page or Quiz engine.
2. **Hero:** “How to Tell If a Pear Is Ripe”; the requested direct answer, clear Anjou neck/stem, and early “CHECK THE NECK.” memory line. Warm ivory and muted green, with gold Bartlett and cinnamon Bosc imagery.
3. **Quick Checks:** exactly TYPE / NECK / COLOR / DAMAGE / PLAN, indexed and linked to the relevant static sections.
4. **European vs Asian:** both types and independent readiness paths are server-rendered. European examples: Bartlett, Anjou, Bosc, Comice. Asian examples: Hosui, Nijisseiki, Shinseiki; commonly sold ripe and crisp, with condition checks rather than waiting for European softness.
5. **Check the Neck:** actual adult-hand contact near the stem; three native keyboard buttons reveal descriptive feel and a local pressure-marker pulse. Very firm neck → NOT YET; slight neck give → READY TO EAT; body soft → EAT SOON / INSPECT. The third marker moves to the belly. Results remain available without JavaScript.
6. **Don't Press the Belly:** identical pear shown twice with HTML markers at neck `{54,31}` and belly `{50,68}`. Same neutral ring style; photographs contain no baked instructional labels.
7. **Variety color:** green/gold yellow-Bartlett comparison; Anjou can remain green; natural Bosc russeting with less give when ripe; Comice neck/skin nuance. Compact four-variety reference below.
8. **Damage/Bosc:** normal russeting and superficial marks are separated from significant bruises, collapse, abnormal mushy pockets, decay and major skin damage. Brown alone does not mean bad.
9. **Ripening:** room temperature, paper bag, then paper bag + apple or banana; check daily. No universal countdown.
10. **Storage:** cold slows further ripening. Ripe European pears generally keep 3–5 days refrigerated, qualified by condition. Firm fruit may be kept cool for later. Asian storage is not assigned the European duration.
11. **Too Many Ripe:** sort, prioritize sound soft fruit, chill ready fruit, keep future fruit firmer, use sound over-soft fruit for cooking/smoothies/sauce. Never rescue decay. Freezing is a secondary prepared-sauce/cooked-filling option. Cut fruit: cover, chill promptly, use soon; lemon may slow natural browning.
12. **Don't Overthink:** green is not always unripe; Bosc brown is normal; soft body may be too late; Asian firm can be ripe.
13. **Eight numbered sections:** KNOW YOUR TYPE; CHECK THE NECK.; DON'T PRESS THE BELLY.; COLOR DEPENDS ON THE VARIETY; LOOK FOR REAL DAMAGE; MATCH YOUR TIMING; CONTROL THE RIPENING; TOO MANY RIPE AT ONCE? Layouts vary between feature, photo, detail, statement and text.

## Quiz wording, evidence and answers

| Question | A / B evidence | Answer |
|---|---|---|
| Where should you press to check a European pear? | Identical pear; HTML marker at middle/belly / neck near stem | B |
| Which European pear is ready to eat now? | Same pear and neck position. Check neck reveals very firm / slight give; no color verdict | B |
| Which variety uses a clear green-to-yellow color change as a helpful ripeness cue? | Single green Bartlett / single green Anjou, with variety labels | A |
| This Bosc pear has natural brown russeting. Does that mean it is overripe? | Same Bosc specimen; Yes / No | B |
| Which pear may already be ready to eat while still firm and crisp? | European with a stated very firm neck / Asian firm and crisp | B |

Only the active question is mounted. Correct/wrong verdicts, both explanations and learning points appear after selection. Every question requires **Got it**. Completion gives TYPE / PLACE / FEEL / COLOR / TIMING; restart clears revealed feels and feedback. The green-to-gold teaching image is deliberately excluded from Q03 to avoid visually supplying its answer.

## Assets and source verification

- Six physical optimized WebP files; 16 Pear asset contracts, 66 total contracts. Reuse: Anjou hero in location/feel/type teaching; one Bosc repeated for Q04; separate single green Bartlett in Q03; no unnecessary new damage or storage image set.
- Four original alpha specimens/comparison plus the edited single Bartlett retain true transparency; the hand photo has an intentional warm neutral scene. Inspected edges and backgrounds on the actual page. Removed an inherited white tactile container.
- [assets.json](assets.json) records generated originals, normalized prompt specifications, generation/edit mode, output dimensions and byte sizes. Built-in imagegen required no new API key or runtime dependency; existing Sharp only resized/exported WebP.
- Nutrition: five metrics per 100g raw edible pear, USDA FoodData Central **FDC 169118, Pears, raw**: 57 kcal, carbohydrate 15.23g, fiber 3.1g, sugars 9.75g, protein 0.36g. Verified against USDA's official API; the public historical food-detail URL currently returns 404, so the on-page source uses the stable USDA hub with the precise record ID.
- Eight concise FAQ entries cover ripeness, pressing location, post-purchase ripening, green varieties, refrigeration, faster ripening, Asian firmness and Bosc russeting.
- Primary sources: [USA Pears FAQ](https://www.usapears.org/pear-faq/), [Bartlett](https://www.usapears.org/bartlett/), [Green Anjou](https://www.usapears.org/GREEN-anjou/), [Bosc](https://www.usapears.org/Bosc/), [Comice](https://www.usapears.org/comice/), [UC IPM](https://ipm.ucanr.edu/home-and-landscape/harvesting-and-storing-pears/), [UC Davis Asian pear facts](https://postharvest.ucdavis.edu/produce-facts-sheets/asian-pear), [OSU Extension via UC ANR](https://ucanr.edu/sites/default/files/2025-07/sp_50_694_preservingasianpears.pdf), [UC ANR cut-fruit handling](https://ucanr.edu/sites/default/files/2011-07/115275.pdf), [USDA](https://fdc.nal.usda.gov/). No unsupported health claims or universal shelf-life promise.

## Site / SEO integration

- Homepage preserves its editorial index and adds fifth entry **How to tell if a pear is ripe**. On desktop the fifth entry spans the index width; on mobile it follows the existing single column. The still life includes Pear without displacing existing fruits.
- Header keeps the existing fruit-index navigation. Registry-driven Footer gains Pear. Persimmon's curated related set includes Pear; each related list remains limited to three.
- Title: `How to Tell If a Pear Is Ripe | HowRipe`.
- Meta description: `Learn how to tell when a pear is ripe, where to press, how Bartlett, Anjou, Bosc and Asian pears differ, and how to ripen and store pears.`
- Canonical and OG URL: `https://www.howripe.com/pear`. Homepage metadata naturally includes pears. No Preview hostname enters metadata.
- Sitemap remains registry-generated, adding only `https://www.howripe.com/pear` for six URLs total. Existing routes, canonical strategy, robots implementation, logo/icons and GA4 code are unchanged.

## Automated verification

| Command | Result |
|---|---|
| `pnpm test` | PASS — 30 files, 132 tests |
| `pnpm lint` | PASS |
| `pnpm exec tsc --noEmit` | PASS |
| `pnpm build` | PASS — `/pear` statically prerendered |
| `git diff --check` | PASS |

25 new feature cases (7 guide / 18 Quiz). Broadened existing inventory, registry, SEO, rollout and English-content coverage without removing old-fruit assertions. RED before implementation: all 25 new cases failed on the missing guide. Q03 regression separately failed when using the teaching transition, then passed with neutral single Bartlett. Mobile browser assertion failed at inherited 8px, then passed at 13px. One initial TypeScript run raced Next build's generated `.next/types`; rerunning sequentially after build passed. No application fix was required for that verification race.

## Browser QA

Production build, isolated Chrome 157, DPR1. Baseline Production homepage captured at 1440/390 before final visual QA with Google SDK/collection blocked to avoid polluting analytics.

- Local: **12/12 route/width cases PASS** — `/`, `/pear`, `/avocado`, `/kiwi`, `/pomegranate`, `/persimmon`, each at 1440 and 390. No horizontal overflow, visible broken images, console errors or page errors. One H1 and one high-priority image per route. Header/Footer, navigation and existing Quiz interactions work. Six production-origin canonicals; English only.
- Pear: all five correct answers, wrong branch, explicit acknowledgement, tactile Enter + Space, completion and restart. Both feels are hidden until checked; only two active Quiz images. Descriptions are readable at 13px. Native focus is visible; text conveys readiness rather than color alone; live regions announce the feel. Reduced motion and normal motion both tested.
- No JavaScript: core neck, type, color, ripening and storage rules remain in the page.
- Original disclosure images are intentionally lazy while hidden; QA checks visible images rather than incorrectly treating unopened details as broken.
- Screenshots: `local/pear-{1440,390}-full.png`, hero/type/neck/place/color/ripening, q01–q05-neutral, quiz-tactile/complete/wrong; `local/home-{1440,390}-{full,hero,index}.png`. Baselines in `baseline/`. Preview equivalents are recorded after deployment.

Visual self-critique: HowRipe type/spacing preserved; Pear identity comes from ivory/green/gold/cinnamon. Check the Neck is early and supported by a close hand photo and markers. Type distinction and color rules stay readable in stacked mobile layouts. Two feature panels provide grouping; the remaining teaching avoids eight identical card stacks. Alpha assets blend with the page. Quiz is neutral after replacing Q03 art. Meaningful issues found were fixed before Preview approval.

## Performance / accessibility evidence

- One high-priority Hero; all below-fold Pear and Related assets lazy. Same source reused in multiple contexts; current Quiz evidence only. No added dependencies.
- Local mobile initial image payload: Home **61,368 bytes**, current Production baseline **57,820 bytes** (one small Pear addition, +3,548 bytes); Pear **9,988 bytes**. Initial JS about 149KB, no increase over baseline's ~152KB. CLS **0** in every 12-case local check.
- These are cold-context, DPR1, unthrottled observations, **not** a Lighthouse score or field-CWV claim. Remote Preview measurements: Home 61,378 image bytes and 150,272 JS bytes; Pear 23,740 image bytes (browser anticipates a lazy below-fold Asian illustration) and the same JS. CLS 0; observed unthrottled LCP 2,388ms Home / 2,248ms Pear versus baseline Home 3,184ms. These single-run timings establish no field performance guarantee. Browser lazy-loading timing can alter the initial image set; per-resource evidence is retained. `performance.json` contains per-resource sizes and observed LCP; timing varies by server/cache.
- Keyboard, live regions, visible focus, readable instructions, reduced-motion cancellation, semantic heading hierarchy, descriptive teaching alt text and blank neutral Quiz alt text verified. Static content remains available without JS. Computed-color ratios: normal ink/page 9.93:1, muted/page 5.62:1, accent/surface 4.55:1, white/accent 5.24:1, Hero answer/darkest gradient 8.43:1.

## Independent review and decisions

Fresh whole-branch review found no Critical issue. Important finding: Q03 teaching artwork revealed the transition being asked about — fixed with a dedicated single green Bartlett and a failing-then-passing regression. Root also fixed small mobile tactile text with a browser regression. A separate computed-color check found Hero answer contrast 4.16:1 at the darkest gradient stop; changing only this paragraph to the existing ink token raised it to 8.43:1 (RED→GREEN browser assertion).

Deferred minor: “Check Asian pear ↓” currently points to its own overview card; the card and ready path already contain the full rule. This does not block content/Quiz approval; remove the optional link or retarget it in a later polish pass.

Reviewer set actual Preview runtime aside because it was not yet available. Root resolved it with actual remote 12/12 route-width QA. Temporary automation access was revoked in finally; existing protection, prior keys and Production deployment were checked unchanged. The final docs HEAD is checked again after its automatic Preview reaches READY; that exact-HEAD release evidence is kept outside the commit to avoid a self-referential documentation/deployment loop.

Rulings: (1) user continuous execution/exact branch superseded intermediate skill approval/worktree menus; user gets an open PR/Preview with no Production change (risk: another feature revision). (2) two independent content/test files were delegated while root owned shared code; one fresh final reviewer covered integration (risk: a missed interaction, mitigated by suite/browser QA). (3) the user's exact PR title and bounded guide scope take precedence over generic ship version-prefix/global setup suggestions; no unrelated version/dependency/workflow edits (risk: none for this existing web deployment).

## Release record

- `2a46b6f` — `feat: add Pear ripeness guide and neck-pressure teaching`
- `2bfc8c4` — `fix: keep Pear quiz evidence neutral and touch text readable`
- `e04191f` — `fix: improve Pear hero answer contrast`.
- GitHub feature branch pushed; PR [#5](https://github.com/liuxiaoguge98-ship-it/HowRipe/pull/5) stays OPEN into main.
- Actual application Preview: [Pear](https://fruit-picking-guide-o0xvk83sq-good-dc6d.vercel.app/pear), deployment `dpl_6y4yRP4m3YCbRmeoDRg7pywKGaNr`, Git source, READY at `2bfc8c4c3e4520c675468162a40f9a262efd8e63`. Twelve route/width cases PASS, no console/page errors, no analytics requests. See `preview/browser.json`, screenshots, `performance.json`, `access-qa.json` and `preview-deployment.json`.
- Final Hero contrast amendment verified locally at 8.43:1; final-HEAD Preview is rechecked after this evidence commit. Its exact identity/check results are recorded in the final release report under ignored `.vercel/pear-01-final/`, with no further source changes.
- Vercel/GitHub checks PASS. Production remains `dpl_GEiBVu8xxKd6oYUuRUn847p1mxkS`, main `078bc12d2755d7114ec3d075f5943de7bce1083f`.
- **No merge / no Production deployment. User visual/content approval remains required.**

Reproduce local: `pnpm build`, then `pnpm start --hostname 127.0.0.1 --port 3001`; run `node docs/qa/pear-01/browser-qa.mjs` and `node docs/qa/pear-01/performance-qa.mjs`. Build and standalone TypeScript checks should run sequentially because they share generated `.next/types`.
