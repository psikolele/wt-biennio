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
