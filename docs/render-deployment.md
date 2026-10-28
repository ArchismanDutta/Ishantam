# Deploy to Render

The root Next.js application serves the website and backend (`app/api`) in one Node.js Web Service. Deploy this directory, not the separate project in `j/Jyotirling`. A Static Site cannot run these APIs.

## Deploy

1. Push this folder to a GitHub or GitLab repository, including `package-lock.json` and `render.yaml`. This checkout currently has no Git repository. Exclude `.env`, `.data`, `node_modules`, `.next`, and `out` (covered by `.gitignore`).
2. In Render, choose **New > Blueprint**, connect that repository, and select `render.yaml`.
3. Select the Free instance for the web service. This hosts both the site and API without charge, with the free tier's sleep and restart behavior.
4. Create a free MongoDB Atlas cluster. Create a dedicated database user, allow connections from Render (Atlas may require `0.0.0.0/0` for Render Free), and copy its SRV connection string with the `ishantam` database name. Add it to Render as the secret `MONGODB_URI`. Check Atlas's current free cluster limits and backup options.
5. Enter `ADMIN_PASSWORD` (unique, at least 12 characters), `NEXT_PUBLIC_SITE_URL` (the full HTTPS public URL), and your Razorpay credentials. Use a live `rzp_live_` key for `RAZORPAY_MODE=live`. For sandbox verification use `test` mode and matching test keys; restore live settings before accepting live payments. Missing payment credentials leave checkout unavailable.
6. Apply the Blueprint and wait for a successful deploy. If Render assigns a different URL than expected, update `NEXT_PUBLIC_SITE_URL` and rebuild/redeploy. This variable affects generated metadata during the build.
7. In the Razorpay dashboard, configure `https://YOUR-HOST/api/payments/webhook` for `payment.captured` and `order.paid`. Set the same webhook secret in Render's `RAZORPAY_WEBHOOK_SECRET` and redeploy. See `docs/razorpay-payments.md` for the payment flow.

## Manual service settings

If you do not use the Blueprint, create a Free Node Web Service with the repository root as Root Directory (leave it blank), Node `24.16.0`, build command `npm ci --include=dev && npm run build`, start command `npm run start -- --hostname 0.0.0.0 --port $PORT`, and health check `/api/health`. Add `MONGODB_URI` and remaining secrets in the dashboard; keep credentials out of source control.

## Verify after deployment

- Open `/` and `/booking`, then sign in at `/admin`.
- Request `/api/health`: expect HTTP 200 and `{"status":"ok"}`. This checks MongoDB connectivity, not payment credentials.
- Complete a Razorpay test-mode booking and confirm its payment and registration in the admin panel; check webhook delivery in Razorpay before enabling live payments.
- Restart the service and confirm the registration still exists.

The free Render web service sleeps after 15 minutes of inactivity, so the first request after sleep may take about a minute. MongoDB Atlas is a separate service with its own limits and policies. Existing local SQLite records are not uploaded automatically. If local registrations must be retained, export and migrate them before switching live traffic.

References: https://render.com/docs/deploy-nextjs-app, https://render.com/docs/disks, https://render.com/docs/blueprint-spec.
