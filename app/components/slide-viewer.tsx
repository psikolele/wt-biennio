type SlideViewerProps = { href?: string };

export function SlideViewer({ href }: SlideViewerProps) {
  const isPptx = href?.endsWith(".pptx");
  const isPdf = href?.endsWith(".pdf");
  const downloadLabel = isPptx ? "Scarica Slide (.pptx)" : isPdf ? "Scarica PDF" : "Scarica Materiale";

  return (
    <div id="risorse" className="support-panel">
      <p className="support-title">Materiali della lezione</p>
      <p className="portal-muted support-copy">
        {href
          ? "Slide e presentazioni ufficiali della cattedra disponibili per lo studio e il download."
          : "Le slide saranno collegate qui appena disponibili."}
      </p>
      <div className="support-actions">
        {href ? <a href={href} target="_blank" rel="noreferrer" className="portal-button-secondary min-h-[44px]">Apri in una nuova scheda</a> : <span className="portal-muted rounded-full border border-dashed border-[var(--line-strong)] px-4 py-2 text-sm">Slide in preparazione</span>}
        {href && (
          <a
            href={href}
            download
            className="portal-button min-h-[44px] text-xs font-bold"
          >
            <span>📥 {downloadLabel}</span>
          </a>
        )}
      </div>
    </div>
  );
}
