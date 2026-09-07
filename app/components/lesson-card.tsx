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
          {lesson.example ? <section><h3>Esempio</h3><p>{lesson.example}</p></section> : null}
          <section><h3>{lesson.kind === "laboratory" ? "Consegna di laboratorio" : "Prova"}</h3><p>{lesson.exercise}</p></section>
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
            <GamificationPanel game={lesson.game} />
          </div>
        </div>
      </AccessibleContent>
    </article>
  );
}
