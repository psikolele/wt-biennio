"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PasswordToggleIcon } from "@/app/components/password-toggle-icon";

export default function TeacherLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const password = new FormData(event.currentTarget).get("password");

    try {
      const response = await fetch("/api/teacher-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError("Password non valida. Controlla di averla digitata correttamente.");
        return;
      }
      router.push("/docenti");
    } catch {
      setError("Accesso non disponibile. Controlla la connessione e riprova.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="portal-shell px-5 py-16 sm:py-20">
      <div className="portal-container max-w-md">
        <Link href="/" className="portal-button-secondary">
          <span aria-hidden="true">←</span> Torna al portale
        </Link>
        <div className="rounded-2xl border border-[rgba(47,43,75,0.85)] bg-[linear-gradient(180deg,rgba(25,23,42,0.95)_0%,rgba(18,17,29,0.98)_100%)] mt-10 p-7 sm:p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
          <p className="font-mono text-xs font-bold tracking-[0.14em] text-[var(--blue)] uppercase">
            Area Riservata
          </p>
          <h1 className="mt-2 text-3xl font-black text-[var(--ink)] tracking-tight">
            Area docenti
          </h1>
          <p className="portal-muted mt-2 text-sm leading-relaxed">
            Materiali, rubriche e indicazioni didattiche per preparare le lezioni.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="teacher-password" className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Password condivisa
              </label>
              <div className="relative mt-2">
                <input
                  id="teacher-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  aria-describedby="password-help login-error"
                  className="portal-input min-h-11 w-full rounded-xl pl-4 pr-12 py-3 text-sm outline-none focus:border-[var(--blue)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                  aria-pressed={showPassword}
                  title={showPassword ? "Nascondi password" : "Mostra password"}
                  className="group absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-white/10 active:scale-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/40"
                >
                  <PasswordToggleIcon isVisible={showPassword} />
                </button>
              </div>
              <span id="password-help" className="portal-muted mt-2 block text-xs leading-relaxed">
                La password è condivisa tra i docenti e non identifica singole persone.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="portal-button w-full disabled:cursor-wait disabled:opacity-60"
            >
              {isLoading ? "Verifica in corso…" : "Entra nella console"}
            </button>

            {error ? (
              <p id="login-error" role="alert" className="text-xs font-bold text-[#FF9B9B] bg-[#2A1818] border border-[#FF9B9B]/30 rounded-xl p-4">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </main>
  );
}
