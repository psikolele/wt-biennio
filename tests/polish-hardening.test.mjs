import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("area docenti e test cartaceo seguono il sistema condiviso", async () => {
  const login = await readFile(new URL("../app/docenti/login/page.tsx", import.meta.url), "utf8");
  const dashboard = await readFile(new URL("../app/docenti/page.tsx", import.meta.url), "utf8");
  const diagnostic = await readFile(new URL("../app/components/diagnostic-test.tsx", import.meta.url), "utf8");
  assert.match(login, /portal-shell/);
  assert.match(login, /aria-describedby/);
  assert.match(login, /isLoading/);
  assert.match(dashboard, /portal-shell/);
  assert.match(diagnostic, /options\.map/);
});

test("le CTA senza risorsa non simulano un link funzionante", async () => {
  const source = await readFile(new URL("../app/components/slide-viewer.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /href=\{href \?\? "#"\}/);
  assert.match(source, /href \? <a/);
});
