import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

// Chiave di firma dei cookie: SESSION_SECRET dedicato; TEACHER_PASSWORD solo come ripiego
// per i deploy in cui SESSION_SECRET non è ancora configurato. Nessun valore di default.
const sessionSecret = () => process.env.SESSION_SECRET || process.env.TEACHER_PASSWORD || "";
const sign = (value) => {
  const secret = sessionSecret();
  if (!secret) throw new Error("SESSION_SECRET/TEACHER_PASSWORD non configurati");
  return createHmac("sha256", secret).update(value).digest("hex");
};

// Confronto a tempo costante anche con lunghezze o caratteri multibyte diversi
const safeEqual = (a, b) =>
  timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());

/**
 * Verifica la password dell'area docenti
 * @param {string} input
 */
export function verifyTeacherPassword(input) {
  const expected = process.env.TEACHER_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  return safeEqual(input, expected);
}

/**
 * Crea la sessione firmata per i docenti
 */
export function createTeacherSession() {
  const payload = `${Date.now()}.${randomBytes(18).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

/**
 * Verifica se il cookie contiene una sessione docente valida (max 8 ore)
 * @param {string} [cookieValue]
 */
export function hasTeacherSession(cookieValue) {
  if (!cookieValue) return false;
  const parts = cookieValue.split(".");
  if (parts.length !== 3) return false;
  const [timestamp, nonce, signature] = parts;
  const payload = `${timestamp}.${nonce}`;
  if (!/^\d+$/.test(timestamp) || Date.now() - Number(timestamp) > 8 * 60 * 60 * 1000) return false;
  if (!sessionSecret()) return false;
  return safeEqual(signature, sign(payload));
}

/**
 * Restituisce la password configurata per una classe specifica (1–5), o null se assente
 * @param {number|string} year
 */
export function getClassPassword(year) {
  const envKey = `CLASS_${year}_PASSWORD`;
  return process.env[envKey] || null;
}

/**
 * Verifica la password inserita per una classe (accetta anche la password docenti come passepartout)
 * @param {number|string} year
 * @param {string} input
 */
export function verifyClassPassword(year, input) {
  if (typeof input !== "string" || !input.trim()) return false;
  // La password docente è passepartout valido per tutte le classi
  if (verifyTeacherPassword(input.trim())) return true;
  const expected = getClassPassword(year);
  if (!expected) return false;
  return safeEqual(input.trim().toLowerCase(), expected.trim().toLowerCase());
}

/**
 * Crea un token di sessione firmato per una specifica classe
 * @param {number|string} year
 */
export function createClassSession(year) {
  const payload = `class-${year}.${Date.now()}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

/**
 * Verifica se la sessione classe è valida per quell'anno (oppure se è attiva la sessione docente)
 * Durata sessione studenti: 30 giorni
 * @param {number|string} year
 * @param {string} [classCookie]
 * @param {string} [teacherCookie]
 */
export function hasClassSession(year, classCookie, teacherCookie) {
  // Accesso immediato se loggato come docente
  if (hasTeacherSession(teacherCookie)) return true;
  if (!classCookie) return false;

  const parts = classCookie.split(".");
  if (parts.length !== 4) return false;
  const [prefix, timestamp, nonce, signature] = parts;
  if (prefix !== `class-${year}`) return false;
  // Scadenza: 30 giorni
  if (!/^\d+$/.test(timestamp) || Date.now() - Number(timestamp) > 30 * 24 * 60 * 60 * 1000) return false;

  if (!sessionSecret()) return false;
  const payload = `${prefix}.${timestamp}.${nonce}`;
  return safeEqual(signature, sign(payload));
}
