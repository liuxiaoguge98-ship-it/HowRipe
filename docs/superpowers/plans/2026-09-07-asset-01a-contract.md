# ASSET-01A Asset Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce one typed registry and a reusable image boundary so all launch-fruit placeholders can later be replaced by changing registry records only.

**Architecture:** `src/lib/fruit-assets.ts` owns literal semantic keys, contracts, state, resolution, and validation. `FruitAsset` is a shared no-hook component that uses the registry to render a neutral ratio-preserving placeholder or a local `next/image`; existing components own their layouts and provide only their asset-key/contextual accessibility input.

**Tech Stack:** Next.js 16.3.4 App Router, React 19, TypeScript strict mode, Tailwind CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-07-asset-01a-contract-design.md`

## Global Constraints

- The TypeScript registry is the sole runtime source of truth; do not add JSON.
- The registry object key is the semantic key; do not duplicate it inside records.
- No fruit master, WebP, AVIF, stock, generated, or other final images are added.
- Preserve fruit copy, SEO, page ordering, quiz answers/semantics, and motion behavior.
- `FruitAsset` has no `"use client"`, hooks, server-only API, client state, or quiz business logic.
- Static sections remain server-rendered; QuizEngine remains the main client boundary.
- Use Next.js 16 `preload`, not deprecated `priority`.

---

### Task 1: Typed registry and contract validation

**Files:**
- Modify: `src/lib/fruit-assets.ts`
- Modify: `src/content/fruits/types.ts`
- Modify: `src/content/fruits/avocado.ts`
- Create: `tests/fruit-asset-contract.test.ts`
- Modify: `tests/fruit-assets.test.ts`

**Interfaces:**
- Produces `FruitAssetKey`, `FruitAssetRole`, `FruitAssetRecord`, `fruitAssets`, `resolveFruitAsset`, and `validateFruitAssetContracts()` from `src/lib/fruit-assets.ts`.
- `FruitContent` asset-key fields consume `FruitAssetKey`; production fruit modules continue to use their existing semantic values.

- [ ] **Step 1: Write failing contract coverage tests**

```ts
it("covers every asset key referenced by each production fruit", () => {
  for (const fruit of launchFruits) {
    for (const key of collectFruitAssetKeys(fruit)) {
      expect(resolveFruitAsset(key)).toBeDefined();
    }
  }
});

it("keeps every quiz A/B pair compatible and neutral", () => {
  expect(validateFruitAssetContracts()).toEqual([]);
});
```

Include assertions that all records are `status: "placeholder"` with no `src`, Pomegranate has no `timing` role, Persimmon variants agree on ratio/fit/background, no record has a dark source policy, and `FruitAssetKey` rejects an arbitrary production key through `@ts-expect-error` type coverage where practical.

- [ ] **Step 2: Run the targeted tests and confirm they fail because the complete contract and validators do not exist**

Run: `pnpm vitest run tests/fruit-assets.test.ts tests/fruit-asset-contract.test.ts`

Expected: FAIL with missing exports/coverage failures.

- [ ] **Step 3: Implement the literal registry and validators**

```ts
export const fruitAssets = {
  "avocado.hero": { fruit: "avocado", role: "hero", required: true, /* ... */ },
  // all launch keys, including every q01–q05 `.a` / `.b`
} as const satisfies Record<string, FruitAssetRecord>;

export type FruitAssetKey = keyof typeof fruitAssets;

export function resolveFruitAsset(key: FruitAssetKey) {
  return fruitAssets[key];
}
```

Use a helper to generate each homogeneous A/B pair only if it preserves literal keys; otherwise enumerate them. Validate namespace fruit, exactly two option suffixes per `pairId`, matching comparison fields, neutral quiz accessibility, the required roles, and absent production `src` on placeholders. Replace the old regex fallback with explicit inventory entries. Apply `FruitAssetKey` to Hero, Timing, Picking, Variant, and QuizOption fields without changing their object shape or content.

- [ ] **Step 4: Run focused tests and TypeScript**

Run: `pnpm vitest run tests/fruit-assets.test.ts tests/fruit-asset-contract.test.ts && pnpm exec tsc --noEmit`

Expected: all target tests pass and no TypeScript errors.

- [ ] **Step 5: Commit the registry change**

```bash
git add src/lib/fruit-assets.ts src/content/fruits tests/fruit-assets.test.ts tests/fruit-asset-contract.test.ts
git commit -m "feat: add typed fruit asset contract"
```

### Task 2: Shared presentational image boundary and slot integration

**Files:**
- Create: `src/components/fruit/FruitAsset.tsx`
- Modify: `src/components/fruit/FruitHero.tsx`
- Modify: `src/components/fruit/TimingGuide.tsx`
- Modify: `src/components/fruit/PickingGuide.tsx`
- Modify: `src/components/fruit/VariantOverview.tsx`
- Modify: `src/components/quiz/QuizEngine.tsx`
- Create: `tests/fruit-asset-renderer.test.tsx`
- Modify: `tests/fruit-page.test.tsx`
- Modify: `tests/quiz-engine.test.tsx`

**Interfaces:**
- Consumes `FruitAssetKey` and `resolveFruitAsset`.
- Produces `FruitAsset({ assetKey, alt, className? })`, a shared component usable by static server sections and by QuizEngine.

- [ ] **Step 1: Write failing renderer and integration tests**

```tsx
it("reserves the placeholder contract ratio without exposing its key", () => {
  const html = renderToStaticMarkup(<FruitAsset assetKey="avocado.hero" alt="Avocado" />);
  expect(html).toContain("aspect-[4/5]");
  expect(html).not.toContain("avocado.hero");
});

