# GA4-01 — HowRipe analytics integration

Date: 2026-11-02. Branch: `codex/ga4-analytics`. Base main: `53052c4add4985dd3a056db33e8a530781f7c40e`.

The user requested GA4 to measure engagement and supplied the Google tag for **`G-5JXDKHQM2S`**. The tag is integrated through the existing `next/script` capability in the root layout, after hydration, without adding a dependency or visible UI. Google handles the initial page view, History API navigation and engagement time; there is no second manual page-view sender. Google Signals and ad personalization signals are disabled.

`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-5JXDKHQM2S` was added to Vercel **Production only**. Automatic system environment variables are enabled. The application requires both a production build and `VERCEL_ENV=production`; Preview/development and missing/invalid IDs do not load the tag. Existing environment settings were preserved. Configuration changes do not redeploy an existing build.

## Verification

- Red/green test: the production integration test failed on the missing tag before implementation, then passed. Nine tests cover the real layout/configuration contract, including production gating and invalid/missing IDs.
- Full suite: **28 files / 105 tests PASS**.
- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, `git diff --check`: **PASS**.
- Production builds completed with no ID, a controlled fixture ID, and the user-supplied real ID.
- Browser checks at 1440/390: disabled environments make no Google tag request; the fixture build loads/initializes once per document, retains that single instance across client navigation, and preserves branding, canonical, English content, layout and Quiz feedback.
- With Google's actual SDK and the supplied destination, local browser navigation Home → Avocado → Back → Avocado produced exactly four `page_view` events and non-zero engagement time. Local collection requests were intercepted, keeping synthetic local visits out of the real property.

The real SDK batches collection requests, so the audit waits for the expected count rather than assuming a fixed short flush interval. A browser-wide host proxy cannot reach localhost in this environment; the QA harness keeps local app requests direct and fetches Google's public SDK through a separate transport. These affect only QA, not production code.

## Reproduce

Run a production server on port 3110. `browser-qa.mjs` supports `QA_GA_MODE=off` (build without an ID) and `QA_GA_MODE=fixture` (build with `VERCEL_ENV=production NEXT_PUBLIC_GA_MEASUREMENT_ID=G-HRTEST0001`). Both use an intercepted provider and never send real analytics. Set `QA_OUTPUT` outside the Git checkout.

For the actual provider, build with the real production settings and run:

```sh
QA_GA_ID=G-5JXDKHQM2S QA_OUTPUT=/absolute/path/to/qa node docs/qa/ga4-01/collect-qa.mjs
```

Default collection is intercepted. To verify the public release against Google's actual collection endpoint, also set `QA_ORIGIN=https://www.howripe.com QA_CAPTURE_ONLY=0`. This sends a small isolated QA visit to the intended property and requires Google HTTP 204 responses. It does not validate the account's reporting filters or report processing; check Realtime/DebugView in the property as described in [setup instructions](../../analytics.md).

Release through feature PR → successful exact-HEAD Vercel checks → squash main → automatic Vercel Production. After READY, confirm the production tag destination and collection responses, then compare all five content/SEO signatures and exact robots/sitemap bytes with the fresh pre-release baseline. No manual Production deploy, DNS, routes, fruit content, image assets, styles, Quiz behavior or existing SEO strategy changes.

Production identifiers and live results are recorded in the merged PR and the sibling `HowRipe-release-reports/ga4-analytics/` directory, avoiding an evidence-only follow-up deployment. Until that verification is complete, this document's local checks do not claim a live release.
