# PERF-IMG-01 — mobile image delivery

**PARTIAL — implementation and browser QA complete; physical-phone approval pending.**

Branch: `feature/perf-mobile-images`. Base: exact approved `feature/seo-home-01` HEAD `f1fbde6f1bf5c4c9ec0915d5ffe8186523bd3b7a`. Main stays at `c2a471388abd63fc701a9165c3c1c0f621d137c8`. This branch includes BRAND-HOME-01 + SEO-HOME-01 + PERF-IMG-01. No merge or Production deployment.

## Measurement method and evidence

Installed Chrome through Playwright, production Webpack builds, actual Git-triggered protected Vercel Preview. All five routes measured at 390×844 / DPR 3 and 1440×1000 / DPR 1. The mobile profile uses CDP request throttling: 150ms latency, 200,000 B/s download (1.6Mbps), 93,750 B/s upload. No CPU throttling; these are controlled browser measurements, not physical-device field data or Lighthouse simulated scores. [Chrome's throttling reference](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md).

Each cold case starts in a new context with browser cache cleared. Warm is a revisit in that same context after progressive scrolling and Quiz, so the full page's images can be cached. Initial sampling waits for network idle plus 750ms, before scrolling. Scroll is 600 CSS px every 600ms. All five Quiz questions, feedback, completion and restart are exercised in every inner-page/profile case. Resource wire bytes include response headers; cached 304 headers are not image-body downloads. Request count includes cache requests, and JSON also records actual network requests, body bytes, source/returned dimensions, format, timings, cache headers and priority.

Preview authentication uses a temporary scoped automation bypass cookie, then revokes the credential. Request interception is deliberately avoided in performance measurement because it disables browser HTTP caching. Existing project and SSO remain intact. [Vercel cookie method](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation).

Evidence: `baseline-local/measurements.json`, `baseline-preview/measurements.json`, `after-local/measurements.json`, `after-preview/measurements.json`; intermediate `sizes-pass`, `delivery-pass` and `evidence-pass` retain JSON. `measure.mjs` is reusable with `PERF_ORIGIN` and `PERF_OUTPUT`. Selected screenshots retain real early/settled captures. `quality-qa.mjs` compares final artwork with the baseline delivery candidates in the same unchanged CSS layout; those files are labeled `baseline-variant`, not claimed to be historical full-page captures.

## Baseline diagnosis and pipeline audit

The actual Preview mobile homepage initially requested **7 images / 854,788 wire bytes**, with **277,388 above-fold bytes** and **5,092ms LCP** (avocado, 640w). Four Hero layers started together; three lazily marked index assets were nevertheless within Chrome's native fetch distance and requested 1080w versions. This duplicated larger variants of the same art during startup. All four Hero layers appeared relatively late. Avocado, Kiwi and Pomegranate inner heroes requested 1080w although their contained, scaled artwork is roughly 215/173/198 CSS px wide on the 390px phone.

| Role | Component | Baseline loading / sizes | Returned format | Problem | Final treatment |
|---|---|---|---|---|---|
| A critical mobile Hero | Home Specimen / FruitHero / VariantHero | Home explicit avocado preload plus eager layers; inner registry critical; 50vw / 85vw | WebP | Broad slots and low network priority; server emitted four home image preloads | One critical eager/high image per page; measured contained slots with CSS magnification included |
| B secondary Hero | Home Specimen / VariantHero | Home eager auto-preloads; paired Hachiya lazy | WebP | Secondary layers could compete or start late | Visible Hero art eager/low; no secondary head preload |
| C near-fold index | Home Specimen | Lazy; 75vw mobile / 440px desktop | WebP | Chrome's native lazy distance fetched three 1080w copies | Lazy/low; 196px mobile / 208px tablet / 248px desktop |
| D teaching images | TeachingEvidence | Lazy; education 100vw / 50vw | WebP | Small comparisons/macros/hand photos inherited full-column slots | Context sizes for normal views, cover crop and hand/photo wells; expanded inspection resolution retained |
| E current Quiz | QuizEngine + FruitAsset | Current question only, default lazy except a reused critical source; education illustrations 100vw | WebP | Kiwi scenario illustrations requested source-sized variants; hero metadata could elevate a later illustration | Explicit default lazy; current illustrated option sizes; no future question mounts or speculative prefetch |
| F related navigation | RelatedFruits | Lazy; 140px / 30vw | WebP | Oversized desktop and phone candidates | Lazy/low; 90px phone / 180px desktop; no preload |

All production images already use `next/image`; no authored raw `<img>` or image CSS backgrounds require conversion. `fill` boxes have existing fixed heights/aspect ratios, surfaces, object-fit and object-position. No layout/typography/style/copy/fact/route/Quiz-state/SEO-source edits were made. Existing media tones act as placeholders. No blur-artwork layer or client network subsystem was introduced.

## Changes and pixel budget

- Homepage mobile Hero slots: avocado 170px → 512w; kiwi/persimmon 123px → 384w; pomegranate 155px → 512w. DPR 3 is retained. The index uses approximately 196px contained widths, selecting 640w rather than 1080w.
- Inner mobile Hero slots include current CSS scale: avocado 216px → 750w (1080w baseline actually returns the 916px source); kiwi 174px → 640w; pomegranate 200px → 640w; Fuyu/Hachiya pair 168px → 512w. A 512w image-size candidate fills Next's existing 384→640 gap.
- `FruitAsset` defaults to lazy. The display context owns loading and priority, so reusing `persimmon.hero` inside Quiz does not preload it. Critical Hero uses `loading="eager"` + `fetchPriority="high"`; secondary visible Hero art uses low priority. Next 16's supported behavior is used, without deprecated `priority` or mixing explicit `preload` with loading/fetchPriority. React emits one critical image preload in actual server HTML. [Image API](https://nextjs.org/docs/app/api-reference/components/image).
- Comparison slots include the largest existing 1.2× normal-view scale. Collapsed `<details>` keeps its existing full-resolution sizes and browser-native lazy behavior; opening surface/outline detail still receives high-resolution images. Stem-condition cover sizing accounts for both dimensions. Hand photos retain enough pixels for DPR 3; Pomegranate photos use their actual content width.
- Kiwi Q03–Q05 illustrations select 512w rather than 1200w requests returning the 960px source. Only the current question is mounted. A/B semantics, feedback, tactile checks, focus behavior, completion and restart remain unchanged.
- WebP and quality **75** retained for every role. No blind AVIF enablement, quality reduction, new photography, master-file edit, derivative or asset deletion. Responsive delivery solves the measured waste first. No dependency/package/lockfile change.

## Local production before / after

### Cold mobile

| Page | Requests before → after | Initial bytes before → after | Reduction | Above-fold bytes before → after | LCP ms before → after | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 7 → 7 | 856,094 → 400,288 | 53.2% | 278,124 → 159,356 | 2524 → 1796 | 0 |
| `/avocado` | 1 → 1 | 164,853 → 108,057 | 34.5% | 164,853 → 108,057 | 2164 → 1828 | 0 |
| `/kiwi` | 1 → 1 | 219,971 → 81,966 | 62.7% | 219,971 → 81,966 | 2432 → 1664 | 0 |
| `/pomegranate` | 2 → 2 | 260,223 → 132,119 | 49.2% | 193,143 → 74,096 | 2628 → 1760 | 0 |
| `/persimmon` | 3 → 2 | 83,667 → 26,945 | 67.8% | 64,373 → 26,945 | 1208 → 612 | 0 |

### Cold desktop (unthrottled)

| Page | Requests before → after | Initial bytes before → after | Reduction | Above-fold bytes before → after | LCP ms before → after | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 8 → 6 | 393,514 → 125,211 | 68.2% | 282,222 → 109,865 | 76 → 76 | 0 |
| `/avocado` | 4 → 11 | 179,455 → 312,539 | -74.2% | 84,866 → 58,744 | 52 → 48 | 0 |
| `/kiwi` | 3 → 3 | 127,158 → 65,562 | 48.4% | 81,966 → 33,582 | 48 → 52 | 0 |
| `/pomegranate` | 5 → 5 | 150,091 → 98,001 | 34.7% | 107,047 → 54,957 | 76 → 88 | 0 |
| `/persimmon` | 3 → 4 | 36,621 → 26,984 | 26.3% | 27,722 → 17,329 | 76 → 72 | 0 |

Very fast localhost and warm-cache paints sometimes report a heading/text element as LCP because existing entrance animation timing affects eligibility. Those text timings are not presented as Hero delivery speeds. Desktop request counts also vary with native lazy timing, stylesheet/layout timing and above-fold index visibility. Local Avocado happened to fetch all 11 lazy/related candidates in one fast desktop startup, so its initial byte total rose despite a smaller Hero and lower full-scroll total; that is reported without hiding the variation. Actual returned candidates and byte changes are the deterministic evidence; remote mobile LCP is the principal timing comparison.

### Cache and scroll

Local static image responses use `public, max-age=0`; optimized images use `public, max-age=14400, must-revalidate`. Local warm image wire bytes are zero for all five routes. Browser request count can remain nonzero even when served from memory/disk. Full-scroll and all Quiz candidate details are recorded separately in JSON, avoiding future interaction bytes being included in initial-load savings.

A local Pomegranate desktop Quiz click hit an action-stability timeout during existing animations. The timed initial window was already complete. A targeted Pomegranate/Persimmon rerun passed after the QA driver moved the pointer off the previous option and allowed transitions to settle. `after-local/measurements.json` combines completed cases with explicit provenance; interrupted evidence remains available. No product interaction code was changed to work around the driver timeout.

## Actual Vercel Preview before / after

Pending Git-triggered Preview validation at this commit. Final remote metrics and deployment proof will be appended after READY.

## Largest 15 registered runtime image sources

| Runtime source under `public/` | Source bytes | Dimensions | Role |
|---|---:|---|---|
| `fruits/avocado/education/stem-damage.webp` | 377,748 | 1254×1254 | Education |
| `fruits/avocado/education/stem-macro.webp` | 376,700 | 1254×1254 | Education |
| `fruits/pomegranate/quiz/pomegranate-pale.webp` | 369,654 | 1254×1254 | Quiz / reused educational evidence |
| `fruits/kiwi/quiz/scenarios/counter-six.webp` | 349,812 | 960×960 | Quiz / reused educational evidence |
| `fruits/kiwi/quiz/scenarios/all-now.webp` | 273,970 | 960×960 | Quiz / reused educational evidence |
| `fruits/kiwi/education/local-bruise.webp` | 263,906 | 1254×1254 | Education |
| `fruits/kiwi/education/wrinkles-v2.webp` | 259,414 | 1254×1254 | Education |
| `fruits/kiwi/hero/hero.webp` | 250,948 | 1080×1350 | Hero / reused navigation |
| `fruits/pomegranate/hero/hero.webp` | 218,382 | 1080×1350 | Hero / reused navigation |
| `fruits/kiwi/quiz/scenarios/bag.webp` | 213,386 | 960×960 | Quiz / reused educational evidence |
| `fruits/pomegranate/education/heft-comparison.webp` | 209,954 | 1448×1086 | Education |
| `fruits/avocado/hero/hero.webp` | 181,158 | 916×1145 | Hero / reused navigation |
| `fruits/kiwi/education/palm-pressure.webp` | 180,396 | 1448×1086 | Education |
| `fruits/pomegranate/education/color-varieties.webp` | 177,240 | 1448×1086 | Education |
| `fruits/kiwi/quiz/scenarios/now-later.webp` | 174,890 | 960×960 | Quiz / reused educational evidence |

These are actual displayed production sources, distinct from larger unreferenced source/archive files also present under `public/fruits`. Registry and measured page/Quiz requests establish runtime use. Largest sources are 960–1448px assets for evidence or multi-object illustrations, not oversized multi-megapixel originals. The problem was using source-sized variants in small UI. Repeated art references are intentional reuse; cache shares the same candidate URL, but different width URLs had caused extra downloads. Masters and unused assets remain untouched. Full inventory: `asset-inventory.json`.

## Verification and visual quality

- `pnpm test`: 26 files / 91 tests PASS. Two focused delivery tests failed before the priority fix and pass afterward, guarding contextual Hero-source reuse and one high-priority paired-Hero specimen. No brittle snapshots or tests of Next internals.
- `pnpm lint`, `pnpm exec tsc --noEmit`, production `pnpm build`, `git diff --check`: PASS.
- 390px/DPR 3 and 1440px screens inspected: Home, Avocado, Kiwi, Pomegranate, Persimmon; transparent outlines, avocado skin/stem, kiwi fuzz, pomegranate skin/crack and persimmon calyx/damage remain clear at normal viewing size. Smaller variants have expected resampling differences but no material evidence loss. Native expanded detail uses the existing larger candidates. Hand photos are separately compared at both widths.
- Quality comparison checks preserve component width and height. Before/after actual cold-load screenshots preserve approved composition. All image-related initial and scroll CLS samples are 0. No broken images, horizontal overflow or new redundant accessible placeholder content.
- Existing SEO browser regression passes home 1440/1024/768/390/360 plus all fruit routes at 1440/390: English only, one H1, 500 meaningful homepage words / 341 editorial words, descriptive links, crawlable server HTML, metadata/canonical, robots and sitemap, navigation, Quiz controls and no console errors. Source files for CSS, content, SEO, assets and dependencies are unchanged from the approved base.

## Real-phone approval gate

**PERF-IMG-01: PARTIAL. Browser QA may PASS; final perceived-performance PASS requires the user's physical phone.** On mobile data, use a fresh/private tab after signing into existing Preview protection:

1. Cold-load Home and watch text then fruit appearance.
2. Scroll through the fruit index at a normal pace.
3. Open Avocado and inspect skin/teaching detail.
4. Open Kiwi and inspect fuzz/detail.
5. Enter Quiz, check images across questions and advance normally.
6. Return Home and compare the warm revisit.

Confirm whether image appearance feels materially faster and fruit evidence stays clear. No merge, PR or Production deployment is performed by this task. Existing Preview SSO can still ask for Vercel login; protection is intentionally preserved.

Continuation self-check: all measured high-value responsive/priority/teaching/interaction cases were addressed without changing quality settings or visuals. Further work would target native lazy-fetch policy or another format/cache pipeline; current evidence does not justify that added complexity or a quality tradeoff. Physical-phone feedback is the remaining meaningful next evidence.
