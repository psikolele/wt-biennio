import fs from "node:fs";
import path from "node:path";

const SOURCE_DIR = process.argv[2] || path.resolve(process.env.USERPROFILE, "Downloads");
const TARGET_BASE = path.resolve("public");

console.log(`[Organize] Scansione risorse in: ${SOURCE_DIR}`);
console.log(`[Organize] Destinazione base: ${TARGET_BASE}`);

export const rules = [
  // Anno 1
  { pattern: /hardware|pc_smontat|component/i, year: 1, week: 2, name: "hardware" },
  { pattern: /sicurezza.*lab|regolamento/i, year: 1, week: 3, name: "sicurezza-lab" },
  { pattern: /cpu|memori|ram/i, year: 1, week: 4, name: "cpu-memoria" },
  { pattern: /archivia|ssd|hard_disk|periferic/i, year: 1, week: 5, name: "archiviazione" },
  { pattern: /sistema_operativo|os/i, year: 1, week: 6, name: "sistema-operativo" },
  { pattern: /file.*cartell|cartell.*file/i, year: 1, week: 7, name: "file-cartelle" },
  { pattern: /backup/i, year: 1, week: 8, name: "backup" },
  { pattern: /reti|lan|wan|topolog/i, year: 1, week: 9, name: "reti" },
  { pattern: /internet|indirizz|dns/i, year: 1, week: 10, name: "internet" },
  { pattern: /ricerca.*fonti|attendibil/i, year: 1, week: 11, name: "ricerca-fonti" },
  { pattern: /copyright|creative_commons/i, year: 1, week: 12, name: "copyright" },
  { pattern: /email|posta_elettr/i, year: 1, week: 13, name: "email" },
  { pattern: /netiquette/i, year: 1, week: 14, name: "netiquette" },
  { pattern: /cloud|drive/i, year: 1, week: 15, name: "cloud" },
  { pattern: /word|videoscrittur/i, year: 1, week: 17, name: "videoscrittura" },
  { pattern: /formattazione/i, year: 1, week: 18, name: "formattazione" },
  { pattern: /tabelle.*immagin/i, year: 1, week: 19, name: "tabelle-immagini" },
  { pattern: /stili.*sommari/i, year: 1, week: 20, name: "stili-sommario" },
  { pattern: /relazione.*digital/i, year: 1, week: 21, name: "relazione-digitale" },
  { pattern: /excel|foglio.*calcol|calcolo.*celle/i, year: 1, week: 22, name: "fogli-calcolo" },
  { pattern: /formule.*somma/i, year: 1, week: 23, name: "formule" },
  { pattern: /funzioni.*grafic/i, year: 1, week: 24, name: "funzioni-grafici" },
  { pattern: /presentazion|powerpoint/i, year: 1, week: 26, name: "presentazioni" },
  // Anno 2
  { pattern: /malware|phishing/i, year: 2, week: 2, name: "malware-phishing" },
  { pattern: /password|autenticaz/i, year: 2, week: 3, name: "password" },
  { pattern: /privacy|gdpr/i, year: 2, week: 4, name: "privacy" },
  { pattern: /database|db|tabelle.*db/i, year: 2, week: 11, name: "database" },
  { pattern: /scratch|algoritm/i, year: 2, week: 17, name: "scratch-algoritmi" },
  { pattern: /microbit|micro:bit/i, year: 2, week: 26, name: "microbit" },
  { pattern: /flowgorithm/i, year: 2, week: 27, name: "flowgorithm" }
];

export function classifyAndOrganize(sourceDir = SOURCE_DIR) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`[Warn] Cartella non trovata: ${sourceDir}`);
    return 0;
  }
  const files = fs.readdirSync(sourceDir);
  let moved = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".pdf", ".pptx", ".ppt", ".docx", ".xlsx", ".sb3", ".fprg", ".zip"].includes(ext)) continue;
    for (const rule of rules) {
      if (rule.pattern.test(file)) {
        const isSlide = [".pdf", ".pptx", ".ppt"].includes(ext) && /slide|presentaz|lezion|unita|capitol/i.test(file);
        const targetDir = isSlide
          ? path.join(TARGET_BASE, "slides", `anno${rule.year}`)
          : path.join(TARGET_BASE, "resources", `anno${rule.year}`, `settimana-${String(rule.week).padStart(2, "0")}`);
        fs.mkdirSync(targetDir, { recursive: true });
        const dest = path.join(targetDir, file);
        fs.copyFileSync(path.join(sourceDir, file), dest);
        console.log(`[OK] ${file} -> ${path.relative(TARGET_BASE, dest)}`);
        moved++;
        break;
      }
    }
  }
  console.log(`[Summary] File organizzati: ${moved}`);
  return moved;
}

if (process.argv[1] && process.argv[1].includes("ingest-resources.mjs")) {
  classifyAndOrganize();
}

