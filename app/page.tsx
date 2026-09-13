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
    <main className="portal-shell">
      <div className="portal-container landing-container py-6 sm:py-10">
        {/* TOP BAR BRAND */}
        <nav className="portal-header flex items-center justify-between rounded-2xl px-5 py-3.5 mb-8 sm:mb-12" aria-label="Navigazione principale">
          <div className="flex items-center gap-3">
            <span className="landing-brand-mark">↗</span>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-tight text-[var(--ink)]">Laboratorio Digitale</span>
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">Informatica Biennio & Triennio</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="bento-badge-live">
                <span className="pulse-dot" />
                <span>Live 2026/27</span>
              </span>
            </div>
            <Link href="/docenti" className="portal-button-secondary text-xs sm:text-sm py-2 px-4 min-h-[38px]">
              Area Docenti
            </Link>
          </div>
        </nav>

        {/* HERO SECTION IN BENTO GRID */}
        <section aria-label="Panoramica del laboratorio" className="mb-14 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* TESSERA 1: HERO PRINCIPALE (Span 2 col su MD, Span 2 col su LG) */}
            <div className="bento-tile bento-tile--glow md:col-span-2 lg:col-span-2 p-7 sm:p-9">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className="portal-eyebrow">Percorso Quinquennale · Classi 1–5</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    100% Attivo
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--ink)] leading-[1.08]">
                  Imparare facendo,{" "}
                  <span className="text-[#AAA2FF]">
                    una classe alla volta.
                  </span>
                </h1>

                <p className="portal-muted mt-4 text-base sm:text-lg leading-relaxed max-w-[55ch]">
                  Un laboratorio digitale progressivo: dalle basi dell&apos;hardware e sicurezza, al coding, 
                  database, cloud, fino a reti e AI avanzata con verifiche e gamification integrate.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[rgba(109,101,163,0.2)] flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href="/anno/1/settimana/1" className="portal-button">
                  <span>Inizia dalla 1ª Tappa</span>
                  <span aria-hidden="true" className="font-mono text-xs opacity-80">↗</span>
                </Link>
                <Link href="/anno/1/lezione-0" className="portal-button-secondary">
                  <span>Tappa 00 (Accoglienza)</span>
                </Link>
              </div>
            </div>

            {/* TESSERA 2: METRICA LABORATORIO (1 Col) */}
            <div className="bento-tile md:col-span-1 lg:col-span-1 p-6 sm:p-7">
              <div className="card-header-row">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--blue)]">
                  Volume Orario
                </span>
                <span className="text-xl">⏱️</span>
              </div>
              <div className="my-auto py-3">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--ink)] font-mono">
                  66<span className="text-2xl text-[var(--blue)]">h</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[var(--ink)] mt-1">
                  Laboratorio pratico annuo
                </p>
                <p className="portal-muted text-xs leading-relaxed mt-2">
                  33 settimane a ritmo costante: ogni settimana prevede 120 min di sperimentazione a terminale.
                </p>
              </div>
              <div className="pt-3 border-t border-[rgba(109,101,163,0.2)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span>33 Settimane</span>
                <span className="text-[var(--coral)] font-bold">120 min/sett</span>
              </div>
            </div>

            {/* TESSERA 3: INCLUSIONE & SUPPORTO DSA (1 Col) */}
            <div className="bento-tile bento-tile--coral-glow md:col-span-1 lg:col-span-1 p-6 sm:p-7">
              <div className="card-header-row">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--coral)]">
                  Accessibilità & BES
                </span>
                <span className="text-xl">🎯</span>
              </div>
              <div className="my-auto py-3">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--coral)]">
                  Inclusione Nativa
                </div>
                <p className="portal-muted text-xs leading-relaxed mt-2">
                  Varianti facilitate per studenti DSA, schede A5 stampabili senza schermi, e supporto sintesi vocale e quiz simbolici.
                </p>
              </div>
              <div className="pt-3 border-t border-[rgba(109,101,163,0.2)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--muted)]">Linee Guida</span>
                <span className="text-emerald-300 font-bold">WCAG AA</span>
              </div>
            </div>

            {/* TESSERA 4: METODO DIDATTICO IN 3 TAPPE (Span 2 col su MD, Span 2 col su LG) */}
            <div className="bento-tile md:col-span-2 lg:col-span-2 p-6 sm:p-7">
              <div className="card-header-row mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F3B76E]">
                  Metodo di Apprendimento
                </span>
                <span className="text-xs font-mono text-[var(--muted)]">Ciclo Operativo</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)] mb-4">
                Conoscere → Provare → Lasciare una traccia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-3">
                  <span className="font-mono text-xs text-[var(--blue)] font-bold">01 · Sfida reale</span>
                  <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                    Azione a PC prima delle definizioni teoriche.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-3">
                  <span className="font-mono text-xs text-[var(--coral)] font-bold">02 · Laboratorio</span>
                  <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                    Fasi temporizzate ed esercizi guidati passo-passo.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-3">
                  <span className="font-mono text-xs text-[#F3B76E] font-bold">03 · Portfolio</span>
                  <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                    Un file o codice verificato da conservare.
                  </p>
                </div>
              </div>
            </div>

            {/* TESSERA 5: IL QUINQUENNIO AL COMPLETO (Span 2 col) */}
            <div className="bento-tile md:col-span-3 lg:col-span-2 p-6 sm:p-7">
              <div className="card-header-row mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--blue)]">
                  Architettura Didattica
                </span>
                <span className="bento-badge-live">5 Classi Pronte</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)]">
                165 Settimane di Laboratorio
              </h3>
              <p className="portal-muted text-xs sm:text-sm mt-1 mb-4 leading-relaxed">
                Dal biennio comune alle specializzazioni del triennio: esplora direttamente ciascun programma annuale.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/anno/1" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-xs font-mono text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors">
                  1ª Basi →
                </Link>
                <Link href="/anno/2" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-xs font-mono text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors">
                  2ª Coding →
                </Link>
                <Link href="/anno/3" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-xs font-mono text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors">
                  3ª Excel & AI 1 →
                </Link>
                <Link href="/anno/4" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-xs font-mono text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors">
                  4ª DB & Web →
                </Link>
                <Link href="/anno/5" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-xs font-mono text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors">
                  5ª Reti & Esame →
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ROADMAP CLASSI BENTO GRID */}
        <section id="classi" className="border-t border-[var(--line)] pt-12 sm:pt-16 pb-16" aria-labelledby="classes-title">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="portal-eyebrow">La Roadmap Curricolare</p>
              <h2 id="classes-title" className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--ink)] mt-1">
                Cinque classi, un unico filo.
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
              Tappe 01 — 165
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {classes.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="bento-tile group p-6 min-h-[260px]"
              >
                <div>
                  <div className="card-header-row">
                    <span className="font-mono text-sm font-black text-[var(--blue)]">
                      0{item.number}
                    </span>
                    <span className="bento-badge-live">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors mt-3">
                    {item.label}
                  </h3>

                  <p className="card-description text-xs line-clamp-3 mt-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(109,101,163,0.2)] flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-mono text-[11px]">33 sett. · 66h</span>
                  <span className="font-bold text-sm text-[var(--blue)] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div>
            Laboratorio Digitale · Informatica Istituti Tecnici Economici & Tecnologici (2026/2027)
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Link href="/anno/1" className="hover:text-[var(--ink)] transition-colors">1ª</Link>
            <Link href="/anno/2" className="hover:text-[var(--ink)] transition-colors">2ª</Link>
            <Link href="/anno/3" className="hover:text-[var(--ink)] transition-colors">3ª</Link>
            <Link href="/anno/4" className="hover:text-[var(--ink)] transition-colors">4ª</Link>
            <Link href="/anno/5" className="hover:text-[var(--ink)] transition-colors">5ª</Link>
            <Link href="/docenti" className="hover:text-[var(--ink)] transition-colors">Area Docenti</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
