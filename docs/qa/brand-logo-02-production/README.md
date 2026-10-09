# BRAND-LOGO-02 — Production release

Date: 2026-10-09. **User visual approval: PASS. Production release authorized.**

Approved branch: `feature/brand-logo-ripe-signal`. Approved application HEAD: `de499d570895e0167e40f2618546afed736a490a`. Previous released main: `60d2d8b40c9b438e9f35d5417e2097b9828d6c67` (`v1.0.0`). A release-only follow-up records approval, verification and the pre-release public-site baseline; application code/assets remain identical to the approved HEAD.

## Release scope

- Final Ripe Signal SVG mark/wordmark, reverse artwork, compact 16/32/48 favicon, Apple and 192/512 square icons; existing approved filenames are retained.
- Shared Header/Footer brand link, existing rounded typography, restrained green i-dot, low-priority decorative image and preserved hero-only preload.
- Root icon metadata and minimal English manifest, removing the conflicting Next scaffold favicon source.
- The user's immediately preceding related-fruit white-background fix: move the existing blend declaration into the shared image rule, removing the theme-only duplicate. This changes no content, source image or layout.
- Direct tests, QA evidence, archival A1 comparison and documentation. Historical A1 files are not public artwork.

Cumulative diff audit verifies unchanged fruit content, Quiz logic, homepage/fruit routes and page structure, source fruit imagery, image-delivery settings, canonical/site-origin code, robots, sitemap, dependencies, lockfile and deployment configuration. No DNS change or manual Production deployment is part of the workflow.

## Fresh release gates

| Command | Result |
| --- | --- |
| `pnpm test` | PASS — 27 files / 96 tests |
| `pnpm lint` | PASS |
| `pnpm exec tsc --noEmit` | PASS |
| `pnpm build` | PASS — Next.js 16.3.4 webpack, existing five public content routes |
| `git diff --check` and cumulative diff-check | PASS |

Previously verified candidate evidence includes [brand visuals and browser QA](../brand-logo-02/README.md) and the [five-route image-background audit](../image-background-fix/README.md). Current-HEAD Preview checks must be successful before merging.

## Production verification

The authorized workflow is feature branch → GitHub PR → passing exact-HEAD checks → squash main → fast-forward local main → existing Vercel Git integration → Production READY → public QA → safe merged-branch cleanup. Do not use `vercel --prod`, alter DNS or change stable favicon paths.

The [pre-release baseline](baseline.json) records all five public routes' canonical, title, description, H1, main-text/link and JSON-LD signatures, plus exact robots/sitemap bytes. `site-regression.mjs` compares the live post-release site to this baseline. Header/Footer changes sit outside main content.

Public QA also runs the existing brand browser audit on Home/Avocado at 1440/390: decoded brand links, actual 16/32px Chrome tab-cache pixels, all 11 deployed asset bytes/types, manifest parsing, CLS 0, no overflow/console errors, images, navigation and Quiz. The image-background audit covers all five routes at both widths, 33 image sources and all 40 Quiz question checks.

Final PR URL, squash SHA, automatic Production deployment identity, public QA results and cleanup are recorded in the merged PR description and the standalone `HowRipe-release-reports/brand-logo-02-production/` report. This avoids another main deployment solely to insert its own merge SHA. No new version tag or GitHub Release is requested.
