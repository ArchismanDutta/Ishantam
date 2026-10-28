import { paymentRequest } from "@/lib/server/payment-route";
import { authorizedBooking, reconcile } from "@/lib/server/payments";
export const runtime = "nodejs";
export async function POST(req: Request) { return paymentRequest(req, async value => reconcile(await authorizedBooking(value.token))); }
