import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

export type LessonProgressMap = Record<string, string[]>;

const BLOB_PROGRESS_PREFIX = "registry/lesson-progress-";
const LEGACY_BLOB_PROGRESS_KEY = "registry/lesson-progress.json";

function getLocalProgressFile(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "dashboard-lezioni", "data", "lesson-progress.json");
  }
  return path.join(process.cwd(), "data", "lesson-progress.json");
}

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

async function ensureLocalProgressFile(): Promise<string> {
  const filePath = getLocalProgressFile();
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify({}, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Errore inizializzazione file progresso lezioni:", err);
  }
  return filePath;
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
      const { blobs } = await list({ prefix: "registry/lesson-progress" });
      if (blobs.length > 0) {
        // Ordina dal più recente al più vecchio (evita qualsiasi cache CDN su URL fisse)
        const sorted = [...blobs].sort((a, b) => {
          const timeDiff = new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
          if (timeDiff !== 0) return timeDiff;
          return b.pathname.localeCompare(a.pathname);
        });
        const res = await fetch(sorted[0].url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          return sanitizeProgressMap(data);
        }
      }
      return {};
    } catch (err) {
      console.warn("Fallback su storage locale per lesson-progress (Blob list/fetch fallito):", err);
    }
  }

  try {
    const filePath = await ensureLocalProgressFile();
    const raw = await fs.readFile(filePath, "utf8");
    return sanitizeProgressMap(JSON.parse(raw));
  } catch {
    return {};
  }
}

async function saveAllLessonProgress(progress: LessonProgressMap): Promise<void> {
  if (isBlobStorageConfigured()) {
    try {
      const { put, list, del } = await import("@vercel/blob");
      const { blobs: existingBlobs } = await list({ prefix: "registry/lesson-progress" });

      // Usa un pathname univoco con timestamp + random suffix per garantire URL mai cachata dalla CDN
      const uniqueKey = `${BLOB_PROGRESS_PREFIX}${Date.now()}.json`;
      const created = await put(uniqueKey, JSON.stringify(progress, null, 2), {
        access: "public",
        addRandomSuffix: true,
        contentType: "application/json"
      });

      // Elimina gli snapshot precedenti per mantenere pulito lo store
      const oldUrls = existingBlobs
        .filter((b) => b.url !== created.url && (b.pathname.startsWith(BLOB_PROGRESS_PREFIX) || b.pathname === LEGACY_BLOB_PROGRESS_KEY))
        .map((b) => b.url);
      if (oldUrls.length > 0) {
        await del(oldUrls).catch(() => {});
      }
      return;
    } catch (err) {
      console.warn("Errore salvataggio lesson-progress su Vercel Blob, fallback su locale:", err);
    }
  }

  const filePath = await ensureLocalProgressFile();
  await fs.writeFile(filePath, JSON.stringify(progress, null, 2), "utf8");
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
