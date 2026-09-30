import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getWeek, getYearWeeks, type Year } from "@/app/data/curriculum";
import { LessonCard } from "@/app/components/lesson-card";
import { DiagnosticTest } from "@/app/components/diagnostic-test";
import { InteractiveCryptoLab } from "@/app/components/interactive-crypto-lab";
import { LessonExtraMaterials } from "@/app/components/lesson-extra-materials";
import { hasClassAccess } from "@/app/lib/class-access";
import { hasTeacherSession } from "@/app/lib/auth";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5].flatMap((year) => getYearWeeks(year as Year).map((week) => ({ year: String(year), week: String(week.number) })));
}

export default async function WeekPage({ params }: { params: Promise<{ year: string; week: string }> }) {
  const { year: rawYear, week: rawWeek } = await params;
  const year = Number(rawYear) as Year;
  const weekNumber = Number(rawWeek);
  const week = year >= 1 && year <= 5 ? getWeek(year, weekNumber) : undefined;
  if (!week) notFound();
  if (!(await hasClassAccess(year))) return null;
  const isTeacher = hasTeacherSession((await cookies()).get("teacher_session")?.value);
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

        {year === 4 && weekNumber === 1 && (
          <aside className="mission-panel mt-10 mb-6" aria-label="Web App Didattica: HTML Zombies">
            <p className="portal-eyebrow">Laboratorio Operativo · Gamification Interattiva</p>
            <h3 className="text-xl font-bold text-[var(--ink)] mt-1 flex items-center gap-2">
              <span>🏹 HTML Zombies: Difesa della «Gestione Clienti»</span>
            </h3>
            <p className="portal-muted mt-2 text-sm leading-relaxed max-w-[70ch]">
              Palestra interattiva a 10 tappe su modello <em>Flexbox Zombies</em>. Lavora singolarmente o a coppie di postazione: digita il codice da zero (anti-copia/incolla attivo con avviso sonoro), affronta il fading progressivo dei suggerimenti e sconfiggi il Boss finale ricostruendo la tabella clienti e il collegamento al foglio di stile CSS.
            </p>
            <div className="support-actions mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://html-zombies.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="portal-button text-xs min-h-[44px] py-2 px-5 inline-flex items-center gap-2 font-bold shadow-md"
              >
                <span>🏹 Entra in Partita (Web App Live)</span>
                <span aria-hidden="true">↗</span>
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-strong)] bg-[var(--surface-soft)] text-xs text-[var(--muted)]">
                🔒 GDPR Zero-PII (Crittografia AES-256)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-strong)] bg-[var(--surface-soft)] text-xs text-[var(--muted)]">
                🎯 10 Livelli Progressivi
              </span>
            </div>
          </aside>
        )}

        <section className="mt-10" aria-label="Lezioni della settimana">
          {week.lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)}
        </section>

        {/* Sezione Materiali Extra & Schede di Verifica (Caricabili dal Docente) */}
        <LessonExtraMaterials year={year} week={weekNumber} isTeacherSession={isTeacher} />

        {year === 5 && weekNumber === 1 && (
          <div id="palestra-crittografia" className="my-10 scroll-mt-20">
            <InteractiveCryptoLab
              initialTab="cesare"
              allowedTabs={["cesare"]}
              title="Palestra Operativa · Cifrario di Cesare & Modulo 21"
              subtitle="Sperimenta dal vivo la formula (Pos ± K) mod 21, la gestione del resto negativo e verifica gli esercizi ufficiali delle slide (CLASSE, ANNA, DEG, CADO)."
            />
          </div>
        )}

        {year === 5 && weekNumber === 2 && (
          <div id="palestra-crittografia" className="my-10 scroll-mt-20">
            <InteractiveCryptoLab
              initialTab="xor"
              allowedTabs={["xor", "poly", "asymmetric"]}
              title="Palestra Operativa · XOR, Polialfabetica & Asimmetrica PKI"
              subtitle="Sperimenta l'operazione bit a bit XOR, la catena di sottochiavi evolutive (ALLA, MIA, SCUOLA) e la simulazione di chiavi pubbliche e private tra Alice e Bob."
            />
          </div>
        )}

        {year === 1 && weekNumber === 1 ? <DiagnosticTest /> : null}
        <nav className="week-nav" aria-label="Navigazione settimane">
          <Link href={previous} className="portal-button-secondary">← Settimana precedente</Link>
          <Link href={next} className="portal-button">Settimana successiva →</Link>
        </nav>
      </div>
    </main>
  );
}
