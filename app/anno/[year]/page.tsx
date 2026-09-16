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
    { title: "UDA 6 · Crittografia, Blockchain & Sicurezza Aziendale", description: "Crittografia classica, simmetrica (AES), asimmetrica (RSA/PKI), hash SHA-256, blockchain, firme digitali, canali sicuri (TLS/VPN) e Disaster Recovery (3-2-1).", range: [1, 7] },
    { title: "Laboratorio Basi di Dati & SQL · UdA Magazzino & Vendite", description: "DDL, vincoli d'integrità, manipolazione DML, interrogazioni con SELECT/WHERE, relazioni INNER JOIN, aggregazioni GROUP BY/HAVING, subquery e viste logiche con Beekeeper Studio, Access e Local.", range: [8, 11] },
    { title: "Data Analytics, Machine Learning & Reti Neurali", description: "Laboratorio ETL aziendale con Microsoft Power Query e visual machine learning con Orange Data Mining (reti neurali MLP e matrici di confusione).", range: [12, 14] },
    { title: "UDA 6 · Reti di calcolatori & Modulo Specialistico Subnetting", description: "Architetture LAN/WAN, mezzi fisici Cat 6, ISO/OSI vs TCP/IP, apparati L2/L3, indirizzamento IPv4, calcolo subnetting CIDR, VLSM, DHCP, DNS e troubleshooting da console.", range: [15, 23] },
    { title: "AI Livello 3 · Workflow Automation, RAG & European AI Act", description: "Automazione con n8n, chatbot con system prompt e guardrails, architetture RAG aziendali, prompt injection e conformità normativa (EU AI Act).", range: [24, 27] },
    { title: "UDA 7 & Capstone Project · Esame di Stato", description: "Web marketing, SEO/SEM e sviluppo del Capstone Project interdisciplinare con simulazione del colloquio d'esame e orientamento post-diploma.", range: [28, 33] }
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
          {year === 1 && (
            <div className="pt-2">
              <div className="border-b border-[var(--line)] pb-6 mb-8 sm:mb-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="portal-eyebrow">Modulo d&apos;Ingresso</span>
                    <h2 className="text-2xl font-black tracking-tight text-[var(--ink)] sm:text-3xl mt-1">
                      Fase preliminare · Accoglienza & Diagnostica
                    </h2>
                  </div>
                  <span className="bento-badge-live">
                    <span className="pulse-dot" />
                    <span>Tappa 00 · 1 ora (60 min)</span>
                  </span>
                </div>
                <p className="portal-muted mt-3 max-w-3xl text-sm sm:text-base leading-relaxed">
                  Sessione preliminare a monitor spenti: rompere il ghiaccio a coppie di banco protette, scoprire le 8 regole d&apos;oro del laboratorio e rilevare le abitudini digitali senza ansia da voto.
                </p>
              </div>

              {/* BENTO GRID TAPPA 00: TESSERA EROE (2 col) + 2 TESSERE METRICHE/MATERIALI (1 col ciascuna) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* TESSERA 1: HERO SCHEDA INTERATTIVA (Span 2 col su desktop grande o 1 su md) */}
                <Link
                  href="/anno/1/lezione-0"
                  className="bento-tile bento-tile--glow md:col-span-2 lg:col-span-2 group min-h-[250px]"
                >
                  <div>
                    <div className="card-header-row">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tracking-wider text-[var(--blue)] uppercase">
                          Tappa 00 · Laboratorio
                        </span>
                        <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                          Accoglienza
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[var(--coral)] bg-[var(--surface-soft)] px-2.5 py-0.5 rounded-full border border-[var(--line)]">
                        Zero Voti · 60 min
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors mt-2">
                      Carta d&apos;Identità Digitale & Mappa della Classe
                    </h3>

                    <p className="portal-muted mt-3 text-sm sm:text-base leading-relaxed max-w-[55ch]">
                      Intervista a coppie senza esposizione orale forzata, mappatura delle provenienze dei pendolari e diagnostica delle competenze hardware/software con doodle box interattivo.
                    </p>
                  </div>

                  <div className="card-footer-row mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-[rgba(170,162,255,0.25)] bg-[rgba(170,162,255,0.08)] px-3 py-1 text-xs font-medium text-[var(--ink)]">
                        Inclusione BES / DSA
                      </span>
                      <span className="rounded-md border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-1 text-xs font-mono text-[var(--muted)]">
                        A schermi spenti
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[var(--blue)] transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                      <span>Apri Scheda Digitale</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>

                {/* TESSERA 2: SCHEDA PDF A5 (Pronta per l'aula) */}
                <a
                  href="/downloads/scheda_identita_1N.pdf"
                  download="scheda_identita_1N.pdf"
                  className="bento-tile bento-tile--coral-glow group min-h-[250px]"
                >
                  <div>
                    <div className="card-header-row">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tracking-wider text-[var(--coral)] uppercase">
                          Materiale
                        </span>
                        <span className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold text-sky-300">
                          Stampa A5
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[var(--muted)] bg-[var(--surface-soft)] px-2 py-0.5 rounded border border-[var(--line)]">
                        PDF
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] group-hover:text-[var(--coral)] transition-colors mt-2">
                      Scheda Cartacea A5 (Pronta per l&apos;aula)
                    </h3>

                    <p className="card-description text-xs sm:text-sm mt-2 line-clamp-3">
                      Formato A4 orizzontale con 2 schede A5 affiancate e linea tratteggiata di taglio centrale. Grafica vettoriale per fotocopie ultranitide.
                    </p>
                  </div>

                  <div className="card-footer-row mt-6">
                    <span className="rounded-md border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-1 text-xs font-mono text-[var(--muted)]">
                      2x A5 per foglio
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-xs text-[var(--coral)] transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                      <span>Scarica PDF</span>
                      <span aria-hidden="true">↓</span>
                    </span>
                  </div>
                </a>

                {/* TESSERA 3: GUIDA DOCENTI & PATTO D'AULA (Span su lg per completare la bento grid) */}
                <Link
                  href="/anno/1/lezione-0"
                  className="bento-tile md:col-span-2 lg:col-span-3 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-bold tracking-wider text-[#F3B76E] uppercase">
                          Area Docenti · Metodologia
                        </span>
                        <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                          Guida Didattica
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors">
                        Scaletta Oraria (60 min) & Il Patto d&apos;Aula del Laboratorio
                      </h3>
                      <p className="portal-muted text-xs sm:text-sm mt-1 max-w-3xl">
                        Timing minuto per minuto (0–10 min accoglienza, 10–22 min scheda personale, 22–42 min intervista compagno, 42–60 min patto d&apos;aula e 8 regole d&apos;oro).
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-bold text-xs text-[var(--blue)] shrink-0 self-start sm:self-center border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-2 rounded-full group-hover:border-[var(--blue)] transition-colors">
                      <span>Consulta Guida Docente</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>

              </div>
            </div>
          )}
          {modules.map((module) => {
            const moduleWeeks = weeks.filter((week) => week.number >= module.range[0] && week.number <= module.range[1]);
            const totalHours = moduleWeeks.length * 2;
            return (
              <div key={module.title} className="pt-2">
                <div className="border-b border-[var(--line)] pb-6 mb-8 sm:mb-10">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="portal-eyebrow">Curricolo Laboratoriale</span>
                      <h2 className="text-2xl font-black tracking-tight text-[var(--ink)] sm:text-3xl mt-1">
                        {module.title}
                      </h2>
                    </div>
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

                {/* BENTO GRID DELLE SETTIMANE: Tessere asimmetriche con highlight per compiti di realtà */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {moduleWeeks.map((week, idx) => {
                    const lesson = week.lessons[0];
                    const kind = lesson?.kind ?? "concept";
                    const primaryChip = lesson?.platforms?.[0] || (lesson?.materials?.[1] && lesson.materials[1] !== "Scheda operativa" ? lesson.materials[1] : lesson?.materials?.[0]) || "Guida 120 min";
                    
                    // Highlight speciale per settimane cardine (es. prima settimana, settimana con verifica o progetto)
                    const isKeyMilestone = kind === "project" || week.number === 1 || week.number === 23;

                    return (
                      <Link
                        key={week.number}
                        href={`/anno/${year}/settimana/${week.number}`}
                        className={`bento-tile group ${isKeyMilestone ? "bento-tile--glow" : ""}`}
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
                          <h3 className="card-title line-clamp-2 mt-2 group-hover:text-[var(--blue)] transition-colors">
                            {week.theme}
                          </h3>

                          {/* Description with comfortable leading */}
                          <p className="card-description line-clamp-2 mt-2">
                            {lesson?.activity || "Attività laboratoriale e missione pratica."}
                          </p>
                        </div>

                        {/* Footer row with chips and animated action cue */}
                        <div className="card-footer-row mt-6">
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
