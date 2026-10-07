# Kiwi quiz scenario illustrations

2026-10-01 · PASS · User follow-up to the Kiwi ripening-control redesign.

## What changed

Each of the six formerly text-only options in Q03–Q05 now has its own scene illustration. All five questions have two images. The generic illustrated-option component is reused, with Kiwi-scoped responsive sizing; no quiz state-machine changes.

| Question | A | B |
| --- | --- | --- |
| Q03 — ripen sooner | One whole kiwi in a refrigerator | One whole kiwi with an apple in a paper bag |
| Q04 — manage six fruit | Six on the counter | Two on the counter, four in the refrigerator |
| Q05 — shop for now/later | Four whole kiwi together | One on a plate, three in a produce basket |

Q05 illustrates grouping and planning. A photo cannot establish firmness; the visible text supplies that fact. Fruit remain uncut and healthy-looking, with no added damage or answer badges. Q01 touch evidence and Q02 controlled bruise comparison remain intact. Answer key A/B/B/B/B, explicit avoid-buying language and Got it for both outcomes remain.

## Assets

Generated with built-in imagegen, text-to-image, transparent_background=true. Original PNGs remain at their tool-returned paths. Six project copies are 960×960 alpha-preserving WebP at quality 88, totaling 1,217,926 bytes. No semantic post-editing. All images were visually inspected, including the six-fruit counts and whole-fruit framing.

- [Exact generation prompts](prompts.json)
- [Original files, production paths and metadata](assets.json)
- Production directory: `public/fruits/kiwi/quiz/scenarios/`
- Runtime inventory: 50 records; Kiwi 13.

## Verification

- 81 tests across 22 files pass, including all-image scenario rendering, unchanged answers, manual progression and asset references.
- ESLint, explicit TypeScript, production build and git diff --check pass.
- Installed Chrome: 1440×900, 390×844, 390×900 with reduced motion.
- Every question has two decoded images; no image crop transforms or pre-answer outcome labels.
- Hover keeps the transparent option background; alpha is retained in all six generated files.
- New Q03–Q05 stages are 696px desktop and 760px phone, before and after feedback; no horizontal overflow.
- Fifteen Got it transitions have zero scroll delta. Correct/incorrect states, keyboard selection, completion and restart checked; no page errors.
- Native English presentation measured; third-party browser translation can increase content height naturally.
- [Browser script](check.mjs), [measured results](results.json). Screenshots in this directory cover all five questions and feedback on desktop and phone.

Preview: http://localhost:3107/kiwi?v=quiz-scenes#quiz. Local only; not deployed.
