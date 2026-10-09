import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HowRipe",
    short_name: "HowRipe",
    lang: "en",
    start_url: "/",
    display: "browser",
    background_color: "#F5F2E9",
    theme_color: "#2F3B27",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
