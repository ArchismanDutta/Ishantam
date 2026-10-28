import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/tiro-devanagari-hindi/400.css";
import "@fontsource/tiro-devanagari-hindi/400-italic.css";
import "./globals.css";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const metadataBase = (() => {
  try {
    return new URL(configuredSiteUrl || "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: "Ishantam · Mangal Dosha Shanti Puja at Mangalnath Temple, Ujjain",
  description:
    "Participate in the sacred Mangal Bhat Puja and Mangal Dosha Shanti Puja at Mangalnath Temple, Ujjain. Vedic priests perform the ceremony in your name and Gotra. Puja video shared via WhatsApp. Packages starting at ₹801.",
  keywords: [
    "Mangal Dosha Shanti Puja",
    "Mangal Bhat Puja",
    "Mangalnath Temple Ujjain",
    "Mangal Dosha Nivaran",
    "Manglik Dosha Puja",
    "Vedic puja booking",
    "Sankalp Gotra puja",
  ],
  other: { google: "notranslate" },
  openGraph: {
    title: "Ishantam · Mangal Dosha Shanti Puja at Mangalnath Temple, Ujjain",
    description:
      "Mangal Bhat Puja performed in your name and Gotra by Vedic priests at Mangalnath Temple, Ujjain. Ceremony video shared via WhatsApp.",
    type: "website",
    images: ["/images/mangalnath-temple-entrance.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" data-locale="hi" translate="no" className="notranslate">
      <body>{children}</body>
    </html>
  );
}
