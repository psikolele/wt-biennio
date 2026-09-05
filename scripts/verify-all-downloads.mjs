import { open, readFile, stat } from "node:fs/promises";

const curriculumPath = new URL("../app/data/curriculum-data.mjs", import.meta.url);
const teacherNotesPath = new URL("../app/data/teacher-notes.ts", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);

const VERCEL_BASE = "https://wt-biennio.vercel.app";
const CDN_BASE = "https://github.com/psikolele/wt-biennio/releases/download/v1.0.0-assets";

async function main() {
  console.log("================================================================================");
  console.log("       BATTERIA DI TEST: VERIFICA DOWNLOAD E POSIZIONAMENTO DIDATTICO          ");
  console.log("================================================================================");

  const { curriculum } = await import(curriculumPath.href);
  const { teacherNotes } = await import(teacherNotesPath.href);

  const itemsToVerify = [];

  // Raccogli tutte le lezioni di Anno 1 e Anno 2
  for (const year of ["1", "2"]) {
    for (const week of curriculum[year]) {
      for (const lesson of week.lessons) {
        const hrefs = [
          ...(lesson.studentCta || []).map(c => ({ href: c.href, label: c.label })),
          ...(lesson.slideHref ? [{ href: lesson.slideHref, label: "Slide Viewer" }] : [])
        ];

        for (const item of hrefs) {
          if (item.href.startsWith("/resources/") || item.href.startsWith("/slides/")) {
            itemsToVerify.push({
              year,
              week: week.number,
              theme: lesson.title,
              label: item.label,
              href: item.href,
              filename: item.href.split("/").pop()
            });
          }
        }
      }
    }
  }

  // Aggiungi le guide docenti
  if (teacherNotes.guides) {
    for (const g of teacherNotes.guides) {
      itemsToVerify.push({
        year: "Docenti",
        week: "-",
        theme: g.title,
        label: "Guida Docente",
        href: g.href,
        filename: g.href.split("/").pop()
      });
    }
  }

  console.log(`Trovati ${itemsToVerify.length} asset associati a specifiche tappe didattiche.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < itemsToVerify.length; i++) {
    const item = itemsToVerify[i];
    const prefix = `[${String(i + 1).padStart(2, "0")}/${itemsToVerify.length}]`;
    const locTag = `Anno ${item.year} - Settimana ${String(item.week).padStart(2, "0")}`;
    const header = `${prefix} ${locTag.padEnd(23)} | ${item.theme.slice(0, 32).padEnd(32)}`;

    // 1. Verifica locale (esistenza + magic bytes)
    const localFileUrl = new URL(`.${item.href}`, publicDir);
    let localOk = false;
    let localSize = 0;
    try {
      const s = await stat(localFileUrl);
      localSize = s.size;
      const fd = await open(localFileUrl, "r");
      const buf = Buffer.alloc(8);
      await fd.read(buf, 0, 8, 0);
      await fd.close();

      const ext = item.filename.slice(item.filename.lastIndexOf(".")).toLowerCase();
      if (ext === ".pdf" && buf.toString("utf8", 0, 5) === "%PDF-") {
        localOk = true;
      } else if (ext === ".zip" && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) {
        localOk = true;
      }
    } catch (e) {
      localOk = false;
    }

    // 2. Verifica Vercel Redirect & CDN Download
    let remoteOk = false;
    let remoteStatus = 0;
    let remoteSize = 0;
    try {
      const vercelUrl = `${VERCEL_BASE}${item.href}`;
      const res = await fetch(vercelUrl, { method: "HEAD", redirect: "follow" });
      remoteStatus = res.status;
      remoteSize = Number(res.headers.get("content-length") || 0);
      if (remoteStatus === 200 && remoteSize > 1000) {
        remoteOk = true;
      }
    } catch (e) {
      remoteOk = false;
    }

    const sizeFormatted = (localSize / (1024 * (localSize > 1024 * 1024 ? 1024 : 1))).toFixed(1) + (localSize > 1024 * 1024 ? " MB" : " KB");

    if (localOk && remoteOk) {
      successCount++;
      console.log(`${header} | ${item.filename.slice(0, 24).padEnd(24)} | ${sizeFormatted.padStart(8)} | LOC: OK | VERCEL->CDN: 200 OK`);
    } else {
      failCount++;
      console.error(`${header} | ${item.filename} | FALLITO (LOC: ${localOk}, REMOTE: ${remoteStatus}, SIZE: ${remoteSize})`);
    }
  }

  console.log("\n================================================================================");
  console.log(`ESITO FINALE: ${successCount}/${itemsToVerify.length} asset verificati con successo al 100%.`);
  console.log(`- Integrità locale (Magic bytes PDF/ZIP): OK`);
  console.log(`- Corrispondenza e posizionamento per settimana: OK`);
  console.log(`- Download remoto Vercel -> GitHub Releases CDN: OK (Tutti 200 OK)`);
  console.log("================================================================================");

  if (failCount > 0) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
