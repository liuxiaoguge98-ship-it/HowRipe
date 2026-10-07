# Illustrated quizzes and explicit buying decisions

2026-09-30. Local preview: port 3107. Scope: Kiwi, Pomegranate and Persimmon quizzes.

## Copy correction

- Replaced every quiz occurrence of “leave behind”, “leave this one” and “leave it” with explicit buying decisions. The three negative questions now ask “Which … should you avoid buying?” and say “Select the fruit you should NOT buy.”
- Negative-question result labels distinguish answering correctly from recommending the fruit: “B: Correct — do not buy” and “A: Not the fruit to avoid”. Reasons state the actual buying advice.
- Kiwi quiz copy uses “kiwifruit” to reduce confusion with the nationality. The screenshot's Chinese was external translation, not authored site content; no third-party translator output is guaranteed.
- Correct answers and incorrect answers both remain visible until Got it. Answer keys are unchanged.

## Image coverage

Every question has images for both options. Nine previously text-only questions now combine pictures with descriptions.

| Fruit | Q1 | Q2 | Q3 | Q4 | Q5 |
|---|---|---|---|---|---|
| Kiwi | Whole fruit + firmness check | Minor scuff / localized bruise | Fuzzy intact condition / bruised area | Whole fruit + firmness check | Minor scuff / localized bruise |
| Pomegranate | Same-sized fruit + described weight | Angular / round shape | Intact rind / deep crack | Pale / dark rind + described weight | Angular intact fruit / cracked fruit |
| Persimmon | Fuyu / Hachiya silhouettes | Soft jelly flesh / firm flesh | Fuyu / Hachiya | Intact / damaged fruit | Both variety examples paired with each proposed rule |

Weight and firmness are not inferred from a static image. Those scenarios retain descriptive evidence or the existing Check firmness control. Persimmon cut surfaces are explicitly illustrative examples. Result verdicts are HTML, not baked into pictures, and appear only after answering. Illustrations are decorative to screen readers; the option description supplies its meaning without leaking the answer through image alt text.

## Generated assets

Mode: built-in `image_gen` edits of existing site images. No new dependencies. The four selected PNG outputs were encoded as WebP; cutout transparency was retained. Full prompts: [prompts.json](prompts.json). Source/output paths: [assets.json](assets.json).

- `public/fruits/kiwi/quiz/kiwi-scuff.webp` — 1254×1254, alpha.
- `public/fruits/kiwi/quiz/kiwi-bruise.webp` — 1254×1254, alpha.
- `public/fruits/pomegranate/quiz/pomegranate-pale.webp` — 1254×1254, alpha.
- `public/fruits/persimmon/quiz/hachiya-firm.webp` — 1448×1086, matching tabletop scene.

Existing variety, rind-condition and tactile quiz images were reused. Scoped illustration CSS overrides inherited specimen zoom so complete fruit silhouettes and cut surfaces remain visible; hover retains the themed background. The approved Avocado content and styles were not edited.

## Verification

- 75 tests across 22 files passed; ESLint, TypeScript, production build and diff check passed.
- `check.mjs`: all 15 questions at 1366×650, 390×844 and 360×800 (45 question cycles). Every image decoded; each question has at least two images; no pre-answer verdict; both feedback paths require Got it; completion/restart work; no browser errors or horizontal overflow.
- Native quiz stage heights: 620px desktop / 680px phone. All 45 Got it scroll deltas were zero. New illustrations have no inherited transform; hover does not change their background. Results: [results.json](results.json).
- `bilingual.mjs`: accurate Chinese manually injected into Kiwi Q2 at desktop/phone widths to check wrapping. This is a controlled layout fixture, not verification of the user's translation extension. See [bilingual-results.json](bilingual-results.json).
- Screenshots include every question at desktop and phone widths, negative-question feedback, Hachiya texture feedback and the bilingual Kiwi Q2 fixture.

No deployment or remote push performed.
