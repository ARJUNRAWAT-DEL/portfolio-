// Best-effort per-process protection. Add a shared store or hosting-level rate rule for distributed deployments.
const buckets = new Map<string, { count: number; until: number }>();
export function rateLimit(
  key: string,
  limit: number,
  windowMs = 60000,
  now = Date.now(),
) {
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.until <= now) buckets.delete(k);
    if (buckets.size > 5000) return false;
  }
  const entry = buckets.get(key);
  if (!entry || entry.until <= now) {
    buckets.set(key, { count: 1, until: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}
export function requestKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
  );
}
