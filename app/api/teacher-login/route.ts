import { NextResponse } from "next/server";
import { createTeacherSession, verifyTeacherPassword } from "@/app/lib/auth";
import { checkBlocked, clearFailures, clientIp, registerFailure } from "@/app/lib/rate-limit";

const tooManyAttempts = (retryAfterSec: number) =>
  NextResponse.json(
    { error: "Troppi tentativi. Riprova più tardi." },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
  );

export async function POST(request: Request) {
  const key = `teacher:${clientIp(request.headers)}`;
  const limit = checkBlocked(key);
  if (limit.blocked) return tooManyAttempts(limit.retryAfterSec);

  const body = await request.json().catch(() => ({}));
  if (!verifyTeacherPassword(body.password)) {
    registerFailure(key);
    // Rallenta i tentativi automatici
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json({ error: "Password non valida" }, { status: 401 });
  }

  clearFailures(key);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("teacher_session", createTeacherSession(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
  return response;
}
