import Link from "next/link";
import { notFound } from "next/navigation";
import { getWeek, getYearWeeks, type Year } from "@/app/data/curriculum";
import { LessonCard } from "@/app/components/lesson-card";
import { DiagnosticTest } from "@/app/components/diagnostic-test";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5].flatMap((year) => getYearWeeks(year as Year).map((week) => ({ year: String(year), week: String(week.number) })));
}

export default async function WeekPage({ params }: { params: Promise<{ year: string; week: string }> }) {
  const { year: rawYear, week: rawWeek } = await params;
  const year = Number(rawYear) as Year;
  const weekNumber = Number(rawWeek);
  const week = year >= 1 && year <= 5 ? getWeek(year, weekNumber) : undefined;
  if (!week) notFound();
  const previous = weekNumber > 1 ? `/anno/${year}/settimana/${weekNumber - 1}` : `/anno/${year}`;
  const next = weekNumber < 33 ? `/anno/${year}/settimana/${weekNumber + 1}` : `/anno/${year}`;

  return (
    <main className="portal-shell">
      <div className="portal-container max-w-4xl py-8">
        <Link href={`/anno/${year}`} className="portal-button-secondary">← Indice dell&apos;anno {year}</Link>
        <header className="week-header">
          <p className="portal-eyebrow">Settimana {String(week.number).padStart(2, "0")} · {year}° anno</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{week.theme}</h1>
          <p className="portal-muted mt-4 max-w-2xl text-lg leading-8">Questa scheda accompagna due ore di lavoro: attiva le conoscenze, prova, gioca e chiudi con una traccia da conservare.</p>
        </header>

        {year === 1 && weekNumber === 1 && (
          <aside className="mission-panel mt-10 mb-6" aria-label="Attività preliminare: Lezione 0">
            <p className="portal-eyebrow">Fase preliminare · Lezione 0</p>
            <h3 className="text-xl font-bold text-[var(--ink)] mt-1">
              Carta d&apos;Identità Digitale & Mappa della Classe
            </h3>
            <p className="portal-muted mt-2 text-sm leading-relaxed max-w-[60ch]">
              Attività di 60 minuti a monitor spenti per rompere il ghiaccio a coppie di banco e rilevare le abitudini informatiche.
            </p>
            <div className="support-actions mt-4 flex flex-wrap items-center gap-3">
              <Link href="/anno/1/lezione-0" className="portal-button text-xs">
                <span>Apri Scheda di Laboratorio</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a href="/downloads/scheda_identita_1N.pdf" download className="portal-button-secondary text-xs">
                <span>Scarica PDF (A5)</span>
              </a>
            </div>
          </aside>
        )}

        <section className="mt-10" aria-label="Lezioni della settimana">
          {week.lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)}
        </section>
        {year === 1 && weekNumber === 1 ? <DiagnosticTest /> : null}
        <nav className="week-nav" aria-label="Navigazione settimane">
          <Link href={previous} className="portal-button-secondary">← Settimana precedente</Link>
          <Link href={next} className="portal-button">Settimana successiva →</Link>
        </nav>
      </div>
    </main>
  );
}
