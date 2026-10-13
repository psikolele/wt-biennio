"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { curriculum, type Week, type Year } from "@/app/data/curriculum";
import type { LessonProgressMap } from "@/app/lib/lesson-progress-storage";

interface ClassDefinition {
  className: string;
  year: Year;
  area: "Biennio" | "Triennio";
  courseLabel: string;
}

const ALL_TEACHER_CLASSES: readonly ClassDefinition[] = [
  { className: "1R", year: 1, area: "Biennio", courseLabel: "1° Anno · Sociale" },
  { className: "1M", year: 1, area: "Biennio", courseLabel: "1° Anno · Sociale" },
  { className: "1N", year: 1, area: "Biennio", courseLabel: "1° Anno · Commerciale" },
  { className: "2R", year: 2, area: "Biennio", courseLabel: "2° Anno · Sociale" },
  { className: "2M", year: 2, area: "Biennio", courseLabel: "2° Anno · Sociale" },
  { className: "2N", year: 2, area: "Biennio", courseLabel: "2° Anno · Commerciale" },
  { className: "3N", year: 3, area: "Triennio", courseLabel: "3° Anno · Commerciale" },
  { className: "4N", year: 4, area: "Triennio", courseLabel: "4° Anno · Commerciale" },
  { className: "5N", year: 5, area: "Triennio", courseLabel: "5° Anno · Commerciale" }
];

interface TeacherProgressSummaryProps {
  initialProgress: LessonProgressMap;
}

