import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";

test("Hub Docente espone le 5 classi complete con UDA e documenti scaricabili", async () => {
  const { teacherClassesData } = await import("../app/data/teacher-classes-data.ts");
  
  assert.ok(teacherClassesData, "teacherClassesData deve esistere");
  const years = [1, 2, 3, 4, 5];

  for (const year of years) {
    const meta = teacherClassesData[year];
    assert.ok(meta, `Meta per classe ${year} deve essere definita`);
    assert.equal(meta.year, year);
    assert.ok(meta.title, `Titolo mancante per classe ${year}`);
    assert.ok(meta.shortName, `shortName mancante per classe ${year}`);
    assert.equal(meta.hoursPerYear, 66, `Monte ore deve essere 66 per classe ${year}`);
    assert.equal(meta.weeklyHours, 2, `Ore settimanali devono essere 2 per classe ${year}`);
    assert.ok(meta.book, `Libro mancante per classe ${year}`);
    assert.ok(meta.downloadDocx, `Percorso download docx mancante per classe ${year}`);
    assert.ok(meta.udas.length >= 3, `Servono almeno 3 UDA per classe ${year}`);

    // Verifica file docx su disco
    const publicPath = join(process.cwd(), "public", meta.downloadDocx.replace(/^\//, ""));
    const fileStat = await stat(publicPath);
    assert.ok(fileStat.size > 10000, `Il file docx per classe ${year} (${meta.downloadDocx}) deve esistere e superare 10KB`);

    // Verifica UDA
    for (const uda of meta.udas) {
      assert.ok(uda.id);
      assert.ok(uda.number > 0);
      assert.ok(uda.title);
      assert.ok(uda.weeksRange);
      assert.ok(uda.competences.length > 0);
      assert.ok(uda.skills.length > 0);
      assert.ok(uda.knowledge.length > 0);
      assert.ok(uda.contents.length > 0);
      assert.ok(uda.assessmentTypes.length > 0);
      assert.ok(uda.hours > 0);
    }

    // Verifica laboratori e strategie
    assert.ok(meta.assessmentStrategy.formative);
    assert.ok(meta.assessmentStrategy.summative);
    assert.ok(meta.assessmentStrategy.criteria.length >= 3);
    assert.ok(meta.assessmentStrategy.typicalLabs.length >= 2);
  }
});
