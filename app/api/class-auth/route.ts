import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyClassPassword,
  createClassSession,
  hasClassSession
} from "@/app/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const year = Number(body.year);
  const password = typeof body.password === "string" ? body.password : "";

  if (!year || year < 1 || year > 5) {
    return NextResponse.json({ error: "Classe non valida (1–5)" }, { status: 400 });
  }

  if (!verifyClassPassword(year, password)) {
    return NextResponse.json(
      { error: `Password non corretta per la classe ${year}ª.` },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  const token = createClassSession(year);

  // Imposta cookie di sessione per la classe (valido 30 giorni)
  cookieStore.set(`class_session_${year}`, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60,
    path: "/"
  });

  return NextResponse.json({ ok: true, year });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const year = Number(url.searchParams.get("year"));

  if (!year || year < 1 || year > 5) {
    return NextResponse.json({ authenticated: false, error: "Classe non valida" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const classCookie = cookieStore.get(`class_session_${year}`)?.value;
  const teacherCookie = cookieStore.get("teacher_session")?.value;

  const authenticated = hasClassSession(year, classCookie, teacherCookie);
  return NextResponse.json({ authenticated, year });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const year = Number(url.searchParams.get("year"));

  if (!year || year < 1 || year > 5) {
    return NextResponse.json({ error: "Classe non valida" }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.delete(`class_session_${year}`);

  return NextResponse.json({ ok: true, message: `Sessione classe ${year} terminata` });
}
