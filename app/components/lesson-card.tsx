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
          <section className="lesson-assessment"><h3>Competenza ed evidenza</h3><p><strong>Competenza:</strong> {lesson.competence}</p><p><strong>Alla fine troviamo:</strong> {lesson.evidence}</p><p><strong>Materiali:</strong> {lesson.materials.join(", ")}</p><p><strong>Ambienti:</strong> {lesson.platforms.join(" · ")}</p></section>
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
