# Registration administration

The public registration form saves to MongoDB and returns a reference. Open `/admin` to view submissions, search by name/phone/gotra/reference, filter by package/status, export matching records, and save follow-up status and internal notes. WhatsApp and call links open the devotee's contact details; no messages are sent automatically. All timestamps in the panel use India time.

## Run

Use Node.js 22.13 or newer. Copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD` to a unique password of at least 12 characters. Run `npm run dev`. For production, run `npm run build` followed by `npm start`, behind HTTPS. Production session cookies require HTTPS. Sessions expire after eight hours; changing the password invalidates existing sessions.

The application now needs a Next.js server and a MongoDB database configured with `MONGODB_URI`. Do not deploy the old `out/` static export. MongoDB stores records outside Render's temporary service filesystem.

CSV exports include personal information and are limited to 10,000 matching rows. Prices come from the server package catalog; a registration alone does not prove payment. The separate payment status and Razorpay IDs identify verified payments; manually editing the follow-up status does not change the payment record. The admin password is server-only and must never use a NEXT_PUBLIC_ variable.
