import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("la navigazione pubblica espone i due anni e il dettaglio settimanale", async () => {
  const files = [
    "../app/page.tsx",
    "../app/anno/[year]/page.tsx",
    "../app/anno/[year]/settimana/[week]/page.tsx",
    "../app/components/lesson-card.tsx"
  ];
  const sources = await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  assert.match(sources[0], /href: "\/anno\/1"/);
  assert.match(sources[0], /href: "\/anno\/2"/);
  assert.match(sources[1], /getYearWeeks/);
  assert.match(sources[2], /getWeek/);
  assert.match(sources[3], /studentCta/);
});

test("gli indici annuali espongono i moduli del libro", async () => {
  const yearPage = await readFile(new URL("../app/anno/[year]/page.tsx", import.meta.url), "utf8");
  assert.match(yearPage, /Macroarea A/);
  assert.match(yearPage, /Macroarea B/);
  assert.match(yearPage, /Macroarea C/);
  assert.match(yearPage, /Programmazione a blocchi/);
});

test("la landing mostra le cinque classi e il wiki guida la continuità", async () => {
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const number of [1, 2, 3, 4, 5]) assert.match(home, new RegExp(`number: ${number}`));
  assert.match(home, /In progettazione/);

  const wiki = await readFile(new URL("../docs/LLM-WIKI.md", import.meta.url), "utf8");
  assert.match(wiki, /Autonomia degli agenti/);
  assert.match(wiki, /npm test/);
});
