import { paymentRequest } from "@/lib/server/payment-route";
import { authorizedBooking, reconcile, verifyCheckout } from "@/lib/server/payments";
export const runtime = "nodejs";
export async function POST(req: Request) {
  return paymentRequest(req, async value => {
    const r = await authorizedBooking(value.token); await verifyCheckout(r, value); return reconcile(r);
  });
}
