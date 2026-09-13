import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { hasTeacherSession } from "@/app/lib/auth";
import { teacherNotes } from "@/app/data/teacher-notes";

export default async function TeacherPage() {
  const session = (await cookies()).get("teacher_session")?.value;
  if (!hasTeacherSession(session)) redirect("/docenti/login");
  return (
    <main className="portal-shell px-5 py-10 sm:px-10">
      <div className="portal-container max-w-5xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="portal-button-secondary">← Portale studenti</Link>
          <form action="/api/teacher-logout" method="POST">
            <button type="submit" className="portal-button-secondary text-sm">Esci</button>
          </form>
        </div>
        <header className="mt-10">
          <p className="portal-eyebrow">Area riservata</p>
          <h1 className="mt-3 text-4xl font-black">Console docenti</h1>
          <p className="portal-muted mt-3 max-w-2xl leading-7">Materiali riservati, programmazione didattica per competenze, suite gamification e criteri di valutazione.</p>

          {/* Quick-Jump & Gamification Hero CTA Banner */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#gamification"
              className="portal-button inline-flex items-center gap-2 text-sm font-bold shadow-lg shadow-[rgba(170,162,255,0.15)]"
            >
              <span>Suite Gamification (12 Quiz LIM & Kahoot)</span>
              <span aria-hidden="true" className="font-mono text-xs opacity-75">↓</span>
            </a>
            <a
              href="#guide"
              className="portal-button-secondary inline-flex items-center gap-1.5 text-xs"
            >
              <span>Guide PDF</span>
            </a>
            <a
              href="#metodologia"
              className="portal-button-secondary inline-flex items-center gap-1.5 text-xs"
            >
              <span>Note Metodologiche</span>
            </a>
            <a
              href="#valutazione"
              className="portal-button-secondary inline-flex items-center gap-1.5 text-xs"
            >
              <span>Valutazione & DSA</span>
            </a>
          </div>
        </header>
        
        {teacherNotes.guides && (
          <section id="guide" className="mt-10 scroll-mt-10">
            <h2 className="text-2xl font-bold">Guide per l&apos;insegnante e programmazione</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {teacherNotes.guides.map((guide, idx) => (
                <article key={guide.title} className={`bento-tile ${idx === 0 ? "bento-tile--glow" : ""}`}>
                  <div>
                    <h3 className="card-title text-lg text-[var(--blue)]">{guide.title}</h3>
                    <p className="card-description text-sm">{guide.description}</p>
                  </div>
                  <div className="card-footer-row mt-5 border-t-0 pt-0 justify-start">
                    <a
                      href={guide.href}
                      target="_blank"
                      rel="noreferrer"
                      className="portal-button text-sm"
                    >
                      Scarica Guida Ufficiale (PDF)
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* SEZIONE GAMIFICATION & QUIZ CHECKPOINT (KAHOOT / PANQUIZ) */}
        {/* ======================================================== */}
        <section id="gamification" className="mt-14 scroll-mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="portal-eyebrow">Didattica Attiva & Valutazione Formativa</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                Suite Gamification: 12 Quiz Checkpoint
              </h2>
              <p className="portal-muted mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
                12 Quiz mirati da 5 domande concettuali ad alto impatto. Giocabili istantaneamente in classe tramite la modalità interattiva LIM, oppure esportabili su <strong>Kahoot!</strong> e <strong>PanQuiz</strong>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-[rgba(170,162,255,0.25)] bg-[rgba(170,162,255,0.08)] px-3 py-1 text-xs font-semibold text-[var(--blue)]">
                ✓ Giocatore LIM Nativo
              </span>
              <span className="inline-flex items-center rounded-full border border-[rgba(114,227,163,0.25)] bg-[rgba(114,227,163,0.08)] px-3 py-1 text-xs font-semibold text-[var(--coral)]">
                ✓ Kahoot & PanQuiz Ready
              </span>
            </div>
          </div>

          {/* Pacchetti cumulativi — bento asimmetrico: Anno1 tessera ampia, Anno2 compatta */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="bento-tile bento-tile--glow md:col-span-2">
              <div>
                <span className="portal-eyebrow">Anno 1 (Classi Prime)</span>
                <h3 className="card-title mt-2">Pacchetto Completo 6 Quiz</h3>
                <p className="card-description">
                  Regole & Ergonomia Lab, File System & Backup, Reti & Fonti Web, E-mail & Netiquette, Videoscrittura, Excel Base & Switch Logici.
                </p>
              </div>
              <div className="card-footer-row mt-6 flex-wrap gap-2 justify-start">
                <a href="/api/quizzes/kahoot/all-quizzes-anno1.csv" download="all-quizzes-anno1.csv" className="portal-button text-xs py-2 px-3.5">
                  Scarica Kahoot (.csv)
                </a>
                <a href="/api/quizzes/panquiz/all-quizzes-anno1.csv" download="all-quizzes-anno1.csv" className="portal-button-secondary text-xs py-2 px-3.5">
                  PanQuiz (.csv)
                </a>
                <a href="/api/quizzes/panquiz/all-quizzes-anno1.txt" download="all-quizzes-anno1.txt" className="portal-button-secondary text-xs py-2 px-3.5">
                  Testo Aiken (.txt)
                </a>
              </div>
            </article>

            <article className="bento-tile bento-tile--coral-glow md:col-span-1">
              <div>
                <span className="portal-eyebrow text-[var(--coral)]">Anno 2 (Classi Seconde)</span>
                <h3 className="card-title mt-2">Pacchetto Completo 6 Quiz</h3>
                <p className="card-description">
                  Cybersecurity & 2FA, Privacy GDPR & Impronta Digitale, Word Stampa Unione, Logica Booleana & Excel SE/E/O, Database Relazionali e Scratch.
                </p>
              </div>
              <div className="card-footer-row mt-6 flex-col items-stretch gap-2">
                <a href="/api/quizzes/kahoot/all-quizzes-anno2.csv" download="all-quizzes-anno2.csv" className="portal-button text-xs py-2 px-3.5 justify-center">
                  Scarica Kahoot (.csv)
                </a>
                <a href="/api/quizzes/panquiz/all-quizzes-anno2.csv" download="all-quizzes-anno2.csv" className="portal-button-secondary text-xs py-2 px-3.5 justify-center">
                  PanQuiz (.csv)
                </a>
                <a href="/api/quizzes/panquiz/all-quizzes-anno2.txt" download="all-quizzes-anno2.txt" className="portal-button-secondary text-xs py-2 px-3.5 justify-center">
                  Testo Aiken (.txt)
                </a>
              </div>
            </article>
          </div>

          {/* Griglia Quiz Anno 1 */}
          <h3 className="mt-10 text-xl font-bold text-[var(--ink)]">📘 Classe 1ª: Checkpoint Settimanali</h3>
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "quiz-1-04-hardware", num: 1, week: 4, title: "Regole Lab, Ergonomia & Hardware", topic: "Regola 20-20-20, password/passphrase, CPU, RAM volatile vs memorie di massa" },
              { id: "quiz-1-09-software-filesystem", num: 2, week: 9, title: "Software & File System", topic: "Sistemi Operativi, Open Source GPL, percorsi cartelle, backup 3-2-1" },
              { id: "quiz-1-13-reti-internet", num: 3, week: 13, title: "Reti, Internet & Fonti Web", topic: "LAN/IP/DNS, fact-checking metodo CRAAP, licenze Creative Commons" },
              { id: "quiz-1-17-email-cloud", num: 4, week: 17, title: "E-mail & Cloud Collaboration", topic: "Campi posta A/Cc/Ccn, Netiquette, condivisione Google Drive, Phishing" },
              { id: "quiz-1-21-word-videoscrittura", num: 5, week: 21, title: "Word: Impaginazione & Stili", topic: "Margini, gerarchia Titolo 1/2, interlinea, layout immagini e Alt-Text" },
              { id: "quiz-1-25-excel-base", num: 6, week: 25, title: "Excel Base: Formule & Switch Logici", topic: "Interruttori logici ON/OFF, operatori aritmetici, formule, riferimenti $" },
            ].map((q) => (
              <article key={q.id} className="bento-tile">
                <div>
                  <div className="card-header-row">
                    <span className="font-mono text-xs font-bold text-[var(--blue)] uppercase tracking-wider">Settimana {q.week}</span>
                    <span className="font-mono text-xs font-semibold text-[var(--muted)] bg-[var(--surface-soft)] px-2 py-0.5 rounded border border-[var(--line)]">5 Dom. · 20s</span>
                  </div>
                  <h4 className="card-title text-base">{q.title}</h4>
                  <p className="card-description text-xs">{q.topic}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-[rgba(47,43,75,0.75)] flex flex-col gap-2.5">
                  <Link
                    href={`/quiz/${q.id}`}
                    className="portal-button text-xs py-2 w-full font-bold justify-center"
                  >
                    ▶️ Gioca in Classe (LIM)
                  </Link>
                  <div className="flex items-center justify-between gap-1.5 pt-1 text-[11px] text-[var(--muted)]">
                    <span>Export:</span>
                    <div className="flex items-center gap-1.5">
                      <a href={`/api/quizzes/kahoot/${q.id}.csv`} download={`${q.id}-kahoot.csv`} className="hover:text-[var(--blue)] underline">
                        Kahoot
                      </a>
                      <span>·</span>
                      <a href={`/api/quizzes/panquiz/${q.id}.csv`} download={`${q.id}-panquiz.csv`} className="hover:text-[var(--coral)] underline">
                        PanQuiz
                      </a>
                      <span>·</span>
                      <a href={`/api/quizzes/panquiz/${q.id}.txt`} download={`${q.id}-aiken.txt`} className="hover:text-[var(--ink)] underline">
                        Aiken .txt
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Griglia Quiz Anno 2 */}
          <h3 className="mt-10 text-xl font-bold text-[var(--ink)]">📗 Classe 2ª: Checkpoint Settimanali</h3>
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "quiz-2-03-cybersecurity", num: 7, week: 3, title: "Cybersecurity & 2FA", topic: "Ransomware, Passphrase NIST, Autenticazione a Due Fattori, Smishing" },
              { id: "quiz-2-06-privacy-crittografia", num: 8, week: 6, title: "Privacy GDPR & Impronta Digitale", topic: "Dati personali e sensibili, Diritto all'oblio, consensi e cyberbullismo" },
              { id: "quiz-2-08-word-avanzato", num: 9, week: 8, title: "Word: Stampa Unione", topic: "Matrici modello, campi unione segnaposto, etichette e collegamento dati" },
              { id: "quiz-2-10-excel-logica", num: 10, week: 10, title: "Logica Booleana & Excel SE/E/O", topic: "Tavole di verità (AND/OR/NOT), funzione =SE(), =E(), =O(), formattazione condizionale" },
              { id: "quiz-2-13-database", num: 11, week: 13, title: "Database Relazionali & Tabelle", topic: "Tabelle, Record, Campi atomici, Chiavi Primarie (PK), relazioni 1:N" },
              { id: "quiz-2-26-coding-scratch", num: 12, week: 26, title: "Pensiero Computazionale & Scratch", topic: "Algoritmi finiti e determinati, loop per sempre, variabili, broadcast, assi X/Y" },
            ].map((q) => (
              <article key={q.id} className="bento-tile bento-tile--coral-glow">
                <div>
                  <div className="card-header-row">
                    <span className="font-mono text-xs font-bold text-[var(--coral)] uppercase tracking-wider">Settimana {q.week}</span>
                    <span className="font-mono text-xs font-semibold text-[var(--muted)] bg-[var(--surface-soft)] px-2 py-0.5 rounded border border-[var(--line)]">5 Dom. · 25s</span>
                  </div>
                  <h4 className="card-title text-base">{q.title}</h4>
                  <p className="card-description text-xs">{q.topic}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-[rgba(47,43,75,0.75)] flex flex-col gap-2.5">
                  <Link
                    href={`/quiz/${q.id}`}
                    className="portal-button text-xs py-2 w-full font-bold justify-center"
                  >
                    ▶️ Gioca in Classe (LIM)
                  </Link>
                  <div className="flex items-center justify-between gap-1.5 pt-1 text-[11px] text-[var(--muted)]">
                    <span>Export:</span>
                    <div className="flex items-center gap-1.5">
                      <a href={`/api/quizzes/kahoot/${q.id}.csv`} download={`${q.id}-kahoot.csv`} className="hover:text-[var(--blue)] underline">
                        Kahoot
                      </a>
                      <span>·</span>
                      <a href={`/api/quizzes/panquiz/${q.id}.csv`} download={`${q.id}-panquiz.csv`} className="hover:text-[var(--coral)] underline">
                        PanQuiz
                      </a>
                      <span>·</span>
                      <a href={`/api/quizzes/panquiz/${q.id}.txt`} download={`${q.id}-aiken.txt`} className="hover:text-[var(--ink)] underline">
                        Aiken .txt
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Guida 1-Click Import — tessera full-width per chiudere la bento grid */}
          <article className="bento-tile mt-8">
            <h4 className="text-base font-bold text-[var(--ink)]">💡 Guida all&apos;Importazione Esterna (Kahoot & PanQuiz)</h4>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 text-xs leading-relaxed text-[var(--muted)]">
              <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.45)] p-4">
                <strong className="text-[var(--blue)] font-bold block mb-1.5">🟣 Kahoot! (Free Tier):</strong>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Accedi a <a href="https://kahoot.com" target="_blank" rel="noreferrer" className="underline text-[var(--blue)]">Kahoot.com</a> e clicca su <strong>Crea → Kahoot</strong>.</li>
                  <li>Nel pannello sinistro clicca su <strong>Aggiungi domanda → Importa da foglio di calcolo</strong>.</li>
                  <li>Seleziona il file <code>.csv</code> del quiz scaricato e premi <strong>Carica</strong>.</li>
                </ol>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[rgba(27,25,42,0.45)] p-4">
                <strong className="text-[var(--coral)] font-bold block mb-1.5">🟢 PanQuiz (Free Tier):</strong>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Accedi a <a href="https://panquiz.com" target="_blank" rel="noreferrer" className="underline text-[var(--coral)]">PanQuiz.com</a> e clicca su <strong>Crea Questionario</strong>.</li>
                  <li>Scegli <strong>Importa domande</strong> e seleziona il file <code>.csv</code> o incolla il formato <code>.txt (Aiken)</code>.</li>
                  <li>Tutti i quesiti con opzioni e spiegazioni vengono associati in automatico.</li>
                </ol>
              </div>
            </div>
          </article>
        </section>

        {/* Note Metodologiche Prime 3 Settimane e Ponte Logico */}
        <section id="metodologia" className="mt-14 scroll-mt-10">
          <h2 className="text-2xl font-bold">📋 Note Metodologiche & Didattica Applicata</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <article className="bento-tile bento-tile--glow">
              <span className="portal-eyebrow">Classe 1ª · Prime 3 Settimane</span>
              <h3 className="mt-2 text-lg font-bold text-[var(--blue)]">Accoglienza, Ergonomia & Passphrase</h3>
              <div className="portal-muted mt-3 space-y-3 text-xs leading-relaxed">
                <div>
                  <strong className="text-[var(--ink)] block">Settimana 1 (Regole & Patto d&apos;aula):</strong>
                  <p>{teacherNotes.earlyWeeksGuidance.settimana1_regole}</p>
                </div>
                <div>
                  <strong className="text-[var(--ink)] block">Settimana 2 (Ergonomia & Regola 20-20-20):</strong>
                  <p>{teacherNotes.earlyWeeksGuidance.settimana2_ergonomia}</p>
                </div>
                <div>
                  <strong className="text-[var(--ink)] block">Settimana 3 (Passphrase & Identità Digitale):</strong>
                  <p>{teacherNotes.earlyWeeksGuidance.settimana3_password}</p>
                </div>
              </div>
            </article>
            <article className="bento-tile bento-tile--coral-glow">
              <span className="portal-eyebrow text-[var(--coral)]">Classe 1ª e 2ª · Ponte Logico</span>
              <h3 className="mt-2 text-lg font-bold text-[var(--coral)]">Dagli Switch Logici a Excel =SE()</h3>
              <div className="portal-muted mt-3 space-y-3 text-xs leading-relaxed">
                <div>
                  <strong className="text-[var(--ink)] block">Classe 1ª (Settimana 24 - Switch ON/OFF):</strong>
                  <p>{teacherNotes.logicExcelBridge.anno1_propedeutica}</p>
                </div>
                <div>
                  <strong className="text-[var(--ink)] block">Classe 2ª (Settimana 9 - Logica Booleana):</strong>
                  <p>{teacherNotes.logicExcelBridge.anno2_porte_logiche}</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="valutazione" className="mt-10 scroll-mt-10 grid gap-6 md:grid-cols-2">
          <article className="bento-tile">
            <h2 className="text-xl font-bold">Valutazione</h2>
            <p className="portal-muted mt-3 leading-7">{teacherNotes.assessment}</p>
            <p className="mt-4 text-sm font-bold text-[var(--blue)]">{teacherNotes.rubric.join(" · ")}</p>
          </article>
          <article className="bento-tile">
            <h2 className="text-xl font-bold">Strategie DSA</h2>
            <dl className="portal-muted mt-4 space-y-4 text-sm leading-6">
              {Object.entries(teacherNotes.dsaStrategies).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-bold capitalize text-[var(--blue)]">{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>
        <p className="teacher-note mt-6 p-4 text-sm leading-6">{teacherNotes.note}</p>
      </div>
    </main>
  );
}

