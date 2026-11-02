# HowRipe Google Analytics 4

## Scope

The root layout loads one Google tag after hydration using the existing `next/script` capability. There is no new dependency, visible UI, route or content change. The existing canonical, robots and sitemap configuration is untouched.

GA4 supplies page views and user engagement automatically. No custom page-view listener, timer, Quiz events, Google Tag Manager container or duplicate analytics destination is added. Google Signals and ad personalization signals are disabled in the tag configuration.

## Google Analytics setup

1. Create or select the HowRipe GA4 property, then add/select a **Web** data stream for `https://www.howripe.com`.
2. Copy its **Measurement ID**, starting with `G-`. This is a public tag identifier, not a numeric property ID, stream ID, API secret or `GTM-` container ID.
3. In the stream's **Enhanced measurement → Page views → Advanced settings**, enable **Page loads** and **Page changes based on browser history events**. Next.js client navigation uses the browser History API. Keep automatic page views enabled; this integration does not send manual page views.
4. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to that exact ID in this Vercel project's **Production** environment. Do not copy the example/test ID into a deployed environment.
5. Release through the established GitHub PR → main → automatic Vercel Production workflow. Do not use a manual Production deploy or change DNS.

The tag is rendered only when `NODE_ENV=production`, `VERCEL_ENV=production` and the ID is valid. Vercel provides the first two settings; ensure automatic system environment variables are enabled. Development, Preview and missing/invalid IDs do not load Google Analytics.

This statically generated site reads the ID and deployment environment when building. Updating the environment setting alone does not update an existing deployment; a new build is needed. A measurement ID is not an API credential. Do not put Google account passwords or Analytics API secrets in repository files.

## Verify data collection

- Use Tag Assistant or GA4 DebugView with a debugging session. Confirm the destination is the intended HowRipe stream.
- Open the homepage, click through to `/avocado`, then use browser Back. Verify exactly one `page_view` per actual page change, with the expected page location/title. Confirm the tag initializes once per document and survives client-side navigation.
- Confirm `user_engagement` / engagement time is received after reading the page and navigating or moving the page into the background. No custom engagement timer is required.
- Check **Reports → Realtime** for visits. Standard report processing can take 24–48 hours.
- Read page-level engagement under **Reports → Engagement → Pages and screens**, using the page-path dimension and average engagement time. For visits as a whole, use average engagement time per session in the engagement overview.
- Recheck Home and Avocado at 1440/390: branding, images, navigation, Quiz, no horizontal overflow or console errors. Canonical, robots and sitemap must remain unchanged.

An installed tag with no real Measurement ID is not an active connection. Until an actual stream is configured and its requests/reports are verified, record data collection as pending. Previously uncollected engagement time cannot be recovered.

## Disable

Remove the Production `NEXT_PUBLIC_GA_MEASUREMENT_ID` setting and rebuild through the same Git workflow. Do not add a second tag or a manual page-view listener to troubleshoot missing data; first verify the ID, stream settings, browser blockers and current deployment.

## References

- [Next.js script loading](https://nextjs.org/docs/app/guides/scripts)
- [Google: measure single-page applications](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [Google: automatic and manual page views](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Google: verify and troubleshoot Analytics](https://developers.google.com/analytics/devguides/collection/ga4/troubleshoot)
