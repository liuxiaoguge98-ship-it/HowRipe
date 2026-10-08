# SEO-HOME-01 — Homepage content and internal linking

2026-10-08. Base: approved `feature/brand-home-unification` at `37aea30040664a578fa53b8ea36556f21472f877`. Git fetch confirmed the brand work is still absent from origin/main (`c2a471388abd63fc701a9165c3c1c0f621d137c8`). Clean branch created as `feature/seo-home-01`. No recreation of approved work; a future single PR to main will include both nodes.

## Actual rendered baseline

[HTML audit](baseline/audit.json) · [desktop](baseline/home-1440.png) · [phone](baseline/home-390.png).

| Item | Before | After |
| --- | --- | --- |
| Homepage title | HowRipe — How to Pick Ripe Fruit | HowRipe — How to Tell If Fruit Is Ripe |
| Description | Learn how to pick ripe fruit, tell when it is ready to eat, and plan ripening and storage. Explore practical avocado, kiwi, pomegranate and persimmon guides. | Learn when avocados, kiwis, pomegranates, and persimmons are ripe and ready to eat. Choose fruit with practical clues and timing that fits your plans. |
| H1 | Pick better fruit. | Unchanged, one H1 |
| Meaningful visible words | Approximately 137 | Approximately 500 |
| New editorial section | None | Approximately 341 |
| Generic fruit CTA | Explore guide × 4 | No generic CTA |

Description is 150 characters. The initial entire body contains about 178 words including navigation/footer. Meaningful counts use visible main text, exclude navigation, hidden/aria-hidden decoration, hash-link CTAs, numeric labels and footer boilerplate. They include descriptive index links, editorial headings and contextual links. This is an approximate editorial measure, not a ranking score or test threshold. Same method is used before and after; desktop and phone yield identical final counts.

All four baseline fruit entries already rendered as a single `<a href>` containing the name, imagery, promise and CTA. Their accessible names were only the fruit name. The final entries retain that semantic structure, label the link from the descriptive visible CTA, and retain the promise as its description. No nested links or adjacent duplicate announcements.

## Final navigation and headings

| Index anchor / accessible name | Real href | Contextual anchor |
| --- | --- | --- |
| How to tell if an avocado is ripe | /avocado | avocado ripeness guide |
| How to tell if a kiwi is ripe | /kiwi | kiwi readiness guide |
| How to choose a ripe pomegranate | /pomegranate | pomegranate selection guide |
| How to tell if a persimmon is ripe | /persimmon | Fuyu and Hachiya persimmon guide |

One index link and one contextual link per fruit, plus the existing footer navigation. Fruit names remain inside their entry anchors. Raw HTML contains the links without executing JavaScript. Actual browser role lookup resolves each index link to its descriptive name; desktop and phone index navigation reaches Avocado and returns home.

Heading outline: H1 **Pick better fruit.** → H2 **Choose a fruit.** → four fruit H3s → H2 **Why ripeness looks different for every fruit** → H3 **Firmness / Color / Variety / Timing** → existing H2 **No universal trick. Just the right clues.** No skipped heading levels.

## Editorial content and evidence

The new section follows the fruit index. It begins with the absence of one universal ripeness signal, then four short numbered concepts. Desktop uses an introductory column beside an open 2×2 editorial layout with thin rules. Tablet stacks the introduction above the concepts; phone has a single reading column. Existing warm surface, display font and text colors are used. No new cards, assets or typography system.

| Concept | Existing supported knowledge used | Existing evidence location |
| --- | --- | --- |
| Firmness | Gentle give with structure for Hass avocado and green kiwi; softness is not one universal rule | Avocado hero/press/timing; Kiwi hero/timing/firmness; Persimmon variety criteria |
| Color | Hass may darken but firmness matters; pomegranate pale pink/deep red variation is not a ripening sequence | Avocado color statement; Pomegranate color section, cultivar sources |
| Variety | Mature Fuyu can be firm/crisp; untreated Hachiya needs very soft texture before fresh eating | Persimmon variant overview, Fuyu/Hachiya sections and approved sources |
| Timing | Ready fruit for today, firmer avocado/kiwi for later; a very soft Kiwi batch reduces flexibility | Avocado timing guide; Kiwi planning/batch guidance |

