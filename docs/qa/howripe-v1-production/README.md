# HOWRIPE V1 production release QA

## Approved application and physical-device result

**REAL PHYSICAL DEVICE QA: PASS — user-observed approval.**

- Sole release branch: `feature/perf-mobile-images` → `main`.
- User-approved application HEAD: `8874eb40aab2abc6887c3cb554a923db1e4e4390`.
- [User-approved final Preview](https://fruit-picking-guide-db88v57ol-good-dc6d.vercel.app/).
- Combined work: BRAND-HOME-01, SEO-HOME-01 and PERF-IMG-01.
- The follow-up commit records QA only; no application changes.

The user confirmed materially improved image loading, acceptable image clarity, normal homepage scrolling, working fruit navigation, acceptable Avocado/Kiwi loading, working Quiz, working return-home navigation, and no unacceptable horizontal scrolling. Device model, OS/browser version, network and numeric physical-device timings were not recorded. Existing emulated Chrome performance data is separate evidence and is not presented as a physical-phone measurement.

## Fresh pre-release verification (2026-10-08)

| Gate | Result |
|---|---|
| Approved branch / HEAD / clean working tree | PASS before documentation update |
| Cumulative diff against `origin/main` | PASS: approved brand, homepage, SEO, image delivery, English-only fix, tests and QA docs |
| `pnpm test` | PASS: 26 files / 91 tests |
| `pnpm lint` | PASS |
| `pnpm exec tsc --noEmit` | PASS |
| `pnpm build` | PASS: production build, existing five public routes plus robots/sitemap |
| `git diff --check origin/main...HEAD` and working diff | PASS |

The fruit knowledge and Quiz answers are unchanged. Avocado's SEO brand suffix is updated and the previously authored Chinese Kiwi/Persimmon hero lines are removed as approved. No new routes, dependency/lockfile changes, master-image edits, DNS or Vercel project configuration changes. The accepted WebP/q75 image settings and native lazy loading remain.

## Production verification and baseline location

Release remains pending until the current-HEAD GitHub checks and Preview pass, the PR is squashed into main, and the existing `fruit-picking-guide` project automatically deploys that GitHub/main SHA to Production READY. No manual Production deployment is used.

Public release QA must verify Home and all four fruit guides, English-only HowRipe branding, exact homepage title and H1, descriptive fruit links, approximately 500 homepage words and server-rendered Firmness/Color/Variety/Timing content, navigation and Quiz, responsive/lazy images and layout stability, robots/sitemap/canonical, and Production `NEXT_PUBLIC_SITE_URL=https://www.howripe.com`.

Only after those checks pass may the fully superseded remote feature branches be deleted and annotated `v1.0.0` be pushed on the verified Production main SHA with message `HowRipe V1 production release`. Local historical branches are retained. No GitHub Release page is created.

The merged PR and the standalone final release report will record the **HowRipe V1 Production Baseline**: exact release HEAD, main SHA, Vercel deployment ID/source/READY state, tag, physical-device PASS, homepage SEO PASS, image sanity PASS, cleanup, and any known issues. Recording post-merge identifiers there preserves the clean verified main commit and avoids another deployment solely to insert its own SHA.

Future workflow: main → feature/<task> → GitHub → Vercel Preview → user approval → PR → main → automatic Production.

Next planned task: Google Search Console setup and sitemap submission. Search Console is not configured in this release task.
