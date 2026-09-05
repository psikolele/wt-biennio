---
name: Laboratorio digitale biennio
description: Un percorso scolastico pratico e creativo, organizzato in tappe settimanali.
colors:
  primary: "#AAA2FF"
  green-accent: "#72E3A3"
  ink: "#F5F3FF"
  muted: "#A09DB7"
  paper: "#08090F"
  surface: "#13131C"
  surface-soft: "#1B192A"
  line: "#2F2B4B"
  line-strong: "#6D65A3"
  warning: "#F3B76E"
  warning-bg: "#2A2118"
  info-bg: "#211C3A"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1.1
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  sm: "12px"
  md: "16px"
  lg: "22px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#100E1F"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
    height: "44px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"

# Design System: Laboratorio digitale biennio

## Permanent Wiki decision — Agenta-inspired dark laboratory

The entire portal uses the Agenta-inspired visual language as its canonical style: near-black workspace, indigo/lilac actions, restrained green status accents, thin violet borders, spacious composition, high-contrast typography, and compact 12–16px corners. This applies to the home, year indexes, weekly lesson pages, diagnostic test, teacher area, and teacher login. Keep the style coherent across new routes; do not revert to the previous cream/white card system.

## 1. Overview

**Creative North Star: "Il quaderno di laboratorio"**

Il sistema visivo tratta ogni pagina come una console di laboratorio: scura, concreta e pronta a essere usata in classe. L'energia creativa arriva dagli accenti indaco e verde e dalla scansione in tappe; l'ordine arriva da una griglia stabile, testi leggibili e azioni esplicite.

La composizione deve sembrare uno strumento scolastico curato, non una dashboard aziendale né un gioco infantile. Il sistema rifiuta esplicitamente l'aspetto da template AI: card tutte uguali, gradienti decorativi, effetto vetro e decorazioni casuali.

**Key Characteristics:**
- Contenuto prima della decorazione.
- Una CTA primaria chiara per ogni vista.
- Superfici piane, bordi leggeri e ombre brevi.
- Mobile-first, stampabile e accessibile da tastiera.

## 2. Colors

La palette è contenuta: l'indaco guida navigazione e azioni, il verde segnala stato e avanzamento, l'ambra comunica attenzione e i neutri scuri sostengono la lettura.

### Primary
- **Indaco laboratorio** (#AAA2FF): azioni primarie, link attivi e wayfinding.
- **Verde segnale** (#72E3A3): stato attivo e momenti di avanzamento, usato con parsimonia.

### Tertiary
- **Ambra attenzione** (#F3B76E): test, avvisi e messaggi da leggere con cura.
- **Indaco informativo** (#211C3A): sfondi scuri per missioni e contenuti di supporto.

### Neutral
- **Inchiostro** (#F5F3FF): titoli e testo principale.
- **Testo secondario** (#A09DB7): testo di supporto su superfici scure.
- **Spazio** (#08090F): sfondo generale.
- **Superficie** (#13131C): contenitori di contenuto.
- **Linea** (#2F2B4B) e **linea forte** (#6D65A3): separatori e bordi dei controlli.

**The One-Accent Rule.** L'indaco è l'unico colore ricorrente per le azioni; verde e ambra hanno significati specifici e non diventano decorazione.

## 3. Typography

**Display Font:** ui-sans-serif, system-ui, Segoe UI
**Body Font:** ui-sans-serif, system-ui, Segoe UI

**Character:** una sola famiglia sans-serif mantiene il portale familiare e veloce, mentre peso e spazio distinguono orientamento, contenuto e azione.

### Hierarchy
- **Display** (900, clamp 3rem–4.5rem, 1.05): titolo della home.
- **Headline** (900, 2.25rem, 1.1): titoli di percorso e area docenti.
- **Title** (700, 1.5rem, 1.25): titoli di card e sezioni.
- **Body** (400, 1rem, 1.6): istruzioni e descrizioni, con misura massima 65–75ch.
- **Label** (700, .875rem, 1.4): pulsanti, metadati e stati.

**The Readable Measure Rule.** Il testo esplicativo non deve occupare tutta la larghezza desktop e non deve scendere sotto 16px nel corpo principale.

## 4. Elevation

Il sistema usa profondità minima e strutturale. Le superfici scure hanno bordi violetti sottili e una sola ombra ampia e discreta (`0 20px 60px rgba(0,0,0,.22)`) per separare contenuti interattivi importanti.

**The Flat-By-Default Rule.** L'ombra non è una decorazione: compare solo sui contenitori che devono distinguersi dal fondo.

## 5. Components

### Buttons
- **Shape:** pill accessibile (999px), altezza minima 44px.
- **Primary:** indaco laboratorio con testo scuro, padding 10px 18px.
- **Hover / Focus:** indaco più chiaro e focus ring evidente; nessun cambio di dimensione.
- **Secondary:** superficie scura, bordo linea forte e testo chiaro.

### Cards / Containers
- **Corner Style:** curva contenuta (16px), mai effetto bolla.
- **Background:** superficie scura su spazio quasi nero.
- **Shadow Strategy:** ombra ampia e discreta, senza glow decorativo.
- **Border:** linea chiara da 1px.
- **Internal Padding:** 16–24px secondo la densità.

### Inputs / Fields
- **Style:** fondo quasi nero, bordo linea forte, curva 12px, altezza minima 44px.
- **Focus:** ring indaco ben visibile.
- **Error / Disabled:** errore in rosso con messaggio vicino; disabled con opacità e cursore coerenti.

### Navigation

La navigazione usa un ritorno testuale sempre visibile, link con etichetta e tappe annuali raggruppate in tre moduli. Non ci sono menu icon-only né dipendenza dall'hover.

## 6. Do's and Don'ts

### Do:
- **Do** usa indaco laboratorio per la CTA primaria e per il percorso attivo.
- **Do** mantieni testo principale inchiostro e testo secondario su superfici chiare.
- **Do** raggruppa le settimane in moduli con titoli e intervalli leggibili.
- **Do** mantieni controlli da almeno 44px e focus visibile.
- **Do** prevedi sempre una versione stampabile e una versione facilitata.

### Don't:
- **Don't** usare l'aspetto da template AI: card tutte uguali, gradienti decorativi, effetto vetro e decorazioni casuali.
- **Don't** usare card con raggio superiore a 22px.
- **Don't** usare il colore come unico modo per comunicare uno stato.
- **Don't** usare testo grigio su sfondi colorati o testo chiaro a basso contrasto.
- **Don't** introdurre gradienti testuali, sfondi a griglia decorativi o emoji come icone strutturali.
