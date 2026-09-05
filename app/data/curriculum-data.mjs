const firstYearThemes = [
  ["Accoglienza e test iniziale", "Clippy Cloud Plus vol. 1, apertura e competenze di base"],
  ["PC smontati: riconoscere l'hardware", "Clippy Cloud Plus vol. 1, cap. Hardware"],
  ["Sicurezza nel laboratorio", "Clippy Cloud Plus vol. 1, cap. Sistema e sicurezza"],
  ["Dentro il computer: CPU e memoria", "Clippy Cloud Plus vol. 1, cap. Hardware"],
  ["Archiviazione e periferiche", "Clippy Cloud Plus vol. 1, cap. Hardware"],
  ["Software e sistema operativo", "Clippy Cloud Plus vol. 1, cap. Software"],
  ["File, cartelle e percorsi", "Clippy Cloud Plus vol. 1, cap. Sistema operativo"],
  ["Gestire file e backup", "Clippy Cloud Plus vol. 1, cap. Sistema operativo"],
  ["Reti: LAN, WAN e dispositivi", "Clippy Cloud Plus vol. 1, cap. Reti"],
  ["Internet e indirizzi web", "Clippy Cloud Plus vol. 1, cap. Internet"],
  ["Ricercare informazioni affidabili", "Clippy Cloud Plus vol. 1, cap. Internet"],
  ["Copyright e fonti", "Clippy Cloud Plus vol. 1, cap. Internet e cittadinanza"],
  ["E-mail: messaggi efficaci", "Clippy Cloud Plus vol. 1, cap. E-mail"],
  ["Allegati, destinatari e netiquette", "Clippy Cloud Plus vol. 1, cap. E-mail"],
  ["Cloud e condivisione", "Clippy Cloud Plus vol. 1, cap. Cloud"],
  ["Collaborare su un documento", "Clippy Cloud Plus vol. 1, cap. Cloud e collaborazione"],
  ["Videoscrittura: struttura del testo", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Formattazione accessibile", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Immagini, tabelle e didascalie", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Stili e documento coerente", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Relazione digitale", "Clippy Cloud Plus vol. 1, compito di realtà"],
  ["Fogli di calcolo: celle e dati", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Formule e riferimenti", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Funzioni e grafici", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Dati ordinati e formattazione", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Presentazioni: messaggio e scaletta", "Clippy Cloud Plus vol. 1, cap. Presentazioni"],
  ["Slide leggibili e inclusive", "Clippy Cloud Plus vol. 1, cap. Presentazioni"],
  ["Immagini, grafici e fonti", "Clippy Cloud Plus vol. 1, cap. Presentazioni"],
  ["Presentare in pubblico", "Clippy Cloud Plus vol. 1, compito di realtà"],
  ["Project work: prodotto digitale", "Clippy Cloud Plus vol. 1, compito di realtà"],
  ["Ripasso a squadre", "Clippy Cloud Plus vol. 1, sintesi dei capitoli"],
  ["Portfolio delle competenze", "Clippy Cloud Plus vol. 1, compito di realtà"],
  ["Verifica e restituzione", "Clippy Cloud Plus vol. 1, verifica finale"]
];

