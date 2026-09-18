const firstYearThemes = [
  ["Accoglienza, sicurezza e regole di convivenza nel laboratorio", "Clippy Cloud Plus vol. 1, apertura e sicurezza"],
  ["Basi dell'ergonomia: postura corretta e benessere al PC", "Clippy Cloud Plus vol. 1, sicurezza e postura"],
  ["Account scolastici, password sicure e gestione credenziali", "Clippy Cloud Plus vol. 1, sicurezza e account"],
  ["PC ed esplorazione tangibile: periferiche e connessioni", "Clippy Cloud Plus vol. 1, cap. Hardware"],
  ["Dentro il computer: CPU, RAM e scheda madre essenziale", "Clippy Cloud Plus vol. 1, cap. Hardware"],
  ["Memorie di massa (SSD, HDD, USB) e supporti di memoria", "Clippy Cloud Plus vol. 1, cap. Hardware"],
  ["Uso pratico del computer: desktop, cartella personale e salvataggio", "Clippy Cloud Plus vol. 1, uso operativo"],
  ["Reti locali e Internet: come comunicano i dispositivi", "Clippy Cloud Plus vol. 1, cap. Reti"],
  ["Navigazione web sicura: browser, indirizzi URL e motori di ricerca", "Clippy Cloud Plus vol. 1, cap. Internet"],
  ["Ricerca attiva, fonti affidabili e riconoscimento fake news", "Clippy Cloud Plus vol. 1, cap. Internet"],
  ["Copyright, immagini libere e uso etico dei contenuti", "Clippy Cloud Plus vol. 1, cap. Internet e cittadinanza"],
  ["Cineforum The Social Dilemma (Parte 1): algoritmi e attenzione", "Educazione civica e cittadinanza digitale"],
  ["Cineforum The Social Dilemma (Parte 2): debriefing e screen time", "Educazione civica e cittadinanza digitale"],
  ["Compito di realtà: indagine di classe su notifiche e smartphone", "Compiti di realtà e cittadinanza digitale"],
  ["Posta elettronica a scuola: scrivere una mail formale", "Clippy Cloud Plus vol. 1, cap. E-mail"],
  ["Gestione e-mail: allegati, netiquette e riconoscimento spam", "Clippy Cloud Plus vol. 1, cap. E-mail"],
  ["Cloud di base: salvare e organizzare file su Google Drive", "Clippy Cloud Plus vol. 1, cap. Cloud"],
  ["Lavoro cooperativo su documenti condivisi in tempo reale", "Clippy Cloud Plus vol. 1, cap. Cloud e collaborazione"],
  ["Videoscrittura: primi passi con paragrafi e allineamenti", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Formattazione chiara: elenchi puntati, grassetto e leggibilità", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Elementi visivi nel testo: tabelle semplici e immagini", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Stili di testo, sommario automatico e ordine del documento", "Clippy Cloud Plus vol. 1, cap. Word"],
  ["Compito di realtà: impaginare una mini-guida scolastica", "Clippy Cloud Plus vol. 1, compito di realtà"],
  ["Propedeutica logica: interruttori ON/OFF, VERO/FALSO e condizioni", "Clippy Cloud Plus vol. 1, logica e condizioni"],
  ["Foglio di calcolo: l'interfaccia, le celle e i tipi di dato", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Formule aritmetiche fondamentali (+, -, *, /)", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Riferimenti di cella: capire il copia-incolla e il simbolo $", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Funzioni base: SOMMA, MEDIA, CONTA.VALORI, MIN e MAX", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Rappresentazione visiva: grafici a barre e a torta dei dati screen time", "Clippy Cloud Plus vol. 1, cap. Fogli di calcolo"],
  ["Presentazioni: idee visive, poco testo e contrasto efficace", "Clippy Cloud Plus vol. 1, cap. Presentazioni"],
  ["Slide multimediali: immagini coerenti e tabelle di sintesi", "Clippy Cloud Plus vol. 1, cap. Presentazioni"],
  ["Public speaking: esporre le slide in 3 minuti con chiarezza", "Clippy Cloud Plus vol. 1, compito di realtà"],
  ["Project work finale: portfolio digitale e autovalutazione", "Clippy Cloud Plus vol. 1, verifica finale"]
];

const secondYearThemes = [
  ["Ripasso Videoscrittura: formattazione avanzata, stili e layout", "Clippy Cloud Plus vol. 2, ripasso operativo"],
  ["Ripasso Fogli di Calcolo: formule aritmetiche, riferimenti $ e percentuali", "Clippy Cloud Plus vol. 2, ripasso operativo"],
  ["Architettura del Sistema Operativo: kernel, processi e risorse", "Clippy Cloud Plus vol. 2, cap. Sistema operativo"],
  ["Interfaccia Utente del SO: grafica GUI vs riga di comando CLI", "Clippy Cloud Plus vol. 2, cap. Sistema operativo"],
  ["Il File System approfondito: dischi, percorsi, permessi e backup", "Clippy Cloud Plus vol. 2, cap. Sistema operativo"],
  ["Sicurezza e minacce: riconoscere malware, phishing e ingegneria sociale", "Clippy Cloud Plus vol. 2, cap. Sicurezza"],
  ["Cineforum The Great Hack (Parte 1): Cambridge Analytica e profilazione", "Educazione civica e privacy"],
  ["Cineforum The Great Hack (Parte 2): valore dei dati personali e GDPR", "Educazione civica e privacy"],
  ["Autenticazione a due fattori (2FA) e app authenticator", "Clippy Cloud Plus vol. 2, cap. Sicurezza"],
  ["Stampa unione: generare attestati ed etichette personalizzate", "Clippy Cloud Plus vol. 2, cap. Documenti"],
  ["Logica booleana: porte logiche (AND, OR, NOT) e tabelle di verità", "Clippy Cloud Plus vol. 2, logica e condizioni"],
  ["Fogli di calcolo: prendere decisioni con la funzione =SE()", "Clippy Cloud Plus vol. 2, cap. Fogli"],
  ["Fogli di calcolo: controlli multipli con =E(), =O() e allarmi condizionali", "Clippy Cloud Plus vol. 2, cap. Fogli"],
  ["Compito di realtà aziendale: gestione contabile e cruscotto integrato", "Clippy Cloud Plus vol. 2, compiti di realtà"],
  ["Verifica intermedia pratica su SO, Fogli con SE e Sicurezza", "Clippy Cloud Plus vol. 2, verifica dei moduli"],
  ["Database relazionali: concetti base, tabelle, campi e record", "Clippy Cloud Plus vol. 2, cap. Database"],
  ["Database: tipi di dato, chiave primaria e query di selezione semplici", "Clippy Cloud Plus vol. 2, cap. Database"],
  ["Benessere digitale: gestire le notifiche, tempo schermo e impronta ecologica", "Clippy Cloud Plus vol. 2, cap. Cittadinanza digitale"],
  ["Dal problema all'algoritmo: passi logici e diagrammi di flusso", "Programmazione a blocchi, cap. Scratch"],
  ["Strutture di controllo algoritmiche: sequenza, selezione e cicli", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch 3.0: l'ambiente di lavoro, sprite, sfondi ed eventi di avvio", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch: muovere gli sprite, coordinate X/Y e cambi di costume", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch: ripetizioni e cicli (ripeti 10 volte, per sempre)", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch: decisioni logiche con blocchi SE... ALLORA e sensori", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch: variabili per contare punti, vite e tempo di gioco", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch: inviare messaggi (broadcast) per far comunicare gli sprite", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch: caccia al bug (debugging guidato a squadre)", "Programmazione a blocchi, cap. Scratch"],
  ["Scratch Project Work: ideazione e storyboard del videogioco", "Programmazione a blocchi, progetto finale"],
  ["Scratch Project Work: programmazione del livello di gioco", "Programmazione a blocchi, progetto finale"],
  ["Scratch Project Work: aggiunta suoni, effetti e rifiniture", "Programmazione a blocchi, progetto finale"],
  ["Scratch Project Work: test incrociato tra compagni e miglioramenti", "Programmazione a blocchi, progetto finale"],
  ["Consolidamento finale competenze e completamento portfolio", "Clippy Cloud Plus vol. 2, compiti di realtà"],
  ["Demo Day Scratch: presentazione finale e traguardi raggiunti", "Programmazione a blocchi, verifica finale"]
];

const lessonModes = ["concept", "laboratory", "practice", "concept", "laboratory", "review"];

function referenceFor(theme, year, index) {
  const t = theme.toLowerCase();
  if (/social dilemma|great hack|cittadinanza digitale|educazione civica|screen time/.test(t)) {
    return `Educazione Civica & DigComp 2.2 · Cittadinanza Digitale e Consapevolezza dei Dati`;
  }
  if (year === 2 && /algoritmi|scratch|sequenze|cicli|condizioni|variabili|input|casualità|debugging|micro:bit|flowgorithm|progetto|storyboard|stage|demo day/.test(t)) {
    return "Programmazione a blocchi · Scratch 3.0, micro:bit e Flowgorithm";
  }
  if (/cloud|condivisione|collaborare|compito|portfolio|project/.test(t)) {
    return `Clippy Cloud Plus vol. ${year} · Macroarea C — Cloud e compiti di realtà`;
  }
  if (year === 2 && /sicurezza|malware|phishing|password|2fa|authenticator|privacy|identità|reputazione|benessere|impronta/.test(t)) {
    return "Clippy Cloud Plus vol. 2 · Macroarea A — Operare in sicurezza";
  }
  if (year === 2 && /sistema operativo|kernel|processi|file system|interfaccia utente|riga di comando|powershell|gui vs cli/.test(t)) {
    return "Clippy Cloud Plus vol. 2 · Macroarea A — Architettura del Sistema Operativo";
  }
  if (year === 2 && /ripasso videoscrittura|ripasso fogli|database|document|modelli|stili|sommario|fogli|formule|funzioni|grafici|stampa unione|porte logiche|tabelle di verità|logica booleana/.test(t)) {
    return "Clippy Cloud Plus vol. 2 · Macroarea B — Progettare e organizzare";
  }
  if (year === 2 && /cittadinanza|ripasso|verifica|restituzione|traguardi/.test(t)) {
    return "Clippy Cloud Plus vol. 2 · Macroarea C — Creare e sviluppare competenze";
  }
  if (/document|videoscrittura|formattazione|immagini|tabelle|didascalie|relazione|fogli|formule|funzioni|grafici|presentazioni|slide|presentare|logica|interruttori/.test(t)) {
    return `Clippy Cloud Plus vol. ${year} · Macroarea B — Progettare e comunicare`;
  }
  if (/e-mail|email|ricercare|copyright|fonti|internet|indirizzi|cittadinanza|privacy|identità|reputazione|benessere|impronta|ergonomia|regole/.test(t)) {
    return `Clippy Cloud Plus vol. ${year} · Macroarea B/C — Comunicare, collaborare e cittadinanza digitale`;
  }
  return `Clippy Cloud Plus vol. ${year} · Macroarea A — Conoscere e operare`;
}

function topicText(theme, mode) {
  const t = theme.toLowerCase();
  const lab = mode === "laboratory" || mode === "practice" || mode === "project";

  // Cineforum The Social Dilemma (Anno 1 Settimane 12-14)
  if (/social dilemma|notifiche e smartphone/.test(t)) return {
    explanation: lab ? undefined : "Il documentario 'The Social Dilemma' svela come le piattaforme social siano progettate da ingegneri e psicologi per massimizzare il tempo speso sullo schermo attraverso notifiche persuasive e profilazione degli utenti.",
    example: "Esempio quotidiano: la notifica con punto rosso o il refresh a scorrimento (pull-to-refresh) sfruttano lo stesso principio delle slot machine per creare attesa e dipendenza.",
    exercise: lab ? "Laboratorio di classe: 1) Analizzate la schermata 'Tempo di utilizzo' o 'Benessere digitale' del vostro smartphone; 2) Annotate ore giornaliere, numero di sblocchi e notifiche ricevute; 3) Raccogliete i dati anonimi in una tabella per l'indagine di classe." : "Esercizio guidato: individua 3 tecniche con cui le app catturano la tua attenzione e scrivi 3 strategie pratiche per ridurre le distrazioni (es. togliere le notifiche non essenziali).",
    deepDive: "Approfondimento: la frase celebre del film recita 'Se non stai pagando per il prodotto, allora il prodotto sei tu'. Cosa significa concretamente per chi usa Instagram o TikTok?"
  };

  // Cineforum The Great Hack (Anno 2 Settimane 7-8)
  if (/great hack|cambridge analytica|valore dei dati/.test(t)) return {
    explanation: lab ? undefined : "'The Great Hack' racconta lo scandalo di Cambridge Analytica, dove i dati di decine di milioni di utenti Facebook sono stati raccolti senza consenso per creare profili psicografici e influenzare decisioni politiche e commerciali.",
    example: "Esempio quotidiano: un banale quiz sulla personalità ('Che animale sei?') può servire in realtà a estrarre la lista dei tuoi 'Mi piace' e profilare le tue vulnerabilità emotive.",
    exercise: lab ? "Laboratorio a coppie: 1) Accedete alla sezione privacy del vostro account principale (Google o social); 2) Verificate la cronologia delle posizioni e le categorie pubblicitarie associate al vostro profilo; 3) Disattivate la profilazione personalizzata e controllate i permessi concessi alle app terze." : "Esercizio guidato: analizza la differenza tra un dato personale comune (es. nome o email) e un dato sensibile (es. opinioni politiche o salute) secondo il GDPR.",
    deepDive: "Approfondimento: perché i dati personali sono definiti 'il petrolio del XXI secolo'? In che modo i dati aggregati possono alterare il dibattito democratico?"
  };

  // Architettura del Sistema Operativo & CLI (Anno 2 Settimane 3-5)
  if (/architettura del sistema operativo|interfaccia utente del so|il file system approfondito|kernel.*processi|grafica gui vs riga di comando/.test(t)) return {
    explanation: lab ? undefined : "Il Sistema Operativo è il software fondamentale che gestisce le risorse fisiche (CPU, RAM, dischi, periferiche) tramite il Kernel e offre all'utente due modalità di dialogo: l'interfaccia grafica (GUI) e la riga di comando (CLI / PowerShell).",
    example: "Esempio quotidiano: quando apri 'Gestione Attività' (Task Manager) con Ctrl+Shift+Esc puoi vedere esattamente quanti processi sono attivi e quanta RAM occupa ciascuna app.",
    exercise: lab ? "Laboratorio da terminale: 1) Aprite PowerShell o il Prompt dei comandi; 2) Eseguite i comandi base di navigazione: `cd`, `dir` (o `ls`), `mkdir Prova` e `tree`; 3) Esplorate la struttura ad albero delle directory e create un file con percorsi relativi e assoluti." : "Esercizio guidato: confronta i vantaggi della GUI (intuitiva, visiva) con quelli della CLI (veloce, automatizzabile con script) e mappa la gerarchia dell'albero cartelle di sistema.",
    deepDive: "Approfondimento: qual è la differenza tra un processo (programma in esecuzione) e un thread? Perché un blocco di un'app non deve far crashare l'intero sistema operativo?"
  };

  // Ripasso Videoscrittura & Fogli 2° Anno (Settimane 1-2)
  if (/ripasso videoscrittura|ripasso fogli/.test(t)) return {
    explanation: lab ? undefined : "Ripartire con il piede giusto in 2ª richiede di consolidare gli standard professionali di videoscrittura (stili gerarchici, tabelle pulite, impaginazione conforme) e del calcolo tabellare (formule con percentuali e riferimenti assoluti con $).",
    example: "Esempio quotidiano: una fattura o preventivo commerciale deve calcolare imponibile, IVA al 22% e totale in automatico bloccando la cella dell'aliquota con `$B$1`.",
    exercise: lab ? "Laboratorio ripasso: 1) Aprite il documento o foglio fornito dal docente; 2) Applicate le correzioni di layout professionale; 3) Completate il calcolo automatico con formule e salvate il deliverable in PDF/A." : "Esercizio guidato: individua e correggi gli errori di impaginazione e formula nella scheda di ripasso (riferimento assoluto mancante, interlinea disomogenea, font non standard).",
    deepDive: "Approfondimento: perché nelle aziende si usano modelli pre-impostati (.xltx / .dotx) invece di duplicare vecchi file con il rischio di sovrascrivere dati riservati?"
  };

  // Uso pratico del computer 1° anno (Settimana 7)
  if (/uso pratico del computer|desktop.*cartella personale/.test(t)) return {
    explanation: lab ? undefined : "Saper usare il PC a scuola significa sapere dove si trovano i propri file: creare la cartella personale di laboratorio, salvare con nomi ordinati e non lasciare file sparsi sul desktop è la base dell'ordine informatico.",
    example: "Esempio quotidiano: salvare in `D:\\Studenti\\1N\\Rossi_Mario` garantisce di ritrovare i compiti a ogni lezione, mentre salvarli sul desktop pubblico rischia la cancellazione alla disconnessione.",
    exercise: lab ? "Laboratorio pratico: 1) Accendete il PC ed esplorate il desktop; 2) Create la cartella personale con la convenzione `Cognome_Nome_1N`; 3) Create un file di testo di benvenuto, salvatelo nella cartella e verificate il percorso completo." : "Esercizio guidato: scrivi la procedura passo-passo per creare una nuova cartella, rinominarla correttamente e verificare le proprietà del file salvato.",
    deepDive: "Approfondimento: qual è la differenza tra salvare un file sul disco rigido locale del PC scolastico e salvarlo nel proprio spazio cloud Google Drive?"
  };

  // 1. Accoglienza, Regole Lab & Convivenza (Anno 1 Settimana 1)
  if (/accoglienza|regole.*laboratorio|convivenza.*laboratorio/.test(t)) return {
    explanation: lab ? undefined : "Il laboratorio di informatica è uno spazio condiviso: avere cura delle postazioni, non mangiare o bere vicino ai PC e rispettare i compagni garantisce il buon lavoro di tutti.",
    example: "Esempio quotidiano: prima di uscire dalla classe si chiudono le applicazioni, si posizionano mouse e tastiera in ordine e si riaccosta la sedia.",
    exercise: lab ? "Laboratorio a piccoli gruppi (3-4 studenti): 1) Leggete il regolamento del laboratorio; 2) Individuate insieme 3 buone abitudini e 3 comportamenti da evitare; 3) Create alla LIM il 'Patto di laboratorio'." : "Esercizio guidato: compila la scheda di autodiagnosi indicando 3 regole fondamentali di sicurezza e condividile con il gruppo.",
    deepDive: "Approfondimento: perché è importante segnalare subito al docente un cavo allentato o un componente malfunzionante anziché provare a ripararlo da soli?"
  };

  // 2. Ergonomia e Postura (Anno 1 Settimana 2)
  if (/ergonomia|postura|benessere al pc/.test(t)) return {
    explanation: lab ? undefined : "L'ergonomia ci insegna a disporre sedia, monitor e tastiera per evitare affaticamento visivo e dolori alla schiena. Seguire la regola del '20-20-20' protegge i nostri occhi.",
    example: "Esempio quotidiano: posiziona lo schermo a circa 50-70 cm (la lunghezza del braccio) e fai in modo che la prima riga di testo sia all'altezza degli occhi.",
    exercise: lab ? "Laboratorio a piccoli gruppi: 1) A turno, simulate la corretta postura sulla postazione; 2) Regolate l'altezza della sedia e l'inclinazione del monitor del compagno; 3) Compilate la checklist ergonomica in 5 punti." : "Esercizio guidato: osserva 4 immagini di posture diverse, individua gli errori posturali e scrivi come correggerli passo dopo passo.",
    deepDive: "Approfondimento: la regola 20-20-20 suggerisce che ogni 20 minuti di schermo si osservi un oggetto a 20 piedi (6 metri) per 20 secondi. Perché rilassa i muscoli oculari?"
  };

  // 3. Password sicure e Account (Anno 1 Settimana 3)
  if (/account scolastici|password sicure|gestione credenziali/.test(t)) return {
    explanation: lab ? undefined : "Una password sicura protegge la nostra identità digitale e i nostri compiti scolastici. È preferibile usare una 'passphrase' (frase di 4 o più parole casuali) anziché date di nascita o nomi propri.",
    example: "Esempio quotidiano: la passphrase `Gatto!Salterino#Verde2026` è facile da ricordare per te, ma impossibile da indovinare per un malintenzionato.",
    exercise: lab ? "Laboratorio a piccoli gruppi: 1) Generate una passphrase sicura usando la tecnica delle 4 parole; 2) Verificate la robustezza su un calcolatore dimostrativo alla LIM; 3) Eseguite la procedura di primo accesso e logout sicuro." : "Esercizio guidato: analizza 5 password comuni (es. '123456', 'Password2024') e riscrivile trasformandole in credenziali robuste.",
    deepDive: "Approfondimento: perché non si deve mai condividere la propria password scolastica nemmeno con il miglior amico e cosa fare se si sospetta sia stata scoperta?"
  };

  // 4. Hardware essenziale & Connessioni
  if (/hardware|pc ed esplorazione|periferiche e connessioni|scheda madre essenziale|dentro il computer/.test(t)) return {
    explanation: lab ? undefined : "Il computer è composto da parti visibili (periferiche come monitor, tastiera e mouse) e componenti interni (CPU che elabora, RAM che memorizza al momento, scheda madre che collega tutto).",
    example: "Esempio quotidiano: quando muovi il mouse (input), la CPU calcola il movimento e il monitor (output) sposta il puntatore sullo schermo in tempo reale.",
    exercise: lab ? "Laboratorio a coppie: 1) Esplorate il PC spento o aperto; 2) Collegate correttamente cavi HDMI, alimentazione e USB; 3) Classificate 6 componenti in una tabella 'Input / Output / Elaborazione'." : "Esercizio guidato: associa 5 componenti hardware alla loro funzione principale con un breve schema riassuntivo a blocchi.",
    deepDive: "Approfondimento: qual è la differenza pratica tra la memoria di lavoro RAM (che si svuota quando spegni il PC) e l'SSD dove restano salvati i tuoi giochi e compiti?"
  };

  // 5. Memorie di massa (SSD, HDD, USB)
  if (/memorie di massa|supporti di memoria|ssd.*hdd/.test(t)) return {
    explanation: lab ? undefined : "Le memorie di massa conservano i nostri file in modo permanente anche a computer spento. Le unità a stato solido (SSD) sono molto più veloci e resistenti dei vecchi hard disk meccanici (HDD).",
    example: "Esempio quotidiano: salvare un compito su una chiavetta USB o sull'SSD interno garantisce di ritrovarlo intatto alla prossima accensione.",
    exercise: lab ? "Laboratorio a coppie: 1) Verificate lo spazio disponibile sull'unità del PC; 2) Collegate una chiavetta USB ed esploratene la cartella; 3) Confrontate la velocità di apertura di un file da SSD vs USB." : "Esercizio guidato: calcola quanti brani musicali o foto possono entrare in una chiavetta USB da 32 GB e compila la tabella delle unità di misura (KB, MB, GB).",
    deepDive: "Approfondimento: perché è importante fare 'Rimozione sicura' prima di scollegare una chiavetta USB dal computer?"
  };

  // 6. Software & Sistema Operativo
  if (/sistema operativo e programmi|software applicativo|il software/.test(t)) return {
    explanation: lab ? undefined : "Il Sistema Operativo (come Windows 11, macOS o Android) è il programma principale che gestisce il computer e permette alle app (Word, browser, giochi) di funzionare.",
    example: "Esempio quotidiano: quando accendi lo smartphone o il PC, il sistema operativo carica la schermata home e ti permette di toccare o cliccare sulle icone.",
    exercise: lab ? "Laboratorio: 1) Aprite le 'Impostazioni' del sistema; 2) Individuate la versione del sistema operativo e la quantità di RAM; 3) Avviate due app contemporaneamente e alternatele con Alt+Tab." : "Esercizio guidato: crea una mappa concettuale che distingue 'Software di Base' (Sistema Operativo) e 'Software Applicativo' (App).",
    deepDive: "Approfondimento: che differenza c'è tra un software a pagamento con licenza e un'applicazione libera/Open Source utilizzabile a scuola?"
  };

  // 7. File System, Cartelle & Nomi chiari
  if (/file system|dischi.*percorsi|gestione file|estensioni.*ordinati|file compressi/.test(t)) return {
    explanation: lab ? undefined : "Il File System è l'armadio digitale del computer: organizza i documenti in cartelle e sottocartelle con percorsi precisi. Assegnare nomi chiari evita di perdere i propri file.",
    example: "Esempio quotidiano: il file `Informatica_Relazione_Rossi_v1.docx` fa capire subito materia, argomento, autore e versione senza doverlo aprire.",
    exercise: lab ? "Laboratorio a coppie: 1) Create in 'Documenti' una cartella `Informatica_2026`; 2) Create 3 sottocartelle (`Lezioni`, `Esercizi`, `Verifiche`); 3) Create un file di testo, salvatelo nella cartella giusta e comprimetelo in un archivio `.zip`." : "Esercizio guidato: correggi 4 nomi di file disordinati (es. `documento_finale_veramente_ultimo.txt`) trasformandoli secondo la corretta convenzione.",
    deepDive: "Approfondimento: cosa indica l'estensione di un file (es. `.docx`, `.pdf`, `.png`) e cosa succede se la si cancella per sbaglio?"
  };

  // 8. Backup semplice & Manutenzione
  if (/backup semplice|manutenzione base/.test(t)) return {
    explanation: lab ? undefined : "Fare una copia di backup significa salvare una copia identica dei file importanti su un secondo supporto (chiavetta o Cloud) per non perderli in caso di guasto o cancellazione accidentale.",
    example: "Esempio quotidiano: se hai la relazione sul PC di scuola e una copia su Google Drive, puoi recuperarla all'istante anche se il PC non si accende.",
    exercise: lab ? "Laboratorio: 1) Selezionate la cartella degli esercizi svolti; 2) Copiatela sulla vostra chiavetta personale o su Drive; 3) Verificate che i file siano integri e leggibili sulla seconda posizione." : "Esercizio guidato: disegna lo schema della regola del backup (PC principale + Copia esterna) e scrivi una checklist di 3 azioni prima della fine dell'ora.",
    deepDive: "Approfondimento: perché il 'Cestino' del computer non è un luogo sicuro dove conservare i file temporanei?"
  };

  // 9. Reti, Internet & Web sicuro
  if (/reti locali|internet: come comunicano|navigazione web sicura|browser.*indirizzi/.test(t)) return {
    explanation: lab ? undefined : "Una rete collega computer e smartphone per scambiare informazioni. Internet è la rete mondiale, mentre il Web è l'insieme dei siti che visitiamo attraverso un'app chiamata browser.",
    example: "Esempio quotidiano: quando ti connetti al Wi-Fi di scuola, il tuo PC entra nella rete locale (LAN) e naviga su Internet usando il browser Edge o Chrome.",
    exercise: lab ? "Laboratorio: 1) Aprite il browser e analizzate la barra degli indirizzi; 2) Riconoscete le parti di un indirizzo URL (`https://`, dominio, pagina); 3) Verificate la presenza del lucchetto di connessione protetta." : "Esercizio guidato: confronta i concetti di 'Browser' (lo strumento per navigare), 'Motore di ricerca' (il sito per cercare) e 'Sito web' (la destinazione).",
    deepDive: "Approfondimento: qual è la differenza tra collegare il computer con il cavo Ethernet e collegarlo via Wi-Fi in termini di stabilità e velocità?"
  };

  // 10. Fake news, Fonti & Copyright
  if (/ricerca attiva|fake news|fonti affidabili|copyright|immagini libere/.test(t)) return {
    explanation: lab ? undefined : "Non tutto ciò che si trova online è vero o liberamente utilizzabile. Imparare a verificare chi ha scritto la notizia e usare immagini con licenza aperta (Creative Commons) è un segno di cittadinanza digitale.",
    example: "Esempio quotidiano: prima di inserire una foto nella tesina, si cerca su siti di immagini gratuite (es. Unsplash, Wikimedia Commons) e si cita l'autore.",
    exercise: lab ? "Laboratorio: 1) Cercate informazioni su un argomento scientifico assegnato; 2) Confrontate 2 siti diversi verificando data e autore; 3) Trovate un'immagine Creative Commons e salvatela citando la fonte." : "Esercizio guidato: analizza un testo con indizi di 'fake news' (titolo sensazionalistico, assenza di fonti, data mancante) e compila la griglia di verifica.",
    deepDive: "Approfondimento: cosa significa il simbolo CC-BY su un'immagine o una musica scaricata dal Web?"
  };

  // 11. Email formale & Netiquette
  if (/posta elettronica|mail formale|netiquette|riconoscimento spam|gestione e-mail/.test(t)) return {
    explanation: lab ? undefined : "L'e-mail a scuola o sul lavoro segue regole precise: oggetto chiaro, saluto formale, testo educato, firma con nome e classe, e allegati di dimensioni adeguate.",
    example: "Esempio quotidiano: scrivere a un docente con oggetto 'Domanda sul compito di Informatica' è corretto; inviare una mail senza testo o senza firma è da evitare.",
    exercise: lab ? "Laboratorio: 1) Aprite la webmail scolastica; 2) Scrivete una bozza di mail formale al docente richiedendo un chiarimento; 3) Allegata un file `.pdf` leggero e verificate i campi A e Oggetto prima dell'invio simulato." : "Esercizio guidato: correggi un'e-mail informale scritta in stile chat trasformandola in una comunicazione scolastica formale ed impeccabile.",
    deepDive: "Approfondimento: qual è la differenza tra i destinatari in 'A', in copia visibile ('Cc') e in copia nascosta ('Ccn')?"
  };

  // 12. Cloud Drive & Lavoro Cooperativo
  if (/cloud di base|google drive|lavoro cooperativo|documenti condivisi/.test(t)) return {
    explanation: lab ? undefined : "Il Cloud permette di conservare file sui server online per aprirli da qualunque dispositivo. Lavorare insieme sullo stesso documento in tempo reale velocizza i compiti di gruppo.",
    example: "Esempio quotidiano: due compagni scrivono a quattro mani una ricerca su Google Documenti vedendo in diretta i cursori colorati dell'altro.",
    exercise: lab ? "Laboratorio a coppie: 1) Aprite Google Drive; 2) Create un documento condiviso con permessi di 'Modifica'; 3) Scrivete a turno un paragrafo inserendo un commento di revisione per il compagno." : "Esercizio guidato: spiega la differenza tra condividere un file in sola 'Visualizzazione', come 'Commentatore' e come 'Editor'.",
    deepDive: "Approfondimento: cosa succede se un compagno cancella per sbaglio una frase nel documento condiviso? Come si usa la 'Cronologia delle versioni'?"
  };

  // 13. Videoscrittura: Word, Paragrafi & Formattazione
  if (/videoscrittura|paragrafi|allineamenti|formattazione chiara|elenchi puntati|elementi visivi|stili di testo|sommario automatico|mini-guida/.test(t)) return {
    explanation: lab ? undefined : "La videoscrittura serve a produrre documenti chiari, leggibili e ben impaginati. Usare gli 'Stili' (Titolo 1, Titolo 2) permette di creare sommari automatici con un solo clic.",
    example: "Esempio quotidiano: invece di ingrandire il testo a mano, si applica lo stile 'Titolo 1'; il documento risulterà ordinato e conforme agli standard professionali.",
    exercise: lab ? "Laboratorio a coppie: 1) Aprite il file di testo grezzo fornito; 2) Applicate i margini normali, font leggibile (Calibri/Arial 11pt) e interlinea 1.15; 3) Inserite una tabella di 3 colonne con i dati dell'esercitazione e salvate in PDF." : "Esercizio guidato: formatta una pagina con titolo principale in stile Heading 1, due sottotitoli in Heading 2, un elenco numerato e una tabella a righe alternate.",
    deepDive: "Approfondimento: perché esportare una relazione in formato PDF prima di inviarla via mail è più sicuro rispetto a spedire il file modificabile .docx?"
  };

  // 14. Propedeutica Logica (Ponte Anno 1 Settimana 24)
  if (/propedeutica logica|interruttori on\/off|condizioni/.test(t)) return {
    explanation: lab ? undefined : "Nel mondo digitale ogni decisione si basa sulla logica: un'affermazione può essere solo VERA (1) o FALSA (0). Comprendere le condizioni (SE accade qualcosa, ALLORA fai un'azione) è il segreto per usare fogli di calcolo e programmazione.",
    example: "Esempio quotidiano: 'SE la sveglia suona (VERO), ALLORA mi alzo dal letto; ALTRIMENTI continuo a dormire'.",
    exercise: lab ? "Laboratorio a piccoli gruppi con simulatore interruttori / LIM: 1) Sperimentate con interruttori ON/OFF (VERO/FALSO); 2) Collegate due interruttori in serie (entrambi accesi = luce accesa) e in parallelo (basta uno acceso); 3) Scrivete 3 condizioni della vita scolastica." : "Esercizio guidato: valuta se le seguenti 4 frasi sono VERE o FALSE in base ai dati della tabella e scrivi la conseguenza logica.",
    deepDive: "Approfondimento: come fa un cancello automatico o il sensore di una porta a decidere se aprirsi usando una condizione logica?"
  };

  // 15. Foglio di Calcolo Base (Anno 1 Settimane 25-29)
  if (/foglio di calcolo|formule aritmetiche|riferimenti di cella|funzioni base|somma.*media|grafici a barre/.test(t)) return {
    explanation: lab ? undefined : "Il foglio di calcolo (come Excel o Google Fogli) è una griglia di celle identificate da lettere (colonne) e numeri (righe). Inserendo una formula con il segno `=`, il computer calcola i totali in automatico.",
    example: "Esempio quotidiano: scrivendo `=SOMMA(B2:B10)` ottieni all'istante il totale delle spese del mese; se cambi un prezzo, il totale si aggiorna da solo.",
    exercise: lab ? "Laboratorio a coppie: 1) Create la tabella delle paghette/spese settimanali; 2) Usate le formule `=A2*B2`, `=SOMMA()` e `=MEDIA()`; 3) Create un grafico a barre colorato per mostrare i risultati alla classe." : "Esercizio guidato: correggi 3 formule con errori comuni (es. aver dimenticato il segno `=`, aver digitato `SOMMA(A1+A2)` o aver selezionato la cella sbagliata).",
    deepDive: "Approfondimento: a cosa serve il simbolo del dollaro `$A$1` (riferimento assoluto) quando trascini una formula verso il basso?"
  };

  // 16. Presentazioni & Public Speaking (Anno 1 Settimane 30-32)
  if (/presentazioni|slide multimediali|public speaking|esporre le slide/.test(t)) return {
    explanation: lab ? undefined : "Una presentazione efficace serve a supportare chi parla, non a sostituirlo: poche parole per slide, immagini chiare, alto contrasto tra testo e sfondo e niente muri di testo.",
    example: "Esempio quotidiano: invece di incollare 10 righe di testo su una slide, inserisci 3 parole chiave e una bella foto esplicativa.",
    exercise: lab ? "Laboratorio a coppie: 1) Create una presentazione di 4 slide sul vostro hobby o su un tema di informatica; 2) Applicate font grande e contrasto leggibile; 3) Esponete a turno la presentazione in 2 minuti al compagno cronometrando il tempo." : "Esercizio guidato: progetta lo storyboard su carta di 3 slide indicando il messaggio chiave, l'immagine scelta e le parole da dire a voce.",
    deepDive: "Approfondimento: perché leggere le slide parola per parola durante una presentazione annoia chi ascolta e riduce l'attenzione?"
  };

  // 17. Cybersecurity Pratica 2° Anno: Malware, Phishing & Truffe (Anno 2 Settimane 1-2)
  if (/malware|pericoli online|social engineering|phishing|messaggi truffa/.test(t)) return {
    explanation: lab ? undefined : "I criminali informatici usano l'inganno (phishing) e programmi dannosi (malware) per rubare dati e account. Riconoscere mittenti falsi, messaggi urgenti e allegati sospetti è la nostra difesa principale.",
    example: "Esempio quotidiano: un messaggio SMS che dice 'Pacco bloccato, clicca qui subito' è un tentativo di truffa: non si clicca mai sul link e si cancella il messaggio.",
    exercise: lab ? "Laboratorio a coppie: 1) Analizzate 4 esempi reali di messaggi sospetti (SMS, e-mail, messaggi social); 2) Individuate gli indizi di truffa (errori ortografici, link strano, urgenza ingiustificata); 3) Compilate il vademecum anti-phishing." : "Esercizio guidato: elenca 4 tipi di malware (virus, ransomware, spyware, trojan) spiegando in una frase cosa fa ciascuno in modo semplice.",
    deepDive: "Approfondimento: perché un antivirus aggiornato e la prudenza dell'utente devono lavorare sempre insieme per essere protetti?"
  };

  // 18. 2FA & Privacy GDPR Semplice (Anno 2 Settimane 3-5)
  if (/autenticazione a due fattori|2fa|authenticator|protezione della privacy|gdpr semplice|identità digitale/.test(t)) return {
    explanation: lab ? undefined : "L'autenticazione a due fattori (2FA) protegge l'accesso aggiungendo un secondo controllo (come una notifica sullo smartphone) oltre alla password. Il GDPR tutela i nostri dati personali online.",
    example: "Esempio quotidiano: quando accedi al profilo da un nuovo dispositivo, inserisci la password e confermi con il codice inviato sull'app: se un ladro ha la password non può comunque entrare.",
    exercise: lab ? "Laboratorio: 1) Esplorate le impostazioni di sicurezza e privacy del vostro account Google/Microsoft; 2) Verificate i dispositivi connessi; 3) Controllate i permessi concessi alle app di terze parti e revocate quelli inutili." : "Esercizio guidato: definisci cosa si intende per 'Dato personale' (nome, foto, posizione GPS, cronologia) e scrivi 3 consigli per proteggere la propria privacy sui social.",
    deepDive: "Approfondimento: cosa significa che le tue foto o i tuoi post lasciano una 'impronta digitale' permanente sul Web?"
  };

  // 19. Documenti Avanzati & Stampa Unione (Anno 2 Settimane 6-8)
  if (/documenti strutturati|modelli riutilizzabili|stili avanzati|stampa unione|generare attestati/.test(t)) return {
    explanation: lab ? undefined : "La Stampa Unione permette di unire un testo modello con una lista di nominativi in tabella per generare centinaia di lettere o attestati personalizzati in pochi secondi.",
    example: "Esempio quotidiano: la segreteria scolastica crea un solo modello di diploma e la stampa unione genera automaticamente il diploma per tutti i 200 studenti con il loro nome corretto.",
    exercise: lab ? "Laboratorio a coppie: 1) Create in Excel una lista con 5 compagni e voti; 2) In Word create il modello dell'attestato di partecipazione; 3) Collegate il foglio con la Stampa Unione e generate i 5 attestati personalizzati." : "Esercizio guidato: descrivi i 3 passaggi chiave della Stampa Unione (Documento principale, Origine dati tabella, Inserimento campi unione).",
    deepDive: "Approfondimento: quali vantaggi ha l'uso di un modello (.dotx / template) aziendale rispetto a fare copia-incolla di vecchi file?"
  };

  // 20. Ponte Logico Formale 2° Anno: Logica Booleana, AND, OR, NOT (Anno 2 Settimana 9)
  if (/logica booleana|porte logiche|tabelle di verità/.test(t)) return {
    explanation: lab ? undefined : "La logica booleana combina condizioni con tre operatori fondamentali: AND (VERO solo se TUTTE le condizioni sono vere), OR (VERO se ALMENO UNA condizione è vera) e NOT (inverte il risultato: da VERO a FALSO).",
    example: "Esempio quotidiano: per essere ammesso al laboratorio devi avere la tessera AND indossare il camice; per entrare al cinema ridotto serve avere meno di 14 anni OR la tessera studente.",
    exercise: lab ? "Laboratorio a coppie / simulatore: 1) Compilate la tabella di verità per le porte AND, OR e NOT; 2) Verificate con interruttori virtuali le combinazioni (0-0, 0-1, 1-0, 1-1); 3) Scrivete la regola logica per decidere se uno studente ha superato il debito." : "Esercizio guidato: determina il risultato finale (VERO o FALSO) di 4 espressioni logiche composte basandoti sulla tabella di verità.",
    deepDive: "Approfondimento: perché tutti i computer del mondo, dal cellulare al supercomputer, funzionano internamente combinando queste semplici porte logiche?"
  };

  // 21. Fogli Avanzati: Funzioni Logiche =SE(), =E(), =O() (Anno 2 Settimane 10-11)
  if (/fogli di calcolo: prendere decisioni|funzione =se|controlli multipli|=e\(\)|=o\(\)|allarmi condizionali/.test(t)) return {
    explanation: lab ? undefined : "Nei fogli di calcolo la funzione `=SE(condizione; se_vero; se_falso)` fa prendere decisioni automatiche al programma, ad esempio scrivendo 'PROMOSSO' se il voto è maggiore o uguale a 6.",
    example: "Esempio quotidiano: la formula `=SE(E(Media>=6; Assenze<50); \"Ammesso\"; \"Non ammesso\")` controlla due condizioni contemporaneamente prima di dare l'esito.",
    exercise: lab ? "Laboratorio a coppie: 1) Aprite la tabella dei voti di classe; 2) Inserite la funzione `=SE(C2>=6; \"Sufficiente\"; \"Insufficiente\")`; 3) Aggiungete la formattazione condizionale che colora in verde i promossi e in rosso i debiti." : "Esercizio guidato: scrivi la formula corretta con `=SE()` nidificato per calcolare uno sconto del 10% sopra i 100€ e del 20% sopra i 200€.",
    deepDive: "Approfondimento: come si combinano la funzione `=SE()` e la funzione `=O()` per segnalare un allarme se la temperatura supera 40°C oppure la pressione supera 5 bar?"
  };

  // 22. Database Relazionali Semplici (Anno 2 Settimane 12-16)
  if (/database relazionali|chiave primaria|query di selezione|maschere.*report|archivio digitale/.test(t)) return {
    explanation: lab ? undefined : "Un database è un archivio organizzato in tabelle collegate. Ogni riga è un 'Record' (es. un cliente), ogni colonna è un 'Campo' (es. Cognome, Telefono), e la 'Chiave Primaria' è il codice univoco che non si ripete mai.",
    example: "Esempio quotidiano: il registro elettronico usa un database per collegare la tabella degli studenti con la tabella delle materie e dei voti senza duplicare i nomi.",
    exercise: lab ? "Laboratorio a coppie: 1) Create in Access/Base la tabella `Libri` con codice ID, Titolo, Autore e Anno; 2) Impostate la chiave primaria su `ID_Libro`; 3) Eseguite una Query per visualizzare solo i libri pubblicati dopo il 2020." : "Esercizio guidato: osserva una tabella clienti non ordinata, individua quale campo può fare da chiave primaria (es. Codice Fiscale vs Nome) e spiega il motivo.",
    deepDive: "Approfondimento: perché le grandi aziende e i negozi online usano un database anziché un semplice foglio Excel per gestire milioni di ordini?"
  };

  // 23. Benessere Digitale & Cittadinanza (Anno 2 Settimane 18-20)
  if (/senso critico|benessere digitale|gestire le notifiche|progettazione cooperativa/.test(t)) return {
    explanation: lab ? undefined : "Vivere bene nel mondo digitale significa saper staccare: disattivare le notifiche non necessarie, evitare il multitasking continuo e rispettare il tempo altrui aumenta la concentrazione e riduce lo stress.",
    example: "Esempio quotidiano: impostare la modalità 'Non disturbare' o 'Riposo' durante le ore di studio o prima di dormire migliora la qualità del sonno e dell'attenzione.",
    exercise: lab ? "Laboratorio a coppie: 1) Analizzate il report del tempo di utilizzo delle app sullo smartphone; 2) Individuate le 2 app che consumano più attenzione; 3) Redigete una lista di 4 impegni per un uso equilibrato del tempo digitale." : "Esercizio guidato: scrivi un breve saggio riflessivo su come gli algoritmi dei social catturano l'attenzione e quali strategie concrete adottare per difendere il proprio tempo.",
    deepDive: "Approfondimento: cosa si intende per 'FOMO' (paura di essere tagliati fuori) e come influisce sul bisogno di controllare continuamente lo smartphone?"
  };

  // 24. Pensiero Computazionale & Scratch 3.0 (Anno 2 Settimane 21-33)
  if (/algoritmo|diagrammi di flusso|scratch.*ambiente|sprite|coordinate|ripetizioni|cicli|sensori|variabili.*punti|broadcast|caccia al bug|storyboard|videogioco|demo day/.test(t)) return {
    explanation: lab ? undefined : "Un algoritmo è una serie ordinata e precisa di istruzioni per risolvere un problema. In Scratch 3.0 usiamo blocchi colorati a incastro per dare vita a personaggi, giochi e animazioni interattive.",
    example: "Esempio quotidiano: la ricetta di una torta o le istruzioni per montare un mobile sono algoritmi della vita reale: i passi vanno eseguiti nel giusto ordine.",
    exercise: lab ? "Laboratorio a coppie su Scratch 3.0: 1) Scegliete uno sprite e uno sfondo; 2) Programmate il movimento con i tasti freccia e le coordinate X/Y; 3) Aggiungete una variabile `Punteggio` che aumenta quando lo sprite tocca un oggetto." : "Esercizio guidato: disegna il diagramma di flusso per attraversare la strada sulle strisce (guarda a sinistra, guarda a destra, se libero attraversa) e traducilo in blocchi Scratch.",
    deepDive: "Approfondimento: come si esegue il 'debugging' sistematico quando uno sprite non si muove come previsto? Quali verifiche fare nel codice blocco per blocco?"
  };

  // 25. Portfolio, Verifiche & Autovalutazione Finale
  if (/project work|portfolio|verifica|autovalutazione|traguardi/.test(t)) return {
    explanation: lab ? undefined : "Raccogliere i propri lavori migliori in un portfolio digitale e riflettere su cosa si è imparato permette di consolidare le proprie competenze e vedere con orgoglio i progressi fatti.",
    example: "Esempio quotidiano: presentare al docente la cartella dei lavori svolti durante l'anno accompagnata da una breve scheda descrittiva per ciascun progetto.",
    exercise: lab ? "Laboratorio: 1) Riorganizzate la cartella dei lavori del biennio; 2) Selezionate i vostri 3 deliverable più riusciti; 3) Compilate la scheda di autovalutazione finale indicando punti di forza e competenze acquisite." : "Esercizio guidato: compila la rubrica di autovalutazione del percorso dando un punteggio da 1 a 4 per le aree: Autonomia, Precisione, Collaborazione e Problem Solving.",
    deepDive: "Approfondimento: quale competenza informatica appresa quest'anno ti è risultata più utile nella vita di tutti i giorni o nelle altre materie?"
  };

  return null;
}

function detailFor(theme, year, index) {
  const lower = theme.toLowerCase();
  const mode = /project|progetto|demo day/i.test(theme)
    ? "project"
    : /verifica|ripasso|restituzione|traguardi/i.test(theme)
      ? "review"
      : lessonModes[index % lessonModes.length];
  const isLab = mode === "laboratory" || mode === "practice" || mode === "project";
  const focus = theme.replace(/:.*$/, "").toLowerCase();
  const explanation = isLab
    ? undefined
    : `In questa sessione consolidiamo le basi operative su ${focus}. Partiamo da un esempio semplice tratto dalla vita quotidiana, osserviamo i passaggi chiave e lavoriamo in laboratorio.`;
  const example = `Esempio pratico: osserva la situazione iniziale, scegli lo strumento digitale adatto e verifica il risultato passo dopo passo per ${focus}.`;
  const exercise = isLab
    ? `Laboratorio pratico a coppie/piccoli gruppi: 1) Aprite la scheda operativa su ${focus}; 2) Eseguite i passaggi guidati; 3) Verificate con la checklist e salvate il lavoro.`
    : `Esercitazione guidata su ${focus}: segui i 3 passaggi della procedura, controlla i risultati con il compagno di banco e rispondi alla domanda finale.`;
  const deepDive = index % 3 === 2
    ? `Approfondimento: come possiamo applicare ${focus} in una situazione scolastica o domestica per lavorare più velocemente e senza errori?`
    : undefined;

  // Learning Loop neurodidattico a 5 fasi temporizzate (120 min totali)
  const phases = [
    { label: "1. Hook & Retrieval Practice (Quiz / Flashcard)", minutes: 15 },
    { label: "2. Mini-lezione visiva & Schema Dual Coding", minutes: 20 },
    { label: isLab ? "3. Laboratorio cooperativo a coppie (Base / Pro)" : "3. Esercitazione guidata a livelli (Base / Pro)", minutes: 50 },
    { label: "4. Debriefing & Peer-Checking tra compagni", minutes: 20 },
    { label: "5. Exit Ticket formativo & Autovalutazione", minutes: 15 }
  ];

  const bookActivity = mode === "project"
    ? "Compito di realtà aziendale"
    : mode === "laboratory"
      ? "Palestra delle competenze di laboratorio"
      : mode === "review"
        ? "Test in velocità + Flash Card di ripasso"
        : mode === "practice"
          ? "Esercizio flash + Palestra operativa"
          : "Scheda tecnica + Esercitazione guidata";

  const platforms = /fogli|document|presentazioni|slide|cloud|e-mail|email|condivisione|collaborare/.test(lower)
    ? ["Windows 11 / Microsoft 365", "Google Workspace"]
    : /scratch|micro:bit|flowgorithm|algoritmi/.test(lower)
      ? ["Scratch 3.0", "Flowgorithm"]
      : ["Windows 11", "Hardware di Laboratorio"];

  const detail = {
    kind: mode,
    explanation,
    example,
    exercise,
    deepDive,
    competence: isLab
      ? "Realizzare un deliverable digitale applicando le procedure operative corrette, collaborando e documentando le scelte."
      : "Comprendere, descrivere e applicare i principi tecnici in contesti simulati, verificando la correttezza dei risultati.",
    evidence: isLab
      ? "File di laboratorio salvato e strutturato, checklist di conformità compilata e ticket di uscita completato."
      : "Scheda di sintesi, risposte alle domande di controllo e procedura applicata correttamente.",
    materials: ["Computer di laboratorio", "Scheda operativa", "Cartella personale / Drive"],
    phases,
    quickCheck: `Controllo rapido: in una frase, qual è la regola fondamentale da ricordare quando si lavora su ${focus}?`,
    flashCard: `${theme}: fronte — definizione del concetti chiave; retro — procedura corretta, errore tipico da evitare e controllo da fare.`,
    bookActivity,
    platforms,
    facilitatedTask: `Versione inclusiva DSA/BES: affronta ${focus} tramite scheda con passaggi numerati ad alta leggibilità, file starter pre-impostato e sintesi vocale.`,
    ...topicText(theme, mode),
    objectives: [
      `Riconoscere ed esporre i concetti cardine di ${focus}`,
      isLab ? `Eseguire la procedura pratica di laboratorio verificando la correttezza` : `Applicare i concetti a un caso operativo d'ufficio`,
      index % 2 === 0 ? "Individuare e correggere autonomamente eventuali errori procedurali" : "Collaborare attivamente con il compagno di banco rispettando tempi e ruoli"
    ],
    activity: isLab
      ? `Attività laboratoriale su ${focus}: esplorazione, applicazione guidata e salvataggio del prodotto.`
      : `Dimostrazione breve del docente, analisi del modello ed esercitazione applicativa su ${focus}.`
  };

  const fileKey = `${year}-${String(index + 1).padStart(2, "0")}`;
  const custom = bsmartMaterials[fileKey];
  if (custom?.materials) {
    detail.materials = custom.materials;
  }
  return detail;
}

const bsmartMaterials = {
  // Anno 1
  "1-01": { cta: [{ label: "Guida Account & Accesso Laboratorio (PDF)", href: "/resources/anno1/settimana-01/A1_U3_1_CREARE_GESTIRE_ACCOUNT.pdf" }], materials: ["LIM / Schermo d'aula", "Regolamento del laboratorio scolastico", "Patto d'aula condiviso"] },
  "1-02": { cta: [{ label: "Scheda Hardware & Tastiera (PDF)", href: "/resources/anno1/settimana-02/A1_U2_2_ELEMENTI_TASTIERA.pdf" }], materials: ["Postazione dimostrativa", "Scheda postura ed ergonomia", "Checklist 20-20-20"] },
  "1-03": { cta: [{ label: "Infocard Prestazioni & CPU (PDF)", href: "/resources/anno1/settimana-03/A1_U2_1_INFOCARD_PRESTAZIONI_COMPUTER.pdf" }], materials: ["PC dimostrativo / LIM", "Scheda credenziali e passphrase", "Guida al logout sicuro"] },
  "1-04": { cta: [{ label: "Scheda Memorie di Massa & Supporti (PDF)", href: "/resources/anno1/settimana-04/B2_U1_3_MEMORIE_MASSA_ONLINE_VANTAGGI_LIMITI.pdf" }, { label: "Curipod: Hardware vs Software", href: "https://curipod.com/2acf01fa-c11e-4a16-99fb-e689046c799d/lessons/911afbe9-b19e-4c86-bea5-2331a03ba631/edit" }], materials: ["Computer", "Cavi USB, HDMI, alimentazione", "Periferiche Input/Output"] },
  "1-05": { cta: [{ label: "Scheda Sistemi Operativi & Dispositivi (PDF)", href: "/resources/anno1/settimana-05/A1_U2_3_SISTEMI_OPERATIVI_DISPOSITIVI_MOBILI.pdf" }, { label: "Curipod: Le memorie di un PC", href: "https://curipod.com/2acf01fa-c11e-4a16-99fb-e689046c799d/lessons/16e177bc-585e-468c-a9e6-a48db0d5e44b/edit" }], materials: ["Computer", "Scheda CPU e RAM", "Schema Dual Coding I/O"] },
  "1-06": { cta: [{ label: "Guida Software Libero & Licenze (PDF)", href: "/resources/anno1/settimana-06/A1_U2_4_SOFTWARE_LIBERO_SOFTWARE_PROPRIETARIO.pdf" }], materials: ["Computer", "Unità SSD/HDD e chiavette USB", "Schema memorie di massa"] },
  "1-07": { cta: [{ label: "Guida Esplora File & Accesso Rapido (PDF)", href: "/resources/anno1/settimana-07/A1_U3_3_UTILIZZARE_ACCESSO_RAPIDO.pdf" }], materials: ["Computer", "Sistemi operativi Windows/Linux/Mobile", "Tabelle comparative SO"] },
  "1-08": { cta: [{ label: "Guida Ricerca & Gestione File (PDF)", href: "/resources/anno1/settimana-08/A1_U3_1_RICERCARE_ELEMENTI_UNITA_CARTELLE.pdf" }], materials: ["Computer", "Esplora File di Windows 11", "Struttura cartelle di laboratorio"] },
  "1-09": { cta: [{ label: "Scheda Tipi di Backup & Manutenzione (PDF)", href: "/resources/anno1/settimana-09/A1_U3_6_ALTRI_TIPI_BACKUP.pdf" }], materials: ["Computer", "Cartella esercizi", "Utility compressione .zip"] },
  "1-10": { cta: [{ label: "Scheda Connessioni & Reti LAN/WLAN (PDF)", href: "/resources/anno1/settimana-10/A2_U1_1_STUDIARE_LAVORARE_VIA_INTERNET.pdf" }], materials: ["Computer", "Unità esterna / Cloud", "Checklist di backup semplice"] },
  "1-11": { cta: [{ label: "Scheda DNS & Domini Web (PDF)", href: "/resources/anno1/settimana-11/A2_U1_3_DOMINI_PRIMO_LIVELLO.pdf" }], materials: ["Computer", "Apparati di rete", "Scheda connessioni LAN/Wi-Fi"] },
  "1-12": { cta: [{ label: "Scheda Browser & Ricerca Web (PDF)", href: "/resources/anno1/settimana-12/B1_U1_1_INFOCARD_ALTRI_BROWSER_EDGE.pdf" }], materials: ["Computer", "Browser web Edge/Chrome", "Scheda URL e navigazione"] },
  "1-13": { cta: [{ label: "Guida Copyright & Uso Etico del Web (PDF)", href: "/resources/anno1/settimana-13/A2_U2_1_RISCHI_USO_STRUMENTI_ONLINE.pdf" }], materials: ["Computer", "Browser Edge / Chrome", "Scheda valutazione fake news"] },
  "1-14": { cta: [{ label: "Guida E-mail Formale & Riservata (PDF)", href: "/resources/anno1/settimana-14/B1_U2_1_INVIARE_MAIL_RISERVATE.pdf" }], materials: ["Computer", "Scheda licenze Creative Commons", "Banche immagini libere"] },
  "1-15": { cta: [{ label: "Scheda Netiquette & Posta Sicura (PDF)", href: "/resources/anno1/settimana-15/A2_U2_1_RISCHI_USO_STRUMENTI_ONLINE.pdf" }], materials: ["Computer", "Client di posta / Webmail", "Modello e-mail formale"] },
  "1-16": { cta: [{ label: "Guida Cloud Storage & Condivisione (PDF)", href: "/resources/anno1/settimana-16/B2_U1_1_INFOCARD_ARCHIVIARE_CONDIVIDERE_DROPBOX.pdf" }], materials: ["Computer", "Webmail scolastica", "Checklist netiquette e spam"] },
  "1-17": { cta: [{ label: "Scheda Strumenti Web Collaborativi (PDF)", href: "/resources/anno1/settimana-17/A2_U2_1_STRUTTURA_APPLICAZIONI_WEB.pdf" }], materials: ["Computer", "Google Drive / OneDrive", "Account studente"] },
  "1-18": { cta: [{ label: "Scarica Pacchetto Word (.zip)", href: "/resources/anno1/settimana-18/1-Word_processor.zip" }, { label: "Scheda Paragrafi (PDF)", href: "/resources/anno1/settimana-18/B3_U1_4_MODALITA_CORRETTE_SPAZIARE_PARAGRAFI.pdf" }], materials: ["Computer", "Google Documenti / Microsoft 365", "Documento condiviso a coppie"] },
  "1-19": { cta: [{ label: "Guida Immagini & Tipografia (PDF)", href: "/resources/anno1/settimana-19/B3_U2_1_CREARE_IMMAGINI_EFFETTO.pdf" }], materials: ["Computer", "Microsoft Word / Google Documenti", "Testo grezzo da formattare"] },
  "1-20": { cta: [{ label: "Scheda Tabelle, Immagini e Filigrana (PDF)", href: "/resources/anno1/settimana-20/B3_U2_5_AGGIUNGERE_FILIGRANA_GOOGLE.pdf" }], materials: ["Computer", "Word processor", "Guida alla formattazione ed elenchi"] },
  "1-21": { cta: [{ label: "Modelli Stile Lettere (.zip)", href: "/resources/anno1/settimana-21/Modelli_stile_lettere.zip" }], materials: ["Computer", "Word / Documenti", "Tabelle e immagini per l'impaginazione"] },
  "1-22": { cta: [{ label: "Modelli Relazione Tecnica (.zip)", href: "/resources/anno1/settimana-22/Modelli_stile_lettere.zip" }], materials: ["Computer", "Word", "Stili di paragrafo e sommario automatico"] },
  "1-23": { cta: [{ label: "Scarica Pacchetto Excel (.zip)", href: "/resources/anno1/settimana-23/2-Foglio_elettronico.zip" }, { label: "Guida Formati Cella (PDF)", href: "/resources/anno1/settimana-23/B4_U2_2_FORMATI_CONTABILITA_NUMERO_VALUTA_EXCEL.pdf" }], materials: ["Computer", "Microsoft Word / Documenti", "Modello mini-guida scolastica"] },
  "1-24": { cta: [{ label: "Guida Formule & Funzione ARROTONDA (PDF)", href: "/resources/anno1/settimana-24/B4_U3_2_APPLICAZIONI_FUNZIONE_ARROTONDA.pdf" }], materials: ["Computer / LIM", "Simulatore logico interruttori", "Scheda condizioni VERO/FALSO"] },
  "1-25": { cta: [{ label: "Scheda Riferimenti Assoluti e Misti (PDF)", href: "/resources/anno1/settimana-25/B4_U2_1_RIFERIMENTO_MISTO.pdf" }, { label: "Scheda Errori Excel (PDF)", href: "/resources/anno1/settimana-25/B4_U3_1_RICONOSCERE_MESSAGGI_ERRORE.pdf" }], materials: ["Computer", "Microsoft Excel / Google Fogli", "Foglio base celle e dati"] },
  "1-26": { cta: [{ label: "Pacchetto Funzioni Statistiche (.zip)", href: "/resources/anno1/settimana-26/2-Foglio_elettronico.zip" }], materials: ["Computer", "Foglio di calcolo", "Esercizi formule aritmetiche (+, -, *, /)"] },
  "1-27": { cta: [{ label: "Guida Creazione Grafici Excel (PDF)", href: "/resources/anno1/settimana-27/B4_U3_3_MIGLIORAMENTI_GRAFICI_EXCEL.pdf" }], materials: ["Computer", "Foglio con formule e riferimenti ($)", "Esercizio copia-incolla celle"] },
  "1-28": { cta: [{ label: "Scarica Pacchetto Slide (.zip)", href: "/resources/anno1/settimana-28/B5_Presentazioni.zip" }, { label: "Guida SmartArt (PDF)", href: "/resources/anno1/settimana-28/B3_U2_4_INSERIRE_ELABORARE_SMARTART.pdf" }], materials: ["Computer", "Excel / Fogli", "Tabella dati con funzioni SOMMA e MEDIA"] },
  "1-29": { cta: [{ label: "Slide Grafici & Layout Inclusivo (PDF)", href: "/slides/anno1/B5_U1_3_INSERIRE_GRAFICI_PRESENTAZIONI.pdf" }], materials: ["Computer", "Excel", "Dati per grafici a barre e a torta"], slideHref: "/slides/anno1/B5_U1_3_INSERIRE_GRAFICI_PRESENTAZIONI.pdf" },
  "1-30": { cta: [{ label: "Scarica Modelli Fatture (.zip)", href: "/resources/anno1/settimana-30/Modelli_fatture.zip" }], materials: ["Computer", "PowerPoint / Google Presentazioni", "Modello slide visive"], slideHref: "/slides/anno1/B5_U1_4_INSERIRE_ORGANIGRAMMI_PRESENTAZIONI.pdf" },
  "1-31": { cta: [{ label: "Modelli Presentazione Progetto (.zip)", href: "/resources/anno1/settimana-31/Modelli_fatture.zip" }], materials: ["Computer", "Software presentazioni", "Slide multimediali con immagini"] },
  "1-32": { cta: [{ label: "Griglia Esposizione Orale (.pdf)", href: "/resources/anno1/settimana-31/Modelli_fatture.zip" }], materials: ["Computer / LIM", "Cronometro", "Griglia di osservazione per public speaking"] },
  "1-33": { cta: [{ label: "Scheda Portfolio Digitale (.zip)", href: "/resources/anno1/settimana-30/Modelli_fatture.zip" }], materials: ["Computer", "Cartella portfolio personale", "Rubrica di autovalutazione"] },

  // Anno 2
  "2-01": { 
    canvaUrl: "https://canva.link/bu6xf78ueig64dt",
    cta: [{ label: "Scheda Pharming & Malware (PDF)", href: "/resources/anno2/settimana-01/A1_U1_1_PHARMING.pdf" }], 
    materials: ["Computer", "Scheda minacce online e malware comuni"] 
  },
  "2-02": { cta: [{ label: "Scheda Sicurezza e Reti Sociali (PDF)", href: "/resources/anno2/settimana-02/A1_U1_2_PERICOLI_SITI_RETI_SOCIALI.pdf" }], materials: ["Computer", "Casi di studio su phishing e truffe via SMS"] },
  "2-03": { cta: [{ label: "Guida Password Manager & 2FA (PDF)", href: "/resources/anno2/settimana-03/A2_U2_1_SOFTWARE_GESTIONE_PASSWORD.pdf" }], materials: ["Computer", "App Authenticator dimostrativa e guida 2FA"] },
  "2-04": { cta: [{ label: "Scheda Protezione Dati & GDPR (PDF)", href: "/resources/anno2/settimana-04/A2_U1_2_INFOCARD_DISTRUZIONE_SICURA_DATI_INFOMAZIONI.pdf" }], materials: ["Computer", "Linee guida GDPR spiegate semplici e tutela dati"] },
  "2-05": { cta: [{ label: "Guida Tutorial & Comunicazione Digitale (PDF)", href: "/resources/anno2/settimana-05/FLASHCARD_Creare_videotutorial_con_ScreenPal.pdf" }], materials: ["Computer", "Scheda identità digitale e reputazione online"] },
  "2-06": { cta: [{ label: "Scheda Tabelle Avanzate & Modelli (PDF)", href: "/resources/anno2/settimana-07/B1_U1_1_CONVERTIRE_TESTO_TABELLA_WORD.pdf" }], materials: ["Computer", "Microsoft Word", "Scheda tabelle complesse e modelli aziendali"] },
  "2-07": { cta: [{ label: "Guida Sinonimi & Stili (PDF)", href: "/resources/anno2/settimana-07/B1_U2_1_RICERCARE_SINONIMI_WORD.pdf" }], materials: ["Computer", "Microsoft Word", "Stili avanzati e correttore professionale"] },
  "2-08": { cta: [{ label: "Scarica Pacchetto Stampa Unione (.zip)", href: "/resources/anno2/settimana-08/B1_Word_processor.zip" }, { label: "Guida Etichette e Buste (PDF)", href: "/resources/anno2/settimana-08/B1_U3_2_CREARE_ETICHETTE_BUSTE_STAMPA_UNIONE.pdf" }], materials: ["Computer", "Microsoft Word", "Dataset stampa unione ed etichette"], slideHref: "/slides/anno2/B1_U3_4_UTILIZZARE_CREAZIONE_GUIDATA_STAMPA_UNIONE.pdf" },
  "2-09": { cta: [{ label: "Scheda Logica Proposizionale & Tabelle di Verità (PDF)", href: "/resources/anno2/settimana-21/A1_U1_1_NEGAZIONE_LOGICA_NOT.pdf" }], materials: ["Computer", "Simulatore logico / LIM", "Tabelle di verità AND, OR, NOT"] },
  "2-10": { cta: [{ label: "Pacchetto Fogli Funzione SE (.zip)", href: "/resources/anno2/settimana-09/B2_Foglio_elettronico.zip" }], materials: ["Computer", "Microsoft Excel / Google Fogli", "Dataset con funzione =SE()"] },
  "2-11": { cta: [{ label: "Dataset Fogli Logica E / O (.zip)", href: "/resources/anno2/settimana-10/B2_Foglio_elettronico.zip" }], materials: ["Computer", "Microsoft Excel", "Dataset formule =E(), =O() e formattazione condizionale"] },
  "2-12": { cta: [{ label: "Scarica Archivio Database Starter (.zip)", href: "/resources/anno2/settimana-11/B3_Database.zip" }, { label: "Scheda Tipi di Dati e Proprietà (PDF)", href: "/resources/anno2/settimana-11/B3_U1_1_TIPI_DATI_PROPRIETA.pdf" }], materials: ["Computer", "Microsoft Access / LibreOffice Base", "Database starter (.zip)"] },
  "2-13": { cta: [{ label: "Modello Tabelle & Relazioni Database (.zip)", href: "/resources/anno2/settimana-12/B3_Database.zip" }], materials: ["Computer", "Microsoft Access", "Database clienti e prodotti con chiave primaria"] },
  "2-14": { cta: [{ label: "Scheda Query di Selezione e Filtri (PDF)", href: "/resources/anno2/settimana-13/C2_9_COMPITI_REALTA_PEER_TUTORING.pdf" }], materials: ["Computer", "Database relazionale", "Scheda query di selezione con filtri"] },
  "2-15": { cta: [{ label: "Scheda Maschere & Report di Stampa (PDF)", href: "/resources/anno2/settimana-14/C2_10_COMPITI_REALTA_FRUIT_DAY.pdf" }], materials: ["Computer", "Microsoft Access", "Maschere di inserimento dati e report"] },
  "2-16": { cta: [{ label: "Compito di Realtà Gestionale (PDF)", href: "/resources/anno2/settimana-15/C1_6_REALIZZARE_EBOOK_EPUBEDITOR.pdf" }], materials: ["Computer", "Archivio database completo per attività scolastica"] },
  "2-17": { cta: [{ label: "Scheda Verifica Intermedia Pratica (PDF)", href: "/resources/anno2/settimana-16/C2_13_COMPITI_REALTA_I_GIOVANI_NEET.pdf" }], materials: ["Computer", "Prova pratica intermedia su fogli di calcolo e database"] },
  "2-18": { cta: [{ label: "Compito Cittadinanza Digitale & Impresa (PDF)", href: "/resources/anno2/settimana-17/C2_11_COMPITI_REALTA_VISIATIMO_I_BORGHI.pdf" }], materials: ["Computer", "Scheda senso critico e navigazione consapevole"] },
  "2-19": { cta: [{ label: "Guida Pubblicazione & Benessere Digitale (PDF)", href: "/resources/anno2/settimana-18/C1_6_REALIZZARE_EBOOK_EPUBEDITOR.pdf" }], materials: ["Computer", "Scheda benessere digitale e gestione notifiche"] },
  "2-20": { cta: [{ label: "Pacchetto Soluzioni Integrate Office (.zip)", href: "/resources/anno2/settimana-20/B1_Word_processor.zip" }], materials: ["Computer", "Documento di sintesi cooperativa integrato"] },
  "2-21": { cta: [{ label: "Guida Pseudolinguaggi & Diagrammi di Flusso (PDF)", href: "/resources/anno2/settimana-22/A1_U1_2_UTILIZZO_PSEUDOLINGUAGGI.pdf" }], materials: ["Computer", "Flowgorithm / Diagrammi di flusso", "Scheda problemi logici"] },
  "2-22": { cta: [{ label: "Scarica Starter Kit Scratch 3.0 (.zip)", href: "/resources/anno2/settimana-23/A.1_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Pacchetto progetti starter Scratch (.zip)"] },
  "2-23": { cta: [{ label: "Pacchetto Costumi & Animazioni Scratch (.zip)", href: "/resources/anno2/settimana-24/A.2_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Sprite, costumi e piano cartesiano X/Y"] },
  "2-24": { cta: [{ label: "Pacchetto Cicli & Iterazioni Scratch (.zip)", href: "/resources/anno2/settimana-25/A.3_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Blocchi di iterazione (ripeti e per sempre)"] },
  "2-25": { cta: [{ label: "Pacchetto Condizioni & Sensori Scratch (.zip)", href: "/resources/anno2/settimana-26/A.4_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Blocchi SE... ALLORA e sensori di contatto"] },
  "2-26": { cta: [{ label: "Pacchetto Variabili & Timer Scratch (.zip)", href: "/resources/anno2/settimana-27/A.1_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Variabili Punti, Vite e Timer di gioco"] },
  "2-27": { cta: [{ label: "Pacchetto Messaggi Broadcast Scratch (.zip)", href: "/resources/anno2/settimana-28/A.2_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Blocchi invia e ricevi messaggio"] },
  "2-28": { cta: [{ label: "Pacchetto Caccia al Bug Scratch (.zip)", href: "/resources/anno2/settimana-29/A.3_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "3 progetti Scratch con bug guidati da risolvere"] },
  "2-29": { cta: [{ label: "Template Storyboard & Progetto Scratch (.zip)", href: "/resources/anno2/settimana-30/A.4_Scratch_3.0.zip" }], materials: ["Computer", "Scheda storyboard e bozza del videogioco a coppie"] },
  "2-30": { cta: [{ label: "Kit Sviluppo Videogioco Scratch (.zip)", href: "/resources/anno2/settimana-31/A.1_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Asset e codice per livello di gioco"] },
  "2-31": { cta: [{ label: "Asset Grafici & Sonori Scratch (.zip)", href: "/resources/anno2/settimana-31/A.1_Scratch_3.0.zip" }], materials: ["Computer", "Scratch 3.0", "Effetti sonori e rifiniture grafiche"] },
  "2-32": { cta: [{ label: "Griglia di Collaudo Peer Review (.zip)", href: "/resources/anno2/settimana-32/A.2_Scratch_3.0.zip" }], materials: ["Computer", "Scheda di test tra compagni (peer review)"] },
  "2-33": { cta: [{ label: "Demo Day & Valutazione Scratch (.zip)", href: "/resources/anno2/settimana-32/A.2_Scratch_3.0.zip" }], materials: ["Computer / LIM", "Progetti Scratch finali", "Rubrica di valutazione biennio"] }
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
        slideHref: custom?.slideHref,
        canvaUrl: custom?.canvaUrl
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

