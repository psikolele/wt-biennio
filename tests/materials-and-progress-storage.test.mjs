import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import {
  addMaterial,
  getMaterialsForLesson,
  deleteMaterialById,
  getLocalMaterialsDir
} from "../app/lib/materials-storage.ts";
import {
  getClassesForYear,
  toggleClassLessonProgress,
  getLessonProgress,
  getYearLessonProgress
} from "../app/lib/lesson-progress-storage.ts";

test("Configurazione classi per Biennio (1R/1M/1N, 2R/2M/2N) e Triennio (3N, 4N, 5N)", () => {
  assert.deepEqual(getClassesForYear(1), ["1R", "1M", "1N"]);
  assert.deepEqual(getClassesForYear(2), ["2R", "2M", "2N"]);
  assert.deepEqual(getClassesForYear(3), ["3N"]);
  assert.deepEqual(getClassesForYear(4), ["4N"]);
  assert.deepEqual(getClassesForYear(5), ["5N"]);
});

test("Caricamento file materiale in ambiente serverless Vercel senza BLOB_READ_WRITE_TOKEN usa /tmp senza ENOENT", async () => {
  const prevVercel = process.env.VERCEL;
  const prevBlobToken = process.env.BLOB_READ_WRITE_TOKEN;
  process.env.VERCEL = "1";
  delete process.env.BLOB_READ_WRITE_TOKEN;

  try {
    const sampleHtml = Buffer.from("<!doctype html><html><body>Blockchain Lab</body></html>", "utf8");
    const mat = await addMaterial({
      year: 5,
      week: 4,
      title: "Spiegazione Block chain e laboratorio interattivo",
      file: {
        buffer: sampleHtml,
        fileName: "blockchain_interactive_web_hub (11).html",
        mimeType: "text/html"
      }
    });

    assert.ok(mat.id.startsWith("mat-5-4-"));
    assert.ok(
      mat.url.startsWith("/api/materials/file/"),
      `URL attesa /api/materials/file/..., ricevuta: ${mat.url}`
    );
    assert.ok(mat.localPath, "localPath deve essere valorizzato nel fallback /tmp");

    // Verifica che il file esista realmente in os.tmpdir()
    const stat = await fs.stat(mat.localPath);
    assert.equal(stat.size, sampleHtml.length);

    // Secondo caricamento consecutivo per verificare sovrascrittura del registro JSON
    const mat2 = await addMaterial({
      year: 5,
      week: 4,
      title: "Secondo allegato di test",
      linkUrl: "https://dashboard-lezioni.vercel.app"
    });

    const list = await getMaterialsForLesson(5, 4);
    assert.ok(list.some((m) => m.id === mat.id));
    assert.ok(list.some((m) => m.id === mat2.id));

    // Pulizia
    const del1 = await deleteMaterialById(mat.id);
    const del2 = await deleteMaterialById(mat2.id);
    assert.equal(del1, true);
    assert.equal(del2, true);
    assert.ok(!getLocalMaterialsDir().includes("/var/task"));
  } finally {
    if (prevVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = prevVercel;
    if (prevBlobToken !== undefined) process.env.BLOB_READ_WRITE_TOKEN = prevBlobToken;
  }
});

test("Tracciamento lezioni svolte per classe (toggle e persistenza multipla)", async () => {
  const prevVercel = process.env.VERCEL;
  const prevBlobToken = process.env.BLOB_READ_WRITE_TOKEN;
  process.env.VERCEL = "1";
  delete process.env.BLOB_READ_WRITE_TOKEN;

  try {
    const after1R = await toggleClassLessonProgress({
      year: 1,
      week: 1,
      className: "1R",
      completed: true
    });
    assert.deepEqual(after1R, ["1R"]);

    const after1N = await toggleClassLessonProgress({
      year: 1,
      week: 1,
      className: "1N",
      completed: true
    });
    assert.deepEqual(after1N, ["1R", "1N"]);

    const fetched = await getLessonProgress(1, 1);
    assert.deepEqual(fetched, ["1R", "1N"]);

    const yearMap = await getYearLessonProgress(1);
    assert.deepEqual(yearMap["1-1"], ["1R", "1N"]);

    // Rimozione spunta
    const afterRemove1R = await toggleClassLessonProgress({
      year: 1,
      week: 1,
      className: "1R",
      completed: false
    });
    assert.deepEqual(afterRemove1R, ["1N"]);

    const afterRemove1N = await toggleClassLessonProgress({
      year: 1,
      week: 1,
      className: "1N",
      completed: false
    });
    assert.deepEqual(afterRemove1N, []);
  } finally {
    if (prevVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = prevVercel;
    if (prevBlobToken !== undefined) process.env.BLOB_READ_WRITE_TOKEN = prevBlobToken;
  }
});

test("Integrazione Vercel Blob reale (upload file, allowOverwrite registro e delete)", async (t) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    t.skip("BLOB_READ_WRITE_TOKEN non presente nell'ambiente corrente");
    return;
  }

  const sampleHtml = Buffer.from("<!doctype html><html><body>Test Blob Upload</body></html>", "utf8");
  const mat1 = await addMaterial({
    year: 5,
    week: 4,
    title: "Test Live Blob 1",
    file: {
      buffer: sampleHtml,
      fileName: "blockchain_interactive_web_hub (11).html",
      mimeType: "text/html"
    }
  });

  assert.ok(
    mat1.url.includes("public.blob.vercel-storage.com"),
    `Il file caricato deve risiedere su Vercel Blob, URL: ${mat1.url}`
  );

  // Secondo salvataggio consecutivo per verificare che allowOverwrite: true funzioni sul registro
  const mat2 = await addMaterial({
    year: 5,
    week: 4,
    title: "Test Live Blob 2 (Verifica Overwrite)",
    linkUrl: "https://dashboard-lezioni.vercel.app"
  });

  const list = await getMaterialsForLesson(5, 4);
  assert.ok(list.some((m) => m.id === mat1.id));
  assert.ok(list.some((m) => m.id === mat2.id));

  // Pulizia completa dal Blob store
  const del1 = await deleteMaterialById(mat1.id);
  const del2 = await deleteMaterialById(mat2.id);
  assert.equal(del1, true);
  assert.equal(del2, true);
});

