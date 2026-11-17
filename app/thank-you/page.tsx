import type { Metadata } from "next";
import { LocaleProvider } from "@/components/ishantam/LocaleContext";
import ThankYou from "./thank-you";

export const metadata: Metadata = {
  title: "Thank you · Ishantam",
  description: "Thank you for choosing Ishantam for your sacred journey at Mangalnath Temple, Ujjain.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ThankYouPage() {
  return <LocaleProvider><ThankYou /></LocaleProvider>;
}
