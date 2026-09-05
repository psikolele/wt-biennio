import { NextResponse } from "next/server";
import { createTeacherSession, verifyTeacherPassword } from "@/app/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!verifyTeacherPassword(body.password)) return NextResponse.json({ error: "Password non valida" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("teacher_session", createTeacherSession(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
  return response;
}
