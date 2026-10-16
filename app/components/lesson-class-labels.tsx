"use client";

import { useState, useEffect, type MouseEvent } from "react";

const YEAR_CLASSES_CLIENT: Record<number, readonly string[]> = {
  1: ["1R", "1M", "1N"],
  2: ["2R", "2M", "2N"],
  3: ["3N"],
  4: ["4N"],
  5: ["5N"]
};

export interface LessonClassLabelsProps {
  year: number;
  week: number;
  initialCompleted?: string[];
  isTeacher?: boolean;
  variant?: "card" | "header";
}

export function LessonClassLabels({
  year,
  week,
  initialCompleted,
  isTeacher: isTeacherProp,
  variant = "header"
}: LessonClassLabelsProps) {
  const classes = YEAR_CLASSES_CLIENT[year] ?? [];
  const [completed, setCompleted] = useState<string[]>(initialCompleted ?? []);
  const [loadingClass, setLoadingClass] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(isTeacherProp ?? false);

  useEffect(() => {
    if (isTeacherProp !== undefined) {
      setIsTeacher(isTeacherProp);
    }
  }, [isTeacherProp]);

  const initialSerialized = initialCompleted ? initialCompleted.join(",") : null;

  useEffect(() => {
    if (initialSerialized !== null) {
      setCompleted(initialSerialized ? initialSerialized.split(",") : []);
    }
  }, [initialSerialized]);

  // Se i dati non sono stati passati dal Server Component (es. pagina client Lezione 0), caricali via API
  useEffect(() => {
    if (initialCompleted !== undefined && isTeacherProp !== undefined) return;
    let active = true;
    async function fetchStatus() {
      try {
        const res = await fetch(`/api/lesson-progress?year=${year}&week=${week}`, {
          cache: "no-store"
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!active) return;
        if (Array.isArray(data.completedClasses)) {
          setCompleted(data.completedClasses);
        }
        if (typeof data.isTeacher === "boolean" && isTeacherProp === undefined) {
          setIsTeacher(data.isTeacher);
        }
      } catch {
        // Ignora errori di rete silenziosi in lettura
      }
    }
    fetchStatus();
    return () => {
      active = false;
    };
  }, [year, week, initialCompleted, isTeacherProp]);

  useEffect(() => {
    function onProgressUpdated(ev: Event) {
      const detail = (ev as CustomEvent<{ year: number; week: number; completedClasses: string[] }>).detail;
      if (detail && detail.year === year && detail.week === week) {
        setCompleted(detail.completedClasses);
      }
    }
    window.addEventListener("lesson-progress-updated", onProgressUpdated);
    return () => window.removeEventListener("lesson-progress-updated", onProgressUpdated);
  }, [year, week]);

  if (classes.length === 0) return null;

  async function handleToggle(e: MouseEvent<HTMLButtonElement>, className: string) {
    e.preventDefault();
    e.stopPropagation();
    if (!isTeacher) return;
    if (loadingClass) return;

    const prevCompleted = completed;
    const currentlyDone = prevCompleted.includes(className);
    const nextDone = !currentlyDone;
    const optimistic = nextDone
      ? classes.filter((c) => c === className || prevCompleted.includes(c))
      : prevCompleted.filter((c) => c !== className);

    setCompleted(optimistic);
    window.dispatchEvent(
      new CustomEvent("lesson-progress-updated", {
        detail: { year, week, completedClasses: optimistic }
      })
    );
    setLoadingClass(className);

    try {
      const res = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          week,
          className,
          completed: nextDone
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.completedClasses)) {
          setCompleted(data.completedClasses);
          window.dispatchEvent(
            new CustomEvent("lesson-progress-updated", {
              detail: { year, week, completedClasses: data.completedClasses }
            })
          );
        }
      } else {
        setCompleted(prevCompleted);
        window.dispatchEvent(
          new CustomEvent("lesson-progress-updated", {
            detail: { year, week, completedClasses: prevCompleted }
          })
        );
      }
    } catch {
      setCompleted(prevCompleted);
      window.dispatchEvent(
        new CustomEvent("lesson-progress-updated", {
          detail: { year, week, completedClasses: prevCompleted }
        })
      );
    } finally {
      setLoadingClass(null);
    }
  }

  const isCard = variant === "card";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`relative z-20 flex flex-wrap items-center ${isCard ? "gap-1.5" : "gap-2"}`}
      aria-label={`Stato avanzamento classi ${year}° anno`}
    >
      {!isCard && (
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mr-0.5">
          Classi:
        </span>
      )}
      {classes.map((cls) => {
        const isDone = completed.includes(cls);
        const isBusy = loadingClass === cls;
        const isInteractive = isTeacher;
        const isDisabled = !isInteractive || isBusy;

        const baseClasses = isCard
          ? "inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide border transition-all select-none"
          : "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-bold tracking-wide border transition-all select-none";

        const stateClasses = isInteractive
          ? isDone
            ? "border-emerald-400/70 bg-emerald-500/20 text-[#72e3a3] shadow-[0_0_14px_-2px_rgba(114,227,163,0.45)] hover:border-emerald-300 hover:bg-emerald-500/30 active:scale-95 cursor-pointer"
            : "border-[var(--line-strong)] bg-[var(--surface-soft)] text-[var(--ink)] opacity-85 hover:opacity-100 hover:border-[var(--blue)] hover:bg-[rgba(170,162,255,0.18)] active:scale-95 cursor-pointer"
          : isDone
            ? "border-emerald-400/40 bg-emerald-500/15 text-[#72e3a3] cursor-not-allowed opacity-90"
            : "border-[var(--line-strong)] bg-[var(--surface-soft)] text-[var(--muted)] opacity-60 cursor-not-allowed";

        const statusTitle = isInteractive
          ? isDone
            ? `Lezione svolta in ${cls} — clicca per rimuovere la spunta`
            : `Clicca per segnare la lezione come svolta in ${cls}`
          : isDone
            ? `Lezione svolta in ${cls} (sola lettura: accesso docente richiesto per modificare)`
            : `Lezione non ancora svolta in ${cls} (sola lettura: accesso docente richiesto per modificare)`;

        return (
          <button
            key={cls}
            type="button"
            disabled={isDisabled}
            onClick={(e) => handleToggle(e, cls)}
            aria-pressed={isDone}
            aria-disabled={!isInteractive}
            title={statusTitle}
            className={`${baseClasses} ${stateClasses} ${isBusy ? "opacity-60" : ""}`}
          >
            <span aria-hidden="true" className="text-xs leading-none">
              {isDone ? "✓" : "○"}
            </span>
            <span>{cls}</span>
          </button>
        );
      })}
    </div>
  );
}
