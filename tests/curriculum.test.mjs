import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const dataPath = new URL("../app/data/curriculum-data.mjs", import.meta.url);

test("il curriculum del biennio rispetta il monte ore e la struttura minima", async () => {
  const source = await readFile(dataPath, "utf8");
  const curriculumModule = await import(dataPath.href);
  const curriculum = curriculumModule.curriculum;
  assert.ok(source.includes("export"));
  const ids = new Set();

  for (const year of ["1", "2", "3", "4", "5"]) {
    assert.equal(curriculum[year].length, 33, `anno ${year}: servono 33 settimane`);
    const hours = curriculum[year].reduce((total, week) => {
      assert.ok(week.number >= 1 && week.number <= 33);
      assert.ok(week.theme);
      for (const lesson of week.lessons) {
        assert.ok(lesson.id);
        assert.equal(ids.has(lesson.id), false, `ID duplicato: ${lesson.id}`);
        ids.add(lesson.id);
        assert.ok(lesson.title);
        assert.ok(lesson.hours > 0);
        assert.ok(lesson.book);
        assert.ok(lesson.objectives?.length);
        assert.ok(lesson.activity);
        assert.ok(["concept", "laboratory", "practice", "review", "project"].includes(lesson.kind));
        assert.ok(lesson.example, `Manca un esempio: ${lesson.id}`);
        assert.ok(lesson.exercise, `Manca un'esercitazione: ${lesson.id}`);
        assert.ok(lesson.competence, `Manca la competenza: ${lesson.id}`);
        assert.ok(lesson.evidence, `Manca l'evidenza: ${lesson.id}`);
        assert.ok(lesson.materials?.length, `Mancano i materiali: ${lesson.id}`);
        assert.equal(lesson.phases?.reduce((total, phase) => total + phase.minutes, 0), 120, `La lezione ${lesson.id} non dura 2 ore`);
        assert.ok(lesson.quickCheck, `Manca il controllo rapido: ${lesson.id}`);
        assert.ok(lesson.flashCard, `Manca la Flash Card: ${lesson.id}`);
        assert.ok(lesson.bookActivity, `Manca il formato editoriale: ${lesson.id}`);
        assert.ok(lesson.platforms?.length, `Mancano gli ambienti: ${lesson.id}`);
        assert.ok(lesson.facilitatedTask, `Manca la versione facilitata: ${lesson.id}`);
        if (lesson.kind === "concept") assert.ok(lesson.explanation, `Manca la spiegazione: ${lesson.id}`);
        assert.ok(lesson.studentCta?.length);
      }
      return total + week.lessons.reduce((weekTotal, lesson) => weekTotal + lesson.hours, 0);
    }, 0);

    assert.equal(hours, 66, `anno ${year}: servono 66 ore`);
  }
});

test("la progressione distingue laboratori, progetti e ripassi", async () => {
  const { curriculum } = await import(dataPath.href);
  const lessons = Object.values(curriculum).flat().flatMap((week) => week.lessons);
  assert.ok(lessons.some((lesson) => lesson.kind === "laboratory"));
  assert.ok(lessons.some((lesson) => lesson.kind === "project"));
  assert.ok(lessons.some((lesson) => lesson.kind === "review"));
  for (const lesson of lessons) {
    if (lesson.kind === "laboratory" || lesson.kind === "project") assert.equal(lesson.explanation, undefined);
  }
});
