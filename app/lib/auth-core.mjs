import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const sessionSecret = () => process.env.TEACHER_PASSWORD || "change-me";
const sign = (value) => createHmac("sha256", sessionSecret()).update(value).digest("hex");

export function verifyTeacherPassword(input) {
  const expected = sessionSecret();
  return typeof input === "string" && input.length === expected.length && timingSafeEqual(Buffer.from(input), Buffer.from(expected));
}

export function createTeacherSession() {
  const payload = `${Date.now()}.${randomBytes(18).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

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
