# DEV-12 — Final Release QA

Date: 2026-09-28. Isolated branch: `feature/dev-12-release-qa`. Baseline: `66c07abe45316eb4cb58124e1304e57fbc57bec9` (`feature/asset-02-production-visuals`). The tested candidate includes focused fixes `8f921ff` and `7f0410e`; the documentation closure commit is listed in Git history. No merge or deployment was performed.

## Decision

**Engineering release candidate: RC PASS — READY FOR DEPLOYMENT CONFIG + PHYSICAL DEVICE QA.** The four-fruit MVP passed automated and production-build Chrome QA after two P1 fixes. **Public launch: NOT READY.** A real touch device has not certified tactile-control scrolling, and no production domain/canonical/sitemap base has been supplied. Browser emulation is not a substitute for either gate.

## Automated verification and build inventory

| Gate | Result |
| --- | --- |
| `pnpm test` | PASS — 17 files, 49 tests, including two new regression tests |
| `pnpm lint` | PASS |
| `pnpm exec tsc --noEmit` | PASS after Next.js generated route/layout types |
| `pnpm build` | PASS — supported Next.js 16 Webpack production build, no build warnings |
| `git diff --check` | PASS |

The first standalone TypeScript run in the pristine isolated checkout reported `src/app/layout.tsx(11,50): TS2304 Cannot find name 'LayoutProps'`. Next.js generates this global type during `next build` or `next typegen`; after the successful build, the unchanged layout passed `tsc --noEmit`. This is a generated-type prerequisite, not a DEV-12 code defect. The build emitted `/`, `/_not-found`, `/avocado`, `/kiwi`, `/pomegranate`, `/persimmon`, `/robots.txt`, and `/sitemap.xml`. It did not emit an accidental test route. The repository's `--webpack` build script remains in use; no Turbopack migration or dependency change was made.

## Route and viewport matrix

Installed Google Chrome was exercised against the production build at `127.0.0.1:3001`. Every listed cell returned HTTP 200, had no horizontal overflow or browser error, and passed its expected content, image-decoding, ratio, link, and scroll-height checks. Home has no fruit image by design; it showed the product proposition, General Picking Principles, and four live fruit links without “Coming Soon”.

| Route | 1440px normal | 768px normal | 390px reduced motion | 360px normal |
| --- | --- | --- | --- | --- |
| `/` | PASS | PASS | PASS | Not required |
| `/avocado` | PASS | PASS | PASS | PASS |
| `/kiwi` | PASS | PASS | PASS | PASS |
| `/pomegranate` | PASS | PASS | PASS | PASS |
| `/persimmon` | PASS | PASS | PASS | PASS |

All 16 fruit-page checks found one H1, a direct Hero answer, Quick Checks, How to Pick, Quiz, Nutrition, FAQ, Sources, and valid Related Fruits. Don't Overthink appeared where configured. Timing appeared only on Avocado and Kiwi; the static Fuyu/Hachiya Variant Overview appeared only on Persimmon. No internal semantic asset key, legacy label, development placeholder, debug output, dark image background, broken image, missing source, or stale launch-fruit state was visible. The Persimmon overview's Fuyu/Hachiya links now land on the corresponding picking sections.

Fruit-page viewport heights were 900px at 1440 and 844px at the other widths. Home used a 900px height at all three tested widths.

## Fruit knowledge and Quiz regression

The approved teaching models remained intact: Avocado emphasizes firmness/timing over color and distinguishes scuff from structural damage; Kiwi is scoped to fuzzy green fruit and does not treat a static image as proof of firmness; Pomegranate retains weight/shape/skin guidance, no generic Timing Guide, and no postharvest-ripening promise; Persimmon preserves firm-ready Fuyu versus very-soft Hachiya. There is no static image pretending to show weight or tactile firmness.

All five questions were completed on each fruit at **1440px normal** and **390px reduced motion**: eight complete runs, 40 question steps, all PASS. Each run checked neutral initial A/B, correct and wrong/Got it branches, progress, no double advance or stale feedback, completion, Restart, and normal wheel scrolling from answers and feedback. Wrong answers waited for Got it. The current pair alone rendered; controlled visual A/B choices stayed in the same image family without annotations, mixed placeholder/production state, or correctness leakage. Text choices displayed their rule text without an empty image slot.

Avocado Q01/Q02/Q04 and Kiwi Q01/Q04 retained separate firmness Check and Answer controls with identical neutral image substrates per pair. Check firmness revealed Resistance only on request and did not answer; resistance state reset on question advance and Restart. Reduced motion retained the information while suppressing nonessential animation. Avocado Q03/Q05, Pomegranate Q02/Q03, and Persimmon Q03/Q04 visual pairs were reviewed at desktop and mobile sizes for matching framing and lack of embedded answer marks.

## Accessibility, keyboard, motion, and scroll

