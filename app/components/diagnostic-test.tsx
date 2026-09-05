"use client";

import { useState } from "react";

const questions: [string, string[]][] = [
  ["Quale dispositivo conserva i file anche a computer spento?", ["RAM", "SSD/HDD", "CPU"]],
  ["Qual è una buona pratica per una password?", ["Usare 123456", "Riutilizzarla ovunque", "Usare una frase lunga e unica"]],
  ["Che cosa descrive meglio una cartella?", ["Un contenitore organizzato di file", "Un componente hardware", "Una rete"]],
  ["A che cosa serve il sistema operativo?", ["A gestire hardware e programmi", "A collegare solo la tastiera", "A sostituire Internet"]],
  ["Quale estensione identifica normalmente un'immagine?", [".jpg", ".exe", ".txt"]],
  ["Che cosa indica HTTPS?", ["Una connessione protetta", "Un tipo di stampante", "Un programma di scrittura"]],
  ["Quale comportamento aiuta una ricerca online?", ["Confrontare più fonti", "Copiare il primo risultato", "Ignorare la data"]],
  ["In una e-mail, il campo Cc serve a...", ["Inviare una copia visibile", "Nascondere il destinatario", "Allegare un file"]],
  ["Quale strumento è adatto per calcolare una media?", ["Foglio di calcolo", "Editor di immagini", "Lettore video"]],
  ["Che cosa significa fare un backup?", ["Creare una copia di sicurezza", "Cancellare tutti i file", "Cambiare password"]]
];

export function DiagnosticTest() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const score = answers.filter((answer, index) => answer === [1, 2, 0, 0, 0, 0, 0, 0, 0, 0][index]).length;
  return (
    <section className="diagnostic-test portal-card" aria-labelledby="diagnostic-title">
      <p className="portal-eyebrow">Accoglienza</p>
      <h2 id="diagnostic-title" className="mt-2 text-2xl font-black">Test diagnostico iniziale</h2>
      <p className="portal-muted diagnostic-intro">Non è una valutazione: serve a capire da dove iniziare. Il risultato resta solo in questa pagina.</p>
      <div className="no-print diagnostic-questions">
        {questions.map(([question, options], index) => <fieldset key={question} className="diagnostic-question"><legend>{index + 1}. {question}</legend><div className="diagnostic-options">{options.map((option, optionIndex) => <label key={option}><input type="radio" name={`question-${index}`} onChange={() => setAnswers((old) => { const next = [...old]; next[index] = optionIndex; return next; })} /><span>{option}</span></label>)}</div></fieldset>)}
      </div>
      <div className="no-print diagnostic-actions">
        <button type="button" onClick={() => setSubmitted(true)} className="portal-button bg-[var(--warning)] hover:bg-[#765000]">Concludi il test</button>
        <button type="button" onClick={() => window.print()} className="portal-button-secondary">Stampa versione cartacea</button>
        <a href="https://kahoot.com/" target="_blank" rel="noreferrer" className="portal-button-secondary">Opzione Kahoot ↗</a>
      </div>
      {submitted ? <p className="mt-4 text-sm font-bold" role="status">Hai risposto correttamente a {score} domande su {questions.length}. Ne parleremo insieme.</p> : null}
      <div className="print-only mt-8 hidden text-sm leading-7"><p>Nome: ______________________________ Classe: __________ Data: __________</p><p className="mt-4">Rispondi alle 10 domande scegliendo una sola opzione. Poi svolgi la prova pratica indicata dal docente.</p>{questions.map(([question, options], index) => <p key={question} className="mt-4">{index + 1}. {question}<br />{options.map((option) => `○ ${option}`).join("    ")}</p>)}<p className="mt-6">Prova pratica: crea una cartella con il tuo nome, salva un file di testo e indica due componenti hardware che riconosci.</p></div>
    </section>
  );
}
