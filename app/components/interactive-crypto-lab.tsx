"use client";

import { useState } from "react";
import {
  ALPHABET_IT,
  caesarEncrypt,
  caesarDecrypt,
  xorBitwise,
  polyalphabeticEncrypt,
  polyalphabeticDecrypt,
  simulateAsymmetricExchange,
  type CaesarStep,
  type XorStep,
  type PolyStep
} from "@/app/lib/crypto";

export type CryptoTabId = "cesare" | "xor" | "poly" | "asymmetric";

interface InteractiveCryptoLabProps {
  initialTab?: CryptoTabId;
  allowedTabs?: CryptoTabId[];
  title?: string;
  subtitle?: string;
}

export function InteractiveCryptoLab({
  initialTab,
  allowedTabs = ["cesare", "xor", "poly", "asymmetric"],
  title = "Palestra Operativa di Crittografia",
  subtitle = "Sperimenta dal vivo gli algoritmi spiegati nelle slide di Classe 5 (CRITTOGRAFIA1 e CRITTOGRAFIA n2)."
}: InteractiveCryptoLabProps) {
  const defaultTab = initialTab && allowedTabs.includes(initialTab) ? initialTab : allowedTabs[0] || "cesare";
  const [activeTab, setActiveTab] = useState<CryptoTabId>(defaultTab);

  // --- STATO CESARE / MODULO 21 ---
  const [caesarInput, setCaesarInput] = useState("CLASSE");
  const [caesarKey, setCaesarKey] = useState(10);
  const [caesarMode, setCaesarMode] = useState<"encrypt" | "decrypt">("encrypt");

  const caesarOutcome = caesarMode === "encrypt"
    ? caesarEncrypt(caesarInput, caesarKey)
    : caesarDecrypt(caesarInput, caesarKey);

  // --- STATO XOR ---
  const [xorMsg, setXorMsg] = useState("1011101");
  const [xorKey, setXorKey] = useState("0101011");
  const xorOutcome = xorBitwise(xorMsg, xorKey);

  // --- STATO POLIALFABETICA DINAMICA ---
  const [polyInput, setPolyInput] = useState("SCUOLA");
  const [polyKey, setPolyKey] = useState(4);
  const [polyMode, setPolyMode] = useState<"encrypt" | "decrypt">("encrypt");

  const polyOutcome = polyMode === "encrypt"
    ? polyalphabeticEncrypt(polyInput, polyKey)
    : polyalphabeticDecrypt(polyInput, polyKey);

  // --- STATO ASIMMETRICA ---
  const [asymSender] = useState("Alice");
  const [asymRecipient] = useState("Bob");
  const [asymMode, setAsymMode] = useState<"confidentiality" | "signature">("confidentiality");
  const [asymMsg, setAsymMsg] = useState("DATI RISERVATI AZIENDALI");

  const asymOutcome = simulateAsymmetricExchange({
    sender: asymSender,
    recipient: asymRecipient,
    mode: asymMode,
    message: asymMsg
  });

  return (
    <section
      className="bento-tile bento-tile--glow p-6 sm:p-8 my-8 border-2 border-[var(--line-strong)] rounded-2xl"
      aria-label="Palestra Crittografia Interattiva"
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="portal-eyebrow">Simulatore Didattico · Classe 5ª Informatica</span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--ink)] tracking-tight mt-1 flex items-center gap-2">
            <span>🔐</span> {title}
          </h2>
          <p className="portal-muted text-xs sm:text-sm mt-1 max-w-[70ch]">
            {subtitle}
          </p>
        </div>

        {/* TAB SWITCHER */}
        {allowedTabs.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--surface-soft)] rounded-xl border border-[var(--line)]">
            {allowedTabs.includes("cesare") && (
              <button
                type="button"
                onClick={() => setActiveTab("cesare")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "cesare"
                    ? "bg-[var(--blue)] text-[#100e1f] shadow-md"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                Sostituzione &amp; Modulo 21
              </button>
            )}
            {allowedTabs.includes("xor") && (
              <button
                type="button"
                onClick={() => setActiveTab("xor")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "xor"
                    ? "bg-[var(--coral)] text-[#100e1f] shadow-md"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                XOR Bit a Bit
              </button>
            )}
            {allowedTabs.includes("poly") && (
              <button
                type="button"
                onClick={() => setActiveTab("poly")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "poly"
                    ? "bg-amber-400 text-[#100e1f] shadow-md"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                Polialfabetica Evolutiva
              </button>
            )}
            {allowedTabs.includes("asymmetric") && (
              <button
                type="button"
                onClick={() => setActiveTab("asymmetric")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "asymmetric"
                    ? "bg-emerald-400 text-[#100e1f] shadow-md"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                Asimmetrica (PKI)
              </button>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. TAB CESARE / MODULO 21 */}
      {/* ========================================================================= */}
      {activeTab === "cesare" && (
        <div className="space-y-6">
          {/* Preset rapidi dalle slide */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[rgba(109,101,163,0.2)]">
            <span className="text-xs font-mono text-[var(--muted)] font-bold">Esercizi ufficiali (CRITTOGRAFIA1):</span>
            <button
              type="button"
              onClick={() => { setCaesarInput("CLASSE"); setCaesarKey(10); setCaesarMode("encrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
            >
              Slide 14: &quot;CLASSE&quot; (K=10)
            </button>
            <button
              type="button"
              onClick={() => { setCaesarInput("ANNA"); setCaesarKey(12); setCaesarMode("encrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
            >
              Slide 14: &quot;ANNA&quot; (K=12)
            </button>
            <button
              type="button"
              onClick={() => { setCaesarInput("DEG"); setCaesarKey(6); setCaesarMode("decrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--coral)] hover:text-[var(--coral)] transition-colors"
            >
              Slide 13: Decifra &quot;DEG&quot; (K=6)
            </button>
            <button
              type="button"
              onClick={() => { setCaesarInput("CADO"); setCaesarKey(4); setCaesarMode("encrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
            >
              Slide 10: &quot;CADO&quot; (K=4)
            </button>
            <button
              type="button"
              onClick={() => { setCaesarInput("GEHS"); setCaesarKey(4); setCaesarMode("decrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--coral)] hover:text-[var(--coral)] transition-colors"
            >
              Slide 11: Decifra &quot;GEHS&quot; (K=4)
            </button>
          </div>

          {/* Form input */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Testo ({caesarMode === "encrypt" ? "in chiaro" : "cifrato"} - Alfabeto IT 21 lettere)
              </label>
              <input
                type="text"
                value={caesarInput}
                onChange={(e) => setCaesarInput(e.target.value.toUpperCase())}
                placeholder="Inserisci una parola..."
                className="portal-input w-full px-4 py-2.5 rounded-xl font-mono text-base tracking-widest uppercase font-bold"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Chiave K (0 - 20)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={caesarKey}
                onChange={(e) => setCaesarKey(Math.max(0, Math.min(20, Number(e.target.value) || 0)))}
                className="portal-input w-full px-4 py-2.5 rounded-xl font-mono text-base font-bold text-center"
              />
            </div>

            <div className="sm:col-span-3 flex flex-col justify-end">
              <div className="flex rounded-xl p-1 bg-[var(--surface-soft)] border border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => setCaesarMode("encrypt")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    caesarMode === "encrypt" ? "bg-[var(--blue)] text-[#100e1f]" : "text-[var(--muted)]"
                  }`}
                >
                  Cifra (+K)
                </button>
                <button
                  type="button"
                  onClick={() => setCaesarMode("decrypt")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    caesarMode === "decrypt" ? "bg-[var(--coral)] text-[#100e1f]" : "text-[var(--muted)]"
                  }`}
                >
                  Decifra (-K)
                </button>
              </div>
            </div>
          </div>

          {/* Risultato finale */}
          <div className="rounded-xl border border-[var(--line-strong)] bg-[rgba(25,23,42,0.9)] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider block">
                Risultato Elaborato ({caesarMode === "encrypt" ? "Testo Cifrato" : "Testo Decifrato"}):
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-[var(--coral)] mt-1 block">
                {caesarOutcome.result || "—"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] bg-[var(--surface-soft)] px-3 py-1.5 rounded-lg border border-[var(--line)]">
              <span>Formula applicata:</span>
              <strong className="text-[var(--ink)]">
                {caesarMode === "encrypt" ? "(Pos + K) mod 21" : "(Pos - K) mod 21 (+21 se negativo)"}
              </strong>
            </div>
          </div>

          {/* Dettaglio matematico passo per passo */}
          {caesarOutcome.steps.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[rgba(109,101,163,0.2)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--blue)] mb-3">
                Passaggi Matematici Dettagliati (Slide 12-13):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {caesarOutcome.steps.map((step: CaesarStep, idx: number) => (
                  <div key={idx} className="rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] p-2.5 text-center">
                    <div className="text-sm font-bold text-[var(--ink)] font-mono">
                      {step.char} <span className="text-[var(--muted)] text-xs">({step.pos})</span>
                    </div>
                    <div className="text-[10px] font-mono text-[var(--coral)] my-1">
                      {step.calc}
                    </div>
                    <div className="text-sm font-black text-[var(--blue)] font-mono">
                      → {step.resChar} <span className="text-[var(--muted)] text-[10px]">({step.newPos})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TAB XOR BIT A BIT */}
      {/* ========================================================================= */}
      {activeTab === "xor" && (
        <div className="space-y-6">
          {/* Preset XOR dalle slide */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[rgba(109,101,163,0.2)]">
            <span className="text-xs font-mono text-[var(--muted)] font-bold">Esempi Slide 2 (CRITTOGRAFIA n2):</span>
            <button
              type="button"
              onClick={() => { setXorMsg("1011101"); setXorKey("0101011"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--coral)] hover:text-[var(--coral)] transition-colors"
            >
              Slide 2 Cifratura: Messaggio 1011101 &amp; Chiave 0101011
            </button>
            <button
              type="button"
              onClick={() => { setXorMsg("1110110"); setXorKey("0101011"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
            >
              Slide 2 Decifratura: Testo Cifrato 1110110 &amp; Chiave
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Messaggio (Sequenza di bit 0 e 1)
              </label>
              <input
                type="text"
                value={xorMsg}
                onChange={(e) => setXorMsg(e.target.value.replace(/[^01]/g, ""))}
                placeholder="Es. 1011101"
                className="portal-input w-full px-4 py-2.5 rounded-xl font-mono text-base tracking-widest font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Chiave K (Stessa lunghezza di bit)
              </label>
              <input
                type="text"
                value={xorKey}
                onChange={(e) => setXorKey(e.target.value.replace(/[^01]/g, ""))}
                placeholder="Es. 0101011"
                className="portal-input w-full px-4 py-2.5 rounded-xl font-mono text-base tracking-widest font-bold"
              />
            </div>
          </div>

          {/* Risultato XOR */}
          <div className="rounded-xl border border-[var(--line-strong)] bg-[rgba(25,23,42,0.9)] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider block">
                Risultato XOR (Messaggio ⊕ Chiave):
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-[var(--coral)] mt-1 block">
                {xorOutcome.result || "—"}
              </span>
            </div>

            <div className="text-xs font-mono text-[var(--muted)] bg-[var(--surface-soft)] px-3 py-2 rounded-lg border border-[var(--line)]">
              <div>Regola XOR: <span className="text-[var(--ink)] font-bold">0⊕0=0 | 0⊕1=1 | 1⊕0=1 | 1⊕1=0</span></div>
              <div className="text-[var(--coral)] mt-0.5">Proprietà aurea: (M ⊕ K) ⊕ K = M (Autoinverso)</div>
            </div>
          </div>

          {/* Allineamento a colonne bit per bit */}
          <div className="mt-4 pt-4 border-t border-[rgba(109,101,163,0.2)] overflow-x-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--coral)] mb-2">
              Confronto Bit per Bit (Lavagna Slide 2):
            </h4>
            <div className="flex gap-2 min-w-max pb-2">
              {xorOutcome.steps.map((step: XorStep, idx: number) => (
                <div key={idx} className="flex flex-col items-center bg-[var(--surface-soft)] border border-[var(--line)] rounded-lg px-3 py-2 font-mono text-xs">
                  <span className="text-[var(--ink)] font-bold mb-1">M: {step.mBit}</span>
                  <span className="text-[var(--blue)] font-bold mb-1">K: {step.kBit}</span>
                  <span className="w-full border-t border-[var(--line)] my-1" />
                  <span className="text-[var(--coral)] font-black text-sm">={step.resBit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB POLIALFABETICA DINAMICA (Slide 3-7) */}
      {/* ========================================================================= */}
      {activeTab === "poly" && (
        <div className="space-y-6">
          {/* Preset polialfabetici dalle slide */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[rgba(109,101,163,0.2)]">
            <span className="text-xs font-mono text-[var(--muted)] font-bold">Esercizi ufficiali (CRITTOGRAFIA n2):</span>
            <button
              type="button"
              onClick={() => { setPolyInput("ALLA"); setPolyKey(20); setPolyMode("encrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Slide 3: &quot;ALLA&quot; (K=20) → ZLUL
            </button>
            <button
              type="button"
              onClick={() => { setPolyInput("ZLUL"); setPolyKey(20); setPolyMode("decrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Slide 4: Decifra &quot;ZLUL&quot; (K=20) → ALLA
            </button>
            <button
              type="button"
              onClick={() => { setPolyInput("MIA"); setPolyKey(3); setPolyMode("encrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Slide 6: &quot;MIA&quot; (K=3) → PUI
            </button>
            <button
              type="button"
              onClick={() => { setPolyInput("PUI"); setPolyKey(3); setPolyMode("decrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Slide 6: Decifra &quot;PUI&quot; (K=3) → MIA
            </button>
            <button
              type="button"
              onClick={() => { setPolyInput("SCUOLA"); setPolyKey(4); setPolyMode("encrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Slide 7: &quot;SCUOLA&quot; (K=4) → ZUZLAL
            </button>
            <button
              type="button"
              onClick={() => { setPolyInput("ZUZLAL"); setPolyKey(4); setPolyMode("decrypt"); }}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Slide 7: Decifra &quot;ZUZLAL&quot; (K=4) → SCUOLA
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)] text-xs text-[var(--ink)] leading-relaxed">
            <strong className="text-amber-300 font-bold">Regola Didattica Slide 3-7:</strong> La chiave iniziale <em>K</em> serve solo per la 1ª lettera.
            Dalla 2ª lettera in poi, la sottochiave dinamica è la posizione della lettera in chiaro precedente (es. per cifrare la seconda lettera si somma la prima lettera originale; per decifrare si sottrae la lettera in chiaro precedentemente svelata).
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Testo ({polyMode === "encrypt" ? "in chiaro" : "cifrato"} - Alfabeto IT 21 lettere)
              </label>
              <input
                type="text"
                value={polyInput}
                onChange={(e) => setPolyInput(e.target.value.toUpperCase())}
                placeholder="Es. SCUOLA"
                className="portal-input w-full px-4 py-2.5 rounded-xl font-mono text-base tracking-widest uppercase font-bold"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Chiave Iniziale K (0 - 20)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={polyKey}
                onChange={(e) => setPolyKey(Math.max(0, Math.min(20, Number(e.target.value) || 0)))}
                className="portal-input w-full px-4 py-2.5 rounded-xl font-mono text-base font-bold text-center"
              />
            </div>

            <div className="sm:col-span-3 flex flex-col justify-end">
              <div className="flex rounded-xl p-1 bg-[var(--surface-soft)] border border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => setPolyMode("encrypt")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    polyMode === "encrypt" ? "bg-amber-400 text-[#100e1f]" : "text-[var(--muted)]"
                  }`}
                >
                  Cifra Dinamica
                </button>
                <button
                  type="button"
                  onClick={() => setPolyMode("decrypt")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    polyMode === "decrypt" ? "bg-[var(--coral)] text-[#100e1f]" : "text-[var(--muted)]"
                  }`}
                >
                  Decifra Dinamica
                </button>
              </div>
            </div>
          </div>

          {/* Risultato Polialfabetico */}
          <div className="rounded-xl border border-[var(--line-strong)] bg-[rgba(25,23,42,0.9)] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider block">
                Risultato Elaborato ({polyMode === "encrypt" ? "Testo Cifrato" : "Testo Decifrato"}):
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-amber-300 mt-1 block">
                {polyOutcome.result || "—"}
              </span>
            </div>

            <div className="text-xs font-mono text-[var(--muted)] bg-[var(--surface-soft)] px-3 py-2 rounded-lg border border-[var(--line)]">
              <div>Formula 1ª lettera: <strong className="text-[var(--ink)]">(Pos ± K) mod 21</strong></div>
              <div className="mt-0.5">Lettere successive: <strong className="text-amber-300">(Pos ± Sottochiave) mod 21</strong></div>
            </div>
          </div>

          {/* Dettaglio a catena passo per passo */}
          {polyOutcome.steps.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[rgba(109,101,163,0.2)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                Catena delle Sottochiavi Evolutive (Tabelle Slide 3, 6, 7):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {polyOutcome.steps.map((step: PolyStep, idx: number) => (
                  <div key={idx} className="rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] p-3 text-center">
                    <div className="text-xs font-mono text-[var(--muted)] mb-1">Passo {idx + 1}</div>
                    <div className="text-sm font-bold text-[var(--ink)] font-mono">
                      {step.char} <span className="text-[var(--muted)] text-xs">({step.pos})</span>
                    </div>
                    <div className="text-[11px] font-mono text-amber-300 my-1 font-semibold">
                      {polyMode === "encrypt" ? "+" : "−"} Sottochiave: {step.subKey}
                    </div>
                    <div className="text-[10px] text-[var(--muted)] truncate mb-1" title={step.subKeyOrigin}>
                      {step.subKeyOrigin}
                    </div>
                    <div className="text-sm font-black text-emerald-400 font-mono pt-1 border-t border-[var(--line)]">
                      → {step.resChar} <span className="text-[var(--muted)] text-[10px]">({step.newPos})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB CRITTOGRAFIA ASIMMETRICA (Slide 8-9) */}
      {/* ========================================================================= */}
      {activeTab === "asymmetric" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[rgba(109,101,163,0.2)]">
            <span className="text-xs font-mono text-[var(--muted)] font-bold">Seleziona Scenario Didattico:</span>
            <button
              type="button"
              onClick={() => setAsymMode("confidentiality")}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-bold transition-all ${
                asymMode === "confidentiality"
                  ? "bg-emerald-400 text-[#100e1f] border-emerald-400 shadow-md"
                  : "bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              🔒 1. Riservatezza (Cifra con Pubblica di Bob)
            </button>
            <button
              type="button"
              onClick={() => setAsymMode("signature")}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-bold transition-all ${
                asymMode === "signature"
                  ? "bg-[var(--coral)] text-[#100e1f] border-[var(--coral)] shadow-md"
                  : "bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              ✍️ 2. Firma Digitale &amp; Autenticità (Firma con Privata di Alice)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Alice */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👩‍💻</span>
                <div>
                  <h4 className="font-bold text-sm text-[var(--ink)]">Mittente: {asymSender}</h4>
                  <span className="text-[10px] font-mono text-[var(--muted)]">Genera coppia di chiavi A</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs font-mono mt-3">
                <div className={`p-1.5 rounded border ${asymMode === "signature" ? "bg-[rgba(238,124,124,0.15)] border-[var(--coral)] text-[var(--coral)] font-bold" : "bg-[var(--surface)] border-[var(--line)] text-[var(--muted)]"}`}>
                  🔑 Privata (Alice) {asymMode === "signature" ? "← USATA PER FIRMARE" : "· Segreta"}
                </div>
                <div className="p-1.5 rounded border bg-[var(--surface)] border-[var(--line)] text-[var(--muted)]">
                  🌐 Pubblica (Alice) · Aperta a tutti
                </div>
              </div>
            </div>

            {/* Canale di trasmissione */}
            <div className="rounded-xl border border-[var(--line-strong)] bg-[rgba(25,23,42,0.9)] p-4 text-center">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1">
                Canale Insicuro (Internet)
              </div>
              <div className="text-sm font-bold font-mono text-emerald-300 py-2">
                {asymOutcome.encryptionKeyUsed}
              </div>
              <div className="text-[11px] text-[var(--muted)] leading-tight">
                {asymMode === "confidentiality"
                  ? "Il testo viaggia cifrato: nessun intruso può leggerlo senza la chiave privata di Bob."
                  : "Il testo viaggia con sigillo crittografico: chiunque può verificare che è stato firmato da Alice."}
              </div>
            </div>

            {/* Bob */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👨‍💻</span>
                <div>
                  <h4 className="font-bold text-sm text-[var(--ink)]">Destinatario: {asymRecipient}</h4>
                  <span className="text-[10px] font-mono text-[var(--muted)]">Genera coppia di chiavi B</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs font-mono mt-3">
                <div className={`p-1.5 rounded border ${asymMode === "confidentiality" ? "bg-[rgba(114,227,163,0.15)] border-emerald-400 text-emerald-300 font-bold" : "bg-[var(--surface)] border-[var(--line)] text-[var(--muted)]"}`}>
                  🔑 Privata (Bob) {asymMode === "confidentiality" ? "← USATA PER DECIFRARE" : "· Segreta"}
                </div>
                <div className={`p-1.5 rounded border ${asymMode === "confidentiality" ? "bg-[var(--surface)] border-emerald-500/40 text-emerald-400" : "bg-[var(--surface)] border-[var(--line)] text-[var(--muted)]"}`}>
                  🌐 Pubblica (Bob) {asymMode === "confidentiality" ? "· Fornita ad Alice" : "· Aperta a tutti"}
                </div>
              </div>
            </div>
          </div>

          {/* Testo del messaggio e spiegazione del protocollo */}
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  Messaggio di test:
                </label>
                <input
                  type="text"
                  value={asymMsg}
                  onChange={(e) => setAsymMsg(e.target.value)}
                  placeholder="Scrivi un messaggio da trasmettere..."
                  className="portal-input w-full px-4 py-2.5 rounded-xl font-mono text-sm font-bold"
                />
              </div>
              <div className="sm:w-1/2 p-3 rounded-lg bg-[rgba(16,14,31,0.6)] border border-[var(--line)] text-xs text-[var(--ink)] flex flex-col justify-center">
                <span className="font-bold text-emerald-300 mb-1">
                  {asymMode === "confidentiality" ? "🛡️ Risultato Garanzia:" : "✍️ Risultato Garanzia:"}
                </span>
                <p className="portal-muted text-[11px] leading-relaxed">
                  {asymOutcome.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
