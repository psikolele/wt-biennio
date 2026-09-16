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
      <div className="portal-shell min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--blue)] border-t-transparent animate-spin" />
          <p className="portal-muted text-xs font-mono">Verifica credenziali di classe...</p>
        </div>
      </div>
    );
  }

  if (status === "locked") {
    return (
      <main className="portal-shell px-4 py-12 sm:py-20 flex items-center justify-center min-h-[85vh]">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="portal-button-secondary text-xs">
              <span aria-hidden="true">←</span> Torna alla Home
            </Link>
            <Link href="/docenti" className="text-xs font-mono text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
              Area Docenti →
            </Link>
          </div>

          <div className="bento-tile bento-tile--glow p-7 sm:p-9 border-2 border-[var(--line-strong)] rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl" aria-hidden="true">{meta.icon}</span>
              <div>
                <span className="portal-eyebrow">{meta.label}</span>
                <h1 className="text-2xl font-black text-[var(--ink)] tracking-tight">
                  Sezione Riservata
                </h1>
              </div>
            </div>

            <p className="portal-muted text-xs sm:text-sm leading-relaxed mb-6">
              Questa sezione è riservata agli studenti della <strong>{meta.label}</strong> ({meta.theme}). Inserisci la password fornita dal docente per accedere alle lezioni e ai materiali.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label
                  htmlFor="class-password"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5"
                >
                  Password di Classe:
                </label>
                <input
                  id="class-password"
                  type="password"
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci la password..."
                  className="portal-input w-full px-4 py-3 rounded-xl font-mono text-sm font-bold tracking-wider"
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
                className="portal-button w-full justify-center py-3 text-sm font-bold shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Verifica in corso..." : "Entra in Classe →"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[rgba(109,101,163,0.2)] text-[11px] text-[var(--muted)] leading-relaxed">
              <p>
                🔒 <strong>Nota per i docenti:</strong> la password dell&apos;Area Docenti sblocca direttamente l&apos;accesso a qualsiasi classe.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="bg-[rgba(25,23,42,0.9)] border-b border-[var(--line)] px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[var(--ink)] font-bold">{meta.label} sbloccata</span>
          <span className="hidden sm:inline opacity-75">· {meta.theme}</span>
        </div>
        <button
          type="button"
          onClick={handleLock}
          className="hover:text-[var(--coral)] transition-colors underline underline-offset-2"
        >
          Blocca sezione (Esci)
        </button>
      </div>
      {children}
    </>
  );
}
