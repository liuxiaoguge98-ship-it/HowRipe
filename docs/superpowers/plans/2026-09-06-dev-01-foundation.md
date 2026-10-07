# DEV-01 Foundation + Fruit Content Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a static, typed Next.js foundation for the Fruit Picking Guide MVP, with Avocado proving the reusable content and page composition architecture.

**Architecture:** Fruit-specific content lives in typed modules and is retrieved through one content index. Generic Server Components receive only `FruitContent`; a semantic asset registry resolves placeholders without leaking public paths into content or components. App routes remain thin and derive route metadata from the content record.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript strict mode, Tailwind CSS v4, Vitest.

**Spec:** `docs/PRODUCT_SPEC.md`

## Global Constraints

- Do not implement DEV-02 or later nodes.
- Do not implement a Quiz Engine, feedback, transitions, or motion.
- Do not add database, authentication, CMS, AI runtime, analytics, advertising, or unnecessary dependencies.
- Keep static picking content server-rendered and do not create scroll traps.
- Keep image paths inside the central asset abstraction; use placeholders only.
- Keep Avocado-specific copy in structured content, never in generic fruit components.
- Preserve TypeScript strict mode and use a mobile-first responsive layout.

---

### Task 1: Establish application shell and design tokens

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`

**Interfaces:**
- Produces `Header` and `Footer`, reusable server-rendered layout components.
- Produces CSS custom properties for page colors, typography, spacing, and per-fruit accent consumption.

- [ ] Replace starter metadata and typography with the Fruit Picking Guide shell.
- [ ] Add warm off-white, charcoal, border, spacing, and typography tokens to `globals.css`.
- [ ] Add minimal Header and Footer components and render them in the root layout.
- [ ] Verify the app route still renders through `pnpm build` after remaining tasks are complete.

### Task 2: Define content and asset contracts with focused tests

**Files:**
- Create: `src/content/fruits/types.ts`, `src/content/fruits/index.ts`
- Create: `src/lib/fruit-assets.ts`
- Create: `src/lib/fruit-metadata.ts`
- Create: `tests/fruit-content.test.ts`, `tests/fruit-assets.test.ts`
- Modify: `package.json`, `pnpm-lock.yaml`

**Interfaces:**
- Produces `FruitSlug`, `FruitContent`, `getFruitContent(slug)`, `resolveFruitAsset(key)`, and `fruitMetadata(fruit)`.
- `resolveFruitAsset` returns a placeholder descriptor for every registered semantic key and throws for an unknown key.

- [ ] Add Vitest as the focused test runner and a `test` package script.
- [ ] Write a failing test proving `getFruitContent("avocado")` is retrievable and that its SEO H1 is required.
- [ ] Write a failing test proving semantic asset resolution returns a placeholder and rejects unknown keys.
- [ ] Implement the narrow types, content index, metadata helper, and placeholder asset registry to satisfy those tests.
- [ ] Run the focused tests and commit the isolated content-foundation change.

### Task 3: Seed Avocado and compose reusable static fruit components

**Files:**
- Create: `src/content/fruits/avocado.ts`
- Create: `src/components/fruit/FruitPage.tsx`, `src/components/fruit/FruitHero.tsx`, `src/components/fruit/QuickChecks.tsx`
- Create: `src/app/avocado/page.tsx`
- Modify: `src/app/page.tsx`
- Create: `tests/avocado-content.test.ts`

**Interfaces:**
- `FruitPage({ fruit }: { fruit: FruitContent })` composes the generic hero and quick checks.
- `FruitHero` and `QuickChecks` consume generic content fields only.
- The Avocado route imports content through `getFruitContent` and uses `fruitMetadata`.

- [ ] Write a failing content test for the confirmed Avocado direct answer, five quick checks, quiz-data shape, and placeholder-backed hero key.
- [ ] Implement representative Avocado content covering every planned content-model responsibility without a quiz UI.
- [ ] Implement generic server components and a thin `/avocado` route.
- [ ] Replace the starter homepage with a minimal product statement and four guide cards, linking only Avocado.
- [ ] Run focused tests, lint, TypeScript validation, and the production build.
- [ ] Commit the page foundation.

### Task 4: Record current state and verify the DEV-01 boundary

**Files:**
- Create: `PROJECT_STATE.md`

**Interfaces:**
- Records the completed node, implementation boundaries, validation commands, and DEV-02 handoff.

- [ ] Document that DEV-01 is complete and explicitly list deferred systems: complete Avocado article, quiz engine/content interaction, accessibility pass, motion, and the other fruit pages.
- [ ] Re-read the acceptance requirements against the working tree.
- [ ] Run `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm exec tsc --noEmit` and record the actual results.
- [ ] Commit the project-state and validation record.
