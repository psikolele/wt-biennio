export function GamificationPanel({ game }: { game?: string }) {
  return (
    <aside className="mission-panel" aria-label="Missione della settimana">
      <p className="portal-eyebrow">Missione</p>
      <h3 className="mt-2 text-lg font-bold">{game ?? "Completa la sfida della settimana"}</h3>
      <p className="portal-muted mt-2 text-sm leading-6">Collabora, prova almeno due strategie e annota che cosa ha funzionato.</p>
      <p className="mt-4 text-sm font-bold text-[var(--blue)]">Badge: Esploratore digitale</p>
    </aside>
  );
}
