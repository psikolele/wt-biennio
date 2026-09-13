import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

test("i 12 quiz checkpoint di gamification rispettano gli standard e le 60 domande", async () => {
  const quizzesModule = await import("../app/data/quizzes-data.mjs");
  const { checkpointQuizzes } = quizzesModule;

  assert.equal(checkpointQuizzes.length, 12, "Devono esserci esattamente 12 quiz checkpoint");

  const anno1Quizzes = checkpointQuizzes.filter((q) => q.year === 1);
  const anno2Quizzes = checkpointQuizzes.filter((q) => q.year === 2);

  assert.equal(anno1Quizzes.length, 6, "Devono esserci 6 quiz per la Classe 1ª");
  assert.equal(anno2Quizzes.length, 6, "Devono esserci 6 quiz per la Classe 2ª");

  let totalQuestions = 0;

  for (const quiz of checkpointQuizzes) {
    assert.ok(quiz.id, "Ogni quiz deve avere un id univoco");
    assert.ok(quiz.title, "Ogni quiz deve avere un titolo");
    assert.ok(quiz.topic, "Ogni quiz deve avere un argomento");
    assert.ok(quiz.description, "Ogni quiz deve avere una descrizione");
    assert.equal(quiz.questions.length, 5, `Il quiz ${quiz.id} deve contenere esattamente 5 domande`);

    for (const q of quiz.questions) {
      totalQuestions++;
      assert.ok(q.id);
      assert.ok(q.question && q.question.length > 10, `Domanda troppo corta in ${quiz.id}`);
      assert.equal(q.options.length, 4, `Devono esserci 4 opzioni per la domanda ${q.id}`);
      assert.ok(q.correctOptionIndex >= 0 && q.correctOptionIndex <= 3, `Indice risposta corretta non valido in ${q.id}`);
      assert.ok(q.timeLimitSeconds >= 15 && q.timeLimitSeconds <= 60, `Tempo limite anomalo in ${q.id}`);
      assert.ok(q.explanation && q.explanation.length > 10, `Spiegazione mancante in ${q.id}`);
      assert.ok(["multiple_choice", "error_analysis", "true_false"].includes(q.type), `Tipo quesito non valido in ${q.id}`);
    }
  }

  assert.equal(totalQuestions, 60, "Il totale dei quesiti deve essere esattamente 60");
});

test("i file esportati per Kahoot e PanQuiz esistono e hanno la formattazione corretta", () => {
  const kahootDir = path.join(rootDir, "public", "resources", "quizzes", "kahoot");
  const panquizDir = path.join(rootDir, "public", "resources", "quizzes", "panquiz");

  assert.ok(fs.existsSync(kahootDir), "La cartella Kahoot deve esistere");
  assert.ok(fs.existsSync(panquizDir), "La cartella PanQuiz deve esistere");

  const expectedQuizIds = [
    "quiz-1-04-hardware",
    "quiz-1-09-software-filesystem",
    "quiz-1-13-reti-internet",
    "quiz-1-17-email-cloud",
    "quiz-1-21-word-videoscrittura",
    "quiz-1-25-excel-base",
    "quiz-2-03-cybersecurity",
    "quiz-2-06-privacy-crittografia",
    "quiz-2-08-word-avanzato",
    "quiz-2-10-excel-logica",
    "quiz-2-13-database",
    "quiz-2-26-coding-scratch"
  ];

  for (const id of expectedQuizIds) {
    const kCsv = path.join(kahootDir, `${id}.csv`);
    const pCsv = path.join(panquizDir, `${id}.csv`);
    const pTxt = path.join(panquizDir, `${id}.txt`);

    assert.ok(fs.existsSync(kCsv), `Manca file Kahoot ${id}.csv`);
    assert.ok(fs.existsSync(pCsv), `Manca file PanQuiz ${id}.csv`);
    assert.ok(fs.existsSync(pTxt), `Manca file PanQuiz ${id}.txt`);

    const kContent = fs.readFileSync(kCsv, "utf8");
    const pContent = fs.readFileSync(pCsv, "utf8");
    const pTxtContent = fs.readFileSync(pTxt, "utf8");

    // Kahoot CSV checks
    assert.ok(kContent.includes("Question,Answer 1,Answer 2,Answer 3,Answer 4,Time limit (sec),Correct answer(s)"));
    assert.ok(kContent.split("\n").length >= 6);

    // PanQuiz CSV checks
    assert.ok(pContent.includes("Domanda,Opzione A,Opzione B,Opzione C,Opzione D,Risposta Esatta,Tempo (secondi),Spiegazione"));

    // PanQuiz Aiken text checks
    assert.ok(pTxtContent.includes("ANSWER:"));
    assert.ok(pTxtContent.includes("EXPLANATION:"));
  }

  // Master bundles
  assert.ok(fs.existsSync(path.join(kahootDir, "all-quizzes-anno1.csv")));
  assert.ok(fs.existsSync(path.join(kahootDir, "all-quizzes-anno2.csv")));
  assert.ok(fs.existsSync(path.join(panquizDir, "all-quizzes-anno1.csv")));
  assert.ok(fs.existsSync(path.join(panquizDir, "all-quizzes-anno2.csv")));
  assert.ok(fs.existsSync(path.join(panquizDir, "all-quizzes-anno1.txt")));
  assert.ok(fs.existsSync(path.join(panquizDir, "all-quizzes-anno2.txt")));

  const manifestPath = path.join(rootDir, "public", "resources", "quizzes", "quizzes-manifest.json");
  assert.ok(fs.existsSync(manifestPath), "Il manifest JSON deve esistere");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  assert.equal(manifest.length, 12, "Il manifest deve contenere 12 quiz");
});

test("tutti i 12 quiz hanno percorsi statici e componentistica interattiva nativa", async () => {
  const { checkpointQuizzes } = await import("../app/data/quizzes-data.mjs");
  const pageSource = fs.readFileSync(path.join(rootDir, "app", "quiz", "[id]", "page.tsx"), "utf8");
  const playerSource = fs.readFileSync(path.join(rootDir, "app", "components", "quiz-player.tsx"), "utf8");

  assert.ok(pageSource.includes("generateStaticParams"));
  assert.ok(pageSource.includes("<QuizPlayer"));
  assert.ok(playerSource.includes("QuizPlayer"));
  assert.ok(playerSource.includes("handleSelectOption"));
  assert.ok(playerSource.includes("toggleFullscreen"));
  assert.equal(checkpointQuizzes.length, 12);
});