DOM audit on all four fruit routes found one H1, sensible heading/section structure, native buttons, native FAQ `details`/`summary`, polite Quiz feedback live region, descriptive educational-image alt text, and neutral empty Quiz-image alt text. Correctness was not conveyed by color alone. No nested interactive control, hidden focus target, or semantic key in a neutral accessible name was found. This is a DOM/keyboard audit, **not an assistive-technology user test**.

Keyboard checks covered Tab and Shift+Tab through header/home fruit links; Enter navigation; tactile Check A → Answer A → Check B → Answer B focus order; Enter check without answer; Space wrong answer; Enter Got it; focus restoration to the next question without document jump/clipping; Persimmon Fuyu anchor navigation; Space/Enter on native FAQ disclosure; and Enter activation of Restart and a Related Fruits link at 390px reduced motion. No keyboard trap was observed.

At 390px, Chrome's actual `prefers-reduced-motion: reduce` media emulation matched on all four pages: the Hero animation duration resolved to `0s`, nonessential Quiz/tactile motion was suppressed, and text/Resistance/progress remained usable. Desktop wheel scrolling worked from visual Quiz options, tactile controls, answer controls, and feedback. Chrome emulated-touch swipes on Avocado advanced document scroll from the tactile visual, Check firmness, answer button, and feedback area without changing Q1 progress. **Physical-device touch/swipe verification remains OPEN.**

## Asset and performance audit

The production registry has **31 production records**: Avocado 11, Kiwi 6, Pomegranate 7, Persimmon 7. They resolve to **20 unique WebP runtime files** under `public/fruits/`; no original master or extra non-WebP runtime image was served. All registry paths exist. Chrome decoded each visible static image and the current Quiz pair; dimensions and aspect-ratio slots matched the documented contract. Every fruit has exactly one critical Hero preload through `next/image`; below-fold education/variant assets use lazy loading. No Quiz asset request occurred at initial navigation, though the current visual pair may already be mounted in the DOM and loads when scrolled into view. Nonvisual questions have no image slot. All delivered assets stayed within the role target budgets recorded in `ASSET_02_AUDIT.md` (largest Hero 250,948 B; largest Quiz file 133,232 B; largest education file 86,480 B; largest variant file 68,686 B). No raw master, broken optimizer response, image-induced visible jump, or missing ratio reservation was observed.

Local `PerformanceObserver` diagnostics across the fruit-route matrix sampled LCP at roughly **16–916 ms**, CLS **0**, and **0** long tasks. These are local/cached smoke values, not field Core Web Vitals or a performance guarantee. The four fruit routes shared their route code; no route-specific JS growth or new runtime dependency was introduced by DEV-12. No obvious P0/P1 performance regression was found.

## SEO, static HTML, sources, and privacy

All four fruit routes have distinct titles, descriptions, and primary H1s. How to Pick and the educational sections are server-rendered and do not require Quiz interaction. Chrome with **JavaScript disabled on all four routes** showed H1, direct answer, Quick Checks, How to Pick, Nutrition, FAQ markup/content, Sources, Related Fruits, and the applicable educational visuals or deliberate no-visual presentation. Quiz interaction being unavailable in this mode is expected. No keyword stuffing or localhost URL in page metadata was observed.

`/robots.txt` returned 200 and permits normal crawling (`User-Agent: *`, `Allow: /`). `/sitemap.xml` returned 200 but an **empty URL set** in this local build because `NEXT_PUBLIC_SITE_URL` is not configured. The tested `sitemapForSiteUrl` function returns the expected homepage plus four fruit URLs when given a real base. No canonical is emitted without a production domain. **Do not interpret the local empty sitemap as public-launch readiness:** configure the actual domain, canonical policy, absolute sitemap base, and robots sitemap reference at deployment, then verify all five absolute URLs and absence of localhost leakage. No domain was invented for QA.

All four Nutrition snapshots are explicitly **per 100g** and contain 4–5 metrics. Structured authoritative HTTPS sources are present; the retired Kiwi Zespri URL was replaced with the live official FAQ carrying ripening/selection guidance. Sampled institutional guidance supports the fruit-specific rules; no medical, diabetes, or guaranteed blood-sugar claim appeared. This was a release-content/source audit, not a fresh independent laboratory validation of every nutrient value or full live certification of every external website.

MVP scope inspection found no authentication, personal-data storage, database, upload, analytics addition, secret exposed by this work, or runtime AI API. DEV-12 changed no package manifest or lockfile. This was a scoped regression check, not a penetration test.

## Browser errors and findings

The production Chrome matrices recorded **no console error, page error, hydration mismatch, failed internal navigation, image decode failure, or HTTP 4xx/5xx application resource** after fixes.

| Priority | Finding | Resolution |
| --- | --- | --- |
| P0 | None found | — |
| P1 | Persimmon overview linked to `#fuyu`/`#hachiya` but the How to Pick articles lacked matching DOM IDs | Fixed generic article ID wiring; regression test added; keyboard/browser anchor navigation rechecked. Commit `8f921ff`. |
| P1 | Kiwi Zespri source pointed to a retired external 404 page | Replaced only that URL with the live official Zespri FAQ; regression test added and rendered link rechecked. Commit `7f0410e`. |
| P2 | No actionable release-UI polish issue found | No speculative changes. |

