import assert from "node:assert/strict";
import { test } from "node:test";

test("Materials Storage: aggiunta, recupero e cancellazione materiali extra", async () => {
  const { addMaterial, getMaterialsForLesson, deleteMaterialById } = await import(
    "../app/lib/materials-storage.ts"
  );

  const testYear = 3;
  const testWeek = 32; // Settimana di verifica finale classe 3
  const testTitle = "Traccia Prova Finale Laboratorio Test " + Date.now();
  const testLink = "https://drive.google.com/file/d/test-sample-id/view";

  // 1. Aggiunta link materiale extra
  const created = await addMaterial({
    year: testYear,
    week: testWeek,
    title: testTitle,
    linkUrl: testLink
  });

  assert.ok(created.id, "Il materiale deve avere un ID generato");
  assert.equal(created.year, testYear);
  assert.equal(created.week, testWeek);
  assert.equal(created.title, testTitle);
  assert.equal(created.url, testLink);
  assert.equal(created.isExternalLink, true);
  assert.ok(created.uploadedAt);

  // 2. Recupero materiali per la lezione
  const lessonMaterials = await getMaterialsForLesson(testYear, testWeek);
  assert.ok(lessonMaterials.length >= 1);
  const found = lessonMaterials.find((m) => m.id === created.id);
  assert.ok(found, "Il materiale appena creato deve essere presente nell'elenco");

  // 3. Aggiunta file virtuale in memoria
  const fileTitle = "Compito Pratico PDF Test " + Date.now();
  const sampleBuffer = Buffer.from("Contenuto di test per verifica PDF", "utf8");
  const createdFile = await addMaterial({
    year: testYear,
    week: testWeek,
    title: fileTitle,
    file: {
      buffer: sampleBuffer,
      fileName: "scheda_verifica_test.pdf",
      mimeType: "application/pdf"
    }
  });

  assert.ok(createdFile.id);
  assert.equal(createdFile.fileName, "scheda_verifica_test.pdf");
  assert.equal(createdFile.fileType, "pdf");
  assert.ok(createdFile.sizeBytes > 0);

  // 4. Eliminazione del file creato
  const deletedFile = await deleteMaterialById(createdFile.id);
  assert.equal(deletedFile, true, "L'eliminazione deve restituire true");

  // 5. Eliminazione del link creato
  const deletedLink = await deleteMaterialById(created.id);
  assert.equal(deletedLink, true, "L'eliminazione deve restituire true");

  // 6. Verifica che non sia più presente
  const afterDelete = await getMaterialsForLesson(testYear, testWeek);
  assert.equal(afterDelete.some((m) => m.id === created.id), false);
  assert.equal(afterDelete.some((m) => m.id === createdFile.id), false);

  // 7. Eliminazione ID inesistente restituisce false
  const notFoundDelete = await deleteMaterialById("non-existent-id-9999");
  assert.equal(notFoundDelete, false);
});