const secondYearThemes = [
  ["Ripartenza e sicurezza digitale", "Clippy Cloud Plus vol. 2, cap. Sicurezza"],
  ["Minacce, malware e phishing", "Clippy Cloud Plus vol. 2, cap. Sicurezza"],
  ["Password e autenticazione", "Clippy Cloud Plus vol. 2, cap. Sicurezza"],
  ["Privacy e protezione dei dati", "Clippy Cloud Plus vol. 2, cap. Dati"],
  ["Identità digitale e reputazione", "Clippy Cloud Plus vol. 2, cap. Cittadinanza digitale"],
  ["Documenti avanzati", "Clippy Cloud Plus vol. 2, cap. Documenti"],
  ["Modelli, stili e sommario", "Clippy Cloud Plus vol. 2, cap. Documenti"],
  ["Fogli: funzioni logiche", "Clippy Cloud Plus vol. 2, cap. Fogli"],
  ["Fogli: dati e grafici", "Clippy Cloud Plus vol. 2, cap. Fogli"],
  ["Fogli: analizzare un problema", "Clippy Cloud Plus vol. 2, cap. Fogli"],
  ["Database: concetti e tabelle", "Clippy Cloud Plus vol. 2, cap. Database"],
  ["Database: record e query", "Clippy Cloud Plus vol. 2, cap. Database"],
  ["Database: progettare un archivio", "Clippy Cloud Plus vol. 2, cap. Database"],
  ["Cittadinanza digitale", "Clippy Cloud Plus vol. 2, cap. Cittadinanza digitale"],
  ["Benessere, tempo e impronta digitale", "Clippy Cloud Plus vol. 2, cap. Cittadinanza digitale"],
  ["Verifica intermedia", "Clippy Cloud Plus vol. 2, verifica dei moduli"],
  ["Algoritmi e istruzioni", "Clippy Cloud Plus, Programmazione a blocchi, cap. Scratch"],
  ["Scratch: ambiente ed eventi", "Programmazione a blocchi, cap. Scratch"],
  ["Sequenze e animazioni", "Programmazione a blocchi, cap. Scratch"],
  ["Cicli e ripetizioni", "Programmazione a blocchi, cap. Scratch"],
  ["Condizioni e decisioni", "Programmazione a blocchi, cap. Scratch"],
  ["Variabili e punteggio", "Programmazione a blocchi, cap. Scratch"],
  ["Input, messaggi e interazione", "Programmazione a blocchi, cap. Scratch"],
  ["Casualità e gioco", "Programmazione a blocchi, cap. Scratch"],
  ["Debugging e collaudo", "Programmazione a blocchi, cap. Scratch"],
  ["Micro:bit o Flowgorithm: ponte opzionale", "Programmazione a blocchi, cap. Micro:bit/Flowgorithm"],
  ["Progetto: ideazione", "Programmazione a blocchi, progetto finale"],
  ["Progetto: prototipo", "Programmazione a blocchi, progetto finale"],
  ["Progetto: test tra pari", "Programmazione a blocchi, progetto finale"],
  ["Progetto: miglioramento", "Programmazione a blocchi, progetto finale"],
  ["Demo day e documentazione", "Programmazione a blocchi, progetto finale"],
  ["Ripasso a squadre", "Vol. 2 e Programmazione a blocchi, sintesi"],
  ["Verifica e restituzione", "Vol. 2 e Programmazione a blocchi, verifica finale"]
];

const lessonModes = ["concept", "laboratory", "practice", "concept", "laboratory", "review"];

function referenceFor(theme, year, index) {
  const t = theme.toLowerCase();
  if (year === 2 && /algoritmi|scratch|sequenze|cicli|condizioni|variabili|input|casualità|debugging|micro:bit|flowgorithm|progetto/.test(t)) {
    return "Programmazione a blocchi · Scratch 3.0, micro:bit e Flowgorithm";
  }
  if (/cloud|condivisione|collaborare|compito|portfolio|project|demo/.test(t)) {
    return `Clippy Cloud Plus vol. ${year} · Macroarea C — Cloud e compiti di realtà`;
  }
  if (year === 2 && /sicurezza|malware|phishing|password|autenticazione|privacy|identità|reputazione|benessere|impronta/.test(t)) {
    return "Clippy Cloud Plus vol. 2 · Macroarea A — Operare in sicurezza";
  }
  if (year === 2 && /database|document|modelli|stili|sommario|fogli|formule|funzioni|grafici/.test(t)) {
    return "Clippy Cloud Plus vol. 2 · Macroarea B — Progettare e organizzare";
  }
  if (year === 2 && /cittadinanza|ripasso|verifica|restituzione/.test(t)) {
    return "Clippy Cloud Plus vol. 2 · Macroarea C — Creare e sviluppare competenze";
  }
  if (/document|videoscrittura|formattazione|immagini|tabelle|didascalie|relazione|fogli|formule|funzioni|grafici|presentazioni|slide|presentare/.test(t)) {
    return `Clippy Cloud Plus vol. ${year} · Macroarea B — Progettare e comunicare`;
  }
  if (/e-mail|email|ricercare|copyright|fonti|internet|indirizzi|cittadinanza|privacy|identità|reputazione|benessere|impronta/.test(t)) {
    return `Clippy Cloud Plus vol. ${year} · Macroarea B/C — Comunicare, collaborare e cittadinanza digitale`;
  }
  return `Clippy Cloud Plus vol. ${year} · Macroarea A — Conoscere e operare`;
}

