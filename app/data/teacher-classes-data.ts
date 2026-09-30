export interface TeacherUDA {
  id: string;
  number: number;
  title: string;
  weeksRange: string;
  competences: string[];
  skills: string[];
  knowledge: string[];
  contents: string[];
  methodsAndTools: string[];
  assessmentTypes: string[];
  hours: number;
}

export interface TeacherClassMeta {
  year: 1 | 2 | 3 | 4 | 5;
  title: string;
  shortName: string;
  subject: string;
  hoursPerYear: number;
  weeklyHours: number;
  book: string;
  docente: string;
  downloadDocx: string;
  udaProposalsDocx?: string;
  overview: string;
  keyCompetences: string[];
  udas: TeacherUDA[];
  assessmentStrategy: {
    formative: string;
    summative: string;
    criteria: string[];
    typicalLabs: {
      title: string;
      description: string;
      tools: string[];
      internalLink?: string;
      externalLink?: string;
    }[];
  };
}

export const teacherClassesData: Record<1 | 2 | 3 | 4 | 5, TeacherClassMeta> = {
  1: {
    year: 1,
    title: "Classe 1ª — Tecnologie dell'Informazione e della Comunicazione (TIC)",
    shortName: "1ª TIC",
    subject: "Tecnologie dell'Informazione e della Comunicazione",
    hoursPerYear: 66,
    weeklyHours: 2,
    book: "Clippy Cloud Vol. 1",
    docente: "Prof. Angelo La Piscopia / Dipartimento Informatica",
    downloadDocx: "/downloads/programmazioni/Programmazione_TIC_Classe_1.docx",
    udaProposalsDocx: "/downloads/programmazioni/Proposte_UDA_Biennio.docx",
    overview:
      "Il primo anno introduce lo studente alla cultura informatica, all'architettura dei calcolatori, alla consapevolezza ergonomica e al rispetto delle norme del laboratorio. Sviluppa le competenze di base nella gestione dei file, nella navigazione sicura sul web, nella videoscrittura strutturata e nei primi modelli di calcolo con Excel.",
    keyCompetences: [
      "Utilizzare gli strumenti informatici e i software di base per compiti assegnati secondo criteri prestabiliti.",
      "Riconoscere i componenti hardware fondamentali e le logiche del software di sistema.",
      "Applicare criteri di sicurezza, ergonomia (regola 20-20-20) e netiquette nella vita scolastica e digitale.",
      "Redigere documenti di testo formattati con stili gerarchici e tabelle.",
      "Costruire fogli di calcolo elementari con formule aritmetiche e riferimenti relativi e assoluti ($)."
    ],
    udas: [
      {
        id: "uda-1-1",
        number: 1,
        title: "Informatica, computer e dispositivi",
        weeksRange: "Settimane 1 - 5",
        competences: [
          "Descrivere le funzioni dei componenti hardware",
          "Elencare le funzioni del sistema operativo e del software applicativo",
          "Comprendere il funzionamento generale di un elaboratore"
        ],
        skills: [
          "Riconoscere e individuare i componenti interni del computer",
          "Distinguere memorie primarie volatili (RAM) e secondarie persistenti",
          "Identificare le periferiche di input, output e memorizzazione di massa"
        ],
        knowledge: [
          "Architettura di von Neumann e CPU",
          "Unità centrale, registri e bus di sistema",
          "Classificazione dei computer (desktop, laptop, tablet, smartphone, server)",
          "Ergonomia della postazione e sicurezza elettrica/fisica"
        ],
        contents: [
          "Patto d'aula e regole del laboratorio",
          "Ergonomia e prevenzione affaticamento visivo",
          "Componenti hardware: CPU, RAM, ROM, Scheda madre, SSD",
          "Periferiche e interfacce di collegamento (USB, HDMI, Wi-Fi)"
        ],
        methodsAndTools: [
          "Lezione frontale e partecipata con postazione cattedra/LIM",
          "Attività laboratoriali a coppie per la verifica dell'ergonomia",
          "Schede interattive e smontaggio guidato di componenti hardware"
        ],
        assessmentTypes: [
          "Test diagnostico iniziale",
          "Osservazione dell'autonomia e rispetto del laboratorio",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 4)"
        ],
        hours: 10
      },
      {
        id: "uda-1-2",
        number: 2,
        title: "Il software di base e la gestione dei file",
        weeksRange: "Settimane 6 - 10",
        competences: [
          "Utilizzare il sistema operativo e i software applicativi secondo procedure standard",
          "Organizzare dati e file secondo strutture logiche gerarchiche ad albero"
        ],
        skills: [
          "Creare, rinominare, spostare ed eliminare cartelle e file",
          "Riconoscere le principali estensioni di file (.txt, .docx, .xlsx, .pdf, .zip)",
          "Applicare la regola di backup 3-2-1 per la salvaguardia dei propri dati"
        ],
        knowledge: [
          "Concetto di software di base vs software applicativo",
          "Licenze software: proprietario, freeware, open source GPL",
          "File system ad albero: percorsi assoluti e relativi",
          "Compressione dei dati e archivi protetti"
        ],
        contents: [
          "Sistemi operativi desktop e mobile (Windows, Linux, macOS, Android)",
          "Esplora risorse, navigazione nel filesystem e gestione unità",
          "Strategie di backup e prevenzione perdite accidentali"
        ],
        methodsAndTools: [
          "Esercitazioni pratiche al PC",
          "Simulazioni di riorganizzazione cartelle caotiche",
          "Lavori di gruppo per la classificazione dei file"
        ],
        assessmentTypes: [
          "Prova pratica su creazione e navigazione filesystem",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 9)"
        ],
        hours: 10
      },
      {
        id: "uda-1-3",
        number: 3,
        title: "Reti, Internet e Ricerca delle Informazioni",
        weeksRange: "Settimane 11 - 15",
        competences: [
          "Navigare in Internet in modo critico, verificando l'attendibilità delle fonti",
          "Riconoscere l'architettura delle reti locali e geografiche"
        ],
        skills: [
          "Utilizzare i motori di ricerca con operatori logici avanzati",
          "Applicare il metodo CRAAP per il fact-checking delle fonti web",
          "Rispettare le licenze di utilizzo (Creative Commons) e il copyright"
        ],
        knowledge: [
          "Concetto di rete LAN, WLAN, WAN e modello Client-Server",
          "Indirizzi IP, protocolli HTTP/HTTPS e sistema dei nomi a dominio (DNS)",
          "Browser web, cookie, cronologia e navigazione in incognito"
        ],
        contents: [
          "Topologie elementari di rete e connessione a Internet",
          "Ricerca bibliografica e fact-checking",
          "Diritto d'autore digitale e licenze Creative Commons"
        ],
        methodsAndTools: [
          "Navigazione guidata e indagini su notizie false (debunking)",
          "Simulazioni di interrogazione DNS e analisi URL"
        ],
        assessmentTypes: [
          "Scheda di valutazione dell'attendibilità di una pagina web",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 13)"
        ],
        hours: 10
      },
      {
        id: "uda-1-4",
        number: 4,
        title: "Comunicazione in rete e strumenti di collaborazione",
        weeksRange: "Settimane 16 - 19",
        competences: [
          "Comunicare via e-mail con registro formale e netiquette",
          "Condividere documenti e collaborare su piattaforme cloud protette"
        ],
        skills: [
          "Compilare correttamente i campi A, Cc e Ccn nella posta elettronica",
          "Riconoscere tentativi di phishing, allegati sospetti e truffe",
          "Gestire autorizzazioni di condivisione su Google Drive / Cloud"
        ],
        knowledge: [
          "Funzionamento della posta elettronica e protocolli SMTP, IMAP, POP3",
          "Netiquette e norme di comportamento negli ambienti digitali",
          "Minacce comuni: spam, phishing, social engineering"
        ],
        contents: [
          "Email formale: oggetto, saluti, allegati compressi",
          "Cartelle condivise, sincronizzazione cloud e cronologia revisioni"
        ],
        methodsAndTools: [
          "Simulazione di invio comunicazioni formali",
          "Analisi a gruppi di email reali di phishing per identificare i segnali di allarme"
        ],
        assessmentTypes: [
          "Redazione di una email formale corretta con allegato",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 17)"
        ],
        hours: 8
      },
      {
        id: "uda-1-5",
        number: 5,
        title: "Videoscrittura: documenti strutturati e formattazione",
        weeksRange: "Settimane 20 - 24",
        competences: [
          "Produrre documenti di testo professionali, accessibili e ben impaginati"
        ],
        skills: [
          "Applicare stili di paragrafo e gerarchia (Titolo 1, Titolo 2, Corpo)",
          "Impostare margini, interlinea, rientri ed elenchi numerati",
          "Inserire tabelle, immagini con didascalia e testo alternativo (Alt-Text)"
        ],
        knowledge: [
          "Principi di tipografia digitale e contrasto cromatico",
          "Norme editoriali per la redazione di relazioni tecniche",
          "Generazione automatica del sommario e numerazione pagine"
        ],
        contents: [
          "Editor di testi (Microsoft Word / Google Documenti)",
          "Formattazione di carattere, paragrafo e pagina",
          "Note a piè di pagina e formati di esportazione PDF standard"
        ],
        methodsAndTools: [
          "Esercitazioni pratiche guidate a partire da testi non formattati",
          "Laboratorio di impaginazione di una tesina scolastica"
        ],
        assessmentTypes: [
          "Prova pratica di videoscrittura con vincoli editoriali rigidi",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 21)"
        ],
        hours: 10
      },
      {
        id: "uda-1-6",
        number: 6,
        title: "Foglio elettronico: formule aritmetiche e interruttori logici",
        weeksRange: "Settimane 25 - 33",
        competences: [
          "Creare tabelle di calcolo per risolvere problemi matematici e gestionali semplici"
        ],
        skills: [
          "Inserire dati numerici, percentuali e date formattandoli correttamente",
          "Scrivere formule aritmetiche (+, -, *, /) e funzioni di base (SOMMA, MEDIA, MIN, MAX)",
          "Usare i riferimenti relativi e assoluti ($) per bloccare le celle nei calcoli",
          "Costruire interruttori logici VERO/FALSO propedeutici alla programmazione"
        ],
        knowledge: [
          "Struttura del foglio: cartelle, fogli, celle, righe e colonne",
          "Sintassi delle formule e precedenza degli operatori aritmetici",
          "Grafici a barre e a torta per la rappresentazione immediata dei dati"
        ],
        contents: [
          "Microsoft Excel / Google Fogli",
          "Fattura semplificata, calcolo IVA e sconti commerciali",
          "Ponte logico: da interruttori ON/OFF alle condizioni"
        ],
        methodsAndTools: [
          "Esercizi pratici step-by-step con fogli preimpostati",
          "Laboratorio di creazione scontrino/budget personale"
        ],
        assessmentTypes: [
          "Verifica pratica individuale al computer su foglio di calcolo",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 25)",
          "Compito di realtà finale di fine anno"
        ],
        hours: 18
      }
    ],
    assessmentStrategy: {
      formative:
        "Interrogazioni flash alla LIM, osservazione continuativa durante i laboratori, correzione immediata degli elaborati digitali e autovalutazione guidata.",
      summative:
        "Prove pratiche al calcolatore (creazione documenti Word formattati, tabelle Excel con formule e riferimenti bloccati), compiti strutturati su Google Moduli/PanQuiz.",
      criteria: [
        "Correttezza procedurale e autonomia nell'uso degli applicativi (Word, Excel, OS)",
        "Precisione tecnica e rispetto dei vincoli assegnati",
        "Ordine, gerarchia visiva e leggibilità degli elaborati prodotti",
        "Capacità di descrivere i passaggi compiuti usando il lessico informatico appropriato",
        "Rispetto dei tempi e delle norme di cura del laboratorio"
      ],
      typicalLabs: [
        {
          title: "Laboratorio LIM Interattivo Quiz (6 Checkpoint)",
          description: "Suite di 6 quiz veloci giocabili alla LIM con timer e spiegazioni per il ripasso e il consolidamento.",
          tools: ["LIM Nativa", "Kahoot", "PanQuiz"],
          internalLink: "#gamification"
        },
        {
          title: "Laboratorio Carta d'Identità Digitale (Settimana 0)",
          description: "Attività di accoglienza per la configurazione sicura delle credenziali scolastiche e primo accesso al PC.",
          tools: ["Google Workspace", "Postazione Lab"],
          internalLink: "/anno/1/lezione-0"
        },
        {
          title: "Laboratorio Impaginazione & Stampa Word",
          description: "Esercizio pratico di redazione di una relazione tecnica aziendale con sommario e riferimenti.",
          tools: ["Microsoft Word", "Google Docs"]
        },
        {
          title: "Laboratorio Bilancio & Fattura Excel",
          description: "Costruzione di un modello di calcolo per sconti, imponibile, IVA e grafici a torta.",
          tools: ["Microsoft Excel", "Google Sheets"]
        }
      ]
    }
  },

  2: {
    year: 2,
    title: "Classe 2ª — Tecnologie dell'Informazione e della Comunicazione (TIC)",
    shortName: "2ª TIC",
    subject: "Tecnologie dell'Informazione e della Comunicazione",
    hoursPerYear: 66,
    weeklyHours: 2,
    book: "Clippy Cloud Vol. 2 (Plus)",
    docente: "Prof. Angelo La Piscopia / Dipartimento Informatica",
    downloadDocx: "/downloads/programmazioni/Programmazione_TIC_Classe_2.docx",
    udaProposalsDocx: "/downloads/programmazioni/Proposte_UDA_Biennio.docx",
    overview:
      "Il secondo anno consolida le abilità di videoscrittura avanzata (stampa unione) e foglio di calcolo logico (=SE, =E, =O). Introduce le basi di dati relazionali, la sicurezza informatica (GDPR, 2FA, ingegneria sociale) e il pensiero computazionale con la programmazione visuale a blocchi su Scratch 3.0.",
    keyCompetences: [
      "Padroneggiare le funzioni logiche avanzate e le condizioni multiple nei fogli di calcolo.",
      "Applicare le tecniche di automazione documentale tramite la Stampa Unione.",
      "Comprendere la struttura di una base di dati relazionale (tabelle, record, chiavi primarie).",
      "Riconoscere e prevenire le minacce informatiche tutelando l'identità digitale e la privacy.",
      "Sviluppare algoritmi e piccoli videogiochi didattici con la programmazione a blocchi (Scratch)."
    ],
    udas: [
      {
        id: "uda-2-1",
        number: 1,
        title: "Ripasso del primo anno e Videoscrittura Avanzata (Stampa Unione)",
        weeksRange: "Settimane 1 - 5",
        competences: [
          "Utilizzare le funzioni avanzate di videoscrittura per automatizzare la corrispondenza e gli attestati"
        ],
        skills: [
          "Creare documenti modello con campi unione dinamici",
          "Collegare una sorgente dati (Excel/Rubrica) a un documento Word",
          "Filtrare e ordinare i destinatari prima della stampa o unione"
        ],
        knowledge: [
          "Concetto di matrice modello e sorgente dati",
          "Tipi di campi unione e regole di formattazione condizionale del testo",
          "Etichette postali, certificati ed esportazione massiva in PDF"
        ],
        contents: [
          "Ripasso formattazione e stili",
          "Stampa unione di lettere personalizzate, attestati e badge",
          "Integrazione dati da foglio Excel"
        ],
        methodsAndTools: [
          "Attività pratiche al computer",
          "Compito di realtà: generazione diplomi di fine corso per la scuola"
        ],
        assessmentTypes: [
          "Verifica pratica su Stampa Unione",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 8)"
        ],
        hours: 10
      },
      {
        id: "uda-2-2",
        number: 2,
        title: "Cybersecurity, Privacy, GDPR e Identità Digitale",
        weeksRange: "Settimane 6 - 9",
        competences: [
          "Adottare comportamenti responsabili e sicuri nella gestione dei propri dati e di quelli altrui"
        ],
        skills: [
          "Configurare l'autenticazione a due fattori (2FA)",
          "Riconoscere attacchi di ransomware, phishing, smishing e vishing",
          "Distinguere dati personali comuni da dati sensibili/particolari secondo il GDPR"
        ],
        knowledge: [
          "Regolamento UE 2016/679 (GDPR) e diritti dell'interessato (accesso, oblio)",
          "Impronta digitale (digital footprint) e reputazione online",
          "Norme sul cyberbullismo (Legge 71/2017) e canali di segnalazione"
        ],
        contents: [
          "Cineforum 'The Great Hack' e analisi Cambridge Analytica",
          "Password manager, passphrase NIST e token OTP",
          "Consenso informato e trattamento dei dati aziendali"
        ],
        methodsAndTools: [
          "Visione film-documentario con dibattito guidato",
          "Laboratorio di audit delle impostazioni privacy sui propri profili"
        ],
        assessmentTypes: [
          "Relazione critica / debate in classe",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 3 e Settimana 6)"
        ],
        hours: 8
      },
      {
        id: "uda-2-3",
        number: 3,
        title: "Logica Booleana e Foglio Elettronico Avanzato (=SE, =E, =O)",
        weeksRange: "Settimane 10 - 15",
        competences: [
          "Modellare problemi decisionali tramite la logica proposizionale e le funzioni condizionali"
        ],
        skills: [
          "Compilare tavole di verità per connettivi logici AND, OR, NOT",
          "Scrivere formule con la funzione =SE(test; se_vero; se_falso)",
          "Combinare controlli multipli con le funzioni logiche =E() e =O()",
          "Applicare regole di formattazione condizionale per evidenziare allarmi o scadenze"
        ],
        knowledge: [
          "Algebra di Boole e porte logiche elementari",
          "Nidificazione di funzioni condizionali",
          "Grafici di confronto e tabelle riassuntive"
        ],
        contents: [
          "Tavole di verità e circuiti logici ideali",
          "Funzioni condizionali in Excel/Fogli",
          "Compito di realtà: cruscotto per la gestione vendite o voti scolastici"
        ],
        methodsAndTools: [
          "Lezione interattiva con lavagna e simulazioni",
          "Laboratorio con casi aziendali graduati per complessità"
        ],
        assessmentTypes: [
          "Prova pratica individuale al computer su formule logiche nidificate",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 10)"
        ],
        hours: 12
      },
      {
        id: "uda-2-4",
        number: 4,
        title: "Basi di dati relazionali: tabelle, record e chiavi",
        weeksRange: "Settimane 16 - 18",
        competences: [
          "Rappresentare informazioni strutturate all'interno di un database relazionale"
        ],
        skills: [
          "Definire i tipi di dato per ciascun campo (testo, numero, data, valuta)",
          "Identificare la Chiave Primaria (Primary Key) per garantire l'univocità",
          "Eseguire semplici interrogazioni (query) di selezione su una tabella"
        ],
        knowledge: [
          "Limiti degli archivi cartacei e dei fogli elettronici",
          "Concetto di tabella, campo (attributo) e record (tupla)",
          "Integrità dei dati e relazioni 1 a molti (1:N)"
        ],
        contents: [
          "Introduzione ai DBMS relazionali",
          "Progettazione di una tabella clienti/fornitori",
          "Filtri e ordinamento dei dati"
        ],
        methodsAndTools: [
          "Esercitazioni guidate su Microsoft Access o strumenti affini",
          "Confronto pratico tra archivio Excel e archivio database"
        ],
        assessmentTypes: [
          "Creazione di una tabella strutturata con vincoli di integrità",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 13)"
        ],
        hours: 6
      },
      {
        id: "uda-2-5",
        number: 5,
        title: "Pensiero Computazionale e Coding con Scratch 3.0",
        weeksRange: "Settimane 19 - 33",
        competences: [
          "Risolvere problemi formalizzando algoritmi e implementandoli in un ambiente a blocchi"
        ],
        skills: [
          "Rappresentare algoritmi con diagrammi di flusso (flow-chart)",
          "Utilizzare cicli finiti, cicli indefiniti (ripeti per sempre) e costrutti di selezione",
          "Gestire variabili numeriche (punteggio, vite, timer) e coordinate cartesiane (X, Y)",
          "Far comunicare più personaggi tramite messaggi di broadcast",
          "Individuare ed eliminare bug logici (debugging cooperativo)"
        ],
        knowledge: [
          "Definizione di algoritmo: sequenzialità, determinatezza, finitezza",
          "Ambiente di sviluppo Scratch: stage, sprite, costumi, suoni, blocchi di codice",
          "Fasi di sviluppo del software: ideazione, storyboard, sviluppo, test, rilascio"
        ],
        contents: [
          "Algoritmi nella vita reale e diagrammi di flusso",
          "Scratch: movimento, rimbalzo sui bordi, rilevamento collisioni",
          "Project Work: sviluppo di un videogioco didattico a squadre",
          "Demo Day finale e presentazione dei progetti"
        ],
        methodsAndTools: [
          "Didattica ludica e costruttivista (learning by doing)",
          "Lavoro a coppie (pair programming) su Scratch online",
          "Testing incrociato e peer review tra squadre"
        ],
        assessmentTypes: [
          "Scheda di progettazione storyboard del videogioco",
          "Valutazione del codice Scratch con rubrica per competenze",
          "Quiz checkpoint Kahoot/PanQuiz (Settimana 26)",
          "Esposizione al Demo Day finale"
        ],
        hours: 30
      }
    ],
    assessmentStrategy: {
      formative:
        "Debug session di gruppo su Scratch, quiz formativi intermedi Kahoot/PanQuiz, correzione guidata delle formule condizionali di Excel.",
      summative:
        "Compito pratico su Stampa Unione e funzioni logiche, valutazione del videogioco Scratch con griglia a rubrica (complessità codice, usabilità, creatività).",
      criteria: [
        "Capacità di formalizzare il flusso logico del problema prima del codice",
        "Correttezza d'uso degli operatori logici e delle variabili",
        "Autonomia nel rilevare e correggere errori (debugging)",
        "Originalità e rifinitura grafica del Project Work",
        "Collaborazione e suddivisione dei ruoli nel team di lavoro"
      ],
      typicalLabs: [
        {
          title: "Laboratorio LIM Interattivo Quiz (6 Checkpoint)",
          description: "6 Quiz mirati su Cybersecurity, GDPR, Word Stampa Unione, Excel SE/E/O, Database e Scratch.",
          tools: ["LIM Nativa", "Kahoot", "PanQuiz"],
          internalLink: "#gamification"
        },
        {
          title: "Laboratorio Stampa Unione Certificati",
          description: "Generazione automatica di attestati personalizzati unendo tabella Excel e modello Word.",
          tools: ["Word", "Excel"]
        },
        {
          title: "Laboratorio Fogli Logici: Cruscotto Vendite",
          description: "Formule nidificate =SE(E(...); ...), calcolo provvigioni e formattazione condizionale visiva.",
          tools: ["Excel", "Google Sheets"]
        },
        {
          title: "Scratch Game Project Work (Settimane 28-33)",
          description: "Ideazione e sviluppo completo di un videogioco a blocchi con punteggi, vite, ostacoli e suoni.",
          tools: ["Scratch 3.0", "Web Browser"]
        }
      ]
    }
  },

  3: {
    year: 3,
    title: "Classe 3ª — Informatica (Triennio di Indirizzo)",
    shortName: "3ª INF",
    subject: "Informatica",
    hoursPerYear: 66,
    weeklyHours: 2,
    book: "Informatica per l'Azienda e i Servizi - Vol. 1",
    docente: "Prof. Angelo La Piscopia / Dipartimento Informatica",
    downloadDocx: "/downloads/programmazioni/Programmazione_Informatica_Classe_3.docx",
    udaProposalsDocx: "/downloads/programmazioni/Proposte_UDA_Triennio.docx",
    overview:
      "La classe terza avvia il percorso del triennio professionalizzante. Il programma copre l'architettura dei sistemi informativi aziendali, gli strumenti cloud avanzati di produttività, la conformità normativa (GDPR e D.Lgs. 81/08), l'analisi dati con Excel avanzato (formule di ricerca CERCA.VERT, tabelle pivot) e un primo approccio strutturato all'Intelligenza Artificiale applicata ai processi di business.",
    keyCompetences: [
      "Interpretare i sistemi informativi aziendali e la distinzione tra flusso dati e flusso decisionale.",
      "Utilizzare gli strumenti avanzati di Google Workspace e Microsoft Office per la cooperazione aziendale.",
      "Applicare le norme vigenti in materia di privacy, sicurezza sul lavoro e licenze software.",
      "Elaborare dati aziendali complessi tramite formule di ricerca, matrici, tabelle pivot e grafici direzionali.",
      "Integrare tecniche di prompt engineering per l'assistenza nei flussi documentali e di analisi."
    ],
    udas: [
      {
        id: "uda-3-1",
        number: 1,
        title: "Cloud Computing, Architettura Workspace e Collaborazione Aziendale",
        weeksRange: "Settimane 1 - 8",
        competences: [
          "Organizzare flussi di lavoro collaborativi e raccolta dati strutturata nel cloud"
        ],
        skills: [
          "Configurare calendari condivisi, documenti a più mani e riunioni da remoto",
          "Progettare questionari per indagini di mercato con Google Moduli / Forms",
          "Gestire la posta aziendale applicando etichette, filtri e regole di archiviazione"
        ],
        knowledge: [
          "Modelli Cloud: SaaS, PaaS, IaaS e architetture multi-tenant",
          "Crittografia in transito e a riposo nei servizi cloud",
          "Metodologia di raccolta ed esportazione dati su fogli elettronici"
        ],
        contents: [
          "Architettura Google Workspace / Microsoft 365",
          "Documenti e fogli collaborativi in tempo reale",
          "Raccolta dati con Moduli e indagini di soddisfazione cliente",
          "Gestione del tempo e calendari condivisi"
        ],
        methodsAndTools: [
          "Simulazione aziendale a gruppi (ufficio acquisti, marketing, direzione)",
          "Somministrazione reale di indagini a campioni scolastici"
        ],
        assessmentTypes: [
          "Valutazione del questionario di indagine e dell'analisi dati prodotta",
          "Verifica strutturata di fine UDA 1 (Settimana 8)"
        ],
        hours: 16
      },
      {
        id: "uda-3-2",
        number: 2,
        title: "Il Sistema Informativo Aziendale, Sicurezza e Normativa (GDPR / D.Lgs. 81/08)",
        weeksRange: "Settimane 9 - 14",
        competences: [
          "Analizzare i flussi informativi aziendali garantendo conformità legale e operativa"
        ],
        skills: [
          "Mappare i flussi di informazione tra i diversi reparti aziendali",
          "Applicare le misure tecniche e organizzative del GDPR nel trattamento dei dati",
          "Distinguere software proprietario, open source e modelli di licensing"
        ],
        knowledge: [
          "Differenza tra Sistema Informativo (SI) e Sistema Informatico",
          "I sistemi ERP (Enterprise Resource Planning) e CRM",
          "Sicurezza sul lavoro e rischi per i videoterminalisti (D.Lgs. 81/08)",
          "Principi di riservatezza, integrità e disponibilità (RID)"
        ],
        contents: [
          "Struttura dei processi aziendali e software gestionale",
          "Privacy e GDPR (Reg. UE 2016/679): registro dei trattamenti e misure minime",
          "Copyright, brevetti, open source e licenze d'uso"
        ],
        methodsAndTools: [
          "Analisi di casi studio di violazioni di dati (data breach)",
          "Redazione di un documento informativo sulla privacy aziendale"
        ],
        assessmentTypes: [
          "Verifica teorico-pratica su casi aziendali",
          "Verifica strutturata UDA 2 (Settimana 14)"
        ],
        hours: 12
      },
      {
        id: "uda-3-3",
        number: 3,
        title: "Intelligenza Artificiale di Livello 1: Modelli LLM e Prompt Engineering",
        weeksRange: "Settimane 15 - 17",
        competences: [
          "Utilizzare modelli di linguaggio per ottimizzare compiti di analisi e comunicazione aziendale"
        ],
        skills: [
          "Formulare prompt strutturati (ruolo, contesto, vincoli, formato output)",
          "Verificare e correggere le allucinazioni dei modelli linguistici",
          "Rispettare le policy aziendali sulla non diffusione di dati riservati nei prompt"
        ],
        knowledge: [
          "Funzionamento dei Large Language Models e concetto di token",
          "Etica dell'AI, copyright del codice/testo generato e trasparenza",
          "Limitazioni dei modelli generativi e fact-checking specialistico"
        ],
        contents: [
          "Come 'pensano' i modelli di linguaggio",
          "Prompt engineering per sintesi, categorizzazione e generazione report",
          "Policy aziendali e sicurezza dei dati nell'uso di tool AI"
        ],
        methodsAndTools: [
          "Laboratorio guidato di confronto tra prompt deboli e prompt strutturati",
          "Esercizi di estrazione di informazioni da testi aziendali complessi"
        ],
        assessmentTypes: [
          "Valutazione del portfolio di prompt ingegnerizzati e dei risultati ottenuti"
        ],
        hours: 6
      },
      {
        id: "uda-3-4",
        number: 4,
        title: "Excel Avanzato per l'Azienda: Funzioni di Ricerca, Tabelle Pivot e Analisi Dati",
        weeksRange: "Settimane 18 - 33",
        competences: [
          "Costruire modelli di analisi dati multidimensionali e cruscotti direzionali per il business"
        ],
        skills: [
          "Impiegare le funzioni di ricerca avanzata =CERCA.VERT(), =CERCA.X(), =INDICE() e =CONFRONTA()",
          "Creare e configurare tabelle pivot con campi calcolati e filtri slicer",
          "Importare dati grezzi (CSV, Open Data) ed effettuare pulizia con Power Query",
          "Realizzare grafici dinamici e cruscotti (dashboard) per il controllo di gestione"
        ],
        knowledge: [
          "Integrità dei dati numerici e convalida dell'input",
          "Analisi multidimensionale: dimensioni di analisi vs misure aggregate",
          "Concetti di Open Data, formati aperti e valore economico per l'impresa"
        ],
        contents: [
          "Funzioni logiche e statistiche avanzate",
          "Funzioni di ricerca su matrici e gestione errori (=SE.ERRORE)",
          "Tabelle e grafici pivot per l'analisi del fatturato",
          "Data cleaning, rimozione duplicati e formattazione professionale",
          "Compito di realtà: Analisi vendite di un e-commerce su base annuale"
        ],
        methodsAndTools: [
          "Esercitazioni pratiche su dataset realistici di migliaia di righe",
          "Project work a coppie con presentazione finale"
        ],
        assessmentTypes: [
          "Prove pratiche individuali di calcolo e interrogazione su Excel",
          "Valutazione del Project Work e del Portfolio finale di classe terza (Settimane 32-33)"
        ],
        hours: 32
      }
    ],
    assessmentStrategy: {
      formative:
        "Esercitazioni settimanali con dataset reali, revisione tra pari dei prompt AI, interrogazioni flash sui concetti di sistema informativo.",
      summative:
        "Compiti di realtà con fogli di calcolo complessi, verifiche scritte semistrutturate sulle normative aziendali, difesa del Portfolio di fine anno.",
      criteria: [
        "Rigore nell'impostazione delle formule e assenza di riferimenti statici errati",
        "Capacità di estrarre indicatori sintetici significativi dai dati grezzi",
        "Conoscenza delle norme su privacy e sicurezza sul lavoro applicate all'IT",
        "Efficacia e coerenza nella redazione di report aziendali",
        "Padroneggianza terminologica e chiarezza espositiva"
      ],
      typicalLabs: [
        {
          title: "Laboratorio Indagini di Mercato & Forms",
          description: "Progettazione questionario clienti e aggregazione automatica delle risposte.",
          tools: ["Google Moduli", "Microsoft Forms"]
        },
        {
          title: "Laboratorio AI Prompt Engineering Aziendale",
          description: "Tecniche di prompting avanzato per l'analisi documentale e sintesi direzionale.",
          tools: ["LLM Console", "Prompt Templates"]
        },
        {
          title: "Laboratorio Excel Avanzato: CERCA.X e Matrici",
          description: "Ricerca bidirezionale, incrocio di anagrafiche e ordini commerciali.",
          tools: ["Microsoft Excel", "Google Sheets"]
        },
        {
          title: "Project Work: Dashboard Analisi Vendite E-Commerce",
          description: "Importazione dataset Open Data, Power Query, tabelle pivot con slicer e grafici dinamici.",
          tools: ["Excel Power Query", "Pivot Tables"]
        }
      ]
    }
  },

  4: {
    year: 4,
    title: "Classe 4ª — Informatica (Triennio di Indirizzo)",
    shortName: "4ª INF",
    subject: "Informatica",
    hoursPerYear: 66,
    weeklyHours: 2,
    book: "Informatica per l'Azienda e i Servizi - Vol. 2",
    docente: "Prof. Angelo La Piscopia / Dipartimento Informatica",
    downloadDocx: "/downloads/programmazioni/Programmazione_Informatica_Classe_4.docx",
    udaProposalsDocx: "/downloads/programmazioni/Proposte_UDA_Triennio.docx",
    overview:
      "Il quarto anno è focalizzato sul ciclo di vita del dato e sullo sviluppo web. Copre la progettazione completa delle Basi di Dati (dal modello concettuale E-R al modello relazionale e alle forme normali), la gestione con Microsoft Access e SQL standard, l'integrazione di strumenti AI per reverse engineering di query, e la realizzazione di siti web aziendali accessibili in HTML5 e CSS3.",
    keyCompetences: [
      "Progettare schemi concettuali di basi di dati utilizzando il modello Entità-Relazione.",
      "Applicare le regole di derivazione logica e le forme di normalizzazione (1NF, 2NF, 3NF).",
      "Interrogare e manipolare database mediante il linguaggio SQL (DDL e DML).",
      "Sviluppare applicazioni gestionali con maschere, sottomaschere e report in Microsoft Access.",
      "Costruire pagine web semantiche, responsive e accessibili in HTML5 e CSS3."
    ],
    udas: [
      {
        id: "uda-4-1",
        number: 1,
        title: "Progettazione di Basi di Dati: Modello Concettuale (E-R) e Modello Relazionale",
        weeksRange: "Settimane 1 - 10",
        competences: [
          "Formalizzare i requisiti di un sistema informativo traducendoli in modelli di dati rigorosi"
        ],
        skills: [
          "Individuare entità, attributi, domini e chiavi a partire dal testo del problema",
          "Definire le associazioni e stabilire le corrette cardinalità (1:1, 1:N, N:N)",
          "Applicare le regole di derivazione per passare dal modello concettuale a quello logico",
          "Normalizzare le relazioni fino alla terza forma normale (3NF) eliminando ridondanze e anomalie"
        ],
        knowledge: [
          "Dai file convenzionali ai DBMS: consistenza, integrità e indipendenza logica/fisica",
          "Regole di derivazione per associazioni uno a molti e molti a molti (tabella ponte)",
          "Vincoli di integrità referenziale e azioni di propagazione (CASCADE, SET NULL)"
        ],
        contents: [
          "Architettura ANSI/SPARC a tre livelli",
          "Modello Entità-Associazione (E-R)",
          "Regole di traduzione logica e normalizzazione",
          "Caso di studio guidato: Bike Sharing Comunale"
        ],
        methodsAndTools: [
          "Lezione frontale con analisi di casi aziendali reali",
          "Esercizi di modellazione concettuale alla lavagna e su software di diagrammi"
        ],
        assessmentTypes: [
          "Prova scritta su stesura di schema E-R e modello logico derivato",
          "Verifica strutturata di fine UDA 3 (Settimana 10)"
        ],
        hours: 20
      },
      {
        id: "uda-4-2",
        number: 2,
        title: "Microsoft Access, Linguaggio SQL e AI Query Engineering",
        weeksRange: "Settimane 11 - 24",
        competences: [
          "Implementare e gestire un database relazionale attraverso un DBMS e il linguaggio SQL"
        ],
        skills: [
          "Creare tabelle con vincoli di dominio, valori predefiniti e integrità referenziale",
          "Scrivere istruzioni SQL: SELECT con clausole WHERE, ORDER BY, GROUP BY e HAVING",
          "Effettuare giunzioni tra tabelle tramite INNER JOIN e gestire funzioni di aggregazione (COUNT, SUM, AVG)",
          "Costruire interfacce grafiche con maschere master/detail e report per la stampa",
          "Utilizzare strumenti AI per il debug e la traduzione di query da linguaggio naturale a SQL"
        ],
        knowledge: [
          "Componenti del linguaggio SQL: DDL, DML, DQL e DCL",
          "Funzioni scalari e funzioni aggregate in SQL",
          "Architettura delle maschere ed eventi in ambiente DBMS desktop"
        ],
        contents: [
          "Microsoft Access / SQLite / Beekeeper Studio",
          "Interrogazioni di selezione, parametriche e di aggiornamento",
          "Maschere e sottomaschere relazionali",
          "Report aziendali con raggruppamento e totali parziali",
          "Project work: Gestione completa di uno Studio Medico / Dentistico"
        ],
        methodsAndTools: [
          "Laboratorio pratico di sviluppo software con postazione individuale",
          "Pair programming assistito da AI per test-to-SQL e verifica dei vincoli"
        ],
        assessmentTypes: [
          "Verifica pratica individuale al PC su creazione tabelle, relazioni e query SQL",
          "Valutazione del database dello Studio Medico (Settimana 24)"
        ],
        hours: 28
      },
      {
        id: "uda-4-3",
        number: 3,
        title: "Sviluppo Web: HTML5 Semantico, CSS3 e Design Accessibile",
        weeksRange: "Settimane 25 - 33",
        competences: [
          "Realizzare siti web aziendali conformi agli standard internazionali del W3C e WCAG"
        ],
        skills: [
          "Strutturare documenti web usando tag semantici (<header>, <nav>, <main>, <section>, <article>, <footer>)",
          "Impostare fogli di stile CSS per la tipografia, i colori e il layout (Flexbox/Grid)",
          "Inserire moduli (<form>) con controlli di input tipizzati e validazione client-side",
          "Garantire l'accessibilità attraverso contrasti cromatici ottimali e attributi alt descrittivi"
        ],
        knowledge: [
          "Funzionamento del protocollo HTTP/HTTPS e rendering delle pagine nel browser",
          "Standard W3C e linee guida di accessibilità WCAG 2.1 AA",
          "Separazione tra contenuto (HTML) e presentazione estetica (CSS)"
        ],
        contents: [
          "Editor di codice (VS Code / editor online)",
          "Sintassi HTML5 e gerarchia dei tag",
          "Selettori CSS, modello a scatola (Box Model) e layout responsivo",
          "Form di contatto e tabelle accessibili",
          "Project Work finale: Sito web aziendale per la presentazione di servizi/prodotti"
        ],
        methodsAndTools: [
          "Laboratorio di scrittura del codice senza framework invasivi",
          "Validazione tramite W3C Validator e strumenti di audit (Lighthouse)"
        ],
        assessmentTypes: [
          "Verifica pratica di codifica HTML/CSS",
          "Valutazione del sito web aziendale completo e del Portfolio annuale (Settimane 32-33)"
        ],
        hours: 18
      }
    ],
    assessmentStrategy: {
      formative:
        "Revisione collettiva degli schemi E-R alla LIM, sfide di scrittura query SQL alla lavagna, collaudo dell'accessibilità dei siti web.",
      summative:
        "Compiti pratici di sviluppo database e interrogazioni SQL complesse, verifica di progettazione concettuale/logica, difesa del Project Work web finale.",
      criteria: [
        "Correttezza teorica nella definizione delle entità, relazioni e cardinalità",
        "Efficienza e correttezza sintattica delle query SQL",
        "Validità semantica e rispetto degli standard di accessibilità nel codice HTML/CSS",
        "Completezza delle interfacce grafiche (maschere e report) nel DBMS",
        "Chiarezza della documentazione tecnica allegata"
      ],
      typicalLabs: [
        {
          title: "Laboratorio Schemi E-R & Normalizzazione",
          description: "Progettazione concettuale e derivazione logica per il database Bike Sharing.",
          tools: ["Diagrams.net", "StarUML"]
        },
        {
          title: "Laboratorio Access & SQL: Query Master",
          description: "Scrittura di query di selezione, JOIN su più tabelle e query parametriche con totali.",
          tools: ["Microsoft Access", "SQL Editor"]
        },
        {
          title: "Laboratorio AI Livello 2: Text-to-SQL & Debug",
          description: "Generazione assistita di query complesse e verifica dei piani di esecuzione.",
          tools: ["LLM Assistant", "SQL Database"]
        },
        {
          title: "Project Work: Portale Web Aziendale",
          description: "Sviluppo di un sito vetrina completo con moduli di contatto, accessibile e responsive.",
          tools: ["VS Code", "HTML5", "CSS3"]
        }
      ]
    }
  },

  5: {
    year: 5,
    title: "Classe 5ª — Informatica (Triennio di Indirizzo & Esame di Stato)",
    shortName: "5ª INF",
    subject: "Informatica",
    hoursPerYear: 66,
    weeklyHours: 2,
    book: "Informatica per l'Azienda e i Servizi - Vol. 3 / Documentazione Specialistica",
    docente: "Prof. Angelo La Piscopia / Dipartimento Informatica",
    downloadDocx: "/downloads/programmazioni/Programmazione_Informatica_Classe_5.docx",
    udaProposalsDocx: "/downloads/programmazioni/Proposte_UDA_Triennio.docx",
    overview:
      "Il quinto anno prepara gli studenti all'inserimento nel mondo del lavoro e al superamento dell'Esame di Stato. Approfondisce la crittografia classica e moderna, le reti di calcolatori (modello ISO/OSI, subnetting IPv4, apparati e Wireshark), i database avanzati (SQL, ETL Power Query, Orange Data Mining), l'automazione con agenti AI e la realizzazione del Capstone Project interdisciplinare.",
    keyCompetences: [
      "Padroneggiare i princìpi matematici e applicativi della crittografia classica, simmetrica (AES) e asimmetrica (RSA/firme digitali).",
      "Progettare e diagnosticare reti di calcolatori locali e geografiche (calcolo subnetting, routing, analisi pacchetti con Wireshark).",
      "Eseguire analisi dati avanzate (ETL, machine learning visuale con Orange, query SQL complesse).",
      "Costruire workflow di automazione con agenti AI conformi alla normativa europea (AI Act).",
      "Sviluppare e discutere il Capstone Project interdisciplinare per l'Esame di Stato."
    ],
    udas: [
      {
        id: "uda-5-1",
        number: 1,
        title: "Crittografia, Sicurezza delle Reti e Identità Digitale",
        weeksRange: "Settimane 1 - 7",
        competences: [
          "Garantire la riservatezza, l'integrità e l'autenticità dei dati aziendali attraverso algoritmi crittografici"
        ],
        skills: [
          "Applicare cifrari a sostituzione (Cesare, Vigenère, cifratura polialfabetica) con l'aritmetica modulare",
          "Comprendere e simulare la cifratura a chiave simmetrica (AES-256) e le operazioni XOR bit a bit",
          "Applicare la crittografia a chiave pubblica/privata per cifratura e firma digitale (CAD)",
          "Configurare canali sicuri TLS/HTTPS e riconoscere attacchi man-in-the-middle"
        ],
        knowledge: [
          "Aritmetica modulare e funzioni a senso unico (trapdoor)",
          "Infrastruttura a Chiave Pubblica (PKI), autorità di certificazione e certificati X.509",
          "Funzioni di hash crittografiche (SHA-256), collisioni e blockchain mining",
          "Misure di resilienza: backup 3-2-1, disaster recovery e fatturazione elettronica SDI"
        ],
        contents: [
          "Crittografia classica e modulo 21/26",
          "XOR bit a bit e cifratura polialfabetica dinamica",
          "Crittografia asimmetrica: scambio chiavi Alice & Bob, riservatezza vs autenticità",
          "Blockchain, hash e firme digitali",
          "Sicurezza aziendale, firewall e VPN"
        ],
        methodsAndTools: [
          "Laboratorio interattivo nativo sulla dashboard (Interactive Crypto Lab)",
          "Simulatore CyberChef e analisi certificati SSL nei browser",
          "Esercizi formali di calcolo matematico modulare"
        ],
        assessmentTypes: [
          "Verifica pratica e numerica sugli algoritmi crittografici (Settimana 3)",
          "Risoluzione di compiti d'esame su firma digitale e scambio chiavi"
        ],
        hours: 14
      },
      {
        id: "uda-5-2",
        number: 2,
        title: "Basi di Dati Avanzate, Data Analytics & Machine Learning",
        weeksRange: "Settimane 8 - 13",
        competences: [
          "Interrogare e analizzare grandi volumi di dati per estrarre insight aziendali e modelli predittivi"
        ],
        skills: [
          "Scrivere query SQL complesse con viste, subquery e raggruppamenti avanzati",
          "Condurre pipeline di estrazione, trasformazione e caricamento (ETL) con Power Query",
          "Costruire workflow di Machine Learning visuale per classificazione e clustering su Orange"
        ],
        knowledge: [
          "Architetture di database avanzate e transazioni ACID",
          "Data Warehouse, data lake e business intelligence aziendale",
          "Principi di apprendimento supervisionato e non supervisionato"
        ],
        contents: [
          "SQL avanzato: viste logiche e aggregazioni multi-tabella",
          "Data Analytics e pipeline ETL",
          "Orange Data Mining: alberi decisionali, reti neurali e metriche di valutazione (matrice di confusione)"
        ],
        methodsAndTools: [
          "Laboratorio pratico con database aziendali reali e Orange Data Mining",
          "Analisi guidata di dataset per previsione abbandono clienti (churn)"
        ],
        assessmentTypes: [
          "Prova pratica al calcolatore su query SQL complesse ed elaborazione dati"
        ],
        hours: 12
      },
      {
        id: "uda-5-3",
        number: 3,
        title: "Reti di Calcolatori, Modello ISO/OSI e Subnetting IPv4",
        weeksRange: "Settimane 14 - 22",
        competences: [
          "Progettare, configurare e diagnosticare reti di telecomunicazione complesse"
        ],
        skills: [
          "Confrontare i livelli del modello ISO/OSI e dello stack TCP/IP",
          "Calcolare maschere di sottorete (CIDR e VLSM) determinando range host, net ID e broadcast",
          "Cablare cavi UTP Cat 6 secondo lo standard T568B e collaudarli con tester di rete",
          "Analizzare il traffico di rete e i singoli pacchetti attraverso Wireshark",
          "Simulare topologie complesse con router e switch su Cisco Packet Tracer"
        ],
        knowledge: [
          "Mezzi trasmissivi (rame, fibra ottica, onde radio) e apparati (Hub, Switch L2, Router L3)",
          "Protocolli cardine: ARP, IP, ICMP, TCP, UDP, DHCP, DNS, HTTP/HTTPS",
          "Indirizzamento IPv4 privato (RFC 1918) e NAT (Network Address Translation)"
        ],
        contents: [
          "Architetture e topologie di rete",
          "Cablaggio strutturato Cat 6 e test continuità",
          "ISO/OSI vs TCP/IP e incapsulamento pacchetti",
          "Wireshark packet sniffing",
          "Modulo intensivo di calcolo Subnetting e notazione CIDR",
          "Cisco Packet Tracer: configurazione router e tabelle di routing"
        ],
        methodsAndTools: [
          "Laboratorio pratico di crimpatura cavi e collaudo con tester hardware",
          "Simulatore Cisco Packet Tracer e cattura reale su scheda di rete con Wireshark"
        ],
        assessmentTypes: [
          "Verifica scritta di calcolo rapido su subnetting e indirizzamento IP",
          "Prova pratica di collaudo topologia su Packet Tracer"
        ],
        hours: 18
      },
      {
        id: "uda-5-4",
        number: 4,
        title: "AI Automation, European AI Act e Cybersecurity Avanzata",
        weeksRange: "Settimane 23 - 27",
        competences: [
          "Progettare flussi automatizzati intelligenti e valutarne la conformità etica e normativa"
        ],
        skills: [
          "Costruire pipeline di automazione con webhook e nodi decisionali (n8n/Make)",
          "Implementare architetture RAG (Retrieval-Augmented Generation) su documenti aziendali",
          "Identificare vulnerabilità AI come prompt injection e jailbreak",
          "Analizzare la conformità dei sistemi AI secondo la classificazione del rischio dell'AI Act"
        ],
        knowledge: [
          "Regolamento Europeo sull'Intelligenza Artificiale (AI Act): sistemi vietati, ad alto rischio e trasparenza",
          "Agenti autonomi, tools execution e guardrails di sicurezza",
          "Metriche di web marketing e conversion rate (SEO/SEM/KPI)"
        ],
        contents: [
          "Automazione flussi con n8n",
          "Ricerca semantica ed embedding vettoriali",
          "Sicurezza offensiva dei modelli linguistici (Gandalf Lakera)",
          "Etica, bias algoritmici e conformità normativa"
        ],
        methodsAndTools: [
          "Laboratorio con nodi n8n e simulazioni di prompt injection",
          "Analisi casi studio di conformità normativa AI"
        ],
        assessmentTypes: [
          "Valutazione del workflow di automazione e della relazione di compliance"
        ],
        hours: 10
      },
      {
        id: "uda-5-5",
        number: 5,
        title: "Capstone Project interdisciplinare per l'Esame di Stato",
        weeksRange: "Settimane 28 - 33",
        competences: [
          "Sviluppare un progetto informatico completo e documentarlo per il colloquio d'esame"
        ],
        skills: [
          "Redigere il Project Charter e la documentazione tecnica professionale",
          "Integrare base di dati, infrastruttura di rete e interfaccia applicativa",
          "Esporre con rigore terminologico e padronanza tecnica davanti alla commissione"
        ],
        knowledge: [
          "Metodologie di project management agile",
          "Criteri di valutazione della commissione dell'Esame di Stato",
          "Tipizzazione forte vs debole nei linguaggi di programmazione moderni"
        ],
        contents: [
          "Project Charter e pianificazione fasi",
          "Sviluppo architetturale (DB + Network + Security)",
          "Executive Summary e conformità AI Act",
          "Simulazione formale del colloquio orale d'esame"
        ],
        methodsAndTools: [
          "Coaching individuale e revisione settimanale dei progetti",
          "Simulazione a tempo del colloquio con griglia ministeriale"
        ],
        assessmentTypes: [
          "Valutazione finale del Capstone Project e del codice prodotto",
          "Simulazione della prova orale d'esame (Settimana 31-32)"
        ],
        hours: 12
      }
    ],
    assessmentStrategy: {
      formative:
        "Risoluzione settimanale di quesiti d'esame, collaudo guidato su Packet Tracer e Wireshark, esercizi numerici di crittografia alla lavagna.",
      summative:
        "Simulazioni scritte della seconda prova d'esame, collaudo pratico delle topologie di rete, discussione tecnica orale del Capstone Project.",
      criteria: [
        "Rigore matematico e formale nei calcoli crittografici e di subnetting",
        "Competenza tecnica nella configurazione e troubleshooting di reti",
        "Capacità di integrare diverse tecnologie (DB, Reti, Sicurezza, AI) in una visione sistemica",
        "Proprietà di linguaggio e capacità di argomentare scelte architetturali",
        "Qualità della documentazione tecnica e del codice del Capstone Project"
      ],
      typicalLabs: [
        {
          title: "Laboratorio Interattivo di Crittografia (Settimane 1-3)",
          description: "Palestra con cifrario di Cesare, modulo 21, XOR bit a bit, cifratura polialfabetica e simulatore asimmetrico Alice & Bob.",
          tools: ["Interactive Crypto Lab", "CyberChef"],
          internalLink: "/anno/5/settimana/2"
        },
        {
          title: "Laboratorio Cablaggio Cat 6 & Tester Hardware",
          description: "Spelatura, crimpatura con plug RJ-45 secondo schema T568B e collaudo continuità pin a pin.",
          tools: ["Crimpatrice", "Tester RJ-45", "Cavo UTP Cat 6"]
        },
        {
          title: "Laboratorio Packet Tracer: Subnetting & Routing",
          description: "Configurazione switch VLAN, interfaccia router e server DHCP per reti aziendali multi-piano.",
          tools: ["Cisco Packet Tracer"]
        },
        {
          title: "Laboratorio Wireshark Packet Sniffing",
          description: "Cattura dell'handshake a 3 vie TCP, analisi frame Ethernet e ispezione protocolli DNS/HTTP.",
          tools: ["Wireshark", "Network Interface"]
        },
        {
          title: "Capstone Project per l'Esame di Stato",
          description: "Project work interdisciplinare che integra modello E-R, query SQL, subnetting e documentazione esame.",
          tools: ["SQL", "Packet Tracer", "Project Charter"]
        }
      ]
    }
  }
};
