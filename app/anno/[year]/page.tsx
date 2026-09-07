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
      <div className="portal-container py-10 sm:py-14">
        <Link href="/" className="portal-button-secondary">← Portale del laboratorio</Link>
        <header className="mt-12 mb-16 max-w-3xl">
          <p className="portal-eyebrow">Percorso {year}° anno · 2 ore a settimana</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-[var(--ink)] leading-[1.08]">
            Il viaggio digitale
          </h1>
          <p className="portal-muted mt-5 text-lg leading-relaxed max-w-2xl">
            Una mappa di 33 settimane: ogni tappa alterna spiegazione, laboratorio, gioco e una piccola prova concreta.
          </p>
        </header>

        <section className="space-y-20 sm:space-y-24" aria-label={`Settimane del ${year}° anno`}>
          {modules.map((module) => {
            const moduleWeeks = weeks.filter((week) => week.number >= module.range[0] && week.number <= module.range[1]);
            const totalHours = moduleWeeks.length * 2;
            return (
              <div key={module.title} className="pt-2">
                <div className="border-b border-[var(--line)] pb-6 mb-8 sm:mb-10">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--ink)] sm:text-3xl">
                      {module.title}
                    </h2>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-1.5 font-mono text-xs font-semibold text-[var(--muted)]">
                      <span>Settimane {module.range[0]}–{module.range[1]}</span>
                      <span className="text-[var(--line-strong)]">·</span>
                      <span className="text-[var(--blue)] font-bold">{moduleWeeks.length} tappe ({totalHours}h)</span>
                    </span>
                  </div>
                  <p className="portal-muted mt-3 max-w-3xl text-sm sm:text-base leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {moduleWeeks.map((week) => {
                    const lesson = week.lessons[0];
                    const kind = lesson?.kind ?? "concept";
                    const primaryChip = lesson?.platforms?.[0] || (lesson?.materials?.[1] && lesson.materials[1] !== "Scheda operativa" ? lesson.materials[1] : lesson?.materials?.[0]) || "Guida 120 min";

                    return (
                      <Link
                        key={week.number}
                        href={`/anno/${year}/settimana/${week.number}`}
                        className="portal-card group"
                      >
                        <div>
                          {/* Eyebrow / Meta row */}
                          <div className="card-header-row">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold tracking-wider text-[var(--blue)] uppercase">
                                Sett. {String(week.number).padStart(2, "0")}
                              </span>
                              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${kindStyles[kind] || kindStyles.concept}`}>
                                {kindLabels[kind] || "Lezione"}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-semibold text-[var(--muted)] bg-[var(--surface-soft)] px-2 py-0.5 rounded border border-[var(--line)]">
                              {lesson?.hours ?? 2}h
                            </span>
                          </div>

                          {/* Title with balanced measure and line-height */}
                          <h3 className="card-title line-clamp-2">
                            {week.theme}
                          </h3>

                          {/* Description with comfortable leading */}
                          <p className="card-description line-clamp-2">
                            {lesson?.activity || "Attività laboratoriale e missione pratica."}
                          </p>
                        </div>

                        {/* Footer row with chips and animated action cue */}
                        <div className="card-footer-row">
                          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
                            <span className="truncate rounded-md border border-[rgba(170,162,255,0.2)] bg-[rgba(170,162,255,0.06)] px-2.5 py-1 text-xs font-medium text-[var(--ink)] max-w-[200px]" title={primaryChip}>
                              {primaryChip}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 font-bold text-xs text-[var(--blue)] transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                            <span>Esplora</span>
                            <span aria-hidden="true" className="text-sm">→</span>
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
