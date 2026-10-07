# BRAND-HOME-01 — visual and regression report

2026-10-07 baseline; 2026-10-08 final local verification. Branch: `feature/brand-home-unification`. Production base: `c2a471388abd63fc701a9165c3c1c0f621d137c8`. Main was clean, tracking origin/main, fast-forwarded before the feature branch was created. No production merge or deployment.

## Baseline and brand audit

[Pre-implementation diagnosis](BASELINE.md) · [every old-brand occurrence](baseline/brand-audit.json). The old homepage used Georgia, a long slogan, no fruit imagery, four boxed links and a two-line mobile legacy wordmark. Current fruit pages use rounded Sans, fruit-specific surfaces and large specimens. The user explicitly chose that current font direction instead of the brief's outdated serif wording.

Changed public identity in global header, new footer brand, root/home metadata, and Avocado's existing title suffix. The maintained product specification now says HowRipe. OG siteName already said HowRipe and remains intact. Home social titles inherit the new SEO title. Other fruit titles retain their established search intent. Private package name, original Vercel project name and historical evidence stay accurate; no new social assets or invented copyright/legal text.

## Final design

Header: typographic HowRipe, one Choose a fruit link, an unobtrusive desktop note, shared 44px targets and contextual fruit colors. Footer: HowRipe, preserved practical-guidance description, all live fruit links and a return to the index.

Home: two-line Pick better fruit headline, concise purpose, four approved transparent assets in one overlapping composition. A numbered open fruit index uses green/olive/ruby/orange accents, narrow rules, large media wells, names, promises and clear links. Desktop has an offset two-column rhythm; mobile follows 01–04 in one column. Paper/neutral surfaces and subtle radial light integrate all specimens without a white image rectangle, blending, generated media or source alteration. Original Persimmon hero shows both whole types.

Typography: actual browser H1 font stack matches on all five routes; existing rounded display family + Arial supporting text, consistent labels/tracking/weight. Motion: existing one-time hero entrance, restrained arrow hover and 1.02 image hover; no loops/parallax. Reduced motion disables entrance/transition animation and keeps content visible.

The follow-up language correction removes authored Chinese hero fields/rendering/styles from Kiwi/Persimmon and the unused type field. All English factual guidance, quiz questions/answers, tactile mappings, storage, nutrition and source URLs are unchanged. Other fruit-page architecture/style is unchanged.

## Iteration and self-critique

[First desktop](pass-1/home-1440.png) · [first phone](pass-1/home-390.png). Second pass moved fruit names above the images so choices scan immediately, tightened desktop offsets and grouped the hero specimens. A browser regression then caught a 392px document at a 390px viewport: the rotated avocado image's transparent element box extended beyond its well. A focused browser experiment identified the sole offending image and verified 392→390 when constrained to that image well. The final fix uses local media containment, no document overflow mask; the complete fruit silhouette remains visible.

| Criterion | Score / 5 | Evidence |
| --- | --- | --- |
| Brand coherence | 5 | HowRipe in shell and metadata, no legacy brand in rendered pages |
| Homepage ↔ inner consistency | 4.5 | Same computed display font, shared shell, natural surfaces and fruit colors |
| Editorial quality | 4 | Open numbered index and specimen-led composition with a distinct homepage role |
| Fruit integration | 4.5 | Transparent approved imagery on soft media light; no destructive blend |
| Mobile quality | 4.5 | Two-line hero, readable wordmark, ordered index, complete fruit and zero overflow |

Ten-point critique: Home clearly belongs to the fruit pages; HowRipe is the brand; Fruit Picking Guide no longer functions as a logo; fonts are actually equal; home remains a brand/index entry point; images integrate; no boxed four-card grid; fruit navigation is prominent; mobile has deliberate reading order; no SaaS chrome. The remaining judgment is the user's visual approval of the existing fruit asset edges and staggered editorial rhythm. No further material implementation defect identified after the final pass.

## Local production browser QA

[Reproducible script](browser-qa.mjs) · [all browser results](local/browser.json). Installed Chrome, actual `pnpm build`/`pnpm start`, normal motion, with a separate reduced-motion check.

| Width | Routes passed | Document width | Visual result |
| --- | --- | --- | --- |
| 1440 | All five | 1440 = 1440 | Hero, index, footer and inner headers reviewed |
| 1024 | All five | 1024 = 1024 | No headline, grid or nav overflow |
| 768 | All five | 768 = 768 | Two-column layout remains legible |
| 390 | All five | 390 = 390 | Intentional single-column index and full cluster |
| 360 | All five | 360 = 360 | Wordmark/navigation fit, no clipped fruit/text |

