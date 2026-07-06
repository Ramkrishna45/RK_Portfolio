import type { Metadata } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";

import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";

/* Body/base font — Space Grotesk, bound to --font-sans */
const spaceGroteskSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Heading font — Unbounded, bound to --font-display */
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ram Krishna Tripathi | Software Engineer",
  description: "Portfolio of Ram Krishna Tripathi - Software Engineer, Full Stack Developer, and AI Enthusiast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        spaceGroteskSans.variable,
        unbounded.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        {/* The Spline runtime lazy-loads its wasm from unpkg; warm the connection early */}
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <SiteFrame>{children}</SiteFrame>
        </Providers>
      </body>
    </html>
  );
}
