# DEV-12 Release QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify the four-fruit release candidate, fix only reproduced P0/P1 defects, and record an evidence-backed release decision.

**Architecture:** QA runs against an isolated worktree at ASSET-02 HEAD and a Webpack production build in installed Chrome. Source inspection, automated checks, browser matrices, and asset inspection produce one factual release report; any focused fix receives its own regression verification and commit.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, ESLint, installed Chrome/Playwright.

**Spec:** User-provided `DEV-12 — Final Release QA` attachment, 2026-09-28; `docs/PRODUCT_SPEC.md`, `docs/ASSET_SPEC.md`, `docs/ASSET_02_AUDIT.md`, `docs/INTERACTION_SPEC.md`.

## Global Constraints

- Base commit: `66c07abe45316eb4cb58124e1304e57fbc57bec9` on `feature/asset-02-production-visuals`.
- Work only on isolated `feature/dev-12-release-qa`; do not merge or deploy.
- No new features, redesign, fifth fruit, speculative refactor, or unnecessary imagery/dependency.
- Fix reproduced P0/P1 only; record P2 unless tiny, safe, and directly visible.
- Do not claim physical-device QA from browser emulation; do not invent a production domain.
- Final gates: `pnpm test`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, `git diff --check` all exit 0.

## Review Focus

- Quiz visual choices might reveal correctness before selection: check initial DOM, accessible names, and images for every fruit.
- Firmness checks might answer, retain state, or trap scroll: exercise check/answer/reset and wheel/touch emulation.
- Production images might decode or load incorrectly: verify every registry source and representative network behavior.
- Static education might disappear without hydration: inspect HTML with JavaScript disabled.
- Canonical and sitemap might use a fabricated host: inspect deployment configuration and emitted metadata.

---

### Task 1: Establish clean release baseline

**Files:** Read the four specs, `PROJECT_STATE.md`, production content/components/metadata/styles/tests/assets; no application edits.

- [x] Confirm branch, HEAD, clean status, and isolated worktree.
- [x] Run baseline tests, lint, TypeScript, Webpack build, and diff check; record test totals, warnings, and route inventory. A pristine standalone TypeScript run needs Next-generated `LayoutProps`; it passed after build generated types.

### Task 2: Exercise release candidate in Chrome

**Files:** Create QA evidence under `/private/tmp`; report findings in `docs/RELEASE_QA.md`.

- [x] Check homepage at 1440/768/390; all four fruit routes at 1440/768/390/360 for required sections, imagery, overflow, page scroll, and browser errors.
- [x] Complete all five Quiz questions on every fruit, including wrong/Got it, restart, tactile checks, text choices, visual pairs, and keyboard/focus flow.
- [x] Check reduced motion at 390 on all four routes, JavaScript-off static content, wheel/emulated touch, semantics, links, SEO/crawl routes, and practical performance diagnostics.
- [x] Explicitly leave physical-device touch and unknown production-domain configuration OPEN.

### Task 3: Audit assets and source integrity

**Files:** Read `src/lib/fruit-assets.ts`, `public/fruits/**`, content, sitemap/robots/metadata, and privacy/runtime dependencies.

- [x] Reconcile 31 contracts and 20 WebP files, decode/dimensions/size/loading/alt/pairs and no served masters/placeholders.
- [x] Verify per-100g nutrition, metric counts, authoritative HTTPS sources, fruit-specific teaching invariants, and MVP privacy scope.

### Task 4: Close release QA

**Files:** Create `docs/RELEASE_QA.md`; update `PROJECT_STATE.md`; edit application/test files only if a reproduced P0/P1 requires a focused fix.

- [x] Classify all findings P0/P1/P2 and retest any fix, with focused commits.
- [x] Record route/viewport matrix, automated/browser evidence, limitations, RC versus public-launch status, blockers, and next action.
- [x] Re-run all final automated gates, commit QA documentation, and confirm clean status.
