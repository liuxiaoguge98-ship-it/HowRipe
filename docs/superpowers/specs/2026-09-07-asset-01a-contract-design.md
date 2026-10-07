# ASSET-01A Production Asset Contract Design

## Goal

Make the four launch fruits ready for a mechanical future replacement of neutral placeholders with approved local production assets. The replacement path is a production file added under `public/fruits/`, then one registry record changed from placeholder to production; page components, fruit content, quiz rules, copy, and motion do not change.

## Scope and non-goals

This node introduces a typed runtime asset contract, a generic server-compatible renderer, validation, and a human-readable integration inventory. It does not create, obtain, edit, or commit fruit imagery. It does not alter fruit copy, SEO, quiz answers, page ordering, layout concepts, or motion behavior.

## Current-state findings

`FruitContent` currently stores semantic `assetKey` values on hero, Kiwi timing and picking content, Pomegranate picking content, Persimmon variants, and dynamic A/B quiz options. `fruit-assets.ts` is a partial placeholder registry plus a permissive fallback. Renderers currently either show a placeholder label (Hero and Quiz) or ignore their present asset keys (Timing, Picking, Variant). The project uses Next.js 16.3.4, where `next/image` supports `fill`, `sizes`, `loading`, and `preload`; `priority` is deprecated.

## Architecture

### Runtime source of truth

`src/lib/fruit-assets.ts` will be the only machine-readable registry. Its object keys are the only semantic asset keys, and it derives `FruitAssetKey = keyof typeof fruitAssets`; individual records do not repeat a `key` property. An `as const satisfies` registry declaration, helper factory, or equivalent TypeScript pattern validates each record while preserving the literal key union. The registry records both the public asset state and its contract:

```ts
type FruitAssetRecord = {
  fruit: FruitSlug;
  role: FruitAssetRole;
  required: boolean;
  aspectRatio: "1:1" | "4:3" | "4:5" | "3:2";
  sourceBackground: "transparent-preferred" | "white-preferred" | "transparent-or-white";
  objectFit: "contain" | "cover";
  desktopPosition?: string;
  mobilePosition?: string;
  loading: "critical" | "lazy" | "interactive";
  accessibility: "descriptive" | "neutral-quiz" | "decorative";
  pairId?: string;
  purpose: string;
  status: "placeholder" | "production";
  src?: string;
};
```

The five reusable roles are `hero`, `timing`, `education`, `comparison`, and `variant`. The full registry enumerates every launched hero, all current Kiwi timing and picking assets, Pomegranate educational assets, Persimmon variants, and Q01–Q05 A/B comparison keys for every launch fruit. Avocado has no current timing or education key, so no obsolete image idea is added. Pomegranate has no timing key.

The type model will replace production `assetKey: string` fields with `FruitAssetKey` (optional where an asset remains optional). This preserves the content structure while rejecting unknown keys at compile time. A small test-only factory may accept a structural record so the renderer's future production path can be verified without adding a real fruit file.

### Generic rendering boundary

`src/components/fruit/FruitAsset.tsx` accepts only an `assetKey`, contextual alt text when needed, and presentational class names. It resolves a record, reserves the registry aspect ratio before content loads, and:

- renders the current neutral light placeholder when `status` is `placeholder`;
- renders `next/image` with `fill`, role-level `sizes`, contract object-fit/position, and role-level load behavior when a production `src` exists;
- maps `critical` to the Next.js 16 `preload` behavior, `lazy` to lazy loading, and `interactive` to normal lazy image loading once its quiz option enters the DOM.

The component is server-compatible and shared presentational infrastructure: it has no `"use client"` directive, hooks, server-only API, event handlers, quiz state, feedback state, or fruit-specific copy. A Server Component using it remains server-rendered; when `QuizEngine` uses it, it becomes a client dependency without adding state or Quiz business logic. It does not determine Quiz correct/wrong semantics, page section layout, or accessibility meaning. Its caller supplies descriptive alt text for educational content. For neutral quiz records it renders an empty image alt while `QuizOption` keeps the existing neutral Option A/B button label; therefore selection meaning cannot leak before an answer.

Hero, TimingGuide, PickingGuide, VariantOverview, and QuizEngine will each use this boundary inside their existing structural markup. Components choose their own grid/section layout, while the asset boundary supplies only the reserved image box and media/placeholder. The Quiz stays client-only because of its existing state, but the image boundary itself stays server-compatible.

### Contract rules

All records must use transparent-preferred, white-preferred, or transparent-or-white source policy; dark and black source requirements are not representable. Hero records are 4:5, contain, critical, and descriptive. Timing records are 1:1, contain, lazy, and descriptive. Education uses 4:3 or 1:1 with an explicit fit. Comparison records are 1:1, contain, interactive, and neutral-quiz. The Fuyu and Hachiya variant records share 4:5, compatible background policy, contain, lazy, and descriptive settings.

Each comparison pair receives a fruit-scoped `pairId` such as `kiwi-q03`. Validation requires exactly two records per pair, one `.a` and one `.b`, sharing fruit, ratio, fit, background policy, accessibility mode, and pair ID. It also verifies every production content key resolves; all assets in ASSET-01A remain placeholder records and have no `src`.

### Responsive, delivery, and file policy

The renderer centralizes role-level `sizes`: Hero uses roughly 85vw mobile / 40vw desktop; Timing 46vw / 22vw; Education 100vw in the content column / 50vw desktop; Comparison 46vw / 360px desktop; Variant 45vw / 25vw. Future local derivatives live under `/public/fruits/<fruit>/<role>/` and use stable names such as `hero.webp` and `quiz/q01-a.webp`. Master PNGs (including transparency) remain outside runtime paths; WebP/AVIF derivatives may be optimized through the normal Next pipeline and must not replace a source master.

Production targets are Hero <=300 KB (preferred <=220 KB), education/variant <=220 KB (preferred <=160 KB), and each quiz asset <=160 KB (preferred <=120 KB). ASSET-01A documents these targets only; it does not enforce them against neutral placeholders.

### Validation and tests

Focused tests will exercise exported registry validation helpers and static rendering:

1. every asset key found in each production FruitContent resolves and appears in the contract;
2. registry keys are unique and their fruit namespace agrees with `fruit`;
3. each launch quiz Q01–Q05 pair is complete and compatible, with neutral quiz accessibility;
4. no dark source policy exists; Pomegranate has no timing record; Persimmon variants are compatible;
5. every production contract is placeholder state with no `src`;
6. a placeholder render reserves the configured ratio and does not expose an internal key;
7. a synthetic record proves placeholder-to-production source switching without changing the `FruitAsset` caller API.

Existing page and quiz tests will be updated only for the neutral placeholder markup and unchanged semantics.

### Documentation and state

`docs/ASSET_SPEC.md` is generated/maintained as a human-facing view of the TypeScript contract. It lists global rules, role definitions, directory/naming rules, responsive and performance guidance, source-master policy, and the per-fruit inventory including pair IDs. It contains no generation prompts and is not a second runtime registry. `PROJECT_STATE.md` records ASSET-01A as complete after implementation and verification.

## Acceptance criteria

- Every launched route retains its current content and interaction behavior with neutral placeholders.
- The registry object key is the only runtime semantic asset key, the registry is the only runtime asset source of truth, and production keys are statically derived from it.
- The generic renderer can change to a valid local production source solely through a registry record.
- Static reading content remains visible without JavaScript, and initial quiz controls remain neutral.
- Tests, lint, TypeScript, Webpack production build, `git diff --check`, and the requested browser smoke checks pass before completion.
