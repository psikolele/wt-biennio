import Link from "next/link";
import type { Lesson } from "@/app/data/curriculum";
import { AccessibleContent } from "./accessible-content";
import { SlideViewer } from "./slide-viewer";
import { GamificationPanel } from "./gamification-panel";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="lesson-card">
      <AccessibleContent facilitatedText={lesson.facilitatedTask}>
        <div className="lesson-header">
          <div className="lesson-meta"><span>{lesson.hours} ore · {lesson.kind === "laboratory" ? "laboratorio" : lesson.kind === "practice" ? "pratica" : lesson.kind === "review" ? "ripasso" : lesson.kind === "project" ? "progetto" : "nuovo argomento"}</span><span>{lesson.book}</span></div>
          <p className="lesson-book-activity">Formato: {lesson.bookActivity}</p>
          <h2>{lesson.title}</h2>
          <p>{lesson.activity}</p>
        </div>
        <div className="lesson-learning-flow">
          {lesson.explanation ? <section><h3>Idea chiave</h3><p>{lesson.explanation}</p></section> : null}
          {lesson.theoryNotes && lesson.theoryNotes.length > 0 ? (
            <section className="lesson-theory-notes bg-[var(--surface-soft)] border border-[var(--line)] rounded-xl p-4 sm:p-5 my-3">
              <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2 mb-3">
                <span className="text-[var(--coral)]" aria-hidden="true">📖</span> Appunti Teorici &amp; Sintesi del Testo
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[var(--ink)] leading-relaxed">
                {lesson.theoryNotes.map((note, idx) => (
                  <li key={idx} className="marker:text-[var(--coral)]">
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {lesson.example ? <section><h3>Esempio</h3><p>{lesson.example}</p></section> : null}
          <section><h3>{lesson.kind === "laboratory" ? "Consegna di laboratorio" : "Prova"}</h3><p>{lesson.exercise}</p></section>
          {lesson.labExercise ? (
            <section className="lesson-lab-exercise bg-[var(--surface-soft)] border-2 border-[var(--line-strong)] rounded-xl p-4 sm:p-5 my-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                  <span className="text-[var(--coral)]" aria-hidden="true">🧪</span> Laboratorio Operativo &amp; Esercizi Guidati
                </h3>
                {lesson.labExercise.toolUrl ? (
                  <a
                    href={lesson.labExercise.toolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-button text-xs min-h-[44px] py-2 px-4 inline-flex items-center gap-1.5 font-bold shadow-sm"
                  >
                    <span>Apri {lesson.labExercise.tool}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="inline-flex min-h-[36px] items-center rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs font-mono font-semibold text-[var(--coral)]">
                    {lesson.labExercise.tool}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-[var(--ink)] mb-2">
                <strong className="text-[var(--coral)]">Obiettivo a PC:</strong> {lesson.labExercise.objective}
              </p>
              <div className="mt-3 mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Passaggi Operativi:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--ink)] leading-relaxed">
                  {lesson.labExercise.steps.map((step, idx) => (
                    <li key={idx} className="marker:text-[var(--coral)] marker:font-bold">
                      <span className="text-[var(--ink)]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-lg bg-[rgba(114,227,163,0.08)] border border-[rgba(114,227,163,0.25)] p-3 text-xs text-[var(--ink)]">
                <strong className="text-[var(--coral)] font-bold">✓ Criterio di Verifica:</strong> {lesson.labExercise.verification}
              </div>
            </section>
          ) : null}
          {lesson.deepDive ? <section><h3>Vai oltre</h3><p>{lesson.deepDive}</p></section> : null}
          <section className="lesson-assessment">
            <h3>Competenza ed evidenza</h3>
            <p><strong>Competenza:</strong> {lesson.competence}</p>
            <p><strong>Alla fine troviamo:</strong> {lesson.evidence}</p>
            <div className="mt-3 pt-3 border-t border-[rgba(47,43,75,0.7)] flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] mr-1">Materiali:</span>
                {lesson.materials.map((m) => (
                  <span key={m} className="inline-flex items-center rounded-md border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-xs text-[var(--ink)]">
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--coral)] mr-1">Ambienti:</span>
                {lesson.platforms.map((p) => (
                  <span key={p} className="inline-flex items-center rounded-md border border-[rgba(114,227,163,0.25)] bg-[rgba(114,227,163,0.08)] px-2.5 py-0.5 text-xs text-[var(--coral)] font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section><h3>Scansione delle 2 ore</h3><ol className="lesson-phases">{lesson.phases.map((phase) => <li key={phase.label}><span>{phase.label}</span><strong>{phase.minutes} min</strong></li>)}</ol></section>
          <section id="ripasso"><h3>Flash Card</h3><p>{lesson.flashCard}</p><p className="lesson-quick-check"><strong>{lesson.quickCheck}</strong></p></section>
        </div>
        <div className="lesson-body">
          <section className="lesson-objectives" aria-labelledby={`${lesson.id}-objectives`}>
            <h3 id={`${lesson.id}-objectives`}>Obiettivi della tappa</h3>
            <ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
            <div className="lesson-actions">
              {lesson.studentCta.map((cta) => <Link key={cta.label} href={cta.href} className="portal-button">{cta.label}</Link>)}
            </div>
          </section>
          <div className="lesson-support-grid">
            <SlideViewer href={lesson.slideHref} />
            <GamificationPanel game={lesson.game} lessonId={lesson.id} />
          </div>
        </div>
      </AccessibleContent>
    </article>
  );
}
