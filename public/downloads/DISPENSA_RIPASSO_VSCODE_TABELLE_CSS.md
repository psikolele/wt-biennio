# Scheda di Ripasso e Guida Operativa — HTML, CSS & VS Code
**Classe 4ª — Informatica e Tecnologie Web**  
*Riferimenti didattici ufficiali*: [W3Schools HTML Tables](https://www.w3schools.com/html/html_tables.asp) • [W3Schools How to Add CSS](https://www.w3schools.com/css/css_howto.asp)

---

## 1. Ambiente di Sviluppo: Visual Studio Code & Shortcut Essenziali

Visual Studio Code (VS Code) è l'ambiente di sviluppo integrato (IDE) standard per lo sviluppo web professionale. Per lavorare in modo fluido e veloce in laboratorio, è fondamentale acquisire familiarità con le scorciatoie da tastiera e con il motore di completamento rapido **Emmet**.

### 1.1 Estensioni Consigliate in Laboratorio
- **Live Server** (di Ritwick Dey): avvia un server locale con ricaricamento automatico della pagina ad ogni salvataggio (`Alt + L, Alt + O`).
- **Auto Rename Tag**: rinomina automaticamente il tag di chiusura quando modifichi quello di apertura.
- **Prettier - Code Formatter**: indenta e formatta il codice secondo le convenzioni standard.

### 1.2 Scorciatoie da Tastiera Fondamentali (Windows)

| Azione | Tasti di scelta rapida | Descrizione operativa |
|---|---|---|
| **Salva file** | `Ctrl + S` | Salva immediatamente le modifiche (se Live Server è attivo, aggiorna il browser). |
| **Commenta / Decommenta** | `Ctrl + /` | Trasforma la riga o la selezione in commento (`<!-- HTML -->` o `/* CSS */`). |
| **Formatta documento** | `Shift + Alt + F` | Riordina l'indentazione del codice in modo pulito e gerarchico. |
| **Duplica riga in basso** | `Shift + Alt + Giù` | Duplica la riga corrente sotto: ideale per creare rapidamente righe `<tr>` o celle `<td>`. |
| **Sposta riga su / giù** | `Alt + Su` / `Alt + Giù` | Sposta la riga o il blocco selezionato senza dover fare taglia-incolla. |
| **Selezione multi-cursore** | `Ctrl + D` | Seleziona l'occorrenza successiva della parola evidenziata per modificarle insieme. |
| **Cursori multipli liberi** | `Alt + Click sinistro` | Posiziona cursori multipli in punti diversi del testo per scrivere in parallelo. |
| **Apertura rapida file** | `Ctrl + P` | Permette di digitare il nome del file e aprirlo all'istante senza cercarlo nell'albero. |
| **Mostra / Nascondi barra laterale** | `Ctrl + B` | Massimizza lo spazio a video per la finestra del codice. |
| **Terminale integrato** | `Ctrl + \`` (backtick) | Mostra o nasconde la console di comando integrata. |
| **Avvia Live Server** | `Alt + L, Alt + O` | Apre la pagina corrente nel browser predefinito con anteprima in tempo reale. |

### 1.3 Scorciatoie Emmet (Sintassi Rapida)
- Digitando `!` (punto esclamativo) e premendo `Invio` o `Tab`, VS Code genera lo scheletro completo del documento HTML5:
  ```html
  <!DOCTYPE html>
  <html lang="it">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento</title>
  </head>
  <body>
    
  </body>
  </html>
  ```
- Generazione rapida di tabelle:
  - `table>tr*3>td*3` + `Tab` genera una tabella di 3 righe con 3 celle ciascuna.
  - `table>thead>tr>th*4^^tbody>tr*5>td*4` genera una tabella con testata (4 colonne) e corpo (5 righe da 4 celle).

---

## 2. Le Tabelle in HTML (HTML Tables)

> [!IMPORTANT]
> **Regola d'oro del Web Moderno**: Le tabelle HTML servono **esclusivamente** a presentare **dati tabellari** (listini prezzi, orari, calendari, bilanci, statistiche). **Non devono mai** essere usate per impaginare o creare il layout della pagina web (per quello si usano Flexbox e Grid).

### 2.1 Anatomia Semantica di una Tabella HTML

Una tabella ben strutturata e accessibile si compone dei seguenti tag:

- `<table>`: elemento contenitore generale dell'intera tabella.
- `<caption>`: titolo/didascalia accessibile posizionata sopra la tabella (fondamentale per gli screen reader).
- `<thead>`: raggruppa le righe di intestazione della tabella.
- `<tbody>`: racchiude il corpo dei dati principali.
- `<tfoot>`: raggruppa le righe conclusive (es. totali, medie, note a piè di tabella).
- `<tr>` (*table row*): definisce una singola riga orizzontale.
- `<th>` (*table header*): definisce una cella di intestazione. Il testo al suo interno è renderizzato di default in **grassetto e centrato**. Si aggiunge l'attributo semantico:
  - `scope="col"` se la cella è l'intestazione di una colonna;
  - `scope="row"` se la cella è l'intestazione di una riga.
- `<td>` (*table data*): definisce una cella di dato ordinaria (testo allineato a sinistra di default).

### 2.2 Unione di Celle: `colspan` e `rowspan`

Quando una cella deve estendersi su più colonne o più righe, si utilizzano gli attributi speciali:

1. **`colspan="N"` (Column Span)**:
   - Unisce $N$ celle in senso **orizzontale** (occupa $N$ colonne).
   - Esempio: una cella di intestazione o di totale che copre 3 colonne:
     ```html
     <td colspan="3">Totale Fatturato IVA Esclusa</td>
     <td>€ 1.450,00</td>
     ```
2. **`rowspan="N"` (Row Span)**:
   - Unisce $N$ celle in senso **verticale** (occupa $N$ righe verso il basso).
   - *Attenzione*: nelle righe sottostanti coperte dal `rowspan`, **non** bisogna dichiarare la cella, altrimenti la riga risulterà sfasata.
   - Esempio: un blocco orario o una categoria che si estende per 2 righe:
     ```html
     <tr>
       <td rowspan="2">Reparto Commerciale</td>
       <td>Mattina (08:30 - 12:30)</td>
     </tr>
     <tr>
       <!-- Qui NON si mette la cella Reparto perché è coperta dal rowspan sopra -->
       <td>Pomeriggio (14:30 - 18:30)</td>
     </tr>
     ```

---

## 3. Come Aggiungere il CSS (How to Add CSS)

I fogli di stile CSS (*Cascading Style Sheets*) permettono di separare la **struttura logica dei dati** (HTML) dalla loro **presentazione visiva** (colori, margini, allineamenti, font).

Esistono **3 metodi** per includere regole CSS in una pagina web:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             I 3 METODI DI INCLUSIONE CSS                         │
├────────────────────────┬─────────────────────────┬───────────────────────────────┤
│ Metodo                 │ Dove si inserisce       │ Quando si usa                 │
├────────────────────────┼─────────────────────────┼───────────────────────────────┤
│ 1. CSS In-Page (Interno)│ Nel tag <style> in <head>│ Pagine singole, lezioni, test │
│ 2. CSS In-Line (In linea)│ Attributo style="..."  │ Eccezioni puntuali (sconsigli)│
│ 3. CSS Esterno         │ File separato .css      │ Standard siti multipagina     │
└────────────────────────┴─────────────────────────┴───────────────────────────────┘
```

### 3.1 CSS Interno / In-Page (Focus della Lezione Odierna)
Si scrive all'interno del tag `<style>` posizionato obbligatoriamente all'interno della sezione `<head>` del documento HTML:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Esempio CSS In-Page</title>
  
  <style>
    /* Regola CSS: selettore { proprietà: valore; } */
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f9fa;
      color: #333333;
      margin: 20px;
    }

    h1 {
      color: #1a365d;
      border-bottom: 2px solid #2b6cb0;
      padding-bottom: 8px;
    }
  </style>
</head>
<body>
  <h1>Titolo della Pagina</h1>
  <p>Testo formattato con lo stile in-page della testata.</p>
</body>
</html>
```

- **Vantaggi**: Tutto il codice (markup e stile) vive in un solo file; perfetto per esercitazioni pratiche, schede di laboratorio e per testare rapidamente nuove regole senza gestire file esterni.
- **Svantaggi**: Lo stile non è condiviso con le altre pagine del sito (per quello si userà il file `.css` esterno collegato con `<link>`).

### 3.2 CSS In-Line (In linea sull'elemento)
Si applica direttamente all'interno del tag HTML mediante l'attributo `style`:
```html
<p style="color: #e53e3e; font-weight: bold;">Attenzione: scorte in esaurimento!</p>
```
> [!WARNING]
> Il CSS inline va usato solo per eccezioni temporanee o casi specifici. Mescola struttura e grafica e rende il codice difficile da leggere e manutenere.

### 3.3 CSS Esterno (External CSS)
Si scrive in un file indipendente (es. `style.css`) e si collega nella `<head>` con il tag `<link>`:
```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```
Questo è il metodo industriale utilizzato nei siti web completi con più pagine collegate.

### 3.4 Ordine di Cascata e Precedenza (Specificità)
Se la stessa proprietà viene definita per lo stesso elemento in posti diversi, il browser applica la regola con la priorità più alta secondo questo ordine gerarchico:
$$\text{CSS In-Line (massima priorità)} > \text{CSS Interno (<style>) o Esterno (<link>)} > \text{Stile predefinito del Browser}$$
*(A parità di specificità tra foglio interno ed esterno, prevale la regola letta per ultima scorrendo il codice dall'alto in basso).*

---

## 4. Styling Professionale delle Tabelle con CSS In-Page

Senza CSS, le tabelle HTML appaiono grezze e poco leggibili. Con poche proprietà CSS ben calibrate è possibile renderle moderne e professionali:

### 4.1 Proprietà Chiave per le Tabelle

1. **`border-collapse: collapse;`**:
   - Di default, i browser visualizzano un doppio bordo con spazio vuoto tra le celle (*separate borders*).
   - Impostando `border-collapse: collapse;` sulla tabella, i bordi adiacenti si fondono in una singola linea pulita.
2. **`padding: 10px 14px;`**:
   - Dà respiro al testo dentro le celle `<th>` e `<td>`. Una tabella senza padding è faticosa da leggere.
3. **Allineamento differenziato (`text-align`)**:
   - Testo e descrizioni: allineati a sinistra (`text-align: left;`).
   - Numeri, prezzi e date: allineati a destra (`text-align: right;`) o al centro (`text-align: center;`) per facilitare il confronto colonna per colonna.
4. **Righe alternate / Zebra Striping (`:nth-child(even)`)**:
   - La pseudo-classe CSS `:nth-child(even)` colora automaticamente le righe pari con uno sfondo chiaro, rendendo facile seguire le righe lunghe senza confondersi:
     ```css
     tbody tr:nth-child(even) {
       background-color: #f7fafc;
     }
     ```
5. **Feedback visivo al passaggio del mouse (`:hover`)**:
   - Evidenzia la riga su cui l'utente sta passando il mouse, aumentando l'usabilità interattiva:
     ```css
     tbody tr:hover {
       background-color: #edf2f7;
       cursor: default;
     }
     ```
6. **Intestazione a contrasto**:
   - Sfondo scuro aziendale e testo bianco (`background-color: #2b6cb0; color: #ffffff;`).

---

## 5. Codice Completo di Esempio (Try-It-Yourself)

Crea un nuovo file `orari_listino.html` in VS Code, incolla il codice sottostante e visualizzalo con Live Server (`Alt + L, Alt + O`):

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Listino e Orari Aziendali — TechSolutions SRL</title>

  <!-- CSS INTERNO (IN-PAGE) -->
  <style>
    /* Reset base e tipografia */
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f9;
      color: #2d3748;
      margin: 0;
      padding: 30px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 25px 35px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
    }

    h1 {
      color: #1a365d;
      margin-top: 0;
      border-bottom: 3px solid #3182ce;
      padding-bottom: 10px;
    }

    h2 {
      color: #2b6cb0;
      margin-top: 30px;
      font-size: 1.25rem;
    }

    /* STILE TABELLA MODERNA */
    table {
      width: 100%;
      border-collapse: collapse; /* Elimina il doppio bordo */
      margin-top: 15px;
      margin-bottom: 25px;
      font-size: 0.95rem;
    }

    caption {
      font-weight: 600;
      color: #4a5568;
      text-align: left;
      margin-bottom: 8px;
      font-style: italic;
    }

    th, td {
      border: 1px solid #e2e8f0;
      padding: 12px 16px;
    }

    /* Intestazione */
    thead th {
      background-color: #2b6cb0;
      color: #ffffff;
      text-align: left;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    /* Allineamenti personalizzati */
    .text-center { text-align: center; }
    .text-right { text-align: right; }

    /* Zebra striping su righe pari */
    tbody tr:nth-child(even) {
      background-color: #f7fafc;
    }

    /* Effetto hover interattivo sulla riga */
    tbody tr:hover {
      background-color: #ebf8ff;
    }

    /* Piede della tabella per totali */
    tfoot td {
      font-weight: bold;
      background-color: #edf2f7;
      color: #1a202c;
    }

    /* Badge di stato personalizzato */
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .badge-ok {
      background-color: #c6f6d5;
      color: #22543d;
    }

    .badge-warn {
      background-color: #feebc8;
      color: #7b341e;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>TechSolutions SRL — Gestione Aziendale</h1>
    <p>Scheda di laboratorio: consultazione orari di assistenza e listino servizi IT.</p>

    <!-- TABELLA 1: ORARIO DI APERTURA CON ROWSPAN -->
    <h2>1. Orari di Ricevimento al Pubblico</h2>
    <table>
      <caption>Orario settimanale degli uffici per reparto</caption>
      <thead>
        <tr>
          <th scope="col">Reparto</th>
          <th scope="col">Giorni</th>
          <th scope="col">Fascia Oraria</th>
          <th scope="col" class="text-center">Canale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2"><strong>Assistenza Tecnica</strong></td>
          <td>Lunedì – Venerdì</td>
          <td>08:30 – 13:00</td>
          <td class="text-center">Presenza / Ticket</td>
        </tr>
        <tr>
          <td>Lunedì – Giovedì</td>
          <td>14:30 – 17:30</td>
          <td class="text-center">Telefonico</td>
        </tr>
        <tr>
          <td><strong>Ufficio Commerciale</strong></td>
          <td>Lunedì – Venerdì</td>
          <td>09:00 – 18:00 (Continuato)</td>
          <td class="text-center">Presenza / Email</td>
        </tr>
      </tbody>
    </table>

    <!-- TABELLA 2: LISTINO PREZZI CON COLSPAN E TOTALI -->
    <h2>2. Listino Servizi Cloud & Hardware</h2>
    <table>
      <caption>Listino canoni mensili e pacchetti d'installazione</caption>
      <thead>
        <tr>
          <th scope="col">Codice</th>
          <th scope="col">Descrizione Servizio</th>
          <th scope="col" class="text-center">Disponibilità</th>
          <th scope="col" class="text-right">Canone Mensile</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>SRV-01</td>
          <td>Server Backup Cloud Automatizzato 500GB</td>
          <td class="text-center"><span class="badge badge-ok">Attivo</span></td>
          <td class="text-right">€ 45,00</td>
        </tr>
        <tr>
          <td>SRV-02</td>
          <td>Postazione Virtuale Managed (VDI)</td>
          <td class="text-center"><span class="badge badge-ok">Attivo</span></td>
          <td class="text-right">€ 75,00</td>
        </tr>
        <tr>
          <td>SRV-03</td>
          <td>Firewall Hardware Appliance UTM</td>
          <td class="text-center"><span class="badge badge-warn">Scorte Limitate</span></td>
          <td class="text-right">€ 120,00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Totale Pacchetto Integrato (IVA Esclusa)</td>
          <td class="text-right">€ 240,00</td>
        </tr>
      </tfoot>
    </table>
  </div>

</body>
</html>
```

---

## 6. Esercizio Pratico per gli Studenti

1. Apri una cartella in **VS Code** denominata `Esercizio_Tabelle_CSS`.
2. Crea il file `index.html` e genera lo scheletro iniziale digitando `!` e premendo `Invio`.
3. Inserisci nella sezione `<head>` un blocco `<style>` per definire il font, i colori e il `border-collapse: collapse;` per le tabelle.
4. Costruisci una tabella con la **Classifica Vendite Trimestrale**:
   - 4 Colonne: *Posizione*, *Agente di Vendita*, *Zona Assegnata*, *Fatturato Conseguito (€)*;
   - Inserisci almeno 4 righe di agenti;
   - Usa `colspan="3"` nell'ultima riga del `<tfoot>` per visualizzare il totale complessivo;
   - Applica la pseudo-classe `:nth-child(even)` per le righe zebrate e `:hover` per l'effetto evidenziazione.
5. Salva con `Ctrl + S`, verifica il risultato in anteprima con Live Server (`Alt + L, Alt + O`) e correggi l'indentazione con `Shift + Alt + F`.
