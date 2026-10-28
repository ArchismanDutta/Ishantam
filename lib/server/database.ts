import { MongoClient, type Collection, type Db, type Document } from "mongodb";

type Collections = { db: Db; registrations: Collection<Document>; payments: Collection<Document>; sessions: Collection<Document>; limits: Collection<Document> };
const globalForMongo = globalThis as typeof globalThis & { mongoPromise?: Promise<Collections> };

export async function getDatabase(): Promise<Collections> {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  globalForMongo.mongoPromise ??= (async () => {
    const client = new MongoClient(process.env.MONGODB_URI!, { maxPoolSize: 5, serverSelectionTimeoutMS: 10000 });
    await client.connect();
    const db = client.db();
    const registrations = db.collection("registrations");
    await Promise.all([
      registrations.createIndex({ idempotency_key: 1 }, { unique: true }),
      registrations.createIndex({ reference: 1 }, { unique: true }),
      registrations.createIndex({ created_at: -1, id: -1 }),
      db.collection("booking_payments").createIndex({ registration_id: 1 }, { unique: true }),
      db.collection("booking_payments").createIndex({ order_id: 1 }, { unique: true, sparse: true }),
      db.collection("booking_payments").createIndex({ payment_id: 1 }, { unique: true, sparse: true }),
      db.collection("admin_sessions").createIndex({ token_hash: 1 }, { unique: true }),
      db.collection("admin_sessions").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 }),
      db.collection("rate_limits").createIndex({ bucket: 1 }, { unique: true }),
      db.collection("rate_limits").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 }),
    ]);
    return { db, registrations, payments: db.collection("booking_payments"), sessions: db.collection("admin_sessions"), limits: db.collection("rate_limits") };
  })().catch((error) => { globalForMongo.mongoPromise = undefined; throw error; });
  return globalForMongo.mongoPromise;
}

export async function consumeRateLimit(bucket: string, limit: number, windowMs: number, now = Date.now()): Promise<boolean> {
  const { limits } = await getDatabase();
  const windowStart = now - now % windowMs;
  const result = await limits.findOneAndUpdate(
    { bucket },
    [{ $set: { bucket, window_start: { $cond: [{ $eq: ["$window_start", windowStart] }, windowStart, windowStart] }, count: { $cond: [{ $eq: ["$window_start", windowStart] }, { $add: [{ $ifNull: ["$count", 0] }, 1] }, 1] }, expires_at: new Date(now + 86400000) } }],
    { upsert: true, returnDocument: "after" },
  );
  return Number(result?.count ?? 0) <= limit;
}
