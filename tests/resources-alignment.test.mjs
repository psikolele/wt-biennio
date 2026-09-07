import assert from "node:assert/strict";
import { open, readFile, stat } from "node:fs/promises";
import { test } from "node:test";

const curriculumPath = new URL("../app/data/curriculum-data.mjs", import.meta.url);
const teacherNotesPath = new URL("../app/data/teacher-notes.ts", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);

async function extractReferencedResources() {
  const currSource = await readFile(curriculumPath, "utf8");
  const teacherSource = await readFile(teacherNotesPath, "utf8");
  const combined = currSource + "\n" + teacherSource;
  const regex = /href:\s*["'](\/(?:resources|slides)\/[^"']+)["']/g;
  const matches = [...combined.matchAll(regex)].map(m => m[1]);
  return [...new Set(matches)];
}

test("ogni risorsa didattica associata al curriculum esiste localmente ed ha magic bytes corretti", async () => {
  const resources = await extractReferencedResources();
  assert.ok(resources.length >= 30, `Trovate solo ${resources.length} risorse`);

  for (const relPath of resources) {
    const fileUrl = new URL(`.${relPath}`, publicDir);
    const fileStat = await stat(fileUrl).catch(() => null);
    assert.ok(fileStat, `File mancante sul filesystem locale: ${relPath}`);
    assert.ok(fileStat.size > 1000, `File troppo piccolo o vuoto (${fileStat?.size} bytes): ${relPath}`);

    const fd = await open(fileUrl, "r");
    const buffer = Buffer.alloc(8);
    await fd.read(buffer, 0, 8, 0);
    await fd.close();

    const ext = relPath.slice(relPath.lastIndexOf(".")).toLowerCase();
    if (ext === ".pdf") {
      const header = buffer.toString("utf8", 0, 5);
      assert.equal(header, "%PDF-", `Il file PDF ${relPath} non inizia con %PDF-, intestazione: ${header}`);
    } else if (ext === ".zip") {
      const isZip = buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
      assert.ok(isZip, `Il file ZIP ${relPath} non inizia con PK\\x03\\x04`);
    }
  }
});

test("il posizionamento delle risorse rispetta la progressione didattica delle 33 settimane", async () => {
  const { curriculum } = await import(curriculumPath.href);

  const expectedYear1 = [
    { week: 2, keyword: "TASTIERA" },
    { week: 3, keyword: "NEGAZIONE_LOGICA_NOT" },
    { week: 4, keyword: "PSEUDOLINGUAGGI" },
    { week: 5, keyword: "DISPOSITIVI_MOBILI" },
    { week: 6, keyword: "SOFTWARE_LIBERO" },
    { week: 7, keyword: "ACCESSO_RAPIDO" },
    { week: 8, keyword: "BACKUP" },
    { week: 10, keyword: "DOMINI_PRIMO_LIVELLO" },
    { week: 13, keyword: "MAIL_RISERVATE" },
    { week: 14, keyword: "RISCHI_USO_STRUMENTI_ONLINE" },
    { week: 15, keyword: "DROPBOX" },
    { week: 16, keyword: "APPLICAZIONI_WEB" },
    { week: 17, keyword: "Word_processor.zip" },
    { week: 18, keyword: "PARAGRAFI" },
    { week: 19, keyword: "IMMAGINI_EFFETTO" },
    { week: 20, keyword: "FILIGRANA" },
    { week: 21, keyword: "Modelli_stile_lettere.zip" },
    { week: 22, keyword: "Foglio_elettronico.zip" },
    { week: 23, keyword: "RIFERIMENTO_MISTO" },
    { week: 24, keyword: "ARROTONDA" },

    { week: 25, keyword: "MESSAGGI_ERRORE" },
    { week: 26, keyword: "Presentazioni.zip" },
    { week: 28, keyword: "SMARTART" },
    { week: 29, keyword: "GRAFICI_PRESENTAZIONI" }
  ];

  for (const { week, keyword } of expectedYear1) {
    const weekData = curriculum["1"][week - 1];
    assert.ok(weekData, `Anno 1, settimana ${week} non trovata`);
    const lesson = weekData.lessons[0];
    const allHrefs = [
      ...(lesson.studentCta || []).map(c => c.href),
      lesson.slideHref
    ].filter(Boolean);

    const match = allHrefs.some(h => h.includes(keyword));
    assert.ok(match, `Anno 1, settimana ${week} ("${lesson.title}") non contiene la risorsa attesa con "${keyword}". Risorse trovate: ${allHrefs.join(", ")}`);
  }

  const expectedYear2 = [
    { week: 2, keyword: "PERICOLI_SITI_RETI_SOCIALI" },
    { week: 3, keyword: "SOFTWARE_GESTIONE_PASSWORD" },
    { week: 4, keyword: "DISTRUZIONE_SICURA_DATI" },
    { week: 6, keyword: "CRITTOGRAFIA" },
    { week: 8, keyword: "Word_processor.zip" },
    { week: 10, keyword: "Foglio_elettronico.zip" },
    { week: 11, keyword: "Database.zip" },
    { week: 17, keyword: "Scratch_3.0.zip" }
  ];

  for (const { week, keyword } of expectedYear2) {
    const weekData = curriculum["2"][week - 1];
    assert.ok(weekData, `Anno 2, settimana ${week} non trovata`);
    const lesson = weekData.lessons[0];
    const allHrefs = [
      ...(lesson.studentCta || []).map(c => c.href),
      lesson.slideHref
    ].filter(Boolean);

    const match = allHrefs.some(h => h.includes(keyword));
    assert.ok(match, `Anno 2, settimana ${week} ("${lesson.title}") non contiene la risorsa attesa con "${keyword}". Risorse trovate: ${allHrefs.join(", ")}`);
  }
});

test("le guide ministeriali dei docenti sono collegate e superano i 9 MB", async () => {
  const { teacherNotes } = await import(teacherNotesPath.href);
  assert.ok(teacherNotes.guides && teacherNotes.guides.length === 2);

  const vol1 = teacherNotes.guides.find(g => g.href.includes("Guida_Docente_Vol1.pdf"));
  const vol2 = teacherNotes.guides.find(g => g.href.includes("Guida_Docente_Vol2.pdf"));
  assert.ok(vol1, "Guida Vol. 1 mancante");
  assert.ok(vol2, "Guida Vol. 2 mancante");

  const stat1 = await stat(new URL(`.${vol1.href}`, publicDir));
  const stat2 = await stat(new URL(`.${vol2.href}`, publicDir));
  assert.ok(stat1.size > 9 * 1024 * 1024, `Guida Vol. 1 troppo piccola: ${stat1.size} bytes`);
  assert.ok(stat2.size > 9 * 1024 * 1024, `Guida Vol. 2 troppo piccola: ${stat2.size} bytes`);
});
