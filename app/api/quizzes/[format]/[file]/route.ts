import { checkpointQuizzes } from "@/app/data/quizzes-data";

function escapeCsv(val: unknown): string {
  if (val === undefined || val === null) return "";
  const str = String(val).trim();
  if (str.includes(",") || str.includes("\"") || str.includes("\n") || str.includes("\r") || str.includes(";")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ format: string; file: string }> }
) {
  const { format, file } = await params;
  const letters = ["A", "B", "C", "D"];
  const kahootHeaders = ["Question", "Answer 1", "Answer 2", "Answer 3", "Answer 4", "Time limit (sec)", "Correct answer(s)"];
  const panquizHeaders = ["Domanda", "Opzione A", "Opzione B", "Opzione C", "Opzione D", "Risposta Esatta", "Tempo (secondi)", "Spiegazione", "Tipo Quesito"];

  // 1. All quizzes bundle Anno 1
  if (file === "all-quizzes-anno1.csv") {
    const list = checkpointQuizzes.filter((q) => q.year === 1);
    if (format === "kahoot") {
      const rows = [kahootHeaders.join(",")];
      for (const quiz of list) {
        for (const q of quiz.questions) {
          rows.push([
            escapeCsv(q.question),
            escapeCsv(q.options[0]),
            escapeCsv(q.options[1]),
            escapeCsv(q.options[2]),
            escapeCsv(q.options[3]),
            escapeCsv(q.timeLimitSeconds),
            escapeCsv(q.correctOptionIndex + 1)
          ].join(","));
        }
      }
      return new Response("\uFEFF" + rows.join("\r\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${file}"`
        }
      });
    } else {
      const rows = [panquizHeaders.join(",")];
      for (const quiz of list) {
        for (const q of quiz.questions) {
          rows.push([
            escapeCsv(q.question),
            escapeCsv(q.options[0]),
            escapeCsv(q.options[1]),
            escapeCsv(q.options[2]),
            escapeCsv(q.options[3]),
            escapeCsv(letters[q.correctOptionIndex]),
            escapeCsv(q.timeLimitSeconds),
            escapeCsv(q.explanation),
            escapeCsv(q.type)
          ].join(","));
        }
      }
      return new Response("\uFEFF" + rows.join("\r\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${file}"`
        }
      });
    }
  }

  // 2. All quizzes bundle Anno 2
  if (file === "all-quizzes-anno2.csv") {
    const list = checkpointQuizzes.filter((q) => q.year === 2);
    if (format === "kahoot") {
      const rows = [kahootHeaders.join(",")];
      for (const quiz of list) {
        for (const q of quiz.questions) {
          rows.push([
            escapeCsv(q.question),
            escapeCsv(q.options[0]),
            escapeCsv(q.options[1]),
            escapeCsv(q.options[2]),
            escapeCsv(q.options[3]),
            escapeCsv(q.timeLimitSeconds),
            escapeCsv(q.correctOptionIndex + 1)
          ].join(","));
        }
      }
      return new Response("\uFEFF" + rows.join("\r\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${file}"`
        }
      });
    } else {
      const rows = [panquizHeaders.join(",")];
      for (const quiz of list) {
        for (const q of quiz.questions) {
          rows.push([
            escapeCsv(q.question),
            escapeCsv(q.options[0]),
            escapeCsv(q.options[1]),
            escapeCsv(q.options[2]),
            escapeCsv(q.options[3]),
            escapeCsv(letters[q.correctOptionIndex]),
            escapeCsv(q.timeLimitSeconds),
            escapeCsv(q.explanation),
            escapeCsv(q.type)
          ].join(","));
        }
      }
      return new Response("\uFEFF" + rows.join("\r\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${file}"`
        }
      });
    }
  }

  // 3. Aiken Text bundles
  if (file === "all-quizzes-anno1.txt") {
    const list = checkpointQuizzes.filter((q) => q.year === 1);
    let text = "";
    for (const quiz of list) {
      text += `=== ${quiz.title.toUpperCase()} ===\nArgomento: ${quiz.topic}\nClasse: Anno ${quiz.year} - Settimana ${quiz.week}\n\n`;
      for (let i = 0; i < quiz.questions.length; i++) {
        const q = quiz.questions[i];
        text += `${i + 1}. ${q.question}\n`;
        text += `A) ${q.options[0]}\n`;
        text += `B) ${q.options[1]}\n`;
        text += `C) ${q.options[2]}\n`;
        text += `D) ${q.options[3]}\n`;
        text += `ANSWER: ${letters[q.correctOptionIndex]}\n`;
        text += `EXPLANATION: ${q.explanation}\n\n`;
      }
      text += "----------------------------------------\n\n";
    }
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${file}"`
      }
    });
  }

  if (file === "all-quizzes-anno2.txt") {
    const list = checkpointQuizzes.filter((q) => q.year === 2);
    let text = "";
    for (const quiz of list) {
      text += `=== ${quiz.title.toUpperCase()} ===\nArgomento: ${quiz.topic}\nClasse: Anno ${quiz.year} - Settimana ${quiz.week}\n\n`;
      for (let i = 0; i < quiz.questions.length; i++) {
        const q = quiz.questions[i];
        text += `${i + 1}. ${q.question}\n`;
        text += `A) ${q.options[0]}\n`;
        text += `B) ${q.options[1]}\n`;
        text += `C) ${q.options[2]}\n`;
        text += `D) ${q.options[3]}\n`;
        text += `ANSWER: ${letters[q.correctOptionIndex]}\n`;
        text += `EXPLANATION: ${q.explanation}\n\n`;
      }
      text += "----------------------------------------\n\n";
    }
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${file}"`
      }
    });
  }

  // 4. Individual quiz files
  const baseId = file.replace(/\.(csv|txt)$/, "");
  const quiz = checkpointQuizzes.find((q) => q.id === baseId);

  if (!quiz) {
    return new Response("Quiz non trovato", { status: 404 });
  }

  if (file.endsWith(".txt")) {
    let aiken = `=== ${quiz.title.toUpperCase()} ===\nArgomento: ${quiz.topic}\nClasse: Anno ${quiz.year} - Settimana ${quiz.week}\n\n`;
    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      aiken += `${i + 1}. ${q.question}\n`;
      aiken += `A) ${q.options[0]}\n`;
      aiken += `B) ${q.options[1]}\n`;
      aiken += `C) ${q.options[2]}\n`;
      aiken += `D) ${q.options[3]}\n`;
      aiken += `ANSWER: ${letters[q.correctOptionIndex]}\n`;
      aiken += `EXPLANATION: ${q.explanation}\n\n`;
    }
    return new Response(aiken, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${file}"`
      }
    });
  }

  if (format === "kahoot") {
    const rows = [kahootHeaders.join(",")];
    for (const q of quiz.questions) {
      rows.push([
        escapeCsv(q.question),
        escapeCsv(q.options[0]),
        escapeCsv(q.options[1]),
        escapeCsv(q.options[2]),
        escapeCsv(q.options[3]),
        escapeCsv(q.timeLimitSeconds),
        escapeCsv(q.correctOptionIndex + 1)
      ].join(","));
    }
    return new Response("\uFEFF" + rows.join("\r\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${file}"`
      }
    });
  } else {
    const rows = [panquizHeaders.join(",")];
    for (const q of quiz.questions) {
      rows.push([
        escapeCsv(q.question),
        escapeCsv(q.options[0]),
        escapeCsv(q.options[1]),
        escapeCsv(q.options[2]),
        escapeCsv(q.options[3]),
        escapeCsv(letters[q.correctOptionIndex]),
        escapeCsv(q.timeLimitSeconds),
        escapeCsv(q.explanation),
        escapeCsv(q.type)
      ].join(","));
    }
    return new Response("\uFEFF" + rows.join("\r\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${file}"`
      }
    });
  }
}
