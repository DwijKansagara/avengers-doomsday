import type { Metadata, Viewport } from "next";
import { Anton, Chakra_Petch } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Impact display face for the giant titles.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// Sci-fi HUD face for kickers, labels and UI.
const chakra = Chakra_Petch({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL to your deployed URL so link previews resolve the
// social image correctly. Falls back to a sensible default otherwise.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://doomsday.antideploy.com";
const description =
  "A scroll-driven Avengers: Doomsday fan interface study by Dwij Kansagara, built with Next.js, React Three Fiber, Three.js and GSAP.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Dwij Kansagara", url: "https://about-me.antideploy.com" }],
  creator: "Dwij Kansagara",
  publisher: "Dwij Kansagara",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  title: "AVENGERS: DOOMSDAY — Cinematic Scroll Experience",
  description,
  keywords: [
    "Avengers",
    "Doomsday",
    "Marvel",
    "cinematic website",
    "scroll experience",
    "Next.js",
    "React Three Fiber",
    "Three.js",
    "GSAP",
    "WebGL",
    "creative development",
  ],
  openGraph: {
    title: "AVENGERS: DOOMSDAY — Cinematic Scroll Experience",
    description,
    url: siteUrl,
    siteName: "AVENGERS: DOOMSDAY",
    type: "website",
    images: [{ url: "/videos/title-reveal-poster.webp", width: 1180, height: 486, alt: "Avengers: Doomsday cinematic fan interface" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVENGERS: DOOMSDAY — Cinematic Scroll Experience",
    description,
    images: ["/videos/title-reveal-poster.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${chakra.variable}`}>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          attributes on <body> before React hydrates — harmless, not our markup. */}
      <body suppressHydrationWarning>
        {children}
        <Script
          src="https://dwij-signal.vercel.app/engagement-widget.js?v=20261008-1"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}




