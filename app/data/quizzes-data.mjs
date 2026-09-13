export const checkpointQuizzes = [
  // ==========================================
  // CLASSE PRIMA (6 QUIZ)
  // ==========================================
  {
    id: "quiz-1-04-hardware",
    year: 1,
    week: 4,
    title: "Quiz Checkpoint 1: Regole Lab, Ergonomia & Hardware Essenziale",
    topic: "Regole di convivenza nel laboratorio, postura 20-20-20, CPU, RAM e periferiche I/O",
    description: "Verifica di consolidamento su sicurezza d'aula, benessere fisico al PC e componenti principali del computer.",
    questions: [
      {
        id: "q1_1",
        question: "Cosa prescrive la regola ergonomica del '20-20-20' per proteggere la vista quando si lavora al computer?",
        options: [
          "Lavorare 20 ore consecutive al giorno",
          "Ogni 20 minuti di schermo, guardare un oggetto a 20 piedi (circa 6 metri) per 20 secondi",
          "Comprare 20 monitor diversi per la classe",
          "Spegnere il computer dopo 20 secondi dall'accensione"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La regola 20-20-20 permette ai muscoli oculari di rilassarsi e riduce l'affaticamento visivo durante le sessioni digitali.",
        type: "multiple_choice"
      },
      {
        id: "q1_2",
        question: "Quale componente del computer è il 'cervello' che esegue le istruzioni e i calcoli dei programmi?",
        options: ["La RAM", "La CPU (Processore)", "L'unità SSD", "La Scheda Madre"],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La CPU (Central Processing Unit) elabora tutti i dati ed esegue le istruzioni delle nostre applicazioni.",
        type: "multiple_choice"
      },
      {
        id: "q1_3",
        question: "Cosa accade ai dati nella memoria RAM quando il computer viene spento?",
        options: [
          "Vengono salvati automaticamente nel cloud",
          "Rimangono conservati fino alla riaccensione",
          "Vengono cancellati perché la RAM è una memoria volatile temporanea",
          "Vengono compressi nell'hard disk"
        ],
        correctOptionIndex: 2,
        timeLimitSeconds: 20,
        explanation: "La memoria RAM è volatile: serve solo come banco di lavoro momentaneo e si azzera allo spegnimento.",
        type: "multiple_choice"
      },
      {
        id: "q1_4",
        question: "CASO STUDIO: Un compagno di classe lamenta dolore al collo e alla schiena dopo un'ora al PC. Quale correzione posturale è opportuno consigliargli?",
        options: [
          "Mettere il monitor molto in basso sul pavimento",
          "Regolare la sedia in modo che lo schermo sia a 50-70 cm e la prima riga all'altezza degli occhi",
          "Usare il mouse con due mani contemporaneamente",
          "Lavorare completamente al buio"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 30,
        explanation: "Posizionare il monitor ad altezza occhi e mantenere la schiena dritta previene contratture muscolari.",
        type: "error_analysis"
      },
      {
        id: "q1_5",
        question: "VERO o FALSO: Un'unità SSD da 512 GB e una memoria RAM da 16 GB svolgono la stessa identica funzione nel computer.",
        options: [
          "VERO, entrambe archiviano i file permanentemente",
          "FALSO, l'SSD è memoria permanente per i file, la RAM è memoria di lavoro temporanea",
          "VERO, cambia solo la capienza",
          "FALSO, la RAM è più lenta dell'SSD"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La RAM serve alla CPU per lavorare in tempo reale, mentre l'SSD conserva file e programmi anche a PC spento.",
        type: "true_false"
      }
    ]
  },
  {
    id: "quiz-1-09-software-filesystem",
    year: 1,
    week: 9,
    title: "Quiz Checkpoint 2: Software, Sistema Operativo & File System",
    topic: "Software di base, Sistema Operativo, percorsi cartelle, estensioni e backup semplice",
    description: "Test sui sistemi operativi, la gestione ordinata delle cartelle e le buone abitudini di salvataggio.",
    questions: [
      {
        id: "q2_1",
        question: "Qual è il compito principale del Sistema Operativo (es. Windows 11, macOS, Android)?",
        options: [
          "Scrivere lettere e relazioni per la scuola",
          "Gestire le risorse del computer e fare da intermediario tra l'hardware e le applicazioni",
          "Pulire fisicamente lo schermo del PC",
          "Regalare connessione Wi-Fi illimitata"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Il Sistema Operativo coordina le parti del computer e permette a tutte le app di funzionare.",
        type: "multiple_choice"
      },
      {
        id: "q2_2",
        question: "Cosa indica l'estensione di un file (es. `.docx`, `.xlsx`, `.pdf`, `.png`)?",
        options: [
          "Il giorno della settimana in cui è stato creato il file",
          "Il tipo di contenuto del file e il programma con cui aprirlo",
          "Il prezzo del programma utilizzato",
          "Il nome dell'utente che ha effettuato l'accesso"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "L'estensione segnala al sistema la tipologia di file e apre automaticamente l'applicazione giusta.",
        type: "multiple_choice"
      },
      {
        id: "q2_3",
        question: "Quale tra questi è il nome di file PIÙ ordinato e chiaro per un compito scolastico?",
        options: [
          "`documento_finale_veramente_ultimo(2).docx`",
          "`2026-10-15_Informatica_RelazioneHardware_v01.docx`",
          "`file_senza_nome.docx`",
          "`asdfghjkl.docx`"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Un nome con data, materia, argomento e versione permette di ritrovare e riconoscere il file all'istante.",
        type: "multiple_choice"
      },
      {
        id: "q2_4",
        question: "ANALISI ERRORE: Uno studente salva tutti i suoi compiti alla rinfusa sul Desktop finché lo schermo è pieno di icone. Qual è la soluzione migliore?",
        options: [
          "Spegnere lo schermo e cambiare PC",
          "Creare una cartella `Informatica_2026` con sottocartelle tematiche (`Lezioni`, `Esercizi`, `Verifiche`)",
          "Cancellare tutti i file senza fare copie",
          "Rimpicciolire le icone per farne entrare altre cento"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 30,
        explanation: "Una struttura di cartelle gerarchica mantiene i documenti ordinati, facili da trovare e pronti per il backup.",
        type: "error_analysis"
      },
      {
        id: "q2_5",
        question: "Cosa significa fare una copia di 'Backup' dei propri file di scuola?",
        options: [
          "Cancellare il file per liberare spazio",
          "Salvare una copia identica dei file importanti su un secondo supporto (chiavetta USB o Google Drive)",
          "Stampare tutti i file su carta",
          "Rinominare il file con lettere maiuscole"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Il backup protegge i documenti importanti: se il computer ha un guasto, la copia di riserva è al sicuro.",
        type: "multiple_choice"
      }
    ]
  },
  {
    id: "quiz-1-13-reti-internet",
    year: 1,
    week: 13,
    title: "Quiz Checkpoint 3: Reti, Navigazione Web & Fonti Affidabili",
    topic: "LAN locale, Internet, indirizzi web (URL), ricerca attiva, fake news e immagini libere",
    description: "Verifica sulle connessioni di rete, la valutazione critica delle informazioni web e il copyright.",
    questions: [
      {
        id: "q3_1",
        question: "Che tipo di rete collega i computer e i dispositivi presenti all'interno dell'edificio scolastico?",
        options: [
          "Una rete WAN globale",
          "Una rete LAN (Local Area Network)",
          "Una rete satellitare interplanetaria",
          "Una rete telefonica analogica"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La LAN (Local Area Network) è la rete locale che unisce le postazioni all'interno di una scuola o ufficio.",
        type: "multiple_choice"
      },
      {
        id: "q3_2",
        question: "A cosa serve l'applicazione 'Browser' (es. Google Chrome, Microsoft Edge, Mozilla Firefox)?",
        options: [
          "A pulire i virus dal computer",
          "A navigare sul Web visualizzando pagine e siti Internet",
          "A montare video professionali",
          "A riparare la tastiera guasta"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 15,
        explanation: "Il browser è il programma che legge il codice delle pagine web e ce le mostra con testi e immagini.",
        type: "multiple_choice"
      },
      {
        id: "q3_3",
        question: "Come possiamo verificare se una notizia trovata su Internet è affidabile o una possibile fake news?",
        options: [
          "Credere subito se ha un titolo con molti punti esclamativi",
          "Controllare la data, l'autore, le fonti citate e confrontare con siti di informazione attendibili",
          "Condividerla subito con tutta la classe",
          "Leggere solo i commenti sui social"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Il senso critico e la verifica incrociata delle fonti sono le abilità chiave della cittadinanza digitale.",
        type: "multiple_choice"
      },
      {
        id: "q3_4",
        question: "CASO STUDIO: Vuoi inserire una bella foto nella tua presentazione scolastica. Qual è la scelta più corretta per rispettare il copyright?",
        options: [
          "Scaricare qualsiasi immagine da Google Immagini senza citare l'autore",
          "Utilizzare banche immagini gratuite con licenza Creative Commons (es. Unsplash, Wikimedia) citando l'autore",
          "Fare uno screenshot di un profilo privato Instagram",
          "Dire che l'immagine è stata disegnata da te"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 30,
        explanation: "Le licenze Creative Commons (CC) permettono il riuso etico e legale dei contenuti citandone la fonte.",
        type: "error_analysis"
      },
      {
        id: "q3_5",
        question: "VERO o FALSO: Se una pagina compare al primo posto nei risultati di Google, significa con certezza matematica che tutte le sue informazioni sono vere.",
        options: [
          "VERO, Google pubblica solo verità scientifiche",
          "FALSO, il posizionamento dipende da algoritmi e popolarità; serve sempre verificare la notizia",
          "VERO, ma solo se usiamo il computer di scuola",
          "FALSO, nessun sito su Internet è sicuro"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "I motori di ricerca indicizzano i siti secondo algoritmi di pertinenza, non certificano l'autenticità dei contenuti.",
        type: "true_false"
      }
    ]
  },
  {
    id: "quiz-1-17-email-cloud",
    year: 1,
    week: 17,
    title: "Quiz Checkpoint 4: E-mail Formale & Collaborazione Cloud",
    topic: "Campi A/Cc/Ccn, netiquette, riconoscimento spam e cartelle condivise su Google Drive",
    description: "Test sulle comunicazioni formali via posta elettronica e sul lavoro di squadra nel Cloud.",
    questions: [
      {
        id: "q4_1",
        question: "Quando scrivi un'e-mail a un docente o alla segreteria della scuola, cosa NON deve mai mancare?",
        options: [
          "Un testo tutto in lettere MAIUSCOLE",
          "Un Oggetto chiaro, un saluto educato, il testo del messaggio e la firma con Nome, Cognome e Classe",
          "Dieci emoji colorate nell'oggetto",
          "Un allegato di 5 Gigabyte"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "L'e-mail scolastica e lavorativa richiede chiarezza formale: oggetto, corpo del messaggio e firma identificativa.",
        type: "multiple_choice"
      },
      {
        id: "q4_2",
        question: "Secondo le regole della Netiquette, cosa comunica scrivere un messaggio TUTTO IN MAIUSCOLO?",
        options: [
          "Che sei molto calmo ed elegante",
          "Che stai urlando o parlando con tono aggressivo",
          "Che il testo è privo di errori",
          "Che la connessione Wi-Fi è veloce"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 15,
        explanation: "Nel linguaggio digitale il testo in MAIUSCOLO equivale a gridare ed è considerato scortese.",
        type: "multiple_choice"
      },
      {
        id: "q4_3",
        question: "Se condividi un file su Google Drive impostando il tuo compagno come 'Commentatore', cosa potrà fare?",
        options: [
          "Cancellare l'intero file per sempre",
          "Visualizzare il testo e lasciare note e suggerimenti a margine senza cancellare il testo originale",
          "Cambiare la password del tuo account",
          "Non potrà aprire il file"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Il permesso di commentatore consente la revisione tra pari in totale sicurezza per il proprietario del file.",
        type: "multiple_choice"
      },
      {
        id: "q4_4",
        question: "ANALISI INDIZI: Ricevi un messaggio con oggetto 'VINCITA IPHONE: Clicca qui subito' da un indirizzo strano. Come ti comporti?",
        options: [
          "Clicchi subito inserendo la password del tuo account",
          "Riconosci il tentativo di truffa/spam, non clicchi e cancelli il messaggio",
          "Inoltri l'e-mail a tutti i tuoi compagni",
          "Rispondi con i dati della tua famiglia"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Promesse di regali facili e link urgenti sono tipici tentativi di truffa: mai cliccare sui link sospetti.",
        type: "error_analysis"
      },
      {
        id: "q4_5",
        question: "VERO o FALSO: Quando due compagni lavorano contemporaneamente sullo stesso file Google Documenti, le modifiche vengono salvate in automatico nel Cloud in tempo reale.",
        options: [
          "VERO, il salvataggio è continuo e c'è la cronologia delle versioni",
          "FALSO, bisogna salvare manualmente ogni 30 secondi su chiavetta",
          "VERO, ma solo se usiamo il cellulare",
          "FALSO, il Cloud cancella i file dopo un'ora"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 20,
        explanation: "Gli applicativi Cloud salvano continuamente ogni carattere digitato conservando la cronologia delle modifiche.",
        type: "true_false"
      }
    ]
  },
  {
    id: "quiz-1-21-word-videoscrittura",
    year: 1,
    week: 21,
    title: "Quiz Checkpoint 5: Videoscrittura, Paragrafi & Impaginazione",
    topic: "Margini, font leggibili, stili Titolo 1/2, tabelle e interruzioni di pagina",
    description: "Checkpoint sulla videoscrittura chiara e l'impaginazione professionale dei documenti.",
    questions: [
      {
        id: "q5_1",
        question: "Perché è utile usare gli stili predefiniti (come 'Titolo 1', 'Titolo 2') invece di ingrandire il testo a mano?",
        options: [
          "Perché fa consumare meno inchiostro alla stampante",
          "Perché crea un ordine chiaro nel documento e permette di creare il sommario automatico con un clic",
          "Perché impedisce agli altri di leggere il file",
          "Perché trasforma il documento in un foglio Excel"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Gli stili creano la gerarchia del documento, facilitano la lettura e generano gli indici in automatico.",
        type: "multiple_choice"
      },
      {
        id: "q5_2",
        question: "Qual è il modo corretto per iniziare a scrivere sulla pagina successiva in un programma di videoscrittura?",
        options: [
          "Premere il tasto Invio 25 volte di seguito",
          "Inserire un'Interruzione di Pagina (scorciatoia Ctrl + Invio)",
          "Rimpicciolire i margini a 0 cm",
          "Chiudere e riaprire il programma"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "L'interruzione di pagina manda il testo alla pagina seguente mantenendo l'impaginazione pulita.",
        type: "multiple_choice"
      },
      {
        id: "q5_3",
        question: "Cosa si intende per 'Interlinea' in una pagina di testo?",
        options: [
          "La distanza tra il foglio e la scrivania",
          "Lo spazio verticale che separa una riga di testo da quella successiva",
          "Il numero di colonne della pagina",
          "Il colore delle lettere"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "L'interlinea regola lo spazio tra le righe (es. 1.15 righe) rendendo la lettura piacevole e riposante.",
        type: "multiple_choice"
      },
      {
        id: "q5_4",
        question: "DEBUGGING LAYOUT: Inserisci un'immagine nel documento ma le frasi si spezzano creando spazi vuoti disordinati. Cosa conviene fare?",
        options: [
          "Cancellare tutto il testo",
          "Regolare le opzioni di 'Testo a capo' dell'immagine (es. 'Inquadrato' o 'Sopra e sotto')",
          "Riavviare il computer",
          "Stampare in bianco e nero"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 30,
        explanation: "Impostare correttamente il 'Testo a capo' fa scorrere le righe attorno all'immagine in modo armonioso.",
        type: "error_analysis"
      },
      {
        id: "q5_5",
        question: "Perché prima di inviare un compito finale al docente via e-mail è buona norma salvarlo in formato PDF?",
        options: [
          "Perché in PDF il documento mantiene l'impaginazione identica su qualsiasi dispositivo e non si scompagina",
          "Perché i file PDF occupano sempre più di 1 Gigabyte",
          "Perché il PDF può essere aperto solo con videogiochi",
          "Perché cancella tutte le immagini"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 20,
        explanation: "Il formato PDF fissa il layout visivo garantendo che il professore veda la pagina esattamente come l'hai impaginata.",
        type: "multiple_choice"
      }
    ]
  },
  {
    id: "quiz-1-25-excel-base",
    year: 1,
    week: 25,
    title: "Quiz Checkpoint 6: Propedeutica Logica & Foglio di Calcolo Base",
    topic: "Condizioni VERO/FALSO, interruttori ON/OFF, celle, formule (+, -, *, /) e riferimenti $",
    description: "Checkpoint fondamentale sulla logica delle decisioni e i primi calcoli con formule in Excel.",
    questions: [
      {
        id: "q6_1",
        question: "Nella logica digitale e nei circuiti con interruttori, quali sono i due soli valori possibili?",
        options: [
          "Molto / Poco",
          "VERO (ON / 1) oppure FALSO (OFF / 0)",
          "Rosso / Giallo / Verde",
          "Positivo / Negativo / Neutro"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Nel mondo digitale ogni condizione o interruttore può assumere solo due stati: VERO (acceso) o FALSO (spento).",
        type: "multiple_choice"
      },
      {
        id: "q6_2",
        question: "Con quale simbolo DEVE iniziare qualsiasi formula di calcolo in Excel o Google Fogli?",
        options: [
          "Con il punto di domanda `?`",
          "Con il simbolo di uguale `=`",
          "Con il cancelletto `#`",
          "Con la lettera `X`"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 15,
        explanation: "Il segno `=` dice al foglio che quella cella contiene un calcolo matematico o una formula automatica.",
        type: "multiple_choice"
      },
      {
        id: "q6_3",
        question: "Nella formula `=A2*$B$1`, a cosa serve il simbolo del dollaro `$B$1`?",
        options: [
          "A convertire il valore in valuta Dollari americani",
          "A bloccare la cella B1 (riferimento assoluto) quando trascini la formula verso il basso",
          "A proteggere la cella con una password",
          "A segnalare un errore di battitura"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Il simbolo `$` blocca le coordinate della cella (riferimento assoluto) evitando che si sposti quando copi la formula.",
        type: "multiple_choice"
      },
      {
        id: "q6_4",
        question: "DEBUGGING CALCOLI: Quale formula calcola correttamente la somma di tutte le celle da B2 fino a B10?",
        options: [
          "`=B2+B10`",
          "`=SOMMA(B2:B10)`",
          "`=TOTALE B2 a B10`",
          "`SOMMA(B2:B10)` senza il segno uguale"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "La funzione `=SOMMA(B2:B10)` usa i due punti per includere tutte le celle dell'intervallo continuo.",
        type: "error_analysis"
      },
      {
        id: "q6_5",
        question: "Cosa compare nella cella se una colonna è troppo stretta per mostrare un numero lungo?",
        options: [
          "Una serie di cancelletti `#####` (basta allargare la colonna)",
          "Il computer si spegne da solo",
          "Il numero viene cancellato per sempre",
          "La cella diventa verde fosforescente"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 20,
        explanation: "I cancelletti `#####` sono solo un avviso visivo: basta fare doppio clic sul bordo della colonna per allargarla.",
        type: "multiple_choice"
      }
    ]
  },

  // ==========================================
  // CLASSE SECONDA (6 QUIZ)
  // ==========================================
  {
    id: "quiz-2-03-cybersecurity",
    year: 2,
    week: 3,
    title: "Quiz Checkpoint 7: Cybersecurity, Phishing & Autenticazione 2FA",
    topic: "Malware, Ransomware, Phishing, Passphrase robuste e Autenticazione a Due Fattori (2FA)",
    description: "Verifica delle competenze pratiche di difesa dai pericoli online e gestione sicura degli account.",
    questions: [
      {
        id: "q7_1",
        question: "Cos'è il 'Phishing' e come cercano di ingannarci i truffatori online?",
        options: [
          "Un programma per ascoltare musica gratis",
          "Messaggi o e-mail ingannevoli che imitano aziende note per farci cliccare su link malevoli e rubare password",
          "Un cavo per collegare la stampante",
          "Un aggiornamento ufficiale di Windows"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Il phishing usa l'inganno per spingere l'utente a cedere credenziali o cliccare su link truffaldini.",
        type: "multiple_choice"
      },
      {
        id: "q7_2",
        question: "Quale tra queste è una 'Passphrase' molto sicura e facile da ricordare per l'utente?",
        options: [
          "`12345678`",
          "`Marco2026`",
          "`Balena!Verde#Salterina2026` (4 o più parole casuali con simboli)",
          "`password`"
        ],
        correctOptionIndex: 2,
        timeLimitSeconds: 20,
        explanation: "Una passphrase formata da più parole casuali è facilissima da memorizzare ma quasi impossibile da forzare per un computer.",
        type: "multiple_choice"
      },
      {
        id: "q7_3",
        question: "Come funziona l'Autenticazione a Due Fattori (2FA) quando accedi al tuo account?",
        options: [
          "Devi digitare la stessa password due volte di fila",
          "Oltre alla password, richiede un secondo codice di conferma generato su un'app dello smartphone (es. Google Authenticator)",
          "Obbliga due studenti a usare la stessa tastiera",
          "Richiede di cambiare computer ogni giorno"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "La 2FA aggiunge un secondo scudo: anche se qualcuno scopre la tua password, non può entrare senza il tuo smartphone.",
        type: "multiple_choice"
      },
      {
        id: "q7_4",
        question: "CASO STUDIO: Ricevi un SMS: 'Pacco bloccato alla dogana, clicca qui e paga 2€ entro 1 ora'. Qual è la reazione corretta?",
        options: [
          "Cliccare subito e inserire la carta di credito dei genitori",
          "Riconoscere il tentativo di Smishing (phishing via SMS), non cliccare sul link e cancellare il messaggio",
          "Inviare il messaggio a tutti i compagni di classe",
          "Richiamare il numero sconosciuto"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 30,
        explanation: "I messaggi urgenti su pacchi inaspettati sono tentativi classici di Smishing per rubare soldi o dati.",
        type: "error_analysis"
      },
      {
        id: "q7_5",
        question: "VERO o FALSO: Usare la stessa password identica per la posta della scuola, Instagram, TikTok e i videogiochi è una scelta comoda e priva di rischi.",
        options: [
          "VERO, tanto nessuno prova a rubare account agli studenti",
          "FALSO, se un solo servizio viene violato, i criminali possono entrare in tutti gli altri tuoi account",
          "VERO, purché la password sia lunga almeno 6 lettere",
          "FALSO, perché le password scadono ogni 24 ore"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Ogni account importante deve avere una password univoca, per evitare che una singola violazione comprometta tutti i profili.",
        type: "true_false"
      }
    ]
  },
  {
    id: "quiz-2-06-privacy-crittografia",
    year: 2,
    week: 6,
    title: "Quiz Checkpoint 8: Privacy GDPR, Dati Personali & Impronta Digitale",
    topic: "Regolamento GDPR spiegato semplice, tutela dei dati personali, lucchetto HTTPS e reputazione online",
    description: "Test sulla protezione della propria vita privata online, la consapevolezza dei dati e il rispetto altrui.",
    questions: [
      {
        id: "q8_1",
        question: "Secondo il regolamento europeo sulla Privacy (GDPR), cosa si intende per 'Dato Personale'?",
        options: [
          "Solo il codice segreto della cassaforte",
          "Qualsiasi informazione che permette di identificare una persona reale (nome, foto, geolocalizzazione, voce, e-mail)",
          "Il modello della scheda madre del computer",
          "Il prezzo dei componenti hardware"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "I dati personali includono tutto ciò che ci rende identificabili: nome, immagini, posizione e cronologia.",
        type: "multiple_choice"
      },
      {
        id: "q8_2",
        question: "Cosa indica l'icona del 'Lucchetto' e la dicitura `https://` nella barra degli indirizzi del browser?",
        options: [
          "Che il sito web è a pagamento",
          "Che la connessione con il sito è protetta e i dati scambiati (es. password) viaggiano in modo riservato",
          "Che il computer ha la memoria piena",
          "Che il sito web è bloccato e non funziona"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Il protocollo HTTPS garantisce che la connessione tra il tuo browser e il server web sia protetta da intercettazioni.",
        type: "multiple_choice"
      },
      {
        id: "q8_3",
        question: "Cosa si intende per 'Impronta Digitale' (Digital Footprint)?",
        options: [
          "L'impronta del pollice lasciata sulla tastiera del computer",
          "La traccia permanente lasciata online dalle nostre attività (post, commenti, foto pubblicate, ricerche web)",
          "Il consumo energetico del monitor in standby",
          "Un programma per disegnare col mouse"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "La nostra impronta digitale è l'insieme delle tracce che lasciamo in rete: è duratura e definisce la nostra reputazione online.",
        type: "multiple_choice"
      },
      {
        id: "q8_4",
        question: "CASO STUDIO: Durante una festa a scuola scatti un video buffo a un compagno. Vuoi pubblicarlo sui social. Cosa devi fare prima?",
        options: [
          "Pubblicarlo subito senza dire niente",
          "Chiedere sempre il suo consenso esplicito prima di condividere immagini o video di altre persone in rete",
          "Aggiungere una musica prima di pubblicarlo senza chiedere",
          "Inviarlo a tutti i tuoi contatti"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Rispettare la privacy altrui significa chiedere sempre il consenso prima di diffondere immagini o informazioni altrui.",
        type: "error_analysis"
      },
      {
        id: "q8_5",
        question: "VERO o FALSO: Nel regolamento GDPR, il 'Diritto all'Oblio' permette alle persone di chiedere la rimozione dei propri dati personali dal Web quando non sono più necessari.",
        options: [
          "VERO, è un diritto fondamentale a tutela della dignità e riservatezza della persona",
          "FALSO, tutto ciò che viene scritto online deve rimanere per sempre visibile per legge",
          "VERO, ma solo se si paga una somma di denaro al motore di ricerca",
          "FALSO, i siti web non possono mai cancellare informazioni"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 20,
        explanation: "L'art. 17 del GDPR riconosce il diritto alla cancellazione dei propri dati dai motori di ricerca e dai portali online.",
        type: "true_false"
      }
    ]
  },
  {
    id: "quiz-2-08-word-avanzato",
    year: 2,
    week: 8,
    title: "Quiz Checkpoint 9: Documenti Strutturati & Stampa Unione",
    topic: "Tabelle avanzate, modelli aziendali e generazione automatica lettere con Stampa Unione",
    description: "Verifica sull'automazione documentale e la fusione tra testo e tabelle dati.",
    questions: [
      {
        id: "q9_1",
        question: "A cosa serve la funzionalità di 'Stampa Unione' (Mail Merge)?",
        options: [
          "A collegare due stampanti con un cavo",
          "A generare automaticamente documenti personalizzati (lettere, attestati, etichette) unendo un modello a una lista Excel",
          "A stampare solo in bianco e nero",
          "A comprimere file di testo"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "La Stampa Unione unisce un documento modello ai dati di una tabella per creare centinaia di lettere personalizzate in pochi istanti.",
        type: "multiple_choice"
      },
      {
        id: "q9_2",
        question: "Quali sono i due elementi indispensabili per effettuare una Stampa Unione?",
        options: [
          "Il documento modello (principale) e l'origine dei dati (la tabella con i nominativi)",
          "Due computer collegati col bluetooth",
          "Una fotocamera digitale e un microfono",
          "Un file audio MP3 e una stampante laser"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 20,
        explanation: "Servono sempre la matrice di testo con i campi segnaposto e la tabella contenente i dati da inserire.",
        type: "multiple_choice"
      },
      {
        id: "q9_3",
        question: "Cosa rappresentano i 'Campi Unione' (es. `<<Nome>>`, `<<Città>>`) inseriti nel testo del modello?",
        options: [
          "Segnaposto che indicano dove inserire il valore corrispondente alla colonna della tabella",
          "Formule matematiche per sommare voti",
          "Errori di scrittura del programma",
          "Comandi per spegnere la stampante"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 20,
        explanation: "I campi unione dicono al programma dove posizionare il nome, cognome o indirizzo per ciascuna persona dell'elenco.",
        type: "multiple_choice"
      },
      {
        id: "q9_4",
        question: "DEBUGGING STAMPA UNIONE: Nella lettera finale vedi ancora scritto `<<Cognome>>` invece del cognome reale. Qual è la causa?",
        options: [
          "Il programma non funziona",
          "Sei ancora nella schermata di anteprima e non hai cliccato su 'Finalizza e unisci'",
          "La stampante non ha inchiostro",
          "Il testo è scritto in corsivo"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 30,
        explanation: "I documenti reali vengono generati completando il comando 'Finalizza e unisci' (Finish & Merge).",
        type: "error_analysis"
      },
      {
        id: "q9_5",
        question: "VERO o FALSO: Con la Stampa Unione è possibile creare anche fogli di etichette adesive personalizzate per buste e pacchi.",
        options: [
          "VERO, Word supporta i formati standard per griglie di etichette",
          "FALSO, le etichette possono essere scritte solo a mano",
          "VERO, ma solo per un massimo di 3 persone",
          "FALSO, la stampa unione crea solo fogli A4 singoli"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 20,
        explanation: "La procedura guidata etichette impagina automaticamente i nominativi sulla griglia adesiva desiderata.",
        type: "true_false"
      }
    ]
  },
  {
    id: "quiz-2-10-excel-logica",
    year: 2,
    week: 10,
    title: "Quiz Checkpoint 10: Logica Booleana (AND, OR, NOT) & Funzione =SE()",
    topic: "Porte logiche AND/OR/NOT, tabelle di verità, funzione =SE() e controlli multipli =E() / =O()",
    description: "Checkpoint sul ponte logico tra teoria booleana e automazione delle decisioni nei fogli di calcolo.",
    questions: [
      {
        id: "q10_1",
        question: "Qual è la sintassi corretta della funzione logica `=SE()` in Excel per prendere una decisione automatica?",
        options: [
          "`=SE(valore_se_vero; valore_se_falso; condizione)`",
          "`=SE(condizione; valore_se_VERO; valore_se_FALSO)`",
          "`=SE(somma; media; totale)`",
          "`=SE(riga; colonna)`"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La funzione `=SE()` valuta la condizione: se è vera restituisce il primo valore, altrimenti restituisce il secondo.",
        type: "multiple_choice"
      },
      {
        id: "q10_2",
        question: "Quando l'operatore logico AND (funzione `=E()`) restituisce il valore VERO?",
        options: [
          "Quando almeno una condizione è vera",
          "Solo quando TUTTE le condizioni verificate sono contemporaneamente VERE",
          "Quando tutte le condizioni sono false",
          "Sempre"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La porta AND (E) richiede che tutte le condizioni siano verificate affinché l'esito finale sia VERO.",
        type: "multiple_choice"
      },
      {
        id: "q10_3",
        question: "Quando l'operatore logico OR (funzione `=O()`) restituisce il valore VERO?",
        options: [
          "Solo quando tutte le condizioni sono contemporaneamente vere",
          "Basta che ALMENO UNA delle condizioni sia VERA",
          "Mai",
          "Solo se la cella è vuota"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La porta OR (O) è una disgiunzione: è sufficiente una sola condizione vera per rendere vero l'intero controllo.",
        type: "multiple_choice"
      },
      {
        id: "q10_4",
        question: "DEBUGGING FORMULE: Uno studente scrive `=SE(A1>=6; \"Promosso\"; \"Debito\")`. Se la cella A1 contiene il valore 8, cosa apparirà?",
        options: [
          "`Debito`",
          "`Promosso`",
          "`8`",
          "`#ERRORE!`"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Poiché 8 è maggiore o uguale a 6, la condizione è VERA e la formula restituisce la parola 'Promosso'.",
        type: "error_analysis"
      },
      {
        id: "q10_5",
        question: "A cosa serve la 'Formattazione Condizionale' in un foglio di calcolo?",
        options: [
          "A cancellare le righe vuote",
          "A colorare ed evidenziare in automatico le celle che rispettano una regola (es. celle < 6 colorate di rosso)",
          "A chiudere il programma",
          "A cambiare la data del computer"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La formattazione condizionale colora i dati in modo dinamico per evidenziare alert e risultati a colpo d'occhio.",
        type: "multiple_choice"
      }
    ]
  },
  {
    id: "quiz-2-13-database",
    year: 2,
    week: 13,
    title: "Quiz Checkpoint 11: Basi di Dati Relazionali, Tabelle & Query",
    topic: "RDBMS, tabelle, campi, record, chiavi primarie (PK), relazioni e query di selezione",
    description: "Verifica sull'organizzazione dei dati strutturati, integrità dei record e ricerche mirate con query.",
    questions: [
      {
        id: "q11_1",
        question: "In una tabella di un database relazionale, cosa rappresenta una singola RIGA?",
        options: [
          "Un campo (attributo)",
          "Un Record (insieme completo di tutti i dati relativi a un singolo elemento, es. uno studente)",
          "Una cartella di file",
          "Un font di testo"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "La riga della tabella è il record (istanza) che raccoglie tutti i campi riferiti a una singola entità.",
        type: "multiple_choice"
      },
      {
        id: "q11_2",
        question: "Cos'è la 'Chiave Primaria' (Primary Key) in una tabella di database?",
        options: [
          "La password per accendere il computer",
          "Un codice univoco che identifica senza ambiguità ogni singolo record (es. Codice Fiscale, ID_Studente)",
          "Il nome dell'insegnante",
          "Il pulsante per cancellare i dati"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "La chiave primaria garantisce che non esistano record duplicati identificando ciascuna riga in modo certo.",
        type: "multiple_choice"
      },
      {
        id: "q11_3",
        question: "A cosa serve una 'Query di Selezione' in un database?",
        options: [
          "A cambiare il colore delle finestre",
          "A filtrare e mostrare solo i record che rispettano determinati criteri (es. libri pubblicati dopo il 2020)",
          "A formattare l'hard disk",
          "A stampare il desktop"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "La query interroga le tabelle del database estraendo solo i dati che soddisfano le condizioni richieste.",
        type: "multiple_choice"
      },
      {
        id: "q11_4",
        question: "ANALISI STRUTTURA: In un database per la biblioteca scolastica abbiamo `Libri` e `Prestiti`. Perché è meglio un database rispetto a un file di testo non strutturato?",
        options: [
          "Perché un database organizza i dati in tabelle collegate, evitando duplicazioni ed errori di trascrizione",
          "Perché il file di testo consuma troppa batteria",
          "Perché i database funzionano solo senza Internet",
          "Perché i libri non possono essere scritti al computer"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 30,
        explanation: "I database relazionali garantiscono ordine, integrità referenziale ed eliminano dati ridondanti.",
        type: "error_analysis"
      },
      {
        id: "q11_5",
        question: "VERO o FALSO: In una tabella di un database è buona abitudine inserire nome, cognome, indirizzo e numero di telefono tutti uniti in una sola colonna.",
        options: [
          "VERO, così la tabella ha una sola colonna",
          "FALSO, separare i dati in campi distinti permette di ordinare per cognome, filtrare per città e fare ricerche",
          "VERO, ma solo per archivi con meno di 5 persone",
          "FALSO, i database possono contenere solo numeri"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Mantenere i campi atomici (`Nome`, `Cognome`, `Città`) è la prima regola per consentire ricerche e ordinamenti efficaci.",
        type: "true_false"
      }
    ]
  },
  {
    id: "quiz-2-26-coding-scratch",
    year: 2,
    week: 26,
    title: "Quiz Checkpoint 12: Pensiero Computazionale & Programmazione a Blocchi",
    topic: "Algoritmi, diagrammi di flusso, sequenze, cicli, condizioni logiche, coordinate X/Y e variabili in Scratch",
    description: "Test di sintesi sul coding visuale, la risoluzione di problemi e il debugging di videogiochi.",
    questions: [
      {
        id: "q12_1",
        question: "Quali sono le caratteristiche fondamentali che definiscono un 'Algoritmo'?",
        options: [
          "Lungo almeno 50 pagine e scritto in inglese",
          "Una sequenza finita, ordinata e non ambigua di istruzioni per risolvere un problema",
          "Un tipo speciale di tastiera da gaming",
          "Un programma a pagamento"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "Un algoritmo è una ricetta logica passo-passo che indica con precisione le operazioni da compiere per giungere al risultato.",
        type: "multiple_choice"
      },
      {
        id: "q12_2",
        question: "In Scratch 3.0, quale blocco di controllo permette di ripetere un'azione continuamente finché il gioco non finisce?",
        options: [
          "Il blocco `ripeti (10) volte`",
          "Il blocco `per sempre` (ciclo infinito)",
          "Il blocco `se ... allora`",
          "Il blocco `attendi (1) secondi`"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Il blocco `per sempre` esegue a ripetizione continua le istruzioni inserite al suo interno per tutta la partita.",
        type: "multiple_choice"
      },
      {
        id: "q12_3",
        question: "A cosa serve una 'Variabile' in Scratch (es. `Punti`, `Vite`, `Timer`)?",
        options: [
          "A cambiare il colore dello sfondo",
          "A memorizzare un valore che può cambiare durante il gioco (es. aumentare il punteggio)",
          "A salvare il file su chiavetta",
          "A cancellare lo sprite"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 20,
        explanation: "Una variabile è un cassetto di memoria che conserva un dato modificabile nel tempo durante l'esecuzione.",
        type: "multiple_choice"
      },
      {
        id: "q12_4",
        question: "DEBUGGING SCRATCH: Vuoi che il personaggio si muova verso destra premendo la freccia destra, ma invece sale verso l'alto. Qual è l'errore?",
        options: [
          "È stato usato il blocco 'cambia Y di 10' invece del blocco 'cambia X di 10'",
          "Il volume del computer è troppo basso",
          "Lo sprite ha troppi costumi",
          "È stato premuto il tasto Invio"
        ],
        correctOptionIndex: 0,
        timeLimitSeconds: 30,
        explanation: "L'asse X governa il movimento orizzontale (destra/sinistra), mentre l'asse Y governa il movimento verticale (alto/basso).",
        type: "error_analysis"
      },
      {
        id: "q12_5",
        question: "A cosa serve il blocco di invio e ricezione 'Messaggio' (Broadcast) in Scratch?",
        options: [
          "A inviare un'e-mail su Gmail",
          "A far comunicare e sincronizzare due sprite diversi (es. quando clicchi START, il personaggio inizia a muoversi)",
          "A stampare su carta il disegno",
          "A velocizzare la CPU del PC"
        ],
        correctOptionIndex: 1,
        timeLimitSeconds: 25,
        explanation: "I messaggi broadcast permettono a più elementi del gioco di comunicare e coordinare le loro azioni in modo fluido.",
        type: "multiple_choice"
      }
    ]
  }
];
