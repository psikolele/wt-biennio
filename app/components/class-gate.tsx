"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";

interface ClassGateProps {
  year: number;
  children: React.ReactNode;
}

const CLASS_METADATA: Record<number, { label: string; theme: string; icon: string }> = {
  1: { label: "1ª Classe", theme: "Basi Digitali, Hardware & Pratiche Sicure", icon: "🌱" },
  2: { label: "2ª Classe", theme: "Coding, Dati, Cloud & Cittadinanza Digitale", icon: "💻" },
  3: { label: "3ª Classe", theme: "Sistemi Informativi, Excel Avanzato & AI Liv. 1", icon: "📊" },
  4: { label: "4ª Classe", theme: "Database Relazionali E-R, SQL & Sviluppo Web", icon: "🗄️" },
  5: { label: "5ª Classe", theme: "Reti, Crittografia, Cybersecurity & AI Liv. 3", icon: "🌐" },
};

export function ClassGate({ year, children }: ClassGateProps) {
  const [status, setStatus] = useState<"loading" | "locked" | "unlocked">("loading");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const meta = CLASS_METADATA[year] || { label: `Classe ${year}ª`, theme: "Programma di studio", icon: "📚" };

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const res = await fetch(`/api/class-auth?year=${year}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setStatus(data.authenticated ? "unlocked" : "locked");
          }
        } else {
          if (isMounted) setStatus("locked");
        }
      } catch {
        if (isMounted) setStatus("locked");
      }
    }

    checkSession();
    return () => {
      isMounted = false;
    };
  }, [year]);

  async function handleUnlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password.trim()) return;

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/class-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, password }),
      });

      if (res.ok) {
        setStatus("unlocked");
        setPassword("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Password non corretta. Riprova.");
      }
    } catch {
      setError("Errore di connessione. Riprova tra qualche istante.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLock() {
    try {
      await fetch(`/api/class-auth?year=${year}`, { method: "DELETE" });
      setStatus("locked");
    } catch {
      setStatus("locked");
    }
  }

  if (status === "loading") {
    return (
      <main className="portal-shell px-5 py-12 sm:py-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--blue)] border-t-transparent animate-spin" />
          <p className="portal-muted text-xs font-mono">Verifica credenziali di classe...</p>
        </div>
      </main>
    );
  }

  if (status === "locked") {
    return (
      <main className="portal-shell px-5 py-12 sm:py-20">
        <div className="portal-container max-w-md mx-auto">
          {/* TOP BAR / NAVIGAZIONE CON SPAZIATURA PULITA */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="portal-button-secondary text-xs py-2 px-4 min-h-[38px]"
            >
              <span aria-hidden="true">←</span> Torna al portale
            </Link>
            <Link
              href="/docenti"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--ink)] transition-colors py-2 px-2"
            >
              Area Docenti →
            </Link>
          </div>

          {/* CARD DI ACCESSO DEDICATA (ROBUSTA, PADDING GENEROSO, NESSUNA COLLISIONE) */}
          <div className="rounded-2xl border border-[var(--line-strong)] bg-[linear-gradient(180deg,rgba(25,23,42,0.96)_0%,rgba(16,14,28,0.99)_100%)] p-7 sm:p-9 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3.5 mb-5">
              <span className="text-3xl p-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)]" aria-hidden="true">
                {meta.icon}
              </span>
              <div>
                <span className="portal-eyebrow block mb-1">{meta.label}</span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
                  Sezione Riservata
                </h1>
              </div>
            </div>

            <p className="portal-muted text-sm leading-relaxed mb-6">
              Questa sezione è riservata agli studenti della <strong>{meta.label}</strong> ({meta.theme}). Inserisci la password fornita dal docente per accedere alle 33 settimane di laboratorio e alle schede didattiche.
            </p>

            <form onSubmit={handleUnlock} className="space-y-5">
              <div>
                <label
                  htmlFor="class-password"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-2"
                >
                  Password di Classe:
                </label>
                <input
                  id="class-password"
                  name="class-password"
                  type="password"
                  autoFocus
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci la password..."
                  className="portal-input w-full min-h-12 rounded-xl px-4 py-3 text-sm font-mono tracking-wider outline-none focus:border-[var(--blue)] transition-colors"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="portal-button w-full justify-center py-3.5 min-h-12 text-sm font-bold shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Verifica in corso..." : "Entra in Classe →"}
              </button>
            </form>

            <div className="mt-8 pt-5 border-t border-[rgba(109,101,163,0.25)] flex items-start gap-2.5 text-xs text-[var(--muted)] leading-relaxed">
              <span className="text-base leading-none" aria-hidden="true">🔒</span>
              <p>
                <strong className="text-[var(--ink)]">Nota per i docenti:</strong>{" "}
                la password dell&apos;Area Docenti sblocca direttamente l&apos;accesso a qualsiasi classe.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="bg-[rgba(25,23,42,0.95)] border-b border-[var(--line)] px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs font-mono text-[var(--muted)] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[var(--ink)] font-bold">{meta.label} sbloccata</span>
          <span className="hidden sm:inline opacity-75">· {meta.theme}</span>
        </div>
        <button
          type="button"
          onClick={handleLock}
          className="hover:text-[var(--coral)] transition-colors underline underline-offset-4 py-1 px-2 text-xs"
        >
          Blocca sezione (Esci)
        </button>
      </div>
      {children}
    </>
  );
}
