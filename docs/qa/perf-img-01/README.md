# PERF-IMG-01 — mobile image delivery

**PASS — implementation, browser QA and user-observed physical-phone approval complete.**

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

### Cold mobile

| Page | Requests before → after | Image wire bytes before → after | Reduction | Above-fold bytes before → after | LCP ms before → after | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 7 → 7 | 854,788 → 398,605 | 53.4% | 277,388 → 158,430 | 5092 → 3456 | 0 |
| `/avocado` | 1 → 1 | 164,790 → 107,901 | 34.5% | 164,790 → 107,901 | 3568 → 3180 | 0 |
| `/kiwi` | 1 → 1 | 219,934 → 81,813 | 62.8% | 219,934 → 81,813 | 4000 → 2480 | 0 |
| `/pomegranate` | 2 → 2 | 260,055 → 131,844 | 49.3% | 193,081 → 73,945 | 3812 → 2392 | 0 |
| `/persimmon` | 3 → 2 | 83,123 → 26,508 | 68.1% | 64,007 → 26,508 | 3192 → 2708 | 0 |

### Cold desktop

| Page | Requests before → after | Image wire bytes before → after | Reduction | Above-fold bytes before → after | LCP ms before → after | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 8 → 6 | 391,473 → 123,706 | 68.4% | 280,640 → 108,666 | 2168 → 2364 | 0 |
| `/avocado` | 8 → 4 | 395,344 → 95,290 | 75.9% | 84,714 → 58,581 | 2516 → 1964 | 0 |
| `/kiwi` | 5 → 3 | 194,055 → 64,898 | 66.6% | 81,812 → 33,401 | 1956 → 1796 | 0 |
| `/pomegranate` | 6 → 5 | 172,519 → 96,947 | 43.8% | 106,685 → 54,531 | 1808 → 2028 | 0 |
| `/persimmon` | 5 → 4 | 55,039 → 25,882 | 53.0% | 27,382 → 16,891 | 2428 → 1648 | 0 |

### Warm mobile revisit

| Page | Requests before → after | Image wire bytes before → after | Reduction | Above-fold bytes before → after | LCP ms before → after | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 8 → 8 | 493 → 437 | 11.4% | 249 → 222 | 540 → 496 | 0 |
| `/avocado` | 12 → 12 | 646 → 692 | -7.1% | 59 → 61 | 520 → 524 | 0 |
| `/kiwi` | 8 → 9 | 437 → 507 | -16.0% | 53 → 78 | 572 → 452 | 0 |
| `/pomegranate` | 9 → 12 | 508 → 679 | -33.7% | 54 → 54 | 504 → 388 | 0 |
| `/persimmon` | 8 → 9 | 454 → 484 | -6.6% | 107 → 107 | 608 → 472 | 0 |

Warm Preview image transfer is approximately half a kilobyte per page, consisting of revalidation headers. The separate CDP extra-info audit confirms actual HTTP 304 responses; cached bodies are reused. Local warm transfer is 0. No custom cache headers are needed. Actual Preview static and optimized cache headers:

- `/fruits/kiwi/hero/hero.webp`: HTTP 200, `{'age': '0', 'cache-control': 'public, max-age=0, must-revalidate', 'content-type': 'image/webp', 'etag': '"0e5e9cd1ff9abd461d96269903f7e891"', 'x-vercel-cache': 'MISS'}`
- `/_next/image?url=%2Ffruits%2Fkiwi%2Fhero%2Fhero.webp&w=640&q=75`: HTTP 200, `{'age': '871517', 'cache-control': 'public, max-age=0, must-revalidate', 'content-type': 'image/webp', 'x-vercel-cache': 'HIT'}`

The optimized response was a CDN HIT; the raw static-source probe was a MISS with cache/revalidation headers. Browser revalidation is inexpensive. No cache policy change.

### Alternating repeated cold trials

| Page | Baseline LCP ms (3 samples) | Final LCP ms (3 samples) | Median before → after | Median reduction |
|---|---|---|---|---:|
| `/` | 3820, 4908, 3628 | 1864, 3996, 3184 | 3820 → 3184 | 16.6% |
| `/kiwi` | 4484, 3560, 3552 | 2796, 2268, 2528 | 3560 → 2528 | 29.0% |

These are browser-cache-cold trials against already deployed CDN endpoints. They reduce single-run timing uncertainty but cannot establish real-phone perception or a universal percentage. Remote routing/TTFB and device CPU still vary. Homepage mobile request count remains 7: native lazy loading still starts three index variants early, now substantially smaller and low priority. The browser evidence supports keeping native loading without a custom observer. Desktop Hero/index LCP selection can change as smaller index art finishes earlier; single desktop LCP is reported as observed rather than presented as a guaranteed improvement.

### Scroll and current/future Quiz behavior

