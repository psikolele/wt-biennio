# LLM Wiki — Laboratorio digitale

Questo file è il passaggio di consegne operativo per agenti che devono continuare il progetto senza perdere contesto.

## Stato attuale

- App Next.js nel percorso `wt-biennio`.
- Landing `/` con roadmap completa dalla 1ª alla 5ª classe.
- 1ª e 2ª classe disponibili su `/anno/1` e `/anno/2`.
- 3ª, 4ª e 5ª mostrate come **In progettazione**: non creare link fittizi finché il relativo curriculum non è completo.
- Ogni anno disponibile contiene 33 settimane da 2 ore (66 ore).
- Il dettaglio settimanale è `/anno/[year]/settimana/[week]`.

## Autonomia degli agenti

Prima di modificare il codice:

1. Eseguire `git status --short` e preservare le modifiche già presenti.
2. Leggere questo file, `PRODUCT.md` e `DESIGN.md`.
3. Cercare i dati esistenti in `app/data/curriculum-data.mjs` e i tipi in `app/data/curriculum.ts`.
4. Per modifiche di comportamento, aggiungere o aggiornare prima un test in `tests/`.
5. Dopo il lavoro eseguire `npm test` e `npm run build`.
6. Se la modifica riguarda la UI, verificare almeno `/`, `/anno/1` e una settimana su browser mobile e desktop.

In caso di esaurimento del contesto, ripartire da questa sezione e dal TODO più vicino. Non fare reset distruttivi, non riscrivere il curriculum già validato e non sostituire dati dell’utente senza conferma.

## Mappa del progetto

- `app/page.tsx`: landing, hero dinamico con HandwritingText e roadmap classi 1–5.
- `app/anno/[year]/page.tsx`: indice annuale e macroaree.
- `app/anno/[year]/settimana/[week]/page.tsx`: pagina della settimana.
- `app/components/lesson-card.tsx`: flusso didattico, materiali, Flash Card e controlli.
- `components/ui/handwriting-text.tsx`: componente animato di scrittura vettoriale TTF con opentype.js.
- `app/data/curriculum-data.mjs`: sorgente editoriale generata e mantenuta a mano.
- `app/data/curriculum.ts`: modello dati e accesso al curriculum.
- `app/globals.css`: sistema visuale globale, stile dark laboratorio ispirato ad Agenta.
- `DESIGN.md`: decisioni di design e token.
- `docs/PIANO-DIDATTICO-ALLINEAMENTO-LIBRO.md`: allineamento al libro Hoepli.
- `docs/SECOND-BRAIN-INGEST.md`: documento completo ad alta densità per Second Brain e handover chat.
- `tests/`: invarianti del curriculum, accessibilità, navigazione e CTA.

## Invarianti editoriali

Ogni lezione deve avere titolo, obiettivi, attività, esercizio, competenza, evidenza, materiali, piattaforme, fasi, controllo rapido, Flash Card, attività del libro e compito facilitato. Le fasi devono totalizzare 120 minuti.

Le lezioni di laboratorio e progetto partono dall’azione e non devono avere spiegazioni teoriche artificiali. Alternare concetto, laboratorio, pratica e ripasso; evitare testo generico o placeholder. I contenuti devono essere originali: usare il libro solo per struttura, temi e riferimenti bibliografici, senza copiare pagine o esercizi protetti.

## Direzione visuale

Mantenere il linguaggio già adottato: fondo quasi nero, superfici scure, indigo come azione primaria, verde per stato positivo, tipografia compatta, bordi sottili, contrasto alto e motion discreta. Evitare gradienti testuali, UI generiche, card ripetute senza gerarchia e link verso pagine non implementate. Ogni nuova interfaccia deve restare accessibile da tastiera, leggibile su mobile e coerente con `DESIGN.md`.

## TODO prioritario

1. Definire il programma della 3ª classe con temi, competenze e progetti reali.
2. Aggiungere i dati della 3ª classe solo quando tutte le 33 settimane rispettano le invarianti.
3. Ripetere lo stesso processo per 4ª e 5ª.
4. Collegare i materiali reali e le risorse esterne verificandone licenza e accessibilità.
5. Aggiungere test specifici per ogni nuova rotta pubblica.

## Comandi

```bash
npm run dev
npm test
npm run build
```

La build può fallire se manca una variabile d’ambiente richiesta dall’ambiente locale; in quel caso riportare l’errore esatto e distinguere sempre tra problema di codice e problema di configurazione.
