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

  return (
    <main className="portal-shell">
      <div className="portal-container py-8">
        <Link href="/" className="portal-button-secondary">← Portale del laboratorio</Link>
        <header className="mt-10 max-w-3xl">
          <p className="portal-eyebrow">Percorso {year}° anno · 2 ore a settimana</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Il viaggio digitale</h1>
          <p className="portal-muted mt-5 text-lg leading-8">Una mappa di 33 settimane: ogni tappa alterna spiegazione, laboratorio, gioco e una piccola prova concreta.</p>
        </header>
        <section className="mt-12 space-y-12" aria-label={`Settimane del ${year}° anno`}>
          {modules.map((module) => <div key={module.title}><div className="mb-5 border-b border-[var(--line)] pb-4"><div className="flex items-end justify-between gap-4"><h2 className="text-2xl font-black">{module.title}</h2><span className="portal-muted text-sm">Settimane {module.range[0]}–{module.range[1]}</span></div><p className="portal-muted mt-2 max-w-2xl text-sm leading-6">{module.description}</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{weeks.filter((week) => week.number >= module.range[0] && week.number <= module.range[1]).map((week) => <Link key={week.number} href={`/anno/${year}/settimana/${week.number}`} className="portal-card group p-5 transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"><div className="flex items-center justify-between text-sm font-bold text-[var(--blue)]"><span>Settimana {String(week.number).padStart(2, "0")}</span><span>2h</span></div><h3 className="mt-8 text-xl font-bold group-hover:text-[var(--blue)]">{week.theme}</h3><p className="portal-muted mt-3 text-sm">Apri la scheda e svolgi la missione.</p></Link>)}</div></div>)}
        </section>
      </div>
    </main>
  );
}
