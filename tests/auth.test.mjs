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