No new factual sources, nutrition claims, scientific claims, timings or full fruit-page instructions. Readers get principles and links to the detailed guides. Exact long-tail targets remain on fruit routes.

## Visual review and local production QA

[Reproducible browser script](browser-qa.mjs) · [production-browser results](local/browser.json) · [frozen paths](freeze.json).

[Desktop](local/home-1440.png) · [phone](local/home-390.png) · [desktop editorial](local/editorial-1440.png) · [phone editorial](local/editorial-390.png) · [index transition](local/index-transition-1440.png).

First pass: numbered section already fit the visual language. Refined the phone heading with balanced text wrapping to remove the isolated last word, and specified untreated Hachiya to preserve the guide's scope. No surrounding redesign. Local screenshots were visually compared with the approved BRAND-HOME-01 production captures. Hero/Header and Footer retain the same appearance and dimensions; exact pixels differ between captures, so pixel equality is not claimed. Source-level freeze confirms no changes to those components/assets/styles. Development captures include a dev overlay and are not production visual evidence.

| Width | Home result | Layout |
| --- | --- | --- |
| 1440×1000 | PASS, width 1440 = scrollWidth 1440 | Editorial heading + open concepts; balanced density |
| 1024×1000 | PASS, width 1024 = scrollWidth 1024 | No links/headings overflowing |
| 768×1000 | PASS, width 768 = scrollWidth 768 | Intro above two-column concepts |
| 390×844 | PASS, width 390 = scrollWidth 390 | Balanced heading, single-column concepts |
| 360×844 | PASS, width 360 = scrollWidth 360 | Comfortable reading, links fit |

All four fruit pages at 1440/390: status 200, visible images loaded, brand/canonical/English unchanged, Quiz initializes, Check firmness preserves answering, answer feedback and explicit Got it work. Eight fruit smoke flows; no fruit changes. No page/console errors, no horizontal overflow. Homepage/OG/Twitter share the new title and description; all five canonicals and social URLs remain on `https://www.howripe.com`. No localhost/Preview URLs in production metadata. Robots allows `/`; sitemap has exactly the five production URLs.

Self-critique: home retains its brand/index role and untouched Hero; its purpose is clearer; the links describe their destination; copy explains four decision principles and why separate guides exist without reproducing full answers; exact phrases are not repeated excessively; thin rules and whitespace preserve rhythm; phone reads in order; all four routes are reachable from the index and a contextual link. No material issue identified after the phone heading refinement.

## Automated verification

Focused SEO tests first failed for the old title, generic accessible link name and missing editorial section, then passed with the implementation. Tests exercise server-rendered output rather than a source snapshot or word-count threshold. The test uses the existing Vitest jsdom environment; no type package or dependency was added.

- `pnpm test`: 89 tests / 25 files PASS.
- `pnpm lint`: PASS.
- `pnpm exec tsc --noEmit`: PASS.
- `pnpm build`: PASS; all five routes, robots and sitemap statically rendered.
- `git diff --check`: PASS.

Only home page/CSS, directly relevant tests, state documentation and QA evidence change relative to the approved brand base. Hero, Header/Footer, global font/style system, fruit content/UI, quiz/tactile behavior, public imagery, routes, metadataBase/canonical origin, crawl architecture, dependencies, Vercel configuration and DNS are frozen.

## Preview handoff

Push `feature/seo-home-01` to the existing Git-linked `fruit-picking-guide` project. Preview validation is recorded after the automatic deployment is READY. No PR merge and no production deployment are authorized at this stage. No PR is needed until the user's SEO Preview approval, when both nodes can be reviewed together.
