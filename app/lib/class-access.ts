import { cookies } from "next/headers";
import { hasClassSession } from "./auth";

/**
 * Verifica lato server la sessione della classe (o del docente).
 * Va chiamata nelle pagine, non solo nel layout: Next serializza il payload della pagina
 * anche quando il layout non renderizza i children.
 */
export async function hasClassAccess(year: number) {
  const cookieStore = await cookies();
  return hasClassSession(
    year,
    cookieStore.get(`class_session_${year}`)?.value,
    cookieStore.get("teacher_session")?.value
  );
}