export function TeacherProgressSummary({ initialProgress }: TeacherProgressSummaryProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<LessonProgressMap>(initialProgress);
  const [areaFilter, setAreaFilter] = useState<"all" | "Biennio" | "Triennio">("all");
  const [expandedHistoryClass, setExpandedHistoryClass] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  useEffect(() => {
    setProgress(initialProgress);
  }, [initialProgress]);

  useEffect(() => {
    function onProgressUpdated(ev: Event) {
      const detail = (
        ev as CustomEvent<{ year: number; week: number; completedClasses: string[] }>
      ).detail;
      if (!detail) return;
      const key = `${detail.year}-${detail.week}`;
      setProgress((prev) => {
        const next = { ...prev };
        if (detail.completedClasses.length > 0) {
          next[key] = detail.completedClasses;
        } else {
          delete next[key];
        }
        return next;
      });
    }
    window.addEventListener("lesson-progress-updated", onProgressUpdated);
    return () => window.removeEventListener("lesson-progress-updated", onProgressUpdated);
  }, []);

  async function handleQuickToggle(year: Year, week: number, className: string, completed: boolean) {
    const key = `${year}-${week}`;
    const actionId = `${className}-${key}`;
    if (busyKey) return;

    const currentList = progress[key] ?? [];
    const optimistic = completed
      ? Array.from(new Set([...currentList, className]))
      : currentList.filter((c) => c !== className);

    window.dispatchEvent(
      new CustomEvent("lesson-progress-updated", {
        detail: { year, week, completedClasses: optimistic }
      })
    );
    setBusyKey(actionId);

    try {
      const res = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, week, className, completed })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.completedClasses)) {
          window.dispatchEvent(
            new CustomEvent("lesson-progress-updated", {
              detail: { year, week, completedClasses: data.completedClasses }
            })
          );
        }
      } else {
        window.dispatchEvent(
          new CustomEvent("lesson-progress-updated", {
            detail: { year, week, completedClasses: currentList }
          })
        );
      }
    } catch {
      window.dispatchEvent(
        new CustomEvent("lesson-progress-updated", {
          detail: { year, week, completedClasses: currentList }
        })
      );
    } finally {
      setBusyKey(null);
    }
  }

  const visibleClasses = useMemo(() => {
    if (areaFilter === "all") return ALL_TEACHER_CLASSES;
    return ALL_TEACHER_CLASSES.filter((c) => c.area === areaFilter);
  }, [areaFilter]);

  // Totale complessivo spunte su tutte le 9 classi
  const totalCompletedCount = useMemo(() => {
    let count = 0;
    for (const cls of ALL_TEACHER_CLASSES) {
      for (let w = 1; w <= 33; w++) {
        if ((progress[`${cls.year}-${w}`] ?? []).includes(cls.className)) {
          count++;
        }
      }
    }
    return count;
  }, [progress]);

  return (
    <section id="riepilogo-lezioni" className="mt-10 scroll-mt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="portal-eyebrow">Registro Rapido & Stato Avanzamento</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]">
            Riepilogo Lezioni Svolte per Classe
          </h2>
          <p className="portal-muted mt-2 max-w-2xl text-sm leading-relaxed">
            Panoramica in tempo reale delle 9 classi (<strong className="text-[var(--ink)]">1R, 1M, 1N, 2R, 2M, 2N</strong> per il Biennio e <strong className="text-[var(--ink)]">3N, 4N, 5N</strong> per il Triennio): ultima lezione svolta con sintesi didattica, storico tappe completate e prossima lezione in programma.
          </p>
        </div>

        {/* Filtri Biennio / Triennio */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-[var(--muted)] mr-1">
            Totale svolte: <strong className="text-[var(--coral)]">{totalCompletedCount}</strong> / {ALL_TEACHER_CLASSES.length * 33}
          </span>
          <div className="inline-flex rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-1">
            {(["all", "Biennio", "Triennio"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setAreaFilter(filter)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  areaFilter === filter
                    ? "bg-[var(--blue)] text-[#08090f] shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {filter === "all" ? "Tutte (9)" : filter === "Biennio" ? "Biennio (6)" : "Triennio (3)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Griglia delle Classi */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleClasses.map((cls) => {
          const yearWeeks: Week[] =
            (curriculum as unknown as Record<number, Week[]>)[cls.year] || [];

          const completedWeekNumbers: number[] = [];
          for (let w = 1; w <= 33; w++) {
            const list = progress[`${cls.year}-${w}`] ?? [];
            if (list.includes(cls.className)) {
              completedWeekNumbers.push(w);
            }
          }

          const hasDoneLezioneZero =
            cls.year === 1 && (progress["1-0"] ?? []).includes(cls.className);

          const completedCount = completedWeekNumbers.length;
          const percentage = Math.round((completedCount / 33) * 100);

          const lastDoneWeekNum =
            completedWeekNumbers.length > 0
              ? completedWeekNumbers[completedWeekNumbers.length - 1]
              : null;
          const lastDoneWeek = lastDoneWeekNum
            ? yearWeeks.find((w) => w.number === lastDoneWeekNum)
            : undefined;
          const lastDoneLesson = lastDoneWeek?.lessons[0];

          // Calcola la prossima settimana da svolgere (la prima successiva all'ultima svolta, oppure la prima non ancora svolta)
          let nextWeekNum: number | null = null;
          if (lastDoneWeekNum !== null && lastDoneWeekNum < 33) {
            for (let w = lastDoneWeekNum + 1; w <= 33; w++) {
              if (!completedWeekNumbers.includes(w)) {
                nextWeekNum = w;
                break;
              }
            }
          }
          if (nextWeekNum === null) {
            for (let w = 1; w <= 33; w++) {
              if (!completedWeekNumbers.includes(w)) {
                nextWeekNum = w;
                break;
              }
            }
          }
          const nextWeek = nextWeekNum
            ? yearWeeks.find((w) => w.number === nextWeekNum)
            : undefined;
          const nextLesson = nextWeek?.lessons[0];

          const isHistoryOpen = expandedHistoryClass === cls.className;

          return (
            <article
              key={cls.className}
              className={`bento-tile p-5 flex flex-col justify-between ${
                cls.area === "Triennio" ? "bento-tile--coral-glow" : "bento-tile--glow"
              }`}
            >
              <div>
                {/* Intestazione Card Classe */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[rgba(109,101,163,0.22)]">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center justify-center rounded-xl px-3 py-1 font-mono text-base font-black border ${
                        cls.area === "Biennio"
                          ? "border-[var(--blue)]/40 bg-[rgba(170,162,255,0.15)] text-[var(--blue)]"
                          : "border-emerald-500/40 bg-emerald-500/15 text-[var(--coral)]"
                      }`}
                    >
                      {cls.className}
                    </span>
                    <div>
                      <span className="block text-xs font-bold text-[var(--ink)]">
                        {cls.courseLabel}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                        {cls.area}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-black text-[var(--ink)]">
                      {completedCount}
                      <span className="text-xs font-normal text-[var(--muted)]">/33</span>
                    </span>
                    <span className="block font-mono text-[10px] font-bold text-[var(--coral)]">
                      {percentage}% svolto
                    </span>
                  </div>
                </div>

                {/* Barra di avanzamento */}
                <div className="mt-3">
                  <div className="h-2 w-full rounded-full bg-[var(--surface-soft)] overflow-hidden border border-[var(--line)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--blue)] to-[var(--coral)] transition-all duration-300"
                      style={{ width: `${Math.max(percentage, completedCount > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  {cls.year === 1 && (
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-[var(--muted)]">Tappa 00 (Accoglienza):</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuickToggle(1, 0, cls.className, !hasDoneLezioneZero)
                        }
                        className={`font-mono font-bold px-2 py-0.5 rounded border transition-all ${
                          hasDoneLezioneZero
                            ? "border-emerald-500/40 bg-emerald-500/15 text-[var(--coral)]"
                            : "border-[var(--line)] bg-[var(--surface-soft)] text-[var(--muted)] hover:text-[var(--ink)]"
                        }`}
                      >
                        {hasDoneLezioneZero ? "✓ Svolta" : "○ Da fare"}
                      </button>
                    </div>
                  )}
                </div>

                {/* RIEPILOGO ULTIMA LEZIONE SVOLTA */}
                <div className="mt-4 rounded-xl border border-emerald-500/25 bg-[rgba(21,47,40,0.22)] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--coral)]">
                      ✓ Ultima Lezione Svolta
                    </span>
                    {lastDoneWeek && (
                      <Link
                        href={`/anno/${cls.year}/settimana/${lastDoneWeek.number}`}
                        className="font-mono text-[11px] font-bold text-[var(--blue)] hover:underline"
                      >
                        Sett. {String(lastDoneWeek.number).padStart(2, "0")} ↗
                      </Link>
                    )}
                  </div>

                  {lastDoneWeek ? (
                    <div className="mt-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[var(--ink)] leading-snug">
                        {lastDoneWeek.theme}
                      </h3>
                      {lastDoneLesson?.activity && (
                        <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                          {lastDoneLesson.activity}
                        </p>
                      )}
                      {lastDoneLesson?.competence && (
                        <p className="mt-1.5 text-[11px] text-emerald-300/90 truncate" title={lastDoneLesson.competence}>
                          <strong>Focus:</strong> {lastDoneLesson.competence}
                        </p>
                      )}
                    </div>
                  ) : hasDoneLezioneZero ? (
                    <div className="mt-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[var(--ink)]">
                        Lezione 0 · Carta d&apos;Identità Digitale & Patto d&apos;Aula
                      </h3>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        Accoglienza a monitor spenti, intervista a coppie e diagnostica iniziale completata.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1.5 text-xs text-[var(--muted)] italic">
                      Nessuna lezione ancora spuntata per {cls.className}.
                    </p>
                  )}

                  {/* Storico Settimane Svolte */}
                  {completedWeekNumbers.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-500/20">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedHistoryClass(isHistoryOpen ? null : cls.className)
                        }
                        className="text-[11px] font-mono font-bold text-[var(--ink)] hover:text-[var(--blue)] flex items-center justify-between w-full"
                      >
                        <span>
                          Storico tappe svolte ({completedWeekNumbers.length})
                        </span>
                        <span>{isHistoryOpen ? "▲" : "▼"}</span>
                      </button>

                      {isHistoryOpen && (
                        <div className="mt-2 max-h-40 overflow-y-auto space-y-1.5 pr-1">
                          {completedWeekNumbers.map((wNum) => {
                            const wObj = yearWeeks.find((x) => x.number === wNum);
                            return (
                              <div
                                key={wNum}
                                className="flex items-center justify-between gap-2 rounded bg-[rgba(13,18,16,0.75)] px-2 py-1 text-[11px] border border-emerald-500/20"
                              >
                                <Link
                                  href={`/anno/${cls.year}/settimana/${wNum}`}
                                  className="truncate text-[var(--ink)] hover:text-[var(--blue)] flex-1"
                                  title={wObj?.theme}
                                >
                                  <strong className="font-mono text-[var(--coral)]">
                                    S{String(wNum).padStart(2, "0")}
                                  </strong>{" "}
                                  · {wObj?.theme}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuickToggle(cls.year, wNum, cls.className, false)
                                  }
                                  title={`Rimuovi spunta Settimana ${wNum} per ${cls.className}`}
                                  className="text-rose-300 hover:text-rose-200 font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-800/40 shrink-0"
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* PROSSIMA LEZIONE DA SVOLGERE */}
                <div className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--blue)]">
                      → Prossima in Programma
                    </span>
                    {nextWeek && (
                      <span className="font-mono text-[11px] text-[var(--muted)]">
                        Sett. {String(nextWeek.number).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {nextWeek ? (
                    <div className="mt-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--ink)] line-clamp-1">
                        {nextWeek.theme}
                      </h4>
                      {nextLesson?.activity && (
                        <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
                          {nextLesson.activity}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1.5 text-xs text-[var(--coral)] font-bold">
                      🎉 Tutte le 33 settimane sono state completate!
                    </p>
                  )}
                </div>
              </div>

              {/* Footer Azioni Rapide */}
              <div className="mt-4 pt-3 border-t border-[rgba(109,101,163,0.22)] flex items-center justify-between gap-2">
                {nextWeek ? (
                  <>
                    <button
                      type="button"
                      disabled={busyKey === `${cls.className}-${cls.year}-${nextWeek.number}`}
                      onClick={() =>
                        handleQuickToggle(cls.year, nextWeek.number, cls.className, true)
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 font-mono text-xs font-bold text-[var(--coral)] hover:bg-emerald-500/25 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>✓ Segna S{String(nextWeek.number).padStart(2, "0")} svolta</span>
                    </button>
                    <Link
                      href={`/anno/${cls.year}/settimana/${nextWeek.number}`}
                      className="inline-flex items-center gap-1 font-bold text-xs text-[var(--blue)] hover:underline"
                    >
                      <span>Apri lezione</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    href={`/anno/${cls.year}`}
                    className="inline-flex items-center gap-1 font-bold text-xs text-[var(--blue)] hover:underline"
                  >
                    <span>Vai all&apos;indice {cls.year}ª</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
