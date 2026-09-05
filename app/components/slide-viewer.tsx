type SlideViewerProps = { href?: string };

export function SlideViewer({ href }: SlideViewerProps) {
  return (
    <div id="risorse" className="support-panel">
      <p className="support-title">Materiali della lezione</p>
      <p className="portal-muted support-copy">Le slide saranno collegate qui appena disponibili.</p>
      <div className="support-actions">
        {href ? <a href={href} target="_blank" rel="noreferrer" className="portal-button-secondary">Apri in una nuova scheda</a> : <span className="portal-muted rounded-full border border-dashed border-[var(--line-strong)] px-4 py-2 text-sm">Slide in preparazione</span>}
        {href && <a href={href} download className="portal-button-secondary">Scarica PDF</a>}
      </div>
    </div>
  );
}
