export interface CheckoutBooking {
  token: string; reference: string; state: "pending" | "failed" | "paid"; paymentId: string | null;
  amount: number; currency: string; orderId: string; key: string; packageName: string; name: string; contact: string; locale: "en" | "hi";
}
type CheckoutResponse = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
type RazorpayInstance = { open(): void; on(event: "payment.failed", callback: () => void): void };
declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance }
}
export const BOOKING_STORAGE_KEY = "ishantam-current-booking";
let scriptPromise: Promise<void> | undefined;
function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (!scriptPromise) scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    const timeout = setTimeout(() => { script.remove(); scriptPromise = undefined; reject(new Error("Payment checkout timed out. Please try again.")); }, 20000);
    script.onload = () => { clearTimeout(timeout); if (window.Razorpay) resolve(); else { scriptPromise = undefined; reject(new Error("Payment checkout could not load.")); } };
    script.onerror = () => { clearTimeout(timeout); script.remove(); scriptPromise = undefined; reject(new Error("Unable to load payment checkout. Please check your connection.")); };
    document.body.appendChild(script);
  });
  return scriptPromise;
}
export async function openCheckout(booking: CheckoutBooking, navigate: (path: string) => void) {
  // Save the capability before opening checkout so a reload can recover status.
  sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify({ token: booking.token, locale: booking.locale }));
  if (booking.state === "paid") { navigate("/booking"); return; }
  await loadCheckout();
  let finished = false;
  const returnToSite = (outcome?: string) => {
    if (finished) return; finished = true;
    navigate("/booking" + (outcome ? "?outcome=" + outcome : ""));
  };
  const checkout = new window.Razorpay!({
    key: booking.key, order_id: booking.orderId, amount: booking.amount, currency: booking.currency,
    name: "Ishantam", description: booking.packageName, prefill: { name: booking.name, contact: booking.contact },
    theme: { color: "#963e28" }, retry: { enabled: false },
    modal: { ondismiss: () => returnToSite("cancelled") },
    handler: async (response: CheckoutResponse) => {
      if (finished) return;
      // Persist verification data temporarily so the result page can retry after a network error.
      sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify({ token: booking.token, locale: booking.locale, verification: response }));
      returnToSite();
    },
  });
  checkout.on("payment.failed", () => returnToSite("failed"));
  checkout.open();
}
