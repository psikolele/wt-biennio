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

test("il layout globale garantisce touch target adeguati e contenimento overflow responsive", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /overflow-x:\s*hidden/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /@media\s*\(max-width:\s*560px\)/);
  assert.match(css, /@media\s*\(min-width:\s*768px\)/);
});

