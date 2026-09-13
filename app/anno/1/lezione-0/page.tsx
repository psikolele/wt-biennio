"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface PartnerData {
  name: string;
  common: string;
  difference: string;
}

export default function LezioneZeroPage() {
  const [activeTab, setActiveTab] = useState<"card" | "teacher">("card");

  // Form State
  const [studentName, setStudentName] = useState("");
  const [studentCity, setStudentCity] = useState("");
  const [selectedTransport, setSelectedTransport] = useState<string[]>([]);
  const [commuteTime, setCommuteTime] = useState<string>("");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [typingProficiency, setTypingProficiency] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [partner, setPartner] = useState<PartnerData>({ name: "", common: "", difference: "" });

  // Canvas for doodle/avatar box
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const toggleSelection = (item: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#AAA2FF";
  }, [activeTab]);

  return (
    <main className="portal-shell print:bg-white print:text-black print:p-0">
      {/* SCREEN INTERFACE */}
      <div className="portal-container max-w-4xl py-10 sm:py-14 print:hidden">
        {/* TOP BAR / NAVIGATION */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/anno/1" className="portal-button-secondary">
            <span aria-hidden="true">←</span> Indice 1° Anno
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="portal-button"
            >
              <span>Stampa Scheda A5</span>
              <span aria-hidden="true" className="font-mono text-xs opacity-75">↗</span>
            </button>
            <a
              href="/downloads/scheda_identita_1N.pdf"
              download="scheda_identita_1N.pdf"
              className="portal-button-secondary"
            >
              <span>Scarica PDF (A5)</span>
            </a>
          </div>
        </div>

        {/* HERO / TYPOGRAPHIC HEADER */}
        <header className="mt-10 mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.14em] text-blue uppercase">
              Lezione 0 · Accoglienza & Laboratorio
            </span>
            <span className="text-[var(--line-strong)]" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Inclusione BES / DSA
            </span>
            <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-xs font-mono font-semibold portal-muted">
              60 min · Schermi spenti
            </span>
            <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-xs font-mono font-semibold text-coral">
              Zero voti
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-ink leading-[1.08]">
            Carta d&apos;Identità Digitale & Mappa della Classe
          </h1>
          <p className="portal-muted mt-4 text-base sm:text-lg leading-relaxed max-w-[65ch]">
            Sessione d&apos;ingresso preliminare a monitor spenti. Conoscenza reciproca a coppie di banco protette, 
            rilevazione delle provenienze dei pendolari e check-up delle abitudini informatiche.
          </p>

          {/* SEGMENTED CONTROL TABS */}
          <div className="mt-8 inline-flex p-1 rounded-full border border-[var(--line)] bg-[var(--surface-soft)]">
            <button
              type="button"
              onClick={() => setActiveTab("card")}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
                activeTab === "card"
                  ? "bg-[#AAA2FF] text-[#100E1F] shadow-sm"
                  : "portal-muted hover:text-ink"
              }`}
            >
              Scheda di Laboratorio
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("teacher")}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
                activeTab === "teacher"
                  ? "bg-[#AAA2FF] text-[#100E1F] shadow-sm"
                  : "portal-muted hover:text-ink"
              }`}
            >
              Guida Docente & Scaletta (60 min)
            </button>
          </div>
        </header>

        {/* TAB 1: STUDENT INTERACTIVE SHEET - BENTO CANVAS */}
        {activeTab === "card" && (
          <div className="space-y-6">
            {/* BENTO ROW 1: ANAGRAFICA & TERRITORIO (2 Col) + DOODLE/AVATAR BOX (1 Col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* TESSERA 1: IDENTITÀ & PROVENIENZA (Span 2 col) */}
              <section className="bento-tile lg:col-span-2 p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-6">
                    <div>
                      <span className="font-mono text-xs font-bold tracking-wider text-blue uppercase">
                        Sezione 01 · Territorio & Pendolarismo
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
                        Chi sono & Da dove parto
                      </h2>
                    </div>
                    <span className="font-mono text-xs portal-muted bg-[var(--surface-soft)] px-3 py-1 rounded-full border border-[var(--line)]">
                      Anagrafica
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="student-name" className="block text-xs font-bold uppercase tracking-wider portal-muted">
                        Nome & Cognome (o soprannome preferito)
                      </label>
                      <input
                        id="student-name"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Es. Marco Rossi"
                        className="portal-input w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="student-city" className="block text-xs font-bold uppercase tracking-wider portal-muted">
                        Comune o Frazione di Residenza
                      </label>
                      <input
                        id="student-city"
                        type="text"
                        value={studentCity}
                        onChange={(e) => setStudentCity(e.target.value)}
                        placeholder="Es. Appiano Gentile, Mozzate, Guanzate..."
                        className="portal-input w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* COMMUTE */}
                  <div className="mt-5 pt-5 border-t border-[var(--line)]">
                    <label className="block text-xs font-bold uppercase tracking-wider portal-muted mb-2.5">
                      Mezzo di trasporto per raggiungere la scuola (scelta multipla)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: "piedi", label: "A piedi" },
                        { id: "bus", label: "Bus / Corriera" },
                        { id: "treno", label: "Treno" },
                        { id: "auto", label: "Auto / Passaggio" },
                        { id: "bici", label: "Bici / Monopattino" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleSelection(item.label, selectedTransport, setSelectedTransport)}
                          className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                            selectedTransport.includes(item.label)
                              ? "border-[var(--blue)] bg-[#AAA2FF]/20 text-ink font-bold shadow-sm"
                              : "border-[var(--line)] bg-[var(--surface-soft)] portal-muted hover:border-[var(--line-strong)] hover:text-ink"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold portal-muted mr-1">Tempo di viaggio:</span>
                      {[
                        "Meno di 15 min",
                        "15–30 min",
                        "Più di 30 min (Pendolare)",
                      ].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setCommuteTime(time)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            commuteTime === time
                              ? "border-[var(--coral)] bg-[rgba(114,227,163,0.15)] text-coral font-bold"
                              : "border-[var(--line)] bg-[var(--surface-soft)] portal-muted hover:text-ink"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* TESSERA 2: DOODLE / AVATAR BOX INTERATTIVO (Span 1 col) */}
              <section className="bento-tile bento-tile--glow p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4">
                    <span className="font-mono text-xs font-bold tracking-wider text-blue uppercase">
                      Avatar Doodle
                    </span>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="portal-button-secondary text-[11px] py-1 px-2.5 min-h-0"
                    >
                      Pulisci
                    </button>
                  </div>
                  <p className="portal-muted text-xs leading-relaxed mb-3">
                    Disegna il tuo avatar o la tua firma digitale a mano libera.
                  </p>
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={320}
                      height={180}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-40 rounded-xl border border-[var(--line-strong)] bg-[#0C0D14] cursor-crosshair touch-none"
                    />
                    {!hasDrawn && (
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-[var(--muted)] opacity-60 font-mono">
                        Disegna qui
                      </span>
                    )}
                  </div>
                </div>
                <span className="portal-muted text-[11px] font-mono mt-3 text-center">
                  Spazio antistress a monitor spenti
                </span>
              </section>

            </div>

            {/* BENTO ROW 2: DISPOSITIVI E TASTIERA (2 Col) + INTERESSI (1 Col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* TESSERA 3: HARDWARE & DIGITAZIONE (Span 2 col) */}
              <section className="bento-tile lg:col-span-2 p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-6">
                    <div>
                      <span className="font-mono text-xs font-bold tracking-wider text-blue uppercase">
                        Sezione 02 · Dispositivi & Tastiera
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
                        Ecosistema Hardware & Digitazione
                      </h2>
                    </div>
                    <span className="font-mono text-xs portal-muted bg-[var(--surface-soft)] px-3 py-1 rounded-full border border-[var(--line)]">
                      Abitudini
                    </span>
                  </div>

                  {/* DEVICES */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider portal-muted mb-2.5">
                      Quali dispositivi usi a casa?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: "smartphone", title: "Smartphone", subtitle: "Personale" },
                        { id: "laptop", title: "PC Portatile", subtitle: "Studio o famiglia" },
                        { id: "desktop", title: "PC Fisso", subtitle: "Con monitor e mouse" },
                        { id: "console", title: "Console / Tablet", subtitle: "Gaming o touch" },
                      ].map((dev) => (
                        <button
                          key={dev.id}
                          type="button"
                          onClick={() => toggleSelection(dev.title, selectedDevices, setSelectedDevices)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            selectedDevices.includes(dev.title)
                              ? "border-[var(--blue)] bg-[#AAA2FF]/20 text-ink shadow-sm"
                              : "border-[var(--line)] bg-[var(--surface-soft)] portal-muted hover:border-[var(--line-strong)] hover:text-ink"
                          }`}
                        >
                          <div className="font-bold text-xs text-ink">{dev.title}</div>
                          <div className="text-[10px] portal-muted mt-0.5">{dev.subtitle}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TYPING */}
                  <div className="mt-6 pt-5 border-t border-[var(--line)]">
                    <label className="block text-xs font-bold uppercase tracking-wider portal-muted mb-2.5">
                      Come scrivi sulla tastiera fisica del computer?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: "2dita", title: "A 2 dita", desc: "Cercando i tasti con gli occhi" },
                        { id: "4dita", title: "A 4–6 dita", desc: "Fluido, guardando a tratti" },
                        { id: "10dita", title: "A 10 dita", desc: "Digitazione fluida a schermo" },
                      ].map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setTypingProficiency(style.id)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            typingProficiency === style.id
                              ? "border-[var(--coral)] bg-[rgba(114,227,163,0.15)] text-ink shadow-sm"
                              : "border-[var(--line)] bg-[var(--surface-soft)] portal-muted hover:border-[var(--line-strong)] hover:text-ink"
                          }`}
                        >
                          <div className="font-bold text-xs text-ink">{style.title}</div>
                          <div className="text-[11px] portal-muted mt-1 leading-tight">{style.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* TESSERA 4: INTERESSI & CURIOSITÀ (Span 1 col) */}
              <section className="bento-tile p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4">
                    <span className="font-mono text-xs font-bold tracking-wider text-[#F3B76E] uppercase">
                      Curiosità Digitali
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">Interessi</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Videogiochi & Modding",
                      "Musica & Playlist",
                      "Video Editing",
                      "Grafica & Disegno",
                      "Programmazione / Coding",
                      "Cybersecurity & Reti",
                    ].map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleSelection(interest, selectedInterests, setSelectedInterests)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          selectedInterests.includes(interest)
                            ? "border-[var(--blue)] bg-[#AAA2FF]/20 text-ink font-semibold shadow-sm"
                            : "border-[var(--line)] bg-[var(--surface-soft)] portal-muted hover:border-[var(--line-strong)] hover:text-ink"
                        }`}
                      >
                        <div className="text-xs font-bold">{interest}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <span className="portal-muted text-[11px] font-mono mt-4">
                  Traccia per i progetti di laboratorio
                </span>
              </section>

            </div>

            {/* BENTO ROW 3: MISSIONE A COPPIE (BENTO TILE EROE COMPLETO A 3 COLONNE) */}
            <section className="bento-tile bento-tile--coral-glow p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs font-bold tracking-wider text-coral uppercase">
                    Sezione 03 · Socializzazione Protetta (Minuti 22–42)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
                    Missione a Coppie: Il mio compagno di banco
                  </h2>
                </div>
                <span className="bento-badge-live">
                  <span className="pulse-dot" />
                  <span>Conoscenza Protetta</span>
                </span>
              </div>

              <p className="portal-muted text-sm leading-relaxed max-w-[65ch] mb-6">
                Scambiatevi la scheda o chiacchierate a voce per 3 minuti. L&apos;obiettivo non è fare un&apos;intervista formale, 
                ma scoprire un punto di contatto e una differenza interessante senza ansia di esporsi davanti a tutta la classe.
              </p>

              <div className="space-y-4">
                <div className="space-y-1.5 max-w-md">
                  <label htmlFor="partner-name" className="block text-xs font-bold uppercase tracking-wider portal-muted">
                    Nome del compagno di banco intervistato
                  </label>
                  <input
                    id="partner-name"
                    type="text"
                    value={partner.name}
                    onChange={(e) => setPartner({ ...partner, name: e.target.value })}
                    placeholder="Es. Sara, Luca, Matteo..."
                    className="portal-input w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label htmlFor="partner-common" className="block text-xs font-bold uppercase tracking-wider text-blue">
                      Una cosa che abbiamo in comune
                    </label>
                    <textarea
                      id="partner-common"
                      rows={2}
                      value={partner.common}
                      onChange={(e) => setPartner({ ...partner, common: e.target.value })}
                      placeholder="Es. Stesso bus, ci piacciono gli stessi giochi, entrambi usiamo laptop..."
                      className="portal-input w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="partner-diff" className="block text-xs font-bold uppercase tracking-wider text-coral">
                      Una differenza interessante tra di noi
                    </label>
                    <textarea
                      id="partner-diff"
                      rows={2}
                      value={partner.difference}
                      onChange={(e) => setPartner({ ...partner, difference: e.target.value })}
                      placeholder="Es. Uno usa solo lo smartphone e l'altro ha assemblato un PC..."
                      className="portal-input w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* FOOTER ACTIONS */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--line)]">
              <span className="portal-muted text-xs font-mono">
                Laboratorio di Informatica · Tappa 00 Accoglienza & Diagnostica
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="portal-button"
                >
                  Stampa Scheda A5 (Fronte/Retro)
                </button>
                <a
                  href="/downloads/scheda_identita_1N.pdf"
                  download="scheda_identita_1N.pdf"
                  className="portal-button-secondary"
                >
                  Scarica PDF Ufficiale
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TEACHER GUIDE & TIMELINE */}
        {activeTab === "teacher" && (
          <div className="space-y-8">
            {/* TIMELINE SECTION */}
            <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-5 mb-6">
                <div>
                  <span className="font-mono text-xs font-bold tracking-wider text-coral uppercase">
                    Guida Didattica · Lab 1 APP
                  </span>
                  <h2 className="text-2xl font-black text-ink mt-1">
                    Scaletta Oraria dei 60 Minuti
                  </h2>
                </div>
                <span className="font-mono text-xs portal-muted bg-[var(--surface-soft)] px-3 py-1 rounded-full border border-[var(--line)]">
                  Sessione Schermi Spenti
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    time: "00 – 10 min",
                    phase: "Fase 1",
                    title: "Accoglienza & Patto d'Aula a Schermi Spenti",
                    desc: "Ingresso ordinato in laboratorio. Monitor spenti per azzerare stimoli distrattori. Presentazione congiunta dei docenti di cattedra e di sostegno. Condivisione rilassata del Patto d'Aula.",
                    badge: "Hook Iniziale",
                    badgeColor: "border-[var(--blue)]/30 bg-[#AAA2FF]/10 text-[#AAA2FF]",
                  },
                  {
                    time: "10 – 22 min",
                    phase: "Fase 2",
                    title: "Compilazione della Scheda d'Ingresso A5",
                    desc: "Distribuzione delle schede cartacee con musica strumentale a volume minimo di sottofondo. Compilazione a crocette e spazio doodle antistress. Supporto discreto e non invasivo del sostegno.",
                    badge: "Autonomia Protetta",
                    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
                  },
                  {
                    time: "22 – 42 min",
                    phase: "Fase 3",
                    title: "Icebreaker a Coppie: Il mio compagno di banco",
                    desc: "Scambio delle schede con il vicino di banco per 3 minuti. Missione di coppia: individuare 1 cosa in comune e 1 differenza. Giro morbido: 4-5 coppie volontarie condividono 2 curiosità restando sedute al banco.",
                    badge: "Socializzazione Protetta",
                    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-300",
                  },
                  {
                    time: "42 – 52 min",
                    phase: "Fase 4",
                    title: "Mappa della Classe alla Lavagna",
                    desc: "Il docente disegna alla lavagna la bussola delle provenienze territoriali. Alzata di mano per mezzi di trasporto, pendolarismo e dispositivi a casa. Restituzione rassicurante delle abitudini digitali.",
                    badge: "Dati Collettivi",
                    badgeColor: "border-[var(--blue)]/30 bg-[#AAA2FF]/10 text-[#AAA2FF]",
                  },
                  {
                    time: "52 – 60 min",
                    phase: "Fase 5",
                    title: "Ritiro Schede & Anticipazione Settimana 1",
                    desc: "Ritiro delle schede compilate (fascicolo diagnostico d'ingresso per il PTOF). Anticipazione: assegnazione postazioni PC fisse, credenziali scolastiche ed esplorazione dei componenti fisici del computer.",
                    badge: "Debriefing & Chiusura",
                    badgeColor: "border-[var(--line)] bg-[var(--surface-soft)] portal-muted",
                  },
                ].map((step) => (
                  <div
                    key={step.time}
                    className="p-5 rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.48)] flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="shrink-0 font-mono text-xs font-bold text-coral bg-[var(--paper)] px-3 py-1.5 rounded-lg border border-[var(--line)]">
                      {step.time}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs portal-muted uppercase">{step.phase}</span>
                        <span className="text-[var(--line-strong)]" aria-hidden="true">·</span>
                        <h3 className="text-base font-bold text-ink">{step.title}</h3>
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${step.badgeColor}`}>
                          {step.badge}
                        </span>
                      </div>
                      <p className="portal-muted text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CLASSROOM PACT SECTION */}
            <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="border-b border-[var(--line)] pb-5 mb-6">
                <span className="font-mono text-xs font-bold tracking-wider text-blue uppercase">
                  Regolamento Didattico Condiviso
                </span>
                <h2 className="text-2xl font-black text-ink mt-1">
                  Il Patto d&apos;Aula: Le 8 Regole d&apos;Oro del Laboratorio
                </h2>
                <p className="portal-muted mt-2 text-sm leading-relaxed max-w-[65ch]">
                  Da condividere a voce con tono costruttivo e positivo nei primi 10 minuti di accoglienza.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    n: "01",
                    title: "Cura della Postazione",
                    desc: "Ogni studente è custode del computer, del mouse, della tastiera e della sedia a lui assegnati.",
                  },
                  {
                    n: "02",
                    title: "Nessun Cibo né Bevande",
                    desc: "Borracce e spuntini rimangono chiusi negli zaini per salvaguardare le apparecchiature elettriche.",
                  },
                  {
                    n: "03",
                    title: "Cavi & Prese al Sicuro",
                    desc: "Non toccare spine o cavi posteriori. In caso di anomalia si alza la mano per chiamare i docenti.",
                  },
                  {
                    n: "04",
                    title: "Mani Staccate quando si Spiega",
                    desc: "Quando i docenti introducono un concetto, lo sguardo va alla cattedra e le mani lasciano mouse e tasti.",
                  },
                  {
                    n: "05",
                    title: "Sbagliare è Parte del Metodo",
                    desc: "In laboratorio l'errore non è una colpa: è il primo passo naturale per capire la logica della macchina.",
                  },
                  {
                    n: "06",
                    title: "Aiuto Reciproco (Peer Tutoring)",
                    desc: "Chi finisce prima diventa tutor del vicino spiegando a parole, senza toccare la sua tastiera.",
                  },
                  {
                    n: "07",
                    title: "Navigazione Consapevole",
                    desc: "Si utilizzano esclusivamente i portali, i simulatori e gli ambienti software previsti per l'attività in corso.",
                  },
                  {
                    n: "08",
                    title: "Rilascio Ordinato",
                    desc: "Al suono della campana si chiudono le sessioni di lavoro, si riallinea la tastiera e si accosta la sedia.",
                  },
                ].map((rule) => (
                  <div
                    key={rule.n}
                    className="p-4 rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.48)] flex items-start gap-3.5"
                  >
                    <span className="font-mono text-sm font-black text-blue bg-[var(--paper)] px-2.5 py-1 rounded-lg border border-[var(--line)] shrink-0">
                      {rule.n}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{rule.title}</h3>
                      <p className="portal-muted text-xs mt-1 leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INCLUSION SECTION */}
            <section className="rounded-2xl border border-emerald-500/30 bg-[rgba(21,47,40,0.2)] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                  Linee Guida di Inclusione BES / DSA
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-ink">
                Accoglienza Protetta & Riduzione dell&apos;Ansia
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-ink leading-relaxed">
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-[var(--paper)]">
                  <h3 className="font-bold text-emerald-300 mb-1">Zero Esposizione Orale Forzata</h3>
                  <p className="portal-muted">
                    Nessun alunno con fragilità emotiva o certificazione viene chiamato alla lavagna o costretto a parlare in piedi.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-[var(--paper)]">
                  <h3 className="font-bold text-emerald-300 mb-1">Scelte Chiuse & Micro-Task</h3>
                  <p className="portal-muted">
                    La scheda d&apos;ingresso privilegia caselle e scelte chiuse, evitando lo sforzo grafo-motorio della scrittura manuale.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-[var(--paper)]">
                  <h3 className="font-bold text-emerald-300 mb-1">Spazio Avatar Antistress</h3>
                  <p className="portal-muted">
                    Il riquadro doodle offre una valvola di sfogo visivo per gli allievi che canalizzano l&apos;ansia attraverso il disegno.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* PRINT-ONLY VIEW: EXACT 2-UP A5 ON A4 LANDSCAPE */}
      <div className="hidden print:block text-black bg-white p-2">
        <style dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4 landscape;
              margin: 6mm 8mm;
            }
            @media print {
              html, body, .portal-shell {
                background: #FFFFFF !important;
                color: #000000 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
              }
            }
          `
        }} />

        <div className="grid grid-cols-[1fr_18px_1fr] h-[190mm]">
          {/* CARD 1 (LEFT A5) */}
          <div className="border border-black p-3.5 flex flex-col justify-between text-[7.5pt] leading-tight">
            <div>
              <div className="flex justify-between items-end border-b-2 border-black pb-1.5 mb-2">
                <div>
                  <h1 className="text-[9pt] font-black uppercase tracking-tight">Carta d&apos;Identità Digitale</h1>
                  <p className="text-[6.5pt] font-semibold text-slate-700">Laboratorio di Informatica • 1ª Classe • Lezione 0</p>
                </div>
                <div className="text-right text-[6pt] font-mono font-bold">
                  <div>Lab 1 APP</div>
                  <div>Schermi spenti</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border border-slate-400 p-1 rounded">
                  <span className="font-bold block text-[6.5pt]">Nome & Cognome (o Soprannome):</span>
                  <div className="h-3.5 border-b border-dotted border-slate-400 mt-1" />
                </div>
                <div className="border border-slate-400 p-1 rounded">
                  <span className="font-bold block text-[6.5pt]">Comune di Residenza:</span>
                  <div className="h-3.5 border-b border-dotted border-slate-400 mt-1" />
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Come arrivi a scuola?</span>
                <div className="grid grid-cols-5 gap-1 text-[6.5pt]">
                  <span>[ ] A piedi</span>
                  <span>[ ] Bus</span>
                  <span>[ ] Treno</span>
                  <span>[ ] Auto</span>
                  <span>[ ] Bici</span>
                </div>
                <div className="mt-1 pt-1 border-t border-slate-300 flex gap-4 text-[6.5pt]">
                  <span>Tempo: [ ] &lt;15 min</span>
                  <span>[ ] 15–30 min</span>
                  <span>[ ] &gt;30 min</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Dispositivi utilizzati a casa:</span>
                <div className="grid grid-cols-2 gap-1 text-[6.5pt]">
                  <span>[ ] Smartphone personale</span>
                  <span>[ ] PC Portatile</span>
                  <span>[ ] PC Fisso con mouse</span>
                  <span>[ ] Tablet / Console</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Come scrivi sulla tastiera fisica?</span>
                <div className="grid grid-cols-3 gap-1 text-[6pt]">
                  <span>[ ] A 2 dita (cerco i tasti)</span>
                  <span>[ ] A 4–6 dita (me la cavo)</span>
                  <span>[ ] A 10 dita (veloce)</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Cosa ti piace fare al computer?</span>
                <div className="grid grid-cols-3 gap-1 text-[6pt]">
                  <span>[ ] Gaming / Modding</span>
                  <span>[ ] Musica / Playlist</span>
                  <span>[ ] Video editing</span>
                  <span>[ ] Grafica / Disegno</span>
                  <span>[ ] Coding / Programmi</span>
                  <span>[ ] Hardware / Reti</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1.5 rounded">
                <span className="font-bold block text-[6.5pt] mb-1">Missione a coppie: Il mio compagno di banco</span>
                <div className="text-[6.5pt] space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Nome compagno:</span>
                    <div className="flex-grow border-b border-dotted border-slate-400 h-3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Una cosa in comune:</span>
                    <div className="flex-grow border-b border-dotted border-slate-400 h-3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Una differenza:</span>
                    <div className="flex-grow border-b border-dotted border-slate-400 h-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-400 pt-1 text-center text-[5.5pt] text-slate-600 font-mono">
              Diagnostica d&apos;Ingresso • Zero voti • Scheda di laboratorio da conservare nel fascicolo docente
            </div>
          </div>

          {/* CUTTER DIVIDER */}
          <div className="flex flex-col items-center justify-between border-l border-dashed border-slate-400 my-2 text-[7pt] text-slate-500 select-none">
            <span>✂</span>
            <span className="[writing-mode:vertical-rl] tracking-widest text-[6pt] uppercase font-mono">
              Taglio foglio A5
            </span>
            <span>✂</span>
          </div>

          {/* CARD 2 (RIGHT A5) */}
          <div className="border border-black p-3.5 flex flex-col justify-between text-[7.5pt] leading-tight">
            <div>
              <div className="flex justify-between items-end border-b-2 border-black pb-1.5 mb-2">
                <div>
                  <h1 className="text-[9pt] font-black uppercase tracking-tight">Carta d&apos;Identità Digitale</h1>
                  <p className="text-[6.5pt] font-semibold text-slate-700">Laboratorio di Informatica • 1ª Classe • Lezione 0</p>
                </div>
                <div className="text-right text-[6pt] font-mono font-bold">
                  <div>Lab 1 APP</div>
                  <div>Schermi spenti</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border border-slate-400 p-1 rounded">
                  <span className="font-bold block text-[6.5pt]">Nome & Cognome (o Soprannome):</span>
                  <div className="h-3.5 border-b border-dotted border-slate-400 mt-1" />
                </div>
                <div className="border border-slate-400 p-1 rounded">
                  <span className="font-bold block text-[6.5pt]">Comune di Residenza:</span>
                  <div className="h-3.5 border-b border-dotted border-slate-400 mt-1" />
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Come arrivi a scuola?</span>
                <div className="grid grid-cols-5 gap-1 text-[6.5pt]">
                  <span>[ ] A piedi</span>
                  <span>[ ] Bus</span>
                  <span>[ ] Treno</span>
                  <span>[ ] Auto</span>
                  <span>[ ] Bici</span>
                </div>
                <div className="mt-1 pt-1 border-t border-slate-300 flex gap-4 text-[6.5pt]">
                  <span>Tempo: [ ] &lt;15 min</span>
                  <span>[ ] 15–30 min</span>
                  <span>[ ] &gt;30 min</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Dispositivi utilizzati a casa:</span>
                <div className="grid grid-cols-2 gap-1 text-[6.5pt]">
                  <span>[ ] Smartphone personale</span>
                  <span>[ ] PC Portatile</span>
                  <span>[ ] PC Fisso con mouse</span>
                  <span>[ ] Tablet / Console</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Come scrivi sulla tastiera fisica?</span>
                <div className="grid grid-cols-3 gap-1 text-[6pt]">
                  <span>[ ] A 2 dita (cerco i tasti)</span>
                  <span>[ ] A 4–6 dita (me la cavo)</span>
                  <span>[ ] A 10 dita (veloce)</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1 rounded mb-2">
                <span className="font-bold block text-[6.5pt] mb-1">Cosa ti piace fare al computer?</span>
                <div className="grid grid-cols-3 gap-1 text-[6pt]">
                  <span>[ ] Gaming / Modding</span>
                  <span>[ ] Musica / Playlist</span>
                  <span>[ ] Video editing</span>
                  <span>[ ] Grafica / Disegno</span>
                  <span>[ ] Coding / Programmi</span>
                  <span>[ ] Hardware / Reti</span>
                </div>
              </div>

              <div className="border border-slate-400 p-1.5 rounded">
                <span className="font-bold block text-[6.5pt] mb-1">Missione a coppie: Il mio compagno di banco</span>
                <div className="text-[6.5pt] space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Nome compagno:</span>
                    <div className="flex-grow border-b border-dotted border-slate-400 h-3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Una cosa in comune:</span>
                    <div className="flex-grow border-b border-dotted border-slate-400 h-3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Una differenza:</span>
                    <div className="flex-grow border-b border-dotted border-slate-400 h-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-400 pt-1 text-center text-[5.5pt] text-slate-600 font-mono">
              Diagnostica d&apos;Ingresso • Zero voti • Scheda di laboratorio da conservare nel fascicolo docente
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
