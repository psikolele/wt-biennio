import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("le schede offrono materiali e controlli di leggibilità", async () => {
  const files = ["../app/components/slide-viewer.tsx", "../app/components/accessible-content.tsx", "../app/components/lesson-card.tsx"];
  const sources = await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  assert.match(sources[0], /Apri in una nuova scheda/);
  assert.match(sources[1], /fontSize/);
  assert.match(sources[1], /Versione facilitata/);
  assert.match(sources[2], /SlideViewer/);
});
