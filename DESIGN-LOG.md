# DESIGN LOG — Ingegneria Didattica & Crittografia Classe 5ª

## Contesto e Decisioni di Progetto (Frederick P. Brooks, *The Design of Design*)

### 2026-09-16 — Spostamento e Potenziamento Palestra Crittografia
- **Problema**: La "Palestra Operativa di Crittografia" si trovava isolata nella Home Page generale del portale, disconnessa dal flusso settimanale della Classe 5ª. Inoltre, mancavano gli algoritmi cardine di *Crittografia Polialfabetica Dinamica* (Slide 3-7 di `CRITTOGRAFIA n2.pptx`) e la simulazione concettuale di *Crittografia Asimmetrica*.
- **Decisione Arbitro Concettuale (Utente)**:
  1. Rimozione totale della palestra dalla Home Page.
  2. Collocazione nativa mirata nelle settimane di Classe 5:
     - **Settimana 01**: Laboratorio Sostituzione & Modulo 21 (Cifrario di Cesare classico, gestione modulo per numeri negativi, esercizi *CLASSE*, *ANNA*, *DEG*, *CADO*).
     - **Settimana 03**: Laboratorio Avanzato con XOR Bit a Bit, Crittografia Polialfabetica Dinamica (*ALLA*, *MIA*, *SCUOLA*) e Simulatore Asimmetrico (Alice & Bob, chiavi pubbliche e private per riservatezza e firma digitale).
  3. Adozione TDD rigoroso con `tests/crypto.test.mjs` a copertura di tutte le regole matematiche e degli esercizi d'esame.
- **Budgeted Resource**:
  - Zero regressioni sui 17 test esistenti.
  - Nessuna dipendenza esterna aggiuntiva (zero overhead su bundle).
  - Piena accessibilità (WCAG AA, font monospaziato per formule e passaggi algebrici).

### 2026-09-16 — Protezione Selettiva con Password per le 5 Classi
- **Problema**: Prima del deploy, ogni sezione annuale (`/anno/1` ... `/anno/5` e relative settimane) deve essere protetta da una password specifica, in modo che gli studenti di una classe non entrino direttamente nelle lezioni delle altre classi.
- **Decisione Architetturale**:
  1. Le 5 password risiedono nelle variabili d'ambiente `CLASS_1_PASSWORD` … `CLASS_5_PASSWORD` (Vercel + `.env.local`, ignorato da Git). I valori non vanno mai scritti nella repo, che è pubblica.
  2. Creazione del componente protettivo [`ClassGate`](app/components/class-gate.tsx) integrato nel layout [`app/anno/[year]/layout.tsx`](app/anno/[year]/layout.tsx) e in `app/anno/1/lezione-0/page.tsx`.
  3. Endpoint API [`/api/class-auth`](app/api/class-auth/route.ts) per login, verifica della sessione (cookie con validità 30 giorni) e logout (`Blocca sezione`).
  4. Passepartout Docente: chi è autenticato con `TEACHER_PASSWORD` o inserisce la password docenti ha accesso automatico a qualsiasi sezione.
  5. Test automatizzati aggiunti in [`tests/auth.test.mjs`](tests/auth.test.mjs) per verificare l'isolamento cross-class e il bypass del docente.

### 2026-09-22 — Inversione Didattica Settimane 2 & 3 e Integrazione Slide Doppia Cifratura
- **Problema**: L'ordinamento didattico della Classe 5 prevedeva prima il laboratorio pratico e poi la teoria asimmetrica/blockchain. Inoltre, le slide di cattedra sul sistema a doppia cifratura con chiave asimmetrica non erano collegate direttamente nella card della lezione. I pulsanti per le slide usavano un'etichetta generica ("Scarica Slide (.pptx)") invece del nome esplicito del tema senza caratteri speciali.
- **Decisione Concettuale**:
  1. **Settimana 02 (Concetto, 2h)**: Spostata *Crittografia Asimmetrica, Funzioni Hash e Blockchain* (id: `5-02`) come seconda settimana, includendo la Palestra Operativa interattiva (XOR, Polialfabetica & Asimmetrica PKI) e il collegamento alle slide:
     - `Sistema-a-Doppia-Cifratura-Usando-la-Chiave-Asimmetrica.pptx` (etichetta: *Sistema Doppia Cifratura Asimmetrica*)
     - `CRITTOGRAFIA n2.pptx` (etichetta: *Crittografia Asimmetrica e XOR*)
  2. **Settimana 03 (Laboratorio, 2h)**: Collocato *Hands-on Lab: Cifratura Web & File (CyberChef e AES-256)* (id: `5-03`) come terza settimana di consolidamento pratico.
  3. **Pulsanti e SlideViewer**: Eliminato il testo generico "Scarica Slide" in favore del nome parlante e pulito delle slide (senza simboli come `_`, `-`, `.`).
  4. Nessuna regressione sui test unitari (`npm test` con 23/23 pass).