function topicText(theme, mode) {
  const t = theme.toLowerCase();
  const lab = mode === "laboratory" || mode === "practice" || mode === "project";
  if (/hardware|cpu|memoria|archiviazione|periferiche/.test(t)) return {
    explanation: lab ? undefined : "Il computer è un sistema formato da componenti che collaborano: il processore esegue istruzioni, la memoria conserva temporaneamente i dati e l’archiviazione li mantiene anche a dispositivo spento.",
    example: "Esempio: quando apri una foto, il file viene letto dall’SSD, caricato in memoria e mostrato dalla scheda grafica sul monitor.",
    exercise: lab ? "Laboratorio: osserva un PC o una scheda illustrata, assegna ogni componente alla sua funzione e completa una tabella input–elaborazione–output." : "Esercizio: collega cinque componenti alla loro funzione e spiega perché RAM e SSD non sono intercambiabili.",
    deepDive: "Approfondimento: confronta un computer da ufficio e uno per il montaggio video. Quali componenti cambieresti e per quale motivo?"
  };
  if (/sicurezza|malware|phishing|password|autenticazione/.test(t)) return {
    explanation: lab ? undefined : "La sicurezza digitale nasce da più livelli: riconoscere i rischi, usare credenziali robuste, aggiornare i dispositivi e avere un piano per recuperare i dati.",
    example: "Esempio: un messaggio urgente che chiede di cliccare un link e confermare la password va verificato dal sito ufficiale, non dal collegamento ricevuto.",
    exercise: lab ? "Laboratorio: classifica dieci messaggi simulati come affidabili, sospetti o fraudolenti e annota gli indizi usati per decidere." : "Esercizio: crea una passphrase unica, indica dove la conserveresti in sicurezza e scrivi tre segnali tipici di phishing.",
    deepDive: "Approfondimento: spiega perché una password lunga e unica protegge più di una password breve riutilizzata, anche se entrambe sembrano difficili."
  };
  if (/file|cartell|backup|archivio|documenti avanzati|modelli|stili|sommario/.test(t)) return {
    explanation: lab ? undefined : "Organizzare i file significa progettare nomi, cartelle e versioni in modo che un’altra persona possa trovare e capire il lavoro senza chiedere spiegazioni.",
    example: "Esempio: `2026-10-15_relazione-reti_v02.docx` comunica data, contenuto e versione meglio di `lavoro-finale-nuovo.docx`.",
    exercise: lab ? "Laboratorio: crea una struttura di cartelle per una ricerca di classe, rinomina cinque file e prepara una copia di backup in una posizione diversa." : "Esercizio: progetta una convenzione di nomi per un progetto di gruppo e applicala a una cartella con almeno otto file.",
    deepDive: "Approfondimento: prova a recuperare una versione precedente di un documento e descrivi quale informazione ti ha permesso di trovarla."
  };
  if (/software|sistema operativo/.test(t)) return {
    explanation: lab ? undefined : "Il sistema operativo coordina hardware, applicazioni, utenti e file. Capire questa mediazione aiuta a scegliere impostazioni corrette e a risolvere problemi senza procedere per tentativi casuali.",
    example: "Esempio: per installare un programma controlla sistema compatibile, origine del file, permessi richiesti e possibilità di disinstallarlo.",
    exercise: lab ? "Laboratorio: esplora le impostazioni di un computer, individua gestione file, utenti, aggiornamenti e dispositivi, poi documenta il percorso per raggiungerle." : "Esercizio: distingui sistema operativo, applicazione e driver usando tre esempi e descrivi quale componente interviene quando una periferica non funziona.",
    deepDive: "Approfondimento: confronta due sistemi operativi su una stessa attività e annota quali passaggi cambiano e quali restano uguali."
  };
  if (/rete|internet|indirizzi|ricercare informazioni|copyright|fonti/.test(t)) return {
    explanation: lab ? undefined : "La rete collega dispositivi attraverso regole comuni. Internet permette di raggiungere servizi e informazioni, ma trovare una pagina non significa automaticamente trovare una fonte affidabile.",
    example: "Esempio: per verificare una notizia confronta autore, data, fonte primaria e almeno un’altra pubblicazione indipendente.",
    exercise: lab ? "Laboratorio: disegna la rete del laboratorio indicando dispositivi, punto di accesso e percorso verso Internet; poi verifica due fonti su uno stesso tema." : "Esercizio: costruisci una scheda di valutazione per una pagina web con autore, data, scopo, prove e possibili conflitti di interesse.",
    deepDive: "Approfondimento: distingui URL, dominio e pagina specifica usando tre indirizzi reali e spiega quale parte identifica il sito."
  };
  if (/e-mail|email|cloud|condivisione|collaborare/.test(t)) return {
    explanation: lab ? undefined : "Comunicare e collaborare online richiede destinatari corretti, messaggi leggibili, permessi adeguati e una traccia delle modifiche.",
    example: "Esempio: usa Cc per chi deve essere informato, Ccn quando gli indirizzi non devono essere visibili e un oggetto che anticipi l’azione richiesta.",
    exercise: lab ? "Laboratorio: scrivi una e-mail con allegato, condividi un documento con permesso di sola lettura e poi modifica il permesso motivando la scelta." : "Esercizio: riscrivi un messaggio confuso trasformandolo in una e-mail con oggetto, saluto, richiesta precisa e chiusura.",
    deepDive: "Approfondimento: confronta modifica, commento e visualizzazione in un documento condiviso e scegli il permesso minimo necessario per tre casi."
  };
  if (/privacy|identità digitale|reputazione|cittadinanza|benessere|impronta/.test(t)) return {
    explanation: lab ? undefined : "Essere cittadini digitali significa scegliere come comunicare, quali dati condividere e come verificare le conseguenze delle proprie azioni nel tempo.",
    example: "Esempio: prima di pubblicare una foto chiediti chi potrà vederla, se contiene dati di altre persone e se saresti ancora d’accordo tra un anno.",
    exercise: lab ? "Laboratorio: analizza tre situazioni online, individua dati personali e possibili conseguenze, quindi riscrivi ogni comportamento in una forma più prudente e rispettosa." : "Esercizio: costruisci una checklist prima della condivisione: destinatari, dati visibili, permessi, durata, fonte e possibilità di rimuovere il contenuto.",
    deepDive: "Approfondimento: discuti la differenza tra ciò che è tecnicamente possibile pubblicare e ciò che è opportuno pubblicare, motivando con un caso concreto."
  };
  if (/videoscrittura|formattazione|immagini|tabelle|didascalie|relazione digitale/.test(t)) return {
    explanation: lab ? undefined : "Un documento efficace separa contenuto e forma: titoli, paragrafi, stili, immagini e tabelle devono aiutare il lettore a orientarsi.",
    example: "Esempio: applicare lo stile Titolo 1 rende coerenti aspetto e struttura e permette di generare un sommario senza riscriverlo a mano.",
    exercise: lab ? "Laboratorio: impagina una relazione di una pagina con titolo, due sezioni, immagine con didascalia, elenco e fonte; controlla l’ordine di lettura." : "Esercizio: trasforma una pagina di testo senza formattazione in un documento leggibile usando stili, spazio bianco e una gerarchia chiara.",
    deepDive: "Approfondimento: verifica il documento con la modalità di navigazione o struttura e correggi almeno due elementi che ostacolano la lettura."
  };
  if (/fogli|formule|funzioni|grafici|dati/.test(t)) return {
    explanation: lab ? undefined : "Un foglio di calcolo organizza dati e regole di calcolo. Una formula deve essere leggibile, verificabile e separata dai dati che utilizza.",
    example: "Esempio: per il totale di una colonna usa una funzione di somma invece di aggiungere manualmente ogni valore; se i dati cambiano, il risultato si aggiorna.",
    exercise: lab ? "Laboratorio: registra dieci valori, calcola totale e media, ordina i dati e crea un grafico scegliendo il tipo più adatto alla domanda." : "Esercizio: costruisci un foglio per il budget di una classe con intestazioni, formule, controllo di un risultato e una breve interpretazione del grafico.",
    deepDive: "Approfondimento: modifica una cella e osserva quali risultati cambiano. Spiega la differenza tra riferimento relativo e assoluto."
  };
  if (/presentazioni|slide|presentare/.test(t)) return {
    explanation: lab ? undefined : "Una presentazione non è un documento da leggere: è una sequenza visiva che sostiene una spiegazione orale e porta il pubblico verso un’idea alla volta.",
    example: "Esempio: una slide con una frase chiave, un’immagine pertinente e una fonte è più efficace di una pagina piena di testo letto dal relatore.",
    exercise: lab ? "Laboratorio: crea tre slide sul tema assegnato, prova a presentarle in due minuti e raccogli un feedback su leggibilità, ritmo e fonti." : "Esercizio: riduci un paragrafo a una scaletta di tre slide, indicando per ciascuna messaggio principale e supporto visivo.",
    deepDive: "Approfondimento: prova la stessa presentazione con pubblico diverso e annota quale esempio o spiegazione devi adattare."
  };
  if (/database/.test(t)) return {
    explanation: lab ? undefined : "Un database organizza informazioni secondo una struttura: tabelle, campi e record permettono di evitare ripetizioni e recuperare solo i dati necessari.",
    example: "Esempio: in un archivio della biblioteca il codice del libro identifica un record, mentre autore, titolo e disponibilità sono campi distinti.",
    exercise: lab ? "Laboratorio: progetta una tabella per una biblioteca scolastica, inserisci record di prova e formula tre domande a cui rispondere con una query." : "Esercizio: distingui tabella, campo, record e chiave in un piccolo archivio di libri e indica un errore di progettazione da evitare.",
    deepDive: "Approfondimento: individua un’informazione ripetuta in due tabelle e spiega come ridurresti la duplicazione."
  };
  if (/algoritmi|scratch|micro:bit|flowgorithm|sequenze|cicli|condizioni|variabili|input|casualità|debugging/.test(t)) return {
    explanation: lab ? undefined : "Un algoritmo è una sequenza di istruzioni verificabili. Nei programmi, eventi, condizioni, cicli, variabili e messaggi permettono di trasformare un’idea in un comportamento osservabile.",
    example: "Esempio: per un gioco descrivi prima regole, input, obiettivo e condizioni di vittoria; solo dopo scegli i blocchi o il linguaggio.",
    exercise: lab ? "Laboratorio: realizza un piccolo programma, prova almeno tre casi, annota un errore trovato e correggilo senza cambiare l’obiettivo." : "Esercizio: scrivi l’algoritmo in passi, trasformalo in pseudocodice e indica quali dati devono diventare variabili.",
    deepDive: "Approfondimento: chiedi a un compagno di usare il programma senza spiegazioni e registra dove l’interfaccia o le istruzioni non sono abbastanza chiare."
  };
  if (/accoglienza|progetto|project|demo day|portfolio|verifica|ripasso|restituzione/.test(t)) return {
    explanation: lab ? undefined : "Rivedere e documentare il lavoro permette di trasformare una serie di attività in competenze dimostrabili: obiettivo, procedura, risultato e riflessione devono stare insieme.",
    example: "Esempio: una buona restituzione mostra una prova del prodotto, racconta una scelta e indica cosa miglioreresti in una seconda versione.",
    exercise: lab ? "Laboratorio: completa la consegna, usa una checklist, raccogli il feedback di un pari e prepara una versione migliorata con breve diario delle modifiche." : "Esercizio: costruisci una mappa dei concetti del modulo e risolvi un caso pratico spiegando ogni scelta.",
    deepDive: "Approfondimento: confronta il risultato con i criteri iniziali e formula un obiettivo misurabile per il prossimo lavoro."
  };
  return null;
}

