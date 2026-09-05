import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("il percorso include gamification e test iniziale", async () => {
  const files = ["../app/components/gamification-panel.tsx", "../app/components/diagnostic-test.tsx", "../app/anno/[year]/settimana/[week]/page.tsx"];
  const sources = await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  assert.match(sources[0], /Missione/);
  assert.match(sources[0], /badge/i);
  assert.match(sources[1], /diagnostico/i);
  assert.match(sources[2], /DiagnosticTest/);
});
