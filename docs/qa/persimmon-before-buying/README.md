# Persimmon: evidence available before buying

2026-09-30. Corrects the scenario mismatch in the previous illustrated quiz: cut flesh cannot be inspected when choosing a whole fruit in a shop.

## Changes

- Hero and variety overview establish the shopping sequence: confirm the label or ask the seller, inspect intact skin, check firmness gently, and select for the intended eating time.
- Both variety lessons now show whole fruit. Fuyu uses its existing whole-fruit image. Hachiya uses a new whole-fruit gentle-touch demonstration; no cut surfaces appear in the rendered page.
- Q1 compares confirmed Fuyu and Hachiya for eating today. Q2 compares whole Hachiya fruit with explicit hand-feel descriptions. Q3 treats shape as a clue requiring variety confirmation. Q4 checks major external damage. Q5 now asks about buying Hachiya to soften at home instead of repeating a variety rule.
- Firm Hachiya is distinguished from damaged fruit: a sound firm specimen may suit a later eating plan, though fresh untreated fruit needs to become very soft before eating. All five questions retain images, answer keys A/A/B/B/A and manual Got it progression.
- Q2/Q5 intentionally use equal whole-fruit imagery: photographs cannot establish hand-feel. The descriptions explicitly supply that evidence; no deceptive color or deformation cue is added.
- Removed the two unused cut-flesh asset records. Old generated image files remain as historical artifacts, but no active page content references them. The active asset inventory is 45 records.

## New image

Built-in `image_gen` edit based on the existing whole Hachiya image. Selected output: `public/fruits/persimmon/education/hachiya-whole-touch.webp`, 1448×1086, 119,958 bytes. Shows a complete fruit supported in a palm and touched gently, with intact skin, no tools, cuts or exposed pulp. Full prompt and source/output paths: [prompt.json](prompt.json).

## Content sources checked

- [UC ANR persimmon guidance](https://ucanr.edu/node/137200/printable/print): distinguishes firm Fuyu from fully softened Hachiya eating textures.
- [UC Davis persimmon maturity and quality](https://postharvest.ucdavis.edu/produce-facts-sheets/persimmon): variety-specific color, absence of cracks/injuries/decay, softening, and treatment-dependent astringency. Copy specifies fresh untreated Hachiya for its softness rule.

## Verification

- 76 tests across 22 files, ESLint, TypeScript and production build passed.
- Added a regression check excluding cut-flesh image references from lessons/questions and distinguishing the intended answers for today versus later.
- Chrome: 1366×650, 390×844 and 360×800. All page images decoded and no cut-flesh URLs rendered. Five questions completed at each width, with correct and wrong feedback, explicit Got it, completion/restart, no browser errors and no horizontal overflow.
- Quiz height 620px desktop / 680px phone, all 15 Got it scroll deltas zero. Desktop/mobile screenshots include every lesson and question. [Measurements](results.json), [check script](check.mjs).
- Manually inspected the new hand photograph, Hachiya lesson and Q2 desktop/mobile feedback. No style changes to the other fruits. Local preview only.