### 2026-09-23 — Hardening autenticazione dopo tentativo di brute force
- **Problema**: il 23/09 ~117.600 tentativi automatici su `/api/teacher-login` (12:43–12:56) senza alcun limite. Password di classe di default (`classeN`) documentate in questa repo pubblica; fallback `change-me`; la password docente era anche chiave HMAC dei cookie; `ClassGate` solo lato client (contenuti inviati al browser anche a sezione bloccata); CSV quiz con risposte scaricabili senza login.
- **Decisione**:
  1. Fail-closed: nessuna password di default. Variabile mancante = accesso negato.
  2. `SESSION_SECRET` separato da `TEACHER_PASSWORD` (ripiego su `TEACHER_PASSWORD` finché non configurato). Ruotarlo invalida tutte le sessioni.
  3. Limite tentativi falliti per IP in memoria (`app/lib/rate-limit-core.mjs`): docenti 8/15 min, classi 40/10 min (IP scolastico condiviso via NAT). Da affiancare a una regola Vercel Firewall.
  4. Verifica sessione classe lato server (`app/lib/class-access.ts`) nel layout **e in ogni pagina** di `/anno/[year]`: Next serializza il payload della pagina anche se il layout non renderizza i children, quindi il controllo nel solo layout non basta.
  5. `/api/quizzes/*` richiede sessione docente.


### 2026-09-30 — Integrazione Completa 5 Classi nella Console Docenti (Hub Didattico & Piani Settimanali)
- **Problema**: La Console Docenti (`/docenti`) era limitata al biennio e non esponeva il quadro organico delle 5 classi (1ª TIC, 2ª TIC, 3ª INF, 4ª INF, 5ª INF). Mancava la navigazione del piano didattico annuale (33 settimane a classe), l'accesso alle UDA ministeriali/d'istituto dai documenti ufficiali del docente, il download dei `.docx` d'istituto e la mappatura dei compiti facilitati BES/DSA e verifiche per il triennio.
- **Decisione Concettuale (Allineamento `/grill-me`)**:
  1. **Hub Didattico in Primo Piano**: Componente interattivo [`TeacherClassesHub`](app/components/teacher-classes-hub.tsx) con selettore delle 5 classi sotto l'header.
  2. **Architettura a 3 Sotto-Tab per Classe**:
     - *Piano Didattico Settimanale (33 Settimane)*: Ricerca testuale e filtri per tipologia (laboratorio, teoria, progetto, verifica). Visualizza minutaggi delle fasi, competenze, evidenze e in risalto l'adattamento didattico BES/DSA (`facilitatedTask`) con link diretto alla lezione studente.
     - *UDA & Competenze Ministeriali*: Mappatura formale di tutte le UDA estratte dai documenti ministeriali del docente (`PROGRAMMAZIONE_DOCX`), con competenze in uscita, abilità, conoscenze, contenuti, metodologie e tipologie di verifica.
     - *Verifiche, Laboratori & Criteri*: Strategie formative/sommative, criteri collegiali e collegamenti diretti agli strumenti (Quiz LIM, Scratch, Access/SQL, Interactive Crypto Lab per la 5ª, Wireshark, Packet Tracer e Capstone Project per l'Esame di Stato).
  3. **File Ufficiali Scaricabili**: I documenti `.docx` di programmazione annuale per ciascuna delle 5 classi e le proposte UDA (Biennio e Triennio) sono resi scaricabili in `public/downloads/programmazioni/`.
  4. **Test di Regressione e Certificazione**: Aggiunto [`tests/teacher-hub.test.mjs`](tests/teacher-hub.test.mjs) per verificare integrità delle 5 classi, UDA e file `.docx`. Totale test suite: 28/28 passati, build Next.js (193 pagine statiche/dinamiche) a zero errori.

