---
title: Laboratorio Digitale — Second Brain Knowledge Base & LLM Handover
type: knowledge-base
system: Next.js 16 App Router (Turbopack)
target: Scuola Secondaria di Secondo Grado (Informatica Classi 1-5)
version: 1.2.0
tags:
  - education
  - computer-science
  - nextjs
  - second-brain
  - curriculum
  - accessibility
  - agenta-dark
created: 2026-09-05
status: active
---

# Laboratorio Digitale — Second Brain & LLM Context Document

> **Scopo di questo documento**: Fornire una base di conoscenza autosufficiente ad alta densità informativa per l'ingestione in un Second Brain (Obsidian, Notion, Logseq, NotebookLM) e per il passaggio di consegne a qualsiasi nuova chat LLM senza perdita di contesto.

---

## 1. Visione del Prodotto e Obiettivi Didattici

- **Progetto**: Portale web per la didattica laboratoriale di Informatica negli Istituti Tecnici e Professionali (anno scolastico 2026/2027).
- **Pubblico primario**: Studenti delle classi 1ª, 2ª (biennio attivo) e 3ª, 4ª, 5ª (triennio in roadmap).
- **Pubblico secondario**: Docenti di informatica (area riservata con autenticazione a sessione firmata e note didattiche).
- **Filosofia pedagogica**:
  - **Azione prima della teoria**: ogni sessione parte da una situazione-problema o da una sfida a computer prima di spiegazioni teoriche.
  - **Fasi temporizzate da 120 minuti** (2 ore settimanali, 33 settimane = 66 ore per classe).
  - **Traccia concreta e portfolio**: ogni settimana produce un file salvato, uno screenshot o un codice archiviato.
  - **Inclusione e accessibilità nativa**: strumenti per dislessia (font ad alta leggibilità, righello di lettura, contrasto elevato, istruzioni brevi e task facilitato per DSA).
  - **Privacy totale**: nessun tracciamento né raccolta dati personali non necessari.

---

## 2. Architettura Tecnica e Stack

- **Framework**: Next.js 16.2.6 (App Router con Turbopack)
- **Runtime & Linguaggio**: React 19.2.4, TypeScript 5, Node.js v20+
- **Styling**: Tailwind CSS v4 con variabili CSS custom dark laboratory
- **Animazioni & Rendering**:
  - `framer-motion` v12
  - `lucide-react` v1.14
  - `opentype.js` (caricato dinamicamente via CDN per il rendering vettoriale dei font TTF in percorsi SVG a mano libera)
- **Suite di Test**: Node.js test runner nativo (`node --test tests/*.test.mjs`), 10 suite di test su invarianti editoriali, accessibilità e navigazione.
- **Produzione**: 76 pagine statiche prerenderizzate (SSG) per le rotte del biennio.

---

## 3. Mappa dei File e Struttura del Repository

```
wt-biennio/
├── app/
│   ├── page.tsx                             # Landing page con roadmap 1-5, hero dinamico, metodo e footer
│   ├── layout.tsx                           # Layout principale con meta tag e font
│   ├── globals.css                          # Design system globale dark laboratory (Agenta-inspired)
│   ├── anno/
│   │   └── [year]/
│   │       ├── page.tsx                     # Indice annuale delle 33 settimane e macroaree tematiche
│   │       └── settimana/
│   │           └── [week]/
│   │               └── page.tsx             # Pagina dettagliata della singola lezione settimanale (120 min)
│   ├── components/
│   │   ├── lesson-card.tsx                  # Scheda lezione: fasi, materiali, flash card, DSA, verifiche
│   │   ├── accessible-content.tsx           # Toolbar di accessibilità (font dislessia, righello, zoom)
│   │   ├── diagnostic-test.tsx              # Test diagnostico d'ingresso (accoglienza classi 1ª)
│   │   ├── gamification-panel.tsx           # Sistema leggero di missioni e badge di competenza
│   │   └── slide-viewer.tsx                 # Visualizzatore integrato per diapositive didattiche
│   ├── data/
│   │   ├── curriculum-data.mjs              # Sorgente dati di tutte le 66 lezioni del biennio
│   │   ├── curriculum.ts                    # Modello dati TypeScript, validatori e accessor getWeek/getYearWeeks
│   │   └── teacher-notes.ts                 # Note metodologiche per i docenti
│   ├── docenti/                             # Dashboard area docenti (protetta da sessione)
│   └── api/                                 # Endpoint server-side per login/logout docenti
├── components/
│   └── ui/
│       ├── handwriting-text.tsx             # Effetto calligrafico SVG con parsing glifi TTF
│       └── digital-serenity-animated-landing-page.tsx
├── docs/
│   ├── LLM-WIKI.md                          # Operativo per continuità LLM e vincoli di progetto
│   ├── PIANO-DIDATTICO-ALLINEAMENTO-LIBRO.md # Mappatura su volumi Hoepli (Clippy Cloud Plus)
│   ├── SECOND-BRAIN-INGEST.md               # [Questo file] Knowledge base per Second Brain
│   └── deployment.md                        # Note di rilascio e hosting
├── tests/                                   # Invarianti del curriculum, sicurezza, DSA e navigazione
└── PROGRAMMA_BIENNIO_2026-2027.md          # Programma didattico formale approvato
```

---

## 4. Modello Dati del Curriculum (`Lesson` & `Week`)

Ogni settimana segue scrupolosamente l'interfaccia TypeScript definita in `app/data/curriculum.ts`:

