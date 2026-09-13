import Link from "next/link";

const checkpointQuizMap: Record<string, { id: string; title: string }> = {
  "1-04": { id: "quiz-1-04-hardware", title: "Checkpoint 1: Hardware & PC" },
  "1-09": { id: "quiz-1-09-software-filesystem", title: "Checkpoint 2: Software & File System" },
  "1-13": { id: "quiz-1-13-reti-internet", title: "Checkpoint 3: Reti & Fonti Web" },
  "1-17": { id: "quiz-1-17-email-cloud", title: "Checkpoint 4: E-mail & Cloud" },
  "1-21": { id: "quiz-1-21-word-videoscrittura", title: "Checkpoint 5: Word & Stili" },
  "1-25": { id: "quiz-1-25-excel-base", title: "Checkpoint 6: Excel Base & $" },
  "2-03": { id: "quiz-2-03-cybersecurity", title: "Checkpoint 7: Cybersecurity & 2FA" },
  "2-06": { id: "quiz-2-06-privacy-crittografia", title: "Checkpoint 8: Privacy & Firma Digitale" },
  "2-08": { id: "quiz-2-08-word-avanzato", title: "Checkpoint 9: Word & Stampa Unione" },
  "2-10": { id: "quiz-2-10-excel-logica", title: "Checkpoint 10: Excel Funzioni SE/E/O" },
  "2-13": { id: "quiz-2-13-database", title: "Checkpoint 11: Database & Query" },
  "2-26": { id: "quiz-2-26-coding-scratch", title: "Checkpoint 12: Scratch & Coding" },
};

export function GamificationPanel({ game, lessonId }: { game?: string; lessonId?: string }) {
  const quizInfo = lessonId ? checkpointQuizMap[lessonId] : undefined;

  return (
    <aside className="mission-panel" aria-label="Missione della settimana">
      <p className="portal-eyebrow">Missione</p>
      <h3 className="mt-2 text-lg font-bold">{game ?? "Completa la sfida della settimana"}</h3>
      <p className="portal-muted mt-2 text-sm leading-6">Collabora, prova almeno due strategie e annota che cosa ha funzionato.</p>
      
      {quizInfo ? (
        <div className="mt-4 pt-3.5 border-t border-[rgba(47,43,75,0.75)] flex flex-col gap-2">
          <Link
            href={`/quiz/${quizInfo.id}`}
            className="portal-button text-xs py-2 w-full font-bold justify-center"
          >
            ▶️ Gioca al Quiz Checkpoint (LIM)
          </Link>
          <p className="text-xs text-[var(--coral)] font-semibold">Badge in palio: Maestro del Checkpoint</p>
        </div>
      ) : (
        <p className="mt-4 text-sm font-bold text-[var(--blue)]">Badge: Esploratore digitale</p>
      )}
    </aside>
  );
}
