/**
 * Minimal in-memory sliding-window rate limiter.
 * Sufficient for a single-process SQLite deployment.
 *
 * NOT intended for multi-instance horizontal scaling — for that,
 * swap in a Redis/uWSGI-backed store behind the same interface.
 */

type Bucket = {
  hits: number[];
};

const buckets = new Map<string, Bucket>();

// Every 5 minutes, drop buckets that saw no traffic in the window.
setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);
      if (bucket.hits.length === 0) buckets.delete(key);
    }
  },
  5 * 60 * 1000
).unref?.();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_HITS = 10; // 10 requests per minute per IP

/**
 * Returns true when the request is allowed, false when rate-limited.
 */
export function rateLimit(key: string, max = MAX_HITS, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  if (bucket.hits.length >= max) return false;
  bucket.hits.push(now);
  return true;
}

/** Get the caller's IP from a Next.js request, honoring proxy headers. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) {
    const first = fwd.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}
