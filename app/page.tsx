import Link from "next/link";

const classes = [
  { number: 1, label: "Prima classe", status: "Disponibile", description: "Fondamenta digitali, hardware, file e prime pratiche sicure.", href: "/anno/1" },
  { number: 2, label: "Seconda classe", status: "Disponibile", description: "Sicurezza, dati, cloud, coding e cittadinanza digitale.", href: "/anno/2" },
  { number: 3, label: "Terza classe", status: "Disponibile", description: "Google Workspace, sistemi informativi, AI Liv. 1 ed Excel avanzato.", href: "/anno/3" },
  { number: 4, label: "Quarta classe", status: "Disponibile", description: "Basi di dati (E-R & SQL), Access, AI Liv. 2 e sviluppo Web HTML5.", href: "/anno/4" },
  { number: 5, label: "Quinta classe", status: "Disponibile", description: "Reti, cybersecurity, AI Liv. 3 (RAG & Safety) e Capstone Esame di Stato.", href: "/anno/5" },
];

export default function Home() {
  return (
    <main className="portal-shell portal-grid">
      <div className="portal-container landing-container py-6 sm:py-8">
        <nav className="portal-header flex items-center justify-between rounded-2xl px-4 py-3" aria-label="Navigazione principale">
          <span className="landing-brand"><span className="landing-brand-mark">↗</span> Laboratorio digitale</span>
          <Link href="/docenti" className="portal-button-secondary">Area docenti</Link>
        </nav>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-copy">
            <p className="portal-eyebrow">Percorso verticale · classi 1–5</p>
            <h1 id="landing-title">
              Imparare facendo,{" "}
              <span className="text-[#AAA2FF]">
                una classe alla volta.
              </span>
            </h1>
            <p className="landing-lede">
              Un laboratorio digitale che cresce con te: basi solide, attività concrete e progetti sempre più autonomi.
            </p>
            <div className="landing-actions">
              <Link href="/anno/1/settimana/1" className="portal-button">
                Inizia dalla prima tappa <span aria-hidden="true">↗</span>
              </Link>
              <a href="#classi" className="landing-text-link">
                Esplora le classi <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-4 text-xs text-[var(--muted)] font-mono">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--surface-soft)] px-2.5 py-1 border border-[var(--line)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--coral)]" />
                66 ore / classe
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--surface-soft)] px-2.5 py-1 border border-[var(--line)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" />
                33 settimane da 120 min
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--surface-soft)] px-2.5 py-1 border border-[var(--line)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3B76E]" />
                Inclusione & supporto DSA
              </span>
            </div>
          </div>
          <aside className="landing-feature" aria-label="Stato del percorso">
            <div className="landing-feature-top">
              <span className="landing-status-dot" /> Percorso completo 1ª–5ª
            </div>
            <p className="portal-eyebrow">Tutte le classi attive</p>
            <h2>Il quinquennio è navigabile.</h2>
            <p>165 settimane di laboratorio guidato tra biennio e triennio (66 ore/anno).</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/anno/1" className="landing-feature-link text-xs hover:underline">1ª (Basi) →</Link>
              <Link href="/anno/2" className="landing-feature-link text-xs hover:underline">2ª (Coding) →</Link>
              <Link href="/anno/3" className="landing-feature-link text-xs hover:underline">3ª (Excel & AI 1) →</Link>
              <Link href="/anno/4" className="landing-feature-link text-xs hover:underline">4ª (DB & AI 2) →</Link>
              <Link href="/anno/5" className="landing-feature-link text-xs hover:underline">5ª (Reti, AI 3 & Esame) →</Link>
            </div>
            <p className="text-xs text-[var(--muted)] pt-2 font-mono">
              Moduli extra & certificazioni: <span className="text-[#F3B76E]">In progettazione</span>
            </p>
          </aside>
        </section>
        <section id="classi" className="landing-roadmap" aria-labelledby="classes-title">
          <div className="landing-section-heading">
            <div>
              <p className="portal-eyebrow">La roadmap</p>
              <h2 id="classes-title">Cinque classi, un unico filo.</h2>
            </div>
            <span className="landing-count">01—05</span>
          </div>
          <div className="class-roadmap">
            {classes.map((item) =>
              item.href ? (
                <Link key={item.number} href={item.href} className="class-card class-card--active">
                  <ClassCardContent item={item} />
                </Link>
              ) : (
                <div key={item.number} className="class-card class-card--planned" aria-label={`${item.label}: ${item.status}`}>
                  <ClassCardContent item={item} />
                </div>
              )
            )}
          </div>
        </section>
        <section className="landing-method" aria-label="Metodo del laboratorio">
          <div>
            <p className="portal-eyebrow">Il metodo</p>
            <h2>Conoscere → provare → lasciare una traccia.</h2>
          </div>
          <div>
            <p className="mb-4">
              Ogni settimana alterna spiegazione, laboratorio, verifica leggera e un prodotto da conservare nel portfolio.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
                <span className="font-mono text-[var(--blue)] font-bold">01 · Sfida reale</span>
                <p className="mt-1 text-[var(--muted)]">Partenza dall'azione e problemi pratici a computer prima delle definizioni astratte.</p>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
                <span className="font-mono text-[var(--coral)] font-bold">02 · Laboratorio 120'</span>
                <p className="mt-1 text-[var(--muted)]">Fasi temporizzate, consegne guidate e varianti facilitate per studenti con DSA.</p>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
                <span className="font-mono text-[#F3B76E] font-bold">03 · Traccia e portfolio</span>
                <p className="mt-1 text-[var(--muted)]">Ogni settimana produce un file verificabile, una risposta o un codice archiviato.</p>
              </div>
            </div>
          </div>
        </section>
        <footer className="mt-12 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div>
            Laboratorio Digitale · Informatica Istituti Tecnici Economici & Tecnologici (2026/2027)
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/anno/1" className="hover:text-[var(--ink)]">1ª</Link>
            <Link href="/anno/2" className="hover:text-[var(--ink)]">2ª</Link>
            <Link href="/anno/3" className="hover:text-[var(--ink)]">3ª</Link>
            <Link href="/anno/4" className="hover:text-[var(--ink)]">4ª</Link>
            <Link href="/anno/5" className="hover:text-[var(--ink)]">5ª</Link>
            <Link href="/docenti" className="hover:text-[var(--ink)]">Area Docenti</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

function ClassCardContent({ item }: { item: (typeof classes)[number] }) {
  return (
    <>
      <div className="class-card-head">
        <span className="class-number">0{item.number}</span>
        <span className={`class-status ${item.href ? "class-status--live" : ""}`}>{item.status}</span>
      </div>
      <h3>{item.label}</h3>
      <p>{item.description}</p>
      <span className="class-card-arrow" aria-hidden="true">{item.href ? "↗" : "＋"}</span>
    </>
  );
}
