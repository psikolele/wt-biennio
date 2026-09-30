import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hasTeacherSession } from "@/app/lib/auth";
import {
  getAllMaterials,
  getMaterialsForLesson,
  addMaterial,
  deleteMaterialById
} from "@/app/lib/materials-storage";

export const dynamic = "force-dynamic";

// Limite 25 MB per i file didattici
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

// GET: Recupera materiali (opzionalmente filtrati per year e week)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yearStr = searchParams.get("year");
    const weekStr = searchParams.get("week");

    if (yearStr && weekStr) {
      const year = parseInt(yearStr, 10);
      const week = parseInt(weekStr, 10);
      if (isNaN(year) || isNaN(week)) {
        return NextResponse.json({ error: "Parametri anno e settimana non validi" }, { status: 400 });
      }
      const materials = await getMaterialsForLesson(year, week);
      return NextResponse.json({ materials });
    }

    const materials = await getAllMaterials();
    return NextResponse.json({ materials });
  } catch (error) {
    console.error("Errore GET /api/materials:", error);
    return NextResponse.json({ error: "Errore durante il recupero dei materiali" }, { status: 500 });
  }
}

// POST: Caricamento file o aggiunta link (protetto da sessione docente)
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get("teacher_session")?.value;

  if (!hasTeacherSession(sessionValue)) {
    return NextResponse.json(
      { error: "Accesso non autorizzato. È richiesta la sessione docente." },
      { status: 401 }
    );
  }

  const contentType = request.headers.get("content-type") || "";

  try {
    // 1. Caso JSON (link esterno)
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { year, week, lessonId, title, linkUrl } = body;

      if (!year || !week || !title || !linkUrl) {
        return NextResponse.json(
          { error: "Campi obbligatori mancanti (anno, settimana, titolo, linkUrl)" },
          { status: 400 }
        );
      }

      // Validazione URL
      try {
        new URL(linkUrl);
      } catch {
        return NextResponse.json({ error: "URL del link non valido" }, { status: 400 });
      }

      const material = await addMaterial({
        year: Number(year),
        week: Number(week),
        lessonId,
        title: String(title),
        linkUrl: String(linkUrl)
      });

      return NextResponse.json({ success: true, material }, { status: 201 });
    }

    // 2. Caso Multipart Form Data (caricamento file)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const yearStr = formData.get("year");
      const weekStr = formData.get("week");
      const lessonId = formData.get("lessonId")?.toString();
      const title = formData.get("title")?.toString();
      const fileEntry = formData.get("file");

      if (!yearStr || !weekStr || !title) {
        return NextResponse.json(
          { error: "Campi obbligatori mancanti (anno, settimana, titolo)" },
          { status: 400 }
        );
      }

      if (!(fileEntry instanceof File)) {
        return NextResponse.json({ error: "File non fornito o non valido" }, { status: 400 });
      }

      if (fileEntry.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `Il file supera la dimensione massima consentita di 25 MB (dimensione: ${(fileEntry.size / (1024 * 1024)).toFixed(1)} MB)` },
          { status: 400 }
        );
      }

      const bytes = await fileEntry.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const material = await addMaterial({
        year: Number(yearStr),
        week: Number(weekStr),
        lessonId,
        title,
        file: {
          buffer,
          fileName: fileEntry.name,
          mimeType: fileEntry.type
        }
      });

      return NextResponse.json({ success: true, material }, { status: 201 });
    }

    return NextResponse.json({ error: "Tipo di contenuto non supportato" }, { status: 415 });
  } catch (error) {
    console.error("Errore POST /api/materials:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Errore durante il caricamento del materiale" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminazione materiale (protetto da sessione docente)
export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get("teacher_session")?.value;

  if (!hasTeacherSession(sessionValue)) {
    return NextResponse.json(
      { error: "Accesso non autorizzato. È richiesta la sessione docente." },
      { status: 401 }
    );
  }

  try {
    let id: string | null = null;
    const { searchParams } = new URL(request.url);
    id = searchParams.get("id");

    if (!id && request.headers.get("content-type")?.includes("application/json")) {
      const body = await request.json();
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: "ID del materiale mancante" }, { status: 400 });
    }

    const deleted = await deleteMaterialById(id);
    if (!deleted) {
      return NextResponse.json({ error: "Materiale non trovato o già eliminato" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore DELETE /api/materials:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Errore durante l'eliminazione del materiale" },
      { status: 500 }
    );
  }
}
