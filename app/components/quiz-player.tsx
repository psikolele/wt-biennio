"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { CheckpointQuiz } from "@/app/data/quizzes-data";

interface QuizPlayerProps {
  quiz: CheckpointQuiz;
}

type QuizState = "lobby" | "question" | "feedback" | "summary";

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const [state, setState] = useState<QuizState>("lobby");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<{
    questionIndex: number;
    selectedOption: number | null;
    isCorrect: boolean;
    pointsEarned: number;
  }[]>([]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  // Synthesizer Web Audio API for discreet, elegant sound feedback
  const playSound = useCallback((type: "correct" | "wrong" | "finish") => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "wrong") {
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(174.61, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "finish") {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Audio not supported or blocked, graceful fallback
    }
  }, []);

  // Answer handler
  const handleSelectOption = useCallback((index: number | null) => {
    if (state !== "question") return;

    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctOptionIndex;
    
    let points = 0;
    if (isCorrect) {
      const timeBonus = Math.round((timeRemaining / currentQuestion.timeLimitSeconds) * 500);
      points = 1000 + timeBonus;
      setScore((prev) => prev + points);
      setCorrectAnswersCount((prev) => prev + 1);
      playSound("correct");
    } else {
      playSound("wrong");
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedOption: index,
        isCorrect,
        pointsEarned: points,
      }
    ]);

    setState("feedback");
  }, [state, currentQuestion, timeRemaining, currentQuestionIndex, playSound]);

  // Timer countdown
  useEffect(() => {
    if (state !== "question") return;

    if (timeRemaining <= 0) {
      handleSelectOption(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [state, timeRemaining, handleSelectOption]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state === "question") {
        if (e.key === "1" || e.key.toLowerCase() === "a") handleSelectOption(0);
        else if (e.key === "2" || e.key.toLowerCase() === "b") handleSelectOption(1);
        else if (e.key === "3" || e.key.toLowerCase() === "c") handleSelectOption(2);
        else if (e.key === "4" || e.key.toLowerCase() === "d") handleSelectOption(3);
      } else if (state === "feedback" && (e.key === "Enter" || e.key === " ")) {
        handleNextQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, handleSelectOption]);

  // Start Quiz
  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswersCount(0);
    setAnswersHistory([]);
    setSelectedOption(null);
    setTimeRemaining(quiz.questions[0].timeLimitSeconds);
    setState("question");
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setSelectedOption(null);
      setTimeRemaining(quiz.questions[nextIdx].timeLimitSeconds);
      setState("question");
    } else {
      playSound("finish");
      setState("summary");
    }
  };

  // Toggle Fullscreen for LIM
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const optionClasses = [
    { tileClass: "quiz-option-tile--a", symbolClass: "quiz-symbol--a", symbol: "▲", key: "A" },
    { tileClass: "quiz-option-tile--b", symbolClass: "quiz-symbol--b", symbol: "◆", key: "B" },
    { tileClass: "quiz-option-tile--c", symbolClass: "quiz-symbol--c", symbol: "●", key: "C" },
    { tileClass: "quiz-option-tile--d", symbolClass: "quiz-symbol--d", symbol: "■", key: "D" },
  ];

  return (
    <div className="quiz-shell p-6 sm:p-10">
      {/* ========================================================================= */}
      {/* 1. LOBBY STATE */}
      {/* ========================================================================= */}
      {state === "lobby" && (
        <div className="py-4 sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="portal-eyebrow">Classe {quiz.year}ª · Settimana {quiz.week}</p>
            <span className="inline-flex items-center rounded-full border border-[rgba(114,227,163,0.25)] bg-[rgba(114,227,163,0.08)] px-3 py-0.5 text-xs font-semibold text-[var(--coral)]">
              5 Domande Concettuali
            </span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] leading-tight">
            {quiz.title}
          </h1>
          <p className="portal-muted mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
            {quiz.description}
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.45)] p-4">
              <span className="text-xs font-semibold text-[var(--muted)]">Quesiti</span>
              <p className="mt-1 text-xl font-bold text-[var(--ink)]">{totalQuestions}</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.45)] p-4">
              <span className="text-xs font-semibold text-[var(--muted)]">Timer medio</span>
              <p className="mt-1 text-xl font-bold text-[var(--warning)]">20–30s</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.45)] p-4">
              <span className="text-xs font-semibold text-[var(--muted)]">Punteggio max</span>
              <p className="mt-1 text-xl font-bold text-[var(--coral)]">7.500 pt</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.45)] p-4">
              <span className="text-xs font-semibold text-[var(--muted)]">Supporto</span>
              <p className="mt-1 text-xl font-bold text-[var(--blue)]">Tastiera & LIM</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(47,43,75,0.75)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={handleStartQuiz} className="portal-button text-sm sm:text-base font-bold">
                ▶️ Avvia Checkpoint
              </button>
              <button onClick={toggleFullscreen} className="portal-button-secondary text-sm">
                ⛶ Schermo Intero LIM
              </button>
            </div>
            <Link href={`/anno/${quiz.year}/settimana/${quiz.week}`} className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--blue)] transition">
              ← Torna alla Lezione
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. QUESTION STATE */}
      {/* ========================================================================= */}
      {state === "question" && (
        <div className="py-2">
          {/* Header & Meta */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[rgba(47,43,75,0.75)]">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center rounded-md border border-[var(--line-strong)] bg-[var(--surface-soft)] px-2.5 py-1 text-xs font-bold text-[var(--blue)]">
                Quesito {currentQuestionIndex + 1} di {totalQuestions}
              </span>
              <span className="text-xs text-[var(--muted)] font-medium">
                {currentQuestion.type === "error_analysis" ? "Analisi Errore" : currentQuestion.type === "true_false" ? "Vero/Falso" : "Risposta Multipla"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[var(--muted)]">
                Punti: <strong className="text-[var(--blue)] font-extrabold text-sm">{score}</strong>
              </span>
              <button
                onClick={toggleFullscreen}
                className="text-xs text-[var(--muted)] hover:text-[var(--ink)] transition p-1"
                title="Schermo Intero"
              >
                ⛶
              </button>
            </div>
          </div>

          {/* Timer Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
              <span className="text-[var(--muted)]">Tempo di risposta</span>
              <span className={timeRemaining <= 5 ? "text-red-400 font-extrabold" : "text-[var(--coral)]"}>
                ⏱️ {timeRemaining}s
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--surface-soft)] overflow-hidden border border-[var(--line)]">
              <div
                className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                  timeRemaining > 8 ? "bg-[var(--coral)]" : timeRemaining > 4 ? "bg-[var(--warning)]" : "bg-red-400"
                }`}
                style={{
                  width: `${(timeRemaining / currentQuestion.timeLimitSeconds) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Text Box */}
          <div className="quiz-question-box mt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-[var(--ink)]">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQuestion.options.map((option, idx) => {
              const opt = optionClasses[idx];
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`quiz-option-tile ${opt.tileClass} group relative cursor-pointer`}
                >
                  <span className={`quiz-symbol-badge ${opt.symbolClass}`}>
                    {opt.symbol}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[var(--ink)] leading-snug flex-1">
                    {option}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--muted)] opacity-60 uppercase shrink-0">
                    [{opt.key}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FEEDBACK STATE */}
      {/* ========================================================================= */}
      {state === "feedback" && (
        <div className="py-2">
          {/* Status Chip */}
          <div className="flex justify-center">
            {selectedOption === currentQuestion.correctOptionIndex ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(114,227,163,0.12)] border border-[rgba(114,227,163,0.3)] px-5 py-1.5 text-[var(--coral)]">
                <span className="text-lg">✓</span>
                <span className="text-sm font-bold uppercase tracking-wider">Risposta Esatta</span>
              </div>
            ) : selectedOption === null ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(243,183,110,0.12)] border border-[rgba(243,183,110,0.3)] px-5 py-1.5 text-[var(--warning)]">
                <span className="text-lg">⏳</span>
                <span className="text-sm font-bold uppercase tracking-wider">Tempo Scaduto</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.3)] px-5 py-1.5 text-red-400">
                <span className="text-lg">✗</span>
                <span className="text-sm font-bold uppercase tracking-wider">Risposta Non Corretta</span>
              </div>
            )}
          </div>

          {/* Question & Feedback Block */}
          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[rgba(27,25,42,0.65)] p-5 sm:p-6">
            <p className="portal-eyebrow">Quesito {currentQuestionIndex + 1}</p>
            <h3 className="mt-1.5 text-base sm:text-lg font-bold text-[var(--ink)] leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Answer recap */}
            <div className="mt-4 pt-4 border-t border-[rgba(47,43,75,0.75)] grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-[rgba(114,227,163,0.25)] bg-[rgba(21,47,40,0.28)] p-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--coral)]">✓ Risposta Corretta:</span>
                <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                  {currentQuestion.options[currentQuestion.correctOptionIndex]}
                </p>
              </div>

              {selectedOption !== null && selectedOption !== currentQuestion.correctOptionIndex && (
                <div className="rounded-xl border border-[rgba(239,68,68,0.25)] bg-[rgba(47,21,21,0.28)] p-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">✗ Risposta Selezionata:</span>
                  <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                    {currentQuestion.options[selectedOption]}
                  </p>
                </div>
              )}
            </div>

            {/* Explanation box */}
            <div className="mt-4 rounded-xl border border-[rgba(170,162,255,0.25)] bg-[var(--info-bg)] p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--blue)] flex items-center gap-1.5">
                <span>💡</span> Spiegazione Didattica & Regola Chiave
              </span>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-[rgba(47,43,75,0.75)]">
            <span className="text-xs text-[var(--muted)]">Premi <strong>Invio</strong> o <strong>Spazio</strong> per avanzare</span>
            <button onClick={handleNextQuestion} className="portal-button text-sm font-bold">
              {currentQuestionIndex + 1 < totalQuestions ? "Prossimo Quesito →" : "Riepilogo Finale 🏆"}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUMMARY STATE */}
      {/* ========================================================================= */}
      {state === "summary" && (
        <div className="py-4 text-center">
          <p className="portal-eyebrow">Riepilogo Risultati</p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[var(--ink)]">
            Checkpoint Completato!
          </h2>
          <p className="portal-muted mt-2 text-sm sm:text-base">
            Hai completato la prova totalizzando <strong className="text-[var(--coral)] font-bold">{correctAnswersCount} su {totalQuestions}</strong> risposte esatte.
          </p>

          {/* Stats row */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.65)] p-5 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Punteggio Totale</span>
              <p className="mt-1 text-3xl font-extrabold text-[var(--blue)]">{score} pt</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.65)] p-5 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Badge Ottenuto</span>
              <p className="mt-1 text-base font-bold text-[var(--coral)]">
                {correctAnswersCount === 5
                  ? "⭐ Maestro del Checkpoint"
                  : correctAnswersCount >= 3
                  ? "🎖️ Esploratore Digitale"
                  : "🌱 Apprendista in Crescita"}
              </p>
            </div>
          </div>

          {/* Question debriefing list */}
          <div className="mt-8 text-left border-t border-[rgba(47,43,75,0.75)] pt-6">
            <h3 className="text-base font-bold text-[var(--ink)] mb-3">
              📋 Debriefing Didattico delle 5 Domande
            </h3>
            <div className="space-y-3">
              {quiz.questions.map((q, idx) => {
                const history = answersHistory.find((h) => h.questionIndex === idx);
                const isCorrect = history?.isCorrect ?? false;
                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border p-4 ${
                      isCorrect
                        ? "border-[rgba(114,227,163,0.25)] bg-[rgba(21,47,40,0.2)]"
                        : "border-[rgba(239,68,68,0.25)] bg-[rgba(47,21,21,0.2)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold text-[var(--ink)]">
                        {idx + 1}. {q.question}
                      </p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isCorrect ? "text-[var(--coral)] bg-[rgba(114,227,163,0.1)]" : "text-red-400 bg-[rgba(239,68,68,0.1)]"
                      }`}>
                        {isCorrect ? "Esatto" : "Errato"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      <strong className="text-[var(--coral)] font-bold">Risposta corretta:</strong> {q.options[q.correctOptionIndex]}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-[rgba(47,43,75,0.75)] flex flex-wrap items-center justify-center gap-3">
            <button onClick={handleStartQuiz} className="portal-button text-sm">
              🔄 Rigioca il Checkpoint
            </button>
            <Link href={`/anno/${quiz.year}/settimana/${quiz.week}`} className="portal-button-secondary text-sm">
              ← Torna alla Lezione
            </Link>
            <Link href="/docenti" className="portal-button-secondary text-sm">
              Console Docenti
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