it("switches a synthetic record to a production source without caller changes", () => {
  expect(renderAsset(testProductionAsset)).toContain("/fruits/test/hero.webp");
});
```

Assert that all five component families render their configured assets, quiz option buttons retain only Option A/B accessible names at first render, and the production path uses `next/image` with contract fit, position, `sizes`, and `preload`/loading behavior.

- [ ] **Step 2: Run targeted renderer tests and confirm failure**

Run: `pnpm vitest run tests/fruit-asset-renderer.test.tsx tests/fruit-page.test.tsx tests/quiz-engine.test.tsx`

Expected: FAIL because `FruitAsset` does not exist and present components do not render their asset slots.

- [ ] **Step 3: Implement `FruitAsset` and wire existing slots**

```tsx
export function FruitAsset({ assetKey, alt, className }: FruitAssetProps) {
  const asset = resolveFruitAsset(assetKey);
  return <div className={cn("relative overflow-hidden", ratioClass[asset.aspectRatio], className)}>
    {asset.status === "production" && asset.src ? <Image fill src={asset.src} alt={alt} sizes={sizesForRole[asset.role]} style={{ objectFit: asset.objectFit }} preload={asset.loading === "critical"} loading={asset.loading === "lazy" ? "lazy" : undefined} /> : <div aria-hidden="true" className="h-full w-full bg-[var(--fruit-soft)]" />}
  </div>;
}
```

Use an implementation that avoids a `cn` dependency if none exists. Do not add hooks or `"use client"`. Use context copy supplied by Hero/Timing/Picking/Variant as alt input; render empty alt only for neutral Quiz comparisons. Preserve current parent grids, headings, anchors, and Quiz state/feedback behavior.

- [ ] **Step 4: Run targeted integration tests and static HTML regression tests**

Run: `pnpm vitest run tests/fruit-asset-renderer.test.tsx tests/fruit-page.test.tsx tests/quiz-engine.test.tsx tests/four-fruit-audit.test.tsx`

Expected: all pass; static page output contains core text and neutral placeholder surfaces, not semantic key strings or answer meaning.

- [ ] **Step 5: Commit renderer integration**

```bash
git add src/components/fruit src/components/quiz/QuizEngine.tsx tests
git commit -m "feat: render fruit assets through shared boundary"
```

### Task 3: Human inventory, project state, and full verification

**Files:**
- Create: `docs/ASSET_SPEC.md`
- Modify: `PROJECT_STATE.md`
- Modify: any affected existing test expectations only when placeholder markup replaces old visible labels

**Interfaces:**
- Documents the TypeScript contract without creating a second runtime registry.
- Produces ASSET-01A project-state completion record after verification.

- [ ] **Step 1: Write a documentation consistency test or a focused registry snapshot assertion**

```ts
it("documents all launch fruits through contract records", () => {
  expect(Object.values(fruitAssets).map((asset) => asset.fruit)).toEqual(expect.arrayContaining(["avocado", "kiwi", "pomegranate", "persimmon"]));
});
```

- [ ] **Step 2: Add `docs/ASSET_SPEC.md`**

Document global source/delivery rules, five role definitions, comparison invariant, accessibility, local public path layout, stable filenames, responsive sizes, source-master policy, pixel guidance, budgets, ASSET-01B replacement steps, and one inventory table row per registry object key. Each row lists key, role, purpose, ratio, background policy, load behavior, required status, and pair ID. Do not include prompts, fake paths, or final images.

- [ ] **Step 3: Update project state**

Add `ASSET-01A — Production Asset Contract & Integration Architecture: COMPLETE` with the typed contract, shared rendering boundary, role system, and four-fruit inventory only after successful verification.

- [ ] **Step 4: Run all required automated checks**

Run:

```bash
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
git diff --check
```

Expected: every command exits 0. The build uses the existing supported Webpack production configuration.

- [ ] **Step 5: Run browser and JavaScript-disabled smoke checks**

Start the built app, then verify `/avocado`, `/kiwi`, `/pomegranate`, and `/persimmon` at 1440px normal motion; verify one representative page plus Quiz at 390px with reduced motion; and verify static educational content with JavaScript disabled. Confirm no horizontal overflow, errors, answer leakage, or unstable asset slots.

- [ ] **Step 6: Commit documentation and completion state**

```bash
git add docs/ASSET_SPEC.md PROJECT_STATE.md tests
git commit -m "docs: record fruit asset integration contract"
```

## Plan self-review

- Registry source-of-truth, static key union, contract roles/fields, source background policy, pair invariants, placeholder state, and Pomegranate/Persimmon special rules are Task 1.
- Server-compatible shared renderer, all five rendering slots, load/sizes/ratio behavior, neutral Quiz accessibility, and future production switching are Task 2.
- Human-facing inventory, ASSET-01B handoff, state recording, all automated checks, browser smoke, and no-JS verification are Task 3.
- The plan contains no runtime JSON registry, asset generation, content/motion changes, or ASSET-01B scope.
- Placeholder scan completed: no `TBD`, `TODO`, or incomplete implementation references remain.
