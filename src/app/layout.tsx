import type { Metadata } from "next";
import {
  Allura,
  Cormorant_Garamond,
  DM_Sans,
} from "next/font/google";

import "./globals.css";

// Elegant serif font used for names, dates, and formal headings.
const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Decorative script font used for invitation phrases.
const scriptFont = Allura({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

// Clean font used for paragraphs, buttons, labels, and forms.
const sansFont = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renz & Jen — December 10, 2026",

  description:
    "Join Renz and Jen as they celebrate their wedding on December 10, 2026.",

  openGraph: {
    title: "Renz & Jen — December 10, 2026",
    description:
      "Join Renz and Jen as they celebrate their wedding.",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body
        className={`
          ${serifFont.variable}
          ${scriptFont.variable}
          ${sansFont.variable}
          font-[family-name:var(--font-sans)]
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}