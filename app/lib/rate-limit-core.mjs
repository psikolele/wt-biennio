/**
 * Limitatore di tentativi falliti in memoria (per istanza serverless).
 * Non sostituisce una regola WAF, ma rallenta il brute force da un singolo IP:
 * dopo `maxFailures` errori nella finestra, l'IP resta bloccato fino alla scadenza.
 */

/** @type {Map<string, { failures: number, resetAt: number }>} */
const buckets = new Map();

// Login docente: soglia stretta
export const LOGIN_LIMIT = { maxFailures: 8, windowMs: 15 * 60 * 1000 };
// Password di classe: a scuola tutti gli studenti escono dallo stesso IP pubblico (NAT),
// quindi soglia più alta per non bloccare l'intera scuola per qualche errore di battitura
export const CLASS_LIMIT = { maxFailures: 40, windowMs: 10 * 60 * 1000 };

/**
 * Estrae l'IP client dagli header impostati da Vercel
 * @param {Headers} headers
 */
export function clientIp(headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}

/**
 * @param {string} key
 * @param {{ maxFailures: number, windowMs: number }} [limit]
 * @returns {{ blocked: boolean, retryAfterSec: number }}
 */
export function checkBlocked(key, limit = LOGIN_LIMIT, now = Date.now()) {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.delete(key);
    return { blocked: false, retryAfterSec: 0 };
  }
  const blocked = bucket.failures >= limit.maxFailures;
  return { blocked, retryAfterSec: blocked ? Math.ceil((bucket.resetAt - now) / 1000) : 0 };
}

/**
 * @param {string} key
 * @param {{ maxFailures: number, windowMs: number }} [limit]
 */
export function registerFailure(key, limit = LOGIN_LIMIT, now = Date.now()) {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { failures: 1, resetAt: now + limit.windowMs });
  } else {
    bucket.failures += 1;
  }
  // Evita crescita illimitata della mappa durante un attacco distribuito
  if (buckets.size > 10000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
}

/** @param {string} key */
export function clearFailures(key) {
  buckets.delete(key);
}
