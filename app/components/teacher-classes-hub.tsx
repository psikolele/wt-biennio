"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { teacherClassesData, TeacherClassMeta, TeacherUDA } from "@/app/data/teacher-classes-data";
import { curriculum, Week } from "@/app/data/curriculum";
import { LessonExtraMaterials } from "@/app/components/lesson-extra-materials";

export function TeacherClassesHub() {
  const [activeYear, setActiveYear] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [activeSubTab, setActiveSubTab] = useState<"plan" | "uda" | "labs">("plan");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKind, setSelectedKind] = useState<string>("all");
  const [expandedUdaId, setExpandedUdaId] = useState<string | null>(null);
  const [managingMaterialsWeek, setManagingMaterialsWeek] = useState<number | null>(null);

  const currentClass: TeacherClassMeta = teacherClassesData[activeYear];
  const classWeeks: Week[] = useMemo(() => {
    return (curriculum as unknown as Record<number, Week[]>)[activeYear] || [];
  }, [activeYear]);

  // Filtro settimane del piano didattico
  const filteredWeeks = useMemo(() => {
    return classWeeks.filter((w) => {
      const firstLesson = w.lessons[0];
      const matchKind =
        selectedKind === "all" ||
        (firstLesson && firstLesson.kind === selectedKind);

      if (!matchKind) return false;

      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase();
      const matchNumber = w.number.toString().includes(term);
      const matchTheme = w.theme.toLowerCase().includes(term);
      const matchLesson = w.lessons.some(
        (l) =>
          l.title.toLowerCase().includes(term) ||
          l.activity?.toLowerCase().includes(term) ||
          l.facilitatedTask?.toLowerCase().includes(term) ||
          l.competence?.toLowerCase().includes(term) ||
          l.objectives?.some((o) => o.toLowerCase().includes(term))
      );

      return matchNumber || matchTheme || matchLesson;
    });
  }, [classWeeks, searchTerm, selectedKind]);

  const toggleUda = (id: string) => {
    setExpandedUdaId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="classi-hub" className="mt-10 scroll-mt-10">
      {/* Intestazione Sezione */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="portal-eyebrow">Programmazione Didattica Ministeriale & D&apos;Istituto</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]">
            Hub Didattico delle 5 Classi
          </h2>
          <p className="portal-muted mt-2 max-w-2xl text-sm leading-relaxed">
            Piani settimanali (33 settimane), unità di apprendimento (UDA), programmazioni ufficiali scaricabili, compiti facilitati DSA e verifiche per tutto il percorso scolastico.
          </p>
        </div>

        {/* Badge status */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-1.5 text-xs text-[var(--muted)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--coral)] animate-pulse" />
          <span>Anno Scolastico 2023-2024 / 2024-2025</span>
        </div>
      </div>

      {/* SELETTORE DELLE 5 CLASSI */}
      <div className="mt-6 flex flex-wrap gap-2.5 p-2 rounded-2xl border border-[var(--line)] bg-[rgba(19,19,28,0.7)] backdrop-blur-md">
        {([1, 2, 3, 4, 5] as const).map((year) => {
          const isSelected = activeYear === year;
          const meta = teacherClassesData[year];
          const isBiennio = year <= 2;
          return (
            <button
              key={year}
              type="button"
              onClick={() => {
                setActiveYear(year);
                setSearchTerm("");
                setSelectedKind("all");
              }}
              className={`flex-1 min-w-[130px] rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-r from-[rgba(170,162,255,0.18)] to-[rgba(114,227,163,0.1)] border border-[var(--blue)] shadow-md shadow-[rgba(170,162,255,0.12)] text-[var(--ink)]"
                  : "border border-transparent bg-transparent hover:bg-[var(--surface-soft)] text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-black text-[var(--ink)]">
                  {meta.shortName}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isBiennio
                      ? "bg-[rgba(170,162,255,0.15)] text-[var(--blue)]"
                      : "bg-[rgba(114,227,163,0.15)] text-[var(--coral)]"
                  }`}
                >
                  {isBiennio ? "Biennio" : "Triennio"}
                </span>
              </div>
              <p className="mt-1 text-xs truncate opacity-80">
                {year === 1 && "Hardware & File System"}
                {year === 2 && "Logica & Scratch"}
                {year === 3 && "Cloud & Excel Avanzato"}
                {year === 4 && "Basi Dati E-R & Web"}
                {year === 5 && "Crittografia, Reti & Esame"}
              </p>
            </button>
          );
        })}
      </div>

      {/* SCHEDA CLASSE ATTIVA */}
      <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[rgba(19,19,28,0.92)] p-6 shadow-xl">
        {/* Intestazione della classe */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--line)]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="portal-eyebrow text-xs">
                {activeYear <= 2 ? "Area Comune · Primo Biennio" : "Area di Indirizzo · Triennio Professionalizzante"}
              </span>
              <span className="text-[var(--muted)]">·</span>
              <span className="text-xs text-[var(--muted)]">{currentClass.docente}</span>
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-black text-[var(--ink)]">
              {currentClass.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] max-w-3xl leading-relaxed">
              {currentClass.overview}
            </p>

            {/* Metadati rapidi */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <strong className="text-[var(--ink)]">Monte Ore:</strong> {currentClass.hoursPerYear} ore totali ({currentClass.weeklyHours}h/settimana)
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <strong className="text-[var(--ink)]">Libro:</strong> {currentClass.book}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <strong className="text-[var(--ink)]">UDA:</strong> {currentClass.udas.length} Moduli UDA
              </span>
            </div>
          </div>

          {/* Azioni di Download Ufficiali */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
            <a
              href={currentClass.downloadDocx}
              download
              className="portal-button inline-flex items-center justify-center gap-2 text-xs py-2.5 px-4 font-bold"
            >
              <span>📥 Scarica Programmazione (.docx)</span>
            </a>

            {currentClass.udaProposalsDocx && (
              <a
                href={currentClass.udaProposalsDocx}
                download
                className="portal-button-secondary inline-flex items-center justify-center gap-2 text-xs py-2.5 px-4"
              >
                <span>📥 Scarica Proposte UDA (.docx)</span>
              </a>
            )}

            <Link
              href={`/anno/${activeYear}`}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-[var(--blue)] hover:underline pt-1 text-center"
            >
              <span>Vai alla Sezione Studenti Classe {activeYear}ª →</span>
            </Link>
          </div>
        </div>

        {/* NAVIGAZIONE SOTTO-TAB */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-[var(--line)] pb-3">
          <button
            type="button"
            onClick={() => setActiveSubTab("plan")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeSubTab === "plan"
                ? "bg-[var(--blue)] text-[#08090f] shadow-md shadow-[rgba(170,162,255,0.2)]"
                : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
            }`}
          >
            📅 Piano Didattico Settimanale (33 Settimane)
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("uda")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeSubTab === "uda"
                ? "bg-[var(--blue)] text-[#08090f] shadow-md shadow-[rgba(170,162,255,0.2)]"
                : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
            }`}
          >
            🏛️ UDA & Competenze Ministeriali ({currentClass.udas.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("labs")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeSubTab === "labs"
                ? "bg-[var(--blue)] text-[#08090f] shadow-md shadow-[rgba(170,162,255,0.2)]"
                : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
            }`}
          >
            🧪 Verifiche, Laboratori & Criteri
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: PIANO DIDATTICO SETTIMANALE (33 SETTIMANE) */}
        {/* ======================================================== */}
        {activeSubTab === "plan" && (
          <div className="mt-6">
            {/* Filtri e Ricerca */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Cerca per settimana, tema, parola chiave o DSA..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2 pl-9 text-xs text-[var(--ink)] placeholder-[var(--muted)] focus:border-[var(--blue)] focus:outline-none"
                />
                <span className="absolute left-3 top-2.5 text-xs text-[var(--muted)]">🔍</span>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-xs text-[var(--muted)] hover:text-[var(--ink)]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Filtro per tipo */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "all", label: "Tutte le settimane" },
                  { id: "review", label: "🎯 Verifiche & Compiti di Realtà" },
                  { id: "laboratory", label: "Laboratorio" },
                  { id: "concept", label: "Teoria/Concetto" },
                  { id: "project", label: "Progetto" },
                  { id: "practice", label: "Pratica" }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedKind(type.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                      selectedKind === type.id
                        ? "bg-[rgba(170,162,255,0.2)] text-[var(--blue)] border border-[var(--blue)] shadow-sm"
                        : "bg-[var(--surface-soft)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 text-xs text-[var(--muted)]">
              Mostrate <strong>{filteredWeeks.length}</strong> su <strong>{classWeeks.length}</strong> settimane didattiche previste.
            </div>

            {/* Griglia Settimane */}
            <div className="mt-4 space-y-4">
              {filteredWeeks.map((week) => {
                const lesson = week.lessons[0];
                const matchedUda = currentClass.udas.find((u) => {
                  const [startStr, endStr] = u.weeksRange.replace(/[^0-9-]/g, "").split("-");
                  const start = parseInt(startStr, 10);
                  const end = parseInt(endStr, 10);
                  return week.number >= start && week.number <= end;
                });
                const isManaging = managingMaterialsWeek === week.number;

                return (
                  <article
                    key={week.number}
                    className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.5)] p-5 hover:border-[rgba(170,162,255,0.4)] transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--surface-soft)] border border-[var(--line)] text-[var(--blue)]">
                            Settimana {String(week.number).padStart(2, "0")}
                          </span>

                          {lesson && (
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                lesson.kind === "laboratory"
                                  ? "bg-[rgba(114,227,163,0.15)] text-[var(--coral)]"
                                  : lesson.kind === "project"
                                  ? "bg-[rgba(243,183,110,0.15)] text-[var(--warning)]"
                                  : lesson.kind === "review"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : "bg-[rgba(170,162,255,0.15)] text-[var(--blue)]"
                              }`}
                            >
                              {lesson.kind === "review" ? "🎯 Verifica / Review" : lesson.kind}
                            </span>
                          )}

                          {matchedUda && (
                            <span className="text-[11px] text-[var(--muted)]">
                              • UDA {matchedUda.number}: <em>{matchedUda.title}</em>
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 text-base font-bold text-[var(--ink)]">
                          {week.theme}
                        </h4>

                        {lesson?.competence && (
                          <p className="mt-1 text-xs text-[var(--muted)]">
                            <strong className="text-[var(--ink)]">Competenza:</strong> {lesson.competence}
                          </p>
                        )}

                        {lesson?.activity && (
                          <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                            {lesson.activity}
                          </p>
                        )}

                        {/* Fasi orarie minutate */}
                        {lesson?.phases && lesson.phases.length > 0 && (
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-semibold text-[var(--ink)]">Fasi didattiche:</span>
                            {lesson.phases.map((phase, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded bg-[var(--surface-soft)] px-2 py-0.5 text-[11px] font-mono text-[var(--muted)] border border-[var(--line)]"
                              >
                                <span>{phase.label}</span>
                                <strong className="text-[var(--coral)]">{phase.minutes}&apos;</strong>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Compito Facilitato BES/DSA */}
                        {lesson?.facilitatedTask && (
                          <div className="mt-3.5 rounded-lg border border-[rgba(114,227,163,0.25)] bg-[rgba(114,227,163,0.06)] p-3">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--coral)]">
                              <span>♿ Adattamento Didattico & Strategia DSA/BES:</span>
                            </div>
                            <p className="mt-1 text-xs text-[var(--ink)] leading-relaxed">
                              {lesson.facilitatedTask}
                            </p>
                          </div>
                        )}

                        {/* Piattaforme & Strumenti */}
                        {lesson?.platforms && lesson.platforms.length > 0 && (
                          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--muted)]">
                            <span className="font-semibold text-[var(--ink)]">Strumenti:</span>
                            {lesson.platforms.map((p, idx) => (
                              <span key={idx} className="rounded bg-[var(--paper)] px-2 py-0.5 border border-[var(--line)]">
                                {p}
                              </span>
                            ))}
                            {lesson.bookActivity && (
                              <span className="rounded bg-[var(--paper)] px-2 py-0.5 border border-[var(--line)] text-[var(--blue)]">
                                📖 {lesson.bookActivity}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Azioni Docente: Gestione Materiali & Link Lezione Studente */}
                      <div className="shrink-0 flex flex-wrap sm:flex-col items-center justify-end gap-2 pt-2 md:pt-0">
                        <button
                          type="button"
                          onClick={() => setManagingMaterialsWeek(isManaging ? null : week.number)}
                          className={`text-xs py-2 px-3 rounded-lg border font-bold transition-all whitespace-nowrap inline-flex items-center gap-1.5 ${
                            isManaging
                              ? "bg-[rgba(170,162,255,0.25)] text-[var(--blue)] border-[var(--blue)]"
                              : "bg-[var(--surface-soft)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--blue)]"
                          }`}
                        >
                          <span>📎 Materiali Extra</span>
                          <span className="text-[10px]">{isManaging ? "▲" : "▼"}</span>
                        </button>

                        <Link
                          href={`/anno/${activeYear}/settimana/${week.number}`}
                          className="portal-button text-xs py-2 px-3 whitespace-nowrap font-bold"
                        >
                          👁️ Lezione Studente
                        </Link>
                      </div>
                    </div>

                    {/* Drawer di Gestione Materiali Extra (Upload e Delete) */}
                    {isManaging && (
                      <div className="mt-4 pt-4 border-t border-[var(--line)]">
                        <LessonExtraMaterials
                          year={activeYear}
                          week={week.number}
                          lessonId={lesson?.id}
                          isTeacherSession={true}
                        />
                      </div>
                    )}
                  </article>
                );
              })}

              {filteredWeeks.length === 0 && (
                <div className="rounded-xl border border-dashed border-[var(--line)] p-8 text-center text-xs text-[var(--muted)]">
                  Nessuna settimana corrisponde ai criteri di ricerca impostati.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: UDA & COMPETENZE MINISTERIALI */}
        {/* ======================================================== */}
        {activeSubTab === "uda" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 text-xs text-[var(--muted)] leading-relaxed">
              Le Unità di Apprendimento (UDA) sotto riportate sono estratte direttamente dal documento ministeriale/d&apos;istituto ufficiale: <strong className="text-[var(--ink)]">{currentClass.title}</strong> redatto dal dipartimento.
            </div>

            <div className="space-y-4">
              {currentClass.udas.map((uda) => {
                const isExpanded = expandedUdaId === uda.id;
                return (
                  <article
                    key={uda.id}
                    className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.6)] overflow-hidden"
                  >
                    <header
                      onClick={() => toggleUda(uda.id)}
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-[rgba(170,162,255,0.05)] transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[var(--blue)] px-2 py-0.5 rounded bg-[var(--paper)] border border-[var(--line)]">
                            UDA N° {uda.number}
                          </span>
                          <span className="font-mono text-xs text-[var(--coral)] bg-[rgba(114,227,163,0.1)] px-2 py-0.5 rounded">
                            {uda.weeksRange}
                          </span>
                          <span className="text-xs text-[var(--muted)] font-mono">
                            {uda.hours} ore stimate
                          </span>
                        </div>
                        <h4 className="mt-2 text-base font-bold text-[var(--ink)]">
                          {uda.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        aria-label="Espandi UDA"
                        className="h-8 w-8 rounded-full border border-[var(--line)] flex items-center justify-center text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)] shrink-0"
                      >
                        {isExpanded ? "▲" : "▼"}
                      </button>
                    </header>

                    {isExpanded && (
                      <div className="p-5 pt-0 border-t border-[var(--line)] space-y-4 text-xs">
                        <div className="grid gap-4 md:grid-cols-2 pt-4">
                          {/* Competenze */}
                          <div className="rounded-lg bg-[var(--paper)] p-3 border border-[var(--line)]">
                            <strong className="text-[var(--blue)] font-bold block mb-1">🎯 Competenze in Uscita:</strong>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--muted)]">
                              {uda.competences.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Abilità */}
                          <div className="rounded-lg bg-[var(--paper)] p-3 border border-[var(--line)]">
                            <strong className="text-[var(--coral)] font-bold block mb-1">🛠️ Abilità (Saper Fare):</strong>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--muted)]">
                              {uda.skills.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Conoscenze */}
                          <div className="rounded-lg bg-[var(--paper)] p-3 border border-[var(--line)]">
                            <strong className="text-[var(--warning)] font-bold block mb-1">📚 Conoscenze (Sapere):</strong>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--muted)]">
                              {uda.knowledge.map((k, i) => (
                                <li key={i}>{k}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Contenuti Trattati */}
                          <div className="rounded-lg bg-[var(--paper)] p-3 border border-[var(--line)]">
                            <strong className="text-[var(--ink)] font-bold block mb-1">📑 Contenuti Disciplinari:</strong>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--muted)]">
                              {uda.contents.map((cnt, i) => (
                                <li key={i}>{cnt}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Metodologie e Verifiche */}
                        <div className="grid gap-4 sm:grid-cols-2 pt-2">
                          <div className="rounded-lg bg-[rgba(27,25,42,0.4)] p-3 border border-[var(--line)]">
                            <strong className="text-[var(--ink)] font-bold block mb-1">💻 Metodologie & Strumenti:</strong>
                            <p className="text-[var(--muted)] leading-relaxed">
                              {uda.methodsAndTools.join(" · ")}
                            </p>
                          </div>

                          <div className="rounded-lg bg-[rgba(27,25,42,0.4)] p-3 border border-[var(--line)]">
                            <strong className="text-[var(--ink)] font-bold block mb-1">📝 Tipologia Verifiche:</strong>
                            <p className="text-[var(--coral)] leading-relaxed">
                              {uda.assessmentTypes.join(" · ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: VERIFICHE, LABORATORI & CRITERI */}
        {/* ======================================================== */}
        {activeSubTab === "labs" && (
          <div className="mt-6 space-y-6">
            {/* Strategia di Valutazione */}
            <div className="grid gap-6 md:grid-cols-2">
              <article className="bento-tile bento-tile--glow">
                <div>
                  <span className="portal-eyebrow">Valutazione Formativa & Sommativa</span>
                  <h4 className="mt-2 text-base font-bold text-[var(--blue)]">
                    Metodologia di Verifica {currentClass.shortName}
                  </h4>
                  <div className="mt-3 space-y-3 text-xs text-[var(--muted)] leading-relaxed">
                    <div>
                      <strong className="text-[var(--ink)] block">Verifica Formativa in Itinere:</strong>
                      <p>{currentClass.assessmentStrategy.formative}</p>
                    </div>
                    <div>
                      <strong className="text-[var(--ink)] block">Verifica Sommativa di Periodo:</strong>
                      <p>{currentClass.assessmentStrategy.summative}</p>
                    </div>
                  </div>
                </div>
              </article>

              <article className="bento-tile bento-tile--coral-glow">
                <div>
                  <span className="portal-eyebrow text-[var(--coral)]">Indicatori Collegiali</span>
                  <h4 className="mt-2 text-base font-bold text-[var(--coral)]">
                    Criteri di Valutazione per Competenze
                  </h4>
                  <ul className="mt-3 list-disc pl-4 space-y-2 text-xs text-[var(--muted)] leading-relaxed">
                    {currentClass.assessmentStrategy.criteria.map((crit, idx) => (
                      <li key={idx}>{crit}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>

            {/* Laboratori Operativi Tipici */}
            <div>
              <h4 className="text-base font-bold text-[var(--ink)]">
                Laboratori Operativi & Strumenti Specialistici della Classe
              </h4>
              <p className="portal-muted text-xs mt-1">
                Esercitazioni pratiche, simulatori e suite integrate utilizzate durante l&apos;anno per {currentClass.title}.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {currentClass.assessmentStrategy.typicalLabs.map((lab, idx) => (
                  <article
                    key={idx}
                    className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.5)] p-4 flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-[var(--blue)]">{lab.title}</h5>
                      <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">
                        {lab.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {lab.tools.map((t, i) => (
                          <span
                            key={i}
                            className="rounded bg-[var(--surface-soft)] px-2 py-0.5 font-mono text-[10px] text-[var(--coral)] border border-[var(--line)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {lab.internalLink && (
                      <div className="mt-4 pt-3 border-t border-[var(--line)]">
                        <a
                          href={lab.internalLink}
                          className="portal-button-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
                        >
                          <span>Accedi allo Strumento →</span>
                        </a>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
