import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteOrigin } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "Fruit Picking Guide",
  description: "Practical guidance for choosing ripe, good-quality fruit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"><body><div className="flex min-h-screen flex-col"><Header /><main className="flex-1">{children}</main><Footer /></div></body>
    </html>
  );
}
