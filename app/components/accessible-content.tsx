"use client";

import { useState } from "react";

export function AccessibleContent({ children, facilitatedText }: { children: React.ReactNode; facilitatedText?: string }) {
  const [fontSize, setFontSize] = useState("text-base");
  const [facilitated, setFacilitated] = useState(false);
  return (
    <div className={`lesson-content ${fontSize}`}>
      <div className="readability-toolbar" aria-label="Controlli di leggibilità">
        <span className="readability-label">Leggibilità</span>
        <div className="readability-actions">
          <button type="button" onClick={() => setFontSize("text-lg leading-8")} className="portal-button-secondary">Testo grande</button>
          <button type="button" onClick={() => setFontSize("text-base leading-6")} className="portal-button-secondary">Reset</button>
          <button type="button" onClick={() => setFacilitated((value) => !value)} aria-pressed={facilitated} className="portal-button-secondary">Versione facilitata</button>
        </div>
      </div>
      {facilitated ? <p className="facilitated-note">{facilitatedText ?? "In breve: segui un passaggio alla volta, chiedi di ripetere le istruzioni e usa la checklist della lezione."}</p> : null}
      {children}
    </div>
  );
}
