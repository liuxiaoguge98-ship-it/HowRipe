# BRAND-HOME-01 baseline — 2026-10-07

Source: `c2a471388abd63fc701a9165c3c1c0f621d137c8`, clean `main` tracking `origin/main`, fast-forward pull already current. Work moved to `feature/brand-home-unification` before edits. Historical repository was not modified.

Real installed Chrome captures: [Home 1440](baseline/home-1440.png), [Home 390](baseline/home-390.png), [Avocado](baseline/avocado-1440.png), [Kiwi](baseline/kiwi-1440.png), [Persimmon](baseline/persimmon-1440.png), [Pomegranate](baseline/pomegranate-1440.png). Desktop viewport 1440×1000; mobile 390×844. [Computed browser evidence](baseline/browser.json).

## Diagnosis before implementation

| Element | Homepage | Current fruit pages / implication |
| --- | --- | --- |
| Font / H1 | Georgia 400, 72px desktop / 48px mobile; long multi-line slogan | Arial Rounded MT Bold / Trebuchet MS / Arial, 800, 56px desktop; homepage belongs to the retired system |
| Eyebrows | 12px, 700, .16em uppercase | Same label basis, with fruit accent / optional fine outline; preserve shared label hierarchy |
| Header / navigation | Old uppercase identity; no useful guide navigation | Same old name, fruit-tinted backgrounds; mobile old wordmark wraps to two lines |
| Background | Warm grey ivory #f7f5ef | Warm fruit-specific creams: avocado green, kiwi olive, ruby, orange |
| Section rhythm | Text-led opening then boxed 2×2 directory | Prominent fruit subjects and short teaching sections; home lacks visual orientation |
| Images / scale | No images at all on current production homepage | Large approved production fruit images; homepage white-background defect is absent at baseline, but new imagery must avoid it |
| Controls / borders / radius | Repeated Explore guide links inside rectangular cell borders | Fruit-accent controls and softer media areas; homepage reads as scaffolding |
| Hover / motion | Basic underline; no hero or fruit entrance | Shared one-time entrance and restrained interactive feedback; reuse existing motion, reduced-motion override |
| Footer | Single descriptive line, no product identity or navigation | Same sparse footer with fruit tint; needs useful shared brand closure |
| Mobile | Long headline and blank spacing consume first screen; first guide lacks imagery | Inner pages retain visual specimens and purposeful stacked flow; home should make choosing fruit easy |

The production direction evolved after the original Editorial Fruit Lab spec. The user explicitly selected the current inner-page rounded Sans stack for this task on 2026-10-07; do not restore the retired Georgia direction or change inner-page headings.

## Occurrence classification before edits

[Every matched occurrence with file and line](baseline/brand-audit.json): 59 matches in 19 tracked files. Public header and homepage/root metadata migrate; Avocado's existing title suffix becomes HowRipe while its search intent stays intact. The maintained product-spec name migrates. Private package name and historical plans, captured HTML/JSON, old Vercel project/URLs and release evidence remain accurate historical identifiers. The shared OG siteName is already HowRipe. Footer descriptive language remains useful and gains explicit brand/navigation. No legal claim or social image is invented.

## Implementation direction

This is a bounded change to the existing homepage and global shell. The user's detailed brief authorizes implementation and visual iteration through a READY Preview; only production merge awaits approval. Use the actual shared display/Sans families, a concise two-line hero and four existing transparent fruit assets as a single still life. Use open numbered fruit entries with fruit accents, consistent image treatments and offset desktop rhythm; simplify to a deliberate linear phone sequence. The transparent historical production Persimmon hero already contains whole Fuyu/Hachiya; reuse it rather than blend the opaque current variant photos. No source pixels or colors change.

Validate first render and second refinement in Chrome, all five widths, all five routes, full quiz smoke, focus/reduced motion, original canonical/robots/sitemap, required automated gates, and the actual Git-triggered Vercel Preview. No new project, dependency, generated image, fruit-content rewrite, main merge or production deploy.
