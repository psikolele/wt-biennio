import Link from "next/link";
import { notFound } from "next/navigation";
import { getYearWeeks, type Year } from "@/app/data/curriculum";

export function generateStaticParams() {
  return [{ year: "1" }, { year: "2" }, { year: "3" }, { year: "4" }, { year: "5" }];
}

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: rawYear } = await params;
  const year = Number(rawYear) as Year;
  if (year < 1 || year > 5) notFound();
  const weeks = getYearWeeks(year);
  const modules = year === 1 ? [
    { title: "Macroarea A · Conoscere e operare", description: "Capire il computer, i dispositivi, il sistema e le reti per lavorare con consapevolezza.", range: [1, 11] },
    { title: "Macroarea B · Progettare e comunicare", description: "Cercare, organizzare e comunicare informazioni con documenti, fogli e presentazioni.", range: [12, 20] },
    { title: "Macroarea C · Compiti di realtà", description: "Usare cloud e strumenti collaborativi per creare prodotti destinati a un pubblico reale.", range: [21, 33] }
  ] : year === 2 ? [
    { title: "Macroarea A · Operare in sicurezza", description: "Riconoscere minacce e comportamenti sicuri online e offline.", range: [1, 5] },
    { title: "Macroarea B · Progettare e organizzare", description: "Costruire documenti, fogli di lavoro e basi di dati ordinati e verificabili.", range: [6, 13] },
    { title: "Macroarea C · Cittadinanza digitale", description: "Collaborare, proteggere i dati e valutare l’impatto delle proprie scelte digitali.", range: [14, 16] },
    { title: "Programmazione a blocchi · Scratch, micro:bit e Flowgorithm", description: "Progettare algoritmi, trasformarli in programmi e migliorarli attraverso il debugging.", range: [17, 33] }
  ] : year === 3 ? [
    { title: "UDA 1 · Google Workspace & Flusso d'ufficio", description: "Produttività cloud, collaborazione documentale, moduli, posta professionale e calendari aziendali.", range: [1, 8] },
    { title: "UDA 2 · Sistema informatico e normative aziendali", description: "Sistemi ERP, sicurezza 81/08, licenze open source e conformità GDPR.", range: [9, 14] },
    { title: "AI Livello 1 · Fondamenti di LLM & Prompting", description: "Architettura probabilistica dei token, prompt engineering (R-C-O-V-F), policy aziendale AI e mitigazione bias/allucinazioni.", range: [15, 17] },
    { title: "UDA 5 · Excel avanzato, Tabelle Pivot & Open Data", description: "Funzioni logiche e di ricerca (CERCA.X, INDICE/CONFRONTA), tabelle pivot, Power Query, pulizia dati e report direzionali.", range: [18, 33] }
  ] : year === 4 ? [
    { title: "UDA 3 · Progettazione concettuale e logica di Basi di Dati", description: "Dagli archivi ai DBMS, modello E-R, cardinalità, regole di derivazione e normalizzazione (1NF, 2NF, 3NF).", range: [1, 10] },
    { title: "UDA 4 · Microsoft Access, Linguaggio SQL & AI Reviewer", description: "Tabelle relazionali, vincoli referenziali, query di selezione, aggregazione, Text-to-SQL, maschere e report.", range: [11, 24] },
    { title: "UDA 7 · Web design, HTML5 Semantico & Pair Programming", description: "Struttura del documento web, tag semantici, multimedia accessibile (WCAG), form interattivi e AI assisted coding.", range: [25, 33] }
  ] : [
    { title: "UDA 6 · Reti di calcolatori, Modello ISO/OSI & Sicurezza", description: "Architetture LAN/WAN, apparati, TCP/IP, subnetting, DHCP/DNS, crittografia simmetrica/asimmetrica, firma digitale e VPN.", range: [1, 17] },
    { title: "AI Livello 3 · Workflow Automation, RAG & AI Safety", description: "Automazione processi (n8n/Make), chatbot intelligenti, Retrieval-Augmented Generation, prompt injection e European AI Act.", range: [18, 26] },
    { title: "UDA 7 · Web marketing, Metriche e Campagne", description: "Strategia digitale, SEO/SEM, funnel di conversione e metriche analitiche per l'impresa.", range: [27, 28] },
    { title: "Capstone Project & Preparazione Esame di Stato", description: "Sviluppo progetto interdisciplinare d'esame (dati, reti, AI e conformità normativa) e simulazione colloquio orale.", range: [29, 33] }
  ];

  const kindLabels: Record<string, string> = {
    laboratory: "Laboratorio",
    practice: "Pratica",
    project: "Progetto",
    review: "Ripasso",
    concept: "Concetto"
  };

  const kindStyles: Record<string, string> = {
    laboratory: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    practice: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    project: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    review: "border-pink-500/30 bg-pink-500/10 text-pink-300",
    concept: "border-[#aaa2ff]/30 bg-[#aaa2ff]/10 text-[#aaa2ff]"
  };

  return (
    <main className="portal-shell">
      <div className="portal-container py-8">
        <Link href="/" className="portal-button-secondary">← Portale del laboratorio</Link>
        <header className="mt-10 max-w-3xl">
          <p className="portal-eyebrow">Percorso {year}° anno · 2 ore a settimana</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Il viaggio digitale</h1>
          <p className="portal-muted mt-5 text-lg leading-8">Una mappa di 33 settimane: ogni tappa alterna spiegazione, laboratorio, gioco e una piccola prova concreta.</p>
        </header>
        <section className="mt-12 space-y-14" aria-label={`Settimane del ${year}° anno`}>
          {modules.map((module) => {
            const moduleWeeks = weeks.filter((week) => week.number >= module.range[0] && week.number <= module.range[1]);
            const totalHours = moduleWeeks.length * 2;
            return (
              <div key={module.title}>
                <div className="mb-6 border-b border-[var(--line)] pb-4">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h2 className="text-2xl font-black tracking-tight">{module.title}</h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-1 font-mono text-xs font-semibold text-[var(--muted)]">
                      <span>Settimane {module.range[0]}–{module.range[1]}</span>
                      <span className="text-[var(--line-strong)]">·</span>
                      <span className="text-[var(--blue)]">{moduleWeeks.length} tappe ({totalHours}h)</span>
                    </span>
                  </div>
                  <p className="portal-muted mt-2 max-w-3xl text-sm leading-6">{module.description}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {moduleWeeks.map((week) => {
                    const lesson = week.lessons[0];
                    const kind = lesson?.kind ?? "concept";
                    return (
                      <Link
                        key={week.number}
                        href={`/anno/${year}/settimana/${week.number}`}
                        className="portal-card group relative flex flex-col justify-between overflow-hidden p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
                      >
                        <div>
                          {/* Card Top Metadata: Settimana + Kind Tag + Ore */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold tracking-wider text-[var(--blue)]">
                                Settimana {String(week.number).padStart(2, "0")}
                              </span>
                              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${kindStyles[kind] || kindStyles.concept}`}>
                                {kindLabels[kind] || "Lezione"}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-medium text-[var(--muted)]">
                              {lesson?.hours ?? 2}h
                            </span>
                          </div>

                          {/* Main Title */}
                          <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-[var(--ink)] transition-colors duration-150 group-hover:text-[var(--blue)] sm:text-xl line-clamp-2">
                            {week.theme}
                          </h3>

                          {/* Dynamic Lesson Description / Real Activity */}
                          <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
                            {lesson?.activity || "Apri la scheda e svolgi la missione laboratoriale."}
                          </p>
                        </div>

                        {/* Card Footer: Platform / Book Activity Tag & Action Affordance */}
                        <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3.5 text-xs">
                          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
                            {lesson?.bookActivity ? (
                              <span className="truncate rounded-md border border-[var(--line)] bg-[var(--surface-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--muted)] max-w-[180px]" title={lesson.bookActivity}>
                                {lesson.bookActivity}
                              </span>
                            ) : lesson?.platforms?.[0] ? (
                              <span className="truncate rounded-md border border-[var(--line)] bg-[var(--surface-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--muted)] max-w-[180px]">
                                {lesson.platforms[0]}
                              </span>
                            ) : (
                              <span className="text-[11px] text-[var(--muted)]">Guida 120 min</span>
                            )}
                          </div>
                          <span className="inline-flex items-center gap-1 font-bold text-[var(--blue)] transition-transform duration-200 group-hover:translate-x-1">
                            <span>Esplora</span>
                            <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
