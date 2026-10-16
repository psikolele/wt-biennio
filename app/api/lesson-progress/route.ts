import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hasTeacherSession, hasClassSession } from "@/app/lib/auth";
import {
  getAllLessonProgress,
  getYearLessonProgress,
  getLessonProgress,
  toggleClassLessonProgress,
  getClassesForYear
} from "@/app/lib/lesson-progress-storage";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const teacherCookie = cookieStore.get("teacher_session")?.value;
    const isTeacher = hasTeacherSession(teacherCookie);

    const { searchParams } = new URL(request.url);
    const yearStr = searchParams.get("year");
    const weekStr = searchParams.get("week");

    if (yearStr !== null) {
      const year = parseInt(yearStr, 10);
      if (isNaN(year) || year < 1 || year > 5) {
        return NextResponse.json({ error: "Parametro anno non valido (1-5)" }, { status: 400 });
      }

      const classCookie = cookieStore.get(`class_session_${year}`)?.value;
      const hasAccess = hasClassSession(year, classCookie, teacherCookie);
      if (!hasAccess) {
        return NextResponse.json({ error: "Accesso alla classe non autorizzato" }, { status: 401 });
      }

      if (weekStr !== null) {
        const week = parseInt(weekStr, 10);
        if (isNaN(week) || week < 0 || week > 33) {
          return NextResponse.json({ error: "Parametro settimana non valido (0-33)" }, { status: 400 });
        }
        const completedClasses = await getLessonProgress(year, week);
        return NextResponse.json({
          isTeacher,
          classes: getClassesForYear(year),
          completedClasses
        });
      }

      const progress = await getYearLessonProgress(year);
      return NextResponse.json({
        isTeacher,
        classes: getClassesForYear(year),
        progress
      });
    }

    if (!isTeacher) {
      return NextResponse.json({ error: "Accesso non autorizzato" }, { status: 401 });
    }

    const progress = await getAllLessonProgress();
    return NextResponse.json({ isTeacher, progress });
  } catch (error) {
    console.error("Errore GET /api/lesson-progress:", error);
    return NextResponse.json(
      { error: "Errore durante il recupero dello stato delle lezioni" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const year = Number(body.year);
    const week = Number(body.week);
    const className = typeof body.className === "string" ? body.className : "";
    const completed = typeof body.completed === "boolean" ? body.completed : undefined;

    if (!Number.isInteger(year) || year < 1 || year > 5) {
      return NextResponse.json({ error: "Anno non valido (1-5)" }, { status: 400 });
    }
    if (!Number.isInteger(week) || week < 0 || week > 33) {
      return NextResponse.json({ error: "Settimana non valida (0-33)" }, { status: 400 });
    }
    if (!className.trim()) {
      return NextResponse.json({ error: "Classe mancante" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const teacherCookie = cookieStore.get("teacher_session")?.value;
    const isTeacher = hasTeacherSession(teacherCookie);

    // Consenti la modifica SOLO ai docenti autenticati
    if (!isTeacher) {
      return NextResponse.json(
        { error: "Accesso riservato: solo il docente autenticato può modificare lo stato delle classi." },
        { status: 403 }
      );
    }

    const completedClasses = await toggleClassLessonProgress({
      year,
      week,
      className,
      completed
    });

    return NextResponse.json({
      ok: true,
      year,
      week,
      completedClasses
    });
  } catch (error) {
    console.error("Errore POST /api/lesson-progress:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Errore durante l'aggiornamento dello stato della lezione" },
      { status: 400 }
    );
  }
}