Both P1 issues were reproduced before the focused fixes, verified by red/green regression tests, and retested in Chrome. No architecture rewrite, QuizEngine rewrite, content-model change, image generation, new dependency, or feature expansion was needed.

## Open release and deployment gates

- `[OPEN — Release QA] Real physical-device touch-scroll / tactile control verification`: test swipes from the visual, Check firmness, answer, and feedback on at least one actual touch device; Chrome emulation is not certification.
- `[OPEN — Deployment] Configure production domain / canonical / absolute sitemap base`: provide the real host, verify all five sitemap URLs, canonical policy, robots sitemap reference, and absence of localhost URLs on the deployed candidate.
- `[OPEN — Deployment] Production-host smoke`: after configuration, repeat crawl metadata, route/image load, and browser-error checks on the deployed host. DEV-12 did not deploy.

**Next action:** complete physical-device QA and deployment-domain/SEO configuration, then run a short production-host verification. Only then reassess public-launch readiness. DEV-12 stops at RC PASS; it does not declare a public launch or start a new product node.

## DEPLOY-00 — Vercel preview deployment (2026-09-28)

**Status:** `DEPLOYED FOR QA — AWAITING PHYSICAL DEVICE QA + PERMANENT DOMAIN`. This section appends deployment evidence; the DEV-12 RC evidence above is unchanged. Deployed source: `feature/dev-12-release-qa` at `b0efd6130e7ebdeb74f91b7101849fb36e9a777e`. Vercel project: `good-dc6d/fruit-picking-guide` with Next.js preset and the repository's `pnpm build` command. The Vercel cloud build completed with Next.js 16.3.4, Webpack, and TypeScript.

- **Protected preview URL:** https://fruit-picking-guide-fgt0kjab8-good-dc6d.vercel.app (`preview` deployment; Vercel SSO and `X-Robots-Tag: noindex`).
- **Accessible temporary QA URL:** https://fruit-picking-guide.vercel.app (Vercel assigned the first deployment to its `production` target and created this alias automatically; it serves the same RC commit). This is a QA origin only, not a purchased domain, permanent canonical origin, or public-launch decision.
- The generated preview URL redirects unauthenticated requests to Vercel SSO. Automated approval rejected disabling project-wide SSO because that would weaken access to every deployment. It remains enabled. Authenticated `vercel curl` was used for protected-preview route smoke; interactive Chrome smoke used the accessible same-commit alias.

| HTTPS route on protected preview | Result |
| --- | --- |
| `/`, `/avocado`, `/kiwi`, `/pomegranate`, `/persimmon` | HTTP 200, HTML |
| `/robots.txt` | HTTP 200, text |
| `/sitemap.xml` | HTTP 200, XML |

Installed Chrome on the temporary QA alias passed at **1440×900 normal motion** and **390×844 actual reduced motion** for the homepage and all four fruit pages. Each fruit page had exactly one H1, no horizontal overflow, neutral initial Quiz controls, decoded static images, and no page, console, or application-resource error. All four five-question Quiz flows reached completion with a wrong-answer → Got it branch and Restart at both widths. Avocado/Kiwi Check firmness revealed Resistance without submitting; Persimmon text choices and the controlled Quiz image pairs were exercised. FAQ open/close and Related Fruits navigation passed. Separate wheel checks scrolled the document by 450px from Avocado Quiz imagery, Check firmness, and Persimmon text choices at both widths. Browser QA was automated; real physical touch remains unverified.

Chrome requested the Heroes through `/_next/image`; responses were HTTP 200 `image/webp`. Optimized Hero payloads sampled about **15–85 KB** across 390/1440 viewports, with no failed image request or obvious oversized optimized Hero. A repeated Avocado mobile Hero GET returned `x-vercel-cache: HIT` both times; the response declares `public, max-age=0, must-revalidate`, so clients revalidate while Vercel's edge can reuse it. Single-run LCP samples ranged about **0.25–4.22 s** (the high sample was Avocado mobile); sampled CLS was **0**. These are browser smoke samples, not field Core Web Vitals or a performance guarantee. No actionable image/network regression was established.

No canonical tag is emitted. `NEXT_PUBLIC_SITE_URL` remains unset, and the deployed `/sitemap.xml` contains an empty `<urlset>`; the real absolute sitemap origin and robots sitemap reference await a purchased permanent domain. The temporary QA alias is publicly reachable and `/robots.txt` currently allows crawling, so it must not be treated as a completed SEO launch. No temporary Vercel URL was hard-coded into permanent metadata.

**Remaining human QA:** follow `docs/PHYSICAL_DEVICE_QA.md` on an actual iPhone Safari or Android Chrome, record device/OS/browser and any touch-scroll, visual, or layout issue. Physical-device status stays OPEN until that happens. Permanent domain, canonical policy, sitemap origin, and final public-launch review remain OPEN.
