import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const sessionSecret = () => process.env.TEACHER_PASSWORD || "change-me";
const sign = (value) => createHmac("sha256", sessionSecret()).update(value).digest("hex");

/**
 * Verifica la password dell'area docenti
 * @param {string} input
 */
export function verifyTeacherPassword(input) {
  const expected = sessionSecret();
  return typeof input === "string" && input.length === expected.length && timingSafeEqual(Buffer.from(input), Buffer.from(expected));
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
  const expected = sign(payload);
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/**
 * Restituisce la password configurata per una classe specifica (1–5)
 * @param {number|string} year
 */
export function getClassPassword(year) {
  const envKey = `CLASS_${year}_PASSWORD`;
  return process.env[envKey] || `classe${year}`;
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
  return input.trim().toLowerCase() === expected.trim().toLowerCase();
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

  const payload = `${prefix}.${timestamp}.${nonce}`;
  const expected = sign(payload);
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