function detailFor(theme, year, index) {
  const lower = theme.toLowerCase();
  const mode = /project|progetto|demo day/i.test(theme)
    ? "project"
    : /verifica|ripasso|restituzione/i.test(theme)
      ? "review"
      : lessonModes[index % lessonModes.length];
  const isLab = mode === "laboratory" || mode === "practice" || mode === "project";
  const focus = theme.replace(/:.*$/, "").toLowerCase();
  const explanation = isLab
    ? undefined
    : `In questa tappa costruiamo una base comune su ${focus}. Partiamo da un caso vicino alla vita scolastica, osserviamo come funziona e poi lo trasformiamo in una procedura che puoi ripetere in autonomia.`;
  const example = `Esempio: prima di iniziare, descrivi il problema in una frase, scegli lo strumento adatto e controlla il risultato. Per ${focus}, annota che cosa cambia quando modifichi un solo elemento alla volta.`;
  const exercise = isLab
    ? `Laboratorio: lavora in coppia su ${focus}. Completa una prova, salva il risultato con un nome ordinato, scambia il lavoro con un compagno e usa una checklist per trovare un miglioramento.`
    : `Esercitazione: crea una piccola scheda su ${focus} con tre parole chiave, un esempio concreto e una procedura in almeno quattro passaggi. Concludi indicando un errore da evitare.`;
  const deepDive = index % 3 === 2
    ? `Approfondimento: confronta due strategie per ${focus}. Quale richiede meno passaggi? Quale è più facile da spiegare a un compagno? Motiva la scelta con una prova.`
    : undefined;
  const phases = mode === "laboratory" || mode === "project"
    ? [{ label: "Brief e ruoli", minutes: 10 }, { label: mode === "project" ? "Sviluppo del prodotto" : "Laboratorio operativo", minutes: 70 }, { label: "Controllo del prodotto", minutes: 20 }, { label: "Restituzione", minutes: 20 }]
    : mode === "practice"
      ? [{ label: "Richiamo dell’obiettivo", minutes: 15 }, { label: "Esercitazione guidata", minutes: 55 }, { label: "Sfida autonoma", minutes: 35 }, { label: "Condivisione", minutes: 15 }]
      : mode === "review"
        ? [{ label: "Mappa dei concetti", minutes: 20 }, { label: "Sfida di ripasso", minutes: 45 }, { label: "Caso pratico", minutes: 35 }, { label: "Restituzione", minutes: 20 }]
        : [{ label: "Attivazione", minutes: 10 }, { label: "Spiegazione e esempio", minutes: 30 }, { label: "Prova guidata", minutes: 45 }, { label: "Esercizio e restituzione", minutes: 35 }];
  const bookActivity = mode === "project"
    ? "Compito di realtà"
    : mode === "laboratory"
      ? "Palestra delle competenze"
      : mode === "review"
        ? "Test in velocità + Flash Card"
        : mode === "practice"
          ? "Esercizio flash + Palestra delle competenze"
          : "Scheda tecnica + esercizio guidato";
  const platforms = /fogli|document|presentazioni|slide|cloud|e-mail|email|condivisione|collaborare/.test(lower)
    ? ["Windows 11 / Microsoft 365", "Google Workspace"]
    : /scratch|micro:bit|flowgorithm|algoritmi/.test(lower)
      ? ["Scratch 3.0", "micro:bit", "Flowgorithm"]
      : ["Windows 11", "Computer del laboratorio"];
  const detail = {
    kind: mode,
    explanation,
    example,
    exercise,
    deepDive,
    competence: isLab
      ? "Realizzare un prodotto digitale seguendo una procedura, collaborando e documentando le scelte."
      : "Comprendere, spiegare e applicare il concetto in una situazione concreta, controllando il risultato.",
    evidence: isLab
      ? "Prodotto salvato, checklist completata e breve restituzione orale o scritta."
      : "Scheda di sintesi, procedura svolta e risposta motivata a un caso pratico.",
    materials: ["Computer", "Scheda operativa", "Quaderno o documento condiviso"],
    phases,
    quickCheck: `Controllo rapido: in una frase, qual è la scelta più importante quando lavori su ${focus}? Motiva la risposta con un indizio osservabile.`,
    flashCard: `${theme}: fronte — definisci il concetto o la procedura; retro — descrivi un esempio, un errore frequente e il controllo da fare.`,
    bookActivity,
    platforms,
    facilitatedTask: `Versione facilitata: affronta ${focus} in tre passi — osserva un esempio, esegui una sola operazione alla volta e usa la checklist prima di consegnare.`,
    ...topicText(theme, mode),
    objectives: [
      `Riconoscere gli elementi essenziali di ${focus}`,
      isLab ? `Eseguire una procedura guidata e documentare il risultato` : `Spiegare con parole proprie quando e perché usare ${focus}`,
      index % 2 === 0 ? "Controllare il lavoro e correggere almeno un errore" : "Collaborare rispettando ruoli, tempi e materiali"
    ],
    activity: isLab
      ? `Laboratorio operativo su ${focus}: prova, osserva, salva e racconta il procedimento.`
      : `Spiegazione breve, esempio guidato e prova autonoma su ${focus}.`
  };

  const fileKey = `${year}-${String(index + 1).padStart(2, "0")}`;
  const custom = bsmartMaterials[fileKey];
  if (custom?.materials) {
    detail.materials = custom.materials;
  }
  return detail;
}

