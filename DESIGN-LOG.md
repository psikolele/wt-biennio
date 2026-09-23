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