| Page | Cold mobile full-scroll bytes before → after | Reduction |
|---|---:|---:|
| `/` | 945,863 → 435,669 | 53.9% |
| `/avocado` | 955,121 → 396,362 | 58.5% |
| `/kiwi` | 642,108 → 331,898 | 48.3% |
| `/pomegranate` | 601,121 → 323,055 | 46.3% |
| `/persimmon` | 364,925 → 191,781 | 47.4% |

Initial requests contain no future Quiz-only illustrations. Some shared Q01 art appears in teaching earlier and is correctly reused, rather than classified as future prefetch. All 8 remote complete Quiz/restart flows pass. Related images remain late-page lazy, not in mobile startup. Raw per-question candidates are in the measurements JSON.

### Deployment and release boundary

Implementation commit: `7cc94e39f1879f0e61783738510ba256e59fc43d` (`perf: optimize mobile image delivery`), pushed to GitHub. Actual measured Git-triggered deployment: `dpl_7g5kVffUTBo3zkf2EpaNQ9xD3Qgs`, READY Preview, existing project `prj_i1FanaOS0Ay6qYcfU24X3UZHGZnn`, SHA `7cc94e39f1879f0e61783738510ba256e59fc43d`. [Measured Preview](https://fruit-picking-guide-rnhm0illk-good-dc6d.vercel.app). A documentation-only follow-up records this evidence; its application source is identical. The paired driver encountered transient proxy ECONNRESET during cookie setup outside the timed window, then completed all 12 samples using the supported two-retry request option; credentials were revoked after every attempt. No PR, main merge, Production deployment, DNS or project-structure change. Temporary QA credential was revoked.


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

## Real-phone approval — user-observed PASS (2026-10-08)

The user completed QA on a real phone and explicitly approved the final Preview at `8874eb40aab2abc6887c3cb554a923db1e4e4390`: [approved Preview](https://fruit-picking-guide-db88v57ol-good-dc6d.vercel.app/).

The user confirmed:

- Image loading is materially improved.
- Image clarity remains acceptable.
- Homepage scrolling is normal.
- Fruit navigation works.
- Avocado and Kiwi loading is acceptable.
- Quiz works.
- Returning to the homepage works.
- No unacceptable horizontal scrolling was observed.

This is user-observed physical-device approval. Device model, OS/browser version, network and numeric device measurements were not recorded. The controlled Chrome results above are separate browser evidence. **PERF-IMG-01: PASS.** This documentation update does not change the approved application. The user authorized the final combined production release; see [HOWRIPE-V1-PRODUCTION](../howripe-v1-production/README.md).

## Requested final-report coverage

| Items | Result / evidence |
|---|---|
| 1–2 Branch, HEAD, base | `feature/perf-mobile-images`; implementation `7cc94e39f1879f0e61783738510ba256e59fc43d`; documentation delivery HEAD in Git; base `feature/seo-home-01` / `f1fbde6f1bf5c4c9ec0915d5ffe8186523bd3b7a` |
| 3–6 Baseline / bottlenecks | 7 home mobile images, 854,788 bytes, 5,092ms first LCP; oversized slots, larger repeated index variants, four emitted home preloads |
| 7–8 Image/raw audit | All existing Next/image; no authored raw img or image CSS background conversion needed |
| 9–11 Loading / sizes | One emitted critical preload/high request per route; eager/low visible secondary art, lazy noncritical art; contained size hints and 512w candidate |
| 12–14 Hero/index/inner | Exact art/composition; smaller mobile candidates; index lazy/low; teaching comparison, cover and hand-photo sizing; expanded detail preserved |
| 15–16 Quiz / related | Current question only, no future illustrations in startup; lazy related absent from mobile startup; all 8 Preview Quiz flows complete/restart |
| 17–21 Format / quality / cache / assets | WebP / q75 retained, CDN HIT for optimized image, HTTP 304 browser reuse, top 15 table and inventory above; no derivatives or master changes |
| 22–26 Final home / change / CLS | 7 images, 398,605 bytes (−53.4%), 158,430 above-fold bytes (−42.9%), first LCP 3,456ms; alternating median 3,820→3,184ms (−16.6%); all measured CLS 0 |
| 27–29 Visual/detail QA | 390/DPR3 and 1440 before/after; four-fruit skin/fuzz/surface/edges, cover crops, hand photos and native expanded detail inspected; quality comparison geometry unchanged |
| 30–35 Verification / dependencies | 91 tests / 26 files PASS; lint, TypeScript, production build, diff-check PASS; no dependency or manifest/lockfile change |
| 36–37 Commits / push | Implementation `7cc94e3` plus evidence follow-up; pushed to `origin/feature/perf-mobile-images`; main unchanged |
| 38–39 Preview | Existing `fruit-picking-guide` project, Git-triggered READY Preview; measured deployment URL above; final delivery deployment verified at the documentation HEAD |
| 40–41 Remaining / verdict | Native lazy loading still fetches 3 index variants early; lower bytes/priority documented. Browser QA and user-observed real-phone QA PASS. **PERF-IMG-01 PASS.** Combined release is authorized in HOWRIPE-V1-PRODUCTION. |
