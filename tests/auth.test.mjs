import assert from "node:assert/strict";
import { test } from "node:test";

test("l'autenticazione docenti usa password configurabile e sessione firmata", async () => {
  process.env.TEACHER_PASSWORD = "test-password";
  const auth = await import(`../app/lib/auth-core.mjs?case=${Date.now()}`);
  assert.equal(auth.verifyTeacherPassword("test-password"), true);
  assert.equal(auth.verifyTeacherPassword("wrong"), false);
  const token = auth.createTeacherSession();
  assert.equal(auth.hasTeacherSession(token), true);
  assert.equal(auth.hasTeacherSession(), false);
  assert.equal(auth.hasTeacherSession(`${token}x`), false);
});

test("l'autenticazione per singola classe isola le 5 sezioni con password dedicate", async () => {
  process.env.TEACHER_PASSWORD = "super-docente";
  process.env.CLASS_1_PASSWORD = "pass-prima";
  process.env.CLASS_2_PASSWORD = "pass-seconda";
  process.env.CLASS_3_PASSWORD = "pass-terza";
  process.env.CLASS_4_PASSWORD = "pass-quarta";
  process.env.CLASS_5_PASSWORD = "pass-quinta";

  const auth = await import(`../app/lib/auth-core.mjs?case=${Date.now()}`);

  // Verifica password specifiche per classe
  assert.equal(auth.verifyClassPassword(1, "pass-prima"), true);
  assert.equal(auth.verifyClassPassword(1, "pass-seconda"), false);
  assert.equal(auth.verifyClassPassword(2, "pass-seconda"), true);
  assert.equal(auth.verifyClassPassword(5, "pass-quinta"), true);
  assert.equal(auth.verifyClassPassword(5, "pass-prima"), false);

  // La password docente sblocca qualsiasi classe come passepartout
  assert.equal(auth.verifyClassPassword(1, "super-docente"), true);
  assert.equal(auth.verifyClassPassword(5, "super-docente"), true);

  // Generazione e validazione token classe
  const token1 = auth.createClassSession(1);
  const token2 = auth.createClassSession(2);

  // Un token della classe 1 sblocca solo la classe 1
  assert.equal(auth.hasClassSession(1, token1), true);
  assert.equal(auth.hasClassSession(2, token1), false);
  assert.equal(auth.hasClassSession(5, token1), false);

  // Un token della classe 2 sblocca solo la classe 2
  assert.equal(auth.hasClassSession(2, token2), true);
  assert.equal(auth.hasClassSession(1, token2), false);

  // La sessione del docente sblocca automaticamente qualsiasi classe
  const teacherToken = auth.createTeacherSession();
  assert.equal(auth.hasClassSession(1, null, teacherToken), true);
  assert.equal(auth.hasClassSession(5, null, teacherToken), true);
});

test("fail-closed: senza variabili d'ambiente nessuna password di default è accettata", async () => {
  const saved = { ...process.env };
  delete process.env.TEACHER_PASSWORD;
  delete process.env.SESSION_SECRET;
  for (let y = 1; y <= 5; y++) delete process.env[`CLASS_${y}_PASSWORD`];
  try {
    const auth = await import(`../app/lib/auth-core.mjs?case=failclosed-${Date.now()}`);
    assert.equal(auth.verifyTeacherPassword("change-me"), false);
    assert.equal(auth.verifyTeacherPassword(""), false);
    assert.equal(auth.verifyClassPassword(1, "classe1"), false);
    assert.equal(auth.hasTeacherSession(`${Date.now()}.abc.def`), false);
    assert.throws(() => auth.createTeacherSession());
  } finally {
    Object.assign(process.env, saved);
  }
});

test("SESSION_SECRET separato: ruotarlo invalida le sessioni esistenti", async () => {
  process.env.TEACHER_PASSWORD = "docente-lunga-2026";
  process.env.SESSION_SECRET = "segreto-uno";
  const auth = await import(`../app/lib/auth-core.mjs?case=secret-${Date.now()}`);
  const token = auth.createTeacherSession();
  assert.equal(auth.hasTeacherSession(token), true);
  process.env.SESSION_SECRET = "segreto-due";
  assert.equal(auth.hasTeacherSession(token), false);
  delete process.env.SESSION_SECRET;
});

test("password con caratteri multibyte non mandano in errore il confronto", async () => {
  process.env.TEACHER_PASSWORD = "docente-lunga-2026";
  process.env.CLASS_1_PASSWORD = "pass-prima";
  const auth = await import(`../app/lib/auth-core.mjs?case=multibyte-${Date.now()}`);
  assert.equal(auth.verifyTeacherPassword("docente-lunga-202è"), false);
  assert.equal(auth.verifyClassPassword(1, "pass-primè"), false);
  assert.equal(auth.verifyClassPassword(1, "PASS-PRIMA"), true);
});

test("rate limit: blocca un IP dopo troppi errori e si sblocca a fine finestra", async () => {
  const rl = await import(`../app/lib/rate-limit-core.mjs?case=${Date.now()}`);
  const limit = { maxFailures: 3, windowMs: 1000 };
  const now = 1_000_000;
  assert.equal(rl.checkBlocked("ip-a", limit, now).blocked, false);
  rl.registerFailure("ip-a", limit, now);
  rl.registerFailure("ip-a", limit, now);
  assert.equal(rl.checkBlocked("ip-a", limit, now).blocked, false);
  rl.registerFailure("ip-a", limit, now);
  const blocked = rl.checkBlocked("ip-a", limit, now + 10);
  assert.equal(blocked.blocked, true);
  assert.ok(blocked.retryAfterSec > 0);
  assert.equal(rl.checkBlocked("ip-b", limit, now).blocked, false);
  assert.equal(rl.checkBlocked("ip-a", limit, now + 1001).blocked, false);
  rl.registerFailure("ip-c", limit, now);
  rl.clearFailures("ip-c");
  assert.equal(rl.checkBlocked("ip-c", limit, now).blocked, false);
  const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" });
  assert.equal(rl.clientIp(headers), "203.0.113.5");
});
