# Razorpay bookings

The booking button creates a registration and a Razorpay order, then opens Standard Checkout. The server fixes the amount from the package catalog in INR paise. Checkout success redirects to `/booking`, which verifies the checkout signature using the stored order ID and checks payments with Razorpay. Only a matching `captured` payment confirms the booking. `authorized` remains pending: it is not a confirmed booking.

## Live configuration

Add these server-only settings to `.env.local` (or your production host's secrets) and restart/rebuild:

```
RAZORPAY_MODE=live
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

Use the live key pair from the activated merchant account. The key ID is sent to Checkout; the key secret and webhook secret never reach the browser. Do not commit credentials. No credentials are bundled with this implementation.

In the Razorpay Dashboard:

1. Enable automatic payment capture. Authorized payments remain pending until captured.
2. Configure a live webhook at `https://YOUR_DOMAIN/api/payments/webhook` with the same webhook secret.
3. Subscribe to `payment.captured`, `payment.failed`, and `order.paid`.
4. Use HTTPS and persistent database storage as described in `admin-panel.md`.
5. Validate the activated account, checkout, mobile/UPI return, and webhook delivery on your actual domain before accepting customer bookings. Any live validation payment moves real money and should be performed deliberately by the merchant.

Use `RAZORPAY_MODE=test` with a matching test key pair in a separate staging environment to test without moving money. Do not mix live and test keys/orders in one database.

## Return, retry and recovery

The result page checks server payment state, polls briefly for delayed capture and lets the customer check again. Failed or dismissed checkout shows a retry action; status is checked before reopening the same order. Failed and late webhook events cannot overwrite a captured payment. Webhook handling and capture updates are idempotent and increment the registration version once.

The booking capability is held in sessionStorage in the same browser tab, so refreshing or returning from a payment app can recover it. The form includes a link to `/booking`. This is not a cross-device booking lookup; closing the tab can remove access to the result page. The saved booking remains in the admin database, searchable by phone/reference. Storage must be available before Checkout opens. Changing the Razorpay key secret invalidates existing browser booking capabilities.

The admin panel and CSV show payment status, order ID and payment ID separately from the editable follow-up status. Refund and dispute handling are outside this booking integration; process those in Razorpay and reconcile operationally.

## Verification

Set `MONGODB_TEST_URI` to a disposable MongoDB database, then run `node --experimental-strip-types --test tests/payments.test.ts` on Node.js 24. The test uses a mock gateway and synthetic signatures; no payment is made. It removes its fixture registration and payment at the end. The test checks price integrity, invalid signatures/capabilities, authorized vs captured state, order reuse, registration idempotency, repeated capture, and late failure events.

Official references: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/ and https://razorpay.com/docs/webhooks/validate-test/