```typescript
export type Year = 1 | 2; // (3 in fase di definizione)

export type Lesson = {
  id: string;                               // Identificatore univoco (es. "y1w01")
  title: string;                            // Titolo dell'attività laboratoriale
  hours: number;                            // Sempre 2 ore per settimana
  book: string;                             // Riferimento a Macroarea/Unità Hoepli
  objectives: string[];                     // Obiettivi osservabili
  activity: string;                         // Descrizione della situazione-problema
  kind: "concept" | "laboratory" | "practice" | "review" | "project";
  explanation?: string;                     // Breve chiarimento teorico contestuale
  example?: string;                         // Esempio applicativo
  exercise: string;                         // Consegna pratica a computer
  deepDive?: string;                        // Approfondimento facoltativo
  competence: string;                       // Competenza attesa (DigComp / ministeriale)
  evidence: string;                         // Prodotto finale verificabile (file, screenshot)
  materials: string[];                      // Materiali di lavoro necessari
  phases: { label: string; minutes: number }[]; // Fasi temporizzate che sommano esattamente a 120 min
  quickCheck: string;                       // Domanda/controllo rapido a fine lezione
  flashCard: string;                        // Sintesi concettuale da memorizzare
  bookActivity: string;                     // Riferimento operativo al manuale
  platforms: string[];                      // Piattaforme/software utilizzati
  facilitatedTask: string;                  // Versione semplificata per DSA/BES
  game?: string;                            // Gamification (quiz Kahoot/Quizizz/missione)
  slideHref?: string;                       // Link alle slide della lezione
  studentCta: { label: string; href: string }[];
};

export type Week = {
  number: number;                           // Da 1 a 33
  theme: string;                            // Macrotema del modulo
  lessons: Lesson[];
};
```

---

## 5. Design System: Dark Laboratory (Agenta-Inspired)

- **Principio**: La pagina si comporta come una console di laboratorio seria, ordinata, non un template AI generico.
- **Palette cromatica**:
  - `Paper` (Sfondo base): `#08090F`
  - `Surface` (Card & pannelli): `#13131C`
  - `Surface-Soft`: `#1B192A`
  - `Primary` (Indaco azioni e wayfinding): `#AAA2FF`
  - `Green-Accent` (Stato positivo, completamento, live): `#72E3A3`
  - `Warning` (Accento ambra, attenzione): `#F3B76E`
  - `Line` (Bordi discreti): `#2F2B4B`
  - `Line-Strong`: `#6D65A3`
  - `Ink` (Testo principale): `#F5F3FF`
  - `Muted` (Testo secondario): `#A09DB7`
- **Regole estetiche**:
  - Niente gradienti decorativi casuali o effetto vetro ("glassmorphism").
  - Angoli compatti (`12px` - `16px`).
  - Contrasto elevato, navigazione da tastiera e supporto per la stampa dei fogli guida (`@media print`).

---

## 6. Il Componente `HandwritingText` (Novità v1.2)

- **File**: `components/ui/handwriting-text.tsx`
- **Funzionamento**:
  1. Scarica un file font `.ttf` (CORS-readable) e carica `opentype.js`.
  2. Converte i glifi del testo in vettori SVG suddividendoli per sotto-tracciati (`M...`).
  3. Applica un'animazione progressiva di `stroke-dashoffset` che simula la punta di una penna da sinistra a destra.
  4. Al termine del tratto, sfuma l'inchiostratura piena (`fill`) preservando i fori dei glifi (contatori).
  5. Cicla in modo continuo tra frasi didattiche:
     - *"una classe alla volta."*
     - *"un progetto alla volta."*
     - *"un laboratorio alla volta."*
     - *"un passo alla volta."*
  6. **Fallback graceful**: in assenza di rete o browser incompatibile degrada a testo normale `<span>`, senza causare errori.

---

## 7. Invarianti e Regole di Continuità per Agenti LLM

Quando un agente prende in carico il progetto in una nuova sessione, **deve rispettare questi vincoli inderogabili**:
1. **Preservare i test esistenti**: non modificare o abbassare le asserzioni di `tests/*.test.mjs`.
2. **Invariante delle 120 ore**: la somma delle `phases` di ciascuna lezione deve sempre risultare esattamente 120 minuti.
3. **Stato Classi**: Classi 1ª e 2ª sono completate. Classi 3ª, 4ª e 5ª devono rimanere `"In progettazione"` nella roadmap finché l'intero curriculum di 33 settimane non è pronto (nessun link fittizio 404).
4. **Comandi di validazione obbligatori**:
   ```bash
   npm test        # Tutti i 10 test devono passare
   npm run build   # La compilazione statica deve generare tutte le pagine senza errori
   ```
5. **Gestione del Server su Windows**:
   - Per verificare la UI, avviare il dev server (`npm run dev` o `npm start` dopo build).
   - In caso di conflitti su porta 3000, verificare i processi Node con `Get-NetTCPConnection -LocalPort 3000`.

---

## 8. Prossimi Sviluppi Prioritari (Roadmap)

1. **Curriculum 3ª Classe (Web & IDE Approach)**:
   - Utilizzare le indicazioni presenti in `INFO/Triennio/HTML+CSS IDE Approach`.
   - Moduli: Basi di Internet e architettura Client-Server, HTML5 semantico, CSS3 Flexbox/Grid, Responsive Web Design, IDE professionale (VS Code / browser developer tools).
   - Creare le 33 settimane e aggiungerle in `app/data/curriculum-data.mjs`.
2. **Abilitazione Rotta `/anno/3`**:
   - Aggiornare `app/data/curriculum.ts` estendendo `Year = 1 | 2 | 3`.
   - Rimuovere lo stato "In progettazione" per la 3ª classe nella home page.
3. **Espansione Risorse e Slide**:
   - Aggiungere deck di slide didattiche in formato HTML/MD in `public/slides/`.
