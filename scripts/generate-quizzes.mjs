import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Helper to escape CSV values
function escapeCsv(val) {
  if (val === undefined || val === null) return "";
  const str = String(val).trim();
  if (str.includes(",") || str.includes("\"") || str.includes("\n") || str.includes("\r") || str.includes(";")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function run() {
  // Read and import quizzes data
  const quizzesModule = await import("../app/data/quizzes-data.mjs");
  const { checkpointQuizzes } = quizzesModule;

  console.log(`Caricati ${checkpointQuizzes.length} quiz checkpoint.`);

  const kahootDir = path.join(rootDir, "public", "resources", "quizzes", "kahoot");
  const panquizDir = path.join(rootDir, "public", "resources", "quizzes", "panquiz");

  fs.mkdirSync(kahootDir, { recursive: true });
  fs.mkdirSync(panquizDir, { recursive: true });

  const letters = ["A", "B", "C", "D"];
  const manifest = [];

  const kahootHeaders = ["Question", "Answer 1", "Answer 2", "Answer 3", "Answer 4", "Time limit (sec)", "Correct answer(s)"];
  const panquizHeaders = ["Domanda", "Opzione A", "Opzione B", "Opzione C", "Opzione D", "Risposta Esatta", "Tempo (secondi)", "Spiegazione", "Tipo Quesito"];

  const anno1KahootRows = [kahootHeaders.join(",")];
  const anno2KahootRows = [kahootHeaders.join(",")];
  const anno1PanquizRows = [panquizHeaders.join(",")];
  const anno2PanquizRows = [panquizHeaders.join(",")];
  let anno1Aiken = "";
  let anno2Aiken = "";

  for (const quiz of checkpointQuizzes) {
    const kahootRows = [kahootHeaders.join(",")];
    const panquizRows = [panquizHeaders.join(",")];
    let aikenText = `=== ${quiz.title.toUpperCase()} ===\nArgomento: ${quiz.topic}\nClasse: Anno ${quiz.year} - Settimana ${quiz.week}\n\n`;

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      const correctNum = q.correctOptionIndex + 1; // 1, 2, 3, 4
      const correctLetter = letters[q.correctOptionIndex]; // A, B, C, D

      // Kahoot format
      const kRow = [
        escapeCsv(q.question),
        escapeCsv(q.options[0]),
        escapeCsv(q.options[1]),
        escapeCsv(q.options[2]),
        escapeCsv(q.options[3]),
        escapeCsv(q.timeLimitSeconds),
        escapeCsv(correctNum)
      ].join(",");
      kahootRows.push(kRow);

      if (quiz.year === 1) anno1KahootRows.push(kRow);
      else anno2KahootRows.push(kRow);

      // PanQuiz CSV format
      const pRow = [
        escapeCsv(q.question),
        escapeCsv(q.options[0]),
        escapeCsv(q.options[1]),
        escapeCsv(q.options[2]),
        escapeCsv(q.options[3]),
        escapeCsv(correctLetter),
        escapeCsv(q.timeLimitSeconds),
        escapeCsv(q.explanation),
        escapeCsv(q.type)
      ].join(",");
      panquizRows.push(pRow);

      if (quiz.year === 1) anno1PanquizRows.push(pRow);
      else anno2PanquizRows.push(pRow);

      // Aiken / Text format
      aikenText += `${i + 1}. ${q.question}\n`;
      aikenText += `A) ${q.options[0]}\n`;
      aikenText += `B) ${q.options[1]}\n`;
      aikenText += `C) ${q.options[2]}\n`;
      aikenText += `D) ${q.options[3]}\n`;
      aikenText += `ANSWER: ${correctLetter}\n`;
      aikenText += `EXPLANATION: ${q.explanation}\n\n`;
    }

    if (quiz.year === 1) anno1Aiken += aikenText + "\n----------------------------------------\n\n";
    else anno2Aiken += aikenText + "\n----------------------------------------\n\n";

    // Write individual files
    const kahootFile = path.join(kahootDir, `${quiz.id}.csv`);
    fs.writeFileSync(kahootFile, "\uFEFF" + kahootRows.join("\r\n"), "utf8"); // UTF-8 with BOM for Excel

    const panquizCsvFile = path.join(panquizDir, `${quiz.id}.csv`);
    fs.writeFileSync(panquizCsvFile, "\uFEFF" + panquizRows.join("\r\n"), "utf8");

    const panquizTxtFile = path.join(panquizDir, `${quiz.id}.txt`);
    fs.writeFileSync(panquizTxtFile, aikenText, "utf8");

    manifest.push({
      id: quiz.id,
      year: quiz.year,
      week: quiz.week,
      title: quiz.title,
      topic: quiz.topic,
      description: quiz.description,
      questionsCount: quiz.questions.length,
      files: {
        kahootCsv: `/resources/quizzes/kahoot/${quiz.id}.csv`,
        panquizCsv: `/resources/quizzes/panquiz/${quiz.id}.csv`,
        panquizTxt: `/resources/quizzes/panquiz/${quiz.id}.txt`
      }
    });

    console.log(`✅ Generato ${quiz.id} (Kahoot + PanQuiz CSV/TXT)`);
  }

  // Write master bundles
  fs.writeFileSync(path.join(kahootDir, "all-quizzes-anno1.csv"), "\uFEFF" + anno1KahootRows.join("\r\n"), "utf8");
  fs.writeFileSync(path.join(kahootDir, "all-quizzes-anno2.csv"), "\uFEFF" + anno2KahootRows.join("\r\n"), "utf8");
  fs.writeFileSync(path.join(panquizDir, "all-quizzes-anno1.csv"), "\uFEFF" + anno1PanquizRows.join("\r\n"), "utf8");
  fs.writeFileSync(path.join(panquizDir, "all-quizzes-anno2.csv"), "\uFEFF" + anno2PanquizRows.join("\r\n"), "utf8");
  fs.writeFileSync(path.join(panquizDir, "all-quizzes-anno1.txt"), anno1Aiken, "utf8");
  fs.writeFileSync(path.join(panquizDir, "all-quizzes-anno2.txt"), anno2Aiken, "utf8");

  // Write JSON manifest
  const manifestFile = path.join(rootDir, "public", "resources", "quizzes", "quizzes-manifest.json");
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`\n🎉 Completata la generazione di tutti i quiz in public/resources/quizzes/!`);
  console.log(`- File Kahoot: ${checkpointQuizzes.length + 2}`);
  console.log(`- File PanQuiz: ${(checkpointQuizzes.length * 2) + 4}`);
  console.log(`- Manifest: ${manifestFile}`);
}

run().catch(err => {
  console.error("Errore durante la generazione dei quiz:", err);
  process.exit(1);
});
