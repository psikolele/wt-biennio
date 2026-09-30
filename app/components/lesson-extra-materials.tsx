"use client";

import { useState, useEffect, useCallback } from "react";
import type { ExtraMaterial } from "@/app/lib/materials-types";

interface LessonExtraMaterialsProps {
  year: number;
  week: number;
  lessonId?: string;
  isTeacherSession: boolean;
}

export function LessonExtraMaterials({
  year,
  week,
  lessonId,
  isTeacherSession
}: LessonExtraMaterialsProps) {
  const [materials, setMaterials] = useState<ExtraMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadMode, setUploadMode] = useState<"file" | "link">("file");

  // Form states
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch materiali
  const loadMaterials = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/materials?year=${year}&week=${week}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setMaterials(data.materials || []);
      }
    } catch (err) {
      console.error("Errore caricamento materiali:", err);
    } finally {
      setIsLoading(false);
    }
  }, [year, week]);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  // Invio Form (File o Link)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Inserisci un titolo o una descrizione per il materiale.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (uploadMode === "link") {
        if (!linkUrl.trim()) {
          setErrorMessage("Inserisci l'URL del link (es. https://drive.google.com/...)");
          setIsSubmitting(false);
          return;
        }

        const res = await fetch("/api/materials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            year,
            week,
            lessonId,
            title: title.trim(),
            linkUrl: linkUrl.trim()
          })
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Errore durante l'aggiunta del link");
        }
      } else {
        if (!selectedFile) {
          setErrorMessage("Seleziona un file da caricare (max 25 MB).");
          setIsSubmitting(false);
          return;
        }

        const formData = new FormData();
        formData.append("year", year.toString());
        formData.append("week", week.toString());
        if (lessonId) formData.append("lessonId", lessonId);
        formData.append("title", title.trim());
        formData.append("file", selectedFile);

        const res = await fetch("/api/materials", {
          method: "POST",
          body: formData
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Errore durante il caricamento del file");
        }
      }

      // Reset form
      setTitle("");
      setLinkUrl("");
      setSelectedFile(null);
      setShowUploadForm(false);
      await loadMaterials();
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eliminazione Materiale
  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/materials?id=${encodeURIComponent(id)}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Errore durante l'eliminazione");
      }

      setDeleteConfirmId(null);
      await loadMaterials();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileBadge = (fileType: string) => {
    const ft = fileType.toLowerCase();
    if (ft.includes("pdf")) return { icon: "📄", label: "PDF", color: "text-[var(--blue)] border-[var(--blue)]" };
    if (ft.includes("doc") || ft.includes("odt")) return { icon: "📝", label: "DOCX", color: "text-[var(--coral)] border-[var(--coral)]" };
    if (ft.includes("zip") || ft.includes("rar")) return { icon: "📦", label: "ZIP", color: "text-[var(--warning)] border-[var(--warning)]" };
    if (ft.includes("ppt")) return { icon: "📊", label: "SLIDE", color: "text-amber-400 border-amber-400" };
    if (ft.includes("link")) return { icon: "🔗", label: "LINK", color: "text-sky-400 border-sky-400" };
    return { icon: "📎", label: ft.toUpperCase(), color: "text-[var(--ink)] border-[var(--line)]" };
  };

  // Se non ci sono materiali e non è docente, non mostrare nulla o solo se rilevante
  if (!isTeacherSession && materials.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="lesson-extra-materials bg-[var(--surface-soft)] border border-[var(--line)] rounded-xl p-4 sm:p-5 my-4">
      {/* Intestazione Sezione Materiali */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">📎</span>
          <h3 className="text-base font-bold text-[var(--ink)]">
            Materiali & Schede Didattiche Extra
          </h3>
          {materials.length > 0 && (
            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[rgba(170,162,255,0.15)] text-[var(--blue)] font-bold">
              {materials.length} {materials.length === 1 ? "allegato" : "allegati"}
            </span>
          )}
        </div>

        {/* Pulsante aggiunta per il Docente */}
        {isTeacherSession && (
          <button
            type="button"
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="portal-button text-xs py-1.5 px-3 inline-flex items-center gap-1.5 font-bold"
          >
            <span>{showUploadForm ? "✕ Annulla" : "➕ Carica Materiale / Verifica"}</span>
          </button>
        )}
      </div>

      {/* Form di Caricamento (Visibile solo al Docente) */}
      {isTeacherSession && showUploadForm && (
        <div className="mt-3 mb-5 p-4 rounded-xl border border-[var(--blue)] bg-[rgba(19,19,28,0.95)] shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-3">
            <h4 className="text-xs font-bold text-[var(--blue)] uppercase tracking-wider">
              Nuovo Materiale per Settimana {week} (Classe {year}ª)
            </h4>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setUploadMode("file")}
                className={`text-xs px-3 py-1 rounded-md font-bold transition-all ${
                  uploadMode === "file"
                    ? "bg-[var(--blue)] text-[#08090f]"
                    : "bg-[var(--surface-soft)] text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                📁 Carica File
              </button>
              <button
                type="button"
                onClick={() => setUploadMode("link")}
                className={`text-xs px-3 py-1 rounded-md font-bold transition-all ${
                  uploadMode === "link"
                    ? "bg-[var(--blue)] text-[#08090f]"
                    : "bg-[var(--surface-soft)] text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                🔗 Link Esterno
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="material-title" className="block text-xs font-bold text-[var(--ink)] mb-1">
                Titolo o Descrizione della Risorsa *
              </label>
              <input
                id="material-title"
                type="text"
                placeholder="Es. Traccia Verifica Sommativa Fila A, Scheda Laboratorio, Soluzioni..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-xs text-[var(--ink)] placeholder-[var(--muted)] focus:border-[var(--blue)] focus:outline-none"
                required
              />
            </div>

            {uploadMode === "file" ? (
              <div>
                <label htmlFor="material-file" className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Seleziona File (PDF, DOCX, ZIP, PPTX, immagini - max 25 MB) *
                </label>
                <input
                  id="material-file"
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-[var(--muted)] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[rgba(170,162,255,0.15)] file:text-[var(--blue)] hover:file:bg-[rgba(170,162,255,0.25)] cursor-pointer"
                  required
                />
                {selectedFile && (
                  <p className="mt-1 text-[11px] text-[var(--coral)]">
                    File selezionato: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label htmlFor="material-url" className="block text-xs font-bold text-[var(--ink)] mb-1">
                  URL del Documento Cloud o Risorsa Web *
                </label>
                <input
                  id="material-url"
                  type="url"
                  placeholder="https://drive.google.com/... oppure https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-xs text-[var(--ink)] placeholder-[var(--muted)] focus:border-[var(--blue)] focus:outline-none"
                  required
                />
              </div>
            )}

            {errorMessage && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800 rounded p-2">
                ⚠️ {errorMessage}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="portal-button-secondary text-xs py-1.5 px-3"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="portal-button text-xs py-1.5 px-4 font-bold disabled:opacity-50"
              >
                {isSubmitting ? "Caricamento in corso..." : "Salva e Pubblica"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista Materiali */}
      {isLoading ? (
        <div className="py-4 text-center text-xs text-[var(--muted)]">
          Caricamento materiali in corso...
        </div>
      ) : materials.length === 0 ? (
        <p className="text-xs text-[var(--muted)] italic">
          Nessun materiale o scheda extra caricato per questa lezione.
        </p>
      ) : (
        <div className="space-y-2.5">
          {materials.map((mat) => {
            const badge = getFileBadge(mat.fileType);
            const isConfirmingDelete = deleteConfirmId === mat.id;

            return (
              <div
                key={mat.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] hover:border-[rgba(170,162,255,0.4)] transition-all"
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">
                    {badge.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <h4 className="text-xs font-bold text-[var(--ink)] truncate">
                        {mat.title}
                      </h4>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[var(--muted)]">
                      {mat.fileName && <span className="truncate max-w-[200px]">{mat.fileName}</span>}
                      {mat.sizeBytes ? <span>• {formatFileSize(mat.sizeBytes)}</span> : null}
                      <span>• {new Date(mat.uploadedAt).toLocaleDateString("it-IT")}</span>
                    </div>
                  </div>
                </div>

                {/* Pulsanti Azione */}
                <div className="flex items-center gap-2 shrink-0 justify-end">
                  <a
                    href={mat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={!mat.isExternalLink}
                    className="portal-button text-xs py-1 px-3 inline-flex items-center gap-1.5 font-bold"
                  >
                    <span>{mat.isExternalLink ? "Apri Link ↗" : "Scarica 📥"}</span>
                  </a>

                  {/* Azione elimina per il Docente */}
                  {isTeacherSession && (
                    <div className="relative">
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1 bg-rose-950/80 border border-rose-700 rounded p-1 text-[11px]">
                          <span className="text-rose-200 px-1">Confermi?</span>
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => handleDelete(mat.id)}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-0.5 rounded text-[10px]"
                          >
                            {isDeleting ? "..." : "Sì, elimina"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-[var(--muted)] hover:text-[var(--ink)] px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(mat.id)}
                          title="Elimina questo materiale"
                          className="h-7 w-7 rounded border border-[var(--line)] bg-[var(--surface-soft)] text-rose-400 hover:bg-rose-950/50 hover:border-rose-700 flex items-center justify-center text-xs transition-colors"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
