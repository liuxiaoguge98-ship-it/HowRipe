import Script from "next/script";

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

  if (process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV !== "production"
    || !/^G-[A-Z0-9]+$/.test(measurementId)) {
    return null;
  }

  return <>
    <Script id="howripe-ga4-init" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${JSON.stringify(measurementId)}, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    `}</Script>
    <Script
      id="howripe-ga4-script"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  </>;
}
