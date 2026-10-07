# PRODUCTION-01 — HowRipe origin configuration

2026-10-07 · Frozen production source: `6ada2f09bfb42d47449be223beb2cb77757a0528`. The operator has confirmed deployment and live production QA passed. Newer generated deployment/live evidence is excluded from this cleanroom snapshot and retained in the historical archive.

Origin source: `src/lib/site-url.ts`, using `NEXT_PUBLIC_SITE_URL` with the single production default `https://www.howripe.com`. The production Vercel variable is configured to that exact value; `.env.example` documents it. Root metadataBase uses this origin. Home and four fruit pages have individual absolute canonical/Open Graph URLs; the fruit social images reuse their existing production hero assets. No UI, content, dependencies, DNS, domain settings or additional redirect rules changed.

The production project has no Git integration and the local repository has no remote; there is no automatic production branch. The established authenticated Vercel CLI workflow will release a reviewed Git commit, with its SHA recorded in deployment metadata. [Workflow and unchanged domain audit](workflow.json).

Reviewed before release: only URL/metadata/crawl configuration and its tests changed. The UI, fruit content and asset diff against approved `8cb55e1` is empty. Four fruit titles/descriptions remain unique. A fixture's explicit development origin is preserved. The dry-run upload is approximately 7.9 MB and excludes credentials, build output, QA screenshots and tests. No new dependency was added.

Local gates: 84 tests / 23 files, lint, explicit TypeScript, production build with the actual environment variable, and diff-check pass. Rendered-source checks validate all five self-canonicals, unique page metadata, static educational copy, five sitemap entries and normal robots access. Next.js 16 normalizes homepage canonical/og:url to `https://www.howripe.com`; this is the same root URL as `https://www.howripe.com/`, which is used in the sitemap. Browser QA at 1440 and 390 px verifies all five routes, images, normal navigation, Quiz feedback/Got it and no overflow/errors. [Local source results](local-source/results.json), [local browser results](local-browser/results.json).

[Classified origin audit](origin-audit.json): localhost/127.0.0.1/Vercel URL references remain only in deliberate test/development fixtures or historical QA/deployment documentation. External authoritative fruit sources and XML/SVG namespace URLs are valid external references. The maintained physical-device QA address now uses HowRipe. Production source had no hardcoded stale Vercel origin; the defects were absent canonical/social/base configuration, an empty default sitemap and no robots sitemap reference, now fixed.

No JSON-LD or manifest exists; no schema was added. Legacy global branding remains in `src/components/layout/Header.tsx` (FRUIT PICKING GUIDE), `src/app/layout.tsx`/`src/app/page.tsx` (Fruit Picking Guide title), and the Avocado SEO title suffix. Existing product specifications do not approve a visible-brand rewrite; this remains a separate branding decision. Open Graph siteName identifies HowRipe.

Production origin verification does not certify previously open physical-device QA. Search Console work is outside this task.
