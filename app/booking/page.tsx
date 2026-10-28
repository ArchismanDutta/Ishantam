import type { Metadata } from "next";
import BookingResult from "./result";
export const metadata: Metadata = { title: "Booking status · Ishantam", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default function BookingPage() { return <BookingResult />; }