test("Integrazione Vercel Blob reale per avanzamento lezioni (consistenza read-after-write senza cache CDN stantia)", async (t) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    t.skip("BLOB_READ_WRITE_TOKEN non presente nell'ambiente corrente");
    return;
  }

  // Usiamo una settimana di test (es. anno 2, settimana 33) e ripristiniamo lo stato iniziale a fine test
  const initial = await getLessonProgress(2, 33);
  try {
    const after2R = await toggleClassLessonProgress({
      year: 2,
      week: 33,
      className: "2R",
      completed: true
    });
    assert.ok(after2R.includes("2R"));

    // Lettura immediata dopo scrittura: deve riflettere subito 2R senza attendere scadenza cache CDN
    const readImmediate1 = await getLessonProgress(2, 33);
    assert.ok(
      readImmediate1.includes("2R"),
      `Lettura immediata dopo toggle 2R deve includere 2R, ricevuto: ${JSON.stringify(readImmediate1)}`
    );

    const after2M = await toggleClassLessonProgress({
      year: 2,
      week: 33,
      className: "2M",
      completed: true
    });
    assert.ok(after2M.includes("2R") && after2M.includes("2M"));

    const readImmediate2 = await getLessonProgress(2, 33);
    assert.ok(
      readImmediate2.includes("2R") && readImmediate2.includes("2M"),
      `Lettura immediata dopo secondo toggle deve includere 2R e 2M, ricevuto: ${JSON.stringify(readImmediate2)}`
    );
  } finally {
    // Ripristina stato iniziale per anno 2, settimana 33
    for (const cls of ["2R", "2M", "2N"]) {
      await toggleClassLessonProgress({
        year: 2,
        week: 33,
        className: cls,
        completed: initial.includes(cls)
      });
    }
  }
});