[Home desktop](local/home-1440.png) · [Home 390](local/home-390.png) · [Home 360](local/home-360.png) · [Hero](local/hero-1440.png) · [Index](local/fruit-index-1440.png) · [Footer](local/footer-1440.png) · [Avocado](local/avocado-1440.png) · [Kiwi](local/kiwi-1440.png).

Regression: all 25 route/width combinations passed; 8 complete five-question quizzes at 1440/390 cover feedback, explicit Got it, completion and Restart; firmness actions preserve answering state; FAQ opens. Header/home/index navigation, internal anchor targets and loaded visible assets pass. Closed disclosures intentionally defer hidden lazy images. No console/page errors.

Accessibility: one H1 per route, no heading-level skips, semantic links with fruit names/descriptions, decorative duplicate images have empty alt, no missing alt, 44px shell targets, keyboard Tab/Enter navigation and visible focus. Reduced-motion animation is none, text opacity 1. Measured homepage small-text contrast: body 5.33:1, orange link 4.76:1, ruby 6.38:1, greens 5.17:1, footer body 5.13:1.

SEO: all five canonical URLs and OG URLs retain https://www.howripe.com; root metadataBase, robots and five-entry sitemap remain unchanged. No route or dependency/lockfile/asset changes. Home purpose and fruit search titles remain readable in server-rendered HTML. All visible text and all quiz feedback checked English only.

## Automated gates

- `pnpm test`: 86 passed, 24 files. Brand and language tests were verified failing before their changes, then passing. Existing homepage-copy assertions updated for the approved redesign.
- `pnpm lint`: pass.
- `pnpm exec tsc --noEmit`: pass.
- `pnpm build`: pass; all five pages plus robots/sitemap statically generated.
- `git diff --check`: pass.
- Dependencies / production imagery: zero additions or changes.

## Git and Preview

Feature branch was pushed after the local gates above. Git integration automatically created a READY Preview from `9bc00792ee038ca3b9f09ebda82253a904fe2dc5`. The existing project is `fruit-picking-guide`, linked to `liuxiaoguge98-ship-it/HowRipe`, with production branch `main`. Do not create another project, run vercel --prod or merge. Preview keeps Vercel Authentication; automated validation uses the official authenticated testing mechanism. Final deployment status and URL are recorded after Git-triggered deployment validation.


## Actual Vercel Preview verification — PASS

[Immutable tested Preview](https://fruit-picking-guide-d5ka6gkwy-good-dc6d.vercel.app) · [branch Preview](https://fruit-picking-guide-git-feature-brand-home-uni-e2303c-good-dc6d.vercel.app) · [deployment evidence](preview/deployment.json) · [browser results](preview/browser.json).

The original Git-triggered Preview is READY, target preview (`null` in Vercel's target field), source `git`, in the same existing project. Both desktop 1440×1000 and phone 390×844 were tested on the actual remote URL across all five routes: 10 route/width combinations, 8 complete Quiz flows, zero overflow, loaded visible images, English-only body/feedback, HowRipe header/footer, correct canonical/OG branding and matching font stacks. Keyboard navigation, visible focus, FAQ, firmness checks, Got it, completion, Restart, reduced motion, robots and sitemap pass. No console/page errors. Desktop hero, index and footer PNG files are byte-identical to local production captures; phone composition was also visually reviewed.

[Remote desktop](preview/home-1440.png) · [remote phone](preview/home-390.png) · [remote Avocado](preview/avocado-1440.png) · [remote Kiwi](preview/kiwi-1440.png) · [remote Persimmon phone](preview/persimmon-390.png).

Remote Chrome required the machine's existing HTTPS proxy. The test waits for real navigation completion rather than a fixed 200ms delay; neither adjustment changes product code. Authenticated testing follows [Vercel's documented automation access](https://vercel.com/docs/cli/curl), with credentials kept out of reports and screenshots.

[Content freeze verification](content-freeze.json) confirms that all four English content files exactly match production after allowing only the Avocado title suffix and removal of the two Chinese lines. Quiz implementation, all assets, crawl origin and dependencies are unchanged.

Implementation commits: `58421e6` (brand/home), `b6db501` (English only), `9bc0079` (direction and local QA). The final follow-up commit contains evidence and documentation only; its live Preview must be READY before handoff. PR creation is optional and was not performed. Main remains `c2a471388abd63fc701a9165c3c1c0f621d137c8`.

Continuation check: “Is meaningful BRAND-HOME-01 visual refinement still executable?” No material unresolved defect remains within the approved scope after these iterations and actual Preview review. Five self-scores are all at least 4. **BRAND-HOME-01: PASS — awaiting user visual approval.** Do not merge main or deploy production.

The temporary automation credential used for Preview QA was revoked after verification. The project has zero remaining automation bypass credentials and its original Vercel Authentication configuration is unchanged.
