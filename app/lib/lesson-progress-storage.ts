import { promises as fs } from "node:fs";
import path from "node:path";

export type LessonProgressMap = Record<string, string[]>;

const LOCAL_PROGRESS_FILE = path.join(process.cwd(), "data", "lesson-progress.json");
const BLOB_PROGRESS_KEY = "registry/lesson-progress.json";

export const YEAR_CLASSES: Record<number, readonly string[]> = {
  1: ["1R", "1M", "1N"],
  2: ["2R", "2M", "2N"],
  3: ["3N"],
  4: ["4N"],
  5: ["5N"]
};

export function getClassesForYear(year: number): readonly string[] {
  return YEAR_CLASSES[year] ?? [];
}

export function getLessonProgressKey(year: number, week: number): string {
  return `${year}-${week}`;
}

function isBlobStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureLocalProgressFile(): Promise<void> {
  try {
    await fs.mkdir(path.dirname(LOCAL_PROGRESS_FILE), { recursive: true });
    try {
      await fs.access(LOCAL_PROGRESS_FILE);
    } catch {
      await fs.writeFile(LOCAL_PROGRESS_FILE, JSON.stringify({}, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Errore inizializzazione file progresso lezioni:", err);
  }
}

function sanitizeProgressMap(raw: unknown): LessonProgressMap {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const result: LessonProgressMap = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!Array.isArray(value)) continue;
    const [yearStr] = key.split("-");
    const year = Number(yearStr);
    const allowed = new Set(getClassesForYear(year));
    const filtered = value.filter((item): item is string => typeof item === "string" && allowed.has(item));
    if (filtered.length > 0) {
      result[key] = Array.from(new Set(filtered));
    }
  }
  return result;
}

export async function getAllLessonProgress(): Promise<LessonProgressMap> {
  if (isBlobStorageConfigured()) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: BLOB_PROGRESS_KEY });
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          return sanitizeProgressMap(data);
        }
      }
    } catch (err) {
      console.warn("Fallback su storage locale per lesson-progress (Blob list/fetch fallito):", err);
    }
  }

  await ensureLocalProgressFile();
  try {
    const raw = await fs.readFile(LOCAL_PROGRESS_FILE, "utf8");
    return sanitizeProgressMap(JSON.parse(raw));
  } catch {
    return {};
  }
}

async function saveAllLessonProgress(progress: LessonProgressMap): Promise<void> {
  if (isBlobStorageConfigured()) {
    try {
      const { put } = await import("@vercel/blob");
      await put(BLOB_PROGRESS_KEY, JSON.stringify(progress, null, 2), {
        access: "public",
        addRandomSuffix: false
      });
      return;
    } catch (err) {
      console.warn("Errore salvataggio lesson-progress su Vercel Blob, fallback su locale:", err);
    }
  }

  await ensureLocalProgressFile();
  await fs.writeFile(LOCAL_PROGRESS_FILE, JSON.stringify(progress, null, 2), "utf8");
}

export async function getYearLessonProgress(year: number): Promise<LessonProgressMap> {
  const all = await getAllLessonProgress();
  const prefix = `${year}-`;
  const filtered: LessonProgressMap = {};
  for (const [key, classes] of Object.entries(all)) {
    if (key.startsWith(prefix)) {
      filtered[key] = classes;
    }
  }
  return filtered;
}

export async function getLessonProgress(year: number, week: number): Promise<string[]> {
  const all = await getAllLessonProgress();
  const key = getLessonProgressKey(year, week);
  return all[key] ?? [];
}

export async function toggleClassLessonProgress({
  year,
  week,
  className,
  completed
}: {
  year: number;
  week: number;
  className: string;
  completed?: boolean;
}): Promise<string[]> {
  const allowedClasses = getClassesForYear(year);
  const normalizedClass = className.trim().toUpperCase();
  if (!allowedClasses.includes(normalizedClass)) {
    throw new Error(`Classe "${className}" non valida per il ${year}° anno.`);
  }
  if (!Number.isInteger(week) || week < 0 || week > 33) {
    throw new Error(`Settimana "${week}" non valida.`);
  }

  const all = await getAllLessonProgress();
  const key = getLessonProgressKey(year, week);
  const currentSet = new Set(all[key] ?? []);

  const shouldComplete = completed !== undefined ? completed : !currentSet.has(normalizedClass);
  if (shouldComplete) {
    currentSet.add(normalizedClass);
  } else {
    currentSet.delete(normalizedClass);
  }

  const ordered = allowedClasses.filter((c) => currentSet.has(c));
  if (ordered.length > 0) {
    all[key] = ordered;
  } else {
    delete all[key];
  }

  await saveAllLessonProgress(all);
  return ordered;
}
