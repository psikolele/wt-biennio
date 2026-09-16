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
  1. Le 5 password risiedono nel file `.env.local` (già ignorato da Git in `.gitignore` tramite `.env*`):
     - `CLASS_1_PASSWORD=classe1`
     - `CLASS_2_PASSWORD=classe2`
     - `CLASS_3_PASSWORD=classe3`
     - `CLASS_4_PASSWORD=classe4`
     - `CLASS_5_PASSWORD=classe5`
  2. Creazione del componente protettivo [`ClassGate`](app/components/class-gate.tsx) integrato nel layout [`app/anno/[year]/layout.tsx`](app/anno/[year]/layout.tsx) e in `app/anno/1/lezione-0/page.tsx`.
  3. Endpoint API [`/api/class-auth`](app/api/class-auth/route.ts) per login, verifica della sessione (cookie con validità 30 giorni) e logout (`Blocca sezione`).
  4. Passepartout Docente: chi è autenticato con `TEACHER_PASSWORD` o inserisce la password docenti ha accesso automatico a qualsiasi sezione.
  5. Test automatizzati aggiunti in [`tests/auth.test.mjs`](tests/auth.test.mjs) per verificare l'isolamento cross-class e il bypass del docente.