const bsmartMaterials = {
  "1-02": { cta: [{ label: "Scheda Hardware (PDF)", href: "/resources/anno1/settimana-02/A1_U2_2_ELEMENTI_TASTIERA.pdf" }], materials: ["Computer", "Scheda componenti hardware", "Elementi della tastiera"] },
  "1-03": { cta: [{ label: "Scheda Logica (PDF)", href: "/resources/anno1/settimana-03/A1_U1_1_NEGAZIONE_LOGICA_NOT.pdf" }], materials: ["Computer", "Scheda logica NOT", "Laboratorio informatica"] },
  "1-04": { cta: [{ label: "Scheda Pseudolinguaggi (PDF)", href: "/resources/anno1/settimana-04/A1_U1_2_UTILIZZO_PSEUDOLINGUAGGI.pdf" }], materials: ["Computer", "Guida agli pseudolinguaggi", "Quaderno di lavoro"] },
  "1-05": { cta: [{ label: "Scheda Mobile & Archiviazione", href: "/resources/anno1/settimana-05/A1_U2_3_SISTEMI_OPERATIVI_DISPOSITIVI_MOBILI.pdf" }], materials: ["Computer", "Dispositivi mobili e memorie di massa"] },
  "1-06": { cta: [{ label: "Guida Software Libero (PDF)", href: "/resources/anno1/settimana-06/A1_U2_4_SOFTWARE_LIBERO_SOFTWARE_PROPRIETARIO.pdf" }], materials: ["Computer", "Tabelle comparative licenze software"] },
  "1-07": { cta: [{ label: "Guida Accesso Rapido (PDF)", href: "/resources/anno1/settimana-07/A1_U3_3_UTILIZZARE_ACCESSO_RAPIDO.pdf" }], materials: ["Computer", "Esplora File di Windows 11", "Cartella esercizi"] },
  "1-08": { cta: [{ label: "Scheda Tipi di Backup (PDF)", href: "/resources/anno1/settimana-08/A1_U3_6_ALTRI_TIPI_BACKUP.pdf" }], materials: ["Computer", "Unità esterna / Cloud", "Checklist di backup"] },
  "1-10": { cta: [{ label: "Scheda Web & Domini (PDF)", href: "/resources/anno1/settimana-10/A2_U1_3_DOMINI_PRIMO_LIVELLO.pdf" }], materials: ["Computer", "Browser web", "Scheda architettura Internet"] },
  "1-13": { cta: [{ label: "Guida E-mail Riservate (PDF)", href: "/resources/anno1/settimana-13/B1_U2_1_INVIARE_MAIL_RISERVATE.pdf" }], materials: ["Computer", "Client di posta / Webmail", "Modello formale di comunicazione"] },
  "1-14": { cta: [{ label: "Scheda Rischi Online (PDF)", href: "/resources/anno1/settimana-14/A2_U2_1_RISCHI_USO_STRUMENTI_ONLINE.pdf" }], materials: ["Computer", "Casi di studio e netiquette"] },
  "1-15": { cta: [{ label: "Guida Dropbox & Cloud (PDF)", href: "/resources/anno1/settimana-15/B2_U1_1_INFOCARD_ARCHIVIARE_CONDIVIDERE_DROPBOX.pdf" }], materials: ["Computer", "Google Drive / OneDrive / Dropbox", "Account studente"] },
  "1-16": { cta: [{ label: "Scheda Web Apps (PDF)", href: "/resources/anno1/settimana-16/A2_U2_1_STRUTTURA_APPLICAZIONI_WEB.pdf" }], materials: ["Computer", "Ambienti web collaborativi"] },
  "1-17": { cta: [{ label: "Scarica Pacchetto Word (.zip)", href: "/resources/anno1/settimana-17/1-Word_processor.zip" }], materials: ["Computer", "Microsoft Word / Google Documenti", "Pacchetto file di lavoro Word (.zip)"] },
  "1-18": { cta: [{ label: "Scheda Paragrafi (PDF)", href: "/resources/anno1/settimana-18/B3_U1_4_MODALITA_CORRETTE_SPAZIARE_PARAGRAFI.pdf" }], materials: ["Computer", "Documento non formattato di prova"] },
  "1-19": { cta: [{ label: "Guida Immagini & Tabelle (PDF)", href: "/resources/anno1/settimana-19/B3_U2_1_CREARE_IMMAGINI_EFFETTO.pdf" }], materials: ["Computer", "Tabelle e immagini didattiche"] },
  "1-20": { cta: [{ label: "Scheda Filigrana e Stili (PDF)", href: "/resources/anno1/settimana-20/B3_U2_5_AGGIUNGERE_FILIGRANA_GOOGLE.pdf" }], materials: ["Computer", "Modelli di stile e impaginazione"] },
  "1-21": { cta: [{ label: "Modelli Stile Lettere (.zip)", href: "/resources/anno1/settimana-21/Modelli_stile_lettere.zip" }], materials: ["Computer", "Archivio modelli lettere professionali (.zip)"] },
  "1-22": { cta: [{ label: "Scarica Pacchetto Excel (.zip)", href: "/resources/anno1/settimana-22/2-Foglio_elettronico.zip" }], materials: ["Computer", "Microsoft Excel / Google Fogli", "Dataset e cartelle di lavoro Excel (.zip)"] },
  "1-23": { cta: [{ label: "Scheda Riferimento Misto (PDF)", href: "/resources/anno1/settimana-23/B4_U2_1_RIFERIMENTO_MISTO.pdf" }], materials: ["Computer", "Foglio di calcolo con formule e riferimenti"] },

  "1-24": { cta: [{ label: "Guida Grafici Excel (PDF)", href: "/resources/anno1/settimana-24/B4_U3_2_APPLICAZIONI_FUNZIONE_ARROTONDA.pdf" }], materials: ["Computer", "Tabella dati per diagrammi"] },
  "1-25": { cta: [{ label: "Scheda Messaggi Errore (PDF)", href: "/resources/anno1/settimana-25/B4_U3_1_RICONOSCERE_MESSAGGI_ERRORE.pdf" }], materials: ["Computer", "Foglio di calcolo per collaudo e correzione errori"] },
  "1-26": { cta: [{ label: "Scarica Pacchetto Slide (.zip)", href: "/resources/anno1/settimana-26/B5_Presentazioni.zip" }], materials: ["Computer", "Microsoft PowerPoint / Google Presentazioni", "Pacchetto template slide (.zip)"] },
  "1-28": { cta: [{ label: "Guida SmartArt (PDF)", href: "/resources/anno1/settimana-28/B3_U2_4_INSERIRE_ELABORARE_SMARTART.pdf" }], materials: ["Computer", "Software presentazioni", "Scheda organigrammi e SmartArt"], slideHref: "/slides/anno1/B5_U1_4_INSERIRE_ORGANIGRAMMI_PRESENTAZIONI.pdf" },
  "1-29": { cta: [{ label: "Slide Grafici (PDF)", href: "/slides/anno1/B5_U1_3_INSERIRE_GRAFICI_PRESENTAZIONI.pdf" }], materials: ["Computer", "Software presentazioni", "Slide grafici e tabelle"], slideHref: "/slides/anno1/B5_U1_3_INSERIRE_GRAFICI_PRESENTAZIONI.pdf" },
  "2-02": { cta: [{ label: "Scheda Sicurezza e Reti Sociali", href: "/resources/anno2/settimana-02/A1_U1_2_PERICOLI_SITI_RETI_SOCIALI.pdf" }], materials: ["Computer", "Casi di studio su phishing e sicurezza"] },
  "2-03": { cta: [{ label: "Guida Password Manager (PDF)", href: "/resources/anno2/settimana-03/A2_U2_1_SOFTWARE_GESTIONE_PASSWORD.pdf" }], materials: ["Computer", "Software gestione password e autenticazione"] },
  "2-04": { cta: [{ label: "Scheda Protezione Dati (PDF)", href: "/resources/anno2/settimana-04/A2_U1_2_INFOCARD_DISTRUZIONE_SICURA_DATI_INFOMAZIONI.pdf" }], materials: ["Computer", "Linee guida privacy e distruzione sicura dati"] },
  "2-06": { cta: [{ label: "Scheda Crittografia & Firma (PDF)", href: "/resources/anno2/settimana-06/A2_U2_2_CRITTOGRAFIA.pdf" }], materials: ["Computer", "Esempi di cifratura e verifica firma digitale"] },
  "2-08": { cta: [{ label: "Scarica Pacchetto Word Avanzato (.zip)", href: "/resources/anno2/settimana-08/B1_Word_processor.zip" }], materials: ["Computer", "Microsoft Word", "Dataset stampa unione ed etichette"], slideHref: "/slides/anno2/B1_U3_4_UTILIZZARE_CREAZIONE_GUIDATA_STAMPA_UNIONE.pdf" },
  "2-10": { cta: [{ label: "Pacchetto Fogli Avanzati (.zip)", href: "/resources/anno2/settimana-10/B2_Foglio_elettronico.zip" }], materials: ["Computer", "Microsoft Excel", "Dataset per funzioni logiche e statistiche"] },
  "2-11": { cta: [{ label: "Scarica Archivio Database (.zip)", href: "/resources/anno2/settimana-11/B3_Database.zip" }], materials: ["Computer", "Microsoft Access / LibreOffice Base", "Database starter (.zip)"] },
  "2-17": { cta: [{ label: "Scarica Progetti Scratch 3.0 (.zip)", href: "/resources/anno2/settimana-17/A.1_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Pacchetto progetti starter Scratch (.zip)"] }
};

function buildWeeks(year, themes) {
  return themes.map(([theme, book], index) => {
    const fileKey = `${year}-${String(index + 1).padStart(2, "0")}`;
    const custom = bsmartMaterials[fileKey];
    const studentCta = custom?.cta
      ? [...custom.cta, { label: "Ripassa", href: "#ripasso" }]
      : [{ label: "Apri le risorse", href: "#risorse" }, { label: "Ripassa", href: "#ripasso" }];

    return {
      number: index + 1,
      theme,
      lessons: [{
        id: fileKey,
        title: theme,
        hours: 2,
        book: referenceFor(theme, year, index),
        ...detailFor(theme, year, index),
        game: index === 0 ? "Test diagnostico non valutativo" : "Missione a squadre con quiz rapido",
        studentCta,
        slideHref: custom?.slideHref
      }]
    };
  });
}


import { triennioCurriculum } from "./curriculum-triennio.mjs";

export const curriculum = {
  1: buildWeeks(1, firstYearThemes),
  2: buildWeeks(2, secondYearThemes),
  3: triennioCurriculum[3],
  4: triennioCurriculum[4],
  5: triennioCurriculum[5]
};
