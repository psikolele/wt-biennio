"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const password = new FormData(event.currentTarget).get("password");
    try {
      const response = await fetch("/api/teacher-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (!response.ok) { setError("Password non valida. Controlla di averla digitata correttamente."); return; }
      router.push("/docenti");
    } catch { setError("Accesso non disponibile. Controlla la connessione e riprova."); } finally { setIsLoading(false); }
  }
  return <main className="portal-shell px-5 py-16"><div className="portal-container max-w-md"><Link href="/" className="portal-button-secondary">← Torna al portale</Link><div className="portal-card mt-10 p-7"><p className="portal-eyebrow">Area riservata</p><h1 className="mt-3 text-4xl font-black">Area docenti</h1><p className="portal-muted mt-3 leading-7">Materiali, rubriche e indicazioni didattiche per preparare le lezioni.</p><form onSubmit={submit} className="mt-8 space-y-4"><label htmlFor="teacher-password" className="block text-sm font-bold">Password condivisa<input id="teacher-password" name="password" type="password" required autoComplete="current-password" aria-describedby="password-help login-error" className="portal-input mt-2 min-h-11 w-full rounded-xl px-4 py-3 outline-none" /><span id="password-help" className="portal-muted mt-2 block text-sm font-normal">La password è condivisa tra i docenti e non identifica singole persone.</span></label><button type="submit" disabled={isLoading} className="portal-button disabled:cursor-wait disabled:opacity-60">{isLoading ? "Verifica in corso…" : "Entra"}</button>{error ? <p id="login-error" role="alert" className="text-sm font-bold text-[#ff9b9b]">{error}</p> : null}</form></div></div></main>;
}
